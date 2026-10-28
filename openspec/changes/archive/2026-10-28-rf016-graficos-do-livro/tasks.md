## 1. Back-end

- [x] 1.1 Criar `src-tauri/src/grafico.rs` com as structs e o cálculo das séries de progressão e de arco (design D1, D2, D3, D5).
- [x] 1.2 Criar `src-tauri/src/grafico/testes.rs` com progressão, deltas, ordem, ausência e livro inexistente (design D9).
- [x] 1.3 Registrar o comando `dados_graficos_livro` no `invoke_handler` (56 no total).

## 2. Front-end

- [x] 2.1 Criar `src/graficosApi.js`.
- [x] 2.2 Criar `GraficoProgressao.jsx` com eixos, grade, linha e legenda (design D6).
- [x] 2.3 Criar `GraficoArco.jsx` com segmentos, marcadores pequenos/grandes e quebra por ausência (design D4, D6, D7).
- [x] 2.4 Criar `TelaGraficosLivro.jsx` com o Tab Panel, carregamento, erro e estados vazios (design D8).
- [x] 2.5 Integrar a seção em `TelaLivro.jsx`, atualizar `livros.js`, o card do Painel e os estilos em `livros.css`.

## 3. Verificação

- [x] 3.1 Criar `scripts/verificar-rf016.mjs` com as duas abas, eixos, linha, marcadores, ordem, ausência e estados vazios.
- [x] 3.2 Ajustar `scripts/verificar-rf011.mjs` (Gráficos é seção real) e rodar a regressão.
- [x] 3.3 Rodar `npm run verificar:rust` e `npm run build`.

## 4. Documentação e fechamento

- [x] 4.1 Atualizar os `AGENTS.md` de `talecraft-app` e `talecraft-specs`.
- [x] 4.2 Validar com `openspec validate --all` e arquivar com `openspec archive "rf016-graficos-do-livro" --yes`.
