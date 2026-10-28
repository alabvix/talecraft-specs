## MODIFIED Requirements

### Requirement: Janela desktop com mensagem de inicialização
O aplicativo SHALL abrir uma janela desktop em **modo de tela cheia**, exibindo o nome **TaleCraft** e uma mensagem indicando que a inicialização foi bem-sucedida (RF001-RN002, RF001-CA002, RF001-CA006).

#### Scenario: Janela abre em tela cheia
- **GIVEN** o aplicativo em execução
- **WHEN** a janela desktop é carregada
- **THEN** o conteúdo ocupa toda a tela, sem barra de título nem área de trabalho visível (RF001-RN002, RF001-CA006)

#### Scenario: Janela abre com identidade e mensagem
- **GIVEN** o aplicativo em execução
- **WHEN** a janela desktop é carregada
- **THEN** a interface exibe o nome `TaleCraft` e uma mensagem de inicialização bem-sucedida visível ao usuário (RF001-RN002, RF001-CA002, RF001-CA003)

#### Scenario: Reabertura continua em tela cheia
- **GIVEN** o aplicativo foi fechado em tela cheia
- **WHEN** o aplicativo é aberto novamente
- **THEN** a janela volta a abrir em tela cheia, sem depender de estado salvo (RF001-RN002, RF001-CA006)
