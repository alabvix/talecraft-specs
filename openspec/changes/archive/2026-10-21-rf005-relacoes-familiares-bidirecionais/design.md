# Design — RF005: relações familiares, bidirecionalidade e árvore familiar

## Context

O RF004 entregou o domínio de personagens com duas tabelas em `banco.rs`
(migração v2) e o domínio em `personagem.rs`:

```sql
CREATE TABLE relacao_personagem (
    id, origem_id, destino_id, tipo,
    CHECK (tipo IN (8 valores)),
    CHECK (origem_id <> destino_id),
    UNIQUE (origem_id, destino_id)
);
```

Com a semântica fixada no RF004 (decisão D4): **a relação é direcionada** —
`origem → destino` com um `tipo` lido como *"a origem tem o tipo em relação ao
destino"* (por exemplo, `Ofélia → Esther : Filho/Filha` = "Ofélia é filha de
Esther"). Nada é gravado na volta.

O RF005 revoga a D4 e pede três coisas: dois tipos novos (`Irmão/Irmã` e
`Aprendiz`), **bidirecionalidade para todos os tipos** (com tabela de espelho) e
o quadro **Família** com a árvore familiar.

Duas restrições do esquema atual atrapalham:

1. O `CHECK (tipo IN (...))` da v2 é uma **lista fechada de oito valores**. O
   SQLite **não permite alterar um `CHECK`** com `ALTER TABLE` — é preciso
   recriar a tabela.
2. O `UNIQUE (origem_id, destino_id)` **permite** gravar as duas arestas de um
   par, mas **não obriga** que venham juntas. Nada no banco garante o par.

O restante do RF004 (pessoa, retrato, busca, temas) permanece.

## Goals / Non-Goals

**Goals:**

- Lista fechada de **dez** tipos, com o par de espelho definido para cada um.
- **Toda** gravação de relação grava o **par espelhado**, de forma **atômica**
  (as duas arestas ou nenhuma).
- Recusa de **ciclo de ascendência** com mensagem útil.
- Quadro **Família** no detalhe, **abaixo** das Relações Globais, desenhando a
  árvore em SVG a partir das relações familiares.
- Migração **v3 aditiva** sobre bancos do RF004, sem perda de dados.
- Ler a árvore no back-end (uma leitura só, já montada) — o front-end não
  reconstrói parentesco.

**Non-Goals:**

- Excluir personagens (continua fora de escopo, como no RF004).
- Vínculo personagem ↔ livro, arco por livro, curva de arco.
- Editar a árvore por arrastar-e-soltar (a árvore é **somente leitura**).
- Normalizar as relações já gravadas pelo RF004 em pares (ver *Migration Plan*).
- Dedução de parentesco: irmandade só vale se **declarada**.

## Decisions

### D1 — Migração v3 recria `relacao_personagem` com o `CHECK` novo

O `CHECK` de tipos é uma lista fechada e o SQLite não o altera no lugar. A v3
faz o procedimento padrão de "novo esquema":

```sql
PRAGMA foreign_keys=OFF;               -- dentro da transação da migração
CREATE TABLE relacao_personagem_novo (
    id, origem_id, destino_id, tipo,
    CHECK (tipo IN (10 valores)),      -- acrescenta 'Irmão/Irmã', 'Aprendiz'
    CHECK (origem_id <> destino_id),
    UNIQUE (origem_id, destino_id)
);
INSERT INTO relacao_personagem_novo SELECT id, origem_id, destino_id, tipo
    FROM relacao_personagem;
DROP TABLE relacao_personagem;
ALTER TABLE relacao_personagem_novo RENAME TO relacao_personagem;
```

**Alternativas consideradas:**

| Alternativa | Por que não |
|---|---|
| Recriar a tabela via `rusqlite_migration` só com `ALTER TABLE` | SQLite não altera `CHECK` |
| Tirar o `CHECK` e validar só no Rust | Perde a garantia no banco, que o RF004 fixou de propósito |
| Guardar uma tabela só de tipos e usar FK | Mais estrutura do que o requisito pede; o RF005 não introduz catálogo de tipos |

A lista dos dez tipos passa a viver em `TIPOS_RELACAO` (`banco.rs`), agora com
**dez** entradas, e o `CHECK` da v3 é escrito com os mesmos valores. Um teste
garante que a constante e o `CHECK` concordam.

**Risco:** o `DROP TABLE` perde dados se o `INSERT` falhar no meio. Mitigação: o
`rusqlite_migration` roda cada passo em **transação** — ou o passo inteiro
confirma, ou nada é aplicado. Coberto pelo teste de migração v2 → v3 com dados.

### D2 — Espelhamento na mesma transação, com tabela fixa no Rust

