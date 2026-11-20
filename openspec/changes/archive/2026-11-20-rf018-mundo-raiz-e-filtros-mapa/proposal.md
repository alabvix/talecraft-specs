## Why

Hoje o Mundo e as Localidades são cadastros separados: a árvore começa nas
localidades soltas e não existe um nó que represente Ravória, Kepler ou Arda.
Além disso, os mapas de **Mundo** e **Região** aceitam qualquer tipo, então uma
Casa, uma Praça ou um Cômodo aparecem em escalas em que não fazem sentido. O
escritor precisa de uma raiz explícita e de filtros coerentes por escala.

## What Changes

- **Mundo como localidade raiz**: cada mundo ganha uma localidade automática do
  tipo interno **Mundo**, com o nome do mundo. Ela fica no topo da árvore, não
  tem **Editar**, é o pai padrão das novas localidades e não aparece em mapas,
  cenários nem no PDF.
- **Migração v22**: recria `localidade` com o tipo **Mundo** e a coluna `raiz`,
  cria a raiz dos mundos existentes, reparenta as localidades sem pai e garante
  uma raiz por mundo.
- **Migração v23 corretiva**: recria `capitulo` para a FK do cenário voltar a
  apontar para `localidade`, corrigindo bancos que ficaram com
  `localidade_antiga`.
- **Filtros por escala**: **Mundo** aceita apenas tipos macro/geográficos e
  assentamentos; **Região** aceita todos os 49, exceto **Cômodo**, **Quarto**,
  **Sala** e **Salão**. Cidade, Bairro e Prédio/Casa continuam como estão.
- O painel, o **Nova localidade** e o `salvar_mapa` usam as novas listas; a raiz
  não vira marcador.
- O polígono já tem redimensionamento pelas arestas e movimento pelo interior
  no renderizador compartilhado; o fluxo de **Região** passa a ter verificação
  explícita.

**Fora do escopo:** excluir mundo, editar a raiz pela modal e mudar a hierarquia
de mundos para vários níveis.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities

- `world-entries`: raiz do mundo, pai padrão e árvore.
- `world-library`: filtros de tipo por escala e raiz fora do mapa.
- `database-foundation`: migração **v22**.
- `rust-bridge`: `raiz` na listagem, pai padrão e bloqueio da raiz.
- `book-workspace`: árvore do livro e caminho do cenário com a raiz.
- `world-sheet-export`: raiz não entra nas entradas do PDF.

## Impact

- **Requisitos:** RF018-TL001, RF018-FL001, RF018-RN003, RF018-RN005,
  RF018-RN006, RF018-CA019, RF018-CA020; RF019-TL011, RF019-RN019,
  RF019-CA025, RF019-CA029.
- **Banco:** migração v22.
- **Back-end:** `mundo.rs` (raiz), `entradas_mundo.rs` (pai padrão, bloqueio da
  raiz, listagem), `livro.rs` e `livro_mundo.rs` (contagens/filtros),
  `mapa.rs` (listas Mundo/Região) e `erro.rs`.
- **Front-end:** `ArvoreLocalidades`, `ModalEntradaMundo`, `MapaEditor`,
  `IconeLocalidade` e estilos.
- **Testes:** Rust + `verificar-rf007`, `rf008`, `rf017`, `rf018` e `rf019`.
