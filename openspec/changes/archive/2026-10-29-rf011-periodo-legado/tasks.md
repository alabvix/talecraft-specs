## 1. Front-end

- [x] 1.1 Acrescentar `temNaoNumerico()` e `extrairGruposNumericos()` em `src/componentes/DadosLivro.jsx`.
- [x] 1.2 Extrair `CampoPeriodo` e `AvisoPeriodoLegado`, com sugestões **Usar <dígitos>** e **Limpar** (design D1/D2).
- [x] 1.3 Manter a edição não destrutiva enquanto o valor for legado e retomar o filtro quando ficar numérico ou vazio.
- [x] 1.4 Exibir `notice--warn` depois do **Salvar** quando o período legado permanecer (design D3).
- [x] 1.5 Estilizar `.input--legado`, `.periodo__aviso` e `.notice--warn` em `src/talecraft.css`.
- [x] 1.6 Rodar `npm run build`.

## 2. Verificação

- [x] 2.1 Semear período legado no `verificar-rf011.mjs` e conferir exibição, destaque, edição sem perda, aviso no salvar e conversão (35 → 39).
- [x] 2.2 Subir o Vite e executar `node scripts/verificar-rf011.mjs` no app real.

## 3. Documentação e fechamento

- [x] 3.1 Documentar a consulta SQL de auditoria e a nota de release no `AGENTS.md` do app e no `AGENTS.md` das specs.
- [x] 3.2 Atualizar o RF011-RN018 e o RF011-CA023 em `documents/talecraft.md`.
- [x] 3.3 Validar com `openspec validate --all`.
- [x] 3.4 Arquivar o change com `openspec archive "rf011-periodo-legado" --yes` e confirmar a spec de `book-workspace`.
