# book-library Specification

## Purpose
A tela **Meus Livros**: listagem real dos livros em grade ou lista, busca por
título, métricas da biblioteca, estado vazio e abertura/criação de livros
(RF010, RF011).
## Requirements
### Requirement: Tela inicial de Meus Livros
O sistema SHALL exibir, ao acessar **Meus Livros**, uma tela inicial com o título **Meus Livros**, o botão **+ Novo Livro**, quatro cartões de métricas, a seção **Todos os livros** com badge de resultados e alternância **Grade/Lista**, a listagem dos livros cadastrados e o painel **Personagens que atravessam livros** (RF010-TL001, RF010-TL003, RF010-TL004, RF011-TL005, RF011-CA002, RF011-CA005, RF011-CA016, RF011-CA017, RF011-CA018).

#### Scenario: Acessar Meus Livros
- **GIVEN** o aplicativo está aberto na casca principal
- **WHEN** o escritor clica em **Meus Livros** na sidebar
- **THEN** a tela inicial de Meus Livros é exibida (RF010-CA001)

#### Scenario: Cabeçalho e métricas
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor observa o topo da tela
- **THEN** vê o título **Meus Livros**, o subtítulo com os contadores da biblioteca, o botão **+ Novo Livro** e os quatro cartões de métricas (RF011-CA018)

#### Scenario: Listagem vazia
- **GIVEN** a tela Meus Livros está aberta e não há livros cadastrados
- **WHEN** o escritor observa a seção **Todos os livros**
- **THEN** vê o badge **0 resultados** e uma mensagem de estado vazio, sem cards de livros (RF010-CA007)

#### Scenario: Label Todos os livros
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor observa o título da seção de livros
- **THEN** o texto é **Todos os livros**, e não **Todos os projetos** (RF010-CA005)

#### Scenario: Painel de personagens vazio
- **GIVEN** a tela Meus Livros está aberta e não há vínculos entre personagens e livros
- **WHEN** o escritor rola até abaixo da listagem
- **THEN** vê o painel **Personagens que atravessam livros** com o link **Ver biblioteca completa**, mas sem linhas de personagens (RF010-CA009)

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

### Requirement: Listagem real de livros
O sistema SHALL listar os livros cadastrados na seção **Todos os livros**, em **Grade** (padrão) ou **Lista**, com busca por título e badge de resultados atualizado; cada item SHALL exibir título, gênero principal com subgêneros, faixa de público, idioma e as métricas zeradas do livro, sem dados fictícios (RF011-TL005, RF011-RN014, RF011-RN015, RF011-FL008, RF011-CA016, RF011-CA017, RF011-CA019).

#### Scenario: Livro salvo aparece na listagem
- **GIVEN** um livro foi criado pela página do livro
- **WHEN** o escritor retorna a Meus Livros
- **THEN** o livro aparece em **Grade** com o título e os dados gerais, e o badge de resultados é atualizado (RF011-CA005, RF011-CA016)

#### Scenario: Alternar Grade e Lista
- **GIVEN** existem livros cadastrados
- **WHEN** o escritor escolhe **Lista** ou volta para **Grade**
- **THEN** a visualização muda sem perder a busca aplicada (RF011-CA017)

#### Scenario: Buscar por título
- **GIVEN** existem livros cadastrados
- **WHEN** o escritor digita parte de um título em **Buscar livros…**
- **THEN** a listagem mostra apenas os livros cujo título corresponde (RF011-CA016)

#### Scenario: Sem dados fictícios
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor observa a listagem
- **THEN** não aparecem os livros, personagens, contadores ou imagens de demonstração do protótipo (RF011-CA019)

### Requirement: Métricas da biblioteca de livros
O sistema SHALL calcular as métricas da tela Meus Livros a partir do que está **associado aos livros**: **Livros na biblioteca** conta os livros cadastrados, **Personagens** conta somente personagens com vínculo em pelo menos um livro, **Personagens · N em 2+ livros** conta somente personagens com vínculo em dois ou mais livros, **Capítulos planejados** conta somente capítulos dos livros e **Entradas de worldbuilding** conta somente entradas dos mundos associados a livros; sem vínculo personagem–livro e sem associação livro–mundo, **Personagens**, **0 em 2+ livros** e **Entradas de worldbuilding** exibem **0** (RF011-CA018, RF014-RN011, RF014-CA014).

#### Scenario: Métricas sem vínculos com livros
- **GIVEN** existem personagens globais e entradas de mundo cadastrados, mas nenhum vínculo personagem–livro e nenhuma associação livro–mundo
- **WHEN** o escritor abre Meus Livros
- **THEN** **Livros na biblioteca** reflete os livros, e **Personagens**, **0 em 2+ livros**, **Capítulos planejados** e **Entradas de worldbuilding** exibem **0** (RF011-CA018)

#### Scenario: Métricas com livros e sem entidades associadas
- **GIVEN** existem livros cadastrados
- **WHEN** o escritor abre Meus Livros
- **THEN** **Livros na biblioteca** conta os livros e as demais métricas continuam **0** enquanto os vínculos não existirem (RF011-CA018)

#### Scenario: Métricas sem livros
- **GIVEN** não há livros cadastrados
- **WHEN** o escritor abre Meus Livros
- **THEN** as quatro métricas exibem **0** e a listagem mostra o estado vazio (RF010-CA004, RF011-CA018)

#### Scenario: Métricas contam os vínculos reais
- **GIVEN** existem personagens associados a livros, inclusive um personagem presente em dois livros, e existem personagens globais sem vínculo
- **WHEN** o escritor abre Meus Livros
- **THEN** **Personagens** conta somente os personagens com ao menos um vínculo, **Personagens · N em 2+ livros** conta somente o personagem presente em dois ou mais livros e os personagens sem vínculo não entram em nenhuma das duas métricas (RF014-RN011, RF014-CA014)

#### Scenario: Métricas após associar personagens
- **GIVEN** o escritor acabou de associar personagens ao livro na seção **Personagens**
- **WHEN** volta para Meus Livros
- **THEN** as métricas **Personagens** e **Personagens · N em 2+ livros** refletem os vínculos criados (RF014-FL001, RF014-CA014)

