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

### Requirement: Migração v9 do resumo e final do livro
O sistema SHALL acrescentar, na migração **v9** aditiva, as colunas `resumo` e `final_livro` à tabela `livro`, com texto vazio como padrão, sem editar passos publicados da v1 à v8 e preservando os dados de bancos existentes (RF012-RN002, RF012-CA007).

#### Scenario: Banco v8 migra para v9
- **GIVEN** um banco criado e migrado até a v8 (RF011)
- **WHEN** o aplicativo abre o banco com o RF012
- **THEN** as colunas `resumo` e `final_livro` são criadas e os livros, subgêneros e dados anteriores permanecem intactos (RF012-RN002, RF012-CA007)

#### Scenario: Livros existentes ganham texto vazio
- **GIVEN** um livro foi criado antes da v9, sem resumo nem final
- **WHEN** o banco migra para a v9
- **THEN** o livro passa a ter `resumo` e `final_livro` vazios, sem erro e sem conteúdo fictício (RF012-RN002, RF012-RN007, RF012-CA007)

#### Scenario: Textos pertencem ao livro
- **GIVEN** a tabela `livro` está na v9
- **WHEN** o escritor salva um livro com **Resumo** e **Final do Livro**
- **THEN** os dois textos ficam gravados nas colunas do mesmo registro do livro (RF012-RN003, RF012-CA003)

### Requirement: Migração v10 das abas narrativas
O sistema SHALL acrescentar, na migração **v10** aditiva, as colunas de texto e de listas fechadas das abas **Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo** à tabela `livro` e SHALL criar a tabela filha `livro_humor`, sem editar passos publicados da v1 à v9 e preservando os dados de bancos existentes (RF013-RN003, RF013-CA010).

#### Scenario: Banco v9 migra para v10
- **GIVEN** um banco criado e migrado até a v9 (RF012)
- **WHEN** o aplicativo abre o banco com o RF013
- **THEN** as colunas novas e a tabela `livro_humor` são criadas e os livros, subgêneros, resumo, final e dados anteriores permanecem intactos (RF013-RN003, RF013-CA010)

#### Scenario: Livro existente ganha valores vazios
- **GIVEN** um livro foi criado antes da v10
- **WHEN** o banco migra para a v10
- **THEN** os textos novos ficam vazios, as listas ficam sem valor e o livro não tem nenhum humor, sem erro e sem conteúdo fictício (RF013-RN003, RF013-RN008, RF013-CA010)

#### Scenario: Humor múltiplo no esquema
- **GIVEN** a tabela `livro_humor` existe
- **WHEN** um livro é gravado com **Ironia** e **Sátira**
- **THEN** cada valor é uma linha associada ao `livro_id`, sem repetição do mesmo par (RF013-RN002, RF013-RN006, RF013-CA006)

#### Scenario: Valores fora das listas são recusados
- **GIVEN** o esquema da v10 está aplicado
- **WHEN** o desenvolvedor tenta gravar um humor ou um narrador fora das listas fechadas
- **THEN** o `CHECK` do SQLite recusa a gravação (RF013-RN002, RF013-RN005)

### Requirement: Migração v11 do período da história
O sistema SHALL acrescentar, na migração **v11** aditiva, as colunas `periodo_de` e `periodo_ate` à tabela `livro`, com texto vazio como padrão, sem editar passos publicados da v1 à v10 e preservando os dados de bancos existentes (RF011-RN018, RF011-CA023).

#### Scenario: Banco v10 migra para v11
- **GIVEN** um banco criado e migrado até a v10 (RF013)
- **WHEN** o aplicativo abre o banco com o ajuste do período
- **THEN** as colunas `periodo_de` e `periodo_ate` são criadas e os livros e dados anteriores permanecem intactos (RF011-RN018, RF011-CA023)

#### Scenario: Livro existente ganha período vazio
- **GIVEN** um livro foi criado antes da v11
- **WHEN** o banco migra para a v11
- **THEN** o livro passa a ter `periodo_de` e `periodo_ate` vazios, sem erro e sem conteúdo fictício (RF011-RN018)

#### Scenario: Período é texto livre
- **GIVEN** a tabela `livro` está na v11
- **WHEN** o escritor grava **De** = `Século XXII` e **Até** = `2189`
- **THEN** os dois valores ficam gravados no mesmo registro do livro (RF011-RN018, RF011-CA023)

### Requirement: Migração v12 dos personagens do livro
O sistema SHALL acrescentar, na migração **v12** aditiva, a tabela `livro_personagem` com o par `livro_id` + `personagem_id` como chave primária, referências ao livro e ao personagem global, `CHECK` do **Papel** e as colunas de texto do vínculo, sem editar passos publicados da v1 à v11 e preservando os dados de bancos existentes (RF014-RN006, RF014-RN007, RF014-CA013).

