## Why

O livro já tem dados, personagens e worldbuilding, mas a seção **Capítulos**
ainda abre a tela informativa de requisito posterior. O escritor precisa
planejar a estrutura da história por status, criar capítulos em cada etapa,
editar os dados das cenas e acompanhar o arco dos personagens em cada capítulo.

## What Changes

- Substituir a tela informativa de **Capítulos** pelo **quadro de status** com
  Esboço, Rascunho, Revisão e Finalizado, em colunas fixas com rolagem.
- Criar capítulos pelo **Novo Capítulo** (Esboço) e pelo **Adicionar Capítulo**
  do rodapé de cada coluna (status da coluna).
- Ordernar cada coluna por **Número** ou **Data de Criação**, em ordem
  ascendente/descendente.
- Abrir o **painel de edição** abaixo do quadro ao clicar em um capítulo, com
  **Salvar** no cabeçalho e todos os campos do requisito, incluindo os
  personagens com Evento e Tipo de Evento.
- Arrastar capítulos entre as colunas para mudar o status.
- Migração **v14** aditiva com `capitulo` e `capitulo_personagem`.
- Atualizar as métricas **Capítulos planejados** e o total de capítulos da ficha
  global do personagem.
- Seis comandos Tauri novos (55 no total).

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: nova seção real de **Capítulos** e remoção dela das seções
  futuras.
- `database-foundation`: migração v14 com as tabelas de capítulo e personagens
  do capítulo.
- `character-library`: o total de capítulos da ficha global passa a contar os
  capítulos reais.

## Impact

- **Requisito coberto:** RF015 (RF015-TL001 a RF015-TL006, RF015-FL001 a
  RF015-FL005, RF015-RN001 a RF015-RN012, RF015-CA001 a RF015-CA017).
- **Fora do escopo:** exclusão de capítulos, cenas internas, POV separado,
  curva de arco desenhada, associação livro–mundo (o campo de cenário fica sem
  opções até ela existir) e exportação de capítulos.
- **Banco:** migração v14 em `src-tauri/src/banco/migracoes.rs`; bancos v13
  migram sem perda.
- **Back-end:** `src-tauri/src/capitulo.rs`, `src-tauri/src/banco.rs`,
  `src-tauri/src/erro.rs`, `src-tauri/src/lib.rs`, `src-tauri/src/livro.rs` e
  `src-tauri/src/livro_personagem.rs`.
- **Front-end:** `TelaCapitulosLivro.jsx`, `PainelCapitulo.jsx`,
  `capitulosApi.js`, `TelaLivro.jsx`, `TelaPersonagem.jsx`, `livros.js` e
  `livros.css`.
- **Verificação:** novo `scripts/verificar-rf015.mjs`; `verificar-rf011.mjs`
  passa a esperar o quadro real e `verificar-rf014.mjs` o total real.
