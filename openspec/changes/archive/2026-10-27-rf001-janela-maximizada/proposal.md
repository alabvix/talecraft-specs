## Why

O ajuste anterior abria a janela em **tela cheia pura** (`fullscreen: true`),
o que esconde a barra de título nativa e dificulta fechar ou mover a janela. O
escritor quer que o aplicativo ocupe a tela, mas continue com a barra de título
do Windows.

## What Changes

- A janela principal passa de `fullscreen: true` para `maximized: true`: ocupa a
  área útil da tela, mantém a barra de título e deixa a barra de tarefas visível.
- O verificador de janela passa a se chamar
  `scripts/verificar-janela-maximizada.mjs` e confere largura de tela, altura da
  área útil e a presença da barra de título nativa.
- Nenhuma alteração de layout, comando Rust, banco ou biblioteca.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `app-shell`: o requisito **Janela desktop com mensagem de inicialização**
  passa de tela cheia para **janela maximizada com barra de título**.

## Impact

- **Requisito coberto:** RF001 (RF001-RN002 e RF001-CA006), substituindo o
  ajuste `rf001-janela-tela-cheia`.
- **Fora do escopo:** alternar entre maximizado e janela normal por atalho;
  lembrar posição/tamanho; esconder a barra de tarefas.
- **Configuração:** `src-tauri/tauri.conf.json` (`app.windows[0].maximized`).
- **Verificação:** `scripts/verificar-janela-maximizada.mjs`; os demais
  verificadores não dependem do tamanho exato da janela.
- **Documentação:** `documents/talecraft.md`, `AGENTS.md` dos dois repositórios
  e a spec consolidada `app-shell`.
