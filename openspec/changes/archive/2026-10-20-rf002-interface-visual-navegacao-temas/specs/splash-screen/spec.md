## ADDED Requirements

### Requirement: Tela de carregamento (splash)
Enquanto o aplicativo prepara os dados de inicialização, ele SHALL exibir uma
tela de carregamento (splash) cobrindo a janela inteira, com a **logo** do
aplicativo, o **nome TaleCraft** abaixo dela e a **versão** atual
(RF002-TL007).

#### Scenario: Splash exibida na abertura
- **GIVEN** o aplicativo é aberto
- **WHEN** a inicialização dos dados ainda não terminou
- **THEN** a tela de carregamento é exibida com a logo, o nome **TaleCraft** e a
  versão do aplicativo (RF002-TL007)

#### Scenario: Splash dá lugar à aplicação
- **GIVEN** a tela de carregamento está sendo exibida
- **WHEN** o carregamento inicial termina
- **THEN** a tela de carregamento desaparece e a aplicação (layout, menu e tela
  inicial Meus Livros) é exibida (RF002-TL007)

### Requirement: Estrutura de carregamento preparada
O carregamento inicial SHALL ser o ponto único que sustenta a tela de
carregamento, de modo que requisitos futuros (por exemplo, SQLite e leitura de
livros/personagens) possam inserir trabalho real sem alterar a casca. Hoje,
como não há persistência, o carregamento SHALL concluir imediatamente, mas a
estrutura de **front-end e back-end** SHALL permanecer pronta.

#### Scenario: Inicialização atual sem dados
- **GIVEN** o aplicativo ainda não possui banco de dados nem entidades
- **WHEN** o carregamento inicial é executado
- **THEN** ele conclui imediatamente e a aplicação é exibida sem erro
  (RF002-TL007)

#### Scenario: Back-end consultado no carregamento
- **GIVEN** o aplicativo roda dentro do Tauri
- **WHEN** o carregamento inicial começa
- **THEN** o front-end consulta o back-end Rust (`estado_inicial`) antes de
  liberar a aplicação, e o splash permanece até essa resposta chegar
  (RF002-TL007)
