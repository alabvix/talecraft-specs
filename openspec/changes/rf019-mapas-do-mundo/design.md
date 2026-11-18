# Design — RF019 Mapas do Mundo

## Contexto

O Mundo já tem localidades com imagem, tipo e hierarquia (RF018). O RF019 cria a
visão espacial: mapas por escala, com marcadores das localidades, formas
desenhadas e ligações. As localidades continuam sendo a fonte da verdade; o mapa
é um documento de posicionamento.

## Decisões

### D1 — Migração v20 aditiva

Quatro tabelas novas, sem tocar nas existentes:

- `mapa (id, mundo_id, nome, tipo, ancora_localidade_id, fundo, criado_em,
  atualizado_em)`;
- `mapa_localidade (mapa_id, localidade_id, x, y)` com PK composta;
- `mapa_forma (id, mapa_id, pontos, rotulo, cor, ordem)`;
- `mapa_ligacao (id, mapa_id, origem_localidade_id, destino_localidade_id,
  rotulo, estilo)` com par único.

`CHECK`s para escala, fundo, cor e estilo; FKs para mundo/localidade; cascata do
mapa para os filhos. As migrações continuam com `foreign_keys = OFF` durante o
`to_latest` (RF018) e a integridade é religada antes de devolver a conexão.

### D2 — Listas fechadas no back-end

`TIPOS_MAPA`, `FUNDOS_MAPA`, `CORES_FORMA` e `ESTILOS_LIGACAO` vivem em
`mapa.rs` e alimentam `listas_mapa`; o front-end não duplica valores. O `CHECK`
do banco é o backstop. Cores são **chaves semânticas** (`acento`, `ambar`,
`azul`, `verde`, `neutra`, `destaque`), mapeadas para tokens do tema no app e
para a paleta fixa no PDF.

### D3 — Salvar o documento inteiro numa transação

`salvar_mapa` valida o mundo, o nome, as listas, a âncora (mesmo mundo), as
coordenadas (0..1000 × 0..700), as formas (≥3 vértices válidos) e as ligações
(localidades presentes no mapa, sem auto-ligação e sem par repetido). Depois
grava/atualiza o mapa, **apaga e regrava** as listas filhas na mesma transação
(as regras de Sistema já usam esse padrão) e devolve o mapa relido. O volume é
pequeno e a substituição evita diff complexo.

### D4 — Coordenadas e renderização

Plano lógico fixo de **1000 × 700**. O SVG usa `viewBox` e o editor controla
zoom/pan pelo `viewBox`; a conversão de ponteiro para coordenada usa
`getScreenCTM`/`getBoundingClientRect` + `viewBox`. Os polígonos guardam os
pontos como texto `x,y x,y …` e são validados no domínio.

### D5 — Ligações por localidade

A ligação referencia `localidade_id` de origem e destino (não o elemento do
canvas), porque as localidades já têm ids estáveis e a ligação só faz sentido
entre elas; formas não são ligáveis nesta entrega. Isso simplifica o salvar em
lote e a validação.

### D6 — Renderizador compartilhado

`MapaCanvas` (SVG puro) desenha fundo/template, formas, ligações e marcadores, com
props de zoom/pan, seleção e callbacks opcionais. O editor o envolve com toolbar
e painéis; o livro e o PDF usam o mesmo componente sem callbacks (somente
leitura/impressão). Nenhuma biblioteca nova.

### D7 — Editor

Estado local do documento, histórico de undo/redo em memória (até 50 passos) e
**Salvar** explícito. `dirty` compara o documento atual com o último salvo.
Arrastar da lista usa **eventos de ponteiro** (`pointerdown` + `pointermove`/
`pointerup` na janela), porque o WebView2 do Tauri intercepta o DnD nativo do
HTML5; mover marcador e pan usam eventos de ponteiro; polígono fecha com duplo
clique, clique no primeiro vértice ou Enter, e a troca de ferramenta grava o
polígono em andamento. Criar localidade reusa `ModalEntradaMundo` (RF018), com
pai sugerido = âncora, e recarrega a lista de localidades para obter
nome/tipo/imagem.

### D8 — Livro somente leitura

A seção Worldbuilding do livro ganha a aba **Mapas** depois de Localidades. Ela
carrega `listar_mapas`/`obter_mapa` do mundo da aba, tem seletor e `MapaCanvas`
com pan/zoom leve. Nenhum comando de escrita é chamado.

### D9 — PDF do Mundo

`documento_mundo.rs` passa a carregar `mapas: Vec<Mapa>` (somente os com conteúdo,
na ordem de criação). `DocumentoMundo.jsx` renderiza a seção **Mapas** ao final,
com nome, escala, âncora e `MapaCanvas` em modo impressão (paleta fixa, fundo
neutro). Mapas vazios ficam de fora.

### D10 — Validação

- Testes Rust: migração v19 → v20; CRUD; âncora de outro mundo; coordenadas fora
  do plano; forma com menos de 3 vértices; ligação fora do mapa/auto/duplicada;
  cascata; documento com mapas.
- `verificar-rf019.mjs`: lista/modal, editor, arrastar, criar localidade,
  polígono, ligação, undo/redo, salvar/reabrir, excluir, templates, livro e
  agregado do PDF.
- `verificar-rf017.mjs` passa a esperar sete abas na seção do livro (seis
  categorias + Mapas).

### D11 — Ícones das localidades

O **Tipo do Mundo** chega ao mapa por um campo de leitura `tipo_mundo` no struct
`Mapa`: o `obter` faz `JOIN mundo_global` com `COALESCE` e o `salvar` ignora o
valor enviado, então nenhuma migração é necessária. O componente
`IconeLocalidade` é SVG inline (sem biblioteca) e resolve duas chaves: o tipo da
localidade vira uma **família** de desenho (os 49 tipos do RF018 em ~19
famílias) e o tipo do mundo escolhe a variante das famílias temáticas
(assentamento, moradia, fortificação e templo). A imagem cadastrada tem
prioridade: o marcador só desenha o ícone quando não há URL de imagem. Tipos sem
glifo mantêm o quadrado vazio. O `data-familia`/`data-mundo` do SVG serve aos
E2E e ao diagnóstico.
