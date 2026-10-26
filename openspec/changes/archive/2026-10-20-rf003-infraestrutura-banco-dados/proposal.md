## Why

O RF002 entregou a casca visual e a tela de carregamento (splash), mas o
TaleCraft **ainda não persiste nada**: o comando `estado_inicial` responde
`true` sem tocar em um banco. Como o produto é, por definição, uma *base de
dados* de planejamento (personagens, mundo, capítulos, dados do livro), nenhum
requisito de domínio pode começar antes de existir um **banco SQLite confiável,
versionado e inicializado junto do aplicativo**.

Este change cria só a **infraestrutura**: onde o banco vive, como é aberto,
como o esquema evolui por migrações e como o front-end comprova que o banco
responde. Cobre o requisito **RF003 — Infraestrutura do banco de dados**, cuja
definição de pronto é: o aplicativo cria ou abre o banco, executa as migrações,
realiza uma operação de teste pelo front-end e preserva os dados entre
execuções, com testes automatizados passando e sem comprometer o que já existe.

## What Changes

- Adicionar o **SQLite via `rusqlite` com a feature `bundled`** ao back-end
  Rust: o SQLite é compilado dentro do executável, sem exigir instalação
  separada e mantendo o app offline (RF003-CA001, RF003-CA011).
- Definir o **local persistente do arquivo de banco** no diretório de dados do
  aplicativo (fora da pasta de instalação), criando-o automaticamente na
  primeira execução e **reutilizando-o** nas seguintes (RF003-CA002,
  RF003-CA003, RF003-CA004).
- Implementar **migrações versionadas** aplicadas na subida do aplicativo, uma
  única vez e apenas quando necessárias, **sem recriar ou apagar dados**
  (RF003-CA005, RF003-CA006).
- **Centralizar a conexão no back-end Rust**, exposta ao React apenas por
  comandos Tauri — o front-end nunca fala SQLite diretamente (RF003-CA007).
- Oferecer uma **operação de teste de comunicação** (`verificar_banco`) que o
  front-end invoca para confirmar que o banco responde (RF003-CA008).
- Tratar falhas de abertura/criação/migração com **mensagens de erro úteis**,
  sem encerrar a aplicação silenciosamente (RF003-CA009).
- Reescrever o comando **`estado_inicial`** para refletir o resultado real da
  inicialização do banco — a tela Splash do RF002 permanece ativa até esse
  trabalho terminar (RF003-CA005).
- Cobrir com **testes automatizados** a criação do banco, a execução das
  migrações, a persistência entre conexões e o tratamento de falhas
  (RF003-CA010).

### Fora do escopo (conforme o requisito)

Não faz parte deste change criar **entidades ou funcionalidades de negócio**
(livros, personagens, capítulos, worldbuilding, gráficos, exportação) — elas
virão em requisitos posteriores (RF003-CA012). Não há telas novas, formulários
nem CRUD: a interface continua a do RF002, com as telas vazias e a tela Temas.

## Capabilities

### New Capabilities

- `database-foundation`: o ciclo de vida do banco SQLite no back-end Rust —
  local e criação do arquivo, abertura e reuso entre execuções, migrações
  versionadas na subida, unicidade da conexão e o tratamento de falhas com
  mensagens úteis.

### Modified Capabilities

- `rust-bridge`: `estado_inicial` deixa de ser um valor fixo e passa a refletir
  a inicialização real do banco; entra o comando de teste `verificar_banco`.
  A ponte IPC (front-end nunca acessa o banco diretamente) permanece.

## Impact

- **Dependências Rust novas:** `rusqlite` (feature `bundled`) e
  `rusqlite_migration` em `src-tauri/Cargo.toml`. A primeira exige um
  compilador C na máquina de build (o MSVC já exigido pelo Tauri no Windows);
  nenhuma dependência nova no front-end.
- **Back-end (`src-tauri/src/`):** novo módulo de banco (abertura, local do
  arquivo, migrações) e os comandos Tauri correspondentes; `lib.rs` passa a
  gerenciar e usar esse estado.
- **Front-end (`src/`):** sem telas novas; apenas o uso do comando de teste e
  o ajuste fino do carregamento já existente do splash (RF002).
- **Distribuição:** o executável cresce porque carrega o SQLite embutido; em
  contrapartida, **nada de SQLite precisa estar instalado** na máquina do
  usuário (RF003-CA011).
- **Protótipo:** permanece intacto; não é tocado por este change.
