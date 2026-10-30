# Validacao real conforme a aula

Inicie ADK Web conforme README, com Ollama e Qwen3 disponiveis, e selecione study_coach.
1. Nova sessao: "Quero organizar meus estudos de JavaScript."
   Esperado: load_skill(plano-de-estudos), perguntas apenas sobre dados faltantes,
   nenhuma chamada load_skill_resource nem WriteFile.
2. Na mesma sessao: "Quero fazer meu primeiro portfolio em 5 semanas, comeco
   segunda que vem, seg/qua/sex 2h as 19h. Sei HTML/CSS mas nunca programei."
   Esperado: workflow, tecnicas, template e salvar_agenda carregados sob demanda;
   plano com revisoes/checkpoints; WriteFile com sucesso.
3. Confira planos/plano-de-estudos.csv: cabecalho ingles, datas MM/DD/YYYY,
   horas AM/PM, descricoes entre aspas, dias e duracoes combinados. A skill limita
   a primeira exportacao aos primeiros 14 dias de estudo e deve avisar esse limite.
4. "Perdi as sessoes de quarta e sexta da primeira semana. Ajuste o plano."
   Esperado: ReadFile se necessario, tabela atualizada, WriteFile sobrescrevendo;
   sem acumular atrasos em um dia. Confira o CSV novamente.
5. Em Events inspecione argumentos e retornos; em Trace confira sequencia,
   duracao e erros. Registre resultados sem chave ou conteudo pessoal.
6. Repita conversa na UI StudyFlow. Confira continuidade e Nova conversa.
   Mudar compartilhamento inicia contexto novo, mas nao apaga sessoes do servidor.

Roteiro nao equivale a execucao. Testes reais exigem Ollama ativo e modelo baixado; nao exigem chave.
