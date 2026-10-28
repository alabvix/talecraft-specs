## Why

Dois ajustes no RF011: (1) a grade **Módulos deste livro** começa por
**Personagens**, mas o escritor quer **Dados do Livro** em primeiro; (2) o
cadastro não registra o período em que a história se passa, informação básica
para o planejamento.

## What Changes

- Reordenar os cards de **Módulos deste livro** para **Dados do Livro**,
  **Personagens**, **Capítulos**, **Worldbuilding**, **Gráficos** e **Exportar**.
- Acrescentar em **Dados Gerais** os campos de texto curto **De** e **Até**,
  que formam o **Período da História**.
- Migração **v11** aditiva com as colunas `periodo_de` e `periodo_ate` em
  `livro`.
- Nenhum comando Tauri novo e nenhuma biblioteca nova.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: a ordem dos módulos do **Painel do Livro** passa a começar
  por **Dados do Livro**; a aba **Dados Gerais** ganha o **Período da História**
  (**De** e **Até**).
- `database-foundation`: nova migração v11 aditiva com `periodo_de` e
  `periodo_ate`.

## Impact

- **Requisito coberto:** RF011 (RF011-TL003, RF011-TL004, RF011-RN018,
  RF011-CA013, RF011-CA023).
- **Fora do escopo:** validação de formato de data (o período é texto livre),
  cálculo de duração, linha do tempo e exibição do período no card de Meus
  Livros, no Painel ou na exportação.
- **Banco:** migração v11 em `src-tauri/src/banco/migracoes.rs`; bancos v10
  migram sem perda e os livros existentes ganham período vazio.
- **Back-end:** `src-tauri/src/livro.rs` e testes em
  `src-tauri/src/livro/testes.rs` e `src-tauri/src/banco/testes.rs`.
- **Front-end:** `src/componentes/DadosLivro.jsx`, `src/componentes/TelaLivro.jsx`
  e `src/livrosApi.js`.
- **Verificação:** `scripts/verificar-rf011.mjs` passa a cobrir a ordem dos
  módulos e o período (29 → 31 verificações); sem regressão dos demais.
