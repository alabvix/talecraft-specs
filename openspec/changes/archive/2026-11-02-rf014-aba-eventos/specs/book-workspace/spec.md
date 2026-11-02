## MODIFIED Requirements

### Requirement: Detalhe do personagem no livro
O sistema SHALL abrir, ao clicar em um personagem do elenco, um detalhe **abaixo** da grade/lista, sem modal, organizado em quatro abas: **Dados Globais do Personagem**, com retrato, Nome, Idade, Raça, Personalidade, Força, Fraqueza, Interesses, Alcunha e Biografia em modo somente leitura; **Personagem no Livro**, com os campos editáveis **Papel**, **Resumo do Papel**, **Papel no mundo**, **Títulos/Outros Nomes** e **Resumo da atuação na história**, todos opcionais e com **Papel** em lista fechada de treze valores; **Gráfico de Evolução**, com o gráfico do personagem naquele livro ou o aviso **Ainda não existem dados**; e **Eventos**, com a tabela dos eventos do personagem no livro nas colunas **Capítulo**, **Tipo Evento** e **Motivo do evento**, somente **Ascensão**, **Declínio**, **Apogeu** e **Queda**, cinco linhas por página; **Salvar** SHALL gravar somente o vínculo e manter o detalhe aberto com a confirmação, e o **ícone de fechar** do cabeçalho SHALL fechar o detalhe sem gravar as alterações pendentes, sem botão rotulado **Fechar** (RF014-TL004 a RF014-TL006, RF014-FL003, RF014-FL004, RF014-RN002 a RF014-RN004, RF014-RN007, RF014-RN017, RF014-CA007 a RF014-CA010, RF014-CA021, RF014-CA022, RF014-CA024).

#### Scenario: Abrir o detalhe abaixo da grade
- **GIVEN** o elenco do livro tem personagens associados
- **WHEN** o escritor clica no card ou na linha de um personagem
- **THEN** o detalhe abre abaixo da grade/lista, sem modal, com as abas **Dados Globais do Personagem**, **Personagem no Livro**, **Gráfico de Evolução** e **Eventos**, começando pela primeira, e o item selecionado fica destacado (RF014-TL004, RF014-CA007, RF014-CA021, RF014-CA022)

#### Scenario: Sem botão Fechar
- **GIVEN** o detalhe está aberto em qualquer aba
- **WHEN** o escritor observa o rodapé
- **THEN** não há botão rotulado **Fechar**; o fechamento fica no ícone X do cabeçalho (RF014-TL004, RF014-CA007)

#### Scenario: Dados globais somente leitura
- **GIVEN** o detalhe está aberto na aba **Dados Globais do Personagem**
- **WHEN** o escritor observa os dados herdados
- **THEN** vê retrato, Nome, Idade, Raça, Personalidade, Força, Fraqueza, Interesses, Alcunha e Biografia sem poder editá-los, com os campos vazios indicados como não informados (RF014-TL004, RF014-RN002, RF014-CA007)

#### Scenario: Aba Personagem no Livro editável
- **GIVEN** o detalhe está aberto
- **WHEN** o escritor escolhe a aba **Personagem no Livro**
- **THEN** vê **Papel**, **Resumo do Papel**, **Papel no mundo**, **Títulos/Outros Nomes** e **Resumo da atuação na história** editáveis e o botão **Salvar** (RF014-TL004, RF014-TL005, RF014-CA007)

#### Scenario: Rótulo Títulos/Outros Nomes no vínculo
- **GIVEN** o detalhe está aberto na aba **Personagem no Livro**
- **WHEN** o escritor observa os campos do vínculo
- **THEN** o campo local antes chamado **Alcunha** aparece como **Títulos/Outros Nomes**, enquanto a **Alcunha** da ficha global continua com esse nome na aba somente leitura (RF014-TL004, RF014-RN003, RF014-CA007)

