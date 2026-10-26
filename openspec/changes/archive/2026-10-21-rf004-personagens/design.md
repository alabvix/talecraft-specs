# Design — RF004: Personagens

## Context

O RF002 entregou a casca visual e o RF003 a infraestrutura do SQLite
(`rusqlite` `bundled` + `rusqlite_migration`, conexão única em estado gerenciado
do Tauri, arquivo em `<app_data_dir>/talecraft.db`). Nenhuma entidade de domínio
existe ainda — o RF003 proibia (RF003-CA012).

O RF004 introduz o **primeiro domínio**: o personagem **global**, deliberadamente
separado do livro. A ficha (nome, aparência, biografia) é compartilhada; papel
narrativo, motivação e curva de arco pertencem ao vínculo com o livro — e esse
vínculo **não** é escopo deste requisito.

Restrições relevantes:

- **Camadas:** o front-end React nunca fala SQL (RF003-CA007, RF004-CA020).
- **Migração:** o esquema do RF003 já está aplicado em bancos existentes; a
  evolução precisa ser **aditiva** (RF004-CA019).
- **Protótipo é referência visual**, não a lista de campos: o RF004 manda usar os
  campos do requisito porque "nem todos existem no protótipo".
- **Idioma:** tudo em português (BR).
- **Sem novas bibliotecas**, salvo necessidade (AGENTS.md).

Decisões já confirmadas com o usuário: campos do RF004 apenas; tipo de relação em
lista fechada; um retrato por personagem; arquivo copiado para a pasta de dados;
relações direcionadas.

## Goals / Non-Goals

**Goals**

- Modelar e persistir personagens globais e suas relações.
- Substituir a tela vazia de Personagens pelas telas reais (lista, detalhe e
  modal de relações), fiéis à disposição do protótipo.
- Evoluir o esquema por migração aditiva, preservando bancos do RF003.
- Manter o padrão de camadas e de testes dos requisitos anteriores.

**Non-Goals**

- Vínculo personagem↔livro, papel narrativo, motivação e curva de arco por livro
  (RF004-CA009, RF004-CA010, RF004-CA021).
- Gráficos, exportação de fichas, duplicar personagem.
- Galeria de várias imagens com retrato principal.
- Campos do protótipo ausentes do RF004 (Gênero, Origem, Ferida permanente,
  Traços).

## Decisions

### D1 — Duas tabelas, com o domínio isolado em módulo próprio

`personagem_global` guarda os atributos; `relacao_personagem` guarda os vínculos
direcionados (RF004, "duas tabelas"). O código de acesso vive em um **módulo de
domínio** novo (`src-tauri/src/personagem.rs`), separado do `banco.rs`, que
continua cuidando só do ciclo de vida do banco. Os comandos em `lib.rs` ficam
finos: pegam a conexão do estado e delegam ao módulo.

*Alternativa considerada:* colocar tudo em `banco.rs`. Rejeitada — mistura
infraestrutura com domínio e não escala para os domínios seguintes.

### D2 — Migração **v2** aditiva, sem tocar na v1

`banco.rs::migracoes()` ganha um segundo passo `M::up(...)` que cria as duas
tabelas. O `rusqlite_migration` aplica só o que falta (RF004-CA019,
RF003-CA006). Bancos já existentes saem da v1 para a v2 sem perder dados.

*Alternativa considerada:* editar a v1. Rejeitada — bancos já criados não
reaplicariam a migração, ficando sem as tabelas.

### D3 — Restrições no banco, não só na interface

As regras ficam no esquema, onde valem sempre:

| Regra | Implementação |
|---|---|
| Nome obrigatório (RN003) | `nome TEXT NOT NULL CHECK(length(trim(nome)) > 0)` |
| Nome único (RN005) | `UNIQUE` em `nome`, com comparação **sem diferenciar maiúsculas** (`COLLATE NOCASE`) |
| Tipo fechado (RN006) | `CHECK(tipo IN (8 valores))` |
| Sem autorrelação (RN007) | `CHECK(origem_id <> destino_id)` |
| Par único (RN008) | `UNIQUE(origem_id, destino_id)` com `INSERT ... ON CONFLICT ... DO UPDATE` |
| Integridade | `FOREIGN KEY(origem_id, destino_id) REFERENCES personagem_global(id)` |

A interface ainda valida e informa o motivo (nome vazio, nome repetido), mas o
banco é a garantia final.

Não há `ON DELETE CASCADE` porque **não existe exclusão de personagem neste
requisito** (RF004-RN009); a chave estrangeira fica como garantia de integridade
para quando a exclusão for implementada.

*Alternativa considerada:* validar só no Rust. Rejeitada — o `UNIQUE` no banco
impede duplicidade mesmo em corrida e documenta a regra no próprio esquema.

### D4 — Relações **direcionadas**, guardadas uma vez

`relacao_personagem(origem_id, destino_id, tipo)` significa "origem tem relação
do tipo com destino". A→B "Mentor" não cria B→A. O painel de Relações Globais
mostra as relações **cujo origem é o personagem atual** (o que o protótipo
mostra: "Kael Moreau — Rivalidade"). Não há mapa de tipos inversos.

