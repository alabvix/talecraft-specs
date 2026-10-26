# Design — RF003: Infraestrutura do banco de dados

## Context

O TaleCraft hoje é só interface: o RF001 provou o IPC com um comando de
demonstração e o RF002 entregou a casca visual, os temas e a tela de
carregamento (splash), cujo carregamento (`carregarDados`) e o comando
`estado_inicial` foram deixados como **pontos únicos prontos** para o trabalho
pesado de inicialização. Não há banco, entidades nem persistência.

O **RF003** cria a infraestrutura de banco que todo requisito de domínio
depende. Seus critérios de aceite exigem SQLite com `rusqlite`
(RF003-CA001), arquivo em local persistente criado automaticamente e reusado
(RF003-CA002/3/4), migrações versionadas na subida com o splash ativo
(RF003-CA005/6), conexão só pelo Rust (RF003-CA007), operação de teste
(RF003-CA008), tratamento de falhas (RF003-CA009), testes automatizados
(RF003-CA010), execução offline no Windows (RF003-CA011) e **nenhuma entidade
de negócio** (RF003-CA012).

**Decisões já alinhadas com o usuário** (confirmadas antes de escrever as
specs):

1. `rusqlite` com a feature **`bundled`** (SQLite embutido; nada a instalar).
2. Migrações com a crate **`rusqlite_migration`** (versionadas, via
   `user_version`).
3. A operação de teste é **o comando Tauri + verificação automática** — sem
   criar UI nova (o RF003 não introduz funcionalidades de negócio).

## Goals / Non-Goals

**Goals**

- Abrir/criar o banco SQLite em local persistente, de forma automática e
  idempotente.
- Aplicar migrações versionadas na subida, sem destruir dados, com o splash
  ativo durante o processo.
- Centralizar a conexão no Rust e expô-la ao React apenas por comandos Tauri.
- Tornar `estado_inicial` o resultado real da inicialização do banco.
- Cobrir criação, migrações, persistência e falhas com testes automatizados.

**Non-Goals**

- Entidades, tabelas e funcionalidades de domínio (livros, personagens,
  capítulos, worldbuilding) — RF003-CA012.
- Telas, formulários ou CRUD novos; a interface continua a do RF002.
- Sincronização, backup, criptografia do banco, múltiplos bancos.
- Migrar a preferência de tema (`localStorage`) para o banco.

## Decisions

### D1 — `rusqlite` com a feature `bundled`

Adiciona-se `rusqlite = { version = "0.3x", features = ["bundled"] }`. O SQLite
é compilado dentro do executável.

