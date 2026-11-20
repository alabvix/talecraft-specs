# world-library Specification

## Purpose
TBD - created by archiving change rf007-dados-basicos-worldbuilding. Update Purpose after archive.
## Requirements
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

### Requirement: Painel Vínculos com livros com contagem e atalho
A tela de detalhe do mundo SHALL exibir o card **Vínculos com livros** retrátil, com o mesmo comportamento do painel de Personagens — retraído quando não há vínculos, expandido quando há, alternado por um ícone no cabeçalho, acionável por teclado (Enter e Espaço) e com rótulo acessível —, SHALL mostrar no cabeçalho a contagem real de livros e, no corpo, um resumo com a quantidade e um atalho para a aba **Livros**; sem vínculos, o corpo SHALL informar que nenhum livro usa o mundo e SHALL NOT duplicar a lista da aba (RF017-TL008, RF017-CA014).

#### Scenario: Painel retraído sem vínculos
- **GIVEN** a tela de detalhe de um mundo sem vínculos com livros está aberta
- **WHEN** o escritor observa o card Vínculos com livros
- **THEN** ele está retraído, mostra zero vínculos e apenas o cabeçalho (RF017-TL008, RF017-CA014)

#### Scenario: Expandir e retrair o painel
- **GIVEN** o card Vínculos com livros está visível
- **WHEN** o escritor clica no ícone do cabeçalho, ou o aciona pelo teclado com Enter ou Espaço
- **THEN** o painel alterna entre retraído e expandido sem recarregar a tela nem perder os dados do formulário (RF017-TL008, RF017-CA014)

#### Scenario: Contagem e atalho
- **GIVEN** o mundo **Kepler** é usado por dois livros
- **WHEN** o escritor expande **Vínculos com livros**
- **THEN** o contador mostra **2**, o corpo informa que dois livros usam o mundo e oferece o atalho para a aba **Livros**, sem repetir a lista (RF017-TL008, RF017-CA014)

#### Scenario: Corpo sem vínculos
- **GIVEN** o card Vínculos com livros está expandido e o mundo não é usado por nenhum livro
- **WHEN** o escritor observa o corpo do card
- **THEN** ele informa que nenhum livro usa o mundo, sem listar livros (RF017-CA014)

### Requirement: Aba Livros do detalhe do mundo
A tela de detalhe do mundo SHALL exibir, depois das entradas e de **Facções**, a aba **Livros** com o contador de livros e a lista dos livros que usam o mundo; cada **Título** SHALL ser um link que abre a página daquele livro, e a aba SHALL mostrar estado vazio quando não houver vínculo e orientar a salvar quando o mundo não estiver gravado (RF017-TL010, RF017-CA014).

#### Scenario: Aba com os livros do mundo
- **GIVEN** o mundo **Kepler** está associado a dois livros
- **WHEN** o escritor abre o mundo e clica na aba **Livros**
- **THEN** vê o contador **2** e os dois títulos listados (RF017-TL010, RF017-CA014)

#### Scenario: Título abre a página do livro
- **GIVEN** a aba **Livros** lista um livro
- **WHEN** o escritor clica no título
- **THEN** o aplicativo abre a página daquele livro (RF017-TL010, RF017-CA014)

#### Scenario: Aba sem vínculos
- **GIVEN** o mundo não é usado por nenhum livro
- **WHEN** o escritor abre a aba **Livros**
- **THEN** a aba informa que nenhum livro usa este mundo (RF017-TL010, RF017-CA014)

### Requirement: Livros associados na listagem de mundos
A tela principal de Mundos SHALL exibir, em cada card, a quantidade e os títulos dos livros associados — ou **Nenhum livro** quando não houver vínculo — e SHALL manter uma coluna **Livros** na visualização em lista, sem alterar os filtros, a busca ou a ordenação dos mundos (RF017-TL011, RF017-CA022).

