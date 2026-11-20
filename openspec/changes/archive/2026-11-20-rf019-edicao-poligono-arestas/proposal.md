## Why

Depois de desenhar um polígono nos mapas, o escritor só consegue selecioná-lo,
renomear, recolorir ou apagar. O requisito já diz que a forma pode ser **movida**,
mas o editor não move, e não existe nenhuma forma de **redimensionar** o desenho
sem apagar e refazer os vértices. Isso torna a planta de reinos e regiões rígida
demais.

## What Changes

- **Redimensionar pela aresta**: com **Selecionar/Mover**, clicar e arrastar uma
  aresta move só os dois vértices dela na perpendicular, deixando o resto do
  polígono parado.
- **Mover pelo interior**: arrastar o interior da forma desloca todos os vértices
  juntos, presos ao plano de 1000 × 700.
- **Pistas visuais**: a forma selecionada mostra uma alça no meio de cada aresta
  e a aresta fica com cursor e destaque de hover.
- **Histórico**: cada arraste é **um passo** de desfazer/refazer; o Salvar e o
  reabrir continuam usando a mesma string de pontos.
- Nenhuma migração, comando, campo ou mudança no Rust: o domínio já valida os
  pontos.

**Fora do escopo:** editar vértice a vértice, adicionar/remover vértices,
rotacionar, curvar arestas e encaixe em grade.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities

- `world-library`: edição de formas do editor de mapas (mover e redimensionar).

## Impact

- **Requisito:** RF019-TL005, RF019-TL013, RF019-FL005, RF019-RN007 e
  RF019-CA008 em `documents/talecraft.md`.
- **Front-end:** `MapaCanvas.jsx`, `MapaEditor.jsx` e `mapas.css`.
- **Testes:** `verificar-rf019.mjs` (38 verificações).
