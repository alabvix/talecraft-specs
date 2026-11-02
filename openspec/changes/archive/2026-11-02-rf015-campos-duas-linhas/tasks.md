## 1. Estilo

- [x] 1.1 Criar `.textarea--tiny` com `min-height: 62px` em `livros.css`, mantendo `.textarea--short` em 84 px para o **Motivo do Evento** (design D1).
- [x] 1.2 Trocar **Motivo do Tipo**, **Meta** e **Cenário Descritivo** para `textarea--tiny` com `rows={2}` (design D2, D3).

## 2. Verificação

- [x] 2.1 Atualizar `scripts/verificar-rf015.mjs` para conferir classe, `rows` e altura (50–70 px) dos três campos (design D4).
- [x] 2.2 Rodar `npm run build`, `npm run verificar:rust` e os verificadores `verificar-rf015.mjs`, `verificar-rf011.mjs` e `verificar-rf016.mjs` (design D4).
- [x] 2.3 Atualizar os `AGENTS.md` dos dois repositórios, rodar `openspec validate --all` e arquivar o change.
