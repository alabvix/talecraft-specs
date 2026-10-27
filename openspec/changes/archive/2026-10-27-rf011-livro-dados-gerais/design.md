## Context

O RF010 deixou **Meus Livros** em estado vazio e o botão **+ Novo Livro** sem
ação. O RF011 cria o nível do livro e precisa decidir três coisas: (1) como o
livro nasce sem um modal; (2) como a casca da raiz dá lugar à casca do livro sem
duplicar a aplicação; (3) como modelar listas fechadas dependentes (gênero →
subgêneros) sem duplicar valores no front-end.

O app já tem o padrão provado nos RF004–RF009: migração aditiva, módulo de
domínio Rust, comandos Tauri, módulo de API no front-end, telas React reusando o
design system e verificação por CDP contra o app real. O RF011 segue esse padrão.

## Goals / Non-Goals

**Goals:**

- Persistir o livro e os dados gerais (título, gênero, subgêneros, faixa de
  público e idioma) na migração v7.
- Abrir a página do livro a partir de **+ Novo Livro** e dos cards de Meus
  Livros, com faixa do livro, breadcrumb e menu lateral próprios.
- Entregar o **Painel do Livro** e a página **Dados do Livro** com Tab Panel e a
  aba **Dados Gerais**.
- Fazer a listagem real de Meus Livros, com busca, grade/lista e métricas.
- Manter as seções futuras acessíveis por uma tela informativa, sem antecipar
  domínio.

**Non-Goals:**

- Vínculo personagem–livro e elenco do livro.
- Capítulos.
- Associação livro–mundo.
- Gráficos e exportação do livro.
- Exclusão de livro, importação `.pdc` e abas futuras de Dados do Livro.

## Decisions

**D1 — O livro só existe depois do primeiro salvar.** Em vez de criar um
registro provisório ao clicar em **+ Novo Livro**, a página abre com um objeto
local (`id: null`) e o comando `salvar_livro` faz o `INSERT` no primeiro
**Salvar**. Alternativa descartada: criar imediatamente e abrir em edição —
deixaria livros órfãos com título provisório sempre que o escritor desistisse.

**D2 — Casca do livro dentro de `TelaLivro`.** A página do livro é um componente
que monta a própria casca (`<div className="app app--book">`, `Bookband`,
`Topbar`, `SidebarLivro` e `main`). O `App` apenas troca entre a casca da raiz e
`<TelaLivro>`. Alternativa descartada: espalhar condicionais de livro no `App` —
misturaria dois menus e dois breadcrumbs no mesmo componente e dificultaria o
retorno à raiz.

**D3 — Duas tabelas e listas no back-end.** `livro` guarda os campos escalares
e `livro_subgenero` guarda a seleção múltipla. As listas fechadas
(gêneros, subgêneros por gênero, faixas de público e idiomas) são constantes
Rust expostas por `listas_livro`; o front-end não duplica valores. Alternativa
descartada: um JSON de subgêneros numa coluna — impediria o `CHECK` por valor e
a consulta por subgênero.

**D4 — Validação em duas camadas.** O domínio valida título obrigatório/único,
gênero, faixa, idioma e a relação gênero → subgêneros; o `CHECK` e o `UNIQUE`
do esquema são a garantia final. O domínio devolve `CodigoErro` estável
(`LivroNaoEncontrado`, `SubgeneroInvalido`, `SubgeneroForaDoGenero`,
`FaixaPublicoInvalida`, `IdiomaInvalido`) e o IPC só converte para texto.

**D5 — Tab Panel genérico.** `PainelAbas.jsx` recebe a lista de abas, a aba ativa
e o conteúdo; o CSS usa as classes `.tabs`/`.tabs__tab` do design system. A
página Dados do Livro declara apenas `[{ id: "gerais", rotulo: "Dados Gerais" }]`
nesta entrega. Alternativa descartada: copiar as `worldtabs` de `TelaMundo` —
amarraria a página do livro ao CSS e à estrutura de Mundos.

**D6 — Menu do livro em componente próprio.** `SidebarLivro.jsx` mantém a ordem
pedida (Painel, Dados, Personagens, Capítulos, Worldbuilding, Análise →
Gráficos/Exportar, Início) e recebe a seção ativa. A ordem **não** reusa a do
protótipo, que coloca Elenco/Worldbuilding/Capítulos antes de Dados do Livro.

**D7 — Cor do livro derivada do id.** O protótipo atribui uma cor por livro; no
app a cor é derivada do `id` (paleta violeta/vermelho/verde/azul) e aplicada em
`--book-color` pela classe `c--*` no `.app--book`. Não há coluna de cor no banco
neste requisito.

**D8 — Seções futuras com tela informativa.** Os itens Personagens, Capítulos,
Worldbuilding, Gráficos e Exportar navegam para uma tela que explica que o
módulo pertence a requisito posterior. Alternativa descartada: esconder os itens
— o requisito pede o menu completo do protótipo.

**D9 — Métricas num comando único.** `estatisticas_biblioteca` devolve as cinco
contagens numa chamada só, com `SELECT` de subconsultas. `personagens_em_varios_livros`
e `capitulos` são `0` porque as tabelas de vínculo e de capítulos não existem
ainda. Alternativa descartada: uma chamada por métrica — mais IPC e mais estados
de carregamento na tela.

## Risks / Trade-offs

- **Título único pode conflitar com livros futuros importados** → o `UNIQUE
  COLLATE NOCASE` é a regra do RF011; a importação `.pdc` terá de resolver
  conflitos quando chegar.
- **Subgênero é `CHECK` global, não por gênero** → a relação gênero → subgênero
  fica no domínio; um `CHECK` cruzado exigiria trigger. Teste cobre a recusa de
  subgênero fora do gênero.
- **Menu do livro duplica a casca em `TelaLivro`** → o `Topbar` e o design
  system são reusados; só o `SidebarLivro` e a `Bookband` são novos.
- **Seções futuras parecem “quebradas” se não houver conteúdo** → a tela
  informativa explica o requisito e mantém o item ativo no menu.
- **Métrica de entradas de mundo é global** → ela conta as entradas de todos os
  mundos, como a biblioteca global de personagens; quando o livro associar um
  mundo, a métrica do livro passa a ser local.

## Migration Plan

1. Migração **v7** aditiva em `banco/migracoes.rs`; nenhum passo v1–v6 é editado.
2. `salvar_livro` grava `livro` + `livro_subgenero` em transação.
3. Bancos existentes migram na subida; não há rollback destrutivo — a v7 só
   acrescenta tabelas. Em caso de regressão, o aplicativo pode voltar ao build
   anterior, que ignora as tabelas novas.

## Open Questions

Nenhuma pendente para este requisito. As abas futuras de Dados do Livro, o
elenco do livro, os capítulos, a associação com o Mundo, os gráficos e a
exportação ficam para requisitos posteriores.
