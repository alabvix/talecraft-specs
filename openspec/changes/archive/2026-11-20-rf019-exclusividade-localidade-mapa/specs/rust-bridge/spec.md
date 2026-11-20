## ADDED Requirements

### Requirement: Associações de localidade expostas e validadas
O sistema SHALL devolver em `listar_localidades_mundo`, por localidade, a lista `mapas` com `id`, `nome` e `tipo` das associações existentes, e `salvar_mapa` SHALL recusar com `LocalidadeEmOutroMapa` a inclusão de uma localidade nova no mapa quando ela já pertencer a outro mapa incompatível — considerando compatíveis apenas os pares formados por **Mundo** e **Região** (RF019-RN024, RF019-CA030).

#### Scenario: Listagem com associações
- **GIVEN** uma localidade está em um mapa
- **WHEN** o front-end chama `listar_localidades_mundo`
- **THEN** a localidade traz `mapas` com o id, o nome e o tipo do mapa (RF019-RN024)

#### Scenario: Salvar localidade presa a outro mapa
- **GIVEN** a Sala está em um mapa de Prédio/Casa
- **WHEN** o front-end tenta salvar outro mapa de Prédio/Casa com a mesma Sala
- **THEN** o domínio devolve `LocalidadeEmOutroMapa` e não grava nada (RF019-RN024, RF019-CA030)

#### Scenario: Mundo e Região compatíveis
- **GIVEN** a localidade está em um mapa de Região
- **WHEN** o front-end salva um mapa de Mundo com ela
- **THEN** o domínio aceita a associação (RF019-RN024, RF019-CA030)