A tabela de espelho é uma função pura no Rust (não no banco):

| Tipo gravado na ida | Tipo gravado na volta |
|---|---|
| `Filho/Filha` | `Mãe/Pai` |
| `Mãe/Pai` | `Filho/Filha` |
| `Mentor` | `Aprendiz` |
| `Aprendiz` | `Mentor` |
| `Rival`, `Inimigo`, `Aliado`, `Irmão/Irmã`, `Cônjuge`, `Namorado` | ele mesmo |

`salvar_relacao` passa a:

1. validar o tipo na lista dos dez;
2. validar `origem_id <> destino_id`;
3. **se o tipo for `Filho/Filha` ou `Mãe/Pai`**, verificar ciclo (D3);
4. abrir **uma transação** e gravar as **duas** arestas com `INSERT … ON
   CONFLICT (origem_id, destino_id) DO UPDATE SET tipo = excluded.tipo`.

Assim "gravar A→B" sempre resulta no par coerente. Regravar o mesmo par
**atualiza as duas arestas** — atende ao RF005-CA006 sem lógica extra, porque as
duas passam pelo mesmo `UPSERT`.

**Por que transação:** sem ela, uma falha entre as duas gravações deixaria meia
relação. Com ela, o par é tudo ou nada. `rusqlite::Connection::transaction`
exige `&mut Connection`; `salvar_relacao` muda de `&Connection` para
`&mut Connection` (o comando Tauri já obtém o `MutexGuard`, que é mutável).

**Alternativa considerada:** gravar a aresta espelhada por um `TRIGGER` no
SQLite — dispensaria código Rust, mas esconderia a regra no esquema e o RF005
pede a tabela de espelho **explícita** na regra de negócio. Ficou no Rust.

### D3 — Detecção de ciclo por subida de ascendentes (só nas familiares)

Um ciclo de ascendência só pode nascer das arestas `Filho/Filha` /`Mãe/Pai`
(`Irmão/Irmã` e `Cônjuge` são simétricos e não criam ordem). Então:

- a checagem roda **apenas** quando o tipo é `Filho/Filha` ou `Mãe/Pai`;
- ao pedir `A é Filho/Filha de B`, o código sobe a cadeia de **ascendentes de B**
  (via `Mãe/Pai` gravado, isto é, as linhas `B → X : Mãe/Pai`, que por espelho
  significam "B é filho de X") e, se **A** aparecer nessa cadeia, recusa.

Isso cobre o ciclo direto (A filho de B, tentar B filho de A) e o indireto (A
filho de B, B filho de C, tentar C filho de A) em uma única varredura, com um
`HashSet` de visitados para não entrar em laço se já houver um ciclo antigo.

**Ponto importante:** a checagem acontece **antes** da gravação, então as
relações já gravadas pelo RF004 (que podem ter ciclos, já que não havia a regra)
não são tocadas — a regra vale para gravações **novas**. A árvore, por sua vez,
usa o mesmo `HashSet` de visitados e **não entra em laço** mesmo com um ciclo
antigo (RF005-CA014, "sem quebrar a tela").

### D4 — A árvore é montada no **back-end** e devolvida pronta

Comando novo `arvore_familiar(personagem_id)` devolve uma estrutura já
posicionada:

```rust
struct NoArvore { id: Option<i64>, nome: String, geracao: i32, ordem: i32,
                  papel: String /* eu | ascendente | descendente | irmao |
                                   conjuge | desconhecido */,
                  retrato: Option<String> }
struct Ligacao { de: usize, para: usize, tipo: LigacaoTipo /* filho | uniao */ }
struct ArvoreFamiliar { nos: Vec<NoArvore>, ligacoes: Vec<Ligacao> }
```

**Por quê no Rust:** o front-end não deve montar parentesco (regra do projeto: o
React não fala com o domínio além dos comandos). O Rust já tem as relações, o
`HashSet` anti-ciclo e o teste unitário. O React só desenha.

**Algoritmo:**

1. Carrega todas as relações familiares do personagem (as que tocam o id, em
   qualquer sentido) — `Filho/Filha`, `Mãe/Pai`, `Irmão/Irmã`, `Cônjuge`.
2. **Ascendentes:** sobe por `Mãe/Pai` (isto é, por espelho, `X → eu :
   Filho/Filha` significa "eu sou filho de X"), gerando `geracao` negativa
   conforme a distância.
