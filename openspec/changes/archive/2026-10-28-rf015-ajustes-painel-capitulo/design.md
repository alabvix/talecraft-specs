## Context

O RF015 entregou o painel de edição do capítulo com todos os campos e os
personagens do arco. O teste do usuário apontou quatro ajustes de layout e a
falta de um campo para o motivo do evento de cada personagem. O banco está na
v14.

## Goals / Non-Goals

**Goals:**

- Compactar o painel sem perder nenhum campo nem a leitura do tema ativo.
- Registrar o motivo do evento por personagem, preservando os vínculos antigos.
- Manter o comportamento de Salvar/abrir/arrastar do RF015.

**Non-Goals:**

- Alterar o mapa Evento → Tipo de Evento ou calcular o arco.
- Reordenar os campos do capítulo além do necessário para o K.O.
- Criar comando novo, exclusão de capítulo ou associação livro–mundo.

## Decisions

**D1 — Motivo como coluna de `capitulo_personagem`.** O motivo pertence ao par
capítulo–personagem, como o Evento/Tipo. A migração **v15** usa
`ALTER TABLE ... ADD COLUMN motivo TEXT NOT NULL DEFAULT ''`, sem recriar a
tabela, porque não há `CHECK` novo. Alternativa descartada: guardar o motivo em
JSON no capítulo — perderia a leitura por personagem e a simetria com Evento.

**D2 — Campo de texto curto no React, abaixo de Evento/Tipo.** O motivo é um
`textarea--short` com rótulo **Motivo do Evento**, ocupando a linha inteira do
card do personagem (`grid-column: 1 / -1`). O estado acompanha o `form` do
painel e é enviado em `personagens[].motivo` por `salvarCapitulo`.

**D3 — K.O ao lado do Punch e alturas curtas.** O grid do painel tem duas
colunas; o **Punch** fica na primeira e o **K.O** na segunda, ambos sem
`span-all`. O **K.O**, o **Motivo do Evento** e o **Cenário Descritivo** usam
`.textarea--short` (84 px), criada em `livros.css`.

**D4 — Ajuda do Tipo em quatro parágrafos.** O popup usa um `<p>` por conceito
(Ação, Suspensão, Direto e Indireto), com o rótulo em negrito. O CSS zera a
margem do último parágrafo; o popup continua aparecendo por hover e foco.

**D5 — Verificação em dois níveis.** O teste Rust cobre a migração v14 → v15 e a
ida e volta do motivo; o `verificar-rf015.mjs` mede a posição/altura do K.O e do
Cenário Descritivo, conta os parágrafos da ajuda e confere o motivo salvo.

## Risks / Trade-offs

- **Motivo vazio** → o campo é opcional, como os demais textos do capítulo; os
  vínculos anteriores continuam válidos com string vazia.
- **Altura curta** → textareas de 84 px rolam internamente; o escritor que
  precisar de mais espaço pode redimensionar? Não — o `resize` vertical continua
  desabilitado pelo design system, e o Resumo longo segue disponível para textos
  maiores.
- **Layout em duas colunas** → em telas estreitas o grid cai para uma coluna e o
  K.O volta a ficar abaixo do Punch, sem perder o campo.

## Migration Plan

1. Migração v15 em `banco/migracoes.rs`.
2. `motivo` no struct, na gravação e na leitura de `capitulo.rs`.
3. Ajustes de layout e campo no `PainelCapitulo.jsx`; `.textarea--short` no
   `livros.css`.
4. Testes Rust e `verificar-rf015.mjs`; bancos v14 migram na subida.

## Open Questions

Nenhuma.
