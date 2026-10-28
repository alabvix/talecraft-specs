## Why

A seção **Gráficos** do livro ainda abre a tela informativa de requisito
posterior. Com os capítulos (RF015) e os eventos de arco dos personagens
(RF014) já gravados, o escritor pode visualizar a progressão da trama e a
evolução de cada personagem ao longo do livro.

## What Changes

- Substituir a tela informativa de **Gráficos** por um **Tab Panel** real.
- Aba **Curva de Progressão por Capítulo**: gráfico de linha com os capítulos no
  eixo X e o progresso no eixo Y; Ação soma +1, Suspensão e Não definido mantêm
  a linha horizontal.
- Aba **Evolução de Personagem**: um gráfico por personagem, empilhado, com
  marcadores semânticos para Ascensão, Declínio, Apogeu e Queda.
- Protagonista aparece primeiro; sem protagonista, vale a primeira aparição.
- Novo comando somente leitura `dados_graficos_livro`, que calcula as séries no
  back-end. Nenhuma migração: o banco continua na v15.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: a seção **Gráficos** passa a ser real e o Painel do Livro
  deixa de tratá-la como requisito posterior.

## Impact

- **Requisito coberto:** RF016 (RF016-TL001 a RF016-TL005, RF016-FL001 a
  RF016-FL003, RF016-RN001 a RF016-RN010, RF016-CA001 a RF016-CA014).
- **Fora do escopo:** gráficos de tensão, POV, comparação entre personagens,
  exportação dos gráficos e edição dos dados pela tela.
- **Banco:** nenhuma migração; leitura de `capitulo`, `capitulo_personagem`,
  `livro_personagem` e `personagem_global`.
- **Back-end:** novo `src-tauri/src/grafico.rs` e o comando
  `dados_graficos_livro` (56 no total).
- **Front-end:** `TelaGraficosLivro.jsx`, `GraficoProgressao.jsx`,
  `GraficoArco.jsx`, `graficosApi.js`, roteamento em `TelaLivro.jsx`, metadados
  em `livros.js` e estilos em `livros.css`.
- **Verificação:** novo `scripts/verificar-rf016.mjs`; `verificar-rf011.mjs`
  passa a esperar Gráficos como seção real.
