## Why

A splash está abrindo como uma tela branca e desaparecendo rápido demais: a
inicialização do banco termina em poucos milissegundos e a janela mostra o fundo
branco antes de o CSS/React carregarem. O escritor não consegue ler o nome nem a
versão, e a identidade do aplicativo não aparece.

## What Changes

- Manter a splash na tela por um **tempo mínimo legível** (1,2 s), mesmo que a
  inicialização termine antes.
- Remover a piscada branca: fundo da janela e do HTML na cor-base do tema antes
  do carregamento do CSS/React.
- Ajustar o layout: **ícone grande**, **nome TaleCraft ao lado do ícone** e
  **versão atual abaixo dos dois**, em fonte menor.
- Nenhuma migração, comando ou biblioteca nova.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `splash-screen`: a splash ganha layout, tempo mínimo e fundo sem piscada
  branca; a estrutura de carregamento deixa de "concluir imediatamente".

## Impact

- **Requisito coberto:** RF002 (RF002-TL007, RF002-RN002, RF002-CA009,
  RF002-CA010).
- **Fora do escopo:** trocar o ícone do aplicativo (fica o atual por enquanto),
  barra de progresso, animações novas e splash nativa do sistema.
- **Front-end:** `Splash.jsx`, `talecraft.css`, `App.jsx` e o CSS crítico em
  `index.html`.
- **Configuração:** `backgroundColor` da janela em `src-tauri/tauri.conf.json`
  (exige recompilar o binário).
- **Verificação:** `verificar-rf002.mjs` passa a medir a geometria da splash, a
  fonte da versão, o fundo e a duração mínima (18 → 20); sem regressão dos
  demais verificadores.
