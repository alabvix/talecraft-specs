## ADDED Requirements

### Requirement: Estrutura visual de duas colunas
O aplicativo SHALL apresentar o layout do protótipo, com uma barra superior
(topbar), um menu lateral (sidebar) e a área de conteúdo principal, mantendo a
disposição do protótipo (RF002-TL001, RF002-CA002).

#### Scenario: Layout do protótipo é apresentado
- **GIVEN** o aplicativo aberto
- **WHEN** a interface é renderizada
- **THEN** a tela exibe a barra superior, o menu lateral e a área de conteúdo,
  com a mesma estrutura visual do protótipo (RF002-CA002)

### Requirement: Marca clicável
A marca **TaleCraft** SHALL ser exibida no topo do menu lateral e SHALL ser
clicável, levando à tela Início (Meus Livros) (RF002-TL001).

#### Scenario: Clicar na marca volta ao Início
- **GIVEN** o usuário está em qualquer tela do aplicativo
- **WHEN** o usuário clica na marca TaleCraft
- **THEN** a tela Início (Meus Livros) é exibida e o item de menu correspondente
  fica ativo (RF002-TL001, RF002-CA003)

### Requirement: Menu lateral com os grupos do protótipo
O menu lateral SHALL apresentar os grupos e itens conforme o protótipo
(RF002-TL001):

- Grupo **Início**, com os itens **Meus Livros**, **Personagens** e
  **Worldbuilding**;
- Grupo **Preferências**, com o item **Temas**;
- Grupo **Livro aberto**, com o item do livro aberto.

#### Scenario: Grupos e itens do menu
- **GIVEN** o aplicativo aberto
- **WHEN** o usuário observa o menu lateral
- **THEN** são exibidos os grupos **Início** (com Meus Livros, Personagens e
  Worldbuilding), **Preferências** (com Temas) e **Livro aberto** (com o livro)
  (RF002-TL001)

### Requirement: Domínio do tema sobre os componentes
Os componentes SHALL respeitar o tema ativo, sem cores fixas que contrariem o
tema; o tema SHALL controlar cores, superfícies, bordas, tipografia e estados
ativos globalmente (RF002-CA007).

#### Scenario: Componentes seguem o tema ativo
- **GIVEN** um tema selecionado
- **WHEN** o usuário navega pelas telas
- **THEN** os componentes (botões, painéis, badges, tipografia) apresentam as
  cores e a tipografia do tema ativo, sem estilos incompatíveis (RF002-CA007)
