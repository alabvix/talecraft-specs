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
- **RF001-RN002** — Interface inicial: Exibir uma janela desktop com o nome TaleCraft e uma mensagem de inicialização bem-sucedida. O aplicativo deve abrir **sempre maximizado**, ocupando a área útil da tela e mantendo a barra de título nativa.
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
- **RF001-CA006** — Janela maximizada: a aplicação abre sempre maximizada, ocupando a área útil da tela com a barra de título visível, inclusive nas execuções seguintes.

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
- **RF002-TL007** — Tela Splash: Exibir uma janela Splash antes de abrir a tela principal, com o **ícone grande**, o nome **TaleCraft ao lado do ícone** e a **versão atual abaixo dos dois, em fonte menor**. A splash permanece visível por um tempo mínimo legível, mesmo com a inicialização rápida, e a janela não abre branca antes dela.

#### Fluxos

- **RF002-FL001** — Seleção de Temas: Ao acessar a tela Temas e clicar em um tema, a aplicação deve aplicar o tema imediamente e salvar a preferência do usuário, de forma que, se fechar a app e abrir novamente, ela deve exibir o tema selecionado.

#### Regras de Negócio

- **RF002-RN001** — Tema Corrente: O aplicativo ao ser aberto pela primeira vez deve sempre usar o tema Blade Byte.
- **RF002-RN002** — Splash legível: a tela de carregamento fica visível por pelo menos 1,2 s, mesmo que a inicialização do banco termine antes, e o fundo da janela antes do CSS/React usa a cor-base do tema, sem piscada branca.

#### Critérios de Aceite

- **RF002-CA001** — Compatibilidade: A aplicação mantém a execução desktop estabelecida no RF-001.
- **RF002-CA002** — Layout: O layout corresponde visualmente ao protótipo.
- **RF002-CA003** — Navegação: Todas as opções do menu abrem as páginas corretas e atualizam o item ativo.
- **RF002-CA004** — Temas e seleção: Todos os temas definidos no protótipo estão disponíveis para seleção.
- **RF002-CA005** — Tema - Troca: A troca de tema atualiza toda a interface sem exigir reinicialização.
- **RF002-CA006** — Tema - persistência: O tema escolhido permanece ativo após fechar e reabrir a aplicação.
- **RF002-CA007** — Aderência: Os componentes respeitam o tema ativo, sem estilos incompatíveis ou cores indevidamente fixas.
- **RF002-CA008** — Compatibilidade stack tech: A aplicação permanece compatível com React, JavaScript, Vite, Tauri e Rust, e compila corretamente.
- **RF002-CA009** — Splash legível: a splash permanece na tela por pelo menos 1,2 s e a janela não exibe fundo branco antes dela; a aplicação só aparece depois do carregamento e do tempo mínimo.
- **RF002-CA010** — Layout da splash: o ícone aparece grande, o nome **TaleCraft** fica ao lado direito do ícone e a versão atual fica abaixo dos dois, em fonte menor que o nome.

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

Nessa tela, exibir como no protótipo. Os **Vínculos com livros** e a **Curva de
arco em cada livro** passaram a ser preenchidos pelo RF014: o painel mostra os
livros vinculados e o papel do personagem, e a curva continua sem dados até os
capítulos serem cadastrados.

O campo listbox Filtrar Por Livro não deve apresentar ainda nenhum dado.

Protótipo da tela de personagens: C:/Users/alabh/workspace/apps/java/talecraft/prototype/personagens-biblioteca.html
- **RF004-TL002** — Tela de Detalhe de Personagem: Essa tela lista os dados do personagem, conforme o protótipo em: file:///C:/Users/alabh/workspace/apps/java/talecraft/prototype/personagem.html
O card de Vínculos com Livros exibe os livros aos quais o personagem está
associado, com o **Papel** do personagem e o **Total de Capítulos em que
aparece** (ajuste do RF014; o total depende do cadastro de Capítulos).

A sessão de Curva de Arco em cada livro lista os livros vinculados e informa
que **não há dados por enquanto**, pois a curva será calculada a partir dos
capítulos (ajuste do RF014).

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
- **RF004-CA009** — Vínculos e curva na ficha global: a tela de detalhe exibe, no card de Vínculos com Livros, os livros aos quais o personagem está associado com o Papel e o Total de Capítulos em que aparece (0 enquanto os capítulos não existem); a seção de Curva de Arco em cada livro permite escolher um livro vinculado e exibe o gráfico de Evolução do Personagem daquele livro; sem dados, informa que ainda não existem dados. Sem vínculos, o card fica retraído e as duas áreas ficam vazias (ajustado pelo RF014).
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
  **Dados do Livro**, **Personagens**, **Capítulos**, **Worldbuilding**,
  **Gráficos** e **Exportar**, nesta ordem, cada um levando à sua seção do menu
  lateral. Abaixo da grade de módulos, o Painel exibe o painel **Curva de
  Progressão por Capítulo** (RF016-TL006).
