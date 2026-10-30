---
name: studyflow-agent
description: Manter o agente ADK do StudyFlow, suas skills, integração React e cenários de observabilidade.
---

Leia AGENTS.md e docs/api.md. Skills do estudante ficam em
agents/study_coach/skills; esta skill é exclusiva do agente de desenvolvimento.
Mantenha root_agent importável sem chave e sem chamadas de rede durante import.
Preserve o compartilhamento explícito de objetivos e o modo apenas consultivo.
Ao mudar o toolset, valide descoberta e carregamento das skills com unittest.
Ao mudar integração, valide criação de sessão e resposta de /run; depois siga
docs/adk-validation.md com credencial configurada. Registre limitações reais.
