# Design — RF002: Interface visual, navegação e temas

## Context

O RF001 entregou um aplicativo Tauri 2 + React/Vite com uma única tela
(`src/App.jsx`) que exibe a mensagem de inicialização e o retorno do comando Rust
`mensagem_inicial`. Não há layout, menu, navegação nem identidade visual.

O **protótipo** (`prototype/`) define visualmente o produto: um design system de
~70 KB (`css/talecraft.css`), 15 telas ligadas, três temas (Blade Byte, Old
Tower, Tundra) e uma casca de aplicativo em *grid* com marca, topbar e sidebar.
O RF002 traz essa casca e o sistema de temas para o app React — **sem** portar o
conteúdo de domínio (os dados fictícios do protótipo) e **sem** CRUD.

O RF002 exige:

- Layout fiel ao protótipo (RF002-TL001, RF002-CA002);
- Telas vazias com nome e descrição (RF002-TL002/3/4/6);
- Tela Temas com apenas o painel de seleção (RF002-TL005);
- Troca imediata de tema (RF002-FL001, RF002-CA005) e preferência persistida
  entre execuções (RF002-CA006, RF002-RN001);
- Tela de carregamento (splash) com logo, nome e versão enquanto os dados são
  preparados (RF002-TL007), com a estrutura de front-end e back-end pronta para
  o carregamento real.

**Decisões já alinhadas com o usuário** (confirmadas antes de escrever as specs):

1. Casca completa (sidebar/topbar fiéis ao protótipo) + páginas vazias.
2. Preferência de tema em `localStorage` do WebView.
3. Fontes empacotadas localmente (`@font-face`), sem Google Fonts.
4. Tela Temas apenas com o painel de três cartões.
5. Navegação por estado React, sem biblioteca de rotas.
6. Splash **dentro da mesma janela** (overlay React), exibido até o
   **carregamento inicial** terminar — hoje imediato, mas com a estrutura pronta.

## Goals / Non-Goals

**Goals**

- Reproduzir no app a casca visual do protótipo: marca clicável, topbar, sidebar
  com grupos **Início**, **Preferências** e **Livro aberto**.
- Trazer o design system (tokens, temas, componentes base) para `src/`.
- Criar as telas navegáveis e vazias: Meus Livros (inicial), Personagens,
  Worldbuilding, Livro Aberto e Temas.
- Implementar o sistema de temas transversal com persistência local.
- Empacotar as seis famílias de fontes no projeto, removendo a dependência de
  rede.
- Exibir a tela de carregamento (splash) com logo, nome e versão, e deixar o
  carregamento inicial e o comando Rust `estado_inicial` prontos para os dados
  reais.

**Non-Goals**

- CRUD, persistência de dados de domínio, banco SQLite.
- Conteúdo real das telas (listas, métricas, formulários, gráficos, exportação).
- Autenticação, usuários, sincronização.
- Janela nativa separada para o splash (fica na mesma janela, por decisão).
- Instalador, empacotamento de produção, CI.

## Decisions

### D1 — Layout em grid, igual ao protótipo

A casca usa o mesmo `grid-template-areas` do protótipo:

```
grid-template-columns: var(--sidebar-w) 1fr;
grid-template-rows:    var(--topbar-h) 1fr;
grid-template-areas:   "brand topbar"
                       "sidebar main";
```

`brand` (marca clicável) fica na célula superior esquerda; a topbar ocupa a linha
superior restante; a sidebar fica à esquerda abaixo da marca; `main` recebe a
página ativa. Essa estrutura é copiada do CSS do protótipo (`.app`), garantindo
fidelidade (RF002-CA002).

*Alternativas:* CSS Flex para tudo (perde a fidelidade das áreas e dos
separadores da marca); CSS Grid nomeado por linhas sem `areas` (mais verboso e
divergente do protótipo). Escolhido: copiar o grid do protótipo.

### D2 — Design system copiado, não recriado

