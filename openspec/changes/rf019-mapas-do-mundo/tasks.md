# Tasks — RF019 Mapas do Mundo

## 1. Banco e domínio

- [x] 1.1 Migração **v20** aditiva (`mapa`, `mapa_localidade`, `mapa_forma`, `mapa_ligacao`) com `CHECK`s, FKs, PK/UNIQUE e cascata.
- [x] 1.2 Módulo `mapa.rs` com listas fechadas, structs, `listar`, `obter`, `salvar` (transação) e `excluir`.
- [x] 1.3 Validações: nome, escala, fundo, âncora do mesmo mundo, coordenadas 0..1000 × 0..700, forma com ≥3 vértices, ligação entre localidades do mapa sem auto/duplicada.
- [x] 1.4 Códigos de erro e listas (`listas_mapa`).
- [x] 1.5 `documento_mundo.rs` carrega os mapas com conteúdo.
- [x] 1.6 Testes do domínio e da migração v19 → v20.
- [x] 1.7 `cargo fmt`, Clippy `-D warnings` e testes verdes.

## 2. Comandos Tauri

- [x] 2.1 Registrar `listar_mapas`, `obter_mapa`, `salvar_mapa`, `excluir_mapa` e `listas_mapa` (70 comandos).

## 3. Front-end — Mundo

- [x] 3.1 `mapasApi.js` com as cinco chamadas.
- [x] 3.2 `MapaCanvas.jsx`: SVG com templates, formas, ligações e marcadores; zoom/pan, seleção e callbacks opcionais.
- [x] 3.3 `TelaMapasMundo.jsx`: lista em cards, estado vazio e mundo não salvo.
- [x] 3.4 `ModalMapa.jsx`: nome, tipo, âncora e fundo; editar e excluir com confirmação.
- [x] 3.5 `MapaEditor.jsx`: toolbar, canvas, painel de localidades, painel de propriedades, arrastar, criar localidade, polígono, ligação, undo/redo e salvar.
- [x] 3.6 Estilos em `mapas.css` (cards, editor, toolbar, painéis, templates/marcadores).
- [x] 3.7 Ligar a aba **Mapas** em `TelaMundo.jsx` depois de Localidades.
- [x] 3.8 `IconeLocalidade.jsx`: glifos por família de tipo e quatro estilos pelo Tipo do Mundo; imagem tem prioridade no marcador.

## 4. Front-end — Livro e PDF

- [x] 4.1 Aba **Mapas** na seção Worldbuilding do livro, com seletor e visualização somente leitura (pan/zoom leve).
- [x] 4.2 `DocumentoMundo.jsx` renderiza a seção **Mapas** ao final, com paleta de impressão, omitindo mapas vazios.
- [x] 4.3 Ajustar `TelaWorldbuildingLivro`/`DocumentoMundo` e estilos.

## 5. Verificação

- [x] 5.1 `verificar-rf019.mjs`: lista/modal, editor, arrastar, criar localidade, polígono, ligação, undo/redo, salvar/reabrir, excluir, templates, livro e agregado do PDF.
- [x] 5.2 Ajustar `verificar-rf017.mjs` (sete abas na seção do livro) e o que depender do PDF.
- [x] 5.3 `npm run build` e regressão dos verificadores RF002–RF019.
- [x] 5.4 Cobertura dos ícones no editor, livro e PDF (tipo, mundo e prioridade da imagem).

## 6. Documentação e release

- [x] 6.1 Atualizar o `AGENTS.md` do app (estado, armadilhas, contagens).
- [ ] 6.2 Atualizar o changelog do `talecraft-releases` com a build 4 (quando a build for gerada).
- [ ] 6.3 Registrar nas notas da próxima build os mapas, a leitura no livro e a seção no PDF.
