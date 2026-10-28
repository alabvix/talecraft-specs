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
O sistema SHALL manter **Worldbuilding** e **Exportar** no menu lateral do livro e SHALL abrir, ao acioná-los, uma tela informativa da seção, sem conteúdo de domínio e sem navegação para tela inexistente; **Personagens** SHALL ser entregue pelo RF014, **Capítulos** pelo RF015 e **Gráficos** pelo RF016, todos com seção real (RF011-TL006, RF011-RN010, RF011-CA014, RF014-CA001, RF015-CA001, RF016-CA001).

#### Scenario: Seção futura informativa
- **GIVEN** a página do livro está aberta
- **WHEN** o escritor clica em **Worldbuilding** ou **Exportar**
- **THEN** a seção abre uma tela informativa, sem erro e sem tela em branco (RF011-CA014)

#### Scenario: Personagens, Capítulos e Gráficos fora das seções futuras
- **GIVEN** os RF014, RF015 e RF016 estão implementados
- **WHEN** o escritor clica em **Personagens**, **Capítulos** ou **Gráficos**
- **THEN** a seção abre o elenco, o quadro de capítulos ou os gráficos, não a tela informativa (RF014-CA001, RF015-CA001, RF016-CA001)

#### Scenario: Sem conteúdo antecipado
- **GIVEN** os RF014, RF015 e RF016 estão implementados
- **WHEN** o desenvolvedor inspeciona as seções ainda futuras
- **THEN** não há associação livro–mundo nem exportação de livro implementadas (RF011-RN010)

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

### Requirement: Personagens do livro
O sistema SHALL substituir a tela informativa da seção **Personagens** pela listagem dos personagens associados ao livro, em **cards** (padrão) ou **lista**, com o botão **Adicionar Personagens**, a modal de seleção múltipla com **busca por nome** e **grade paginada**, **Associar** e **Fechar**, a recusa de vínculo duplicado, o estado vazio e a exigência de livro salvo (RF014-TL001 a RF014-TL003, RF014-FL001, RF014-FL002, RF014-FL005, RF014-RN001, RF014-RN005, RF014-RN008, RF014-RN009, RF014-RN012, RF014-RN014, RF014-CA001 a RF014-CA006, RF014-CA011, RF014-CA012, RF014-CA015).

#### Scenario: Seção Personagens com conteúdo
- **GIVEN** um livro salvo com personagens associados
- **WHEN** o escritor clica em **Personagens** no menu do livro
- **THEN** a seção lista o elenco do livro em cards, não a tela informativa de requisito posterior (RF014-TL001, RF014-CA001)

#### Scenario: Cards e lista
- **GIVEN** a seção **Personagens** está aberta com personagens associados
- **WHEN** o escritor alterna entre **Cards** e **Lista**
- **THEN** a mesma lista é exibida nas duas visualizações, com retrato, nome e **Papel** do vínculo, ou **Papel não definido** quando vazio (RF014-TL001, RF014-CA006)

#### Scenario: Estado vazio do elenco
- **GIVEN** um livro salvo sem personagens associados
- **WHEN** o escritor abre a seção **Personagens**
- **THEN** vê o estado vazio, o botão **Adicionar Personagens** e a orientação para adicionar personagens (RF014-TL001, RF014-RN012, RF014-CA006)

#### Scenario: Abrir a modal de seleção
- **GIVEN** a seção **Personagens** está aberta com o livro salvo e a biblioteca global tem personagens
- **WHEN** o escritor clica em **Adicionar Personagens**
- **THEN** a modal mostra os personagens em uma grade paginada, com caixa de seleção, retrato, nome, o campo de busca por nome e os botões **Associar** e **Fechar** (RF014-TL003, RF014-RN014, RF014-CA003)

#### Scenario: Busca por nome na modal
- **GIVEN** a modal de seleção está aberta
- **WHEN** o escritor digita parte do nome no campo de busca
- **THEN** a grade mostra somente os personagens cujo nome contém o texto, sem diferenciar maiúsculas, e volta para a primeira página (RF014-TL003, RF014-RN014, RF014-CA003)

