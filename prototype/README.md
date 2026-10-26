# TaleCraft — Protótipo Visual Navegável

Protótipo estático e **navegável** (HTML + CSS) da interface do TaleCraft. Abra
`prototype/index.html` no navegador e navegue pelos links — não há build nem
servidor. A única exceção de JavaScript são os `onclick` de navegação e o
`js/tema.js`, que aplica o tema escolhido no protótipo (ver a seção **Temas**).

## Dois níveis de navegação

```
NÍVEL RAIZ (Início)
  ├── index.html ................ Início — Meus Livros (lista de projetos)
  ├── personagens-biblioteca.html  Personagens (fichas globais)
  │     └── personagem.html ...... Ficha global + vínculos/arcos por livro
  └── mundos.html ................ Mundos (Worldbuilder global)
        ├── mundo-kepler.html .... Mundo Kepler + suas 8 categorias
        ├── mundo-ravoria.html ... Mundo Ravória + suas 8 categorias
        └── mundo-arda.html ...... Mundo Arda + suas 8 categorias

NÍVEL DO LIVRO (livro aberto)
  └── livro.html ................ Painel do livro
        ├── personagens.html .... Elenco (arcos NESTE livro)
        ├── worldbuilding.html .. Entradas do Mundo associado
        ├── capitulos.html ...... Kanban + detalhe do capítulo
        ├── dados-do-livro.html . Identidade, premissa, temas + Mundo associado
        ├── graficos.html ....... Curvas, tensão, POV, mapa de calor
        └── exportar.html ....... HTML / MD / PDC
```

A faixa colorida no topo esquerdo (`bookband`) indica qual livro está aberto e traz
o botão **Trocar livro**, que volta para o Início. A cor de acento do livro
permeia botões primários, barras de progresso e o item ativo da sidebar via
`--book-color` + a classe `.app--book`.

## Modelo de dados que o protótipo representa

Ponto central: **a ficha do personagem é global, o arco é por livro.**

| Global (ficha) | Por livro (arco) |
|---|---|
| Nome, alcunha, espécie, idade | Papel narrativo (protagonista/antagonista/...) |
| Biografia, origem, ferida permanente | Motivação e conflito interno daquela história |
| Aparência, traços globais | Capítulo inicial/final, status do arco, curva |
| Relações entre personagens | Aparências e relevância naquele livro |

Onde isso aparece na interface:

- **`personagens-biblioteca.html`** — grade de fichas globais; cada card lista os
  livros em que o personagem aparece com um badge por arco (`arclink`).
- **`personagem.html`** — a ficha em si, com a seção "Vínculos com livros" e a
  tabela "Impacto de editar", que separa o que propaga e o que é local.
- **`personagens.html`** (dentro do livro) — chama-se **Elenco**, mostra o papel
  *neste* livro, marca badges `global` e alerta quando o personagem tem outro
  papel em outro livro.
- **`livro.html`** — aviso de quantos membros do elenco vêm da biblioteca.

## Worldbuilder e Mundos

O módulo de Worldbuilding existe em **dois níveis**, como os personagens:

```
Mundos (nível raiz)                    Worldbuilding (dentro do livro)
  mundo-*.html                           worldbuilding.html
  ├── nome                              └── as entradas do Mundo associado,
  ├── descrição                              filtradas por categoria
  ├── nível tecnológico
  ├── Tipo de Mundo → Medieval · Moderno · Futurista · Antigo
  ├── gênero (tags, várias) → Alta Fantasia, Fantasia Sombria, Cyberpunk,
  │                           SteamPunk, Urbano, Sci-Fi, SolarPunk,
  │                           Romantasia, Terror, Gótico, Sobrenatural
  └── 8 categorias de entradas
        ├── Localidades
        ├── Raças e povos
        ├── Artefatos
        ├── Armas
        ├── Eventos
        ├── Sistema de energia
        ├── Sistema de Magia   ← novo
        └── Mapa Geral         ← novo
```

**O Mundo é global; as entradas pertencem ao Mundo; o livro associa o Mundo.**
Um mesmo Mundo pode ser usado por vários livros, e editar uma Localidade no nível
raiz altera o que todos os livros associados enxergam. É o inverso dos
personagens, onde o que varia por livro é o *arco*: aqui, o que varia por livro é
apenas **quais** entradas entram em cena.

> **Cada livro tem 1 e somente 1 Mundo associado.** O vínculo é 1:1 do lado do
> livro; o Mundo, do outro lado, pode servir a vários livros. Trocar o mundo de um
> livro substitui a associação sem alterar o mundo anterior.