#### Scenario: Card com livros
- **GIVEN** o mundo **Kepler** é usado por **A Órbita Silenciosa**
- **WHEN** o escritor abre Meus Mundos em **Cards**
- **THEN** o card de **Kepler** mostra a quantidade e o título do livro (RF017-TL011, RF017-CA022)

#### Scenario: Card sem livros
- **GIVEN** o mundo **Arda** não é usado por nenhum livro
- **WHEN** o escritor abre Meus Mundos
- **THEN** o card de **Arda** mostra **Nenhum livro** (RF017-TL011, RF017-CA022)

#### Scenario: Coluna na lista
- **GIVEN** existem mundos com e sem livros
- **WHEN** o escritor alterna para **Lista**
- **THEN** a tabela tem a coluna **Livros** com os títulos de cada mundo ou **Nenhum livro** (RF017-TL011, RF017-CA022)

### Requirement: Mapas do Mundo
O detalhe do Mundo SHALL exibir, depois de **Localidades**, a aba **Mapas** com a lista de mapas em cards — Nome, escala, âncora, quantidade de localidades e **Abrir** — e o botão **Novo mapa**; a modal SHALL ter **Nome** obrigatório, **Tipo** em lista fechada (**Mundo**, **Região**, **Cidade**, **Bairro** e **Prédio/Casa**), **Âncora** opcional limitada às localidades do mesmo mundo e **Fundo** em lista fechada (**Papel**, **Grade**, **Hex**, **Blueprint** e **Topográfico**), e SHALL permitir editar os metadados e **Excluir mapa** com confirmação, sem apagar localidades (RF019-TL001, RF019-TL002, RF019-FL001, RF019-FL009, RF019-RN001 a RF019-RN004, RF019-RN010, RF019-CA001 a RF019-CA004, RF019-CA013).

#### Scenario: Criar mapa
- **GIVEN** o mundo está salvo e a aba **Mapas** está aberta
- **WHEN** o escritor clica em **Novo mapa**, informa Nome, Tipo, Âncora e Fundo e salva
- **THEN** o card aparece com tipo, âncora e contagem e o mapa abre no editor (RF019-FL001, RF019-CA002)

#### Scenario: Escalas fechadas
- **GIVEN** a modal de mapa está aberta
- **WHEN** o escritor abre o campo **Tipo**
- **THEN** vê exatamente **Mundo**, **Região**, **Cidade**, **Bairro** e **Prédio/Casa** (RF019-RN002, RF019-CA003)

#### Scenario: Âncora de outro mundo
- **GIVEN** existem dois mundos com localidades
- **WHEN** o escritor tenta usar como âncora uma localidade de outro mundo
- **THEN** o domínio recusa e nada é gravado (RF019-RN003, RF019-CA004)

#### Scenario: Excluir mapa
- **GIVEN** um mapa com marcadores e formas
- **WHEN** o escritor confirma **Excluir mapa**
- **THEN** o mapa e os seus elementos saem, e as localidades continuam na aba Localidades (RF019-RN010, RF019-CA013)

### Requirement: Editor de mapas do Mundo
O editor SHALL oferecer toolbar (**Selecionar/Mover**, **Polígono**, **Ligação**, **Apagar**, **Desfazer**, **Refazer**, zoom), canvas de 1000 × 700 com pan/zoom e fundo do template, painel pesquisável das localidades do mundo para arrastar e **Nova localidade**, e painel de propriedades; em mapas de **Prédio/Casa**, **Polígono** e **Ligação** SHALL dar lugar a **Porta**; SHALL posicionar cada localidade uma única vez por mapa, desenhar polígonos com pelo menos 3 vértices e cor semântica, criar ligações com rótulo e estilo entre localidades do mapa, remover elementos sem tocar no cadastro e gravar tudo por **Salvar** explícito, com histórico de desfazer/refazer em memória (RF019-TL003 a RF019-TL007, RF019-TL012, RF019-FL002 a RF019-FL008, RF019-FL011, RF019-RN005 a RF019-RN009, RF019-RN012, RF019-RN020 a RF019-RN023, RF019-CA005 a RF019-CA015, RF019-CA026 a RF019-CA028).

