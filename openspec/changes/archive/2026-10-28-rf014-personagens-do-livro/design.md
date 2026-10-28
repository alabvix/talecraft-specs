## Context

O RF011 entregou a página do livro com as seções **Personagens**, **Capítulos**,
**Worldbuilding**, **Gráficos** e **Exportar** abrindo uma tela informativa. O
RF014 retira **Personagens** desse grupo: a seção passa a ter domínio próprio,
ligando o livro à biblioteca global de personagens do RF004.

O personagem continua **global** (nome, retrato, biografia, relações). O que
varia de livro para livro é o **vínculo**: papel narrativo, resumo do papel,
papel no mundo, alcunha local e resumo da atuação. O RF014 não altera a ficha
global e não cria remoção de personagem do livro.

Hoje `livro::estatisticas` devolve **0** para **Personagens** e
**Personagens · N em 2+ livros** porque não existe tabela de vínculo; o RF014
passa a contar a tabela nova.

## Goals / Non-Goals

**Goals:**

- Persistir o vínculo livro–personagem na migração **v12** aditiva, com chave
  primária composta, referências, `CHECK` do **Papel** e os campos do vínculo.
- Substituir a tela informativa da seção **Personagens** pela listagem do elenco
  em cards ou lista, com estado vazio e botão **Adicionar Personagens**.
- Permitir associar vários personagens de uma vez, marcando os já associados
  como **Já associado** e sem criar vínculo duplicado.
- Exibir e gravar os cinco campos do vínculo em modal própria, com os dados
  globais somente leitura.
- Fazer as métricas **Personagens** e **Personagens · N em 2+ livros** refletirem
  os vínculos reais, mantendo **0** quando não houver nenhum.

**Non-Goals:**

- Desvincular ou remover personagens do livro.
- Editar a ficha global dentro da modal, inclusive relações familiares.
- Criar personagem a partir da seção do livro.
- Mostrar o elenco em Meus Livros, no Painel do Livro ou na exportação.
- Ordenar manualmente o elenco, buscar ou filtrar dentro da modal de seleção.
- Capítulos, associação livro–mundo, gráficos e exportação de livro.

## Decisions

**D1 — Migração v12 aditiva com a tabela `livro_personagem`.** A tabela usa o
par como chave primária:

```sql
CREATE TABLE livro_personagem (
    livro_id        INTEGER NOT NULL REFERENCES livro(id),
    personagem_id   INTEGER NOT NULL REFERENCES personagem_global(id),
    papel           TEXT NOT NULL DEFAULT 'Não definido'
                    CHECK (papel IN ('Não definido','Protagonista',
                    'Antagonista','Coadjuvante','Aliado',
                    'Falso Antagonista','Falso Protagonista')),
    resumo_papel    TEXT NOT NULL DEFAULT '',
    papel_no_mundo  TEXT NOT NULL DEFAULT '',
    alcunha         TEXT NOT NULL DEFAULT '',
    resumo_atuacao  TEXT NOT NULL DEFAULT '',
    PRIMARY KEY (livro_id, personagem_id)
);
CREATE INDEX idx_livro_personagem_personagem
    ON livro_personagem(personagem_id);
```

O valor vazio é a string `'Não definido'`, não `NULL`: mantém o `CHECK` simples
e o `papel` sempre preenchido na leitura. A PK composta é o backstop da
duplicidade; o índice por personagem serve às métricas de 2+ livros. Nenhum
passo da v1 à v11 é editado. Alternativa descartada: coluna `personagens` em
`livro` — impediria o `CHECK` por papel e os campos do vínculo.

**D2 — Módulo de domínio próprio, separado de `livro.rs` e `personagem.rs`.** O
vínculo não pertence nem ao livro nem ao personagem global; fica em
`src-tauri/src/livro_personagem.rs`, com testes em
`src-tauri/src/livro_personagem/testes.rs`. O struct de leitura do elenco é
enxuto (`personagemId`, `nome`, `retrato`, `papel`) e o de detalhe carrega os
dados globais completos mais os campos do vínculo (D5). `livro.rs` só ganha a
contagem em `estatisticas` (D7), sem SQL de vínculo espalhado.

