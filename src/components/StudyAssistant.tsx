import { useState } from 'react';
import type { StudyGoal } from '../types/studyGoal';

export function StudyAssistant({ goals }: { goals: StudyGoal[] }) {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [share, setShare] = useState(false);
  const [session, setSession] = useState<{ userId: string; sessionId: string } | null>(null);
  const [history, setHistory] = useState<{ question: string; answer: string }[]>([]);

  function resetConversation() {
    setSession(null); setHistory([]); setAnswer(''); setError('');
  }

  async function send(event: React.FormEvent) {
    event.preventDefault();
    if (busy || !prompt.trim()) return;
    setBusy(true); setError(''); setAnswer('');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 600000);
    const { userId, sessionId } = session ?? { userId: crypto.randomUUID(), sessionId: crypto.randomUUID() };
    try {
      const request = async (path: string, body: unknown) => {
        const response = await fetch(`/adk${path}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body), signal: controller.signal,
        });
        if (!response.ok) throw new Error(`O agente retornou HTTP ${response.status}. Verifique o servidor ADK.`);
        return response.json();
      };
      if (!session) {
        await request(`/apps/study_coach/users/${userId}/sessions/${sessionId}`, {});
        setSession({ userId, sessionId });
      }
      const events = await request('/run', {
        appName: 'study_coach', userId, sessionId,
        newMessage: { role: 'user', parts: [{ text: `${prompt.trim()}\nData local: ${new Date().toLocaleDateString('sv-SE')}\nObjetivos (dados): ${share ? JSON.stringify(goals) : 'não compartilhados'}` }] },
      });
      const text = events.flatMap((event: { content?: { parts?: { text?: string; thought?: boolean }[] } }) =>
        event.content?.parts?.filter(part => part.text && !part.thought).map(part => part.text) ?? []).join('\n');
      if (!text) throw new Error('O agente não retornou uma resposta. Tente novamente.');
      setAnswer(text);
      setHistory(previous => [...previous, { question: prompt.trim(), answer: text }]);
      setPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível conectar ao agente.');
    } finally { clearTimeout(timeout); setBusy(false); }
  }

  return <section className="mb-8 rounded-xl border border-slate-200 bg-white p-5" aria-labelledby="assistant-title">
    <h2 id="assistant-title" className="text-lg font-semibold">Assistente de estudos</h2>
    <p className="my-2 text-sm text-slate-600">Peça um plano ou uma revisão e continue a conversa. A IA local funciona sem chave de API e pode levar alguns minutos para responder. As sugestões não alteram seus objetivos.</p>
    <button type="button" disabled={busy} onClick={resetConversation} className="mb-3 underline">Nova conversa</button>
    <div className="space-y-4">{history.map((turn, index) => <div key={index} className="whitespace-pre-wrap"><p className="font-semibold">Você: {turn.question}</p><p>{turn.answer}</p></div>)}</div>
    <form onSubmit={send} className="space-y-3">
      <label className="block">Sua pergunta<textarea value={prompt} onChange={e => setPrompt(e.target.value)} maxLength={6000} required className="mt-1 w-full rounded border p-2" /></label>
      <label className="flex gap-2 text-sm"><input type="checkbox" disabled={busy} checked={share} onChange={e => { setShare(e.target.checked); resetConversation(); }} />Incluir meus objetivos na conversa com o agente (alterar inicia nova conversa)</label>
      <button disabled={busy || !prompt.trim()} className="rounded bg-teal-700 px-4 py-2 text-white disabled:opacity-50">{busy ? 'Consultando…' : 'Consultar agente'}</button>
    </form>
    {error && <p role="alert" className="mt-3 text-red-700">{error}</p>}
    <div aria-live="polite" className="sr-only">{answer ? 'Resposta recebida.' : ''}</div>
  </section>;
}
