## MODIFIED Requirements

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

## ADDED Requirements

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
O sistema SHALL calcular as métricas da tela Meus Livros a partir do banco: **Livros na biblioteca** conta os livros cadastrados, **Personagens** reflete a biblioteca global de personagens, **Personagens · N em 2+ livros** permanece **0** enquanto não houver vínculo personagem–livro, **Capítulos planejados** permanece **0** enquanto não houver capítulos e **Entradas de worldbuilding** conta as entradas dos mundos cadastrados (RF011-CA018).

#### Scenario: Métricas com livros
- **GIVEN** existem livros, personagens e entradas de mundo cadastrados
- **WHEN** o escritor abre Meus Livros
- **THEN** **Livros na biblioteca**, **Personagens** e **Entradas de worldbuilding** refletem as contagens do banco, e **0 em 2+ livros** e **Capítulos planejados** continuam **0** (RF011-CA018)

#### Scenario: Métricas sem livros
- **GIVEN** não há livros cadastrados
- **WHEN** o escritor abre Meus Livros
- **THEN** as quatro métricas exibem **0** e a listagem mostra o estado vazio (RF010-CA004, RF011-CA018)

## REMOVED Requirements

### Requirement: Ação de novo livro sem cadastro
**Reason**: O RF011 transforma **+ Novo Livro** na entrada do domínio do livro; o clique passa a abrir a página do livro em modo de criação.
**Migration**: Use a página do livro descrita em `book-workspace`; o cadastro é gravado ao salvar o título na aba **Dados Gerais**.

### Requirement: Escopo sem persistência de livros
**Reason**: O RF011 cria a entidade Livro, a migração v7 e os comandos Tauri de livros, que o RF010 deixava explicitamente fora do escopo.
**Migration**: O esquema e os comandos passam a ser cobertos por `database-foundation` e `rust-bridge`; a tela Meus Livros passa a ler os livros reais.
