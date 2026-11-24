## MODIFIED Requirements

### Requirement: Capítulos do livro
O sistema SHALL substituir a tela informativa da seção **Capítulos** pelo quadro de planejamento do livro, com as quatro colunas de status **Esboço**, **Rascunho**, **Revisão** e **Finalizado**, cada uma com tamanho fixo, contador, rolagem interna, ordenação por **Número** ou **Data de Criação** (ascendente/descendente) e o botão **Adicionar Capítulo** no rodapé; **Novo Capítulo** no cabeçalho SHALL criar no **Esboço**, os rodapés SHALL criar no status da coluna, o clique em um capítulo SHALL abrir o painel de edição abaixo do quadro, organizado em três abas — **Dados do Capítulo**, com **Número**, **Título**, **Status**, **Tipo**, **Motivo do Tipo**, **Meta**, **Cenário Worldbuilding**, **Cenário Descritivo** e **Resumo**; **Dados Complementares**, com **Foreshadowing**, **Plot Twist**, **Cliffhanger**, **Punch** e **K.O**; e **Personagens do Capítulo**, com cada personagem precedido de uma miniatura quadrada do retrato (ou um quadrado vazio do mesmo tamanho) e exibido como **Nome - Papel** a partir do **Papel** do vínculo do RF014 (ou **Não definido**), com **Evento**, **Tipo de Evento** e **Motivo do Evento** por personagem —, com **Salvar** no cabeçalho comum às três abas, o **Motivo do Tipo** e a **Meta** como textos de duas linhas, o **Cenário Descritivo** em duas linhas, o **K.O** ao lado do **Punch** e com a mesma altura dele, o **Cenário Worldbuilding** aceitando **um ou mais** cenários com a lista de selecionados e **Remover**, a ajuda do **Tipo** em linhas separadas para Ação, Suspensão, Direto e Indireto, as ajudas do **Evento** e do **Tipo de Evento** no padrão do **?** do Tipo e o arrastar SHALL mudar o status do capítulo (RF015-TL001 a RF015-TL008, RF015-FL001 a RF015-FL005, RF015-RN001 a RF015-RN018, RF015-CA001 a RF015-CA026).

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

#### Scenario: Painel em três abas
- **GIVEN** o painel de edição está aberto
- **WHEN** o escritor observa o painel
- **THEN** vê as abas **Dados do Capítulo**, **Dados Complementares** e **Personagens do Capítulo**; a primeira mostra do **Número** ao **Resumo** sem os campos complementares, a segunda mostra **Foreshadowing**, **Plot Twist**, **Cliffhanger**, **Punch** e **K.O**, e a terceira mostra os personagens do arco, com o **Salvar** no cabeçalho nas três abas (RF015-TL005, RF015-TL008, RF015-RN014, RF015-CA020, RF015-CA025)

#### Scenario: Aba Dados Complementares
- **GIVEN** o painel de edição está aberto
- **WHEN** o escritor clica na aba **Dados Complementares**
- **THEN** vê os campos **Foreshadowing**, **Plot Twist**, **Cliffhanger**, **Punch** e **K.O**, com o **K.O** ao lado do **Punch** e a mesma altura dele, e nenhum campo estrutural do capítulo (RF015-TL008, RF015-RN018, RF015-CA025)

#### Scenario: Troca de aba preserva a edição pendente
- **GIVEN** o escritor digitou um valor em um campo da aba **Dados do Capítulo** ou **Dados Complementares**, ou alterou um personagem na aba **Personagens do Capítulo** sem salvar
- **WHEN** troca de aba e volta
- **THEN** o valor digitado continua no formulário e nada foi gravado antes do **Salvar** (RF015-RN014, RF015-CA020)

#### Scenario: Motivo do Tipo, Meta e Cenário Descritivo com duas linhas
- **GIVEN** o painel de edição está aberto na aba **Dados do Capítulo**
- **WHEN** o escritor observa os campos **Motivo do Tipo**, **Meta** e **Cenário Descritivo**
- **THEN** o **Motivo do Tipo** aparece logo abaixo do **Tipo** e os três campos usam textos de duas linhas, menores que a altura curta anterior, e **Salvar** e reabrir preserva o conteúdo digitado (RF015-TL005, RF015-RN013, RF015-CA018, RF015-CA019, RF015-CA021)

