## Context

O RF011 entregou a seção **Capítulos** como tela informativa. O livro já tem
dados, personagens vinculados (RF014) e um modelo de arco por personagem. O
protótipo `capitulos.html` mostra um quadro Kanban com quatro status e um painel
de detalhe abaixo. Falta o domínio, a persistência e a tela real.

## Goals / Non-Goals

**Goals:**

- Criar, editar e mover capítulos entre os quatro status, com número, título,
  status, tipo, textos de apoio, cenário e personagens do arco.
- Quadro com colunas de tamanho fixo, rolagem interna e ordenação independente
  por Número/Data.
- Painel de edição com **Salvar** no cabeçalho e todos os campos opcionais,
  exceto Número e Status.
- Migração v14 aditiva e métricas reais de capítulos.

**Non-Goals:**

- Excluir capítulos, criar cenas internas, POV separado ou exportar capítulos.
- Desenhar a curva de arco ou implementar a associação livro–mundo.
- Editar o capítulo por modal; a edição é no painel abaixo do quadro.

## Decisions

**D1 — Migração v14 com `capitulo` e `capitulo_personagem`.** O capítulo tem
`livro_id`, `numero` inteiro, status, tipo, textos, cenário e datas; o número é
único por livro (`UNIQUE(livro_id, numero)`). `capitulo_personagem` usa PK
`(capitulo_id, personagem_id)` e um `CHECK` que amarra Evento e Tipo de Evento
(Neutro→Neutro; Ponto de Ligação→Ascensão/Declínio; Ponto de Virada→Apogeu/Queda).
Nenhum passo da v1 à v13 é editado. Alternativa descartada: guardar personagens
em JSON no capítulo — perderia o `CHECK` e a contagem por personagem.

**D2 — Módulo `capitulo.rs` com seis comandos.** `listar_capitulos`,
`obter_capitulo`, `criar_capitulo`, `salvar_capitulo`, `mover_capitulo` e
`listas_capitulo` (55 no total). A criação é separada da gravação: os botões do
quadro criam com o próximo número e o painel só faz `UPDATE`; um id errado nunca
vira capítulo novo.

**D3 — Quadro agrupado e ordenado no front-end.** `listar_capitulos` devolve todos
os capítulos do livro; a tela agrupa por status e ordena cada coluna por
Número/Data, sem recarregar o back-end a cada troca de ordenação. As colunas têm
altura fixa (520 px) e o corpo rola; cabeçalho e rodapé ficam parados.

**D4 — Criação com próximo número e título provisório.** `criar` calcula
`MAX(numero)+1`, grava o status pedido e o título **Capítulo N**; o tipo começa
**Não definido**. O painel abre com o capítulo recém-criado para o escritor
ajustar os dados. O cabeçalho usa **Esboço**; o rodapé usa o status da coluna.

**D5 — Personagens do elenco do livro.** O seletor de personagens usa
`listar_personagens_do_livro` (RF014), não a biblioteca global inteira: o
capítulo pertence à história e o arco é do elenco. O tipo de evento é filtrado
pelo evento escolhido, e o `CHECK` do banco é o backstop.

**D6 — Cenário sem mundo associado.** O livro ainda não tem associação com um
Mundo (requisito posterior). O campo **Cenário Worldbuilding** aparece com a
opção **Nenhum mundo associado a este livro** e a explicação; a coluna
`cenario_localidade_id` já existe e aceita uma localidade quando a associação
chegar. Alternativa descartada: listar todas as localidades — misturaria mundos
e anteciparia a associação.

**D7 — Métricas e ficha global.** `estatisticas` conta `capitulo`; o Painel do
Livro busca `listar_capitulos` para o card e a métrica. O total de capítulos da
ficha global passa a ser `COUNT(DISTINCT capitulo_id)` por personagem/livro.

**D8 — Verificação em dois níveis.** Testes Rust cobrem migração, CRUD,
unicidade do número, listas e pares evento/tipo, métricas e contagem da ficha.
O `verificar-rf015.mjs` dirige o app real: quadro, colunas, ordenação, criação
pelos dois caminhos, painel, ajuda do tipo, personagens, salvar, arrastar e
métricas. `verificar-rf011` e `verificar-rf014` são atualizados para a seção e o
total reais.

## Risks / Trade-offs

- **Colunas de altura fixa** → em telas baixas o quadro pode exigir rolagem da
  página; é o comportamento pedido e o corpo da coluna continua acessível.
- **Número único por livro** → editar para um número já usado devolve erro
  `NumeroCapituloDuplicado`; o próximo número é automático na criação.
- **Personagens só do elenco** → um personagem global não vinculado não aparece
  no capítulo; isso mantém a coerência com o RF014 e pode ser revisto quando o
  elenco global for associado.
- **Sem exclusão** → os capítulos criados por engano permanecem; exclusão fica
  para um requisito próprio, como no RF014.
- **Cenário vazio** → o campo é exibido, mas sem opções até a associação
  livro–mundo; a UI explica o motivo em vez de fingir dados.

## Migration Plan

1. Migração v14 em `banco/migracoes.rs`.
2. `capitulo.rs` + testes; comandos e contadores.
3. Front-end do quadro e do painel; métricas e ficha.
4. Verificadores novos/ajustados; bancos v13 migram na subida.

## Open Questions

Nenhuma. A exclusão, a associação livro–mundo e a curva de arco ficam para
requisitos posteriores.
