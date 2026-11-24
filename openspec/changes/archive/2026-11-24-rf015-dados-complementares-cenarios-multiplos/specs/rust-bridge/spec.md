## MODIFIED Requirements

### Requirement: Comandos dos mundos do livro expostos ao front-end
O sistema SHALL expor ao front-end, pelo `invoke_handler`, os comandos `listar_mundos_do_livro`, `listar_mundos_para_livro`, `associar_mundos_ao_livro`, `remover_mundo_do_livro` e `listar_livros_do_mundo`, com as regras de associação, remoção com limpeza de **todos** os cenários daquele mundo e validação de **cada** cenário do capítulo no back-end, e apenas mensagens úteis no IPC (RF017-RN003 a RF017-RN007, RF017-RN015, RF017-CA003 a RF017-CA014, RF017-CA023).

#### Scenario: Listar os mundos do livro em ordem
- **GIVEN** o livro tem dois mundos associados
- **WHEN** o front-end chama `listar_mundos_do_livro`
- **THEN** recebe os mundos na ordem de associação, com o resumo e a contagem de entradas por categoria (RF017-TL001, RF017-RN002, RF017-CA002, RF017-CA008)

#### Scenario: Seleção de mundos com busca e paginação
- **GIVEN** a biblioteca global tem mais de doze mundos e alguns já associados
- **WHEN** o front-end chama `listar_mundos_para_livro` com filtro, página e tamanho de página
- **THEN** recebe a página de itens, o total e o selo de já associado, sem carregar a biblioteca inteira (RF017-TL003, RF017-CA004, RF017-CA005)

#### Scenario: Associar mundos em lote
- **GIVEN** o front-end chama `associar_mundos_ao_livro` com ids de mundos, alguns já associados
- **WHEN** o comando termina
- **THEN** só as novas associações são criadas, a duplicidade volta no relatório e a ordem é preservada (RF017-RN004, RF017-CA003)

#### Scenario: Remover mundo com limpeza de cenários
- **GIVEN** o livro tem capítulos com um ou mais cenários em localidades do mundo a remover
- **WHEN** o front-end chama `remover_mundo_do_livro`
- **THEN** a associação e todos os cenários daquele mundo são limpos na mesma transação, os cenários dos outros mundos permanecem e o retorno informa quantos capítulos distintos foram afetados (RF017-RN006, RF017-RN015, RF017-CA010, RF017-CA011)

#### Scenario: Livros que usam o mundo
- **GIVEN** dois livros usam o mundo
- **WHEN** o front-end chama `listar_livros_do_mundo`
- **THEN** recebe os livros com o título para o painel de vínculos (RF017-TL008, RF017-CA014)

#### Scenario: Cenário inválido recusado
- **GIVEN** o front-end chama `salvar_capitulo` com uma lista de cenários que contém localidade de um mundo não associado ao livro
- **WHEN** o domínio valida cada cenário
- **THEN** a gravação é recusada com erro próprio, sem gravar o capítulo nem a lista parcial (RF017-RN007, RF017-RN015, RF017-CA013)

#### Scenario: Lista de cenários gravada e relida
- **GIVEN** o front-end chama `salvar_capitulo` com duas localidades válidas do livro
- **WHEN** em seguida chama `obter_capitulo`
- **THEN** recebe os dois cenários na ordem enviada, com nome e caminho completo, e a lista pode ser reduzida ou ampliada em uma nova gravação (RF017-RN015, RF017-CA023)
