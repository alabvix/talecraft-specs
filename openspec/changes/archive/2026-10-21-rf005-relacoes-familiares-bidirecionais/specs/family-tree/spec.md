# family-tree (delta do RF005)

## Purpose

Árvore familiar do personagem: o quadro **Família** na tela de Detalhe de
Personagem monta, a partir das relações familiares gravadas no banco, a
linhagem do personagem — ascendentes acima, descendentes abaixo, irmãos lado a
lado, cônjuge como parceiro no mesmo nível e um nó "?" para o ascendente
ausente.

Cobre o requisito **RF005** (ajustes na tela de Personagens: relações familiares,
bidirecionalidade e árvore familiar).

## ADDED Requirements

### Requirement: Quadro Família no detalhe
A tela de Detalhe de Personagem SHALL exibir o quadro **Família** assim como os
demais quadros do protótipo, posicionado **abaixo** do quadro de Relações
Globais, e SHALL exibir uma **mensagem de estado vazio** quando o personagem não
tiver nenhuma relação familiar, sem quebrar a tela (RF005-TL002, RF005-CA008,
RF005-CA014).

#### Scenario: Quadro Família presente no detalhe
- **GIVEN** a tela de detalhe de um personagem está aberta
- **WHEN** o escritor observa os quadros da tela
- **THEN** o quadro Família está presente, logo abaixo do quadro de Relações
  Globais (RF005-TL002, RF005-CA008)

#### Scenario: Personagem sem relação familiar
- **GIVEN** um personagem não tem nenhuma relação familiar gravada
- **WHEN** a tela de detalhe dele é aberta
- **THEN** o quadro Família exibe uma mensagem de estado vazio, sem erro e sem
  quebrar a tela (RF005-CA014)

#### Scenario: Quadro Família respeita o tema ativo
- **GIVEN** a tela de detalhe está aberta em qualquer um dos temas
- **WHEN** o escritor troca o tema
- **THEN** o quadro Família acompanha o tema, usando os tokens do design system
  e sem cor fixa (RF005-CA016)

### Requirement: Escopo das relações na árvore
A árvore SHALL ser montada **apenas** a partir das relações **familiares** —
`Filho/Filha`, `Mãe/Pai`, `Irmão/Irmã` e `Cônjuge`. As demais relações (Rival,
Mentor, Aprendiz, Inimigo, Aliado, Namorado) SHALL **não** aparecer na árvore
(RF005-RN006).

#### Scenario: Relações não familiares fora da árvore
- **GIVEN** o personagem tem relações familiares e não familiares gravadas
- **WHEN** a árvore é montada
- **THEN** apenas Filho/Filha, Mãe/Pai, Irmão/Irmã e Cônjuge entram na árvore;
  Rival, Mentor, Aprendiz, Inimigo, Aliado e Namorado não aparecem
  (RF005-RN006, RF005-CA009)

### Requirement: Linhagem completa na árvore
A árvore SHALL percorrer **toda a linhagem** alcançável do personagem: SHALL
subir por todos os **ascendentes** (mãe/pai, avós, bisavós…) e SHALL descer por
todos os **descendentes** (filhos, netos…), não apenas pelos parentes diretos
(RF005-RN009, RF005-CA009, RF005-CA013).

#### Scenario: Ascendentes acima e descendentes abaixo
- **GIVEN** o personagem tem mãe/pai e filhos cadastrados
- **WHEN** a árvore é desenhada
- **THEN** a mãe/pai aparece acima e os filhos abaixo do personagem
  (RF005-CA009)

#### Scenario: Avós e netos aparecem
- **GIVEN** o personagem tem avós e netos alcançáveis por relações familiares
- **WHEN** a árvore é desenhada
- **THEN** todos os ascendentes e descendentes alcançáveis aparecem, não apenas
  mãe/pai e filhos diretos (RF005-RN009, RF005-CA013)

#### Scenario: Dois pais e duas filhas aparecem todos
- **GIVEN** o personagem tem mãe e pai cadastrados, e cada um tem duas filhas
- **WHEN** a árvore é desenhada
- **THEN** os **dois** pais aparecem na primeira linha e as **duas** filhas abaixo,
  cada nó em uma célula própria, sem nenhum nó sobreposto escondido
  (RF005-CA009, RF005-CA013)

### Requirement: Irmãos e ascendente ausente na árvore
A árvore SHALL posicionar os personagens ligados por **Irmão/Irmã** **lado a
lado, no mesmo nível**, SHALL tratar o tipo **declarado** como fonte da verdade
para a irmandade — **sem** deduzi-la de uma mãe/pai em comum — e SHALL exibir um
nó **"?"** acima dos irmãos quando eles **não tiverem mãe/pai cadastrado**,
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

