# character-library (delta do RF005)

## MODIFIED Requirements

### Requirement: Relações entre personagens
O sistema SHALL permitir registrar **relações bidirecionais** entre personagens,
cada uma com um **tipo** escolhido entre os **dez** valores previstos — **Rival,
Mentor, Aprendiz, Inimigo, Filho/Filha, Mãe/Pai, Irmão/Irmã, Aliado, Cônjuge e
Namorado** —, sem permitir texto livre, **autorrelação** nem **duas relações para
o mesmo par** de personagens. Ao gravar uma relação A→B, o sistema SHALL gravar
automaticamente o **par espelhado** B→A com o tipo correspondente, conforme a
tabela de espelho, e SHALL **recusar** uma relação familiar que criaria **ciclo
de ascendência** (RF005-RN001, RF005-RN002, RF005-RN003, RF005-RN004,
RF005-RN005, RF005-TL001).

#### Scenario: Registrar uma relação
- **GIVEN** existem dois personagens salvos no banco
- **WHEN** o escritor seleciona o outro personagem e escolhe um dos dez tipos
- **THEN** a relação é gravada e passa a aparecer nas relações do personagem
  (RF004-CA014)

#### Scenario: Tipo de relação restrito aos dez previstos
- **GIVEN** o escritor está definindo uma relação
- **WHEN** ele escolhe o tipo
- **THEN** as opções disponíveis são exatamente Rival, Mentor, Aprendiz,
  Inimigo, Filho/Filha, Mãe/Pai, Irmão/Irmã, Aliado, Cônjuge e Namorado
  (RF005-RN001, RF005-CA001)

#### Scenario: Relação de um personagem consigo mesmo é impedida
- **GIVEN** o escritor está definindo uma relação do personagem atual
- **WHEN** ele tenta selecionar o próprio personagem
- **THEN** essa opção não é aceita, pois não há autorrelação (RF004-RN007)

#### Scenario: Par já relacionado é atualizado, não duplicado
- **GIVEN** já existe uma relação entre dois personagens
- **WHEN** o escritor define novamente uma relação para o mesmo par
- **THEN** a relação existente é atualizada em vez de criar uma segunda, e o par
  espelhado é atualizado junto, mantendo a coerência (RF004-RN008,
  RF005-CA006)

#### Scenario: Par espelhado de relação assimétrica
- **GIVEN** existem os personagens Ofélia e Esther, ambos salvos
- **WHEN** o escritor grava Ofélia como **Filho/Filha** de Esther
- **THEN** o sistema grava automaticamente Esther como **Mãe/Pai** de Ofélia
  (RF005-RN003, RF005-CA002)

#### Scenario: Par espelhado de relação simétrica
- **GIVEN** existem os personagens Ofélia e Kael, ambos salvos
- **WHEN** o escritor grava Ofélia como **Rival** de Kael
- **THEN** o sistema grava automaticamente Kael como **Rival** de Ofélia, e o
  mesmo vale para Irmão/Irmã, Inimigo, Aliado, Cônjuge e Namorado
  (RF005-RN003, RF005-CA003)

#### Scenario: Par espelhado de Mentor
- **GIVEN** existem dois personagens salvos, A e B
- **WHEN** o escritor grava A como **Mentor** de B
- **THEN** o sistema grava automaticamente B como **Aprendiz** de A
  (RF005-RN003, RF005-CA004)

#### Scenario: Ciclo de ascendência é recusado
- **GIVEN** já existe A como **Filho/Filha** de B
- **WHEN** o escritor tenta gravar B como **Filho/Filha** de A
- **THEN** a gravação é recusada com uma mensagem útil e a aplicação continua
  funcionando (RF005-RN005, RF005-CA007)

### Requirement: Painel e modal de relações
A tela de detalhe SHALL exibir o painel de **Relações Globais** com os
personagens relacionados do personagem atual — cada um com o **seu lado do par**
espelhado —, e o botão **Gerenciar Relações** SHALL abrir uma **janela modal** que
lista os personagens cadastrados com uma **versão reduzida da imagem, quando
existir**, o nome e o seletor de nível de relação. A modal SHALL oferecer um
**campo de busca** para filtrar os personagens pelo nome (RF005-TL001,
RF005-CA001, RF005-CA005, RF004-CA011, RF004-CA012, RF004-CA013, RF004-CA014).

