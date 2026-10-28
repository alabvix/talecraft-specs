## 1. Banco e domínio

- [x] 1.1 Criar a migração v9 aditiva em `src-tauri/src/banco/migracoes.rs` com `resumo` e `final_livro` (`TEXT NOT NULL DEFAULT ''`) na tabela `livro`.
- [x] 1.2 Acrescentar `resumo` e `final_livro` ao struct `Livro` com `#[serde(default)]` e ajustar `listar`, `obter`, `salvar` e os helpers de teste em `src-tauri/src/livro.rs` e `src-tauri/src/livro/testes.rs`.
- [x] 1.3 Garantir que `obter` devolva os dois textos e que `listar` devolva texto vazio, sem alterar a busca de Meus Livros (design D3).
- [x] 1.4 Testar gravação e releitura com quebras de linha, preservação dos textos na atualização e migração v8 → v9 em `src-tauri/src/banco/testes.rs` (RF012-RN001 a RF012-RN003, RF012-CA003, RF012-CA007).

## 2. Front-end

- [x] 2.1 Incluir `resumo: ""` e `final_livro: ""` em `livroNovo()` e remover `mesmosDados`/`CAMPOS_DADOS` de `src/livrosApi.js` (RF012-RN005).
- [x] 2.2 Declarar as abas **Dados Gerais** e **Resumo** em `TelaLivro.jsx`, com estado de aba ativa e conteúdo condicional, preservando `form` e `selecoesPorGenero` (RF012-TL001, RF012-RN004, RF012-CA001, RF012-CA004).
- [x] 2.3 Criar os campos **Resumo** e **Final do Livro** como `<textarea>` com `id` estáveis `livro-resumo` e `livro-final` (RF012-TL002, RF012-CA002).
- [x] 2.4 Remover o botão **Descartar**, a função `descartar` e o estado `ultimoSalvo`/`pendente` de `TelaLivro.jsx` (RF012-TL003, RF012-RN005, RF012-CA006).
- [x] 2.5 Ajustar `livros.css` para a altura dos textos longos e o título/badge do painel de Dados do Livro.

## 3. Verificação

- [x] 3.1 Criar `scripts/verificar-rf012.mjs` com banco isolado via `TALECRAFT_DADOS`, cobrindo v9, as duas abas, os dois campos, a preservação entre abas, a gravação a partir da aba Resumo, a reabertura e a ausência do **Descartar** (RF012-CA001 a RF012-CA009).
- [x] 3.2 Atualizar `scripts/verificar-rf011.mjs` para remover a checagem do **Descartar** (30 → 29 verificações) e manter o restante do RF011.
- [x] 3.3 Rodar `npm run verificar:rust` (fmt + Clippy `-D warnings` + testes) e `npm run build`.
- [x] 3.4 Rodar `node scripts/verificar-rf012.mjs` e `node scripts/verificar-rf011.mjs` com o executável de debug; depois rodar RF002–RF010 para confirmar a ausência de regressão.

## 4. Documentação e fechamento

- [x] 4.1 Atualizar o `AGENTS.md` de `talecraft-app` com o estado do RF012, a migração v9, a aba Resumo e a armadilha de listar/obter.
- [x] 4.2 Atualizar o `AGENTS.md` de `talecraft-specs` com o RF012, o total de capabilities e o próximo passo.
- [x] 4.3 Validar com `openspec validate --all`.
- [x] 4.4 Arquivar o change com `openspec archive "rf012-livro-aba-resumo" --yes` e confirmar as specs consolidadas de `book-workspace` e `database-foundation`.
