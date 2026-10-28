## Context

A Curva de Progressão (RF016) já desenha os pontos, mas eles não têm rótulo
individual nem interação. O usuário pediu um tooltip ao passar o mouse,
indicando Ação ou Suspensão. Não há mudança de dados.

## Goals / Non-Goals

**Goals:**

- Mostrar capítulo e Tipo ao passar o mouse em qualquer ponto da curva.
- Manter o desenho atual e o funcionamento por teclado/leitor de tela do SVG.

**Non-Goals:**

- Criar tooltip nos gráficos de personagem.
- Abrir detalhe, navegar ou gravar ao clicar no ponto.
- Adicionar biblioteca de gráficos ou de tooltip.

## Decisions

**D1 — `<title>` nativo do SVG.** Cada ponto é um `<g>` com um `<title>` no
formato `Cap. N · Tipo`. O WebView2 mostra o tooltip nativo ao passar o mouse,
sem JavaScript, biblioteca ou camada posicionada. Alternativa descartada:
`div` flutuante com `mousemove` — mais código, mais estado e mais chance de
desalinhar no redimensionamento.

**D2 — Área de hover maior que o ponto.** O ponto visível continua com raio
2,6; um círculo transparente de raio 10, com `pointer-events: all`, fica no
mesmo grupo e facilita acertar o ponto. O `<title>` do grupo vale para os dois.

**D3 — Texto com o Tipo completo.** O tooltip mostra `Cap. 3 · Ação Direta` ou
`Cap. 4 · Suspensão Indireta`; para o capítulo sem tipo, `Cap. 4 · Não
definido`. O prefixo “Ação”/“Suspensão” aparece no texto e atende ao pedido.

**D4 — Verificação pelo DOM.** O `verificar-rf016.mjs` lê o `textContent` do
`<title>` de cada grupo e confere os capítulos de Ação, Suspensão e Não
definido.

## Risks / Trade-offs

- **Tooltip nativo** → o atraso e o estilo são do sistema/WebView2; não dá para
  personalizar a caixa. Em troca, é acessível e não adiciona dependência.
- **Raio de 10** → em gráficos muito densos as áreas podem se sobrepor; o
  capítulo mais próximo ainda é alcançável, e o eixo X continua legível.

## Migration Plan

1. Ajustar `GraficoProgressao.jsx` e o CSS do hit area.
2. Atualizar o verificador e a documentação.
3. Nenhuma migração ou comando novo.

## Open Questions

Nenhuma.