**D3 — Seis comandos Tauri, todos no `invoke_handler`.** Seguindo o padrão de
facções e relações:

- `listar_personagens_do_livro(livro_id)` — elenco do livro para os cards/lista.
- `listar_personagens_para_livro(livro_id)` — biblioteca global com o selo
  `jaAssociado`, para a modal de seleção.
- `associar_personagens_ao_livro(livro_id, personagem_ids)` — associação em
  lote, dentro de uma transação, devolvendo o relatório (D4).
- `obter_personagem_do_livro(livro_id, personagem_id)` — dados globais
  completos + campos do vínculo para a modal de detalhe.
- `salvar_personagem_do_livro(vinculo)` — grava somente os campos do vínculo
  (D6).
- `listar_papeis_personagem_livro()` — os seis valores + **Não definido**, na
  ordem do requisito.

São **48 comandos** no total (42 atuais + 6). Alternativa descartada: embutir a
lista de papéis em `listas_livro` — misturaria o formulário de Dados do Livro
com o domínio do elenco.

**D4 — Duplicidade é relatório, não erro fatal.** A associação em lote valida o
livro, valida cada personagem, consulta os vínculos existentes e insere somente
os novos numa transação, devolvendo
`RelatorioAssociacao { associados: Vec<i64>, jaAssociados: Vec<i64> }`. O
front-end fecha a modal, atualiza a lista e, se `jaAssociados` não estiver
vazio, mostra a mensagem informando quais já estavam no livro. Se todos os
selecionados já estiverem associados, nada é gravado e a mensagem aparece do
mesmo jeito. A PK composta garante que nem um caminho alternativo crie o
segundo vínculo. Sem seleção, o domínio recusa com
`CodigoErro::NenhumPersonagemSelecionado`. Alternativa descartada: abortar o
lote inteiro no primeiro duplicado — impediria associar os novos da mesma
seleção (RF014-FL002).

**D5 — Leitura de detalhe é separada da listagem.** O card precisa de retrato,
nome e papel; a modal precisa de todos os dados globais. Repetir a biografia e
os campos longos em cada item da listagem seria desperdício. Por isso
`obter_personagem_do_livro` devolve o registro completo; clicar no card carrega
o detalhe por id antes de abrir a modal — o mesmo cuidado do RF009 com
`obter_faccao`.

**D6 — Associar e salvar são operações distintas.** `associar` só cria vínculos
com papel **Não definido** e campos vazios; `salvar` só atualiza um vínculo
existente, conferindo as linhas afetadas. Um `UPDATE` sem linha devolve
`CodigoErro::VinculoNaoEncontrado`; a modal não cria vínculo por engano. Uma
falha no `UPDATE` mantém os valores anteriores e a modal aberta. Alternativa
descartada: um único comando `salvar` com `INSERT ... ON CONFLICT` — misturaria
as duas ações e transformaria um id errado em vínculo novo.

**D7 — Métricas a partir da tabela nova.** Em `livro::estatisticas`:

- `personagens` = `COUNT(DISTINCT personagem_id) FROM livro_personagem`;
- `personagens_em_varios_livros` = quantidade de `personagem_id` com
  `COUNT(livro_id) >= 2`;
- `capitulos` e `entradas_mundo` continuam **0**, porque essas tabelas ainda não
  existem.

O `DISTINCT` evita contar duas vezes o mesmo personagem por um join descuidado;
a métrica de 2+ livros usa `GROUP BY ... HAVING COUNT(*) >= 2`. Personagens
globais sem vínculo não entram em nenhuma das duas (RF011-RN017).

**D8 — Front-end reusa o padrão da biblioteca global.** A seção **Personagens**
passa a ser renderizada por `TelaPersonagensLivro.jsx`, no lugar da tela
informativa de `TelaLivro.jsx`. O componente monta:

