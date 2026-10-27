## 1. Requisito e specs

- [x] 1.1 Ajustar RF011-RN004, RF011-FL009 e RF011-CA009 em `documents/talecraft.md`.
- [x] 1.2 Validar o change com `openspec validate`.

## 2. Front-end

- [x] 2.1 Manter em `DadosLivro` um mapa de seleções por gênero, inicializado com o livro salvo.
- [x] 2.2 Ao trocar o gênero, guardar a seleção atual e carregar a do novo gênero, sem apagar as demais.
- [x] 2.3 Atualizar o mapa ao marcar/desmarcar subgêneros.
- [x] 2.4 Reinicializar o mapa em **Salvar** e **Descartar**.

## 3. Verificação

- [x] 3.1 Ajustar `verificar-rf011.mjs` para trocar o gênero, voltar ao original e conferir os subgêneros salvos marcados.
- [x] 3.2 Rodar `npm run verificar:rust`, `npm run build` e `verificar-rf011.mjs`.
- [x] 3.3 Rodar a regressão RF002–RF010.

## 4. Fechamento

- [x] 4.1 Atualizar os `AGENTS.md` dos dois repositórios.
- [x] 4.2 Arquivar o change e confirmar `openspec validate --all`.
