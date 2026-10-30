## Context

O período da história foi acrescentado ao RF011 pela v11 como **texto livre**
em `periodo_de`/`periodo_ate`, exibido em duas colunas do `.formgrid`. Na janela
maximizada, **De** e **Até** ficavam distantes (cada um ocupava meia linha) e o
texto livre permitia “Século XXII” ao lado de “2189”. O escritor pediu dois
ajustes: aproximar os campos e aceitar somente números, mantendo o tipo
**string**.

O banco está na v16, sem mudança prevista. O front-end usa React controlado
(`form.periodo_de`/`form.periodo_ate` em `DadosLivro.jsx`) e o E2E
`verificar-rf011.mjs` dirige o app real via WebView2/CDP.

## Goals / Non-Goals

**Goals:**

- Exibir **De** e **Até** lado a lado, agrupados como **Período da História**,
  com espaçamento curto.
- Aceitar somente dígitos nos dois campos, descartando letras, espaços e sinais
  digitados ou colados.
- Manter `periodo_de`/`periodo_ate` como texto no banco e no payload.
- Cobrir o filtro e a posição lado a lado no `verificar-rf011.mjs`.

**Non-Goals:**

- Validar intervalo (**De** ≤ **Até**), tamanho fixo de ano ou máscara.
- Migrar ou limpar períodos antigos gravados com letras.
- Mudar o banco, comandos Tauri, listagem ou exportação.
- Exibir o período fora da aba **Dados Gerais**.

## Decisions

**D1 — Filtrar na digitação, sem mudar o tipo.** O `onChange` passa o valor por
`somenteNumeros()` (`replace(/\D+/g, "")`) antes de atualizar o `form`; assim a
cola também é filtrada e o estado continua string. Alternativa descartada:
`type="number"` — mudaria o tipo do controle, aceitaria `e`/`-`/`.` e devolveria
número, contrariando o “tipo string”.

**D2 — Par lado a lado em um grupo.** **De** e **Até** saem das colunas do
`.formgrid` e entram num `formfield span-2` com o rótulo **Período da História**;
dentro dele, `.formlinha` (flex, `gap: 8px`) e `.formfield--curto`
(`flex-basis: 160px`) deixam os dois inputs próximos e alinhados. Alternativa
descartada: reduzir o `gap` do `.formgrid` — afetaria todos os formulários e não
resolveria a distância de meia tela.

**D3 — Sem migração e sem normalização retroativa.** O banco continua
`TEXT NOT NULL DEFAULT ''`; livros antigos com letras seguem exibindo o valor
salvo até a próxima edição, quando o filtro passa a valer. Alternativa
descartada: migração que apaga letras — perda silenciosa de dados e um passo
publicado desnecessário.

**D4 — Verificação no RF011.** A checagem existente virou uma só: valores com
letras são reduzidos a dígitos, **De** e **Até** medem a mesma linha e a
distância entre eles é de até 12 px (34 → 35 verificações). Alternativa
descartada: medir apenas o `justify-content`/classe — não pegaria o retorno dos
campos ao `.formgrid`.

## Risks / Trade-offs

- **Períodos antigos com letras** → são preservados como estão; a primeira
  edição aplica o filtro. É intencional para não apagar dados sem confirmação.
- **Sem validação De ≤ Até** → o campo aceita “3000” em **De** e “2000” em
  **Até**; fica para requisito futuro, como o restante das validações de faixa.
- **Ano sem limite de dígitos** → aceita números longos; o requisito não define
  calendário nem tamanho, então não há máscara.
- **E2E mede geometria** → a tolerância de 12 px cobre o `gap: 8px` mais
  arredondamento do layout, sem fixar o tema.

## Migration Plan

1. `DadosLivro.jsx`: helper `somenteNumeros()` e o grupo **Período da
   História** com `.formlinha`.
2. `talecraft.css`: `.formlinha` e `.formfield--curto`.
3. `verificar-rf011.mjs`: digitar valores com letras, conferir o resultado
   numérico e a posição lado a lado.
4. Build do front-end e execução do RF011; nenhum rollback de banco é
   necessário.

## Open Questions

Nenhuma. Intervalo, calendário fictício e exibição do período fora da aba
**Dados Gerais** ficam para requisitos posteriores.
