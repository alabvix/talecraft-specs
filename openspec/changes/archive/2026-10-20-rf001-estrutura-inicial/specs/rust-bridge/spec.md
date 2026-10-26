## ADDED Requirements

### Requirement: Comando Rust de demonstração exposto ao front-end
O back-end Rust SHALL expor um comando de demonstração registrado no Tauri e o
front-end React SHALL invocá-lo por meio do `invoke` do Tauri, exibindo o
retorno recebido. O comando SHALL servir apenas para validar a comunicação entre
as camadas, sem regra de negócio (RF001-RN003).

#### Scenario: Front-end invoca o comando e exibe a resposta
- **GIVEN** o aplicativo em execução com a interface React carregada
- **WHEN** o front-end invoca o comando de demonstração via `invoke`
- **THEN** o comando Rust executa e retorna uma resposta que o front-end exibe
  na interface (RF001-RN003, RF001-CA004)

#### Scenario: Resposta identifica a origem no back-end
- **GIVEN** o comando de demonstração executado com sucesso
- **WHEN** o retorno é exibido no front-end
- **THEN** a resposta deixa claro que veio do back-end Rust, comprovando o IPC
  entre as camadas (RF001-RN003, RF001-CA004)
