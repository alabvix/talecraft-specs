## ADDED Requirements

### Requirement: Migração v12 dos personagens do livro
O sistema SHALL acrescentar, na migração **v12** aditiva, a tabela `livro_personagem` com o par `livro_id` + `personagem_id` como chave primária, referências ao livro e ao personagem global, `CHECK` do **Papel** e as colunas de texto do vínculo, sem editar passos publicados da v1 à v11 e preservando os dados de bancos existentes (RF014-RN006, RF014-RN007, RF014-CA013).

#### Scenario: Banco v11 migra para v12
- **GIVEN** um banco criado e migrado até a v11 (RF011/RF013)
- **WHEN** o aplicativo abre o banco com o RF014
- **THEN** a tabela `livro_personagem` é criada e os livros, subgêneros, abas narrativas, humor, personagens, relações, mundos, entradas e facções permanecem intactos (RF014-RN006, RF014-CA013)

#### Scenario: Livro existente começa sem elenco
- **GIVEN** um livro foi criado antes da v12
- **WHEN** o banco migra para a v12
- **THEN** o livro não tem nenhum personagem associado, sem erro e sem conteúdo fictício (RF014-RN012, RF014-CA013)

#### Scenario: Vínculo duplicado é recusado pelo esquema
- **GIVEN** a tabela `livro_personagem` existe e o par livro–personagem já foi gravado
- **WHEN** o desenvolvedor tenta inserir o mesmo par novamente
- **THEN** a chave primária composta recusa a gravação e o vínculo existente não é alterado (RF014-RN005, RF014-CA013)

#### Scenario: Papel fora da lista é recusado pelo esquema
- **GIVEN** o esquema da v12 está aplicado
- **WHEN** o desenvolvedor tenta gravar um **Papel** fora dos seis valores definidos e do valor vazio
- **THEN** o `CHECK` do SQLite recusa a gravação (RF014-RN004, RF014-CA008, RF014-CA013)

#### Scenario: Personagem em vários livros
- **GIVEN** um personagem global já está associado a um livro
- **WHEN** o mesmo personagem é associado a um segundo livro
- **THEN** existem dois vínculos distintos, um por livro, e a ficha global continua única (RF014-RN001, RF014-CA014)

#### Scenario: Referências exigem livro e personagem existentes
- **GIVEN** a tabela `livro_personagem` existe
- **WHEN** o desenvolvedor tenta gravar um vínculo com `livro_id` ou `personagem_id` inexistente
- **THEN** a chave estrangeira recusa a gravação (RF014-RN006)