3. **Descendentes:** desce por `Filho/Filha` (`eu → X : Filho/Filha` = "X é filho
   meu"), `geracao` positiva.
4. **Irmãos:** une os nós declarados `Irmão/Irmã` do personagem no nível 0,
   `ordem` crescendo para ficarem lado a lado.
5. **Cônjuges:** nível 0, ao lado do personagem, com uma **ligação de união**.
6. **Ascendente ausente:** se os irmãos de nível 0 não têm `Mãe/Pai` cadastrado,
   acrescenta **um** nó com `id: None` e `nome: "?"`, na geração −1, ligado a
   cada irmão — atendendo ao CA011 sem repetir o "?" por irmão.
7. **Filhos do casal:** os descendentes são ligados ao **casal** quando há
   cônjuge (ligação `filho` saindo do nó de união), como pede o CA012.

A árvore é **somente leitura** e o quadro Família mostra estado vazio quando não
há nenhuma relação familiar (CA014).

### D5 — Desenho em SVG inline no React, posicionado por geração

O componente novo `ArvoreFamiliar.jsx` recebe o `ArvoreFamiliar` e desenha um
`<svg viewBox="...">` — mesmo padrão dos gráficos do protótipo — com:

- colunas por `ordem`, linhas por `geracao`;
- retângulo por nó com o **retrato** (quando houver) e o **nome**;
- nó `desconhecido` desenhado com o rótulo **"?"** e estilo esmaecido;
- linhas de **filho** (cotovelo) e de **união** (horizontal entre cônjuges);
- `viewBox` calculado pelo número de colunas/linhas, `preserveAspectRatio` para
  caber no quadro; o tamanho vem da **classe CSS**, sem largura fixa.

Estilos novos entram em `src/personagens.css` usando **só tokens de tema**
(`--bg-raised`, `--border`, `--text-dim`, `--accent`), para acompanhar os três
temas (CA016). Sem biblioteca nova.

### D6 — `ModalRelacoes` passa a listar dez tipos

O `ModalRelacoes.jsx` hoje preenche o `<select>` com os oito tipos; passa a usar
a lista devolvida pelo comando `listar_tipos_relacao` (que lê `TIPOS_RELACAO`),
com **dez** entradas. O painel de Relações Globais não muda de código: como o
back-end grava o par espelhado, a lista do personagem já exibe **o lado dele**
(na página de Ofélia aparece "Esther — Mãe/Pai"; na de Esther, "Ofélia —
Filho/Filha").

## Risks / Trade-offs

| Risco | Mitigação |
|---|---|
| A v3 recriar a tabela e perder dados | O passo roda em transação do `rusqlite_migration`; teste `banco_v2_migra_para_v3_sem_perder_dados` grava personagens + relações na v2 e confere depois |
| Relações gravadas no RF004 ficam **unilaterais** (não têm par) | Aceito por decisão: a bidirecionalidade vale para gravações **novas**. A árvore lê as duas arestas em qualquer sentido, então uma relação unilateral antiga ainda aparece na linhagem |
| Laço infinito na árvore por ciclo antigo | `HashSet` de visitados em toda varredura |
| `salvar_relacao` passa a exigir `&mut Connection` | O comando já tem o `MutexGuard`; ajuste localizado em `lib.rs` |
| Muitos nós deixam a árvore larga demais | O SVG usa `viewBox` + `preserveAspectRatio` e rola dentro do quadro; não é objetivo do requisito otimizar layout de famílias enormes |
| Texto do nó "?" repetido por irmão | Um único nó "?" por grupo, ligado a cada irmão (D4, passo 6) |

## Migration Plan

1. Acrescentar o passo **v3** em `migracoes()` (`banco.rs`), sem tocar na v1 e na
   v2 — o `rusqlite_migration` aplica só o que falta.
2. `TIPOS_RELACAO` passa de 8 para 10 (acrescenta `Irmão/Irmã` e `Aprendiz`).
3. `personagem.rs`: tabela de espelho, `salvar_relacao` transacional com o par,
   detecção de ciclo e o construtor da árvore.
4. `lib.rs`: registrar os comandos novos (`arvore_familiar`,
   `listar_tipos_relacao`) e ajustar `salvar_relacao` para `&mut Connection`.
5. Front-end: `personagensApi.js`, `ModalRelacoes.jsx`, `TelaPersonagem.jsx`,
   `ArvoreFamiliar.jsx`, `personagens.css`.

**Rollback:** o banco migrado para v3 continua legível pelo código do RF004
(o `CHECK` novo é mais permissivo e o `UNIQUE` é o mesmo), mas o **binário** do
RF005 é o único que grava o par espelhado. Reverter o código sem reverter o
banco não corrompe dados; só deixa de espelhar.

## Open Questions

Nenhuma pendente: as decisões de produto do RF005 (semântica da aresta,
bidirecionalidade para todos os tipos, Mentor ⇄ Aprendiz, irmandade declarada,
nó "?", linhagem completa, Cônjuge como parceiro) foram fechadas com o usuário
antes da escrita do requisito.
