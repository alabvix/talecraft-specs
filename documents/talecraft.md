# Projeto: TaleCraft

## Descrição

TaleCraft é um aplicativo para planejamento de escrita de livros de Ficção Científica, Fantasia e Terror. Podendo também ser utilizado para outros gêneros que possuam estrutura narrativa semelhante. O foco do aplicativo não é a escrita em si, mas todas as etapas de planejamento e servir como uma base de dados de informações do livro. O aplicativo deve ser desktop, uma vez que muitos escritores preferem trabalhar Offline e manter total controle sobre seus dados. Os domínios do sistema são: Personagens, Worldbuilding (artefatos, armas, sistemas de magia, localidaes, raças, eventos...), Capítulos, Dados do Livro (Título, temas, pontos de conflito, voz narrativa, gênero, etc). Além de permitir a visualização de gráficos de curva de personagens e capítulos. Os detalhes dos dados de cada domínio serão detalhados nos requisitos funcionais. Além da criação do planejamento do livro, o TaleCraft também vai permitir exportar o planjamento em formato HTML, PDF e MD.

## Dados do Projeto

- **Tipo:** App
- **Plataforma:** Desktop
- **Data de criação:** 19/10/2026

## Requisitos Funcionais

### RF001 — Estrutura inicial e execução da aplicação TaleCraft

Objetivo 

Criar a estrutura inicial do TaleCraft, garantindo que o aplicativo desktop possa ser executado na máquina de desenvolvimento.

Stack tecnológica

Desktop: Tauri 2.
Back-end: Rust.
Front-end: React com JavaScript e Vite.
Banco de dados: SQLite, previsto para requisitos posteriores.
Ambiente de desenvolvimento inicial: Windows.

Fora do escopo

Não implementar banco de dados funcional, entidades de negócio, gerenciamento de livros, personagens, capítulos, exportação ou outras funcionalidades do TaleCraft neste requisito.

Definição de pronto

O requisito está concluído quando o desenvolvedor consegue preparar o ambiente, executar o TaleCraft, validar a comunicação entre React e Rust e compilar e executar a aplicação no Windows.

- **Data de criação:** 20/10/2026

#### Regras de Negócio

- **RF001-RN001** — Estrutura do projeto: criar a estrutura inicial do projeto, incluindo as configurações do Tauri, Rust, React e Vite.
- **RF001-RN002** — Interface inicial: Exibir uma janela desktop com o nome TaleCraft e uma mensagem de inicialização bem-sucedida.
- **RF001-RN003** — Comunicação entre camadas: implementar um comando Rust de demonstração, invocado pelo React por meio do Tauri, para validar a comunicação entre front-end e back-end.
- **RF001-RN004** — Execução em desenvolvimento: configurar os comandos necessários para iniciar o aplicativo a partir da raiz do projeto, incluindo o servidor Vite e a janela desktop.
- **RF001-RN005** — Compilação: configurar a compilação do aplicativo para Windows, permitindo executar a versão compilada sem depender do servidor de desenvolvimento.
- **RF001-RN006** — Documentação: Documentar os pré-requisitos, a preparação do ambiente e os comandos para executar e compilar o aplicativo.

#### Critérios de Aceite

- **RF001-CA001** — Configuração: O projeto pode ser configurado em uma máquina Windows seguindo a documentação.
- **RF001-CA002** — Iniciação: O aplicativo inicia em uma janela desktop por meio de um comando documentado.
- **RF001-CA003** — React: A interface React é carregada corretamente.
- **RF001-CA004** — Retorno do Rust: O comando Rust de demonstração retorna uma resposta exibida pelo front-end.
- **RF001-CA005** — Compilação: A aplicação compila e a versão compilada inicia corretamente.

### RF002 — Interface visual, navegação e temas

Implementar a interface visual do TaleCraft com base no protótipo fornecido, incluindo o menu lateral, as páginas iniciais, a navegação e o sistema de temas visuais.

Já existe um protótipo em HTML/JS em:
C:\Users\alabh\workspace\apps\java\talecraft\prototype

Se basear nele, usando os mesmos estilos e cores.

Fora do escopo

Implementação de CRUD, persistência de livros e personagens, gerenciamento de conteúdo, autenticação ou funcionalidades específicas das páginas, exceto a seleção e persistência do tema.

Definição de pronto

O TaleCraft apresenta o layout do protótipo, permite navegar pelas páginas iniciais e trocar entre todos os temas previstos, mantendo a preferência selecionada entre execuções.

Os temas devem ser tratados como uma funcionalidade transversal. A página Temas é apenas o local de seleção; cores, textos, superfícies, bordas, estados ativos e demais propriedades visuais devem ser controlados pelo tema global, conforme definido no protótipo.

- **Data de criação:** 20/10/2026

#### Telas

- **RF002-TL001** — Tela Principal: A tela principal está no protótipo do arquivo index.html.
Ela deve exibir o menu lateral e a logo clicável, conforme o protóptio.
Apresentar os menus:

Início
- Meus Livros
- Personagens
- Worldbuilding

Preferências
- Temas

Livro Aberto
-[nome do livro]

Ao clicar em um item de menu, abrir a tela correspondente, porém vazia.
Ao acessar a tela, exibir sempre a página Meus Livros no detalhe como página inicial.
- **RF002-TL002** — Tela Meus Livros: Criar a tela vazia, apenas com uma descrição de seu nome.
- **RF002-TL003** — Tela Personagens: Criar a tela vazia, apenas com uma descrição de seu nome.
- **RF002-TL004** — Tela Worlbuilding: Criar a tela vazia, apenas com a descrição de seu nome.
- **RF002-TL005** — Tela Temas: Essa tela aparece na divisão PREFERÊNCIAS.
Deve exibir a página exatamente igual ao protótipo, com o tema Blade Byte selecionado e permitir selecionar os outros dois temas: Old Tower e Tundra.

Deixar na tela apenas o painel de seleção de temas.
- **RF002-TL006** — Tela Livro Aberto: Exibir a tela vazia.
- **RF002-TL007** — Tela Splash: Exibir uma janela Splesh antes de abrir a tela principal.

#### Fluxos

- **RF002-FL001** — Seleção de Temas: Ao acessar a tela Temas e clicar em um tema, a aplicação deve aplicar o tema imediamente e salvar a preferência do usuário, de forma que, se fechar a app e abrir novamente, ela deve exibir o tema selecionado.

#### Regras de Negócio

- **RF002-RN001** — Tema Corrente: O aplicativo ao ser aberto pela primeira vez deve sempre usar o tema Blade Byte.

#### Critérios de Aceite

- **RF002-CA001** — Compatibilidade: A aplicação mantém a execução desktop estabelecida no RF-001.
- **RF002-CA002** — Layout: O layout corresponde visualmente ao protótipo.
- **RF002-CA003** — Navegação: Todas as opções do menu abrem as páginas corretas e atualizam o item ativo.
- **RF002-CA004** — Temas e seleção: Todos os temas definidos no protótipo estão disponíveis para seleção.
- **RF002-CA005** — Tema - Troca: A troca de tema atualiza toda a interface sem exigir reinicialização.
- **RF002-CA006** — Tema - persistência: O tema escolhido permanece ativo após fechar e reabrir a aplicação.
- **RF002-CA007** — Aderência: Os componentes respeitam o tema ativo, sem estilos incompatíveis ou cores indevidamente fixas.
- **RF002-CA008** — Compatibilidade stack tech: A aplicação permanece compatível com React, JavaScript, Vite, Tauri e Rust, e compila corretamente.

### RF003 — Infraestrutura do banco de dados

Configurar SQLite no backend Rust, definir o local do arquivo de banco, inicializar a conexão e implementar migrações de esquema. Validar a persistência com uma operação simples de teste.

Decisões técnicas:
- SQLite local: sem servidor externo e sem dependência de internet.
- Acesso pelo Rust: centralizar as operações de banco no backend, expondo comandos Tauri ao React. Isso evita espalhar SQL pela interface.
- Migrações versionadas: permitir evoluir o esquema sem depender de criação manual de tabelas.
- Local persistente adequado: armazenar o banco no diretório de dados da aplicação, e não na pasta de instalação nem no diretório de execução do Vite.
- Inicialização segura: criar ou abrir o banco automaticamente na inicialização e apresentar erros compreensíveis se houver falha.
- Testes automatizados: validar criação do banco, execução de migrações e persistência após fechar e reabrir a conexão.
- Usar a biblioteca rusqlite

Definição de pronto
O requisito está concluído quando a aplicação consegue criar ou abrir o banco SQLite, executar suas migrações, realizar uma operação de teste pelo frontend e preservar os dados entre execuções, com testes automatizados passando e sem comprometer as funcionalidades existentes.

- **Data de criação:** 20/10/2026

#### Critérios de Aceite

- **RF003-CA001** — Rusqlite: O projeto utiliza SQLite com rusqlite, integrado ao backend Rust da aplicação Tauri.
- **RF003-CA002** — Arquivo do banco de dados: O banco de dados é criado automaticamente na primeira execução, caso ainda não exista.
- **RF003-CA003** — Armazenamento do banco: O arquivo do banco é armazenado em um diretório persistente de dados da aplicação, fora da pasta de instalação.
- **RF003-CA004** — Reuso do Banco: Nas execuções seguintes, a aplicação reutiliza o banco existente, preservando os dados.
- **RF003-CA005** — Migrações no start up: A inicialização do banco e a aplicação de migrações versionadas são executadas automaticamente, quando a aplicação sobe, nesse momento, deixar a tela Splash ativa
- **RF003-CA006** — Migrações: As migrações são aplicadas somente quando necessárias, sem recriar ou apagar dados existentes.
- **RF003-CA007** — Conexão: A conexão com o banco é gerenciada pelo backend Rust, sem acesso direto ao SQLite pelo React.
- **RF003-CA008** — Teste de comunicação: O backend disponibiliza uma operação de teste acessível pelo frontend para validar a comunicação com o banco de dados.
- **RF003-CA009** — Tratamento de Falhas: Falhas na abertura, criação ou migração do banco são tratadas e retornam mensagens de erro úteis para diagnóstico, sem encerrar silenciosamente a aplicação.
- **RF003-CA010** — Testes para validar criação e execução: O projeto inclui testes automatizados para criação do banco, execução de migrações, persistência de dados e tratamento de falhas.
- **RF003-CA011** — Execução offline: A aplicação continua funcionando offline e pode ser compilada e executada no Windows sem exigir uma instalação separada do SQLite.
- **RF003-CA012** — Não cria entidades: A implementação não introduz entidades ou funcionalidades de negócio, como livros, personagens ou capítulos, que serão desenvolvidas em requisitos posteriores.

### RF004 — Personagens

Tela para gerenciar personagens. Os personagens são uma entidade/domínio separado. Eles podem ser compartilhados entre vários livros.  Neste resquisito, vamos construir apenas o Personagem enquanto entidade global, apartada do livro.

Um personagem pode se relacioanar com outro, veja Tela de Relações de Personagem para os detalhes.

