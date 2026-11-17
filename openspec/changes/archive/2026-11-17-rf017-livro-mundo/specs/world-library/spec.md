## REMOVED Requirements

### Requirement: Painel Vínculos com livros retrátil e sem dados
**Reason**: O RF017 implementa a associação livro–mundo, então o painel deixa de ser vazio e passa a mostrar a contagem real com atalho para a aba **Livros**.

**Migration**: O comportamento retrátil é preservado no requisito **Painel Vínculos com livros com contagem e atalho**, que substitui este e mantém as mesmas regras de acessibilidade e de estado vazio.

## ADDED Requirements

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
