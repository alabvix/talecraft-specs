## Why

O painel de edição do capítulo (RF015) cresceu com os ajustes anteriores e hoje
mistura, na mesma rolagem, os dados do capítulo e os personagens do arco. Os
campos **Motivo do Tipo** e **Meta** usam a altura média de 140 px, maior do que
o texto que costumam receber, e os campos **Evento** e **Tipo de Evento** não
têm a ajuda que o **Tipo** já oferece. O escritor precisa de um painel mais
organizado e de entender o significado de cada evento sem consultar o requisito.

## What Changes

- O painel de edição do capítulo passa a ter **duas abas**: **Dados do
  Capítulo**, com os campos do **Número** até o **Resumo**, e **Personagens do
  Capítulo**, com os personagens do arco. O **Salvar** do cabeçalho continua
  comum às duas abas.
- **Motivo do Tipo** e **Meta** passam a ser textos de **três linhas**, menores
  que o texto médio atual.
- Os campos **Evento** e **Tipo de Evento** de cada personagem ganham o botão
  **?** ao lado do rótulo, no padrão do **Tipo**, com as legendas de Ponto de
  Ligação, Ponto de Virada, Ascensão, Declínio, Apogeu e Queda.
- Nenhuma migração, tabela, comando ou campo novo: o payload de
  `salvar_capitulo`/`obter_capitulo` continua o mesmo.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: o painel de edição do capítulo ganha as duas abas, os textos
  de três linhas e as ajudas de Evento e Tipo de Evento.

## Impact

- **Requisito coberto:** RF015 (RF015-TL005, RF015-TL007, RF015-RN013,
  RF015-RN014, RF015-RN015, RF015-CA019, RF015-CA020, RF015-CA021,
  RF015-CA022).
- **Fora do escopo:** alterar a lista fechada de Evento/Tipo de Evento, o mapa
  Evento → Tipo de Evento, a gravação do capítulo, os demais campos do painel, o
  quadro de status, a associação livro–mundo e a exportação.
- **Banco:** nenhuma migração; o esquema continua na v16.
- **Back-end:** nenhum comando novo; `capitulo.rs` permanece como está.
- **Front-end:** `PainelCapitulo.jsx` (abas e ajudas) e `livros.css` (texto de
  três linhas e estilos das ajudas).
- **Verificação:** `scripts/verificar-rf015.mjs` cobre as duas abas, a troca sem
  perder edição pendente, as alturas de Motivo do Tipo/Meta e as duas ajudas;
  regressão de `verificar-rf011.mjs` e `verificar-rf016.mjs`.
