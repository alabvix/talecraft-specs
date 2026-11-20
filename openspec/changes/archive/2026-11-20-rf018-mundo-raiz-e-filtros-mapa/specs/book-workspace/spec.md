## MODIFIED Requirements

### Requirement: Localidades em árvore na seção Worldbuilding do livro
A categoria **Localidades** da seção **Worldbuilding** do livro SHALL exibir a mesma **árvore** do RF018, com a raiz do mundo fixa no topo e sem ação **Editar**, em modo de consulta, com **Nova Localidade** gravando no mundo da aba ativa e a árvore recarregando depois de salvar; a paginação SHALL manter a raiz fixa e paginar os filhos de 20 em 20, e as demais categorias SHALL continuar na tabela paginada (RF018-TL005, RF018-CA013, RF018-CA019, RF018-CA020).

#### Scenario: Árvore em consulta no livro
- **GIVEN** o mundo da aba tem a Cidade **Porto** com o Bairro **Centro**
- **WHEN** o escritor abre **Worldbuilding** no livro e a categoria **Localidades**
- **THEN** vê a raiz do mundo no topo, a árvore com os dois níveis abaixo e nenhuma ação **Editar** (RF018-TL005, RF018-CA013, RF018-CA020)

#### Scenario: Criar localidade pelo livro
- **GIVEN** a categoria **Localidades** está aberta na aba do mundo
- **WHEN** o escritor clica em **Nova Localidade**, preenche e salva
- **THEN** a localidade é gravada no mundo, aparece na árvore e o pai padrão é a raiz (RF018-TL005, RF018-FL001, RF018-CA013, RF018-CA020)

### Requirement: Caminho da localidade no cenário do capítulo
O campo **Cenário Worldbuilding** do capítulo SHALL exibir cada localidade pelo **caminho completo** dentro da hierarquia, começando pelo mundo (por exemplo, `Kepler › Porto › Centro › Solar`), mantendo o agrupamento por mundo, ocultando a raiz como opção isolada e gravando o identificador da localidade (RF018-TL004, RF018-FL006, RF018-CA012, RF018-CA020).

#### Scenario: Caminho na opção do cenário
- **GIVEN** o livro tem um mundo associado com a Casa **Solar** dentro do Bairro **Centro** dentro da Cidade **Porto**
- **WHEN** o escritor abre a aba **Dados do Capítulo**
- **THEN** a opção mostra **Kepler › Porto › Centro › Solar** e, ao salvar, o capítulo guarda essa localidade (RF018-TL004, RF018-CA012, RF018-CA020)

#### Scenario: Reabrir o capítulo
- **GIVEN** o capítulo foi salvo com uma localidade aninhada
- **WHEN** o escritor reabre o capítulo
- **THEN** o campo mostra o mesmo caminho selecionado (RF018-FL006, RF018-CA012)
