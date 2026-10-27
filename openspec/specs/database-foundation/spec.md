# database-foundation Specification

## Purpose
TBD - created by archiving change rf003-infraestrutura-banco-dados. Update Purpose after archive.
## Requirements
### Requirement: SQLite embutido via rusqlite
O back-end Rust SHALL usar **SQLite** por meio da biblioteca **`rusqlite`**
compilada em modo **`bundled`** (o SQLite vai dentro do executável), de modo
que o aplicativo possa ser compilado e executado no Windows **sem instalação
separada do SQLite** e continue funcionando **offline** (RF003-CA001,
RF003-CA011).

#### Scenario: Aplicativo roda sem SQLite instalado
- **GIVEN** uma máquina Windows sem SQLite instalado separadamente
- **WHEN** o aplicativo é compilado e executado
- **THEN** o banco funciona normalmente, porque o SQLite está embutido no
  executável (RF003-CA001, RF003-CA011)

#### Scenario: Nenhuma dependência de rede
- **GIVEN** a máquina está sem conexão de internet
- **WHEN** o aplicativo abre o banco e executa operações
- **THEN** tudo funciona, pois o banco é local e não busca nada na rede
  (RF003-CA011)

### Requirement: Local persistente do banco
O aplicativo SHALL armazenar o arquivo do banco em um **diretório persistente
de dados da aplicação**, resolvido pelo próprio aplicativo (por exemplo, o
diretório de dados do app no Tauri) — **nunca** na pasta de instalação nem no
diretório de execução do Vite (RF003-CA003).

#### Scenario: Banco fica em diretório de dados do aplicativo
- **GIVEN** o aplicativo é executado
- **WHEN** o arquivo do banco é criado
- **THEN** ele é gravado em um diretório de dados persistente do aplicativo,
  fora da pasta de instalação (RF003-CA003)

### Requirement: Criação automática do banco
O aplicativo SHALL criar o arquivo do banco **automaticamente** na primeira
execução, caso o arquivo ainda não exista (RF003-CA002).

#### Scenario: Primeira execução cria o banco
- **GIVEN** o arquivo do banco ainda não existe
- **WHEN** o aplicativo inicia
- **THEN** o arquivo do banco é criado automaticamente (RF003-CA002)

### Requirement: Reuso do banco entre execuções
Nas execuções seguintes, o aplicativo SHALL **reutilizar** o banco existente,
**preservando os dados** gravados anteriormente (RF003-CA004).

#### Scenario: Dados preservados após reabrir
- **GIVEN** o aplicativo gravou um dado no banco em uma execução anterior
- **WHEN** o aplicativo é fechado e reaberto
- **THEN** o banco existente é reutilizado e o dado gravado continua presente
  (RF003-CA004)

### Requirement: Migrações versionadas na subida
A inicialização do banco e a aplicação de **migrações versionadas** SHALL
acontecer **automaticamente quando a aplicação sobe**, e a **tela de
carregamento (splash)** SHALL permanecer ativa enquanto isso acontece
(RF003-CA005).

#### Scenario: Migrações executam na inicialização
- **GIVEN** o aplicativo é iniciado
- **WHEN** a inicialização ocorre
- **THEN** o banco é inicializado e as migrações versionadas são aplicadas
  automaticamente nesse momento (RF003-CA005)

#### Scenario: Splash permanece durante a inicialização
- **GIVEN** o aplicativo está iniciando e o banco está sendo preparado
- **WHEN** a inicialização do banco ainda não terminou
- **THEN** a tela de carregamento (splash) permanece ativa até a inicialização
  concluir (RF003-CA005)

### Requirement: Migrações idempotentes e não destrutivas
As migrações SHALL ser aplicadas **somente quando necessárias** (isto é, quando
o esquema ainda não está na versão alvo), **sem recriar ou apagar dados
existentes** (RF003-CA006). Migrações que criam **tabelas de domínio** de
requisitos posteriores SHALL seguir a mesma regra: apenas **adicionam** tabelas e
colunas, nunca removem nem recriam dados já gravados (RF003-CA006, RF004-CA020).
O mesmo vale quando o requisito posterior precisa **ampliar uma restrição já
publicada** — como o `CHECK` dos tipos de relação —: a mudança SHALL entrar como
**novo passo de migração**, preservando os dados gravados, e **nunca** editando
um passo já publicado (RF005-RN010, RF005-CA015). A migração do domínio de
**mundos** SHALL seguir a mesma regra: a versão **v4** apenas acrescenta as
tabelas do mundo e dos seus gêneros, sem alterar as tabelas de personagens e
relações já publicadas (RF007-RN023, RF007-CA030).

