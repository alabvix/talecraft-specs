## Why

Dois detalhes do RF014 ficaram para trás: o card da lista global ainda mostra
**0 livros** fixo, mesmo com o personagem vinculado, e o nome do livro no painel
**Vínculos com Livros** é texto puro, sem levar à página do livro.

## What Changes

- Exibir no rodapé de cada card da lista global a **quantidade real de livros**
  vinculados ao personagem (`0 livros` quando não houver).
- Tornar o **nome do livro** no painel **Vínculos com Livros** um **link** que
  abre a página daquele livro.
- Incluir `totalLivros` na leitura dos personagens (`listar_personagens` e
  `obter_personagem`), calculado por `livro_personagem`.
- Nenhum comando novo e nenhuma migração.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `character-library`: a lista global mostra a contagem de livros no card e o
  painel de vínculos abre o livro ao clicar no nome.

## Impact

- **Requisito coberto:** RF014 (RF014-TL007, RF014-RN015, RF014-CA018).
- **Fora do escopo:** criar um filtro por livro na tela principal, listar os
  nomes dos livros no card (a ficha já os mostra) e editar/remover o vínculo
  pela ficha global.
- **Banco:** nenhuma migração; a contagem usa `livro_personagem`.
- **Back-end:** `src-tauri/src/personagem.rs` (campo `total_livros` nas
  leituras) e testes.
- **Front-end:** `TelaPersonagens.jsx`, `TelaPersonagem.jsx`, `App.jsx` e
  `personagensApi.js`.
- **Verificação:** `scripts/verificar-rf014.mjs` confere a contagem no card e o
  clique no nome do livro; sem regressão dos demais verificadores.
