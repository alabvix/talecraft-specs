## 1. Back-end

- [x] 1.1 Acrescentar `total_livros` ao struct `Personagem` e às consultas `listar`/`obter`, com subconsulta em `livro_personagem` (design D1).
- [x] 1.2 Ajustar a leitura do detalhe em `livro_personagem.rs` e os literais de teste; cobrir a contagem em `personagem/testes.rs`.
- [x] 1.3 Rodar `npm run verificar:rust`.

## 2. Front-end

- [x] 2.1 Usar `totalLivros` no rodapé e no corpo do card em `TelaPersonagens.jsx` (design D2).
- [x] 2.2 Tornar o nome do livro um `linkbtn` em `TelaPersonagem.jsx` e passar `aoAbrirLivro` pela `App` (design D3).
- [x] 2.3 Rodar `npm run build`.

## 3. Verificação

- [x] 3.1 Atualizar `scripts/verificar-rf014.mjs` para conferir `2 livros`/`0 livros` nos cards e o clique no nome do livro abrindo a página correta (design D4).
- [x] 3.2 Rodar o RF014 e a regressão RF002–RF013.

## 4. Documentação e fechamento

- [x] 4.1 Atualizar os `AGENTS.md` de `talecraft-app` e `talecraft-specs`.
- [x] 4.2 Validar com `openspec validate --all` e arquivar com `openspec archive "rf014-contagem-e-link-livros" --yes`.