#### Scenario: Arrastar localidade para o mapa
- **GIVEN** a localidade **Porto** ainda não está no mapa
- **WHEN** o escritor a arrasta da lista para o canvas
- **THEN** um marcador é criado na posição solta, com o selo **No mapa**, e a mesma localidade não pode entrar de novo (RF019-FL003, RF019-RN005, RF019-CA006)

#### Scenario: Criar localidade pelo mapa
- **GIVEN** a aba Mapas está aberta em um mapa com âncora
- **WHEN** o escritor usa **Nova localidade**, preenche a modal do RF018 e salva
- **THEN** a localidade é criada no mundo, entra no mapa no centro da visão, com a âncora como pai sugerido, e aparece na aba Localidades (RF019-TL006, RF019-FL004, RF019-CA007)

#### Scenario: Desenhar polígono
- **GIVEN** a ferramenta **Polígono** está ativa em um mapa que não é **Prédio/Casa**
- **WHEN** o escritor clica em três ou mais vértices e fecha com duplo clique
- **THEN** a forma é criada, selecionada e pode ser renomeada, recolorida, movida ou apagada; dois vértices são recusados (RF019-TL004, RF019-FL005, RF019-RN007, RF019-CA008)

#### Scenario: Ligação entre localidades
- **GIVEN** **Porto** e **Centro** estão no mapa e ele não é **Prédio/Casa**
- **WHEN** o escritor usa **Ligação**, clica em Porto e depois em Centro
- **THEN** a ligação é criada com rótulo e estilo editáveis; auto-ligação e o mesmo par repetido são recusados (RF019-TL007, RF019-FL006, RF019-RN008, RF019-CA009)

#### Scenario: Salvar e reabrir
- **GIVEN** o escritor posicionou localidades, desenhou formas e criou ligações
- **WHEN** clica em **Salvar**, sai e reabre o mapa
- **THEN** tudo volta nas mesmas posições; sair sem salvar descarta as pendências (RF019-FL002, RF019-RN009, RF019-RN012, RF019-CA012)

#### Scenario: Desfazer e refazer
- **GIVEN** o escritor moveu um marcador e desenhou uma forma sem salvar
- **WHEN** usa **Desfazer** e **Refazer**
- **THEN** o documento volta e avança no histórico, sem gravar no banco antes de **Salvar** (RF019-FL007, RF019-CA011)

#### Scenario: Templates
- **GIVEN** o mapa tem marcadores e formas
- **WHEN** o escritor troca o **Fundo** entre os cinco templates
- **THEN** o padrão do canvas muda sem perder elementos (RF019-RN004, RF019-CA014)

### Requirement: Ícones das localidades no mapa
Quando a localidade não tem imagem, o marcador SHALL usar um ícone do seu **Tipo** (RF018), desenhado no estilo do **Tipo do Mundo** — **Medieval**, **Moderno**, **Futurista** ou **Antigo** — para as famílias de assentamento, moradia, fortificação e templo; as demais famílias SHALL usar um desenho único, a imagem cadastrada SHALL ter prioridade sobre o ícone e os tipos sem desenho, inclusive **Não definido**, SHALL manter o quadrado vazio (RF019-TL005, RF019-RN017, RF019-CA023).

#### Scenario: Ícone pelo tipo e pelo mundo
- **GIVEN** o mapa pertence a um mundo **Medieval**
- **WHEN** uma localidade **Cidade** sem imagem é colocada no mapa
- **THEN** o marcador mostra o ícone de muralha; em um mundo **Futurista**, mostra o de cúpulas (RF019-TL005, RF019-RN017, RF019-CA023)

#### Scenario: Imagem tem prioridade
- **GIVEN** a localidade tem imagem cadastrada
- **WHEN** o marcador é desenhado no editor, no livro ou no PDF
- **THEN** mostra a miniatura, sem o ícone por cima (RF019-RN017, RF019-CA023)

