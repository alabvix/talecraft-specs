## 1. Dados e componente da tela

- [x] 1.1 Criar `src/livrosDemo.js` com os dados de demonstração de métricas, livros e personagens do painel.
- [x] 1.2 Criar `src/componentes/TelaLivros.jsx` reutilizando as classes do design system (`roothead`, `grid--4`, `metric`, `booklist`, `booktile`, `progress`, `panel`/`datalist`).
- [x] 1.3 Renderizar o cabeçalho com título **Meus Livros**, subtítulo, quatro métricas e somente o botão **+ Novo Livro**.
- [x] 1.4 Renderizar a seção **Todos os livros** com badge de resultados, controle **Grade** e quatro cards de livros de demonstração.
- [x] 1.5 Renderizar o card tracejado **Novo livro** sem menção a `.pdc`.
- [x] 1.6 Renderizar o painel **Personagens que atravessam livros** com os dados do protótipo e o link **Ver biblioteca completa**.

## 2. Navegação e comportamento

- [x] 2.1 Integrar `TelaLivros` em `src/App.jsx`/`src/paginas.js` na página **Meus Livros**, no lugar da tela vazia.
- [x] 2.2 Ativar a busca superior com o placeholder **Buscar livros…** sem filtragem real nesta entrega.
- [x] 2.3 Garantir que o botão **+ Novo Livro** e o card **Novo livro** não abram cadastro, não criem livro e não naveguem.
- [x] 2.4 Garantir que os cards de livro não abram detalhe/cadastro nem usem `role="button"`/`tabIndex`.
- [x] 2.5 Ligar **Ver biblioteca completa** à tela de Personagens existente.

## 3. Estilos e acessibilidade

- [x] 3.1 Manter a aparência do protótipo nos três temas (Blade Byte, Old Tower e Tundra).
- [x] 3.2 Conferir hierarquia de títulos, contraste, foco visível e textos alternativos dos retratos.
- [x] 3.3 Conferir que o botão **Importar .pdc** não existe em nenhum ponto da tela.

## 4. Verificação e fechamento

- [x] 4.1 Criar `scripts/verificar-rf010.mjs` cobrindo abertura da tela, ausência de importação, botão **+ Novo Livro**, label **Todos os livros**, métricas, cards, card **Novo livro**, painel e ausência de navegação.
- [x] 4.2 Rodar `npm run build` e `node scripts/verificar-rf010.mjs`.
- [x] 4.3 Rodar a regressão de RF002, RF003 e das telas de Personagens/Worldbuilding.
- [x] 4.4 Atualizar `AGENTS.md` do app com a tela e a decisão de dados de demonstração.
- [x] 4.5 Rodar `openspec validate --all` e arquivar o change.
