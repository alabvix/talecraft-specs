## Why

Três ajustes de usabilidade na funcionalidade de Personagens: o painel **Vínculos
com livros** ocupa espaço na tela mesmo quando está vazio (o caso atual, pois a
associação com livros ainda não existe); não há como **levar a ficha do
personagem para fora do aplicativo**; e os botões **Salvar** e **Novo
personagem** têm rótulo de baixo contraste — no tema Tundra o texto é preto
sobre o verde profundo do botão primário, o que contraria o próprio token do
tema, que prevê rótulo branco.

## What Changes

- **Painel Vínculos com livros retrátil (RF006-TL001, RF006-FL001):** o painel
  ganha um ícone no cabeçalho que retrai e expande o conteúdo. Sem nenhum
  vínculo, o painel abre **retraído**; com vínculos, abre expandido.
- **Exportar Ficha (RF006-TL002, RF006-FL002):** novo botão ao lado de Salvar
  que gera um **PDF** com os dados **globais** do personagem e a sua **imagem**,
  abrindo o diálogo nativo para o escritor escolher onde salvar. O documento
  **não** inclui relações nem os livros em que o personagem aparece.
- **Cor do rótulo dos botões (RF006-RN004):** Salvar e Novo personagem passam a
  ter rótulo **branco**, legível sobre o fundo de acento nos três temas, com a
  correção do Tundra (verde profundo → branco).
- **Sem biblioteca de PDF (RF006-RN011):** o documento é produzido pelo recurso
  de impressão em PDF do próprio WebView, reusando o design system existente.

**Fora do escopo:** criar a associação entre personagem e livro, dados por livro
(papel narrativo, arco, POV), exclusão de personagens, exportações em HTML/PDC/MD
e alteração das relações ou da árvore familiar do RF005.

## Capabilities

### New Capabilities

- `character-sheet-export`: geração da Ficha do Personagem em PDF — montagem do
  documento a partir dos dados globais e da imagem, diálogo nativo de destino,
  cancelamento e restrições do conteúdo.

### Modified Capabilities

- `character-library`: o requisito **Vínculos e arco por livro fora do escopo**
  passa a exigir o painel retrátil (estado inicial retraído quando vazio) e o
  requisito **Tela de detalhe do personagem** ganha o botão Exportar Ficha e o
  rótulo branco dos botões.

## Impact

- **Front-end:** `src/componentes/TelaPersonagem.jsx` (painel retrátil, botão
  Exportar Ficha, rótulo do Salvar), `src/componentes/TelaPersonagens.jsx`
  (rótulo de Novo personagem), `src/talecraft.css` (rótulo branco e correção do
  Tundra), `src/personagensApi.js` (chamada do comando de exportação) e um novo
  componente/template da ficha para impressão.
- **Back-end:** novo comando Tauri de exportação (a definir no `design.md`) e a
  habilitação do recurso de impressão em PDF no WebView.
- **Protótipo:** `prototype/personagem.html` (painel retrátil, botão Exportar
  Ficha) e `prototype/css/talecraft.css` (rótulo branco e correção do Tundra).
- **Dependências:** **nenhuma** biblioteca nova de PDF (RF006-CA017).
- **Testes:** `cargo test --lib`, `npm run build` e um script de verificação
  `scripts/verificar-rf006.mjs` que dirige o app real.
- **Sem mudança de esquema:** este requisito não altera o banco (permanece v3).
