## ADDED Requirements

### Requirement: Migração v14 dos capítulos
O sistema SHALL acrescentar, na migração **v14** aditiva, as tabelas `capitulo` (livro, número inteiro único por livro, título, status, tipo, textos de planejamento, cenário e datas) e `capitulo_personagem` (personagem, evento e tipo de evento com `CHECK` da combinação), sem editar passos publicados da v1 à v13 e preservando os dados de bancos existentes (RF015-RN003, RF015-RN006, RF015-RN012, RF015-CA011).

#### Scenario: Banco v13 migra para v14
- **GIVEN** um banco na v13 com livros, personagens, vínculos de elenco e demais dados
- **WHEN** o aplicativo abre o banco com o RF015
- **THEN** as tabelas `capitulo` e `capitulo_personagem` são criadas e os dados anteriores permanecem intactos (RF015-RN006, RF015-CA011)

#### Scenario: Capítulo nasce com os padrões
- **GIVEN** o esquema da v14 está aplicado
- **WHEN** o desenvolvedor insere um capítulo apenas com o livro e o número
- **THEN** o status é **Esboço**, o tipo é **Não definido** e a data de criação é preenchida (RF015-RN002, RF015-RN004)

#### Scenario: Número único por livro
- **GIVEN** um livro já tem o capítulo de número 1
- **WHEN** o desenvolvedor tenta inserir outro capítulo de número 1 no mesmo livro
- **THEN** a chave única recusa a gravação; o mesmo número em outro livro é aceito (RF015-RN003, RF015-CA003)

#### Scenario: Par evento/tipo inválido é recusado
- **GIVEN** a associação capítulo–personagem existe
- **WHEN** o desenvolvedor tenta gravar **Ponto de Virada** com **Ascensão** ou **Neutro** com **Apogeu**
- **THEN** o `CHECK` do SQLite recusa a gravação (RF015-RN005, RF015-CA008, RF015-CA011)

#### Scenario: Referências exigem livro e personagem existentes
- **GIVEN** as tabelas da v14 existem
- **WHEN** o desenvolvedor tenta gravar um capítulo com livro inexistente ou uma associação com personagem inexistente
- **THEN** a chave estrangeira recusa a gravação (RF015-RN001, RF015-RN006)
