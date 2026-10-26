# dev-tooling

## Purpose

Comandos de execução em desenvolvimento e de compilação para Windows do
TaleCraft, executáveis a partir da raiz do projeto.

Cobre o requisito **RF001** (estrutura inicial e execução da aplicação).

## Requirements

### Requirement: Execução em desenvolvimento a partir da raiz
O projeto SHALL oferecer comandos, executáveis a partir da raiz, que iniciam o
servidor de desenvolvimento do Vite e a janela desktop do Tauri no modo de
desenvolvimento (RF001-RN004).

#### Scenario: Início do modo de desenvolvimento
- **GIVEN** o ambiente preparado (Node.js e toolchain Rust/Tauri CLI instalados)
- **WHEN** o desenvolvedor executa o comando de desenvolvimento documentado a
  partir da raiz do projeto
- **THEN** o servidor Vite é iniciado e a janela desktop do TaleCraft abre
  carregando a interface do servidor de desenvolvimento (RF001-RN004,
  RF001-CA002, RF001-CA003)

### Requirement: Compilação para Windows
O projeto SHALL oferecer um comando, executável a partir da raiz, que compila o
aplicativo para Windows, gerando um binário executável que inicia sem depender
do servidor de desenvolvimento (RF001-RN005).

#### Scenario: Geração do executável
- **GIVEN** o ambiente preparado em uma máquina Windows
- **WHEN** o desenvolvedor executa o comando de compilação documentado
- **THEN** o processo conclui com sucesso e produz um executável do TaleCraft
  para Windows (RF001-RN005, RF001-CA005)

#### Scenario: Execução da versão compilada
- **GIVEN** o executável gerado pela compilação
- **WHEN** o desenvolvedor executa o binário com o servidor de desenvolvimento
  desligado
- **THEN** a janela desktop abre e a interface React é carregada corretamente
  (RF001-RN005, RF001-CA005)