#### Scenario: Abrir o painel de relações
- **GIVEN** a tela de detalhe de um personagem está aberta
- **WHEN** o escritor observa o painel de Relações Globais
- **THEN** o painel lista os personagens relacionados do personagem atual
  (RF004-CA011)

#### Scenario: Abrir a modal de gerenciar relações
- **GIVEN** a tela de detalhe de um personagem está aberta
- **WHEN** o escritor aciona Gerenciar Relações
- **THEN** a janela modal de Relações de Personagem é aberta (RF004-CA012)

#### Scenario: Modal lista personagens com miniatura e seletor
- **GIVEN** a janela modal de Relações está aberta
- **WHEN** o escritor observa a tabela de personagens
- **THEN** cada linha mostra a versão reduzida da imagem (quando existir), o
  nome e o seletor com os dez tipos de relação (RF005-CA001)

#### Scenario: Buscar personagem na modal
- **GIVEN** a janela modal de Relações está aberta com vários personagens
- **WHEN** o escritor digita parte de um nome no campo de busca da modal
- **THEN** a tabela exibe somente os personagens cujo nome corresponde ao texto
  (RF004-CA014)

#### Scenario: O par aparece nas duas telas de detalhe
- **GIVEN** Ofélia foi gravada como Filho/Filha de Esther
- **WHEN** o escritor abre a tela de detalhe de Esther
- **THEN** Ofélia aparece como Filho/Filha de Esther; e na tela de Ofélia,
  Esther aparece como Mãe/Pai (RF005-CA005)

### Requirement: Tela de detalhe do personagem
A tela de detalhe SHALL exibir e permitir **editar os dados do personagem**,
oferecendo Salvar as alterações, e SHALL ser a mesma tela usada para um
personagem recém-criado. A tela SHALL exibir o quadro **Família** **abaixo** do
quadro de Relações Globais, com a árvore familiar (RF004-TL002, RF004-CA008,
RF005-TL002, RF005-CA008).

#### Scenario: Abrir o detalhe pelo card ou pelo nome
- **GIVEN** a tela principal de Personagens está exibindo personagens
- **WHEN** o escritor clica em um card, ou no nome do personagem na exibição em
  lista
- **THEN** a tela de detalhe do personagem selecionado é aberta (RF004-CA007)

#### Scenario: Editar e salvar o personagem
- **GIVEN** a tela de detalhe de um personagem existente está aberta
- **WHEN** o escritor altera um campo e aciona Salvar
- **THEN** a alteração é gravada e permanece após fechar e reabrir a aplicação
  (RF004-CA008, RF004-CA019)

#### Scenario: Quadro Família aparece abaixo das Relações Globais
- **GIVEN** a tela de detalhe de um personagem está aberta
- **WHEN** o escritor observa a coluna dos quadros
- **THEN** o quadro Família aparece logo abaixo do quadro de Relações Globais
  (RF005-TL002, RF005-CA008)

### Requirement: Testes automatizados dos personagens
O projeto SHALL incluir **testes automatizados** cobrindo criação, leitura,
atualização, validação do Nome obrigatório, gravação de relações, o
**espelhamento de cada tipo**, a **recusa de ciclo** e a **montagem da árvore
familiar** (RF004-CA023, RF005-CA017).

#### Scenario: Testes cobrem o ciclo do personagem
- **GIVEN** o projeto é compilado para testes
- **WHEN** os testes do back-end são executados
- **THEN** existem testes de criação, leitura, atualização, nome obrigatório,
  gravação de relações, espelhamento, recusa de ciclo e montagem da árvore, e
  todos passam (RF004-CA023, RF005-CA017)

### Requirement: Sem regressão de tema e navegação
As telas de personagens SHALL respeitar o **tema ativo** e SHALL manter a
**navegação**, o **splash** e a **busca** estabelecidos nos requisitos anteriores
(RF004-CA024, RF005-CA016).

#### Scenario: Telas de personagens seguem o tema
- **GIVEN** o escritor está em uma tela de personagens
- **WHEN** ele troca o tema ativo
- **THEN** as telas de personagens acompanham o tema, sem cores fixas, e a
  navegação e o splash continuam funcionando (RF004-CA024, RF005-CA016)

