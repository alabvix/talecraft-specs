## ADDED Requirements

### Requirement: Localidades com imagem, tipo e hierarquia
O sistema SHALL exibir a categoria **Localidades** como uma **árvore expansível** — cada nó com miniatura da imagem (ou quadrado vazio), **Nome**, **Tipo** e contador de filhos, raízes no primeiro nível, filhos indentados e ordem alfabética por nível —, SHALL permitir **Nova Localidade** e **Editar**, e a janela da localidade SHALL ter **Tipo da Localidade** (lista fechada de 49 valores em ordem alfabética + **Não definido**), **Imagem** (JPG/PNG/WEBP até 4 MB, copiada para `<app_data_dir>/localidades/`) e **Fica dentro de** (localidade pai do mesmo mundo, opcional), recusando ciclos no domínio (RF018-TL001 a RF018-TL003, RF018-FL001 a RF018-FL005, RF018-RN001 a RF018-RN009, RF018-CA001 a RF018-CA011).

#### Scenario: Árvore com vários níveis
- **GIVEN** o mundo tem a Cidade **Porto**, o Bairro **Centro** dentro dela e a Casa **Solar** dentro do bairro
- **WHEN** o escritor abre a aba **Localidades**
- **THEN** vê **Porto** no primeiro nível, **Centro** indentada abaixo e **Solar** no nível seguinte (RF018-TL001, RF018-CA001, RF018-CA002)

#### Scenario: Nó com vários filhos
- **GIVEN** a Cidade **Porto** contém a Taverna **O Lobo** e a Loja **Armazém do Sal**
- **WHEN** o escritor observa o nó **Porto**
- **THEN** as duas sublocalidades aparecem abaixo dele, em ordem alfabética, e o contador mostra **2** (RF018-RN003, RF018-RN005, RF018-CA002, RF018-CA003)

#### Scenario: Expandir e recolher
- **GIVEN** a árvore está expandida
- **WHEN** o escritor clica na seta de **Porto**
- **THEN** a subárvore é recolhida e, ao clicar de novo, expandida, sem gravar nada (RF018-TL001, RF018-FL003, RF018-CA004)

#### Scenario: Tipo da localidade
- **GIVEN** a janela de nova localidade está aberta
- **WHEN** o escritor abre o campo **Tipo da Localidade**
- **THEN** vê os 49 tipos previstos, em ordem alfabética, mais **Não definido**, que vem selecionado (RF018-TL002, RF018-RN002, RF018-CA005)

#### Scenario: Imagem válida
- **GIVEN** a localidade já está salva
- **WHEN** o escritor envia um PNG de 1 MB
- **THEN** o arquivo é copiado para `localidades/`, a prévia aparece na modal e a miniatura aparece na árvore (RF018-TL002, RF018-TL003, RF018-RN001, RF018-CA006, RF018-CA007)

#### Scenario: Imagem inválida
- **GIVEN** a janela de localidade está aberta
- **WHEN** o escritor escolhe um arquivo de 5 MB ou um PDF
- **THEN** a aplicação recusa com mensagem útil e nada é copiado (RF018-RN001, RF018-CA006)

#### Scenario: Localidade sem imagem
- **GIVEN** uma localidade não tem imagem
- **WHEN** o escritor observa a árvore
- **THEN** vê um quadrado vazio do mesmo tamanho, sem iniciais (RF018-TL003, RF018-CA007)

#### Scenario: Escolher o pai
- **GIVEN** o mundo tem **Porto** e **Centro** (dentro de Porto)
- **WHEN** o escritor edita **Centro** e abre **Fica dentro de**
- **THEN** a lista mostra as localidades do mesmo mundo com o caminho, a opção **Nenhuma (raiz)** e não mostra **Centro** nem os seus descendentes (RF018-TL002, RF018-CA008)

#### Scenario: Ciclo recusado
- **GIVEN** **Porto** contém **Centro**
- **WHEN** o escritor tenta colocar **Porto** dentro de **Centro**
- **THEN** o domínio recusa a gravação com erro próprio e a árvore não muda (RF018-RN004, RF018-FL005, RF018-CA009)

