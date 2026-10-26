# Design: RF009 — Facções

## Objetivo
Especificar esquema, domínio e integração entre Mundo–Facção–Personagem, mantendo coerência com padrões já adotados (Tauri/Rust + React JS, migrações aditivas, comandos Tauri, sem SQL na UI).

## Schema (migração aditiva)
Adicionar tabelas:
- **faccao** (vinculada a `mundo_global`)
  - id INTEGER PRIMARY KEY AUTOINCREMENT
  - mundo_id INTEGER NOT NULL REFERENCES mundo_global(id)
  - nome TEXT NOT NULL
  - tipo TEXT CHECK (tipo IN ('Política','Religiosa','Militar','Comercial/Empresa','Seita','Criminosa','Outra')) NULL/NOT NULL conforme validação (tipo fechado quando preenchido)
  - ideologia_objetivos TEXT NOT NULL DEFAULT ''
  - lideres TEXT NOT NULL DEFAULT ''
  - base_territorio TEXT NOT NULL DEFAULT ''
  - descricao TEXT NOT NULL DEFAULT ''
  - historia TEXT NOT NULL DEFAULT ''

- **faccao_personagem** (associação N:N com papel)
  - id INTEGER PRIMARY KEY AUTOINCREMENT
  - faccao_id INTEGER NOT NULL REFERENCES faccao(id)
  - personagem_id INTEGER NOT NULL REFERENCES personagem_global(id)
  - papel TEXT NOT NULL CHECK (papel IN ('Líder','Membro'))
  - UNIQUE(faccao_id, personagem_id) — impede duplicidade

Índices: `idx_faccao_mundo ON faccao(mundo_id)`, `idx_faccao_personagem_faccao ON faccao_personagem(faccao_id)`, `idx_faccao_personagem_personagem ON faccao_personagem(personagem_id)`.

Migração aditiva (próxima versão), sem recriar/apagar dados existentes.

## Domínio Backend (Rust)
Módulo `src-tauri/src/faccao.rs` (seguindo padrão `mundo.rs`/`entradas_mundo.rs`):
- Structs: `Faccao`, `FaccaoResumo`, `ListaFaccoes`, `FaccaoPersonagem`, `FaccaoPersonagemDetalhe`, `ListasFaccao` (com tipos fechados)
- Funções: `listar_faccoes(conexao, mundo_id, ...)` com paginação, `obter_faccao`, `salvar_faccao` (nome obrigatório, tipo validado), `listar_tipos_faccao()`
- Associações: `listar_faccoes_personagem(conexao, personagem_id)`, `listar_personagens_faccao(conexao, faccao_id)`, `salvar_associacao_faccao_personagem(conexao, ...)` (valida facção e personagem existentes, papel fechado, impede duplicidade), `remover_associacao_faccao_personagem(conexao, ...)` ou atualização de papel conforme necessário.

Comandos Tauri em `lib.rs` (registrados no `invoke_handler`):
- `listar_faccoes`, `obter_faccao`, `salvar_faccao`, `listar_tipos_faccao`
- `listar_faccoes_do_personagem`, `listar_personagens_da_faccao`, `gerenciar_associacao_faccao_personagem`, `remover_associacao_faccao_personagem`

Sem SQL na UI; todas operações via comandos.

## Frontend (React)
- API: `src/faccoesApi.js` (invokes para comandos acima)
- Metadados: `src/faccoes.js` com lista de tipos fechados e helpers
- Componentes: `ModalFaccao.jsx` (janela responsiva), `TabelaFaccoes.jsx` (tabela+paginação), painel de facções em `TelaPersonagem.jsx` para gerenciar associações
- Integração: adicionar aba **Facções** em `TelaMundo.jsx` (após demais abas), desabilitar inclusão enquanto mundo não salvo com aviso
- Estilos em `src/mundos.css` / padrões existentes (modal/tabela)

## Regras importantes
- Nome obrigatório em Fação (RF009-RN002)
- Tipo fechado quando definido (RF009-RN003)
- Papel obrigatório: Líder/Membro (RF009-RN006)
- Associação única por par (RF009-RN008)
- Personagem pode ter múltiplas facções (RF009-RN005)
- Reflexo bidirecional (RF009-RN007)
- Mundo deve estar salvo para incluir facções (RF009-RN001)
- Sem duplicidade (UNIQUE)

## Validação
Testes Rust para migração aditiva, validações, associação N:N, sem duplicidade. Script de verificação `scripts/verificar-rf009.mjs` cobrindo aba, cadastro, associação no Personagem, múltiplas facções, consistência.