#### Scenario: Tema e navegação sem regressão após o RF005
- **GIVEN** o escritor percorre a tela de Personagens e a de detalhe
- **WHEN** ele alterna cards/lista, usa a busca e troca o tema
- **THEN** tudo continua funcionando como no RF004 (RF005-CA016)

## ADDED Requirements

### Requirement: Tabela de espelho das relações
O sistema SHALL usar uma **tabela de espelho fixa** para determinar o tipo
gravado na volta de cada relação. Os pares **assimétricos** são `Filho/Filha ⇄
Mãe/Pai` e `Mentor ⇄ Aprendiz`; os pares **simétricos**, que espelham a si
mesmos, são `Rival`, `Inimigo`, `Aliado`, `Irmão/Irmã`, `Cônjuge` e `Namorado`
(RF005-RN003).

#### Scenario: Espelho de Filho/Filha
- **GIVEN** o escritor grava A como Filho/Filha de B
- **WHEN** o sistema calcula o espelho
- **THEN** o tipo gravado na volta é Mãe/Pai (RF005-RN003, RF005-CA002)

#### Scenario: Espelho de Mentor
- **GIVEN** o escritor grava A como Mentor de B
- **WHEN** o sistema calcula o espelho
- **THEN** o tipo gravado na volta é Aprendiz (RF005-RN003, RF005-CA004)

#### Scenario: Espelho de tipo simétrico
- **GIVEN** o escritor grava A como Aliado de B
- **WHEN** o sistema calcula o espelho
- **THEN** o tipo gravado na volta também é Aliado (RF005-RN003, RF005-CA003)

### Requirement: Sentido da aresta familiar
Em uma relação `Filho/Filha` gravada de A para B, o sistema SHALL considerar que
**A é filho/filha de B** e, pelo espelho, que **B é mãe/pai de A** (RF005-RN004).

#### Scenario: Ofélia é filha de Esther
- **GIVEN** o escritor grava Ofélia como Filho/Filha de Esther
- **WHEN** o sistema interpreta a aresta
- **THEN** Ofélia é a filha e Esther é a mãe/pai (RF005-RN004, RF005-CA002)

#### Scenario: O tipo escolhido na modal descreve o outro personagem
- **GIVEN** o escritor abre a modal de relações da ficha de Esther e escolhe
  "Filho/Filha" para o personagem Daima
- **WHEN** a relação é gravada
- **THEN** Daima fica registrado como **filho/filha de Esther** e, pelo espelho,
  Esther aparece como **Mãe/Pai** na ficha de Daima — a escolha **não** SHALL
  gravar Esther como filha de Daima (RF005-RN004, RF005-CA005)

### Requirement: Sem linhagem circular
O sistema SHALL **recusar** a gravação de uma relação familiar que criaria
**ciclo de ascendência**, informando o motivo com uma mensagem útil e sem travar a
aplicação (RF005-RN005).

#### Scenario: Ciclo direto é recusado
- **GIVEN** já existe A como Filho/Filha de B
- **WHEN** o escritor tenta gravar B como Filho/Filha de A
- **THEN** a gravação é recusada com mensagem útil (RF005-RN005, RF005-CA007)

#### Scenario: Ciclo indireto é recusado
- **GIVEN** existem A como Filho/Filha de B e B como Filho/Filha de C
- **WHEN** o escritor tenta gravar C como Filho/Filha de A
- **THEN** a gravação é recusada com mensagem útil, pois fecharia um ciclo
  (RF005-RN005, RF005-CA007)

#### Scenario: Gravação válida não é afetada
- **GIVEN** existem A como Filho/Filha de B e B como Filho/Filha de C
- **WHEN** o escritor grava D como Filho/Filha de C
- **THEN** a gravação é aceita, pois não cria ciclo (RF005-RN005)

### Requirement: Quadro Família no detalhe
A tela de Detalhe de Personagem SHALL exibir o quadro **Família**, assim como os
demais quadros do protótipo, e SHALL exibir uma **mensagem de estado vazio**
quando o personagem não tiver nenhuma relação familiar, sem quebrar a tela
(RF005-TL002, RF005-CA008, RF005-CA014).

