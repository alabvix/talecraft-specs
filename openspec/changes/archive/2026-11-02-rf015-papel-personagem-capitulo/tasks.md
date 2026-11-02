## 1. Front-end

- [x] 1.1 Adicionar ao `PainelCapitulo.jsx` um helper que lê o **Papel** em `personagensLivro` pelo `personagemId`, com fallback **Não definido** (design D1).
- [x] 1.2 Renderizar cada personagem como **Nome - Papel**, com o papel em `.chapterchar__papel` (design D2).
- [x] 1.3 Estilizar `.chapterchar__papel` em `livros.css` com `color: var(--text-muted)` e peso menor (design D2).

## 2. Verificação e fechamento

- [x] 2.1 Atualizar `scripts/verificar-rf015.mjs` para definir **Falso Antagonista** no vínculo da Iara, manter o Kael em **Não definido** e conferir os dois textos (design D4).
- [x] 2.2 Rodar `npm run build`, `npm run verificar:rust` e os verificadores `verificar-rf015.mjs`, `verificar-rf011.mjs` e `verificar-rf016.mjs` (design D4).
- [x] 2.3 Atualizar os `AGENTS.md` dos dois repositórios, rodar `openspec validate --all` e arquivar o change.
