# Proposta — RF004: Personagens

## Why

O TaleCraft já tem casca visual (RF002) e banco de dados funcionando (RF003),
mas ainda não guarda nenhuma informação do domínio. O personagem é o primeiro
domínio do produto e a **entidade global mais reutilizada**: uma mesma ficha
serve a vários livros, e é por ela que o escritor começa a planejar.

Sem ela, o app continua sendo uma casca vazia. Com ela, o banco deixa de ser
infraestrutura e passa a sustentar o primeiro conteúdo real do TaleCraft — e
estabelece o padrão (campos, migração, comandos, telas) que os domínios
seguintes (Worldbuilding, Capítulos) vão reutilizar.

## What Changes

- **Nova entidade de domínio: Personagem global**, com os atributos do RF004:
  Nome, Idade, Retrato/Imagem, Personalidade, Força, Fraqueza, Interesses,
  Raça, Alcunha, Biografia e Relações. Apenas o **Nome é obrigatório**; todos
  os campos são texto, exceto Relações.
- **Nova entidade: Relação entre personagens**, direcionada, com tipo fechado
  em oito valores (Rival, Mentor, Inimigo, Filho/Filha, Mãe/Pai, Aliado,
  Cônjuge, Namorado).
- **Duas tabelas novas** no SQLite (`personagem_global` e
  `relacao_personagem`), criadas por **migração versionada aditiva** sobre a
  infraestrutura do RF003 — sem recriar nem apagar dados.
- **Novos comandos Tauri** para listar, buscar, criar, ler e atualizar
  personagens, e para gerenciar relações. O front-end continua sem SQL
  (RF004-CA021). **Não** há comando de exclusão neste requisito.
- **Retrato**: o arquivo escolhido (imagem de **até 4 MB**) é **copiado para a
  pasta de dados do aplicativo** e o caminho é gravado no personagem; a
  associação só é permitida depois que o personagem existe no banco
  (RF004-RN002, RF004-CA017, RF004-CA018).
- **Tela principal de Personagens** (substitui a tela vazia do RF002): cards ou
  lista, busca por nome pela barra geral, botão de novo personagem e acesso ao
  detalhe.
- **Tela de detalhe do personagem**: formulário dos campos do RF004, painel de
  Relações Globais e o botão que abre a modal de relações.
- **Tela modal de Relações de Personagem**: lista dos personagens com miniatura,
  nome e seletor de nível de relação.
- **Preservação do RF002/RF003**: temas, navegação, splash e inicialização do
  banco seguem funcionando (RF004-CA024).

**Fora do escopo (do RF004):**

- Vínculo entre personagem e livro, papel narrativo, motivação, curva de arco
  por livro e gráficos comparativos — o card de Vínculos e a seção de Curva de
  Arco ficam **sem dados**, e "Filtrar por livro" fica **vazio**
  (RF004-CA009, RF004-CA010, RF004-CA022).
- **Exclusão de personagens** — nenhum personagem é excluído neste requisito
  (RF004-RN009); não há ação nem comando de exclusão.
- Galeria de várias imagens por personagem com marcação de retrato principal
  (o RF004 pede **um** retrato; a galeria fica para requisito futuro).
- Exportação de fichas, duplicar personagem e "Ver nos gráficos".
- Campos exclusivos do protótipo que não constam do RF004: Gênero, Origem,
  Ferida permanente e Traços.

## Capabilities

### New Capabilities

- `character-library`: a biblioteca global de personagens — cadastro, consulta,
  busca, edição, retrato e as relações entre personagens. Cobre as
  telas RF004-TL001 a RF004-TL003, as regras RF004-RN001 a RF004-RN009 e os
  critérios RF004-CA001 a RF004-CA023 que dizem respeito ao domínio e às telas.

### Modified Capabilities

- `database-foundation`: o RF003 exigiu **nenhuma** entidade de negócio
  (RF003-CA012). O RF004 passa a criar tabelas de domínio. A capability deixa de
  ser "infraestrutura pura": seu requisito de migrações passa a acomodar as
  migrações de domínio do RF004, e o de "nenhuma entidade de negócio" é
  ajustado para valer apenas para o escopo do RF003.
- `rust-bridge`: novos comandos Tauri de personagens e relações entram no IPC,
  somando-se a `mensagem_inicial`, `estado_inicial` e `verificar_banco`.

## Impact

- **Banco (`src-tauri/src/banco.rs`):** nova migração versionada com as tabelas
  `personagem_global` e `relacao_personagem`, com as restrições de nome único
  (RF004-RN005), tipos de relação (RF004-RN006), sem autorrelação (RF004-RN007)
  e relação única por par (RF004-RN008).
- **Back-end (`src-tauri/src/`):** novo módulo de domínio de personagens
  (operações de banco) e novos comandos em `lib.rs`, todos registrados no
  `invoke_handler`.
- **Front-end (`src/`):** `paginas.js` (a tela Personagens deixa de ser vazia);
  novos componentes de tela e da modal de relações; novos estilos para os
  componentes de personagem, apoiados no design system já existente
  (`src/talecraft.css`), respeitando o tema ativo.
- **Arquivos de imagem:** nova pasta `<app_data_dir>/retratos/` para os retratos
  copiados (RF004-CA017).
- **Dependências:** nenhuma nova biblioteca prevista além das já usadas
  (`rusqlite` e `rusqlite_migration`); o upload usa a seleção de arquivo do
  sistema via diálogo do Tauri.
- **Testes/verificação:** novos testes Rust para o CRUD e as relações
  (RF004-CA022) e um script de verificação vivo das telas de personagem, nos
  moldes de `scripts/verificar-rf002.mjs` e `scripts/verificar-rf003.mjs`.
