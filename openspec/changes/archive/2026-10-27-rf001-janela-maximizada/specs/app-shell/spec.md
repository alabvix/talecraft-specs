## MODIFIED Requirements

### Requirement: Janela desktop com mensagem de inicialização
O aplicativo SHALL abrir uma janela desktop **maximizada**, ocupando a área útil da tela e mantendo a barra de título nativa, exibindo o nome **TaleCraft** e uma mensagem indicando que a inicialização foi bem-sucedida (RF001-RN002, RF001-CA002, RF001-CA006).

#### Scenario: Janela abre maximizada com barra de título
- **GIVEN** o aplicativo em execução
- **WHEN** a janela desktop é carregada
- **THEN** a janela ocupa a largura da tela e a altura da área útil, mantendo a barra de título nativa e a barra de tarefas visíveis (RF001-RN002, RF001-CA006)

#### Scenario: Janela abre com identidade e mensagem
- **GIVEN** o aplicativo em execução
- **WHEN** a janela desktop é carregada
- **THEN** a interface exibe o nome `TaleCraft` e uma mensagem de inicialização bem-sucedida visível ao usuário (RF001-RN002, RF001-CA002, RF001-CA003)

#### Scenario: Reabertura continua maximizada
- **GIVEN** o aplicativo foi fechado maximizado
- **WHEN** o aplicativo é aberto novamente
- **THEN** a janela volta a abrir maximizada, sem depender de estado salvo (RF001-RN002, RF001-CA006)