#### Scenario: Títulos/Outros Nomes do vínculo independentes
- **GIVEN** o personagem global tem **Alcunha** = `Nove`
- **WHEN** o escritor preenche **Títulos/Outros Nomes** do vínculo com `O Andarilho` e salva
- **THEN** o vínculo guarda `O Andarilho` e a **Alcunha** global continua `Nove` e somente leitura (RF014-RN003, RF014-CA009)

#### Scenario: Papel em lista fechada
- **GIVEN** o detalhe está aberto na aba **Personagem no Livro**
- **WHEN** o escritor abre o controle **Papel**
- **THEN** vê **Protagonista**, **Antagonista**, **Coadjuvante**, **Aliado**, **Falso Antagonista**, **Falso Protagonista**, **Oponente**, **Confidente**, **Figurante**, **Coprotagonista**, **Mentor**, **Herói**, **Vilão** e o valor vazio **Não definido** (RF014-TL005, RF014-RN004, RF014-CA008)

#### Scenario: Salvar e reabrir o vínculo
- **GIVEN** o escritor preencheu **Papel**, **Resumo do Papel**, **Papel no mundo**, **Títulos/Outros Nomes** e **Resumo da atuação na história**
- **WHEN** clica em **Salvar**
- **THEN** os cinco valores são gravados, o detalhe permanece aberto com a confirmação, o **Papel** atualiza a listagem e a ficha global permanece inalterada (RF014-FL003, RF014-TL006, RF014-RN007, RF014-CA009)

#### Scenario: Papel novo gravado
- **GIVEN** o detalhe está aberto na aba **Personagem no Livro**
- **WHEN** o escritor escolhe **Vilão** (ou outro papel acrescentado pelo ajuste) e clica em **Salvar**
- **THEN** o vínculo guarda o papel novo, a listagem o exibe e reabrir o detalhe mostra o mesmo valor (RF014-TL005, RF014-RN004, RF014-CA008, RF014-CA009)

#### Scenario: Fechar sem salvar
- **GIVEN** o detalhe está aberto com o vínculo preenchido
- **WHEN** o escritor altera os campos e clica no ícone X do cabeçalho
- **THEN** o detalhe fecha, as alterações pendentes são descartadas e o vínculo anterior continua gravado (RF014-TL006, RF014-FL004, RF014-CA010)

#### Scenario: Aba do gráfico de evolução
- **GIVEN** o personagem aparece em capítulos do livro com eventos
- **WHEN** o escritor escolhe a aba **Gráfico de Evolução**
- **THEN** vê o gráfico de evolução do personagem naquele livro, com os marcadores do RF016 (RF014-CA021, RF016-TL003, RF016-RN004, RF016-CA005)

#### Scenario: Gráfico sem dados
- **GIVEN** o personagem não aparece em nenhum capítulo do livro ou não tem eventos
- **WHEN** o escritor escolhe a aba do gráfico
- **THEN** vê **Ainda não existem dados** e a orientação para adicionar o personagem aos capítulos, sem gráfico quebrado (RF014-CA021)

#### Scenario: Aba Eventos com tabela paginada
- **GIVEN** o personagem tem seis eventos de Ascensão, Declínio, Apogeu ou Queda em capítulos do livro
- **WHEN** o escritor escolhe a aba **Eventos**
- **THEN** vê a tabela com **Capítulo**, **Tipo Evento** e **Motivo do evento**, cinco linhas na primeira página, **Página 1 de 2**, **Anterior** desabilitado e **Próxima** habilitado; avançar mostra a sexta linha e desabilita **Próxima** (RF014-RN017, RF014-CA024)

#### Scenario: Eventos Neutro fora da tabela
- **GIVEN** o personagem tem um evento **Neutro** em um capítulo
- **WHEN** o escritor abre a aba **Eventos**
- **THEN** a linha desse capítulo não aparece; a tabela lista somente Ascensão, Declínio, Apogeu e Queda, com motivo vazio exibido como **—** (RF014-RN017, RF014-CA024)
