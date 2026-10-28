## Why

Na Curva de Progressão por Capítulo, os pontos não informam qual capítulo ou
Tipo representam. O escritor precisa passar o mouse e ver se o ponto é de
**Ação** ou de **Suspensão** (e o capítulo correspondente).

## What Changes

- Cada ponto da curva ganha um **tooltip** nativo com o número do capítulo e o
  Tipo: Ação, Suspensão ou Não definido.
- Uma área de hover maior que o ponto visível facilita o tooltip sem aumentar o
  desenho.
- Nenhum dado, comando ou migração muda; a alteração é só de interface.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: a Curva de Progressão passa a identificar capítulo e Tipo no
  tooltip.

## Impact

- **Requisito coberto:** RF016 (RF016-TL002, RF016-CA002, RF016-CA015).
- **Fora do escopo:** tooltip nos gráficos de personagem, clique no ponto,
  novo painel de detalhe ou exportação.
- **Front-end:** `GraficoProgressao.jsx` e `livros.css`.
- **Verificação:** `verificar-rf016.mjs` passa a conferir o texto do tooltip.