Cada personagem tem os seguintes atributos gerais (quando entidades únicas):
-Nome
-Idade
-Retrato/Imagem (caminho para um arquivo de imagem armazenado no disco)
-Personalidade
-Força
-Fraqueza
-Interesses
-Raça
-Alcunha
-Biografia
-Relações (lista)

Para salvar um personagem, apenas o nome é obrigatório. Todos os campos são string, exceto Relações.
Apenas o campo Nome é obrigatório para salvar um personagem.

Vamos precisar de duas tabelas:
1. personagem_global
2. relação_personagem

- **Data de criação:** 20/10/2026

#### Telas

- **RF004-TL001** — Tela Principal de Personagem: É acessada ao se clicar no menu Personagens da barra lateral. Deve permitir visualizar os persoangens em formato de cards (conforme o protótipo) ou de lista.

Deve permitir uma busca de persoangen nesse momento pelop nome, usando a barra de busca geral, como no protótipo.

Deve permir invcluir novo personagem.

Ao se clicar em um card o personagem ou em seu nome se a exibição for lista, acessar a Tela de detalhe do personagem.

Nessa tela, exibir como no protótipo. A parte de Vínculos com livros e Curva de arco em cada livro nesse momento não terá dados.

O campo listbox Filtrar Por Livro não deve apresentar ainda nenhum dado.

Protótipo da tela de personagens: C:/Users/alabh/workspace/apps/java/talecraft/prototype/personagens-biblioteca.html
- **RF004-TL002** — Tela de Detalhe de Personagem: Essa tela lista os dados do personagem, conforme o protótipo em: file:///C:/Users/alabh/workspace/apps/java/talecraft/prototype/personagem.html
O card de Vínculos com Livros ainda não deve apresentar nada, pois a funcionalidade de associar personagem ao livro ainda não foi feita.

A sessão de Curva de Arco em cada livro também não deve apresentar o gráfico, pois ainda não temos a ligação do persagem com o livro.

Seguir a disposição e elementos visuais conforme o protótipo, contudo, usar os campos que estão definidos no requisito, pois nem todos existem no protótipo.

Essa tela também deve ser aberta ao se criar um novo personagem.

Painel de Relações Globais.
Lista os personagens relacionados e, ao clicar em Gerenciar Relações, abrir uma janela Modal, "Tela de Relações" onde o escritor poderá selecionar outro personagem e a relação, salvando a relação.
- **RF004-TL003** — Tela de Relações de Personagem: Essa tela abre no botão Gerenciar Relação da tela de detalhe do personagem.

Ela deve abrir como um ajanela Modal, listando os personagens cadastrados em uma tabela, com uma versão menor da imagem, se existir, o nome do personagem e o nível de relação:
-Rival
-Mentor
-Inimigo
-Filho/Filha
-Mãe/Pai
-Aliado
-Conjugue
-Namorado

#### Regras de Negócio

- **RF004-RN001** — Relação: O botão para adicionar Relação só pode ser habilitado quando existir Personagem Salvo.
- **RF004-RN002** — Imagem do Personagem: A imagem só pode ser associada se o personagem for salvo no banco de dados, ou seja, ele deve existir no banco.
- **RF004-RN003** — Campos obrigatórios: Apenas o campo Nome é obrigatório para salvar um personagem. Todos os demais campos são opcionais.
- **RF004-RN004** — Tipo dos campos: Todos os atributos do personagem são textos (string), exceto Relações, que é uma lista de vínculos com outros personagens.
- **RF004-RN005** — Nome único: Não pode existir mais de um personagem com o mesmo nome. Ao tentar salvar um nome já existente, a aplicação impede a gravação e informa o conflito.
- **RF004-RN006** — Tipos de relação fechados: O tipo de uma relação entre personagens deve ser um dos oito valores previstos: Rival, Mentor, Inimigo, Filho/Filha, Mãe/Pai, Aliado, Cônjuge e Namorado. Não é permitido texto livre.
- **RF004-RN007** — Sem autorrelação: Um personagem não pode ter uma relação consigo mesmo.
- **RF004-RN008** — Relação única por par: Não pode haver mais de uma relação entre o mesmo par de personagens; ao selecionar um personagem já relacionado, a relação existente é atualizada em vez de duplicada.
- **RF004-RN009** — Sem exclusão neste requisito: A exclusão de personagens não faz parte deste requisito; nenhum personagem é excluído nesta etapa.

#### Critérios de Aceite

- **RF004-CA001** — Personagem Salvo no banco: Ao clicar no botão Salvar, o personagem deve ser salvo com sucesso no banco de dados, caso tenha relações, as mesmas devem ser salvas na respectiva tabela.
- **RF004-CA002** — Somente Nome obrigatório: Um personagem com apenas o Nome preenchido pode ser salvo com sucesso.
- **RF004-CA003** — Nome obrigatório: Não é possível salvar um personagem sem Nome; a aplicação informa que o Nome é obrigatório.
- **RF004-CA004** — Lista de personagens: A tela principal lista os personagens cadastrados, permitindo alternar entre a exibição em cards e em lista.
- **RF004-CA005** — Inclusão: A tela principal permite iniciar a inclusão de um novo personagem, abrindo a tela de detalhe vazia.
- **RF004-CA006** — Busca por nome: A barra de busca filtra os personagens exibidos pelo nome, sem diferenciar maiúsculas de minúsculas.
- **RF004-CA007** — Acesso ao detalhe: Clicar em um card ou no nome de um personagem (na exibição em lista) abre a tela de detalhe do personagem selecionado.
- **RF004-CA008** — Detalhe do personagem: A tela de detalhe exibe os dados do personagem e permite editá-los e salvar as alterações.
- **RF004-CA009** — Vínculos e curva sem dados: Na tela de detalhe, o card de Vínculos com Livros e a seção de Curva de Arco em cada livro não apresentam dados, pois a associação entre personagem e livro ainda não existe.
- **RF004-CA010** — Filtrar por livro vazio: O campo de seleção "Filtrar por livro" da tela principal não apresenta nenhuma opção de livro cadastrado.
- **RF004-CA011** — Painel de relações: A tela de detalhe exibe o painel de Relações Globais, listando os personagens relacionados do personagem atual.
- **RF004-CA012** — Gerenciar relações: O botão Gerenciar Relações abre a janela modal de Relações de Personagem.
- **RF004-CA013** — Lista de personagens na modal: A janela modal lista os personagens cadastrados com uma versão reduzida da imagem (quando existir), o nome e o seletor de nível de relação com os oito tipos previstos.
- **RF004-CA014** — Gravação da relação: Ao definir o nível e confirmar, a relação é gravada e passa a aparecer no painel de Relações Globais do personagem.
- **RF004-CA015** — Relação exige personagem salvo: O botão de adicionar relação permanece desabilitado enquanto o personagem não estiver salvo no banco.
- **RF004-CA016** — Imagem exige personagem salvo: A associação de imagem só é permitida quando o personagem já está salvo no banco; um personagem sem retrato exibe um espaço reservado.
- **RF004-CA017** — Retrato persistido: Ao associar um retrato, o arquivo é copiado para um local de dados do aplicativo e o caminho é gravado no registro do personagem, permanecendo disponível após fechar e reabrir a aplicação.
- **RF004-CA018** — Limite do retrato: O retrato aceita arquivos de imagem de até 4 MB; arquivos maiores ou de formato não suportado são recusados com mensagem útil, sem travar a aplicação.
- **RF004-CA019** — Persistência: Os personagens e suas relações permanecem disponíveis após fechar e reabrir a aplicação.
- **RF004-CA020** — Migração do esquema: O esquema do banco é evoluído por migração versionada, sem recriar nem apagar dados existentes, e sem alterar as entidades de requisitos anteriores.
- **RF004-CA021** — Separação de camadas: As operações de personagens e relações são executadas pelo back-end Rust, expostas ao React por comandos Tauri, sem SQL na interface.
- **RF004-CA022** — Sem vínculo com livro: Este requisito não cria a associação entre personagem e livro nem dados por livro (papel narrativo, arco); isso pertence a requisito posterior.
- **RF004-CA023** — Testes automatizados: O projeto inclui testes automatizados para criação, leitura, atualização, validação do Nome obrigatório e gravação de relações.
- **RF004-CA024** — Tema e navegação preservados: As telas de personagens respeitam o tema ativo e mantêm a navegação e o splash estabelecidos nos requisitos anteriores, sem regressão.

### RF005 — Tela de Personagens: relações familiares, bidirecionalidade e árvore familiar

Este requisito ajusta o domínio de Personagens do RF004 em três frentes: acrescenta os tipos de relação familiar **Irmão/Irmã** e **Aprendiz**, torna **todas** as relações **bidirecionais** (gravando automaticamente o par espelhado) e acrescenta o quadro **Família** na tela de Detalhe de Personagem, desenhando a árvore familiar.

Este requisito **revoga** a característica de relação **direcionada** estabelecida no RF004 (decisão D4): todas as relações passam a ser bidirecionais, para todos os tipos.

- **Data de criação:** 21/10/2026

#### Telas

- **RF005-TL001** — Tela de Relações de Personagem (atualizada): a janela modal do RF004-TL003 passa a listar **dez** tipos de relação, incluindo Irmão/Irmã e Aprendiz.

A lista completa de níveis de relação passa a ser:
-Rival
-Mentor
-Aprendiz
-Inimigo
-Filho/Filha
-Mãe/Pai
-Irmão/Irmã
-Aliado
-Cônjuge
-Namorado

- **RF005-TL002** — Quadro Família: novo quadro na tela de Detalhe de Personagem (RF004-TL002), exibido **abaixo** do quadro de Relações Globais, contendo a árvore familiar do personagem. Referência visual: os gráficos em SVG do protótipo (`prototype/personagem.html` e `prototype/graficos.html`).

#### Regras de Negócio

- **RF005-RN001** — Tipos de relação fechados (revoga RF004-RN006): o tipo de uma relação deve ser um dos **dez** valores previstos: Rival, Mentor, Aprendiz, Inimigo, Filho/Filha, Mãe/Pai, Irmão/Irmã, Aliado, Cônjuge e Namorado. Não é permitido texto livre.
- **RF005-RN002** — Bidirecionalidade (revoga o sentido direcionado do RF004): toda relação é gravada em **par espelhado**. Ao gravar A→B com um tipo, o sistema grava automaticamente B→A com o tipo correspondente, conforme a tabela de espelho.
- **RF005-RN003** — Tabela de espelho: o tipo gravado na volta depende do tipo gravado na ida.
  - **Pares assimétricos:** Filho/Filha ⇄ Mãe/Pai e Mentor ⇄ Aprendiz.
  - **Pares simétricos** (espelham a si mesmos): Rival, Inimigo, Aliado, Irmão/Irmã, Cônjuge e Namorado.
