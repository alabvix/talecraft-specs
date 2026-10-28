## Why

O painel de edição do capítulo (RF015) ficou com o **K.O** sozinho em uma linha
inteira, a ajuda do **Tipo** em um único parágrafo corrido, o **Cenário
Descritivo** alto demais e os personagens do arco sem um campo para explicar o
motivo do evento. O escritor precisa de um formulário mais compacto e de registrar
por que cada personagem subiu, caiu ou virou no capítulo.

## What Changes

- **K.O** ao lado do **Punch**, com altura curta (os dois deixam de ocupar uma
  linha inteira).
- Ajuda do **Tipo** com uma linha por explicação: Ação, Suspensão, Direto e
  Indireto.
- **Cenário Descritivo** com altura curta.
- Cada personagem do capítulo ganha **Motivo do Evento** (texto livre) abaixo de
  Evento/Tipo de Evento.
- Migração **v15** aditiva: coluna `motivo` em `capitulo_personagem`, vazia para
  os vínculos existentes.
- Nenhum comando novo; o payload de `salvar_capitulo`/`obter_capitulo` passa a
  transportar o motivo.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: o painel de edição do capítulo ganha o Motivo do Evento e o
  layout compacto (K.O ao lado do Punch, ajuda em linhas, cenário curto).
- `database-foundation`: migração v15 acrescenta o motivo do evento.

## Impact

- **Requisito coberto:** RF015 (RF015-TL005, RF015-TL006, RF015-RN005,
  RF015-RN006, RF015-CA008, RF015-CA018).
- **Fora do escopo:** mudança de regra do evento/tipo, novos campos de arco,
  exclusão de capítulos e associação livro–mundo.
- **Banco:** migração v15 em `src-tauri/src/banco/migracoes.rs`; bancos v14
  migram sem perda e os vínculos existentes ficam com motivo vazio.
- **Back-end:** `capitulo.rs` (struct, gravação e leitura) e testes.
- **Front-end:** `PainelCapitulo.jsx` e estilos em `livros.css`.
- **Verificação:** `verificar-rf015.mjs` passa a cobrir o layout e o motivo.
