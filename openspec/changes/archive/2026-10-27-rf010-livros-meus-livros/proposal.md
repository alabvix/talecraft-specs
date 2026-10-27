# Proposal: RF010 — Livros: Meus Livros

## Why

O menu **Meus Livros** ainda abre uma tela vazia. O domínio de Livros precisa de
um ponto de entrada visual que apresente a biblioteca de livros e prepare o
caminho para o cadastro e o detalhe do livro, que virão em requisitos
posteriores.

## What Changes

- Criar a tela inicial **Meus Livros**, reutilizando a casca do aplicativo
  (marca, topbar, sidebar e temas) e a identidade visual do protótipo.
- Exibir os elementos do protótipo: título, subtítulo, quatro métricas, seção
  **Todos os livros**, badge de resultados, controle **Grade**, cards de livros,
  card tracejado **Novo livro** e painel **Personagens que atravessam livros**.
- Alterar a label **Todos os projetos** para **Todos os livros**.
- Exibir **somente** o botão **+ Novo Livro** no cabeçalho, sem o botão
  **Importar .pdc**.
- Manter o botão e o card de novo livro como affordances visuais, sem abrir
  cadastro nesta entrega.
- Usar dados de demonstração no front-end; não criar entidade Livro, tabela,
  migração ou comando Tauri.

## Out of Scope

- Cadastro, edição, exclusão ou detalhe de livro.
- Banco de dados, migração ou persistência de livros.
- Importação/exportação `.pdc`.
- Associação livro–mundo, livro–personagem ou livro–capítulo.
- Filtragem real da busca ou alternância real entre Grade e Lista.
- Navegação a partir dos cards de livros ou do botão **+ Novo Livro**.
