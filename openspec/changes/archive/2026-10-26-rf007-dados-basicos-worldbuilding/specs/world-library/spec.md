## ADDED Requirements

### Requirement: Cadastro de mundos globais
O sistema SHALL permitir cadastrar **mundos globais**, entidade de domínio
independente de qualquer livro, com os atributos **Imagem, Nome, Tipo de Mundo,
Nível Tecnológico, Gêneros e Descrição**. Apenas o **Nome** é obrigatório; todos
os demais campos são opcionais (RF007-RN001, RF007-RN002, RF007-RN003,
RF007-CA005, RF007-CA015).

#### Scenario: Salvar mundo apenas com o Nome
- **GIVEN** o escritor está na tela de detalhe de um mundo novo
- **WHEN** ele preenche somente o campo Nome e aciona Salvar
- **THEN** o mundo é gravado com sucesso no banco e passa a aparecer na
  listagem, com os demais campos vazios (RF007-CA005)

#### Scenario: Salvar mundo com todos os dados básicos
- **GIVEN** o escritor preencheu Nome, Tipo de Mundo, Nível Tecnológico,
  Gêneros e Descrição
- **WHEN** ele aciona Salvar
- **THEN** todos os valores são gravados no registro do mundo e nos seus
  gêneros (RF007-CA015, RF007-CA016, RF007-CA018, RF007-CA019)

### Requirement: Nome obrigatório e único
O sistema SHALL exigir o preenchimento do **Nome** e SHALL impedir a gravação de
**dois mundos com o mesmo nome**, sem diferenciar maiúsculas de minúsculas, e
SHALL informar o conflito em vez de gravar (RF007-RN001, RF007-RN002,
RF007-CA006, RF007-CA007).

#### Scenario: Salvar sem Nome é bloqueado
- **GIVEN** o escritor está na tela de detalhe com o campo Nome vazio
- **WHEN** ele aciona Salvar
- **THEN** a gravação não acontece e a aplicação informa que o Nome é
  obrigatório (RF007-CA006)

#### Scenario: Nome repetido é recusado
- **GIVEN** já existe um mundo chamado "Kepler"
- **WHEN** o escritor tenta salvar outro mundo com o nome "kepler"
- **THEN** a gravação é impedida e a aplicação informa que o nome já existe
  (RF007-CA007)

### Requirement: Tipo de Mundo e Nível Tecnológico fechados
O sistema SHALL restringir o **Tipo de Mundo** aos quatro valores previstos —
Medieval, Moderno, Futurista e Antigo — e o **Nível Tecnológico** aos cinco
valores previstos — Tipo-0 Sub-Planetário, Tipo-1 Planetário, Tipo-2 Estelar,
Tipo-3 Galáctico e Tipo-4 Universal —, sem permitir texto livre
(RF007-RN004, RF007-RN005, RF007-CA016, RF007-CA019).

#### Scenario: Escolher e persistir o Tipo de Mundo
- **GIVEN** a tela de detalhe de um mundo está aberta
- **WHEN** o escritor escolhe "Futurista" e salva
- **THEN** o valor é gravado e reaparece selecionado ao reabrir o mundo, pois o
  campo aceita apenas os quatro valores previstos (RF007-CA019)

#### Scenario: Escolher e persistir o Nível Tecnológico
- **GIVEN** a tela de detalhe de um mundo está aberta
- **WHEN** o escritor escolhe "Tipo-2 Estelar" e salva
- **THEN** o valor é gravado e reaparece selecionado ao reabrir o mundo, pois o
  campo aceita apenas os cinco níveis previstos (RF007-CA016)

#### Scenario: Valor fora da lista é recusado
- **GIVEN** um Tipo de Mundo ou Nível Tecnológico fora das listas fechadas
- **WHEN** a gravação é tentada pelo back-end
- **THEN** o banco recusa o valor, pois o esquema tem `CHECK` para as duas
  listas (RF007-RN004, RF007-RN005)

