## Why

O RF011 entregou a página **Dados do Livro** com uma única aba, **Dados Gerais**,
e um botão **Descartar** que não tem utilidade no fluxo do escritor. Falta o
espaço onde o livro é sintetizado: o resumo da história e o seu final. Sem esses
campos, o planejamento do livro não registra o que o livro conta nem como ele
termina.

## What Changes

- Nova aba **Resumo** no Tab Panel de **Dados do Livro**, depois de **Dados
  Gerais**.
- Dois campos de texto longo na aba **Resumo**: **Resumo** e **Final do Livro**,
  ambos opcionais, com quebras de linha preservadas.
- Os textos passam a fazer parte do registro do livro: migração **v9** aditiva
  com as colunas `resumo` e `final_livro`.
- **Salvar** grava os dados gerais, os subgêneros e os dois textos na mesma
  transação; a edição pendente é preservada ao alternar entre as abas.
- **BREAKING (interface):** o botão **Descartar** é removido da página Dados do
  Livro, assim como o fluxo **RF011-FL005**. Não é criada ação equivalente.
- Nenhum comando Tauri novo: `obter_livro` e `salvar_livro` passam a transportar
  os dois campos.
- Nenhuma biblioteca nova.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: a página **Dados do Livro** passa a ter as abas **Dados
  Gerais** e **Resumo**; o botão **Descartar** é removido; a aba **Resumo**
  ganha os campos **Resumo** e **Final do Livro**.
- `database-foundation`: nova migração v9 aditiva com as colunas `resumo` e
  `final_livro` na tabela `livro`.

## Impact

- **Requisito coberto:** RF012 (RF012-TL001 a RF012-TL003, RF012-FL001 a
  RF012-FL005, RF012-RN001 a RF012-RN008, RF012-CA001 a RF012-CA009).
- **Requisitos revogados:** RF011-TL004 (botões **Descartar** e **Salvar**) e
  RF011-FL005 (descartar alterações), no que se refere ao **Descartar**.
- **Fora do escopo:** exibir o resumo no card de Meus Livros, no Painel do Livro
  ou na exportação; outras abas de Dados do Livro; importação `.pdc`; exclusão
  de livro.
- **Banco:** migração v9 em `src-tauri/src/banco/migracoes.rs`; bancos v8 migram
  sem perda de dados e os livros existentes passam a ter textos vazios.
- **Back-end:** `src-tauri/src/livro.rs` (campos `resumo` e `final_livro` em
  `Livro`, leitura e gravação) e testes em `src-tauri/src/livro/testes.rs` e
  `src-tauri/src/banco/testes.rs`.
- **Front-end:** `livrosApi.js` (livro vazio), `componentes/TelaLivro.jsx`
  (duas abas, campos novos e remoção do **Descartar**) e `livros.css`.
- **Verificação:** novo `scripts/verificar-rf012.mjs` e ajuste do
  `scripts/verificar-rf011.mjs` para a ausência do **Descartar**; sem regressão
  dos verificadores RF002–RF010.
