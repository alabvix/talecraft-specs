## Why

A listagem do elenco não mostra em quais capítulos cada personagem aparece e o
detalhe ainda tem um botão rotulado **Fechar**. O escritor precisa enxergar a
participação no livro direto no card/linha, saber qual item está aberto e fechar
o detalhe sem um botão extra.

## What Changes

- Cada card e cada linha passam a mostrar **Qtd Capítulos** (total) e
  **Capítulos** (números em ordem, como `1,3,4`).
- O card/linha do personagem selecionado fica destacado.
- O botão **Fechar** do rodapé do detalhe é removido; o fechamento continua pelo
  **ícone X** do cabeçalho.
- O back-end de `listar_personagens_do_livro` passa a devolver
  `totalCapitulos` e `capitulos` (números), lidos de
  `capitulo_personagem`/`capitulo` do livro.
- Nenhuma migração, tabela ou comando novo.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: a listagem do elenco ganha os capítulos por personagem e o
  destaque do selecionado; o detalhe perde o botão **Fechar**.

## Impact

- **Requisito coberto:** RF014 (RF014-TL001, RF014-TL004, RF014-TL006,
  RF014-CA007, RF014-CA010, RF014-CA017, RF014-CA020, RF014-CA022,
  RF014-CA023).
- **Fora do escopo:** alterar a gravação de capítulos, a modal de seleção ou o
  cálculo dos gráficos.
- **Banco:** nenhuma migração; o esquema continua na v16.
- **Back-end:** `livro_personagem.rs` (struct e consulta) e testes; nenhum
  comando novo.
- **Front-end:** `TelaPersonagensLivro.jsx`, `DetalhePersonagemLivro.jsx` e
  `livros.css`.
- **Verificação:** `verificar-rf014.mjs` cobre os capítulos no card/linha, o
  destaque e a ausência do botão **Fechar**; a suíte Rust ganha o caso dos
  números em ordem.
