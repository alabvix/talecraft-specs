# Design: RF010 — Livros: Meus Livros

## Context

O menu **Meus Livros** ainda não tem tela própria. O RF002 entregou a casca
(marca, topbar, sidebar e temas), e o protótipo `prototype/index.html` já define
a composição visual desejada. O RF010 é uma entrega **somente de front-end**:
não há entidade Livro, cadastro, detalhe ou persistência.

## Goals / Non-Goals

**Goals:**

- Criar a tela inicial de Meus Livros com a composição do protótipo.
- Remover da tela o botão **Importar .pdc**.
- Trocar **Todos os projetos** por **Todos os livros**.
- Manter o botão **+ Novo Livro** e o card tracejado **Novo livro** como
  affordances visuais, sem cadastro nesta entrega.
- Preservar a casca, os temas e as telas existentes.

**Non-Goals:**

- Cadastro, edição, exclusão ou detalhe de livro.
- Banco, migração, comandos Tauri ou persistência de livros.
- Importação/exportação `.pdc`.
- Associações livro–mundo/personagem/capítulo.
- Filtragem real de busca ou alternância Grade/Lista.

## Decisions

### D1 — Componente de tela no front-end

Criar `src/componentes/TelaLivros.jsx` (ou nome equivalente no padrão do
projeto) e integrá-lo ao `App.jsx`/`paginas.js` na página **Meus Livros**,
substituindo a `TelaVazia`. A tela reutiliza as classes do design system:
`roothead`, `grid grid--4`, `metric`, `booklist`, `booktile`, `progress`,
`panel`/`datalist` etc.

### D2 — Dados de demonstração isolados

Os livros, métricas e personagens do painel ficam em um módulo de dados de
demonstração (por exemplo, `src/livrosDemo.js`). Não há chamada `invoke`, SQL ou
banco. Isso deixa claro que o RF010 não cria a entidade Livro e facilita a
substituição por dados reais no requisito de cadastro/listagem.

### D3 — Sem navegação nesta entrega

Os cards de livro não terão `onClick`, `role="button"` ou `tabIndex`; o
indicador de navegação permanece apenas visual. O botão **+ Novo Livro** e o card
**Novo livro** também não navegam nem abrem modal. O link **Ver biblioteca
completa** abre a tela de Personagens existente (RF004).

### D4 — Busca e Grade visuais

O campo de busca da topbar aparece com o placeholder **Buscar livros…**, e o
controle **Grade** aparece conforme o protótipo. Nesta entrega eles não filtram
nem alternam a visualização; a funcionalidade real pertence ao requisito de
listagem/cadastro de livros.

### D5 — Sem alterações em Rust/SQLite

Nenhum módulo Rust, migração, comando ou tabela é criado ou alterado. O `Cargo`
e o banco permanecem iguais.

### D6 — Verificação

Criar `scripts/verificar-rf010.mjs` para abrir a interface (Edge headless contra
o Vite, como RF002, ou o app Tauri real) e conferir:

- abertura pelo menu **Meus Livros**;
- ausência de **Importar .pdc**;
- presença do **+ Novo Livro**;
- label **Todos os livros**;
- quatro métricas;
- quatro cards de livros e o card **Novo livro**;
- painel de personagens;
- ausência de navegação ao clicar nos cards/botão.

## Risks / Trade-offs

- **Dados de demonstração podem parecer dados reais.** Os textos e contadores
  devem ser claramente demonstrativos e não persistidos; o requisito de cadastro
  substituirá a fonte.
- **Botão sem ação pode parecer defeito.** O botão e o card são exigidos como
  preparação visual; a UI não deve navegar para uma tela vazia. O requisito
  seguinte implementará o cadastro.
- **O card tracejado duplica o botão.** Ambos apontam para o mesmo fluxo futuro;
  nesta entrega nenhum dos dois cria registro.
