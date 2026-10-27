# Proposal: RF010 — Meus Livros com estado inicial vazio

## Why

A primeira versão do RF010 usava os dados fictícios do protótipo (quatro livros,
personagens e contadores). Como o domínio de Livros ainda não possui cadastro nem
registros, a tela deve representar o **estado inicial real**: métricas zeradas,
nenhum livro na listagem e nenhum personagem compartilhado.

## What Changes

- Zerar as quatro métricas da tela.
- Remover os cards de livros de demonstração e o card tracejado **Novo livro**.
- Exibir estado vazio em **Todos os livros**.
- Manter o painel **Personagens que atravessam livros**, mas sem linhas.
- Remover os dados fictícios, imagens de demonstração e o arquivo de demo do
  app.
- Manter apenas o botão **+ Novo Livro**, sem importação `.pdc`, cadastro,
  banco ou navegação de livro.

## Out of Scope

- Cadastro, edição, exclusão ou detalhe de livro.
- Entidade Livro, banco, migração ou comando Tauri.
- Dados reais de livros, personagens compartilhados ou contadores.
