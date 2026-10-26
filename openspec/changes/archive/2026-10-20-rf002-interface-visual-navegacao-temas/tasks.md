# Tasks — RF002: Interface visual, navegação e temas

## 1. Design system e ativos

- [x] 1.1 Trazer o design system do protótipo (`prototype/css/talecraft.css`)
  para `src/talecraft.css`, mantendo tokens, temas e seções numeradas
- [x] 1.2 Remover o `src/styles.css` da tela do RF001 e ajustar a importação no
  `src/main.jsx`
- [x] 1.3 Empacotar as fontes localmente (Inter, Rajdhani, JetBrains Mono,
  Cinzel, Alegreya, IBM Plex Mono) em `src/fontes/` e declarar `@font-face` no
  CSS, removendo qualquer referência a Google Fonts
- [x] 1.4 Conferir que `index.html` não carrega `js/tema.js` nem Google Fonts

## 2. Casca do aplicativo

- [x] 2.1 Criar o componente de ícone (`src/componentes/Icone.jsx`) com os SVGs
  usados na casca
- [x] 2.2 Criar a marca clicável (`src/componentes/Marca.jsx`) que navega ao
  Início (RF002-TL001)
- [x] 2.3 Criar a barra superior (`src/componentes/Topbar.jsx`) com breadcrumb
- [x] 2.4 Criar o menu lateral (`src/componentes/Sidebar.jsx`) com os grupos
  **Início** (Meus Livros, Personagens, Worldbuilding), **Preferências** (Temas)
  e **Livro aberto** (RF002-TL001)
- [x] 2.5 Marcar o item de menu ativo conforme a tela atual (classe `is-active`)
- [x] 2.6 Montar a casca em grid (`brand/topbar/sidebar/main`) fiel ao protótipo
  (RF002-CA002)

## 3. Telas e navegação

- [x] 3.1 Criar o componente `TelaVazia` (cabeçalho com nome + descrição, corpo
  vazio)
- [x] 3.2 Criar a tela **Meus Livros** como tela inicial (RF002-TL002)
- [x] 3.3 Criar a tela **Personagens** vazia (RF002-TL003)
- [x] 3.4 Criar a tela **Worldbuilding** vazia (RF002-TL004)
- [x] 3.5 Criar a tela **Livro Aberto** vazia (RF002-TL006)
- [x] 3.6 Ligar a navegação por estado React: clicar em um item abre a tela e
  atualiza o item ativo, sem recarregar (RF002-CA003)
- [x] 3.7 Garantir que abrir o app exibe Meus Livros e que a marca volta ao
  Início

## 4. Sistema de temas

- [x] 4.1 Aplicar o tema inicial em `data-theme` no `<html>`: lê `localStorage`,
  usa `blade-byte` como padrão (RF002-RN001)
- [x] 4.2 Criar a tela **Temas** com apenas o painel de três cartões (Blade Byte,
  Old Tower, Tundra) e suas prévias (RF002-TL005, RF002-CA004)
- [x] 4.3 Marcar como selecionado o cartão do tema ativo (RF002-CA004)
- [x] 4.4 Trocar o tema imediatamente ao clicar em um cartão, sem reiniciar
  (RF002-FL001, RF002-CA005)
- [x] 4.5 Salvar a preferência em `localStorage` e restaurá-la ao reabrir
  (RF002-CA006)
- [x] 4.6 Conferir que a troca de tema altera cores e tipografia de toda a
  interface, sem mudar a disposição (RF002-CA007)

## 5. Tela de carregamento (splash)

- [x] 5.1 Criar o componente `Splash` com a logo do aplicativo, o nome
  **TaleCraft** e a versão (RF002-TL007)
- [x] 5.2 Estilizar o splash no design system usando apenas tokens de tema (cor,
  superfície e sombra acompanham o tema ativo)
- [x] 5.3 Manter a aplicação oculta enquanto o carregamento inicial não termina,
  exibindo o splash nesse intervalo (RF002-TL007)
- [x] 5.4 Criar a estrutura de carregamento no front-end (`carregarDados`), hoje
  imediata, como ponto único para os requisitos futuros (SQLite, dados)
- [x] 5.5 Criar o comando Rust `estado_inicial` e registrá-lo no
  `invoke_handler`, consultado pelo front-end durante o carregamento
  (estrutura de back-end preparada)
- [x] 5.6 Testar o comando `estado_inicial` (teste unitário em `lib.rs`)

## 6. Validação

- [x] 6.1 `npm run build` conclui sem erros
- [x] 6.2 `cargo test --manifest-path src-tauri/Cargo.toml --lib` continua
  passando (comandos `mensagem_inicial` e `estado_inicial`)
- [x] 6.3 `npm run tauri dev`: conferir que o splash aparece na abertura e dá
  lugar a Meus Livros, que a navegação funciona e que a troca de tema é imediata
- [x] 6.4 Fechar e reabrir o aplicativo: o tema escolhido permanece
  (RF002-CA006)
- [x] 6.5 `npm run tauri build` gera o executável para Windows
- [x] 6.6 Marcar `tasks.md` concluído e validar o change com
  `openspec validate rf002-interface-visual-navegacao-temas`