### Requirement: Ajuda do Nível Tecnológico
O rótulo do campo Nível Tecnológico SHALL ter um controle **?** que, ao receber
o mouse ou o foco de teclado, exibe um **quadro flutuante** com as descrições
dos cinco níveis. O quadro SHALL fechar ao sair do controle, sem bloquear a
edição, e o controle SHALL ter rótulo acessível que explique a sua função
(RF007-RN006, RF007-CA017).

#### Scenario: Ajuda ao passar o mouse
- **GIVEN** a tela de detalhe de um mundo está aberta
- **WHEN** o escritor passa o mouse sobre o controle "?"
- **THEN** um quadro flutuante exibe as descrições dos cinco níveis
  tecnológicos (RF007-CA017)

#### Scenario: Ajuda por teclado
- **GIVEN** o controle "?" recebeu foco pelo teclado
- **WHEN** o escritor navega até ele com Tab
- **THEN** o mesmo quadro flutuante é exibido e fecha quando o foco sai do
  controle, permitindo usar o campo sem mouse (RF007-CA017)

### Requirement: Gêneros múltiplos e fechados
O sistema SHALL permitir selecionar **mais de um Gênero** entre os nove valores
previstos — Alta Fantasia, Fantasia Sombria, Cyberpunk, SteamPunk, Urbano,
Sci-Fi, SolarPunk, Sobrenatural e Gótico —, sem repetição e sem texto livre,
e SHALL gravar todos os gêneros selecionados (RF007-RN007, RF007-CA018).

#### Scenario: Selecionar vários gêneros
- **GIVEN** a tela de detalhe de um mundo está aberta
- **WHEN** o escritor seleciona "Sci-Fi" e "Sobrenatural" e salva
- **THEN** os dois gêneros são gravados e reaparecem selecionados ao reabrir o
  mundo (RF007-CA018)

#### Scenario: Lista fechada de gêneros
- **GIVEN** o campo de Gênero é exibido
- **WHEN** o escritor observa as opções disponíveis
- **THEN** existem exatamente os nove gêneros previstos, sem possibilidade de
  digitar um valor livre (RF007-RN007, RF007-CA018)

### Requirement: Lista de mundos em cards e em lista
A tela principal de Mundos SHALL listar os mundos cadastrados, permitindo
**alternar entre cards e lista**, **iniciar a inclusão de um novo mundo** e
**abrir o detalhe** ao clicar no card ou no nome. Os mundos SHALL ser ordenados
alfabeticamente pelo Nome, sem diferenciar maiúsculas de minúsculas
(RF007-TL001, RF007-RN020, RF007-CA001, RF007-CA002, RF007-CA003,
RF007-CA004, RF007-CA013, RF007-CA014).

#### Scenario: Abrir a tela pelo menu Worldbuilding
- **GIVEN** o aplicativo está em execução
- **WHEN** o escritor clica em Worldbuilding na barra lateral
- **THEN** a Tela Principal de Mundos é exibida com os mundos cadastrados
  (RF007-CA001)

#### Scenario: Conteúdo do card
- **GIVEN** existem mundos cadastrados
- **WHEN** a listagem é exibida em cards
- **THEN** cada card mostra a imagem do mundo (ou o espaço reservado), o Nome, o
  Tipo de Mundo, o Nível Tecnológico e os Gêneros (RF007-CA002)

#### Scenario: Alternar entre cards e lista
- **GIVEN** a Tela Principal de Mundos está aberta com mundos cadastrados
- **WHEN** o escritor alterna a forma de visualização
- **THEN** os mundos são apresentados em cards ou em lista, e a lista mostra a
  imagem e o Nome, o Tipo de Mundo, o Nível Tecnológico e os Gêneros
  (RF007-CA003)

#### Scenario: Iniciar a inclusão de um mundo
- **GIVEN** a Tela Principal de Mundos está aberta
- **WHEN** o escritor aciona o botão "Novo mundo" ou o card "Novo mundo"
- **THEN** a tela de detalhe é aberta vazia, pronta para o cadastro
  (RF007-CA004)

#### Scenario: Abrir o detalhe pelo card ou pelo nome
- **GIVEN** a Tela Principal de Mundos está exibindo mundos cadastrados
- **WHEN** o escritor clica em um card, ou no nome do mundo na exibição em
  lista