#### Scenario: K.O ao lado do Punch com a mesma altura
- **GIVEN** o painel de edição está aberto na aba **Dados Complementares**
- **WHEN** o escritor observa o formulário
- **THEN** o **K.O** aparece ao lado do **Punch**, com a mesma altura dele (RF015-TL005, RF015-TL008, RF015-CA018, RF015-CA025)

#### Scenario: Tipo com ajuda em linhas
- **GIVEN** o painel de edição está aberto
- **WHEN** o escritor abre o campo **Tipo**
- **THEN** vê **Não definido**, **Ação Direta**, **Ação Indireta**, **Suspensão Direta** e **Suspensão Indireta**, e o **?** explica Ação, Suspensão, Direto e Indireto em linhas separadas (RF015-TL006, RF015-RN004, RF015-CA007, RF015-CA018)

#### Scenario: Ajuda do Evento
- **GIVEN** o painel de edição está aberto na aba **Personagens do Capítulo** com um personagem adicionado
- **WHEN** o escritor passa o mouse ou foca o **?** do campo **Evento**
- **THEN** a ajuda explica **Ponto de Ligação** (acontecimento positivo de Ascensão ou negativo de Declínio que leva ao Ponto de Virada) e **Ponto de Virada** (**Apogeu** transforma positivamente, com exemplos, e **Queda** arrasa o personagem, com exemplos) (RF015-TL007, RF015-RN015, RF015-CA022)

#### Scenario: Ajuda do Tipo de Evento
- **GIVEN** o painel de edição está aberto na aba **Personagens do Capítulo** com um personagem adicionado
- **WHEN** o escritor passa o mouse ou foca o **?** do campo **Tipo de Evento**
- **THEN** a ajuda explica **Ascensão** e **Declínio** como os acontecimentos do Ponto de Ligação, **Apogeu** e **Queda** com os exemplos do Ponto de Virada e **Neutro** como sem alteração do arco, sem mudar o valor selecionado (RF015-TL007, RF015-RN015, RF015-CA022)

#### Scenario: Personagens do capítulo com evento e motivo
- **GIVEN** o livro tem personagens no elenco
- **WHEN** o escritor adiciona um personagem no capítulo na aba **Personagens do Capítulo**
- **THEN** escolhe **Evento** (Neutro, Ponto de Ligação ou Ponto de Virada), o **Tipo de Evento** compatível e preenche o **Motivo do Evento** abaixo do par, podendo remover o personagem do capítulo (RF015-RN005, RF015-CA008)

#### Scenario: Papel ao lado do nome
- **GIVEN** o livro tem um personagem com **Falso Antagonista** no vínculo e outro com **Não definido**
- **WHEN** o escritor adiciona os dois ao capítulo
- **THEN** a aba **Personagens do Capítulo** mostra **Nome - Falso Antagonista** e **Nome - Não definido**, com o papel somente leitura e sem alterar o vínculo do RF014 (RF015-TL005, RF015-RN016, RF015-CA023)

#### Scenario: Miniatura do retrato antes do nome
- **GIVEN** um personagem do capítulo tem retrato no cadastro global e outro não tem
- **WHEN** o escritor abre a aba **Personagens do Capítulo**
- **THEN** vê a miniatura quadrada do retrato antes do nome de quem tem imagem e, para quem não tem, um quadrado vazio do mesmo tamanho, sem iniciais e sem deslocar os nomes (RF015-TL005, RF015-RN017, RF015-CA024)

