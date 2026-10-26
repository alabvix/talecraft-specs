# Tasks — RF003: Infraestrutura do banco de dados

## 1. Dependências e estrutura

- [x] 1.1 Adicionar `rusqlite` com a feature `bundled` ao
  `src-tauri/Cargo.toml` (RF003-CA001, RF003-CA011)
- [x] 1.2 Adicionar a crate `rusqlite_migration` ao `src-tauri/Cargo.toml`
  (RF003-CA005, RF003-CA006)
- [x] 1.3 Criar o módulo de banco em `src-tauri/src/banco.rs` (ou equivalente),
  registrando-o em `lib.rs`
- [x] 1.4 Confirmar que o build continua offline e sem exigir SQLite instalado
  (`cargo build --manifest-path src-tauri/Cargo.toml`)

## 2. Local e abertura do banco

- [x] 2.1 Resolver o caminho do arquivo no **diretório de dados do aplicativo**
  (`app_data_dir`), criando o diretório se faltar (RF003-CA003)
- [x] 2.2 Abrir o banco e **criá-lo automaticamente** se o arquivo não existir
  (RF003-CA002)
- [x] 2.3 Garantir o **reuso** do arquivo existente nas execuções seguintes,
  preservando os dados (RF003-CA004)
- [x] 2.4 Guardar a conexão no estado gerenciado do Tauri, protegida por
  `Mutex` (RF003-CA007)

## 3. Migrações versionadas

- [x] 3.1 Declarar as migrações com `rusqlite_migration` (sem tabelas de
  negócio — RF003-CA012)
- [x] 3.2 Aplicar as migrações **na subida** do aplicativo, de forma automática
  (RF003-CA005)
- [x] 3.3 Garantir que as migrações são **idempotentes e não destrutivas**:
  aplicar só o que falta, sem recriar/apagar dados (RF003-CA006)

## 4. Comandos expostos ao front-end

- [x] 4.1 Reescrever `estado_inicial` para refletir o resultado real da
  inicialização do banco (RF003-CA005)
- [x] 4.2 Garantir que o **splash** do RF002 permanece ativo até
  `estado_inicial` concluir com sucesso (RF003-CA005)
- [x] 4.3 Criar o comando de teste de comunicação `verificar_banco`, registrado
  no `invoke_handler` (RF003-CA008)
- [x] 4.4 Tratar falhas de abertura/criação/migração com **mensagens úteis**,
  sem encerrar a aplicação silenciosamente (RF003-CA009)

## 5. Testes automatizados

- [x] 5.1 Teste de **criação** do banco (arquivo novo é criado) (RF003-CA010)
- [x] 5.2 Teste de **execução das migrações** e da **idempotência** (não
  reaplica) (RF003-CA006, RF003-CA010)
- [x] 5.3 Teste de **persistência**: gravar um dado, fechar a conexão, reabrir e
  conferir que o dado permanece (RF003-CA004, RF003-CA010)
- [x] 5.4 Teste de **tratamento de falhas** (ex.: caminho sem permissão) devolve
  erro útil (RF003-CA009, RF003-CA010)
- [x] 5.5 Manter os testes existentes de `mensagem_inicial` e `estado_inicial`
  passando (sem regressão do RF001/RF002)

## 6. Validação final

- [x] 6.1 `cargo test --manifest-path src-tauri/Cargo.toml --lib` passa
- [x] 6.2 `npm run build` conclui sem erros
- [x] 6.3 `npm run tauri dev`: o splash aparece, o banco é inicializado e a
  aplicação abre em Meus Livros, com temas e navegação intactos
  (RF003-CA005, RF003-CA009)
- [x] 6.4 Verificar que o arquivo do banco é criado no diretório de dados do
  aplicativo e preservado entre execuções (RF003-CA002, RF003-CA003,
  RF003-CA004)
- [x] 6.5 Atualizar/estender `scripts/verificar-rf002.mjs` (ou criar
  `scripts/verificar-rf003.mjs`) para cobrir a inicialização do banco e o
  comando de teste (RF003-CA008)
- [x] 6.6 `npm run tauri build` gera o executável para Windows (RF003-CA011)
- [x] 6.7 `openspec validate rf003-infraestrutura-banco-dados` e marcar as
  tarefas conforme concluídas
