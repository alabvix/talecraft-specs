## ADDED Requirements

### Requirement: Tela de seleção de temas
A tela **Temas**, no grupo **Preferências**, SHALL exibir apenas o painel de
seleção de temas, igual ao protótipo, com o tema **Blade Byte** selecionado e a
possibilidade de escolher **Old Tower** e **Tundra** (RF002-TL005,
RF002-CA004).

#### Scenario: Painel de seleção com os três temas
- **GIVEN** o usuário abre a tela Temas
- **WHEN** a tela é exibida
- **THEN** o painel de seleção mostra os cartões **Blade Byte**, **Old Tower** e
  **Tundra**, com a prévia de cada tema, e apenas esse painel é exibido
  (RF002-TL005, RF002-CA004)

#### Scenario: Tema atual indicado na tela
- **GIVEN** o usuário abre a tela Temas
- **WHEN** um tema está ativo
- **THEN** o cartão do tema ativo aparece marcado como selecionado
  (RF002-TL005, RF002-CA004)

### Requirement: Tema corrente padrão
Na primeira execução, sem preferência salva, o aplicativo SHALL usar o tema
**Blade Byte** (RF002-RN001).

#### Scenario: Primeira abertura usa Blade Byte
- **GIVEN** o aplicativo é aberto pela primeira vez (sem preferência salva)
- **WHEN** a interface é carregada
- **THEN** o tema aplicado é **Blade Byte** (RF002-RN001)

### Requirement: Troca imediata de tema
Ao clicar em um tema na tela Temas, o aplicativo SHALL aplicar o tema
imediatamente a toda a interface, sem exigir reinicialização (RF002-FL001,
RF002-CA005).

#### Scenario: Troca de tema atualiza a interface na hora
- **GIVEN** o usuário está na tela Temas com um tema ativo
- **WHEN** ele clica em outro tema
- **THEN** toda a interface passa a exibir o novo tema imediatamente, sem
  reiniciar o aplicativo (RF002-FL001, RF002-CA005)

### Requirement: Persistência da preferência de tema
Ao escolher um tema, o aplicativo SHALL salvar a preferência; ao fechar e
reabrir, o aplicativo SHALL exibir o tema escolhido (RF002-FL001, RF002-CA006).

#### Scenario: Tema permanece após reabrir
- **GIVEN** o usuário escolheu um tema diferente do padrão
- **WHEN** ele fecha e reabre o aplicativo
- **THEN** o aplicativo exibe o tema escolhido, e não o padrão
  (RF002-FL001, RF002-CA006)