- **RF005-RN004** — Sentido da aresta familiar: em uma relação Filho/Filha gravada de A para B, **A é filho/filha de B** e, pelo espelho, **B é mãe/pai de A**.
- **RF005-RN005** — Sem linhagem circular: não é permitido gravar uma relação familiar que crie ciclo de ascendência — por exemplo, A é Filho/Filha de B e B é Filho/Filha de A, ou A é mãe/pai de B, B é mãe/pai de C e C é mãe/pai de A. A aplicação recusa a gravação com mensagem útil, sem travar.
- **RF005-RN006** — Escopo da árvore familiar: a árvore do quadro Família usa apenas as relações familiares — Filho/Filha, Mãe/Pai, Irmão/Irmã e Cônjuge. As demais relações não entram na árvore.
- **RF005-RN007** — Irmãos por declaração: o tipo Irmão/Irmã **declarado** é a fonte da verdade para o parentesco de irmãos; a árvore **não** o deduz de uma mãe/pai em comum. Quando os irmãos não tiverem mãe/pai cadastrado, a árvore exibe um nó "?" acima deles, representando o ascendente ausente.
- **RF005-RN008** — Cônjuge como parceiro: Cônjuge é representado na árvore como **parceiro no mesmo nível** do personagem, ligado por uma linha de união, com os descendentes posicionados abaixo do casal.
- **RF005-RN009** — Profundidade da árvore: a árvore percorre **toda a linhagem** do personagem — sobe por todos os ascendentes (mãe/pai, avós…) e desce por todos os descendentes (filhos, netos…).
- **RF005-RN010** — Migração do esquema: os novos tipos e a bidirecionalidade entram por **migração versionada aditiva** (v3), sem recriar nem apagar dados existentes e sem alterar as entidades dos requisitos anteriores.

#### Critérios de Aceite

- **RF005-CA001** — Tipos listados: a modal de Relações lista os dez tipos previstos, incluindo Irmão/Irmã e Aprendiz.
- **RF005-CA002** — Par espelhado assimétrico: ao gravar Ofélia como Filho/Filha de Esther, o sistema grava automaticamente Esther como Mãe/Pai de Ofélia.
- **RF005-CA003** — Par espelhado simétrico: ao gravar Ofélia como Rival de Kael, o sistema grava automaticamente Kael como Rival de Ofélia; o mesmo vale para Irmão/Irmã, Inimigo, Aliado, Cônjuge e Namorado.
- **RF005-CA004** — Par espelhado de Mentor: ao gravar A como Mentor de B, o sistema grava automaticamente B como Aprendiz de A.
- **RF005-CA005** — Exibição nas duas páginas: a relação aparece nas duas telas de detalhe, cada uma com o seu lado do par — na página de Ofélia, Esther aparece como Mãe/Pai; na página de Esther, Ofélia aparece como Filho/Filha.
- **RF005-CA006** — Atualização do par: ao alterar o tipo de uma relação já existente, o par espelhado é atualizado junto, mantendo a coerência.
- **RF005-CA007** — Ciclo recusado: uma relação familiar que criaria ciclo de ascendência é recusada com mensagem útil, sem travar a aplicação.
- **RF005-CA008** — Quadro Família: a tela de Detalhe de Personagem exibe o quadro Família abaixo do quadro de Relações Globais.
- **RF005-CA009** — Árvore familiar: o quadro Família desenha a árvore a partir das relações familiares, com ascendentes acima e descendentes abaixo do personagem.
- **RF005-CA010** — Irmãos na árvore: personagens ligados por Irmão/Irmã aparecem lado a lado, no mesmo nível.
- **RF005-CA011** — Mãe/pai ausente: quando os irmãos não têm mãe/pai cadastrado, a árvore exibe um nó "?" acima deles representando o ascendente ausente.
- **RF005-CA012** — Cônjuge na árvore: o cônjuge aparece no mesmo nível do personagem, ligado por uma linha de união, com os filhos abaixo do casal.
- **RF005-CA013** — Linhagem completa: a árvore mostra todos os ascendentes e descendentes alcançáveis, não apenas mãe/pai e filhos diretos.
- **RF005-CA014** — Sem relação familiar: um personagem sem nenhuma relação familiar exibe o quadro Família com uma mensagem de estado vazio, sem quebrar a tela.
- **RF005-CA015** — Migração aditiva: um banco criado no RF004 é migrado para o esquema novo sem perder personagens nem relações já gravadas.
- **RF005-CA016** — Sem regressão: as telas de personagens mantêm tema, navegação, splash e busca do RF004 sem regressão.
- **RF005-CA017** — Testes automatizados: o projeto inclui testes automatizados para o espelhamento de cada tipo, a recusa de ciclo e a montagem da árvore familiar.

### RF006 — Ajustes na funcionalidade de Personagens: painel retrátil, exportação da ficha e cor dos botões

Este requisito ajusta a tela de Detalhe de Personagem em três frentes: torna o painel **Vínculos com livros** retrátil, acrescenta a função **Exportar Ficha** em PDF e padroniza a cor do rótulo dos botões **Salvar** e **Novo personagem** para branco.

Este requisito **não** cria a associação entre personagem e livro; apenas ajusta o painel que hoje a representa sem dados.

- **Data de criação:** 21/10/2026

#### Telas

- **RF006-TL001** — Tela de Detalhe de Personagem (atualizada): a tela do RF004-TL002 passa a ter o painel Vínculos com livros **retrátil**, com um ícone no cabeçalho para recolher e expandir, e ganha o botão **Exportar Ficha** ao lado do botão Salvar.

- **RF006-TL002** — Documento da Ficha do Personagem (nova): representação do personagem em PDF, gerada a partir dos dados globais e da imagem do personagem. Não é uma tela navegável do aplicativo; é o documento produzido pela exportação.

#### Fluxos

- **RF006-FL001** — Retrair e expandir Vínculos com livros: ao abrir a tela de Detalhe, o painel Vínculos com livros é exibido **retraído** quando o personagem não tem nenhum vínculo com livro. O escritor clica no ícone do cabeçalho para expandir e vê o conteúdo; clica de novo para retrair. Quando o personagem tem vínculos, o painel é exibido **expandido** por padrão.

- **RF006-FL002** — Exportar a ficha em PDF: o escritor clica em **Exportar Ficha**; o aplicativo monta o documento com os dados globais do personagem; abre o diálogo nativo para o escritor escolher onde salvar o arquivo; grava o PDF no local escolhido e informa o resultado.

- **RF006-FL003** — Exportar exige personagem salvo: com o personagem ainda não salvo, o botão Exportar Ficha fica desabilitado, pois não há registro para exportar.

#### Regras de Negócio

- **RF006-RN001** — Painel retrátil: o painel Vínculos com livros pode ser retraído e expandido pelo escritor, por um ícone no seu cabeçalho. Retraído, exibe apenas o cabeçalho (ícone, título e contador de vínculos); expandido, exibe também o corpo.

- **RF006-RN002** — Retraído quando vazio: ao abrir a tela de Detalhe de Personagem, se o personagem não tem nenhum vínculo com livro, o painel Vínculos com livros é exibido retraído, para economizar espaço na tela.

- **RF006-RN003** — Expandido quando há vínculos: ao abrir a tela de Detalhe de Personagem, se o personagem tem ao menos um vínculo com livro, o painel Vínculos com livros é exibido expandido.

- **RF006-RN004** — Cor do rótulo dos botões: os botões **Salvar** (tela de Detalhe de Personagem) e **Novo personagem** (tela de Personagens) têm rótulo branco, legível sobre o fundo de acento em todos os temas. No tema Tundra, cujo botão primário é verde profundo, o rótulo branco é mantido.

- **RF006-RN005** — Escopo do PDF: o documento exportado contém os dados **globais** do personagem — Nome, Alcunha, Raça, Idade, Personalidade, Interesses, Força, Fraqueza e Biografia —, a imagem do personagem e, quando o personagem tiver, a **árvore familiar** (ascendentes, descendentes, irmãos e cônjuges). **Não** contém os livros em que ele aparece nem as relações que não são familiares (Rival, Mentor, Aliado e semelhantes).

- **RF006-RN013** — Exportar o que está na tela: ao exportar, o aplicativo grava antes as alterações ainda não salvas do formulário, para que o PDF contenha exatamente os dados que o escritor está vendo (RF006-CA021).

- **RF006-RN006** — Conteúdo vazio no PDF: campos globais sem preenchimento são omitidos do documento, para não gerar linhas em branco.

- **RF006-RN007** — Imagem no PDF: quando o personagem tem retrato, a imagem é incluída no documento; quando não tem, o documento é gerado sem imagem, sem falhar.

- **RF006-RN008** — Escolha do destino: a exportação abre o diálogo nativo de salvamento para o escritor escolher o local e o nome do arquivo. Se o escritor cancelar, nenhum arquivo é gravado e nada é alterado na tela.

- **RF006-RN009** — Exportação exige personagem salvo: a exportação só é permitida com o personagem já gravado no banco; o botão permanece desabilitado enquanto o personagem não estiver salvo.

- **RF006-RN010** — Nome do arquivo: o arquivo é sugerido com o nome do personagem, com extensão `.pdf`.

- **RF006-RN011** — Sem biblioteca externa de PDF: o documento é produzido pelo recurso de impressão em PDF do próprio WebView do aplicativo, reusando o design system já existente, sem acrescentar biblioteca de geração de PDF ao projeto.

- **RF006-RN012** — Sem regressão: a tela de Personagens e a tela de Detalhe mantêm tema, navegação, splash, busca, relações e árvore familiar dos requisitos anteriores.

#### Critérios de Aceite

- **RF006-CA001** — Ícone de retração: o cabeçalho do painel Vínculos com livros exibe um ícone que retrai e expande o painel.
- **RF006-CA002** — Estado inicial retraído: um personagem sem vínculo com livro abre a tela de Detalhe com o painel Vínculos com livros retraído, mostrando apenas o cabeçalho.
- **RF006-CA003** — Estado inicial expandido: um personagem com ao menos um vínculo com livro abre a tela de Detalhe com o painel Vínculos com livros expandido.
- **RF006-CA004** — Alternância: clicar no ícone retrai o painel expandido e expande o painel retraído, sem recarregar a tela nem perder dados do formulário.
- **RF006-CA005** — Acessibilidade do ícone: o ícone de retração é acionável por teclado (Enter e Espaço) e informa por rótulo acessível se o painel está retraído ou expandido.
- **RF006-CA006** — Botão Exportar Ficha: o botão Exportar Ficha aparece ao lado do botão Salvar na tela de Detalhe de Personagem.
- **RF006-CA007** — Geração do PDF: ao clicar em Exportar Ficha, o aplicativo gera um arquivo PDF com os dados do personagem.
- **RF006-CA008** — Dados globais no PDF: o documento contém Nome, Alcunha, Raça, Idade, Personalidade, Interesses, Força, Fraqueza e Biografia, conforme preenchidos.
- **RF006-CA009** — Campos vazios omitidos: campos globais sem preenchimento não aparecem no documento.
- **RF006-CA010** — Imagem no PDF: quando o personagem tem retrato, a imagem aparece no documento.
- **RF006-CA011** — PDF sem imagem: um personagem sem retrato gera o documento sem imagem, sem erro.
- **RF006-CA012** — Sem dados de livro: o documento não contém os livros em que o personagem aparece nem as relações que não são familiares.

