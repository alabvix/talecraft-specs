## MODIFIED Requirements

### Requirement: Dados do Livro com Tab Panel
O sistema SHALL exibir a página **Dados do Livro** com o componente reutilizável **Tab Panel**, com as abas **Dados Gerais**, **Resumo**, **Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo** nesta ordem e **Dados Gerais** selecionada ao abrir; a aba **Dados Gerais** SHALL conter título, gênero principal, subgêneros, faixa de público e idioma; a página SHALL ter somente a ação **Salvar**, sem o botão **Descartar** nem ação equivalente; a lista de subgêneros de **Fantasia** SHALL conter **Alta Fantasia**, **Fantasia Sombria**, **Distopia**, **Fantasia Urbana**, **Romantasia**, **Gótico**, **Baixa Fantasia**, **Grindark**, **Mitológica**, **Histórica**, **Científica** e **Espada e Feitiçaria**; a seleção de subgêneros SHALL ser preservada por gênero enquanto o livro não for salvo, e ao voltar a um gênero os subgêneros já marcados — inclusive os salvos — SHALL reaparecer selecionados (RF011-TL004, RF011-RN004, RF011-RN012, RF012-TL001, RF012-TL003, RF012-RN005, RF013-TL001, RF011-FL004, RF011-FL009, RF011-CA008, RF011-CA009, RF011-CA015, RF012-CA001, RF012-CA006, RF013-CA001).

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

### Requirement: Salvar o livro e os dados gerais
O sistema SHALL validar o título como obrigatório e único sem diferenciar maiúsculas, aceitar os demais campos como opcionais e gravar o livro, os subgêneros, os textos das abas, as listas de voz narrativa e o humor em uma transação (RF011-FL002, RF011-RN002 a RF011-RN007, RF012-RN003, RF013-RN003, RF013-RN004, RF013-CA007, RF013-CA009).

#### Scenario: Título obrigatório
- **GIVEN** o livro está em modo de criação e o título está vazio
- **WHEN** o escritor clica em **Salvar**
- **THEN** uma mensagem útil é exibida e nenhum livro é criado (RF011-CA003)

#### Scenario: Título duplicado
- **GIVEN** já existe um livro chamado **A Órbita Silenciosa**
- **WHEN** o escritor tenta salvar **a órbita silenciosa**
- **THEN** uma mensagem útil é exibida e o segundo livro não é gravado (RF011-CA004)

#### Scenario: Criar e reabrir
- **GIVEN** o livro está em modo de criação com título válido e dados opcionais preenchidos
- **WHEN** o escritor clica em **Salvar**
- **THEN** o livro é criado, a faixa e o menu exibem o título e o livro aparece em Meus Livros para ser reaberto (RF011-CA005, RF011-CA006)

#### Scenario: Salvar todas as abas
- **GIVEN** o escritor preencheu campos em **Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo**
- **WHEN** clica em **Salvar** estando em qualquer aba
- **THEN** os campos de todas as abas são gravados juntos (RF013-FL004, RF013-CA009)

#### Scenario: Rascunho descartado ao sair
- **GIVEN** o livro está em modo de criação sem nunca ter sido salvo
- **WHEN** o escritor clica em **Trocar livro** ou em **Início — Sair do livro**
- **THEN** nenhum registro é criado e a tela Meus Livros é exibida (RF011-RN008, RF011-CA020)

## ADDED Requirements

### Requirement: Abas Sinopse, Tema, Conflito e Voz Narrativa/Tom/Tempo
O sistema SHALL exibir, na página **Dados do Livro**, as abas **Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo**, com os campos de texto **Sinopse Comercial**, **Sinopse Editorial**, **Tema Central**, **Subtemas**, **Nuvem de Palavras**, **Ponto de Conflito Principal**, **Polos de Conflito** e **Resolução do Conflito Principal**, opcionais e com quebras de linha preservadas, e as listas fechadas **Narrador**, **Tom**, **Tempo**, **Humor**, **Estilo** e **Ritmo**, em que **Humor** SHALL aceitar múltiplos valores e os demais um valor cada (RF013-TL002 a RF013-TL005, RF013-FL001 a RF013-FL005, RF013-RN001, RF013-RN002, RF013-RN006, RF013-RN007, RF013-CA002 a RF013-CA006).

#### Scenario: Aba Sinopse com dois textos longos
- **GIVEN** a página Dados do Livro está aberta
- **WHEN** o escritor clica na aba **Sinopse**
- **THEN** vê **Sinopse Comercial** e **Sinopse Editorial** como campos de texto longo, vazios em um livro recém-criado (RF013-TL002, RF013-CA002, RF013-RN008)

#### Scenario: Aba Tema com textos de tamanhos diferentes
- **GIVEN** a aba **Tema** está aberta
- **WHEN** o escritor observa os campos
- **THEN** **Tema Central** é texto curto e **Subtemas** e **Nuvem de Palavras** são texto médio (RF013-TL003, RF013-CA003, RF013-RN001)

#### Scenario: Aba Conflito com textos de tamanhos diferentes
- **GIVEN** a aba **Conflito** está aberta
- **WHEN** o escritor observa os campos
- **THEN** **Ponto de Conflito Principal** é texto curto, **Polos de Conflito** é texto longo e **Resolução do Conflito Principal** é texto médio (RF013-TL004, RF013-CA004, RF013-RN001)

#### Scenario: Listas fechadas de voz narrativa
- **GIVEN** a aba **Voz Narrativa/Tom/Tempo** está aberta
- **WHEN** o escritor abre os controles de **Narrador**, **Tom**, **Tempo**, **Estilo** e **Ritmo**
- **THEN** vê exatamente as opções previstas no requisito (RF013-TL005, RF013-RN002, RF013-CA005)

#### Scenario: Humor múltiplo
- **GIVEN** a aba **Voz Narrativa/Tom/Tempo** está aberta
- **WHEN** o escritor marca **Ironia** e **Sátira** em **Humor** e clica em **Salvar**
- **THEN** os dois valores são gravados juntos, sem repetição (RF013-FL005, RF013-RN002, RF013-RN006, RF013-CA006)

#### Scenario: Alternar abas preserva a edição
- **GIVEN** o escritor digitou uma sinopse e selecionou um narrador sem salvar
- **WHEN** alterna para **Tema** e volta para **Sinopse**
- **THEN** a sinopse e o narrador continuam preenchidos (RF013-FL002, RF013-CA008)

#### Scenario: Gravar e reabrir as quatro abas
- **GIVEN** o escritor preencheu as abas **Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo**
- **WHEN** clica em **Salvar** e reabre o livro
- **THEN** cada aba mostra os valores gravados, com as quebras de linha preservadas (RF013-FL001, RF013-FL003, RF013-RN001, RF013-CA007)

#### Scenario: Salvar a partir de uma aba nova
- **GIVEN** o escritor preencheu **Conflito** e depois **Voz Narrativa/Tom/Tempo**
- **WHEN** clica em **Salvar** estando na última aba
- **THEN** os campos de **Conflito** e das demais abas também são gravados (RF013-FL004, RF013-CA009)

#### Scenario: Conteúdo restrito a Dados do Livro
- **GIVEN** o livro foi salvo com sinopses, tema e conflito preenchidos
- **WHEN** o escritor observa o card em Meus Livros e o **Painel do Livro**
- **THEN** esses textos não são exibidos fora das abas de **Dados do Livro** (RF013-RN007)
