# rust-bridge (delta do RF005)

## ADDED Requirements

### Requirement: Comandos da árvore familiar expostos ao front-end
Além dos comandos de personagens já existentes, o back-end Rust SHALL expor
**comandos Tauri**, registrados no Tauri e invocáveis pelo front-end React via
`invoke`, para **ler a árvore familiar** de um personagem e para **listar os
tipos de relação disponíveis** com os dez valores do RF005. O comando de
gravação de relação SHALL gravar o **par espelhado** e SHALL **recusar** a
relação que criaria **ciclo de ascendência**, devolvendo mensagem útil
(RF005-RN002, RF005-RN005, RF005-CA004, RF005-CA007, RF005-CA009).

#### Scenario: Front-end lê a árvore familiar pelo comando
- **GIVEN** o aplicativo em execução com o banco aberto pelo back-end e um
  personagem com relações familiares gravadas
- **WHEN** o front-end invoca o comando de árvore familiar para esse personagem
- **THEN** o back-end devolve os nós e as ligações da linhagem, sem que o
  front-end acesse o SQLite diretamente (RF005-CA009)

#### Scenario: Front-end grava relação e recebe o par espelhado
- **GIVEN** o escritor define uma relação entre dois personagens na modal
- **WHEN** o front-end invoca o comando de gravação de relação
- **THEN** o back-end grava o par espelhado conforme a tabela de espelho e
  devolve a confirmação (RF005-RN002, RF005-CA002, RF005-CA004)

#### Scenario: Back-end recusa ciclo de ascendência
- **GIVEN** a relação pedida criaria um ciclo de ascendência
- **WHEN** o front-end invoca o comando de gravação de relação
- **THEN** o back-end recusa a gravação com uma mensagem útil, sem travar a
  aplicação (RF005-RN005, RF005-CA007)

#### Scenario: Front-end lista os dez tipos de relação
- **GIVEN** a modal de Relações é aberta
- **WHEN** o front-end consulta os tipos de relação disponíveis
- **THEN** o back-end devolve exatamente os dez tipos previstos, em vez dos
  oito anteriores (RF005-RN001, RF005-CA001)
