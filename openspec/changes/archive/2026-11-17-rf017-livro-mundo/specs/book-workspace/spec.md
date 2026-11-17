## ADDED Requirements

### Requirement: Worldbuilding do livro
O sistema SHALL substituir a tela informativa da seção **Worldbuilding** do livro por um **Tab Panel** com uma aba por mundo associado — na ordem de associação, com a primeira aba ativa ao entrar e o **Nome** do mundo como rótulo —, cada aba SHALL exibir o resumo do mundo em modo somente leitura (imagem ou espaço reservado, **Nome**, **Tipo de Mundo**, **Nível Tecnológico**, **Gêneros** e **Descrição**) e as seis categorias de entradas (**Localidades**, **Raças e Povos**, **Artefatos**, **Armas**, **Eventos** e **Sistemas**) em tabela paginada com contador e **Nova entrada**, o cabeçalho SHALL oferecer **Associar mundos**, **Remover mundo** e **Abrir mundo** em livro salvo, e sem mundos associados a seção SHALL mostrar estado vazio com **Associar mundos** (RF017-TL001 a RF017-TL005, RF017-FL001 a RF017-FL006, RF017-RN001 a RF017-RN009, RF017-RN012, RF017-CA001 a RF017-CA011).

#### Scenario: Seção real com um mundo associado
- **GIVEN** um livro salvo tem o mundo **Kepler** associado
- **WHEN** o escritor clica em **Worldbuilding** no menu do livro
- **THEN** a seção abre o Tab Panel com a aba **Kepler** ativa, não a tela informativa, e mostra o resumo do mundo e as categorias de entradas (RF017-TL001, RF017-TL002, RF017-CA001, RF017-CA007, RF017-CA008)

#### Scenario: Abas na ordem de associação
- **GIVEN** o livro tem **Kepler** associado e depois **Ravória**
- **WHEN** o escritor abre **Worldbuilding**
- **THEN** as abas aparecem como **Kepler** e **Ravória**, nesta ordem, com **Kepler** ativa (RF017-TL001, RF017-RN002, RF017-CA002)

#### Scenario: Associar vários mundos
- **GIVEN** a modal **Associar mundos** está aberta em um livro salvo com dois mundos ainda não associados
- **WHEN** o escritor marca os dois e confirma
- **THEN** as duas associações são criadas e as abas correspondentes aparecem no fim do Tab Panel (RF017-TL003, RF017-FL001, RF017-CA003)

#### Scenario: Mundo já associado
- **GIVEN** o mundo **Kepler** já está associado ao livro
- **WHEN** o escritor abre **Associar mundos**
- **THEN** **Kepler** aparece com o selo **Já associado**, não pode ser marcado e nenhuma associação duplicada é criada (RF017-TL003, RF017-RN004, RF017-CA004)

#### Scenario: Busca e paginação da seleção
- **GIVEN** a biblioteca tem mais de doze mundos
- **WHEN** o escritor busca pelo nome, marca um mundo, muda de página e volta
- **THEN** a busca e a paginação de 12 em 12 funcionam e a marcação é mantida (RF017-TL003, RF017-FL001, RF017-CA005)

#### Scenario: Estado vazio e livro não salvo
- **GIVEN** um livro salvo ainda sem mundos associados
- **WHEN** o escritor abre **Worldbuilding**
- **THEN** vê o estado vazio com **Associar mundos**; em livro não salvo, o botão fica desabilitado e a seção orienta a salvar o livro (RF017-TL001, RF017-RN003, RF017-CA006)

#### Scenario: Aba somente leitura
- **GIVEN** a aba do mundo está aberta
- **WHEN** o escritor observa o resumo do mundo
- **THEN** os campos aparecem somente para leitura, sem edição dentro do livro (RF017-TL002, RF017-RN009, RF017-CA007)

#### Scenario: Nova entrada pela aba do livro
- **GIVEN** a aba do mundo **Kepler** está aberta na categoria **Localidades**
- **WHEN** o escritor clica em **Nova entrada**, preenche e salva
- **THEN** a entrada é gravada no mundo, a tabela recarrega e a entrada aparece também no nível raiz (RF017-TL005, RF017-FL005, RF017-RN008, RF017-CA009)

#### Scenario: Remover mundo e limpar cenários
- **GIVEN** o livro tem dois mundos associados e capítulos com cenário em localidades de **Kepler**
- **WHEN** o escritor remove **Kepler** e confirma
- **THEN** a aba **Kepler** desaparece, **Ravória** permanece, os capítulos ficam sem cenário e a tela informa quantos foram afetados (RF017-TL004, RF017-FL003, RF017-RN006, RF017-CA010, RF017-CA011)

