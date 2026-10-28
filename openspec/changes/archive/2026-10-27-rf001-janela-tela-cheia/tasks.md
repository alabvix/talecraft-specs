## 1. Configuração da janela

- [x] 1.1 Acrescentar `"fullscreen": true` à janela principal em `src-tauri/tauri.conf.json`, mantendo as demais propriedades.

## 2. Verificação

- [x] 2.1 Criar `scripts/verificar-janela-cheia.mjs`, dirigindo o app Tauri via CDP com `TALECRAFT_DADOS` isolado.
- [x] 2.2 Comparar `window.innerWidth/innerHeight` com `screen.width/height` e conferir que a sidebar carregou.
- [x] 2.3 Rodar `cargo build --manifest-path src-tauri/Cargo.toml`, subir o Vite e executar o verificador.
- [x] 2.4 Rodar `npm run build` e `npm run verificar:rust` para confirmar que a configuração não afetou o restante.

## 3. Documentação e fechamento

- [x] 3.1 Atualizar `AGENTS.md` dos dois repositórios com o ajuste e a forma de validar.
- [x] 3.2 Validar com `openspec validate --all`.
- [x] 3.3 Arquivar o change com `openspec archive "rf001-janela-tela-cheia" --yes` e confirmar a spec de `app-shell`.
