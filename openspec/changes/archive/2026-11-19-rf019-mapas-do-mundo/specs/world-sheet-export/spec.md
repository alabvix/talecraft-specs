## ADDED Requirements

### Requirement: Seção Mapas no Documento do Mundo
O **Documento do Mundo** SHALL incluir, ao final, a seção **Mapas** com todos os mapas do mundo que tiverem pelo menos uma localidade ou uma forma, na ordem de criação, cada um com nome, escala, âncora e o desenho; mapas vazios SHALL ser omitidos e a seção SHALL usar a paleta fixa de impressão, independente do tema (RF019-TL009, RF019-RN014, RF019-CA017).

#### Scenario: Mapas com conteúdo no PDF
- **GIVEN** o mundo tem um mapa com localidades e outro sem conteúdo
- **WHEN** o escritor exporta o **Documento do Mundo**
- **THEN** a seção **Mapas** traz só o mapa com conteúdo, com nome, tipo, âncora e o desenho (RF019-TL009, RF019-CA017)

#### Scenario: Paleta de impressão
- **GIVEN** o tema ativo é escuro
- **WHEN** o mapa é renderizado no PDF
- **THEN** o desenho usa a paleta fixa de papel e tinta, legível na impressão (RF019-RN014)

#### Scenario: Ordem de criação
- **GIVEN** o mundo tem três mapas com conteúdo
- **WHEN** o PDF é gerado
- **THEN** os mapas aparecem na ordem em que foram criados (RF019-TL009, RF019-RN014)
