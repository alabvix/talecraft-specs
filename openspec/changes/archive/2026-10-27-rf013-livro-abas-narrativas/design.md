## Context

O RF012 deixou a página **Dados do Livro** com as abas **Dados Gerais** e
**Resumo**, um único formulário e uma única ação **Salvar**. O livro já é uma
entidade persistida, lida por `obter_livro` e gravada por `salvar_livro`, com
subgêneros e humor ainda inexistente.

O RF013 acrescenta quatro abas que completam a identidade narrativa do livro:
**Sinopse**, **Tema**, **Conflito** e **Voz Narrativa/Tom/Tempo**. Os campos são
simples (texto ou listas fechadas) e o único caso de seleção múltipla é
**Humor** — decisão confirmada com o usuário.

## Goals / Non-Goals

**Goals:**

- Persistir sinopses, tema, conflito e voz narrativa no registro do livro, pela
  migração **v10** aditiva.
- Exibir as quatro abas depois de **Resumo**, respeitando os tipos de campo
  (curto, médio e longo).
- Permitir **Humor** múltiplo, sem repetição; as demais listas com valor único.
- Gravar todas as abas com o mesmo **Salvar**, na mesma transação.
- Preservar a edição pendente ao alternar entre as seis abas.

**Non-Goals:**

- Exibir os campos novos no card de Meus Livros, no Painel do Livro ou na
  exportação.
- Renderizar a **Nuvem de Palavras** como gráfico; ela é texto médio.
- Outras abas de Dados do Livro.
- Capítulos, elenco do livro, associação livro–mundo e gráficos.

## Decisions

**D1 — Migração v10 com colunas e uma tabela filha.** Os oito textos e as cinco
listas de valor único viram colunas de `livro` (textos com `DEFAULT ''`, listas
com `CHECK` e `NULL` permitido). O **Humor** vira `livro_humor (livro_id,
humor)`, com chave primária composta, `CHECK` da lista e `ON DELETE CASCADE`,
seguindo o padrão de `livro_subgenero`. Alternativa descartada: guardar o humor
numa coluna separada por vírgulas — impediria o `CHECK` por valor e a consulta
por humor.

**D2 — Humor múltiplo, resto único.** Decisão do usuário: um livro pode ter
**Ironia** e **Sátira** ao mesmo tempo. Narrador, Tom, Tempo, Estilo e Ritmo são
listas fechadas de um valor. A UI usa chips de múltipla seleção só no Humor e
`<select>` nos demais.

**D3 — Tudo no mesmo `Livro`, listagem enxuta.** Os campos novos entram no struct
`Livro` com `#[serde(default)]`, e `salvar_livro`/`obter_livro` continuam sendo
os únicos comandos. `listar_livros` devolve os campos novos vazios/sem valor —
a busca de Meus Livros chama a listagem a cada tecla e os cards não usam esses
dados. **Armadilha:** enviar a `salvar_livro` um objeto vindo de `listar_livros`
apagaria os campos; a edição sempre parte de `obter_livro`.

**D4 — Extrair `DadosLivro.jsx` de `TelaLivro.jsx`.** Com seis abas, o formulário
não cabe mais dentro de `TelaLivro`. O componente passa a ter o estado do
formulário, a aba ativa e o `Salvar`, e `TelaLivro` só monta a casca e a seção.
Dentro do novo arquivo, cada aba é um componente pequeno (`AbaSinopse`,
`AbaTema`, …) e os campos repetitivos usam helpers (`CampoTexto`, `CampoLista`,
`SelecaoMultipla`). Alternativa descartada: deixar tudo em `TelaLivro` — o
arquivo passaria de 800 linhas e misturaria casca com formulário.

**D5 — Listas fechadas vêm do back-end.** `listas_livro` passa a devolver
`narradores`, `tons`, `tempos`, `humores`, `estilos` e `ritmos`, na ordem do
requisito. O front-end não duplica valores; o `CHECK` do SQLite é a garantia
final.

**D6 — Validação em duas camadas com códigos estáveis.** O domínio recusa valor
fora das listas com `CodigoErro::OpcaoNarrativaInvalida` (Narrador, Tom, Tempo,
Estilo e Ritmo) e `CodigoErro::HumorInvalido` (Humor). Os testes verificam o
código, não o texto.

**D7 — Verificação em dois níveis.** Os testes Rust cobrem migração v9 → v10,
gravação/releitura dos campos, humor múltiplo e recusa de valores inválidos. O
`verificar-rf013.mjs` dirige o app real para as seis abas, os tipos de campo, as
listas, o humor múltiplo, a gravação, a reabertura e a preservação entre abas. O
`verificar-rf012.mjs` deixa de exigir exatamente duas abas: confere que **Dados
Gerais** e **Resumo** são as duas primeiras.

## Risks / Trade-offs

- **Objeto de listagem não serve para salvar** → `listar` devolve os campos
  novos vazios; a edição sempre carrega o registro completo por `obter_livro`
  (D3). O verificador salva e relê pela página, que usa `obter`.
- **Muitas colunas em `livro`** → treze colunas novas, todas escalares e
  opcionais. Se o domínio crescer, os textos podem migrar para uma tabela
  própria; hoje não há benefício em fragmentar.
- **Nuvem de Palavras é texto** → o requisito pede texto médio, não uma
  visualização. Nenhuma biblioteca de gráficos é adicionada.
- **Rótulo longo da aba** → **Voz Narrativa/Tom/Tempo** pode quebrar em telas
  estreitas; o `.booktabs__nav` já usa `flex-wrap`.
- **Spec do RF012 muda** → o delta do `book-workspace` usa `MODIFIED` no
  requisito do Tab Panel e no requisito de salvar; o `verificar-rf012.mjs`
  precisa acompanhar.

## Migration Plan

1. Migração **v10** aditiva em `banco/migracoes.rs`, depois da v9; nenhum passo
   publicado é editado.
2. `livro.rs` passa a ler e gravar os campos novos e o humor; `obter` devolve
   tudo e `listar` devolve vazio/sem valor (D3).
3. Bancos existentes migram na subida; não há rollback destrutivo. Um build
   anterior ignora as colunas e a tabela novas, porque os `SELECT` são por nome.

## Open Questions

Nenhuma pendente. A decisão de Humor múltiplo foi confirmada com o usuário;
outras abas, exportação e visualização de nuvem de palavras ficam para
requisitos posteriores.
