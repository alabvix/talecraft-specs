## ADDED Requirements

### Requirement: Migração v18 das localidades
O sistema SHALL evoluir o esquema para a **v18** por um passo **aditivo** que acrescenta à tabela `localidade` as colunas `tipo` (texto com `DEFAULT 'Não definido'` e `CHECK` da lista fechada), `imagem` (caminho relativo, opcional) e `pai_id` (chave estrangeira para `localidade`, opcional), além de um índice por `pai_id`, sem recriar nem apagar tabelas; as localidades existentes SHALL ficar com **Não definido**, sem imagem e na raiz (RF018-RN006, RF018-CA015).

#### Scenario: Banco v17 migra para a v18
- **GIVEN** um banco na v17 com mundos, localidades, entradas, facções, livros, personagens, capítulos e associações
- **WHEN** o aplicativo abre e aplica as migrações
- **THEN** o esquema fica na v18, a coluna `tipo` vale **Não definido**, `imagem` e `pai_id` ficam nulos e nenhum dado anterior é perdido (RF018-RN006, RF018-CA015)

#### Scenario: Tipo inválido recusado pelo banco
- **GIVEN** a tabela `localidade` já está na v18
- **WHEN** uma gravação tenta um tipo fora da lista fechada
- **THEN** o `CHECK` do banco recusa o valor (RF018-RN002)

### Requirement: Migração v19 dos novos tipos de Localidade
O sistema SHALL evoluir o esquema para a **v19** recriando a tabela `localidade` com o `CHECK` ampliado aos **49** tipos, copiando todas as linhas com os mesmos `id` e recriando os índices, sem perder localidades, imagens, hierarquia, entradas, facções, livros, capítulos ou associações; as migrações SHALL rodar com as chaves estrangeiras desligadas e religá-las ao final (RF018-RN002, RF018-RN006, RF018-CA015).

#### Scenario: Banco v18 migra para a v19
- **GIVEN** um banco na v18 com localidades típadas e capítulos com cenário em localidades
- **WHEN** o aplicativo abre e aplica a v19
- **THEN** as localidades mantêm os ids e os tipos, a FK do cenário continua válida e nenhum dado é perdido (RF018-RN006, RF018-CA015)

#### Scenario: Tipos novos aceitos e inválidos recusados
- **GIVEN** a tabela `localidade` já está na v19
- **WHEN** uma localidade recebe **Igreja**, **Praça** ou **Estádio**
- **THEN** a gravação é aceita; um tipo fora da lista continua recusado pelo `CHECK` (RF018-RN002)
