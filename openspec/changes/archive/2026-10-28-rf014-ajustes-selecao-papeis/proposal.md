## Why

Com a biblioteca global crescendo, a modal de seleção do RF014 fica longa: o
escritor precisa rolar uma lista vertical para achar um personagem. Além disso,
a lista fechada de **Papel** ficou curta para a variedade de funções narrativas
que o planejamento do livro usa.

## What Changes

- Acrescentar à modal de seleção um **campo de busca por nome** e organizar os
  personagens em uma **grade paginada** (12 por página), mantendo a seleção
  marcada ao trocar de página ou de busca.
- Ampliar a lista fechada de **Papel** com **Oponente**, **Confidente**,
  **Figurante**, **Coprotagonista**, **Mentor**, **Herói** e **Vilão**, além dos
  seis valores existentes e do vazio **Não definido** (14 opções).
- Migração **v13** aditiva que recria `livro_personagem` com o `CHECK` ampliado,
  copiando os vínculos existentes.
- Nenhuma biblioteca nova; os comandos do RF014 continuam, com paginação e busca
  em `listar_personagens_para_livro`.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: a modal de seleção ganha busca e grade paginada; a lista de
  **Papel** passa a ter treze valores.
- `database-foundation`: nova migração v13 que amplia o `CHECK` do **Papel** de
  `livro_personagem`.

## Impact

- **Requisito coberto:** RF014 (RF014-TL003, RF014-RN004, RF014-RN014,
  RF014-CA003, RF014-CA008).
- **Fora do escopo:** busca por outros campos, ordenação manual da grade,
  filtros por papel/raça, alterar a listagem do elenco do livro e desvincular.
- **Banco:** migração v13 em `src-tauri/src/banco/migracoes.rs`; bancos v12
  migram preservando os vínculos.
- **Back-end:** `src-tauri/src/livro_personagem.rs` (lista paginada com busca),
  `src-tauri/src/banco.rs` (lista de papéis) e `src-tauri/src/lib.rs` (assinatura
  do comando).
- **Front-end:** `src/componentes/ModalSelecaoPersonagens.jsx`,
  `src/livroPersonagensApi.js` e `src/livros.css`.
- **Verificação:** `scripts/verificar-rf014.mjs` cobre busca, paginação, seleção
  entre páginas e os treze papéis; sem regressão dos demais verificadores.
