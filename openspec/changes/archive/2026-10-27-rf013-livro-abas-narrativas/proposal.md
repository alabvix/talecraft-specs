## Why

O RF012 entregou a aba **Resumo**, mas o planejamento do livro ainda não registra
o que a história conta em termos comerciais e editoriais, os seus temas, o
conflito central nem os parâmetros de voz narrativa. Sem esses dados, a página
**Dados do Livro** fica incompleta e os módulos de gráficos e exportação não
terão de onde ler a identidade narrativa do livro.

## What Changes

- Quatro novas abas em **Dados do Livro**, depois de **Resumo**: **Sinopse**,
  **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo**.
- **Sinopse:** **Sinopse Comercial** e **Sinopse Editorial**, ambas como texto
  longo.
- **Tema:** **Tema Central** (texto curto), **Subtemas** e **Nuvem de Palavras**
  (texto médio).
- **Conflito:** **Ponto de Conflito Principal** (texto curto), **Polos de
  Conflito** (texto longo) e **Resolução do Conflito Principal** (texto médio).
- **Voz Narrativa/Tom/Tempo:** **Narrador**, **Tom**, **Tempo**, **Humor**,
  **Estilo** e **Ritmo**. Humor aceita **múltiplos** valores; os demais, um
  valor cada.
- Migração **v10** aditiva com as colunas de texto/listas na tabela `livro` e a
  tabela filha `livro_humor`.
- **Salvar** grava todas as abas na mesma transação, mantendo a edição pendente
  ao alternar de aba. Nenhum comando Tauri novo e nenhuma biblioteca nova.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: o Tab Panel de **Dados do Livro** passa a ter seis abas; as
  quatro novas abas ganham os seus campos e listas fechadas; **Humor** é
  seleção múltipla.
- `database-foundation`: nova migração v10 aditiva com as colunas das abas e a
  tabela `livro_humor`.

## Impact

- **Requisito coberto:** RF013 (RF013-TL001 a RF013-TL006, RF013-FL001 a
  RF013-FL005, RF013-RN001 a RF013-RN009, RF013-CA001 a RF013-CA012).
- **Requisito ajustado:** RF012-CA001/RF012-RN006, que passam a conviver com as
  quatro abas novas — o painel deixa de ter somente **Dados Gerais** e
  **Resumo**.
- **Fora do escopo:** exibir as abas novas no card de Meus Livros, no Painel do
  Livro ou na exportação; nuvem de palavras renderizada graficamente; outras
  abas de Dados do Livro; capítulos, elenco do livro e associação livro–mundo.
- **Banco:** migração v10 em `src-tauri/src/banco/migracoes.rs`; bancos v9
  migram sem perda e os livros existentes ganham textos vazios, listas sem valor
  e nenhum humor.
- **Back-end:** `src-tauri/src/livro.rs` (campos novos, listas fechadas,
  validação e gravação transacional do humor) e `src-tauri/src/erro.rs`
  (códigos estáveis); testes em `src-tauri/src/livro/testes.rs` e
  `src-tauri/src/banco/testes.rs`.
- **Front-end:** extração de `src/componentes/DadosLivro.jsx` a partir de
  `TelaLivro.jsx`, `livrosApi.js` e `livros.css`.
- **Verificação:** novo `scripts/verificar-rf013.mjs`; ajuste do
  `verificar-rf012.mjs` (as duas abas continuam nas duas primeiras posições);
  sem regressão dos verificadores RF002–RF011.
