## Why

O painel do capítulo concentra, na mesma aba **Dados do Capítulo**, campos de
planejamento estrutural (Número, Título, Tipo, Meta, cenário e resumo) e campos
de composição narrativa (Foreshadowing, Plot Twist, Cliffhanger, Punch e K.O).
Separar esses grupos deixa a edição mais legível e reduz a rolagem.

Além disso, o campo **Cenário Worldbuilding** só aceita uma localidade. Um
capítulo pode acontecer em mais de um lugar (por exemplo, uma cena que começa na
cidade e termina na casa), então o escritor precisa associar vários cenários ao
mesmo capítulo.

## What Changes

- O painel do capítulo passa a ter **três abas**: **Dados do Capítulo**,
  **Dados Complementares** e **Personagens do Capítulo**.
- **Foreshadowing**, **Plot Twist**, **Cliffhanger**, **Punch** e **K.O** saem de
  **Dados do Capítulo** e passam para a nova aba **Dados Complementares**, com o
  **Salvar** comum no cabeçalho.
- O campo **Cenário Worldbuilding** deixa de ser um select único e passa a
  permitir **um ou mais** cenários, escolhidos pelo select agrupado por mundo
  com **Adicionar** e removidos pela lista de selecionados.
- Nova migração **v24** com a tabela `capitulo_cenario`, copiando para ela o
  cenário único já gravado.
- Remover um mundo do livro limpa **todos** os cenários daquele mundo nos
  capítulos, na mesma transação, e conta os capítulos distintos afetados.

## Capabilities

### New Capabilities

Nenhuma capability nova.

### Modified Capabilities

- `book-workspace`: o requisito **Capítulos do livro** ganha a aba **Dados
  Complementares** e o requisito **Cenário Worldbuilding do capítulo com os
  mundos do livro** passa a aceitar vários cenários; o requisito **Caminho da
  localidade no cenário do capítulo** passa a valer para a lista.
- `database-foundation`: nova migração **v24** da tabela `capitulo_cenario`.
- `rust-bridge`: a limpeza dos cenários na remoção de mundo e a validação do
  cenário do capítulo passam a tratar a lista completa.

## Impact

- **App:** `src-tauri/src/capitulo.rs`, `src-tauri/src/livro_mundo.rs`,
  `src-tauri/src/banco/migracoes.rs`, testes dos três módulos,
  `src/componentes/PainelCapitulo.jsx`, `scripts/verificar-rf015.mjs`,
  `scripts/verificar-rf017.mjs` e `scripts/verificar-rf018.mjs`.
- **Specs:** `documents/talecraft.md` (RF015 e RF017) e as specs principais ao
  arquivar.
- **Banco:** migração aditiva v23 → v24; nenhum dado existente é perdido e a
  coluna antiga `capitulo.cenario_localidade_id` permanece no esquema, apenas
  deixa de ser a fonte da verdade.
- **Fora do escopo:** exportação do livro, PDF e gráficos; a associação
  livro–mundo e a validação de localidade por mundo continuam como estão.
