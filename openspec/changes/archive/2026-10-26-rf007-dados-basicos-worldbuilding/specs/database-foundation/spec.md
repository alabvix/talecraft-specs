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
um passo já publicado (RF005-RN010, RF005-CA015). A migração do domínio de
**mundos** SHALL seguir a mesma regra: a versão **v4** apenas acrescenta as
tabelas do mundo e dos seus gêneros, sem alterar as tabelas de personagens e
relações já publicadas (RF007-RN023, RF007-CA030).

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

#### Scenario: Migração de mundos preserva personagens e relações
- **GIVEN** um banco criado no RF006, com personagens, retratos e relações
  familiares gravados
- **WHEN** o RF007 aplica a migração v4 que cria as tabelas de mundos
- **THEN** as tabelas de mundos são acrescentadas e os personagens, retratos e
  relações existentes permanecem intactos (RF007-RN023, RF007-CA030)

#### Scenario: Banco do RF006 aceita mundos após migrar
- **GIVEN** um banco do RF006 foi migrado para o esquema do RF007
- **WHEN** um mundo com Tipo de Mundo e Gêneros válidos é gravado
- **THEN** a gravação é aceita, pois a migração v4 acrescentou as tabelas e as
  restrições do domínio de mundos (RF007-RN023, RF007-CA030)