Os três mundos de exemplo são **Kepler** (Futurista · Sci-Fi, Sobrenatural),
**Ravória** (Medieval · Alta Fantasia, Romantasia) e **Arda** (Moderno · Terror,
Gótico).

Onde isso aparece na interface:

- **`mundos.html`** — lista os mundos criados, cada card com o Tipo de Mundo,
  o nível tecnológico, as tags de gênero, as categorias e os livros que o usam
  (`arclink`). Permite criar, editar e exportar. Cada card abre o seu próprio
  arquivo de mundo.
- **`mundo-kepler.html` / `mundo-ravoria.html` / `mundo-arda.html`** — o Mundo em
  si: dados (nome, descrição, nível tecnológico, Tipo de Mundo e gênero), as 8
  categorias como blocos, o **Mapa Geral** em SVG e a tabela "Impacto de editar",
  que separa o global do que é da associação. Cada mundo tem o **seu mapa de
  território** (`terrainmap`), com relevo, fronteiras, rotas e a chave de símbolos
  (`maplegend`).
- **`worldbuilding.html`** (dentro do livro) — as entradas do Mundo associado.
  O breadcrumb inclui o nome do Mundo e a sidebar indica "Entradas de <mundo>".
- **`dados-do-livro.html`** — o bloco **Mundo associado**, com o mundo atual e o
  botão **Trocar mundo** (um único mundo por livro).
- **`livro.html`** — o módulo **Mundo associado**, ao lado do Worldbuilding.

> Neste protótipo não há imagem para o Mundo — o `worldmark` é um emblema com
> ícone, no mesmo tamanho do retrato dos personagens, para as duas listas
> ficarem alinhadas visualmente.

## Imagens de personagem

O cadastro de personagem aceita uma imagem de retrato. Na pasta
`img/personagens/` estão as imagens de conceito usadas no protótipo
(originalmente em `charcaters_concepts/`), renomeadas por personagem:

| Personagem | Arquivo |
|---|---|
| Iara Vasquez | `iara-vasquez.jpg` |
| Andarilho-9 | `andarilho-9.jpg` |
| Kael Moreau | `kael-moreau.jpg` |
| Sena Myr | `sena-myr.jpg` |
| Tomas Leal | `tomas-leal.jpg` |
| Nadia Ferrer | `nadia-ferrer.jpg` |
| Mira Vahl | `mira-vahl.jpg` |
| Dariel Okonkwo | `dariel-okonkwo.jpg` |

**Todas são exibidas no mesmo tamanho**, independente da proporção original
(as originais variam de 0,47 a 0,74 de largura/altura). Isso é resolvido pela
classe `.portrait`:

```css
.portrait {
  aspect-ratio: 3 / 4;      /* formato fixo */
  overflow: hidden;
}
.portrait > img {
  object-fit: cover;        /* recorta em vez de distorcer */
  object-position: center 22%;   /* favorece o rosto */
}
```

Onde a imagem aparece:

- **`personagens-biblioteca.html`** — retrato de 52 px no topo de cada ficha.
- **`personagem.html`** — retrato grande no cabeçalho + bloco **upload**
  (`portraitpicker` / `dropzone`) e a **galeria de imagens** do personagem
  (`portraitgallery`), com marcação de qual é o retrato principal.
- **`personagens.html`** — cards de elenco (`castcard`) com a foto ocupando 3:4.
- **`index.html`**, **`livro.html`** — miniaturas quadradas nas listas.

Variantes de tamanho: `.portrait--xs/sm/md/lg`, `.portrait--hero` (ficha).
Variantes de cor (usadas no placeholder quando não há imagem):
`.portrait--amber/green/blue/violet/red/grey`. O placeholder mostra as iniciais
sobre a cor do personagem, então a ficha nunca fica vazia.

> No protótipo não há persistência: a área de upload é apenas a representação
> visual do campo. Em Spring Boot, será um `multipart/form-data` com o arquivo
> salvo em `static/` ou em uma pasta de dados do usuário, e o caminho guardado no
> registro do personagem.

## Temas

O app tem **três temas** e o usuário escolhe qual usar. O tema é aplicado
colocando `data-theme` no `<html>`:

```html
<html lang="pt-BR" data-theme="blade-byte">   <!-- padrão, sci-fi -->
<html lang="pt-BR" data-theme="old-tower">    <!-- medieval, pastel -->
<html lang="pt-BR" data-theme="tundra">       <!-- claro e frio -->
```

