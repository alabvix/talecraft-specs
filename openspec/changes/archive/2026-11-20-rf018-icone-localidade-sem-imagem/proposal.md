## Why

Na árvore de **Localidades**, uma localidade sem imagem ficava com o quadradinho
vazio antes do nome. O espaço já existe e o RF019 já sabe desenhar um ícone pelo
**Tipo da Localidade** no estilo do **Tipo do Mundo**; reaproveitar esse ícone
torna a lista mais informativa sem pedir imagem ao escritor.

## What Changes

- A miniatura da árvore passa a mostrar o **ícone do Tipo** quando a localidade
  não tem imagem.
- O ícone segue o **Tipo do Mundo** (Medieval, Moderno, Futurista ou Antigo)
  para as famílias temáticas; tipos sem glifo e **Não definido** continuam com o
  quadrado vazio.
- O ajuste vale na aba **Localidades** do Mundo e na seção **Worldbuilding** do
  livro, que usam a mesma árvore.
- Nenhuma migração, comando ou campo novo: é só apresentação.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities

- `world-entries`: miniatura da árvore de Localidades sem imagem.

## Impact

- **Requisito:** RF018-TL001 e RF018-TL003 em `documents/talecraft.md`.
- **Front-end:** `ArvoreLocalidades.jsx`, `TelaMundo.jsx`,
  `TelaWorldbuildingLivro.jsx` e `mundos.css`.
- **Testes:** `verificar-rf018.mjs`.
