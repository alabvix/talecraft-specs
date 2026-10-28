# splash-screen Specification

## Purpose
TBD - created by archiving change rf002-interface-visual-navegacao-temas. Update Purpose after archive.
## Requirements
### Requirement: Tela de carregamento (splash)
Enquanto o aplicativo prepara os dados de inicialização, ele SHALL exibir uma tela de carregamento (splash) cobrindo a janela inteira, com o **ícone grande** do aplicativo, o **nome TaleCraft ao lado do ícone** e a **versão atual abaixo dos dois, em fonte menor**; a splash SHALL permanecer visível por pelo menos **1,2 s**, mesmo que a inicialização termine antes, e o fundo da janela/HTML SHALL usar a cor-base do tema, sem piscada branca (RF002-TL007, RF002-RN002, RF002-CA009, RF002-CA010).

#### Scenario: Splash exibida na abertura
- **GIVEN** o aplicativo é aberto
- **WHEN** a inicialização dos dados ainda não terminou
- **THEN** a tela de carregamento é exibida com o ícone, o nome **TaleCraft** e a versão do aplicativo (RF002-TL007)

#### Scenario: Layout da splash
- **GIVEN** a splash está na tela
- **WHEN** o escritor observa a composição
- **THEN** vê o **ícone grande**, o nome **TaleCraft** ao lado direito do ícone e a **versão atual** abaixo dos dois, em fonte menor que o nome (RF002-TL007, RF002-CA010)

#### Scenario: Tempo mínimo legível
- **GIVEN** a inicialização do banco termina em poucos milissegundos
- **WHEN** a splash é exibida
- **THEN** ela permanece na tela por pelo menos 1,2 s antes de dar lugar à aplicação (RF002-RN002, RF002-CA009)

#### Scenario: Sem piscada branca
- **GIVEN** o aplicativo acabou de abrir e o CSS/React ainda não carregaram
- **WHEN** a janela é pintada
- **THEN** o fundo é a cor-base do tema, não branco, e a splash assume em seguida (RF002-CA009)

#### Scenario: Splash dá lugar à aplicação
- **GIVEN** a tela de carregamento está sendo exibida
- **WHEN** o carregamento inicial termina e o tempo mínimo é atingido
- **THEN** a tela de carregamento desaparece e a aplicação (layout, menu e tela inicial Meus Livros) é exibida (RF002-TL007)

### Requirement: Estrutura de carregamento preparada
O carregamento inicial SHALL ser o ponto único que sustenta a tela de carregamento, de modo que requisitos futuros possam inserir trabalho real sem alterar a casca. O carregamento SHALL consultar o back-end (`estado_inicial` e `verificar_banco`) e concluir quando o banco estiver pronto; a splash SHALL permanecer por pelo menos 1,2 s mesmo assim (RF002-TL007, RF002-CA009).

#### Scenario: Inicialização com o banco
- **GIVEN** o aplicativo possui banco de dados local e migrações a aplicar
- **WHEN** o carregamento inicial é executado
- **THEN** ele consulta o back-end, conclui sem erro e libera a aplicação depois do tempo mínimo da splash (RF002-TL007, RF002-CA009)

#### Scenario: Back-end consultado no carregamento
- **GIVEN** o aplicativo roda dentro do Tauri
- **WHEN** o carregamento inicial começa
- **THEN** o front-end consulta o back-end Rust (`estado_inicial`) antes de liberar a aplicação, e o splash permanece até essa resposta chegar (RF002-TL007)