#### Scenario: Remover o último mundo
- **GIVEN** o livro tem um único mundo associado
- **WHEN** o escritor remove esse mundo e confirma
- **THEN** a seção volta ao estado vazio com **Associar mundos** (RF017-TL004, RF017-FL003, RF017-CA010)

#### Scenario: Abrir mundo no nível raiz
- **GIVEN** a aba do mundo está aberta
- **WHEN** o escritor clica em **Abrir mundo**
- **THEN** o aplicativo abre a tela de detalhe daquele mundo no nível raiz, com os dados e as entradas intactos (RF017-TL002, RF017-FL004, RF017-RN005, RF017-CA017)

#### Scenario: Alternar abas sem gravar
- **GIVEN** o escritor está na categoria **Armas** da aba **Kepler**
- **WHEN** troca para a aba **Ravória** e volta
- **THEN** a navegação responde e nada é gravado no banco (RF017-FL006, RF017-RN005)

#### Scenario: Persistência das associações
- **GIVEN** o livro tem mundos associados e uma entrada criada pela aba
- **WHEN** o aplicativo é fechado e reaberto
- **THEN** as associações, a ordem das abas e a entrada continuam disponíveis (RF017-CA018)

### Requirement: Cenário Worldbuilding do capítulo com os mundos do livro
O sistema SHALL preencher o campo **Cenário Worldbuilding** do painel do capítulo com as **Localidades** de todos os mundos associados ao livro, agrupadas por mundo, gravando a localidade escolhida, SHALL manter o campo desabilitado com o aviso **Nenhum mundo associado a este livro** quando o livro não tiver mundo, e SHALL recusar no domínio a localidade que não pertença a um mundo associado ao livro (RF017-TL009, RF017-FL007, RF017-RN007, RF017-RN010, RF017-CA012, RF017-CA013).

#### Scenario: Localidades agrupadas por mundo
- **GIVEN** o livro tem os mundos **Kepler** e **Ravória** associados, ambos com localidades
- **WHEN** o escritor abre a aba **Dados do Capítulo**
- **THEN** o campo **Cenário Worldbuilding** lista as localidades agrupadas por mundo e permite escolher uma delas (RF017-TL009, RF017-CA012)

#### Scenario: Cenário gravado e reaberto
- **GIVEN** o escritor escolheu uma localidade de **Ravória** e salvou o capítulo
- **WHEN** reabre o capítulo
- **THEN** o cenário aparece gravado e selecionado (RF017-FL007, RF017-RN007)

#### Scenario: Sem mundo associado
- **GIVEN** o livro não tem nenhum mundo associado
- **WHEN** o escritor abre o painel do capítulo
- **THEN** o campo continua desabilitado com **Nenhum mundo associado a este livro** (RF017-TL009, RF017-CA012)

#### Scenario: Localidade de mundo não associado
- **GIVEN** o escritor tenta gravar um capítulo com a localidade de um mundo que não está associado ao livro
- **WHEN** a operação chega ao domínio
- **THEN** a gravação é recusada com erro de cenário inválido (RF017-RN007, RF017-CA013)

## MODIFIED Requirements

### Requirement: Menu lateral do livro
O sistema SHALL exibir o menu lateral do livro com o nome do livro como rótulo e os itens na ordem **Painel do Livro**, **Dados do Livro**, **Personagens**, **Capítulos**, **Worldbuilding**, grupo **Análise** com **Gráficos** e **Exportar**, e **Início — Sair do livro**; o item **Worldbuilding** SHALL exibir como subtítulo **Entradas de \<mundo\>** quando o livro tiver um mundo associado e **N mundos** quando tiver vários (RF011-TL002, RF011-RN011, RF011-CA012, RF017-TL006, RF017-CA016).

#### Scenario: Ordem dos itens
- **GIVEN** a página do livro está aberta
- **WHEN** o escritor lê o menu lateral
- **THEN** os itens aparecem exatamente na ordem definida, com **Análise** antes de **Gráficos** e **Exportar** e **Início** por último (RF011-CA012)

#### Scenario: Nome do livro no menu
- **GIVEN** um livro foi salvo com o título **A Órbita Silenciosa**
- **WHEN** a página do livro termina de carregar
- **THEN** o rótulo do menu, a faixa do livro e o breadcrumb exibem **A Órbita Silenciosa** (RF011-RN013)

#### Scenario: Subtítulo do Worldbuilding com um mundo
- **GIVEN** o livro tem o mundo **Kepler** associado
- **WHEN** o escritor lê o item **Worldbuilding** no menu lateral
- **THEN** o subtítulo mostra **Entradas de Kepler** (RF017-TL006, RF017-CA016)

