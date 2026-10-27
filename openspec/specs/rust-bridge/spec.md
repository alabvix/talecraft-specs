# rust-bridge

## Purpose

Comunicação entre o front-end React e o back-end Rust do TaleCraft via IPC do
Tauri, validada por um comando de demonstração.

Cobre o requisito **RF001** (estrutura inicial e execução da aplicação).
## Requirements
### Requirement: Comando Rust de demonstração exposto ao front-end
O back-end Rust SHALL expor um comando de demonstração registrado no Tauri e o
front-end React SHALL invocá-lo por meio do `invoke` do Tauri, exibindo o
retorno recebido. O comando SHALL servir apenas para validar a comunicação entre
as camadas, sem regra de negócio (RF001-RN003).

#### Scenario: Front-end invoca o comando e exibe a resposta
- **GIVEN** o aplicativo em execução com a interface React carregada
- **WHEN** o front-end invoca o comando de demonstração via `invoke`
- **THEN** o comando Rust executa e retorna uma resposta que o front-end exibe
  na interface (RF001-RN003, RF001-CA004)

#### Scenario: Resposta identifica a origem no back-end
- **GIVEN** o comando de demonstração executado com sucesso
- **WHEN** o retorno é exibido no front-end
- **THEN** a resposta deixa claro que veio do back-end Rust, comprovando o IPC
  entre as camadas (RF001-RN003, RF001-CA004)

### Requirement: Estado inicial reflete a inicialização do banco
O comando `estado_inicial` SHALL **deixar de ser um valor fixo** e passar a
refletir o **resultado real da inicialização do banco** (abertura, criação e
migrações). O front-end SHALL manter a **tela de carregamento (splash)** ativa
até esse comando responder com sucesso, e o comando SHALL indicar **falha com
mensagem útil** quando a inicialização não puder ser concluída
(RF003-CA005, RF003-CA009).

#### Scenario: Splash espera a inicialização do banco
- **GIVEN** o aplicativo é iniciado
- **WHEN** o front-end consulta `estado_inicial` durante o carregamento
- **THEN** a tela de carregamento permanece ativa até a inicialização do banco
  concluir com sucesso (RF003-CA005)

#### Scenario: Falha na inicialização é comunicada
- **GIVEN** o banco não pôde ser aberto, criado ou migrado
- **WHEN** o front-end consulta `estado_inicial`
- **THEN** o comando sinaliza a falha com uma mensagem de erro útil ao
  diagnóstico, sem a aplicação encerrar silenciosamente (RF003-CA009)

### Requirement: Operação de teste do banco exposta ao front-end
Além do comando de demonstração, o back-end Rust SHALL expor um comando de
**teste de comunicação com o banco** registrado no Tauri, invocável pelo
front-end via `invoke`, que confirma que o banco respondeu corretamente
(RF003-CA007, RF003-CA008).

#### Scenario: Front-end valida a comunicação pelo comando de teste
- **GIVEN** o aplicativo em execução com o banco aberto pelo back-end
- **WHEN** o front-end invoca o comando de teste via `invoke`
- **THEN** o comando executa uma operação no banco pelo back-end e retorna a
  confirmação ao front-end (RF003-CA007, RF003-CA008)

### Requirement: Comandos de personagens expostos ao front-end
O back-end Rust SHALL expor **comandos Tauri** para as operações de personagens
e de relações, registrados no Tauri e invocáveis pelo front-end React via
`invoke`: gravar (criar/atualizar, incluindo as relações informadas), listar
(com busca por nome), obter um personagem, associar o retrato, listar os
personagens para a modal de relações e gravar/atualizar uma relação com um dos
oito tipos previstos. Este requisito SHALL **não** expor comando de exclusão de
personagem (RF004-CA001, RF004-CA014, RF004-CA021).

#### Scenario: Front-end lista personagens pelo comando
- **GIVEN** o aplicativo em execução com o banco aberto pelo back-end
- **WHEN** o front-end invoca o comando de listagem de personagens
- **THEN** o back-end consulta o banco e devolve os personagens, sem que o
  front-end acesse o SQLite diretamente (RF004-CA021)

