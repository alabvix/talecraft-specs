## Context

O elenco é lido por `listar_personagens_do_livro`, que devolvia apenas
`personagemId`, `nome`, `retrato` e `papel`. Os capítulos e os vínculos já
existem (`capitulo`, `capitulo_personagem`) e o detalhe inline está aberto por
`detalheId`. O banco está na v16; este ajuste não muda o esquema.

## Goals / Non-Goals

**Goals:**

- Mostrar **Qtd Capítulos** e **Capítulos** em cards e na tabela.
- Destacar o card/linha do personagem selecionado.
- Remover o botão **Fechar** do rodapé do detalhe.
- Manter o detalhe abrindo/fechando pela seleção e pelo ícone X.

**Non-Goals:**

- Criar migração, comando ou tabela.
- Alterar a gravação dos capítulos ou o gráfico.
- Mudar a modal de seleção ou desvincular personagens.

## Decisions

**D1 — Dois campos derivados no elenco.** `PersonagemDoLivro` ganha
`total_capitulos: i64` e `capitulos: Vec<i64>` (JSON `totalCapitulos` e
`capitulos`). A consulta principal continua a mesma; uma segunda consulta lê
`capitulo_personagem` + `capitulo` do livro, ordenada por `numero`, e preenche um
`HashMap<i64, Vec<i64>>`. Não há coluna nova nem migração. Alternativa
descartada: `GROUP_CONCAT` — a ordem e o parse no Rust ficariam menos claros.

**D2 — Exibição no card e na tabela.** O card mostra duas linhas no corpo:
`Qtd Capítulos: N` e `Capítulos: 1,3,4`; a tabela ganha as colunas
**Qtd Capítulos** e **Capítulos**. Sem capítulos: `0` e `—`. A numeração vem
pronta do back-end.

**D3 — Destaque pelo `detalheId`.** `TelaPersonagensLivro` adiciona
`is-selected` ao `.libcard` e ao `<tr>` cujo `personagemId` é o `detalheId`. O
CSS usa `--accent-char` e `--accent-soft`, acompanhando o tema.

**D4 — Sem botão Fechar.** O rodapé mantém o texto de ajuda e o **Salvar** (só
na aba do vínculo). O fechamento fica no ícone X do cabeçalho
(`#detalhe-personagem-fechar`, `aria-label`), que chama `aoFechar` e limpa
`detalheId`.

**D5 — Verificação.** O teste Rust confere a ordem dos números; o
`verificar-rf014.mjs` cria três capítulos, associa a Iara aos capítulos 1 e 3 e
confere `Qtd Capítulos: 2` / `Capítulos: 1,3` no card e na tabela, o destaque e
a ausência do botão **Fechar**.

## Risks / Trade-offs

- **Consulta extra por elenco** → uma consulta só para o livro, não N+1; o
  volume é pequeno.
- **Card com mais duas linhas** → o corpo cresce, mas a faixa horizontal mantém
  a altura uniforme e os cinco cards visíveis.
- **Sem botão Fechar** → o ícone X continua acessível por teclado e leitor de
  tela; clicar em outro personagem troca a seleção.

## Migration Plan

1. `livro_personagem.rs`: campos, consulta e teste.
2. `TelaPersonagensLivro.jsx`: exibição, destaque e classes.
3. `DetalhePersonagemLivro.jsx`: remover o botão **Fechar** do rodapé.
4. `livros.css`: `.chapterinfo`, `.libcard.is-selected` e `tr.is-selected`.
5. Atualizar o E2E e rodar build/testes; nenhum banco é migrado.

## Open Questions

Nenhuma.
