## Why

O RF011 entregou as métricas de **Meus Livros** contando a biblioteca global de
personagens e todas as entradas dos mundos. Como Personagem e Mundo são entidades
separadas do Livro, esses números não representam o que a tela promete: o painel
deve refletir **o que está associado aos livros**. Enquanto não houver vínculo
personagem–livro nem associação livro–mundo, as duas métricas devem ser **0**.

O ajuste também amplia a lista fechada de subgêneros de **Fantasia**, que hoje
tem cinco valores e passa a ter doze.

## What Changes

- **Personagens** em Meus Livros passa a contar somente personagens associados a
  livros; sem a tabela de vínculo, exibe **0**.
- **Entradas de worldbuilding** passa a contar somente entradas dos mundos
  associados a livros; sem a associação livro–mundo, exibe **0**.
- O subtítulo da tela acompanha a mesma regra (personagens associados).
- **Fantasia** ganha os subgêneros **Gótico**, **Baixa Fantasia**, **Grindark**,
  **Mitológica**, **Histórica**, **Científica** e **Espada e Feitiçaria**,
  passando de cinco para doze valores.
- Migração **v8** aditiva recria `livro_subgenero` com o `CHECK` ampliado,
  preservando os livros e subgêneros existentes.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities

- `book-library`: a métrica **Personagens** e a métrica **Entradas de
  worldbuilding** passam a contar somente vínculos com livros; sem vínculo, zero.
- `book-workspace`: a lista de subgêneros de **Fantasia** passa de cinco para
  doze valores.
- `database-foundation`: nova migração v8 para ampliar o `CHECK` de
  `livro_subgenero`.

## Impact

- **Requisitos ajustados:** RF011-RN004 (subgêneros de Fantasia), RF011-CA008
  (quantidade de opções) e RF011-CA018 (métricas ligadas aos livros).
- **Banco:** migração v8 em `src-tauri/src/banco/migracoes.rs`; a v7 não é
  editada.
- **Back-end:** `SUBGENEROS_FANTASIA` em `banco.rs` e `estatisticas()` em
  `livro.rs`.
- **Front-end:** nenhuma tela nova; `TelaLivros.jsx` continua exibindo as
  métricas devolvidas pelo back-end.
- **Verificação:** `verificar-rf011.mjs` ganha a checagem de métrica zero mesmo
  com personagens e entradas globais cadastrados e a contagem de 12 subgêneros
  de Fantasia.