| | Blade Byte (padrão) | Old Tower (medieval) | Tundra (claro e frio) |
|---|---|---|---|
| Uso | Ficção científica, cyberpunk | Fantasia, medieval | Ficção científica, terror, inverno |
| Fundo | Azul-carvão escuro | Pergaminho claro | Cinza-gelo `#eef3f7` |
| Painéis | Carvão elevado | Pergaminho | Vinho suave `#f4eaee` |
| Texto | Cinza-claro sobre escuro | Tinta sépia sobre claro | Ardósia fria sobre claro |
| Marca / botões | Roxo `#7c5cff` | Telha `#b3532c` | Verde profundo `#2f7d5c` |
| Personagens | Âmbar `#f2a13b` | Laranja queimado `#c97a2b` | Âmbar queimado `#c07a3a` |
| Worldbuilding | Verde `#3fb98a` | Oliva `#7d8a4f` | Verde-frio `#3f8f76` |
| Capítulos | Azul `#4a9de8` | Azul-poeira `#6a8caf` | Azul-glacial `#4a86b8` |
| Dados do Livro | Violeta `#b56ce0` | Ameixa `#9a6b8f` | Ameixa fria `#8f6b95` |
| Títulos | Rajdhani (sans) | Cinzel (serifada lapidar) | Rajdhani (sans) |
| Corpo | Inter | Alegreya (serifada) | Inter |
| Monoespaçada | JetBrains Mono | IBM Plex Mono | JetBrains Mono |

O **Tundra** é o tema claro e frio: o fundo é um cinza muito claro que imita o
gelo, os painéis usam um vinho em tom leve e os botões primários são verde
profundo com texto branco. A secundária (`--accent-alt`) é um azul-glacial.

**A disposição não muda entre temas.** Nenhuma regra de layout é tocada por um
tema: só os tokens de cor, sombra e tipografia são redefinidos. Os três temas
compartilham 100% dos componentes — não existe marcação nem CSS duplicado.

Como funciona no CSS:

```css
:root,
[data-theme="blade-byte"] { --bg-base: #0f1218; --accent: #7c5cff; ... }

[data-theme="old-tower"]  { --bg-base: #f4ead4; --accent: #b3532c; ... }

[data-theme="tundra"]     { --bg-base: #eef3f7; --accent: #2f7d5c; ... }
```

Os tokens que **não** mudam por tema (raio de canto, tamanhos, layout, easing)
ficam em um segundo bloco `:root` sem seletor de tema. Tokens que só existem
para permitir a troca: `--accent-text`, `--accent-hover`, `--accent-deep`,
`--accent-alt` e `--bg-texture`.

A tela **`temas.html`** mostra os três temas como cartões, com prévia em
miniatura, a tabela de cores equivalente e uma amostra viva dos componentes. O
botão **Tema** fica na topbar de todas as páginas.

### Como a troca de tema funciona no protótipo

O `data-theme` fica no `<html>` e o CSS reage a ele. Como o protótipo não tem
servidor, quem aplica o atributo é o `js/tema.js` — a **única** exceção de
JavaScript, ao lado dos `onclick` de navegação. O fluxo:

1. Lê o tema de `?tema=old-tower` na URL;
2. Se não houver, lê a preferência salva no `localStorage`;
3. Aplica `data-theme` no `<html>` e marca o cartão correspondente;
4. Ao escolher um tema, salva a preferência e recarrega com `?tema=...`;
5. Ao navegar, reescreve os links para carregar o tema junto, de modo que ele
   sobrevive à troca de tela.

> Em Spring Boot este arquivo deixa de existir: o tema é uma preferência do
> usuário, renderizada no servidor com
> `<html th:attr="data-theme=${prefs.tema}">`, e a escolha vira um `POST` que
> grava a coluna no banco. O `localStorage` é só a ponte do protótipo.

Os cartões de `temas.html` são `<a data-tema-opcao="old-tower">`, não radios:
um `<input type="radio">` só conseguiria mudar o visual do próprio cartão, nunca
o `data-theme` do documento.

## Telas

