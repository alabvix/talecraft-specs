## MODIFIED Requirements

### Requirement: Dados do Livro com Tab Panel
O sistema SHALL exibir a página **Dados do Livro** com o componente reutilizável **Tab Panel**, com as abas **Dados Gerais**, **Resumo**, **Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo** nesta ordem e **Dados Gerais** selecionada ao abrir; a aba **Dados Gerais** SHALL conter título, gênero principal, subgêneros, faixa de público, idioma e o período da história (**De** e **Até**), com **De** e **Até** lado a lado e aceitando somente dígitos, embora o período seja gravado como texto; valores legados em texto livre SHALL ser exibidos intactos, sinalizados e convertidos apenas por ação explícita do escritor, sem filtro destrutivo no primeiro caractere digitado; a página SHALL ter somente a ação **Salvar**, sem o botão **Descartar** nem ação equivalente; a lista de subgêneros de **Fantasia** SHALL conter **Alta Fantasia**, **Fantasia Sombria**, **Distopia**, **Fantasia Urbana**, **Romantasia**, **Gótico**, **Baixa Fantasia**, **Grindark**, **Mitológica**, **Histórica**, **Científica** e **Espada e Feitiçaria**; a seleção de subgêneros SHALL ser preservada por gênero enquanto o livro não for salvo, e ao voltar a um gênero os subgêneros já marcados — inclusive os salvos — SHALL reaparecer selecionados (RF011-TL004, RF011-RN004, RF011-RN012, RF011-RN018, RF012-TL001, RF012-TL003, RF012-RN005, RF013-TL001, RF011-FL004, RF011-FL009, RF011-CA008, RF011-CA009, RF011-CA015, RF011-CA023, RF012-CA001, RF012-CA006, RF013-CA001).

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
- **THEN** vê os campos **De** e **Até** lado a lado, como texto curto e opcionais (RF011-RN018, RF011-CA023)

#### Scenario: Período aceita somente dígitos
- **GIVEN** a aba **Dados Gerais** está aberta
- **WHEN** o escritor digita ou cola letras, espaços ou sinais em **De** ou **Até**
- **THEN** o campo mantém somente os dígitos do valor informado e o texto permanece opcional (RF011-RN018, RF011-CA023)

#### Scenario: Período legado preservado na edição
- **GIVEN** um livro gravado antes do ajuste com **De** “Século XXII” e **Até** “1921–1923”
- **WHEN** o escritor abre **Dados Gerais** e edita um dos campos
- **THEN** os valores antigos continuam exibidos e sinalizados, o texto não é apagado pela digitação e o aviso oferece **Usar 1921**, **Usar 1923** e **Limpar** (RF011-RN018)

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
O sistema SHALL validar o título como obrigatório e único sem diferenciar maiúsculas, aceitar os demais campos como opcionais e gravar o livro, os subgêneros, o período da história, os textos das abas, as listas de voz narrativa e o humor em uma transação; período legado em texto livre SHALL ser preservado inalterado ao salvar, com aviso de que precisa ser ajustado, sem bloquear a gravação dos demais dados (RF011-FL002, RF011-RN002 a RF011-RN007, RF011-RN018, RF012-RN003, RF013-RN003, RF013-RN004, RF013-CA007, RF013-CA009).

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

#### Scenario: Período legado preservado ao salvar
- **GIVEN** um livro com período em texto livre, anterior ao ajuste numérico
- **WHEN** o escritor clica em **Salvar** sem corrigir o período
- **THEN** o texto antigo é preservado inalterado e um aviso informa que o período precisa ser ajustado para apenas números (RF011-RN018, RF011-CA023)

#### Scenario: Salvar todas as abas
- **GIVEN** o escritor preencheu campos em **Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo**
- **WHEN** clica em **Salvar** estando em qualquer aba
- **THEN** os campos de todas as abas são gravados juntos (RF013-FL004, RF013-CA009)

#### Scenario: Rascunho descartado ao sair
- **GIVEN** o livro está em modo de criação sem nunca ter sido salvo
- **WHEN** o escritor clica em **Trocar livro** ou em **Início — Sair do livro**
- **THEN** nenhum registro é criado e a tela Meus Livros é exibida (RF011-RN008, RF011-CA020)
