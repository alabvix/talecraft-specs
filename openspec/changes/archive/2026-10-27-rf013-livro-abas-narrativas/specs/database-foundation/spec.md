## ADDED Requirements

### Requirement: Migração v10 das abas narrativas
O sistema SHALL acrescentar, na migração **v10** aditiva, as colunas de texto e de listas fechadas das abas **Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo** à tabela `livro` e SHALL criar a tabela filha `livro_humor`, sem editar passos publicados da v1 à v9 e preservando os dados de bancos existentes (RF013-RN003, RF013-CA010).

#### Scenario: Banco v9 migra para v10
- **GIVEN** um banco criado e migrado até a v9 (RF012)
- **WHEN** o aplicativo abre o banco com o RF013
- **THEN** as colunas novas e a tabela `livro_humor` são criadas e os livros, subgêneros, resumo, final e dados anteriores permanecem intactos (RF013-RN003, RF013-CA010)

#### Scenario: Livro existente ganha valores vazios
- **GIVEN** um livro foi criado antes da v10
- **WHEN** o banco migra para a v10
- **THEN** os textos novos ficam vazios, as listas ficam sem valor e o livro não tem nenhum humor, sem erro e sem conteúdo fictício (RF013-RN003, RF013-RN008, RF013-CA010)

#### Scenario: Humor múltiplo no esquema
- **GIVEN** a tabela `livro_humor` existe
- **WHEN** um livro é gravado com **Ironia** e **Sátira**
- **THEN** cada valor é uma linha associada ao `livro_id`, sem repetição do mesmo par (RF013-RN002, RF013-RN006, RF013-CA006)

#### Scenario: Valores fora das listas são recusados
- **GIVEN** o esquema da v10 está aplicado
- **WHEN** o desenvolvedor tenta gravar um humor ou um narrador fora das listas fechadas
- **THEN** o `CHECK` do SQLite recusa a gravação (RF013-RN002, RF013-RN005)