- **RF011-TL004** - Dados do Livro: página com o componente **Tab Panel**. Nesta
  entrega o painel tem **uma única aba**, **Dados Gerais**, e a estrutura já
  aceita novas abas em requisitos posteriores. A aba contém: **Título do livro**
  (texto, único obrigatório); **Gênero Principal** (lista fechada: Ficção
  Científica, Terror, Fantasia); **Subgêneros** (seleção múltipla, filtrada pelo
  Gênero Principal); **Faixa de Público** (lista fechada: Infantil, Young Adult,
  Adulto, Geral); **Idioma** (lista fechada: Português, Inglês, Espanhol); e
  **Período da História** (**De** e **Até**, texto curto e opcional, lado a
  lado, aceitando somente dígitos).
  A página tem os botões **Descartar** (volta aos últimos dados salvos) e
  **Salvar**. O botão **Descartar** foi **revogado pelo RF012**.
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
  campos voltam aos últimos dados salvos, sem gravar nada. **Revogado pelo
  RF012:** o botão **Descartar** foi removido.
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
- **RF011-RN018** - Período da história: os campos **De** e **Até** ficam lado
  a lado, são curtos e opcionais e aceitam **somente dígitos** — letras, espaços
  e sinais digitados ou colados são descartados. O valor é gravado como texto,
  embora seja numérico; não há validação de intervalo (**De** ≤ **Até**) nem
  máscara de ano. Livros gravados antes deste ajuste com período em texto livre
  mantêm o valor **intacto e sinalizado**; a conversão para dígitos é feita por
  ação explícita (**Usar**/**Limpar**), e o **Salvar** preserva o legado com um
  aviso, sem bloquear a gravação dos demais dados.

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
  livro, métricas zeradas, os seis módulos na ordem **Dados do Livro**,
  **Personagens**, **Capítulos**, **Worldbuilding**, **Gráficos** e **Exportar**,
  e o botão **Dados do livro**; abaixo dos módulos, o painel **Curva de
  Progressão por Capítulo** aparece com o gráfico ou com o aviso de ausência de
  dados.
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
- **RF011-CA023** - Período e módulos: a aba **Dados Gerais** exibe **De** e
  **Até** lado a lado, aceitando somente dígitos; um período legado em texto é
  preservado e sinalizado, com conversão explícita; os valores são gravados e
  relidos; e o **Painel do Livro** apresenta
  os módulos na ordem **Dados do Livro**, **Personagens**, **Capítulos**,
  **Worldbuilding**, **Gráficos** e **Exportar**.

### RF012 - Livros - Aba Resumo

Este requisito acrescenta à página **Dados do Livro** uma segunda aba, **Resumo**,
com dois campos de texto longo: **Resumo** e **Final do Livro**. Os textos
pertencem ao registro do livro e são gravados junto com os dados gerais.

O requisito também revoga o botão **Descartar** da página Dados do Livro
(RF011-TL004, RF011-FL005): a única ação da página passa a ser **Salvar**.

- **Data de criacao:** 27/10/2026

#### Telas

- **RF012-TL001** - Aba Resumo: o Tab Panel de **Dados do Livro** passa a ter
  duas abas, **Dados Gerais** e **Resumo**, nesta ordem, com **Dados Gerais**
  selecionada ao abrir a página. A estrutura reutilizável do Tab Panel permanece
  a mesma (RF011-RN012). O RF013 amplia o painel com as abas **Sinopse**,
  **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo**.
- **RF012-TL002** - Campos da aba Resumo: a aba contém **Resumo** e **Final do
  Livro**, ambos como campos de texto longo (várias linhas), com os rótulos
  exatamente **Resumo** e **Final do Livro**. Os dois campos são opcionais.
- **RF012-TL003** - Ação única de gravação: o botão **Salvar** permanece no
  cabeçalho da página, visível nas duas abas, e grava os campos das duas abas de
  uma vez. O botão **Descartar** deixa de existir.

#### Fluxos

- **RF012-FL001** - Preencher o resumo: o escritor abre **Dados do Livro**, clica
  na aba **Resumo**, digita o **Resumo** e o **Final do Livro** e clica em
  **Salvar**; os textos são gravados no livro.
- **RF012-FL002** - Alternar abas sem perder a edição: o escritor alterna entre
  **Dados Gerais** e **Resumo** antes de salvar; o que foi digitado em cada aba
  permanece no formulário.
- **RF012-FL003** - Reabrir o livro: ao abrir novamente o livro e a aba
  **Resumo**, os textos salvos aparecem nos campos.
- **RF012-FL004** - Salvar a partir da aba Resumo: o **Salvar** continua no
  cabeçalho e grava também os dados da aba **Dados Gerais**, sem precisar voltar
  para ela.
- **RF012-FL005** - Descartar revogado: o escritor não encontra mais o botão
  **Descartar**; para abandonar alterações não salvas, sai da página do livro
  sem salvar.

#### Regras de Negocio

- **RF012-RN001** - Texto livre e opcional: **Resumo** e **Final do Livro**
  aceitam qualquer texto, inclusive vazio, e preservam as quebras de linha. Não
  há limite de caracteres definido no requisito.
- **RF012-RN002** - Persistência no livro: os dois textos são colunas do registro
  do livro, criadas pela migração **v9** aditiva; bancos v8 migram preservando os
  livros existentes, que passam a ter textos vazios. Nenhum passo publicado é
  editado.
- **RF012-RN003** - Gravação conjunta: **Salvar** grava dados gerais,
  subgêneros, **Resumo** e **Final do Livro** na mesma transação, com as
  validações do RF011 (título obrigatório e único). Uma falha não deixa o livro
  com parte dos dados.
- **RF012-RN004** - Edição pendente preservada entre abas: trocar de aba não
  descarta nem recarrega o formulário; apenas **Salvar** grava e atualiza o
  ponto de partida.
- **RF012-RN005** - Descartar revogado: o botão **Descartar** e o fluxo
  **RF011-FL005** são removidos; não é criada ação equivalente. A spec
  consolidada de `book-workspace` é atualizada.
- **RF012-RN006** - Escopo da aba: a aba **Resumo** existe somente dentro de
  **Dados do Livro** e não é exibida no card de Meus Livros, no Painel do Livro
  nem na exportação. O RF013 acrescenta as abas **Sinopse**, **Tema**,
  **Conflito** e **Voz Narrativa/Tom/Tempo**, sem alterar essa regra.
- **RF012-RN007** - Sem dados fictícios: os campos começam vazios em livros sem
  texto e não usam conteúdo do protótipo.
- **RF012-RN008** - Sem regressão: página do livro, navegação, Dados Gerais,
  subgêneros por gênero, listagem de Meus Livros, temas, splash, Personagens,
  Worldbuilding e exportação do Mundo continuam funcionando.

#### Critérios de Aceite

- **RF012-CA001** - Abas: **Dados do Livro** exibe as abas **Dados Gerais** e
  **Resumo**, nesta ordem, com **Dados Gerais** selecionada. O RF013 acrescenta
  as abas **Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo**
  depois delas.
- **RF012-CA002** - Campos: a aba **Resumo** exibe os campos **Resumo** e
  **Final do Livro** como texto longo.
- **RF012-CA003** - Gravar: preencher os dois campos e clicar em **Salvar**
  persiste os textos; reabrir o livro mostra os mesmos textos.
- **RF012-CA004** - Abas sem perda: alternar entre as abas antes de salvar
  preserva o que foi digitado nas duas.
- **RF012-CA005** - Salvar de qualquer aba: salvar a partir da aba **Resumo**
  grava também os dados da aba **Dados Gerais**.
- **RF012-CA006** - Descartar removido: o botão **Descartar** não aparece na
  página Dados do Livro e não existe ação equivalente.
- **RF012-CA007** - Migração v9: um banco v8 migra aditivamente para a v9, sem
  perder livros, subgêneros ou dados de requisitos anteriores.
- **RF012-CA008** - Sem regressão: os fluxos do RF011 e dos requisitos anteriores
  continuam funcionando; o verificador do RF011 é atualizado para a ausência do
  **Descartar**.
- **RF012-CA009** - Testes automatizados: a verificação cobre as duas abas, os
  dois campos, gravação, reabertura, preservação entre abas, salvamento a partir
  da aba Resumo, ausência do **Descartar** e migração v9.

### RF013 - Livros - Abas Sinopse, Tema, Conflito e Voz Narrativa/Tom/Tempo

Este requisito acrescenta quatro abas à página **Dados do Livro**: **Sinopse**,
**Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo**. Os campos são textos
livres ou listas fechadas que pertencem ao registro do livro e são gravados
junto com os dados gerais, o resumo, o final e os subgêneros.

O **Humor** é o único campo de lista com **seleção múltipla**; Narrador, Tom,
Tempo, Estilo e Ritmo aceitam um valor cada. Os valores "Objetivo" e
"Onisciente" corrigem, respectivamente, "Objetico" e "Onisciennte".

- **Data de criacao:** 27/10/2026

#### Telas

- **RF013-TL001** - Tab Panel com seis abas: **Dados do Livro** exibe, nesta
  ordem, **Dados Gerais**, **Resumo**, **Sinopse**, **Tema**, **Conflito** e
  **Voz Narrativa/Tom/Tempo**, com **Dados Gerais** selecionada ao abrir. A
  estrutura reutilizável do Tab Panel permanece a mesma (RF011-RN012).
- **RF013-TL002** - Aba Sinopse: contém **Sinopse Comercial** (texto longo) e
  **Sinopse Editorial** (texto longo), ambos opcionais e em campos de várias
  linhas.
- **RF013-TL003** - Aba Tema: contém **Tema Central** (texto curto, uma linha),
  **Subtemas** (texto médio) e **Nuvem de Palavras** (texto médio), opcionais.
- **RF013-TL004** - Aba Conflito: contém **Ponto de Conflito Principal** (texto
  curto, uma linha), **Polos de Conflito** (texto longo) e **Resolução do
  Conflito Principal** (texto médio), opcionais.
- **RF013-TL005** - Aba Voz Narrativa/Tom/Tempo: contém **Narrador**, **Tom**,
  **Tempo**, **Humor**, **Estilo** e **Ritmo**, todos opcionais. Narrador, Tom,
  Tempo, Estilo e Ritmo são listas fechadas de valor único; Humor é seleção
  múltipla.
- **RF013-TL006** - Ação única de gravação: o botão **Salvar** permanece no
  cabeçalho da página, visível em todas as abas, e grava os campos de todas elas
  de uma vez. Não existe botão **Descartar**.

#### Fluxos

- **RF013-FL001** - Preencher as abas: o escritor abre **Dados do Livro**, navega
  por **Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo**, preenche
  os campos e clica em **Salvar**; os dados são gravados no livro.
- **RF013-FL002** - Alternar abas sem perder a edição: o escritor alterna entre
  as seis abas antes de salvar; o que foi digitado ou selecionado em cada aba
  permanece no formulário.
- **RF013-FL003** - Reabrir o livro: ao abrir novamente o livro, cada aba mostra
  os valores salvos.
- **RF013-FL004** - Salvar a partir de qualquer aba: o **Salvar** grava todas as
  abas, sem precisar voltar para a aba de origem dos dados.
- **RF013-FL005** - Marcar mais de um humor: o escritor marca **Ironia** e
  **Sátira**, por exemplo, e os dois valores são gravados juntos.

#### Regras de Negocio

- **RF013-RN001** - Texto livre e opcional: os campos de texto aceitam qualquer
  conteúdo, inclusive vazio, e preservam as quebras de linha. **Texto curto** é
  um campo de uma linha; **texto médio** é um campo de várias linhas com altura
  intermediária; **texto longo** é um campo de várias linhas com altura maior.
- **RF013-RN002** - Listas fechadas: os valores são exatamente:
  - **Narrador:** 1ª Pessoa, 3ª Pessoa Limitada, 3ª Pessoa Onisciente e 2ª
    Pessoa;
  - **Tom:** Contido, Lírico e Seco;
  - **Tempo:** Presente, Passado e Futuro;
  - **Humor:** Ironia, Situacional, Depreciativo, Sátira, Exagero, Melancólico e
    Nonsense;
  - **Estilo:** Objetivo, Contador e Poético;
  - **Ritmo:** Rápido e Lento.
  Todos os campos são opcionais. **Humor** aceita mais de um valor, sem
  repetição; os demais aceitam um valor cada.
- **RF013-RN003** - Persistência no livro: os campos são colunas do registro do
  livro e a seleção de Humor é uma tabela filha (`livro_humor`), criadas pela
  migração **v10** aditiva. Bancos v9 migram preservando os dados; livros
  existentes passam a ter textos vazios, listas sem valor e nenhum humor.
  Nenhum passo publicado é editado.
- **RF013-RN004** - Gravação conjunta: **Salvar** grava dados gerais,
  subgêneros, resumo, final, as quatro abas novas e o humor na mesma transação.
  Uma falha não deixa o livro com parte dos dados.
- **RF013-RN005** - Validação em duas camadas: o domínio recusa valor fora das
  listas fechadas com mensagem útil, e o `CHECK` do SQLite é a garantia final.
- **RF013-RN006** - Humor independente: a seleção de Humor não depende de outra
  lista e pode ser gravada sozinha; valores repetidos são gravados uma vez.
- **RF013-RN007** - Escopo das abas: os campos existem somente dentro de
  **Dados do Livro** e não são exibidos no card de Meus Livros, no Painel do
  Livro nem na exportação. Não são criadas outras abas neste requisito.
- **RF013-RN008** - Sem dados fictícios: as abas começam vazias em livros sem
  texto e não usam conteúdo do protótipo.
- **RF013-RN009** - Sem regressão: página do livro, navegação, Dados Gerais,
  Resumo, subgêneros por gênero, listagem de Meus Livros, temas, splash,
  Personagens, Worldbuilding e exportação do Mundo continuam funcionando.

#### Critérios de Aceite

- **RF013-CA001** - Abas e ordem: **Dados do Livro** exibe **Dados Gerais**,
  **Resumo**, **Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo**,
  nesta ordem, com **Dados Gerais** selecionada.
- **RF013-CA002** - Sinopse: a aba tem **Sinopse Comercial** e **Sinopse
  Editorial** como texto longo.
- **RF013-CA003** - Tema: a aba tem **Tema Central** como texto curto,
  **Subtemas** e **Nuvem de Palavras** como texto médio.
- **RF013-CA004** - Conflito: a aba tem **Ponto de Conflito Principal** como
  texto curto, **Polos de Conflito** como texto longo e **Resolução do Conflito
  Principal** como texto médio.
- **RF013-CA005** - Voz Narrativa/Tom/Tempo: a aba tem **Narrador**, **Tom**,
  **Tempo**, **Humor**, **Estilo** e **Ritmo**, com exatamente as opções do
  requisito.
- **RF013-CA006** - Humor múltiplo: é possível marcar mais de um valor de
  **Humor** e todos são gravados.
- **RF013-CA007** - Gravar e reabrir: preencher as quatro abas e clicar em
  **Salvar** persiste todos os campos; reabrir o livro mostra os mesmos valores.
- **RF013-CA008** - Abas sem perda: alternar entre as abas antes de salvar
  preserva o que foi digitado ou selecionado em todas.
- **RF013-CA009** - Salvar de qualquer aba: salvar a partir de uma das abas novas
  grava também os campos das demais.
- **RF013-CA010** - Migração v10: um banco v9 migra aditivamente para a v10, sem
  perder livros, subgêneros, resumo, final ou dados de requisitos anteriores.
- **RF013-CA011** - Sem regressão: os fluxos do RF011, do RF012 e dos requisitos
  anteriores continuam funcionando.
- **RF013-CA012** - Testes automatizados: a verificação cobre as seis abas, os
  tipos de campo, as listas fechadas, o humor múltiplo, a gravação, a
  reabertura, a preservação entre abas e a migração v10.

### RF014 - Livros - Personagens do livro

Este requisito abre a seção **Personagens** do livro aberto. O escritor associa
personagens da biblioteca global ao livro e registra, no vínculo, como cada um
participa daquela história: o papel narrativo, o resumo do papel, o papel no
mundo, os títulos/outros nomes locais e o resumo da atuação.

A ficha do personagem continua **global** e é a fonte dos dados herdados; o
vínculo guarda somente os dados que variam de livro para livro e não altera o
cadastro global (RF004). A ficha global passa a ler os vínculos: o painel
**Vínculos com Livros** mostra os livros, o papel e o total de capítulos em que
o personagem aparece, e a **Curva de arco em cada livro** permite escolher o
livro e desenhar o gráfico do personagem nele (RF014-TL007). O RF014 revoga, para
**Personagens**, a tela informativa prevista em RF011-TL006 e RF011-CA014. Não
há remoção de personagem do livro neste requisito.

- **Data de criacao:** 28/10/2026
- **Ajuste de 28/10/2026:** a modal de seleção ganhou busca por nome e grade
  paginada (RF014-TL003, RF014-RN014, RF014-CA003) e o **Papel** passou a ter
  treze valores (RF014-RN004, RF014-CA008). O campo **Alcunha** do vínculo
  passou a se chamar **Títulos/Outros Nomes** (RF014-TL004, RF014-RN003); a
  **Alcunha** global continua com esse nome e somente leitura. A ficha global
  passou a mostrar os vínculos no painel **Vínculos com Livros** e na **Curva de
  arco em cada livro** (RF014-TL007, RF014-RN015, RF014-CA018); o nome do livro
  é um link para a página do livro e o card da lista global mostra a quantidade
  real de livros vinculados.
- **Ajuste de 02/11/2026:** a seção passou a exibir os cards em uma faixa
  horizontal com até cinco por tela e rolagem para os demais, e a lista em uma
  tabela paginada de cinco em cinco. O detalhe do personagem deixou de ser modal
  e passou a abrir **abaixo** da grade/lista em quatro abas — dados globais,
  personagem no livro, gráfico de evolução e eventos —, sem botão **Fechar** nem
  ícone X (RF014-TL001, RF014-TL004, RF014-TL006, RF014-RN017, RF014-RN018,
  RF014-CA006, RF014-CA007, RF014-CA020, RF014-CA021, RF014-CA024,
  RF014-CA025).

#### Telas

- **RF014-TL001** - Seção Personagens: o item **Personagens** do menu do livro
  deixa de abrir a tela informativa (RF011-TL006) e passa a listar os
  personagens associados ao livro em **cards** (padrão) ou em **lista**, com
  alternância entre as duas visualizações, no mesmo padrão da biblioteca global
  (RF004). Cada item mostra o retrato e o nome do personagem e o **Papel** do
  vínculo; sem papel, mostra **Papel não definido**. Em **cards**, a faixa exibe
  no máximo cinco cards por tela e uma barra de rolagem horizontal para os
  demais. Em **lista**, a tabela exibe cinco personagens por página, com os
  botões **Anterior** e **Próxima** e a indicação da página atual. Cada card e
  cada linha mostram **Qtd Capítulos** (total de capítulos em que o personagem
  aparece) e **Capítulos** (os números em ordem, como `1,3,4`). O card ou a
  linha do personagem selecionado fica destacado. Sem vínculos,
  a seção mostra um estado vazio com orientação para usar **Adicionar
  Personagens**.
- **RF014-TL002** - Botão Adicionar Personagens: fica no cabeçalho da seção,
  visível em cards e em lista, e abre a modal de seleção. Enquanto o livro não
  estiver salvo (modo de criação), o botão fica desabilitado e uma mensagem
  orienta a salvar o livro antes de associar personagens.
- **RF014-TL003** - Modal de seleção: tem o título **Adicionar Personagens**,
  campo de busca por nome e os personagens da biblioteca global organizados em
  uma **grade paginada**, com caixa de seleção, retrato e nome. A busca filtra
  pelo nome e a paginação divide a grade em páginas; a seleção marcada é mantida
  ao trocar de página ou de busca. Personagens já associados ao livro aparecem
  com o selo **Já associado** e não podem ser marcados. A modal tem os botões
  **Associar** e **Fechar**. Sem personagens globais, mostra um estado vazio com
  orientação para cadastrá-los na biblioteca global; sem resultado para a busca,
  informa que nenhum personagem corresponde.
- **RF014-TL004** - Detalhe do personagem no livro: abre **abaixo** da
  grade/lista ao clicar no card ou na linha, sem modal, e tem três abas:
  **Dados Globais do Personagem**, com retrato, Nome, Idade, Raça,
  Personalidade, Força, Fraqueza, Interesses, Alcunha e Biografia, todos
  somente leitura; **Personagem no Livro**, com **Papel**, **Resumo do Papel**,
  **Papel no mundo**, **Títulos/Outros Nomes** e **Resumo da atuação na
  história**, editáveis; **Gráfico de Evolução**, com o
  gráfico de evolução do personagem naquele livro; e **Eventos**, com a tabela
  de eventos do personagem no livro. O detalhe tem **Salvar** na aba do vínculo;
  não há botão **Fechar** nem ícone X — ele permanece aberto até a troca de
  personagem ou a saída da seção.
- **RF014-TL005** - Tipos dos campos do vínculo: **Papel** é uma lista fechada;
  **Resumo do Papel**, **Papel no mundo** e **Títulos/Outros Nomes** são texto
  curto, de uma linha; **Resumo da atuação na história** é texto longo, de
  várias linhas. Todos os campos são opcionais.
- **RF014-TL006** - Ações do detalhe: **Salvar** grava os campos do vínculo e
  mantém o detalhe aberto com a confirmação; não há botão **Fechar** nem ícone X.
  Se a gravação falhar, o detalhe permanece aberto com mensagem útil e os valores
  anteriores não são alterados.
- **RF014-TL007** - Vínculos na ficha global e na lista: na tela **Detalhe do
  Personagem** (RF004-TL002), o painel **Vínculos com Livros** lista os livros
  aos quais o personagem está associado, com as colunas **Livro**, **Papel** e
  **Total de Capítulos em que aparece** (contagem real; 0 quando não houver). O
  nome do livro é um **link** que abre a página
  daquele livro. O quadro **Curva de arco em cada livro** tem uma caixa de
  seleção com os livros vinculados e, ao selecionar, exibe o gráfico **Evolução
  de Personagem** daquele livro; sem capítulos ou eventos do personagem, informa
  **Ainda não existem dados**. Na lista global de
  personagens, o rodapé de cada card mostra a **quantidade de livros
  vinculados** (0 quando não há), em vez de um valor fixo. O painel continua
  retrátil: retraído sem vínculos e expandido com ao menos um (RF006-RN001 a
  RF006-RN003).

#### Fluxos

- **RF014-FL001** - Associar personagens: com o livro salvo, o escritor abre
  **Personagens**, clica em **Adicionar Personagens**, marca um ou mais
  personagens e clica em **Associar**; os vínculos são criados, a modal fecha, a
  lista é atualizada e os personagens passam a contar nas métricas.
- **RF014-FL002** - Tentar associar um personagem já associado: o personagem
  aparece com **Já associado** e não pode ser marcado; se a seleção chegar ao
  servidor com um vínculo já existente (por exemplo, estado desatualizado da
  modal), o sistema não cria um segundo vínculo, associa somente os novos e
  exibe uma mensagem informando quais já estavam no livro.
- **RF014-FL003** - Editar o vínculo: o escritor clica no personagem na seção
  **Personagens**, preenche ou altera os campos do **Vínculo com o livro** e
  clica em **Salvar**; o detalhe permanece aberto com a confirmação, o card ou a
  linha mostra o novo **Papel** e a reabertura do personagem exibe os valores
  gravados.
- **RF014-FL004** - Fechar sem salvar: o escritor altera os campos do vínculo e
  clica em **Fechar**; as alterações pendentes são descartadas, o detalhe fecha
  e o vínculo anterior permanece.
- **RF014-FL005** - Livro ainda não salvo: na página do livro em modo de criação,
  o botão **Adicionar Personagens** fica desabilitado; depois de salvar o livro
  em **Dados do Livro**, o botão é habilitado e o fluxo de associação funciona.

#### Regras de Negocio

- **RF014-RN001** - Vínculo N:N: um livro tem vários personagens e um personagem
  pode estar em vários livros; cada par livro–personagem tem no máximo um
  vínculo. O vínculo não altera a ficha global nem cria uma cópia do personagem.
- **RF014-RN002** - Dados herdados somente leitura: os dados globais exibidos no
  detalhe vêm do cadastro do personagem (RF004) e não podem ser editados nele. As
  relações globais continuam somente na ficha global e não fazem parte do
  detalhe. Para alterar um dado global, o escritor usa a biblioteca de
  personagens.
- **RF014-RN003** - Campos do vínculo: **Papel**, **Resumo do Papel**, **Papel
  no mundo**, **Títulos/Outros Nomes** e **Resumo da atuação na história**,
  todos opcionais. O campo **Títulos/Outros Nomes** (a alcunha local, gravada na
  coluna `alcunha`) é independente da **Alcunha** global e pode ser diferente; a
  global permanece somente leitura (RF004).
- **RF014-RN004** - Papel: lista fechada com **Protagonista**, **Antagonista**,
  **Coadjuvante**, **Aliado**, **Falso Antagonista**, **Falso Protagonista**,
  **Oponente**, **Confidente**, **Figurante**, **Coprotagonista**, **Mentor**,
  **Herói** e **Vilão**, além do valor vazio **Não definido**. Cada vínculo
  aceita um valor.
- **RF014-RN005** - Duplicidade recusada: o domínio e a chave primária composta
  do banco impedem dois vínculos do mesmo personagem com o mesmo livro; a
  tentativa não cria nem altera o vínculo existente e gera mensagem útil.
- **RF014-RN006** - Persistência no livro: a migração **v12** aditiva cria a
  tabela `livro_personagem`, com o par livro–personagem como chave primária,
  referências ao livro e ao personagem global, `CHECK` do **Papel** e os cinco
  campos do vínculo. Bancos v11 migram preservando livros, personagens, abas e
  humor; nenhum passo publicado é editado.
- **RF014-RN007** - Gravação do vínculo: **Salvar** grava somente os cinco campos
  do vínculo, sem tocar no personagem global nem nos dados do livro; a
  atualização confere as linhas afetadas e uma falha não deixa o vínculo com
  parte dos dados.
- **RF014-RN008** - Livro salvo: só é possível associar personagens e editar
  vínculos de um livro com registro no banco. Em modo de criação, além do botão
  desabilitado, o back-end recusa a operação com mensagem útil.
- **RF014-RN009** - Sem remoção: este requisito não desvincula personagens do
  livro nem cria botão, ícone ou ação equivalente; a seção apenas acrescenta
  personagens e edita os dados do vínculo.
- **RF014-RN010** - Escopo da seção: a seção **Personagens** pertence ao livro
  aberto. A ficha global não edita os campos do vínculo, mas lê os vínculos no
  painel **Vínculos com Livros** e na **Curva de arco em cada livro**
  (RF014-TL007); o **Papel** do vínculo não é gravado no cadastro global.
- **RF014-RN011** - Métricas: a partir dos vínculos, as métricas **Personagens**
  e **Personagens · N em 2+ livros** de **Meus Livros** passam a contar os
  personagens associados a pelo menos um livro e os associados a dois ou mais
  livros, respectivamente, sem somar personagens soltos da biblioteca global
  (RF011-RN017).
- **RF014-RN012** - Sem dados fictícios: a seção começa sem personagens
  associados e a modal de seleção não pré-marca nem inventa vínculos, papéis ou
  textos do protótipo.
- **RF014-RN013** - Sem regressão: página do livro, navegação, Dados do Livro,
  abas, Meus Livros, temas, splash, biblioteca de personagens, relações
  familiares, Worldbuilding, facções e exportação do Mundo continuam
  funcionando.
- **RF014-RN014** - Busca e paginação da seleção: a modal de seleção filtra os
  personagens da biblioteca global pelo nome, sem diferenciar maiúsculas, e
  organiza o resultado em uma grade paginada. A seleção já marcada é mantida ao
  trocar de página ou de busca; os personagens já associados continuam fora da
  seleção.
- **RF014-RN015** - Leitura dos vínculos na ficha global: o painel **Vínculos
  com Livros** e o quadro **Curva de arco em cada livro** da ficha global leem a
  tabela `livro_personagem` em modo somente leitura. O **Total de Capítulos em
  que aparece** é a contagem real dos capítulos do livro em que o personagem
  atua; 0 quando não houver. A curva usa a caixa de seleção de livros e o
  comando `dados_graficos_livro`; exibe o gráfico do personagem no livro
  escolhido e, sem dados, **Ainda não existem dados**. O nome do
  livro no painel é um link para a página do livro. A lista global de
  personagens exibe no rodapé do card a quantidade real de livros vinculados.
  Personagens sem vínculo continuam com o painel retraído, as áreas vazias e
  **0 livros** no card.
- **RF014-RN016** - Curva de arco com seletor: o quadro **Curva de arco em cada
  livro** começa no primeiro livro vinculado e permite escolher outro; a
  seleção é somente leitura e exibe o gráfico de **Evolução de Personagem**
  daquele livro, filtrando o arco pelo personagem da ficha. A linha e os
  marcadores seguem o RF016; sem aparições ou eventos, o painel mostra **Ainda
  não existem dados**. Trocar o livro não altera os vínculos nem grava dados.
- **RF014-RN017** - Aba Eventos: lista em tabela os eventos do personagem no
  livro, com as colunas **Capítulo**, **Tipo Evento** e **Motivo do evento**.
  Entram somente **Ascensão**, **Declínio**, **Apogeu** e **Queda**; eventos
  **Neutro** não aparecem. A tabela pagina de cinco em cinco, com **Anterior**,
  **Próxima** e a página atual, na ordem dos capítulos; motivo vazio mostra
  **—**.
- **RF014-RN018** - Sem ação de fechar: o detalhe não tem botão **Fechar** nem
  ícone X. Ele permanece aberto até o escritor selecionar outro personagem ou
  sair da seção; trocar de personagem substitui o conteúdo e descarta as
  alterações pendentes.

#### Critérios de Aceite

- **RF014-CA001** - Seção real: clicar em **Personagens** no menu do livro abre a
  lista de personagens do livro, não a tela informativa de requisito posterior.
- **RF014-CA002** - Botão: a seção exibe **Adicionar Personagens**; em livro não
  salvo, o botão fica desabilitado com mensagem.
- **RF014-CA003** - Modal de seleção: o botão abre a modal com os personagens
  globais em grade paginada, campo de busca por nome, marca os já associados
  como **Já associado** e mostra **Associar** e **Fechar**; a busca filtra pelo
  nome e a seleção marcada permanece ao trocar de página.
- **RF014-CA004** - Associação múltipla: marcar vários personagens e clicar em
  **Associar** cria todos os vínculos, fecha a modal e atualiza a lista.
- **RF014-CA005** - Duplicidade: tentar associar um personagem já associado não
  cria um segundo vínculo e exibe mensagem.
- **RF014-CA006** - Listagem: os personagens do livro aparecem em **cards** com
  até cinco por tela e rolagem horizontal para os demais, ou em **lista**
  paginada de cinco em cinco; os dois modos mostram retrato, nome e papel; sem
  vínculos, a seção mostra o estado vazio.
- **RF014-CA007** - Detalhe: clicar no personagem abre o detalhe **abaixo** da
  grade/lista, sem modal, com as abas **Dados Globais do Personagem**
  (somente leitura), **Personagem no Livro** (campos editáveis), **Gráfico de
  Evolução** e **Eventos**; o card ou a linha selecionado fica destacado e não
  há botão **Fechar** nem ícone X.
- **RF014-CA008** - Papel: a lista de **Papel** tem exatamente os treze valores
  definidos, além do valor vazio.
- **RF014-CA009** - Salvar vínculo: preencher os cinco campos e clicar em
  **Salvar** grava os dados, mantém o detalhe aberto com a confirmação, atualiza
  o papel na listagem e mantém a ficha global inalterada; reabrir mostra os
  valores gravados.
- **RF014-CA010** - Troca de personagem: alterar campos e selecionar outro
  personagem descarta as alterações pendentes, mantém o vínculo anterior e o
  detalhe continua aberto para o novo personagem.
- **RF014-CA011** - Sem personagens globais: a modal de seleção mostra estado
  vazio, orienta o cadastro global e **Fechar** funciona.
- **RF014-CA012** - Sem seleção: clicar em **Associar** sem personagens marcados
  exibe mensagem e não grava nada.
- **RF014-CA013** - Migração v12: um banco v11 migra aditivamente para a v12 sem
  perder livros, personagens, subgêneros, abas, humor ou relações; o esquema
  recusa vínculo duplicado e **Papel** fora da lista.
- **RF014-CA014** - Métricas: depois das associações, **Personagens** e
  **Personagens · N em 2+ livros** refletem os vínculos e não contam personagens
  sem livro.
- **RF014-CA015** - Sem remoção: não existe botão, ícone ou ação de desvincular
  personagem na seção.
- **RF014-CA016** - Sem regressão: os fluxos do RF004, do RF011, do RF012, do
  RF013 e dos demais requisitos anteriores continuam funcionando.
- **RF014-CA017** - Testes automatizados: a verificação cobre a seção, o botão, a
  modal de seleção, a associação múltipla, a duplicidade, os cards/lista, a
  paginação e a rolagem dos cards, os capítulos por personagem, o destaque do
  selecionado, o detalhe em abas, a aba Eventos, o papel, a gravação, a troca de
  personagem sem salvar, o estado vazio, a migração v12, as métricas e os
  vínculos e a curva de arco na ficha global.
- **RF014-CA018** - Vínculos na ficha global: ao abrir a tela de detalhe de um
  personagem vinculado, o painel **Vínculos com Livros** aparece expandido e
  lista **Livro**, **Papel** e **Total de Capítulos em que aparece** (contagem
  real; 0 quando não houver); o nome do livro é um link que abre a página do livro. A **Curva de
  arco em cada livro** tem uma caixa de seleção com os livros vinculados e exibe
  o gráfico do livro escolhido (ou **Ainda não existem dados**). Sem vínculo, o
  painel abre retraído e a curva mostra o estado vazio. Na lista global, o rodapé
  do card mostra a quantidade real de livros vinculados (0 quando não há).
- **RF014-CA019** - Curva de arco por livro: ao abrir a ficha de um personagem
  com vínculos, a **Curva de arco em cada livro** mostra a caixa de seleção,
  começa no primeiro livro e desenha o gráfico de Evolução do Personagem do livro
  escolhido; trocar o livro atualiza o gráfico (ou o aviso **Ainda não existem
  dados**), sem alterar os vínculos.
- **RF014-CA020** - Cards e lista paginados: os cards exibem no máximo cinco por
  tela e rolam na horizontal para os demais; a lista exibe cinco personagens por
  página, com **Anterior** e **Próxima** desabilitados nos limites e a indicação
  da página; clicar em um item de qualquer modo abre o detalhe abaixo.
- **RF014-CA021** - Detalhe em quatro abas: o detalhe abaixo da grade/lista
  separa **Dados Globais do Personagem**, **Personagem no Livro**, **Gráfico de
  Evolução** e **Eventos**; a aba do gráfico desenha o personagem naquele livro
  ou informa **Ainda não existem dados**, e a aba **Eventos** lista os eventos
  em tabela.
- **RF014-CA022** - Destaque do selecionado: ao abrir o detalhe de um personagem,
  o card ou a linha correspondente fica visualmente destacado; ao selecionar
  outro, o destaque acompanha a seleção.
- **RF014-CA023** - Capítulos no card e na tabela: cada card e cada linha mostram
  **Qtd Capítulos** com o total de capítulos do livro em que o personagem
  aparece e **Capítulos** com os números em ordem crescente (por exemplo,
  `Capítulos: 1,3,4`); sem capítulos, mostram `0` e `—`, sem inventar dados.
- **RF014-CA024** - Aba Eventos: a aba lista os eventos do personagem no livro em
  uma tabela com **Capítulo**, **Tipo Evento** e **Motivo do evento**, somente
  **Ascensão**, **Declínio**, **Apogeu** e **Queda**, com cinco linhas por
  página, **Anterior**/**Próxima** e a página atual; eventos **Neutro** não
  aparecem e motivo vazio mostra **—**.
- **RF014-CA025** - Sem ação de fechar: o detalhe não exibe botão **Fechar** nem
  ícone X; selecionar outro personagem troca o conteúdo e descarta as alterações
  pendentes, e o detalhe continua aberto.

### RF015 - Livros - Capítulos

Este requisito abre a seção **Capítulos** do livro. O escritor planeja a
estrutura da história em um quadro com os quatro status — **Esboço**,
**Rascunho**, **Revisão** e **Finalizado** —, cria capítulos em cada status,
edita os dados no painel abaixo e arrasta os cards para mudar o status. Cada
capítulo pertence ao livro e pode ter personagens do elenco, com o evento de
arco que aquele capítulo representa para cada um.

O layout segue o protótipo `capitulos.html`, com as cores e a tipografia do tema
ativo do aplicativo. A associação livro–mundo ainda pertence a requisito
posterior; por isso o **Cenário Worldbuilding** fica sem opções enquanto não
houver um mundo associado, exibindo o aviso correspondente.

- **Data de criacao:** 28/10/2026

#### Telas

- **RF015-TL001** - Seção Capítulos: o item **Capítulos** do menu do livro abre
  o quadro da história, não a tela informativa de requisito posterior. O
  cabeçalho tem o título, a contagem de capítulos e o botão **Novo Capítulo**.
  Em livro não salvo, a seção orienta a salvar o livro e o botão fica
  desabilitado.
- **RF015-TL002** - Quadro de status: quatro colunas fixas — **Esboço**,
  **Rascunho**, **Revisão** e **Finalizado** —, cada uma com contador, lista de
  cards e rolagem própria no corpo. O rodapé de cada coluna tem **Adicionar
  Capítulo**, que cria um capítulo naquele status. Cada card mostra o número, o
  título, o tipo e a quantidade de personagens.
- **RF015-TL003** - Ordenação por coluna: o cabeçalho de cada coluna permite
  ordenar os capítulos por **Número** ou **Data de Criação**, em ordem
  **Ascendente** ou **Descendente**. A escolha é independente por coluna.
- **RF015-TL004** - Botão Novo Capítulo: no cabeçalho da página, cria um capítulo
  no status **Esboço**, abre o painel de edição e atualiza o quadro, mesmo que o
  escritor esteja em outra coluna.
- **RF015-TL005** - Painel de edição: ao clicar em um card, o painel **abaixo do
  quadro** abre com os dados do capítulo em modo de edição, organizados em três
  abas: **Dados do Capítulo**, **Dados Complementares** e **Personagens do
  Capítulo**. O cabeçalho do painel exibe o número, o título, o status e o botão
  **Salvar** no canto superior direito, comum às três abas. A aba **Dados do
  Capítulo** reúne **Número**, **Título**, **Status**, **Tipo**, **Motivo do
  Tipo**, **Meta**, **Cenário Worldbuilding**, **Cenário Descritivo** e
  **Resumo**. A aba **Dados Complementares** reúne **Foreshadowing**, **Plot
  Twist**, **Cliffhanger**, **Punch** e **K.O**. A aba **Personagens do
  Capítulo** reúne os personagens do elenco, cada um com uma **miniatura do
  retrato** antes do nome — sem retrato, um quadrado vazio ocupa o mesmo espaço
  — e com o **Nome** seguido do **Papel** do vínculo no livro, no formato
  **Nome - Papel**, além de **Evento**, **Tipo de Evento** e **Motivo do
  Evento**, e do controle de adicionar e remover personagens. O **Motivo do
  Tipo** é um texto de duas linhas logo abaixo do Tipo e a **Meta** é um texto
  de duas linhas. O **Punch** é texto curto e o **K.O**, texto curto com a
  **mesma altura** do Punch, fica ao lado dele; o **Cenário Descritivo** usa
  duas linhas. O **Cenário Worldbuilding** aceita **um ou mais** cenários, com
  select agrupado por mundo, botão **Adicionar** e lista dos selecionados com
  **Remover**. O painel só edita um capítulo existente; **Salvar** não cria um
  capítulo novo.
- **RF015-TL006** - Ajuda do Tipo: o campo **Tipo** tem o botão **?** ao lado do
  rótulo, como o Nível Tecnológico do Mundo. Ao passar o mouse ou focar, explica
  em **linhas separadas**: “**Ação:** o capítulo se move para a conclusão da
  trama ou resolução do conflito principal.”; “**Suspensão:** o capítulo não se
  move para a conclusão, mas apresenta informações relevantes ou prepara para a
  ação.”; “**Direto:** o protagonista atua diretamente no tipo.”; “**Indireto:**
  outro personagem atua no tipo.”
- **RF015-TL007** - Ajudas de Evento e Tipo de Evento: os campos **Evento** e
  **Tipo de Evento** de cada personagem do capítulo têm o botão **?** ao lado do
  rótulo, no padrão da ajuda do **Tipo**. Ao passar o mouse ou focar, a ajuda do
  **Evento** explica **Ponto de Ligação** e **Ponto de Virada**, e a ajuda do
  **Tipo de Evento** explica **Ascensão**, **Declínio**, **Apogeu** e **Queda**,
  com os exemplos do requisito. As duas ajudas não alteram as opções nem a
  gravação.
- **RF015-TL008** - Aba Dados Complementares: a segunda aba do painel do
  capítulo reúne **Foreshadowing**, **Plot Twist**, **Cliffhanger**, **Punch** e
  **K.O**, com o **K.O** ao lado do **Punch** e a mesma altura dele. A aba usa o
  mesmo **Salvar** do cabeçalho e não mostra os campos estruturais do capítulo.

#### Fluxos

- **RF015-FL001** - Criar pelo cabeçalho: o escritor clica em **Novo Capítulo**;
  um capítulo é criado no **Esboço**, com o próximo número do livro, e o painel
  abre para edição.
- **RF015-FL002** - Criar pelo rodapé da coluna: o escritor clica em **Adicionar
  Capítulo** no rodapé de **Rascunho**, **Revisão** ou **Finalizado**; o capítulo
  nasce naquele status e o painel abre para edição.
- **RF015-FL003** - Editar e salvar: o escritor clica em um card, altera os
  campos e clica em **Salvar**; os dados e os personagens do capítulo são
  gravados, o card permanece na coluna do status e passa a mostrar o novo título,
  tipo e contagem de personagens.
- **RF015-FL004** - Arrastar entre status: o escritor arrasta um card de uma
  coluna para outra; o status do capítulo muda para o da coluna de destino e o
  quadro é atualizado. Se o capítulo arrastado estiver aberto no painel, o campo
  **Status** acompanha.
- **RF015-FL005** - Ordenar uma coluna: o escritor escolhe **Número** ou **Data
  de Criação** e a direção no cabeçalho da coluna; somente aquela coluna muda de
  ordem.

#### Regras de Negocio

- **RF015-RN001** - Vínculo com o livro: cada capítulo pertence a um livro salvo.
  Em modo de criação, o quadro não cria capítulos e o back-end recusa a operação
  com mensagem útil.
- **RF015-RN002** - Status: lista fechada com **Esboço**, **Rascunho**,
  **Revisão** e **Finalizado**. O cabeçalho cria no Esboço; o rodapé cria no
  status da coluna; o arrastar muda para o status de destino.
- **RF015-RN003** - Número: obrigatório, inteiro maior que zero e único dentro
  do livro. O próximo número é calculado ao criar. Os demais campos são
  opcionais.
- **RF015-RN004** - Tipo: lista fechada com **Ação Direta**, **Ação Indireta**,
  **Suspensão Direta** e **Suspensão Indireta**, além do valor vazio **Não
  definido**. O capítulo recém-criado começa como **Não definido**.
- **RF015-RN005** - Personagens do capítulo: somente personagens associados ao
  livro (elenco do RF014). Cada personagem tem **Evento** — **Neutro**, **Ponto
  de Ligação** ou **Ponto de Virada** —, **Tipo de Evento**, conforme o evento:
  **Neutro** → **Neutro**; **Ponto de Ligação** → **Ascensão** ou **Declínio**;
  **Ponto de Virada** → **Apogeu** ou **Queda**, e **Motivo do Evento**, texto
  livre que descreve por que o evento acontece. O mesmo personagem não pode
  repetir no capítulo.
- **RF015-RN006** - Persistência: a migração **v14** aditiva cria `capitulo` e
  `capitulo_personagem`, com `CHECK` de status, tipo, evento e tipo de evento,
  chave estrangeira para o livro/personagem e unicidade do número por livro; a
  migração **v15** aditiva acrescenta o **Motivo do Evento** em
  `capitulo_personagem`, com texto vazio para os vínculos existentes, e a
  migração **v16** aditiva acrescenta o **Motivo do Tipo** em `capitulo`, também
  com texto vazio para os capítulos existentes; a **v24** cria a tabela
  `capitulo_cenario` e copia para ela o cenário único. Bancos v13, v14 e v15
  migram preservando livros, personagens, vínculos e capítulos.
- **RF015-RN007** - Gravação: **Salvar** atualiza somente o capítulo e os
  personagens do capítulo; não altera a ficha global, o vínculo do personagem
  com o livro nem os dados do livro. Uma falha não deixa o capítulo pela metade.
- **RF015-RN008** - Métricas: **Capítulos planejados** em Meus Livros e no
  Painel do Livro conta os capítulos reais de todos os livros. Sem capítulos,
  continua **0**.
- **RF015-RN009** - Ficha global: o **Total de Capítulos em que aparece** do
  painel **Vínculos com Livros** passa a contar os capítulos reais em que o
  personagem atua, por livro.
- **RF015-RN010** - Sem remoção: este requisito não exclui capítulos nem cria
  ação de remover; o foco é criar, editar e mover entre status.
- **RF015-RN011** - Sem dados fictícios: o quadro começa vazio, sem capítulos,
  títulos ou números do protótipo.
- **RF015-RN012** - Sem regressão: página do livro, navegação, Dados do Livro,
  abas, Meus Livros, temas, splash, biblioteca de personagens, relações, mundos,
  entradas, facções e exportação do Mundo continuam funcionando.
- **RF015-RN013** - Motivo do Tipo: texto de duas linhas e opcional, logo abaixo
  do Tipo, gravado no próprio capítulo e relido com ele. A migração **v16**
  acrescenta a coluna `motivo_tipo` e preserva os capítulos existentes com o
  motivo vazio. O **K.O** é texto curto com a mesma altura do **Punch**.
- **RF015-RN014** - Abas do painel do capítulo: a primeira aba, **Dados do
  Capítulo**, mostra os campos do **Número** até o **Resumo**; a segunda,
  **Dados Complementares**, mostra **Foreshadowing**, **Plot Twist**,
  **Cliffhanger**, **Punch** e **K.O**; a terceira, **Personagens do Capítulo**,
  mostra os personagens do arco e o controle de adicionar e remover. O
  **Salvar** do cabeçalho é comum às três abas e grava os dados e os personagens
  na mesma operação do RF015-RN007. Trocar de aba não descarta as edições
  pendentes e nada é gravado antes do **Salvar**.
- **RF015-RN015** - Legendas de Evento e Tipo de Evento: as duas ajudas seguem o
  padrão do **?** do **Tipo** (botão ao lado do rótulo, popup por hover e foco,
  uma explicação por linha) e são apenas visuais; não mudam a lista fechada nem o
  mapa Evento → Tipo de Evento do RF015-RN005. A ajuda do **Evento** explica:
  “**Ponto de Ligação:** indica um acontecimento positivo (Ascensão), ou
  negativo (Declínio), que vai levar até o Ponto de Virada.”; “**Ponto de
  Virada:** **Apogeu:** um evento que transforma positivamente o personagem. Ex.:
  libertou um ente querido, venceu uma batalha, criou algo extraordinário.
  **Queda:** um evento negativo que arrasa o personagem. Ex.: perdeu um ente
  querido, foi mortalmente ferido, uma traição, perda brutal de poder.”. A ajuda
  do **Tipo de Evento** explica **Ascensão** e **Declínio** como o acontecimento
  positivo e o negativo do **Ponto de Ligação**, e **Apogeu** e **Queda** com os
  exemplos do **Ponto de Virada**; **Neutro** não altera o arco.
- **RF015-RN016** - Papel ao lado do nome: na aba **Personagens do Capítulo**,
  cada personagem aparece como **Nome - Papel**, usando o **Papel** do vínculo
  livro–personagem do RF014. O papel é somente leitura no capítulo e acompanha o
  vínculo: sem papel definido, mostra **Não definido**. O capítulo não grava uma
  cópia do papel; a exibição lê o elenco do livro.
- **RF015-RN017** - Miniatura do personagem: antes do nome, a aba **Personagens
  do Capítulo** mostra a miniatura do retrato global do personagem em um
  quadrado pequeno. Sem retrato, o quadrado fica vazio, mas mantém o mesmo
  tamanho para alinhar os nomes. A miniatura é somente leitura e não altera o
  retrato do cadastro global.
- **RF015-RN018** - Dados Complementares: a aba guarda os mesmos campos já
  existentes no capítulo, sem coluna nova; a separação é apenas de organização
  visual. O **Salvar** grava a aba ativa e as demais na mesma operação, e
  **Salvar** e reabrir preserva o conteúdo dos cinco campos.

#### Critérios de Aceite

- **RF015-CA001** - Seção real: **Capítulos** abre o quadro com os quatro status,
  não a tela informativa.
- **RF015-CA002** - Quadro: as quatro colunas têm tamanho fixo, contador, corpo
  com rolagem e rodapé **Adicionar Capítulo**; sem capítulos, mostram o estado
  vazio.
- **RF015-CA003** - Ordenação: cada coluna ordena por **Número** ou **Data de
  Criação**, em ordem ascendente ou descendente, sem afetar as demais.
- **RF015-CA004** - Novo Capítulo: o botão do cabeçalho cria no **Esboço** e abre
  o painel de edição.
- **RF015-CA005** - Adicionar Capítulo: o rodapé de cada coluna cria no status
  daquela coluna.
- **RF015-CA006** - Painel: clicar em um card abre o painel abaixo, com os campos
  do requisito e **Salvar** no canto superior direito do cabeçalho.
- **RF015-CA007** - Tipo: o campo tem a lista fechada e o **?** com a explicação
  de Ação/Suspensão/Direto/Indireto.
- **RF015-CA008** - Personagens do capítulo: é possível adicionar personagens do
  elenco, escolher Evento e o Tipo de Evento correspondente, preencher o
  **Motivo do Evento** e remover um personagem do capítulo.
- **RF015-CA009** - Gravação: preencher os campos e **Salvar** grava tudo,
  mantém o capítulo no status escolhido e a reabertura mostra os valores.
- **RF015-CA010** - Arrastar: mover um card entre colunas grava o novo status e,
  se o capítulo estiver aberto, atualiza o campo **Status**.
- **RF015-CA011** - Migração v14: um banco v13 migra aditivamente para a v14 sem
  perder livros, personagens, vínculos ou capítulos anteriores; o esquema recusa
  status, tipo, evento, número duplicado e par evento/tipo inválidos.
- **RF015-CA012** - Métricas: **Capítulos planejados** reflete os capítulos
  reais em Meus Livros e no Painel do Livro.
- **RF015-CA013** - Ficha global: o total de capítulos em que o personagem
  aparece reflete os capítulos criados.
- **RF015-CA014** - Sem remoção: não existe botão, ícone ou ação para excluir
  capítulo.
- **RF015-CA015** - Sem dados fictícios: o quadro começa vazio e não usa os
  capítulos do protótipo.
- **RF015-CA016** - Sem regressão: os fluxos dos requisitos anteriores continuam
  funcionando.
- **RF015-CA017** - Testes automatizados: a verificação cobre o quadro, os quatro
  status, a ordenação, a criação pelos dois caminhos, o painel, os campos, o
  tipo e a ajuda, os personagens com evento, papel, retrato e quadrado vazio, a
  gravação, o arrastar, as métricas e a migração v14.
- **RF015-CA018** - Ajustes do painel: o **K.O** fica ao lado do **Punch**, com
  a mesma altura dele; a ajuda do **Tipo** apresenta Ação, Suspensão, Direto e
  Indireto em linhas separadas; o **Cenário Descritivo** usa duas linhas; e cada
  personagem do capítulo tem o campo **Motivo do Evento** abaixo do Evento/Tipo
  de Evento, gravado e relido com o capítulo. A migração v15 preserva os
  vínculos existentes com o motivo vazio.
- **RF015-CA019** - Motivo do Tipo: o campo **Motivo do Tipo** aparece logo
  abaixo do Tipo, como texto de duas linhas, é gravado e relido com o capítulo; a
  migração v16 preserva os capítulos existentes com o motivo vazio.
- **RF015-CA020** - Abas do painel: ao abrir um capítulo, o painel mostra três
  abas — **Dados do Capítulo**, com os campos do **Número** até o **Resumo**;
  **Dados Complementares**, com Foreshadowing, Plot Twist, Cliffhanger, Punch e
  K.O; e **Personagens do Capítulo**, com os personagens do arco. O **Salvar**
  permanece no cabeçalho nas três abas, e trocar de aba preserva as edições
  pendentes.
- **RF015-CA021** - Campos de duas linhas: **Motivo do Tipo**, **Meta** e
  **Cenário Descritivo** usam textarea de duas linhas, menor que o texto médio
  anterior, sem cortar o conteúdo digitado; **Salvar** e reabrir preservam o
  texto.
- **RF015-CA022** - Ajudas de Evento e Tipo de Evento: os dois campos têm o
  **?** ao lado do rótulo; a ajuda do **Evento** explica **Ponto de Ligação** e
  **Ponto de Virada**, e a do **Tipo de Evento** explica **Ascensão**,
  **Declínio**, **Apogeu** e **Queda**, com os exemplos do requisito, nos três
  temas; nenhuma das duas altera as opções gravadas.
- **RF015-CA023** - Papel ao lado do nome: na aba **Personagens do Capítulo**,
  cada personagem aparece como **Nome - Papel**, com o **Papel** do vínculo no
  livro (por exemplo, **Ariadne Calan - Falso Antagonista**); sem papel
  definido, mostra **Não definido**, e editar ou gravar o capítulo não altera o
  vínculo do RF014.
- **RF015-CA024** - Miniatura do personagem: cada personagem tem uma miniatura
  quadrada do retrato antes do nome; quando não há retrato, o espaço é ocupado
  por um quadrado vazio do mesmo tamanho, sem iniciais nem deslocamento dos
  nomes; a imagem carrega pelo protocolo de assets e o cadastro global não é
  alterado.
- **RF015-CA025** - Dados Complementares: a aba mostra Foreshadowing, Plot
  Twist, Cliffhanger, Punch e K.O, com o K.O ao lado do Punch e a mesma altura;
  os cinco campos não aparecem em **Dados do Capítulo**, e **Salvar** e reabrir
  preserva o conteúdo digitado.
- **RF015-CA026** - Testes da nova aba: a verificação cobre as três abas, a
  troca sem perder edição pendente, os campos complementares na aba certa e a
  gravação/reabertura dos cinco campos.

### RF016 - Livros - Gráficos

Este requisito abre a seção **Gráficos** do livro. Ela lê os capítulos e os
eventos de arco dos personagens já cadastrados e apresenta duas visualizações:
a **Curva de Progressão por Capítulo** e a **Evolução de Personagem**. Não há
cadastro novo, nem migração: os gráficos são somente leitura sobre o RF015 e o
RF014.

A tela usa um **Tab Panel** com duas abas. A primeira mostra a curva de
progressão do livro inteiro; a segunda mostra um gráfico por personagem,
empilhados na vertical. As cores das bolinhas são semânticas — azul para
ascensão e apogeu, vermelho para declínio e queda — e acompanham o tema ativo
no restante do desenho.

- **Data de criacao:** 28/10/2026

#### Telas

- **RF016-TL001** - Seção Gráficos: o item **Gráficos** do menu do livro abre a
  tela real com o Tab Panel de duas abas, não a tela informativa de requisito
  posterior. O cabeçalho mostra o título **Gráficos** e a quantidade de
  capítulos usados no eixo.
- **RF016-TL002** - Aba **Curva de Progressão por Capítulo**: gráfico de linha
  com os capítulos no eixo X, ordenados por **Número**, e o progresso no eixo Y.
  A linha sobe um nível a cada capítulo de **Ação** e permanece horizontal nos
  capítulos de **Suspensão** e de tipo **Não definido**. Ao passar o mouse sobre
  um ponto, um tooltip mostra o número do capítulo e o **Tipo** (Ação, Suspensão
  ou Não definido). A aba traz a legenda
  “Ação sobe · Suspensão mantém · Não definido segue reto”.
- **RF016-TL003** - Aba **Evolução de Personagem**: um gráfico por personagem,
  empilhados um embaixo do outro. Cada gráfico tem o nome do personagem, o eixo
  X com os capítulos e o eixo Y com o valor acumulado do arco. Os marcadores
  seguem o Evento: **Ascensão** é uma bolinha azul pequena, **Declínio** uma
  bolinha vermelha pequena, **Apogeu** uma bolinha azul maior e **Queda** uma
  bolinha vermelha maior; **Neutro** não desenha marcador.
- **RF016-TL004** - Tab Panel: as duas abas ficam no topo, a primeira abre
  selecionada e a troca de aba não recarrega a página nem perde o estado do
  livro. O componente de abas do livro é reutilizado, com `role="tablist"` e
  navegação por teclado.
- **RF016-TL005** - Estados vazios: em livro não salvo, a seção orienta a salvar
  o livro; sem capítulos, as duas abas mostram a mensagem de quadro vazio; sem
  personagens com evento, a segunda aba explica que ainda não há arco para
  desenhar.
- **RF016-TL006** - Curva no Painel do Livro: logo abaixo de **Módulos deste
  Livro**, o Painel exibe o painel **Curva de Progressão por Capítulo**, com o
  mesmo gráfico, os badges de ações/progresso e a legenda da seção Gráficos. O
  painel permanece visível sem dados e informa **Ainda não existem dados**,
  orientando a criar capítulos.

#### Fluxos

- **RF016-FL001** - Abrir os gráficos: o escritor clica em **Gráficos** no menu
  do livro e a aba **Curva de Progressão por Capítulo** abre selecionada.
- **RF016-FL002** - Alternar as abas: o escritor clica em **Evolução de
  Personagem** e vê os gráficos de todos os personagens que atuam em algum
  capítulo; voltar para a primeira aba mantém os dados já carregados.
- **RF016-FL003** - Ler o arco: em cada gráfico de personagem, o escritor
  acompanha a subida ou descida da linha e identifica os pontos de ligação
  (bolinhas pequenas) e os pontos de virada (bolinhas maiores), com o eixo X
  indicando em que capítulo cada evento aconteceu.

#### Regras de Negocio

- **RF016-RN001** - Fonte somente leitura: os dois gráficos usam os capítulos do
  livro (`capitulo`), os personagens do capítulo (`capitulo_personagem`), o
  papel no elenco (`livro_personagem`) e o nome global
  (`personagem_global`). Nenhum dado é gravado, alterado ou apagado.
- **RF016-RN002** - Capítulos do eixo: entram **todos** os capítulos do livro,
  independentemente do status — Esboço, Rascunho, Revisão ou Finalizado —,
  ordenados por **Número**. Sem capítulos, não há eixo nem linha.
- **RF016-RN003** - Curva de Progressão: o valor começa em **0** e é acumulado
  capítulo a capítulo. **Ação Direta** e **Ação Indireta** somam **+1**;
  **Suspensão Direta**, **Suspensão Indireta** e **Não definido** somam **0**.
  A linha sobe na diagonal quando soma +1 e fica horizontal quando soma 0.
- **RF016-RN004** - Evolução de Personagem: para cada personagem, o valor começa
  em **0** e é acumulado na ordem dos capítulos em que ele aparece. **Neutro**
  soma **0** e não desenha marcador; **Ascensão** soma **+1** e desenha bolinha
  azul pequena; **Declínio** soma **-1** e desenha bolinha vermelha pequena;
  **Apogeu** soma **+2** e desenha bolinha azul maior; **Queda** soma **-2** e
  desenha bolinha vermelha maior.
- **RF016-RN005** - Ausência do personagem: o eixo X continua com todos os
  capítulos do livro, mas a linha do personagem é interrompida nos capítulos em
  que ele não aparece; ao reaparecer, começa um novo segmento a partir do valor
  acumulado anterior.
- **RF016-RN006** - Ordem dos gráficos: personagens com papel **Protagonista**
  aparecem primeiro. Se não houver protagonista definido, vale a ordem de
  primeira aparição nos capítulos e, no empate, a ordem alfabética do nome.
  Personagens sem nenhuma aparição em capítulo não geram gráfico.
- **RF016-RN007** - Cores e marcadores: azul para Ascensão e Apogeu, vermelho
  para Declínio e Queda. Os pontos de virada (Apogeu e Queda) usam marcador
  maior que os pontos de ligação (Ascensão e Declínio). As cores acompanham o
  tema ativo, sem valores fixos do protótipo.
- **RF016-RN008** - Leitura no back-end: um comando somente leitura
  `dados_graficos_livro` devolve os capítulos e as séries já calculadas; o
  front-end só desenha. Não há migração e o esquema continua na **v16**.
- **RF016-RN009** - Sem dados fictícios: livro sem capítulos, capítulo sem
  personagens ou personagem sem evento não inventam pontos, linhas ou
  marcadores.
- **RF016-RN010** - Sem regressão: página do livro, menu, Painel do Livro,
  Dados do Livro, abas, Personagens, Capítulos, Worldbuilding, temas, splash,
  biblioteca de personagens, mundos, entradas, facções e exportações continuam
  funcionando.
- **RF016-RN011** - Gráfico no Painel do Livro: o painel usa a mesma leitura
  somente leitura e o mesmo componente da seção Gráficos, sem duplicar dados.
  Sem capítulos, mantém o cabeçalho e o rodapé e mostra o estado vazio; com
  capítulos, desenha a curva completa e os badges refletem os dados reais.

#### Critérios de Aceite

- **RF016-CA001** - Seção real: **Gráficos** abre o Tab Panel com as abas
  **Curva de Progressão por Capítulo** e **Evolução de Personagem**, não a tela
  informativa.
- **RF016-CA002** - Eixos: a primeira aba mostra os capítulos no eixo X,
  ordenados por Número, e o progresso no eixo Y, com legendas legíveis.
- **RF016-CA003** - Progressão: um capítulo de Ação sobe um nível; um de
  Suspensão mantém a linha horizontal; um de tipo Não definido também mantém a
  linha horizontal.
- **RF016-CA004** - Empilhamento: a segunda aba mostra um gráfico por personagem,
  um embaixo do outro, com nome e eixo X de capítulos.
- **RF016-CA005** - Marcadores: Ascensão é bolinha azul pequena, Declínio
  vermelha pequena, Apogeu azul maior e Queda vermelha maior; Neutro não desenha
  marcador.
- **RF016-CA006** - Ausência: a linha do personagem é interrompida nos capítulos
  em que ele não aparece e recomeça quando ele volta.
- **RF016-CA007** - Protagonista primeiro: o gráfico do protagonista aparece no
  topo; sem protagonista, vale a primeira aparição e, no empate, a ordem
  alfabética.
- **RF016-CA008** - Todos os status: capítulos em Esboço, Rascunho, Revisão e
  Finalizado entram nos gráficos na ordem do Número.
- **RF016-CA009** - Estados vazios: livro não salvo, livro sem capítulos e livro
  sem personagens com evento mostram mensagens claras, sem gráfico quebrado.
- **RF016-CA010** - Tema: as cores do desenho, dos eixos e dos marcadores
  acompanham o tema ativo; azul e vermelho continuam distinguindo ascensão e
  declínio.
- **RF016-CA011** - Somente leitura: abrir e alternar as abas não grava nada no
  banco e nenhuma migração é criada.
- **RF016-CA012** - Testes automatizados: a verificação cobre a seção real, as
  duas abas, os eixos, a progressão, os marcadores, a ausência, a ordem dos
  personagens, os estados vazios, a curva no Painel do Livro e a leitura pelo
  comando.
- **RF016-CA013** - Sem dados fictícios: sem capítulos ou sem eventos, os
  gráficos ficam vazios e não usam as curvas do protótipo.
- **RF016-CA014** - Sem regressão: os fluxos dos requisitos anteriores continuam
  funcionando.
- **RF016-CA015** - Tooltip da progressão: ao passar o mouse sobre um ponto da
  Curva de Progressão, o tooltip identifica o capítulo e o Tipo (Ação, Suspensão
  ou Não definido).
- **RF016-CA016** - Curva no Painel do Livro: o Painel exibe o painel da Curva
  de Progressão abaixo dos módulos; com capítulos, o gráfico e os badges
  refletem os dados reais; sem capítulos, o painel permanece e informa que ainda
  não existem dados.

### RF017 - Livros - Mundos associados e Worldbuilding do livro

Este requisito abre a seção **Worldbuilding** do livro, que o RF011 deixava como
tela informativa. O livro passa a ter **um ou mais mundos globais associados**;
cada mundo vira uma **aba** na seção, com o resumo do mundo e as suas categorias
de entradas. As entradas continuam pertencendo ao mundo (RF008) e podem ser
criadas pela aba do livro, sem duplicar o cadastro global.

A associação é **N:N**: um livro pode se passar em vários mundos e um mundo pode
servir a vários livros. **Este requisito revoga a regra "um livro tem 1 e somente
1 mundo associado"** registrada no protótipo e no RF007; o vínculo deixa de ser
1:1 do lado do livro e passa a ser uma lista ordenada.

A seção **Dados do Livro** e as suas seis abas não mudam: a associação e a
navegação pelos mundos vivem na seção **Worldbuilding** do livro.

- **Data de criacao:** 17/11/2026

#### Telas

- **RF017-TL001** - Seção Worldbuilding do livro: o item **Worldbuilding** do
  menu do livro abre um **Tab Panel** com uma aba por mundo associado, na ordem
  de associação, com a **primeira aba ativa** ao entrar. O cabeçalho da seção
  tem o título **Worldbuilding**, a contagem de mundos e o botão **Associar
  mundos**. Em livro não salvo, a seção orienta a salvar o livro e o botão fica
  desabilitado. Sem nenhum mundo associado, o Tab Panel dá lugar a um estado
  vazio com o botão **Associar mundos**.
- **RF017-TL002** - Aba do mundo: o rótulo da aba é o **Nome** do mundo. O corpo
  mostra o resumo do mundo em modo **somente leitura** — imagem (ou espaço
  reservado), **Nome**, **Tipo de Mundo**, **Nível Tecnológico** (com o rótulo
  por extenso), **Gêneros** e **Descrição** — e, abaixo, as seis categorias de
  entradas do mundo em tabela paginada: **Localidades**, **Raças e Povos**,
  **Artefatos**, **Armas**, **Eventos** e **Sistemas**. Cada categoria mostra o
  contador real e o botão **Nova entrada**. A aba tem ainda as ações **Abrir
  mundo** (abre o mundo no nível raiz) e **Remover mundo**.
- **RF017-TL003** - Associar mundos: a modal de seleção lista os mundos globais
  em **grade paginada** (12 por página), com **busca por nome** e seleção
  múltipla mantida entre páginas e buscas. Os mundos já associados aparecem com
  o selo **Já associado** e não podem ser marcados. O rodapé mostra a quantidade
  marcada e os botões **Cancelar** e **Associar**. Sem mundos cadastrados, a
  modal informa que não há mundos e orienta a criar um no nível raiz.
- **RF017-TL004** - Remover mundo: a ação **Remover mundo** atua sobre o mundo da
  aba ativa e pede confirmação informando o Nome do mundo e quantos capítulos
  usam localidades dele. Confirmar remove só a associação e limpa esses
  cenários; cancelar não altera nada.
- **RF017-TL005** - Nova entrada pelo livro: o botão **Nova entrada** da
  categoria abre a mesma modal de entrada do mundo (RF008), gravando no mundo da
  aba ativa. Ao salvar, a tabela da categoria recarrega. Editar e excluir
  entradas continuam exclusivos do nível raiz.
- **RF017-TL006** - Menu lateral e Painel do Livro: o item **Worldbuilding** do
  menu lateral mostra o subtítulo **Entradas de \<mundo\>** quando há um mundo e
  **N mundos** quando há vários. O módulo **Worldbuilding** do Painel do Livro
  mostra a quantidade de mundos associados e o total de entradas, e a métrica
  **Entradas de worldbuilding** deixa de ser fixa em 0.
- **RF017-TL007** - Meus Livros: o card e a linha do livro mostram os mundos
  associados — o Nome quando há um, a lista de nomes quando há vários e **Sem
  mundo** quando não há.
- **RF017-TL008** - Mundo no nível raiz: o painel **Vínculos com livros** da tela
  de detalhe do mundo deixa de ser vazio e passa a mostrar a contagem real de
  livros, com um atalho para a nova aba **Livros**; sem vínculos, o painel
  continua retraído com o estado vazio. A lista completa fica na aba **Livros**
  (RF017-TL010).
- **RF017-TL009** - Cenário Worldbuilding do capítulo: o campo **Cenário
  Worldbuilding** do painel do capítulo lista as **Localidades** de todos os
  mundos associados ao livro, agrupadas por mundo, e permite adicionar **um ou
  mais** cenários, com a lista dos selecionados e o botão **Remover** em cada
  um. Sem mundo associado, o campo permanece desabilitado com o aviso
  **Nenhum mundo associado a este livro**.
- **RF017-TL010** - Aba Livros do mundo: a tela de detalhe do mundo ganha a aba
  **Livros**, depois das entradas e de **Facções**, com o contador de livros e a
  lista dos livros que usam aquele mundo; o **Título** é clicável e abre a
  página do livro. Sem vínculos, a aba mostra o estado vazio; em mundo não
  salvo, orienta a salvar.
- **RF017-TL011** - Listagem de Mundos: os cards e as linhas da tela principal de
  Mundos mostram os livros associados — a quantidade e os títulos — ou
  **Nenhum livro** quando o mundo não é usado por nenhum livro. O RF007-TL001
  fixava **0 livros** porque a associação não existia; este requisito passa a
  exibir o valor real.

#### Fluxos

- **RF017-FL001** - Associar mundos: com o livro salvo, o escritor clica em
  **Associar mundos**, busca e marca um ou mais mundos na modal e confirma. As
  abas aparecem na ordem em que os mundos foram associados e a primeira fica
  ativa.
- **RF017-FL002** - Associar pelo estado vazio: na seção sem mundos, o escritor
  clica em **Associar mundos**, marca um mundo e confirma; a seção passa a
  exibir a aba daquele mundo com o resumo e as categorias.
- **RF017-FL003** - Remover mundo: na aba do mundo, o escritor clica em **Remover
  mundo**, confirma a remoção e vê a aba desaparecer; se era a última, a seção
  volta ao estado vazio. Os capítulos que usavam localidades daquele mundo
  passam a ficar sem cenário e a tela informa quantos foram afetados.
- **RF017-FL004** - Abrir mundo: na aba do mundo, o escritor clica em **Abrir
  mundo** e o aplicativo abre a tela de detalhe daquele mundo no nível raiz,
  saindo do livro.
- **RF017-FL005** - Criar entrada pela aba: na categoria escolhida, o escritor
  clica em **Nova entrada**, preenche a modal, salva e vê a entrada na tabela
  daquele mundo; a mesma entrada aparece no nível raiz.
- **RF017-FL006** - Alternar abas: o escritor troca de aba entre os mundos
  associados sem perder a categoria selecionada nem a página da tabela; a troca
  não grava nada.
- **RF017-FL007** - Editar capítulo com cenário: no painel do capítulo, o
  escritor adiciona uma ou mais localidades de qualquer mundo associado, salva e
  reabre o capítulo com a mesma lista de cenários gravada, na ordem de inclusão.

#### Regras de Negócio

- **RF017-RN001** - Associação N:N: um livro tem **um ou mais** mundos
  associados e um mundo pode servir a vários livros. Este requisito revoga a
  regra de mundo único do RF007 e do protótipo.
- **RF017-RN002** - Ordem de associação: a ordem das abas é a ordem em que os
  mundos foram associados; novos mundos entram no fim. A aba ativa inicial é
  sempre a primeira.
- **RF017-RN003** - Livro salvo: só é possível associar ou remover mundos em um
  livro já gravado. Em livro não salvo, o botão fica desabilitado e o back-end
  recusa a operação com o código de livro não salvo.
- **RF017-RN004** - Duplicidade recusada: uma associação já existente não é
  criada de novo; a chave composta do banco e o domínio impedem o par repetido,
  e a modal mostra **Já associado** para esses mundos.
- **RF017-RN005** - Mundo intacto: associar, remover ou abrir um mundo não
  altera o mundo, as suas entradas, a sua imagem nem os demais livros que o
  usam.
- **RF017-RN006** - Remoção limpa cenários: ao remover a associação, na mesma
  transação, os capítulos daquele livro cujas localidades pertencem ao mundo
  removido ficam com o cenário vazio. A remoção é recusada com mundo ou livro
  inexistente, e o retorno informa quantos capítulos foram limpos.
- **RF017-RN007** - Cenário validado: cada cenário do capítulo só aceita
  localidade de um mundo associado ao livro; localidade de outro mundo é
  recusada pelo domínio, não só pela interface, sem gravar a lista parcial.
- **RF017-RN008** - Entradas pertencem ao mundo: criar uma entrada pela aba do
  livro grava no mundo, como no RF008. O livro não tem cópia das entradas, e
  editar ou excluir continua sendo operação do nível raiz.
- **RF017-RN009** - Resumo somente leitura: a aba do mundo exibe os dados do
  mundo para consulta; os campos não são editáveis dentro do livro e a alteração
  continua na tela de detalhe do mundo.
- **RF017-RN010** - Métricas: **Entradas de worldbuilding** conta as entradas de
  todas as categorias dos mundos associados aos livros; um livro com dois mundos
  soma as entradas dos dois. O módulo **Worldbuilding** do Painel e o card de
  Meus Livros refletem a quantidade real de mundos. Personagens e capítulos
  continuam com as contagens do RF014/RF015, e livro sem mundo conta 0.
- **RF017-RN011** - Persistência: a migração **v17** aditiva cria a tabela
  `livro_mundo`, com chave composta, ordem, chaves estrangeiras para `livro` e
  `mundo_global` e índice por mundo. Nenhuma migração publicada é editada e as
  tabelas existentes não são recriadas.
- **RF017-RN012** - Sem dados fictícios: livro sem mundos mostra o estado vazio,
  categoria sem entradas mostra a tabela vazia e nenhuma tela inventa mundos,
  entradas ou contagens.
- **RF017-RN013** - Sem regressão: Meus Livros, página do livro, menu, Painel,
  Dados do Livro e as seis abas, Personagens, Capítulos, Gráficos, temas,
  splash, biblioteca de personagens, mundos, entradas, facções e exportações
  continuam funcionando.
- **RF017-RN014** - Escopo da exportação: a exportação do livro continua em
  requisito posterior; este requisito não cria nem altera os PDFs da ficha do
  personagem e do mundo.
- **RF017-RN015** - Múltiplos cenários: um capítulo pode ter **vários** cenários,
  sem repetição da mesma localidade, gravados na ordem de inclusão. A migração
  **v24** cria `capitulo_cenario` (`capitulo_id`, `localidade_id`, `ordem`), com
  chave composta, FKs e índice, e copia para ela o cenário único anterior. A
  coluna `capitulo.cenario_localidade_id` permanece no esquema, mas deixa de ser
  a fonte da verdade. Remover um mundo limpa todos os cenários daquele mundo e
  mantém os dos demais mundos no mesmo capítulo.

#### Critérios de Aceite

- **RF017-CA001** - Seção real: **Worldbuilding** abre a seção com o Tab Panel
  dos mundos associados, não a tela informativa.
- **RF017-CA002** - Abas na ordem de associação: os mundos aparecem na ordem em
  que foram associados, com a primeira aba ativa, e o rótulo é o Nome do mundo.
- **RF017-CA003** - Associar vários: a modal permite marcar mais de um mundo e,
  ao confirmar, todas as associações são criadas e as abas correspondentes
  aparecem.
- **RF017-CA004** - Já associado: os mundos já associados aparecem com o selo
  **Já associado**, não podem ser marcados e não geram associação duplicada.
- **RF017-CA005** - Busca e paginação: a modal filtra pelo nome, pagina de 12 em
  12 e mantém a seleção ao trocar de página ou de busca.
- **RF017-CA006** - Estado vazio: livro sem mundos mostra o estado vazio com
  **Associar mundos**; livro não salvo mantém o botão desabilitado e a
  orientação de salvar.
- **RF017-CA007** - Aba do mundo: a aba exibe imagem, Nome, Tipo, Nível
  Tecnológico, Gêneros e Descrição em modo somente leitura, sem campos de
  edição.
- **RF017-CA008** - Categorias e contadores: as seis categorias aparecem na aba
  com a contagem real de entradas de cada uma e a tabela paginada.
- **RF017-CA009** - Nova entrada: criar uma entrada pela aba grava no mundo, a
  tabela recarrega e a entrada aparece também no nível raiz.
- **RF017-CA010** - Remover mundo: confirmar a remoção tira a aba, mantém as
  demais e, se era a última, volta ao estado vazio; cancelar não altera nada.
- **RF017-CA011** - Cenários limpos: ao remover um mundo, todos os cenários do
  livro em localidades dele saem na mesma operação, os cenários dos outros
  mundos permanecem e a tela informa a quantidade de capítulos distintos
  afetados.
- **RF017-CA012** - Cenário agrupado: o campo **Cenário Worldbuilding** lista as
  localidades dos mundos associados agrupadas por mundo, permite adicionar e
  remover vários cenários e grava a lista escolhida; sem mundo, permanece
  desabilitado com o aviso.
- **RF017-CA013** - Cenário recusado: salvar um capítulo com localidade de mundo
  não associado ao livro é recusado pelo domínio.
- **RF017-CA014** - Vínculos do mundo: o painel **Vínculos com livros** mostra a
  contagem real e leva à aba **Livros**, que lista os livros que usam o mundo com
  o Título clicável; clicar no título abre a página do livro e o painel não
  duplica a lista.
- **RF017-CA015** - Métricas: **Entradas de worldbuilding** e o módulo do Painel
  refletem os mundos e as entradas reais; os cards de Meus Livros mostram os
  mundos associados ou **Sem mundo**.
- **RF017-CA016** - Menu lateral: com um mundo, o item mostra **Entradas de
  \<mundo\>**; com vários, **N mundos**.
- **RF017-CA017** - Abrir mundo: **Abrir mundo** abre a tela de detalhe daquele
  mundo no nível raiz, com os dados e as entradas intactos.
- **RF017-CA018** - Persistência: as associações, a ordem das abas e as entradas
  criadas permanecem após fechar e reabrir a aplicação.
- **RF017-CA019** - Testes automatizados: a verificação cobre a seção real, as
  abas, a associação múltipla, o selo **Já associado**, a busca e a paginação, o
  estado vazio, a aba somente leitura, a criação de entrada, a remoção com
  limpeza de cenários, o cenário agrupado, os vínculos do mundo, a aba **Livros**
  e as métricas.
- **RF017-CA020** - Migração v17: um banco v16 migra para a v17 sem perder
  livros, personagens, capítulos, mundos, entradas, facções ou vínculos.
- **RF017-CA021** - Sem regressão: os fluxos dos requisitos anteriores continuam
  funcionando.
- **RF017-CA022** - Listagem de Mundos: os cards mostram os livros associados com
  a quantidade e os títulos, e as linhas da lista têm a coluna **Livros**; mundo
  sem livro mostra **Nenhum livro**.
- **RF017-CA023** - Vários cenários: adicionar duas localidades, salvar e reabrir
  o capítulo mantém as duas na ordem de inclusão; remover uma grava a lista sem
  ela; a mesma localidade não entra duas vezes; a migração v24 preserva o
  cenário único dos capítulos existentes.

### RF018 - Worldbuilding - Localidades: imagem, tipo e hierarquia

Este requisito enriquece as **Localidades** do Mundo (RF008). Cada localidade
passa a ter **imagem**, **Tipo da Localidade** e uma **localidade pai**,
formando uma árvore de contenção com vários níveis e vários filhos por nó — por
exemplo, uma **Taverna** e uma **Loja** dentro de uma **Cidade**, um **Cômodo**
dentro de uma **Casa**, um **País** dentro de um **Território** e uma **Casa**
dentro de um **Bairro** dentro de uma **Cidade**.

As localidades continuam pertencendo ao Mundo (RF008): a hierarquia é interna ao
mundo e não cria entradas compartilhadas entre mundos. A contenção é **livre por
tipo**: qualquer localidade pode conter qualquer outra, desde que não se formem
ciclos.

- **Data de criacao:** 17/11/2026

#### Telas

- **RF018-TL001** - Aba Localidades em árvore: a categoria **Localidades** da
  tela de detalhe do Mundo deixa de usar a tabela paginada e passa a exibir uma
  **árvore expansível**. Cada nó mostra a **miniatura** da imagem (ou, sem
  imagem, o **ícone do Tipo da Localidade** no estilo do **Tipo do Mundo**, no
  mesmo quadradinho), o **Nome**, o **Tipo** e, quando houver, a seta de
  **expandir/recolher** com o contador de sublocalidades. O **mundo** aparece no
  topo como a localidade **raiz** do tipo **Mundo**, sem ação **Editar**; os
  filhos ficam indentados abaixo do pai e, em cada nível, a ordem é alfabética
  pelo Nome. A árvore abre **expandida**, mantém a raiz fixa no topo e pagina os
  filhos dela de **20 em 20** — sem cortar uma subárvore entre páginas —, e o
  botão **Nova Localidade** fica no cabeçalho da categoria.
- **RF018-TL002** - Modal de Localidade: a janela de inclusão/edição da
  localidade ganha, além de **Nome** (obrigatório), **Descrição** e **História**,
  os campos **Tipo da Localidade** (lista fechada, em ordem alfabética, com
  **Não definido** por padrão), **Imagem** (prévia e botão **Enviar
  imagem**/**Trocar imagem**) e
  **Fica dentro de** (lista das localidades do mesmo mundo, com o caminho de cada
  uma e a opção **Nenhuma (raiz)**). A própria localidade e os seus descendentes
  não aparecem na lista de pai.
- **RF018-TL003** - Miniatura: a imagem da localidade aparece em miniatura
  quadrada na árvore e em prévia na modal. Sem imagem, a árvore mostra o
  **ícone do Tipo da Localidade** no estilo do **Tipo do Mundo** dentro do mesmo
  quadrado; tipos sem glifo e **Não definido** mantêm o quadrado vazio, sem
  iniciais, para alinhar os nomes.
- **RF018-TL004** - Cenário Worldbuilding do capítulo: o campo continua listando
  as localidades dos mundos associados, agrupadas por mundo (RF017-TL009), e cada
  opção passa a mostrar o **caminho completo** da localidade (por exemplo,
  `Cidade › Bairro › Casa › Quarto`); o valor gravado continua sendo a
  localidade.
- **RF018-TL005** - Seção Worldbuilding do livro: a categoria **Localidades** da
  seção do livro (RF017) usa a mesma árvore, em modo de consulta — sem ação
  **Editar** —, com **Nova Localidade** gravando no mundo da aba ativa. As demais
  categorias continuam na tabela paginada.

#### Fluxos

- **RF018-FL001** - Criar localidade com tipo e pai: o escritor clica em **Nova
  Localidade**, informa o Nome, escolhe o Tipo, escolhe a localidade pai (a raiz
  do mundo já vem selecionada), envia uma imagem e salva; a localidade aparece na
  árvore no nível do pai escolhido.
- **RF018-FL002** - Editar e mover: ao editar uma localidade, o escritor troca o
  Tipo, o pai ou a imagem e salva; a árvore é reconstruída com a localidade (e os
  seus descendentes) no novo nível.
- **RF018-FL003** - Expandir e recolher: o escritor clica na seta de um nó com
  filhos e a subárvore é recolhida ou expandida, sem gravar nada e sem perder a
  posição dos demais nós.
- **RF018-FL004** - Enviar ou trocar a imagem: na modal, o escritor escolhe o
  arquivo no diálogo nativo; a imagem é copiada para o diretório de dados e passa
  a aparecer na prévia e na miniatura da árvore.
- **RF018-FL005** - Tentar criar um ciclo: ao escolher como pai uma localidade
  que já está dentro da localidade editada (ou ela mesma), a gravação é recusada
  com mensagem útil e a árvore não muda.
- **RF018-FL006** - Capítulo com localidade aninhada: no painel do capítulo, o
  escritor escolhe uma localidade pelo caminho exibido, salva e reabre o capítulo
  com o cenário gravado.

#### Regras de Negócio

- **RF018-RN001** - Imagem da localidade: JPG, PNG ou WEBP com até **4 MB**, uma
  por localidade, copiada para `<app_data_dir>/localidades/` com o caminho
  relativo gravado no banco. A imagem exige a localidade já salva e segue o mesmo
  fluxo e as mesmas mensagens da imagem do mundo.
- **RF018-RN002** - Tipo da Localidade: lista fechada de **49** valores, em
  **ordem alfabética** no seletor — **Arena**, **Armazém**, **Bairro**,
  **Bosque**, **Cantina**, **Capital**, **Casa**, **Castelo**, **Catacumba**,
  **Caverna**, **Cemitério**, **Cidade**, **Colina**, **Comércio**, **Cômodo**,
  **Edifício**, **Estádio**, **Estado**, **Floresta**, **Fortaleza**, **Forte**,
  **Igreja**, **Lago**, **Loja**, **Mar**, **Montanha**, **País**, **Palácio**,
  **Pântano**, **Planalto**, **Praça**, **Prisão**, **Quarto**, **Ravina**,
  **Região**, **Residência**, **Restaurante**, **Rio**, **Ruína**, **Sala**,
  **Salão**, **Serra**, **Taverna**, **Teatro**, **Templo**, **Território**,
  **Torre**, **Vila** e **Vilarejo** —, além do valor vazio **Não definido**
  (padrão, apresentado primeiro, gravado como texto, nunca `NULL`). O campo é
  opcional.
- **RF018-RN003** - Hierarquia livre: toda localidade tem um pai; a localidade
  **raiz** do tipo **Mundo** é o pai de todas as demais e não pode ser editada
  pela modal. O pai precisa pertencer ao **mesmo mundo** e não há restrição de
  tipo — qualquer localidade pode conter qualquer outra, com profundidade e
  quantidade de filhos livres.
- **RF018-RN004** - Sem ciclos: uma localidade não pode ser pai de si mesma nem
  de um dos seus descendentes; a validação é feita no domínio (subida pela cadeia
  de pais) e devolve erro próprio, não só desabilita a opção na interface.
- **RF018-RN005** - Árvore e contadores: a raiz é a localidade do tipo **Mundo**
  e seus filhos são o primeiro nível paginado; os filhos são ordenados
  alfabeticamente em cada nível (tratando acentos no Rust) e o contador de cada
  nó é o número real de filhos diretos.
- **RF018-RN006** - Persistência: a migração **v18** aditiva acrescenta `tipo`,
  `imagem` e `pai_id` (com chave estrangeira para `localidade`) e um índice por
  `pai_id`; a **v19** recria a tabela para ampliar o `CHECK` aos **49** tipos
  (o SQLite não altera `CHECK` in-place), copiando as linhas e preservando os
  ids. Nenhuma migração publicada é editada, as localidades existentes ganham
  **Não definido**, sem imagem e na raiz, e as migrações rodam com as chaves
  estrangeiras desligadas para a recriação não esbarrar na FK do capítulo. A
  **v22** recria `localidade` com o tipo interno **Mundo** e a coluna `raiz`,
  cria a raiz de cada mundo com o nome do mundo, reparenta as localidades sem pai
  para ela e mantém um índice único parcial de uma raiz por mundo. A **v23** é
  corretiva: recria `capitulo` para a FK `cenario_localidade_id` voltar a apontar
  para `localidade` em bancos que ficaram com `localidade_antiga`, preservando
  as linhas e os índices.
- **RF018-RN007** - Sem regressão das outras entradas: Raças e Povos, Artefatos,
  Armas, Eventos e Sistemas continuam com a tabela paginada, os campos atuais e a
  ação **Editar**.
- **RF018-RN008** - Sem exclusão: este requisito não cria exclusão de localidade
  nem de imagem; remover uma localidade com filhos continua fora de escopo.
- **RF018-RN009** - Sem dados fictícios: mundo sem localidades mostra a árvore
  vazia, localidade sem imagem mostra o quadrado vazio e nenhuma tela inventa nós,
  tipos ou imagens.
- **RF018-RN010** - Exportação do mundo: o PDF do mundo continua funcionando e
  passa a trazer o **Tipo** da localidade; a hierarquia não altera o documento
  nem cria seções novas.

#### Critérios de Aceite

- **RF018-CA001** - Árvore real: a aba **Localidades** exibe a árvore, não a
  tabela paginada, com **Nova Localidade** no cabeçalho.
- **RF018-CA002** - Hierarquia: uma localidade com pai aparece indentada abaixo
  dele; um nó com vários filhos mostra todos; netos aparecem no nível seguinte.
- **RF018-CA003** - Ordem: as raízes e os filhos de cada nível aparecem em ordem
  alfabética pelo Nome.
- **RF018-CA004** - Expandir e recolher: a seta recolhe e expande a subárvore
  sem gravar nada; a árvore abre expandida.
- **RF018-CA005** - Tipo: a modal apresenta exatamente os **49** tipos, em ordem
  alfabética, mais **Não definido** primeiro, começa em **Não definido** e grava
  o valor escolhido.
- **RF018-CA006** - Imagem: enviar JPG, PNG ou WEBP até 4 MB copia o arquivo,
  mostra a prévia e a miniatura; formato inválido ou acima de 4 MB é recusado com
  mensagem útil.
- **RF018-CA007** - Miniatura na árvore: localidade com imagem mostra a
  miniatura; sem imagem, um quadrado vazio do mesmo tamanho, sem iniciais.
- **RF018-CA008** - Pai: a modal lista as localidades do mesmo mundo com o
  caminho e a opção **Nenhuma (raiz)**, sem a própria localidade nem os seus
  descendentes.
- **RF018-CA009** - Ciclo recusado: escolher como pai a própria localidade ou um
  descendente é recusado pelo domínio, com erro próprio, e nada é gravado.
- **RF018-CA010** - Mover: trocar o pai de uma localidade com filhos move a
  subárvore inteira para o novo nível.
- **RF018-CA011** - Mundo diferente: o pai só pode ser uma localidade do mesmo
  mundo; o domínio recusa ids de outro mundo.
- **RF018-CA012** - Cenário do capítulo: as opções mostram o caminho completo da
  localidade e o valor gravado continua sendo a localidade; o capítulo reabre com
  o cenário selecionado.
- **RF018-CA013** - Seção Worldbuilding do livro: a categoria **Localidades**
  mostra a árvore sem ação **Editar**, e **Nova Localidade** grava no mundo da
  aba, aparecendo também no nível raiz.
- **RF018-CA014** - Outras categorias: Raças e Povos, Artefatos, Armas, Eventos e
  Sistemas continuam na tabela paginada com **Editar**.
- **RF018-CA015** - Migração v18: um banco v17 migra para a v18 sem perder
  mundos, entradas, facções, livros, personagens, capítulos ou associações; as
  localidades antigas ficam com **Não definido**, sem imagem e na raiz.
- **RF018-CA016** - Sem dados fictícios: mundo sem localidades mostra a árvore
  vazia e nenhuma imagem ou tipo é inventado.
- **RF018-CA017** - Testes automatizados: a verificação cobre a árvore, o tipo, a
  imagem, o pai, o ciclo, o mover, o caminho no capítulo e a seção do livro.
- **RF018-CA018** - Sem regressão: os fluxos dos requisitos anteriores continuam
  funcionando.
- **RF018-CA019** - Paginação da árvore: a raiz do mundo fica **fixa no topo** e
  a aba Localidades pagina **20 filhos por página**, com **Anterior**/**Próxima**
  e a página atual; os controles aparecem **mesmo quando há uma única página**
  (desabilitados), uma subárvore nunca é cortada entre páginas (os filhos
  aparecem sempre na mesma página do pai) e a paginação também vale na seção
  Worldbuilding do livro.
- **RF018-CA020** - Raiz do mundo: cada mundo tem uma localidade raiz do tipo
  **Mundo**, com o nome do mundo e sem **Editar**; a raiz aparece no topo da
  árvore, é o pai padrão das novas localidades e não aparece no cenário do
  capítulo, nos PDFs nem nos painéis de localidade dos mapas.

### RF019 - Worldbuilding - Mapas do Mundo

Este requisito cria os **Mapas** do Mundo: representações espaciais funcionais das
localidades, organizadas por **escala** — **Mundo**, **Região**, **Cidade**,
**Bairro** e **Prédio/Casa**. O escritor cria vários mapas, posiciona as
localidades existentes (ou cria novas no próprio mapa), desenha formas do
terreno/paredes e faz ligações entre localidades. O mapa é **funcional, não
estético**: nome, tipo, imagem e hierarquia continuam vindo do cadastro da
localidade (RF018); o mapa só acrescenta posição, forma e ligação.

Os mapas ficam na aba **Mapas** do detalhe do Mundo, aparecem em modo de leitura
na seção **Worldbuilding** do livro e entram no **Documento do Mundo** em PDF.

- **Data de criacao:** 18/11/2026

#### Telas

- **RF019-TL001** - Aba Mapas do Mundo: nova aba depois de **Localidades**, com
  a lista de mapas em cards — Nome, tipo (escala), âncora, quantidade de
  localidades e **Abrir** — e o botão **Novo mapa**. Vários mapas por escala.
  Sem mapas, mostra o estado vazio; em mundo não salvo, o botão fica desabilitado
  com orientação para salvar.
- **RF019-TL002** - Modal de mapa: **Nome** (obrigatório), **Tipo** (lista
  fechada: Mundo, Região, Cidade, Bairro, Prédio/Casa), **Âncora** (opcional,
  apenas localidades do mesmo mundo, com o caminho) e **Fundo** (lista fechada:
  Papel, Grade, Hex, Blueprint, Topográfico). A mesma modal edita os metadados de
  um mapa existente e oferece **Excluir mapa** com confirmação.
- **RF019-TL003** - Editor de mapa: a aba vira um editor em largura total, com
  **Voltar aos mapas**, o nome/tipo/âncora/fundo no cabeçalho, **Salvar** e o
  indicador de alterações pendentes. O layout tem a **toolbar**, o **canvas** e
  dois painéis: à esquerda, as localidades do mundo com busca; à direita, as
  propriedades do elemento selecionado.
- **RF019-TL004** - Toolbar: **Selecionar/Mover**, **Polígono**, **Ligação**,
  **Apagar**, **Desfazer**, **Refazer** e os controles de **zoom** (+ / − /
  ajustar). Em mapas de **Prédio/Casa**, **Polígono** e **Ligação** dão lugar
  a **Porta** (RF019-TL012). O canvas tem pan (arrastar o fundo) e zoom, com
  coordenadas lógicas de 1000 × 700.
- **RF019-TL005** - Canvas: renderiza o fundo do template, os polígonos com
  rótulo e cor, as ligações com rótulo e estilo e os marcadores das localidades
  com miniatura, ícone do tipo (ou quadrado vazio), nome e tipo. Em mapas de
  **Prédio/Casa**, cada localidade é desenhada como um **cômodo retangular**
  com o nome no centro e as portas nas paredes (RF019-TL012). O ícone segue o
  **Tipo da Localidade** e é desenhado no estilo do **Tipo do Mundo**.
  Selecionar um marcador destaca o nó e mostra as propriedades (**Abrir
  localidade** e **Remover do mapa**). Uma forma selecionada expõe as arestas
  com pontos no meio para redimensionamento e também pode ser movida pelo
  interior (RF019-TL013).
- **RF019-TL006** - Painel de localidades: lista pesquisável das localidades do
  mundo, arrastável para o canvas; as que já estão no mapa aparecem com o selo
  **No mapa** e clicar nelas seleciona o marcador. Localidades presas a outro
  mapa incompatível não aparecem na lista (RF019-RN024). O botão **Nova
  localidade** abre a modal do RF018 e coloca a nova localidade no centro da
  visão.
- **RF019-TL007** - Ligações: escolher **Ligação**, clicar na localidade de
  origem e na de destino; a ligação recebe **rótulo livre** e **estilo** (linha
  cheia, tracejada ou seta) no painel de propriedades.
- **RF019-TL008** - Livro: a seção **Worldbuilding** do livro ganha a aba
  **Mapas** depois de **Localidades**, com o seletor dos mapas do mundo da aba e
  a visualização **somente leitura** (pan/zoom leve, sem ferramentas). Sem mapas,
  mostra o estado vazio.
- **RF019-TL009** - PDF do Mundo: o **Documento do Mundo** ganha a seção
  **Mapas** ao final, com **todos os mapas que tiverem conteúdo** (localidade ou
  forma), na ordem de criação; mapas vazios são omitidos. Cada mapa entra com
  nome, tipo, âncora e o desenho, usando a paleta fixa de impressão.
- **RF019-TL010** - Plantas por escala: mapas de **Cidade** desenham uma planta
  com ruas, quarteirões vazios e praça central; **Bairro** desenha quadras
  maiores com lotes; **Prédio/Casa** usa uma **grade fixa**, sem planta baixa,
  para não competir com os cômodos e as portas. Nessas escalas o seletor de
  **Fundo** dá lugar ao fundo fixo, e o **Polígono** continua disponível em
  Cidade e Bairro para sombrear áreas.
- **RF019-TL011** - Tipos por escala: as cinco escalas filtram o painel de
  localidades e o seletor de **Nova localidade** pelos tipos previstos no
  RF019-RN019; marcadores já colocados com tipo fora da escala aparecem com
  aviso e impedem o **Salvar** até serem removidos. A localidade raiz do mundo
  não aparece no painel, porque representa o próprio mundo.
- **RF019-TL012** - Cômodos e portas em Prédio/Casa: ao arrastar uma localidade,
  o editor desenha um **quadrado** com o nome no centro; o cômodo pode ser
  **movido** e **redimensionado** pelas oito alças (cantos e lados), virando um
  retângulo. A toolbar troca **Polígono** e **Ligação** por **Porta**: com a
  ferramenta ativa, clicar perto de uma parede cria uma porta naquele lado; a
  porta selecionada mostra **Lado**, **Largura** e **Remover porta** no painel
  de propriedades e pode ser arrastada ao longo da parede.
- **RF019-TL013** - Edição de formas: com **Selecionar/Mover**, a forma
  selecionada expõe uma alça no meio de cada aresta, um **nó em cada vértice** e
  uma área de clique sobre a própria aresta. Arrastar a aresta move só os dois
  vértices dela na direção perpendicular; arrastar um nó move só aquele vértice;
  arrastar o interior move a forma inteira. As alterações ficam em memória até o
  **Salvar** e entram no histórico uma vez por arraste.

#### Fluxos

- **RF019-FL001** - Criar mapa: em mundo salvo, o escritor clica em **Novo mapa**,
  informa Nome, Tipo, Âncora (opcional) e Fundo e salva; o card aparece na lista.
- **RF019-FL002** - Abrir e salvar o mapa: ao abrir, o editor carrega metadados,
  posições, formas e ligações; o escritor altera e clica em **Salvar**. Sair sem
  salvar descarta as pendências.
- **RF019-FL003** - Colocar uma localidade: o escritor arrasta uma localidade
  disponível da lista para o canvas; ela passa a ter um marcador na posição solta
  e recebe o selo **No mapa**. Arrastar o marcador atualiza a posição. Uma
  localidade já usada em outro mapa incompatível não aparece para arrastar
  (RF019-RN024).
- **RF019-FL004** - Criar localidade pelo mapa: o escritor clica em **Nova
  localidade**, preenche a modal do RF018 e salva; a localidade é criada no mundo,
  entra no mapa no centro da visão e também aparece na aba Localidades. O pai
  sugerido é a âncora do mapa, editável na modal.
- **RF019-FL005** - Desenhar uma forma: com **Polígono**, o escritor clica nos
  vértices e fecha com duplo clique ou Enter (Esc cancela); a forma é criada com
  cor padrão e pode ser renomeada, recolorida, movida pelo interior,
  redimensionada pelas arestas, ajustada pelos nós dos vértices ou apagada.
- **RF019-FL006** - Criar uma ligação: com **Ligação**, o escritor clica na
  origem e no destino; se o par já existir, nada é criado; a ligação pode ser
  editada no painel de propriedades.
- **RF019-FL007** - Desfazer e refazer: as alterações do documento (posições,
  formas, ligações e metadados) entram no histórico em memória; desfazer e
  refazer percorrem o histórico até o último **Salvar** ou o limite.
- **RF019-FL008** - Remover do mapa: remover um marcador, uma forma ou uma
  ligação apaga só o elemento do mapa; a localidade, a imagem e a hierarquia
  continuam intactas.
- **RF019-FL009** - Excluir mapa: a modal de edição oferece **Excluir mapa**;
  confirmar remove o mapa e os seus elementos, sem tocar nas localidades.
- **RF019-FL010** - Ler os mapas no livro: na seção Worldbuilding, a aba **Mapas**
  permite escolher o mapa e navegar com pan/zoom, sem editar nada.
- **RF019-FL011** - Desenhar cômodos e portas: em um mapa **Prédio/Casa**, o
  escritor arrasta uma localidade, ajusta o retângulo pelas alças e o posiciona
  sobre a planta; escolhe **Porta** e clica numa parede para criar a passagem,
  podendo deslocá-la, mudar o lado e a largura. As portas acompanham o cômodo e
  saem com ele.

#### Regras de Negócio

- **RF019-RN001** - Mapa pertence ao Mundo: todo mapa tem um `mundo_id`; as
  localidades colocadas precisam ser do mesmo mundo. Não existem mapas globais.
- **RF019-RN002** - Escala do mapa: lista fechada **Mundo**, **Região**,
  **Cidade**, **Bairro** e **Prédio/Casa**. A escala organiza os mapas; **Mundo**
  e **Região** aceitam qualquer tipo de localidade, e **Cidade**, **Bairro** e
  **Prédio/Casa** restringem os tipos conforme o RF019-RN019.
- **RF019-RN003** - Âncora opcional: o mapa pode apontar para uma localidade do
  mesmo mundo; a âncora é o pai sugerido ao criar localidades pelo mapa e aparece
  no card e no PDF. O tipo da âncora não é validado contra a escala.
- **RF019-RN004** - Fundo: lista fechada **Papel**, **Grade**, **Hex**,
  **Blueprint** e **Topográfico**, desenhada com CSS/SVG (sem imagem externa).
- **RF019-RN005** - Uma localidade por mapa: a chave `(mapa_id,
  localidade_id)` impede o mesmo marcador duas vezes. A mesma localidade só pode
  estar em mapas diferentes quando **todos** são **Mundo** ou **Região**, com
  posições independentes; nos demais casos ela pertence a um único mapa
  (RF019-RN024).
- **RF019-RN006** - Coordenadas: as posições e os vértices usam um plano lógico
  de **1000 × 700**; valores fora do plano são recusados pelo domínio. O canvas
  escala com `viewBox`, sem perder posições.
- **RF019-RN007** - Formas: cada polígono tem pelo menos **3 vértices**, cor de
  uma lista fechada (**acento**, **âmbar**, **azul**, **verde**, **neutra**,
  **destaque**) e rótulo livre opcional. As cores são gravadas como chaves
  semânticas, não hexadecimal, para acompanhar o tema e a impressão. Mover,
  redimensionar pela aresta ou arrastar um nó altera os vértices gravados, e
  todos eles precisam continuar dentro do plano de 1000 × 700.
- **RF019-RN008** - Ligações: só entre localidades já colocadas no mapa, sem
  auto-ligação e sem par duplicado; rótulo livre e estilo fechado **linha**,
  **tracejada** ou **seta**.
- **RF019-RN009** - Salvar transacional: `salvar_mapa` grava metadados,
  posições, formas e ligações na mesma transação; uma falha não deixa o mapa
  pela metade. As listas filhas são regravadas a partir do documento enviado.
- **RF019-RN010** - Exclusão: excluir um mapa remove as posições, formas e
  ligações dele (cascata) e **nunca** as localidades, as imagens ou a hierarquia.
- **RF019-RN011** - Persistência: a migração **v20** aditiva cria `mapa`,
  `mapa_localidade`, `mapa_forma` e `mapa_ligacao`, com chaves estrangeiras,
  `CHECK`s das listas e cascata do mapa. Nenhuma migração publicada é editada.
  As migrações continuam rodando com as FKs desligadas (RF018).
- **RF019-RN012** - Editor: alterações ficam em memória até **Salvar**; sair
  sem salvar descarta. O histórico de desfazer/refazer é da sessão do editor.
- **RF019-RN013** - Livro somente leitura: a aba **Mapas** da seção Worldbuilding
  não cria, não edita e não posiciona; só exibe os mapas do mundo da aba.
- **RF019-RN014** - PDF: a seção **Mapas** usa a paleta fixa de impressão,
  ignora o template decorativo quando ele comprometer a leitura e omite mapas
  vazios. A ordem é a de criação.
- **RF019-RN015** - Sem dados fictícios: mundo sem mapas mostra o estado vazio,
  mapa sem conteúdo aparece vazio no editor e nenhuma tela inventa formas,
  marcadores ou ligações.
- **RF019-RN016** - Sem regressão: as abas e entradas do Mundo, as Localidades,
  o livro, o cenário do capítulo, os temas e os PDFs existentes continuam
  funcionando.
- **RF019-RN017** - Ícones do mapa: quando a localidade **não tem imagem**, o
  marcador usa um ícone do **Tipo da Localidade** (RF018). As famílias de
  assentamento, moradia, fortificação e templo têm quatro desenhos, escolhidos
  pelo **Tipo do Mundo** (**Medieval**, **Moderno**, **Futurista** e
  **Antigo**); as demais famílias usam um desenho único. A **imagem cadastrada
  tem prioridade** sobre o ícone. Tipos sem desenho e **Não definido** mantêm o
  quadrado vazio, sem inventar símbolo.
- **RF019-RN018** - Fundos por escala: **Cidade** e **Bairro** usam uma planta
  funcional desenhada em SVG no plano de 1000 × 700; **Prédio/Casa** usa uma
  **grade fixa**, sem a planta baixa, porque os cômodos e as portas são o
  próprio desenho do mapa (RF019-TL012). O campo **Fundo** deixa de aparecer
  nessas três escalas. O **Polígono** continua disponível para sombrear áreas
  em **Cidade** e **Bairro**; em **Prédio/Casa**, os cômodos e as portas
  substituem o **Polígono** e a **Ligação**. **Mundo** e **Região** mantêm os
  cinco fundos.
- **RF019-RN019** - Tipos por escala: **Mundo** aceita tipos macro/geográficos e
  assentamentos (Bosque, Capital, Caverna, Cidade, Colina, Estado, Floresta,
  Fortaleza, Lago, Mar, Montanha, País, Pântano, Planalto, Prisão, Ravina,
  Região, Rio, Serra, Território, Vila e Vilarejo); **Região** aceita todos os 49 tipos, exceto
  **Cômodo**, **Quarto**, **Sala** e **Salão**; **Cidade** aceita tipos urbanos
  (Arena, Armazém, Bairro, Cantina, Casa, Castelo, Cemitério, Comércio, Edifício,
  Estádio, Fortaleza, Forte, Igreja, Loja, Palácio, Praça, Prisão, Restaurante,
  Ruína, Taverna, Teatro, Templo e Torre); **Bairro** aceita Armazém, Cantina,
  Casa, Cemitério, Comércio, Edifício, Igreja, Loja, Palácio, Praça, Prisão,
  Restaurante, Taverna, Teatro, Templo e Torre; **Prédio/Casa** aceita apenas
  Cômodo, Quarto, Sala e Salão. O painel e o **Nova localidade** filtram pela
  lista, e o domínio recusa, no **Salvar**, qualquer marcador fora da escala —
  inclusive um tipo **Não definido**. A localidade raiz do tipo **Mundo** não
  entra nos mapas.
- **RF019-RN020** - Cômodo retangular: em **Prédio/Casa**, a localidade
  posicionada tem `largura` e `altura` próprias (padrão **120 × 120**, mínimo
  **40**), é movida pelo corpo e redimensionada pelas alças, e precisa ficar
  inteira dentro do plano de 1000 × 700. As demais escalas continuam com o
  marcador de tamanho fixo.
- **RF019-RN021** - Porta: pertence a um cômodo do mapa e a um lado fechado
  (**norte**, **sul**, **leste** ou **oeste**), com posição de **0 a 1** ao
  longo da parede e largura que caiba no lado. A porta acompanha mover e
  redimensionar o cômodo, sai junto com ele e só existe em mapas de
  **Prédio/Casa**; trocar o tipo do mapa remove as portas.
- **RF019-RN022** - Persistência v21: a migração **v21** aditiva acrescenta
  `largura` e `altura` em `mapa_localidade` com padrão 120 e cria `mapa_porta`
  (`mapa_id`, `localidade_id`, `lado` com `CHECK`, `posicao` de 0 a 1 e
  `largura`), com cascata do mapa e da localidade. Bancos v20 ganham o quadrado
  padrão sem perder posições.
- **RF019-RN023** - Sem regressão de ferramentas: **Polígono** e **Ligação**
  continuam disponíveis em **Mundo**, **Região**, **Cidade** e **Bairro**. Em
  **Prédio/Casa**, polígonos e ligações já existentes continuam visíveis e
  apagáveis, mas não podem ser criados.
- **RF019-RN024** - Exclusividade da localidade: uma localidade só pode estar em
  vários mapas quando **todos** são **Mundo** ou **Região**. Se ela já está em
  **Cidade**, **Bairro** ou **Prédio/Casa**, não fica disponível para nenhum
  outro mapa. O editor remove as bloqueadas da lista e o domínio recusa a nova
  inclusão com `LocalidadeEmOutroMapa`. Localidades que já estavam no mapa
  continuam editáveis, mesmo que sejam duplicatas legadas.

#### Critérios de Aceite

- **RF019-CA001** - Aba real: **Mapas** abre a lista de mapas, não uma tela
  informativa, com **Novo mapa** e estado vazio.
- **RF019-CA002** - Criar mapa: Nome, Tipo, Âncora e Fundo são gravados e o card
  aparece com tipo, âncora e contagem.
- **RF019-CA003** - Escalas: a modal oferece exatamente **Mundo**, **Região**,
  **Cidade**, **Bairro** e **Prédio/Casa**.
- **RF019-CA004** - Âncora: a lista mostra as localidades do mesmo mundo pelo
  caminho; uma âncora de outro mundo é recusada.
- **RF019-CA005** - Editor abre: metadados, posições, formas e ligações são
  carregados e o mapa anterior é restaurado ao reabrir.
- **RF019-CA006** - Arrastar: soltar uma localidade no canvas cria o marcador na
  posição; arrastar o marcador atualiza a posição; a mesma localidade não entra
  duas vezes.
- **RF019-CA007** - Criar localidade: a modal do RF018 cria a localidade, coloca
  o marcador no centro e ela aparece também na aba Localidades, com a âncora
  como pai sugerido.
- **RF019-CA008** - Polígono: desenhar com 3 ou mais vértices cria a forma;
  menos de 3 é recusado; arrastar uma aresta redimensiona só aquela aresta,
  arrastar um nó move só aquele vértice, arrastar o interior move a forma
  inteira, e renomear, recolorir e apagar funcionam; salvar e reabrir preserva os
  vértices alterados.
- **RF019-CA009** - Ligação: duas localidades no mapa geram uma ligação com
  rótulo e estilo; auto-ligação e par duplicado são recusados; a ligação pode ser
  apagada sem tocar nas localidades.
- **RF019-CA010** - Remover do mapa: apagar marcador/forma/ligação não altera o
  cadastro da localidade.
- **RF019-CA011** - Desfazer/refazer: as alterações do documento voltam e
  avançam; o histórico não grava no banco antes do **Salvar**.
- **RF019-CA012** - Salvar: posições, formas e ligações persistem após fechar e
  reabrir; sair sem salvar descarta.
- **RF019-CA013** - Excluir mapa: confirmar remove o mapa e os elementos; as
  localidades continuam na árvore.
- **RF019-CA014** - Templates: os cinco fundos trocam o padrão do canvas sem
  perder os elementos.
- **RF019-CA015** - Zoom/pan: o canvas navega sem alterar as coordenadas
  gravadas.
- **RF019-CA016** - Livro: a aba **Mapas** mostra o seletor e a visualização sem
  edição, com pan/zoom leve.
- **RF019-CA017** - PDF: a seção **Mapas** traz os mapas com conteúdo, na ordem
  de criação, e omite os vazios; a paleta é fixa.
- **RF019-CA018** - Migração v20: um banco v19 migra para a v20 sem perder
  mundos, localidades, entradas, facções, livros, personagens, capítulos ou
  associações.
- **RF019-CA019** - Camadas: front-end chama só comandos Tauri; o salvar e o
  excluir são transacionais no domínio.
- **RF019-CA020** - Testes automatizados: a verificação cobre lista/modal,
  editor, arrastar, criar localidade, polígono, ligação, undo/redo, salvar,
  excluir, templates, livro e PDF.
- **RF019-CA021** - Sem dados fictícios: mundo sem mapas e mapa vazio mostram
  estados vazios.
- **RF019-CA022** - Sem regressão: os fluxos dos requisitos anteriores continuam
  funcionando.
- **RF019-CA023** - Ícones: uma **Cidade** em mundo **Futurista** mostra o ícone
  de cúpulas; em mundo **Medieval**, o de muralha. Localidade com imagem mostra
  a miniatura; tipo sem desenho mantém o quadrado vazio. O mesmo ícone aparece
  no livro e no PDF.
- **RF019-CA024** - Fundos por escala: ao abrir um mapa de **Cidade**, o canvas
  mostra ruas, quarteirões vazios e a praça; o seletor de **Fundo** não aparece,
  o **Polígono** continua disponível e a planta também é desenhada no livro e no
  PDF. **Bairro** tem quadras com lotes. **Prédio/Casa** mostra uma **grade
  fixa**, sem planta baixa, no editor, no livro e no PDF.
- **RF019-CA025** - Tipos por escala: o painel de um mapa de **Cidade** não
  lista uma **Floresta**; tentar salvar o mapa com esse marcador devolve erro do
  domínio e nada é gravado. O mapa de **Prédio/Casa** lista apenas Cômodo,
  Quarto, Sala e Salão; **Mundo** não lista Casa nem Bairro; **Região** não lista
  Cômodo, Quarto, Sala nem Salão.
- **RF019-CA026** - Cômodo: arrastar uma localidade para um mapa de
  **Prédio/Casa** cria um quadrado de 120 × 120 com o nome no centro; mover,
  redimensionar pelas oito alças, salvar e reabrir preservam posição, largura e
  altura.
- **RF019-CA027** - Porta: a toolbar de **Prédio/Casa** oferece **Porta** e não
  oferece **Polígono** nem **Ligação**; clicar numa parede cria a porta, que
  pode mudar de lado, largura e posição, acompanha o cômodo e é apagada com ele.
  Um banco v20 migra para a v21 sem perder posições.
- **RF019-CA028** - Leitura e PDF: cômodos e portas aparecem iguais no editor,
  na aba **Mapas** do livro e no **Documento do Mundo**, inclusive com a paleta
  fixa de impressão.
- **RF019-CA029** - Filtros de Mundo e Região: tentar salvar um **Bairro** num
  mapa de **Mundo** devolve erro do domínio; o mapa de **Região** aceita Casa,
  Praça e Bairro, mas recusa **Quarto** com erro. A raiz do mundo não aparece no
  painel de localidades.
- **RF019-CA030** - Exclusividade: uma **Sala** já usada num mapa de
  **Prédio/Casa** não aparece no painel de outro mapa de Prédio/Casa e o domínio
  recusa a nova associação. Uma localidade usada em **Região** continua
  disponível num mapa de **Mundo** (e vice-versa), mas não num mapa de
  **Cidade**. As localidades do mapa atual continuam disponíveis nele.

## Arquitetura

O TaleCraft será construído para Desktop, usando a linguagem Rust com o Framework Tauri 2.0. Para o front-end, será utilizado o React, com JavaScript e Vite. Para o banco de dados, será utilizado o banco SQLite. 

Stack tecnológica
- Desktop: Tauri 2.
- Back-end: Rust.
- Front-end: React com JavaScript e Vite.
- Banco de dados: SQLite

Ambiente de desenvolvimento inicial: Windows.

