# app-shell

## Purpose

Estrutura inicial do aplicativo desktop TaleCraft: a base Tauri 2 + Rust +
React/Vite e a janela que identifica o aplicativo e confirma a inicialização.

Cobre o requisito **RF001** (estrutura inicial e execução da aplicação).
## Requirements
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

