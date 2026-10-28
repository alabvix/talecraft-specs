## Context

O ajuste anterior trouxe `fullscreen: true`; o modo fullscreen puro remove a
barra de título e cobre a barra de tarefas, o que não é o comportamento pedido
agora. A janela continua configurada em `src-tauri/tauri.conf.json`, com
`width`, `height`, `minWidth`, `minHeight`, `resizable` e `center`.

## Goals / Non-Goals

**Goals:**

- Abrir a janela principal maximizada em toda execução.
- Manter a barra de título nativa e a barra de tarefas visíveis.
- Validar o estado da janela pelo viewport e pela moldura.

**Non-Goals:**

- Tela cheia pura.
- Atalho para alternar entre maximizado e janela normal.
- Lembrar monitor, posição ou tamanho anterior.

## Decisions

**D1 — `maximized: true` e remover `fullscreen`.** `maximized` é a propriedade
nativa do Tauri 2 para ocupar a área útil mantendo as decorações da janela. O
`fullscreen` é removido para não esconder a barra de título. Alternativa
descartada: `fullscreen: true` + `decorations: true` — no Windows o fullscreen
continua escondendo a barra de título.

**D2 — Área útil, não a tela inteira.** A janela maximizada respeita a barra de
tarefas. Se o usuário quiser esconder a barra de tarefas, isso é um requisito
próprio (tela cheia pura).

**D3 — Verificação pela moldura.** `innerWidth` deve coincidir com
`screen.width`, e `screen.availHeight - innerHeight` deve ficar entre 10 e 80 px
(barra de título). Em tela cheia pura a diferença seria negativa, porque o
viewport cobriria a tela inteira. O WebView2 informa `outerHeight == innerHeight`,
então a moldura é inferida pela área útil, não por `outerHeight`.

## Risks / Trade-offs

- **Barra de tarefas visível** → a janela não cobre a barra de tarefas. É o preço
  de manter a barra de título e o comportamento padrão do Windows.
- **Estado da janela não é lembrado** → se o usuário restaurar a janela, a
  próxima execução volta maximizada; isso é intencional.
- **DPI/monitor** → as medidas são feitas em pixels CSS; a comparação usa
  tolerância de 2 px.

## Migration Plan

1. Trocar `"fullscreen": true` por `"maximized": true` em `tauri.conf.json`.
2. Renomear o verificador para `verificar-janela-maximizada.mjs` e ajustar as
   asserções.
3. Não há migração de banco, comando novo nem mudança no front-end.

## Open Questions

Nenhuma. Se depois o escritor quiser esconder a barra de tarefas mantendo a
barra de título, será necessário um requisito de janela sem borda com barra
customizada.
