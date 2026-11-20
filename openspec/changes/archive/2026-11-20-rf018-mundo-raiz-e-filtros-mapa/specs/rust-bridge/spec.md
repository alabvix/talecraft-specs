## MODIFIED Requirements

### Requirement: Comandos de localidades expostos ao front-end
O sistema SHALL expor ao front-end, pelo `invoke_handler`, os comandos `listar_localidades_mundo` — que devolve a lista plana das localidades do mundo com `id`, `nome`, `tipo`, `imagem`, `paiId` e `raiz`, ordenada pelo nome — e `associar_imagem_localidade` — que copia a imagem escolhida para `localidades/` e grava o caminho relativo —, com a validação de ciclo, tipo, mundo, pai padrão na raiz e bloqueio da edição da raiz no domínio, e apenas mensagens úteis no IPC (RF018-RN001 a RF018-RN006, RF018-CA002, RF018-CA006, RF018-CA009, RF018-CA011, RF018-CA020).

#### Scenario: Listar localidades para a árvore
- **GIVEN** o mundo tem localidades com e sem pai
- **WHEN** o front-end chama `listar_localidades_mundo`
- **THEN** recebe todas as localidades com o tipo, a imagem, o `paiId` e a marca `raiz`, sem paginação (RF018-TL001, RF018-CA002, RF018-CA020)

#### Scenario: Associar imagem da localidade
- **GIVEN** a localidade existe e o escritor escolheu um arquivo válido
- **WHEN** o front-end chama `associar_imagem_localidade`
- **THEN** o arquivo é copiado e o caminho relativo é devolvido e gravado (RF018-RN001, RF018-CA006)

#### Scenario: Ciclo e mundo diferente recusados
- **GIVEN** o front-end envia um `paiId` que forma ciclo ou pertence a outro mundo
- **WHEN** o domínio valida a localidade
- **THEN** a gravação é recusada com erro próprio (RF018-RN003, RF018-RN004, RF018-CA009, RF018-CA011)

#### Scenario: Pai vazio vira a raiz
- **GIVEN** o front-end salva uma localidade nova sem `paiId`
- **WHEN** o domínio grava
- **THEN** a localidade fica filha da raiz do mundo (RF018-RN003, RF018-CA020)

#### Scenario: Raiz bloqueada
- **GIVEN** o front-end tenta salvar a localidade com `raiz = 1`
- **WHEN** o domínio valida
- **THEN** devolve `LocalidadeRaizNaoEditavel` e nada é gravado (RF018-CA020)
