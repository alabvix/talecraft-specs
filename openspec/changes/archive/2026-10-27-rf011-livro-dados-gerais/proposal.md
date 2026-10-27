## Why

O RF010 entregou **Meus Livros** apenas em estado vazio: o botão **+ Novo Livro**
é uma promessa visual, não existe entidade de livro no banco e a página do livro
do protótipo não tem equivalente no aplicativo. Sem o livro, os módulos de
elenco, capítulos, worldbuilding, gráficos e exportação não têm contexto.

O RF011 cria o primeiro degrau do nível do livro: a página do livro com o seu
menu lateral, o **Painel do Livro** e a página **Dados do Livro** com o
componente **Tab Panel**, persistindo o livro e os seus dados gerais.

## What Changes

- Nova entidade **Livro** persistida em SQLite (migração v7 aditiva), com
  título único e obrigatório, gênero principal, subgêneros, faixa de público e
  idioma.
- **+ Novo Livro** passa a abrir a página do livro em modo de criação; o livro
  só é gravado ao salvar um título válido.
- Nova **página do livro** com faixa do livro aberto, breadcrumb e menu lateral
  próprio na ordem **Painel do Livro**, **Dados do Livro**, **Personagens**,
  **Capítulos**, **Worldbuilding**, grupo **Análise** (**Gráficos** e
  **Exportar**) e **Início — Sair do livro**.
- Novo **Painel do Livro** com título, dados resumidos, métricas zeradas, grade
  de módulos e atalho para **Dados do Livro**.
- Nova página **Dados do Livro** com o componente reutilizável **Tab Panel**,
  nesta entrega com a aba **Dados Gerais**.
- **Meus Livros** passa a listar os livros reais, com busca por título,
  alternância **Grade/Lista**, badge de resultados e métricas atualizadas.
- As seções de personagens do livro, capítulos, worldbuilding, gráficos e
  exportação continuam fora do escopo: existem no menu e abrem uma tela
  informativa de requisito posterior.
- Novos comandos Tauri de livros e listas fechadas; nenhuma biblioteca nova.

## Capabilities

### New Capabilities

- `book-workspace`: página do livro, faixa do livro aberto, menu lateral do
  livro, Painel do Livro, navegação entre seções e página Dados do Livro com o
  Tab Panel e a aba Dados Gerais.

### Modified Capabilities

- `book-library`: a tela Meus Livros deixa de ser somente estado vazio e passa a
  listar livros reais, com busca, grade/lista e métricas; o botão **+ Novo
  Livro** passa a abrir a página do livro.
- `database-foundation`: nova migração v7 aditiva com as tabelas `livro` e
  `livro_subgenero`.
- `rust-bridge`: novos comandos Tauri de listagem, leitura, gravação, listas
  fechadas e estatísticas de livros.

## Impact

- **Requisito coberto:** RF011 (RF011-TL001 a RF011-TL006, RF011-FL001 a
  RF011-FL009, RF011-RN001 a RF011-RN016, RF011-CA001 a RF011-CA022).
- **Fora do escopo:** elenco do livro e vínculo personagem–livro, capítulos,
  associação livro–mundo, gráficos, exportação do livro, exclusão de livro,
  importação `.pdc` e abas futuras de Dados do Livro.
- **Banco:** migração v7 em `src-tauri/src/banco/migracoes.rs`; bancos v6 migram
  sem perda de dados.
- **Back-end:** novo módulo `src-tauri/src/livro.rs` com testes em
  `src-tauri/src/livro/testes.rs`; cinco comandos novos no `invoke_handler`.
- **Front-end:** `livrosApi.js`, `livros.js`, `livros.css`, `TelaLivro.jsx`,
  `SidebarLivro.jsx`, `Bookband.jsx`, `PainelAbas.jsx`; `TelaLivros.jsx` e
  `App.jsx` ajustados.
- **Verificação:** novo `scripts/verificar-rf011.mjs`, sem regressão dos
  verificadores RF002–RF010.
