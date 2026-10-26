## MODIFIED Requirements

### Requirement: Migrações idempotentes e não destrutivas
As migrações SHALL ser aplicadas **somente quando necessárias** (isto é, quando
o esquema ainda não está na versão alvo), **sem recriar ou apagar dados
existentes** (RF003-CA006). Migrações que criam **tabelas de domínio** de
requisitos posteriores SHALL seguir a mesma regra: apenas **adicionam** tabelas e
colunas, nunca removem nem recriam dados já gravados (RF003-CA006, RF004-CA020).

#### Scenario: Banco já atualizado não é migrado de novo
- **GIVEN** o banco já está na versão de esquema mais recente
- **WHEN** o aplicativo inicia novamente
- **THEN** nenhuma migração é reaplicada e os dados existentes permanecem
  intactos (RF003-CA006)

#### Scenario: Migração não destrói dados
- **GIVEN** existe um dado gravado por uma versão anterior do esquema
- **WHEN** uma nova migração é aplicada
- **THEN** os dados existentes são preservados, sem recriação ou remoção de
  tabelas com dados (RF003-CA006)

#### Scenario: Migração de domínio apenas acrescenta o esquema
- **GIVEN** um banco já inicializado pelo RF003, com dados na infraestrutura
- **WHEN** o RF004 aplica a migração que cria as tabelas de personagens
- **THEN** as tabelas de domínio são acrescentadas por uma nova versão de
  esquema, e os dados anteriores permanecem intactos (RF004-CA020)

### Requirement: Sem entidades de negócio
Este requisito SHALL **não** introduzir entidades ou funcionalidades de negócio
(como livros, personagens ou capítulos): a infraestrutura é genérica e será
usada pelos requisitos posteriores (RF003-CA012). Essa restrição vale **para o
escopo do RF003**; requisitos posteriores SHALL acrescentar suas próprias
entidades por **migrações versionadas aditivas**, sem alterar a infraestrutura
criada aqui (RF003-CA012, RF004-CA020).

#### Scenario: Banco sem tabelas de domínio
- **GIVEN** a infraestrutura do banco foi implementada
- **WHEN** o esquema inicial é inspecionado
- **THEN** ele contém apenas o necessário para a infraestrutura e as migrações,
  sem tabelas de livros, personagens ou capítulos (RF003-CA012)

#### Scenario: Requisito de domínio acrescenta sua própria migração
- **GIVEN** a infraestrutura do banco já está implementada e validada
- **WHEN** um requisito de domínio precisa de tabelas próprias
- **THEN** ele as cria por uma nova migração versionada, sem modificar a
  migração original do RF003 (RF004-CA020)
