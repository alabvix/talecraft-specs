## MODIFIED Requirements

### Requirement: Painel do Livro
O sistema SHALL exibir no **Painel do Livro** o título do livro, um subtítulo com os dados preenchidos, quatro métricas zeradas, a grade de módulos na ordem **Dados do Livro**, **Personagens**, **Capítulos**, **Worldbuilding**, **Gráficos** e **Exportar**, e o botão **Dados do livro**, sem dados fictícios do protótipo, e SHALL exibir, logo abaixo de **Módulos deste livro**, o painel **Curva de Progressão por Capítulo** com o mesmo gráfico da seção **Gráficos** e, sem capítulos, o aviso **Ainda não existem dados** (RF011-TL003, RF011-CA013, RF011-CA019, RF011-CA023, RF016-TL006, RF016-RN011, RF016-CA016).

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

#### Scenario: Curva de Progressão no Painel com capítulos
- **GIVEN** o livro tem capítulos com tipos variados
- **WHEN** o escritor abre o **Painel do Livro**
- **THEN** vê, abaixo dos módulos, o painel **Curva de Progressão por Capítulo** com a mesma curva da seção Gráficos, os badges de ações e progresso, sem duplicar dados (RF016-TL006, RF016-RN011, RF016-CA016)

#### Scenario: Curva de Progressão no Painel sem capítulos
- **GIVEN** o livro não tem capítulos
- **WHEN** o escritor abre o **Painel do Livro**
- **THEN** o painel **Curva de Progressão por Capítulo** permanece visível e informa **Ainda não existem dados**, sem gráfico quebrado (RF016-TL006, RF016-RN011, RF016-CA016)
