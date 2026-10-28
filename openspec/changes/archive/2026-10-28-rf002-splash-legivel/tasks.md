## 1. Implementação

- [x] 1.1 Reorganizar `Splash.jsx` em duas linhas: ícone grande + nome ao lado; versão abaixo em fonte menor (design D2).
- [x] 1.2 Ajustar `talecraft.css`: ícone 128 px, nome 46 px, versão 13 px e linha `.splash__marca`.
- [x] 1.3 Acrescentar o piso de 1,2 s no carregamento em `App.jsx` com `Promise.all` (design D1).
- [x] 1.4 Adicionar o CSS crítico de fundo em `index.html` e `backgroundColor` na janela de `tauri.conf.json` (design D3).

## 2. Verificação

- [x] 2.1 Atualizar `scripts/verificar-rf002.mjs` para medir a geometria (nome ao lado, versão abaixo), a fonte menor, o fundo e a duração mínima (design D4).
- [x] 2.2 Rodar `npm run build`, `node scripts/verificar-rf002.mjs` e `npm run verificar:rust`.
- [x] 2.3 Recompilar o binário (`cargo build`) e conferir a splash no app real; regressão RF003–RF014.

## 3. Documentação e fechamento

- [x] 3.1 Atualizar o `AGENTS.md` de `talecraft-app` e o de `talecraft-specs`.
- [x] 3.2 Validar com `openspec validate --all` e arquivar com `openspec archive "rf002-splash-legivel" --yes`.
