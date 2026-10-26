## Context
A exportação do Mundo reutiliza a janela oculta e o `PrintToPdf` do WebView2
(RF007). O comando `exportar_mundo` montava o documento no front-end a partir de
`obter_mundo`, que só traz os dados básicos. As entradas (RF008) e as facções
(RF009) ficaram fora do PDF.

## Goals / Non-Goals

**Goals:**
- Agregar no back-end o Mundo, todas as entradas e todas as facções com os
  personagens associados.
- Renderizar as seções de entradas e facções no documento React.
- Preservar a geração por `PrintToPdf`, sem biblioteca de PDF.
- Cobrir o agregado em teste Rust e o documento renderizado no verificador E2E.

**Non-Goals:**
- Criar a associação entre mundo e livro.
- Acrescentar imagens próprias das entradas ou retratos nas facções.
- Alterar as telas de cadastro de entradas e facções.

## Decisions

### D1 — Agregado no back-end
Criar `documento_mundo.rs` com `montar_por_id`, que devolve `DocumentoMundo {
mundo, entradas, faccoes }`. A montagem fica no back-end, como a Ficha do
Personagem (RF006), e o front-end apenas desenha. O comando
`montar_documento_mundo` é registrado no `invoke_handler`.

### D2 — Listagens sem paginação
`entradas_mundo::listar_todas` percorre as seis categorias e carrega cada
entrada completa por `obter_entrada`, preservando as regras dos Sistemas.
`faccao::listar_todas` carrega as facções completas por `obter_faccao`.
As funções paginadas existentes continuam sendo usadas pelas tabelas da
interface.

### D3 — Documento em seções
`DocumentoMundo.jsx` mostra os dados básicos, depois **Entradas do Mundo** (na
ordem das abas) e **Facções**. Cada entrada mostra nome e todos os campos não
vazios; Sistemas mostram as regras ordenadas. Cada facção mostra todos os campos
e a lista de personagens com o papel. Categorias e campos vazios são omitidos.
As cores são fixas, como no restante do documento impresso.

### D4 — Sem nova dependência
A exportação continua sendo feita pelo `PrintToPdf` do WebView2, com a janela
oculta e o aviso `sinalizar_ficha_pronta`. Nenhuma biblioteca de PDF é
acrescentada.

## Risks / Trade-offs
- Documentos com muitas entradas podem ficar longos; as regras de impressão
  usam `break-inside: avoid` para não cortar uma entrada ao meio.
- O back-end faz uma consulta por entrada para trazer todos os campos; o volume
  é pequeno para um mundo e evita duplicar SQL de cada variante.
