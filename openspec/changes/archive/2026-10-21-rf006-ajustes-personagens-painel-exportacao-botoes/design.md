## Context

O RF006 são três ajustes na funcionalidade de Personagens, sem mudança de
esquema de banco (permanece v3). O estado atual que interessa:

- `TelaPersonagem.jsx` exibe o painel **Vínculos com livros** num `<section>`
  fixo, sempre com o corpo visível, mesmo sem dados (linhas 209–226).
- O cabeçalho da tela tem os botões **Voltar** e **Salvar** (linhas 182–192).
- `TelaPersonagens.jsx` tem o botão **Novo personagem** com `btn--primary`
  (linha 80).
- O tema **Tundra** define `--accent: #2f7d5c` (verde profundo) e documenta no
  próprio token que o **botão primário tem texto branco** — mas o override
  `[data-theme="tundra"] .btn--primary { color: #14181c }` pinta o rótulo de
  preto. Defeito de contraste, já corrigido no `src/talecraft.css` e no
  `prototype/css/talecraft.css` durante a escrita do requisito.
- Dependências do projeto: `@tauri-apps/api`, `@tauri-apps/plugin-dialog`,
  React, Vite. **Nenhuma** biblioteca de PDF.
- O `tauri.conf.json` já habilita `assetProtocol` com escopo `$APPDATA/**` e
  `$TEMP/**` (necessário para a imagem da ficha, vindo do RF004).

## Goals / Non-Goals

**Goals:**

- Painel Vínculos com livros retrátil, abrindo retraído quando não há vínculos
  (RF006-TL001, RF006-FL001, RF006-RN001 a RN003).
- Botão **Exportar Ficha** ao lado de Salvar, gerando um PDF com os dados
  globais e a imagem, via diálogo nativo de destino (RF006-FL002, RF006-RN005 a
  RN010).
- Rótulo branco dos botões Salvar e Novo personagem nos três temas
  (RF006-RN004).
- **Sem biblioteca nova de PDF** (RF006-RN011).

**Non-Goals:**

- Criar a associação personagem ↔ livro (isso é requisito posterior; o painel
  continua sem dados).
- Exportar em HTML/PDC/MD, incluir relações ou livros no PDF.
- Alterar relações, árvore familiar, esquema do banco ou a tela de listagem
  além do rótulo do botão.

## Decisions

- **D1 - O PDF sai do próprio WebView, via `PrintToPdf` do WebView2.**
  O crate `tauri` expõe `WebviewWindow::print()`, mas ele abre o **diálogo de
  impressão do sistema**, que não devolve o caminho do arquivo nem permite
  escolher o destino de forma programática — não atende ao RF006-CA013.
  A rota correta é `with_webview` + `ICoreWebView2_7::PrintToPdf`, que grava o
  PDF direto no caminho escolhido. **Alternativas descartadas:** `jsPDF` no
  front-end e crates de PDF no Rust (`printpdf`, `genpdf`) — todos trazem
  biblioteca nova e violariam o RF006-RN011, além de exigir redesenhar o layout
  à mão em vez de reusar o design system.

- **D2 — A ficha é um componente React próprio, renderizado numa janela oculta
  para impressão.** Em vez de duplicar o HTML da tela de detalhe, um componente
  `FichaPersonagem` recebe o personagem e a URL do retrato e desenha o
  documento com o design system. Ele é renderizado numa **janela Tauri oculta**
  (`visible: false`), o PDF é gerado e a janela é fechada. Isso mantém uma única
  fonte de verdade do layout da ficha e permite que o mesmo componente seja
  testável pela ponte do WebView.
  **Alternativa descartada:** montar o HTML por concatenação de strings no
  Rust — frágil, difícil de manter os acentos e as quebras de linha.

- **D3 — O diálogo de destino é o nativo, pelo `tauri-plugin-dialog` já
  instalado.** Usa-se `save()` (em vez de `open()`, usado pelo retrato no
  RF004), com filtro `pdf` e `defaultPath` montado a partir do nome do
  personagem (RF006-RN010). Se o escritor cancelar, a função devolve `null` e
  nada é gravado (RF006-RN008) — o mesmo padrão de cancelamento já usado no
  retrato.

- **D4 — Campos vazios são omitidos na montagem, não escondidos por CSS.** O
  componente `FichaPersonagem` monta a lista de campos preenchidos antes de
  renderizar (RF006-RN006). Esconder com CSS deixaria linhas fantasma no PDF.

