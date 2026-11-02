## Context

A seção **Personagens** do livro usa `.libgrid` (grade responsiva) e uma tabela
sem paginação; o detalhe é a modal `ModalPersonagemLivro`, com duas áreas e o
`Salvar` que fecha a modal. O comando `dados_graficos_livro` já devolve as séries
do RF016. O banco está na v16; o ajuste é de layout e interação.

## Goals / Non-Goals

**Goals:**

- Limitar cards a cinco por tela com rolagem horizontal.
- Paginar a lista de cinco em cinco.
- Abrir o detalhe abaixo da grade/lista em três abas, sem modal.
- Manter a gravação do vínculo e a ficha global intactas.

**Non-Goals:**

- Alterar a modal de seleção múltipla.
- Criar comando, migração ou campo.
- Mudar o cálculo do gráfico de evolução.
- Adicionar desvincular.

## Decisions

**D1 — Cards em faixa horizontal.** O container mantém a classe `.libgrid` e
recebe `.personagens-livro-cards`, com `grid-auto-flow: column`,
`grid-auto-columns: minmax(240px, calc((100% - 56px) / 5))`, `overflow-x: auto`
e `scroll-snap-type`. Em tela cheia cabem cinco; com mais, a barra horizontal
aparece. Alternativa descartada: paginar os cards — o requisito pede rolagem.

**D2 — Paginação da lista no front-end.** O comando já devolve o elenco completo;
a tela calcula `totalPaginas = ceil(elenco.length / 5)` e fatia a página atual.
Controles **Anterior**/**Próxima** com `disabled` nos limites e a indicação
`Página X de Y`. Ao mudar o elenco, a página é limitada ao total. Alternativa
descartada: paginar no back-end — o elenco é pequeno e a modal de seleção já
pagina no servidor; aqui o corte local evita um comando novo.

**D3 — Detalhe inline substitui a modal.** O novo
`DetalhePersonagemLivro.jsx` reaproveita o conteúdo da modal em um `.panel`
abaixo da grade/lista, com `PainelAbas` e três abas. O `TelaPersonagensLivro`
mantém `detalheId`; clicar em outro personagem troca o id e o detalhe recarrega
na primeira aba. `ModalPersonagemLivro.jsx` é removido. **Salvar** grava via
`salvarPersonagemDoLivro`, mostra **Vínculo salvo.** e chama `aoSalvar` para
recarregar a lista, sem fechar. **Fechar** limpa `detalheId`.

**D4 — Terceira aba reusa o gráfico.** O detalhe chama `dadosGraficosLivro` ao
abrir e filtra `personagens` pelo `personagemId`; usa `GraficoArco` com os
capítulos do retorno. Sem arco/pontos, mostra **Ainda não existem dados**.

**D5 — Verificação.** O `verificar-rf014.mjs` passa a abrir o detalhe inline,
navegar pelas três abas, salvar sem fechar, fechar sem salvar e testar cards com
sete personagens e lista de 5+2. O `verificar-rf015.mjs` confere a aba do gráfico
com um evento de Ascensão.

## Risks / Trade-offs

- **Cards estreitos** → `minmax(240px, ...)` preserva a legibilidade; em telas
  menores aparecem menos de cinco e a rolagem continua.
- **Detalhe longo empurra a página** → o painel fica abaixo da lista, como pedido;
  a rolagem natural da página é preservada.
- **Salvar não fecha** → o escritor pode salvar e continuar; a confirmação
  **Vínculo salvo.** deixa claro o resultado.
- **Gráfico depende de capítulos** → sem eventos, a aba mostra o estado vazio em
  vez de um gráfico quebrado.

## Migration Plan

1. Estilos `.personagens-livro-cards`, `.detalhepersonagem` e
   `.personagemlivro__grafico` em `livros.css`.
2. `TelaPersonagensLivro.jsx`: paginação, faixa horizontal e detalhe inline.
3. `DetalhePersonagemLivro.jsx`: três abas, salvar/fechar e gráfico.
4. Remover `ModalPersonagemLivro.jsx` e atualizar os verificadores.
5. Rodar build, testes Rust e verificadores; nenhum banco é migrado.

## Open Questions

Nenhuma.
