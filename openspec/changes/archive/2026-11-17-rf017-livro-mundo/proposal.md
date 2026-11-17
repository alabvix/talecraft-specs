## Why

O **Worldbuilding** do livro é a última seção que ainda abre uma tela informativa
de "requisito posterior". Sem ele, o escritor cadastra mundos, entradas e facções
no nível raiz, mas o livro não os usa: a métrica **Entradas de worldbuilding**
fica em **0** e o campo **Cenário Worldbuilding** do capítulo só exibe o aviso
**Nenhum mundo associado a este livro**. O RF011 registrou a associação
livro–mundo como requisito futuro, e o RF015 já reservou a coluna
`cenario_localidade_id` para ela.

## What Changes

- O livro passa a ter **um ou mais mundos globais associados** (N:N). **BREAKING:**
  revoga a regra "um livro tem 1 e somente 1 mundo associado" do protótipo e do
  RF007 — o vínculo deixa de ser 1:1 do lado do livro.
- A seção **Worldbuilding** do livro deixa de ser informativa e vira um **Tab
  Panel** com uma aba por mundo associado, na ordem de associação, primeira aba
  ativa. Cada aba mostra o **resumo somente leitura** do mundo e as **seis
  categorias de entradas** em tabela paginada.
- **Associar mundos** em grade paginada com busca, seleção múltipla e selo **Já
  associado**; **Remover mundo** com limpeza transacional dos cenários dos
  capítulos que usavam localidades daquele mundo.
- **Nova entrada** pela aba grava no mundo (as entradas continuam pertencendo ao
  mundo); editar e excluir seguem exclusivos do nível raiz.
- O campo **Cenário Worldbuilding** do capítulo lista as **Localidades** de
  todos os mundos associados, agrupadas por mundo, e o domínio recusa localidade
  de mundo não associado.
- Métricas: **Entradas de worldbuilding** e o módulo **Worldbuilding** do Painel
  passam a refletir os mundos e as entradas reais; os cards de Meus Livros
  mostram os mundos associados.
- O painel **Vínculos com livros** do mundo passa a listar os livros que o usam,
  com link e contador real.
- Migração **v17** aditiva (`livro_mundo`).

**Fora do escopo:** exportação do livro, edição dos dados do mundo dentro do
livro, edição/exclusão de entradas pela aba do livro, exclusão de mundos,
alteração dos PDFs existentes (ficha do personagem e documento do mundo).

## Capabilities

### New Capabilities

Nenhuma capability nova: o RF017 estende o livro e o mundo já existentes.

### Modified Capabilities

- `book-workspace`: nova seção **Worldbuilding** do livro; menu lateral com o
  subtítulo dos mundos; Painel com métrica real; **Cenário Worldbuilding** do
  capítulo passa a ter opções; "Seções em requisito posterior" fica só com
  **Exportar**.
- `book-library`: listagem e métricas passam a considerar os mundos associados.
- `world-library`: painel **Vínculos com livros** deixa de ser vazio e lista os
  livros que usam o mundo.
- `database-foundation`: migração **v17** com a tabela `livro_mundo`.
- `rust-bridge`: comandos dos mundos do livro expostos ao front-end.

## Impact

- **Requisito:** RF017 em `documents/talecraft.md` (RF017-TL001 a RF017-TL009,
  RF017-FL001 a RF017-FL007, RF017-RN001 a RF017-RN014, RF017-CA001 a
  RF017-CA021).
- **Banco:** migração v17 (`livro_mundo`: PK `(livro_id, mundo_id)`, `ordem`,
  FKs, índice por `mundo_id`). Nenhuma migração publicada é editada.
- **Back-end:** novo módulo de domínio dos mundos do livro; ajustes em
  `livro.rs` (listagem, estatísticas), `capitulo.rs` (validação do cenário e
  limpeza) e `erro.rs` (novo código). Comandos novos registrados no
  `invoke_handler`.
- **Front-end:** nova tela da seção Worldbuilding do livro, modal de seleção de
  mundos, API do domínio, subtítulo do menu lateral, Painel, cards de Meus
  Livros, painel do mundo e select agrupado no painel do capítulo.
- **Testes:** testes Rust do domínio e da migração v17; `scripts/verificar-rf017.mjs`
  novo e ajustes nos verificadores do RF007, RF011 e RF015.
- **Documentação:** protótipo (`prototype/README.md`) e roadmap do site passam a
  descrever **um ou mais** mundos por livro.