- cabeçalho com **Adicionar Personagens** e alternância **Cards/Lista** pelo
  radio nativo `.toggle-set--radio` (mesmo padrão de `TelaPersonagens.jsx`);
- estado vazio com orientação;
- `ModalSelecaoPersonagens.jsx` com checkbox por personagem, selo **Já
  associado** e os botões **Associar**/**Fechar**;
- `ModalPersonagemLivro.jsx` com a área **Dados do personagem** (somente
  leitura) e a área **Vínculo com o livro** (editável), com **Salvar** e
  **Fechar**.

Os cards reusam `.libcard` e o helper de retrato de `personagensApi.js`; o
`diretorioDados` chega como prop (a armadilha do RF004 de passar `""` continua
valendo). A API fica em `livroPersonagensApi.js`. Em modo de criação
(`livroId == null`), o botão fica desabilitado com mensagem; o back-end também
recusa associar ou salvar sem livro gravado (`CodigoErro::LivroNaoSalvo`).

**D9 — Verificação em dois níveis.** Os testes Rust cobrem migração v11 → v12,
associação em lote, duplicidade, recusa de papel inválido, atualização do
vínculo sem tocar no personagem global e as duas métricas. O novo
`scripts/verificar-rf014.mjs` dirige o app real com `TALECRAFT_DADOS` e cobre a
seção, o botão, a modal de seleção, a associação múltipla, a duplicidade, os
cards/lista, o detalhe, o papel, a gravação, o **Fechar** sem salvar, o estado
vazio, a ausência de desvincular e as métricas. O `verificar-rf011.mjs` deixa de
esperar tela informativa em **Personagens** e passa a esperar a seção real; os
demais verificadores RF002–RF013 rodam sem alteração.

## Risks / Trade-offs

- **Card com resumo em vez do registro completo** → a modal sempre busca o
  detalhe por id (`obter_personagem_do_livro`, D5); abrir a modal com um resumo e
  salvar apagaria os textos longos.
- **Modal de seleção aberta por muito tempo** → os selos **Já associado** podem
  ficar desatualizados. O relatório de `associar` resolve sem erro: associa os
  novos e informa os ignorados (D4).
- **Papel vazio no banco** → o valor é a string `'Não definido'`, sempre
  preenchida; a UI traduz para o rótulo **Não definido** na listagem.
- **Métricas por join** → usar `DISTINCT` e `HAVING COUNT(*) >= 2` evita contar
  o mesmo personagem duas vezes; teste com um personagem em dois livros e outro
  sem vínculo fixa a regra.
- **Seção em livro não salvo** → o botão fica desabilitado e o back-end recusa;
  não existe livro órfão nem vínculo pendente antes do primeiro **Salvar**.
- **Verificador do RF011** → ele hoje espera a tela informativa em
  **Personagens**; a expectativa muda para a seção real. O RF011 mantém as
  demais checagens.
- **Sem remoção** → o RF014 não cria comando nem ação de desvincular; incluir um
  botão “remover” seria antecipar requisito não escrito.

## Migration Plan

1. Migração **v12** aditiva em `banco/migracoes.rs`, depois da v11, criando
   `livro_personagem` e o índice por `personagem_id`. Nenhum passo publicado é
   editado.
2. `livro_personagem.rs` lê e grava o vínculo; `livro.rs` atualiza
   `estatisticas` (D7); `lib.rs` registra os seis comandos.
3. Bancos v11 migram na subida; livros existentes começam sem elenco. Não há
   rollback destrutivo: um build anterior ignora a tabela nova, porque os
   `SELECT` atuais não a consultam.
4. Front-end: `TelaLivro.jsx` passa a renderizar a seção real; `livros.js` deixa
   de marcar **Personagens** como futura; a API, as duas modais e os estilos
   entram junto.

## Open Questions

Nenhuma pendente. As decisões de escopo — sem remoção, alcunha local
independente, papel como lista fechada de seis valores, dados globais somente
leitura e **Fechar** descartando alterações — foram confirmadas com o usuário.
Capítulos, associação livro–mundo, gráficos e exportação de livro continuam em
requisitos posteriores.
