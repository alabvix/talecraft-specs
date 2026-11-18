## ADDED Requirements

### Requirement: Localidades em árvore na seção Worldbuilding do livro
A categoria **Localidades** da seção **Worldbuilding** do livro SHALL exibir a mesma **árvore** do RF018, em modo de consulta — sem ação **Editar** —, com **Nova Localidade** gravando no mundo da aba ativa e a árvore recarregando depois de salvar; as demais categorias SHALL continuar na tabela paginada (RF018-TL005, RF018-CA013).

#### Scenario: Árvore em consulta no livro
- **GIVEN** o mundo da aba tem a Cidade **Porto** com o Bairro **Centro**
- **WHEN** o escritor abre **Worldbuilding** no livro e a categoria **Localidades**
- **THEN** vê a árvore com os dois níveis e nenhuma ação **Editar** (RF018-TL005, RF018-CA013)

#### Scenario: Criar localidade pelo livro
- **GIVEN** a categoria **Localidades** está aberta na aba do mundo
- **WHEN** o escritor clica em **Nova Localidade**, preenche e salva
- **THEN** a localidade é gravada no mundo, aparece na árvore e também no nível raiz (RF018-TL005, RF018-FL001, RF018-CA013)

### Requirement: Caminho da localidade no cenário do capítulo
O campo **Cenário Worldbuilding** do capítulo SHALL exibir cada localidade pelo **caminho completo** dentro da hierarquia (por exemplo, `Cidade › Bairro › Casa › Quarto`), mantendo o agrupamento por mundo e gravando o identificador da localidade (RF018-TL004, RF018-FL006, RF018-CA012).

#### Scenario: Caminho na opção do cenário
- **GIVEN** o livro tem um mundo associado com a Casa **Solar** dentro do Bairro **Centro** dentro da Cidade **Porto**
- **WHEN** o escritor abre a aba **Dados do Capítulo**
- **THEN** a opção mostra **Porto › Centro › Solar** e, ao salvar, o capítulo guarda essa localidade (RF018-TL004, RF018-CA012)

#### Scenario: Reabrir o capítulo
- **GIVEN** o capítulo foi salvo com uma localidade aninhada
- **WHEN** o escritor reabre o capítulo
- **THEN** o campo mostra o mesmo caminho selecionado (RF018-FL006, RF018-CA012)
