## 1. Banco e domínio

- [x] 1.1 Criar a migração v11 aditiva em `src-tauri/src/banco/migracoes.rs` com `periodo_de` e `periodo_ate` (`TEXT NOT NULL DEFAULT ''`) em `livro`.
- [x] 1.2 Acrescentar `periodo_de` e `periodo_ate` ao struct `Livro`, a `obter` e a `salvar`; `listar` devolve vazio (design D3).
- [x] 1.3 Ajustar os helpers de teste e cobrir gravação/releitura do período em `src-tauri/src/livro/testes.rs`.
- [x] 1.4 Cobrir a migração v10 → v11 em `src-tauri/src/banco/testes.rs`, incluindo livro antigo com período vazio.

## 2. Front-end

- [x] 2.1 Reordenar `MODULOS_PAINEL` em `src/componentes/TelaLivro.jsx` para **Dados do Livro**, **Personagens**, **Capítulos**, **Worldbuilding**, **Gráficos**, **Exportar**.
- [x] 2.2 Acrescentar `periodo_de` e `periodo_ate` a `livroNovo()` em `src/livrosApi.js`.
- [x] 2.3 Adicionar os campos **De** e **Até** em `AbaDadosGerais` (`DadosLivro.jsx`), com `id` `livro-periodo-de` e `livro-periodo-ate`.
- [x] 2.4 Rodar `npm run build`.

## 3. Verificação

- [x] 3.1 Atualizar `scripts/verificar-rf011.mjs`: ordem dos módulos e período gravado/relido (29 → 31).
- [x] 3.2 Rodar `cargo build --manifest-path src-tauri/Cargo.toml`, subir o Vite e executar o RF011.
- [x] 3.3 Rodar `npm run verificar:rust`, `npm run build` e os verificadores RF002–RF013 e de janela.

## 4. Documentação e fechamento

- [x] 4.1 Atualizar os `AGENTS.md` dos dois repositórios com o ajuste, a migração v11 e a nova contagem.
- [x] 4.2 Validar com `openspec validate --all`.
- [x] 4.3 Arquivar o change com `openspec archive "rf011-ajustes-periodo-ordem-modulos" --yes` e confirmar as specs de `book-workspace` e `database-foundation`.
