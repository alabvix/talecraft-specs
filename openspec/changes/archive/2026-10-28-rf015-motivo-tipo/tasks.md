## 1. Banco e domínio

- [x] 1.1 Criar a migração v16 aditiva com `motivo_tipo` em `capitulo` (design D3).
- [x] 1.2 Acrescentar `motivo_tipo` ao struct, à gravação e à leitura de `capitulo.rs` (design D2, D3).
- [x] 1.3 Atualizar os testes de capítulo e criar o teste de migração v15 → v16 (design D4).

## 2. Front-end

- [x] 2.1 Trocar o K.O por um `input` com a mesma altura do Punch (design D1).
- [x] 2.2 Acrescentar o campo **Motivo do Tipo** abaixo do Tipo e ligá-lo ao estado e ao payload (design D2).

## 3. Verificação e fechamento

- [x] 3.1 Atualizar `scripts/verificar-rf015.mjs` com altura do K.O, campo e gravação do motivo (design D4).
- [x] 3.2 Rodar `npm run verificar:rust`, `npm run build` e a regressão.
- [x] 3.3 Atualizar os `AGENTS.md`, validar com `openspec validate --all` e arquivar o change.
