## ADDED Requirements

### Requirement: Comandos de personagens expostos ao front-end
O back-end Rust SHALL expor **comandos Tauri** para as operações de personagens
e de relações, registrados no Tauri e invocáveis pelo front-end React via
`invoke`: gravar (criar/atualizar, incluindo as relações informadas), listar
(com busca por nome), obter um personagem, associar o retrato, listar os
personagens para a modal de relações e gravar/atualizar uma relação com um dos
oito tipos previstos. Este requisito SHALL **não** expor comando de exclusão de
personagem (RF004-CA001, RF004-CA014, RF004-CA021).

#### Scenario: Front-end lista personagens pelo comando
- **GIVEN** o aplicativo em execução com o banco aberto pelo back-end
- **WHEN** o front-end invoca o comando de listagem de personagens
- **THEN** o back-end consulta o banco e devolve os personagens, sem que o
  front-end acesse o SQLite diretamente (RF004-CA021)

#### Scenario: Front-end grava personagem e relações pelo comando
- **GIVEN** o escritor preencheu um personagem e definiu relações
- **WHEN** o front-end invoca o comando de gravação
- **THEN** o back-end grava o personagem e suas relações nas respectivas tabelas
  e devolve a confirmação (RF004-CA001, RF004-CA014)
