## ADDED Requirements

### Requirement: Estrutura inicial do projeto
O projeto SHALL conter a estrutura inicial que reúne Tauri 2, back-end em Rust e
front-end em React com JavaScript e Vite, com a configuração de integração entre
as camadas (RF001-RN001). O aplicativo SHALL ter o nome **TaleCraft**.

#### Scenario: Estrutura de projeto presente
- **GIVEN** um clone limpo do projeto em uma máquina Windows
- **WHEN** o desenvolvedor inspeciona a raiz do projeto
- **THEN** existe a configuração do Tauri (`src-tauri/`), o back-end Rust, o
  front-end React/Vite (`src/`, `index.html`, `package.json`,
  `vite.config.js`) e a configuração que liga o Vite ao Tauri
  (RF001-RN001)

#### Scenario: Identidade do aplicativo definida
- **GIVEN** a configuração do Tauri
- **WHEN** o desenvolvedor lê a configuração da janela/aplicativo
- **THEN** o nome do aplicativo é `TaleCraft` (RF001-RN001, RF001-RN002)

### Requirement: Janela desktop com mensagem de inicialização
O aplicativo SHALL abrir uma janela desktop que exibe o nome **TaleCraft** e uma
mensagem indicando que a inicialização foi bem-sucedida (RF001-RN002).

#### Scenario: Janela abre com identidade e mensagem
- **GIVEN** o aplicativo em execução
- **WHEN** a janela desktop é carregada
- **THEN** a interface exibe o nome `TaleCraft` e uma mensagem de inicialização
  bem-sucedida visível ao usuário (RF001-RN002, RF001-CA002, RF001-CA003)
