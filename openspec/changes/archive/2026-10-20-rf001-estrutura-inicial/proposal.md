## Why

O TaleCraft ainda não tem código de aplicação: existe apenas um protótipo visual
em HTML/CSS (`prototype/`) usado para validar a interface. Para começar o
desenvolvimento real é preciso criar a estrutura inicial do aplicativo desktop e
provar que a stack escolhida funciona ponta a ponta na máquina de
desenvolvimento (Windows) — incluindo a comunicação entre o front-end React e o
back-end Rust.

Este change cobre o requisito **RF001 — Estrutura inicial e execução da
aplicação TaleCraft**, cuja definição de pronto é: o desenvolvedor consegue
preparar o ambiente, executar o TaleCraft, validar a comunicação entre React e
Rust e compilar e executar a aplicação no Windows.

## What Changes

- Criar o esqueleto do app desktop com **Tauri 2**, **Rust** (back-end),
  **React + JavaScript + Vite** (front-end) e a configuração que amarra os dois.
- Exibir uma janela desktop com o nome **TaleCraft** e uma mensagem de
  inicialização bem-sucedida.
- Implementar um **comando Rust de demonstração** exposto via `invoke` do Tauri,
  invocado pelo React, cujo retorno é exibido no front-end — serve apenas para
  validar o IPC entre as camadas.
- Configurar os **comandos de execução em desenvolvimento** (servidor Vite +
  janela desktop) a partir da raiz do projeto.
- Configurar a **compilação para Windows**, permitindo executar a versão
  compilada sem depender do servidor de desenvolvimento.
- **Documentar** os pré-requisitos, a preparação do ambiente e os comandos de
  execução e compilação.

### Fora do escopo (conforme o requisito)

Não faz parte deste change: banco de dados funcional (SQLite), entidades de
negócio, gerenciamento de livros, personagens, capítulos, worldbuilding,
gráficos e exportação (HTML/PDC/MD). Nenhuma tela do protótipo é portada aqui.

## Capabilities

### New Capabilities

- `app-shell`: estrutura inicial do projeto (Tauri 2 + Rust + React/Vite) e a
  janela desktop que apresenta o nome TaleCraft e a mensagem de inicialização.
- `rust-bridge`: comando Rust de demonstração exposto ao front-end e invocado
  pelo React via Tauri, com o retorno exibido na interface (validação do IPC).
- `dev-tooling`: comandos de execução em desenvolvimento e compilação para
  Windows a partir da raiz do projeto.
- `setup-guide`: documentação de pré-requisitos, preparação do ambiente e
  comandos de execução e compilação.

### Modified Capabilities

<!-- Nenhuma: ainda não existem specs principais em openspec/specs/. -->

### Decisões de implementação (ver design.md)

- Vite fixado em **6.x** por compatibilidade com o Node da máquina de
  desenvolvimento (D7).
- Ícone do aplicativo gerado por script versionado + `tauri icon` (D8).
- Guia de setup em **`documents/setup.md`**; `AGENTS.md` atualizado para a stack
  correta.

## Impact

- **Novo código:** estrutura Tauri/Rust (`src-tauri/`) e front-end React/Vite
  (`src/`, `index.html`, `package.json`, `vite.config.js`).
- **Dependências de ferramentas externas:** Node.js/npm (Vite) e toolchain Rust +
  Tauri CLI; pré-requisitos do Tauri no Windows (Microsoft C++ Build Tools e
  WebView2).
- **Documentação:** novo guia de setup/execução (a ser referenciado pelo
  `AGENTS.md`).
- **Não afeta:** o protótipo em `prototype/` permanece intacto como referência
  visual; nenhuma funcionalidade de negócio é implementada.
- **Atenção:** o `AGENTS.md` atual descreve a stack como Java/Kotlin/Spring
  Boot/Thymeleaf. O documento `documents/talecraft.md` define Tauri 2 + Rust +
  React/Vite e é a fonte da verdade; o `AGENTS.md` deverá ser atualizado.
