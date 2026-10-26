## ADDED Requirements

### Requirement: Comandos de mundos expostos ao front-end
O back-end Rust SHALL expor **comandos Tauri** para as operações de mundos,
registrados no `invoke_handler` e invocáveis pelo front-end React via `invoke`:
listar mundos (com busca por nome e filtros por Tipo de Mundo e por Gênero),
obter um mundo com os seus gêneros, salvar (criar/atualizar, incluindo os
gêneros informados), associar a imagem do mundo e exportar o mundo em PDF. Este
requisito SHALL **não** expor comando de exclusão de mundo (RF007-CA021,
RF007-CA031, RF007-CA034).

#### Scenario: Front-end lista mundos pelo comando
- **GIVEN** o aplicativo em execução com o banco aberto pelo back-end
- **WHEN** o front-end invoca o comando de listagem de mundos
- **THEN** o back-end consulta o banco e devolve os mundos, sem que o front-end
  acesse o SQLite diretamente (RF007-CA031)

#### Scenario: Front-end lista com busca e filtros
- **GIVEN** existem mundos cadastrados com tipos e gêneros diferentes
- **WHEN** o front-end invoca a listagem com texto de busca, Tipo de Mundo e
  Gênero
- **THEN** o back-end aplica os três critérios e devolve apenas os mundos que
  atendem a todos eles (RF007-CA008, RF007-CA009, RF007-CA010, RF007-CA011)

#### Scenario: Front-end grava mundo e gêneros pelo comando
- **GIVEN** o escritor preencheu os dados básicos e selecionou gêneros
- **WHEN** o front-end invoca o comando de gravação
- **THEN** o back-end grava o mundo e os gêneros em uma transação e devolve a
  confirmação (RF007-CA015, RF007-CA018)

#### Scenario: Front-end associa a imagem pelo comando
- **GIVEN** o escritor escolheu um arquivo de imagem válido
- **WHEN** o front-end invoca o comando de associação de imagem com o caminho
  escolhido
- **THEN** o back-end valida formato e tamanho, copia o arquivo para o
  diretório de dados e grava o caminho relativo (RF007-CA021, RF007-CA022)

#### Scenario: Front-end exporta o mundo pelo comando
- **GIVEN** a tela de detalhe de um mundo salvo está aberta
- **WHEN** o front-end invoca o comando de exportação com o destino escolhido
- **THEN** o back-end monta o documento e grava o PDF naquele destino
  (RF007-CA026)
