## Context

O detalhe inline já usa `dados_graficos_livro` para a aba de gráfico e o comando
devolve `ArcoPersonagem.pontos` com capítulo, evento, tipo e valor. O motivo do
evento existe em `capitulo_personagem.motivo`, mas não estava no `PontoArco`. O
detalhe tem três abas; o banco está na v16.

## Goals / Non-Goals

**Goals:**

- Encurtar o rótulo da aba de gráfico para **Gráfico de Evolução**.
- Listar os eventos do personagem no livro em tabela, cinco por página.
- Mostrar capítulo, tipo do evento e motivo.

**Non-Goals:**

- Alterar a curva, o cálculo dos deltas ou a gravação do capítulo.
- Incluir eventos **Neutro** na tabela.
- Criar comando ou migração.

## Decisions

**D1 — Renomear a aba no array `ABAS`.** O `id: "grafico"` continua o mesmo; só
o `rotulo` vira **Gráfico de Evolução**. O `PainelAbas` já suporta a nova aba.

**D2 — `motivo` no `PontoArco`.** A consulta de `carregar_arcos` passa a
selecionar `cp.motivo`; `PontoArco` ganha `pub motivo: String` (JSON `motivo`).
Nenhuma tabela nova: o dado já existe em `capitulo_personagem`. O front-end
recebe o motivo junto dos pontos que já usa no gráfico.

**D3 — Aba Eventos no `DetalhePersonagemLivro`.** A aba usa `arco.pontos`,
filtra `tipoEvento !== "Neutro"` e fatia cinco por página, com
`paginaEventos`, **Anterior**/**Próxima** e a indicação da página. A tabela tem
**Capítulo** (`numero — titulo`), **Tipo Evento** e **Motivo do evento** (motivo
vazio vira `—`). Sem eventos, mostra **Ainda não existem eventos**. A mesma
leitura de `dadosGraficosLivro` alimenta a aba do gráfico e a de eventos.

**D4 — Verificação.** O teste Rust confere o motivo no ponto do arco. O
`verificar-rf014.mjs` cria seis capítulos com eventos variados e confere a
tabela de 5+1, a ordem e o motivo; a troca de rótulo é coberta pelas quatro abas
esperadas.

## Risks / Trade-offs

- **Tabela dentro de uma aba** → a rolagem natural do detalhe continua; o pager
  fica no fim de cada página.
- **Neutro fora da tabela** → é o comportamento pedido; o evento Neutro continua
  no gráfico como linha reta.
- **Capitulo sem motivo** → mostra `—`, sem bloquear a linha.

## Migration Plan

1. `grafico.rs`: campo `motivo`, consulta e teste.
2. `DetalhePersonagemLivro.jsx`: rótulo, aba **Eventos** e paginação.
3. `scripts/verificar-rf014.mjs`: eventos 5+1 e quatro abas.
4. Rodar build, testes e verificadores; nenhum banco é migrado.

## Open Questions

Nenhuma.