- **THEN** a tela de detalhe daquele mundo é aberta (RF007-CA014)

#### Scenario: Sem o botão Exportar mundos
- **GIVEN** a Tela Principal de Mundos está aberta
- **WHEN** o escritor observa o cabeçalho da listagem
- **THEN** não existe o botão "Exportar mundos" do protótipo (RF007-CA013)

#### Scenario: Ordem alfabética
- **GIVEN** existem mundos "Ravória", "arda" e "Kepler" cadastrados
- **WHEN** a listagem é exibida
- **THEN** a ordem é "arda", "Kepler" e "Ravória", sem diferenciar maiúsculas
  de minúsculas (RF007-RN020)

### Requirement: Busca e filtros de mundos
A tela principal SHALL filtrar os mundos pela **busca por Nome**, pelo
**Tipo de Mundo** e pelo **Gênero**, permitindo combinar os três critérios. O
filtro por Gênero SHALL encontrar o mundo que possui aquele gênero entre vários,
e o filtro **Filtrar por livro** SHALL permanecer sem opções enquanto a entidade
Livro não existir (RF007-TL001, RF007-RN008, RF007-RN009, RF007-CA008,
RF007-CA009, RF007-CA010, RF007-CA011, RF007-CA012).

#### Scenario: Buscar mundo pelo nome
- **GIVEN** existem mundos cadastrados com nomes distintos
- **WHEN** o escritor digita parte de um nome na barra de busca
- **THEN** a lista exibe somente os mundos cujo nome corresponde ao texto,
  ignorando diferenças entre maiúsculas e minúsculas (RF007-CA008)

#### Scenario: Filtrar por Tipo de Mundo
- **GIVEN** existem mundos de tipos diferentes
- **WHEN** o escritor escolhe o Tipo "Medieval"
- **THEN** a lista exibe somente os mundos desse tipo (RF007-CA009)

#### Scenario: Filtrar por Gênero
- **GIVEN** existem mundos com gêneros diferentes, inclusive um mundo com os
  gêneros "Sci-Fi" e "Sobrenatural"
- **WHEN** o escritor escolhe o Gênero "Sobrenatural"
- **THEN** a lista inclui o mundo que possui esse gênero entre os seus
  (RF007-CA010)

#### Scenario: Combinar busca, Tipo e Gênero
- **GIVEN** existem vários mundos cadastrados
- **WHEN** o escritor usa ao mesmo tempo a busca por nome e os filtros de Tipo
  e de Gênero
- **THEN** a lista mostra apenas os mundos que atendem a todos os critérios
  (RF007-CA011)

#### Scenario: Filtro por livro sem opções
- **GIVEN** a entidade Livro ainda não existe
- **WHEN** o escritor observa o controle "Filtrar por livro"
- **THEN** ele está desabilitado, exibe "Nenhum livro cadastrado" e não
  apresenta opções (RF007-RN009, RF007-CA012)

### Requirement: Tela de detalhe e criação do mundo
A tela de detalhe SHALL exibir e permitir **editar os dados básicos do mundo**,
oferecendo os botões **Voltar**, **Exportar Mundo** e **Salvar**, e SHALL ser a
mesma tela usada para um mundo recém-criado, indicando quando o mundo ainda não
foi salvo. Exportar Mundo SHALL permanecer desabilitado enquanto o mundo não
estiver salvo (RF007-TL002, RF007-CA015, RF007-CA025).

#### Scenario: Editar e salvar o mundo
- **GIVEN** a tela de detalhe de um mundo existente está aberta
- **WHEN** o escritor altera um campo e aciona Salvar
- **THEN** a alteração é gravada e permanece após fechar e reabrir a aplicação
  (RF007-CA015)

#### Scenario: Botões do cabeçalho
- **GIVEN** a tela de detalhe de um mundo está aberta
- **WHEN** o escritor observa o cabeçalho
- **THEN** os botões Voltar, Exportar Mundo e Salvar estão presentes
  (RF007-CA025)

