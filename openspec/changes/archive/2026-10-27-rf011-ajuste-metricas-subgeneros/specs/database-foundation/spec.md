## ADDED Requirements

### Requirement: Migração v8 dos subgêneros de Fantasia
O sistema SHALL aplicar a migração **v8** aditiva, recriando `livro_subgenero` com o `CHECK` que inclui os doze subgêneros de **Fantasia**, sem editar o passo v7 e preservando os livros e subgêneros existentes (RF011-RN004).

#### Scenario: Banco v7 migra para v8
- **GIVEN** um banco na v7 com um livro e um subgênero de Fantasia já gravados
- **WHEN** o aplicativo abre o banco com este ajuste
- **THEN** a tabela `livro_subgenero` é recriada com o `CHECK` ampliado e o livro e o subgênero anterior continuam gravados (RF011-RN004)

#### Scenario: Novos subgêneros aceitos
- **GIVEN** um livro com Gênero Principal **Fantasia**
- **WHEN** o escritor grava **Grindark**, **Mitológica** ou **Espada e Feitiçaria**
- **THEN** o banco aceita os subgêneros e a leitura devolve a seleção (RF011-RN004, RF011-CA008)

#### Scenario: Subgênero fora da lista continua recusado
- **GIVEN** um livro com Gênero Principal **Fantasia**
- **WHEN** o escritor tenta gravar um subgênero que não pertence à lista de Fantasia
- **THEN** a gravação é recusada com mensagem útil (RF011-RN004)
