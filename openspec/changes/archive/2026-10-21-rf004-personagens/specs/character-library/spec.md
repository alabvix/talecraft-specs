## ADDED Requirements

### Requirement: Cadastro de personagens globais
O sistema SHALL permitir cadastrar **personagens globais**, entidade de domínio
independente de qualquer livro, com os atributos **Nome, Idade, Retrato,
Personalidade, Força, Fraqueza, Interesses, Raça, Alcunha, Biografia e
Relações**. Apenas o **Nome** é obrigatório; todos os demais são opcionais e
textuais, exceto Relações, que é uma lista de vínculos com outros personagens
(RF004-RN003, RF004-RN004, RF004-CA002).

#### Scenario: Salvar personagem apenas com o Nome
- **GIVEN** o escritor está na tela de detalhe de um personagem novo
- **WHEN** ele preenche somente o campo Nome e aciona Salvar
- **THEN** o personagem é gravado com sucesso no banco, com os demais campos
  vazios (RF004-CA002)

#### Scenario: Salvar personagem com todos os campos
- **GIVEN** o escritor preencheu Nome, Idade, Raça, Alcunha, Personalidade,
  Força, Fraqueza, Interesses e Biografia
- **WHEN** ele aciona Salvar
- **THEN** todos os valores são gravados no registro do personagem
  (RF004-CA001)

### Requirement: Nome obrigatório e único
O sistema SHALL exigir o preenchimento do **Nome** e SHALL impedir a gravação de
**dois personagens com o mesmo nome**, informando o conflito em vez de gravar
(RF004-RN003, RF004-RN005, RF004-CA003).

#### Scenario: Salvar sem Nome é bloqueado
- **GIVEN** o escritor está na tela de detalhe com o campo Nome vazio
- **WHEN** ele aciona Salvar
- **THEN** a gravação não acontece e a aplicação informa que o Nome é
  obrigatório (RF004-CA003)

#### Scenario: Nome repetido é recusado
- **GIVEN** já existe um personagem chamado "Iara Vasquez"
- **WHEN** o escritor tenta salvar outro personagem com o mesmo nome
- **THEN** a gravação é impedida e a aplicação informa que o nome já existe
  (RF004-RN005)

### Requirement: Lista de personagens com busca e visualização
A tela principal de Personagens SHALL listar os personagens cadastrados,
permitindo **alternar entre a exibição em cards e em lista**, **buscar pelo
nome** pela barra de busca e **iniciar a inclusão de um novo personagem**
(RF004-TL001, RF004-CA004, RF004-CA005, RF004-CA006).

#### Scenario: Alternar entre cards e lista
- **GIVEN** a tela principal de Personagens está aberta com personagens
  cadastrados
- **WHEN** o escritor alterna o modo de exibição
- **THEN** os personagens são apresentados em cards ou em lista, conforme a
  escolha (RF004-CA004)

#### Scenario: Buscar personagem pelo nome
- **GIVEN** existem personagens cadastrados com nomes distintos
- **WHEN** o escritor digita parte de um nome na barra de busca
- **THEN** a lista exibe somente os personagens cujo nome corresponde ao texto,
  ignorando diferenças entre maiúsculas e minúsculas (RF004-CA006)

#### Scenario: Iniciar a inclusão de um personagem
- **GIVEN** a tela principal de Personagens está aberta
- **WHEN** o escritor aciona a opção de novo personagem
- **THEN** a tela de detalhe é aberta vazia, pronta para o cadastro
  (RF004-CA005)

### Requirement: Tela de detalhe do personagem
A tela de detalhe SHALL exibir e permitir **editar os dados do personagem**,
oferecendo Salvar as alterações, e SHALL ser a mesma tela usada para um
personagem recém-criado (RF004-TL002, RF004-CA008).

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

### Requirement: Vínculos e arco por livro fora do escopo
A tela de detalhe SHALL exibir o card de **Vínculos com Livros** e a seção de
**Curva de Arco em cada livro** **sem dados**, e a tela principal SHALL exibir o
campo **Filtrar por livro** **sem nenhuma opção de livro**, pois a associação
entre personagem e livro pertence a requisito posterior (RF004-CA009,
RF004-CA010, RF004-CA022).

