## Why

O Worldbuilding já tem a árvore de **Localidades** (RF018), mas nenhuma visão
espacial: o escritor não consegue ver onde cada lugar fica, desenhar a forma de
uma região/cidade nem representar caminhos, portas e ligações. Um mapa funcional
— sem arte — fecha essa lacuna, usando as localidades como fonte da verdade.

## What Changes

- **Mapas do Mundo**: vários mapas por mundo, organizados por escala **Mundo**,
  **Região**, **Cidade**, **Bairro** e **Prédio/Casa**, com âncora opcional e
  cinco fundos (Papel, Grade, Hex, Blueprint, Topográfico).
- **Editor** na nova aba **Mapas** do Mundo: arrastar localidades, criar
  localidade pelo canvas, desenhar polígonos, criar ligações rotuladas, mover,
  apagar, desfazer/refazer, pan/zoom e salvar.
- **Ícones das localidades** no marcador quando não há imagem: o desenho vem do
  **Tipo da Localidade** e as famílias de assentamento, moradia, fortificação e
  templo mudam de estilo conforme o **Tipo do Mundo** (Medieval, Moderno,
  Futurista, Antigo).
- **Leitura no livro**: aba **Mapas** na seção Worldbuilding, com seletor e
  pan/zoom leve, somente leitura.
- **PDF**: seção **Mapas** no Documento do Mundo com todos os mapas que tiverem
  conteúdo, na ordem de criação e com paleta fixa.
- Migração **v20** aditiva (`mapa`, `mapa_localidade`, `mapa_forma`,
  `mapa_ligacao`).

**Fora do escopo:** edição vértice a vértice, mão livre/borracha, camadas,
névoa, imagem de fundo enviada, minimapa e mapa por capítulo.

## Capabilities

### New Capabilities

Nenhuma capability nova: os mapas estendem o Mundo, o livro e o documento já
existentes.

### Modified Capabilities

- `world-library`: aba Mapas, CRUD e editor no detalhe do Mundo.
- `book-workspace`: aba Mapas somente leitura na seção Worldbuilding.
- `world-sheet-export`: seção Mapas no Documento do Mundo.
- `database-foundation`: migração **v20**.
- `rust-bridge`: comandos de mapas.

## Impact

- **Requisito:** RF019 em `documents/talecraft.md` (RF019-TL001 a RF019-TL009,
  RF019-FL001 a RF019-FL010, RF019-RN001 a RF019-RN017, RF019-CA001 a
  RF019-CA023).
- **Banco:** migração v20 aditiva.
- **Back-end:** `mapa.rs` (domínio e validações), `documento_mundo.rs` (mapas no
  PDF), `erro.rs` (códigos), `lib.rs` (cinco comandos) e `banco.rs` (listas).
- **Front-end:** `mapasApi.js`, `MapaCanvas`, `MapaEditor`, `TelaMapasMundo`,
  `ModalMapa`, aba Mapas no livro, `DocumentoMundo.jsx` e estilos.
- **Testes:** domínio, migração v20, `verificar-rf019.mjs` e ajustes no RF017
  (a seção do livro passa a ter a aba Mapas).