- **RF006-CA020** — Árvore familiar no PDF: um personagem com relações familiares tem a árvore familiar no documento, com ascendentes acima, descendentes abaixo, irmãos lado a lado e cônjuge no mesmo nível; um personagem sem relações familiares não tem essa seção.

- **RF006-CA021** — Dados da tela no PDF: o documento contém os dados preenchidos no formulário no momento da exportação, mesmo que ainda não tenham sido salvos.
- **RF006-CA013** — Diálogo de salvamento: a exportação abre o diálogo nativo para o escritor escolher onde salvar o arquivo.
- **RF006-CA014** — Cancelamento: cancelar o diálogo de salvamento não grava arquivo e não altera a tela.
- **RF006-CA015** — Exportação exige personagem salvo: o botão Exportar Ficha permanece desabilitado enquanto o personagem não estiver salvo.
- **RF006-CA016** — Rótulo branco dos botões: os botões Salvar e Novo personagem exibem rótulo branco, legível sobre o fundo, nos três temas, inclusive no Tundra.
- **RF006-CA017** — Sem biblioteca de PDF: o projeto não acrescenta dependência de geração de PDF; o documento é produzido pelo recurso de impressão do próprio WebView.
- **RF006-CA018** — Sem regressão: as telas de personagens mantêm tema, navegação, splash, busca, relações e árvore familiar sem regressão.
- **RF006-CA019** — Testes automatizados: o projeto inclui testes automatizados para o estado retraído inicial do painel, a alternância do painel, a cor do rótulo dos botões e a geração da ficha.

### RF007 — Dados básicos do Worldbuilding (Mundos)

O menu **Worldbuilding** abre a página inicial de **Mundos**, onde o escritor cria e mantém os mundos do projeto. Assim como os personagens, um mundo é **global** e pode ser usado por vários livros; a associação entre mundo e livro pertence a requisito posterior.

Este requisito cria **apenas a entidade Mundo e seus dados básicos**:
- Imagem do mundo
- Nome (único campo obrigatório)
- Tipo de Mundo (Medieval, Moderno, Futurista, Antigo)
- Nível Tecnológico (Tipo-0 a Tipo-4, inspirado na escala de Kardashev)
- Gênero (permite mais de um)
- Descrição

O **Tipo de Mundo** não estava na lista inicial de campos, mas foi incluído para atender ao filtro por Tipo da listagem (decisão confirmada com o usuário). O Nível Tecnológico é um campo **separado** do Tipo de Mundo.

As entidades vinculadas ao mundo — Localidades, Raças e povos, Artefatos, Armas, Eventos, Sistema de energia, Sistema de Magia e Mapa Geral — e a associação com livros ficam para requisitos posteriores.

O esquema é evoluído por **migração versionada aditiva (v4)**, sem recriar nem apagar dados, com a tabela `mundo_global` e a tabela `mundo_genero` (um mundo pode ter vários gêneros).

- **Data de criação:** 22/10/2026

#### Telas

- **RF007-TL001** — Tela Principal de Mundos: é acessada ao se clicar no menu Worldbuilding da barra lateral. Deve listar os mundos cadastrados em **cards** (padrão) ou em **lista**, permitindo alternar entre as duas formas de visualização, como na tela de Personagens.

A tela deve permitir a busca de mundos pelo nome, usando a barra de busca geral, como no protótipo.

Deve permitir iniciar a inclusão de um novo mundo, pelo botão **Novo mundo** no cabeçalho e pelo card "Novo mundo" (card tracejado, como no protótipo).

A listagem deve oferecer:
- **Filtrar por livro** — mesmo controle da tela de Personagens; sem opções enquanto a entidade Livro não existir.
- **Filtrar por tipo** — pelos quatro valores de Tipo de Mundo.
- **Filtrar por gênero** — pelos nove gêneros previstos.

Cada card deve exibir a imagem do mundo (ou o espaço reservado), o Nome, o Tipo de Mundo, o Nível Tecnológico, os Gêneros e uma prévia da Descrição. A exibição em lista deve exibir a imagem e o Nome, o Tipo de Mundo, o Nível Tecnológico, os Gêneros e a Descrição, com ação para abrir o mundo.

Os cards e a lista devem indicar que o mundo ainda não possui vínculos com livros (`0 livros`), pois a associação pertence a requisito posterior.

O botão **Exportar mundos** do protótipo **não** deve existir nesta tela.

Referência visual: `prototype/mundos.html`.
- **RF007-TL002** — Tela de Detalhe/Criação do Mundo: é aberta ao se clicar em um card ou no nome do mundo na listagem, e também ao se criar um novo mundo (tela vazia).

O cabeçalho deve exibir o nome do mundo (ou "Novo mundo"), os botões **Voltar**, **Exportar Mundo** e **Salvar**, e o indicador de que o mundo ainda não foi salvo, quando for o caso.

Acima do formulário, deve exibir o card **Vínculos com livros**, retrátil, com o mesmo comportamento da tela de Detalhe de Personagem (RF006-RN001 a RF006-RN003). Sem vínculos, o card abre retraído e informa que a associação entre mundo e livro pertence a requisito posterior.

O card **Dados Compartilhados** deve conter:
- **Imagem do Mundo** — envio pelo mesmo fluxo do retrato de personagem (diálogo nativo, formatos e limite).
- **Nome do Mundo** — único campo obrigatório.
- **Tipo de Mundo** — lista fechada: Medieval, Moderno, Futurista, Antigo.
- **Nível Tecnológico** — lista fechada: Tipo-0 Sub-Planetário, Tipo-1 Planetário, Tipo-2 Estelar, Tipo-3 Galáctico, Tipo-4 Universal; com um controle **?** ao lado do rótulo que exibe as descrições em um quadro flutuante.
- **Gênero** — seleção múltipla, com os nove gêneros previstos.
- **Descrição** — campo de texto longo.

Neste requisito a tela **não** exibe os quadros de categorias de entradas, ficha rápida, mapa geral nem curva de arco. Exibe apenas os Vínculos com livros e os Dados Compartilhados.

Referência visual: `prototype/mundo-kepler.html`, reduzida aos elementos deste requisito.
- **RF007-TL003** — Documento do Mundo (nova): representação do mundo em PDF, gerada a partir dos dados básicos, da imagem do mundo, das entradas do mundo e das facções. Não é uma tela navegável do aplicativo; é o documento produzido pela exportação.

#### Fluxos

- **RF007-FL001** — Criar um mundo: o escritor clica em **Novo mundo**; a tela de Detalhe abre vazia; preenche ao menos o Nome; clica em **Salvar**; o mundo passa a existir e a aparecer na listagem.
- **RF007-FL002** — Buscar e filtrar mundos: na tela principal, a busca da barra geral filtra pelo Nome. Os filtros de Tipo e de Gênero restringem a lista aos mundos correspondentes e podem ser combinados entre si e com a busca. O filtro por livro permanece sem opções enquanto não houver livros cadastrados.
- **RF007-FL003** — Alternar Cards e Lista: o escritor escolhe a forma de visualização; a lista é atualizada imediatamente, sem recarregar a tela.
- **RF007-FL004** — Associar a imagem do mundo: com o mundo já salvo, o escritor clica em **Enviar imagem**, escolhe um arquivo no diálogo nativo; o arquivo é copiado para o diretório de dados do aplicativo e a imagem passa a aparecer no detalhe, no card e na lista.
- **RF007-FL005** — Retrair e expandir Vínculos com livros: mesmo comportamento do RF006-FL001 — o painel abre retraído quando não há vínculos; o escritor clica no ícone do cabeçalho para expandir e clica de novo para retrair.
- **RF007-FL006** — Exportar o mundo em PDF: o escritor clica em **Exportar Mundo**; o aplicativo grava antes as alterações pendentes do formulário, monta o documento com os dados básicos, a imagem, todas as entradas do mundo e as facções, abre o diálogo nativo para escolher onde salvar, grava o PDF e informa o resultado. Se o escritor cancelar, nenhum arquivo é gravado e nada é alterado na tela.

#### Regras de Negócio

- **RF007-RN001** — Nome obrigatório: não é possível salvar um mundo sem Nome; a aplicação informa que o Nome é obrigatório.
- **RF007-RN002** — Nome único: não pode existir mais de um mundo com o mesmo nome, sem diferenciar maiúsculas de minúsculas. Ao tentar salvar um nome já existente, a aplicação impede a gravação e informa o conflito.
- **RF007-RN003** — Campos opcionais: apenas o Nome é obrigatório. Imagem, Tipo de Mundo, Nível Tecnológico, Gênero e Descrição são opcionais.
- **RF007-RN004** — Tipo de Mundo fechado: o Tipo de Mundo deve ser um dos quatro valores previstos — Medieval, Moderno, Futurista e Antigo. Não é permitido texto livre.
- **RF007-RN005** — Nível Tecnológico fechado: o Nível Tecnológico deve ser um dos cinco valores previstos, inspirados na escala de Kardashev:
  - **Tipo-0 — Sub-Planetário:** a civilização domina apenas os recursos de uma região ou continente; a energia disponível não alcança todo o planeta.
  - **Tipo-1 — Planetário:** a civilização domina toda a energia e os recursos do próprio planeta, incluindo clima, oceanos e subsolo.
  - **Tipo-2 — Estelar:** a civilização domina a energia da estrela do seu sistema e alcança os planetas vizinhos.
  - **Tipo-3 — Galáctico:** a civilização domina a energia de toda a galáxia e viaja entre sistemas estelares com facilidade.
  - **Tipo-4 — Universal:** a civilização domina a energia de todo o universo, com alcance além da escala galáctica.
