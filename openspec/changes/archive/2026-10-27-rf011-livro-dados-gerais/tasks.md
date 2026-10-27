## 1. Banco e domínio

- [x] 1.1 Criar a migração v7 aditiva com `livro` e `livro_subgenero` em `src-tauri/src/banco/migracoes.rs`.
- [x] 1.2 Centralizar em `src-tauri/src/banco.rs` as listas de gêneros, subgêneros por gênero, faixas de público e idiomas.
- [x] 1.3 Criar o módulo `src-tauri/src/livro.rs` com `Livro`, `ListasLivro`, `EstatisticasBiblioteca`, `listar`, `obter`, `salvar`, `listas` e `estatisticas`.
- [x] 1.4 Validar título obrigatório/único, listas fechadas e subgênero pertencente ao gênero, com `CodigoErro` estável.
- [x] 1.5 Gravar livro e subgêneros em transação e devolver o registro relido.
- [x] 1.6 Escrever `src-tauri/src/livro/testes.rs` cobrindo criação, edição, título vazio/duplicado, listas, relação gênero → subgênero, transação e migração v6 → v7.

## 2. Comandos Tauri

- [x] 2.1 Registrar `mod livro` em `src-tauri/src/lib.rs`.
- [x] 2.2 Implementar `listar_livros`, `obter_livro`, `salvar_livro`, `listas_livro` e `estatisticas_biblioteca`.
- [x] 2.3 Incluir os cinco comandos no `invoke_handler`.

## 3. Front-end — casca e navegação do livro

- [x] 3.1 Criar `src/livrosApi.js` com as chamadas, objeto de livro vazio e `textoDoErro`.
- [x] 3.2 Criar `src/livros.js` com metadados das seções, ordem do menu, cor derivada do id e descrição resumida.
- [x] 3.3 Criar `src/componentes/Bookband.jsx` e `src/componentes/SidebarLivro.jsx`.
- [x] 3.4 Criar `src/componentes/PainelAbas.jsx` reutilizável com `role="tablist"`, `role="tab"` e `role="tabpanel"`.
- [x] 3.5 Criar `src/componentes/TelaLivro.jsx` com a casca do livro, carregamento do registro, seção ativa, **Painel do Livro**, **Dados do Livro** e telas informativas das seções futuras.
- [x] 3.6 Implementar a aba **Dados Gerais** com título, gênero, subgêneros filtrados, faixa de público, idioma, **Descartar** e **Salvar**.
- [x] 3.7 Criar `src/livros.css` usando os tokens do design system e importar em `src/main.jsx`.
- [x] 3.8 Ligar `+ Novo Livro` e a abertura de cards no `App.jsx`, alternando a casca da raiz pela casca do livro.

## 4. Front-end — Meus Livros

- [x] 4.1 Reescrever `TelaLivros.jsx` para listar livros reais com busca, grade/lista e badge de resultados.
- [x] 4.2 Exibir nos cards título, gênero/subgêneros, faixa de público, idioma e métricas zeradas do livro.
- [x] 4.3 Carregar as estatísticas da biblioteca e atualizar as quatro métricas e o subtítulo.
- [x] 4.4 Manter o estado vazio e o painel de personagens compartilhados sem dados fictícios.

## 5. Verificação

- [x] 5.1 Criar `scripts/verificar-rf011.mjs` dirigindo o app Tauri real com banco isolado.
- [x] 5.2 Cobrir abertura da página, título obrigatório/único, listas fechadas, subgêneros por gênero, menu na ordem, Tab Panel, criação, listagem, busca, grade/lista, reabertura e seções futuras.
- [x] 5.3 Rodar `npm run verificar:rust`, `npm run build` e o verificador do RF011.
- [x] 5.4 Rodar os verificadores RF002–RF010 para confirmar ausência de regressão.

## 6. Documentação e fechamento

- [x] 6.1 Atualizar os `AGENTS.md` dos dois repositórios com o estado do RF011.
- [x] 6.2 Validar com `openspec validate --all`.
- [x] 6.3 Arquivar o change e confirmar a spec principal consolidada.
