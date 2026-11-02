## MODIFIED Requirements

### Requirement: Vínculos e arco por livro na ficha global
A tela de detalhe SHALL exibir, no painel retrátil **Vínculos com Livros**, os livros aos quais o personagem está associado, com as colunas **Livro**, **Papel** e **Total de Capítulos em que aparece** — a contagem real dos capítulos do livro em que o personagem atua, zero quando não houver — com o **nome do livro** como **link** para a página daquele livro, e SHALL exibir no quadro **Curva de arco em cada livro** uma caixa de seleção com os livros vinculados, começando no primeiro livro, que ao ser trocada SHALL desenhar o gráfico **Evolução de Personagem** daquele livro, filtrando o arco pelo personagem da ficha; sem aparições ou eventos, o quadro SHALL mostrar **Ainda não existem dados**; sem vínculos, o painel SHALL abrir **retraído** e as duas áreas SHALL ficar vazias (RF004-CA009, RF006-RN001 a RF006-RN003, RF014-TL007, RF014-RN010, RF014-RN015, RF014-RN016, RF014-CA018, RF014-CA019, RF015-RN009, RF015-CA013, RF016-TL003, RF016-RN004, RF016-CA005). O campo **Filtrar por livro** da tela principal SHALL continuar sem opções, pois a lista de livros nesse filtro pertence a requisito posterior (RF004-CA010).

#### Scenario: Painel com vínculos
- **GIVEN** um personagem está associado a dois livros, com papéis diferentes
- **WHEN** o escritor abre a tela de detalhe desse personagem
- **THEN** o painel **Vínculos com Livros** aparece expandido, com uma linha por livro contendo **Livro**, **Papel** (ou **Papel não definido**) e **Total de Capítulos em que aparece** com a contagem real (RF014-TL007, RF014-RN015, RF015-RN009, RF014-CA018)

#### Scenario: Nome do livro abre a página do livro
- **GIVEN** a ficha do personagem está aberta com um livro vinculado
- **WHEN** o escritor clica no nome do livro no painel **Vínculos com Livros**
- **THEN** a página daquele livro é aberta, com os dados e as seções do livro, sem erro (RF014-TL007, RF014-CA018)

#### Scenario: Seletor de livro na curva de arco
- **GIVEN** o personagem está associado a dois ou mais livros
- **WHEN** o escritor observa o quadro **Curva de arco em cada livro**
- **THEN** vê uma caixa de seleção com os nomes dos livros vinculados e o primeiro livro selecionado (RF014-TL007, RF014-RN016, RF014-CA019)

#### Scenario: Curva do livro selecionado
- **GIVEN** o personagem tem aparições com eventos em um dos livros vinculados
- **WHEN** o escritor seleciona esse livro na caixa de seleção
- **THEN** o quadro desenha o gráfico **Evolução de Personagem** daquele livro, com a linha interrompida nos capítulos em que o personagem não aparece e os marcadores do RF016 (RF014-RN016, RF014-CA019, RF016-RN004, RF016-CA005)

#### Scenario: Livro sem dados para a curva
- **GIVEN** o livro selecionado não tem capítulos com o personagem ou não tem eventos
- **WHEN** o escritor seleciona o livro
- **THEN** o quadro mostra **Ainda não existem dados** e orienta a adicionar o personagem aos capítulos com Evento e Tipo de Evento, sem gráfico quebrado (RF014-RN016, RF014-CA019)

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
