## MODIFIED Requirements

### Requirement: Modal de detalhe do personagem no livro
O sistema SHALL abrir, ao clicar em um personagem do elenco, uma modal com os dados globais herdados do cadastro em modo somente leitura — retrato, Nome, Idade, Raça, Personalidade, Força, Fraqueza, Interesses, Alcunha e Biografia — e com os campos do vínculo editáveis **Papel**, **Resumo do Papel**, **Papel no mundo**, **Títulos/Outros Nomes** e **Resumo da atuação na história**, todos opcionais, com **Papel** em lista fechada de treze valores e **Salvar** e **Fechar** (RF014-TL004, RF014-TL005, RF014-TL006, RF014-FL003, RF014-FL004, RF014-RN002 a RF014-RN004, RF014-RN007, RF014-CA007 a RF014-CA010).

#### Scenario: Abrir o detalhe do personagem
- **GIVEN** o elenco do livro tem personagens associados
- **WHEN** o escritor clica no card ou na linha de um personagem
- **THEN** a modal de detalhe abre com as áreas **Dados do personagem** e **Vínculo com o livro** e os botões **Salvar** e **Fechar** (RF014-TL004, RF014-CA007)

#### Scenario: Dados globais somente leitura
- **GIVEN** a modal de detalhe está aberta
- **WHEN** o escritor observa a área **Dados do personagem**
- **THEN** vê retrato, Nome, Idade, Raça, Personalidade, Força, Fraqueza, Interesses, Alcunha e Biografia sem poder editá-los, com os campos vazios indicados como não informados (RF014-TL004, RF014-RN002, RF014-CA007)

#### Scenario: Rótulo Títulos/Outros Nomes no vínculo
- **GIVEN** a modal de detalhe está aberta
- **WHEN** o escritor observa os campos do **Vínculo com o livro**
- **THEN** o campo local antes chamado **Alcunha** aparece como **Títulos/Outros Nomes**, enquanto a **Alcunha** da ficha global continua com esse nome na área somente leitura (RF014-TL004, RF014-RN003, RF014-CA007)

#### Scenario: Títulos/Outros Nomes do vínculo independentes
- **GIVEN** o personagem global tem **Alcunha** = `Nove`
- **WHEN** o escritor preenche **Títulos/Outros Nomes** do vínculo com `O Andarilho` e salva
- **THEN** o vínculo guarda `O Andarilho` e a **Alcunha** global continua `Nove` e somente leitura (RF014-RN003, RF014-CA009)

#### Scenario: Papel em lista fechada
- **GIVEN** a modal de detalhe está aberta
- **WHEN** o escritor abre o controle **Papel**
- **THEN** vê **Protagonista**, **Antagonista**, **Coadjuvante**, **Aliado**, **Falso Antagonista**, **Falso Protagonista**, **Oponente**, **Confidente**, **Figurante**, **Coprotagonista**, **Mentor**, **Herói**, **Vilão** e o valor vazio **Não definido** (RF014-TL005, RF014-RN004, RF014-CA008)

#### Scenario: Salvar e reabrir o vínculo
- **GIVEN** o escritor preencheu **Papel**, **Resumo do Papel**, **Papel no mundo**, **Títulos/Outros Nomes** e **Resumo da atuação na história**
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