- **RF007-RN006** — Ajuda do Nível Tecnológico: o rótulo do campo tem um controle **?** que, ao receber o mouse ou o foco de teclado, exibe um quadro flutuante com as descrições dos cinco níveis. O quadro não bloqueia a edição e fecha ao sair do controle. O controle informa por rótulo acessível o que faz.
- **RF007-RN007** — Gêneros fechados e múltiplos: o Gênero deve ser escolhido entre os nove valores previstos — Alta Fantasia, Fantasia Sombria, Cyberpunk, SteamPunk, Urbano, Sci-Fi, SolarPunk, Sobrenatural e Gótico. É permitido selecionar mais de um, sem repetição, e nenhum é obrigatório.
- **RF007-RN008** — Filtros combinados: os filtros de Tipo e de Gênero usam as listas fechadas e podem ser combinados entre si e com a busca pelo Nome. A busca não diferencia maiúsculas de minúsculas.
- **RF007-RN009** — Filtro por livro sem dados: como a entidade Livro ainda não existe, o controle **Filtrar por livro** permanece sem opções e desabilitado, exibindo "Nenhum livro cadastrado", como na tela de Personagens.
- **RF007-RN010** — Imagem exige mundo salvo: a imagem só pode ser associada quando o mundo já existe no banco. Um mundo sem imagem exibe um espaço reservado.
- **RF007-RN011** — Imagem persistida: ao associar uma imagem, o arquivo é copiado para `<app_data_dir>/mundos/` e o banco guarda o caminho relativo (`mundos/<id>.<ext>`); o arquivo permanece disponível após fechar e reabrir a aplicação.
- **RF007-RN012** — Limite e formato da imagem: a imagem aceita arquivos JPG, PNG ou WEBP de até 4 MB; arquivos maiores ou de formato não suportado são recusados com mensagem útil, sem travar a aplicação.
- **RF007-RN013** — Enquadramento da imagem: a imagem do mundo é exibida em proporção **16:9**, com preenchimento por recorte (`object-fit: cover`), sem distorção, no detalhe, no card e na lista. Há uma única imagem por mundo.
- **RF007-RN014** — Painel de vínculos: o card **Vínculos com livros** é retrátil, com ícone no cabeçalho, estado inicial retraído quando não há vínculos e acessível por teclado, como no RF006. Neste requisito não há vínculo algum: o contador é zero e o corpo informa que a associação pertence a requisito posterior.
- **RF007-RN015** — Exportação exige mundo salvo: o botão **Exportar Mundo** permanece desabilitado enquanto o mundo não estiver salvo no banco.
- **RF007-RN016** — Exportar o que está na tela: ao exportar, o aplicativo grava antes as alterações ainda não salvas do formulário, para que o PDF contenha exatamente os dados que o escritor está vendo.
- **RF007-RN017** — Escopo do PDF do mundo: o documento contém os dados básicos do mundo — Nome, Tipo de Mundo, Nível Tecnológico (com o rótulo por extenso), Gêneros e Descrição —, a imagem quando houver, **todas as entradas do mundo** (Localidades, Raças e Povos, Artefatos, Armas, Eventos e Sistemas, com todos os campos e as regras dos Sistemas) e **todas as facções** (com todos os campos e os personagens associados, indicando o papel Líder/Membro). Campos vazios são omitidos. Não contém livros vinculados, pois a associação entre mundo e livro pertence a requisito posterior.
- **RF007-RN018** — Destino e nome do arquivo: a exportação abre o diálogo nativo de salvamento e sugere o nome do mundo com extensão `.pdf`, trocando caracteres inválidos para nome de arquivo. Cancelar não grava nada.
- **RF007-RN019** — Sem biblioteca externa de PDF: o documento é produzido pelo recurso de impressão em PDF do próprio WebView do aplicativo, reusando o mecanismo do RF006, sem acrescentar biblioteca de geração de PDF.
- **RF007-RN020** — Ordem da listagem: os mundos são listados em ordem alfabética pelo Nome, sem diferenciar maiúsculas de minúsculas.
- **RF007-RN021** — Sem exclusão neste requisito: a exclusão de mundos não faz parte deste requisito.
- **RF007-RN022** — Escopo deste requisito: não são criadas as entradas do mundo (Localidades, Raças e povos, Artefatos, Armas, Eventos, Sistema de energia, Sistema de Magia e Mapa Geral), nem a associação entre mundo e livro, nem dados por livro.
- **RF007-RN023** — Migração do esquema: o esquema é evoluído por migração versionada aditiva (v4), sem recriar nem apagar dados existentes e sem alterar as entidades dos requisitos anteriores.
- **RF007-RN024** — Sem regressão: as telas de Personagens, a navegação, o tema ativo e o splash dos requisitos anteriores permanecem funcionando.

#### Critérios de Aceite

- **RF007-CA001** — Acesso: o menu Worldbuilding abre a Tela Principal de Mundos, com a listagem dos mundos cadastrados.
- **RF007-CA002** — Exibição em cards: cada card mostra a imagem do mundo (ou espaço reservado), o Nome, o Tipo de Mundo, o Nível Tecnológico e os Gêneros.
- **RF007-CA003** — Alternância de visualização: a tela permite alternar entre Cards e Lista; a lista mostra a imagem e o Nome, o Tipo de Mundo, o Nível Tecnológico e os Gêneros.
- **RF007-CA004** — Inclusão: o botão **Novo mundo** e o card "Novo mundo" abrem a tela de Detalhe vazia.
- **RF007-CA005** — Salvar com apenas o Nome: um mundo com apenas o Nome preenchido é salvo com sucesso e passa a aparecer na listagem.
- **RF007-CA006** — Nome obrigatório: não é possível salvar um mundo sem Nome; a aplicação informa que o Nome é obrigatório.
- **RF007-CA007** — Nome único: tentar salvar um Nome já existente, com diferença apenas de maiúsculas/minúsculas, é recusado com mensagem útil.
- **RF007-CA008** — Busca por nome: a barra de busca filtra os mundos pelo Nome, sem diferenciar maiúsculas de minúsculas.
- **RF007-CA009** — Filtro por Tipo: o filtro por Tipo restringe a lista aos mundos do Tipo de Mundo escolhido.
- **RF007-CA010** — Filtro por Gênero: o filtro por Gênero restringe a lista aos mundos que possuem o gênero escolhido; um mundo com vários gêneros aparece em cada filtro correspondente.
- **RF007-CA011** — Filtros combinados: busca, Tipo e Gênero podem ser usados juntos, e a lista mostra apenas os mundos que atendem a todos os critérios.
- **RF007-CA012** — Filtro por livro vazio: o controle **Filtrar por livro** não apresenta opções, exibe "Nenhum livro cadastrado" e permanece desabilitado.
- **RF007-CA013** — Sem "Exportar mundos": a Tela Principal de Mundos não exibe o botão "Exportar mundos" do protótipo.
- **RF007-CA014** — Acesso ao detalhe: clicar em um card ou no nome do mundo (na lista) abre a tela de Detalhe daquele mundo.
- **RF007-CA015** — Dados compartilhados: a tela de Detalhe exibe e permite editar Imagem, Nome, Tipo de Mundo, Nível Tecnológico, Gêneros e Descrição, e salvar as alterações.
- **RF007-CA016** — Nível Tecnológico: o campo apresenta exatamente as cinco opções previstas — Tipo-0 Sub-Planetário, Tipo-1 Planetário, Tipo-2 Estelar, Tipo-3 Galáctico e Tipo-4 Universal — e o valor escolhido é persistido.
- **RF007-CA017** — Ajuda do Nível Tecnológico: o controle **?** exibe, ao passar o mouse e ao receber foco de teclado, um quadro flutuante com as descrições dos cinco níveis; o quadro fecha ao sair do controle.
- **RF007-CA018** — Gêneros múltiplos: o campo de Gênero apresenta exatamente os nove valores previstos, permite selecionar mais de um e grava todos os selecionados.
- **RF007-CA019** — Tipo de Mundo: o campo apresenta exatamente as quatro opções previstas — Medieval, Moderno, Futurista e Antigo — e o valor escolhido é persistido.
- **RF007-CA020** — Imagem exige mundo salvo: o envio de imagem permanece desabilitado enquanto o mundo não estiver salvo; um mundo sem imagem exibe o espaço reservado.
- **RF007-CA021** — Imagem persistida: ao associar uma imagem, o arquivo é copiado para o diretório de dados, o caminho relativo é gravado e a imagem continua aparecendo no detalhe, no card e na lista após fechar e reabrir a aplicação.
- **RF007-CA022** — Limite e formato da imagem: arquivos acima de 4 MB ou fora dos formatos JPG, PNG e WEBP são recusados com mensagem útil, sem travar a aplicação.
- **RF007-CA023** — Enquadramento 16:9: a imagem é exibida em proporção 16:9, com recorte e sem distorção, no detalhe, no card e na lista.
- **RF007-CA024** — Vínculos com livros: a tela de Detalhe exibe o card retrátil **Vínculos com livros**, com zero vínculos, aberto retraído, acionável por teclado e com o corpo informando que a associação pertence a requisito posterior.
- **RF007-CA025** — Botões do detalhe: os botões **Voltar**, **Exportar Mundo** e **Salvar** aparecem no cabeçalho; Exportar Mundo fica desabilitado enquanto o mundo não estiver salvo.
- **RF007-CA026** — Exportação em PDF: ao exportar, o aplicativo gera um PDF com Nome, Tipo de Mundo, Nível Tecnológico, Gêneros e Descrição, a imagem quando houver, todas as entradas do mundo (com todos os campos e regras dos Sistemas) e todas as facções (com todos os campos e os personagens associados com papel Líder/Membro); campos vazios não aparecem e não há seção de livros.
- **RF007-CA027** — Diálogo e cancelamento: a exportação abre o diálogo nativo de salvamento com o nome do mundo sugerido; cancelar não grava arquivo e não altera a tela.
- **RF007-CA028** — Dados da tela no PDF: o documento contém os dados preenchidos no formulário no momento da exportação, mesmo que ainda não tenham sido salvos.
- **RF007-CA029** — Persistência: os mundos, seus gêneros e suas imagens permanecem disponíveis após fechar e reabrir a aplicação.
- **RF007-CA030** — Migração do esquema: um banco criado no RF006 é migrado para a v4 sem perder personagens, relações ou qualquer dado existente, e sem alterar as entidades anteriores.
- **RF007-CA031** — Separação de camadas: as operações de mundos são executadas pelo back-end Rust, expostas ao React por comandos Tauri, sem SQL na interface.
- **RF007-CA032** — Testes automatizados: o projeto inclui testes automatizados para criação, leitura, atualização, Nome obrigatório e único, listas fechadas, múltiplos gêneros, filtros, migração v4 e geração do documento do mundo.
- **RF007-CA033** — Sem regressão: as telas de Personagens, a navegação, o tema ativo e o splash permanecem funcionando.
- **RF007-CA034** — Escopo: este requisito não cria as entradas do mundo, não cria a associação entre mundo e livro e não permite excluir mundos.



### RF008 - Entradas do Mundo (Localidades, Racas e Povos, Artefatos, Armas, Eventos e Sistemas)

O Worldbuilding agora passa a permitir registrar **as entradas vinculadas ao Mundo**. Cada mundo global podera ter suas proprias localidades, racas e povos, artefatos, armas, eventos e sistemas, organizados em abas dentro da tela de detalhe do Mundo.

Este requisito cria **apenas as sub-entidades e seus cadastros basicos**. A associacao dessas entradas a capitulos e a utilizacao em livros pertencem a requisitos posteriores.

O esquema e evoluido por **migracao versionada aditiva (v5)**, sem recriar nem apagar dados, com as tabelas das seis sub-entidades e a tabela sistema_regra para a lista de regras dos Sistemas.

- **Data de criacao:** 22/10/2026

#### Telas

- **RF008-TL001** - Abas de Entradas na Tela de Detalhe do Mundo: na tela TelaMundo, apos as abas **Dados gerais** e **Imagem do mundo**, adicionam-se as abas **Localidades**, **Racas e Povos**, **Artefatos**, **Armas**, **Eventos** e **Sistemas**, seguindo exatamente o padrao de abas ja utilizado (RF007).
- **RF008-TL002** - Listagem por sub-entidade (tabela com paginacao): cada aba exibe uma tabela com os itens cadastrados para aquele mundo, contendo pelo menos o **Nome** e as colunas mais relevantes da entidade. A tabela deve possuir **paginacao**. Deve existir o botao **Novo(a) <entidade>** para abrir a tela/modal de inclusao/edicao.
- **RF008-TL003** - Janela responsiva de inclusao/edicao: ao criar ou editar um item, abre-se uma **janela responsiva** (modal/dialogo) com os campos da sub-entidade. A janela se adapta ao tamanho da tela, com rolagem interna quando necessario e botoes **Salvar** e **Cancelar**.

