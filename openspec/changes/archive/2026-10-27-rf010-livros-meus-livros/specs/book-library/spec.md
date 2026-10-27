## ADDED Requirements

### Requirement: Tela inicial de Meus Livros
O sistema SHALL exibir, ao acessar **Meus Livros**, uma tela inicial com o
título **Meus Livros**, subtítulo do protótipo, quatro cartões de métricas, seção
**Todos os livros**, badge de resultados, controle **Grade**, grade de cards de
livros, card tracejado **Novo livro** e painel **Personagens que atravessam
livros** (RF010-TL001, RF010-TL003, RF010-TL005, RF010-CA001, RF010-CA002,
RF010-CA004, RF010-CA009).

#### Scenario: Acessar Meus Livros
- **GIVEN** o aplicativo está aberto na casca principal
- **WHEN** o escritor clica em **Meus Livros** na sidebar
- **THEN** a tela inicial de Meus Livros é exibida (RF010-CA001)

#### Scenario: Cabeçalho e métricas
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor observa o topo da tela
- **THEN** vê o título **Meus Livros**, o subtítulo do protótipo e os quatro
  cartões de métricas do protótipo (RF010-CA002, RF010-CA004)

#### Scenario: Grade de livros
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor observa a seção de livros
- **THEN** vê os quatro cards de demonstração com capa, título, subtítulo,
  badges, estatísticas, progresso e indicador visual (RF010-CA007)

#### Scenario: Badge de resultados e controle Grade
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor observa o cabeçalho da seção de livros
- **THEN** vê o badge de resultados e o controle **Grade** (RF010-CA006)

#### Scenario: Painel de personagens compartilhados
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor rola até abaixo da grade
- **THEN** vê o painel **Personagens que atravessam livros** com os dados
  visuais do protótipo e o link **Ver biblioteca completa** (RF010-CA009)

#### Scenario: Label Todos os livros
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor observa o título da seção de livros
- **THEN** o texto é **Todos os livros**, e não **Todos os projetos**
  (RF010-CA005)

#### Scenario: Card Novo livro
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor observa o final da grade
- **THEN** vê o card tracejado **Novo livro**, sem menção a importação `.pdc`
  (RF010-CA008)

### Requirement: Ação de novo livro sem cadastro
O sistema SHALL exibir **apenas** o botão **+ Novo Livro** como ação principal no
cabeçalho, SHALL NOT exibir o botão **Importar .pdc** e SHALL NOT abrir cadastro,
criar livro ou navegar para tela inexistente ao acionar o botão ou o card
**Novo livro** (RF010-TL002, RF010-TL004, RF010-RN003, RF010-RN004,
RF010-CA003, RF010-CA010).

#### Scenario: Sem Importar .pdc
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor procura ações de importação
- **THEN** o botão **Importar .pdc** não existe em nenhum ponto da tela
  (RF010-CA003)

#### Scenario: Botão + Novo Livro sem cadastro
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor clica em **+ Novo Livro**
- **THEN** nenhum cadastro é aberto, nenhum livro é criado e nenhuma tela
  inexistente é carregada (RF010-CA010)

#### Scenario: Card Novo livro sem cadastro
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor clica no card **Novo livro**
- **THEN** o comportamento é o mesmo do botão **+ Novo Livro**: nada é criado e
  não há navegação para cadastro (RF010-CA010)

#### Scenario: Cards de livros sem detalhe
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor clica em um card de livro
- **THEN** nenhuma tela de detalhe, cadastro ou página vazia é aberta
  (RF010-CA011)

### Requirement: Escopo sem persistência de livros
O sistema SHALL NOT criar, neste requisito, tabela, migração, comando Tauri,
entidade de domínio ou persistência de livros; os dados exibidos SHALL ser de
demonstração no front-end (RF010-RN001, RF010-RN002, RF010-CA012).

#### Scenario: Sem banco de livros
- **GIVEN** o app foi compilado com este requisito
- **WHEN** o escritor ou o desenvolvedor inspeciona o banco e os comandos Tauri
- **THEN** não existe migração, tabela ou comando de persistência de livros
  (RF010-CA012)

#### Scenario: Dados de demonstração
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor observa os livros e os contadores
- **THEN** os dados são de demonstração e não dependem de uma entidade Livro no
  banco (RF010-RN002)

### Requirement: Fidelidade visual e não regressão
A tela SHALL manter os elementos visuais e a disposição do protótipo,
ressalvadas as exclusões deste requisito, e SHALL NOT causar regressão na casca,
nos temas, no splash, em Personagens ou em Worldbuilding (RF010-RN006,
RF010-RN009, RF010-CA013, RF010-CA014).

#### Scenario: Fidelidade visual
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor compara a tela com o protótipo
- **THEN** a disposição de cabeçalho, métricas, seção, cards e painel é mantida,
  com a remoção do botão de importação e a alteração da label da seção
  (RF010-CA014)

#### Scenario: Sem regressão
- **GIVEN** a tela Meus Livros está implementada
- **WHEN** o escritor navega para Personagens, Worldbuilding e Temas
- **THEN** essas telas, os temas e o splash continuam funcionando (RF010-CA013)
