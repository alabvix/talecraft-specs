## ADDED Requirements

### Requirement: Edição de formas do mapa
O editor SHALL permitir, com **Selecionar/Mover**, redimensionar uma forma desenhada arrastando uma das suas arestas — movendo apenas os dois vértices dessa aresta na direção perpendicular —, ajustar um único vértice arrastando o seu nó e mover a forma inteira arrastando o seu interior; a forma selecionada SHALL mostrar uma alça no meio de cada aresta e um nó em cada vértice, os pontos SHALL permanecer dentro do plano de 1000 × 700 e cada arraste SHALL gerar um único passo de desfazer/refazer, com a geometria gravada por **Salvar** (RF019-TL013, RF019-FL005, RF019-RN007, RF019-CA008).

#### Scenario: Redimensionar pela aresta
- **GIVEN** um mapa **Mundo** com um polígono de três vértices desenhado e selecionado
- **WHEN** o escritor arrasta a alça do meio de uma aresta
- **THEN** só os dois vértices dessa aresta se deslocam na perpendicular e o terceiro vértice continua parado (RF019-TL013, RF019-CA008)

#### Scenario: Mover um vértice pelo nó
- **GIVEN** a forma está selecionada
- **WHEN** o escritor arrasta o nó de um dos vértices
- **THEN** só aquele vértice se desloca, preso ao plano, e os demais continuam parados (RF019-TL013, RF019-CA008)

#### Scenario: Mover o polígono inteiro
- **GIVEN** a forma está selecionada
- **WHEN** o escritor arrasta o interior do polígono
- **THEN** todos os vértices se deslocam pelo mesmo delta, sem sair do plano, e a forma pode ser salva na nova posição (RF019-TL013, RF019-RN007, RF019-CA008)

#### Scenario: Limite do plano
- **GIVEN** a forma está encostada na borda do plano
- **WHEN** o escritor tenta arrastar a aresta ou o interior para fora
- **THEN** o deslocamento é limitado e nenhum vértice fica fora de 1000 × 700 (RF019-TL013, RF019-RN007)

#### Scenario: Histórico e persistência
- **GIVEN** o escritor redimensionou a forma sem salvar
- **WHEN** usa **Desfazer** e depois **Salvar** e reabre o mapa
- **THEN** o arraste inteiro volta em um passo de desfazer e, ao salvar, os vértices alterados são restaurados ao reabrir (RF019-TL013, RF019-FL005, RF019-CA008)