#### Scenario: Paginação da grade
- **GIVEN** a biblioteca global tem mais personagens do que cabem em uma página da grade
- **WHEN** o escritor avança para a próxima página
- **THEN** vê os personagens seguintes, com o número da página e o total, e as marcações feitas na página anterior continuam selecionadas (RF014-TL003, RF014-RN014, RF014-CA003)

#### Scenario: Personagem já associado
- **GIVEN** um personagem já está associado ao livro
- **WHEN** o escritor abre a modal de seleção
- **THEN** o personagem aparece com o selo **Já associado** e a caixa de seleção não pode ser marcada (RF014-TL003, RF014-RN005, RF014-CA003, RF014-CA005)

#### Scenario: Associar vários personagens
- **GIVEN** a modal de seleção está aberta com personagens ainda não associados
- **WHEN** o escritor marca dois ou mais personagens e clica em **Associar**
- **THEN** todos os vínculos são criados, a modal fecha e a lista do elenco é atualizada (RF014-FL001, RF014-CA004)

#### Scenario: Sem personagens selecionados
- **GIVEN** a modal de seleção está aberta sem nenhum personagem marcado
- **WHEN** o escritor clica em **Associar**
- **THEN** uma mensagem útil é exibida e nenhum vínculo é criado (RF014-TL003, RF014-CA012)

#### Scenario: Duplicidade recusada
- **GIVEN** um personagem já está associado ao livro
- **WHEN** a tentativa de associação chega ao domínio com esse personagem
- **THEN** nenhum segundo vínculo é criado, os personagens novos da mesma seleção são associados e uma mensagem informa quais já estavam no livro (RF014-FL002, RF014-RN005, RF014-CA005)

#### Scenario: Sem personagens globais
- **GIVEN** a biblioteca global não tem nenhum personagem
- **WHEN** o escritor clica em **Adicionar Personagens**
- **THEN** a modal mostra o estado vazio com orientação para cadastrar personagens na biblioteca global, e **Fechar** funciona (RF014-TL003, RF014-CA011)

#### Scenario: Busca sem resultado
- **GIVEN** a modal de seleção está aberta com personagens na biblioteca global
- **WHEN** o escritor busca um nome que não existe
- **THEN** a modal informa que nenhum personagem corresponde à busca, sem erro e sem apagar a seleção já marcada (RF014-TL003, RF014-RN014, RF014-CA003)

#### Scenario: Livro ainda não salvo
- **GIVEN** a página do livro está em modo de criação, sem registro no banco
- **WHEN** o escritor abre a seção **Personagens**
- **THEN** o botão **Adicionar Personagens** está desabilitado e uma mensagem orienta a salvar o livro antes (RF014-TL002, RF014-FL005, RF014-RN008, RF014-CA002)

#### Scenario: Sem ação de desvincular
- **GIVEN** a seção **Personagens** está aberta com o elenco do livro
- **WHEN** o escritor procura as ações de cada personagem
- **THEN** não encontra botão, ícone ou ação para desvincular o personagem do livro (RF014-RN009, RF014-CA015)

### Requirement: Modal de detalhe do personagem no livro
O sistema SHALL abrir, ao clicar em um personagem do elenco, uma modal com os dados globais herdados do cadastro em modo somente leitura — retrato, Nome, Idade, Raça, Personalidade, Força, Fraqueza, Interesses, Alcunha e Biografia — e com os campos do vínculo editáveis **Papel**, **Resumo do Papel**, **Papel no mundo**, **Títulos/Outros Nomes** e **Resumo da atuação na história**, todos opcionais, com **Papel** em lista fechada de treze valores e **Salvar** e **Fechar** (RF014-TL004, RF014-TL005, RF014-TL006, RF014-FL003, RF014-FL004, RF014-RN002 a RF014-RN004, RF014-RN007, RF014-CA007 a RF014-CA010).

