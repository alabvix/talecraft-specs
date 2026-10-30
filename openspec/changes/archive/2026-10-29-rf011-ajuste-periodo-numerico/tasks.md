## 1. Front-end

- [x] 1.1 Acrescentar `somenteNumeros()` em `src/componentes/DadosLivro.jsx` e aplicá-lo em **De** e **Até** (design D1).
- [x] 1.2 Agrupar **De** e **Até** em **Período da História**, com `.formlinha` e `.formfield--curto` (design D2).
- [x] 1.3 Ajustar os placeholders para exemplos numéricos e manter `periodo_de`/`periodo_ate` como string.
- [x] 1.4 Rodar `npm run build`.

## 2. Verificação

- [x] 2.1 Atualizar `scripts/verificar-rf011.mjs` para digitar valores com letras, conferir o filtro numérico e a posição lado a lado (34 → 35).
- [x] 2.2 Subir o Vite e executar `node scripts/verificar-rf011.mjs` no app real.

## 3. Documentação e fechamento

- [x] 3.1 Atualizar o RF011-RN018 e o cenário do período em `documents/talecraft.md`.
- [x] 3.2 Atualizar os `AGENTS.md` dos dois repositórios com a nova regra, as contagens e a armadilha do layout.
- [x] 3.3 Validar com `openspec validate --all`.
- [x] 3.4 Arquivar o change com `openspec archive "rf011-ajuste-periodo-numerico" --yes` e confirmar a spec de `book-workspace`.
