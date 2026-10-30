# AGENTS.md - TaleCraft

> **Dois repositórios:** este repositório (`talecraft-specs`) contém requisitos,
> specs, protótipo e conceitos. O código Tauri fica em `talecraft-app`. Caminhos
> como `src/`, `src-tauri/`, `scripts/`, `package.json` e `docs/setup.md` citados
> abaixo pertencem ao repositório do aplicativo, não a este.

> **Ponto de parada (28/10/2026):** RF001-RF016 estão implementados e
> arquivados; o RF016 abre a seção **Gráficos** do livro (curva de progressão e
> evolução dos personagens, somente leitura, sem migração). O RF015 abre
> **Capítulos** (migrações **v14**
> `capitulo`/`capitulo_personagem`, **v15** com o **Motivo do Evento** e **v16**
> com o **Motivo do Tipo**, quadro
> de status, edição, arrastar e
> métricas reais); o RF014 abre **Personagens** (migração **v13**
> `livro_personagem`, seleção em grade paginada com busca, 13 papéis) e o RF013
> acrescenta as abas **Sinopse**, **Tema**, **Conflito** e
> **Voz Narrativa/Tom/Tempo**, com **Humor** de seleção múltipla. Ajustes do
> RF011: os módulos do Painel começam por **Dados do Livro** e Dados Gerais tem o
> **Período da História** (**De**/**Até**, migração **v11**, lado a lado,
> somente dígitos e legado preservado). A janela abre
> **sempre maximizada**, com a barra de título nativa (ajuste do RF001 em
> `tauri.conf.json`), validada por `verificar-janela-maximizada.mjs` **3/3**. A
> capability `book-workspace` cobre as abas e as seções do livro e a
> `database-foundation` registra as migrações **v10**, **v11**, **v12**, **v13**,
> **v14**, **v15** e **v16**. São **18 capabilities** e `openspec validate --all`
> passa com 18/18;
> **141 testes Rust**; `verificar-rf016.mjs` **14/14**,
> `verificar-rf015.mjs` **19/19**,
> `verificar-rf014.mjs` **37/37**, `verificar-rf011.mjs` **39/39**,
> `verificar-rf012.mjs` **15/15**, `verificar-rf013.mjs` **15/15** e
> `verificar-rf002.mjs` **20/20**. Em 28/10/2026 o **RF016** (gráficos do
> livro), o **RF015** (capítulos do
> livro), o **RF014** (personagens do livro) e os ajustes de seleção/papéis, do
> rótulo **Títulos/Outros Nomes**, dos vínculos na ficha global e da
> contagem/link de livros foram implementados, validados e arquivados; a
> **splash do RF002** também foi ajustada. Nenhum change ativo. Último commit:
> **`162b475`**. A build de teste **v0.1.0** foi publicada no repositório
> <https://github.com/alabvix/talecraft-releases>.
>
> **Próximo passo (29/10/2026):** escrever o **RF017** em
> `documents/talecraft.md` (o documento cobre RF001–RF016) e abrir o change
> OpenSpec correspondente. Antes de uma nova release, subir a versão do app.

Memória de trabalho do projeto. Leia este arquivo **antes** de mexer no código.
A documentação do *produto* (como o app funciona, tokens, telas do protótipo)
está em `prototype/README.md`; os **requisitos e a stack** estão em
`documents/talecraft.md`; este arquivo registra *decisões*, *fluxo*, *armadilhas*
e *o estado atual* — o que um README não conta.

---

## 1. O que é o projeto

TaleCraft é um **app desktop** de *planejamento* de livros de ficção científica,
fantasia e terror. Não é ferramenta de escrita: é base de dados e planejamento
(personagens, mundo, capítulos, dados do livro, gráficos, exportação).

A implementação é um **app desktop offline** com **Tauri 2 + Rust** (back-end) e
**React com JavaScript e Vite** (front-end); o banco será **SQLite** em requisito
posterior. A fonte da verdade do produto e da stack é
[`documents/talecraft.md`](documents/talecraft.md) — os requisitos são nomeados
`RFxxx`, com regras `RFxxx-RNxxx` e critérios de aceite `RFxxx-CAxxx`.

> **Histórico:** a versão anterior deste arquivo dizia "Java + Kotlin com Spring
> Boot local e Thymeleaf". Isso **não** é mais a stack. O documento de
> requisitos define Tauri/Rust/React; siga-o.

O **protótipo visual** navegável em HTML + CSS (`prototype/`) continua no
repositório como **referência de interface e de conteúdo** — ele **não** define
a stack nem é portado automaticamente. O código do app fica na raiz
(`src/`, `src-tauri/`), conforme os requisitos "a partir da raiz".

O trabalho é guiado por **OpenSpec** (spec-driven development): mudanças ficam em
`openspec/changes/`, specs consolidadas em `openspec/specs/`, config do projeto
em `openspec/config.yaml`. Comandos úteis: `openspec list`, `openspec status`,
`openspec validate <change>`.

```
talecraft/
├── charcaters_concepts/       imagens de conceito originais (image1.jpg…image8.jpg)
├── documents/                 documentos do produto
│   ├── talecraft.md           REQUISITOS + stack — fonte da verdade
│   └── setup.md               guia de ambiente e execução (RF001)
├── prototype/                 PROTÓTIPO — referência visual (HTML + CSS, sem build)
│   ├── *.html                 15 telas ligadas entre si
│   ├── css/talecraft.css      design system único (~62 KB, comentado por seção)
│   ├── js/tema.js             troca de tema (única exceção de JS)
│   ├── img/personagens/       8 retratos renomeados por personagem
│   └── README.md              documentação do produto (protótipo)
├── openspec/                  OpenSpec — changes, specs e config
│   ├── config.yaml            contexto do projeto + regras por artefato
│   ├── specs/                 SPECS principais consolidadas (verdade)
│   └── changes/               changes ativos + `archive/` com os concluídos
├── src/                       FRONT-END React (JavaScript) + Vite
│   ├── main.jsx               ponto de entrada
│   ├── App.jsx                casca: navegação, tema e carregamento (RF002/RF003)
│   ├── paginas.js             metadados das telas do menu
│   ├── tema.js                temas, padrão e persistência (`talecraft.tema`)
│   ├── personagensApi.js      chamadas aos comandos de personagens (RF004/RF005)
│   ├── mundosApi.js           chamadas aos comandos de mundos (RF007)
│   ├── entradasMundoApi.js    chamadas às entradas do mundo (RF008)
│   ├── entradasMundo.js       metadados das entidades do mundo (RF008)
│   ├── faccoesApi.js          chamadas aos comandos de facções (RF009)
│   ├── faccoes.js             metadados de tipos e papéis (RF009)
│   ├── livrosApi.js           chamadas aos comandos de livros (RF011)
│   ├── livros.js              seções e metadados do livro (RF011)
│   ├── livroPersonagensApi.js chamadas ao elenco do livro (RF014)
│   ├── fichaModo.js           marcador `#ficha=<id>` da janela de exportação (RF006)
│   ├── mundoModo.js           marcador `#mundo=<id>` da exportação do mundo (RF007)
│   ├── nomeArquivo.js         nome seguro para o diálogo de salvar (RF006/RF007)
│   ├── talecraft.css          design system (cópia do protótipo)
│   ├── personagens.css        estilos das telas de personagens (RF004/RF005)
│   ├── mundos.css             estilos de mundos, entradas e facções (RF007–RF009)
│   ├── livros.css             estilos da página do livro e Tab Panel (RF011)
│   ├── fontes.css + fontes/   fontes locais (`@font-face`, 20 `.woff2`)
│   └── componentes/           Marca, Topbar, Sidebar, TelaVazia, TelaTemas,
│                              Splash, Icone, TelaPersonagens, TelaPersonagem,
│                              ModalRelacoes, ArvoreFamiliar, TelaFicha,
│                              FichaPersonagem, TelaMundos, TelaMundo,
│                              DocumentoMundo, TelaDocumentoMundo,
│                              TabelaEntradas, ModalEntradaMundo,
│                              TabelaFaccoes, ModalFaccao,
│                              ModalFaccaoPersonagem, TelaLivro, SidebarLivro,
│                              Bookband, PainelAbas, DadosLivro,
│                              TelaPersonagensLivro, ModalSelecaoPersonagens,
│                              ModalPersonagemLivro, TelaCapitulosLivro,
│                              PainelCapitulo, TelaGraficosLivro,
│                              GraficoProgressao, GraficoArco
├── src-tauri/                 BACK-END Rust + configuração do Tauri
│   ├── src/main.rs            binário
│   ├── src/lib.rs             comandos Tauri + estado gerenciado do banco
│   ├── src/banco.rs           infraestrutura do SQLite (RF003–RF016)
│   ├── src/banco/migracoes.rs DDL versionado (v1-v16)
│   ├── src/erro.rs            ErroDominio + CodigoErro + Resultado<T>
│   ├── src/test_support.rs    DiretorioTemporario (tempfile, cfg test)
│   ├── src/personagem.rs      domínio dos personagens (RF004)
│   ├── src/personagem/arvore.rs árvore familiar e layout (RF005)
│   ├── src/imagem.rs          cópia e validação compartilhada de imagens (RF007)
│   ├── src/mundo.rs           domínio dos mundos (RF007)
│   ├── src/entradas_mundo.rs  domínio das entradas do mundo (RF008)
│   ├── src/faccao.rs          domínio das facções e associações (RF009)
│   ├── src/livro.rs           domínio dos livros e abas narrativas (RF011–RF013)
│   ├── src/livro_personagem.rs vínculo livro-personagem (RF014)
│   ├── src/capitulo.rs        capítulos e personagens do arco (RF015)
│   ├── src/grafico.rs         séries dos gráficos do livro (RF016)
│   ├── src/documento_mundo.rs agregado do Documento do Mundo (RF007–RF009)
│   ├── src/ficha.rs           montagem da Ficha do Personagem (RF006)
│   ├── src/pdf.rs             gravação do PDF pelo WebView2 (RF006)
│   ├── src/<modulo>/testes.rs testes extraídos de cada módulo
│   ├── tauri.conf.json        janela, nome, integração Vite
│   └── icons/                 ícones do aplicativo
├── scripts/                   verificações headless (Edge/Tauri via CDP)
│   ├── verificar-rust.ps1     cargo fmt + clippy -D warnings + testes
│   ├── verificar-rf002.mjs    interface, navegação, temas e splash (20/20)
│   ├── verificar-rf003.mjs    inicialização do banco (3/3)
│   ├── verificar-rf004.mjs    personagens: lista, busca, detalhe, modal, retrato (20/20)
│   ├── verificar-rf005.mjs    relações bidirecionais e árvore familiar (29/29)
│   ├── verificar-rf005-persistencia.mjs  RF005 sobrevive a fechar e reabrir (4/4)
│   ├── verificar-rf006.mjs    painel retrátil, ficha em PDF e cor dos botões (29/29)
│   ├── verificar-rf007.mjs    mundos: lista, detalhe, imagem, entradas e PDF (33/33)
│   ├── verificar-rf008.mjs    entradas do mundo: abas, tabela e regras (21/21)
│   ├── verificar-rf009.mjs    facções: aba, associação e reflexo (16/16)
│   ├── verificar-rf010.mjs    Meus Livros em estado vazio e listagem real (18/18)
│   ├── verificar-rf011.mjs    página do livro, Dados Gerais e listagem (34/34)
│   ├── verificar-rf012.mjs    aba Resumo, textos longos e sem Descartar (15/15)
│   ├── verificar-rf013.mjs    abas Sinopse/Tema/Conflito/Voz e Humor (15/15)
│   ├── verificar-rf014.mjs    personagens do livro: elenco, vínculo e métricas (37/37)
│   ├── verificar-rf015.mjs    capítulos: quadro, edição, arrastar e métricas (19/19)
│   ├── verificar-rf016.mjs    gráficos: progressão, arcos e marcadores (14/14)
│   └── verificar-janela-maximizada.mjs  janela maximizada com barra (3/3)
├── index.html                 HTML do Vite (monta o React)
├── vite.config.js             configuração do Vite (porta 1420)
├── package.json               scripts: dev, build, tauri, verificar:rust
├── .gitignore
└── prototype.rar              arquivo antigo, ignorar
```

O app roda com `npm run tauri dev` e compila com `npm run tauri build`
(detalhes em `documents/setup.md`). O protótipo continua sendo aberto direto no
navegador (`prototype/index.html`) e não precisa de build.

---

## 2. Como trabalhar aqui

**Regras do aplicativo (código real — `src/`, `src-tauri/`):**

- **Idioma:** todo conteúdo visível, comentário e nome de arquivo em
  **português (BR)**. Mantenha assim.
- **Front-end:** React com JavaScript (não TypeScript). Sem bibliotecas além de
  React, Vite e `@tauri-apps/api`, salvo requisito que justifique.
- **Back-end:** Rust + Tauri 2. Comandos expostos via `#[tauri::command]` e
  registrados no `invoke_handler`; `invoke` no front-end.
- **Erros Rust:** os domínios devolvem `Resultado<T>` (`ErroDominio` + `CodigoErro`);
  `com_conexao` converte para `String` somente na borda dos comandos Tauri.
  Novos testes devem verificar `erro.codigo`, não `contains("texto")`.
- **Testes Rust:** cada módulo tem `src/<modulo>/testes.rs`; use
  `DiretorioTemporario` (`src/test_support.rs`, `tempfile`) para limpeza automática.
- **Antes de dizer que terminou:** rode `npm run verificar:rust` (fmt + Clippy
  com `-D warnings` + testes), `npm run build` (front-end) e, se mexeu na
  janela/comandos, `npm run tauri dev`.

**Regras do protótipo (`prototype/` — referência visual, não é o app):**

- **Sem JavaScript** (exceto `onclick` de navegação e `js/tema.js`). Se algo
  parecer exigir JS, prefira resolver com CSS ou apenas representar visualmente.
- **Sem bibliotecas.** Gráficos são SVG inline com `viewBox` e `<polyline>`.
  Ícones são SVG inline com a classe `.icon`.
- **Um CSS só.** Não crie folhas por página. Seções numeradas e comentadas.
- **Não invente telas novas sem necessidade.** O protótipo tem 15 telas e o
  README lista todos.

### Antes de dizer que terminou, valide

O projeto não tem testes nem linter. A validação é por script. Rode algo assim
(adapte) no PowerShell, dentro de `prototype/`:

```powershell
# 0. helper: le sempre em UTF-8 explicito (nunca Get-Content -Raw nestes HTMLs)
$utf8 = New-Object Text.UTF8Encoding($false)
function LRead($p) { [Text.Encoding]::UTF8.GetString([IO.File]::ReadAllBytes((Resolve-Path $p).Path)) }

# 1. chaves do CSS devem fechar
$css = LRead "css\talecraft.css"
$o = ($css.ToCharArray() | Where-Object { $_ -eq '{' }).Count
$c = ($css.ToCharArray() | Where-Object { $_ -eq '}' }).Count
"CSS: $o / $c"

# 2. cada HTML: <div> balanceado, links e imagens existem, sem caractere corrompido
$dir = (Get-Location).Path
Get-ChildItem -Filter *.html | ForEach-Object {
  $file = $_; $t = LRead $file.FullName
  $od = ([regex]::Matches($t,'<div\b')).Count
  $cd = ([regex]::Matches($t,'</div>')).Count
  $bad = ([regex]::Matches($t,"\uFFFd")).Count
  $refs = [regex]::Matches($t,'href="([^"#?]+\.html)') |
          ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
  $miss = $refs | Where-Object { -not (Test-Path (Join-Path $dir $_)) }
  $st = @()
  if ($od -ne $cd) { $st += "DIV($od/$cd)" }
  if ($miss)       { $st += "LINK QUEBRADO: $($miss -join ',')" }
  if ($bad)        { $st += "ENCODING=$bad" }
  if (-not $st)    { $st = @('OK') }
  "{0,-30} {1}" -f $file.Name, ($st -join ' ')
}

# 3. sintaxe do JS
node --check "js\tema.js"   # se houver Node disponível
```

**Armadilha do PowerShell (1): `$_`**
Dentro de `Where-Object { ... }` o `$_` é o item da pipeline, não o `FileInfo` do
laço externo. Guarde o arquivo numa variável (`$file = $_`) antes, senão
`Join-Path` recebe `$null` e o script explode.

**Armadilha do PowerShell (2): encoding UTF-8 — esta já corrompeu arquivos.**
`Get-Content -Raw` + `Set-Content` **não** preservam acentos de forma confiável.
Numa substituição em massa, `Início` virou `In?cio` (o `í` foi perdido) em 10
arquivos. **Nunca** use `Get-Content`/`Set-Content` para editar estes HTMLs.
Use leitura e escrita explícitas em UTF-8:

```powershell
$utf8 = New-Object Text.UTF8Encoding($false)   # sem BOM
$t = [Text.Encoding]::UTF8.GetString([IO.File]::ReadAllBytes($name))
$t = $t.Replace($antigo, $novo)
[IO.File]::WriteAllText((Resolve-Path $name).Path, $t, $utf8)
```

E valide sempre com um contador de caracteres corrompidos:

```powershell
([regex]::Matches($t, "\uFFFd")).Count   # deve ser 0 em todo arquivo
```

Uma boa substituição em massa **só vale se** esse contador ficar zerado. Se
precisar trocar texto que contém acento, prefira a ferramenta `edit` (que
preserva os bytes) a qualquer script.

**Mojibake misto (corrigido em outubro/2026).** `AGENTS.md`,
`documents/talecraft.md` e `src/talecraft.css` chegaram com trechos
duplo-codificados (`MemÃ³ria`, `â€”`) e trechos já corretos no mesmo arquivo.
Um round-trip cego do arquivo inteiro (UTF-8 → Windows-1252 → UTF-8) **não
serve**: os trechos corretos viram bytes inválidos ou são perdidos. O reparo
que funcionou:

1. ler o arquivo como UTF-8 e remover o BOM, se houver;
2. percorrer o texto e tentar decodificar **somente** sequências de 2 a 4
   caracteres não-ASCII como bytes Windows-1252; se formarem UTF-8 válido, são
   mojibake e devem ser substituídas;
3. repetir até não haver troca (o mesmo arquivo pode ter duas ou três camadas);
4. gravar em UTF-8 **sem BOM** e conferir `U+FFFD`, os primeiros bytes
   (`23 23 20` = `## ` nos `.md`) e o build (`npm run build`, chaves do CSS).

Não confie só na contagem de `Ã`/`Â`: `NÃO`, `PADRÃO` e `RAÇA` são português
legítimo. O sinal de mojibake é a **sequência reversível**, não o caractere
isolado.

---

## 2b. Fluxo de trabalho (OpenSpec)

O desenvolvimento é guiado por **spec-driven development** com o OpenSpec. Cada
requisito (`RFxxx` de `documents/talecraft.md`) vira um **change** com quatro
artefatos: `proposal.md` → `specs/<capability>/spec.md` → `design.md` →
`tasks.md`.

```
openspec/
├── config.yaml                 contexto do projeto + regras por artefato
├── specs/                      SPECS PRINCIPAIS (verdade consolidada)
│   └── <capability>/spec.md
└── changes/
    ├── <change>/               changes ATIVOS (em andamento)
    └── archive/YYYY-MM-DD-<change>/   changes ARQUIVADOS
```

### Ciclo completo de um requisito

```powershell
# 1. criar o change
openspec new change "rf002-<nome>"

# 2. ver o que falta e escrever cada artefato, nesta ordem
openspec status --change "rf002-<nome>"
openspec instructions proposal --change "rf002-<nome>" --json
openspec instructions specs    --change "rf002-<nome>" --json
openspec instructions design   --change "rf002-<nome>" --json
openspec instructions tasks    --change "rf002-<nome>" --json
# (aplicar as tasks do tasks.md, marcando - [x] conforme conclui)

# 3. validar
openspec validate --all

# 4. arquivar (sincroniza as specs principais e move o change)
openspec archive "rf002-<nome>" --yes
```

### Regras que evitaram retrabalho

- **Deixe o `openspec archive` aplicar os deltas** (`ADDED`/`MODIFIED`) nas
  specs principais. **Não** crie `openspec/specs/<capability>/spec.md` à mão
  antes: o archive tenta reaplicar e aborta com `ADDED failed ... already
  exists`. Se já tiver criado, use `openspec archive <nome> --yes --skip-specs`.
- **Delta specs** começam com `## ADDED Requirements` (nova capability) ou
  `## MODIFIED Requirements` (capability existente). A spec principal usa
  `## Requirements`.
- **Armadilha do validador: o `SHALL` tem de estar na PRIMEIRA linha do
  requisito.** O `openspec validate` lê apenas a primeira linha do texto sob
  `### Requirement:` para procurar `SHALL`/`MUST`. Se o `SHALL` cair na 2ª linha
  (por exemplo, depois de uma quebra de linha na descrição), a validação falha
  com "must contain SHALL or MUST" mesmo com o texto correto. Mantenha o
  `SHALL` logo na primeira linha. (Aconteceu no RF003 com "Criação automática
  do banco".)
- **Armadilha do `MODIFIED`: só use para requisito que JÁ existe na spec
  principal.** O archive aborta com `MODIFIED failed ... not found` quando o
  cabeçalho `### Requirement:` não bate com nenhum da spec alvo. Requisito novo
  naquela capability é `ADDED`, mesmo que já exista em outra capability. No
  RF003, `estado_inicial` estava no delta do `splash-screen` mas **nunca** tinha
  sido registrado no `rust-bridge`; o delta do `rust-bridge` usava `MODIFIED` e
  o archive falhou — era `ADDED`. Antes de escrever o delta, **leia a spec
  principal** (`openspec/specs/<capability>/spec.md`) para ver quais requisitos
  realmente existem lá.
- Todo cenário cita o código do requisito (`RFxxx-CAxxx`) no `THEN`.
- Tasks usam checkbox `- [ ]` / `- [x]` — o OpenSpec conta pelo formato.
- Escreva os `.md` do OpenSpec em **português (BR)**, como o resto do projeto.

---

## 3. Decisões tomadas (e por quê)

Estas decisões foram iteradas com o usuário. **Não reverta sem perguntar.**

### Arquitetura de conteúdo

| Decisão | Motivo |
|---|---|
| **Ficha global + arco por livro** | Um personagem pode viver vários livros, com arco diferente em cada um. Nome/aparência/biografia são compartilhados; papel, motivação, curva e relações são locais ao livro. |
| **Biblioteca global de personagens** no nível raiz | Permite reaproveitar uma ficha em vários livros sem recadastrar. |
| **Papel narrativo varia por livro** | A mesma Iara Vasquez é protagonista em *A Órbita Silenciosa* e em *O Jardim de Ossos*, mas só é citada em *A Coroa de Sal*. |
| **Navegação em dois níveis** | Raiz (Biblioteca) → Livro aberto. Deixa claro "fora do projeto" vs "dentro do projeto". |

A tabela completa global × por-livro está no `prototype/README.md`.

### Mundo: global, com as entradas dentro dele

O Worldbuilder segue o mesmo princípio dos personagens, mas com um nível a mais.
**O Mundo é global; as entradas pertencem ao Mundo; o livro associa o Mundo.**

| Global (o Mundo) | Por livro (a associação) |
|---|---|
| Nome, descrição, nível tecnológico | Qual Mundo o livro usa (**1 e somente 1**) |
| Tipo de Mundo: Medieval, Moderno, Futurista, Antigo | Quais entradas entram em cena e em que capítulo |
| Gênero do mundo como tags (várias): Alta Fantasia, Fantasia Sombria, Cyberpunk, SteamPunk, Urbano, Sci-Fi, SolarPunk, Romantasia, Terror, Gótico, Sobrenatural | — |
| As 8 categorias de entradas: Localidades, Raças e povos, Artefatos, Armas, Eventos, Sistema de energia, **Sistema de Magia**, **Mapa Geral** | — |
| Toda a base de dados do mundo | — |

O vínculo é **1:1 do lado do livro**: cada livro aponta para um único Mundo; o
Mundo, do outro lado, pode servir a vários livros. Trocar o mundo associado
substitui a associação sem alterar o mundo anterior. As duas categorias em
negrito e os campos Tipo/Gênero foram acrescentados nos últimos ajustes.

### Personagens: global, com o arco no livro (RF004)

O primeiro domínio do produto. A ficha é **global**; papel, motivação e curva de
arco pertencem ao **vínculo com o livro** — que o RF004 **não** cria.

| Global (o Personagem) | Por livro (fora do RF004) |
|---|---|
| Nome, Alcunha, Raça, Idade, Biografia | Papel narrativo |
| Personalidade, Força, Fraqueza, Interesses | Motivação, arco |
| Retrato (1 imagem) | Vínculos e curva de arco |
| Relações com outros personagens | Relações locais |

Decisões do RF004 confirmadas com o usuário:

- **Campos do requisito vencem o protótipo.** O RF004 diz "usar os campos que
  estão definidos no requisito, pois nem todos existem no protótipo". Então
  entram Força, Fraqueza, Interesses e Personalidade, e **ficam de fora** os
  campos só do protótipo (Gênero, Origem, Ferida permanente, Traços).
- **Tipo de relação é lista fechada** dos 8 do requisito (Rival, Mentor,
  Inimigo, Filho/Filha, Mãe/Pai, Aliado, Cônjuge, Namorado) — o protótipo mostra
  texto livre ("Rivalidade"), mas isso não foi adotado. **O RF005 ampliou para
  10** (ver abaixo).
- **Relações são direcionadas** (RF004): A→B "Mentor" não cria B→A. **O RF005
  revogou isso** — hoje toda relação é bidirecional (ver abaixo).
- **Um retrato por personagem** (o RF004 pede um caminho); a galeria do protótipo
  fica para requisito futuro.
- **O retrato é copiado** para `<app_data_dir>/retratos/`; o banco guarda o
  caminho relativo (guardar o caminho original quebraria se o usuário movesse o
  arquivo).
- **Duas tabelas**: `personagem_global` e `relacao_personagem` (como o requisito
  diz). O domínio vive em `src-tauri/src/personagem.rs`, separado do `banco.rs`.
- **Retrato com limite de 4 MB** (não deixar para requisito de mídia): arquivos
  maiores ou de formato não suportado são recusados com mensagem útil
  (RF004-CA018).
- **A modal de relações tem campo de busca** simples, para filtrar os
  personagens pelo nome (RF004-CA014).
- **Não há exclusão de personagem neste requisito** (RF004-RN009). Consequências:
  sai o `ON DELETE CASCADE` (a FK fica como garantia de integridade para quando a
  exclusão existir), saem o comando `excluir_personagem` e as tarefas/testes
  correspondentes. Nenhuma confirmação de exclusão precisa ser projetada agora.

**Armadilha evitada:** a migração v2 é **aditiva**. Editar a v1 do RF003 não
funcionaria: bancos já criados não reaplicam a migração e ficariam sem as
tabelas.

**Armadilhas encontradas ao implementar (RF004):**

- **`.libcard--add` também é `.libcard`.** O cartão "Novo personagem" reusa a
  classe base; medir a lista por `.libcard` conta **um a mais**. Conte sempre
  `.libcard:not(.libcard--add)`.
- **O `WHERE` do `lib.rs` guarda o resultado, não a conexão.** `personagem::salvar`
  faz `execute` e descarta o `usize` de linhas afetadas — guarde em `afetadas`
  antes de usá-lo (o `map_err` consome o valor).
- **WebView2 dá para depurar por CDP.** `WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS="--remote-debugging-port=9227"`
  faz o WebView2 do app Tauri publicar a aba em `/json/list`; com isso o
  `verificar-rf004.mjs` dirige o **app de verdade** (não o navegador) e os
  comandos Rust respondem.
- **Banco de produção x banco de teste.** A variável de ambiente `TALECRAFT_DADOS`
  (lida em `diretorio_dados`) isola a verificação num diretório temporário. **Não**
  definida em uso normal. Sem ela, rodar o verificador sujaria o banco real do
  usuário (aconteceu: nasceu Iara/Kael no `%APPDATA%` e foram removidos à mão).
- **`tauri-plugin-dialog` é dependência nova** (crate + npm + permissão
  `dialog:default` na capability). A MSI cresceu 2,70 → **2,79 MiB**.
- **`[data-theme="tundra"] .btn` vencia `.btn--primary`.** O seletor de tema
  (atributo) tem especificidade maior que a classe sozinha, então o
  `background: var(--bg-raised)` do Tundra clareava o botão primário enquanto o
  `color: #fff` do `.btn--primary` continuava valendo — **texto branco sobre
  fundo claro**, ilegível. Corrigido com `[data-theme="tundra"] .btn:not(.btn--primary)`
  (o fundo de gelo é só para botões neutros) + `[data-theme="tundra"] .btn--primary { color: #14181c }`
  (rótulo preto). O mesmo defeito existia no protótipo e foi corrigido lá também.
  **Lição:** ao criar um override por tema com seletor de atributo, confira se
  ele não está sobrescrevendo uma variante (`.btn--primary`, `.btn--ghost`) que
  precisa manter o próprio fundo.
- **`convertFileSrc` não basta: falta a `assetProtocol`.** O WebView bloqueava
  *silenciosamente* toda URL `asset://localhost/...` porque o
  `tauri.conf.json` só tinha `csp`. Diagnóstico errado é fácil — o arquivo era
  copiado para `retratos/` e o caminho gravado, só a imagem não aparecia. A
  correção tem **duas** partes que erram juntas: (1) `app.security.assetProtocol`
  com `enable: true` e `scope.allow` cobrindo os diretórios (`"$APPDATA/**"` para
  o uso real, `"$TEMP/**"` para o banco isolado da verificação); e (2) a feature
  **`protocol-asset`** no crate `tauri` do `Cargo.toml`. Sem a feature, o
  `cargo build` falha com *"does not match the allowlist ... add the
  `protocol-asset` feature"*.
- **O cartão de personagem passava `""` no lugar do diretório de dados.** O
  helper `retrato(p, "")` chamava `urlRetrato` com string vazia, que devolve
  `null` — **nenhum cartão mostrava retrato**, mesmo com o arquivo em disco. O
  `diretorioDados` já chegava como prop; bastava usá-lo. Lição: ao mover um
  helper para outro componente, confira todos os argumentos nos pontos de uso.
- **`.tabs`/`.tab` é para abas de conteúdo, não para alternar visualização.** A
  alternância Cards/Lista usava essas classes e ficava estranha; virou um
  **radio nativo exclusivo** (`<input type="radio" name="...">` dentro de
  `.toggle`, com `.is-on` no rótulo). O design system ganhou
  `.toggle-set--radio` e o utilitário `.visually-hidden` para o `legend`.

**Armadilha do PowerShell (3): `Set-Content -Encoding UTF8` grava BOM.** Ao
ajustar em massa o delta `database-foundation/spec.md` com `Set-Content`, o
arquivo ganhou um BOM (`EF BB BF`) e o OpenSpec passou a falhar com
*"No delta sections found"* — o BOM impediu o parser de reconhecer o cabeçalho
`## MODIFIED Requirements` na primeira linha. **Nunca** use `Set-Content` nestes
`.md`: use `[IO.File]::WriteAllText($p, $t, (New-Object Text.UTF8Encoding($false)))`
(sem BOM) e confira os três primeiros bytes (`23 23 20` = `## `).

### Relações familiares bidirecionais e árvore familiar (RF005)

O RF005 ajusta a tela de personagens em três frentes: **mais tipos de relação**,
**bidirecionalidade** e um quadro **Família** com a árvore familiar.

| Decisão | Motivo |
|---|---|
| **Dez tipos** (acrescenta `Irmão/Irmã` e `Aprendiz`) | O RF005-RN001 fecha a lista em dez; `Mãe/Pai` já existia. |
| **Bidirecionalidade para TODOS os tipos** (revoga a direção do RF004) | Gravar A→B grava também B→A com o tipo espelhado, numa transação. |
| **Tabela de espelho** | `Filho/Filha ⇄ Mãe/Pai`; `Mentor ⇄ Aprendiz` (novo tipo); simétricos espelham a si mesmos (`Rival`, `Inimigo`, `Aliado`, `Irmão/Irmã`, `Cônjuge`, `Namorado`). |
| **Semântica:** `A → B : Filho/Filha` = **A é filho/filha de B** | Fixa o sentido de leitura da aresta; o par espelhado é `B → A : Mãe/Pai`. |
| **Ciclos de ascendência não permitidos** | Só `Filho/Filha`/`Mãe/Pai` criam ordem; a subida por ascendentes com `HashSet` de visitados detecta o ciclo e recusa com mensagem útil (RF005-RN005). |
| **A árvore mostra só relações familiares** | `Filho/Filha`, `Mãe/Pai`, `Irmão/Irmã` e `Cônjuge` (RF005-RN006). Rival/Mentor/etc. não entram. |
| **Irmandade declarada é a fonte da verdade** | Não é deduzida de mãe/pai comum: se A declarou B como `Irmão/Irmã`, aparecem lado a lado mesmo sem ascendente em comum. |
| **Um único nó "?" por grupo de irmãos** | Sem mãe/pai cadastrado, um só nó `?` cobre o grupo (RF005-CA011) — confirmado com o usuário. |
| **Cônjuge = parceiro no mesmo nível** | Ligado por linha de **união**; os filhos descem abaixo do casal (RF005-RN008). |
| **Grafia "Cônjuge"** | Padronizada no RF005; o RF004 escrevia "Conjugue" numa linha. |

**Decisões técnicas (design D1–D6, em `design.md`):**

- **D1:** migração **v3** recria `relacao_personagem` com o `CHECK` de dez tipos —
  o SQLite não altera `CHECK` com `ALTER TABLE`; `TIPOS_RELACAO` vai a 10.
- **D2:** `salvar_relacao` grava o **par espelhado** numa **transação** com
  `INSERT … ON CONFLICT (origem_id, destino_id) DO UPDATE SET tipo = excluded.tipo`;
  a assinatura passou a `&mut Connection` (daí o `com_conexao_mut` no `lib.rs`).
- **D3:** a detecção de ciclo roda **antes** da gravação, então relações antigas
  (possivelmente cíclicas) não são tocadas nem quebram a árvore.
- **D4:** a árvore é montada no **back-end** (`arvore_familiar`), devolvendo
  `ArvoreFamiliar { nos, ligacoes }`; o front-end só desenha.
- **D5:** o desenho é **SVG inline** no React (`ArvoreFamiliar.jsx`), com
  `viewBox` calculado, sem biblioteca nova.
- **D6:** a modal lê a lista de tipos do comando `listar_tipos_relacao`.

**Armadilhas encontradas ao implementar (RF005):**

- **O sentido da aresta é fácil de inverter.** `A → B : Filho/Filha` significa
  **A é filho/filha de B** (então B é o pai/mãe). Os pais de `eu` são os
  **destinos** das arestas `eu → X : Filho/Filha`; os filhos são as **origens**
  das arestas `X → eu : Filho/Filha`. A primeira versão do `criaria_ciclo` e do
  `relacoes_familiares` subia pelos nós errados e os testes pegaram.
- **O painel exibe o lado do par que **chega**, não o que sai.** Gravando
  `Ofélia → Esther : Filho/Filha`, a página de **Ofélia** lê a aresta
  `Esther → Ofélia : Mãe/Pai` e mostra **Esther como Mãe/Pai**; a de **Esther** lê
  `Ofélia → Esther : Filho/Filha` e mostra **Ofélia como Filho/Filha**
  (RF005-CA005). Por isso o `listar_relacoes` consulta `WHERE r.destino_id = ?1` e
  junta pelo `origem_id` — mostrar a aresta que sai inverte a leitura dos dois lados.
- **Relações simétricas aparecem duas vezes no join.** `Irmão/Irmã` e `Cônjuge`
  produzem uma aresta em cada sentido, então a consulta da árvore precisa
  **deduplicar por id** — sem isso, dois irmãos viram quatro (os testes pegaram).
- **`verificar_banco` devolve uma `String`, não um objeto.** A versão do esquema
  vem dentro da mensagem (`"… (esquema v3 …)"`); o verificador precisa extrair
  com regex, não ler `r.versao`.
- **O binário de debug usa `devUrl`.** O `npm run tauri dev` (e o `.exe` de debug)
  apontam para `http://localhost:1420`: sem o Vite no ar, o WebView abre em branco
  e o verificador falha no `.sidebar`. Suba `npm run dev` antes de rodar os
  verificadores contra o executável de debug.
- **O RF004 tinha duas asserções que o RF005 invalida.** O `verificar-rf004.mjs`
  esperava **nove** opções na modal (oito tipos) e lia o painel por
  `d.textContent.includes('Mentor')`. Com dez tipos e a leitura do lado do par, os
  dois passaram a falhar — corretamente. Foram atualizados para refletir as regras
  novas (dez tipos; Kael aparece como `Aprendiz` na ficha de Iara).

**Armadilhas dos ajustes pedidos no teste do usuário (2ª rodada do RF005):**

- **Testar contra o binário antigo engana.** O usuário relatou "a árvore mostra
  Ofélia no primeiro nível e Ariadne não aparece". A causa era o `.exe` **release
  de antes do RF005** (22:43), que grava relações **unilaterais** e não tem a
  árvore nova. O banco real tinha só `Esther → Ofélia : Filho/Filha`, sem a
  espelhada — então a ficha de Ofélia não mostrava nada e a árvore ficava pela
  metade. **Sempre recompile o release (`npm run tauri build`) antes de pedir o
  teste do usuário**, e confira a data do `.exe`.
- **`getBBox().y` é local: ignora o `transform`.** O verificador da "mãe/pai na
  primeira linha" media `g.getBBox().y` e recebia `0` para todos os nós de um
  mesmo grupo traduzido. A posição real está no `translate(x, y)` do atributo
  `transform` — extraia com regex, não com `getBBox()`.
- **Relações unilaterais antigas exigem correção com o comando do app, não com
  SQL à mão.** A tentação é inserir a linha de espelho direto. Mas a direção é
  fácil de inverter (`A → B : Filho/Filha` = **A é filho de B**) e um SQL errado
  cria um **ciclo falso** que o próprio `salvar_relacao` passa a recusar, travando
  a correção. O caminho certo é apagar as arestas dos personagens envolvidos e
  regravar com `salvar_relacao` — que grava o par espelhado na direção correta.
- **O `sqlite3` no PowerShell come `\` e mangla acento.** `sqlite3 $db ".read C:\..."`
  vira `C:...` (as barras somem) e um literal `'Mãe/Pai'` direto na linha de
  comando falha o `CHECK` por corrupção de `ã`. Use **barras normais** no caminho
  do `.read` e escreva o SQL num arquivo UTF-8 sem BOM.
- **Nó clicável no SVG precisa de `role`/`tabIndex`.** Ao trocar `<g>` por
  elemento navegável, ponha `role="button"`, `tabIndex=0`, `onKeyDown` para
  Enter/Espaço e um `aria-label` — o nó "?" **não** é clicável (não tem ficha).
- **A modal exibe o lado que chega, mas o seletor precisa gravar o lado oposto.**
  O `<select>` da modal mostra o tipo que o **outro** personagem tem em relação a
  este (`listar_para_relacao` lê a aresta que chega). Escolher nesse seletor,
  então, descreve **o outro** — e a gravação tem de ser
  `salvar_relacao(destino, eu, tipo)`, não `(eu, destino, tipo)`. A primeira
  versão gravava `(eu, destino, tipo)`, invertendo o sentido: escolher
  "Filho/Filha" na ficha de Esther gravava `Esther -> Daima : Filho/Filha`
  (Esther como FILHA de Daima) e o espelho `Daima -> Esther : Mãe/Pai`.
  **Lição:** quando a leitura e a escrita usam o mesmo rótulo com pontos de vista
  trocados, fixe o sentido com um teste que exercite o **seletor da interface** —
  os testes que chamam `salvar_relacao` direto passam mesmo com a inversão.
- **Nó com `ordem` fixa se sobrepõe e some.** O desenho posiciona cada nó pela
  célula `(geracao, ordem)`. As funções `subir_ascendentes` e
  `descer_descendentes` criavam o nó com `ordem: 0` **hardcoded** — então dois
  pais (ou dois filhos) caíam na **mesma** célula e um cobria o outro no SVG. O
  sintoma é cruel: "só aparece um dos pais", "só aparece uma das filhas", sem
  erro nenhum. A correção é o contador `proxima_ordem` (por geração) atravessar
  as duas funções, como já fazem irmãos e cônjuges no nível 0. **Lição:** ao
  criar nó novo na árvore, **sempre** peça a coluna ao `proxima_ordem`.

### Painel retrátil, exportação da ficha e contraste do Tundra (RF006)

O RF006 ajustou a tela de Personagens: painel **Vínculos com livros**
retrátil, botão **Exportar Ficha** (PDF) e rótulo branco nos botões primários.

| Decisão | Motivo |
|---|---|
| **PDF pelo `PrintToPdf` do WebView2** (opção A) | Zero biblioteca nova, reusa o design system e embute a imagem. O `WebviewWindow::print()` do Tauri foi **descartado**: abre o diálogo de impressão do sistema, que não devolve o caminho do arquivo nem deixa escolher o destino — não atenderia ao RF006-CA013. |
| **`webview2-com` e `windows` como dependência direta** | Já estavam no `Cargo.lock` pelo `wry`/`tauri` (0.39 e 0.62). Declarar como direto **não** acrescenta crate nenhuma — o RF006-CA017 (sem biblioteca de PDF) continua satisfeito. |
| **A ficha é montada no back-end** (`ficha.rs`) | O front-end não fala SQLite; a regra "campo vazio não entra" fica num lugar só, testável em Rust. O front-end só desenha. |
| **Janela oculta, não `iframe`** | Um `iframe` imprimiria a tela inteira, com navegação, formulário e painel de relações. A janela separada (`visible: false`, `index.html#ficha=<id>`) imprime só a ficha. |
| **"Pronto" por comando, não por evento** | `sinalizar_ficha_pronta` + estado gerenciado `FichasProntas`, endereçado pelo rótulo da janela. Eventos entre janelas dependeriam de o `emit` alcançar a janela principal. |
| **O documento tem cores fixas** (fundo `#fff`, tinta `#14181c`) | É **impresso**: os tokens de tema invertem conforme o tema, e o PDF sairia escuro num tema escuro. Só a interface usa tokens; o documento usa a própria paleta. |
| **Contagem de vínculos num ponto único** (`totalVinculos = 0`) | O painel retrátil nasce retraído porque a contagem é zero; quando o requisito de vínculos chegar, troca-se **uma** linha, não a lógica do estado. |
| **Exportação grava as alterações pendentes antes de exportar** | O comando `exportar_ficha` monta a ficha a partir do **banco** (D8). Se o formulário tivesse edições não salvas, o PDF sairia desatualizado — foi o que aconteceu no teste do usuário (só o Nome entrava). O front-end detecta alterações pendentes (`mesmosDados` em `personagensApi.js`) e chama `salvarPersonagem(form)` antes de abrir o diálogo. Assim banco e PDF coincidem com o que se vê (RF006-RN013, RF006-CA021). |
| **Árvore familiar no documento, com cores fixas** | A `FichaPersonagem` ganha `familia: Option<ArvoreFamiliar>`, preenchida em `montar_por_id` a partir de `personagem::arvore_familiar` (ou `None` quando só há o próprio personagem). A seção **Família** reusa o componente `ArvoreFamiliar` (sem clique). Como o documento é impresso, as classes `.familytree__*` são sobrescritas com cores fixas dentro de `.ficha` (em `talecraft.css`); as cores de tema inverteriam conforme o tema e quebrariam a leitura. A seção só aparece quando há relações familiares (RF006-RN005, RF006-CA020). |

**Armadilhas encontradas ao implementar (RF006):**

- **Bloquear dentro do `with_webview` trava o WebView2.** A primeira versão
  esperava o callback do `PrintToPdf` **dentro** do closure do `with_webview`.
  Esse closure roda no **thread da interface**, e o callback do WebView2
  **também** precisa desse thread — então o callback nunca chegava, a espera
  expirava ("tempo esgotado ao gerar o PDF") e o comando devolvia erro
  **mesmo com o PDF gravado em disco**. A correção: obter a interface
  `ICoreWebView2_7` **dentro** do `with_webview` e esperar **fora** dele
  (`src-tauri/src/pdf.rs`). **Lição:** com WebView2, nunca espere um callback
  dentro do `with_webview`.
- **O `ICoreWebView2_7` não está no crate `windows`.** As interfaces do WebView2
  ficam no `webview2-com-sys` (reexportado pelo `webview2-com`). O crate
  `windows` sozinho **não** tem `PrintToPdf` — procurei e não está lá.
- **A assinatura do callback é `Result<(), Error>` e `bool`,** não `HRESULT` e
  `BOOL`: o `webview2-com` converte (`InvokeArg`). Chamar `.code()` ou
  `.as_bool()` no callback **não compila**.
- **A janela oculta precisa ser esperada, não assumida.** Se o PDF fosse gerado
  antes de a imagem carregar, sairia **sem o retrato**. Por isso a front-end só
  avisa "pronto" no `onLoad` da `<img>`; sem retrato, avisa assim que a ficha
  aparece (e o documento sai com as iniciais).
- **O `verificar-rf002.mjs` e o `verificar-rf003.mjs` NÃO recebem o executável.**
  Eles abrem o **Edge headless** contra `http://localhost:1420/` — precisam do
  `npm run dev` no ar. Passar o caminho do `.exe` como argumento faz o Edge
  tentar abrir um caminho de arquivo e **todas** as verificações falham com
  "Uncaught". Os do RF004/RF005/RF006, ao contrário, dirigem o **app Tauri** e
  recebem o `.exe`.
- **O contraste do Tundra era o oposto do que o token dizia.** O token
  `--accent: #2f7d5c` documenta "botão primário: texto branco", mas o override
  era `[data-theme="tundra"] .btn--primary { color: #14181c }` (preto) —
  herança de uma correção antiga que supunha botão claro. Preto sobre verde
  profundo é ilegível. Agora é `#fff` nos dois design systems, e o verificador
  mede o **contraste real** (4.99:1), não só a presença da regra.
- **Nome de personagem pode ser nome de arquivo inválido.** O Windows proíbe
  `< > : " / \ | ? *` e termina o nome em ponto ou espaço; o diálogo de
  salvamento recusa o caminho. O helper `nomeDeArquivo()` (em
  `personagensApi.js`) troca esses caracteres por hífen.
- **Os dois ícones do painel retrátil estavam trocados.** O `aria-label`
  dizia "Expandir" com o painel recolhido, mas o desenho apontava para a
  seta de recolher — e vice-versa. Como o rótulo acessível estava certo,
  nenhuma conferência de acessibilidade denunciou: **o desenho estava
  invertido**. Agora `retrair` é a seta para **cima** (recolhe, puxa o corpo
  para o cabeçalho) e `expandir` é a seta para **baixo** (abre, empurra o
  corpo para baixo). O verificador confere o atributo `d` do `<path>` nos
  dois estados — é a única forma de pegar esse tipo de erro. **Lição:** para
  um controle com dois estados, confira o **desenho** contra a **ação**, não
  só o rótulo e o `aria-expanded`.
- **O manipulador do botão sombreava a função da API (laço de diálogos).** O
  `TelaPersonagem.jsx` importava `exportarFicha` de `personagensApi.js` **e**
  declarava `async function exportarFicha()` no componente. A declaração local
  **sombreia** o import dentro do escopo do componente: a chamada
  `await exportarFicha(form.id, escolhido)` voltava para o próprio
  manipulador, que abria o **diálogo de salvamento de novo** — infinitamente.
  Para o usuário: "clico em Salvar no diálogo, ele não fecha e fica em laço".
  Corrigido renomeando o manipulador para `exportar` (o padrão do arquivo:
  `salvar` chama `salvarPersonagem`, `escolherRetrato` chama
  `associarRetrato`). **Lição:** um nome local **nunca** pode repetir o nome
  de um import usado no mesmo arquivo. Para conferir, o `verificar-rf006.mjs`
  agora confere, além do resultado, **quantas vezes o diálogo foi pedido**.
- **O `invoke` do Tauri é congelado — o diálogo nativo não se intercepta por
  ele.** `window.__TAURI_INTERNALS__.invoke` é criado com
  `Object.defineProperty` **sem** `writable`/`configurable`, então
  `window.__TAURI_INTERNALS__.invoke = ...` falha em silêncio (e
  `Object.defineProperty` no lugar também é recusado). A costura que funciona é
  **`window.fetch`**: no Windows o IPC do Tauri passa pelo protocolo
  `ipc://` (`ipc-protocol.js` → `fetch(convertFileSrc(cmd, 'ipc'))`). Interceptar
  o `fetch` e devolver uma `Response` com `Tauri-Response: ok`,
  `Tauri-Callback` e o corpo JSON simula a resposta do comando
  `plugin:dialog|save` — assim o **botão real** pode ser clicado na
  verificação, sem diálogo nativo. O `verificar-rf006.mjs` usa isso para
  exercitar o fluxo completo (botão -> diálogo -> comando -> PDF) e contar as
  chamadas: com o defeito, a contagem chegou a **675.892**.

- **A ficha espera todas as imagens antes de sinalizar "pronto".** O
  `TelaFicha.jsx` pré-carrega com `new Image()` o retrato do personagem **e**
  os retratos da árvore familiar, e só então chama `sinalizar_ficha_pronta`.
  Isso garante que o WebView2 inclua as imagens na impressão (RF006-CA010,
  RF006-CA020). Sem retrato algum, sinaliza assim que a ficha aparece. **Lição:**
  quando o documento ganha imagens novas (a árvore), o contador de imagens a
  esperar precisa crescer junto — senão o PDF sai sem elas.

- **A árvore familiar no PDF não pode ser clicável.** O componente
  `ArvoreFamiliar` aceita `aoAbrirPersonagem` opcional; no documento ele é
  omitido, então os nós não são clicáveis (o PDF não é navegável). Sem essa
  omissão, o documento teria nós com `role="button"` e `tabIndex` que não
  funcionam no PDF.

### Mundos, entradas e facções (RF007–RF009)

O Worldbuilding cresceu em três camadas, sempre dentro do **Mundo global**:
dados básicos (RF007), entradas do mundo (RF008) e facções com associação a
personagens (RF009).

| Decisão | Motivo |
|---|---|
| **Migrações v4, v5 e v6 aditivas** | Cada requisito cria suas tabelas sem editar passos publicados. `mundo_global`/`mundo_genero` (v4), as seis entidades + `sistema_regra` (v5) e `faccao`/`faccao_personagem` (v6). |
| **Listas fechadas vêm do back-end** | `listas_mundo`, `listar_tipos_sistema` e `listar_tipos_faccao` alimentam os controles; o front-end não duplica valores. O `CHECK` do SQLite é a garantia final. |
| **`imagem.rs` compartilhado** | Retrato e imagem do mundo usam a mesma validação (JPG/PNG/WEBP, 4 MB) e a mesma cópia para o diretório de dados. `personagem.rs` foi refatorado para reusar. |
| **Mundo em imagem 16:9** | `object-fit: cover` + `object-position: center`, sem distorção, no detalhe, no card e na lista. O PDF reusa `PrintToPdf` e espera a imagem carregar. |
| **Entradas com tabela e paginação** | Localidades, Raças e Povos, Artefatos, Armas, Eventos e Sistemas ficam em abas depois de Dados gerais/Imagem. `sistema_regra` guarda a ordem; as regras são regravadas em transação. |
| **Facções N:N com papel** | Uma facção pertence a um Mundo; o personagem pode ter várias facções. `UNIQUE(faccao_id, personagem_id)` impede o par duplicado e `papel` é `Líder`/`Membro`. |
| **Reflexo bidirecional** | A aba do Mundo mostra quantos personagens a facção tem; a ficha do personagem mostra facção e papel. A leitura usa o mesmo banco, sem cópia de estado entre telas. |
| **Front-end em camelCase** | Os `serde(rename_all = "camelCase")` expõem `mundoId`, `ideologiaObjetivos`, `baseTerritorio`, `associacaoId`, `nomeFaccao` etc. Os comandos Tauri continuam em snake_case. |
| **Exportação do Mundo separada da ficha** | `exportar_mundo` espelha `exportar_ficha` (janela oculta, canal `FichasProntas`, `PrintToPdf`). Generalizar os dois só quando houver um terceiro documento. |
| **Documento do Mundo agrega tudo** | `documento_mundo.rs` monta Mundo + todas as entradas (com regras dos Sistemas) + todas as facções com personagens/papéis, por `montar_documento_mundo`. O front-end do PDF não busca só `obter_mundo`, que traz apenas os dados básicos. |

**Armadilhas encontradas ao implementar (RF007–RF009):**

- **Editar Facção exige a facção completa.** `listar_faccoes` devolve um resumo
  (sem ideologia, líderes, base, descrição e história). Abrir a modal com esse
  resumo e salvar **apagaria** os campos detalhados. A `TabelaFaccoes` agora
  chama `obterFaccao(id)` antes de abrir a edição. **Lição:** resumo é para
  listar; edição sempre busca o registro completo.
- **O PDF do Mundo só tinha os dados básicos.** A janela de exportação chamava
  `obter_mundo`, então entradas e facções nunca chegavam ao documento. A
  correção criou o agregado `documento_mundo.rs` e o comando
  `montar_documento_mundo`; o `DocumentoMundo.jsx` passou a renderizar as seções
  **Entradas do Mundo** e **Facções**. **Lição:** exportação de um domínio que
  cresceu precisa de um agregado explícito; `obter` do registro principal não
  inclui as entidades associadas.
- **O `faccao.rs` pode existir vazio.** O esquema v6, os comandos e as telas
  estavam prontos, mas o módulo de domínio não; o `cargo build` falhava. Antes
  de arquivar, compile e rode os testes de domínio — não confie só no front-end
  ou no verificador.
- **Rádio do React não responde a `change` sintético.** O verificador do RF009
  precisa chamar `.click()` no `<input type="radio">`; disparar só `change`
  deixa a seleção visualmente marcada mas o estado do React vazio.
- **O campo Nome do personagem não tinha `id`.** O verificador procurava
  `#personagem-nome` e o formulário não oferecia esse gancho; o salvar exibia
  "O Nome é obrigatório". Foi acrescentado `id="personagem-nome"` ao input.
  **Lição:** todo campo que um verificador precisa preencher deve ter um
  seletor estável, de preferência `id`.
- **Acrescentar uma aba quebra verificações de lista exata.** O RF009 põe
  **Facções** depois de **Sistemas**; o `verificar-rf008.mjs` esperava
  exatamente seis abas e passou a falhar. A expectativa foi atualizada para
  incluir Facções, preservando a ordem das seis entradas do RF008.
- **O validador do OpenSpec não aceita só "DEVE".** Ele procura literalmente
  `SHALL`/`MUST` na primeira linha do requisito. Em specs em português, use
  `O sistema SHALL ...` (como as specs já arquivadas) em vez de `DEVE`.
- **Mojibake pode ser misto.** `AGENTS.md`, `documents/talecraft.md` e
  `src/talecraft.css` tinham trechos duplo-codificados e trechos corretos. Um
  round-trip cego de UTF-8 → Windows-1252 → UTF-8 falha ou estraga o que já
  estava certo. O reparo correto decodifica **apenas sequências reversíveis**
  de 2 a 4 caracteres, repetindo até estabilizar, e confere `U+FFFD`, BOM e o
  build do CSS. Detalhes na seção 2.

### Livros: página do livro e Dados Gerais (RF011)

O RF011 abriu o nível do livro. **Meus Livros** deixou de ser só estado vazio e
o botão **+ Novo Livro** passou a abrir a página do livro.

| Decisão | Motivo |
|---|---|
| **Salvar cria o livro** | O clique em **+ Novo Livro** abre a página com um objeto local (`id: null`); o `INSERT` só acontece no primeiro **Salvar** com título válido. Evita livros órfãos com título provisório. |
| **Página do livro com casca própria** | `TelaLivro` monta `Bookband`, `Topbar` e `SidebarLivro`; o `App` só troca entre a casca da raiz e a do livro (design D2). |
| **Menu do livro na ordem do requisito** | Painel do Livro, Dados do Livro, Personagens, Capítulos, Worldbuilding; Análise com Gráficos/Exportar; Início. A ordem **não** é a do protótipo (que põe Elenco/Worldbuilding antes de Dados do Livro). |
| **Tab Panel reutilizável** | `PainelAbas.jsx` usa `.booktabs` e já aceita novas abas; nesta entrega só existe **Dados Gerais** (RF011-RN012). |
| **Listas fechadas no back-end** | Gêneros, subgêneros por gênero, faixas de público e idiomas vêm de `listas_livro`; o front-end não duplica valores. |
| **Subgêneros por gênero validados no domínio** | O `CHECK` do SQLite cobre a união das listas; a relação gênero → subgênero é validada em Rust (`SubgeneroForaDoGenero`). |
| **Seleção de subgêneros por gênero** | `DadosLivro` mantém um mapa `{ gênero: seleção }`. Trocar o gênero guarda a seleção atual e carrega a do novo; voltar ao gênero original devolve os valores salvos. Só o gênero atual é gravado, e o mapa é reinicializado em **Salvar**/**Descartar**. |
| **Métricas em um comando** | `estatisticas_biblioteca` devolve livros, personagens, personagens em 2+ livros, capítulos e entradas de mundo numa chamada só. |
| **Métricas ligadas aos livros** | Personagens e Entradas de worldbuilding contam somente o que está associado a livros. Sem vínculo personagem–livro e sem associação livro–mundo, exibem **0** — não somam a biblioteca global nem os mundos soltos (RF011-RN017). |
| **Fantasia com 12 subgêneros** | Entram Gótico, Baixa Fantasia, Grindark, Mitológica, Histórica, Científica e Espada e Feitiçaria. O `CHECK` ampliado exigiu a migração **v8** (o SQLite não altera `CHECK` in-place), recriando `livro_subgenero` e copiando as linhas. |
| **Seções futuras informativas** | Worldbuilding e Exportar existem no menu e abrem uma tela de requisito posterior, sem antecipar domínio. Personagens (RF014), Capítulos (RF015) e Gráficos (RF016) já têm seção real. |

**Armadilhas encontradas ao implementar (RF011):**

- **O `NOCASE` do SQLite só dobra ASCII.** `A Órbita Silenciosa` e `a órbita
  silenciosa` passavam pelo `UNIQUE COLLATE NOCASE` por causa do `Ó`. A
  unicidade foi feita no domínio com `to_lowercase()` do Rust; o `UNIQUE` exato
  do banco ficou como backstop. A busca de livros também filtra e ordena no
  Rust pelo mesmo motivo.
- **`+ Novo Livro` mudou de comportamento.** O `verificar-rf010.mjs` esperava
  que o botão não navegasse e que **Grade** fosse um `<button>`. Com o RF011,
  o botão abre o livro e **Grade/Lista** virou radio; o verificador foi
  atualizado para **18/18**.
- **Salvar sem linhas afetadas:** o `UPDATE livro ... WHERE id = ?` precisa
  checar `afetadas`; um id inexistente devolve `LivroNaoEncontrado`, não
  sucesso.
- **Trocar o gênero não pode apagar a seleção.** A primeira versão filtrava
  `form.subgeneros` no `onChange` do gênero. Ao voltar ao gênero original sem
  salvar, os subgêneros salvos apareciam desmarcados. A correção mantém um mapa
  de seleções por gênero no formulário; o back-end continua recebendo apenas os
  subgêneros do gênero atual.
- **O título é atualizado na casca:** depois de salvar, a faixa do livro, o
  rótulo do menu, o breadcrumb e o card precisam refletir o novo título. O
  estado vive em `TelaLivro` e desce para a casca.

### Aba Resumo do livro (RF012)

| Decisão | Motivo |
|---|---|
| **v9 só com `ALTER TABLE ADD COLUMN`** | Não há `CHECK` novo; recriar `livro` como na v8 seria desnecessário. Os livros existentes ganham `resumo`/`final_livro` vazios. |
| **Textos no mesmo `Livro`** | `salvar_livro`/`obter_livro` já transportam o registro; dois campos escalares não justificam tabela filha nem comando novo. |
| **`listar` sem os textos longos** | A busca de Meus Livros chama a listagem a cada tecla; `obter` traz o registro completo para a edição. Enviar um objeto da listagem a `salvar_livro` apagaria os textos. |
| **Uma aba ativa, um formulário** | `DadosLivro` mantém `form` e a aba ativa; trocar de aba só troca o conteúdo renderizado e preserva a edição pendente. |
| **Somente Salvar** | O RF012 revoga o **Descartar** (RF011-FL005); `mesmosDados`/`ultimoSalvo` saem de livros. Sair sem salvar descarta o rascunho (RF011-RN008). |

**Armadilhas encontradas ao implementar (RF012):**

- **A aba Resumo não pode desmontar o formulário.** Se cada aba tivesse o
  próprio estado, alternar apagaria o que não foi salvo; o estado fica em
  `DadosLivro` e o `PainelAbas` só troca os filhos.
- **Remover o Descartar quebra o verificador antigo.** O `verificar-rf011.mjs`
  checava a restauração dos dados; a checagem saiu (30 → 29) e a ausência do
  botão passou para o `verificar-rf012.mjs`.
- **O aviso de sucesso sobrevive ao próximo Salvar.** O verificador do RF012 não
  espera o `.notice`; ele consulta `obter_livro` até o banco refletir o valor,
  evitando ler a gravação anterior.
- **Tundra pintava o botão do livro de violeta.** `.app--book .btn--primary`
  usava `--book-color` e sobrepunha o verde do tema. A correção é escopada em
  `[data-theme="tundra"] .app--book .btn--primary` com `--accent` (e o `:hover`
  com `--accent-hover`), mantendo a cor do livro na faixa, no menu e nos selos.
  O verificador mede o fundo computado.

### Abas narrativas: Sinopse, Tema, Conflito e Voz (RF013)

| Decisão | Motivo |
|---|---|
| **v10 aditiva com colunas + `livro_humor`** | Textos e listas de valor único são colunas de `livro`; o Humor é múltiplo e vira tabela filha com PK composta e `CHECK`. |
| **Humor múltiplo, resto único** | Decisão do usuário: **Ironia** + **Sátira** convivem; Narrador, Tom, Tempo, Estilo e Ritmo têm um valor cada. |
| **Listas no back-end** | `listas_livro` devolve narradores, tons, tempos, humores, estilos e ritmos; o front-end não duplica valores. |
| **`DadosLivro.jsx` extraído** | Com seis abas, o formulário saiu de `TelaLivro`; um único `form` e a aba ativa preservam a edição pendente. |
| **Textos em três alturas** | Curto = `input`; médio = `textarea--medium` (140 px); longo = `textarea--long` (200 px). |

**Armadilhas encontradas ao implementar (RF013):**

- **Abrir outra aba desmonta os campos.** Só o `form` sobrevive; ler todos os
  campos de uma vez no verificador exige clicar em cada aba antes de ler. O
  primeiro rascunho lia tudo de uma vez e só achava os campos da aba ativa.
- **O verificador do RF012 exigia exatamente duas abas.** Com o RF013, ele
  passou a conferir apenas as duas primeiras; a contagem total é do RF013.
- **"Objetico" e "Onisciennte"** foram corrigidos para **Objetivo** e
  **Onisciente** no requisito, no banco e na interface.
- **Humor no `CHECK` e na PK:** a chave composta `(livro_id, humor)` impede
  repetição mesmo se o domínio falhar; o teste de migração tenta o duplicado e o
  valor inválido.

### Personagens do livro (RF014)

O RF014 abre a seção **Personagens** do livro, que o RF011 deixava como tela
informativa. O personagem continua **global** (RF004); o livro ganha o
**vínculo** com os dados que variam por história.

| Decisão | Motivo |
|---|---|
| **Migração v12 (ampliada na v13) aditiva com `livro_personagem`** | PK composta `(livro_id, personagem_id)`, FKs para `livro` e `personagem_global`, `CHECK` do **Papel** e quatro textos; a PK é o backstop da duplicidade. A v13 recria a tabela para aceitar treze papéis. |
| **Papel em lista fechada de catorze opções** | **Protagonista**, **Antagonista**, **Coadjuvante**, **Aliado**, **Falso Antagonista**, **Falso Protagonista**, **Oponente**, **Confidente**, **Figurante**, **Coprotagonista**, **Mentor**, **Herói**, **Vilão** e o vazio **Não definido**, gravado como string (não `NULL`). |
| **Títulos/Outros Nomes do vínculo independentes** | A **Alcunha** global continua somente leitura na modal; **Títulos/Outros Nomes** (coluna `alcunha`) é local ao livro e pode ser diferente. |
| **Dados globais somente leitura** | Retrato, Nome, Idade, Raça, Personalidade, Força, Fraqueza, Interesses, Alcunha e Biografia vêm do cadastro global; relações familiares ficam fora da modal. |
| **Duplicidade vira relatório** | `associar` insere só os novos e devolve `associados`/`jaAssociados`; a UI informa os ignorados. Um único duplicado nunca cria o segundo vínculo. |
| **Sem remoção** | O RF014 não desvincula personagem do livro nem cria botão, ícone ou comando equivalente. |
| **Livro salvo obrigatório** | Em modo de criação o botão fica desabilitado e o back-end recusa com `LivroNaoSalvo`; não existe vínculo antes do primeiro **Salvar** do livro. |
| **Métricas ligadas aos vínculos** | **Personagens** conta `COUNT(DISTINCT personagem_id)`; **Personagens · N em 2+ livros** usa `GROUP BY ... HAVING COUNT(*) >= 2`; personagens soltos não entram. |

**Decisões técnicas implementadas (design D1–D9):** módulo
`src-tauri/src/livro_personagem.rs`; **sete comandos novos** (49 no total) —
`listar_personagens_do_livro`, `listar_livros_do_personagem`,
`listar_personagens_para_livro`, `associar_personagens_ao_livro`,
`obter_personagem_do_livro`, `salvar_personagem_do_livro` e
`listar_papeis_personagem_livro`; associar e salvar separados (associar cria com
**Não definido**, salvar só faz `UPDATE`); modal de seleção e modal de detalhe;
listagem em cards/lista reusando `.libcard` e o radio `.toggle-set--radio`. O
`verificar-rf014.mjs` cobre a seção em **37/37** e o `verificar-rf011.mjs`
passou a **32/32** (a lista de seções futuras ficou sem Personagens).

**Ajuste de 28/10/2026 (change `rf014-ajustes-selecao-papeis`):** a modal de
seleção ganhou **busca por nome** e **grade paginada de 12 em 12** (seleção
mantida entre páginas), e o **Papel** passou de seis para **treze valores** —
entram **Oponente**, **Confidente**, **Figurante**, **Coprotagonista**,
**Mentor**, **Herói** e **Vilão**. O `CHECK` ampliado exigiu a migração
**v13**, que recria `livro_personagem`, copia os vínculos e recria o índice.
`listar_personagens_para_livro` passou a receber `filtro_nome`, `pagina` e
`por_pagina` e devolve `itens`/`total`/`pagina`/`porPagina`. O
`verificar-rf014.mjs` subiu para **30/30** (busca, paginação, seleção entre
páginas e papel novo) e a suíte Rust para **120 testes**.

**Ajuste de 28/10/2026 (change `rf014-ajuste-rotulo-titulos`):** o campo local
do vínculo passou a se chamar **Títulos/Outros Nomes**; a **Alcunha** global
continua com esse nome e somente leitura. O estado, a coluna `alcunha` e o
payload da API não mudaram — só o rótulo. O `verificar-rf014.mjs` passou a
**33/33** ao conferir o rótulo além do comportamento.

**Ajuste de 28/10/2026 (change `rf014-vinculos-ficha-global`):** a ficha global
passou a ler os vínculos. O painel **Vínculos com Livros** lista **Livro**,
**Papel** e **Total de Capítulos em que aparece** (contagem real; 0 quando não
houver), e a **Curva de**
arco em cada livro** mostra o nome de cada livro com **sem dados por enquanto**.
O comando de leitura é `listar_livros_do_personagem` (49 no total); não há
migração e a ficha não edita o vínculo. O `verificar-rf014.mjs` passou a
**35/35** e a suíte Rust a **122 testes**.

**Ajuste de 28/10/2026 (change `rf014-contagem-e-link-livros`):** o rodapé do
card da lista global passou a mostrar a quantidade real de livros vinculados
(`totalLivros`, calculado por subconsulta em `livro_personagem`) e o nome do
livro no painel **Vínculos com Livros** virou link para a página do livro.
Nenhum comando ou migração nova; o `verificar-rf014.mjs` passou a **37/37** e a
suíte Rust a **123 testes**.

**Armadilhas encontradas ao implementar (RF014):**

- **`innerText` aplica `text-transform`:** o título de área vira
  `DADOS DO PERSONAGEM` e a comparação com caixa mista falha mesmo com o texto
  certo.
- **`flatten` colide com a alcunha:** o detalhe aninha o personagem global
  (`personagem`) porque ficha e vínculo têm `alcunha`; achatar o struct faria
  uma das chaves sumir no JSON.
- **Livro não salvo é `Option<i64>`:** os comandos aceitam `null` para devolver
  `LivroNaoSalvo`; com `i64` a falha viria da desserialização, sem mensagem útil.
- **Associar não é salvar:** o primeiro cria com **Não definido** e devolve o
  relatório; o segundo só faz `UPDATE` e confere linhas afetadas
  (`VinculoNaoEncontrado`).
- **A seleção não pode depender da página:** o array de marcados fica no React;
  trocar de página ou buscar não o limpa. O rodapé mostra a contagem, e o total
  devolvido pelo domínio é o da busca (não o da página).
- **Busca em memória:** filtrar com `to_lowercase` do Rust evita o `NOCASE` só
  ASCII do SQLite; a biblioteca global pequena permite fatiar a página depois
  do filtro.
- **Ampliar `CHECK` recria a tabela:** a v13 segue o padrão da v8 — tabela nova,
  cópia, drop, rename e índice reconstruído; nenhum passo publicado é editado.

### Capítulos do livro (RF015)

O RF015 abre a seção **Capítulos** do livro, que o RF011 deixava como tela
informativa. O escritor planeja a estrutura em um quadro de status e edita cada
capítulo no painel abaixo, com os personagens do elenco e o evento de arco.

| Decisão | Motivo |
|---|---|
| **Migração v14 com `capitulo` e `capitulo_personagem`** | Número único por livro, status/tipo com `CHECK`, textos de planejamento, cenário e datas; a associação N:N guarda Evento/Tipo de Evento com `CHECK` da combinação. A **v15** acrescenta o **Motivo do Evento** por personagem e a **v16** o **Motivo do Tipo** do capítulo. |
| **Quadro agrupado e ordenado no front-end** | `listar_capitulos` traz todos os capítulos; cada coluna ordena por Número/Data de criação sem nova consulta. |
| **Colunas fixas com rolagem** | O quadro tem quatro colunas de 520 px; cabeçalho (ordenação) e rodapé (**Adicionar Capítulo**) ficam parados e o corpo rola. |
| **Criar pelos dois caminhos** | **Novo Capítulo** cria no Esboço; o rodapé da coluna cria no status da coluna. O número é `MAX(numero)+1` e o título provisório é **Capítulo N**. |
| **Salvar só faz `UPDATE`** | A criação é explícita no quadro; salvar um id errado nunca vira capítulo novo. Os personagens do capítulo são regravados na mesma transação. |
| **Personagens do elenco do livro** | O seletor usa o elenco do RF014; Evento e Tipo de Evento seguem o mapa Neutro→Neutro, Ponto de Ligação→Ascensão/Declínio, Ponto de Virada→Apogeu/Queda. |
| **Cenário de worldbuilding sem mundo** | O campo fica desabilitado com “Nenhum mundo associado a este livro” até a associação livro–mundo existir; a coluna `cenario_localidade_id` já está pronta. |
| **Métricas e ficha global** | `estatisticas.capitulos` conta `capitulo`; o Painel do Livro busca a lista; o total de capítulos da ficha global é `COUNT(DISTINCT capitulo_id)` por personagem/livro. |

**Comandos (55 no total):** `listar_capitulos`, `obter_capitulo`,
`criar_capitulo`, `salvar_capitulo`, `mover_capitulo` e `listas_capitulo`
(seis novos). O `verificar-rf015.mjs` cobre o quadro em **18/18**; o
`verificar-rf011.mjs` passou a **33/33** (Capítulos é seção real) e o
`verificar-rf014.mjs` a **37/37** (total de capítulos real).

**Ajuste de 28/10/2026 (change `rf015-ajustes-painel-capitulo`):** o **K.O**
passou a ficar ao lado do **Punch**, com altura curta; a ajuda do **Tipo** foi
quebrada em quatro parágrafos (Ação, Suspensão, Direto e Indireto); o **Cenário
Descritivo** usa altura curta; e cada personagem do capítulo ganhou o **Motivo
do Evento** abaixo de Evento/Tipo. A migração **v15** aditiva acrescenta
`motivo` em `capitulo_personagem` com `DEFAULT ''`, sem recriar a tabela. Nenhum
comando novo (continuam **55**); a suíte Rust passou a **134 testes** e o
`verificar-rf015.mjs` a **18/18**.

**Ajuste de 28/10/2026 (change `rf015-motivo-tipo`):** o **K.O** passou a ser um
`input` com a mesma altura do **Punch** e o painel ganhou o **Motivo do Tipo**
como texto médio abaixo do Tipo. A migração **v16** aditiva acrescenta
`motivo_tipo` em `capitulo` com `DEFAULT ''`, sem recriar a tabela. Nenhum
comando novo (continuam **56**); a suíte Rust passou a **141 testes** e o
`verificar-rf015.mjs` a **19/19**.

**Armadilhas encontradas ao implementar (RF015):**

- **Número único por livro:** `UNIQUE(livro_id, numero)` + `traduzir_erro_numero`;
  editar para um número usado devolve `NumeroCapituloDuplicado`. Criar calcula
  `MAX(numero)+1`; não use `INSERT OR REPLACE` no Save.
- **Evento e Tipo de Evento são um par:** o `CHECK` recusa Neutro+Apogeu,
  Ponto de Ligação+Neutro e Ponto de Virada+Ascensão. A UI redefine o Tipo para
  o primeiro válido ao trocar o Evento.
- **A criação é imediata:** os botões criam o registro antes da edição; o
  painel abre com o capítulo recém-criado e o Save só atualiza. O teste confere
  que o cabeçalho cria no Esboço e o rodapé no status da coluna.
- **Drag & drop sintético:** os E2E precisam compartilhar um `DataTransfer`
  entre `dragstart`, `dragover` e `drop`; um evento sem ele não carrega o id.
- **Colunas de altura fixa:** o `.column__body` é o único com `overflow-y:auto`;
  o cabeçalho e o rodapé não rolam. Medir a altura no verificador evita voltar
  a uma coluna que cresce.
- **Cenário vazio de propósito:** não liste todas as localidades para
  “preencher” o select; a associação livro–mundo ainda não existe.
- **Ficha global:** a contagem de capítulos usa `capitulo_personagem` filtrado
  por `livro_id` do vínculo; sem o filtro, o mesmo personagem contaria
  capítulos de todos os livros na linha de cada livro.

### Período da história e ordem dos módulos (ajuste do RF011)

| Decisão | Motivo |
|---|---|
| **Período como texto no banco, só dígitos na tela** | `periodo_de`/`periodo_ate` continuam `TEXT DEFAULT ''` (o payload é string), mas o `onChange` filtra com `somenteNumeros()`; o escritor pediu anos numéricos no ajuste de 29/10/2026. |
| **Período legado preservado, não migrado** | Livros antigos com “Século XXII”/“1921–1923” são exibidos intactos, com aviso, **Usar <dígitos>** e **Limpar**; a edição não filtra enquanto o valor for texto e o **Salvar** só avisa. Migração automática perderia a intenção do escritor. |
| **De/Até lado a lado em `.formlinha`** | Os dois campos formam o grupo **Período da História** com `gap: 8px` e `flex-basis: 160px`; antes caíam em colunas distantes do `.formgrid` na janela maximizada. |
| **Ordem dos módulos em `MODULOS_PAINEL`** | A grade do Painel é data-driven; mover **Dados do Livro** para o início mantém os `id` e a navegação. |
| **v11 aditiva** | Duas colunas com `ALTER TABLE ... ADD COLUMN`; não recria `livro` e preserva os dados. |

**Armadilha:** o período não é carregado em `listar_livros`; o verificador do
RF011 lê por `obter_livro` e cobre a ordem dos cards por `.block__name`. O teste
fixa a sequência **Dados do Livro → Exportar**. No efeito de filtro, cuidado
com `**/` dentro de comentário de bloco em `.jsx`: `**De**/**Até**` fecha o
comentário e quebra o build. O `verificar-rf011.mjs` confere o filtro numérico,
a mesma linha e a distância de até 12 px entre **De** e **Até**. O cenário de
período legado semeia “Século XXII” e “1921–1923” via `salvar_livro`, confere
que a digitação não apaga o texto, que o **Salvar** preserva e avisa e que os
botões convertem; a auditoria de suporte usa `periodo_de GLOB '*[^0-9]*'` (ou o
campo **Até**) em consulta somente leitura.


### Janela maximizada com barra de título (ajuste do RF001)

| Decisão | Motivo |
|---|---|
| **`maximized: true` e sem `fullscreen`** | Ocupa a área útil mantendo a barra de título nativa; `fullscreen` esconderia a barra de título e a barra de tarefas. |
| **Área útil, não a tela inteira** | A barra de tarefas fica visível; é o comportamento padrão do Windows. |
| **Verificação pelo viewport** | O CDP não acessa a janela nativa; `innerWidth` igual a `screen.width` e `screen.availHeight - innerHeight` entre 10 e 80 px provam a janela maximizada com barra. |

**Armadilha:** o WebView2 informa `outerHeight == innerHeight`, então não dá para
medir a barra por `outerHeight - innerHeight`; use a diferença contra
`screen.availHeight`. Mudar `tauri.conf.json` exige recompilar o binário (o
contexto do Tauri é embutido); o Vite sozinho não aplica a janela.

### Refatoração de qualidade Rust (out/2026)

| Decisão | Motivo |
|---|---|
| **`ErroDominio` + `CodigoErro`** | Domínios devolvem `Resultado<T>`; a mensagem continua em português, mas os testes verificam o código estável. `com_conexao` converte para `String` apenas no IPC. |
| **`TipoEntidade` em `entradas_mundo`** | Centraliza chaves, SQL de listagem/obtenção e mapeamento. Eliminou os seis blocos quase idênticos de `listar_entradas`/`obter_entrada`. |
| **`GrafoFamiliar`** | Carrega as arestas familiares uma vez; a subida/descida da árvore não faz consulta por nó. |
| **Exportação genérica** | `DocumentoExportavel` + `exportar_documento` unificaram a janela oculta, o canal, o timeout e a gravação de PDF da ficha e do mundo. |
| **Módulos menores** | Migrações em `banco/migracoes.rs`; testes em `src/<modulo>/testes.rs`; `tempfile::TempDir` via `DiretorioTemporario` remove a pasta mesmo em `panic!`. |
| **Qualidade obrigatória** | `cargo fmt --check`, `cargo clippy --all-targets -- -D warnings` e testes em `npm run verificar:rust`; `[lints.clippy] all = "warn"` no `Cargo.toml`. |

**Armadilha corrigida nesta rodada:** `salvar_entrada` ignorava as linhas afetadas
pelo `UPDATE ... WHERE id = ? AND mundo_id = ?`. Um id de outro mundo devolvia
sucesso; no caso de `Sistema`, as regras do sistema alheio podiam ser apagadas e
regravadas. Cada atualização agora chama `exigir_afetada(afetadas)` antes de
tocar em `sistema_regra`, e há teste com dois mundos.

### Visual

| Decisão | Motivo |
|---|---|
| **Painéis modulares "builder"** | Bordas definidas, raio pequeno, faixas de acento. Vibe de "interface de jogo de construção". |
| **Acento por módulo** | Personagens âmbar, Worldbuilding verde, Capítulos azul, Dados do Livro violeta; marca roxa. Localiza o usuário pelo contexto. |
| **Cor do livro sobrepõe a da marca** | Dentro de um projeto, a navegação usa `--book-color` via `.app--book`. Reforça o contexto. |
| **Retratos sempre 3:4 com `object-fit: cover`** | As imagens originais variam de 0,47 a 0,74 de proporção. `cover` + `object-position: center 22%` iguala o tamanho sem distorcer e favorece o rosto. |
| **Três temas via `data-theme`** | Blade Byte (sci-fi, padrão), Old Tower (medieval, pastel) e Tundra (claro e frio: gelo + vinho + verde). O tema muda **só cor, sombra e tipografia** — nunca o layout, nunca a marcação. |

### Armadilha que já custou tempo: o seletor de tema

A primeira versão usava `<input type="radio">` + `:has()`. **Não funciona:** um
radio só muda o visual do próprio cartão, nunca o `data-theme` do documento. O
usuário reportou "não mudou, não deseleciona o tema atual".

A solução é `js/tema.js`: lê `?tema=` da URL ou o `localStorage`, aplica no
`<html>`, salva a escolha e reescreve os links para o tema sobreviver à
navegação. Os cartões de `temas.html` são `<a data-tema-opcao="...">`.

Em Spring Boot este arquivo **deixa de existir**: o tema é preferência do
usuário, renderizada no servidor com `<html th:attr="data-theme=${prefs.tema}">`.

> **Atenção:** o parágrafo acima é **histórico** (do protótipo). A stack atual é
> Tauri + React; o seletor de tema real será definido em requisito próprio,
> preservando os tokens `data-theme` já existentes no CSS do protótipo.

---

## 4. Estado atual

### Aplicativo (código real — Tauri + React)

- **RF001 implementado, validado e arquivado** (change
  `2026-10-20-rf001-estrutura-inicial`). Estrutura inicial: janela desktop
  **TaleCraft** + mensagem de inicialização + comando Rust `mensagem_inicial`
  invocado pelo React via `invoke` (IPC).
- **RF002 implementado, validado e arquivado** (change
  `2026-10-20-rf002-interface-visual-navegacao-temas`). Traz para o app a casca
  visual do protótipo: marca clicável, topbar, sidebar com os grupos
  **Início** / **Preferências** / **Livro aberto**, telas vazias, a tela Temas
  (3 cartões) e o sistema de temas persistido em `localStorage`
  (`talecraft.tema`, padrão `blade-byte`). Inclui ainda a **tela de
  carregamento (splash)** com logo + nome + versão.
  - **Design system:** `src/talecraft.css` (cópia do protótipo) + `src/fontes.css`
    e `src/fontes/` (20 `.woff2` deduplicados por hash; 36 blocos `@font-face`).
    Removido o `src/styles.css` do RF001.
  - **Telas/navegação:** `src/paginas.js` guarda título, `descricao` (tela vazia),
    `resumo` (menu), crumb, ícone e acento. Navegação por estado React em
    `src/App.jsx` (sem router).
  - **Topbar:** botão de tema mostra o **nome do tema ativo**; canto direito
    exibe a **versão** (`getVersion()` do Tauri, com fallback `VITE_APP_VERSION`
    injetado pelo Vite a partir do `package.json`).
  - **Splash:** `src/componentes/Splash.jsx` (overlay `.splash`), exibido
    enquanto `App.carregando` for verdadeiro. `carregarDados` é o **ponto único**
    de inicialização — consulta o comando Rust `estado_inicial` e, em seguida,
    `verificar_banco` (RF003). O ajuste de 28/10/2026 (change
    `rf002-splash-legivel`) deixou o **ícone grande**, o nome **TaleCraft** ao
    lado e a **versão** abaixo em fonte menor; a splash fica no mínimo **1,2 s**
    e o fundo usa a cor-base antes do CSS, sem piscada branca (RF002-CA009,
    RF002-CA010).
  - **Verificação:** `scripts/verificar-rf002.mjs` (Edge headless via CDP,
    WebSocket mínimo sobre `node:net` porque o Node 20.15 não tem `WebSocket`
    global). **20/20 OK**. Detecta o splash com
    `Page.addScriptToEvaluateOnNewDocument` + `MutationObserver` (ele some rápido
    demais para polling) e mede geometria, fonte, fundo e duração mínima.
- **RF003 implementado, validado e arquivado** (change
  `2026-10-20-rf003-infraestrutura-banco-dados`). Infraestrutura do banco:
  SQLite **embutido** (`rusqlite` feature `bundled`) + migrações versionadas
  (`rusqlite_migration`). Nenhuma entidade de negócio (RF003-CA012).
  - **Módulo:** `src-tauri/src/banco.rs` — caminho no diretório de dados do app,
    abertura/criação, migrações (via `PRAGMA user_version`) e a operação de
    teste. A conexão vive no estado gerenciado do Tauri (`Mutex<EstadoBanco>`),
    aberta uma vez no `setup` do `lib.rs`. **O front-end nunca fala SQLite**:
    só comandos Tauri (RF003-CA007).
  - **Arquivo do banco:** `%APPDATA%\com.talecraft.desktop\talecraft.db`
    (resolvido por `app.path().app_data_dir()`), fora da instalação.
  - **Comandos:** `estado_inicial` agora devolve `Result<bool, String>` — o erro
    real da inicialização vira mensagem útil, sem derrubar o app (RF003-CA009);
    `verificar_banco` é a operação de teste acessível pelo front (RF003-CA008).
  - **Migrações:** a versão 1 cria só `info_banco` (infraestrutura interna), sem
    tabelas de domínio. Aditivas e idempotentes (RF003-CA006).
  - **Testes Rust:** 6 no total (5 novos) — criação, idempotência das migrações,
    persistência entre conexões, operação de teste e falha de abertura.
  - **Verificação viva:** `scripts/verificar-rf003.mjs` (**4/4 OK**) — splash,
    abertura sem erro, arquivo no diretório de dados e sem regressão do RF002.
    A persistência entre execuções foi conferida com o app real: o `criado_em`
    e o hash do arquivo ficam **idênticos** após fechar e reabrir.
  - **Custo:** a MSI cresceu ~2,09 → **2,70 MiB** (SQLite embutido), e o build
    release leva ~2m20s. É o preço de não exigir SQLite instalado (CA011).
- **RF004 implementado, validado, testado pelo usuário e ARQUIVADO** (change
  `2026-10-21-rf004-personagens`). Primeiro domínio do produto: o personagem
  **global** (biblioteca compartilhada entre livros). O archive criou a spec
  `character-library` (14 requisitos), atualizou `database-foundation` (2) e
  acrescentou 1 requisito em `rust-bridge`.
  - **Requisito:** `documents/talecraft.md` RF004 (Nome, Idade, Retrato,
    Personalidade, Força, Fraqueza, Interesses, Raça, Alcunha, Biografia,
    Relações); só o **Nome** é obrigatório; regras RN001–RN009.
  - **Esquema:** migração **v2 aditiva** em `banco.rs` com `personagem_global`
    e `relacao_personagem`. Restrições no banco (não só na UI):
    `UNIQUE COLLATE NOCASE` no nome, `CHECK` dos 8 tipos, `CHECK` de
    autorrelação e `UNIQUE(origem_id, destino_id)`. **Sem `ON DELETE CASCADE`**
    (não há exclusão neste requisito). A v1 (RF003) migra para a v2 sem perder
    dados (teste `banco_v1_migra_para_v2_sem_perder_dados`).
  - **Back-end:** módulo `src-tauri/src/personagem.rs` (domínio) + **9 comandos
    Tauri** no `invoke_handler`: `listar_personagens`, `obter_personagem`,
    `salvar_personagem`, `associar_retrato`, `listar_personagens_para_relacao`,
    `listar_relacoes`, `salvar_relacao`, `listar_tipos_relacao` e
    `diretorio_dados_app`. Todos devolvem `Result<T, String>` com mensagem útil.
  - **Retrato:** escolhido pelo diálogo nativo (`tauri-plugin-dialog`), **copiado**
    para `<app_data_dir>/retratos/` com limite de **4 MB** e formatos JPG/PNG/WEBP;
    o banco guarda o caminho **relativo** (`retratos/12.png`) e o front-end monta
    a URL com `convertFileSrc`.
  - **Front-end:** `TelaPersonagens` (cards/lista, busca, "Filtrar por livro" sem
    opções), `TelaPersonagem` (formulário, retrato, painel de Relações Globais,
    Vínculos e Curva de Arco **vazios**) e `ModalRelacoes` (busca por nome, 8
    tipos). Estilos em `src/personagens.css` usando só tokens de tema.
  - **Verificação:** `scripts/verificar-rf004.mjs` (**20/20 OK**), que abre o
    **app Tauri de verdade** (WebView2 + CDP) contra um diretório de dados
    temporário isolado (`TALECRAFT_DADOS`). Inclui o retrato de ponta a ponta: o
    comando `associar_retrato` é chamado pela ponte do WebView com uma imagem
    real e confere-se que o `<img>` **carrega** (`naturalWidth > 0`) no detalhe,
    no cartão e na lista. Persistência entre execuções conferida com o app real
    (2 fichas + relação "Aliado" sobrevivem a fechar e reabrir).
  - **Retrato no WebView:** o `tauri.conf.json` habilita `assetProtocol` com o
    escopo `$APPDATA/**` (+ `$TEMP/**` para o banco isolado) e o crate `tauri`
    liga a feature `protocol-asset` — sem isso o `convertFileSrc` não carrega a
    imagem (RF004-CA017).
  - **Testes Rust:** **14** no total (7 do domínio de personagens, 2 da migração
    do RF004, 5 do RF003).
  - **Fora do escopo:** vínculo com livro, arco por livro, gráficos, exportação,
    galeria de imagens, exclusão de personagens, campos do protótipo ausentes do
    RF004 (Gênero, Origem, Ferida permanente, Traços).
- **RF005 implementado, validado, testado pelo usuário e ARQUIVADO** (change
  `2026-10-21-rf005-relacoes-familiares-bidirecionais`). Ajusta a tela de
  personagens: mais tipos de relação, bidirecionalidade e o quadro **Família**
  com a árvore familiar. O archive criou a spec `family-tree` (9 requisitos),
  atualizou `character-library` (7 added, 5 modified),
  `database-foundation` (1) e `rust-bridge` (1).
  - **Esquema:** migração **v3** aditiva em `banco.rs` — recria
    `relacao_personagem` com o `CHECK` de **dez** tipos (o SQLite não altera
    `CHECK` in-place), copiando as linhas existentes na transação do passo.
    `TIPOS_RELACAO` passou de 8 para **10** valores: entram `Irmão/Irmã` e
    `Aprendiz`. A v2 (RF004) migra para a v3 sem perder dados.
  - **Bidirecionalidade:** `salvar_relacao` (agora `&mut Connection`) grava o par
    espelhado numa **transação**, com `ON CONFLICT … DO UPDATE` (atualiza o tipo
    nos dois lados, sem duplicar). Tabela de espelho:
    `Filho/Filha ⇄ Mãe/Pai`, `Mentor ⇄ Aprendiz`; simétricos espelham a si mesmos.
  - **Ciclo de ascendência recusado** com mensagem útil: a subida por ascendentes
    (`HashSet` de visitados) roda **antes** da gravação.
  - **Árvore familiar** montada no back-end (`arvore_familiar`) e devolvida como
    `ArvoreFamiliar { nos, ligacoes }`; o front-end só desenha.
  - **Comandos:** saem de 9 para **10** — `arvore_familiar` é o novo (e
    `listar_tipos_relacao` passou a devolver dez). Novo helper `com_conexao_mut`
    no `lib.rs` para as transações.
  - **Front-end:** `ArvoreFamiliar.jsx` (SVG inline, `viewBox` calculado, sem
    biblioteca nova); quadro **Família** em `TelaPersonagem.jsx`, **abaixo** de
    Relações Globais, com estado vazio; `ModalRelacoes.jsx` lê os dez tipos do
    back-end; estilos em `personagens.css` só com tokens de tema.
  - **Leitura do painel:** a ficha mostra o **lado do par que chega** —
    `Ofélia → Esther : Filho/Filha` faz Ofélia ver Esther como `Mãe/Pai` e Esther
    ver Ofélia como `Filho/Filha` (RF005-CA005).
  - **Testes Rust:** **26** no total (14 do RF004/RF003 + 12 do RF005, incluindo o
    teste de geração `arvore_pendura_ascendentes_para_cima_e_descendentes_para_baixo`
    e o de sobreposição `arvore_nao_sobrepoe_nos_da_mesma_geracao`).
  - **Verificação:** `scripts/verificar-rf005.mjs` (**29/29** no app real — inclui
    os ajustes pedidos no teste do usuário: a mãe/pai na primeira linha, o nome
    abaixo do retrato, o **sentido do seletor da modal** e os **dois pais / duas
    filhas sem sobreposição**) e
    `scripts/verificar-rf005-persistencia.mjs` (**4/4**, duas execuções contra o
    mesmo banco). O `verificar-rf004.mjs` foi atualizado para as regras novas
    (**20/20**); `verificar-rf002.mjs` (18/18) e `verificar-rf003.mjs` (3/3) sem
    regressão.
  - **Árvore familiar (ajustes do teste do usuário):** os **ascendentes ficam
    sempre acima** — mãe/pai (e avós) na primeira linha, o personagem no meio,
    filhos/irmãos abaixo. Cada nó mostra o **retrato acima** e o **nome abaixo**,
    com fonte reduzida (10px), e é **clicável**: clicar no retrato ou no nome abre
    a ficha daquele personagem (o nó "?" não é clicável). Um teste Rust
    (`arvore_pendura_ascendentes_para_cima_e_descendentes_para_baixo`) fixa a
    regra de geração.
  - **Protótipo:** `prototype/personagem.html` ganhou o quadro Família com a
    árvore em SVG (mãe/avó acima, filha abaixo, nós clicáveis) e o
    `css/talecraft.css` os estilos `.familytree*`, validados.
- **RF006 implementado, validado, testado pelo usuário e ARQUIVADO** (change
  `2026-10-21-rf006-ajustes-personagens-painel-exportacao-botoes`). Três
  ajustes na tela de Personagens, **sem mudança de esquema** (o banco continua
  na v3), mais a correção do defeito reportado no teste do usuário (só o Nome
  entrava no PDF) e a **árvore familiar no PDF**.
  - **Painel Vínculos com livros retrátil:** o cabeçalho ganhou um
    `<button>` com `aria-expanded`/`aria-controls`; sem nenhum vínculo o
    painel abre **retraído** (só o cabeçalho), com vínculos abre expandido.
    O estado é local (`vinculosRetraidos`) e a contagem de vínculos vem de um
    ponto único (`totalVinculos`), pronto para o comando real do requisito de
    vínculos.
  - **Exportar Ficha (PDF):** botão ao lado do Salvar, **desabilitado** enquanto
    o personagem não estiver salvo. Abre o **diálogo nativo** de salvamento
    (`save()` do `tauri-plugin-dialog`, filtro `pdf`, nome sugerido
    `<Nome>.pdf`) e grava o PDF no destino escolhido.
  - **Rótulo branco** nos botões Salvar e Novo personagem, nos três temas.
  - **Esquema:** nada novo. Novo módulo de domínio `src-tauri/src/ficha.rs`
    (montagem da ficha) e `src-tauri/src/pdf.rs` (gravação via WebView2).
  - **Comandos novos** (14 no total): `montar_ficha`, `exportar_ficha` e
    `sinalizar_ficha_pronta`.
  - **Como o PDF sai:** opção A — o **recurso de impressão do próprio WebView**
    (`PrintToPdf` do WebView2, via `with_webview`). **Nenhuma biblioteca de PDF**
    foi acrescentada: `webview2-com` e `windows` já vinham no `Cargo.lock`
    pelo `wry`/`tauri` e foram apenas declaradas como dependência direta.
  - **Front-end:** `TelaFicha.jsx` (janela oculta, recognise o marcador
    `#ficha=<id>`), `FichaPersonagem.jsx` (o documento), `fichaModo.js`
    (marcador e aviso de "pronto") e os estilos `.ficha*` no design system.
  - **Testes Rust:** **31** no total (26 do RF001–RF005 + 5 do RF006).
  - **Verificação:** `scripts/verificar-rf006.mjs` (**26/26** no app real) —
    inclui PDF gerado com assinatura `%PDF`, ficha completa com retrato
    (**prova de que a imagem entra no PDF**: 32 KB sem retrato → 136 KB com
    retrato, com `DCTDecode` no arquivo), **sentido do ícone do painel** (seta
    para cima recolhe, para baixo abre), **contraste real** do rótulo
    (4.99:1 no Tundra) e o **fluxo real do botão** (botão -> diálogo ->
    comando -> PDF, com o diálogo nativo substituído por um `fetch`
    interceptado — a contagem de chamadas ao diálogo tem de ser **1**).
    Sem regressão: `verificar-rf002.mjs` 18/18, `verificar-rf003.mjs` 3/3,
    `verificar-rf004.mjs` 20/20, `verificar-rf005.mjs` 29/29 e persistência
    4/4.
  - **Protótipo:** `prototype/personagem.html` ganhou o botão Exportar Ficha e
    o ícone de retração; `prototype/css/talecraft.css` ganhou `.panel__collapse`
    e os estilos `.ficha*`.
- **RF007 implementado, validado e ARQUIVADO** (change
  `rf007-dados-basicos-worldbuilding`). Dados básicos de Worldbuilding/Mundos,
  **migração v4** aditiva.
  - **Esquema:** `mundo_global` (nome único `COLLATE NOCASE`, Tipo/Nível/
    Gêneros) e `mundo_genero` (chave composta). A v3 migra para a v4 sem perder
    dados.
  - **Domínio:** `src-tauri/src/imagem.rs` compartilhado (validação 4 MB,
    JPG/PNG/WEBP, cópia), `src-tauri/src/mundo.rs` (listagem com filtros,
    transações, validações). `personagem.rs` refatorado para usar `imagem.rs`.
  - **Comandos:** `listar_mundos`, `obter_mundo`, `salvar_mundo`,
    `associar_imagem_mundo`, `listas_mundo`, `exportar_mundo`.
  - **Front-end:** `TelaMundos.jsx`, `TelaMundo.jsx`, `DocumentoMundo.jsx`,
    `TelaDocumentoMundo.jsx`, `mundosApi.js`, `mundoModo.js`,
    `src/nomeArquivo.js` (reexportado por `personagensApi.js`), estilos
    `src/mundos.css`. Worldbuilding integra lista/detalhe e modo oculto
    `#mundo=<id>`; painel Vínculos retrátil sem dados, listas fechadas, imagem
    16:9, tooltip do Nível, gêneros multi-seleção e PDF reusando `PrintToPdf`.
  - **Testes Rust:** 20 do RF007; **51** no total naquele fechamento.
  - **Verificação:** `scripts/verificar-rf007.mjs` **33/33** no app real,
    incluindo o documento renderizado com entradas e facções.
- **RF008 implementado, validado e ARQUIVADO** (change
  `rf008-entradas-mundo`). Entradas do Mundo nas seis abas, **migração v5**
  aditiva.
  - **Esquema:** `localidade`, `raca_povo`, `artefato`, `arma`, `evento`,
    `sistema` e `sistema_regra` (com `ordem` e `UNIQUE(sistema_id, ordem)`),
    mais índices por `mundo_id`. A v4 migra para a v5 sem perder dados.
  - **Domínio:** `src-tauri/src/entradas_mundo.rs` com paginação, validação de
    Nome, Tipo de Sistema fechado e regras ordenadas gravadas em transação.
  - **Comandos:** `listar_entradas_mundo`, `obter_entrada_mundo`,
    `salvar_entrada_mundo`, `listar_tipos_sistema`.
  - **Front-end:** `TabelaEntradas.jsx`, `ModalEntradaMundo.jsx`,
    `entradasMundoApi.js`, `entradasMundo.js`; abas depois de Dados gerais/
    Imagem, inclusão desabilitada enquanto o mundo não está salvo.
  - **Testes Rust:** 8 do RF008; **59** no total naquele fechamento.
  - **Verificação:** `scripts/verificar-rf008.mjs` **21/21** no app real.
- **RF009 implementado, validado e ARQUIVADO** (change `rf009-faccoes`).
  Facções vinculadas ao Mundo e associação N:N com personagens, **migração v6**
  aditiva.
  - **Esquema:** `faccao` (`mundo_id`, Nome, Tipo fechado, ideologia, líderes,
    base, descrição, história) e `faccao_personagem` (`faccao_id`,
    `personagem_id`, `papel` `Líder`/`Membro`, `UNIQUE(faccao_id,
    personagem_id)`), com índices.
  - **Domínio:** `src-tauri/src/faccao.rs` com listagem paginada, `obter` e
    `salvar`, listas fechadas, associações, alteração de papel e remoção.
    `TabelaFaccoes` busca a facção **completa** (`obterFaccao`) antes de editar.
  - **Comandos:** `listar_faccoes`, `obter_faccao`, `salvar_faccao`,
    `listar_tipos_faccao`, `listar_faccoes_do_personagem`,
    `listar_personagens_para_associacao_faccao`,
    `listar_personagens_da_faccao`, `listar_faccoes_disponiveis`,
    `salvar_associacao_faccao_personagem`,
    `remover_associacao_faccao_personagem`.
  - **Front-end:** aba **Facções** depois de Sistemas; `TabelaFaccoes.jsx`,
    `ModalFaccao.jsx`, `ModalFaccaoPersonagem.jsx`, `faccoesApi.js`,
    `faccoes.js`; painel **Facções** na ficha do personagem e reflexo do
    contador na aba do Mundo.
  - **Testes Rust:** 17 do RF009; **76** no total naquele fechamento.
  - **Verificação:** `scripts/verificar-rf009.mjs` **16/16** no app real,
    incluindo duplicidade do par, múltiplas facções, alteração de papel,
    remoção, reflexo bidirecional e mundo não salvo.
- **Documento do Mundo completo** (change
  `rf007-exportacao-mundo-dados-associados`, arquivado em
  `2026-10-26-rf007-exportacao-mundo-dados-associados`): o PDF deixou de sair só com os
  dados básicos. `documento_mundo.rs` agrega Mundo + entradas (com regras dos
  Sistemas) + facções (com personagens/papéis), exposto por
  `montar_documento_mundo`; `DocumentoMundo.jsx` renderiza as seções
  **Entradas do Mundo** e **Facções**. **2 testes novos** (agregado completo e
  mundo sem associações); a suíte passou a **79** testes após a refatoração de
  qualidade (erro tipado, `TipoEntidade`, grafo familiar e `tempfile`).
- **RF010 — Livros: Meus Livros** (changes `rf010-livros-meus-livros` e
  `rf010-meus-livros-estado-vazio`, arquivados em
  `2026-10-27-rf010-livros-meus-livros` e
  `2026-10-27-rf010-meus-livros-estado-vazio`): a página inicial agora é a tela
  **Meus Livros**, com `TelaLivros.jsx`. Como ainda não há livros, as quatro
  métricas exibem **0**, a seção **Todos os livros** mostra **0 resultados** e
  estado vazio, e o painel de personagens não tem linhas. Não há dados fictícios,
  cards de livros, card **Novo livro**, `Importar .pdc`, cadastro, detalhe,
  entidade Livro, migração ou comando Tauri; o botão **+ Novo Livro** não navega.
  Verificação `scripts/verificar-rf010.mjs` **17/17** (atualizada para o RF011:
  **18/18**).
- **RF011 - Livros: página do livro, navegação e Dados Gerais** (changes
  `rf011-livro-dados-gerais`, `rf011-ajuste-metricas-subgeneros` e
  `rf011-preservar-subgeneros-por-genero`): o botão **+ Novo Livro** abre a
  página do livro em modo de criação; o registro só é
  gravado ao salvar um título válido em **Dados do Livro**. A página do livro tem
  faixa do livro aberto, menu lateral próprio (**Painel do Livro**, **Dados do
  Livro**, **Personagens**, **Capítulos**, **Worldbuilding**, **Análise** com
  **Gráficos**/**Exportar**, **Início**) e as seções futuras com tela
  informativa.
  - **Esquema:** migração **v7** aditiva com `livro` (título único, gênero,
    faixa de público, idioma) e `livro_subgenero` (chave composta); a **v8**
    recria `livro_subgenero` com o `CHECK` ampliado para os doze subgêneros de
    Fantasia. A v6 migra para a v7 e a v7 para a v8 sem perder dados.
  - **Domínio:** `src-tauri/src/livro.rs` com listas fechadas (3 gêneros; 6/12/5
    subgêneros; 4 faixas; 3 idiomas), unicidade sem diferenciar caixa com
    `to_lowercase()` do Rust (o `NOCASE` do SQLite só dobra ASCII) e gravação
    transacional de livro + subgêneros.
  - **Métricas:** `estatisticas_biblioteca` conta somente o que está associado a
    livros; **Personagens**, **0 em 2+ livros**, **Capítulos planejados** e
    **Entradas de worldbuilding** exibem **0** enquanto não houver vínculo
    personagem–livro, capítulos e associação livro–mundo (RF011-RN017).
  - **Comandos:** `listar_livros`, `obter_livro`, `salvar_livro`, `listas_livro`
    e `estatisticas_biblioteca`.
  - **Front-end:** `livrosApi.js`, `livros.js`, `livros.css`, `TelaLivro.jsx`,
    `SidebarLivro.jsx`, `Bookband.jsx` e o Tab Panel reutilizável
    `PainelAbas.jsx`; `TelaLivros.jsx` passa a listar livros reais em grade ou
    lista, com busca, métricas e abertura do livro.
  - **Testes Rust:** 16 novos; **95** no total.
  - **Verificação:** `scripts/verificar-rf011.mjs` **31/31** no app real (eram
    29 depois do RF012; o ajuste de período/ordem acrescentou 2);
    `verificar-rf010.mjs` atualizado para **18/18**; RF002–RF009 sem regressão.
- **RF012 - Livros: aba Resumo** (change `rf012-livro-aba-resumo`): a página
  **Dados do Livro** passa a ter as abas **Dados Gerais** e **Resumo**, nesta
  ordem, e o botão **Descartar** é removido (RF012-TL003, RF012-RN005). A aba
  **Resumo** tem os campos de texto longo **Resumo** e **Final do Livro**,
  opcionais e com quebras de linha preservadas.
  - **Esquema:** migração **v9** aditiva com `ALTER TABLE livro ADD COLUMN
    resumo` e `final_livro`, ambos `TEXT NOT NULL DEFAULT ''`; bancos v8 migram
    preservando livros e subgêneros, e os livros antigos ganham textos vazios.
  - **Domínio:** `livro.rs` ganhou `resumo` e `final_livro`; `obter_livro`
    devolve os textos e `listar_livros` **não** os carrega (design D3), porque a
    busca de Meus Livros chama a listagem a cada tecla digitada.
  - **Comandos:** nenhum novo; continuam **42** no `invoke_handler`.
  - **Front-end:** `TelaLivro.jsx` (abas, campos e remoção do **Descartar**),
    `livrosApi.js` (livro vazio com os dois textos; `mesmosDados` removido) e
    `livros.css` (`.textarea--long`).
  - **Testes Rust:** 2 novos (gravação/releitura com quebras de linha e migração
    v8 → v9); **97** na época (**102** no total atual).
  - **Verificação:** `scripts/verificar-rf012.mjs` **15/15** no app real;
    `verificar-rf011.mjs` atualizado para **29/29** (sem a checagem do
    **Descartar**); RF002–RF010 sem regressão.
- **RF013 - Livros: abas Sinopse, Tema, Conflito e Voz Narrativa/Tom/Tempo**
  (change `rf013-livro-abas-narrativas`): o Tab Panel de Dados do Livro passa a
  ter seis abas e o **Humor** é a única seleção múltipla.
  - **Esquema:** migração **v10** aditiva com treze colunas em `livro` e a
    tabela `livro_humor` (PK composta, `CHECK` e FK); bancos v9 migram
    preservando os dados.
  - **Domínio:** `livro.rs` ganhou os oito textos, as cinco listas de valor único
    e `humor: Vec<String>`; `obter_livro` devolve tudo e `listar_livros` devolve
    vazio/sem valor (design D3).
  - **Comandos:** nenhum novo; continuam **42**.
  - **Front-end:** `DadosLivro.jsx` extraído de `TelaLivro.jsx`, com as abas
    `AbaDadosGerais`, `AbaResumo`, `AbaSinopse`, `AbaTema`, `AbaConflito` e
    `AbaVozNarrativa`; helpers `CampoTexto`, `CampoLista` e `SelecaoMultipla`;
    chips de Humor em `livros.css`.
  - **Testes Rust:** 3 novos (abas narrativas, listas inválidas e migração
    v9 → v10); **100** na época (**102** no total atual).
  - **Verificação:** `scripts/verificar-rf013.mjs` **15/15** no app real;
    `verificar-rf012.mjs` ajustado para as duas primeiras abas (**15/15**);
    RF002–RF011 sem regressão.
- **RF014 - Livros: personagens do livro** (changes
  `rf014-personagens-do-livro` e `rf014-ajustes-selecao-papeis`): a seção
  **Personagens** deixa de ser tela informativa e passa a listar o elenco do
  livro em cards ou lista, com **Adicionar Personagens**, associação múltipla,
  modal de detalhe do vínculo e métricas reais.
  - **Esquema:** migração **v12** aditiva com `livro_personagem` (PK composta
    `livro_id` + `personagem_id`, FKs, `CHECK` do **Papel**, quatro textos e
    índice por `personagem_id`); a **v13** recria a tabela para ampliar o
    `CHECK` aos treze papéis, copiando os vínculos. Bancos v11/v12 migram
    preservando livros, personagens, abas, humor, relações e vínculos.
  - **Domínio:** `src-tauri/src/livro_personagem.rs` com listagem do elenco,
    biblioteca para a seleção com **busca e paginação**, associação em lote
    transacional (duplicidade vira relatório `associados`/`jaAssociados`),
    detalhe e gravação só do vínculo (`UPDATE` + `VinculoNaoEncontrado`).
  - **Comandos:** **sete novos** (49 no total) —
    `listar_personagens_do_livro`, `listar_livros_do_personagem`,
    `listar_personagens_para_livro`, `associar_personagens_ao_livro`,
    `obter_personagem_do_livro`, `salvar_personagem_do_livro` e
    `listar_papeis_personagem_livro`.
  - **Papéis:** treze valores — **Protagonista**, **Antagonista**,
    **Coadjuvante**, **Aliado**, **Falso Antagonista**, **Falso Protagonista**,
    **Oponente**, **Confidente**, **Figurante**, **Coprotagonista**, **Mentor**,
    **Herói** e **Vilão** — além de **Não definido**.
  - **Métricas:** `livro::estatisticas` conta
    `COUNT(DISTINCT personagem_id)` e `GROUP BY ... HAVING COUNT(*) >= 2`;
    personagens sem vínculo não entram. O card **Personagens** do Painel do
    Livro mostra o tamanho do elenco.
  - **Front-end:** `TelaPersonagensLivro.jsx`, `ModalSelecaoPersonagens.jsx`
    (busca por nome, grade de 12 em 12 e seleção mantida entre páginas),
    `ModalPersonagemLivro.jsx` e `livroPersonagensApi.js`; a modal de detalhe
    tem os dados globais somente leitura e os cinco campos do vínculo. Não há
    ação de desvincular.
  - **Testes Rust:** 21 novos (domínio, busca/paginação, migrações v11 → v12 e
    v12 → v13, métricas, livros do personagem e contagem de vínculos);
    **123** no total.
  - **Verificação:** `scripts/verificar-rf014.mjs` **37/37** no app real
    (inclui busca, paginação, seleção entre páginas, papel novo, o rótulo
    **Títulos/Outros Nomes**, os vínculos na ficha global e a contagem/link de
    livros); `verificar-rf011.mjs` passou a **32/32** (Personagens abre a seção
    real); RF002–RF013 sem regressão.
- **RF015 - Livros: capítulos** (change `rf015-capitulos-do-livro`): a seção
  **Capítulos** deixa de ser tela informativa e passa a ter o quadro de status
  com Esboço, Rascunho, Revisão e Finalizado, criação pelos dois caminhos,
  ordenação por Número/Data, painel de edição, personagens do arco e arrastar.
  - **Esquema:** migração **v14** aditiva com `capitulo` (número único por
    livro, status, tipo, textos, cenário e datas) e `capitulo_personagem`
    (Evento/Tipo de Evento com `CHECK` da combinação); a **v15** acrescenta o
    **Motivo do Evento** e a **v16** o **Motivo do Tipo**.
  - **Domínio:** `src-tauri/src/capitulo.rs` com listagem, leitura, criação com
    próximo número, gravação transacional dos personagens e movimento de status.
  - **Comandos:** **seis novos** (55 no total) — `listar_capitulos`,
    `obter_capitulo`, `criar_capitulo`, `salvar_capitulo`, `mover_capitulo` e
    `listas_capitulo`.
  - **Front-end:** `TelaCapitulosLivro.jsx` (quadro, colunas fixas com rolagem,
    ordenação, criação e drag & drop), `PainelCapitulo.jsx` (campos, ajuda do
    Tipo, personagens do elenco com Evento/Tipo e **Salvar** no cabeçalho),
    `capitulosApi.js` e estilos em `livros.css`.
  - **Métricas e ficha:** `estatisticas.capitulos` conta os capítulos reais; o
    Painel do Livro mostra o total; a ficha global conta os capítulos por
    personagem/livro.
  - **Testes Rust:** 12 novos (capítulos, migrações v14/v15/v16 e contadores);
    **141** no total.
  - **Verificação:** `scripts/verificar-rf015.mjs` **19/19** no app real;
    `verificar-rf011.mjs` passou a **33/33** (Capítulos real) e
    `verificar-rf014.mjs` a **37/37** (total real); RF002–RF014 sem regressão.
- **RF016 - Livros: gráficos** (change `rf016-graficos-do-livro`): a seção
  **Gráficos** deixa de ser informativa e passa a ter o Tab Panel com a curva de
  progressão e a evolução dos personagens.
  - **Sem esquema:** nenhuma migração; leitura de `capitulo`,
    `capitulo_personagem`, `livro_personagem` e `personagem_global`.
  - **Domínio:** `src-tauri/src/grafico.rs` calcula as séries acumuladas
    (Ação +1; Ascensão +1, Declínio -1, Apogeu +2, Queda -2) e ordena o
    protagonista primeiro.
  - **Comando:** `dados_graficos_livro` (56 no total), somente leitura.
  - **Front-end:** `TelaGraficosLivro.jsx` (Tab Panel, estados vazios),
    `GraficoProgressao.jsx`, `GraficoArco.jsx` (segmentos interrompidos e
    marcadores pequenos/grandes), `graficosApi.js` e estilos em `livros.css`.
  - **Testes Rust:** 6 novos (progressão, arcos, ordem, ausência e livro vazio);
    **141** no total.
  - **Verificação:** `scripts/verificar-rf016.mjs` **14/14** no app real;
    `verificar-rf011.mjs` passou a **34/34** (Gráficos real); RF002–RF015 sem
    regressão.
- **Período da história e ordem dos módulos (ajuste do RF011)** (change
  `rf011-ajustes-periodo-ordem-modulos`): Dados Gerais ganhou **De** e **Até**
  (migração v11) e o Painel lista **Dados do Livro** primeiro.
  `verificar-rf011.mjs` passou a **31/31** (e a **32/32** depois do RF014).
- **Período somente numérico e lado a lado (ajuste do RF011)** (change
  `rf011-ajuste-periodo-numerico`): **De** e **Até** passaram a aceitar somente
  dígitos na tela — o período continua texto no banco — e ficaram lado a lado no
  grupo **Período da História**. Nenhuma migração; `verificar-rf011.mjs` passou
  a **35/35**.
- **Tratamento de período legado (ajuste do RF011)** (change
  `rf011-periodo-legado`): livros anteriores ao ajuste numérico mantêm o texto
  intacto; a tela sinaliza o valor, oferece **Usar <dígitos>**/**Limpar** e não
  filtra a edição enquanto o valor for legado. O **Salvar** preserva o texto com
  aviso, sem bloquear. Nenhuma migração; `verificar-rf011.mjs` passou a
  **39/39**.
- **Janela maximizada com barra de título (ajuste do RF001)** (change
  `rf001-janela-maximizada`): `maximized: true` em `tauri.conf.json` faz a janela
  abrir ocupando a área útil, com a barra de título nativa e a barra de tarefas
  visíveis. `scripts/verificar-janela-maximizada.mjs` **3/3** mede o viewport e
  a moldura da janela.
- **Specs principais** em `openspec/specs/`: `app-shell`, `dev-tooling`,
  `rust-bridge`, `setup-guide` (RF001); `app-layout`, `page-navigation`,
  `theme-system`, `splash-screen` (RF002); `database-foundation` (RF003);
  `character-library` (RF004); `family-tree` (RF005); `character-sheet-export`
  (RF006); `world-library` e `world-sheet-export` (RF007); `world-entries`
  (RF008); `factions` (RF009); `book-library` (RF010/RF011); `book-workspace`
  (RF011–RF016). São **18** capabilities.
  `openspec validate --all` → 18 passed, 0 failed.
- **Comandos:** `npm run tauri dev` (executa), `npm run tauri build`
  (compila → `src-tauri/target/release/talecraft.exe` + MSI/NSIS),
  `npm run verificar:rust` (fmt + Clippy `-D warnings` + 141 testes) e
  `cargo test --manifest-path src-tauri/Cargo.toml --lib` (testes isolados).
- **Guia de ambiente** em `documents/setup.md`.
- **Comandos Rust (56 no total):** `mensagem_inicial` (RF001),
  `estado_inicial`/`verificar_banco` (RF002/RF003), os comandos de personagens
  e relações + `arvore_familiar` (RF004/RF005), os de ficha/PDF (RF006), os de
  mundos (RF007), os de entradas (RF008), os de facções (RF009), os de livros
  (RF011), os sete de personagens do livro (RF014), os seis de capítulos
  (RF015), `dados_graficos_livro` (RF016) e `montar_documento_mundo` (Documento
  do Mundo completo). Todos no `invoke_handler`.
- **Pendências conhecidas do app:** RF001–RF016 concluídos, validados e
  **ARQUIVADOS**. O documento hoje define RF001–RF016; os próximos requisitos
  (RF017+) ainda precisam ser escritos antes de virarem change.

### Protótipo (referência visual — HTML + CSS)

- **15 telas navegáveis** e ligadas, validadas (0 links quebrados, `<div>`
  balanceado, 0 imagens faltando, 0 caracteres corrompidos):
  `index` (Início), `personagens-biblioteca`, `personagem`, `mundos`,
  `mundo-kepler`, `mundo-ravoria`, `mundo-arda`, `temas`, `livro`,
  `personagens`, `worldbuilding`, `capitulos`, `dados-do-livro`, `graficos`,
  `exportar`.
- **Design system** `css/talecraft.css`, ~70 KB, seções numeradas.
- **Worldbuilder em dois níveis**: `mundos.html` (lista os mundos) →
  `mundo-kepler.html` / `mundo-ravoria.html` / `mundo-arda.html` (atributos +
  8 categorias + Mapa Geral de território) → `worldbuilding.html` (entradas do
  mundo, dentro do livro). Cada mundo tem arquivo próprio, então o card abre o
  mundo certo. O livro associa o Mundo em `dados-do-livro.html`.
- **Nível raiz chamado "Início"** (antes "Biblioteca"), em todos os breadcrumbs,
  sidebars e na marca.
- **Três temas** completos e funcionais, com troca real em todas as telas
  (Blade Byte, Old Tower e Tundra).
- **Retratos** nos 8 personagens, aplicados na biblioteca, elenco, ficha,
  index e painel do livro. Cadastro com preview, dropzone, galeria e marcação
  de retrato principal.
- **Gráficos em SVG**: curva de arco, barras de tensão, distribuição de POV,
  mapa de calor.
- **Modelo global+arco** representado na UI (badges `global`, avisos de papel
  em outro livro, campos separados).

### Pendências técnicas conhecidas (do protótipo)

1. **Fontes via Google Fonts.** Precisam virar `@font-face` local (seis
   famílias: Inter, Rajdhani, JetBrains Mono, Cinzel, Alegreya, IBM Plex Mono).
2. **`color-mix()`** é usado em alguns gradientes. Em WebView antigo pode
   falhar — trocar por `rgba()` fixos.
3. **Kanban é só visual.** Arrastar/soltar exigirá JS com endpoints de
   reordenação.
4. **Sem persistência no protótipo.** O upload de imagem é representação
   visual. No app, o RF004 já resolve isso para o retrato do personagem: o
   arquivo é copiado para `<app_data_dir>/retratos/` e o caminho fica no banco.

### Próximo passo combinado

O protótipo é a **referência visual**; o aplicativo Tauri/React é onde o código
vive. **RF001–RF016 estão implementados, validados e arquivados**. O RF006
(painel retrátil, exportação da ficha e contraste dos botões) fechou com
`verificar-rf006.mjs` **29/29** no app real. O RF007 (mundos), o RF008 (entradas
do mundo), o RF009 (facções), o RF010 (Meus Livros), o RF011 (página do livro e
Dados Gerais), o RF012 (aba Resumo), o RF013 (abas narrativas), o RF014
(personagens do livro), o RF015 (capítulos do livro) e o RF016 (gráficos do
livro) fecharam com
`verificar-rf007.mjs` **33/33**,
`verificar-rf008.mjs` **21/21**, `verificar-rf009.mjs` **16/16**,
`verificar-rf010.mjs` **18/18**, `verificar-rf011.mjs` **39/39**,
`verificar-rf012.mjs` **15/15**, `verificar-rf013.mjs` **15/15**,
`verificar-rf014.mjs` **37/37**, `verificar-rf015.mjs` **19/19**,
`verificar-rf016.mjs` **14/14** e
`verificar-rf002.mjs` **20/20** (splash ajustada), respectivamente, sobre **141
testes Rust** e sem regressão dos verificadores RF002–RF016. A correção da
exportação completa do Mundo (change `rf007-exportacao-mundo-dados-associados`),
o ajuste de período/ordem do RF011 (change
`rf011-ajustes-periodo-ordem-modulos`), o ajuste de período numérico e lado a
lado (change `rf011-ajuste-periodo-numerico`), o tratamento de período legado
(change `rf011-periodo-legado`), o ajuste de janela maximizada com barra
de título (change `rf001-janela-maximizada`), o ajuste de seleção/papéis do
RF014 (change `rf014-ajustes-selecao-papeis`), o ajuste do rótulo
Títulos/Outros Nomes (change `rf014-ajuste-rotulo-titulos`), os vínculos na
ficha global (change `rf014-vinculos-ficha-global`), a contagem/link de livros
(change `rf014-contagem-e-link-livros`), o ajuste da splash do RF002 (change
`rf002-splash-legivel`), os capítulos do livro (change
`rf015-capitulos-do-livro`), os ajustes do painel do capítulo (change
`rf015-ajustes-painel-capitulo`), os gráficos do livro (change
`rf016-graficos-do-livro`), o motivo do tipo (change `rf015-motivo-tipo`) e o
tooltip da progressão (change `rf016-tooltip-progressao`) também estão
arquivados.

Seguem os demais requisitos de `documents/talecraft.md` (cada um virando um
change OpenSpec), portando a interface do protótipo à medida que chegarem. O
documento hoje define **RF001–RF016**; os próximos requisitos (RF017+) ainda
precisam ser escritos antes de virarem change.

O padrão para um domínio novo (o RF004 é o primeiro) já está definido e provado:
uma **migração aditiva** em `banco.rs`, um **módulo de domínio** próprio (como
`personagem.rs`), **comandos Tauri** registrados no `invoke_handler`, um módulo
de API no front-end (como `personagensApi.js`), telas React reusando os tokens do
design system e um **script de verificação** que dirige o app de verdade.

### Refatoração pendente conhecida: layout da árvore familiar

Levantado pelo usuário no 3º teste do RF005 ("não seria melhor um algoritmo tipo
Sugiyama?"). **Decisão: não usar Sugiyama** — registrada aqui para não se
reperguntar.

- **Por que não:** o trabalho do Sugiyama é **descobrir o ranqueamento** de um
  DAG arbitrário e otimizar cruzamentos por heurística. Na árvore familiar a
  geração (pais em `g-1`, filhos em `g+1`) **já é dada pelo parentesco**, e as
  regras de negócio ("filhos abaixo do casal", RF005-CA012; "irmãos lado a
  lado") **não são minimização de cruzamentos** — um heurístico poderia separar
  um casal para reduzir cruzamentos e violar o requisito. Aplicá-lo seria trocar
  uma regra determinística por uma heurística imprevisível.
- **Causa real do bug dos nós sobrepostos:** uma linha (`ordem: 0` hardcoded em
  `subir_ascendentes`/`descer_descendentes`), não falta de algoritmo. Nenhum
  layout de grafo evitaria esse esquecimento.
- **Arquitetura hoje é meio-a-meio:** `personagem.rs` decide **layout** (escolhe
  `geracao`, coluna `ordem` e **já cria as ligações**) e o `ArvoreFamiliar.jsx`
  só desenha. `ordem` é detalhe visual (posição em pixels) morando no domínio —
  foi isso que tornou o bug fácil de cometer.
- **Refatoração proposta (change futuro, não agora):** back-end devolve
  **parentesco puro** (`eu`, `pais[]`, `filhos[]`, `irmaos[]`, `conjuges[]` e as
  relações), **sem** `geracao`/`ordem`/ligações; o front-end ganha uma função
  pura `montarLayout(familia)` que atribui geração por DFS e colunas por
  agrupamento de casal + ordenação. Com isso, a classe de bug "esqueci de alocar
  a coluna" fica impossível — o layout **é o dono** das colunas.

---

## 5. Conteúdo fictício de exemplo

Não são bugs nem dados esquecidos — o protótipo precisa de conteúdo plausível.

**Livros:**
- *A Órbita Silenciosa* — Ficção Científica, 24 capítulos (livro de exemplo principal)
- *O Jardim de Ossos* — Terror
- *A Coroa de Sal* — Fantasia
- *Estação Inverno* — conto, Terror psicológico

**Personagens** (arquivos em `img/personagens/`):
Iara Vasquez, Andarilho-9, Kael Moreau, Sena Myr, Tomas Leal, Nadia Ferrer,
Mira Vahl, Dariel Okonkwo.

**Mundos** (nível raiz do Worldbuilder):
- *Kepler* — mundo de A Órbita Silenciosa e de O Jardim de Ossos; Futurista, interestelar; tags Sci-Fi, Sobrenatural
- *Ravória* — mundo de A Coroa de Sal; Medieval; tags Alta Fantasia, Romantasia
- *Arda* — mundo do conto Estação Inverno; Moderno, industrial; tags Terror, Gótico

**Placeholders legítimos** — não são personagens nem erros: `.avatar` "RA"
(usuário), siglas de livro "OS"/"JO"/"CS", worldbuilding "EA", capítulo "C18",
tipos de exportação.

---

## 6. Convenções de código

### Do protótipo (`prototype/` — CSS e HTML)

- CSS: `:root` para tokens; temas em `[data-theme="..."]`; seções numeradas com
  cabeçalho em bloco de comentário; nomes de classe em kebab-case com prefixo do
  componente (`.themecard__title`, `.portrait--hero`).
- Tokens que **não** mudam por tema ficam no segundo bloco `:root`, sem seletor
  de tema. Tokens só de tema: `--accent-text`, `--accent-hover`, `--accent-deep`,
  `--accent-alt`, `--bg-texture`.
- **Nunca use cor hexadecimal solta** no meio do CSS fora dos blocos de tema. Se
  o valor precisa variar por tema, crie um token. Se é uma sobreposição sobre
  foto (scrim, vinheta, sombra de legenda), use os tokens `--overlay-*` e
  `--portrait-*`.
- HTML: um comentário curto marcando cada bloco de seção; SVG inline com
  `viewBox` e sem `width`/`height` fixos (o tamanho vem da classe `.icon`).
- Todo `<html>` tem `data-theme` e todo HTML inclui `js/tema.js` antes de `</head>`.

### Do aplicativo (`src/` e `src-tauri/` — React e Rust)

- Arquivos React em `.jsx`; componentes em PascalCase, funções e variáveis em
  português quando forem de domínio (`estadoRust`, `mensagem_inicial`).
- CSS do app: design system em `src/talecraft.css` (cópia do protótipo) e
  fontes em `src/fontes.css` + `src/fontes/`. Um arquivo por preocupação.
- Rust: comandos `#[tauri::command]` em `src-tauri/src/lib.rs`, com comentário
  citando o requisito; teste unitário ao lado do comando quando fizer sentido.
  Infraestrutura de banco (abertura, migrações, operação de teste) fica em
  `src-tauri/src/banco.rs` — comandos **não** falam SQL direto no `lib.rs`.
- **Todo comando Rust novo precisa ser registrado** no `invoke_handler`.

