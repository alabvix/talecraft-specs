## MODIFIED Requirements

### Requirement: Dados do Livro com Tab Panel
O sistema SHALL exibir a página **Dados do Livro** com o componente reutilizável **Tab Panel**, nesta entrega com a única aba **Dados Gerais**, contendo título, gênero principal, subgêneros, faixa de público, idioma e as ações **Descartar** e **Salvar**; a lista de subgêneros de **Fantasia** SHALL conter **Alta Fantasia**, **Fantasia Sombria**, **Distopia**, **Fantasia Urbana**, **Romantasia**, **Gótico**, **Baixa Fantasia**, **Grindark**, **Mitológica**, **Histórica**, **Científica** e **Espada e Feitiçaria**; a seleção de subgêneros SHALL ser preservada por gênero enquanto o livro não for salvo nem descartado, e ao voltar a um gênero os subgêneros já marcados — inclusive os salvos — SHALL reaparecer selecionados (RF011-TL004, RF011-RN004, RF011-RN012, RF011-FL004, RF011-FL005, RF011-FL009, RF011-CA008, RF011-CA009, RF011-CA015).

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

#### Scenario: Voltar ao gênero preserva os subgêneros salvos
- **GIVEN** um livro salvo com **Ficção Científica** e os subgêneros **Hard SciFi** e **Space Opera** marcados
- **WHEN** o escritor troca para **Terror** e volta para **Ficção Científica** sem salvar
- **THEN** **Hard SciFi** e **Space Opera** continuam marcados e o formulário não fica pendente (RF011-CA009)

#### Scenario: Seleção pendente de outro gênero é preservada
- **GIVEN** o escritor marcou **Gótico** em **Terror** sem salvar
- **WHEN** troca para **Ficção Científica** e volta para **Terror**
- **THEN** **Gótico** continua marcado (RF011-FL009)

#### Scenario: Gravar somente o gênero atual
- **GIVEN** o escritor trocou o gênero e marcou subgêneros do novo gênero
- **WHEN** clica em **Salvar**
- **THEN** somente os subgêneros do gênero atual são gravados e os dos outros gêneros não vão para o banco (RF011-RN004, RF011-CA009)

#### Scenario: Descartar alterações
- **GIVEN** o escritor alterou campos sem salvar
- **WHEN** clica em **Descartar**
- **THEN** o gênero e os subgêneros voltam aos últimos dados salvos e as seleções pendentes dos outros gêneros são limpas (RF011-FL005)
