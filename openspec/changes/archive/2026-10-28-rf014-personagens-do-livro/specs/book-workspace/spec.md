## ADDED Requirements

### Requirement: Personagens do livro
O sistema SHALL substituir a tela informativa da seção **Personagens** pela listagem dos personagens associados ao livro, em **cards** (padrão) ou **lista**, com o botão **Adicionar Personagens**, a modal de seleção múltipla com **Associar** e **Fechar**, a recusa de vínculo duplicado, o estado vazio e a exigência de livro salvo (RF014-TL001 a RF014-TL003, RF014-FL001, RF014-FL002, RF014-FL005, RF014-RN001, RF014-RN005, RF014-RN008, RF014-RN009, RF014-RN012, RF014-CA001 a RF014-CA006, RF014-CA011, RF014-CA012, RF014-CA015).

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
- **GIVEN** a seção **Personagens** está aberta com o livro salvo
- **WHEN** o escritor clica em **Adicionar Personagens**
- **THEN** a modal lista todos os personagens da biblioteca global com caixa de seleção, retrato e nome, e mostra **Associar** e **Fechar** (RF014-TL003, RF014-CA003)

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

#### Scenario: Livro ainda não salvo
- **GIVEN** a página do livro está em modo de criação, sem registro no banco
- **WHEN** o escritor abre a seção **Personagens**
- **THEN** o botão **Adicionar Personagens** está desabilitado e uma mensagem orienta a salvar o livro antes (RF014-TL002, RF014-FL005, RF014-RN008, RF014-CA002)

#### Scenario: Sem ação de desvincular
- **GIVEN** a seção **Personagens** está aberta com o elenco do livro
- **WHEN** o escritor procura as ações de cada personagem
- **THEN** não encontra botão, ícone ou ação para desvincular o personagem do livro (RF014-RN009, RF014-CA015)

### Requirement: Modal de detalhe do personagem no livro
O sistema SHALL abrir, ao clicar em um personagem do elenco, uma modal com os dados globais herdados do cadastro em modo somente leitura — retrato, Nome, Idade, Raça, Personalidade, Força, Fraqueza, Interesses, Alcunha e Biografia — e com os campos do vínculo editáveis **Papel**, **Resumo do Papel**, **Papel no mundo**, **Alcunha** e **Resumo da atuação na história**, todos opcionais, com **Papel** em lista fechada de seis valores e **Salvar** e **Fechar** (RF014-TL004, RF014-TL005, RF014-TL006, RF014-FL003, RF014-FL004, RF014-RN002 a RF014-RN004, RF014-RN007, RF014-CA007 a RF014-CA010).

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
- **THEN** vê **Protagonista**, **Antagonista**, **Coadjuvante**, **Aliado**, **Falso Antagonista**, **Falso Protagonista** e o valor vazio **Não definido** (RF014-TL005, RF014-RN004, RF014-CA008)

#### Scenario: Salvar e reabrir o vínculo
- **GIVEN** o escritor preencheu **Papel**, **Resumo do Papel**, **Papel no mundo**, **Alcunha** e **Resumo da atuação na história**
- **WHEN** clica em **Salvar** e reabre o mesmo personagem
- **THEN** os cinco valores aparecem como foram gravados, o **Papel** atualiza a listagem e a ficha global permanece inalterada (RF014-FL003, RF014-TL006, RF014-RN007, RF014-CA009)

#### Scenario: Fechar sem salvar
- **GIVEN** a modal de detalhe está aberta com o vínculo preenchido
- **WHEN** o escritor altera os campos e clica em **Fechar**
- **THEN** as alterações pendentes são descartadas e o vínculo anterior continua gravado (RF014-TL006, RF014-FL004, RF014-CA010)

## MODIFIED Requirements

### Requirement: Seções do livro em requisito posterior
O sistema SHALL manter **Capítulos**, **Worldbuilding**, **Gráficos** e **Exportar** no menu lateral do livro e SHALL abrir, ao acioná-los, uma tela informativa da seção, sem conteúdo de domínio e sem navegação para tela inexistente; **Personagens** SHALL deixar de ser seção informativa e passa a ser entregue pelo RF014 (RF011-TL006, RF011-RN010, RF011-CA014, RF014-CA001).

#### Scenario: Seção futura informativa
- **GIVEN** a página do livro está aberta
- **WHEN** o escritor clica em **Capítulos**, **Worldbuilding**, **Gráficos** ou **Exportar**
- **THEN** a seção abre uma tela informativa, sem erro e sem tela em branco (RF011-CA014)

#### Scenario: Personagens fora das seções futuras
- **GIVEN** o RF014 está implementado
- **WHEN** o escritor clica em **Personagens**
- **THEN** a seção abre a listagem do elenco do livro, não a tela informativa (RF014-CA001)

#### Scenario: Sem conteúdo antecipado
- **GIVEN** o RF014 está implementado
- **WHEN** o desenvolvedor inspeciona as seções ainda futuras
- **THEN** não há capítulos, associação livro–mundo, gráficos nem exportação de livro implementados (RF011-RN010)
