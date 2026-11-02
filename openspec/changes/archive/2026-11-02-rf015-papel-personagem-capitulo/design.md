## Context

O painel do capítulo já carrega o elenco do livro por
`listar_personagens_do_livro`, cujo `PersonagemDoLivro` traz `personagemId`,
`nome`, `retrato` e `papel`. O estado do capítulo (`form.personagens`) guarda
apenas `personagemId`, `nome`, `evento`, `tipoEvento` e `motivo`. O banco está
na v16; este ajuste é só de apresentação.

## Goals / Non-Goals

**Goals:**

- Mostrar **Nome - Papel** em cada personagem da aba **Personagens do Capítulo**.
- Usar o papel atual do vínculo do RF014, sem duplicar o dado no capítulo.
- Exibir **Não definido** quando o vínculo não tiver papel.

**Non-Goals:**

- Editar o papel no painel do capítulo.
- Gravar `papel` em `capitulo_personagem` ou mudar o payload de
  `salvar_capitulo`.
- Alterar a seção **Personagens** do livro ou o banco.

## Decisions

**D1 — Derivar o papel do elenco já carregado.** O painel já busca
`listar_personagens_do_livro(capitulo.livroId)` em `personagensLivro`; o helper
`papelDoPersonagem(personagemId)` faz `find` nessa lista e devolve
`papel || "Não definido"`. Alternativa descartada: copiar o papel para
`form.personagens` ao adicionar — ficaria congelado e divergiria se o vínculo
mudasse.

**D2 — Renderizar nome e papel no mesmo `<strong>`.** O nome continua em
`.chapterchar__nome` e o papel entra num `<span class="chapterchar__papel">`
com `color: var(--text-muted)` e peso menor, no formato
`Nome - Papel`. O texto completo fica legível para leitores de tela e para o
E2E.

**D3 — Nenhuma mudança de back-end.** `listar_personagens_do_livro` já faz
`SELECT ... lp.papel`; o papel é somente leitura e não entra no `INSERT` de
`capitulo_personagem`. O vínculo continua sendo a fonte da verdade.

**D4 — Verificação.** O `verificar-rf015.mjs` define **Falso Antagonista** para
a Iara via `salvar_personagem_do_livro` antes de abrir **Capítulos**, deixa o
Kael em **Não definido** e confere os dois textos na aba de personagens.

## Risks / Trade-offs

- **Papel muda em outra seção** → como o painel lê o elenco ao abrir o capítulo,
  o texto acompanha o vínculo na próxima abertura; não há cache no capítulo.
- **Nome longo** → o texto pode ocupar duas linhas na coluna; o grid já permite
  quebra e o papel fica visualmente secundário.
- **Sem papel** → o fallback **Não definido** mantém o formato consistente com o
  RF014.

## Migration Plan

1. `PainelCapitulo.jsx`: helper do papel e render **Nome - Papel**.
2. `livros.css`: estilo `.chapterchar__papel`.
3. `scripts/verificar-rf015.mjs`: cenário com **Falso Antagonista** e fallback.
4. Rodar build, testes Rust e verificadores; nenhum banco é migrado.

## Open Questions

Nenhuma.