#### Scenario: Exportar exige mundo salvo
- **GIVEN** a tela de detalhe está aberta para um mundo ainda não salvo
- **WHEN** o escritor observa o botão Exportar Mundo
- **THEN** o botão está desabilitado, pois não há registro para exportar
  (RF007-CA025)

#### Scenario: Voltar para a listagem
- **GIVEN** a tela de detalhe de um mundo está aberta
- **WHEN** o escritor aciona Voltar
- **THEN** a Tela Principal de Mundos é exibida novamente (RF007-CA025)

### Requirement: Painel Vínculos com livros retrátil e sem dados
A tela de detalhe SHALL exibir o card **Vínculos com livros** retrátil, com o
mesmo comportamento do painel de Personagens: inicia **retraído** quando não há
vínculos, alterna por um ícone no cabeçalho, é acionável por teclado e informa
o estado por rótulo acessível. Neste requisito o contador SHALL ser zero e o
corpo SHALL informar que a associação entre mundo e livro pertence a requisito
posterior (RF007-TL002, RF007-RN014, RF007-CA024).

#### Scenario: Painel retraído sem vínculos
- **GIVEN** a tela de detalhe de um mundo sem vínculos com livros está aberta
- **WHEN** o escritor observa o card Vínculos com livros
- **THEN** ele está retraído, mostra zero vínculos e apenas o cabeçalho
  (RF007-RN014, RF007-CA024)

#### Scenario: Expandir e retrair o painel
- **GIVEN** o card Vínculos com livros está visível
- **WHEN** o escritor clica no ícone do cabeçalho, ou o aciona pelo teclado com
  Enter ou Espaço
- **THEN** o painel alterna entre retraído e expandido sem recarregar a tela nem
  perder os dados do formulário (RF007-RN014, RF007-CA024)

#### Scenario: Corpo sem vínculos
- **GIVEN** o card Vínculos com livros está expandido
- **WHEN** o escritor observa o corpo do card
- **THEN** ele informa que a associação entre mundo e livro pertence a requisito
  posterior, sem apresentar nenhum livro (RF007-CA024)

### Requirement: Imagem do mundo
O sistema SHALL permitir associar **uma imagem** a um mundo já salvo, copiando o
arquivo escolhido para `<app_data_dir>/mundos/` e gravando o caminho relativo no
banco. A imagem SHALL aceitar JPG, PNG ou WEBP de até **4 MB**, ser exibida em
proporção **16:9** com recorte e sem distorção no detalhe, no card e na lista,
e dar lugar a um espaço reservado quando não houver imagem (RF007-RN010,
RF007-RN011, RF007-RN012, RF007-RN013, RF007-CA020, RF007-CA021,
RF007-CA022, RF007-CA023).

#### Scenario: Imagem exige mundo salvo
- **GIVEN** a tela de detalhe de um mundo ainda não salvo está aberta
- **WHEN** o escritor observa o envio de imagem
- **THEN** o envio está desabilitado até o mundo ser salvo (RF007-CA020)

#### Scenario: Associar imagem e persistir
- **GIVEN** o mundo está salvo e não tem imagem
- **WHEN** o escritor escolhe um arquivo JPG no diálogo nativo
- **THEN** o arquivo é copiado para o diretório de dados do aplicativo, o
  caminho relativo é gravado e a imagem aparece no detalhe, no card e na lista,
  inclusive após fechar e reabrir (RF007-CA021)

#### Scenario: Imagem grande ou de formato inválido
- **GIVEN** o escritor escolhe um arquivo acima de 4 MB ou fora de JPG, PNG e
  WEBP
- **WHEN** o envio é confirmado
- **THEN** o arquivo é recusado com uma mensagem útil, sem travar a aplicação
  (RF007-CA022)

#### Scenario: Enquadramento 16:9
- **GIVEN** um mundo tem uma imagem associada
- **WHEN** a imagem é exibida no detalhe, no card e na lista
- **THEN** ela ocupa uma moldura em proporção 16:9, com recorte e sem distorção
  (RF007-CA023)

