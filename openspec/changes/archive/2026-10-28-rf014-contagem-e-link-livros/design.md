## Context

A lista global de personagens (`TelaPersonagens`) tem um rodapé fixo **0
livros** desde o RF004. Depois do RF014, o vínculo existe e a ficha global já
mostra os livros; falta refletir a contagem no card e permitir saltar do vínculo
para a página do livro.

## Goals / Non-Goals

**Goals:**

- Mostrar no card a quantidade real de livros vinculados ao personagem.
- Abrir a página do livro ao clicar no nome dele no painel **Vínculos com
  Livros**.
- Cobrir os dois comportamentos no verificador do RF014.

**Non-Goals:**

- Listar os títulos dos livros no card (o card só conta; a ficha lista).
- Criar filtro por livro na tela principal.
- Editar ou remover o vínculo pela ficha global.

## Decisions

**D1 — `totalLivros` no `Personagem` de leitura.** As consultas `listar` e
`obter` ganham uma subconsulta `COUNT(*)` em `livro_personagem`; o campo é
serializado como `totalLivros` e tem `#[serde(default)]`, então o objeto enviado
por `salvar_personagem` (que não traz o campo) continua válido. Alternativa
descartada: um comando `contar_livros` por card — faria N chamadas na lista.

**D2 — O card conta, a ficha detalha.** O rodapé passa a mostrar
`{totalLivros} livro(s)` e o corpo do card deixa de dizer "Nenhum vínculo ainda"
quando há vínculos; nesse caso orienta a abrir a ficha. Os títulos não entram no
card para não pesar a listagem.

**D3 — Link com `linkbtn`.** O nome do livro no painel vira um `<button
className="linkbtn">` que chama `aoAbrirLivro(livroId)`, recebido da `App` como
`abrirLivro`. O componente da ficha não conhece a navegação global; só dispara o
callback, como já faz `aoAbrirPersonagem` na árvore familiar.

**D4 — Sem comando nem migração.** `listar_livros_do_personagem` já devolve o
necessário para a ficha; o link só usa `livroId`. A contagem no card vem de
`listar_personagens`, sem chamada extra.

## Risks / Trade-offs

- **Subconsulta por personagem** → a biblioteca global é pequena e o índice
  `idx_livro_personagem_personagem` cobre a contagem.
- **Objeto de personagem com campo novo** → `#[serde(default)]` mantém a
  compatibilidade com o payload de gravação e com bancos antigos (não há coluna).
- **Link na tabela** → o botão dentro da célula não interfere no restante da
  linha, que não é clicável.

## Migration Plan

1. Acrescentar `total_livros` ao struct e às duas consultas de leitura.
2. Usar o campo no card e tornar o nome do livro um link.
3. Nenhuma mudança de banco; builds anteriores ignoram o campo não lido.

## Open Questions

Nenhuma. O rodapé usa singular/plural e o link abre a página do livro existente.
