## 1. Banco de dados e migração
- [x] 1.1 Acrescentar migração aditiva (próxima versão) em `src-tauri/src/banco.rs` criando `faccao` (vinculada a `mundo_global`) e `faccao_personagem` (N:N com papel), com índices, `CHECK` para tipo e papel, e `UNIQUE(faccao_id, personagem_id)`.
- [x] 1.2 Garantir migração aditiva sem recriar/apagar dados existentes.
- [x] 1.3 Adicionar constantes/listas fechadas para tipos de Facção e papéis (Líder/Membro).
- [x] 1.4 Testar migração preservando dados anteriores.
- [x] 1.5 Rodar `cargo test --manifest-path src-tauri/Cargo.toml --lib`.

## 2. Domínio Rust das Facções
- [x] 2.1 Criar `src-tauri/src/faccao.rs` com estruturas `Faccao`, `FaccaoResumo`, `FaccaoPersonagem`, `FaccaoPersonagemDetalhe`, `ListaFaccoes`.
- [x] 2.2 Implementar `listar_faccoes` por `mundo_id` com paginação.
- [x] 2.3 Implementar `obter_faccao`, `salvar_faccao` com validação (Nome obrigatório, Tipo válido quando preenchido).
- [x] 2.4 Implementar `listar_faccoes_do_personagem`, `listar_personagens_da_faccao`.
- [x] 2.5 Implementar `salvar_associacao_faccao_personagem` e `remover_associacao_faccao_personagem` com validações (papel Líder/Membro, impedir duplicidade).
- [x] 2.6 Escrever testes unitários do domínio.

## 3. Comandos Tauri
- [x] 3.1 Declarar `mod faccao;` em `src-tauri/src/lib.rs`.
- [x] 3.2 Adicionar comandos `listar_faccoes`, `obter_faccao`, `salvar_faccao`, `listar_tipos_faccao`, `listar_faccoes_do_personagem`, `listar_personagens_da_faccao`, `salvar_associacao_faccao_personagem`, `remover_associacao_faccao_personagem` ao `invoke_handler`.
- [x] 3.3 Garantir sem comandos desnecessários fora do escopo.
- [x] 3.4 Compilar `cargo build --manifest-path src-tauri/Cargo.toml`.

## 4. API e navegação front-end (Mundo)
- [x] 4.1 Criar `src/faccoesApi.js` com funções para comandos de Facção e associações.
- [x] 4.2 Criar `src/faccoes.js` com metadados (tipos, papéis).
- [x] 4.3 Atualizar `TelaMundo.jsx` para adicionar aba **Facções** após as demais abas.
- [x] 4.4 Desabilitar botões de inclusão quando mundo não estiver salvo com aviso orientativo.

## 5. Listagem, paginação e modal (Mundo)
- [x] 5.1 Criar/reutilizar componente de tabela com paginação para Facções.
- [x] 5.2 Criar `ModalFaccao.jsx` responsivo com campos: Nome (obrigatório), Tipo, Ideologia/Objetivos, Líder(es), Base/Território, Descrição, História.
- [x] 5.3 Validar Nome obrigatório e Tipo da lista fechada no front-end.
- [x] 5.4 Ligar salvar/editar e recarregar listagem.

## 6. Associação e gerenciamento no Personagem
- [x] 6.1 Atualizar `TelaPersonagem.jsx` para exibir painel **Facções** com listagem das associações (Facção + Papel).
- [x] 6.2 Permitir adicionar associação (selecionar Facção existente no Mundo/contexto adequado e definir papel Líder/Membro).
- [x] 6.3 Permitir alterar papel e remover associação.
- [x] 6.4 Impedir duplicidade e exibir múltiplas facções por personagem.
- [x] 6.5 Garantir consistência/reflexo entre telas.

## 7. Estilos, verificação e fechamento
- [x] 7.1 Adicionar/ajustar estilos para aba Facções, tabela, paginação, modal e painel do Personagem em `src/mundos.css` ou arquivo adequado.
- [x] 7.2 Garantir responsividade e coerência com temas.
- [x] 7.3 Criar `scripts/verificar-rf009.mjs` cobrindo aba Facções, cadastro, associação no Personagem, múltiplas facções, alteração papel, remoção, duplicidade e mundo não salvo.
- [x] 7.4 Rodar `cargo test --manifest-path src-tauri/Cargo.toml --lib` e `verificar-rf009.mjs`, corrigindo eventuais falhas.
- [x] 7.5 Validar sem regressão dos requisitos anteriores (RF002–RF008).