#### Scenario: Subtítulo do Worldbuilding com vários mundos
- **GIVEN** o livro tem dois mundos associados
- **WHEN** o escritor lê o item **Worldbuilding** no menu lateral
- **THEN** o subtítulo mostra **2 mundos** (RF017-TL006, RF017-CA016)

### Requirement: Painel do Livro
O sistema SHALL exibir no **Painel do Livro** o título do livro, um subtítulo com os dados preenchidos, quatro métricas — **Personagens**, **Entradas de worldbuilding**, **Capítulos planejados** e **Planejamento concluído** —, a grade de módulos na ordem **Dados do Livro**, **Personagens**, **Capítulos**, **Worldbuilding**, **Gráficos** e **Exportar**, e o botão **Dados do livro**, sem dados fictícios do protótipo; as métricas **Personagens** e **Capítulos planejados** SHALL refletir os vínculos e capítulos reais, e **Entradas de worldbuilding** SHALL refletir as entradas dos mundos associados, com o módulo **Worldbuilding** mostrando a quantidade de mundos e o total de entradas; logo abaixo de **Módulos deste livro**, o Painel SHALL exibir o painel **Curva de Progressão por Capítulo** com o mesmo gráfico da seção **Gráficos** e, sem capítulos, o aviso **Ainda não existem dados** (RF011-TL003, RF011-CA013, RF011-CA019, RF011-CA023, RF014-RN011, RF015-RN008, RF017-TL006, RF017-RN010, RF017-CA015, RF016-TL006, RF016-RN011, RF016-CA016).

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

#### Scenario: Métricas reais de personagens e capítulos
- **GIVEN** o livro tem personagens associados e capítulos cadastrados
- **WHEN** o escritor abre o **Painel do Livro**
- **THEN** **Personagens** e **Capítulos planejados** mostram os totais reais e os cards correspondentes também (RF014-RN011, RF015-RN008)

#### Scenario: Métricas reais de worldbuilding
- **GIVEN** o livro tem dois mundos associados, somando entradas nas seis categorias
- **WHEN** o escritor abre o **Painel do Livro**
- **THEN** **Entradas de worldbuilding** conta as entradas dos dois mundos e o módulo **Worldbuilding** mostra a quantidade de mundos e o total de entradas (RF017-TL006, RF017-RN010, RF017-CA015)

#### Scenario: Curva de Progressão no Painel com capítulos
- **GIVEN** o livro tem capítulos com tipos variados
- **WHEN** o escritor abre o **Painel do Livro**
- **THEN** vê, abaixo dos módulos, o painel **Curva de Progressão por Capítulo** com a mesma curva da seção Gráficos, os badges de ações e progresso, sem duplicar dados (RF016-TL006, RF016-RN011, RF016-CA016)

#### Scenario: Curva de Progressão no Painel sem capítulos
- **GIVEN** o livro não tem capítulos
- **WHEN** o escritor abre o **Painel do Livro**
- **THEN** o painel **Curva de Progressão por Capítulo** permanece visível e informa **Ainda não existem dados**, sem gráfico quebrado (RF016-TL006, RF016-RN011, RF016-CA016)

### Requirement: Seções do livro em requisito posterior
O sistema SHALL manter **Exportar** no menu lateral do livro e SHALL abrir, ao acioná-lo, uma tela informativa da seção, sem conteúdo de domínio e sem navegação para tela inexistente; **Personagens** SHALL ser entregue pelo RF014, **Capítulos** pelo RF015, **Gráficos** pelo RF016 e **Worldbuilding** pelo RF017, todos com seção real (RF011-TL006, RF011-RN010, RF011-CA014, RF014-CA001, RF015-CA001, RF016-CA001, RF017-CA001).

#### Scenario: Seção futura informativa
- **GIVEN** a página do livro está aberta
- **WHEN** o escritor clica em **Exportar**
- **THEN** a seção abre uma tela informativa, sem erro e sem tela em branco (RF011-CA014)

#### Scenario: Personagens, Capítulos, Gráficos e Worldbuilding fora das seções futuras
- **GIVEN** os RF014, RF015, RF016 e RF017 estão implementados
- **WHEN** o escritor clica em **Personagens**, **Capítulos**, **Gráficos** ou **Worldbuilding**
- **THEN** a seção abre o elenco, o quadro de capítulos, os gráficos ou os mundos associados, não a tela informativa (RF014-CA001, RF015-CA001, RF016-CA001, RF017-CA001)

#### Scenario: Sem conteúdo antecipado
- **GIVEN** os RF014, RF015, RF016 e RF017 estão implementados
- **WHEN** o desenvolvedor inspeciona a seção ainda futura
- **THEN** não há exportação de livro implementada (RF011-RN010, RF017-RN014)
