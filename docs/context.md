# Contexto e decisoes

## Alinhamento com os materiais das aulas
GCCD confirmado pelo formato Goal / Context / Constraints / Done-when do material.
A skill study-plan foi substituida por plano-de-estudos, incluindo todos os recursos
originais. A UI agora preserva a sessao e historico; Nova conversa reinicia contexto.
EnvironmentToolset habilitado por padrao, limitado a ReadFile e WriteFile; pode ser
desligado com STUDYFLOW_ENABLE_ENVIRONMENT=false. Arquivos em planos/, nao versionados.
Modelo configuravel por MODEL (prioridade) ou STUDYFLOW_MODEL. Mantido o padrao
existente para nao impor um modelo diferente a conta do usuario.
Adaptacoes: Windows/pip e nome study_coach preservados; sem Cloud Shell/uv/deploy.
Falta credencial no .env do agente para confirmar inferencia, CSV e traces reais.

Validacao local apos alinhamento: quatro testes Python passaram (skills, recursos da
aula, data dinamica e lista efetiva de ferramentas). TypeScript passou.


## Troca para IA local a pedido do usuario
Padrao alterado para Ollama/Qwen3 4B via adaptador LiteLLM; nao exige chave Google.
ADK, skills e ferramentas de arquivo preservados. Iniciador Windows sobe os tres
servicos e abre o navegador. UI informa que inferencia local pode levar minutos.
Pendencias anteriores de credencial aplicam-se somente ao antigo modo Gemini.
