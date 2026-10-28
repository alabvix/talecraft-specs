## Context

O RF011 deixou a página **Dados do Livro** com uma única aba, **Dados Gerais**, e
com o botão **Descartar** ao lado de **Salvar**. O Tab Panel (`PainelAbas.jsx`)
já foi desenhado para receber novas abas e o livro já é uma entidade persistida
com leitura (`obter_livro`) e gravação (`salvar_livro`).

O RF012 acrescenta a segunda aba, **Resumo**, com dois textos longos que
pertencem ao registro do livro, e remove o **Descartar**. O padrão de migração
aditiva, domínio Rust, comando Tauri existente e verificação por CDP contra o
app real continua valendo.

## Goals / Non-Goals

**Goals:**

- Persistir **Resumo** e **Final do Livro** no registro do livro, pela migração
  **v9** aditiva.
- Exibir a aba **Resumo** depois de **Dados Gerais**, com os dois campos como
  texto longo, opcionais e com quebras de linha preservadas.
- Gravar os campos das duas abas com o mesmo **Salvar**, na mesma transação.
- Preservar a edição pendente ao alternar entre as abas.
- Remover o botão **Descartar** e o fluxo **RF011-FL005**, sem ação equivalente.

**Non-Goals:**

- Exibir o resumo no card de Meus Livros, no Painel do Livro ou na exportação.
- Outras abas de Dados do Livro (temas, pontos de conflito, voz narrativa).
- Importação `.pdc`, exclusão de livro e edição parcial por campo.
- Comandos Tauri novos.

## Decisions

**D1 — Migração v9 com `ALTER TABLE ... ADD COLUMN`.** As duas colunas são
`TEXT NOT NULL DEFAULT ''`; o SQLite aceita a adição direta porque não há
`CHECK` nem chave estrangeira novas, e os livros existentes ganham texto vazio
sem recriar a tabela. Alternativa descartada: recriar `livro` como na v8 — só é
necessário quando se altera um `CHECK`.

**D2 — Os textos moram no `Livro` e usam os comandos existentes.**
`salvar_livro` e `obter_livro` já transportam o registro completo; os campos
`resumo` e `final_livro` entram no struct `Livro` com `#[serde(default)]`. Não
há comando novo nem tabela filha: os textos são atributos 1:1 do livro.
Alternativa descartada: tabela `livro_texto` — acrescentaria junção e transação
sem benefício para dois campos escalares.

**D3 — `obter` traz os textos; `listar` não.** A busca de Meus Livros chama
`listar_livros` a cada tecla digitada; carregar resumos e finais longos em toda
listagem cresceria o IPC sem uso na tela. `listar` devolve `resumo` e
`final_livro` vazios, e a edição sempre parte de `obter_livro` (o caminho que
`TelaLivro` já usa). **Armadilha:** nunca enviar a `salvar_livro` um objeto vindo
de `listar_livros` — os textos seriam apagados; o verifier cobre a leitura
completa.

**D4 — Uma única forma para as duas abas.** A aba ativa vira estado local de
`DadosLivro`; o formulário (`form`) já vive ali e é o mesmo para as duas abas. O
conteúdo de cada aba é renderizado condicionalmente dentro do mesmo
`PainelAbas`, então trocar de aba não desmonta o estado do formulário nem perde
a edição pendente (RF012-RN004). Alternativa descartada: um estado por aba —
duplicaria o formulário e as validações.

**D5 — Somente `Salvar`.** O botão **Descartar** e a máquina de alterações
pendentes (`ultimoSalvo`/`mesmosDados`) saem de `DadosLivro` e de
`livrosApi.js`. Para abandonar alterações, o escritor sai da página do livro sem
salvar, como já acontece com o rascunho do RF011-RN008. Alternativa descartada:
manter um botão **Reverter** — seria o **Descartar** com outro nome, revogado
pelo requisito.

**D6 — Verificação em dois níveis.** Os testes Rust cobrem a migração v8 → v9, a
leitura/gravação dos textos e a preservação dos campos existentes. O
`verificar-rf012.mjs` dirige o app real para as abas, os dois campos, a
preservação entre abas, a gravação, a reabertura e a ausência do **Descartar**;
o `verificar-rf011.mjs` perde a verificação do **Descartar** (30 → 29).

## Risks / Trade-offs

- **Objeto de listagem não serve para salvar** → `listar` devolve textos vazios;
  a edição sempre carrega o registro completo por `obter_livro` (D3). O
  `verificar-rf012.mjs` salva e relê pela página, que usa `obter`.
- **Remover o Descartar reduz a rede de segurança** → a página já não grava
  nada até **Salvar**; sair do livro descarta o rascunho (RF011-RN008), e a
  mensagem de sucesso continua indicando quando os dados foram gravados.
- **Textos longos sem limite podem pesar no banco** → o requisito não define
  limite; o SQLite armazena `TEXT` sem problema. Se um requisito futuro criar
  métricas ou exportação com o resumo, o custo será tratado lá.
- **Spec consolidada do RF011 muda** → o delta usa `MODIFIED` no requisito do
  Tab Panel; o cenário do **Descartar** sai e o cenário da aba **Resumo** entra.
- **Verificador do RF011 quebra de propósito** → a checagem "Descartar
  restaura…" é removida; a ausência do botão passa a ser verificada no RF012.

## Migration Plan

1. Migração **v9** aditiva em `banco/migracoes.rs`, depois da v8; nenhum passo
   publicado é editado.
2. `livro.rs` passa a ler e gravar `resumo` e `final_livro`; `obter` devolve os
   textos e `listar` devolve texto vazio (D3).
3. Bancos existentes migram na subida; não há rollback destrutivo. Um build
   anterior ignora as colunas novas, porque os `SELECT` são por nome.

## Open Questions

Nenhuma pendente. Outras abas de Dados do Livro, exibição do resumo fora da aba
e exportação continuam em requisitos posteriores.
