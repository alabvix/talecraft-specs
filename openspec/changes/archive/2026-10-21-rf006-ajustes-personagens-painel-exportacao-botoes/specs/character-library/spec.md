## MODIFIED Requirements

### Requirement: Tela de detalhe do personagem
A tela de detalhe SHALL exibir e permitir **editar os dados do personagem**,
oferecendo Salvar as alterações, e SHALL ser a mesma tela usada para um
personagem recém-criado. A tela SHALL exibir o quadro **Família** **abaixo** do
quadro de Relações Globais, com a árvore familiar (RF004-TL002, RF004-CA008,
RF005-TL002, RF005-CA008). A tela SHALL oferecer o botão **Exportar Ficha** ao
lado do botão Salvar (RF006-TL001, RF006-CA006). Os botões **Salvar** e **Novo
personagem** SHALL ter rótulo **branco**, legível sobre o fundo de acento nos
três temas, inclusive no Tundra (RF006-RN004, RF006-CA016).

#### Scenario: Abrir o detalhe pelo card ou pelo nome
- **GIVEN** a tela principal de Personagens está exibindo personagens
- **WHEN** o escritor clica em um card, ou no nome do personagem na exibição em
  lista
- **THEN** a tela de detalhe do personagem selecionado é aberta (RF004-CA007)

#### Scenario: Editar e salvar o personagem
- **GIVEN** a tela de detalhe de um personagem existente está aberta
- **WHEN** o escritor altera um campo e aciona Salvar
- **THEN** a alteração é gravada e permanece após fechar e reabrir a aplicação
  (RF004-CA008, RF004-CA019)

#### Scenario: Quadro Família aparece abaixo das Relações Globais
- **GIVEN** a tela de detalhe de um personagem está aberta
- **WHEN** o escritor observa a coluna dos quadros
- **THEN** o quadro Família aparece logo abaixo do quadro de Relações Globais
  (RF005-TL002, RF005-CA008)

#### Scenario: Botão Exportar Ficha ao lado de Salvar
- **GIVEN** a tela de detalhe de um personagem está aberta
- **WHEN** o escritor observa os botões do cabeçalho
- **THEN** o botão Exportar Ficha aparece ao lado do botão Salvar (RF006-CA006)

#### Scenario: Rótulo branco dos botões nos três temas
- **GIVEN** o escritor está na tela de Personagens ou na tela de detalhe
- **WHEN** ele percorre os três temas (Blade Byte, Old Tower e Tundra)
- **THEN** os rótulos dos botões Salvar e Novo personagem permanecem brancos e
  legíveis sobre o fundo de acento em todos eles (RF006-RN004, RF006-CA016)

### Requirement: Vínculos e arco por livro fora do escopo
A tela de detalhe SHALL exibir o card de **Vínculos com Livros** e a seção de
**Curva de Arco em cada livro** **sem dados**, e a tela principal SHALL exibir o
campo **Filtrar por livro** **sem nenhuma opção de livro**, pois a associação
entre personagem e livro pertence a requisito posterior (RF004-CA009,
RF004-CA010, RF004-CA022). O card de Vínculos com Livros SHALL ser **retrátil**,
por um ícone no seu cabeçalho: sem nenhum vínculo ele SHALL abrir **retraído**,
mostrando apenas o cabeçalho, e com ao menos um vínculo ele SHALL abrir
**expandido** (RF006-TL001, RF006-FL001, RF006-RN001, RF006-RN002, RF006-RN003).

#### Scenario: Vínculos e curva aparecem vazios
- **GIVEN** a tela de detalhe de um personagem está aberta
- **WHEN** o escritor observa o card de Vínculos com Livros e a seção de Curva
  de Arco
- **THEN** ambos são exibidos sem dados, conforme o protótipo, sem erro
  (RF004-CA009)

#### Scenario: Filtro por livro sem opções
- **GIVEN** a tela principal de Personagens está aberta
- **WHEN** o escritor abre o campo Filtrar por livro
- **THEN** não há nenhum livro disponível para seleção (RF004-CA010)

#### Scenario: Sem vínculos, o painel abre retraído
- **GIVEN** um personagem não tem nenhum vínculo com livro
- **WHEN** a tela de detalhe é aberta
- **THEN** o painel Vínculos com livros aparece retraído, mostrando apenas o
  cabeçalho (RF006-RN002, RF006-CA002)

#### Scenario: Com vínculos, o painel abre expandido
- **GIVEN** um personagem tem ao menos um vínculo com livro
- **WHEN** a tela de detalhe é aberta
- **THEN** o painel Vínculos com livros aparece expandido (RF006-RN003,
  RF006-CA003)

#### Scenario: Alternar o painel pelo ícone
- **GIVEN** o painel Vínculos com livros está retraído
- **WHEN** o escritor aciona o ícone do cabeçalho, por clique ou por teclado
- **THEN** o painel expande, sem recarregar a tela nem perder dados do
  formulário, e o ícone informa por rótulo acessível o estado atual
  (RF006-RN001, RF006-CA001, RF006-CA004, RF006-CA005)
