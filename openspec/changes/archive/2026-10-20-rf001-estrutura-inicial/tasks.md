## 1. Pré-requisitos e preparação do ambiente

- [x] 1.1 Verificar Node.js LTS e npm instalados (`node --version`, `npm --version`) — pré-requisito do Vite
- [x] 1.2 Verificar a toolchain Rust (`rustc --version`, `cargo --version`) — pré-requisito do back-end
- [x] 1.3 Verificar os pré-requisitos do Tauri no Windows: Microsoft C++ Build Tools e WebView2 Runtime
- [x] 1.4 Documentar como verificar cada pré-requisito (comando de conferência e resultado esperado) — RF001-RN006

## 2. Estrutura inicial do projeto (app-shell)

- [x] 2.1 Gerar o esqueleto com o template oficial Tauri 2 + React (JavaScript) + Vite (`create-tauri-app`) na raiz do repositório
- [x] 2.2 Conferir a estrutura gerada: `src/`, `src-tauri/`, `index.html`, `package.json`, `vite.config.js` — RF001-RN001
- [x] 2.3 Ajustar o `tauri.conf.json` para o nome do aplicativo `TaleCraft` (e identificador/versão) — RF001-RN002
- [x] 2.4 Conferir a configuração de integração Vite ↔ Tauri (`devUrl`, `beforeDevCommand`, `beforeBuildCommand`, `frontendDist`)
- [x] 2.5 Limpar o conteúdo de exemplo do template (contador/demo padrão) para a tela inicial do TaleCraft

## 3. Interface inicial (app-shell)

- [x] 3.1 Criar a tela inicial React que exibe o nome `TaleCraft` — RF001-RN002
- [x] 3.2 Adicionar a mensagem de inicialização bem-sucedida na tela — RF001-RN002, RF001-CA003
- [x] 3.3 Escrever os textos da interface em português (BR)

## 4. Comunicação React ↔ Rust (rust-bridge)

- [x] 4.1 Implementar o comando Rust de demonstração (função com `#[tauri::command]`) que retorna uma mensagem identificando a origem no back-end — RF001-RN003
- [x] 4.2 Registrar o comando no `invoke_handler` do Tauri — RF001-RN003
- [x] 4.3 Invocar o comando pelo React com `invoke` do `@tauri-apps/api` — RF001-RN003, RF001-CA004
- [x] 4.4 Exibir o retorno do comando na interface — RF001-RN003, RF001-CA004
- [x] 4.5 Tratar o estado de erro/carregamento da chamada (exibir falha se o comando não responder)
- [x] 4.6 Adicionar teste Rust do comando de demonstração (`cargo test --lib`) — garante resposta não vazia identificando o back-end Rust

## 5. Comandos de desenvolvimento e compilação (dev-tooling)

- [x] 5.1 Padronizar o comando de desenvolvimento em `package.json` (`npm run tauri dev`) que sobe Vite + janela desktop a partir da raiz — RF001-RN004, RF001-CA002
- [x] 5.2 Padronizar o comando de compilação em `package.json` (`npm run tauri build`) que compila para Windows a partir da raiz — RF001-RN005, RF001-CA005
- [x] 5.3 Garantir que `@tauri-apps/cli` está nas devDependencies para não exigir instalação global
- [x] 5.4 Validar `npm run tauri dev`: servidor Vite sobe e a janela abre com a interface React — RF001-CA002, RF001-CA003
- [x] 5.5 Validar `npm run tauri build`: gera o executável e ele abre sem o servidor de desenvolvimento — RF001-CA005

## 6. Documentação (setup-guide)

- [x] 6.1 Criar o guia de setup com pré-requisitos e preparação do ambiente no Windows — RF001-RN006, RF001-CA001
- [x] 6.2 Documentar o comando de execução em desenvolvimento e o que ele deve produzir — RF001-RN006, RF001-CA002
- [x] 6.3 Documentar o comando de compilação e onde encontrar o executável gerado — RF001-RN006, RF001-CA005
- [x] 6.4 Atualizar o `AGENTS.md` para registrar a stack correta (Tauri 2 + Rust + React/Vite) e apontar `documents/talecraft.md` como fonte da verdade

## 7. Validação final do requisito

- [x] 7.1 Executar o app em desenvolvimento e confirmar a janela, o nome e a mensagem de inicialização — RF001-CA002, RF001-CA003
- [x] 7.2 Confirmar o retorno do comando Rust exibido no front-end — RF001-CA004
- [x] 7.3 Compilar e executar a versão compilada no Windows — RF001-CA005
- [x] 7.4 Revisar cada critério de aceite (RF001-CA001 a RF001-CA005) e confirmar que todos são atendidos
- [x] 7.5 Confirmar que nada fora do escopo foi introduzido (sem banco, sem entidades, sem portar o protótipo)