#### Scenario: Salvar e reabrir o capítulo
- **GIVEN** o escritor preencheu os campos e salvou
- **WHEN** reabre o mesmo capítulo
- **THEN** os valores continuam gravados, inclusive a **Meta**, o **Motivo do Tipo**, os campos complementares e o **Motivo do Evento** de cada personagem, o capítulo permanece no status escolhido e o card reflete título, tipo e personagens (RF015-FL003, RF015-RN005, RF015-RN007, RF015-CA009, RF015-CA018, RF015-CA019, RF015-CA021, RF015-CA025)

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

### Requirement: Cenário Worldbuilding do capítulo com os mundos do livro
O sistema SHALL preencher o campo **Cenário Worldbuilding** do painel do capítulo com as **Localidades** de todos os mundos associados ao livro, agrupadas por mundo, permitindo adicionar **um ou mais** cenários ao capítulo, SHALL gravar a lista escolhida na ordem de inclusão, SHALL manter o campo desabilitado com o aviso **Nenhum mundo associado a este livro** quando o livro não tiver mundo, e SHALL recusar no domínio qualquer localidade que não pertença a um mundo associado ao livro (RF017-TL009, RF017-FL007, RF017-RN007, RF017-RN015, RF017-CA012, RF017-CA013, RF017-CA023).

#### Scenario: Localidades agrupadas por mundo
- **GIVEN** o livro tem os mundos **Kepler** e **Ravória** associados, ambos com localidades
- **WHEN** o escritor abre a aba **Dados do Capítulo**
- **THEN** o select de cenário lista as localidades agrupadas por mundo e permite adicionar uma delas à lista de cenários do capítulo (RF017-TL009, RF017-CA012)

#### Scenario: Vários cenários no capítulo
- **GIVEN** o livro tem localidades em mais de um mundo associado
- **WHEN** o escritor adiciona dois cenários, salva e reabre o capítulo
- **THEN** os dois cenários continuam gravados, na ordem em que foram adicionados, e podem ser removidos individualmente (RF017-FL007, RF017-RN015, RF017-CA023)

#### Scenario: Cenário gravado e reaberto
- **GIVEN** o escritor escolheu uma localidade de **Ravória** e salvou o capítulo
- **WHEN** reabre o capítulo
- **THEN** o cenário aparece gravado na lista de cenários do capítulo (RF017-FL007, RF017-RN007)

#### Scenario: Sem mundo associado
- **GIVEN** o livro não tem nenhum mundo associado
- **WHEN** o escritor abre o painel do capítulo
- **THEN** o campo continua desabilitado com **Nenhum mundo associado a este livro** (RF017-TL009, RF017-CA012)

#### Scenario: Localidade de mundo não associado
- **GIVEN** o escritor tenta gravar um capítulo com a localidade de um mundo que não está associado ao livro
- **WHEN** a operação chega ao domínio
- **THEN** a gravação é recusada com erro de cenário inválido (RF017-RN007, RF017-CA013)

### Requirement: Caminho da localidade no cenário do capítulo
O campo **Cenário Worldbuilding** do capítulo SHALL exibir cada localidade pelo **caminho completo** dentro da hierarquia, começando pelo mundo (por exemplo, `Kepler › Porto › Centro › Solar`), tanto nas opções de adicionar quanto na lista de cenários selecionados, mantendo o agrupamento por mundo, ocultando a raiz como opção isolada e gravando o identificador de cada localidade (RF018-TL004, RF018-FL006, RF018-CA012, RF018-CA020, RF017-CA023).

#### Scenario: Caminho na opção do cenário
- **GIVEN** o livro tem um mundo associado com a Casa **Solar** dentro do Bairro **Centro** dentro da Cidade **Porto**
- **WHEN** o escritor abre a aba **Dados do Capítulo**
- **THEN** a opção mostra **Kepler › Porto › Centro › Solar** e, ao adicionar e salvar, o capítulo guarda essa localidade na lista de cenários (RF018-TL004, RF018-CA012, RF018-CA020)

#### Scenario: Reabrir o capítulo
- **GIVEN** o capítulo foi salvo com uma localidade aninhada
- **WHEN** o escritor reabre o capítulo
- **THEN** a lista de cenários mostra o mesmo caminho selecionado (RF018-FL006, RF018-CA012)
