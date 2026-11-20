## ADDED Requirements

### Requirement: Exclusividade da localidade por mapa
O editor SHALL permitir que uma localidade seja associada a vários mapas somente quando todos forem **Mundo** ou **Região**; a localidade em **Cidade**, **Bairro** ou **Prédio/Casa** SHALL ficar exclusiva daquele mapa, não SHALL aparecer no painel de outro mapa incompatível e `salvar_mapa` SHALL recusar a nova associação com erro `LocalidadeEmOutroMapa`, sem gravar o documento; localidades que já estavam no mapa SHALL continuar editáveis (RF019-TL006, RF019-FL003, RF019-RN005, RF019-RN024, RF019-CA030).

#### Scenario: Prédio não compartilha cômodo
- **GIVEN** a Sala **Sala de Estar** já está num mapa de **Prédio/Casa**
- **WHEN** o escritor abre outro mapa de **Prédio/Casa**
- **THEN** a Sala não aparece no painel e o domínio recusa salvar o segundo mapa com ela (RF019-RN024, RF019-CA030)

#### Scenario: Mundo e Região compartilham
- **GIVEN** a Cidade **Porto** já está num mapa de **Região**
- **WHEN** o escritor abre um mapa de **Mundo**
- **THEN** Porto continua no painel e pode ser adicionada; o salvamento é aceito (RF019-RN024, RF019-CA030)

#### Scenario: Cidade não compartilha com Mundo
- **GIVEN** a Casa **Solar** já está num mapa de **Região**
- **WHEN** o escritor abre um mapa de **Cidade**
- **THEN** Solar não aparece no painel e o domínio recusa a associação (RF019-RN005, RF019-RN024, RF019-CA030)

#### Scenario: Mapa atual preservado
- **GIVEN** uma localidade já estava no mapa antes da regra
- **WHEN** o escritor move ou edita o mapa e salva
- **THEN** a associação existente continua e o salvamento não é bloqueado por duplicatas legadas (RF019-RN024)
