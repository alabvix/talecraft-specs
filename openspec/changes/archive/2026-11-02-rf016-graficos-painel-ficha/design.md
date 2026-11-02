## Context

O comando `dados_graficos_livro` já devolve `capitulos` e `personagens` com as
séries acumuladas. A seção **Gráficos** usa `GraficoProgressao` e `GraficoArco`.
O Painel do Livro só busca métricas e o quadro **Curva de arco em cada livro** da
ficha global ainda lista os livros com **sem dados por enquanto**. O banco está
na v16; este ajuste é somente de apresentação.

## Goals / Non-Goals

**Goals:**

- Mostrar a Curva de Progressão abaixo dos módulos do Painel do Livro.
- Manter o painel visível mesmo sem dados, com mensagem clara.
- Substituir a lista placeholder da ficha global por seletor de livro + gráfico
  de Evolução de Personagem daquele livro.
- Reutilizar o mesmo comando e os mesmos componentes, sem duplicar cálculos.

**Non-Goals:**

- Alterar as regras de progressão ou de arco do RF016.
- Criar migração, comando ou campo novo.
- Editar vínculos ou capítulos a partir dos gráficos.
- Mudar a seção **Gráficos**.

## Decisions

**D1 — Painel do Livro busca o gráfico no `PainelLivro`.** O componente já
carrega métricas; um efeito adicional chama `dadosGraficosLivro(livro.id)` e
guarda `capitulos`. O painel usa `GraficoProgressao` e os mesmos badges de
ações/progresso da seção Gráficos. O painel fica sempre renderizado: sem
capítulos, mostra **Ainda não existem dados**; com erro, um `notice` sem quebrar
a página. O `id="painel-grafico-progressao"` é o gancho estável do E2E.
Alternativa descartada: calcular a progressão no front-end a partir de
`listarCapitulos` — duplicaria a regra do RF016-RN003.

**D2 — Ficha global usa seletor e filtra o arco pelo personagem.** O painel
**Curva de arco em cada livro** mantém o badge de livros e ganha um `<select>`
com os livros vinculados. O primeiro livro vira a seleção padrão; trocar o
`livroGraficoId` dispara `dadosGraficosLivro` e o painel localiza
`personagens.find(arco => arco.personagemId === form.id)`. Sem arco ou sem
pontos, mostra **Ainda não existem dados**; com dados, desenha `GraficoArco`
usando `capitulos` do mesmo retorno. Alternativa descartada: carregar todos os
livros de uma vez — desnecessário e mais caro.

**D3 — Nenhuma mudança de back-end.** O comando já é somente leitura e devolve
tudo o que as duas telas precisam. A seleção de livro é estado local; não grava
nada.

**D4 — Verificação.** `verificar-rf011.mjs` confere o painel vazio (livro sem
capítulos); `verificar-rf015.mjs` confere o painel com a curva real e a ficha
global com o seletor e o marcador de Ascensão; `verificar-rf014.mjs` confere o
seletor com dois livros, a troca de livro e o estado vazio de cada um.

## Risks / Trade-offs

- **Duas chamadas no Painel** (`estatisticas`/listas e gráfico) → o volume é
  pequeno e as chamadas são paralelas na prática; evita duplicar a regra.
- **Gráfico em painel estreito** → a classe `.chartpanel` já dá
  `overflow-x: auto`; o SVG mantém a leitura.
- **Seleção de livro com dados diferentes** → a troca dispara nova leitura e o
  gráfico anterior é substituído; o estado vazio aparece quando não há arco.
- **Personagem sem aparição** → não há gráfico; o aviso explica como criar o
  arco, sem inventar pontos.

## Migration Plan

1. `TelaLivro.jsx`: estado/efeito da curva e painel abaixo dos módulos.
2. `TelaPersonagem.jsx`: seletor de livro, efeito do gráfico e `GraficoArco`.
3. `verificar-rf011.mjs`, `verificar-rf014.mjs` e `verificar-rf015.mjs`:
   novas asserções.
4. Rodar build, testes Rust e verificadores; nenhum banco é migrado.

## Open Questions

Nenhuma.
