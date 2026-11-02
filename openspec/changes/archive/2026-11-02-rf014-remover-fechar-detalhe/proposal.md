## Why

Ainda aparece um ícone **X** no cabeçalho do detalhe do personagem no livro e
ele fecha o painel. O escritor pediu a remoção desse controle; o detalhe deve
permanecer aberto até a seleção de outro personagem ou a saída da seção.

## What Changes

- Remover o ícone **X** do cabeçalho do detalhe.
- O detalhe passa a ser substituído apenas pela seleção de outro personagem;
  trocar de personagem descarta as alterações pendentes.
- Nenhuma migração, comando ou campo novo.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: o detalhe do personagem no livro deixa de ter ação de fechar.

## Impact

- **Requisito coberto:** RF014 (RF014-TL004, RF014-TL006, RF014-RN018,
  RF014-CA007, RF014-CA010, RF014-CA025).
- **Fora do escopo:** alterar as abas, a gravação do vínculo, o destaque, os
  capítulos por personagem ou os gráficos.
- **Banco:** nenhuma migração; o esquema continua na v16.
- **Back-end:** nenhum comando novo.
- **Front-end:** `DetalhePersonagemLivro.jsx` e `TelaPersonagensLivro.jsx`.
- **Verificação:** `verificar-rf014.mjs` confere a ausência do X e usa a troca de
  personagem para descartar as alterações; `verificar-rf015.mjs` deixa de fechar
  o detalhe pelo X.
