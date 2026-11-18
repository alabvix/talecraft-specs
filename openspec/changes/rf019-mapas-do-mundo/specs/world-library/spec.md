## ADDED Requirements

### Requirement: Mapas do Mundo
O detalhe do Mundo SHALL exibir, depois de **Localidades**, a aba **Mapas** com a lista de mapas em cards — Nome, escala, âncora, quantidade de localidades e **Abrir** — e o botão **Novo mapa**; a modal SHALL ter **Nome** obrigatório, **Tipo** em lista fechada (**Mundo**, **Região**, **Cidade**, **Bairro** e **Prédio/Casa**), **Âncora** opcional limitada às localidades do mesmo mundo e **Fundo** em lista fechada (**Papel**, **Grade**, **Hex**, **Blueprint** e **Topográfico**), e SHALL permitir editar os metadados e **Excluir mapa** com confirmação, sem apagar localidades (RF019-TL001, RF019-TL002, RF019-FL001, RF019-FL009, RF019-RN001 a RF019-RN004, RF019-RN010, RF019-CA001 a RF019-CA004, RF019-CA013).

#### Scenario: Criar mapa
- **GIVEN** o mundo está salvo e a aba **Mapas** está aberta
- **WHEN** o escritor clica em **Novo mapa**, informa Nome, Tipo, Âncora e Fundo e salva
- **THEN** o card aparece com tipo, âncora e contagem e o mapa abre no editor (RF019-FL001, RF019-CA002)

#### Scenario: Escalas fechadas
- **GIVEN** a modal de mapa está aberta
- **WHEN** o escritor abre o campo **Tipo**
- **THEN** vê exatamente **Mundo**, **Região**, **Cidade**, **Bairro** e **Prédio/Casa** (RF019-RN002, RF019-CA003)

#### Scenario: Âncora de outro mundo
- **GIVEN** existem dois mundos com localidades
- **WHEN** o escritor tenta usar como âncora uma localidade de outro mundo
- **THEN** o domínio recusa e nada é gravado (RF019-RN003, RF019-CA004)

#### Scenario: Excluir mapa
- **GIVEN** um mapa com marcadores e formas
- **WHEN** o escritor confirma **Excluir mapa**
- **THEN** o mapa e os seus elementos saem, e as localidades continuam na aba Localidades (RF019-RN010, RF019-CA013)

### Requirement: Editor de mapas do Mundo
O editor SHALL oferecer toolbar (**Selecionar/Mover**, **Polígono**, **Ligação**, **Apagar**, **Desfazer**, **Refazer**, zoom), canvas de 1000 × 700 com pan/zoom e fundo do template, painel pesquisável das localidades do mundo para arrastar e **Nova localidade**, e painel de propriedades; SHALL posicionar cada localidade uma única vez por mapa, desenhar polígonos com pelo menos 3 vértices e cor semântica, criar ligações com rótulo e estilo entre localidades do mapa, remover elementos sem tocar no cadastro e gravar tudo por **Salvar** explícito, com histórico de desfazer/refazer em memória (RF019-TL003 a RF019-TL007, RF019-FL002 a RF019-FL008, RF019-FL010, RF019-RN005 a RF019-RN009, RF019-RN012, RF019-CA005 a RF019-CA015).

#### Scenario: Arrastar localidade para o mapa
- **GIVEN** a localidade **Porto** ainda não está no mapa
- **WHEN** o escritor a arrasta da lista para o canvas
- **THEN** um marcador é criado na posição solta, com o selo **No mapa**, e a mesma localidade não pode entrar de novo (RF019-FL003, RF019-RN005, RF019-CA006)

#### Scenario: Criar localidade pelo mapa
- **GIVEN** a aba Mapas está aberta em um mapa com âncora
- **WHEN** o escritor usa **Nova localidade**, preenche a modal do RF018 e salva
- **THEN** a localidade é criada no mundo, entra no mapa no centro da visão, com a âncora como pai sugerido, e aparece na aba Localidades (RF019-TL006, RF019-FL004, RF019-CA007)

#### Scenario: Desenhar polígono
- **GIVEN** a ferramenta **Polígono** está ativa
- **WHEN** o escritor clica em três ou mais vértices e fecha com duplo clique
- **THEN** a forma é criada, selecionada e pode ser renomeada, recolorida, movida ou apagada; dois vértices são recusados (RF019-TL004, RF019-FL005, RF019-RN007, RF019-CA008)

#### Scenario: Ligação entre localidades
- **GIVEN** **Porto** e **Centro** estão no mapa
- **WHEN** o escritor usa **Ligação**, clica em Porto e depois em Centro
- **THEN** a ligação é criada com rótulo e estilo editáveis; auto-ligação e o mesmo par repetido são recusados (RF019-TL007, RF019-FL006, RF019-RN008, RF019-CA009)

#### Scenario: Salvar e reabrir
- **GIVEN** o escritor posicionou localidades, desenhou formas e criou ligações
- **WHEN** clica em **Salvar**, sai e reabre o mapa
- **THEN** tudo volta nas mesmas posições; sair sem salvar descarta as pendências (RF019-FL002, RF019-RN009, RF019-RN012, RF019-CA012)

#### Scenario: Desfazer e refazer
- **GIVEN** o escritor moveu um marcador e desenhou uma forma sem salvar
- **WHEN** usa **Desfazer** e **Refazer**
- **THEN** o documento volta e avança no histórico, sem gravar no banco antes de **Salvar** (RF019-FL007, RF019-CA011)

#### Scenario: Templates
- **GIVEN** o mapa tem marcadores e formas
- **WHEN** o escritor troca o **Fundo** entre os cinco templates
- **THEN** o padrão do canvas muda sem perder elementos (RF019-RN004, RF019-CA014)

### Requirement: Ícones das localidades no mapa
Quando a localidade não tem imagem, o marcador SHALL usar um ícone do seu **Tipo** (RF018), desenhado no estilo do **Tipo do Mundo** — **Medieval**, **Moderno**, **Futurista** ou **Antigo** — para as famílias de assentamento, moradia, fortificação e templo; as demais famílias SHALL usar um desenho único, a imagem cadastrada SHALL ter prioridade sobre o ícone e os tipos sem desenho, inclusive **Não definido**, SHALL manter o quadrado vazio (RF019-TL005, RF019-RN017, RF019-CA023).

#### Scenario: Ícone pelo tipo e pelo mundo
- **GIVEN** o mapa pertence a um mundo **Medieval**
- **WHEN** uma localidade **Cidade** sem imagem é colocada no mapa
- **THEN** o marcador mostra o ícone de muralha; em um mundo **Futurista**, mostra o de cúpulas (RF019-TL005, RF019-RN017, RF019-CA023)

#### Scenario: Imagem tem prioridade
- **GIVEN** a localidade tem imagem cadastrada
- **WHEN** o marcador é desenhado no editor, no livro ou no PDF
- **THEN** mostra a miniatura, sem o ícone por cima (RF019-RN017, RF019-CA023)

#### Scenario: Tipo sem desenho
- **GIVEN** a localidade está como **Não definido** ou o tipo não tem glifo
- **WHEN** o marcador é desenhado
- **THEN** mantém o quadrado vazio, sem inventar símbolo (RF019-RN017, RF019-CA023)
