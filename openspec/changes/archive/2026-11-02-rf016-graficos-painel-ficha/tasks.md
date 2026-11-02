## 1. Painel do Livro

- [x] 1.1 Buscar `dadosGraficosLivro` no `PainelLivro` e guardar os capítulos para a curva (design D1).
- [x] 1.2 Renderizar o painel **Curva de Progressão por Capítulo** abaixo de **Módulos deste livro**, reusando `GraficoProgressao`, com `id="painel-grafico-progressao"` e estado vazio **Ainda não existem dados** (design D1).

## 2. Ficha global do personagem

- [x] 2.1 Acrescentar a caixa de seleção de livros e o estado/efeito de `dadosGraficosLivro` na **Curva de arco em cada livro** (design D2).
- [x] 2.2 Filtrar o arco pelo personagem da ficha e renderizar `GraficoArco` com os capítulos e marcadores do RF016; sem dados, mostrar **Ainda não existem dados** (design D2).
- [x] 2.3 Ajustar o painel para `.chartpanel` (rolagem horizontal) e atualizar o rodapé com a orientação de seleção (design D2).

## 3. Verificação e fechamento

- [x] 3.1 Atualizar `verificar-rf011.mjs` para o painel vazio e `verificar-rf015.mjs` para a curva real no Painel e a ficha global com marcador (design D4).
- [x] 3.2 Atualizar `verificar-rf014.mjs` para o seletor com dois livros, a troca de livro e o estado vazio (design D4).
- [x] 3.3 Rodar `npm run build`, `npm run verificar:rust`, os verificadores e `openspec validate --all`; atualizar os `AGENTS.md` e arquivar o change.
