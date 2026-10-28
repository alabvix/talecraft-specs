## Why

Hoje a janela do TaleCraft abre com 1100 × 720 px (`tauri.conf.json`). O RF001
passa a exigir que o aplicativo abra **sempre em modo de tela cheia**, para que o
planejamento ocupe todo o espaço disponível desde a primeira tela.

## What Changes

- A janela principal do Tauri passa a abrir com `fullscreen: true`.
- O comportamento é permanente: toda execução — `npm run tauri dev`, build de
  debug e build release — começa em tela cheia.
- Nenhuma alteração de layout, comando Rust, banco ou biblioteca.
- Novo verificador `scripts/verificar-janela-cheia.mjs` mede o viewport do
  WebView contra o tamanho da tela.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `app-shell`: o requisito **Janela desktop com mensagem de inicialização**
  passa a exigir a abertura em modo de tela cheia.

## Impact

- **Requisito coberto:** RF001 (RF001-RN002 e o novo RF001-CA006).
- **Fora do escopo:** alternar tela cheia por atalho, lembrar o estado da janela,
  escolher monitor e redimensionar a janela.
- **Configuração:** `src-tauri/tauri.conf.json` (`app.windows[0].fullscreen`).
- **Verificação:** novo `scripts/verificar-janela-cheia.mjs`; os demais
  verificadores não dependem do tamanho da janela.
- **Documentação:** `documents/talecraft.md`, `AGENTS.md` dos dois repositórios
  e a spec consolidada `app-shell`.
