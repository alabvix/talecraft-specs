## Why

O período da história é hoje texto livre, mas o escritor quer registrar apenas
anos numéricos em **De** e **Até**. Texto livre aceita “Século XXII” e “2189” na
mesma dupla, o que impede comparar ou ordenar os períodos depois; além disso, os
dois campos ficavam em colunas distantes do formulário na janela maximizada.

## What Changes

- Na aba **Dados Gerais**, **De** e **Até** passam a aceitar **somente dígitos**:
  letras, espaços e sinais digitados ou colados são descartados na interface.
  O tipo continua **texto** no banco e no payload (sem migração).
- Os dois campos passam a ficar **lado a lado**, agrupados como **Período da
  História**, com espaçamento curto entre eles.
- O RF011-RN018 deixa de descrever o período como texto livre de séculos/eras e
  passa a exigir apenas valores numéricos.
- Nenhum comando Tauri novo, nenhuma migração e nenhuma biblioteca nova.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: o requisito **Dados do Livro com Tab Panel** passa a exigir
  **De** e **Até** lado a lado e restritos a dígitos, mantendo o período como
  texto opcional no registro.

## Impact

- **Requisito coberto:** RF011 (RF011-RN018, RF011-CA023).
- **Fora do escopo:** validação de intervalo (De ≤ Até), formato de ano com
  casas fixas, máscara, migração dos períodos já gravados com letras, cálculo de
  duração e exibição do período fora da aba **Dados Gerais**.
- **Banco:** nenhuma migração; `periodo_de`/`periodo_ate` continuam
  `TEXT NOT NULL DEFAULT ''`.
- **Front-end:** `src/componentes/DadosLivro.jsx` (filtro de dígitos e grupo
  **Período da História**) e `src/talecraft.css` (`.formlinha` e
  `.formfield--curto`).
- **Verificação:** `scripts/verificar-rf011.mjs` passa a conferir o filtro e a
  posição lado a lado (34 → 35 verificações).
