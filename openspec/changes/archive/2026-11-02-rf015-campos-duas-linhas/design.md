## Context

O ajuste anterior levou **Motivo do Tipo**, **Meta** e **Cenário Descritivo**
para `.textarea--short` (84 px, três linhas). O teste do usuário pediu menos
altura: duas linhas bastam para esses três campos. O banco está na v16 e este
ajuste não toca no esquema nem nos comandos.

## Goals / Non-Goals

**Goals:**

- Reduzir **Motivo do Tipo**, **Meta** e **Cenário Descritivo** para duas linhas.
- Manter o **Motivo do Evento** com três linhas e o restante do painel igual.
- Preservar a gravação e a releitura dos textos.

**Non-Goals:**

- Alterar o conteúdo, a obrigatoriedade ou a gravação dos campos.
- Criar migração, comando, tela ou aba nova.
- Mexer no **Resumo** longo ou nas abas narrativas do livro.

## Decisions

**D1 — Criar `.textarea--tiny` com 62 px.** Duas linhas de 13 px com
`line-height: 1.6`, mais o padding e a borda do design system, pedem cerca de
62 px. Não altere `.textarea--short` (84 px): ela continua sendo a altura do
**Motivo do Evento**. Alternativa descartada: reduzir `.textarea--short` para
62 px e dar outra classe ao Motivo do Evento — mudaria mais pontos sem
necessidade.

**D2 — `rows={2}` nos três campos.** O atributo mantém a altura inicial
coerente com o CSS e evita que o navegador calcule duas linhas com uma altura
diferente. Os três usam `className="textarea textarea--tiny"`.

**D3 — Cenário Descritivo entra no grupo de duas linhas.** O campo já era
curto; passa a compartilhar `.textarea--tiny` com **Motivo do Tipo** e **Meta**,
sem mudar o `id`, o estado ou o payload.

**D4 — Verificação.** O `verificar-rf015.mjs` confere classe, `rows` e altura
dos três campos (entre 50 e 70 px) e mantém as checagens de abas, ajudas,
gravação e K.O/Punch. Não há teste Rust novo.

## Risks / Trade-offs

- **Duas linhas rolam internamente** → é o comportamento pedido; o **Resumo**
  longo continua disponível para textos maiores.
- **Cenário Descritivo mais baixo** → o campo continua editável e preserva o
  texto; o verificador mede a altura e a gravação.
- **Classe nova** → `.textarea--tiny` fica restrita ao painel do capítulo e não
  altera outras telas.

## Migration Plan

1. `livros.css`: criar `.textarea--tiny` com `min-height: 62px`.
2. `PainelCapitulo.jsx`: trocar os três campos para `textarea--tiny` + `rows={2}`.
3. `scripts/verificar-rf015.mjs`: medir classe, `rows` e altura dos três.
4. Rodar `npm run build`, `npm run verificar:rust` e os verificadores; nenhum
   banco é migrado.

## Open Questions

Nenhuma.
