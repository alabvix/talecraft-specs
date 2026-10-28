## MODIFIED Requirements

### Requirement: Personagens do livro
O sistema SHALL substituir a tela informativa da seção **Personagens** pela listagem dos personagens associados ao livro, em **cards** (padrão) ou **lista**, com o botão **Adicionar Personagens**, a modal de seleção múltipla com **busca por nome** e **grade paginada**, **Associar** e **Fechar**, a recusa de vínculo duplicado, o estado vazio e a exigência de livro salvo (RF014-TL001 a RF014-TL003, RF014-FL001, RF014-FL002, RF014-FL005, RF014-RN001, RF014-RN005, RF014-RN008, RF014-RN009, RF014-RN012, RF014-RN014, RF014-CA001 a RF014-CA006, RF014-CA011, RF014-CA012, RF014-CA015).

#### Scenario: Seção Personagens com conteúdo
- **GIVEN** um livro salvo com personagens associados
- **WHEN** o escritor clica em **Personagens** no menu do livro
- **THEN** a seção lista o elenco do livro em cards, não a tela informativa de requisito posterior (RF014-TL001, RF014-CA001)

#### Scenario: Cards e lista
- **GIVEN** a seção **Personagens** está aberta com personagens associados
- **WHEN** o escritor alterna entre **Cards** e **Lista**
- **THEN** a mesma lista é exibida nas duas visualizações, com retrato, nome e **Papel** do vínculo, ou **Papel não definido** quando vazio (RF014-TL001, RF014-CA006)

#### Scenario: Estado vazio do elenco
- **GIVEN** um livro salvo sem personagens associados
- **WHEN** o escritor abre a seção **Personagens**
- **THEN** vê o estado vazio, o botão **Adicionar Personagens** e a orientação para adicionar personagens (RF014-TL001, RF014-RN012, RF014-CA006)

#### Scenario: Abrir a modal de seleção
- **GIVEN** a seção **Personagens** está aberta com o livro salvo e a biblioteca global tem personagens
- **WHEN** o escritor clica em **Adicionar Personagens**
- **THEN** a modal mostra os personagens em uma grade paginada, com caixa de seleção, retrato, nome, o campo de busca por nome e os botões **Associar** e **Fechar** (RF014-TL003, RF014-RN014, RF014-CA003)

#### Scenario: Busca por nome na modal
- **GIVEN** a modal de seleção está aberta
- **WHEN** o escritor digita parte do nome no campo de busca
- **THEN** a grade mostra somente os personagens cujo nome contém o texto, sem diferenciar maiúsculas, e volta para a primeira página (RF014-TL003, RF014-RN014, RF014-CA003)

#### Scenario: Paginação da grade
- **GIVEN** a biblioteca global tem mais personagens do que cabem em uma página da grade
- **WHEN** o escritor avança para a próxima página
- **THEN** vê os personagens seguintes, com o número da página e o total, e as marcações feitas na página anterior continuam selecionadas (RF014-TL003, RF014-RN014, RF014-CA003)

#### Scenario: Personagem já associado
- **GIVEN** um personagem já está associado ao livro
- **WHEN** o escritor abre a modal de seleção
- **THEN** o personagem aparece com o selo **Já associado** e a caixa de seleção não pode ser marcada (RF014-TL003, RF014-RN005, RF014-CA003, RF014-CA005)

#### Scenario: Associar vários personagens
- **GIVEN** a modal de seleção está aberta com personagens ainda não associados
- **WHEN** o escritor marca dois ou mais personagens e clica em **Associar**
- **THEN** todos os vínculos são criados, a modal fecha e a lista do elenco é atualizada (RF014-FL001, RF014-CA004)

#### Scenario: Sem personagens selecionados
- **GIVEN** a modal de seleção está aberta sem nenhum personagem marcado
- **WHEN** o escritor clica em **Associar**
- **THEN** uma mensagem útil é exibida e nenhum vínculo é criado (RF014-TL003, RF014-CA012)

#### Scenario: Duplicidade recusada
- **GIVEN** um personagem já está associado ao livro
- **WHEN** a tentativa de associação chega ao domínio com esse personagem
- **THEN** nenhum segundo vínculo é criado, os personagens novos da mesma seleção são associados e uma mensagem informa quais já estavam no livro (RF014-FL002, RF014-RN005, RF014-CA005)

#### Scenario: Sem personagens globais
- **GIVEN** a biblioteca global não tem nenhum personagem
- **WHEN** o escritor clica em **Adicionar Personagens**
- **THEN** a modal mostra o estado vazio com orientação para cadastrar personagens na biblioteca global, e **Fechar** funciona (RF014-TL003, RF014-CA011)

