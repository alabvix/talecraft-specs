## ADDED Requirements

### Requirement: Migração v22 da raiz do mundo
O sistema SHALL evoluir o esquema para a **v22** por um passo **aditivo** que recria `localidade` com o tipo interno **Mundo** no `CHECK` e a coluna `raiz` (`0/1`), insere uma raiz com o nome de cada mundo existente, reparenta as localidades sem pai para essa raiz e cria um índice único parcial de uma raiz por mundo, sem perder ids, imagens ou hierarquia das linhas existentes, e SHALL aplicar a **v23** corretiva que recria `capitulo` para `cenario_localidade_id` voltar a referenciar `localidade`, corrigindo bancos que ficaram com `localidade_antiga` (RF018-RN006, RF018-CA020).

#### Scenario: Banco v21 migra para a v22
- **GIVEN** um banco na v21 com mundos e localidades, algumas sem pai
- **WHEN** o aplicativo abre e aplica as migrações
- **THEN** o esquema fica na v22, cada mundo ganha uma raiz do tipo **Mundo** e as localidades sem pai passam a ser filhas dela (RF018-RN006, RF018-CA020)

#### Scenario: Uma raiz por mundo
- **GIVEN** o mundo já tem a sua raiz
- **WHEN** uma gravação tenta inserir outra linha com `raiz = 1` para o mesmo mundo
- **THEN** o índice único parcial recusa (RF018-RN003, RF018-CA020)

#### Scenario: Tipo Mundo no CHECK
- **GIVEN** a tabela `localidade` está na v22
- **WHEN** uma gravação insere o tipo **Mundo** para a raiz
- **THEN** o `CHECK` aceita; um tipo fora da lista continua recusado (RF018-RN002, RF018-RN006)

#### Scenario: Banco v22 com FK quebrada migra para a v23
- **GIVEN** um banco na v22 com `capitulo.cenario_localidade_id` referenciando `localidade_antiga`
- **WHEN** o aplicativo abre e aplica a v23
- **THEN** a FK volta a referenciar `localidade`, as linhas de capítulo são preservadas e a gravação de cenário volta a funcionar (RF018-RN006, RF018-CA020)
