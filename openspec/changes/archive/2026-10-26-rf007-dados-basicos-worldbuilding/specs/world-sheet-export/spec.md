## ADDED Requirements

### Requirement: Exportação do mundo em PDF
O sistema SHALL gerar o **Documento do Mundo** em PDF a partir dos dados
básicos e da imagem do mundo, abrindo o **diálogo nativo** para o escritor
escolher onde salvar. A exportação SHALL exigir o mundo salvo e SHALL sugerir o
nome do mundo com extensão `.pdf`, trocando caracteres inválidos para nome de
arquivo (RF007-TL003, RF007-FL006, RF007-RN015, RF007-RN018, RF007-CA025,
RF007-CA026, RF007-CA027).

#### Scenario: Exportar o mundo
- **GIVEN** a tela de detalhe de um mundo salvo está aberta
- **WHEN** o escritor aciona Exportar Mundo e confirma um destino no diálogo
- **THEN** um arquivo PDF é gerado naquele destino com os dados básicos e a
  imagem do mundo (RF007-CA026)

#### Scenario: Exportar exige mundo salvo
- **GIVEN** a tela de detalhe está aberta para um mundo ainda não salvo
- **WHEN** o escritor observa o botão Exportar Mundo
- **THEN** o botão está desabilitado, pois não há registro para exportar
  (RF007-RN015, RF007-CA025)

#### Scenario: Cancelar a exportação
- **GIVEN** o diálogo de salvamento está aberto
- **WHEN** o escritor cancela o diálogo
- **THEN** nenhum arquivo é gravado e a tela permanece inalterada
  (RF007-RN018, RF007-CA027)

#### Scenario: Nome sugerido do arquivo
- **GIVEN** o escritor aciona Exportar Mundo de um mundo chamado "Kepler"
- **WHEN** o diálogo de salvamento abre
- **THEN** o nome sugerido é "Kepler.pdf" (RF007-RN018)

### Requirement: Conteúdo do documento do mundo
O documento SHALL conter os dados básicos do mundo — **Nome, Tipo de Mundo,
Nível Tecnológico (com o rótulo por extenso), Gêneros e Descrição** — e a
**imagem**, quando houver. O documento SHALL omitir os campos vazios e SHALL
NOT conter as entradas do mundo nem os livros vinculados (RF007-RN017,
RF007-CA026).

#### Scenario: Dados básicos no documento
- **GIVEN** um mundo com Nome, Tipo de Mundo, Nível Tecnológico, Gêneros e
  Descrição preenchidos
- **WHEN** o mundo é exportado
- **THEN** todos esses campos aparecem no documento (RF007-CA026)

#### Scenario: Nível Tecnológico por extenso
- **GIVEN** um mundo com Nível Tecnológico "Tipo-2 Estelar"
- **WHEN** o mundo é exportado
- **THEN** o documento mostra "Tipo-2 Estelar", e não apenas o número do nível
  (RF007-RN017, RF007-CA026)

#### Scenario: Campos vazios são omitidos
- **GIVEN** um mundo tem apenas o Nome preenchido
- **WHEN** o mundo é exportado
- **THEN** o documento mostra apenas o Nome, sem linhas em branco dos demais
  campos (RF007-RN017, RF007-CA026)

#### Scenario: Mundo com imagem
- **GIVEN** um mundo tem uma imagem associada
- **WHEN** o mundo é exportado
- **THEN** a imagem do mundo aparece no documento (RF007-CA026)

#### Scenario: Mundo sem imagem
- **GIVEN** um mundo não tem imagem associada
- **WHEN** o mundo é exportado
- **THEN** o documento é gerado sem imagem e sem erro (RF007-RN017,
  RF007-CA026)

#### Scenario: Sem entradas e sem livros
- **GIVEN** o documento de um mundo é exportado
- **WHEN** o escritor observa o conteúdo
- **THEN** não há seção de entradas do mundo nem de livros vinculados
  (RF007-RN017, RF007-CA026)

### Requirement: Exportação do que está na tela
Antes de gerar o PDF, o aplicativo SHALL gravar as alterações ainda **não
salvas** do formulário, de modo que o documento contenha exatamente os dados que
o escritor está vendo (RF007-RN016, RF007-CA028).

#### Scenario: Alterações pendentes entram no PDF
- **GIVEN** a tela de detalhe de um mundo salvo está aberta e o escritor altera
  a Descrição sem salvar
- **WHEN** ele aciona Exportar Mundo
- **THEN** a alteração é gravada antes de gerar o PDF, e o documento contém a
  Descrição atualizada (RF007-RN016, RF007-CA028)

#### Scenario: Falha ao salvar bloqueia a exportação
- **GIVEN** a tela de detalhe está aberta com alterações inválidas (por
  exemplo, Nome vazio)
- **WHEN** o escritor aciona Exportar Mundo
- **THEN** a exportação é cancelada com mensagem útil e nenhum PDF é gravado
  (RF007-RN016, RF007-CA028)

### Requirement: Exportação sem biblioteca de PDF
A geração do documento SHALL usar o recurso de **impressão em PDF do próprio
WebView** do aplicativo, reusando o design system existente, e SHALL NOT
acrescentar biblioteca de geração de PDF ao projeto (RF007-RN019).

#### Scenario: Sem dependência nova de PDF
- **GIVEN** o projeto tem as dependências declaradas no `package.json` e no
  `Cargo.toml`
- **WHEN** o escritor observa as dependências após este requisito
- **THEN** nenhuma biblioteca de geração de PDF foi acrescentada
  (RF007-RN019)
