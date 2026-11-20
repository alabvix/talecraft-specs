## MODIFIED Requirements

### Requirement: Mapas no Worldbuilding do livro
A seção **Worldbuilding** do livro SHALL ganhar a aba **Mapas** depois de **Localidades**, com o seletor dos mapas do mundo da aba e a visualização **somente leitura** — pan/zoom leve, sem toolbar, sem criar, editar ou posicionar —, SHALL desenhar os cômodos com o nome central e as portas nos mapas de **Prédio/Casa** e SHALL mostrar estado vazio quando o mundo não tiver mapas (RF019-TL008, RF019-TL012, RF019-FL010, RF019-RN013, RF019-CA016, RF019-CA028).

#### Scenario: Aba Mapas no livro
- **GIVEN** o mundo da aba tem dois mapas
- **WHEN** o escritor abre **Worldbuilding** no livro e a aba **Mapas**
- **THEN** vê o seletor com os dois mapas e o desenho do mapa escolhido, sem ações de edição (RF019-TL008, RF019-RN013, RF019-CA016)

#### Scenario: Pan e zoom sem edição
- **GIVEN** a aba **Mapas** do livro está aberta
- **WHEN** o escritor arrasta o fundo ou usa a roda do mouse
- **THEN** a visualização navega, mas nenhuma posição, forma, porta ou ligação é alterada (RF019-FL010, RF019-RN013)

#### Scenario: Cômodos e portas no livro
- **GIVEN** o mapa de **Prédio/Casa** tem cômodos e portas
- **WHEN** ele é escolhido na aba **Mapas** do livro
- **THEN** os retângulos com nome e as portas são desenhados, sem toolbar (RF019-TL012, RF019-RN013, RF019-CA028)

#### Scenario: Mundo sem mapas
- **GIVEN** o mundo da aba não tem mapas
- **WHEN** o escritor abre a aba **Mapas**
- **THEN** a aba informa que ainda não existem mapas (RF019-TL008, RF019-RN015, RF019-CA021)
