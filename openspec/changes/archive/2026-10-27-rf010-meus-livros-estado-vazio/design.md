# Design: RF010 — Meus Livros com estado inicial vazio

## Context

O RF010 entregou a tela Meus Livros com dados de demonstração do protótipo. Como
não existe cadastro nem entidade Livro, esses dados não representam o estado real
do aplicativo. A tela deve ser uma interface de estado vazio até o requisito de
cadastro/listagem.

## Goals / Non-Goals

**Goals:**

- Mostrar as quatro métricas com valor **0**.
- Mostrar a seção **Todos os livros** com **0 resultados** e estado vazio.
- Manter o painel de personagens com título e link, mas sem linhas.
- Remover dados fictícios, imagens de demonstração e card **Novo livro**.
- Manter o botão **+ Novo Livro** sem cadastro/navegação.

**Non-Goals:**

- Cadastro/detalhe de livro.
- Banco, migração, comando Tauri ou entidade Livro.
- Dados reais ou filtragem real de busca.

## Decisions

### D1 — Estado vazio local

`TelaLivros.jsx` define as métricas zeradas e usa estado vazio. Não há
`livrosDemo.js` nem imagens de demonstração. Quando o requisito de cadastro
chegar, a fonte de dados será substituída pela API/banco.

### D2 — Sem cards e sem card Novo livro

A listagem vazia exibe uma mensagem de estado vazio. O único acesso ao novo livro
é o botão **+ Novo Livro** no cabeçalho, alinhado ao escopo do RF010.

### D3 — Painel de personagens vazio

O painel **Personagens que atravessam livros** permanece como elemento visual,
com o link **Ver biblioteca completa**, mas sem `.dataline` enquanto não houver
dados. Não há dados fictícios de personagens.

### D4 — Sem Rust/SQLite

Nenhuma alteração em `src-tauri`, migrações, tabelas ou comandos. A mudança é
somente no front-end e na verificação.

### D5 — Verificação

`scripts/verificar-rf010.mjs` passa a conferir métricas zeradas, ausência de
cards, estado vazio, painel vazio, ausência de dados fictícios, botão e link. A
regressão cobre RF002–RF009.