#### Scenario: Abrir o detalhe do personagem
- **GIVEN** o elenco do livro tem personagens associados
- **WHEN** o escritor clica no card ou na linha de um personagem
- **THEN** a modal de detalhe abre com as áreas **Dados do personagem** e **Vínculo com o livro** e os botões **Salvar** e **Fechar** (RF014-TL004, RF014-CA007)

#### Scenario: Dados globais somente leitura
- **GIVEN** a modal de detalhe está aberta
- **WHEN** o escritor observa a área **Dados do personagem**
- **THEN** vê retrato, Nome, Idade, Raça, Personalidade, Força, Fraqueza, Interesses, Alcunha e Biografia sem poder editá-los, com os campos vazios indicados como não informados (RF014-TL004, RF014-RN002, RF014-CA007)

#### Scenario: Rótulo Títulos/Outros Nomes no vínculo
- **GIVEN** a modal de detalhe está aberta
- **WHEN** o escritor observa os campos do **Vínculo com o livro**
- **THEN** o campo local antes chamado **Alcunha** aparece como **Títulos/Outros Nomes**, enquanto a **Alcunha** da ficha global continua com esse nome na área somente leitura (RF014-TL004, RF014-RN003, RF014-CA007)

#### Scenario: Títulos/Outros Nomes do vínculo independentes
- **GIVEN** o personagem global tem **Alcunha** = `Nove`
- **WHEN** o escritor preenche **Títulos/Outros Nomes** do vínculo com `O Andarilho` e salva
- **THEN** o vínculo guarda `O Andarilho` e a **Alcunha** global continua `Nove` e somente leitura (RF014-RN003, RF014-CA009)

#### Scenario: Papel em lista fechada
- **GIVEN** a modal de detalhe está aberta
- **WHEN** o escritor abre o controle **Papel**
- **THEN** vê **Protagonista**, **Antagonista**, **Coadjuvante**, **Aliado**, **Falso Antagonista**, **Falso Protagonista**, **Oponente**, **Confidente**, **Figurante**, **Coprotagonista**, **Mentor**, **Herói**, **Vilão** e o valor vazio **Não definido** (RF014-TL005, RF014-RN004, RF014-CA008)

#### Scenario: Salvar e reabrir o vínculo
- **GIVEN** o escritor preencheu **Papel**, **Resumo do Papel**, **Papel no mundo**, **Títulos/Outros Nomes** e **Resumo da atuação na história**
- **WHEN** clica em **Salvar** e reabre o mesmo personagem
- **THEN** os cinco valores aparecem como foram gravados, o **Papel** atualiza a listagem e a ficha global permanece inalterada (RF014-FL003, RF014-TL006, RF014-RN007, RF014-CA009)

#### Scenario: Papel novo gravado
- **GIVEN** a modal de detalhe está aberta
- **WHEN** o escritor escolhe **Vilão** (ou outro papel acrescentado pelo ajuste) e clica em **Salvar**
- **THEN** o vínculo guarda o papel novo, a listagem o exibe e reabrir a modal mostra o mesmo valor (RF014-TL005, RF014-RN004, RF014-CA008, RF014-CA009)

#### Scenario: Fechar sem salvar
- **GIVEN** a modal de detalhe está aberta com o vínculo preenchido
- **WHEN** o escritor altera os campos e clica em **Fechar**
- **THEN** as alterações pendentes são descartadas e o vínculo anterior continua gravado (RF014-TL006, RF014-FL004, RF014-CA010)

