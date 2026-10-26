## ADDED Requirements

### Requirement: Exportação da ficha em PDF
O sistema SHALL gerar a **Ficha do Personagem** em PDF a partir dos dados
globais do personagem e da sua imagem, abrindo o **diálogo nativo** para o
escritor escolher onde salvar (RF006-TL002, RF006-FL002, RF006-CA007,
RF006-CA013).

#### Scenario: Exportar a ficha
- **GIVEN** a tela de detalhe de um personagem salvo está aberta
- **WHEN** o escritor aciona Exportar Ficha e confirma um destino no diálogo
- **THEN** um arquivo PDF é gerado naquele destino com os dados do personagem
  (RF006-CA007)

#### Scenario: Exportar exige personagem salvo
- **GIVEN** a tela de detalhe está aberta para um personagem ainda não salvo
- **WHEN** o escritor observa o botão Exportar Ficha
- **THEN** o botão está desabilitado, pois não há registro para exportar
  (RF006-RN009, RF006-CA015)

#### Scenario: Cancelar a exportação
- **GIVEN** o diálogo de salvamento está aberto
- **WHEN** o escritor cancela o diálogo
- **THEN** nenhum arquivo é gravado e a tela permanece inalterada
  (RF006-RN008, RF006-CA014)

#### Scenario: Nome sugerido do arquivo
- **GIVEN** o escritor aciona Exportar Ficha de um personagem chamado "Iara"
- **WHEN** o diálogo de salvamento abre
- **THEN** o nome sugerido é "Iara.pdf" (RF006-RN010)

### Requirement: Conteúdo do documento — dados globais, imagem e árvore familiar
O documento SHALL conter os dados **globais** do personagem — Nome, Alcunha,
Raça, Idade, Personalidade, Interesses, Força, Fraqueza e Biografia —, a sua
**imagem** e, quando o personagem tiver, a **árvore familiar** (ascendentes,
descendentes, irmãos e cônjuges). O documento SHALL NOT conter os livros em que
o personagem aparece nem as relações que não são familiares — Rival, Mentor,
Aliado e semelhantes (RF006-RN005, RF006-CA008, RF006-CA012, RF006-CA020).

#### Scenario: Dados globais no documento
- **GIVEN** um personagem com Nome, Alcunha, Raça, Idade, Personalidade,
  Interesses, Força, Fraqueza e Biografia preenchidos
- **WHEN** a ficha é exportada
- **THEN** todos esses campos aparecem no documento (RF006-CA008)

#### Scenario: Árvore familiar no documento
- **GIVEN** um personagem com relações familiares gravadas
- **WHEN** a ficha é exportada
- **THEN** a árvore familiar aparece no documento, com ascendentes acima,
  descendentes abaixo, irmãos lado a lado e cônjuge no mesmo nível
  (RF006-RN005, RF006-CA020)

#### Scenario: Sem árvore familiar
- **GIVEN** um personagem sem relações familiares
- **WHEN** a ficha é exportada
- **THEN** o documento não tem a seção Família (RF006-RN005, RF006-CA020)

#### Scenario: Sem dados de livro
- **GIVEN** a ficha de um personagem é exportada
- **WHEN** o escritor observa o documento
- **THEN** não há os livros em que ele aparece nem as relações que não são
  familiares (RF006-RN005, RF006-CA012)

### Requirement: Campos vazios e imagem ausente
O documento SHALL omitir os campos globais **sem preenchimento**, para não gerar
linhas em branco, e SHALL ser gerado **sem imagem** quando o personagem não
tiver retrato, sem falhar (RF006-RN006, RF006-RN007, RF006-CA009, RF006-CA011).

#### Scenario: Campos vazios são omitidos
- **GIVEN** um personagem tem apenas o Nome preenchido
- **WHEN** a ficha é exportada
- **THEN** o documento mostra apenas o Nome, sem linhas em branco dos demais
  campos (RF006-CA009)

#### Scenario: Personagem com retrato
- **GIVEN** um personagem tem um retrato associado
- **WHEN** a ficha é exportada
- **THEN** a imagem do personagem aparece no documento (RF006-CA010)

#### Scenario: Personagem sem retrato
- **GIVEN** um personagem não tem retrato associado
- **WHEN** a ficha é exportada
- **THEN** o documento é gerado sem imagem e sem erro (RF006-CA011)

### Requirement: Exportação do que está na tela
Antes de gerar o PDF, o aplicativo SHALL gravar as alterações ainda **não
salvas** do formulário, de modo que o documento contenha exatamente os dados que
o escritor está vendo (RF006-RN013, RF006-CA021).

#### Scenario: Alterações pendentes entram no PDF
- **GIVEN** a tela de detalhe de um personagem salvo está aberta e o escritor
  altera um campo sem salvar
- **WHEN** ele aciona Exportar Ficha
- **THEN** as alterações são gravadas antes de gerar o PDF, e o documento
  contém os dados atualizados (RF006-RN013, RF006-CA021)

#### Scenario: Falha ao salvar bloqueia a exportação
- **GIVEN** a tela de detalhe está aberta com alterações inválidas (por
  exemplo, Nome vazio)
- **WHEN** o escritor aciona Exportar Ficha
- **THEN** a exportação é cancelada com mensagem útil e nenhum PDF é gravado
  (RF006-RN013, RF006-RN009)

### Requirement: Exportação sem biblioteca de PDF
A geração do documento SHALL usar o recurso de **impressão em PDF do próprio
WebView** do aplicativo, reusando o design system existente, e SHALL NOT
acrescentar biblioteca de geração de PDF ao projeto (RF006-RN011, RF006-CA017).

#### Scenario: Sem dependência nova de PDF
- **GIVEN** o projeto tem as dependências declaradas no `package.json` e no
  `Cargo.toml`
- **WHEN** o escritor observa as dependências após este requisito
- **THEN** nenhuma biblioteca de geração de PDF foi acrescentada
  (RF006-RN011, RF006-CA017)
