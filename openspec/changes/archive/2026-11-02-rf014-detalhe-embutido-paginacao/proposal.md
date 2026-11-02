## Why

A seção **Personagens** do livro lista o elenco em cards ou lista sem limite de
itens por tela e abre o detalhe em uma modal. O escritor precisa de uma leitura
mais controlada do elenco (cinco por vez) e de um detalhe que permaneça visível
abaixo da lista, com os dados globais, o vínculo editável e o gráfico de evolução
separados em abas.

## What Changes

- **Cards**: faixa horizontal com no máximo cinco cards por tela e barra de
  rolagem para os demais.
- **Lista**: tabela paginada de cinco em cinco, com **Anterior**, **Próxima** e
  a página atual.
- O detalhe do personagem deixa de ser modal e passa a abrir **abaixo** da
  grade/lista, com três abas: **Dados Globais do Personagem** (somente leitura),
  **Personagem no Livro** (editável) e **Gráfico de Evolução do Personagem no
  Livro**.
- **Salvar** grava o vínculo e mantém o detalhe aberto com confirmação;
  **Fechar** fecha sem gravar. A terceira aba reusa `GraficoArco` e
  `dados_graficos_livro`.
- Nenhuma migração, comando ou campo novo.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: a listagem do elenco ganha paginação/rolagem e o detalhe
  passa de modal para painel inline em três abas.

## Impact

- **Requisito coberto:** RF014 (RF014-TL001, RF014-TL004, RF014-TL006,
  RF014-FL003, RF014-FL004, RF014-RN002, RF014-CA006, RF014-CA007, RF014-CA009,
  RF014-CA010, RF014-CA017, RF014-CA020, RF014-CA021).
- **Fora do escopo:** alterar a modal de seleção, os vínculos, o cadastro global
  ou o cálculo dos gráficos.
- **Banco:** nenhuma migração; o esquema continua na v16.
- **Back-end:** nenhum comando novo.
- **Front-end:** `TelaPersonagensLivro.jsx`, novo `DetalhePersonagemLivro.jsx`,
  remoção de `ModalPersonagemLivro.jsx` e estilos em `livros.css`.
- **Verificação:** `verificar-rf014.mjs` cobre cards/lista, paginação, detalhe
  em abas e gráfico; `verificar-rf015.mjs` cobre a aba do gráfico com dados.
