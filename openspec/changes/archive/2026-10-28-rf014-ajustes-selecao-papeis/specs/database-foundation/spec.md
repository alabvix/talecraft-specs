## ADDED Requirements

### Requirement: Migração v13 dos papéis do vínculo
O sistema SHALL ampliar, na migração **v13** aditiva, o `CHECK` do **Papel** de `livro_personagem` para os treze valores definidos no RF014, recriando a tabela, copiando os vínculos existentes com os seus textos e recriando o índice por `personagem_id`, sem editar passos publicados da v1 à v12 (RF014-RN004, RF014-RN006, RF014-CA008, RF014-CA013).

#### Scenario: Banco v12 migra para v13
- **GIVEN** um banco na v12 com vínculos livro–personagem gravados
- **WHEN** o aplicativo abre o banco com o ajuste do RF014
- **THEN** a tabela `livro_personagem` passa a aceitar os treze papéis, e os vínculos, papéis e textos anteriores permanecem intactos (RF014-RN004, RF014-CA013)

#### Scenario: Papéis novos aceitos pelo esquema
- **GIVEN** o esquema da v13 está aplicado
- **WHEN** o desenvolvedor grava um vínculo com **Oponente**, **Confidente**, **Figurante**, **Coprotagonista**, **Mentor**, **Herói** ou **Vilão**
- **THEN** o `CHECK` do SQLite aceita cada um dos novos valores (RF014-RN004, RF014-CA008)

#### Scenario: Papel fora da lista continua recusado
- **GIVEN** o esquema da v13 está aplicado
- **WHEN** o desenvolvedor tenta gravar um **Papel** fora dos treze valores e do valor vazio
- **THEN** o `CHECK` do SQLite recusa a gravação (RF014-RN004, RF014-CA008)

#### Scenario: Chave composta e referências continuam valendo
- **GIVEN** a tabela `livro_personagem` foi recriada na v13
- **WHEN** o desenvolvedor tenta inserir o mesmo par livro–personagem ou uma referência inexistente
- **THEN** a chave primária composta ou a chave estrangeira recusa a gravação (RF014-RN005, RF014-RN006)
