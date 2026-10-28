## 1. Banco e domínio

- [x] 1.1 Criar a migração v15 aditiva com a coluna `motivo` em `capitulo_personagem` (design D1).
- [x] 1.2 Acrescentar `motivo` ao struct `CapituloPersonagem`, à gravação e à leitura em `capitulo.rs` (design D1, D2).
- [x] 1.3 Atualizar os testes de capítulo e acrescentar o teste de migração v14 → v15 em `banco/testes.rs` (design D5).

## 2. Front-end

- [x] 2.1 Mover o **K.O** para ao lado do **Punch** e usar altura curta nele e no **Cenário Descritivo** (design D3).
- [x] 2.2 Quebrar a ajuda do **Tipo** em quatro parágrafos e ajustar o CSS (design D4).
- [x] 2.3 Acrescentar **Motivo do Evento** por personagem, no estado e no payload de salvar (design D2).
- [x] 2.4 Criar `.textarea--short` e os estilos do motivo e do popup em `livros.css` (design D3, D4).

## 3. Verificação e fechamento

- [x] 3.1 Atualizar `scripts/verificar-rf015.mjs` com layout, ajuda e motivo (design D5).
- [x] 3.2 Rodar `npm run verificar:rust`, `npm run build` e a regressão dos verificadores.
- [x] 3.3 Atualizar os `AGENTS.md`, validar com `openspec validate --all` e arquivar o change.
