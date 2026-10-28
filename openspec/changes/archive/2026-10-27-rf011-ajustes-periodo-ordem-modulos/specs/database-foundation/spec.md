## ADDED Requirements

### Requirement: Migração v11 do período da história
O sistema SHALL acrescentar, na migração **v11** aditiva, as colunas `periodo_de` e `periodo_ate` à tabela `livro`, com texto vazio como padrão, sem editar passos publicados da v1 à v10 e preservando os dados de bancos existentes (RF011-RN018, RF011-CA023).

#### Scenario: Banco v10 migra para v11
- **GIVEN** um banco criado e migrado até a v10 (RF013)
- **WHEN** o aplicativo abre o banco com o ajuste do período
- **THEN** as colunas `periodo_de` e `periodo_ate` são criadas e os livros e dados anteriores permanecem intactos (RF011-RN018, RF011-CA023)

#### Scenario: Livro existente ganha período vazio
- **GIVEN** um livro foi criado antes da v11
- **WHEN** o banco migra para a v11
- **THEN** o livro passa a ter `periodo_de` e `periodo_ate` vazios, sem erro e sem conteúdo fictício (RF011-RN018)

#### Scenario: Período é texto livre
- **GIVEN** a tabela `livro` está na v11
- **WHEN** o escritor grava **De** = `Século XXII` e **Até** = `2189`
- **THEN** os dois valores ficam gravados no mesmo registro do livro (RF011-RN018, RF011-CA023)
