## Context

O RF007 entregou o **Mundo global** (migração v4) com listagem, detalhe/criação, imagem 16:9, painel de vínculos vazio e exportação em PDF. A tela `TelaMundo.jsx` já foi convertida para abas com **Dados gerais** e **Imagem do mundo** neste change.

O RF008 acrescenta as **entradas do Mundo** (Localidades, Raças e Povos, Artefatos, Armas, Eventos, Sistemas) organizadas em abas dentro da tela do Mundo. O padrão já provado (migração aditiva, módulo de domínio, comandos Tauri, API front-end, telas reusando design system, verificador com app real) deve ser mantido.

## Goals / Non-Goals

**Goals:**
- Migração **v5 aditiva** criando as seis tabelas das sub-entidades e `sistema_regra` com ordenação.
- Abas de entradas na `TelaMundo` (após Dados gerais / Imagem do mundo), com tabela, paginação, botão Novo(a) e ação Editar.
- Janela responsiva para inclusão/edição com validação e rolagem interna.
- Gerenciamento de regras para **Sistemas** (adicionar/remover/reordenar, descrição obrigatória).
- Mundo deve estar salvo para criar/editar; botões desabilitados com aviso.
- Sem alterações destrutivas nas migrações anteriores.

**Non-Goals:**
- Exclusão de entradas (RF008-RN014).
- Associação de entradas a livros/capítulos (fora do escopo).
- Telas globais fora das abas do Mundo.
- Reaproveitamento entre mundos (RF008-RN001).

## Decisions

### D1 - Migração v5 aditiva
Criar novo passo em `banco.rs` após v4:

```sql
CREATE TABLE IF NOT EXISTS localidade (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mundo_id INTEGER NOT NULL REFERENCES mundo_global(id),
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL DEFAULT '',
  historia TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS raca_povo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mundo_id INTEGER NOT NULL REFERENCES mundo_global(id),
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL DEFAULT '',
  caracteristicas TEXT NOT NULL DEFAULT '',
  forcas TEXT NOT NULL DEFAULT '',
  fraquezas TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS artefato (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mundo_id INTEGER NOT NULL REFERENCES mundo_global(id),
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL DEFAULT '',
  poder TEXT NOT NULL DEFAULT '',
  funcionamento TEXT NOT NULL DEFAULT '',
  limitacoes TEXT NOT NULL DEFAULT '',
  custo_aquisicao TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS arma (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mundo_id INTEGER NOT NULL REFERENCES mundo_global(id),
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL DEFAULT '',
  dano TEXT NOT NULL DEFAULT '',
  funcionamento TEXT NOT NULL DEFAULT '',
  limitacoes TEXT NOT NULL DEFAULT '',
  custo_aquisicao TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS evento (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mundo_id INTEGER NOT NULL REFERENCES mundo_global(id),
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL DEFAULT '',
  data TEXT NOT NULL DEFAULT '',
  impacto TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS sistema (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mundo_id INTEGER NOT NULL REFERENCES mundo_global(id),
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL DEFAULT '',
  tipo TEXT NOT NULL CHECK (tipo IN ('Magia','Energia','Combate'))
);

CREATE TABLE IF NOT EXISTS sistema_regra (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sistema_id INTEGER NOT NULL REFERENCES sistema(id) ON DELETE CASCADE,
  descricao TEXT NOT NULL,
  ordem INTEGER NOT NULL,
  UNIQUE(sistema_id, ordem)
);

CREATE INDEX IF NOT EXISTS idx_localidade_mundo ON localidade(mundo_id);
CREATE INDEX IF NOT EXISTS idx_raca_povo_mundo ON raca_povo(mundo_id);
CREATE INDEX IF NOT EXISTS idx_artefato_mundo ON artefato(mundo_id);
CREATE INDEX IF NOT EXISTS idx_arma_mundo ON arma(mundo_id);
CREATE INDEX IF NOT EXISTS idx_evento_mundo ON evento(mundo_id);
CREATE INDEX IF NOT EXISTS idx_sistema_mundo ON sistema(mundo_id);
CREATE INDEX IF NOT EXISTS idx_sistema_regra_sistema ON sistema_regra(sistema_id);
```

- `tipo` de Sistema é obrigatório com `CHECK` fechado (RF008-RN009).
- `sistema_regra.descricao` obrigatório; ordem preservada via `ordem` com unicidade.
- Índices por `mundo_id` para paginação/filtragem futura.

### D2 - Domínio Rust
Criar `src-tauri/src/entradas_mundo.rs` (ou módulos por entidade). Estruturas `serde` com `camelCase` no front via serde se necessário, ou manter snake_case coerente com o projeto. Para regras do Sistema, usar `Vec<RegraSistema> { descricao: String }` com ordenação ao salvar.

Comandos Tauri:
- `listar_entradas_mundo(mundo_id, tipo, pagina, por_pagina)` 
- `obter_entrada_mundo(tipo, id)`
- `salvar_entrada_mundo(entrada)` (inclui regras para Sistema)
- `listar_tipos_sistema()` para alimentar o combo

Todos com validação: Nome obrigatório, Tipo de Sistema válido, regras com descrição obrigatória.

### D3 - Front-end
- Adicionar abas em `TelaMundo.jsx` (estender o padrão já existente de `.worldtabs`).
- Criar `src/entradasMundoApi.js` com chamadas aos comandos.
- Criar componentes para tabela + paginação por aba e `ModalEntradaMundo.jsx` (ou `ModalEntrada.jsx`) responsivo com campos dinâmicos por tipo e gerenciador de regras para Sistema.
- Estados locais por aba: `pagina`, `total`, `itens`. Botões desabilitados se `mundo.id` ausente com aviso.
- Reutilizar estilos `.panel`, `.table`, `.modal`, `.btn` já existentes.

### D4 - Regras e escopo
- Mundo deve estar salvo: verificar `mundo.id` antes de habilitar botões/abrir modal.
- Paginação simples (padrão existente no projeto).
- Sem exclusão neste requisito.
- Sem associação a livros/capítulos.

## Risks / Trade-offs
- **Muitas tabelas**: padronizar com funções helpers para CRUD.
- **Regras ordenadas**: salvar em transação (deletar e re-inserir por ordem) para simplicidade.
- **Janela responsiva**: usar classes modais existentes com `overflow-y: auto`.

## Migration Plan
1. Adicionar migração v5 em `banco.rs`.
2. Criar domínio `entradas_mundo.rs` + comandos em `lib.rs`.
3. Atualizar `TelaMundo.jsx` com abas e integrações.
4. Criar API e componentes de modal/tabela/paginação.
5. Testes Rust + build front + verificador RF008 + regressão.
6. `openspec validate --all`.

## Open Questions
Nenhuma. Regras definidas em `documents/talecraft.md` RF008.