#### Fluxos

- **RF008-FL001** - Acessar entradas do mundo: o escritor abre um mundo salvo na tela de detalhe; navega pelas abas de entradas e visualiza a listagem em tabela com paginacao.
- **RF008-FL002** - Incluir nova entrada: na aba da sub-entidade, clica em **Novo(a)...**, preenche os campos, clica em **Salvar**; o item passa a aparecer na tabela da aba correspondente.
- **RF008-FL003** - Editar entrada: na tabela, clica em **Editar** no item desejado; a janela responsiva abre com os dados preenchidos; altera e salva, atualizando a tabela.
- **RF008-FL004** - Paginar listagem: o escritor utiliza os controles de paginacao para navegar entre paginas da tabela de cada sub-entidade.
- **RF008-FL005** - Gerenciar regras do Sistema: na janela de Sistema, o escritor adiciona, edita, remove e mantem a ordem das **Regras** (lista). Cada regra deve possuir um texto descritivo.

#### Regras de Negocio

- **RF008-RN001** - Pertencem ao Mundo: toda entrada (Localidade, Raca/Povo, Artefato, Arma, Evento e Sistema) pertence obrigatoriamente a um mundo_id. Nao existem entradas globais compartilhadas entre mundos.
- **RF008-RN002** - Mundo deve estar salvo: para criar ou editar qualquer entrada, o Mundo precisa estar salvo. Enquanto o mundo nao estiver salvo, os botoes de inclusao ficam desabilitados com aviso orientativo.
- **RF008-RN003** - Nome obrigatorio: o campo **Nome** e obrigatorio em todas as sub-entidades. Nao e permitido salvar sem Nome.
- **RF008-RN004** - Localidades: campos **Nome** (obrigatorio), **Descricao** e **Historia**.
- **RF008-RN005** - Racas e Povos: campos **Nome** (obrigatorio), **Descricao**, **Caracteristicas**, **Forcas** e **Fraquezas**.
- **RF008-RN006** - Artefatos: campos **Nome** (obrigatorio), **Descricao**, **Poder**, **Funcionamento**, **Limitacoes** e **Custo de aquisicao**.
- **RF008-RN007** - Armas: campos **Nome** (obrigatorio), **Descricao**, **Dano**, **Funcionamento**, **Limitacoes** e **Custo de aquisicao**.
- **RF008-RN008** - Eventos: campos **Nome** (obrigatorio), **Descricao**, **Data** e **Impacto**. O campo **Data** e **texto livre** (permite datas ficticias/ambiguas de mundos de fantasia/ficcao cientifica).
- **RF008-RN009** - Sistemas: campos **Nome** (obrigatorio), **Descricao**, **Tipo** (lista fechada) e **Regras** (lista). **Tipo** deve ser um dos valores: **Magia**, **Energia** ou **Combate**.
- **RF008-RN010** - Regras do Sistema: as **Regras** sao itens de uma lista. Cada regra possui descricao obrigatoria. Deve ser possivel adicionar, remover e reordenar as regras. A ordem e preservada.
- **RF008-RN011** - Abas por sub-entidade: cada sub-entidade possui sua **aba especifica** dentro da tela do Mundo, no mesmo padrao visual das abas ja existentes.
- **RF008-RN012** - Tabela com paginacao: a listagem de cada aba e em **formato de tabela** com **paginacao**. Sao exibidas acoes para **Editar** cada item.
- **RF008-RN013** - Janela responsiva: a inclusao/edicao ocorre em **janela responsiva**, com botoes **Salvar/Cancelar**, validacao de campos obrigatorios e rolagem interna quando o conteudo nao cabe.
- **RF008-RN014** - Exclusao fora do escopo: a exclusao de entradas nao faz parte deste requisito.
- **RF008-RN015** - Escopo: este requisito nao associa entradas a livros/capitulos e nao cria telas globais fora da aba do Mundo.

#### Criterios de Aceite

- **RF008-CA001** - Abas presentes: na tela de detalhe de um mundo salvo, aparecem as abas **Localidades**, **Racas e Povos**, **Artefatos**, **Armas**, **Eventos**, **Sistemas** e **Faccoes**.
- **RF008-CA002** - Tabela por aba: cada aba exibe uma tabela com os itens do mundo, com colunas adequadas a sub-entidade e acao **Editar**.
- **RF008-CA003** - Paginacao funcional: as tabelas possuem paginacao e permitem navegar entre paginas sem recarregar toda a tela.
- **RF008-CA004** - Incluir Localidade: e possivel criar uma Localidade com Nome, Descricao e Historia, salva-la e ve-la na tabela.
- **RF008-CA005** - Incluir Raca/Povo: e possivel criar Racas e Povos com Nome, Descricao, Caracteristicas, Forcas e Fraquezas.
- **RF008-CA006** - Incluir Artefato: e possivel criar Artefatos com Nome, Descricao, Poder, Funcionamento, Limitacoes e Custo de aquisicao.
- **RF008-CA007** - Incluir Arma: e possivel criar Armas com Nome, Descricao, Dano, Funcionamento, Limitacoes e Custo de aquisicao.
- **RF008-CA008** - Incluir Evento: e possivel criar Eventos com Nome, Descricao, Data (texto livre) e Impacto.
- **RF008-CA009** - Incluir Sistema com regras: e possivel criar um Sistema com Nome, Descricao, Tipo (Magia/Energia/Combate) e uma lista de **Regras**, podendo adicionar/remover/reordenar regras antes de salvar.
- **RF008-CA010** - Editar via janela responsiva: ao clicar em **Editar**, abre uma janela responsiva com os dados do item; ao salvar, a tabela e atualizada.
- **RF008-CA011** - Nome obrigatorio: tentar salvar qualquer entrada sem Nome exibe mensagem de obrigatoriedade e impede a gravacao.
- **RF008-CA012** - Bloqueio sem mundo salvo: com mundo nao salvo, os botoes de nova entrada ficam desabilitados.
- **RF008-CA013** - Migracao v5: um banco existente migra para a v5 aditivamente, sem perder mundos, personagens, relacoes ou dados anteriores.
### RF009 - Faccoes

Objetivo

Criar o cadastro e gerenciamento de **Faccoes** no Worldbuilding e a associacao entre Faccoes e Personagens.

#### Telas

- **RF009-TL001** - Aba Faccoes na Tela de Detalhe do Mundo: na tela TelaMundo, apos a ultima aba de entradas, deve ser adicionada a aba **Faccoes**. A listagem deve seguir o padrao de tabela com paginacao utilizado nas demais abas de entradas.
- **RF009-TL002** - Janela responsiva de Faccoes: inclusao e edicao de Faccoes em janela responsiva com botoes **Salvar** e **Cancelar**, validacao e rolagem interna.
- **RF009-TL003** - Gerenciamento de Faccoes na tela de Personagem: na tela de detalhe do Personagem, deve ser exibido um quadro/painel para gerenciar as **Faccoes** do personagem, permitindo adicionar, remover e alterar o papel (**Lider** ou **Membro**) de cada associacao.

#### Fluxos

- **RF009-FL001** - Criar/editar Faccao: o escritor acessa a aba **Faccoes** no mundo salvo, clica em **Nova Faccao**, preenche os campos, salva e visualiza na tabela.
- **RF009-FL002** - Associar personagem a Faccao: a partir da tela de detalhe do Personagem, o escritor pesquisa/seleciona uma Faccao existente e define o papel **Lider** ou **Membro** para criar a associacao.
- **RF009-FL003** - Alterar/remover associacao: a partir da tela de detalhe do Personagem, o escritor altera o papel ou remove a associacao entre Personagem e Faccao.

#### Regras de Negocio

- **RF009-RN001** - Faccao vinculada ao Mundo: toda **Faccao** pertence a um **Mundo** global. A aba aparece apenas quando o Mundo estiver salvo.
- **RF009-RN002** - Nome obrigatorio: o campo **Nome** e obrigatorio para salvar uma Faccao.
- **RF009-RN003** - Tipo fechado: o campo **Tipo** deve ser escolhido entre **Politica**, **Religiosa**, **Militar**, **Comercial/Empresa**, **Seita**, **Criminosa** ou **Outra**.
- **RF009-RN004** - Campos da Faccao: **Nome** (obrigatorio), **Tipo** (lista fechada), **Ideologia/Objetivos**, **Lider(es)**, **Base/Territorio**, **Descricao** e **Historia**.
- **RF009-RN005** - Associacao N:N: um Personagem pode pertencer a **mais de uma Faccao** e uma Faccao pode ter **vários Personagens** associados.
- **RF009-RN006** - Papel da associacao: cada associacao Faccao-Personagem deve ter um **papel** definido: **Lider** ou **Membro**.
- **RF009-RN007** - Reflexo bidirecional na interface: as Faccoes devem ser exibidas tanto na aba **Faccoes** do Mundo quanto no cadastro/detalhe do **Personagem**, refletindo a mesma associacao.
- **RF009-RN008** - Integridade: so e possivel associar Personagens e Faccoes existentes. Nao e permitido duplicar a mesma associacao (mesmo Personagem e mesma Faccao).
- **RF009-RN009** - Sem exclusao neste requisito: a exclusao definitiva de Faccoes ou de associacoes pode seguir as regras definidas na implementacao, mas o escopo prioriza inclusao/edicao/gestao da associacao.

#### Criterios de Aceite

- **RF009-CA001** - Aba Faccoes: na tela de detalhe do Mundo salvo, existe a aba **Faccoes** com listagem em tabela e paginacao.
- **RF009-CA002** - Cadastro de Faccao: e possivel criar, editar e salvar uma Faccao com os campos previstos e com Nome obrigatorio.
- **RF009-CA003** - Associar a Personagem: a partir do detalhe do Personagem, e possivel adicionar uma Faccao e definir o papel **Lider** ou **Membro**.
- **RF009-CA004** - Multiplas faccoes: um Personagem pode ser associado a mais de uma Faccao simultaneamente.
- **RF009-CA005** - Gerenciamento no Personagem: o detalhe do Personagem exibe as Faccoes associadas com seu papel e permite alterar papel ou remover a associacao.
- **RF009-CA006** - Consistencia: a associacao criada no cadastro do Personagem aparece refletida corretamente e nao permite duplicidade (mesmo Personagem/Faccao).

- **Data de criacao:** 23/10/2026


### RF010 - Livros - Meus Livros

Este requisito cria a **tela inicial do menu Meus Livros**, que passa a ser a
entrada do domínio de Livros. A tela reutiliza a casca visual do aplicativo
(marca, topbar, sidebar e temas) e reproduz o conteúdo e a disposição do
protótipo `prototype/index.html`, com as exceções explicitadas neste requisito.

