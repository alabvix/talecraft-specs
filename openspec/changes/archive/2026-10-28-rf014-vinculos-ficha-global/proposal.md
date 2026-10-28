## Why

O RF014 criou o vínculo livro–personagem, mas a ficha global do personagem
continua mostrando **Vínculos com Livros** e **Curva de arco em cada livro**
vazios. O escritor precisa ver, na própria ficha, em quais livros o personagem
está e com qual papel — e a curva deve indicar que ainda não há dados, porque ela
depende dos capítulos.

## What Changes

- Mostrar no painel **Vínculos com Livros** da ficha global os livros associados,
  com **Nome do Livro**, **Papel do Personagem** e **Total de Capítulos em que
  aparece** (0 e **pendente** até o cadastro de Capítulos).
- Listar no quadro **Curva de arco em cada livro** o nome de cada livro
  vinculado com a indicação **sem dados por enquanto**.
- Manter o painel retrátil do RF006: retraído sem vínculos, expandido com ao
  menos um.
- Novo comando Tauri `listar_livros_do_personagem` (49 no total), somente
  leitura, sem migração.
- Nenhuma mudança de banco: a leitura usa `livro_personagem`.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `character-library`: o requisito dos vínculos/arco fora do escopo é substituído
  pelo comportamento real da ficha global, que lê os vínculos do RF014.

## Impact

- **Requisito coberto:** RF014 (RF014-TL007, RF014-RN010, RF014-RN015,
  RF014-CA018) e RF004 (RF004-CA009).
- **Fora do escopo:** calcular a curva ou o total de capítulos (dependem do
  cadastro de Capítulos), habilitar o filtro por livro na tela principal,
  editar o vínculo pela ficha global e desvincular.
- **Banco:** nenhuma migração.
- **Back-end:** `src-tauri/src/livro_personagem.rs`, `src-tauri/src/lib.rs` e
  testes.
- **Front-end:** `src/componentes/TelaPersonagem.jsx` e
  `src/livroPersonagensApi.js`.
- **Verificação:** `scripts/verificar-rf014.mjs` passa a abrir a ficha global e
  conferir o painel e a curva; sem regressão dos demais verificadores.
