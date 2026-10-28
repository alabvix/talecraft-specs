## REMOVED Requirements

### Requirement: Vínculos e arco por livro fora do escopo
**Reason**: O RF014 passou a gravar o vínculo livro–personagem; a ficha global agora lê esses vínculos em vez de exibir as duas áreas sempre vazias.
**Migration**: O comportamento novo está no requisito **Vínculos e arco por livro na ficha global**, abaixo; o `Filtrar por livro` da tela principal continua sem opções.

## ADDED Requirements

### Requirement: Vínculos e arco por livro na ficha global
A tela de detalhe SHALL exibir, no painel retrátil **Vínculos com Livros**, os livros aos quais o personagem está associado, com as colunas **Livro**, **Papel** e **Total de Capítulos em que aparece** — **0** e marcado como **pendente** enquanto o cadastro de Capítulos não existir — e SHALL listar no quadro **Curva de arco em cada livro** o nome de cada livro vinculado com a indicação **sem dados por enquanto**; sem vínculos, o painel SHALL abrir **retraído** e as duas áreas SHALL ficar vazias (RF004-CA009, RF006-RN001 a RF006-RN003, RF014-TL007, RF014-RN010, RF014-RN015, RF014-CA018). O campo **Filtrar por livro** da tela principal SHALL continuar sem opções, pois a lista de livros nesse filtro pertence a requisito posterior (RF004-CA010).

#### Scenario: Painel com vínculos
- **GIVEN** um personagem está associado a dois livros, com papéis diferentes
- **WHEN** o escritor abre a tela de detalhe desse personagem
- **THEN** o painel **Vínculos com Livros** aparece expandido, com uma linha por livro contendo **Livro**, **Papel** (ou **Papel não definido**) e **Total de Capítulos em que aparece** igual a **0 · pendente** (RF014-TL007, RF014-RN015, RF014-CA018)

#### Scenario: Curva de arco com vínculos
- **GIVEN** o personagem está associado a um ou mais livros
- **WHEN** o escritor observa o quadro **Curva de arco em cada livro**
- **THEN** vê o nome de cada livro vinculado com **sem dados por enquanto**, sem gráfico e sem erro (RF014-TL007, RF014-RN015, RF014-CA018)

#### Scenario: Sem vínculos, painel retraído e áreas vazias
- **GIVEN** um personagem não tem nenhum vínculo com livro
- **WHEN** a tela de detalhe é aberta
- **THEN** o painel **Vínculos com Livros** aparece retraído, mostrando apenas o cabeçalho, e a **Curva de arco em cada livro** mostra o estado vazio (RF006-RN002, RF006-CA002, RF014-CA018)

#### Scenario: Com vínculos, o painel abre expandido
- **GIVEN** um personagem tem ao menos um vínculo com livro
- **WHEN** a tela de detalhe é aberta
- **THEN** o painel **Vínculos com Livros** aparece expandido (RF006-RN003, RF006-CA003)

#### Scenario: Alternar o painel pelo ícone
- **GIVEN** o painel **Vínculos com Livros** está retraído
- **WHEN** o escritor aciona o ícone do cabeçalho, por clique ou por teclado
- **THEN** o painel expande, sem recarregar a tela nem perder dados do formulário, e o ícone informa por rótulo acessível o estado atual (RF006-RN001, RF006-CA001, RF006-CA004, RF006-CA005)

#### Scenario: Filtro por livro sem opções
- **GIVEN** a tela principal de Personagens está aberta
- **WHEN** o escritor abre o campo **Filtrar por livro**
- **THEN** não há nenhum livro disponível para seleção (RF004-CA010)
