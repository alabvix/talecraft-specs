## Context

O Painel do Livro monta os cards a partir de `MODULOS_PAINEL` em
`TelaLivro.jsx`; a ordem atual começa por **Personagens**. A aba **Dados
Gerais** tem os campos de identidade do livro, mas não o período da história.
O banco está na v10 do RF013.

## Goals / Non-Goals

**Goals:**

- Exibir os cards de **Módulos deste livro** na ordem **Dados do Livro**,
  **Personagens**, **Capítulos**, **Worldbuilding**, **Gráficos**, **Exportar**.
- Persistir **De** e **Até** no registro do livro, como texto curto.
- Validar a ordem e o período no `verificar-rf011.mjs`.

**Non-Goals:**

- Validar formato de data ou calcular duração.
- Exibir o período no card de Meus Livros, no Painel ou na exportação.
- Criar timeline ou gráfico de período.

## Decisions

**D1 — Reordenar o array, sem tocar na navegação.** `MODULOS_PAINEL` já é a
fonte única dos cards; mover **Dados do Livro** para o início mantém os `id` e
as seções intactos. Alternativa descartada: CSS `order` — esconderia a ordem do
código e quebraria a leitura por teclado.

**D2 — Período como texto livre em duas colunas.** `periodo_de` e
`periodo_ate` são `TEXT NOT NULL DEFAULT ''`, sem validação de formato, porque
mundos de fantasia usam séculos, eras e datas ambíguas — a mesma decisão das
datas de Evento (RF008-RN008). Alternativa descartada: colunas `DATE` — recusaria
marcações fictícias.

**D3 — v11 aditiva e listagem enxuta.** As duas colunas entram com `ALTER TABLE
... ADD COLUMN`; nenhum passo publicado é editado. `obter_livro` devolve os
valores e `listar_livros` devolve vazio (design D3 do RF011/RF012): a edição
sempre parte do registro completo.

**D4 — Dois campos lado a lado em Dados Gerais.** No formulário, **De** e
**Até** ocupam duas colunas do `.formgrid`, com `id` estáveis
`livro-periodo-de` e `livro-periodo-ate`. O rótulo visual fica nos próprios
campos; o conjunto é o **Período da História**.

**D5 — Verificação no RF011.** `verificar-rf011.mjs` ganha duas checagens: a
ordem dos módulos e a gravação/releitura do período (29 → 31). As demais
verificações continuam iguais.

## Risks / Trade-offs

- **Período sem validação** → o escritor pode digitar qualquer coisa; é
  intencional para mundos fictícios. Um requisito futuro pode oferecer atalhos
  de era.
- **Objeto de listagem não serve para salvar** → `listar_livros` devolve período
  vazio; a edição usa `obter_livro` (D3).
- **Ordem dos módulos em testes** → a checagem nova fixa a ordem; o teste
  anterior só contava seis cards.

## Migration Plan

1. Migração **v11** aditiva em `banco/migracoes.rs`.
2. `livro.rs` lê e grava `periodo_de`/`periodo_ate`; `listar` devolve vazio.
3. Bancos existentes migram na subida; um build anterior ignora as colunas
   novas porque os `SELECT` são por nome.

## Open Questions

Nenhuma. Formato de data, linha do tempo e exibição do período fora da aba
**Dados Gerais** ficam para requisitos posteriores.
