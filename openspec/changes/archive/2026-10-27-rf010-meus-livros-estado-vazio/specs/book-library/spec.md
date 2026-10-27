## MODIFIED Requirements

### Requirement: Tela inicial de Meus Livros
O sistema SHALL exibir, ao acessar **Meus Livros**, uma tela inicial com o título **Meus Livros**, subtítulo com contadores zerados, quatro cartões de métricas com valor **0**, seção **Todos os livros** com badge **0 resultados** e controle **Grade**, estado vazio da listagem e o painel **Personagens que atravessam livros** sem linhas de personagens (RF010-TL001, RF010-TL003, RF010-TL004, RF010-CA001, RF010-CA002, RF010-CA004, RF010-CA005, RF010-CA006, RF010-CA007, RF010-CA009).

#### Scenario: Acessar Meus Livros
- **GIVEN** o aplicativo está aberto na casca principal
- **WHEN** o escritor clica em **Meus Livros** na sidebar
- **THEN** a tela inicial de Meus Livros é exibida (RF010-CA001)

#### Scenario: Cabeçalho e métricas zeradas
- **GIVEN** a tela Meus Livros está aberta e não há livros cadastrados
- **WHEN** o escritor observa o topo da tela
- **THEN** vê o título **Meus Livros**, o subtítulo com contadores zerados, o botão **+ Novo Livro** e os quatro cartões de métricas com valor **0** (RF010-CA002, RF010-CA004)

#### Scenario: Listagem vazia
- **GIVEN** a tela Meus Livros está aberta e não há livros cadastrados
- **WHEN** o escritor observa a seção **Todos os livros**
- **THEN** vê o badge **0 resultados**, o controle **Grade** e uma mensagem de estado vazio, sem cards de livros nem card **Novo livro** (RF010-CA007)

#### Scenario: Label Todos os livros
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor observa o título da seção de livros
- **THEN** o texto é **Todos os livros**, e não **Todos os projetos** (RF010-CA005)

#### Scenario: Painel de personagens vazio
- **GIVEN** a tela Meus Livros está aberta e não há personagens compartilhados
- **WHEN** o escritor rola até abaixo da listagem
- **THEN** vê o painel **Personagens que atravessam livros** com o link **Ver biblioteca completa**, mas sem linhas de personagens (RF010-CA009)

### Requirement: Ação de novo livro sem cadastro
O sistema SHALL exibir **apenas** o botão **+ Novo Livro** como ação principal no cabeçalho, SHALL NOT exibir o botão **Importar .pdc** e SHALL NOT abrir cadastro, criar livro ou navegar para tela inexistente ao acioná-lo; a listagem vazia SHALL NOT ter card tracejado **Novo livro** (RF010-TL002, RF010-RN004, RF010-RN005, RF010-CA003, RF010-CA010).

#### Scenario: Sem Importar .pdc
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor procura ações de importação
- **THEN** o botão **Importar .pdc** não existe em nenhum ponto da tela (RF010-CA003)

#### Scenario: Botão + Novo Livro sem cadastro
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor clica em **+ Novo Livro**
- **THEN** nenhum cadastro é aberto, nenhum livro é criado e nenhuma tela inexistente é carregada (RF010-CA010)

#### Scenario: Sem card Novo livro na listagem vazia
- **GIVEN** a tela Meus Livros está aberta e não há livros
- **WHEN** o escritor observa a listagem
- **THEN** não existe card tracejado **Novo livro** (RF010-RN005)

#### Scenario: Sem detalhe de livro
- **GIVEN** a tela Meus Livros está aberta e não há livros
- **WHEN** o escritor observa a listagem
- **THEN** não existem cards de livros nem navegação para detalhe/cadastro (RF010-CA011)

### Requirement: Escopo sem persistência de livros
O sistema SHALL NOT criar, neste requisito, tabela, migração, comando Tauri, entidade de domínio ou persistência de livros; a tela SHALL representar o estado inicial vazio e SHALL NOT exibir dados fictícios, livros, personagens, contadores ou imagens de demonstração do protótipo (RF010-RN001, RF010-RN002, RF010-RN003, RF010-RN007, RF010-CA008, RF010-CA012).

#### Scenario: Sem banco de livros
- **GIVEN** o app foi compilado com este requisito
- **WHEN** o desenvolvedor inspeciona o banco e os comandos Tauri
- **THEN** não existe migração, tabela ou comando de persistência de livros (RF010-CA012)

#### Scenario: Sem dados fictícios
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor observa a tela
- **THEN** não aparecem os livros, personagens, contadores ou imagens de demonstração do protótipo; tudo está zerado ou vazio (RF010-CA008)

### Requirement: Fidelidade visual e não regressão
A tela SHALL manter os elementos visuais e a disposição do protótipo que fazem sentido no estado vazio, ressalvadas as exclusões deste requisito, e SHALL NOT causar regressão na casca, nos temas, no splash, em Personagens ou em Worldbuilding (RF010-RN009, RF010-CA013, RF010-CA014).

#### Scenario: Fidelidade visual no estado vazio
- **GIVEN** a tela Meus Livros está aberta sem livros
- **WHEN** o escritor compara a tela com o protótipo
- **THEN** a disposição de cabeçalho, métricas, seção e painel é mantida, com métricas zeradas, listagem vazia, remoção do botão de importação, remoção dos cards e alteração da label da seção (RF010-CA014)

#### Scenario: Sem regressão
- **GIVEN** a tela Meus Livros está implementada
- **WHEN** o escritor navega para Personagens, Worldbuilding e Temas
- **THEN** essas telas, os temas e o splash continuam funcionando (RF010-CA013)