#### Scenario: Banco já atualizado não é migrado de novo
- **GIVEN** o banco já está na versão de esquema mais recente
- **WHEN** o aplicativo inicia novamente
- **THEN** nenhuma migração é reaplicada e os dados existentes permanecem
  intactos (RF003-CA006)

#### Scenario: Migração não destrói dados
- **GIVEN** existe um dado gravado por uma versão anterior do esquema
- **WHEN** uma nova migração é aplicada
- **THEN** os dados existentes são preservados, sem recriação ou remoção de
  tabelas com dados (RF003-CA006)

#### Scenario: Migração de domínio apenas acrescenta o esquema
- **GIVEN** um banco já inicializado pelo RF003, com dados na infraestrutura
- **WHEN** o RF004 aplica a migração que cria as tabelas de personagens
- **THEN** as tabelas de domínio são acrescentadas por uma nova versão de
  esquema, e os dados anteriores permanecem intactos (RF004-CA020)

#### Scenario: Migração amplia restrição sem perder dados
- **GIVEN** um banco criado no RF004, com o `CHECK` de oito tipos e personagens
  e relações já gravados
- **WHEN** o RF005 aplica a migração que amplia a lista de tipos para dez
- **THEN** o esquema passa a aceitar os tipos novos e os personagens e relações
  existentes permanecem intactos (RF005-RN010, RF005-CA015)

#### Scenario: Banco do RF004 aceita os tipos novos após migrar
- **GIVEN** um banco do RF004 foi migrado para o esquema do RF005
- **WHEN** uma relação com o tipo Irmão/Irmã ou Aprendiz é gravada
- **THEN** a gravação é aceita, pois o `CHECK` do esquema foi ampliado
  (RF005-RN010, RF005-CA015)

#### Scenario: Migração de mundos preserva personagens e relações
- **GIVEN** um banco criado no RF006, com personagens, retratos e relações
  familiares gravados
- **WHEN** o RF007 aplica a migração v4 que cria as tabelas de mundos
- **THEN** as tabelas de mundos são acrescentadas e os personagens, retratos e
  relações existentes permanecem intactos (RF007-RN023, RF007-CA030)

#### Scenario: Banco do RF006 aceita mundos após migrar
- **GIVEN** um banco do RF006 foi migrado para o esquema do RF007
- **WHEN** um mundo com Tipo de Mundo e Gêneros válidos é gravado
- **THEN** a gravação é aceita, pois a migração v4 acrescentou as tabelas e as
  restrições do domínio de mundos (RF007-RN023, RF007-CA030)

### Requirement: Conexão gerenciada pelo back-end
A conexão com o banco SHALL ser gerenciada **exclusivamente pelo back-end
Rust**, que expõe operações ao front-end por **comandos Tauri**; o front-end
React SHALL **não** acessar o SQLite diretamente (RF003-CA007).

#### Scenario: Front-end não acessa o banco diretamente
- **GIVEN** o front-end React precisa de dados do banco
- **WHEN** ele obtém esse resultado
- **THEN** isso acontece por meio de um comando Tauri, e não por acesso direto
  ao SQLite a partir do React (RF003-CA007)

### Requirement: Operação de teste de comunicação
O back-end SHALL disponibilizar uma **operação de teste** acessível pelo
front-end para **validar a comunicação com o banco de dados**
(RF003-CA008).

#### Scenario: Teste de comunicação com o banco
- **GIVEN** o aplicativo está em execução com o banco aberto
- **WHEN** o front-end invoca a operação de teste
- **THEN** o back-end responde confirmando que o banco respondeu corretamente
  (RF003-CA008)

### Requirement: Tratamento de falhas do banco
Falhas de **abertura, criação ou migração** do banco SHALL ser tratadas e
retornar **mensagens de erro úteis para diagnóstico**, **sem encerrar
silenciosamente** a aplicação (RF003-CA009).

#### Scenario: Falha ao abrir o banco informa o motivo
- **GIVEN** o banco não pode ser aberto, criado ou migrado (por exemplo,
  caminho sem permissão de escrita)
- **WHEN** o aplicativo tenta inicializar o banco
- **THEN** a falha é tratada e retorna uma mensagem de erro compreensível para
  diagnóstico, sem fechar silenciosamente (RF003-CA009)

