# StudyFlow

**Organize seus objetivos de estudo e transforme seus planos em próximos passos.**

O StudyFlow combina um organizador de metas com um mentor de estudos executado
localmente. Crie e acompanhe objetivos no navegador, peça ajuda para montar um
plano personalizado e continue a conversa para revisar ou replanejar.

> Aplicação experimental para uso local e individual. A inferência usa Ollama
> com Qwen3 4B; não requer chave de API.

## O que você pode fazer

- Criar, filtrar e acompanhar objetivos de estudo, salvos no `localStorage` do
  navegador.
- Pedir ao assistente planos com revisões espaçadas, checkpoints e revisão
  ativa.
- Continuar a conversa para completar informações ou ajustar um plano.
- Compartilhar seus objetivos com o assistente somente se você ativar essa
  opção.
- Exportar o cronograma como CSV para importar manualmente no Google Agenda.

O assistente pergunta apenas os dados que faltam para planejar: objetivo,
período, disponibilidade e nível atual. As respostas são sugestões e não
alteram seus objetivos salvos.

## Executar no Windows

### Requisitos

- Windows 10 ou superior.
- Node.js compatível com Vite 8 (20.19+ ou 22.12+).
- Python 3.10+.
- Ollama para Windows e o modelo `qwen3:4b`.

### Preparar e iniciar

1. Instale as dependências do projeto:

   ```powershell
   npm.cmd install
   py -m venv .venv
   .venv\Scripts\python.exe -m pip install -r requirements.txt
   ```

2. Disponibilize o executável do Ollama em
   `.local-ai\ollama\ollama.exe`. O diretório `.local-ai` é local e não é
   versionado.

3. Baixe o modelo para o diretório local usado pelo iniciador:

   ```powershell
   New-Item -ItemType Directory -Force .local-ai\models | Out-Null
   $env:OLLAMA_MODELS = "$PWD\.local-ai\models"
   & .\.local-ai\ollama\ollama.exe pull qwen3:4b
   ```

4. Execute `Iniciar StudyFlow.cmd`. O iniciador sobe Ollama, ADK e Vite e abre
   a aplicação em <http://127.0.0.1:3000>. O ADK Web fica em
   <http://127.0.0.1:8000>.

A primeira resposta pode demorar enquanto o modelo é carregado. Mantenha a
janela do iniciador e o computador ligados durante o uso.

## Desenvolvimento

Inicie a interface separadamente com `npm.cmd run dev`. Para executar o agente
e a interface juntos, use o iniciador descrito acima.

Verificações locais:

```powershell
npm.cmd run lint
npm.cmd run build
.venv\Scripts\python.exe -m unittest discover -s tests
```

O roteiro `docs/adk-validation.md` descreve como testar o fluxo real com Ollama.
Os testes automatizados não substituem a validação de inferência, geração de
CSV ou inspeção de eventos e traces no ADK Web.

## Como funciona

- **Interface:** React, TypeScript, Vite e Tailwind CSS.
- **Agente:** Google ADK com LiteLLM apontando para Ollama em
  `127.0.0.1:11434`.
- **Skills:** `plano-de-estudos` e `active-review`, com instruções e referências
  carregadas sob demanda.
- **Agenda:** o agente pode ler e escrever `planos/plano-de-estudos.csv`, usando
  somente as ferramentas `ReadFile` e `WriteFile`.
- **API:** o Vite encaminha `/adk` ao servidor ADK local.

Consulte [docs/context.md](docs/context.md), [docs/api.md](docs/api.md) e
[docs/adk-validation.md](docs/adk-validation.md) para decisões, contrato da API
e roteiro de validação. Os materiais de referência das aulas estão em
`Aulas 02 e 03/alura-imersao-dev-agy-main/`.

## Privacidade e limites

- A aplicação e o agente são iniciados em endereços de loopback; não exponha
  esses serviços à rede.
- Os objetivos ficam no armazenamento local do navegador e só são enviados ao
  agente quando o compartilhamento é ativado.
- O modelo e as conversas são processados localmente pelo Ollama. Não é
  necessária uma chave Google ou OpenAI.
- A exportação CSV é um único arquivo local, compartilhado entre sessões deste
  ambiente. O projeto é para um usuário e não oferece isolamento, autenticação
  ou implantação para produção.
- O acesso do agente a arquivos é limitado a leitura e escrita, mas o ambiente
  local **não é um sandbox de segurança**. Não use o serviço com dados ou
  arquivos que não queira disponibilizar ao processo local.
- Os binários, modelos, logs, ambiente virtual e CSV ficam fora do Git por meio
  do `.gitignore`.
