## Why

No painel do capítulo, o **K.O** ainda fica mais alto que o **Punch** e não
existe um lugar para explicar por que o capítulo recebeu determinado **Tipo**.
O escritor precisa igualar a altura dos dois campos e registrar o motivo do
Tipo junto ao capítulo.

## What Changes

- O **K.O** passa a usar o mesmo controle e a mesma altura do **Punch**.
- Novo campo **Motivo do Tipo** (texto médio) logo abaixo do Tipo.
- Migração **v16** aditiva: coluna `motivo_tipo` em `capitulo`, vazia para os
  capítulos existentes.
- Nenhum comando novo; `salvar_capitulo`/`obter_capitulo` passam a transportar o
  motivo do Tipo.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: o painel do capítulo ganha o Motivo do Tipo e o K.O com a
  altura do Punch.
- `database-foundation`: migração v16 acrescenta o motivo do Tipo.

## Impact

- **Requisito coberto:** RF015 (RF015-TL005, RF015-RN006, RF015-CA018,
  RF015-CA019).
- **Fora do escopo:** mudar a lista de Tipos, o Evento dos personagens ou a
  lógica do quadro.
- **Banco:** migração v16 em `src-tauri/src/banco/migracoes.rs`; bancos v15
  migram sem perda e os capítulos existentes ficam com motivo vazio.
- **Back-end:** `capitulo.rs` e testes.
- **Front-end:** `PainelCapitulo.jsx`.
- **Verificação:** `verificar-rf015.mjs` cobre altura do K.O, o campo e a
  gravação do motivo.
