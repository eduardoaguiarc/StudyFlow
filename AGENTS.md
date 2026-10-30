# StudyFlow ? GCCD

## Goal
Integrar um mentor Google ADK ao StudyFlow: planos personalizados com revisao
espacada, checkpoints, CSV para Google Agenda e revisao ativa.

## Context
Referencia: `Aulas 02 e 03/alura-imersao-dev-agy-main/AGENTS.md`.
GCCD corresponde aqui a Goal, Context, Constraints e Done-when.
Projeto existente: React/TypeScript/Vite no Windows, objetivos em localStorage.
Agente Python: agents/study_coach/agent.py; API nativa ADK via proxy /adk.
Leia docs/context.md e docs/api.md. Skill de manutencao:
.agents/skills/studyflow-agent/SKILL.md.
Skill runtime plano-de-estudos copiada do material da aula, com L1 (metadados),
L2 (instrucoes e gating) e L3 (references/assets), carregados sob demanda.
Preservar os materiais da aula como referencia; documentar adaptacoes no runtime.

## Constraints
- Usar load_skill_from_dir + SkillToolset; nao incorporar recursos L3 no prompt.
- Sem objetivo, inicio/prazo, disponibilidade e nivel, perguntar somente o que falta.
- EnvironmentToolset exp?e somente ReadFile e WriteFile, sem Execute/EditFile.
- Agenda persistente: planos/plano-de-estudos.csv, ignorada pelo Git.
- Laboratorio local de um usuario; arquivo compartilhado entre sessoes, nao multiusuario.
- Data atual via instruction provider; MODEL ou STUDYFLOW_MODEL configuram o modelo.
- Nunca expor chave no frontend ou Git. Compartilhamento dos objetivos e opt-in.
- Nao alterar objetivos automaticamente. Mudar consentimento inicia nova conversa.
- Preservar estrutura Windows/pip existente; nao e necessario migrar ao Cloud Shell,
  agents-cli ou uv para aplicar o comportamento da aula. Sem deploy nesta entrega.
- Ler/escrever arquivos nao constitui sandbox de seguranca. Servir apenas em loopback.

## Done-when
- [x] Agente carrega plano-de-estudos e active-review, com recursos L3 disponiveis.
- [x] Ambiente restrito a leitura/escrita e data dinamica no prompt.
- [x] UI preserva sessao para completar informacoes e replanejar.
- [ ] Modelo real demonstra gating sem load_skill_resource em pedido incompleto.
- [ ] Modelo real gera CSV valido e replaneja usando ReadFile/WriteFile.
- [ ] Eventos e traces inspecionados no ADK Web com Ollama ativo.

Verificar: npm.cmd run lint; npm.cmd run build;
.venv/Scripts/python -m unittest discover -s tests.
Registrar evidencias sem confundir teste local com inferencia real.

## Modelo local
Por pedido do usuario, usar Ollama/Qwen3 via LiteLLM por padrao, sem chaves.
Iniciar StudyFlow.cmd sobe os servicos. Nao versionar .local-ai (modelos e logs).
