## 1. Banco e domínio

- [x] 1.1 Criar a migração v14 aditiva em `src-tauri/src/banco/migracoes.rs` com `capitulo` e `capitulo_personagem` (checks, FKs, índice e número único por livro) (design D1).
- [x] 1.2 Centralizar em `banco.rs` as listas de status, tipos, eventos e tipos de evento (RF015-RN002 a RN005).
- [x] 1.3 Criar `src-tauri/src/capitulo.rs` com structs, CRUD, movimento, listas e validações (design D2, D4, D5).
- [x] 1.4 Testar em `src-tauri/src/capitulo/testes.rs` criação, número, listas, evento/tipo, personagens, cenário, movimento e leitura; e a migração v13 → v14 em `banco/testes.rs` (design D8).
- [x] 1.5 Atualizar `livro::estatisticas` e o total de capítulos de `listar_livros_do_personagem` (design D7).

## 2. Comandos Tauri

- [x] 2.1 Registrar os seis comandos no `invoke_handler` (55 no total) e ajustar os comandos de leitura existentes.

## 3. Front-end

- [x] 3.1 Criar `src/capitulosApi.js`.
- [x] 3.2 Criar `TelaCapitulosLivro.jsx` com o quadro, as quatro colunas, criação, ordenação, arrastar e estado vazio (design D3, D4).
- [x] 3.3 Criar `PainelCapitulo.jsx` com todos os campos, ajuda do Tipo, personagens com Evento/Tipo e Salvar no cabeçalho (design D5, D6).
- [x] 3.4 Integrar a seção em `TelaLivro.jsx`, atualizar `livros.js`, as métricas do Painel e os estilos em `livros.css`.
- [x] 3.5 Atualizar o total de capítulos na ficha global em `TelaPersonagem.jsx`.

## 4. Verificação

- [x] 4.1 Criar `scripts/verificar-rf015.mjs` com banco isolado, cobrindo quadro, colunas, ordenação, criação, painel, ajuda, personagens, gravação, arrastar, métricas e ficha (design D8).
- [x] 4.2 Ajustar `scripts/verificar-rf011.mjs` (Capítulos real) e `scripts/verificar-rf014.mjs` (total real) e rodar a regressão.
- [x] 4.3 Rodar `npm run verificar:rust` e `npm run build`.

## 5. Documentação e fechamento

- [x] 5.1 Atualizar os `AGENTS.md` de `talecraft-app` e `talecraft-specs`.
- [x] 5.2 Validar com `openspec validate --all` e arquivar com `openspec archive "rf015-capitulos-do-livro" --yes`.
