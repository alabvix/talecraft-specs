## Context

O RF015 entregou o painel do capítulo com o K.O como textarea curto e sem o
motivo do Tipo. O banco está na v15. O requisito pede que o K.O tenha a mesma
altura do Punch e que o Motivo do Tipo fique logo abaixo do Tipo.

## Goals / Non-Goals

**Goals:**

- Igualar visualmente K.O e Punch, sem mudar o restante do grid.
- Guardar o Motivo do Tipo por capítulo.
- Preservar os capítulos existentes com motivo vazio.

**Non-Goals:**

- Alterar a lista fechada de Tipos.
- Tornar o Motivo do Tipo obrigatório.
- Criar comando, tabela ou tela nova.

## Decisions

**D1 — K.O como `input`.** O Punch é um `input.input`; o K.O passa a usar o
mesmo controle e a mesma classe, garantindo altura idêntica. Alternativa
descartada: manter `textarea` com `min-height` igual à altura do input — o
padding e a linha de base do textarea variam entre temas e a igualdade não era
confiável.

**D2 — Motivo do Tipo como `textarea--medium` span-all.** O campo fica depois de
Tipo/Foreshadowing e ocupa a linha inteira, com a altura média do design system
(140 px). O estado acompanha o `form` e é enviado em `motivoTipo`.

**D3 — Migração v16 aditiva.** `ALTER TABLE capitulo ADD COLUMN motivo_tipo TEXT
NOT NULL DEFAULT ''`; não há `CHECK` novo, então não é preciso recriar a tabela.
Bancos v15 migram sem perda.

**D4 — Verificação.** O teste Rust cobre a ida e volta do motivo e a migração
v15 → v16; o `verificar-rf015.mjs` mede a altura do K.O contra o Punch, confere
o campo e o valor salvo.

## Risks / Trade-offs

- **K.O como input** → deixa de aceitar quebras de linha; é o comportamento
  esperado para um texto curto e resolve a igualdade de altura.
- **Texto médio** → o Motivo do Tipo ocupa 140 px, como os demais textos médios;
  o Resumo longo continua disponível para textos maiores.

## Migration Plan

1. Migração v16 em `banco/migracoes.rs`.
2. `motivo_tipo` no struct, na gravação e na leitura de `capitulo.rs`.
3. Campo no `PainelCapitulo.jsx` e K.O como input.
4. Testes e verificador; bancos v15 migram na subida.

## Open Questions

Nenhuma.
