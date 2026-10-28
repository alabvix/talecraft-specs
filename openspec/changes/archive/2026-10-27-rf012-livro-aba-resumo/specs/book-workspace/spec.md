## MODIFIED Requirements

### Requirement: Dados do Livro com Tab Panel
O sistema SHALL exibir a página **Dados do Livro** com o componente reutilizável **Tab Panel**, com as abas **Dados Gerais** e **Resumo** nesta ordem e **Dados Gerais** selecionada ao abrir; a aba **Dados Gerais** SHALL conter título, gênero principal, subgêneros, faixa de público e idioma; a página SHALL ter somente a ação **Salvar**, sem o botão **Descartar** nem ação equivalente; a lista de subgêneros de **Fantasia** SHALL conter **Alta Fantasia**, **Fantasia Sombria**, **Distopia**, **Fantasia Urbana**, **Romantasia**, **Gótico**, **Baixa Fantasia**, **Grindark**, **Mitológica**, **Histórica**, **Científica** e **Espada e Feitiçaria**; a seleção de subgêneros SHALL ser preservada por gênero enquanto o livro não for salvo, e ao voltar a um gênero os subgêneros já marcados — inclusive os salvos — SHALL reaparecer selecionados (RF011-TL004, RF011-RN004, RF011-RN012, RF012-TL001, RF012-TL003, RF012-RN005, RF011-FL004, RF011-FL009, RF011-CA008, RF011-CA009, RF011-CA015, RF012-CA001, RF012-CA006).

#### Scenario: Aba Dados Gerais
- **GIVEN** a página Dados do Livro está aberta
- **WHEN** o escritor observa o Tab Panel
- **THEN** a aba **Dados Gerais** está selecionada e o formulário correspondente é exibido (RF011-CA015, RF012-CA001)

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
- **THEN** **Hard SciFi** e **Space Opera** continuam marcados (RF011-CA009)

#### Scenario: Seleção pendente de outro gênero é preservada
- **GIVEN** o escritor marcou **Gótico** em **Terror** sem salvar
- **WHEN** troca para **Ficção Científica** e volta para **Terror**
- **THEN** **Gótico** continua marcado (RF011-FL009)

#### Scenario: Gravar somente o gênero atual
- **GIVEN** o escritor trocou o gênero e marcou subgêneros do novo gênero
- **WHEN** clica em **Salvar**
- **THEN** somente os subgêneros do gênero atual são gravados e os dos outros gêneros não vão para o banco (RF011-RN004, RF011-CA009)

#### Scenario: Página sem Descartar
- **GIVEN** a página Dados do Livro está aberta
- **WHEN** o escritor procura as ações da página
- **THEN** encontra somente **Salvar**, sem **Descartar** e sem ação equivalente (RF012-TL003, RF012-RN005, RF012-CA006)

## ADDED Requirements

### Requirement: Aba Resumo do livro
O sistema SHALL exibir, na página **Dados do Livro**, a aba **Resumo** depois de **Dados Gerais**, com os campos de texto longo **Resumo** e **Final do Livro**, ambos opcionais e com quebras de linha preservadas, gravados no registro do livro junto com os dados gerais e os subgêneros na mesma transação, mantendo a edição pendente ao alternar entre as abas (RF012-TL001, RF012-TL002, RF012-FL001 a RF012-FL004, RF012-RN001 a RF012-RN004, RF012-RN006, RF012-RN007, RF012-CA001 a RF012-CA005).

#### Scenario: Aba Resumo com os dois campos
- **GIVEN** a página Dados do Livro está aberta
- **WHEN** o escritor clica na aba **Resumo**
- **THEN** vê os campos **Resumo** e **Final do Livro** como texto longo, ambos vazios em um livro recém-criado (RF012-TL002, RF012-CA002, RF012-RN007)

#### Scenario: Abas na ordem definida
- **GIVEN** a página Dados do Livro está aberta
- **WHEN** o escritor lê o Tab Panel
- **THEN** as abas aparecem exatamente como **Dados Gerais** e **Resumo**, nesta ordem, com **Dados Gerais** selecionada (RF012-TL001, RF012-CA001)

#### Scenario: Alternar abas preserva a edição
- **GIVEN** o escritor digitou texto no **Resumo** sem salvar
- **WHEN** alterna para **Dados Gerais** e volta para **Resumo**
- **THEN** o texto digitado continua no campo (RF012-FL002, RF012-RN004, RF012-CA004)

#### Scenario: Gravar e reabrir o livro
- **GIVEN** o escritor preencheu **Resumo** e **Final do Livro**
- **WHEN** clica em **Salvar** e depois reabre o livro na aba **Resumo**
- **THEN** os dois textos aparecem exatamente como foram gravados, com as quebras de linha preservadas (RF012-FL001, RF012-FL003, RF012-RN001, RF012-RN003, RF012-CA003)

#### Scenario: Salvar a partir da aba Resumo
- **GIVEN** o escritor alterou o título em **Dados Gerais** e o resumo na aba **Resumo**
- **WHEN** clica em **Salvar** estando na aba **Resumo**
- **THEN** os dados gerais e os dois textos são gravados juntos (RF012-FL004, RF012-CA005)

#### Scenario: Resumo restrito a Dados do Livro
- **GIVEN** o livro foi salvo com **Resumo** e **Final do Livro** preenchidos
- **WHEN** o escritor observa o card em Meus Livros e o **Painel do Livro**
- **THEN** os textos não são exibidos fora da aba **Resumo** (RF012-RN006)
