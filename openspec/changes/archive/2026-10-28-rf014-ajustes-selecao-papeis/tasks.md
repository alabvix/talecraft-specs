## 1. Banco e domínio

- [x] 1.1 Criar a migração v13 aditiva em `src-tauri/src/banco/migracoes.rs` recriando `livro_personagem` com o `CHECK` dos treze papéis, copiando os vínculos e recriando o índice (design D1).
- [x] 1.2 Ampliar `PAPEIS_PERSONAGEM_LIVRO` em `src-tauri/src/banco.rs` com **Oponente**, **Confidente**, **Figurante**, **Coprotagonista**, **Mentor**, **Herói** e **Vilão**, antes de **Não definido** (design D2).
- [x] 1.3 Acrescentar a busca por nome e a paginação a `listar_personagens_para_livro`, devolvendo `itens`, `total`, `pagina` e `porPagina` (design D3).
- [x] 1.4 Atualizar o comando `listar_personagens_para_livro` em `src-tauri/src/lib.rs` com `filtro_nome`, `pagina` e `por_pagina`.
- [x] 1.5 Testar em `src-tauri/src/livro_personagem/testes.rs` a busca, a paginação e os papéis novos, e em `src-tauri/src/banco/testes.rs` a migração v12 → v13 preservando vínculos (design D6).

## 2. Front-end

- [x] 2.1 Atualizar `src/livroPersonagensApi.js` para a lista paginada com `filtroNome`, `pagina` e `porPagina`.
- [x] 2.2 Acrescentar o campo de busca e a grade paginada em `src/componentes/ModalSelecaoPersonagens.jsx`, mantendo a seleção entre páginas e buscas e mostrando a contagem de selecionados (design D4, D5).
- [x] 2.3 Ajustar `src/livros.css` para a grade de personagens, a busca e a barra de paginação, usando apenas tokens de tema.
- [x] 2.4 Confirmar que a modal de detalhe lista os catorze valores de **Papel** sem duplicar a lista no front-end.

## 3. Verificação

- [x] 3.1 Atualizar `scripts/verificar-rf014.mjs` para criar personagens suficientes para duas páginas, exercitar a busca, marcar personagens em páginas diferentes, conferir os catorze papéis e gravar um papel novo (design D6).
- [x] 3.2 Rodar `npm run verificar:rust` e `npm run build`.
- [x] 3.3 Rodar `node scripts/verificar-rf014.mjs`, `node scripts/verificar-rf011.mjs` e os verificadores RF002–RF013 sem regressão.

## 4. Documentação e fechamento

- [x] 4.1 Atualizar o `AGENTS.md` de `talecraft-app` com a v13, a busca/paginação, os treze papéis e as armadilhas encontradas.
- [x] 4.2 Atualizar o `AGENTS.md` de `talecraft-specs` com o ajuste e o próximo passo.
- [x] 4.3 Validar com `openspec validate --all` e arquivar o change com `openspec archive "rf014-ajustes-selecao-papeis" --yes`.