#### Scenario: Banco v11 migra para v12
- **GIVEN** um banco criado e migrado até a v11 (RF011/RF013)
- **WHEN** o aplicativo abre o banco com o RF014
- **THEN** a tabela `livro_personagem` é criada e os livros, subgêneros, abas narrativas, humor, personagens, relações, mundos, entradas e facções permanecem intactos (RF014-RN006, RF014-CA013)

#### Scenario: Livro existente começa sem elenco
- **GIVEN** um livro foi criado antes da v12
- **WHEN** o banco migra para a v12
- **THEN** o livro não tem nenhum personagem associado, sem erro e sem conteúdo fictício (RF014-RN012, RF014-CA013)

#### Scenario: Vínculo duplicado é recusado pelo esquema
- **GIVEN** a tabela `livro_personagem` existe e o par livro–personagem já foi gravado
- **WHEN** o desenvolvedor tenta inserir o mesmo par novamente
- **THEN** a chave primária composta recusa a gravação e o vínculo existente não é alterado (RF014-RN005, RF014-CA013)

#### Scenario: Papel fora da lista é recusado pelo esquema
- **GIVEN** o esquema da v12 está aplicado
- **WHEN** o desenvolvedor tenta gravar um **Papel** fora dos seis valores definidos e do valor vazio
- **THEN** o `CHECK` do SQLite recusa a gravação (RF014-RN004, RF014-CA008, RF014-CA013)

#### Scenario: Personagem em vários livros
- **GIVEN** um personagem global já está associado a um livro
- **WHEN** o mesmo personagem é associado a um segundo livro
- **THEN** existem dois vínculos distintos, um por livro, e a ficha global continua única (RF014-RN001, RF014-CA014)

#### Scenario: Referências exigem livro e personagem existentes
- **GIVEN** a tabela `livro_personagem` existe
- **WHEN** o desenvolvedor tenta gravar um vínculo com `livro_id` ou `personagem_id` inexistente
- **THEN** a chave estrangeira recusa a gravação (RF014-RN006)

### Requirement: Migração v13 dos papéis do vínculo
O sistema SHALL ampliar, na migração **v13** aditiva, o `CHECK` do **Papel** de `livro_personagem` para os treze valores definidos no RF014, recriando a tabela, copiando os vínculos existentes com os seus textos e recriando o índice por `personagem_id`, sem editar passos publicados da v1 à v12 (RF014-RN004, RF014-RN006, RF014-CA008, RF014-CA013).

#### Scenario: Banco v12 migra para v13
- **GIVEN** um banco na v12 com vínculos livro–personagem gravados
- **WHEN** o aplicativo abre o banco com o ajuste do RF014
- **THEN** a tabela `livro_personagem` passa a aceitar os treze papéis, e os vínculos, papéis e textos anteriores permanecem intactos (RF014-RN004, RF014-CA013)

#### Scenario: Papéis novos aceitos pelo esquema
- **GIVEN** o esquema da v13 está aplicado
- **WHEN** o desenvolvedor grava um vínculo com **Oponente**, **Confidente**, **Figurante**, **Coprotagonista**, **Mentor**, **Herói** ou **Vilão**
- **THEN** o `CHECK` do SQLite aceita cada um dos novos valores (RF014-RN004, RF014-CA008)

#### Scenario: Papel fora da lista continua recusado
- **GIVEN** o esquema da v13 está aplicado
- **WHEN** o desenvolvedor tenta gravar um **Papel** fora dos treze valores e do valor vazio
- **THEN** o `CHECK` do SQLite recusa a gravação (RF014-RN004, RF014-CA008)

#### Scenario: Chave composta e referências continuam valendo
- **GIVEN** a tabela `livro_personagem` foi recriada na v13
- **WHEN** o desenvolvedor tenta inserir o mesmo par livro–personagem ou uma referência inexistente
- **THEN** a chave primária composta ou a chave estrangeira recusa a gravação (RF014-RN005, RF014-RN006)

### Requirement: Migração v14 dos capítulos
O sistema SHALL acrescentar, na migração **v14** aditiva, as tabelas `capitulo` (livro, número inteiro único por livro, título, status, tipo, textos de planejamento, cenário e datas) e `capitulo_personagem` (personagem, evento e tipo de evento com `CHECK` da combinação), sem editar passos publicados da v1 à v13 e preservando os dados de bancos existentes (RF015-RN003, RF015-RN006, RF015-RN012, RF015-CA011).

