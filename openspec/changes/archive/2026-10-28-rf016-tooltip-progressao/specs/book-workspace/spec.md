## MODIFIED Requirements

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
