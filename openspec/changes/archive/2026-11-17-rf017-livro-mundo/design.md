# Design — RF017 Livros: mundos associados e Worldbuilding do livro

## Contexto

O RF017 liga o livro aos mundos globais do RF007 e abre a seção
**Worldbuilding** do livro, que o RF011 deixou como tela informativa. As
entradas continuam pertencendo ao mundo (RF008); o livro só as usa. O capítulo
já tem a coluna `cenario_localidade_id` (v14), validada apenas contra a
existência da localidade — o RF017 acrescenta a validação de que ela pertence a
um mundo associado ao livro.

## Decisões

### D1 — Tabela `livro_mundo` na migração v17

`livro_mundo (livro_id, mundo_id, ordem, criado_em)` com:

- `PRIMARY KEY (livro_id, mundo_id)` — a duplicidade é recusada pelo banco;
- `FOREIGN KEY (livro_id) REFERENCES livro(id)` e
  `FOREIGN KEY (mundo_id) REFERENCES mundo_global(id)`;
- `ordem INTEGER NOT NULL` — ordem de associação, usada pelas abas;
- índice por `mundo_id` — a leitura inversa (livros que usam o mundo) é o
  caminho do painel **Vínculos com livros**.

Passo **aditivo**: cria só a tabela nova; `livro` e `capitulo` não são
recriados porque não há `CHECK` novo nem coluna nova em tabela existente nesta
entrega.

### D2 — Módulo próprio `livro_mundo.rs`

Segue o padrão do RF014 (`livro_personagem.rs`): SQL e regras no módulo de
domínio; `lib.rs` só injeta a conexão via `com_conexao`/`com_conexao_mut`.
Structs com `serde(rename_all = "camelCase")`:

- `MundosDoLivro { mundos: Vec<MundoDoLivro>, total_entradas }` — alimenta a
  seção, o subtítulo do menu e o Painel;
- `MundoDoLivro { mundo_id, nome, tipo_mundo, nivel_tecnologico, generos,
  descricao, imagem, ordem, total_entradas, contagens }` — resumo somente
  leitura + contadores por categoria;
- `ListaMundosParaLivro { itens, total, pagina, por_pagina }` com
  `MundoParaLivro { id, nome, tipo_mundo, nivel_tecnologico, generos, imagem,
  ja_associado }`;
- `RelatorioMundos { associados, ja_associados }`;
- `RelatorioRemocaoMundo { capitulos_limpos }`;
- `LivroDoMundo { livro_id, livro_titulo }`;
- `MundoComLocalidades { mundo_id, mundo_nome, localidades: Vec<LocalidadeResumo> }`.

### D3 — Seis comandos novos (62 no `invoke_handler`)

| Comando | Uso |
|---|---|
| `listar_mundos_do_livro` | Seção Worldbuilding, subtítulo do menu e Painel |
| `listar_mundos_para_livro` | Modal **Associar mundos** (busca + 12 por página) |
| `associar_mundos_ao_livro` | Criação em lote, com relatório |
| `remover_mundo_do_livro` | Remoção + limpeza de cenários |
| `listar_livros_do_mundo` | Painel **Vínculos com livros** do mundo |
| `listar_localidades_do_livro` | Select agrupado do **Cenário Worldbuilding** |

As entradas continuam lendo/gravando por `listar_entradas_mundo` e
`salvar_entrada_mundo` (RF008), agora com o `mundo_id` da aba ativa — não há
comando novo de entrada.

### D4 — Ordem de associação sem reordenação

`ordem = MAX(ordem) + 1` por livro dentro da transação de associação. Não há
interface de reordenação neste requisito; a ordem só cresce. A leitura ordena
por `ordem` e a primeira aba é a de menor `ordem`.

### D5 — Remoção transacional limpa cenários

`remover_mundo_do_livro(livro_id, mundo_id)`:

1. confere livro salvo e mundo existente;
2. confere que a associação existe (`VinculoNaoEncontrado`);
3. `UPDATE capitulo SET cenario_localidade_id = NULL ... WHERE livro_id = ?
   AND cenario_localidade_id IN (SELECT id FROM localidade WHERE mundo_id = ?)`,
   guardando as linhas afetadas;
4. `DELETE FROM livro_mundo WHERE livro_id = ? AND mundo_id = ?`;
5. devolve `capitulos_limpos`.

Tudo numa transação: ou a associação e os cenários saem juntos, ou nada muda.
O mundo, as entradas e os demais livros não são tocados (RF017-RN005).

### D6 — Cenário validado no domínio e agrupado na interface

