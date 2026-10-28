## ADDED Requirements

### Requirement: Capítulos do livro
O sistema SHALL substituir a tela informativa da seção **Capítulos** pelo quadro de planejamento do livro, com as quatro colunas de status **Esboço**, **Rascunho**, **Revisão** e **Finalizado**, cada uma com tamanho fixo, contador, rolagem interna, ordenação por **Número** ou **Data de Criação** (ascendente/descendente) e o botão **Adicionar Capítulo** no rodapé; **Novo Capítulo** no cabeçalho SHALL criar no **Esboço**, os rodapés SHALL criar no status da coluna, o clique em um capítulo SHALL abrir o painel de edição abaixo do quadro com **Salvar** no cabeçalho e os campos **Número**, **Título**, **Status**, **Tipo**, **Meta**, **Foreshadowing**, **Plot Twist**, **Cliffhanger**, **Punch**, **K.O**, **Personagens**, **Cenário Worldbuilding**, **Cenário Descritivo** e **Resumo**, e o arrastar SHALL mudar o status do capítulo (RF015-TL001 a RF015-TL006, RF015-FL001 a RF015-FL005, RF015-RN001 a RF015-RN012, RF015-CA001 a RF015-CA017).

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

#### Scenario: Tipo com ajuda
- **GIVEN** o painel de edição está aberto
- **WHEN** o escritor abre o campo **Tipo**
- **THEN** vê **Não definido**, **Ação Direta**, **Ação Indireta**, **Suspensão Direta** e **Suspensão Indireta**, e o **?** explica Ação/Suspensão/Direto/Indireto (RF015-TL006, RF015-RN004, RF015-CA007)

#### Scenario: Personagens do capítulo com evento
- **GIVEN** o livro tem personagens no elenco
- **WHEN** o escritor adiciona um personagem no capítulo
- **THEN** escolhe **Evento** (Neutro, Ponto de Ligação ou Ponto de Virada) e o **Tipo de Evento** compatível, podendo remover o personagem do capítulo (RF015-RN005, RF015-CA008)

#### Scenario: Salvar e reabrir o capítulo
- **GIVEN** o escritor preencheu os campos e salvou
- **WHEN** reabre o mesmo capítulo
- **THEN** os valores continuam gravados, o capítulo permanece no status escolhido e o card reflete título, tipo e personagens (RF015-FL003, RF015-RN007, RF015-CA009)

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

## MODIFIED Requirements

### Requirement: Seções do livro em requisito posterior
O sistema SHALL manter **Worldbuilding**, **Gráficos** e **Exportar** no menu lateral do livro e SHALL abrir, ao acioná-los, uma tela informativa da seção, sem conteúdo de domínio e sem navegação para tela inexistente; **Personagens** SHALL ser entregue pelo RF014 e **Capítulos** pelo RF015, ambos com seção real (RF011-TL006, RF011-RN010, RF011-CA014, RF014-CA001, RF015-CA001).

#### Scenario: Seção futura informativa
- **GIVEN** a página do livro está aberta
- **WHEN** o escritor clica em **Worldbuilding**, **Gráficos** ou **Exportar**
- **THEN** a seção abre uma tela informativa, sem erro e sem tela em branco (RF011-CA014)

#### Scenario: Personagens e Capítulos fora das seções futuras
- **GIVEN** os RF014 e RF015 estão implementados
- **WHEN** o escritor clica em **Personagens** ou **Capítulos**
- **THEN** a seção abre o elenco ou o quadro de capítulos, não a tela informativa (RF014-CA001, RF015-CA001)

#### Scenario: Sem conteúdo antecipado
- **GIVEN** os RF014 e RF015 estão implementados
- **WHEN** o desenvolvedor inspeciona as seções ainda futuras
- **THEN** não há associação livro–mundo, gráficos nem exportação de livro implementados (RF011-RN010)
