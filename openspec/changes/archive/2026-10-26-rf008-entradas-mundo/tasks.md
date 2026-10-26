## 1. Banco de dados e migração
- [x] 1.1 Acrescentar migração **v5** em `src-tauri/src/banco.rs` criando `localidade`, `raca_povo`, `artefato`, `arma`, `evento`, `sistema` e `sistema_regra` com índices e restrições.
- [x] 1.2 Adicionar constantes `TIPOS_SISTEMA` em `entradas_mundo.rs` e garantir coerência com `CHECK` de `sistema.tipo`.
- [x] 1.3 Testar migração v1–v4 → v5 preservando dados existentes.
- [x] 1.4 Rodar `cargo test --manifest-path src-tauri/Cargo.toml --lib`.

## 2. Domínio Rust das entradas do Mundo
- [x] 2.1 Criar `src-tauri/src/entradas_mundo.rs` com estruturas para as 6 entidades e `RegraSistema`.
- [x] 2.2 Implementar `listar_entradas` com paginação por `mundo_id` e tipo.
- [x] 2.3 Implementar `obter_entrada` com regras carregadas para `Sistema`.
- [x] 2.4 Implementar `salvar_entrada` com validação (Nome obrigatório, Tipo de Sistema válido, regras com descrição obrigatória) e transação para regras ordenadas.
- [x] 2.5 Implementar `listar_tipos_sistema`.
- [x] 2.6 Escrever testes unitários do domínio.

## 3. Comandos Tauri
- [x] 3.1 Declarar `mod entradas_mundo;` em `src-tauri/src/lib.rs`.
- [x] 3.2 Adicionar comandos `listar_entradas_mundo`, `obter_entrada_mundo`, `salvar_entrada_mundo`, `listar_tipos_sistema` ao `invoke_handler`.
- [x] 3.3 Garantir que não há comandos de exclusão.
- [x] 3.4 Compilar `cargo build --manifest-path src-tauri/Cargo.toml`.

## 4. API e navegação front-end
- [x] 4.1 Criar `src/entradasMundoApi.js` com funções para listar/obter/salvar e `listarTiposSistema`.
- [x] 4.2 Atualizar `TelaMundo.jsx` para adicionar abas **Localidades**, **Raças e Povos**, **Artefatos**, **Armas**, **Eventos**, **Sistemas** após **Dados gerais** e **Imagem do mundo**.
- [x] 4.3 Desabilitar botões de inclusão quando mundo não estiver salvo com aviso orientativo.

## 5. Listagem, paginação e modal
- [x] 5.1 Criar componente de tabela com paginação reutilizável por aba.
- [x] 5.2 Criar `ModalEntradaMundo.jsx` responsivo com campos dinâmicos por tipo.
- [x] 5.3 Implementar gerenciador de regras para Sistema (adicionar/remover/reordenar).
- [x] 5.4 Validar Nome obrigatório e regras no front-end.
- [x] 5.5 Ligar salvar/editar e recarregar listagem.

## 6. Estilos e acabamento
- [x] 6.1 Adicionar estilos para abas de entradas, tabela, paginação e modal responsivo em `src/mundos.css` ou arquivo adequado.
- [x] 6.2 Garantir rolagem interna no modal e adaptação a telas menores.
- [x] 6.3 Conferir temas e acessibilidade.

## 7. Verificação e fechamento
- [x] 7.1 Criar `scripts/verificar-rf008.mjs` com fluxo completo (abas, listagem, paginação, inclusão/edição, regras de Sistema, mundo não salvo).
- [x] 7.2 Rodar `verificar-rf008.mjs` e obter aprovação.
- [x] 7.3 Rodar regressão: `verificar-rf002.mjs`, `verificar-rf003.mjs`, `verificar-rf004.mjs`, `verificar-rf005.mjs`, `verificar-rf005-persistencia.mjs`, `verificar-rf006.mjs`, `verificar-rf007.mjs`.
- [x] 7.4 Atualizar `AGENTS.md` com decisões do RF008.
- [x] 7.5 Rodar `openspec validate --all` e confirmar válido.
- [x] 7.6 `npm run build` (front) e `cargo test` (back).
