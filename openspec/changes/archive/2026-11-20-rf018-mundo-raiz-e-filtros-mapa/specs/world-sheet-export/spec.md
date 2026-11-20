## ADDED Requirements

### Requirement: Raiz do mundo fora das entradas do PDF
O **Documento do Mundo** SHALL omitir a localidade raiz do tipo **Mundo** da seção de entradas e das contagens de localidades, porque ela representa o próprio mundo e não uma entrada cadastrada pelo escritor (RF018-CA020, RF018-RN010).

#### Scenario: PDF sem a raiz
- **GIVEN** o mundo tem a raiz **Kepler** e três localidades filhas
- **WHEN** o escritor exporta o **Documento do Mundo**
- **THEN** a raiz não aparece como entrada e as localidades filhas continuam no documento (RF018-CA020, RF018-RN010)