*Motivo:* é a única forma direta de atender RF003-CA011 ("sem exigir uma
instalação separada do SQLite") e RF003-CA001 ao mesmo tempo. Mantém o app
offline e o pacote autocontido. O custo é um compilador C na **máquina de
build** — o MSVC já é exigido pelo Tauri no Windows, então não é requisito
novo — e um executável um pouco maior.
*Alternativas:* usar a `libsqlite3` do sistema (menor, porém depende da lib
existir na máquina do usuário — viola CA011); `sqlx`/`diesel` (assíncronos ou
pesados demais para SQLite local simples, e o requisito pede rusqlite).

### D2 — Local do arquivo: diretório de dados do aplicativo (Tauri)

O arquivo vive em `<app_data_dir>/talecraft.db`, resolvido pelo Tauri a partir
do identificador do app (`com.talecraft.desktop`) — em Windows, tipicamente
`%APPDATA%\com.talecraft.desktop\`. O diretório é criado se não existir.

*Motivo:* atende RF003-CA003 (persistente, fora da pasta de instalação) e
sobrevive a atualizações do aplicativo. Evita o diretório do Vite e o diretório
de instalação, ambos inadequados para dados que devem persistir.
*Alternativas:* ao lado do executável (some em atualização de instalador e pode
cair em `Program Files`, sem permissão de escrita); diretório temporário
(não persiste — viola CA004).

### D3 — Migrações versionadas com `rusqlite_migration`

As migrações são declaradas em Rust e aplicadas com a crate
`rusqlite_migration`, que usa `PRAGMA user_version` para saber a versão atual e
aplica apenas o que falta.

*Motivo:* atende RF003-CA005/CA006 com menos código próprio e menos chance de
erro do que reimplementar o controle de versão. É leve e feita para rusqlite.
*Alternativas:* implementar `user_version` à mão (mais código e mais testes
próprios para o mesmo resultado); `refinery` (framework completo com arquivos
`.sql` — mais peso do que o RF003 pede).

*Nota sobre o esquema:* nenhuma migração cria tabela de negócio (CA012). A
primeira migração cria, no máximo, o mínimo necessário para a infraestrutura e
para a operação de teste (por conveniência, uma tabela trivial de teste que os
requisitos de domínio substituirão/substituirão-se a ela depois). Se a tabela
de teste não for necessária para o comando, a migração inicial pode ser vazia,
registrando apenas a versão.

### D4 — Conexão única gerenciada pelo Rust, exposta por comandos

A conexão é aberta uma vez na inicialização e guardada no estado gerenciado do
Tauri (`tauri::Manager::manage`), protegida por um `Mutex`. O React só alcança
o banco por comandos Tauri (`#[tauri::command]`).

*Motivo:* RF003-CA007 exige que o front-end não acesse o SQLite diretamente.
O estado gerenciado evita reaberturas e centraliza o acesso.
*Alternativas:* abrir uma conexão por comando (funciona, mas desperdiça e
dificulta a coerência); expor a conexão ao front-end via JS (impossível e
contrário ao requisito).

### D5 — `estado_inicial` passa a ser a inicialização real

A inicialização do banco (abrir/criar + migrar) roda **na subida da aplicação**
e o comando `estado_inicial` devolve o resultado. O `carregarDados` do
front-end (RF002) continua sendo o ponto que mantém o **splash** ativo até
concluir.

*Motivo:* fecha o gancho deixado no RF002 e atende RF003-CA005 de forma direta,
sem inventar tela nova.
*Alternativas:* inicializar de forma tardia/preguiçosa (o splash não refletiria
o estado real do banco); fazer a migração apenas no primeiro comando que usa o
banco (atrasa e espalha o erro).

### D6 — Operação de teste `verificar_banco` sem UI nova

O back-end expõe um comando `verificar_banco` que executa uma consulta trivial
(por exemplo, `SELECT` de um valor ou `PRAGMA`) e retorna a confirmação. A
validação fica nos **testes automatizados** e na **verificação headless** já
usada nos requisitos anteriores — não se cria tela nem mostra-se o resultado no
layout.

*Motivo:* RF003-CA008 pede a **operação acessível pelo front-end**, não uma
tela. O RF003-CA012 proíbe funcionalidades de negócio, e o RF002 definiu as
telas como vazias; criar UI aqui contrariaria ambos.
*Alternativas:* exibir o resultado na tela inicial (mexe no layout do RF002 sem
necessidade); só teste interno sem comando exposto (não atenderia ao
"acessível pelo front-end").

### D7 — Erros como `Result<String, String>` nos comandos

Os comandos que tocam o banco retornam `Result`, e o erro é convertido em uma
**mensagem de texto útil** (contexto da operação + causa). A inicialização
guarda o erro para que `estado_inicial` possa informá-lo sem derrubar o app.

*Motivo:* RF003-CA009 pede mensagens úteis para diagnóstico e que a aplicação
não encerre silenciosamente. Strings são mais simples de exibir/logar do que
tipos ricos neste momento.
*Alternativas:* `panic!`/`expect` (encerraria silenciosamente ou com stack
trace — viola CA009); tipo de erro estruturado serializado (mais trabalho do que
o RF003 pede; pode evoluir depois).

## Risks / Trade-offs

| Risco | Mitigação |
|---|---|
| **`bundled` aumenta o tempo de build e o tamanho do executável.** | Aceitável: é o preço de não exigir SQLite instalado (CA011). O profile `release` já usa `opt-level = "s"`/`lto`. |
| **Local errado do banco** (ex.: cair em `Program Files`) causaria falha de escrita. | Usar o `app_data_dir` do Tauri (D2) e **testar** o caminho com um diretório temporário nos testes, além do teste de falha (CA009). |
| **Migração destrutiva** poderia apagar dados. | Migrações aditivas e idempotentes (D3); teste que garante que reabrir não reaplica nem apaga (CA006). |
| **`estado_inicial` mentir** (dizer "pronto" com o banco quebrado) esconde falhas. | `estado_inicial` passa a devolver o resultado real da inicialização (D5) e há teste de falha. |
| **`Mutex` envenenado** por um panic anterior deixaria o estado inacessível. | Tratar o erro do lock como falha diagnosticável (D7), sem `unwrap` que derrube o app. |
| **Escopo escorregar** para entidades de domínio. | CA012 explícito: nenhuma tabela/regra de negócio neste change. |
| **Regressão do RF001/RF002** (comunicação, splash, temas). | Preservar `mensagem_inicial` e os testes existentes; manter `estado_inicial` na mesma assinatura esperada pelo front-end e rodar a verificação do RF002. |

## Migration Plan

*(Estratégia: implementar em camadas para que cada passo seja verificável.)*

1. Adicionar `rusqlite` (`bundled`) e `rusqlite_migration` ao `Cargo.toml`.
2. Criar o módulo de banco: resolver o caminho (`app_data_dir`), abrir/criar,
   aplicar as migrações e devolver o estado — com erros descritivos.
3. Registrar o estado no Tauri e ligar a inicialização na subida; reescrever
   `estado_inicial` para refletir o resultado.
4. Expor o comando de teste `verificar_banco`.
5. Escrever os testes: criação, migrações, idempotência, persistência entre
   conexões e falha (caminho inválido).
6. Validar: `cargo test --manifest-path src-tauri/Cargo.toml --lib`,
   `npm run build`, `npm run tauri dev` (splash → aplicação, tema e navegação
   intactos), verificação headless e `npm run tauri build`.

**Rollback:** o change é aditivo no back-end. Reverter o commit remove a
dependência e o módulo de banco; `estado_inicial` volta a ser fixo e o app
opera como no RF002, sem perda de dados do usuário (o arquivo `.db`, se criado,
pode ser removido manualmente).

## Open Questions

Nenhuma pendente — as decisões técnicas foram resolvidas com o usuário conforme
a seção *Context*. Dúvidas que surgirem durante a implementação serão
registradas no `tasks.md` ou devolvidas ao usuário.
