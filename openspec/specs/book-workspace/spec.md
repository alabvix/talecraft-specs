# book-workspace Specification

## Purpose
A página do livro e a sua navegação: faixa do livro aberto, menu lateral próprio,
Painel do Livro, página **Dados do Livro** com Tab Panel e a aba **Dados Gerais**,
incluindo título único, gênero, subgêneros, faixa de público e idioma (RF011).
## Requirements
### Requirement: Página do livro aberta a partir de Meus Livros
O sistema SHALL abrir a página do livro ao acionar **+ Novo Livro** ou ao clicar em um card de livro, substituindo a casca da raiz pela faixa do livro aberto e pelo menu lateral do livro (RF011-TL001, RF011-FL001, RF011-FL003, RF011-RN001, RF011-CA001).

#### Scenario: Abrir a página em modo de criação
- **GIVEN** a tela Meus Livros está aberta
- **WHEN** o escritor clica em **+ Novo Livro**
- **THEN** a página do livro abre em modo de criação, sem modal e sem registro no banco (RF011-CA001, RF011-CA002)

#### Scenario: Abrir um livro existente
- **GIVEN** existe um livro cadastrado e visível em Meus Livros
- **WHEN** o escritor clica no card do livro
- **THEN** a página do livro abre no **Painel do Livro** com os dados gravados (RF011-CA006)

#### Scenario: Faixa do livro e retorno
- **GIVEN** um livro está aberto
- **WHEN** o escritor observa a faixa do livro ou clica em **Trocar livro**
- **THEN** a faixa mostra o nome do livro e **Livro aberto**, e o clique retorna a Meus Livros (RF011-TL001, RF011-CA012, RF011-CA020)

### Requirement: Menu lateral do livro
O sistema SHALL exibir o menu lateral do livro com o nome do livro como rótulo e os itens na ordem **Painel do Livro**, **Dados do Livro**, **Personagens**, **Capítulos**, **Worldbuilding**, grupo **Análise** com **Gráficos** e **Exportar**, e **Início — Sair do livro** (RF011-TL002, RF011-RN011, RF011-CA012).

#### Scenario: Ordem dos itens
- **GIVEN** a página do livro está aberta
- **WHEN** o escritor lê o menu lateral
- **THEN** os itens aparecem exatamente na ordem definida, com **Análise** antes de **Gráficos** e **Exportar** e **Início** por último (RF011-CA012)

#### Scenario: Nome do livro no menu
- **GIVEN** um livro foi salvo com o título **A Órbita Silenciosa**
- **WHEN** a página do livro termina de carregar
- **THEN** o rótulo do menu, a faixa do livro e o breadcrumb exibem **A Órbita Silenciosa** (RF011-RN013)

### Requirement: Painel do Livro
O sistema SHALL exibir no **Painel do Livro** o título do livro, um subtítulo com os dados preenchidos, quatro métricas zeradas, a grade de módulos na ordem **Dados do Livro**, **Personagens**, **Capítulos**, **Worldbuilding**, **Gráficos** e **Exportar**, e o botão **Dados do livro**, sem dados fictícios do protótipo (RF011-TL003, RF011-CA013, RF011-CA019, RF011-CA023).

#### Scenario: Painel de um livro recém-criado
- **GIVEN** um livro foi criado apenas com o título
- **WHEN** o escritor abre o **Painel do Livro**
- **THEN** vê o título, as métricas **Personagens**, **Entradas de worldbuilding**, **Capítulos planejados** e **Planejamento concluído** com valor **0**, e os seis módulos (RF011-CA013, RF011-CA018)

#### Scenario: Ordem dos módulos
- **GIVEN** o **Painel do Livro** está aberto
- **WHEN** o escritor lê os cards de **Módulos deste livro**
- **THEN** a ordem é **Dados do Livro**, **Personagens**, **Capítulos**, **Worldbuilding**, **Gráficos** e **Exportar** (RF011-TL003, RF011-CA013, RF011-CA023)

