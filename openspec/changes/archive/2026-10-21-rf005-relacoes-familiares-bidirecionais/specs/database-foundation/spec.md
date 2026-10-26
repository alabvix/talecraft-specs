# database-foundation (delta do RF005)

## MODIFIED Requirements

### Requirement: Migrações idempotentes e não destrutivas
As migrações SHALL ser aplicadas **somente quando necessárias** (isto é, quando
o esquema ainda não está na versão alvo), **sem recriar ou apagar dados
existentes** (RF003-CA006). Migrações que criam **tabelas de domínio** de
requisitos posteriores SHALL seguir a mesma regra: apenas **adicionam** tabelas e
colunas, nunca removem nem recriam dados já gravados (RF003-CA006, RF004-CA020).
O mesmo vale quando o requisito posterior precisa **ampliar uma restrição já
publicada** — como o `CHECK` dos tipos de relação —: a mudança SHALL entrar como
**novo passo de migração**, preservando os dados gravados, e **nunca** editando
um passo já publicado (RF005-RN010, RF005-CA015).

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

#### Scenario: Migração amplia restrição sem perder dados
- **GIVEN** um banco criado no RF004, com o `CHECK` de oito tipos e personagens
  e relações já gravados
- **WHEN** o RF005 aplica a migração que amplia a lista de tipos para dez
- **THEN** o esquema passa a aceitar os tipos novos e os personagens e relações
  existentes permanecem intactos (RF005-RN010, RF005-CA015)

#### Scenario: Banco do RF004 aceita os tipos novos após migrar
- **GIVEN** um banco do RF004 foi migrado para o esquema do RF005
- **WHEN** uma relação com o tipo Irmão/Irmã ou Aprendiz é gravada
- **THEN** a gravação é aceita, pois o `CHECK` do esquema foi ampliado
  (RF005-RN010, RF005-CA015)
