# Tasks — RF017 Livros: mundos associados e Worldbuilding do livro

## 1. Banco de dados

- [x] 1.1 Criar a migração **v17** aditiva em `src-tauri/src/banco/migracoes.rs` com a tabela `livro_mundo` (PK composta, `ordem`, `criado_em`, FKs e índice por `mundo_id`), sem editar passos publicados.
- [x] 1.2 Testar a migração v16 → v17 sem perda de livros, personagens, mundos, entradas, facções, vínculos e capítulos, e a recusa de associação duplicada.
- [x] 1.3 Atualizar a spec `database-foundation` (feito no change) e o comentário de versão do esquema.

## 2. Domínio

- [x] 2.1 Criar `src-tauri/src/livro_mundo.rs` com os structs de D2 (`MundosDoLivro`, `MundoDoLivro`, `ListaMundosParaLivro`, `RelatorioMundos`, `RelatorioRemocaoMundo`, `LivroDoMundo`, `MundoComLocalidades`).
- [x] 2.2 Implementar `listar_mundos_do_livro` com resumo, contagens por categoria, total de entradas e ordem de associação.
- [x] 2.3 Implementar `listar_mundos_para_livro` com busca em Rust (`to_lowercase`), paginação de 12 e selo `jaAssociado`.
- [x] 2.4 Implementar `associar_mundos_ao_livro` em transação, com `ordem = MAX+1`, validação de livro salvo e mundo existente, e relatório `associados`/`jaAssociados`.
- [x] 2.5 Implementar `remover_mundo_do_livro` em transação, limpando `cenario_localidade_id` dos capítulos do livro que usam localidades do mundo e devolvendo `capitulosLimpos`.
- [x] 2.6 Implementar `listar_livros_do_mundo` e `listar_localidades_do_livro` (agrupado por mundo).
- [x] 2.7 Ajustar `livro::listar`/`livro::obter` para devolver `mundos: Vec<String>` (ordem de associação) e `livro::estatisticas` para contar entradas apenas dos mundos associados a livros.
- [x] 2.8 Acrescentar `CodigoErro::CenarioForaDoLivro` e validar o cenário em `capitulo::salvar` contra os mundos associados ao livro.
- [x] 2.9 Escrever os testes do módulo (`livro_mundo/testes.rs`), incluindo ordem, duplicidade, remoção com limpeza, mundo intacto, cenário fora do livro e listagens.
- [x] 2.10 Rodar `cargo fmt --check`, `cargo clippy --all-targets -- -D warnings` e `cargo test` (153 testes).

## 3. Comandos Tauri

- [x] 3.1 Registrar os seis comandos no `invoke_handler` de `src-tauri/src/lib.rs` com comentário citando o RF017.
- [x] 3.2 Confirmar a contagem de comandos (62) e a passagem de `Option<i64>` para livro não salvo.

## 4. Front-end

- [x] 4.1 Criar `src/livroMundosApi.js` com as chamadas aos seis comandos e `textoDoErro` reutilizado.
- [x] 4.2 Criar `TelaWorldbuildingLivro.jsx`: Tab Panel por mundo, resumo somente leitura, categorias em sub-abas com tabela paginada, **Associar mundos**, **Remover mundo** (com confirmação e aviso de capítulos limpos) e **Abrir mundo**; estado vazio e livro não salvo.
- [x] 4.3 Criar `ModalSelecaoMundos.jsx` com grade paginada de 12, busca e seleção múltipla mantida entre páginas, selo **Já associado** e contagem no rodapé.
- [x] 4.4 Acrescentar a prop `somenteCriacao` a `TabelaEntradas.jsx` (esconde **Editar**, mantém **Novo(a)** e paginação) e reusar a modal do RF008 para criar entradas no mundo da aba.
- [x] 4.5 Ligar a seção em `TelaLivro.jsx`: renderizar `TelaWorldbuildingLivro`, carregar os mundos para o subtítulo do menu e para o Painel, e expor `aoAbrirMundo`.
- [x] 4.6 Atualizar `SidebarLivro.jsx`/`livros.js` para o subtítulo **Entradas de \<mundo\>** ou **N mundos**.
- [x] 4.7 Atualizar o Painel do Livro: métrica **Entradas de worldbuilding**, módulo Worldbuilding com mundos e entradas, e contagem real no rodapé do card.
- [x] 4.8 Atualizar os cards de Meus Livros (`TelaLivros.jsx`) para exibir os mundos associados ou **Sem mundo**.
- [x] 4.9 Atualizar `TelaCapitulosLivro.jsx`/`PainelCapitulo.jsx` para o select **Cenário Worldbuilding** agrupado por mundo, com estado desabilitado quando não há mundo.
- [x] 4.10 Atualizar `TelaMundo.jsx` (painel **Vínculos com livros** com títulos clicáveis) e `App.jsx`/`TelaMundos.jsx` para passar `aoAbrirLivro`.
- [x] 4.11 Reusar os estilos existentes; acrescentar em `livros.css` só o necessário para as abas de mundo, o resumo e a grade de seleção.

## 5. Verificação

- [x] 5.1 Criar `scripts/verificar-rf017.mjs` no padrão dos demais (CDP no app real, banco isolado, tema Tundra quando aplicável), cobrindo os RF017-CA001 a RF017-CA022 — 26/26 OK.
- [x] 5.2 Ajustar `scripts/verificar-rf007.mjs` (painel de vínculos real), `verificar-rf011.mjs` (métrica e cards) e `verificar-rf015.mjs` (cenário com opções), sem reduzir coberturas.
- [x] 5.3 Rodar `npm run build` e a regressão dos verificadores RF002–RF017 (todos verdes).

## 6. Documentação e release

- [x] 6.1 Atualizar o `AGENTS.md` do app (estado, armadilhas e contagem de testes/comandos).
- [x] 6.2 Atualizar o `prototype/README.md` e o roadmap do site para **um ou mais mundos por livro**.
- [ ] 6.3 Registrar nas notas da próxima build: associação livro–mundo, cenário agrupado e limpeza de cenários ao remover mundo (pendente do próximo build).

## 7. Ajustes de 17/11/2026

- [x] 7.1 Mostrar os livros associados nos cards e na visualização em lista de Mundos (`Mundo.livros` em `listar`/`obter`, coluna **Livros** e rodapé do card).
- [x] 7.2 Criar a aba **Livros** no detalhe do mundo, depois de **Facções**, com contador e títulos clicáveis; o painel **Vínculos com livros** passou a mostrar a contagem e o atalho, sem duplicar a lista (RF017-TL008, RF017-TL010).
- [x] 7.3 Envolver o Tab Panel da seção Worldbuilding do livro em `section.panel`, recuperando o fundo/borda das outras tab pages.
- [x] 7.4 Atualizar RF017 (TL010, TL011, CA014, CA022), o delta `world-library` e os verificadores RF017 e RF008.