#### Scenario: Tipo sem desenho
- **GIVEN** a localidade está como **Não definido** ou o tipo não tem glifo
- **WHEN** o marcador é desenhado
- **THEN** mantém o quadrado vazio, sem inventar símbolo (RF019-RN017, RF019-CA023)

### Requirement: Plantas por escala
Mapas de **Cidade** e **Bairro** SHALL desenhar uma planta funcional em SVG no plano de 1000 × 700 — ruas e quarteirões vazios ou quadras com lotes — no lugar dos cinco fundos decorativos; **Prédio/Casa** SHALL usar uma **grade fixa**, sem a planta baixa, escondendo o seletor de **Fundo** nas três escalas; **Cidade** e **Bairro** SHALL manter o **Polígono** para sombrear áreas, e **Prédio/Casa** SHALL usar cômodos e portas no lugar de **Polígono** e **Ligação**; **Mundo** e **Região** SHALL manter os fundos atuais (RF019-TL010, RF019-TL012, RF019-RN018, RF019-RN023, RF019-CA024, RF019-CA027).

#### Scenario: Planta de Cidade
- **GIVEN** um mapa de **Cidade** aberto no editor
- **WHEN** o canvas é desenhado
- **THEN** mostra ruas, quarteirões vazios e a praça, sem o seletor de **Fundo**, com o **Polígono** disponível (RF019-TL010, RF019-RN018, RF019-CA024)

#### Scenario: Grade de Prédio/Casa
- **GIVEN** um mapa de **Prédio/Casa** aberto no editor
- **WHEN** o canvas é desenhado
- **THEN** o fundo é a grade fixa, sem a planta baixa, e os cômodos e portas ficam por cima (RF019-TL010, RF019-TL012, RF019-RN018, RF019-CA024)

#### Scenario: Planta no livro e no PDF
- **GIVEN** o mapa de **Cidade** tem conteúdo
- **WHEN** ele é exibido no livro ou exportado no PDF do Mundo
- **THEN** a mesma planta aparece na paleta de leitura ou de impressão (RF019-RN018, RF019-CA024)

### Requirement: Tipos de localidade por escala
**Mundo** SHALL aceitar os tipos macro/geográficos e assentamentos do RF019-RN019; **Região** SHALL aceitar os 49 tipos, exceto **Cômodo**, **Quarto**, **Sala** e **Salão**; **Cidade**, **Bairro** e **Prédio/Casa** SHALL aceitar apenas as suas listas do RF019-RN019; todas as escalas SHALL filtrar o painel e o **Nova localidade**, `salvar_mapa` SHALL recusar com erro de domínio qualquer marcador fora da escala, inclusive **Não definido**, sem gravar o documento, e a localidade raiz do tipo **Mundo** SHALL ficar fora do painel de localidades dos mapas (RF019-TL011, RF019-RN002, RF019-RN019, RF019-CA025, RF019-CA029).

#### Scenario: Painel filtrado
- **GIVEN** um mapa de **Cidade**
- **WHEN** o escritor abre o painel de localidades
- **THEN** vê apenas os tipos urbanos; **Floresta** e **Porto** (tipo Cidade) não aparecem (RF019-TL011, RF019-RN019, RF019-CA025)

#### Scenario: Salvar com tipo fora da escala
- **GIVEN** o mapa de **Cidade** tem uma **Floresta** posicionada
- **WHEN** o escritor clica em **Salvar**
- **THEN** o domínio recusa, informa o marcador e nada é gravado (RF019-RN019, RF019-CA025)

#### Scenario: Prédio/Casa
- **GIVEN** um mapa de **Prédio/Casa**
- **WHEN** o escritor abre o painel
- **THEN** vê apenas **Cômodo**, **Quarto**, **Sala** e **Salão** (RF019-RN019, RF019-CA025)

#### Scenario: Mundo macro
- **GIVEN** um mapa de **Mundo**
- **WHEN** o escritor abre o painel ou tenta salvar uma **Casa** ou um **Bairro**
- **THEN** o tipo não aparece e o domínio recusa o marcador (RF019-RN019, RF019-CA025, RF019-CA029)