O `prototype/css/talecraft.css` é trazido para o app praticamente inteiro, com os
tokens e temas intactos. `src/styles.css` (específico da tela do RF001) é
**substituído** por esse design system.

*Motivo:* o requisito pede fidelidade visual e os três temas já estão prontos e
validados. Recriar do zero seria retrabalho e risco de divergência.
*Alternativas:* importar via `<link>` para `prototype/` (acopla o app ao
protótipo e quebra o empacotamento do Vite); reescrever tokens em JS (perde CSS
puro, sem ganho).

### D3 — Navegação por estado React (sem router)

Um `useState` (`paginaAtiva`) no componente de casca decide qual tela renderizar.
O clique em um item de menu troca o estado; o item ativo é derivado desse estado
(`is-active`).

*Motivo:* é um app desktop embarcado; não há URLs para compartilhar/bookmark. Uma
biblioteca de rotas seria peso sem uso (RF002-CA003 é atendido por estado).
*Alternativas:* `react-router-dom` (URLs, histórico — desnecessário no WebView);
`window.location.hash` (mais frágil e sem ganho).

### D4 — Tema no `data-theme` do `<html>` + `localStorage`

O tema ativo vive no atributo `data-theme` do `<html>`, como no protótipo. A
preferência é lida/gravada em `localStorage` (chave `talecraft.tema`), aplicada
na inicialização antes da primeira pintura.

*Motivo:* o CSS já seleciona temas por `[data-theme="..."]`; o `localStorage` do
WebView persiste entre reaberturas do app no mesmo usuário, atendendo
RF002-CA006 sem back-end. Padrão `blade-byte` quando não há preferência
(RF002-RN001).
*Alternativas:* arquivo de config via comando Rust (mais "correto" a longo prazo,
mas exige I/O e comandos que o RF002 não pede; pode migrar depois para o SQLite);
`window.matchMedia` do sistema operacional (não é o que o requisito pede).

### D5 — Fontes empacotadas localmente com `@font-face`

As seis famílias do protótipo (Inter, Rajdhani, JetBrains Mono, Cinzel, Alegreya,
IBM Plex Mono) são incluídas no projeto e declaradas via `@font-face` em
`src/`, com os arquivos versionados junto do código.

*Motivo:* o app é offline por princípio; buscar fontes do Google a cada abertura
é dependência de rede e atraso de carregamento. Resolve a pendência técnica já
registrada no `AGENTS.md`.
*Alternativas:* manter `<link>` do Google Fonts (viola o princípio offline);
`@fontsource/*` via npm (adiciona dependências de pacote; aceitável, mas o
requisito prefere empacotar sem ampliar dependências — o projeto evita libs
extras).

### D6 — Componentes de tela em React, com o mesmo HTML/CSS do protótipo

Cada parte da casca e cada tela vira um componente React que renderiza o
**mesmo markup** (classes CSS do design system) do protótipo. Ex.: `<Marca>`,
`<Topbar>`, `<Sidebar>`, `<TelaVazia>`, `<TelaTemas>`.

*Motivo:* reaproveita o CSS como está (fidelidade) e mantém o código React
simples. Os ícones SVG inline do protótipo viram um componente `<Icone>` (ou são
inlinados por componente) para evitar repetição.

### D7 — Telas vazias padronizadas

Meus Livros, Personagens, Worldbuilding e Livro Aberto usam um componente comum
`<TelaVazia titulo="..." descricao="..." />`, com o cabeçalho do protótipo
(`roothead`: `<h1>` + `<p>`) e o corpo vazio.

*Motivo:* RF002-TL002/3/4/6 exigem exatamente "nome + descrição, sem conteúdo".
Um componente único garante consistência.
*Nota:* a tela **Meus Livros** é a inicial (RF002-TL002), independentemente de o
protótipo exibir métricas/listas — essas ficam para requisito posterior.

### D8 — Splash como overlay na mesma janela, dirigido pelo carregamento