| Arquivo | Tela | Nível |
|---|---|---|
| `index.html` | Início / Meus Livros | raiz |
| `personagens-biblioteca.html` | Personagens (fichas globais) | raiz |
| `personagem.html` | Ficha global de personagem | raiz |
| `mundos.html` | Mundos (Worldbuilder global) | raiz |
| `mundo-kepler.html` | Mundo Kepler + 8 categorias + Mapa Geral | raiz |
| `mundo-ravoria.html` | Mundo Ravória + 8 categorias + Mapa Geral | raiz |
| `mundo-arda.html` | Mundo Arda + 8 categorias + Mapa Geral | raiz |
| `temas.html` | Temas / preferências | raiz |
| `livro.html` | Painel do livro | livro |
| `personagens.html` | Elenco do livro | livro |
| `worldbuilding.html` | Worldbuilding (entradas do Mundo) | livro |
| `capitulos.html` | Capítulos | livro |
| `dados-do-livro.html` | Dados do livro + Mundo associado | livro |
| `graficos.html` | Gráficos | livro |
| `exportar.html` | Exportar | livro |
| `css/talecraft.css` | Design system (~62 KB, comentado por seção) | — |
| `js/tema.js` | Troca de tema no protótipo (única exceção de JS) | — |

## Direção visual

- **Tema escuro** com fundo texturizado em grade de 32 px.
- **Painéis modulares** ("builder"): bordas definidas, raio pequeno, faixa de acento.
- **Acento por módulo**: Personagens âmbar, Worldbuilding verde, Capítulos azul,
  Dados do Livro violeta, marca roxo `#7c5cff`. A cor do *livro* sobrepõe a da marca
  na navegação primária, para reforçar "você está dentro de um projeto".
- **Microinterações**: cards elevam 2–3 px no hover, chips com borda esquerda
  colorida, blocos-slot com ícone emoldurado.

## Classes principais do CSS

Layout: `.app`, `.app--book`, `.bookband`, `.sidebar`, `.navitem`, `.topbar`,
`.main`, `.main--wide`.
Nível raiz: `.booktile`, `.bookcard`, `.libgrid`, `.libcard`, `.arclink`, `.notice`.
Blocos: `.panel`, `.metric`, `.block`, `.card`, `.chip`, `.dataline`, `.avatar`.
Formulário: `.formgrid`, `.input`, `.textarea`, `.select`, `.toggle`.
Gráficos: `.chart`, `.arcbars`, `.legend`.
Utilidades: `.grid--2/3/4/dash`, `.split`, `.badge`, `.progress`, `.tabs`, `.table`.

Cores de livro: `.c--amber`, `.c--green`, `.c--blue`, `.c--violet`, `.c--accent`,
`.c--red` — definem `--book-color`, consumido pelos componentes.

## Mapeamento para Spring Boot + Thymeleaf

```
src/main/resources/
  static/css/talecraft.css
  templates/
    layout/base.html              <- <html> + .app + head (fragmento)
    fragments/bookband.html       <- faixa do livro aberto (th:fragment)
    fragments/sidebar-book.html   <- sidebar do livro
    fragments/sidebar-root.html   <- sidebar da biblioteca
    fragments/icons.html          <- SVGs como th:fragment
    library/
      books.html                  <- index.html
      characters.html             <- personagens-biblioteca.html
      character.html              <- personagem.html
    book/
      overview.html               <- livro.html
      cast.html                   <- personagens.html
      worldbuilding.html
      chapters.html
      bookdata.html
      charts.html
      export.html
```

Bindings sugeridos:

- Cor do livro: `<div class="app app--book" th:style="'--book-color:' + ${book.accent}">`.
- Item ativo da sidebar: `th:classappend="${active == 'cast'} ? ' is-active'"`
  combinado com `navitem--characters`.
- Contadores: `<span class="navitem__count" th:text="${book.chapterCount}">24</span>`.
- Arcos por livro (o caso central): em `character.html`, iterar
  `th:each="link : ${character.bookLinks}"` sobre `.arclink`, usando
  `link.book.accent` na variável `--link-color`.
- Separar global/local no formulário: campos globais vêm de `character.*`; campos do
  arco vêm de `bookLink.*` (o `POST` deve ir para endpoints diferentes).
- Gráficos: as curvas já são `<polyline>` com `viewBox`; gere o atributo `points`
  a partir das séries do planejamento.
- Progresso: `th:style="'--pct:' + ${percent} + '%'"`.

## Observações

- Links de navegação usam `href` reais; os cards usam `onclick` apenas porque são
  `<article>`. Em Thymeleaf, troque por `<a th:href="@{...}">` para acessibilidade.
- `color-mix()` exige navegador moderno. Se o app usar JCEF/WebView antigo,
  substitua por `rgba()` fixos.
- O kanban é visual; arrastar/soltar exigirá JS ou HTMX com endpoints de reordenação.
- Fontes vêm do Google Fonts (Inter, Rajdhani, JetBrains Mono, e Cinzel,
  Alegreya, IBM Plex Mono para o tema Old Tower). Para uso 100 % offline, baixe
  as seis para `static/fonts/` e troque o `<link>` por `@font-face`.
