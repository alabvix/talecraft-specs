## Why

Na aba **Personagens do Capítulo**, o escritor vê apenas o nome de cada
personagem. O papel narrativo no livro (Protagonista, Falso Antagonista etc.)
fica escondido na seção **Personagens**, e o planejamento da cena perde esse
contexto. O papel já vem no elenco do livro usado pelo painel.

## What Changes

- Cada personagem da aba **Personagens do Capítulo** passa a aparecer como
  **Nome - Papel**, por exemplo **Ariadne Calan - Falso Antagonista**.
- O papel é lido do vínculo livro–personagem do RF014, em modo somente leitura;
  sem papel definido, mostra **Não definido**.
- Nenhuma migração, comando, campo ou alteração no payload do capítulo.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: a aba **Personagens do Capítulo** mostra o papel do vínculo
  ao lado do nome.

## Impact

- **Requisito coberto:** RF015 (RF015-TL005, RF015-RN016, RF015-CA017,
  RF015-CA023).
- **Fora do escopo:** editar o papel dentro do capítulo, gravar uma cópia do
  papel em `capitulo_personagem` ou alterar a seção **Personagens** do RF014.
- **Banco:** nenhuma migração; o esquema continua na v16.
- **Back-end:** nenhum comando novo; `listar_personagens_do_livro` já devolve
  `papel`.
- **Front-end:** `PainelCapitulo.jsx` e `livros.css`.
- **Verificação:** `verificar-rf015.mjs` confere o formato **Nome - Papel** e o
  fallback **Não definido**.