#### Scenario: Região sem cômodos
- **GIVEN** um mapa de **Região**
- **WHEN** o escritor abre o painel ou tenta salvar um **Quarto**
- **THEN** o cômodo não aparece e o domínio recusa o marcador; Casa, Praça e Bairro são aceitos (RF019-RN019, RF019-CA025, RF019-CA029)

#### Scenario: Raiz fora do mapa
- **GIVEN** o mundo tem a localidade raiz do tipo **Mundo**
- **WHEN** o escritor abre o painel de qualquer mapa
- **THEN** a raiz não aparece como localidade posicionável (RF019-TL011, RF019-CA029)

### Requirement: Cômodos e portas de Prédio/Casa
Em mapas de **Prédio/Casa**, o editor SHALL desenhar cada localidade como um cômodo retangular com o nome no centro, permitir mover o retângulo pelo corpo e redimensioná-lo pelas oito alças (cantos e lados), e SHALL oferecer a ferramenta **Porta** para colocar passagens nas paredes, com lado, posição e largura editáveis; o cômodo SHALL ter no mínimo 40 unidades e ficar inteiro dentro do plano, e a porta SHALL acompanhar o cômodo e ser removida com ele (RF019-TL012, RF019-FL011, RF019-RN020, RF019-RN021, RF019-CA026, RF019-CA027).

#### Scenario: Arrastar localidade cria cômodo
- **GIVEN** um mapa de **Prédio/Casa** aberto no editor
- **WHEN** o escritor arrasta uma localidade para o canvas
- **THEN** um quadrado de 120 × 120 é criado na posição solta, com o nome centralizado e o selo **No mapa** (RF019-TL012, RF019-FL011, RF019-RN020, RF019-CA026)

#### Scenario: Mover e redimensionar
- **GIVEN** o cômodo está selecionado
- **WHEN** o escritor arrasta o corpo e depois uma das oito alças
- **THEN** a posição e o tamanho mudam, o retângulo pode virar retângulo alongado e o histórico registra um passo por arraste (RF019-TL012, RF019-RN020, RF019-CA026)

#### Scenario: Colocar e editar porta
- **GIVEN** a ferramenta **Porta** está ativa
- **WHEN** o escritor clica numa parede do cômodo
- **THEN** a porta é criada naquele lado e o painel permite mudar **Lado**, **Largura**, arrastar a porta pela parede e apagar a porta (RF019-TL012, RF019-FL011, RF019-RN021, RF019-CA027)

#### Scenario: Porta acompanha o cômodo
- **GIVEN** um cômodo com porta
- **WHEN** o cômodo é movido, redimensionado ou removido do mapa
- **THEN** a porta acompanha a nova geometria ou sai junto com o cômodo, sem tocar no cadastro da localidade (RF019-RN021, RF019-CA027)

#### Scenario: Ferramentas legadas
- **GIVEN** um mapa de **Prédio/Casa** com um polígono ou uma ligação antiga
- **WHEN** o editor é aberto
- **THEN** **Polígono** e **Ligação** não aparecem na toolbar, mas o elemento antigo continua visível e apagável (RF019-RN023, RF019-CA027)

#### Scenario: Salvar e reabrir o prédio
- **GIVEN** o escritor criou cômodos e portas
- **WHEN** clica em **Salvar**, sai e reabre o mapa
- **THEN** posições, larguras, alturas e portas voltam iguais (RF019-RN020 a RF019-RN022, RF019-CA026, RF019-CA027)

