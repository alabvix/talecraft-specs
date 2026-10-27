## MODIFIED Requirements

### Requirement: Dados do Livro com Tab Panel
O sistema SHALL exibir a página **Dados do Livro** com o componente reutilizável **Tab Panel**, nesta entrega com a única aba **Dados Gerais**, contendo título, gênero principal, subgêneros, faixa de público, idioma e as ações **Descartar** e **Salvar**; a lista de subgêneros de **Fantasia** SHALL conter **Alta Fantasia**, **Fantasia Sombria**, **Distopia**, **Fantasia Urbana**, **Romantasia**, **Gótico**, **Baixa Fantasia**, **Grindark**, **Mitológica**, **Histórica**, **Científica** e **Espada e Feitiçaria** (RF011-TL004, RF011-RN004, RF011-RN012, RF011-FL004, RF011-FL005, RF011-FL009, RF011-CA008, RF011-CA015).

#### Scenario: Aba Dados Gerais
- **GIVEN** a página Dados do Livro está aberta
- **WHEN** o escritor observa o Tab Panel
- **THEN** a aba **Dados Gerais** está selecionada e o formulário correspondente é exibido (RF011-CA015)

#### Scenario: Listas fechadas
- **GIVEN** a aba **Dados Gerais** está aberta
- **WHEN** o escritor abre os controles de gênero, faixa de público e idioma
- **THEN** vê exatamente as opções previstas no requisito (RF011-CA007, RF011-CA010, RF011-CA011)

#### Scenario: Subgêneros filtrados pelo gênero
- **GIVEN** a aba **Dados Gerais** está aberta
- **WHEN** o escritor escolhe **Ficção Científica**, **Fantasia** ou **Terror**
- **THEN** a seleção múltipla de subgêneros mostra apenas a lista daquele gênero (RF011-CA008)

#### Scenario: Subgêneros de Fantasia ampliados
- **GIVEN** o escritor escolhe **Fantasia** como Gênero Principal
- **WHEN** observa a seleção múltipla de subgêneros
- **THEN** vê os doze valores da lista de Fantasia, incluindo **Gótico**, **Baixa Fantasia**, **Grindark**, **Mitológica**, **Histórica**, **Científica** e **Espada e Feitiçaria** (RF011-RN004, RF011-CA008)

#### Scenario: Troca de gênero remove subgêneros incompatíveis
- **GIVEN** o escritor marcou subgêneros de **Ficção Científica**
- **WHEN** troca o gênero principal para **Fantasia**
- **THEN** os subgêneros de ficção científica saem da seleção e não são gravados (RF011-CA009)

#### Scenario: Descartar alterações
- **GIVEN** o escritor alterou campos sem salvar
- **WHEN** clica em **Descartar**
- **THEN** os campos voltam aos últimos dados salvos, sem gravar nada (RF011-FL005)
