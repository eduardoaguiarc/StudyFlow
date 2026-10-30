# Contrato local — API nativa do ADK

Base do navegador: `/adk`, proxy de desenvolvimento para `127.0.0.1:8000`.
Não há backend de produção configurado.

1. `POST /apps/study_coach/users/{userId}/sessions/{sessionId}` com `{}`:
   cria sessão; resposta JSON com a sessão.
2. `POST /run` com
   `{"appName":"study_coach","userId":"...","sessionId":"...","newMessage":{"role":"user","parts":[{"text":"pergunta"}]}}`.
   Resposta: array de eventos; conteúdo textual está em `content.parts[].text`.
   Eventos de ferramentas não são texto; partes `thought` não devem ser exibidas.

O cliente cria UUIDs por conversa e reutiliza a sess?o nos pr?ximos envios, verifica HTTP, limita a pergunta a 6000 caracteres e
cancela a espera após 600 segundos. Erros de serviço são mostrados na UI.
Cancelar a espera não garante cancelamento da execução no servidor.
O servidor nativo não fornece isolamento/autenticação de usuários para produção.

Modelo padrao local via Ollama em 127.0.0.1:11434; protocolo ADK inalterado.
