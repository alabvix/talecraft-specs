## Context

O painel do capítulo já carrega `listar_personagens_do_livro`, que devolve
`retrato` além de `nome` e `papel`. A tela de Personagens do livro já usa
`urlRetrato(retrato, diretorioDados)` para transformar o caminho relativo em URL
de asset. O painel do capítulo ainda não recebe `diretorioDados`. O banco está na
v16; o ajuste é só de apresentação.

## Goals / Non-Goals

**Goals:**

- Mostrar uma miniatura quadrada do retrato antes do nome de cada personagem.
- Reservar o mesmo espaço com um quadrado vazio quando não houver retrato.
- Manter nome, papel e campos alinhados.

**Non-Goals:**

- Enviar, trocar ou recortar retrato pelo capítulo.
- Alterar `personagem_global`, `livro_personagem` ou o payload do capítulo.
- Criar componente de upload ou nova tela.

## Decisions

**D1 — Reusar `.portrait--xs .portrait--square`.** O design system já tem a
miniatura de 34 px quadrada, com borda, fundo e `object-fit: cover`. O painel
renderiza `<div class="portrait portrait--xs portrait--square">` com `<img>`
quando há URL; sem URL, deixa a `div` vazia — o fundo e a borda formam o
quadrado vazio, sem as iniciais do `.portrait__fallback`. Alternativa
descartada: criar uma classe de avatar nova — duplicaria tamanho, borda e
recorte que já existem.

**D2 — Passar `diretorioDados` pela cadeia da página do livro.** `TelaLivro` já
recebe `diretorioDados` do `App` e o repassa ao elenco; passa também a
`TelaCapitulosLivro`, que repassa a `PainelCapitulo`. O painel usa
`urlRetrato(vinculo?.retrato, diretorioDados)` para montar a URL. Sem o
diretório, a imagem não carrega e o quadrado vazio é exibido.

**D3 — Identidade em uma célula do grid.** Avatar e nome ficam num wrapper
`.chapterchar__identidade` (`display:flex`, `gap:8px`), que ocupa a primeira
coluna do `.chapterchar__row`. O `padding-bottom` que alinhava o nome passa para
o wrapper; o avatar não desloca as colunas de Evento/Tipo.

**D4 — Verificação.** O `verificar-rf015.mjs` associa
`tests/fixtures/iara-vasquez.jpg` à Iara com `associar_retrato` antes de abrir
**Capítulos**, espera a imagem ficar `complete` com `naturalWidth > 0` e confere
que o Kael, sem retrato, tem o quadrado vazio de 34 × 34 px.

## Risks / Trade-offs

- **Imagem quebrada em disco** → o `<img>` mostraria o ícone de imagem quebrada;
  os retratos são copiados e validados no cadastro (RF004), então o caminho
  relativo aponta para um arquivo existente.
- **Carregamento assíncrono** → o E2E espera `naturalWidth > 0`, como os testes
  do RF004, em vez de medir imediatamente.
- **Sem retrato** → o quadrado vazio mantém o alinhamento, mas não identifica
  iniciais; é o comportamento pedido.

## Migration Plan

1. `TelaLivro.jsx` e `TelaCapitulosLivro.jsx`: repassar `diretorioDados`.
2. `PainelCapitulo.jsx`: importar `urlRetrato`, montar a miniatura e o wrapper.
3. `livros.css`: estilo `.chapterchar__identidade`.
4. `scripts/verificar-rf015.mjs`: fixture, imagem carregada e quadrado vazio.
5. Rodar build, testes Rust e verificadores; nenhum banco é migrado.

## Open Questions

Nenhuma.
