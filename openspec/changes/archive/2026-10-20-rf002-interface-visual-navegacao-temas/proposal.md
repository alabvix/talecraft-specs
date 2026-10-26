## Why

O RF001 entregou apenas uma tela de inicialização mínima: não há layout, menu,
navegação nem temas. O TaleCraft precisa da **casca visual** do produto antes de
qualquer funcionalidade de domínio, para que os próximos requisitos (personagens,
worldbuilding, capítulos, dados do livro) apenas preencham telas que já existem.

Já existe um protótipo visual validado (`prototype/`, HTML + CSS) que define o
layout, as cores e três temas. Este change traz esse visual para o aplicativo
React/Tauri.

Cobre o requisito **RF002 — Interface visual, navegação e temas**, cuja
definição de pronto é: o TaleCraft apresenta o layout do protótipo, permite
navegar pelas páginas iniciais e trocar entre todos os temas previstos,
mantendo a preferência entre execuções.

## What Changes

- Criar o **layout do aplicativo**: menu lateral (sidebar) com os grupos
  **Início**, **Preferências** e **Livro aberto**, a barra superior (topbar) e a
  marca TaleCraft clicável que leva ao Início — fiéis ao protótipo.
- Trazer o **design system** do protótipo (`prototype/css/talecraft.css`) para o
  app, mantendo os mesmos estilos, tokens e cores.
- Criar as **telas iniciais** (navegáveis, com título/descrição e corpo vazio):
  Meus Livros (tela inicial), Personagens, Worldbuilding e Livro Aberto.
- Criar a **tela Temas** com **apenas o painel de seleção de temas** (os três
  cartões com prévia), conforme RF002-TL005.
- Implementar o **sistema de temas transversal** (Blade Byte padrão, Old Tower,
  Tundra): a seleção aplica o tema **imediatamente** a toda a interface e salva a
  preferência, que **sobrevive ao fechar e reabrir** o aplicativo
  (RF002-FL001, RF002-CA005, RF002-CA006).
- Adicionar a **tela de carregamento (splash)**: exibida enquanto os dados de
  inicialização são preparados, com a **logo**, o **nome** e a **versão** do
  aplicativo (RF002-TL007). O carregamento inicial é o ponto único que a
  sustenta, já consultando o back-end Rust (`estado_inicial`) — a estrutura fica
  pronta para os requisitos futuros (SQLite, livros, personagens), mesmo com a
  inicialização atual sendo imediata.
- **Empacotar as fontes localmente** (`@font-face`), removendo a dependência de
  Google Fonts — um app desktop offline não deve buscar fontes na rede.

### Fora do escopo (conforme o requisito)

Não faz parte deste change: CRUD, persistência de livros/personagens, conteúdo
de páginas específicas, autenticação, gráficos, exportação e banco de dados
SQLite. As telas ficam vazias (título + descrição), exceto Temas.

## Capabilities

### New Capabilities

- `app-layout`: a casca visual comum a todas as telas — marca clicável, menu
  lateral com os três grupos e itens, barra superior e design system por temas.
- `page-navigation`: as telas iniciais e a navegação entre elas, com o item de
  menu ativo refletindo a tela atual e Meus Livros como tela inicial.
- `theme-system`: a seleção e a aplicação do tema global (transversal), a
  persistência da preferência e a regra do tema padrão (Blade Byte).
- `splash-screen`: a tela de carregamento (logo, nome e versão) exibida enquanto
  os dados de inicialização são preparados, e a estrutura de carregamento que a
  sustenta — hoje imediata, pronta para os dados reais.

### Modified Capabilities

<!-- Nenhuma: o RF002 não altera requisitos das specs existentes
     (app-shell, dev-tooling, rust-bridge, setup-guide). -->

## Impact

- **Novo código no front-end (`src/`):** componentes de layout (marca, topbar,
  sidebar), as telas vazias, a tela de Temas e o gerenciamento de tema.
- **Design system:** o CSS do protótipo entra no app; o `src/styles.css` atual
  (da tela de RF001) é substituído pelo design system.
- **Ativos novos:** fontes empacotadas no projeto; os cartões de prévia de tema.
- **Dependências:** nenhuma biblioteca nova (navegação por estado React;
  tema por `data-theme` no `<html>` + `localStorage`).
- **Back-end Rust:** novo comando `estado_inicial`, que responde se o back-end
  está pronto para servir os dados — hoje sempre verdadeiro, mas é o ponto onde
  os requisitos futuros (SQLite) farão o carregamento pesado.
- **Protótipo:** permanece intacto como referência visual.
- **Atenção:** a tela de RF001 (mensagem de inicialização + comando
  `mensagem_inicial`) é **substituída** pela nova interface; o comando Rust
  continua existindo, mas deixa de ser exibido.