#### Scenario: Mundo sem imagem
- **GIVEN** um mundo não tem imagem associada
- **WHEN** o card, a lista ou o detalhe são exibidos
- **THEN** aparece um espaço reservado, sem quebrar o layout (RF007-CA020)

### Requirement: Persistência de mundos
Os mundos, seus gêneros e o caminho da sua imagem SHALL permanecer disponíveis
após **fechar e reabrir** a aplicação (RF007-CA029).

#### Scenario: Reabrir o aplicativo
- **GIVEN** o escritor cadastrou um mundo com Tipo, Nível Tecnológico, Gêneros e
  imagem
- **WHEN** ele fecha e reabre a aplicação
- **THEN** o mundo continua na listagem com todos esses dados e a imagem
  carregada (RF007-CA029)

### Requirement: Separação de camadas nos mundos
As operações de mundos SHALL ser executadas **exclusivamente pelo back-end
Rust**, expostas ao front-end React por **comandos Tauri**; o front-end SHALL
NOT executar SQL nem acessar o SQLite diretamente (RF007-CA031).

#### Scenario: Front-end lê mundos por comando
- **GIVEN** o aplicativo está em execução com o banco aberto pelo back-end
- **WHEN** a tela de Mundos carrega a listagem
- **THEN** ela obtém os dados por um comando Tauri, sem SQL escrito no React
  (RF007-CA031)

#### Scenario: Front-end grava mundo por comando
- **GIVEN** o escritor preencheu os dados de um mundo
- **WHEN** ele aciona Salvar
- **THEN** o front-end envia os dados ao back-end, que grava o mundo e seus
  gêneros em uma transação (RF007-CA031)

### Requirement: Testes automatizados dos mundos
O projeto SHALL incluir **testes automatizados** para criação, leitura e
atualização de mundos, Nome obrigatório e único, listas fechadas de Tipo e
Nível Tecnológico, múltiplos gêneros, filtros, migração v4 e geração do
documento do mundo (RF007-CA032).

#### Scenario: Testes do domínio de mundos
- **GIVEN** o projeto é compilado para testes
- **WHEN** os testes do back-end são executados
- **THEN** existem testes cobrindo as regras do domínio de mundos e todos
  passam (RF007-CA032)

### Requirement: Sem regressão de tema e navegação
A implementação SHALL preservar a navegação, o tema ativo e a tela de
carregamento (splash) dos requisitos anteriores, incluindo as telas de
Personagens (RF007-CA033).

#### Scenario: Navegação e tema preservados
- **GIVEN** o escritor abre o menu Worldbuilding e retorna às telas anteriores
- **WHEN** a navegação acontece
- **THEN** o tema ativo, o splash e as telas de Personagens continuam
  funcionando como antes (RF007-CA033)

### Requirement: Escopo do mundo — sem entradas, vínculos ou exclusão
Este requisito SHALL NOT criar as entradas do mundo (Localidades, Raças e
povos, Artefatos, Armas, Eventos, Sistema de energia, Sistema de Magia e Mapa
Geral), SHALL NOT criar a associação entre mundo e livro, SHALL NOT criar dados
por livro e SHALL NOT permitir excluir mundos (RF007-RN021, RF007-RN022,
RF007-CA034).

#### Scenario: Tela sem categorias de entradas
- **GIVEN** a tela de detalhe de um mundo está aberta
- **WHEN** o escritor observa a tela
- **THEN** não existem os quadros de categorias de entradas, ficha rápida,
  mapa geral nem curva de arco; há apenas Vínculos com livros e Dados
  Compartilhados (RF007-RN022, RF007-CA034)

#### Scenario: Sem associação com livro
- **GIVEN** o escritor está na tela de um mundo
- **WHEN** ele procura uma forma de associar o mundo a um livro
- **THEN** nenhuma associação é oferecida, pois ela pertence a requisito
  posterior (RF007-RN022, RF007-CA034)

#### Scenario: Sem exclusão de mundos
- **GIVEN** a Tela Principal de Mundos ou o detalhe estão abertos
- **WHEN** o escritor procura uma ação de excluir mundo
- **THEN** nenhuma ação de exclusão existe neste requisito (RF007-RN021,
  RF007-CA034)