#### Scenario: Vínculos e curva aparecem vazios
- **GIVEN** a tela de detalhe de um personagem está aberta
- **WHEN** o escritor observa o card de Vínculos com Livros e a seção de Curva
  de Arco
- **THEN** ambos são exibidos sem dados, conforme o protótipo, sem erro
  (RF004-CA009)

#### Scenario: Filtro por livro sem opções
- **GIVEN** a tela principal de Personagens está aberta
- **WHEN** o escritor abre o campo Filtrar por livro
- **THEN** não há nenhum livro disponível para seleção (RF004-CA010)

### Requirement: Retrato do personagem
O sistema SHALL permitir associar **um retrato** ao personagem, guardando o
caminho do arquivo no registro. A associação SHALL ser permitida **somente
depois que o personagem existe no banco**, e o arquivo escolhido SHALL ser
**copiado para um local de dados do aplicativo**, permanecendo disponível entre
execuções. Arquivos de imagem **até 4 MB** SHALL ser aceitos; arquivos maiores ou
de formato não suportado SHALL ser **recusados com mensagem útil**, sem travar a
aplicação. Um personagem sem retrato SHALL exibir um espaço reservado
(RF004-RN002, RF004-CA016, RF004-CA017, RF004-CA018).

#### Scenario: Associar retrato a personagem salvo
- **GIVEN** um personagem já salvo no banco está aberto na tela de detalhe
- **WHEN** o escritor escolhe um arquivo de imagem como retrato
- **THEN** o arquivo é copiado para o local de dados do aplicativo, o caminho é
  gravado no personagem e a imagem passa a ser exibida (RF004-CA016,
  RF004-CA017)

#### Scenario: Retrato permanece após reabrir
- **GIVEN** um personagem tem um retrato associado
- **WHEN** a aplicação é fechada e reaberta
- **THEN** o retrato continua sendo exibido para o personagem (RF004-CA017)

#### Scenario: Arquivo acima de 4 MB é recusado
- **GIVEN** o escritor escolhe um arquivo de imagem maior que 4 MB
- **WHEN** ele tenta associá-lo como retrato
- **THEN** a associação é recusada com uma mensagem útil e a aplicação continua
  funcionando (RF004-CA018)

#### Scenario: Personagem sem retrato usa espaço reservado
- **GIVEN** um personagem não tem retrato associado
- **WHEN** ele é exibido na lista ou no detalhe
- **THEN** a aplicação mostra um espaço reservado no lugar da imagem
  (RF004-CA016)

### Requirement: Relações entre personagens
O sistema SHALL permitir registrar **relações direcionadas** entre personagens,
cada uma com um **tipo** escolhido entre os oito valores previstos — **Rival,
Mentor, Inimigo, Filho/Filha, Mãe/Pai, Aliado, Cônjuge e Namorado** —, sem
permitir texto livre, **autorrelação** nem **duas relações para o mesmo par** de
personagens (RF004-RN006, RF004-RN007, RF004-RN008, RF004-TL003).

#### Scenario: Registrar uma relação
- **GIVEN** existem dois personagens salvos no banco
- **WHEN** o escritor seleciona o outro personagem e escolhe um dos oito tipos
- **THEN** a relação é gravada e passa a aparecer nas relações do personagem
  (RF004-CA014)

#### Scenario: Tipo de relação restrito aos oito previstos
- **GIVEN** o escritor está definindo uma relação
- **WHEN** ele escolhe o tipo
- **THEN** as opções disponíveis são exatamente Rival, Mentor, Inimigo,
  Filho/Filha, Mãe/Pai, Aliado, Cônjuge e Namorado (RF004-RN006)

#### Scenario: Relação de um personagem consigo mesmo é impedida
- **GIVEN** o escritor está definindo uma relação do personagem atual
- **WHEN** ele tenta selecionar o próprio personagem
- **THEN** essa opção não é aceita, pois não há autorrelação (RF004-RN007)

#### Scenario: Par já relacionado é atualizado, não duplicado
- **GIVEN** já existe uma relação entre dois personagens
- **WHEN** o escritor define novamente uma relação para o mesmo par
- **THEN** a relação existente é atualizada em vez de criar uma segunda
  (RF004-RN008)

