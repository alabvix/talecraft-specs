## ADDED Requirements

### Requirement: Migração v24 dos múltiplos cenários do capítulo
O sistema SHALL evoluir o esquema para a **v24** por um passo **aditivo** que cria a tabela `capitulo_cenario` com `capitulo_id`, `localidade_id` e `ordem`, chave primária composta, chaves estrangeiras para `capitulo` e `localidade` e índice por `localidade_id`, SHALL copiar para ela o valor existente de `capitulo.cenario_localidade_id` como primeira posição e SHALL manter a coluna antiga no esquema, sem perder capítulos, cenários ou hierarquia das localidades (RF017-RN015, RF017-CA023).

#### Scenario: Banco v23 migra para a v24
- **GIVEN** um banco na v23 com capítulos e a coluna `cenario_localidade_id`
- **WHEN** o aplicativo abre e aplica as migrações
- **THEN** o esquema fica na v24 com a tabela `capitulo_cenario` criada e os capítulos preservados (RF017-RN015, RF017-CA023)

#### Scenario: Cenário único copiado para a lista
- **GIVEN** um capítulo da v23 tem `cenario_localidade_id` apontando para uma localidade válida
- **WHEN** a migração v24 termina
- **THEN** a tabela `capitulo_cenario` tem uma linha para o capítulo e a localidade, na ordem 0, e o capítulo lê esse cenário na lista (RF017-RN015, RF017-CA023)

#### Scenario: Muitos cenários por capítulo
- **GIVEN** a tabela `capitulo_cenario` está na v24
- **WHEN** uma gravação tenta inserir o mesmo par capítulo–localidade duas vezes
- **THEN** a chave primária composta recusa a duplicata e a ordem das linhas válidas é preservada (RF017-RN015)

#### Scenario: Remoção de mundo limpa todos os cenários
- **GIVEN** um capítulo tem cenários em localidades de dois mundos do livro
- **WHEN** um dos mundos é removido do livro
- **THEN** somente os cenários daquele mundo saem na mesma transação, o capítulo continua com os cenários do outro mundo e a contagem informa capítulos distintos afetados (RF017-RN006, RF017-RN015, RF017-CA011)
