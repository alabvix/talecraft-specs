## ADDED Requirements

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
O sistema SHALL exibir no **Painel do Livro** o título do livro, um subtítulo com os dados preenchidos, quatro métricas zeradas, a grade de módulos e o botão **Dados do livro**, sem dados fictícios do protótipo (RF011-TL003, RF011-CA013, RF011-CA019).

#### Scenario: Painel de um livro recém-criado
- **GIVEN** um livro foi criado apenas com o título
- **WHEN** o escritor abre o **Painel do Livro**
- **THEN** vê o título, as métricas **Personagens**, **Entradas de worldbuilding**, **Capítulos planejados** e **Planejamento concluído** com valor **0**, e os seis módulos (RF011-CA013, RF011-CA018)

#### Scenario: Atalho para Dados do Livro
- **GIVEN** o **Painel do Livro** está aberto
- **WHEN** o escritor clica em **Dados do livro**
- **THEN** a seção **Dados do Livro** é aberta (RF011-FL004, RF011-CA013)

### Requirement: Dados do Livro com Tab Panel
O sistema SHALL exibir a página **Dados do Livro** com o componente reutilizável **Tab Panel**, nesta entrega com a única aba **Dados Gerais**, contendo título, gênero principal, subgêneros, faixa de público, idioma e as ações **Descartar** e **Salvar** (RF011-TL004, RF011-RN012, RF011-FL004, RF011-FL005, RF011-FL009, RF011-CA015).

#### Scenario: Aba Dados Gerais
- **GIVEN** a página Dados do Livro está aberta
- **WHEN** o escritor observa o Tab Panel
- **THEN** a aba **Dados Gerais** está selecionada e o formulário correspondente é exibido (RF011-CA015)

#### Scenario: Listas fechadas
- **GIVEN** a aba **Dados Gerais** está aberta
- **WHEN** o escritor abre os controles de gênero, faixa de público e idioma
- **THEN** vê exatamente as opções previstas no requisito (RF011-CA007, RF011-CA010, RF011-CA011)

#### Scenario: Subgêneros filtrados pelo gênero
- **GIVEN** a aba **Dados Gerais** está aberta
- **WHEN** o escritor escolhe **Ficção Científica**, **Fantasia** ou **Terror**
- **THEN** a seleção múltipla de subgêneros mostra apenas a lista daquele gênero (RF011-CA008)

#### Scenario: Troca de gênero remove subgêneros incompatíveis
- **GIVEN** o escritor marcou subgêneros de **Ficção Científica**
- **WHEN** troca o gênero principal para **Fantasia**
- **THEN** os subgêneros de ficção científica saem da seleção e não são gravados (RF011-CA009)

#### Scenario: Descartar alterações
- **GIVEN** o escritor alterou campos sem salvar
- **WHEN** clica em **Descartar**
- **THEN** os campos voltam aos últimos dados salvos, sem gravar nada (RF011-FL005)

### Requirement: Salvar o livro e os dados gerais
O sistema SHALL validar o título como obrigatório e único sem diferenciar maiúsculas, aceitar os demais campos como opcionais e gravar o livro e os subgêneros em uma transação (RF011-FL002, RF011-RN002 a RF011-RN007, RF011-CA003 a RF011-CA005).

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