#### Scenario: Front-end grava personagem e relações pelo comando
- **GIVEN** o escritor preencheu um personagem e definiu relações
- **WHEN** o front-end invoca o comando de gravação
- **THEN** o back-end grava o personagem e suas relações nas respectivas tabelas
  e devolve a confirmação (RF004-CA001, RF004-CA014)

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

### Requirement: Comandos de mundos expostos ao front-end
O back-end Rust SHALL expor **comandos Tauri** para as operações de mundos,
registrados no `invoke_handler` e invocáveis pelo front-end React via `invoke`:
listar mundos (com busca por nome e filtros por Tipo de Mundo e por Gênero),
obter um mundo com os seus gêneros, salvar (criar/atualizar, incluindo os
gêneros informados), associar a imagem do mundo e exportar o mundo em PDF. Este
requisito SHALL **não** expor comando de exclusão de mundo (RF007-CA021,
RF007-CA031, RF007-CA034).

#### Scenario: Front-end lista mundos pelo comando
- **GIVEN** o aplicativo em execução com o banco aberto pelo back-end
- **WHEN** o front-end invoca o comando de listagem de mundos
- **THEN** o back-end consulta o banco e devolve os mundos, sem que o front-end
  acesse o SQLite diretamente (RF007-CA031)

#### Scenario: Front-end lista com busca e filtros
- **GIVEN** existem mundos cadastrados com tipos e gêneros diferentes
- **WHEN** o front-end invoca a listagem com texto de busca, Tipo de Mundo e
  Gênero
- **THEN** o back-end aplica os três critérios e devolve apenas os mundos que
  atendem a todos eles (RF007-CA008, RF007-CA009, RF007-CA010, RF007-CA011)

#### Scenario: Front-end grava mundo e gêneros pelo comando
- **GIVEN** o escritor preencheu os dados básicos e selecionou gêneros
- **WHEN** o front-end invoca o comando de gravação
- **THEN** o back-end grava o mundo e os gêneros em uma transação e devolve a
  confirmação (RF007-CA015, RF007-CA018)

#### Scenario: Front-end associa a imagem pelo comando
- **GIVEN** o escritor escolheu um arquivo de imagem válido
- **WHEN** o front-end invoca o comando de associação de imagem com o caminho
  escolhido
- **THEN** o back-end valida formato e tamanho, copia o arquivo para o
  diretório de dados e grava o caminho relativo (RF007-CA021, RF007-CA022)

#### Scenario: Front-end exporta o mundo pelo comando
- **GIVEN** a tela de detalhe de um mundo salvo está aberta
- **WHEN** o front-end invoca o comando de exportação com o destino escolhido
- **THEN** o back-end monta o documento e grava o PDF naquele destino
  (RF007-CA026)

### Requirement: Comandos de livros expostos ao front-end
O sistema SHALL expor ao front-end, pelo `invoke_handler`, os comandos `listar_livros`, `obter_livro`, `salvar_livro`, `listas_livro` e `estatisticas_biblioteca`, com as regras de domínio no back-end e apenas mensagens úteis no IPC (RF011-RN002 a RF011-RN007, RF011-CA003 a RF011-CA011).

#### Scenario: Listar e abrir livros
- **GIVEN** existem livros cadastrados
- **WHEN** o front-end chama `listar_livros` e depois `obter_livro`
- **THEN** recebe os livros com os subgêneros e os dados gerais, sem falar SQLite (RF011-CA005, RF011-CA006)

#### Scenario: Gravar livro
- **GIVEN** o front-end chama `salvar_livro` com um título válido
- **WHEN** o comando termina
- **THEN** o livro e os subgêneros foram gravados juntos e o livro salvo é devolvido (RF011-RN007)

#### Scenario: Listas fechadas do formulário
- **GIVEN** a página Dados do Livro vai montar os controles
- **WHEN** o front-end chama `listas_livro`
- **THEN** recebe gêneros, subgêneros por gênero, faixas de público e idiomas do back-end (RF011-CA007, RF011-CA010, RF011-CA011)

#### Scenario: Estatísticas da biblioteca
- **GIVEN** a tela Meus Livros vai montar as métricas
- **WHEN** o front-end chama `estatisticas_biblioteca`
- **THEN** recebe as contagens de livros, personagens, capítulos e entradas de mundo (RF011-CA018)

