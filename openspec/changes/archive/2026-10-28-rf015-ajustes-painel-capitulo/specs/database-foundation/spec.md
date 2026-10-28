## ADDED Requirements

### Requirement: Migração v15 do motivo do evento
O sistema SHALL acrescentar, na migração **v15** aditiva, a coluna `motivo` em `capitulo_personagem`, com texto livre e valor padrão vazio, sem recriar a tabela nem editar passos publicados da v1 à v14, preservando os capítulos, os personagens do arco e os dados dos livros (RF015-RN005, RF015-RN006, RF015-CA008, RF015-CA018).

#### Scenario: Banco v14 migra para v15
- **GIVEN** um banco na v14 com livros, capítulos e personagens do arco
- **WHEN** o aplicativo abre o banco com o ajuste do RF015
- **THEN** a coluna `motivo` é criada e os capítulos e vínculos anteriores permanecem intactos (RF015-RN006, RF015-CA018)

#### Scenario: Vínculo antigo ganha motivo vazio
- **GIVEN** um vínculo capítulo–personagem gravado antes da v15, com Evento e Tipo de Evento
- **WHEN** a migração v15 termina
- **THEN** o Evento e o Tipo de Evento continuam os mesmos e o **Motivo do Evento** fica vazio (RF015-RN005, RF015-CA018)

#### Scenario: Motivo é gravado e relido
- **GIVEN** a coluna `motivo` existe
- **WHEN** o desenvolvedor grava um texto no vínculo e lê de volta
- **THEN** o mesmo texto é devolvido, sem alterar o Evento nem o Tipo de Evento (RF015-RN005, RF015-CA008)