#### Scenario: Mover uma subárvore
- **GIVEN** **Centro** tem a Casa **Solar** dentro
- **WHEN** o escritor muda o pai de **Centro** para outra cidade
- **THEN** **Centro** e **Solar** passam juntos para o novo nível (RF018-FL002, RF018-CA010)

#### Scenario: Pai de outro mundo
- **GIVEN** existem dois mundos com localidades
- **WHEN** o escritor tenta usar como pai uma localidade de outro mundo
- **THEN** o domínio recusa e nada é gravado (RF018-RN003, RF018-CA011)

#### Scenario: Outras categorias continuam em tabela
- **GIVEN** o mundo tem Raças e Povos, Artefatos e Sistemas
- **WHEN** o escritor abre essas categorias
- **THEN** elas continuam na tabela paginada com paginação e **Editar** (RF018-RN007, RF018-CA014)

#### Scenario: Localidade antiga após a migração
- **GIVEN** um banco v18 com uma localidade sem tipo nem imagem
- **WHEN** o banco migra para a v19
- **THEN** a localidade fica com **Não definido**, sem imagem e na raiz, e os tipos novos passam a ser aceitos (RF018-RN002, RF018-RN006, RF018-CA015)

## MODIFIED Requirements

### Requirement: Listagem em tabela com paginação e ação Editar
Cada aba de sub-entidade SHALL exibir uma tabela com os itens cadastrados para aquele mundo, contendo pelo menos o **Nome** e as colunas mais relevantes, com **paginação**, botão **Novo(a) <entidade>** e ação **Editar** por item; a aba **Localidades** SHALL ser a exceção e exibir a **árvore** do RF018, com **Nova Localidade**, ação **Editar** por nó, contador de filhos e **paginação de 20 em 20 localidades sem cortar subárvores**.

#### Scenario: RF008-CA003 - Tabela com paginação e Editar
- **WHEN** o escritor acessar uma aba de entrada com itens cadastrados, exceto **Localidades**
- **THEN** os itens SHALL ser exibidos em tabela com paginação
- **AND** SHALL existir ação **Editar** por item
- **AND** SHALL existir o botão **Novo(a) <entidade>**.

#### Scenario: RF018-CA001 - Localidades em árvore
- **WHEN** o escritor acessar a aba **Localidades**
- **THEN** os itens SHALL ser exibidos em árvore, com paginação de 20 em 20 e os controles sempre visíveis
- **AND** SHALL existir o botão **Nova Localidade** e ação **Editar** por nó (RF018-TL001, RF018-CA001, RF018-CA019)

### Requirement: Campos específicos por sub-entidade
O sistema SHALL aceitar os campos definidos para cada sub-entidade: **Localidades** (Nome obrigatório, Descrição, História, **Tipo da Localidade**, **Imagem** e **Fica dentro de**); **Raças e Povos** (Nome obrigatório, Descrição, Características, Forças, Fraquezas); **Artefatos** (Nome obrigatório, Descrição, Poder, Funcionamento, Limitações, Custo de aquisição); **Armas** (Nome obrigatório, Descrição, Dano, Funcionamento, Limitações, Custo de aquisição); **Eventos** (Nome obrigatório, Descrição, Data **texto livre**, Impacto); **Sistemas** (Nome obrigatório, Descrição, Tipo em lista fechada, Regras).

#### Scenario: RF008-CA007 - Campos por entidade
- **WHEN** forem exibidos os formulários de cada sub-entidade
- **THEN** SHALL aparecer os campos conforme o requisito
- **AND** o campo **Data** de **Evento** SHALL aceitar **texto livre**
- **AND** o campo **Tipo** de **Sistema** SHALL ter os valores **Magia**, **Energia** ou **Combate**.

#### Scenario: RF018-CA005 - Campos novos da Localidade
- **WHEN** o escritor abrir a janela de uma **Localidade**
- **THEN** SHALL ver **Tipo da Localidade**, **Imagem** e **Fica dentro de**, além de Nome, Descrição e História (RF018-TL002, RF018-RN002)
