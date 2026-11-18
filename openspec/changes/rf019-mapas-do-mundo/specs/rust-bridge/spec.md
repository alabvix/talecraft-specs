## ADDED Requirements

### Requirement: Comandos de mapas expostos ao front-end
O sistema SHALL expor ao front-end, pelo `invoke_handler`, os comandos `listar_mapas`, `obter_mapa`, `salvar_mapa`, `excluir_mapa` e `listas_mapa`, com as validações de escala, fundo, âncora, coordenadas, formas e ligações no domínio e apenas mensagens úteis no IPC (RF019-RN001 a RF019-RN011, RF019-RN019, RF019-CA002 a RF019-CA014).

#### Scenario: Listar e abrir mapas
- **GIVEN** o mundo tem mapas
- **WHEN** o front-end chama `listar_mapas` e depois `obter_mapa`
- **THEN** recebe os resumos com contagens e o documento completo com posições, formas e ligações (RF019-TL001, RF019-TL003, RF019-CA005)

#### Scenario: Salvar o documento
- **GIVEN** o front-end chama `salvar_mapa` com metadados, posições, formas e ligações
- **WHEN** o comando termina
- **THEN** tudo foi gravado junto e o mapa relido é devolvido; uma validação falha não deixa o mapa pela metade (RF019-RN009, RF019-CA012)

#### Scenario: Listas fechadas de mapa
- **GIVEN** a modal e o editor vão montar os controles
- **WHEN** o front-end chama `listas_mapa`
- **THEN** recebe escalas, fundos, cores de forma e estilos de ligação do back-end (RF019-RN002, RF019-RN004, RF019-RN007, RF019-RN008)

#### Scenario: Excluir mapa
- **GIVEN** o mapa existe
- **WHEN** o front-end chama `excluir_mapa`
- **THEN** o mapa e os elementos saem por cascata e as localidades continuam (RF019-RN010, RF019-CA013)
