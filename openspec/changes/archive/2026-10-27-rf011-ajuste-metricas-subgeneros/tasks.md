## 1. Requisito e specs

- [x] 1.1 Atualizar RF011-RN004 (doze subgêneros de Fantasia), RF011-CA008 e RF011-CA018 em `documents/talecraft.md`.
- [x] 1.2 Validar o change com `openspec validate`.

## 2. Banco e domínio

- [x] 2.1 Ampliar `SUBGENEROS_FANTASIA` em `src-tauri/src/banco.rs` para os doze valores.
- [x] 2.2 Criar a migração v8 aditiva recriando `livro_subgenero` com o `CHECK` ampliado.
- [x] 2.3 Ajustar `estatisticas()` em `src-tauri/src/livro.rs` para devolver 0 em personagens, personagens em 2+ livros e entradas de mundo enquanto não houver vínculo.
- [x] 2.4 Atualizar os testes de listas, de métricas e adicionar teste de migração v7 → v8 e de aceitação de todos os subgêneros.

## 3. Verificação

- [x] 3.1 Ajustar `scripts/verificar-rf011.mjs` para 12 subgêneros de Fantasia e para métricas zeradas mesmo com personagens e entradas globais.
- [x] 3.2 Rodar `npm run verificar:rust`, `npm run build` e `verificar-rf011.mjs`.
- [x] 3.3 Rodar a regressão RF002–RF010.

## 4. Fechamento

- [x] 4.1 Atualizar os `AGENTS.md` dos dois repositórios.
- [x] 4.2 Arquivar o change e confirmar `openspec validate --all`.
