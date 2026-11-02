## 1. Listagem

- [x] 1.1 Colocar os cards em uma faixa horizontal com até cinco por tela e rolagem horizontal (design D1).
- [x] 1.2 Paginar a lista de cinco em cinco, com **Anterior**/**Próxima**, página atual e limite ao mudar o elenco (design D2).

## 2. Detalhe inline

- [x] 2.1 Criar `DetalhePersonagemLivro.jsx` com as três abas, `Salvar` que mantém o detalhe aberto e `Fechar` que limpa a seleção (design D3).
- [x] 2.2 Reusar `GraficoArco`/`dados_graficos_livro` na terceira aba, com estado vazio **Ainda não existem dados** (design D4).
- [x] 2.3 Renderizar o detalhe abaixo da grade/lista em `TelaPersonagensLivro.jsx` e remover `ModalPersonagemLivro.jsx` (design D3).

## 3. Verificação e fechamento

- [x] 3.1 Atualizar `verificar-rf014.mjs` para cards/paginação e detalhe inline com três abas; cobrir sete personagens (5+2) (design D5).
- [x] 3.2 Atualizar `verificar-rf015.mjs` para a aba do gráfico com um evento real (design D5).
- [x] 3.3 Rodar `npm run build`, `npm run verificar:rust`, os verificadores e `openspec validate --all`; atualizar os `AGENTS.md` e arquivar o change.
