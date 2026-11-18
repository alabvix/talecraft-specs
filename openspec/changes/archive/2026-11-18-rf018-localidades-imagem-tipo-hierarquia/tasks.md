# Tasks — RF018 Localidades: imagem, tipo e hierarquia

## 1. Banco de dados

- [x] 1.1 Migração **v18** aditiva em `banco/migracoes.rs`: `tipo` (DEFAULT **Não definido** + `CHECK`), `imagem`, `pai_id` (FK para `localidade`) e índice por `pai_id`.
- [x] 1.2 Constante `TIPOS_LOCALIDADE` (49 valores em ordem alfabética) e `TIPO_LOCALIDADE_PADRAO` em `banco.rs`.
- [x] 1.3 Migração **v19** que recria `localidade` com o `CHECK` ampliado, copiando as linhas; migrações rodam com `foreign_keys = OFF` e religam no fim. Testes da v17 → v18, da v18 → v19 e do `CHECK`.

## 2. Domínio

- [x] 2.1 Acrescentar `tipo`, `imagem` e `pai_id` à variante `Localidade` e atualizar `sql_obter`, `sql_listar_completo`, `mapear` e `salvar_entrada`.
- [x] 2.2 Normalizar e validar o **Tipo** contra a lista fechada (`TipoLocalidadeInvalido`).
- [x] 2.3 Validar o pai: existente, do mesmo mundo, sem auto-contenção e sem ciclo (`CicloLocalidade`).
- [x] 2.4 Implementar `listar_localidades_mundo` com `totalFilhos` e ordem alfabética no Rust.
- [x] 2.5 Implementar `associar_imagem_localidade` com `imagem.rs` e a pasta `localidades/`.
- [x] 2.6 `livro_mundo::LocalidadeResumo` ganha `caminho`; `listar_localidades_do_livro` calcula o caminho completo.
- [x] 2.7 Testes do módulo: tipo, pai, ciclo, mover subárvore, imagem, caminho e listagem em árvore.
- [x] 2.8 `cargo fmt`, Clippy `-D warnings` e testes verdes (160 testes).

## 3. Comandos Tauri

- [x] 3.1 Registrar `listar_localidades_mundo`, `listar_tipos_localidade` e `associar_imagem_localidade` no `invoke_handler` (65 comandos).
- [x] 3.2 Confirmar que `salvar_entrada_mundo` continua aceitando as outras categorias sem mudança de contrato.

## 4. Front-end

- [x] 4.1 `entradasMundo.js`: campos novos da Localidade e `entradaVazia` com tipo/imagem/pai.
- [x] 4.2 `ArvoreLocalidades.jsx`: árvore expansível com miniatura, nome, tipo, contador, **Nova Localidade** e **Editar** (ou `somenteCriacao`).
- [x] 4.3 `ModalEntradaMundo.jsx`: bloco de **Tipo**, **Fica dentro de** e **Imagem** com prévia, envio e associação depois do salvar.
- [x] 4.4 `entradasMundoApi.js`: `listarLocalidadesMundo`, `listarTiposLocalidade` e `associarImagemLocalidade`.
- [x] 4.5 `TelaMundo.jsx`: Localidades em árvore; demais categorias na tabela.
- [x] 4.6 `TelaWorldbuildingLivro.jsx`: Localidades em árvore em modo de consulta, com criação.
- [x] 4.7 `PainelCapitulo.jsx`: opção do cenário pelo caminho completo.
- [x] 4.8 `DocumentoMundo.jsx`: mostrar o **Tipo** da localidade no PDF.
- [x] 4.9 Estilos da árvore em `mundos.css` (indentação, seta, miniatura, tipo, prévia da imagem).

## 5. Verificação

- [x] 5.1 Criar `scripts/verificar-rf018.mjs` cobrindo RF018-CA001 a RF018-CA019 — 17/17 OK.
- [x] 5.2 Ajustar `verificar-rf008.mjs` (Localidades em árvore; paginação migrada para Raças e Povos), `verificar-rf017.mjs` e `verificar-rf016.mjs` (schema v19).
- [x] 5.3 `npm run build` e regressão dos verificadores RF002–RF018 (todos verdes).

## 6. Documentação e release

- [x] 6.1 Atualizar o `AGENTS.md` do app (estado, armadilhas, contagens).
- [ ] 6.2 Atualizar o protótipo/site quando a próxima build for publicada.
- [ ] 6.3 Registrar nas notas da próxima build: imagem, tipo e hierarquia das localidades.

## 7. Ajustes de 17/11/2026

- [x] 7.1 Incluir **Ruína**, **Mar**, **Catacumba** e **Caverna** na lista (além de **Território** e **Planalto**, que já existiam) — total de **39** tipos.
- [x] 7.2 Ordenar os tipos alfabeticamente no seletor, dobrando acentos no Rust (`chave_alfabetica`), com **Não definido** primeiro.
- [x] 7.3 Atualizar o RF018 (RN002, TL002, CA005), o delta `world-entries`, os testes e o `verificar-rf018.mjs`.
- [x] 7.5 Incluir **Igreja**, **Prisão**, **Praça**, **Cantina**, **Restaurante**, **Edifício**, **Arena**, **Teatro**, **Estádio** e **Bosque** — **49 tipos** — com a migração **v19** recriando o `CHECK` (a v18 já estava publicada no banco de desenvolvimento).
- [x] 7.4 Paginar a árvore de localidades em **20 por página**, agrupando subárvores inteiras, com **Anterior**/**Próxima** e a página atual (RF018-CA019).