#### Scenario: Busca sem resultado
- **GIVEN** a modal de seleção está aberta com personagens na biblioteca global
- **WHEN** o escritor busca um nome que não existe
- **THEN** a modal informa que nenhum personagem corresponde à busca, sem erro e sem apagar a seleção já marcada (RF014-TL003, RF014-RN014, RF014-CA003)

#### Scenario: Livro ainda não salvo
- **GIVEN** a página do livro está em modo de criação, sem registro no banco
- **WHEN** o escritor abre a seção **Personagens**
- **THEN** o botão **Adicionar Personagens** está desabilitado e uma mensagem orienta a salvar o livro antes (RF014-TL002, RF014-FL005, RF014-RN008, RF014-CA002)

#### Scenario: Sem ação de desvincular
- **GIVEN** a seção **Personagens** está aberta com o elenco do livro
- **WHEN** o escritor procura as ações de cada personagem
- **THEN** não encontra botão, ícone ou ação para desvincular o personagem do livro (RF014-RN009, RF014-CA015)

### Requirement: Modal de detalhe do personagem no livro
O sistema SHALL abrir, ao clicar em um personagem do elenco, uma modal com os dados globais herdados do cadastro em modo somente leitura — retrato, Nome, Idade, Raça, Personalidade, Força, Fraqueza, Interesses, Alcunha e Biografia — e com os campos do vínculo editáveis **Papel**, **Resumo do Papel**, **Papel no mundo**, **Alcunha** e **Resumo da atuação na história**, todos opcionais, com **Papel** em lista fechada de treze valores e **Salvar** e **Fechar** (RF014-TL004, RF014-TL005, RF014-TL006, RF014-FL003, RF014-FL004, RF014-RN002 a RF014-RN004, RF014-RN007, RF014-CA007 a RF014-CA010).

#### Scenario: Abrir o detalhe do personagem
- **GIVEN** o elenco do livro tem personagens associados
- **WHEN** o escritor clica no card ou na linha de um personagem
- **THEN** a modal de detalhe abre com as áreas **Dados do personagem** e **Vínculo com o livro** e os botões **Salvar** e **Fechar** (RF014-TL004, RF014-CA007)

#### Scenario: Dados globais somente leitura
- **GIVEN** a modal de detalhe está aberta
- **WHEN** o escritor observa a área **Dados do personagem**
- **THEN** vê retrato, Nome, Idade, Raça, Personalidade, Força, Fraqueza, Interesses, Alcunha e Biografia sem poder editá-los, com os campos vazios indicados como não informados (RF014-TL004, RF014-RN002, RF014-CA007)

#### Scenario: Alcunha do vínculo independente
- **GIVEN** o personagem global tem **Alcunha** = `Nove`
- **WHEN** o escritor preenche a **Alcunha** do vínculo com `O Andarilho` e salva
- **THEN** o vínculo guarda `O Andarilho` e a **Alcunha** global continua `Nove` e somente leitura (RF014-RN003, RF014-CA009)

#### Scenario: Papel em lista fechada
- **GIVEN** a modal de detalhe está aberta
- **WHEN** o escritor abre o controle **Papel**
- **THEN** vê **Protagonista**, **Antagonista**, **Coadjuvante**, **Aliado**, **Falso Antagonista**, **Falso Protagonista**, **Oponente**, **Confidente**, **Figurante**, **Coprotagonista**, **Mentor**, **Herói**, **Vilão** e o valor vazio **Não definido** (RF014-TL005, RF014-RN004, RF014-CA008)

#### Scenario: Salvar e reabrir o vínculo
- **GIVEN** o escritor preencheu **Papel**, **Resumo do Papel**, **Papel no mundo**, **Alcunha** e **Resumo da atuação na história**
- **WHEN** clica em **Salvar** e reabre o mesmo personagem
- **THEN** os cinco valores aparecem como foram gravados, o **Papel** atualiza a listagem e a ficha global permanece inalterada (RF014-FL003, RF014-TL006, RF014-RN007, RF014-CA009)

#### Scenario: Papel novo gravado
- **GIVEN** a modal de detalhe está aberta
- **WHEN** o escritor escolhe **Vilão** (ou outro papel acrescentado pelo ajuste) e clica em **Salvar**
- **THEN** o vínculo guarda o papel novo, a listagem o exibe e reabrir a modal mostra o mesmo valor (RF014-TL005, RF014-RN004, RF014-CA008, RF014-CA009)

#### Scenario: Fechar sem salvar
- **GIVEN** a modal de detalhe está aberta com o vínculo preenchido
- **WHEN** o escritor altera os campos e clica em **Fechar**
- **THEN** as alterações pendentes são descartadas e o vínculo anterior continua gravado (RF014-TL006, RF014-FL004, RF014-CA010)
