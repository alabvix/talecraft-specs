## MODIFIED Requirements

### Requirement: Listagem real de livros
O sistema SHALL listar os livros cadastrados na seção **Todos os livros**, em **Grade** (padrão) ou **Lista**, com busca por título e badge de resultados atualizado; cada item SHALL exibir título, gênero principal com subgêneros, faixa de público, idioma, os **mundos associados** — o Nome quando houver um, os nomes quando houver vários e **Sem mundo** quando não houver — e as métricas do livro, sem dados fictícios (RF011-TL005, RF011-RN014, RF011-RN015, RF011-FL008, RF011-CA016, RF011-CA017, RF011-CA019, RF017-TL007, RF017-CA015).

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

#### Scenario: Mundos associados no card
- **GIVEN** um livro tem os mundos **Kepler** e **Ravória** associados e outro livro não tem mundo
- **WHEN** o escritor abre Meus Livros
- **THEN** o primeiro mostra os nomes dos dois mundos e o segundo mostra **Sem mundo** (RF017-TL007, RF017-CA015)

#### Scenario: Sem dados fictícios
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor observa a listagem
- **THEN** não aparecem os livros, personagens, contadores ou imagens de demonstração do protótipo (RF011-CA019)

### Requirement: Métricas da biblioteca de livros
O sistema SHALL calcular as métricas da tela Meus Livros a partir do que está **associado aos livros**: **Livros na biblioteca** conta os livros cadastrados, **Personagens** conta somente personagens com vínculo em pelo menos um livro, **Personagens · N em 2+ livros** conta somente personagens com vínculo em dois ou mais livros, **Capítulos planejados** conta somente capítulos dos livros e **Entradas de worldbuilding** conta somente entradas das seis categorias dos mundos associados a livros, somando todos os mundos de cada livro; sem vínculo personagem–livro e sem associação livro–mundo, **Personagens**, **0 em 2+ livros** e **Entradas de worldbuilding** exibem **0** (RF011-CA018, RF014-RN011, RF014-CA014, RF017-RN010, RF017-CA015).

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

#### Scenario: Entradas de worldbuilding reais
- **GIVEN** dois livros estão associados a mundos com entradas e um terceiro livro não tem mundo, e existem entradas em mundos sem livro
- **WHEN** o escritor abre Meus Livros
- **THEN** **Entradas de worldbuilding** conta as entradas dos mundos associados aos livros, incluindo as dos dois mundos de um mesmo livro, e ignora os mundos sem livro (RF017-RN010, RF017-CA015)
