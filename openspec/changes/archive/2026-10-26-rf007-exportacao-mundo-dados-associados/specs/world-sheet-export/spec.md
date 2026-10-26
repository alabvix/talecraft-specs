## MODIFIED Requirements

### Requirement: Exportação do mundo em PDF
O sistema SHALL gerar o **Documento do Mundo** em PDF a partir dos dados básicos, da imagem do mundo, de **todas as entradas do mundo** e de **todas as facções**, abrindo o **diálogo nativo** para o escritor escolher onde salvar. A exportação SHALL exigir o mundo salvo e SHALL sugerir o nome do mundo com extensão `.pdf`, trocando caracteres inválidos para nome de arquivo (RF007-TL003, RF007-FL006, RF007-RN015, RF007-RN018, RF007-CA025, RF007-CA026, RF007-CA027).

#### Scenario: Exportar o mundo
- **GIVEN** a tela de detalhe de um mundo salvo está aberta, com ou sem entradas e facções cadastradas
- **WHEN** o escritor aciona Exportar Mundo e confirma um destino no diálogo
- **THEN** um arquivo PDF é gerado naquele destino com os dados básicos, a imagem, as entradas e as facções do mundo (RF007-CA026)

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
O documento SHALL conter os dados básicos do mundo — **Nome, Tipo de Mundo, Nível Tecnológico (com o rótulo por extenso), Gêneros e Descrição** —, a **imagem**, quando houver, **todas as entradas do mundo** com todos os campos e as regras dos Sistemas, e **todas as facções** com todos os campos e os personagens associados com papel **Líder** ou **Membro**. O documento SHALL omitir os campos vazios e as categorias sem entradas, e SHALL NOT conter os livros vinculados, pois a associação entre mundo e livro pertence a requisito posterior (RF007-RN017, RF007-CA026, RF008, RF009).

#### Scenario: Dados básicos no documento
- **GIVEN** um mundo com Nome, Tipo de Mundo, Nível Tecnológico, Gêneros e Descrição preenchidos
- **WHEN** o mundo é exportado
- **THEN** todos esses campos aparecem no documento (RF007-CA026)

#### Scenario: Nível Tecnológico por extenso
- **GIVEN** um mundo com Nível Tecnológico "Tipo-2 Estelar"
- **WHEN** o mundo é exportado
- **THEN** o documento mostra "Tipo-2 Estelar", e não apenas o número do nível (RF007-RN017, RF007-CA026)

#### Scenario: Campos vazios são omitidos
- **GIVEN** um mundo tem apenas o Nome preenchido e nenhuma entrada ou facção
- **WHEN** o mundo é exportado
- **THEN** o documento mostra apenas o Nome, sem linhas em branco nem seções vazias (RF007-RN017, RF007-CA026)

#### Scenario: Mundo com imagem
- **GIVEN** um mundo tem uma imagem associada
- **WHEN** o mundo é exportado
- **THEN** a imagem do mundo aparece no documento (RF007-CA026)

#### Scenario: Mundo sem imagem
- **GIVEN** um mundo não tem imagem associada
- **WHEN** o mundo é exportado
- **THEN** o documento é gerado sem imagem e sem erro (RF007-RN017, RF007-CA026)

#### Scenario: Entradas do mundo no documento
- **GIVEN** o mundo tem Localidades, Raças e Povos, Artefatos, Armas, Eventos e Sistemas cadastrados
- **WHEN** o mundo é exportado
- **THEN** o documento traz cada categoria com os nomes e todos os campos preenchidos das entradas (RF008)

#### Scenario: Regras dos Sistemas no documento
- **GIVEN** um Sistema tem regras cadastradas
- **WHEN** o mundo é exportado
- **THEN** o documento traz as regras na ordem cadastrada (RF008)

#### Scenario: Facções e personagens no documento
- **GIVEN** o mundo tem facções com personagens associados em papéis Líder ou Membro
- **WHEN** o mundo é exportado
- **THEN** o documento traz todos os campos das facções e os nomes dos personagens com o papel de cada um (RF009)

#### Scenario: Sem livros vinculados
- **GIVEN** o documento de um mundo é exportado
- **WHEN** o escritor observa o conteúdo
- **THEN** não há seção de livros vinculados, pois a associação entre mundo e livro pertence a requisito posterior (RF007-RN022)
