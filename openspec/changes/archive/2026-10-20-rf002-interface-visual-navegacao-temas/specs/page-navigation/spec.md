## ADDED Requirements

### Requirement: Tela inicial Meus Livros
Ao abrir o aplicativo, a interface SHALL exibir a tela **Meus Livros** como
página inicial (RF002-TL001, RF002-TL002).

#### Scenario: Abertura na tela Meus Livros
- **GIVEN** o aplicativo é aberto
- **WHEN** a interface é carregada
- **THEN** a tela exibida é **Meus Livros** e o item **Meus Livros** do menu
  está ativo (RF002-TL001, RF002-TL002)

### Requirement: Telas vazias com título e descrição
As telas **Meus Livros**, **Personagens** e **Worldbuilding** SHALL ser exibidas
vazias, contendo apenas a identificação da tela (nome e sua descrição), sem
conteúdo funcional (RF002-TL002, RF002-TL003, RF002-TL004).

#### Scenario: Tela vazia apresenta apenas nome e descrição
- **GIVEN** o usuário abre a tela Personagens ou Worldbuilding ou Meus Livros
- **WHEN** a tela é exibida
- **THEN** o conteúdo mostra o nome da tela e uma descrição, sem dados ou
  funcionalidade de domínio (RF002-TL002, RF002-TL003, RF002-TL004)

### Requirement: Tela Livro Aberto
A tela **Livro aberto** SHALL ser exibida vazia (RF002-TL006).

#### Scenario: Tela Livro aberto vazia
- **GIVEN** o usuário clica no item do livro aberto no menu
- **WHEN** a tela é exibida
- **THEN** a tela do livro aberto aparece vazia (RF002-TL006)

### Requirement: Navegação entre as telas
Ao clicar em um item do menu, o aplicativo SHALL abrir a tela correspondente e
SHALL atualizar o item de menu ativo, sem recarregar o aplicativo
(RF002-TL001, RF002-CA003).

#### Scenario: Cada item abre a tela correta
- **GIVEN** o aplicativo aberto
- **WHEN** o usuário clica em **Personagens**, **Worldbuilding**, **Temas** ou
  no **livro aberto**
- **THEN** a tela correspondente é exibida e o item clicado fica ativo no menu
  (RF002-CA003)

#### Scenario: Item ativo acompanha a tela
- **GIVEN** o usuário está em uma tela
- **WHEN** ele navega para outra tela
- **THEN** o item de menu anterior deixa de estar ativo e o novo item fica ativo
  (RF002-CA003)

### Requirement: Compatibilidade com a aplicação desktop
A navegação e as telas SHALL manter a execução desktop estabelecida no RF001
(RF002-CA001, RF002-CA008).

#### Scenario: Aplicação continua desktop e compilável
- **GIVEN** a interface implementada
- **WHEN** o aplicativo é executado e compilado
- **THEN** a aplicação permanece desktop (Tauri), compatível com React,
  JavaScript, Vite e Rust, e compila corretamente (RF002-CA001, RF002-CA008)
