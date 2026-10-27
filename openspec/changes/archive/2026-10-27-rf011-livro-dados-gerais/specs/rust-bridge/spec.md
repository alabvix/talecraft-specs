## ADDED Requirements

### Requirement: Comandos de livros expostos ao front-end
O sistema SHALL expor ao front-end, pelo `invoke_handler`, os comandos `listar_livros`, `obter_livro`, `salvar_livro`, `listas_livro` e `estatisticas_biblioteca`, com as regras de domínio no back-end e apenas mensagens úteis no IPC (RF011-RN002 a RF011-RN007, RF011-CA003 a RF011-CA011).

#### Scenario: Listar e abrir livros
- **GIVEN** existem livros cadastrados
- **WHEN** o front-end chama `listar_livros` e depois `obter_livro`
- **THEN** recebe os livros com os subgêneros e os dados gerais, sem falar SQLite (RF011-CA005, RF011-CA006)

#### Scenario: Gravar livro
- **GIVEN** o front-end chama `salvar_livro` com um título válido
- **WHEN** o comando termina
- **THEN** o livro e os subgêneros foram gravados juntos e o livro salvo é devolvido (RF011-RN007)

#### Scenario: Listas fechadas do formulário
- **GIVEN** a página Dados do Livro vai montar os controles
- **WHEN** o front-end chama `listas_livro`
- **THEN** recebe gêneros, subgêneros por gênero, faixas de público e idiomas do back-end (RF011-CA007, RF011-CA010, RF011-CA011)

#### Scenario: Estatísticas da biblioteca
- **GIVEN** a tela Meus Livros vai montar as métricas
- **WHEN** o front-end chama `estatisticas_biblioteca`
- **THEN** recebe as contagens de livros, personagens, capítulos e entradas de mundo (RF011-CA018)
