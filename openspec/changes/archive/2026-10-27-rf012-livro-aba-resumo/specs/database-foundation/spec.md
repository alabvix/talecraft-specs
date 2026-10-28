## ADDED Requirements

### Requirement: Migração v9 do resumo e final do livro
O sistema SHALL acrescentar, na migração **v9** aditiva, as colunas `resumo` e `final_livro` à tabela `livro`, com texto vazio como padrão, sem editar passos publicados da v1 à v8 e preservando os dados de bancos existentes (RF012-RN002, RF012-CA007).

#### Scenario: Banco v8 migra para v9
- **GIVEN** um banco criado e migrado até a v8 (RF011)
- **WHEN** o aplicativo abre o banco com o RF012
- **THEN** as colunas `resumo` e `final_livro` são criadas e os livros, subgêneros e dados anteriores permanecem intactos (RF012-RN002, RF012-CA007)

#### Scenario: Livros existentes ganham texto vazio
- **GIVEN** um livro foi criado antes da v9, sem resumo nem final
- **WHEN** o banco migra para a v9
- **THEN** o livro passa a ter `resumo` e `final_livro` vazios, sem erro e sem conteúdo fictício (RF012-RN002, RF012-RN007, RF012-CA007)

#### Scenario: Textos pertencem ao livro
- **GIVEN** a tabela `livro` está na v9
- **WHEN** o escritor salva um livro com **Resumo** e **Final do Livro**
- **THEN** os dois textos ficam gravados nas colunas do mesmo registro do livro (RF012-RN003, RF012-CA003)