### Requirement: Painel e modal de relações
A tela de detalhe SHALL exibir o painel de **Relações Globais** com os
personagens relacionados do personagem atual, e o botão **Gerenciar Relações**
SHALL abrir uma **janela modal** que lista os personagens cadastrados com uma
**versão reduzida da imagem, quando existir**, o nome e o seletor de nível de
relação. A modal SHALL oferecer um **campo de busca** para filtrar os personagens
pelo nome (RF004-TL002, RF004-TL003, RF004-CA011, RF004-CA012, RF004-CA013,
RF004-CA014).

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
  nome e o seletor com os oito tipos de relação (RF004-CA013)

#### Scenario: Buscar personagem na modal
- **GIVEN** a janela modal de Relações está aberta com vários personagens
- **WHEN** o escritor digita parte de um nome no campo de busca da modal
- **THEN** a tabela exibe somente os personagens cujo nome corresponde ao texto
  (RF004-CA014)

### Requirement: Relações exigem personagem salvo
O botão de adicionar relação SHALL permanecer **desabilitado enquanto o
personagem não estiver salvo** no banco de dados (RF004-RN001, RF004-CA015).

#### Scenario: Personagem novo não oferece relações
- **GIVEN** o escritor está na tela de detalhe de um personagem ainda não salvo
- **WHEN** ele observa a opção de adicionar relação
- **THEN** ela está desabilitada, pois a relação exige um personagem existente
  no banco (RF004-RN001, RF004-CA015)

#### Scenario: Após salvar, a opção de relação é habilitada
- **GIVEN** o escritor salvou o personagem que estava criando
- **WHEN** ele observa novamente a opção de adicionar relação
- **THEN** ela está habilitada (RF004-CA015)

### Requirement: Exclusão de personagens fora do escopo
Este requisito SHALL **não** excluir personagens: não existe operação de exclusão
neste momento, e nenhum personagem é removido nesta etapa (RF004-RN009).

#### Scenario: Nenhuma operação de exclusão disponível
- **GIVEN** as telas de personagens estão em uso
- **WHEN** o escritor observa as ações disponíveis
- **THEN** não há ação de excluir personagem, pois a exclusão está fora do
  escopo deste requisito (RF004-RN009)

### Requirement: Persistência de personagens e relações
Personagens e relações SHALL ser gravados no **banco SQLite** e SHALL
permanecer disponíveis após **fechar e reabrir** a aplicação (RF004-CA001,
RF004-CA019).

#### Scenario: Personagens permanecem após reabrir
- **GIVEN** existem personagens cadastrados
- **WHEN** a aplicação é fechada e reaberta
- **THEN** os personagens continuam disponíveis, com seus dados e relações
  (RF004-CA019)

### Requirement: Comandos Tauri para personagens
As operações de personagens e relações SHALL ser executadas pelo **back-end
Rust** e expostas ao React por **comandos Tauri**, sem SQL na interface
(RF004-CA021).

#### Scenario: Front-end usa comandos, não SQL
- **GIVEN** o front-end precisa listar, gravar ou associar retrato a personagens
- **WHEN** ele realiza a operação
- **THEN** isso acontece por comandos Tauri executados no back-end Rust, sem
  SQL escrito na interface React (RF004-CA021)

### Requirement: Testes automatizados dos personagens
O projeto SHALL incluir **testes automatizados** cobrindo criação, leitura,
atualização, validação do Nome obrigatório e gravação de relações
(RF004-CA023).

#### Scenario: Testes cobrem o ciclo do personagem
- **GIVEN** o projeto é compilado para testes
- **WHEN** os testes do back-end são executados
- **THEN** existem testes de criação, leitura, atualização, nome obrigatório e
  gravação de relações, e todos passam (RF004-CA023)

### Requirement: Sem regressão de tema e navegação
As telas de personagens SHALL respeitar o **tema ativo** e SHALL manter a
**navegação** e o **splash** estabelecidos nos requisitos anteriores
(RF004-CA024).

#### Scenario: Telas de personagens seguem o tema
- **GIVEN** o escritor está em uma tela de personagens
- **WHEN** ele troca o tema ativo
- **THEN** as telas de personagens acompanham o tema, sem cores fixas, e a
  navegação e o splash continuam funcionando (RF004-CA024)