#### Scenario: Irmandade declarada prevalece sobre a linhagem
- **GIVEN** A e B estão ligados por Irmão/Irmã mas têm mães/pais distintos
  cadastrados
- **WHEN** a árvore é desenhada
- **THEN** eles continuam aparecendo como irmãos, pois a irmandade declarada é a
  fonte da verdade (RF005-RN007)

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
- **THEN** os filhos aparecem abaixo do casal (RF005-RN008, RF005-CA012)

#### Scenario: Mãe e pai cônjuges formam um casal na árvore do filho
- **GIVEN** a mãe e o pai do personagem são cônjuges entre si
- **WHEN** a árvore do personagem é desenhada
- **THEN** a mãe e o pai aparecem **lado a lado, no mesmo nível**, ligados por uma
  linha de união, com o personagem abaixo do casal (RF005-CA012)

### Requirement: Ascendentes na primeira linha da árvore
A árvore SHALL posicionar os **ascendentes** — mãe/pai e, quando houver, avós —
**sempre acima** do personagem, de modo que a **mãe/pai ocupe a primeira linha**
visível; SHALL manter o personagem no meio e SHALL posicionar descendentes e
irmãos abaixo (RF005-CA009).

#### Scenario: Mãe/pai na primeira linha
- **GIVEN** o personagem tem a mãe/pai cadastrada
- **WHEN** a árvore do personagem é desenhada
- **THEN** a mãe/pai é o nó mais alto da árvore, acima do personagem
  (RF005-CA009)

#### Scenario: Avó acima da mãe/pai
- **GIVEN** a mãe/pai do personagem também tem mãe/pai cadastrada
- **WHEN** a árvore do personagem é desenhada
- **THEN** a avó/avô fica numa geração ainda mais alta que a mãe/pai, e esta
  continua acima do personagem (RF005-CA013)

#### Scenario: Cada ficha usa o seu próprio ponto de vista
- **GIVEN** Ofélia é filha de Esther e Ariadne é filha de Ofélia
- **WHEN** a árvore de Esther é desenhada
- **THEN** Ofélia e Ariadne aparecem **abaixo** de Esther (RF005-CA009)

### Requirement: Aparência e navegação dos nós da árvore
Cada nó da árvore SHALL exibir o **retrato acima** e o **nome abaixo**, com fonte
reduzida; SHALL ser **clicável** para abrir a ficha daquele personagem,
permitindo navegar pela árvore; e o nó **"?"** do ascendente ausente **não** SHALL
ser clicável (RF005-CA011).

#### Scenario: Retrato acima e nome abaixo
- **GIVEN** a árvore é desenhada com um personagem que tem retrato
- **WHEN** um nó é exibido
- **THEN** o retrato fica acima e o nome, com fonte menor, fica abaixo
  (RF005-CA009)

#### Scenario: Clicar no nó abre a ficha
- **GIVEN** a árvore familiar está sendo exibida
- **WHEN** o usuário clica no retrato ou no nome de um nó
- **THEN** a ficha daquele personagem é aberta (RF005-CA009)

#### Scenario: O nó desconhecido não navega
- **GIVEN** a árvore exibe um nó "?" de ascendente ausente
- **WHEN** o usuário clica nesse nó
- **THEN** nada é aberto, pois o nó "?" não representa um personagem cadastrado
  (RF005-CA011)

### Requirement: Desenho em SVG da árvore
A árvore SHALL ser desenhada em **SVG inline** com `viewBox`, no mesmo padrão
dos gráficos do protótipo, com o tamanho vindo da classe CSS e **sem** exigir
biblioteca externa (RF005-TL002).

#### Scenario: Árvore desenhada sem dependência nova
- **GIVEN** o quadro Família é exibido com relações familiares
- **WHEN** a árvore é desenhada
- **THEN** ela é um SVG inline dimensionado pela classe CSS, sem biblioteca de
  gráficos adicionada ao projeto (RF005-TL002)

### Requirement: Testes automatizados da árvore familiar
O projeto SHALL incluir **testes automatizados** para a montagem da árvore
familiar, cobrindo a linhagem completa, os irmãos lado a lado, o ascendente
ausente ("?") e o cônjuge no mesmo nível (RF005-CA017).

#### Scenario: Testes cobrem a montagem da árvore
- **GIVEN** o projeto é compilado para testes
- **WHEN** os testes do back-end são executados
- **THEN** existem testes de montagem da árvore cobrindo linhagem, irmãos,
  ascendente ausente e cônjuge, e todos passam (RF005-CA017)
