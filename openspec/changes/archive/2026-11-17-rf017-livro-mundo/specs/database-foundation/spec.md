## ADDED Requirements

### Requirement: Migração v17 dos mundos do livro
O sistema SHALL evoluir o esquema para a **v17** por um passo **aditivo** que cria a tabela `livro_mundo` com a chave composta `(livro_id, mundo_id)`, a coluna `ordem` da associação, `criado_em`, chaves estrangeiras para `livro` e `mundo_global` e índice por `mundo_id`, sem recriar nem apagar tabelas existentes, e SHALL preservar livros, personagens, relações, mundos, entradas, facções, vínculos, capítulos e humor ao migrar de um banco v16 (RF017-RN011, RF017-CA020).

#### Scenario: Banco v16 migra para a v17
- **GIVEN** um banco na v16 com livros, personagens, mundos, entradas, facções, vínculos e capítulos
- **WHEN** o aplicativo abre e aplica as migrações
- **THEN** o esquema fica na v17, a tabela `livro_mundo` existe e nenhum dado anterior é perdido (RF017-RN011, RF017-CA020)

#### Scenario: Associação duplicada recusada
- **GIVEN** o livro e o mundo já estão associados
- **WHEN** uma segunda associação do mesmo par é tentada no banco
- **THEN** a chave composta recusa a duplicidade (RF017-RN004)

#### Scenario: Ordem preservada
- **GIVEN** dois mundos foram associados ao livro em sequência
- **WHEN** as associações são lidas
- **THEN** a coluna `ordem` devolve a sequência de associação (RF017-RN002)