*Alternativa considerada:* recíproca automática. Rejeitada — exige um mapa de
inversos (Mentor↔Aprendiz, que nem está na lista) e complica sem pedido do
requisito.

### D5 — Retrato copiado para `<app_data_dir>/retratos/`, com limite de 4 MB

O usuário escolhe um arquivo pelo diálogo do sistema; o back-end **valida** que
é imagem e que tem **até 4 MB**, **copia** para `<app_data_dir>/retratos/` com
nome único (id + extensão) e grava o **caminho relativo** no personagem. O
front-end monta a URL para exibir a imagem. Arquivos acima do limite ou de
formato não suportado são recusados com mensagem útil, sem travar a aplicação
(RF004-CA018).

*Alternativa considerada:* guardar o caminho original. Rejeitada — quebra se o
usuário mover ou apagar o arquivo (RF004-CA017 exige persistência).

*Alternativa considerada:* guardar os bytes no banco (BLOB). Rejeitada —
inchaço o banco e o RF004 diz "caminho para um arquivo de imagem".

### D6 — Imagem e relação exigem personagem salvo

O fluxo de **novo personagem** é: a tela de detalhe abre vazia; Salvar cria o
registro e devolve o id; só então os controles de **retrato** e de **relação**
são habilitados (RN001, RN002, CA015, CA016). Antes disso ficam desabilitados,
como o protótipo sugere ao exigir ficha existente.

### D7 — Comandos Tauri, um por operação

| Comando | Uso |
|---|---|
| `listar_personagens(filtro_nome)` | lista/busca na tela principal |
| `obter_personagem(id)` | tela de detalhe |
| `salvar_personagem(personagem)` | criar e atualizar (inclui as relações informadas) |
| `associar_retrato(id, caminho_origem)` | valida e copia o arquivo, grava o caminho |
| `listar_personagens_para_relacao(id_atual)` | alimenta a modal (exclui o próprio) |
| `salvar_relacao(origem_id, destino_id, tipo)` | grava/atualiza a relação |

Não há comando de exclusão neste requisito (RF004-RN009).

Erros voltam como texto útil em `Result<T, String>`, como no RF003.

### D8 — Front-end: componentes novos reusando o design system

`paginas.js` passa a apontar Personagens para um componente real; nascem
`TelaPersonagens.jsx` (lista + busca + alternância cards/lista),
`TelaPersonagem.jsx` (detalhe + painel de relações) e `ModalRelacoes.jsx`
(com **campo de busca** para filtrar personagens pelo nome).
Os estilos vão para uma folha de personagens em `src/`, **usando os tokens de
tema** já existentes (nada de cor fixa) — CA024. A busca principal usa a barra
geral da topbar já presente.

*Alternativa considerada:* usar a topbar de busca existente apenas como
decoração. Rejeitada — RF004-TL001 pede busca funcional por nome.

## Risks / Trade-offs

- **[Nome único pode surpreender]** o escritor pode querer dois "João" →
  mitigado por mensagem clara de conflito (RF004-RN005) e por dois nomes de
  exemplo distintos no conteúdo fictício.
- **[`UNIQUE COLLATE NOCASE` só cobre ASCII]** "José" e "JOSE" não colidem por
  acento → aceitável; a igualdade exata ainda é garantida. Documentado como
  limitação.
- **[Retrato pode ficar órfão]** como não há exclusão neste requisito, nenhum
  arquivo é descartado em `retratos/`; a limpeza fica para quando a exclusão for
  implementada. Não bloqueia o RF004.
- **[Regressão no RF002/RF003]** ao mexer em `paginas.js` e `banco.rs` → a
  verificação viva (`verificar-rf002.mjs`, `verificar-rf003.mjs`) roda de novo e
  precisa continuar verde (RF004-CA024).
- **[Arquivos grandes/formatos inválidos]** → limite de 4 MB e restrição a
  formatos de imagem, com erro útil, sem travar a aplicação (RF004-CA018).
- **[Muitos personagens na modal]** → mitigado pelo campo de busca na modal
  (RF004-CA014).

## Migration Plan

1. Acrescentar a migração v2 em `banco.rs`; o app passa a v2 na próxima subida.
2. Bancos do RF003 existentes migram em v1→v2 automaticamente (aditivo).
3. **Rollback:** remover o `M::up` da v2 e apagar as duas tabelas; os dados do
   RF003 permanecem. Não há operação destrutiva sobre dados anteriores (nem
   exclusão de personagens neste requisito).

## Open Questions

Nenhuma pendente. As três dúvidas iniciais foram resolvidas com o usuário:

- **Limite do retrato:** adotado o limite de **4 MB** já neste requisito
  (RF004-CA018).
- **Busca na modal de relações:** **incluída** como campo simples de filtro por
  nome (RF004-CA014).
- **Exclusão de personagem:** **fora do escopo** deste requisito — nenhum
  personagem é excluído nesta etapa (RF004-RN009). Sem `ON DELETE CASCADE` por
  ora.
