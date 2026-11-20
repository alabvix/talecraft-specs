## MODIFIED Requirements

### Requirement: Editor de mapas do Mundo
O editor SHALL oferecer toolbar (**Selecionar/Mover**, **Polígono**, **Ligação**, **Apagar**, **Desfazer**, **Refazer**, zoom), canvas de 1000 × 700 com pan/zoom e fundo do template, painel pesquisável das localidades do mundo para arrastar e **Nova localidade**, e painel de propriedades; em mapas de **Prédio/Casa**, **Polígono** e **Ligação** SHALL dar lugar a **Porta**; SHALL posicionar cada localidade uma única vez por mapa, desenhar polígonos com pelo menos 3 vértices e cor semântica, criar ligações com rótulo e estilo entre localidades do mapa, remover elementos sem tocar no cadastro e gravar tudo por **Salvar** explícito, com histórico de desfazer/refazer em memória (RF019-TL003 a RF019-TL007, RF019-TL012, RF019-FL002 a RF019-FL008, RF019-FL011, RF019-RN005 a RF019-RN009, RF019-RN012, RF019-RN020 a RF019-RN023, RF019-CA005 a RF019-CA015, RF019-CA026 a RF019-CA028).

#### Scenario: Arrastar localidade para o mapa
- **GIVEN** a localidade **Porto** ainda não está no mapa
- **WHEN** o escritor a arrasta da lista para o canvas
- **THEN** um marcador é criado na posição solta, com o selo **No mapa**, e a mesma localidade não pode entrar de novo (RF019-FL003, RF019-RN005, RF019-CA006)

#### Scenario: Criar localidade pelo mapa
- **GIVEN** a aba Mapas está aberta em um mapa com âncora
- **WHEN** o escritor usa **Nova localidade**, preenche a modal do RF018 e salva
- **THEN** a localidade é criada no mundo, entra no mapa no centro da visão, com a âncora como pai sugerido, e aparece na aba Localidades (RF019-TL006, RF019-FL004, RF019-CA007)

#### Scenario: Desenhar polígono
- **GIVEN** a ferramenta **Polígono** está ativa em um mapa que não é **Prédio/Casa**
- **WHEN** o escritor clica em três ou mais vértices e fecha com duplo clique
- **THEN** a forma é criada, selecionada e pode ser renomeada, recolorida, movida ou apagada; dois vértices são recusados (RF019-TL004, RF019-FL005, RF019-RN007, RF019-CA008)

#### Scenario: Ligação entre localidades
- **GIVEN** **Porto** e **Centro** estão no mapa e ele não é **Prédio/Casa**
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

### Requirement: Plantas por escala
Mapas de **Cidade** e **Bairro** SHALL desenhar uma planta funcional em SVG no plano de 1000 × 700 — ruas e quarteirões vazios ou quadras com lotes — no lugar dos cinco fundos decorativos; **Prédio/Casa** SHALL usar uma **grade fixa**, sem a planta baixa, escondendo o seletor de **Fundo** nas três escalas; **Cidade** e **Bairro** SHALL manter o **Polígono** para sombrear áreas, e **Prédio/Casa** SHALL usar cômodos e portas no lugar de **Polígono** e **Ligação**; **Mundo** e **Região** SHALL manter os fundos atuais (RF019-TL010, RF019-TL012, RF019-RN018, RF019-RN023, RF019-CA024, RF019-CA027).

#### Scenario: Planta de Cidade
- **GIVEN** um mapa de **Cidade** aberto no editor
- **WHEN** o canvas é desenhado
- **THEN** mostra ruas, quarteirões vazios e a praça, sem o seletor de **Fundo**, com o **Polígono** disponível (RF019-TL010, RF019-RN018, RF019-CA024)

#### Scenario: Grade de Prédio/Casa
- **GIVEN** um mapa de **Prédio/Casa** aberto no editor
- **WHEN** o canvas é desenhado
- **THEN** o fundo é a grade fixa, sem a planta baixa, e os cômodos e portas ficam por cima (RF019-TL010, RF019-TL012, RF019-RN018, RF019-CA024)

#### Scenario: Planta no livro e no PDF
- **GIVEN** o mapa de **Cidade** tem conteúdo
- **WHEN** ele é exibido no livro ou exportado no PDF do Mundo
- **THEN** a mesma planta aparece na paleta de leitura ou de impressão (RF019-RN018, RF019-CA024)

## ADDED Requirements

### Requirement: Cômodos e portas de Prédio/Casa
Em mapas de **Prédio/Casa**, o editor SHALL desenhar cada localidade como um cômodo retangular com o nome no centro, permitir mover o retângulo pelo corpo e redimensioná-lo pelas oito alças (cantos e lados), e SHALL oferecer a ferramenta **Porta** para colocar passagens nas paredes, com lado, posição e largura editáveis; o cômodo SHALL ter no mínimo 40 unidades e ficar inteiro dentro do plano, e a porta SHALL acompanhar o cômodo e ser removida com ele (RF019-TL012, RF019-FL011, RF019-RN020, RF019-RN021, RF019-CA026, RF019-CA027).

#### Scenario: Arrastar localidade cria cômodo
- **GIVEN** um mapa de **Prédio/Casa** aberto no editor
- **WHEN** o escritor arrasta uma localidade para o canvas
- **THEN** um quadrado de 120 × 120 é criado na posição solta, com o nome centralizado e o selo **No mapa** (RF019-TL012, RF019-FL011, RF019-RN020, RF019-CA026)

#### Scenario: Mover e redimensionar
- **GIVEN** o cômodo está selecionado
- **WHEN** o escritor arrasta o corpo e depois uma das oito alças
- **THEN** a posição e o tamanho mudam, o retângulo pode virar retângulo alongado e o histórico registra um passo por arraste (RF019-TL012, RF019-RN020, RF019-CA026)

#### Scenario: Colocar e editar porta
- **GIVEN** a ferramenta **Porta** está ativa
- **WHEN** o escritor clica numa parede do cômodo
- **THEN** a porta é criada naquele lado e o painel permite mudar **Lado**, **Largura**, arrastar a porta pela parede e apagar a porta (RF019-TL012, RF019-FL011, RF019-RN021, RF019-CA027)

#### Scenario: Porta acompanha o cômodo
- **GIVEN** um cômodo com porta
- **WHEN** o cômodo é movido, redimensionado ou removido do mapa
- **THEN** a porta acompanha a nova geometria ou sai junto com o cômodo, sem tocar no cadastro da localidade (RF019-RN021, RF019-CA027)

#### Scenario: Ferramentas legadas
- **GIVEN** um mapa de **Prédio/Casa** com um polígono ou uma ligação antiga
- **WHEN** o editor é aberto
- **THEN** **Polígono** e **Ligação** não aparecem na toolbar, mas o elemento antigo continua visível e apagável (RF019-RN023, RF019-CA027)

#### Scenario: Salvar e reabrir o prédio
- **GIVEN** o escritor criou cômodos e portas
- **WHEN** clica em **Salvar**, sai e reabre o mapa
- **THEN** posições, larguras, alturas e portas voltam iguais (RF019-RN020 a RF019-RN022, RF019-CA026, RF019-CA027)
