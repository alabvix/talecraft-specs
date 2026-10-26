## ADDED Requirements

### Requirement: Estado inicial reflete a inicialização do banco
O comando `estado_inicial` SHALL **deixar de ser um valor fixo** e passar a
refletir o **resultado real da inicialização do banco** (abertura, criação e
migrações). O front-end SHALL manter a **tela de carregamento (splash)** ativa
até esse comando responder com sucesso, e o comando SHALL indicar **falha com
mensagem útil** quando a inicialização não puder ser concluída
(RF003-CA005, RF003-CA009).

#### Scenario: Splash espera a inicialização do banco
- **GIVEN** o aplicativo é iniciado
- **WHEN** o front-end consulta `estado_inicial` durante o carregamento
- **THEN** a tela de carregamento permanece ativa até a inicialização do banco
  concluir com sucesso (RF003-CA005)

#### Scenario: Falha na inicialização é comunicada
- **GIVEN** o banco não pôde ser aberto, criado ou migrado
- **WHEN** o front-end consulta `estado_inicial`
- **THEN** o comando sinaliza a falha com uma mensagem de erro útil ao
  diagnóstico, sem a aplicação encerrar silenciosamente (RF003-CA009)

### Requirement: Operação de teste do banco exposta ao front-end
Além do comando de demonstração, o back-end Rust SHALL expor um comando de
**teste de comunicação com o banco** registrado no Tauri, invocável pelo
front-end via `invoke`, que confirma que o banco respondeu corretamente
(RF003-CA007, RF003-CA008).

#### Scenario: Front-end valida a comunicação pelo comando de teste
- **GIVEN** o aplicativo em execução com o banco aberto pelo back-end
- **WHEN** o front-end invoca o comando de teste via `invoke`
- **THEN** o comando executa uma operação no banco pelo back-end e retorna a
  confirmação ao front-end (RF003-CA007, RF003-CA008)
