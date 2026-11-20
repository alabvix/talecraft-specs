## MODIFIED Requirements

### Requirement: Tipos de localidade por escala
**Mundo** SHALL aceitar os tipos macro/geográficos e assentamentos do RF019-RN019; **Região** SHALL aceitar os 49 tipos, exceto **Cômodo**, **Quarto**, **Sala** e **Salão**; **Cidade**, **Bairro** e **Prédio/Casa** SHALL aceitar apenas as suas listas do RF019-RN019; todas as escalas SHALL filtrar o painel e o **Nova localidade**, `salvar_mapa` SHALL recusar com erro de domínio qualquer marcador fora da escala, inclusive **Não definido**, sem gravar o documento, e a localidade raiz do tipo **Mundo** SHALL ficar fora do painel de localidades dos mapas (RF019-TL011, RF019-RN002, RF019-RN019, RF019-CA025, RF019-CA029).

#### Scenario: Painel filtrado
- **GIVEN** um mapa de **Cidade**
- **WHEN** o escritor abre o painel de localidades
- **THEN** vê apenas os tipos urbanos; **Floresta** e **Porto** (tipo Cidade) não aparecem (RF019-TL011, RF019-RN019, RF019-CA025)

#### Scenario: Salvar com tipo fora da escala
- **GIVEN** o mapa de **Cidade** tem uma **Floresta** posicionada
- **WHEN** o escritor clica em **Salvar**
- **THEN** o domínio recusa, informa o marcador e nada é gravado (RF019-RN019, RF019-CA025)

#### Scenario: Prédio/Casa
- **GIVEN** um mapa de **Prédio/Casa**
- **WHEN** o escritor abre o painel
- **THEN** vê apenas **Cômodo**, **Quarto**, **Sala** e **Salão** (RF019-RN019, RF019-CA025)

#### Scenario: Mundo macro
- **GIVEN** um mapa de **Mundo**
- **WHEN** o escritor abre o painel ou tenta salvar uma **Casa** ou um **Bairro**
- **THEN** o tipo não aparece e o domínio recusa o marcador (RF019-RN019, RF019-CA025, RF019-CA029)

#### Scenario: Região sem cômodos
- **GIVEN** um mapa de **Região**
- **WHEN** o escritor abre o painel ou tenta salvar um **Quarto**
- **THEN** o cômodo não aparece e o domínio recusa o marcador; Casa, Praça e Bairro são aceitos (RF019-RN019, RF019-CA025, RF019-CA029)

#### Scenario: Raiz fora do mapa
- **GIVEN** o mundo tem a localidade raiz do tipo **Mundo**
- **WHEN** o escritor abre o painel de qualquer mapa
- **THEN** a raiz não aparece como localidade posicionável (RF019-TL011, RF019-CA029)