#### Scenario: Atalho para Dados do Livro
- **GIVEN** o **Painel do Livro** está aberto
- **WHEN** o escritor clica em **Dados do livro**
- **THEN** a seção **Dados do Livro** é aberta (RF011-FL004, RF011-CA013)

### Requirement: Dados do Livro com Tab Panel
O sistema SHALL exibir a página **Dados do Livro** com o componente reutilizável **Tab Panel**, com as abas **Dados Gerais**, **Resumo**, **Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo** nesta ordem e **Dados Gerais** selecionada ao abrir; a aba **Dados Gerais** SHALL conter título, gênero principal, subgêneros, faixa de público, idioma e o período da história (**De** e **Até**); a página SHALL ter somente a ação **Salvar**, sem o botão **Descartar** nem ação equivalente; a lista de subgêneros de **Fantasia** SHALL conter **Alta Fantasia**, **Fantasia Sombria**, **Distopia**, **Fantasia Urbana**, **Romantasia**, **Gótico**, **Baixa Fantasia**, **Grindark**, **Mitológica**, **Histórica**, **Científica** e **Espada e Feitiçaria**; a seleção de subgêneros SHALL ser preservada por gênero enquanto o livro não for salvo, e ao voltar a um gênero os subgêneros já marcados — inclusive os salvos — SHALL reaparecer selecionados (RF011-TL004, RF011-RN004, RF011-RN012, RF011-RN018, RF012-TL001, RF012-TL003, RF012-RN005, RF013-TL001, RF011-FL004, RF011-FL009, RF011-CA008, RF011-CA009, RF011-CA015, RF011-CA023, RF012-CA001, RF012-CA006, RF013-CA001).

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
- **THEN** vê os campos **De** e **Até** como texto curto, opcionais (RF011-RN018, RF011-CA023)

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
O sistema SHALL validar o título como obrigatório e único sem diferenciar maiúsculas, aceitar os demais campos como opcionais e gravar o livro, os subgêneros, o período da história, os textos das abas, as listas de voz narrativa e o humor em uma transação (RF011-FL002, RF011-RN002 a RF011-RN007, RF011-RN018, RF012-RN003, RF013-RN003, RF013-RN004, RF013-CA007, RF013-CA009).

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

#### Scenario: Período da história gravado
- **GIVEN** o escritor preencheu **De** e **Até**
- **WHEN** clica em **Salvar**
- **THEN** os dois valores são gravados e relidos com o restante dos dados (RF011-RN018, RF011-CA023)

#### Scenario: Salvar todas as abas
- **GIVEN** o escritor preencheu campos em **Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo**
- **WHEN** clica em **Salvar** estando em qualquer aba
- **THEN** os campos de todas as abas são gravados juntos (RF013-FL004, RF013-CA009)

#### Scenario: Rascunho descartado ao sair
- **GIVEN** o livro está em modo de criação sem nunca ter sido salvo
- **WHEN** o escritor clica em **Trocar livro** ou em **Início — Sair do livro**
- **THEN** nenhum registro é criado e a tela Meus Livros é exibida (RF011-RN008, RF011-CA020)

### Requirement: Seções do livro em requisito posterior
O sistema SHALL manter **Personagens**, **Capítulos**, **Worldbuilding**, **Gráficos** e **Exportar** no menu lateral do livro e SHALL abrir, ao acioná-los, uma tela informativa da seção, sem conteúdo de domínio e sem navegação para tela inexistente (RF011-TL006, RF011-RN010, RF011-CA014).

#### Scenario: Seção futura informativa
- **GIVEN** a página do livro está aberta
- **WHEN** o escritor clica em **Personagens**, **Capítulos**, **Worldbuilding**, **Gráficos** ou **Exportar**
- **THEN** a seção abre uma tela informativa, sem erro e sem tela em branco (RF011-CA014)

#### Scenario: Sem conteúdo antecipado
- **GIVEN** o RF011 está implementado
- **WHEN** o desenvolvedor inspeciona as seções futuras
- **THEN** não há elenco do livro, capítulos, associação livro–mundo, gráficos nem exportação de livro implementados (RF011-RN010)

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

