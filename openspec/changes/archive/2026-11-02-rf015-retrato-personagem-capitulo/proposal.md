## Why

A aba **Personagens do Capítulo** mostra nome e papel, mas continua textual. Uma
miniatura do retrato antes do nome deixa a identificação mais visual e ajuda o
escritor a reconhecer o personagem rapidamente. Quem não tem retrato precisa
manter o alinhamento, então o espaço é reservado por um quadrado vazio.

## What Changes

- Cada personagem da aba **Personagens do Capítulo** ganha uma miniatura
  quadrada do retrato antes do nome.
- Sem retrato, um quadrado vazio do mesmo tamanho ocupa o espaço — sem iniciais.
- O painel recebe `diretorioDados` para resolver o caminho relativo do retrato
  com `urlRetrato`/`convertFileSrc`, como as demais telas.
- Nenhuma migração, comando ou alteração no cadastro global.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: a aba **Personagens do Capítulo** mostra a miniatura antes
  do nome e reserva um quadrado vazio quando não há retrato.

## Impact

- **Requisito coberto:** RF015 (RF015-TL005, RF015-RN017, RF015-CA017,
  RF015-CA024).
- **Fora do escopo:** alterar ou enviar retrato pelo capítulo, mudar o cadastro
  global, redimensionar a seção Personagens do livro.
- **Banco:** nenhuma migração; o esquema continua na v16.
- **Back-end:** nenhum comando novo; `listar_personagens_do_livro` já devolve
  `retrato`.
- **Front-end:** `TelaLivro.jsx`, `TelaCapitulosLivro.jsx`, `PainelCapitulo.jsx`
  e `livros.css`.
- **Verificação:** `verificar-rf015.mjs` associa o retrato de fixture à Iara,
  confere a imagem carregada e o quadrado vazio do Kael.