### Requirement: Capítulos do livro
O sistema SHALL substituir a tela informativa da seção **Capítulos** pelo quadro de planejamento do livro, com as quatro colunas de status **Esboço**, **Rascunho**, **Revisão** e **Finalizado**, cada uma com tamanho fixo, contador, rolagem interna, ordenação por **Número** ou **Data de Criação** (ascendente/descendente) e o botão **Adicionar Capítulo** no rodapé; **Novo Capítulo** no cabeçalho SHALL criar no **Esboço**, os rodapés SHALL criar no status da coluna, o clique em um capítulo SHALL abrir o painel de edição abaixo do quadro com **Salvar** no cabeçalho e os campos **Número**, **Título**, **Status**, **Tipo**, **Motivo do Tipo**, **Meta**, **Foreshadowing**, **Plot Twist**, **Cliffhanger**, **Punch**, **K.O**, **Personagens** (cada um com **Evento**, **Tipo de Evento** e **Motivo do Evento**), **Cenário Worldbuilding**, **Cenário Descritivo** e **Resumo**, com o **K.O** ao lado do **Punch** e com a **mesma altura** dele, o **Motivo do Tipo** como texto médio abaixo do Tipo, a ajuda do **Tipo** em linhas separadas para Ação, Suspensão, Direto e Indireto e o **Cenário Descritivo** em altura curta, e o arrastar SHALL mudar o status do capítulo (RF015-TL001 a RF015-TL006, RF015-FL001 a RF015-FL005, RF015-RN001 a RF015-RN013, RF015-CA001 a RF015-CA019).

#### Scenario: Quadro com os quatro status
- **GIVEN** um livro salvo sem capítulos
- **WHEN** o escritor abre **Capítulos**
- **THEN** vê as quatro colunas vazias, com contador, rolagem e **Adicionar Capítulo** no rodapé, não a tela informativa (RF015-TL001, RF015-TL002, RF015-CA001, RF015-CA002, RF015-CA015)

#### Scenario: Colunas de tamanho fixo
- **GIVEN** o quadro está aberto com capítulos nas colunas
- **WHEN** o escritor rola o corpo de uma coluna
- **THEN** o cabeçalho e o rodapé permanecem no lugar e os cards rolam dentro do tamanho fixo da coluna (RF015-TL002, RF015-CA002)

#### Scenario: Ordenação independente por coluna
- **GIVEN** uma coluna tem capítulos com números e datas de criação diferentes
- **WHEN** o escritor escolhe **Número** ou **Data de Criação** e a direção no cabeçalho daquela coluna
- **THEN** somente aquela coluna é reordenada, sem afetar as demais (RF015-TL003, RF015-FL005, RF015-CA003)

#### Scenario: Novo Capítulo cria no Esboço
- **GIVEN** a seção está aberta em um livro salvo
- **WHEN** o escritor clica em **Novo Capítulo**
- **THEN** o capítulo é criado no **Esboço**, com o próximo número, e o painel de edição abre para ele (RF015-TL004, RF015-FL001, RF015-CA004)

#### Scenario: Adicionar Capítulo no rodapé da coluna
- **GIVEN** o quadro está aberto
- **WHEN** o escritor clica em **Adicionar Capítulo** no rodapé de **Rascunho**, **Revisão** ou **Finalizado**
- **THEN** o capítulo é criado naquele status e o painel de edição abre para ele (RF015-TL002, RF015-FL002, RF015-CA005)

#### Scenario: Painel de edição com Salvar no cabeçalho
- **GIVEN** o quadro tem capítulos
- **WHEN** o escritor clica em um card
- **THEN** o painel abaixo mostra os dados do capítulo em edição, com **Salvar** no canto superior direito do cabeçalho e todos os campos do requisito (RF015-TL005, RF015-CA006)

#### Scenario: K.O ao lado do Punch com a mesma altura
- **GIVEN** o painel de edição está aberto
- **WHEN** o escritor observa o formulário
- **THEN** o **K.O** aparece ao lado do **Punch**, com a mesma altura dele, e o **Cenário Descritivo** usa altura curta (RF015-TL005, RF015-CA018)

#### Scenario: Motivo do Tipo abaixo do Tipo
- **GIVEN** o painel de edição está aberto
- **WHEN** o escritor observa o campo **Tipo**
- **THEN** logo abaixo dele vê **Motivo do Tipo** como texto médio, gravado e relido com o capítulo (RF015-TL005, RF015-RN013, RF015-CA019)