Como ainda não existe nenhum livro cadastrado, a tela representa o **estado
inicial vazio**: todas as métricas ficam zeradas, não há cards de livros e o
painel de personagens não tem linhas. Não são usados dados fictícios do
protótipo.

O escopo é **somente a tela inicial e o botão de novo livro**. Não são criados
neste requisito: cadastro/edição de livro, tela de detalhe do livro, entidade
Livro no banco, migração, importação/exportação `.pdc`, associação livro–mundo ou
livro–personagem e dados reais de livros.

- **Data de criacao:** 26/10/2026

#### Telas

- **RF010-TL001** - Tela Meus Livros (nova): ao clicar em **Meus Livros** na
  sidebar, a área principal exibe a tela inicial do domínio de Livros, com:
  título **Meus Livros**; subtítulo com contadores zerados; botão primário
  **+ Novo Livro**; quatro cartões de métricas com valor **0**; seção **Todos os
  livros** com badge **0 resultados** e controle **Grade**; estado vazio da
  listagem; e o painel **Personagens que atravessam livros** em estado vazio.
- **RF010-TL002** - Cabeçalho e ação principal: o cabeçalho da tela exibe o
  título **Meus Livros**, o subtítulo e **apenas** o botão **+ Novo Livro**. O
  botão **Importar .pdc** do protótipo **não** existe nesta tela.
- **RF010-TL003** - Estado vazio da listagem: a seção **Todos os livros** exibe
  o badge **0 resultados**, o controle **Grade** e uma mensagem de estado vazio
  informando que ainda não há livros. Não há cards de livros nem card tracejado
  **Novo livro** enquanto não existir um livro cadastrado.
- **RF010-TL004** - Painel de personagens compartilhados: o painel
  **Personagens que atravessam livros** permanece abaixo da listagem, com o
  título e o link **Ver biblioteca completa**, mas sem linhas de personagens
  enquanto não houver livros/personagens compartilhados. O link abre a tela de
  Personagens existente (RF004).

#### Fluxos

- **RF010-FL001** - Acessar Meus Livros: o escritor clica em **Meus Livros** na
  sidebar e a tela inicial do domínio de Livros é exibida.
- **RF010-FL002** - Acionar + Novo Livro: o escritor clica no botão **+ Novo
  Livro**. Neste requisito o clique não abre cadastro, não cria registro e não
  navega para uma tela inexistente; o fluxo de cadastro pertence a requisito
  posterior.
- **RF010-FL003** - Consultar a listagem vazia: como não há livros, a seção
  **Todos os livros** mostra o estado vazio, sem cards e sem navegação para
  detalhe de livro.
- **RF010-FL004** - Consultar a tela: a busca superior, o badge de resultados e
  o controle **Grade** são exibidos conforme o protótipo. Nesta entrega eles são
  visuais; filtragem e alternância real de visualização pertencem ao requisito
  de listagem/cadastro de livros.

#### Regras de Negócio

- **RF010-RN001** - Escopo somente da tela inicial: este requisito não cria a
  página de cadastro do livro nem a tela de detalhe do livro.
- **RF010-RN002** - Sem entidade Livro no banco: não há tabela, migração,
  comando Tauri ou persistência de livros neste requisito.
- **RF010-RN003** - Estado inicial vazio: as métricas **Livros na biblioteca**,
  **Personagens**, **Capítulos planejados** e **Entradas de worldbuilding**
  exibem **0**; a listagem exibe **0 resultados** e nenhum card; o painel de
  personagens exibe estado vazio.
- **RF010-RN004** - Sem importação `.pdc`: o botão **Importar .pdc** do
  protótipo não deve ser criado, nem qualquer ação de importação.
- **RF010-RN005** - Apenas + Novo Livro: o cabeçalho da tela tem somente o botão
  **+ Novo Livro** como ação principal. Não há card tracejado **Novo livro** na
  listagem vazia.
- **RF010-RN006** - Label da seção: o título **Todos os projetos** do protótipo
  passa a ser **Todos os livros**.
- **RF010-RN007** - Sem dados fictícios: a tela não deve exibir os livros,
  personagens, contadores ou imagens de demonstração do protótipo. O estado
  inicial é vazio.
- **RF010-RN008** - Sem navegação para livro: como não há cards, não existe
  navegação para detalhe/cadastro de livro nesta entrega.
- **RF010-RN009** - Sem regressão: a casca do aplicativo, a navegação, os temas,
  o splash e as telas de Personagens e Worldbuilding continuam funcionando.
- **RF010-RN010** - Sem exclusão, edição ou associação: este requisito não cria
  operações de excluir, editar, associar ou abrir livros.

#### Critérios de Aceite

- **RF010-CA001** - Acesso à tela: clicar em **Meus Livros** na sidebar abre a
  nova tela inicial.
- **RF010-CA002** - Cabeçalho: a tela exibe **Meus Livros**, o subtítulo com
  contadores zerados e o botão **+ Novo Livro**.
- **RF010-CA003** - Sem Importar .pdc: o botão **Importar .pdc** não aparece em
  nenhum ponto da tela.
- **RF010-CA004** - Métricas zeradas: os quatro cartões exibem valor **0**:
  **Livros na biblioteca**, **Personagens · 0 em 2+ livros**, **Capítulos
  planejados** e **Entradas de worldbuilding**.
- **RF010-CA005** - Label corrigida: a seção exibe **Todos os livros**, e não
  **Todos os projetos**.
- **RF010-CA006** - Badge e Grade: o badge **0 resultados** e o controle
  **Grade** aparecem ao lado do título da seção.
- **RF010-CA007** - Listagem vazia: não há cards de livros nem card **Novo
  livro**; a seção mostra uma mensagem de estado vazio.
- **RF010-CA008** - Sem dados fictícios: nenhum livro, personagem, contador ou
  imagem de demonstração do protótipo aparece na tela.
- **RF010-CA009** - Painel de personagens vazio: o painel **Personagens que
  atravessam livros** é exibido com o link **Ver biblioteca completa**, mas sem
  linhas de personagens.
- **RF010-CA010** - Sem cadastro: clicar em **+ Novo Livro** não abre cadastro,
  não cria livro e não navega para tela inexistente.
- **RF010-CA011** - Sem detalhe de livro: como não há cards, não existe
  navegação para detalhe/cadastro de livro nesta entrega.
- **RF010-CA012** - Sem banco: o requisito não cria migração, tabela ou comando
  de persistência de livros.
- **RF010-CA013** - Sem regressão: temas, splash, navegação, Personagens e
  Worldbuilding permanecem funcionando.
- **RF010-CA014** - Testes automatizados: a verificação da interface cobre a
  abertura da tela, ausência de **Importar .pdc**, presença de **+ Novo Livro**,
  métricas zeradas, label **Todos os livros**, badge **0 resultados**, listagem
  vazia, painel vazio e ausência de dados fictícios.

### RF011 - Livros - Página do livro, navegação e Dados Gerais

Este requisito transforma o botão **+ Novo Livro** da tela Meus Livros em
entrada para o domínio do livro. Ao acioná-lo, o escritor passa a ver a **página
do livro**, com faixa do livro aberto, menu lateral próprio e a página principal
(**Painel do Livro**). Também é criada a página **Dados do Livro**, com um
componente **Tab Panel** cuja única aba desta entrega é **Dados Gerais**.

O livro é uma entidade persistida no banco. O cadastro acontece na própria
página do livro: o clique em **+ Novo Livro** abre a página em modo de criação e
o registro só é gravado quando o escritor salva com um Título válido. Sair sem
salvar descarta o rascunho.

A página do livro substitui a casca da raiz enquanto um livro está aberto: a
marca TaleCraft dá lugar à faixa do livro aberto, o menu lateral da raiz dá lugar
ao menu do livro e o breadcrumb passa a indicar o livro e a seção atual.

- **Data de criacao:** 27/10/2026

#### Telas

- **RF011-TL001** - Página do livro (nova): exibida ao clicar em **+ Novo
  Livro** ou em um card de livro já cadastrado. É composta por: faixa do livro
  aberto (`bookband`) com o nome do livro, o rótulo **Livro aberto** e o botão
  **Trocar livro**; barra superior com breadcrumb **Início / [nome do livro] /
  [seção]**; menu lateral do livro; e a área principal da seção ativa.
- **RF011-TL002** - Menu lateral do livro: o rótulo do grupo é o **nome do
  livro** (ou **Novo livro** enquanto não salvo) e os itens aparecem nesta
  ordem: **Painel do Livro**, **Dados do Livro**, **Personagens**, **Capítulos**
  e **Worldbuilding**. Abaixo, o grupo **Análise** mantém **Gráficos** e
  **Exportar**, como no protótipo. Por fim, o item **Início** com o subtítulo
  **Sair do livro** retorna à tela Meus Livros. A ordem dos itens do livro é
  diferente da do protótipo e deve ser respeitada exatamente como descrita.
- **RF011-TL003** - Painel do Livro: página principal do livro. Exibe o título
  do livro (ou **Novo livro**), um subtítulo com os dados já preenchidos
  (gênero principal, subgêneros, faixa de público e idioma) e o botão **Dados do
  livro**. Enquanto os módulos do livro não existem, as quatro métricas
  (**Personagens**, **Entradas de worldbuilding**, **Capítulos planejados** e
  **Planejamento concluído**) exibem **0** e a grade de módulos apresenta
  **Personagens**, **Worldbuilding**, **Capítulos**, **Dados do Livro**,
  **Gráficos** e **Exportar**, cada um levando à sua seção do menu lateral.
- **RF011-TL004** - Dados do Livro: página com o componente **Tab Panel**. Nesta
  entrega o painel tem **uma única aba**, **Dados Gerais**, e a estrutura já
  aceita novas abas em requisitos posteriores. A aba contém: **Título do livro**
  (texto, único obrigatório); **Gênero Principal** (lista fechada: Ficção
  Científica, Terror, Fantasia); **Subgêneros** (seleção múltipla, filtrada pelo
  Gênero Principal); **Faixa de Público** (lista fechada: Infantil, Young Adult,
  Adulto, Geral); e **Idioma** (lista fechada: Português, Inglês, Espanhol).
  A página tem os botões **Descartar** (volta aos últimos dados salvos) e
  **Salvar**.
- **RF011-TL005** - Meus Livros com livros: a tela inicial passa a listar os
  livros cadastrados, em **grade** (padrão) ou **lista**, com busca por título.
  Os cards mostram o título, o gênero principal com os subgêneros, a faixa de
  público, o idioma e as métricas do livro (capítulos, mundo e planejamento),
  que permanecem **0** enquanto os módulos não existem. As métricas gerais e o
  badge de resultados passam a refletir os livros cadastrados.
- **RF011-TL006** - Seções em requisito posterior: **Personagens**,
  **Capítulos**, **Worldbuilding**, **Gráficos** e **Exportar** existem no menu
  lateral e abrem uma tela informativa do módulo, sem conteúdo de domínio e sem
  navegação para tela inexistente. **Personagens** aqui é o elenco do livro, e
  não a biblioteca global de fichas do RF004.

