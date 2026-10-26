## ADDED Requirements

### Requirement: Documentação de ambiente e comandos
O projeto SHALL documentar os pré-requisitos, a preparação do ambiente e os
comandos para executar e compilar o aplicativo, de forma que um desenvolvedor
consiga configurar o projeto em uma máquina Windows seguindo apenas a
documentação (RF001-RN006).

#### Scenario: Preparação do ambiente pela documentação
- **GIVEN** uma máquina Windows sem o ambiente preparado
- **WHEN** o desenvolvedor segue a documentação de pré-requisitos e preparação
- **THEN** o projeto fica configurado e pronto para executar (RF001-RN006,
  RF001-CA001)

#### Scenario: Comandos de execução e compilação documentados
- **GIVEN** a documentação do projeto
- **WHEN** o desenvolvedor procura como rodar e como compilar
- **THEN** a documentação lista o comando de desenvolvimento e o comando de
  compilação para Windows, ambos executáveis a partir da raiz (RF001-RN006,
  RF001-CA002, RF001-CA005)