### Requirement: Edição de formas do mapa
O editor SHALL permitir, com **Selecionar/Mover**, redimensionar uma forma desenhada arrastando uma das suas arestas — movendo apenas os dois vértices dessa aresta na direção perpendicular —, ajustar um único vértice arrastando o seu nó e mover a forma inteira arrastando o seu interior; a forma selecionada SHALL mostrar uma alça no meio de cada aresta e um nó em cada vértice, os pontos SHALL permanecer dentro do plano de 1000 × 700 e cada arraste SHALL gerar um único passo de desfazer/refazer, com a geometria gravada por **Salvar** (RF019-TL013, RF019-FL005, RF019-RN007, RF019-CA008).

#### Scenario: Redimensionar pela aresta
- **GIVEN** um mapa **Mundo** com um polígono de três vértices desenhado e selecionado
- **WHEN** o escritor arrasta a alça do meio de uma aresta
- **THEN** só os dois vértices dessa aresta se deslocam na perpendicular e o terceiro vértice continua parado (RF019-TL013, RF019-CA008)

#### Scenario: Mover um vértice pelo nó
- **GIVEN** a forma está selecionada
- **WHEN** o escritor arrasta o nó de um dos vértices
- **THEN** só aquele vértice se desloca, preso ao plano, e os demais continuam parados (RF019-TL013, RF019-CA008)

#### Scenario: Mover o polígono inteiro
- **GIVEN** a forma está selecionada
- **WHEN** o escritor arrasta o interior do polígono
- **THEN** todos os vértices se deslocam pelo mesmo delta, sem sair do plano, e a forma pode ser salva na nova posição (RF019-TL013, RF019-RN007, RF019-CA008)

#### Scenario: Limite do plano
- **GIVEN** a forma está encostada na borda do plano
- **WHEN** o escritor tenta arrastar a aresta ou o interior para fora
- **THEN** o deslocamento é limitado e nenhum vértice fica fora de 1000 × 700 (RF019-TL013, RF019-RN007)

#### Scenario: Histórico e persistência
- **GIVEN** o escritor redimensionou a forma sem salvar
- **WHEN** usa **Desfazer** e depois **Salvar** e reabre o mapa
- **THEN** o arraste inteiro volta em um passo de desfazer e, ao salvar, os vértices alterados são restaurados ao reabrir (RF019-TL013, RF019-FL005, RF019-CA008)

### Requirement: Exclusividade da localidade por mapa
O editor SHALL permitir que uma localidade seja associada a vários mapas somente quando todos forem **Mundo** ou **Região**; a localidade em **Cidade**, **Bairro** ou **Prédio/Casa** SHALL ficar exclusiva daquele mapa, não SHALL aparecer no painel de outro mapa incompatível e `salvar_mapa` SHALL recusar a nova associação com erro `LocalidadeEmOutroMapa`, sem gravar o documento; localidades que já estavam no mapa SHALL continuar editáveis (RF019-TL006, RF019-FL003, RF019-RN005, RF019-RN024, RF019-CA030).

#### Scenario: Prédio não compartilha cômodo
- **GIVEN** a Sala **Sala de Estar** já está num mapa de **Prédio/Casa**
- **WHEN** o escritor abre outro mapa de **Prédio/Casa**
- **THEN** a Sala não aparece no painel e o domínio recusa salvar o segundo mapa com ela (RF019-RN024, RF019-CA030)

#### Scenario: Mundo e Região compartilham
- **GIVEN** a Cidade **Porto** já está num mapa de **Região**
- **WHEN** o escritor abre um mapa de **Mundo**
- **THEN** Porto continua no painel e pode ser adicionada; o salvamento é aceito (RF019-RN024, RF019-CA030)

#### Scenario: Cidade não compartilha com Mundo
- **GIVEN** a Casa **Solar** já está num mapa de **Região**
- **WHEN** o escritor abre um mapa de **Cidade**
- **THEN** Solar não aparece no painel e o domínio recusa a associação (RF019-RN005, RF019-RN024, RF019-CA030)

#### Scenario: Mapa atual preservado
- **GIVEN** uma localidade já estava no mapa antes da regra
- **WHEN** o escritor move ou edita o mapa e salva
- **THEN** a associação existente continua e o salvamento não é bloqueado por duplicatas legadas (RF019-RN024)