#### Fluxos

- **RF011-FL001** - Criar livro: o escritor clica em **+ Novo Livro** na tela
  Meus Livros. A página do livro abre em modo de criação, com o título vazio e o
  menu lateral rotulado **Novo livro**.
- **RF011-FL002** - Salvar o primeiro cadastro: na aba **Dados Gerais**, o
  escritor informa ao menos o **Título do livro** e clica em **Salvar**. O livro
  é criado, a faixa do livro e o menu lateral passam a exibir o título e o
  registro aparece na listagem de Meus Livros.
- **RF011-FL003** - Abrir um livro: o escritor clica em um card de livro na tela
  Meus Livros. A página do livro abre no **Painel do Livro**.
- **RF011-FL004** - Editar os dados: no menu lateral do livro, o escritor clica
  em **Dados do Livro**, altera os campos da aba **Dados Gerais** e clica em
  **Salvar**. Os dados são atualizados e a faixa do livro reflete o novo título.
- **RF011-FL005** - Descartar alterações: o escritor clica em **Descartar** e os
  campos voltam aos últimos dados salvos, sem gravar nada.
- **RF011-FL006** - Navegar no livro: o escritor usa os itens do menu lateral do
  livro. **Painel do Livro** e **Dados do Livro** abrem suas páginas; os demais
  itens abrem a tela informativa da seção.
- **RF011-FL007** - Sair do livro: o escritor clica em **Trocar livro** na faixa
  do livro ou em **Início — Sair do livro** no menu lateral e retorna à tela Meus
  Livros. Um rascunho não salvo é descartado.
- **RF011-FL008** - Buscar e alternar visualização: na tela Meus Livros, o
  escritor digita no campo **Buscar livros…** para filtrar a listagem pelo
  título e escolhe **Grade** ou **Lista** para alternar a forma de visualização.
- **RF011-FL009** - Trocar o gênero principal: ao trocar o **Gênero Principal**
  na aba **Dados Gerais**, a lista de subgêneros é refiltrada, mas a seleção de
  cada gênero é preservada. Ao voltar ao gênero anterior sem salvar, os
  subgêneros já marcados — inclusive os salvos — reaparecem selecionados. Ao
  salvar, somente os subgêneros do gênero atual são gravados.

#### Regras de Negócio

- **RF011-RN001** - Página do livro, não modal: o clique em **+ Novo Livro**
  abre a página do livro em modo de criação; não existe modal de cadastro.
- **RF011-RN002** - Título obrigatório e único: o **Título do livro** é o único
  campo obrigatório, é gravado sem espaços nas extremidades e não pode repetir
  outro título, sem diferenciar maiúsculas de minúsculas.
- **RF011-RN003** - Gênero Principal é lista fechada de três valores: **Ficção
  Científica**, **Terror** e **Fantasia**. O campo é opcional na criação.
- **RF011-RN004** - Subgêneros são lista fechada por gênero e seleção múltipla:
  - **Ficção Científica:** Hard SciFi, Distopia, Cyberpunk, Space Opera, Militar
    e Fantasia Científica;
  - **Fantasia:** Alta Fantasia, Fantasia Sombria, Distopia, Fantasia Urbana,
    Romantasia, Gótico, Baixa Fantasia, Grindark, Mitológica, Histórica,
    Científica e Espada e Feitiçaria;
  - **Terror:** Psicológico, Sobrenatural, Gótico, Cósmico e Slasher.
  Sem gênero principal escolhido, não há subgêneros disponíveis. A gravação
  recusa subgênero fora da lista do gênero escolhido. A seleção é mantida por
  gênero no formulário: trocar o gênero não apaga os subgêneros já marcados dos
  outros gêneros enquanto o livro não for salvo nem descartado.
- **RF011-RN005** - Faixa de Público é lista fechada: **Infantil**, **Young
  Adult**, **Adulto** e **Geral**. O campo é opcional.
- **RF011-RN006** - Idioma é lista fechada: **Português**, **Inglês** e
  **Espanhol**. O campo é opcional.
- **RF011-RN007** - Gravação transacional: o livro e os seus subgêneros são
  gravados juntos; uma falha no meio não deixa o livro com parte da seleção.
- **RF011-RN008** - Rascunho não persistido: o livro em modo de criação não
  existe no banco até o primeiro **Salvar**; sair da página sem salvar descarta
  o rascunho. Não há criação automática de livro com título provisório.
- **RF011-RN009** - Sem exclusão: este requisito não cria operação de excluir
  livro. A edição dos dados é feita pela própria página **Dados do Livro**.
- **RF011-RN010** - Escopo dos módulos: personagens do livro, capítulos,
  associação livro–mundo, gráficos e exportação pertencem a requisitos
  posteriores. Neste requisito esses itens do menu abrem apenas a tela
  informativa da seção.
- **RF011-RN011** - Menu lateral do livro na ordem definida: **Painel do
  Livro**, **Dados do Livro**, **Personagens**, **Capítulos** e
  **Worldbuilding**; depois o grupo **Análise** com **Gráficos** e **Exportar**;
  por fim **Início — Sair do livro**.
- **RF011-RN012** - Tab Panel com uma aba: o painel de **Dados do Livro** tem
  somente a aba **Dados Gerais** nesta entrega, mas o componente é reutilizável
  para as abas de requisitos futuros.
- **RF011-RN013** - Nome do livro sempre atualizado: depois de salvar, o título
  novo aparece na faixa do livro, no rótulo do menu lateral, no breadcrumb e no
  card da listagem.
- **RF011-RN014** - Sem dados fictícios: a listagem e a página do livro não usam
  os livros, personagens, contadores ou imagens de demonstração do protótipo.
- **RF011-RN015** - Listagem real: a busca e a alternância **Grade/Lista** da
  tela Meus Livros deixam de ser apenas visuais e passam a operar sobre os
  livros cadastrados.
- **RF011-RN016** - Sem regressão: a casca da raiz, a navegação, os temas, o
  splash, Personagens, Worldbuilding e a exportação do Mundo continuam
  funcionando.
- **RF011-RN017** - Métricas do painel ligadas aos livros: as métricas
  **Personagens**, **Personagens · N em 2+ livros**, **Capítulos planejados** e
  **Entradas de worldbuilding** contam somente o que está associado aos livros.
  Enquanto não existirem vínculo personagem–livro, capítulos ou associação
  livro–mundo, essas métricas exibem **0**, mesmo que existam personagens,
  capítulos ou entradas globais no banco.

#### Critérios de Aceite

- **RF011-CA001** - Abrir a página do livro: clicar em **+ Novo Livro** abre a
  página do livro em modo de criação.
- **RF011-CA002** - Estado de novo livro: a página mostra **Novo livro**, o menu
  lateral do livro e a aba **Dados Gerais** com o título vazio; o banco ainda
  não tem registro.
- **RF011-CA003** - Título obrigatório: salvar sem título exibe mensagem útil e
  não cria o livro.
- **RF011-CA004** - Título único: salvar um título já existente, mesmo com
  caixa diferente, exibe mensagem útil e não grava.
- **RF011-CA005** - Criar livro: com um título válido, **Salvar** cria o livro,
  atualiza a faixa do livro e o menu lateral e faz o livro aparecer em **Meus
  Livros**.
- **RF011-CA006** - Reabrir livro: clicar no card do livro abre o **Painel do
  Livro** com os dados gravados.
- **RF011-CA007** - Gênero Principal: o controle oferece exatamente **Ficção
  Científica**, **Terror** e **Fantasia**.
- **RF011-CA008** - Subgêneros: a seleção múltipla é filtrada pelo gênero
  escolhido e apresenta exatamente as listas definidas no requisito, incluindo
  os doze subgêneros de **Fantasia**.
- **RF011-CA009** - Troca de gênero: ao mudar o gênero principal, os subgêneros
  de outros gêneros não são gravados; ao voltar ao gênero original sem salvar,
  os subgêneros salvos reaparecem selecionados.
- **RF011-CA010** - Faixa de Público: o controle oferece **Infantil**, **Young
  Adult**, **Adulto** e **Geral**.
- **RF011-CA011** - Idioma: o controle oferece **Português**, **Inglês** e
  **Espanhol**.
- **RF011-CA012** - Menu lateral: os itens aparecem na ordem **Painel do
  Livro**, **Dados do Livro**, **Personagens**, **Capítulos**,
  **Worldbuilding**, **Gráficos**, **Exportar** e **Início**, com o grupo
  **Análise** antes de **Gráficos** e **Exportar**.
- **RF011-CA013** - Painel do Livro: exibe título, subtítulo com os dados do
  livro, métricas zeradas, os seis módulos e o botão **Dados do livro**.
- **RF011-CA014** - Seções futuras: **Personagens**, **Capítulos**,
  **Worldbuilding**, **Gráficos** e **Exportar** abrem a tela informativa da
  seção, sem erro e sem tela em branco.
- **RF011-CA015** - Tab Panel: **Dados do Livro** renderiza o componente de
  abas com **Dados Gerais** selecionada e o formulário correspondente.
- **RF011-CA016** - Busca de livros: digitar no campo **Buscar livros…** filtra
  a listagem pelo título.
- **RF011-CA017** - Grade/Lista: a alternância entre **Grade** e **Lista**
  muda a visualização dos livros sem perder a busca.
- **RF011-CA018** - Métricas reais: **Livros na biblioteca** conta os livros
  cadastrados; **Personagens** conta somente os personagens associados a livros;
  **Personagens · N em 2+ livros** conta somente personagens com vínculo em dois
  ou mais livros; **Capítulos planejados** conta somente capítulos dos livros; e
  **Entradas de worldbuilding** conta somente entradas dos mundos associados a
  livros. Sem vínculo personagem–livro e sem associação livro–mundo, essas
  métricas exibem **0**, mesmo com personagens e entradas globais cadastrados.
- **RF011-CA019** - Sem dados fictícios: nenhum livro, personagem, contador ou
  imagem do protótipo aparece na tela.
- **RF011-CA020** - Sair do livro: **Trocar livro** e **Início — Sair do livro**
  retornam à tela Meus Livros; um rascunho não salvo não é gravado.
- **RF011-CA021** - Sem regressão: temas, splash, navegação, Personagens,
  Worldbuilding e exportação do Mundo continuam funcionando.
- **RF011-CA022** - Testes automatizados: a verificação cobre a abertura da
  página, criação com título obrigatório e único, todos os campos, filtragem de
  subgêneros, menu na ordem definida, Tab Panel, listagem, busca, grade/lista e
  reabertura do livro.

## Arquitetura

O TaleCraft será construído para Desktop, usando a linguagem Rust com o Framework Tauri 2.0. Para o front-end, será utilizado o React, com JavaScript e Vite. Para o banco de dados, será utilizado o banco SQLite. 

Stack tecnológica
- Desktop: Tauri 2.
- Back-end: Rust.
- Front-end: React com JavaScript e Vite.
- Banco de dados: SQLite

Ambiente de desenvolvimento inicial: Windows.