- **D5 — A imagem entra por `convertFileSrc`, já habilitado.** O retrato vive em
  `<app_data_dir>/retratos/` e o `assetProtocol` do RF004 já cobre
  `$APPDATA/**`; a ficha reusa `urlRetrato` + `convertFileSrc`, sem caminho
  novo. Sem retrato, a ficha renderiza o espaço reservado com as iniciais
  (RF006-RN007).

- **D6 — O estado retrátil é estado local da tela, com a regra "retraído quando
  vazio" calculada na entrada.** `TelaPersonagem.jsx` guarda
  `vinculosRetraidos` e o inicializa a partir da contagem de vínculos
  (`0 → true`). Como não há comando de vínculos ainda, a contagem vem de uma
  constante zero derivada do estado atual, pronta para ser trocada quando o
  requisito de vínculos chegar. O ícone é um `<button>` com
  `aria-expanded` e `aria-controls` — atendendo ao RF006-CA005 sem repetir o
  problema de acessibilidade do SVG do RF005.

- **D7 — A correção do contraste do Tundra é de token, não de regra solta.** O
  rótulo do `.btn--primary` no Tundra passa a `#fff`, alinhado ao comentário do
  próprio token (`botão primário: texto branco`). Vale nos dois arquivos de
  design system (app e protótipo), como manda a regra do projeto.

- **D8 — O back-end monta a ficha; o front-end só desenha.** O comando
  `montar_ficha` recebe o **id** do personagem e devolve a estrutura já pronta
  (nome, retrato e campos preenchidos) — resolvendo a *Open Question* abaixo.
  Mantém o padrão "o front-end não fala SQLite" e concentra a regra dos campos
  omitidos num lugar só, testável em Rust (`ficha.rs`).

- **D9 — O PDF é gerado por uma janela oculta, não por um iframe.** Uma janela
  Tauri separada (`visible: false`) carrega `index.html#ficha=<id>`; o
  front-end reconhece o marcador e renderiza **apenas** a ficha, sem a casca do
  app. Um `iframe` dentro da tela de detalhe imprimiria a tela inteira, com a
  navegação, o formulário e o painel de relações.

- **D10 — A espera pelo "pronto" é por comando, não por evento.** A janela
  oculta chama `sinalizar_ficha_pronta` quando a ficha e a imagem terminaram
  de carregar; o back-end guarda os canais de espera num estado gerenciado
  (`FichasProntas`) endereçado pelo rótulo da janela. Eventos entre janelas
  dependeriam de o `emit` alcançar a janela principal; o comando é direto.

- **D11 — A exportação grava as alterações pendentes antes de gerar o PDF.**
  O comando `exportar_ficha` monta a ficha a partir do **banco** (D8). Se o
  formulário tiver edições ainda não salvas, o PDF sairia desatualizado — foi
  o que aconteceu no teste do usuário (só o Nome entrava). Em vez de passar
  o estado do formulário ao back-end (que duplicaria a fonte de verdade), o
  front-end chama `salvarPersonagem(form)` **antes** de abrir o diálogo, quando
  detecta alterações pendentes (`mesmosDados` em `personagensApi.js`). Assim,
  o banco e o PDF coincidem com o que o escritor vê (RF006-RN013, RF006-CA021).

- **D12 — A árvore familiar entra no documento, com as cores próprias do
  documento.** A `FichaPersonagem` ganha a estrutura `familia: Option<ArvoreFamiliar>`
  (preenchida em `montar_por_id` a partir de `personagem::arvore_familiar`),
  e a seção **Família** é desenhada reusando o componente `ArvoreFamiliar`
  (sem clique — o documento não é navegável). Como o documento é impresso,
  as classes `.familytree__*` são sobrescritas com cores fixas dentro de
  `.ficha` (em `talecraft.css`): as cores de tema inverteriam conforme o tema
  ativo e quebrariam a leitura. A seção só aparece quando o personagem tem
  relações familiares (RF006-RN005, RF006-CA020).

## Risks / Trade-offs

- **[`PrintToPdf` é específico do WebView2 — só funciona no Windows.]** →
  O ambiente de desenvolvimento inicial é Windows, declarado em
  `documents/talecraft.md`. O requisito registra isso; se o projeto mirar Linux
  ou macOS, esta decisão precisa ser revista (é o custo de não ter biblioteca).
