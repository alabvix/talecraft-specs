## Why

A Curva de Progressão só é visível dentro da seção **Gráficos**, e o Painel do
Livro não mostra o andamento da trama. Na ficha global, o quadro **Curva de arco
em cada livro** ainda é um placeholder ("sem dados"), embora os capítulos, os
eventos e os vínculos já existam. O escritor precisa ver os dois gráficos no
lugar onde planeja.

## What Changes

- O **Painel do Livro** passa a exibir, logo abaixo de **Módulos deste Livro**,
  o painel **Curva de Progressão por Capítulo**, reutilizando o gráfico da seção
  Gráficos. Sem capítulos, o painel permanece e informa **Ainda não existem
  dados**.
- Na ficha global do personagem, o quadro **Curva de arco em cada livro** ganha
  uma **caixa de seleção de livros** e, ao selecionar, exibe o gráfico
  **Evolução de Personagem** daquele livro. Sem dados, mostra **Ainda não
  existem dados**.
- Nenhuma migração, comando ou campo novo: os dois reusam
  `dados_graficos_livro`, `GraficoProgressao` e `GraficoArco`.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: o Painel do Livro ganha a Curva de Progressão.
- `character-library`: a Curva de arco em cada livro ganha seletor de livro e o
  gráfico de Evolução de Personagem.

## Impact

- **Requisitos cobertos:** RF011 (RF011-TL003, RF011-CA013), RF016
  (RF016-TL006, RF016-RN011, RF016-CA016), RF014 (RF014-TL007, RF014-RN016,
  RF014-CA019) e RF004-CA009.
- **Fora do escopo:** alterar o cálculo dos gráficos, a seção Gráficos, os
  vínculos ou o cadastro de capítulos.
- **Banco:** nenhuma migração; o esquema continua na v16.
- **Back-end:** nenhum comando novo.
- **Front-end:** `TelaLivro.jsx`, `TelaPersonagem.jsx` e os componentes de
  gráfico existentes.
- **Verificação:** RF011, RF014 e RF015 passam a cobrir o painel e o seletor.