#### Scenario: Quadro Família presente
- **GIVEN** a tela de detalhe de um personagem está aberta
- **WHEN** o escritor observa os quadros da tela
- **THEN** o quadro Família está presente, abaixo de Relações Globais
  (RF005-TL002, RF005-CA008)

#### Scenario: Personagem sem relação familiar
- **GIVEN** um personagem não tem nenhuma relação familiar
- **WHEN** a tela de detalhe dele é aberta
- **THEN** o quadro Família exibe uma mensagem de estado vazio, sem erro
  (RF005-CA014)

### Requirement: Árvore familiar do personagem
O quadro Família SHALL desenhar a **árvore familiar** a partir das relações
**familiares** do personagem — `Filho/Filha`, `Mãe/Pai`, `Irmão/Irmã` e
`Cônjuge` —, com **ascendentes acima** e **descendentes abaixo** do personagem
(RF005-RN006, RF005-CA009, RF005-CA013).

#### Scenario: Árvore usa só relações familiares
- **GIVEN** o personagem tem relações familiares e não familiares
- **WHEN** a árvore é montada
- **THEN** apenas as relações Filho/Filha, Mãe/Pai, Irmão/Irmã e Cônjuge entram
  na árvore; as demais não (RF005-RN006, RF005-CA009)

#### Scenario: Ascendentes acima e descendentes abaixo
- **GIVEN** o personagem tem mãe/pai e filhos cadastrados
- **WHEN** a árvore é desenhada
- **THEN** a mãe/pai aparece acima e os filhos abaixo do personagem
  (RF005-CA009)

#### Scenario: Linhagem completa
- **GIVEN** o personagem tem avós e netos alcançáveis por relações familiares
- **WHEN** a árvore é desenhada
- **THEN** todos os ascendentes e descendentes alcançáveis aparecem, não apenas
  mãe/pai e filhos diretos (RF005-RN009, RF005-CA013)

### Requirement: Irmãos e ascendente ausente na árvore
A árvore SHALL posicionar os personagens ligados por **Irmão/Irmã** **lado a
lado, no mesmo nível**, SHALL tratar o tipo **declarado** como fonte da verdade
para a irmandade — sem deduzi-la de uma mãe/pai em comum — e SHALL exibir um nó
**"?"** acima dos irmãos quando eles **não tiverem mãe/pai cadastrado**,
representando o ascendente ausente (RF005-RN007, RF005-CA010, RF005-CA011).

#### Scenario: Irmãos ficam lado a lado
- **GIVEN** dois personagens estão ligados por Irmão/Irmã
- **WHEN** a árvore é desenhada
- **THEN** eles aparecem lado a lado, no mesmo nível (RF005-CA010)

#### Scenario: Irmandade declarada sem mãe/pai
- **GIVEN** A e B estão ligados por Irmão/Irmã e nenhum deles tem mãe/pai
  cadastrado
- **WHEN** a árvore é desenhada
- **THEN** aparece um nó "?" acima deles, representando o ascendente ausente
  (RF005-RN007, RF005-CA011)

#### Scenario: Irmandade declarada prevalece
- **GIVEN** A e B estão ligados por Irmão/Irmã, mas têm mães/pais distintos
  cadastrados
- **WHEN** a árvore é desenhada
- **THEN** eles continuam aparecendo como irmãos, pois a irmandade declarada é
  a fonte da verdade (RF005-RN007)

### Requirement: Cônjuge como parceiro na árvore
A árvore SHALL representar o **Cônjuge** no **mesmo nível** do personagem,
ligado por uma **linha de união**, com os **descendentes** posicionados abaixo do
casal (RF005-RN008, RF005-CA012).

#### Scenario: Cônjuge no mesmo nível
- **GIVEN** o personagem tem um Cônjuge cadastrado
- **WHEN** a árvore é desenhada
- **THEN** o cônjuge aparece no mesmo nível, ligado por uma linha de união
  (RF005-RN008, RF005-CA012)

#### Scenario: Filhos abaixo do casal
- **GIVEN** o personagem e o cônjuge têm filhos cadastrados
- **WHEN** a árvore é desenhada
- **THEN** os filhos aparecem abaixo do casal (RF005-CA012)