### Requirement: Testes automatizados do banco
O projeto SHALL incluir **testes automatizados** que cubram a **criação do
banco**, a **execução das migrações**, a **persistência de dados** e o
**tratamento de falhas** (RF003-CA010).

#### Scenario: Testes cobrem o ciclo do banco
- **GIVEN** o projeto é compilado para testes
- **WHEN** os testes do back-end são executados
- **THEN** existem testes que verificam criação do banco, execução de
  migrações, persistência entre conexões e tratamento de falhas, e todos
  passam (RF003-CA010)

### Requirement: Sem entidades de negócio
Este requisito SHALL **não** introduzir entidades ou funcionalidades de negócio
(como livros, personagens ou capítulos): a infraestrutura é genérica e será
usada pelos requisitos posteriores (RF003-CA012). Essa restrição vale **para o
escopo do RF003**; requisitos posteriores SHALL acrescentar suas próprias
entidades por **migrações versionadas aditivas**, sem alterar a infraestrutura
criada aqui (RF003-CA012, RF004-CA020).

#### Scenario: Banco sem tabelas de domínio
- **GIVEN** a infraestrutura do banco foi implementada
- **WHEN** o esquema inicial é inspecionado
- **THEN** ele contém apenas o necessário para a infraestrutura e as migrações,
  sem tabelas de livros, personagens ou capítulos (RF003-CA012)

#### Scenario: Requisito de domínio acrescenta sua própria migração
- **GIVEN** a infraestrutura do banco já está implementada e validada
- **WHEN** um requisito de domínio precisa de tabelas próprias
- **THEN** ele as cria por uma nova migração versionada, sem modificar a
  migração original do RF003 (RF004-CA020)

### Requirement: Esquema de livros
O sistema SHALL criar, na migração **v7** aditiva, as tabelas `livro` e `livro_subgenero`, sem alterar os passos publicados da v1 à v6 e preservando os dados de bancos existentes (RF011-RN002, RF011-RN003, RF011-RN004, RF011-RN005, RF011-RN006, RF011-RN007).

#### Scenario: Banco v6 migra para v7
- **GIVEN** um banco criado e migrado até a v6 (RF010)
- **WHEN** o aplicativo abre o banco com o RF011
- **THEN** as tabelas `livro` e `livro_subgenero` são criadas e os dados anteriores permanecem intactos (RF011-RN007)

#### Scenario: Título único garantido pelo banco
- **GIVEN** a tabela `livro` existe
- **WHEN** o desenvolvedor inspeciona o esquema
- **THEN** `titulo` é `NOT NULL`, `UNIQUE` e `COLLATE NOCASE`, e as listas fechadas de gênero, faixa de público, idioma e subgênero têm `CHECK` (RF011-RN002 a RF011-RN006)

#### Scenario: Subgêneros pertencem ao livro
- **GIVEN** a tabela `livro_subgenero` existe
- **WHEN** um livro é gravado com subgêneros
- **THEN** cada subgênero é uma linha associada ao `livro_id`, com chave primária composta que impede repetição (RF011-RN004)

### Requirement: Migração v8 dos subgêneros de Fantasia
O sistema SHALL aplicar a migração **v8** aditiva, recriando `livro_subgenero` com o `CHECK` que inclui os doze subgêneros de **Fantasia**, sem editar o passo v7 e preservando os livros e subgêneros existentes (RF011-RN004).

#### Scenario: Banco v7 migra para v8
- **GIVEN** um banco na v7 com um livro e um subgênero de Fantasia já gravados
- **WHEN** o aplicativo abre o banco com este ajuste
- **THEN** a tabela `livro_subgenero` é recriada com o `CHECK` ampliado e o livro e o subgênero anterior continuam gravados (RF011-RN004)

#### Scenario: Novos subgêneros aceitos
- **GIVEN** um livro com Gênero Principal **Fantasia**
- **WHEN** o escritor grava **Grindark**, **Mitológica** ou **Espada e Feitiçaria**
- **THEN** o banco aceita os subgêneros e a leitura devolve a seleção (RF011-RN004, RF011-CA008)

#### Scenario: Subgênero fora da lista continua recusado
- **GIVEN** um livro com Gênero Principal **Fantasia**
- **WHEN** o escritor tenta gravar um subgênero que não pertence à lista de Fantasia
- **THEN** a gravação é recusada com mensagem útil (RF011-RN004)

