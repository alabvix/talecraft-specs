## 1. Requisitos e documentação

- [x] 1.1 Atualizar `documents/talecraft.md` no RF015 (TL005, novo TL008, RN014, novo RN018, CA020, novos CA025 e CA026).
- [x] 1.2 Atualizar `documents/talecraft.md` no RF017 (TL009, FL007, RN007, novo RN015, CA011, CA012 e novo CA023).

## 2. Banco de dados

- [x] 2.1 Criar a migração **v24** com `capitulo_cenario` (PK composta, FKs, índice) e o backfill de `capitulo.cenario_localidade_id`.
- [x] 2.2 Adicionar teste de migração v23 → v24 preservando o cenário único.
- [x] 2.3 Ajustar os testes existentes de migração que usam a coluna legada.

## 3. Domínio Rust

- [x] 3.1 Trocar o cenário único por `cenarios: Vec<LocalidadeResumo>` em `capitulo.rs` (struct, `obter`, `criar`).
- [x] 3.2 Gravar a lista em `capitulo_cenario` na transação de `salvar`, validando existência, mundo do livro, duplicidade e ordem.
- [x] 3.3 Expor em `livro_mundo` a leitura dos cenários do capítulo com nome e caminho completo.
- [x] 3.4 Atualizar `remover_mundo_do_livro` para apagar todos os cenários do mundo e contar capítulos distintos.
- [x] 3.5 Atualizar `capitulos_com_cenario` de `listar_mundos_do_livro` para contar capítulos distintos pela tabela nova.
- [x] 3.6 Atualizar e ampliar os testes de `capitulo` e `livro_mundo` (múltiplos cenários, ordem, duplicado, mundo não associado, remoção parcial).

## 4. Front-end

- [x] 4.1 Adicionar a aba **Dados Complementares** e mover Foreshadowing, Plot Twist, Cliffhanger, Punch e K.O.
- [x] 4.2 Trocar o select único de cenário pelo select com **Adicionar** e a lista com **Remover**, mantendo o caminho completo e o estado desabilitado sem mundo.
- [x] 4.3 Enviar `cenarios` no `salvarCapitulo` e recarregar a lista no capítulo aberto.

## 5. Verificadores

- [x] 5.1 Atualizar `scripts/verificar-rf015.mjs` para três abas, campos complementares e múltiplos cenários.
- [x] 5.2 Atualizar `scripts/verificar-rf017.mjs` para a nova interface e a limpeza com vários cenários.
- [x] 5.3 Atualizar `scripts/verificar-rf018.mjs` para o cenário em lista com caminho.

## 6. Fechamento

- [x] 6.1 Rodar `npm run verificar:rust`, `npm run build` e os verificadores afetados.
- [x] 6.2 Rodar `openspec validate --all`.
- [x] 6.3 Atualizar os `AGENTS.md` dos dois repositórios e deixar o change ativo para o teste do usuário.
