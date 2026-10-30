## MODIFIED Requirements

### Requirement: Dados do Livro com Tab Panel
O sistema SHALL exibir a página **Dados do Livro** com o componente reutilizável **Tab Panel**, com as abas **Dados Gerais**, **Resumo**, **Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo** nesta ordem e **Dados Gerais** selecionada ao abrir; a aba **Dados Gerais** SHALL conter título, gênero principal, subgêneros, faixa de público, idioma e o período da história (**De** e **Até**), com **De** e **Até** lado a lado e aceitando somente dígitos, embora o período seja gravado como texto; a página SHALL ter somente a ação **Salvar**, sem o botão **Descartar** nem ação equivalente; a lista de subgêneros de **Fantasia** SHALL conter **Alta Fantasia**, **Fantasia Sombria**, **Distopia**, **Fantasia Urbana**, **Romantasia**, **Gótico**, **Baixa Fantasia**, **Grindark**, **Mitológica**, **Histórica**, **Científica** e **Espada e Feitiçaria**; a seleção de subgêneros SHALL ser preservada por gênero enquanto o livro não for salvo, e ao voltar a um gênero os subgêneros já marcados — inclusive os salvos — SHALL reaparecer selecionados (RF011-TL004, RF011-RN004, RF011-RN012, RF011-RN018, RF012-TL001, RF012-TL003, RF012-RN005, RF013-TL001, RF011-FL004, RF011-FL009, RF011-CA008, RF011-CA009, RF011-CA015, RF011-CA023, RF012-CA001, RF012-CA006, RF013-CA001).

#### Scenario: Seis abas na ordem
- **GIVEN** a página Dados do Livro está aberta
- **WHEN** o escritor lê o Tab Panel
- **THEN** vê **Dados Gerais**, **Resumo**, **Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo**, nesta ordem, com **Dados Gerais** selecionada (RF013-TL001, RF013-CA001)

#### Scenario: Aba Dados Gerais
- **GIVEN** a página Dados do Livro está aberta
- **WHEN** o escritor observa o Tab Panel
- **THEN** a aba **Dados Gerais** está selecionada e o formulário correspondente é exibido (RF011-CA015, RF012-CA001)

#### Scenario: Listas fechadas
- **GIVEN** a aba **Dados Gerais** está aberta
- **WHEN** o escritor abre os controles de gênero, faixa de público e idioma
- **THEN** vê exatamente as opções previstas no requisito (RF011-CA007, RF011-CA010, RF011-CA011)

#### Scenario: Período da história
- **GIVEN** a aba **Dados Gerais** está aberta
- **WHEN** o escritor observa o formulário
- **THEN** vê os campos **De** e **Até** lado a lado, como texto curto e opcionais (RF011-RN018, RF011-CA023)

#### Scenario: Período aceita somente dígitos
- **GIVEN** a aba **Dados Gerais** está aberta
- **WHEN** o escritor digita ou cola letras, espaços ou sinais em **De** ou **Até**
- **THEN** o campo mantém somente os dígitos do valor informado e o texto permanece opcional (RF011-RN018, RF011-CA023)

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
