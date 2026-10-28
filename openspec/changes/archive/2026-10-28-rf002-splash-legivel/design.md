## Context

A splash do RF002 é um overlay React exibido enquanto `App` carrega o banco. Como
o `estado_inicial` responde em poucos milissegundos, o overlay aparece e some
quase no mesmo quadro; além disso, antes de o CSS ser carregado a janela do
WebView2 pinta o fundo branco padrão. O layout atual empilha ícone, nome e
versão, com o ícone em 96 px.

## Goals / Non-Goals

**Goals:**

- Exibir a splash por pelo menos 1,2 s, mesmo com a inicialização rápida.
- Evitar a tela branca antes do React/CSS, usando a cor-base do tema.
- Mostrar ícone grande, nome ao lado e versão abaixo em fonte menor.
- Medir geometria, fonte, fundo e duração no `verificar-rf002.mjs`.

**Non-Goals:**

- Trocar ou vetorizar o ícone do aplicativo (decisão do usuário: manter o atual).
- Criar barra de progresso, splash nativa do Tauri ou animação elaborada.
- Alterar o tempo de inicialização do banco ou a ordem dos comandos.

## Decisions

**D1 — Tempo mínimo via `Promise.all`.** Em `App`, o `carregarDados` continua
sendo a fonte da verdade; junto dele corre um `setTimeout` de 1,2 s e o
`Promise.all` só libera a aplicação quando os dois terminam. Alternativa
descartada: atrasar o `estado_inicial` — mascararia o tempo real e atrasaria
diagnósticos de falha.

**D2 — Layout em duas linhas.** `.splash__marca` é uma linha flex com o ícone
(128 px) e o nome (46 px); `.splash__versao` fica abaixo, em 13 px. O nome
grande ao lado do ícone dá a leitura de "marca + produto" e a versão fica
secundária. O indicador "Carregando…" continua discreto abaixo da versão.

**D3 — Fundo sem piscada em duas camadas.** O CSS crítico em `index.html`
(`html, body { background:#0f1218 }`) cobre o intervalo antes do bundle; o
`backgroundColor` da janela em `tauri.conf.json` cobre o intervalo antes de o
WebView pintar qualquer HTML. A cor é a `--bg-base` do tema padrão Blade Byte;
em Tundra a splash assume o papel claro pelo CSS normal. O `tauri.conf.json`
exige recompilar o binário (contexto embutido).

**D4 — Verificação pela geometria e pelo relógio.** O observador do
`verificar-rf002.mjs` passa a guardar: `getBoundingClientRect` do ícone, do nome
e da versão (nome à direita do ícone; versão abaixo dos dois), o `font-size`
relativo e o `performance.now()` da entrada/saída da splash. O teste exige pelo
menos 1 s de splash visível e fundo `rgb(15, 18, 24)`. Tolerância de 200 ms
para o tempo mínimo de 1,2 s.

## Risks / Trade-offs

- **Abertura 1,2 s mais lenta** → é o custo de uma splash legível; o banco pode
  carregar em paralelo e o usuário não espera duas vezes.
- **Fundo escuro antes do tema Tundra** → a splash clara cobre o fundo logo em
  seguida; a alternativa (branco) era o defeito.
- **Tauri recompila** → o `backgroundColor` é parte do contexto; o build de
  release também precisa ser refeito para o usuário ver o efeito.
- **Medição no Edge** → o verificador do RF002 roda o front-end no Edge, não no
  Tauri; ele valida a splash e o CSS crítico, mas o `backgroundColor` da janela
  é validado pelo build/`tauri dev`.

## Migration Plan

1. Ajustar `Splash.jsx` e o CSS.
2. Adicionar o piso de 1,2 s no `App`.
3. Adicionar o CSS crítico no `index.html` e o `backgroundColor` no
   `tauri.conf.json`.
4. Atualizar o `verificar-rf002.mjs`; recompilar o binário para o teste visual.

## Open Questions

Nenhuma. O ícone atual permanece; o tempo mínimo e a cor de fundo foram
definidos nesta mudança.
