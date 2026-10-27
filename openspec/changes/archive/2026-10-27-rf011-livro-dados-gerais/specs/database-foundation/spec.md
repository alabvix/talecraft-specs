## ADDED Requirements

### Requirement: Esquema de livros
O sistema SHALL criar, na migração **v7** aditiva, as tabelas `livro` e `livro_subgenero`, sem alterar os passos publicados da v1 à v6 e preservando os dados de bancos existentes (RF011-RN002, RF011-RN003, RF011-RN004, RF011-RN005, RF011-RN006, RF011-RN007).

#### Scenario: Banco v6 migra para v7
- **GIVEN** um banco criado e migrado até a v6 (RF010)
- **WHEN** o aplicativo abre o banco com o RF011
- **THEN** as tabelas `livro` e `livro_subgenero` são criadas e os dados anteriores permanecem intactos (RF011-RN007)

#### Scenario: Título único garantido pelo banco
- **GIVEN** a tabela `livro` existe
- **WHEN** o desenvolvedor inspeciona o esquema
- **THEN** `titulo` é `NOT NULL`, `UNIQUE` e `COLLATE NOCASE`, e as listas fechadas de gênero, faixa de público, idioma e subgênero têm `CHECK` (RF011-RN002 a RF011-RN006)

#### Scenario: Subgêneros pertencem ao livro
- **GIVEN** a tabela `livro_subgenero` existe
- **WHEN** um livro é gravado com subgêneros
- **THEN** cada subgênero é uma linha associada ao `livro_id`, com chave primária composta que impede repetição (RF011-RN004)
