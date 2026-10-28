## 1. Back-end

- [x] 1.1 Criar `LivroDoPersonagem` e `listar_livros_do_personagem` em `src-tauri/src/livro_personagem.rs`, com `livroId`, `livroTitulo`, `papel` e `totalCapitulos` (0) (design D1, D2, D3).
- [x] 1.2 Registrar o comando `listar_livros_do_personagem` no `invoke_handler` (49 no total) e testar a ordenação, o papel, o 0 e o personagem inexistente (design D6).

## 2. Front-end

- [x] 2.1 Acrescentar `listarLivrosDoPersonagem` em `src/livroPersonagensApi.js`.
- [x] 2.2 Carregar os vínculos em `src/componentes/TelaPersonagem.jsx` e preencher o painel **Vínculos com Livros** com Livro/Papel/Capítulos (0 · pendente) e o quadro **Curva de arco em cada livro** com o nome e **sem dados por enquanto** (design D4, D5).
- [x] 2.3 Manter o painel retrátil do RF006: retraído sem vínculos, expandido com ao menos um, e preservar o toggle manual.
- [x] 2.4 Ajustar os estados vazios e o rodapé das duas áreas, sem dados fictícios.

## 3. Verificação

- [x] 3.1 Estender `scripts/verificar-rf014.mjs` para abrir a ficha global de um personagem vinculado e conferir o painel expandido, as colunas, 0 · pendente e a curva com os dois livros (design D6).
- [x] 3.2 Rodar `npm run verificar:rust`, `npm run build`, `node scripts/verificar-rf014.mjs` e a regressão RF002–RF013.

## 4. Documentação e fechamento

- [x] 4.1 Atualizar os `AGENTS.md` de `talecraft-app` e `talecraft-specs` com a leitura dos vínculos na ficha global, o novo comando e a pendência de Capítulos.
- [x] 4.2 Validar com `openspec validate --all` e arquivar com `openspec archive "rf014-vinculos-ficha-global" --yes`.
