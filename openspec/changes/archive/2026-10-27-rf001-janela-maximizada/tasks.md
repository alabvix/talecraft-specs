## 1. Configuração da janela

- [x] 1.1 Remover `"fullscreen": true` e acrescentar `"maximized": true` à janela principal em `src-tauri/tauri.conf.json`.

## 2. Verificação

- [x] 2.1 Renomear `scripts/verificar-janela-cheia.mjs` para `scripts/verificar-janela-maximizada.mjs` e ajustar o cabeçalho.
- [x] 2.2 Conferir `innerWidth` contra `screen.width`, `innerHeight` contra a área útil (menos a barra de título) e `innerHeight < screen.height` para provar que não é tela cheia pura.
- [x] 2.3 Rodar `cargo build --manifest-path src-tauri/Cargo.toml`, subir o Vite e executar o verificador.
- [x] 2.4 Rodar `npm run build` e `npm run verificar:rust`.

## 3. Documentação e fechamento

- [x] 3.1 Atualizar `AGENTS.md` dos dois repositórios com o ajuste e o novo nome do verificador.
- [x] 3.2 Validar com `openspec validate --all`.
- [x] 3.3 Arquivar o change com `openspec archive "rf001-janela-maximizada" --yes` e confirmar a spec de `app-shell`.