#### Scenario: Tipo com ajuda em linhas
- **GIVEN** o painel de edição está aberto
- **WHEN** o escritor abre o campo **Tipo**
- **THEN** vê **Não definido**, **Ação Direta**, **Ação Indireta**, **Suspensão Direta** e **Suspensão Indireta**, e o **?** explica Ação, Suspensão, Direto e Indireto em linhas separadas (RF015-TL006, RF015-RN004, RF015-CA007, RF015-CA018)

#### Scenario: Personagens do capítulo com evento e motivo
- **GIVEN** o livro tem personagens no elenco
- **WHEN** o escritor adiciona um personagem no capítulo
- **THEN** escolhe **Evento** (Neutro, Ponto de Ligação ou Ponto de Virada), o **Tipo de Evento** compatível e preenche o **Motivo do Evento** abaixo do par, podendo remover o personagem do capítulo (RF015-RN005, RF015-CA008)

#### Scenario: Salvar e reabrir o capítulo
- **GIVEN** o escritor preencheu os campos e salvou
- **WHEN** reabre o mesmo capítulo
- **THEN** os valores continuam gravados, inclusive o **Motivo do Tipo** e o **Motivo do Evento** de cada personagem, o capítulo permanece no status escolhido e o card reflete título, tipo e personagens (RF015-FL003, RF015-RN005, RF015-RN007, RF015-CA009, RF015-CA018, RF015-CA019)

#### Scenario: Arrastar muda o status
- **GIVEN** um capítulo está em uma coluna
- **WHEN** o escritor o arrasta para outra coluna
- **THEN** o status é gravado como o da coluna de destino e o painel aberto acompanha (RF015-FL004, RF015-CA010)

#### Scenario: Livro ainda não salvo
- **GIVEN** a página do livro está em modo de criação
- **WHEN** o escritor abre **Capítulos**
- **THEN** o botão **Novo Capítulo** fica desabilitado e uma mensagem orienta a salvar o livro antes (RF015-RN001)

#### Scenario: Sem remoção
- **GIVEN** o quadro está aberto com capítulos
- **WHEN** o escritor procura ações de cada capítulo
- **THEN** não encontra botão, ícone ou ação para excluir o capítulo (RF015-RN010, RF015-CA014)

#### Scenario: Métricas de capítulos
- **GIVEN** existem capítulos em livros
- **WHEN** o escritor abre Meus Livros ou o Painel do Livro
- **THEN** **Capítulos planejados** reflete os capítulos reais (RF015-RN008, RF015-CA012)

### Requirement: Gráficos do livro
O sistema SHALL substituir a tela informativa da seção **Gráficos** por um **Tab Panel** com as abas **Curva de Progressão por Capítulo** e **Evolução de Personagem**; a primeira aba SHALL desenhar uma linha com todos os capítulos do livro no eixo X, ordenados por **Número**, começando em 0 e somando +1 por capítulo de **Ação** (Direta ou Indireta), mantendo-se horizontal em **Suspensão** e em **Não definido**, e SHALL identificar cada ponto com um tooltip que mostra o capítulo e o Tipo; a segunda aba SHALL empilhar um gráfico por personagem, com valor acumulado por **Evento** — Neutro 0 sem marcador, Ascensão +1 com bolinha azul pequena, Declínio -1 com bolinha vermelha pequena, Apogeu +2 com bolinha azul maior e Queda -2 com bolinha vermelha maior —, interrompendo a linha nos capítulos em que o personagem não aparece e trazendo o **Protagonista** primeiro (RF016-TL001 a RF016-TL005, RF016-FL001 a RF016-FL003, RF016-RN001 a RF016-RN010, RF016-CA001 a RF016-CA015).

#### Scenario: Seção com o Tab Panel
- **GIVEN** a página de um livro salvo está aberta
- **WHEN** o escritor clica em **Gráficos**
- **THEN** vê o Tab Panel com **Curva de Progressão por Capítulo** selecionada e **Evolução de Personagem** na segunda aba, não a tela informativa (RF016-TL001, RF016-TL004, RF016-CA001)