#### Scenario: Banco v13 migra para v14
- **GIVEN** um banco na v13 com livros, personagens, vínculos de elenco e demais dados
- **WHEN** o aplicativo abre o banco com o RF015
- **THEN** as tabelas `capitulo` e `capitulo_personagem` são criadas e os dados anteriores permanecem intactos (RF015-RN006, RF015-CA011)

#### Scenario: Capítulo nasce com os padrões
- **GIVEN** o esquema da v14 está aplicado
- **WHEN** o desenvolvedor insere um capítulo apenas com o livro e o número
- **THEN** o status é **Esboço**, o tipo é **Não definido** e a data de criação é preenchida (RF015-RN002, RF015-RN004)

#### Scenario: Número único por livro
- **GIVEN** um livro já tem o capítulo de número 1
- **WHEN** o desenvolvedor tenta inserir outro capítulo de número 1 no mesmo livro
- **THEN** a chave única recusa a gravação; o mesmo número em outro livro é aceito (RF015-RN003, RF015-CA003)

#### Scenario: Par evento/tipo inválido é recusado
- **GIVEN** a associação capítulo–personagem existe
- **WHEN** o desenvolvedor tenta gravar **Ponto de Virada** com **Ascensão** ou **Neutro** com **Apogeu**
- **THEN** o `CHECK` do SQLite recusa a gravação (RF015-RN005, RF015-CA008, RF015-CA011)

#### Scenario: Referências exigem livro e personagem existentes
- **GIVEN** as tabelas da v14 existem
- **WHEN** o desenvolvedor tenta gravar um capítulo com livro inexistente ou uma associação com personagem inexistente
- **THEN** a chave estrangeira recusa a gravação (RF015-RN001, RF015-RN006)

### Requirement: Migração v15 do motivo do evento
O sistema SHALL acrescentar, na migração **v15** aditiva, a coluna `motivo` em `capitulo_personagem`, com texto livre e valor padrão vazio, sem recriar a tabela nem editar passos publicados da v1 à v14, preservando os capítulos, os personagens do arco e os dados dos livros (RF015-RN005, RF015-RN006, RF015-CA008, RF015-CA018).

#### Scenario: Banco v14 migra para v15
- **GIVEN** um banco na v14 com livros, capítulos e personagens do arco
- **WHEN** o aplicativo abre o banco com o ajuste do RF015
- **THEN** a coluna `motivo` é criada e os capítulos e vínculos anteriores permanecem intactos (RF015-RN006, RF015-CA018)

#### Scenario: Vínculo antigo ganha motivo vazio
- **GIVEN** um vínculo capítulo–personagem gravado antes da v15, com Evento e Tipo de Evento
- **WHEN** a migração v15 termina
- **THEN** o Evento e o Tipo de Evento continuam os mesmos e o **Motivo do Evento** fica vazio (RF015-RN005, RF015-CA018)

#### Scenario: Motivo é gravado e relido
- **GIVEN** a coluna `motivo` existe
- **WHEN** o desenvolvedor grava um texto no vínculo e lê de volta
- **THEN** o mesmo texto é devolvido, sem alterar o Evento nem o Tipo de Evento (RF015-RN005, RF015-CA008)

### Requirement: Migração v16 do motivo do tipo
O sistema SHALL acrescentar, na migração **v16** aditiva, a coluna `motivo_tipo` em `capitulo`, com texto livre e valor padrão vazio, sem recriar a tabela nem editar passos publicados da v1 à v15, preservando os capítulos, os personagens do arco e os dados dos livros (RF015-RN006, RF015-RN013, RF015-CA019).

#### Scenario: Banco v15 migra para v16
- **GIVEN** um banco na v15 com livros, capítulos e personagens do arco
- **WHEN** o aplicativo abre o banco com o ajuste do RF015
- **THEN** a coluna `motivo_tipo` é criada e os capítulos anteriores permanecem intactos (RF015-RN006, RF015-CA019)

#### Scenario: Capítulo antigo ganha motivo vazio
- **GIVEN** um capítulo gravado antes da v16, com Tipo definido
- **WHEN** a migração v16 termina
- **THEN** o Tipo continua o mesmo e o **Motivo do Tipo** fica vazio (RF015-RN013, RF015-CA019)

#### Scenario: Motivo do Tipo é gravado e relido
- **GIVEN** a coluna `motivo_tipo` existe
- **WHEN** o desenvolvedor grava um texto no capítulo e lê de volta
- **THEN** o mesmo texto é devolvido, sem alterar o Tipo nem os demais campos (RF015-RN013, RF015-CA019)