`capitulo::salvar` passa a exigir que a localidade escolhida pertença a um mundo
associado ao livro. Novo `CodigoErro::CenarioForaDoLivro`, verificado por testes
de código (não por texto). A interface agrupa por mundo com `<optgroup>`, usando
`listar_localidades_do_livro` — uma chamada só, sem paginação, porque o select
precisa de todas as localidades dos mundos do livro.

### D7 — Modelos de leitura para cards, Painel e métricas

- `livro::listar` e `livro::obter` ganham `mundos: Vec<String>` (nomes na ordem
  de associação) com `#[serde(default)]`; o payload de `salvar_livro` continua
  válido e o campo é ignorado na gravação.
- `listar_mundos_do_livro` devolve `total_entradas` somando as seis categorias
  dos mundos do livro; o Painel usa esse número na métrica e no módulo.
- `livro::estatisticas` conta **Entradas de worldbuilding** apenas nos mundos
  associados a algum livro:
  `SELECT COUNT(*) FROM (localidade UNION ALL raca_povo ... ) WHERE mundo_id IN
  (SELECT mundo_id FROM livro_mundo)`.
- As categorias e os contadores vêm de `MundoDoLivro.contagens`, calculados no
  Rust com `GROUP BY mundo_id`/`COUNT(*)` por tabela, sem N+1 por categoria.

### D8 — Front-end da seção Worldbuilding

- `TelaWorldbuildingLivro.jsx`: `PainelAbas` com uma aba por mundo; cada aba
  mostra o resumo somente leitura e as seis categorias em sub-abas. As tabelas
  reusam `TabelaEntradas` com a nova prop `somenteCriacao` (esconde **Editar** e
  mantém **Novo(a) …** e a paginação). Criar chama a modal do RF008 com o
  `mundo_id` da aba e recarrega a tabela.
- `ModalSelecaoMundos.jsx`: grade paginada de 12 com busca e seleção múltipla
  mantida entre páginas — mesmo desenho de `ModalSelecaoPersonagens`, com selo
  **Já associado** e contagem no rodapé.
- `livroMundosApi.js`: chamadas aos seis comandos.
- `TelaLivro` passa a renderizar a seção, guarda o resumo dos mundos para o
  subtítulo do menu e para o Painel e expõe `aoAbrirMundo` (vindo do `App`)
  para o **Abrir mundo**.
- `PainelCapitulo` recebe `mundos` (agrupado por mundo) e substitui o aviso fixo
  do select.

### D9 — Mundo: vínculos com livros

`TelaMundo` carrega `listar_livros_do_mundo` e substitui o corpo vazio do painel
retrátil pela lista de títulos clicáveis. O `App` passa `aoAbrirLivro` para
`TelaMundos`/`TelaMundo`; o clique fecha o nível raiz e abre a página do livro
(mesmo callback já usado pela ficha do personagem).

### D10 — Contagens e estados vazios

- Livro sem mundos: métrica e módulo **Worldbuilding** em 0, seção com estado
  vazio e **Sem mundo** nos cards.
- Livro não salvo: **Associar mundos** desabilitado; back-end recusa com
  `LivroNaoSalvo` (`Option<i64>`, como no RF014).
- Categoria sem entradas: tabela vazia com orientação; nenhum dado fictício.

### D11 — Validação

- Testes Rust: migração v17 (v16 → v17 sem perda e recusa de duplicidade),
  associação em lote com ordem e relatório, remoção com limpeza de cenários,
  cenário fora do livro, listagem dos mundos do livro, localidades agrupadas,
  livros do mundo e métricas.
- `scripts/verificar-rf017.mjs` no app real (CDP + banco isolado por
  `TALECRAFT_DADOS`), cobrindo a seção, as abas, a associação múltipla, o selo
  **Já associado**, busca/paginação, estado vazio, aba somente leitura, criação
  de entrada, remoção com limpeza, cenário agrupado, vínculos do mundo e
  métricas. Ajustes em `verificar-rf007.mjs` (painel de vínculos),
  `verificar-rf011.mjs` (métrica real) e `verificar-rf015.mjs` (cenário com
  opções).

## Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Capítulo apontando para localidade de mundo removido | Limpeza na mesma transação da remoção (D5) e validação no salvar (D6) |
| `listar_entradas_mundo` paginado a 10 limitar a tabela | A tabela da seção usa a paginação existente do RF008, não o select; o select usa `listar_localidades_do_livro` sem paginação |
| Cards de Meus Livros com N+1 de mundos | Uma subconsulta/`GROUP_CONCAT` no Rust para os nomes, na mesma consulta da listagem |
| Reuso indevido de mundo entre livros | O vínculo é N:N; remover de um livro não altera o mundo nem os outros livros (teste dedicado) |
| Verificadores antigos esperando "0 em worldbuilding" | Ajustar as expectativas para os valores reais, como já ocorreu no RF014/RF015 |