#### Scenario: Curva de progressão
- **GIVEN** o livro tem capítulos com tipos variados
- **WHEN** a primeira aba é aberta
- **THEN** o eixo X mostra os capítulos por Número e a linha sobe 1 a cada Ação, fica horizontal em Suspensão e em Não definido, com a legenda do comportamento (RF016-TL002, RF016-RN002, RF016-RN003, RF016-CA002, RF016-CA003)

#### Scenario: Tooltip do ponto
- **GIVEN** a Curva de Progressão está desenhada
- **WHEN** o escritor passa o mouse sobre um ponto de Ação ou de Suspensão
- **THEN** o tooltip mostra o número do capítulo e o Tipo correspondente (RF016-TL002, RF016-CA015)

#### Scenario: Evolução de cada personagem
- **GIVEN** o livro tem personagens com eventos em capítulos
- **WHEN** o escritor abre a segunda aba
- **THEN** vê um gráfico por personagem, um embaixo do outro, com nome, eixo X de capítulos e o valor acumulado no eixo Y (RF016-TL003, RF016-RN004, RF016-CA004)

#### Scenario: Marcadores dos eventos
- **GIVEN** um personagem tem Ascensão, Declínio, Apogeu e Queda em capítulos diferentes
- **WHEN** o gráfico dele é desenhado
- **THEN** Ascensão é uma bolinha azul pequena, Declínio uma vermelha pequena, Apogeu uma azul maior e Queda uma vermelha maior; Neutro não desenha marcador (RF016-RN004, RF016-RN007, RF016-CA005)

#### Scenario: Capítulo sem o personagem
- **GIVEN** um personagem aparece no capítulo 1 e no capítulo 3, mas não no 2
- **WHEN** o gráfico dele é desenhado
- **THEN** o eixo X continua com os três capítulos e a linha é interrompida no capítulo 2, recomeçando no 3 (RF016-RN005, RF016-CA006)

#### Scenario: Protagonista primeiro
- **GIVEN** o elenco tem um personagem com papel **Protagonista** que aparece depois de outro personagem
- **WHEN** a segunda aba é aberta
- **THEN** o gráfico do protagonista aparece no topo; sem protagonista, vale a primeira aparição e, no empate, a ordem alfabética (RF016-RN006, RF016-CA007)

#### Scenario: Todos os status entram
- **GIVEN** o livro tem capítulos em Esboço, Rascunho, Revisão e Finalizado
- **WHEN** os gráficos são abertos
- **THEN** todos aparecem no eixo X na ordem do Número, independentemente do status (RF016-RN002, RF016-CA008)

#### Scenario: Livro sem capítulos
- **GIVEN** o livro está salvo e não tem capítulos
- **WHEN** o escritor abre **Gráficos**
- **THEN** as duas abas mostram uma mensagem de estado vazio, sem linha, eixo quebrado ou dado fictício (RF016-TL005, RF016-RN009, RF016-CA009, RF016-CA013)

#### Scenario: Livro sem personagens com evento
- **GIVEN** o livro tem capítulos, mas nenhum personagem foi associado a eles
- **WHEN** o escritor abre **Evolução de Personagem**
- **THEN** a aba explica que ainda não há arco para desenhar, sem inventar gráficos (RF016-TL005, RF016-RN009, RF016-CA009)

#### Scenario: Livro ainda não salvo
- **GIVEN** a página do livro está em modo de criação
- **WHEN** o escritor abre **Gráficos**
- **THEN** a seção orienta a salvar o livro antes e não consulta dados inexistentes (RF016-RN001, RF016-CA009)

#### Scenario: Tema ativo
- **GIVEN** o escritor troca o tema do aplicativo
- **WHEN** volta à seção **Gráficos**
- **THEN** eixos, grade, linha e marcadores usam as cores do tema, mantendo azul para ascensão/apogeu e vermelho para declínio/queda (RF016-RN007, RF016-CA010)

#### Scenario: Somente leitura
- **GIVEN** o escritor abre e alterna as duas abas
- **WHEN** a seção termina de carregar
- **THEN** nenhum dado foi gravado e nenhuma migração foi criada; o esquema continua na v16 (RF016-RN001, RF016-RN008, RF016-CA011)

