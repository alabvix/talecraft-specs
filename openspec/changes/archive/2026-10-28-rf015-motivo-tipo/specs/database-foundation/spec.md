## ADDED Requirements

### Requirement: Migração v16 do motivo do tipo
O sistema SHALL acrescentar, na migração **v16** aditiva, a coluna `motivo_tipo` em `capitulo`, com texto livre e valor padrão vazio, sem recriar a tabela nem editar passos publicados da v1 à v15, preservando os capítulos, os personagens do arco e os dados dos livros (RF015-RN006, RF015-RN013, RF015-CA019).

#### Scenario: Banco v15 migra para v16
- **GIVEN** um banco na v15 com livros, capítulos e personagens do arco
- **WHEN** o aplicativo abre o banco com o ajuste do RF015
- **THEN** a coluna `motivo_tipo` é criada e os capítulos anteriores permanecem intactos (RF015-RN006, RF015-CA019)

#### Scenario: Capítulo antigo ganha motivo vazio
- **GIVEN** um capítulo gravado antes da v16, com Tipo definido
- **WHEN** a migração v16 termina
- **THEN** o Tipo continua o mesmo e o **Motivo do Tipo** fica vazio (RF015-RN013, RF015-CA019)

#### Scenario: Motivo do Tipo é gravado e relido
- **GIVEN** a coluna `motivo_tipo` existe
- **WHEN** o desenvolvedor grava um texto no capítulo e lê de volta
- **THEN** o mesmo texto é devolvido, sem alterar o Tipo nem os demais campos (RF015-RN013, RF015-CA019)