A tela de carregamento é um **overlay React** (`.splash`) que cobre a janela
inteira com a logo, o nome **TaleCraft** e a versão. O `App` mantém um estado
`carregando`: enquanto ele for verdadeiro, só o splash é renderizado; quando o
**carregamento inicial** termina, a casca aparece. O carregamento inicial é uma
função única (`carregarDados`) que, hoje, apenas consulta o comando Rust
`estado_inicial` e resolve imediatamente.

*Motivo:* não há segunda janela nativa a coordenar (mais simples e robusto no
WebView); e concentrar o carregamento numa função única significa que, quando o
SQLite chegar, basta preencher `carregarDados` — o splash continua na tela até a
promessa resolver. O **back-end já participa** (comando `estado_inicial`), então
a estrutura de front/back está pronta, mesmo com a inicialização atual sendo
imediata.

*Alternativas:* segunda janela do Tauri (`splashscreen`) que abre e fecha
(mais "nativo", porém exige coordenar duas janelas/front-ends — desproporcional
para o RF002); tempo mínimo fixo de exibição (artificial; não reflete o
carregamento real e atrasaria a abertura sem motivo).

## Risks / Trade-offs

| Risco | Mitigação |
|---|---|
| **Copiar o CSS inteiro** traz regras de componentes que nenhuma tela do RF002 usa (`.booktile`, `.metric`, `.dataline`, gráficos). Aumenta o CSS carregado. | Aceitável: os próximos requisitos usarão esses componentes; é o design system do produto, não deve ser podado por tela. |
| **`color-mix()`** aparece em alguns gradientes do protótipo e pode falhar em WebView antigo. | Validar no WebView2 da máquina (já é recente). Se necessário, trocar por `rgba()` fixos — registrado como pendência. |
| **Fontes empacotadas** aumentam o tamanho do repositório/build. | Selecionar apenas os pesos usados no CSS (não a família completa); formatos modernos (`woff2`). |
| **`localStorage` do WebView** pode ser limpo pelo sistema (perfil, atualização). | Aceitável para preferência de tema; se virar requisito forte, migrar para arquivo/SQLite (D4 já prevê). |
| **Ícones SVG inline repetidos** em vários componentes geram markup verboso. | Extrair um componente de ícone (D6) e manter os `path` do protótipo. |
| **Splash passa rápido** porque a inicialização atual é imediata (não há dados). Pode parecer que a tela não existe. | Aceitável e intencional: o requisito pede a estrutura, não um tempo artificial. Quando o SQLite/dados chegarem, o splash acompanhará o tempo real de carregamento. |
| **Perder a tela do RF001** (mensagem + `mensagem_inicial`). | O comando Rust continua existindo e testado; apenas deixa de ser a UI. Nenhuma regressão de back-end. |

## Migration Plan

1. Adicionar o design system e os ativos de fonte em `src/`.
2. Criar os componentes de casca e as telas; substituir `src/App.jsx`/
   `src/styles.css`.
3. Ligar a aplicação do tema na inicialização (antes da primeira pintura) e o
   clique nos cartões de tema.
4. Criar o splash e a estrutura de carregamento (`carregarDados` no front-end e
   comando `estado_inicial` no back-end).
5. Remover a interface de RF001 (mantendo os comandos Rust).
6. Validar: `npm run build`, `cargo test --manifest-path src-tauri/Cargo.toml
   --lib`, `npm run tauri dev` (navegação + troca de tema + splash) e `npm run
   tauri build`.

**Rollback:** o change é self-contained no front-end (mais um comando Rust
aditivo); reverter o commit do app restaura a tela do RF001. Os comandos Rust de
RF001 não são tocados.

## Open Questions

Nenhuma pendente — todas as decisões de escopo foram resolvidas com o usuário
conforme a seção *Context*. Dúvidas que surgirem durante a implementação serão
registradas no `tasks.md` ou devolvidas ao usuário.