- **[O PDF reflete o design system, não um template formal de documento.]** →
  Trade-off aceito na escolha da opção A: a ficha sai "com a cara do app". Em
  troca, zero dependência e reuso total do CSS.
- **[A imagem depende do `assetProtocol` e do tema ativo.]** → O `assetProtocol`
  já está habilitado e verificado desde o RF004; a imagem usa o mesmo caminho
  de `urlRetrato` já testado pelos verificadores.
- **[A janela oculta para impressão pode piscar.]** → Criada com
  `visible: false`, e fechada logo após a geração; nunca é exibida ao escritor.
- **[O estado retrátil pode voltar a "expandido" ao salvar.]** → O estado é
  local e não depende de `form.id`; o RF006-CA004 exige explicitamente que a
  alternância não perca dados do formulário.

## Migration Plan

Não há migração de dados (esquema permanece v3). A entrega é:

1. Correção do rótulo do Tundra nos dois design systems (feita na escrita do
   requisito).
2. Painel retrátil em `TelaPersonagem.jsx`.
3. Componente `FichaPersonagem`, janela oculta e comando de exportação.
4. Botão Exportar Ficha e diálogo de destino.
5. Testes Rust, verificação `scripts/verificar-rf006.mjs` e atualização do
   protótipo e do `AGENTS.md`.

**Reversão:** cada item é independente; reverter o painel retrátil ou o botão não
afeta os outros nem o banco.

## Open Questions

*Nenhuma em aberto.* A questão do comando Rust foi resolvida na implementação
(**D8**): o comando recebe o **id** do personagem e lê do banco pelo domínio,
mantendo o padrão "o front-end não fala SQLite".

---

## Notas da implementação

- **A espera pelo callback do WebView2 não pode ser feita dentro de
  `with_webview`.** O `with_webview` roda no thread da interface, e o callback
  do `PrintToPdf` também precisa desse thread para ser entregue. Bloquear lá
  dentro trava a aplicação: o PDF até é gravado, mas o callback nunca chega e a
  espera expira ("tempo esgotado ao gerar o PDF"). A correção: obter a
  interface `ICoreWebView2_7` **dentro** do `with_webview` e fazer a espera
  **fora** dele (ver `src-tauri/src/pdf.rs`).
- **As crates `webview2-com` e `windows` não são biblioteca de PDF.** São as
  mesmas crates que o `wry`/`tauri` já traziam (0.39 e 0.62, já no
  `Cargo.lock`); foram apenas declaradas como dependência direta para poder
  chamar `PrintToPdf`. Nenhuma crate nova entrou no projeto — o RF006-CA017
  continua satisfeito.
- **Um nome local não pode repetir o nome de um import (laço de diálogos).**
  No `TelaPersonagem.jsx`, o manipulador do botão **Exportar Ficha** chamava
  `exportarFicha` — o mesmo nome do import de `personagensApi.js`. A
  declaração local sombreia o import dentro do escopo do componente, então a
  chamada voltava para o próprio manipulador: o diálogo de salvamento abria
  **outra vez**, infinitamente (no teste do usuário: "clicar em salvar no
  diálogo, ele não fecha e fica em laço"). O manipulador passou a se chamar
  `exportar`, seguindo o padrão do arquivo (`salvar` chama
  `salvarPersonagem`, `escolherRetrato` chama `associarRetrato`).
- **O `invoke` do Tauri é congelado; a costura para automatizar o diálogo
  nativo é o `fetch`.** `window.__TAURI_INTERNALS__.invoke` é criado com
  `Object.defineProperty` sem `writable`/`configurable`, então substituí-lo
  falha em silêncio. No Windows o IPC do Tauri passa pelo protocolo `ipc://` e,
  portanto, por `window.fetch`: interceptá-lo e devolver uma `Response` com
  `Tauri-Response: ok`, `Tauri-Callback` e o corpo JSON simula a resposta do
  comando `plugin:dialog|save`. Assim o **botão real** pode ser clicado na
  verificação, sem diálogo nativo — e a contagem de chamadas ao diálogo (que
  tem de ser **1**) pega a classe de defeito da recursão.

- **A ficha espera todas as imagens antes de sinalizar "pronto".** O
  `TelaFicha.jsx` pré-carrega com `new Image()` o retrato do personagem e os
  retratos da árvore familiar, e só então chama `sinalizar_ficha_pronta`. Isso
  garante que o WebView2 inclua as imagens na impressão (RF006-CA010,
  RF006-CA020). Sem retrato algum, sinaliza assim que a ficha aparece.

