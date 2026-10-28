## MODIFIED Requirements

### Requirement: Lista de personagens com busca e visualização
A tela principal de Personagens SHALL listar os personagens cadastrados, permitindo **alternar entre a exibição em cards e em lista**, **buscar pelo nome** pela barra de busca, **iniciar a inclusão de um novo personagem** e SHALL exibir no rodapé de cada card a **quantidade de livros** aos quais o personagem está vinculado — **0 livros** quando não houver — em vez de um valor fixo (RF004-TL001, RF004-CA004, RF004-CA005, RF004-CA006, RF014-TL007, RF014-RN015, RF014-CA018).

#### Scenario: Alternar entre cards e lista
- **GIVEN** a tela principal de Personagens está aberta com personagens cadastrados
- **WHEN** o escritor alterna o modo de exibição
- **THEN** os personagens são apresentados em cards ou em lista, conforme a escolha (RF004-CA004)

#### Scenario: Buscar personagem pelo nome
- **GIVEN** existem personagens cadastrados com nomes distintos
- **WHEN** o escritor digita parte de um nome na barra de busca
- **THEN** a lista exibe somente os personagens cujo nome corresponde ao texto, ignorando diferenças entre maiúsculas e minúsculas (RF004-CA006)

#### Scenario: Iniciar a inclusão de um personagem
- **GIVEN** a tela principal de Personagens está aberta
- **WHEN** o escritor aciona a opção de novo personagem
- **THEN** a tela de detalhe é aberta vazia, pronta para o cadastro (RF004-CA005)

#### Scenario: Quantidade de livros no card
- **GIVEN** um personagem está vinculado a dois livros e outro não tem vínculo
- **WHEN** o escritor abre a tela principal de Personagens em cards
- **THEN** o rodapé do card do primeiro mostra **2 livros** e o do segundo mostra **0 livros**, refletindo os vínculos reais (RF014-TL007, RF014-RN015, RF014-CA018)

### Requirement: Vínculos e arco por livro na ficha global
A tela de detalhe SHALL exibir, no painel retrátil **Vínculos com Livros**, os livros aos quais o personagem está associado, com as colunas **Livro**, **Papel** e **Total de Capítulos em que aparece** — **0** e marcado como **pendente** enquanto o cadastro de Capítulos não existir — com o **nome do livro** como **link** para a página daquele livro, e SHALL listar no quadro **Curva de arco em cada livro** o nome de cada livro vinculado com a indicação **sem dados por enquanto**; sem vínculos, o painel SHALL abrir **retraído** e as duas áreas SHALL ficar vazias (RF004-CA009, RF006-RN001 a RF006-RN003, RF014-TL007, RF014-RN010, RF014-RN015, RF014-CA018). O campo **Filtrar por livro** da tela principal SHALL continuar sem opções, pois a lista de livros nesse filtro pertence a requisito posterior (RF004-CA010).

#### Scenario: Painel com vínculos
- **GIVEN** um personagem está associado a dois livros, com papéis diferentes
- **WHEN** o escritor abre a tela de detalhe desse personagem
- **THEN** o painel **Vínculos com Livros** aparece expandido, com uma linha por livro contendo **Livro**, **Papel** (ou **Papel não definido**) e **Total de Capítulos em que aparece** igual a **0 · pendente** (RF014-TL007, RF014-RN015, RF014-CA018)

#### Scenario: Nome do livro abre a página do livro
- **GIVEN** a ficha do personagem está aberta com um livro vinculado
- **WHEN** o escritor clica no nome do livro no painel **Vínculos com Livros**
- **THEN** a página daquele livro é aberta, com os dados e as seções do livro, sem erro (RF014-TL007, RF014-CA018)

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
