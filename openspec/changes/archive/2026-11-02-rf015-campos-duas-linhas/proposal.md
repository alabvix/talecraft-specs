## Why

Depois do ajuste das abas, o **Motivo do Tipo** e a **Meta** ainda ocupam três
linhas cada e o **Cenário Descritivo** continua com a altura curta de 84 px. Para
o texto que costumam receber, duas linhas bastam e o painel fica mais compacto.

## What Changes

- **Motivo do Tipo**, **Meta** e **Cenário Descritivo** passam a usar textarea
  de **duas linhas** (`rows={2}`, cerca de 62 px).
- Nova classe `.textarea--tiny` no design system; `.textarea--short` continua
  com 84 px para o **Motivo do Evento**.
- Nenhuma migração, tabela, comando ou campo novo.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: os três campos do painel do capítulo passam a ter duas
  linhas.

## Impact

- **Requisito coberto:** RF015 (RF015-TL005, RF015-RN013, RF015-CA018,
  RF015-CA019, RF015-CA021).
- **Fora do escopo:** alterar o **Motivo do Evento**, os demais campos, a
  gravação, o esquema ou os comandos.
- **Banco:** nenhuma migração; o esquema continua na v16.
- **Front-end:** `PainelCapitulo.jsx` e `livros.css`.
- **Verificação:** `verificar-rf015.mjs` passa a medir as duas linhas dos três
  campos.
