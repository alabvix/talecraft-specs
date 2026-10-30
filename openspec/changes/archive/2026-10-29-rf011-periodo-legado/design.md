## Context

O período da história é `TEXT` desde a v11. O ajuste de 29/10/2026 restringiu a
interface a dígitos, mas livros já gravados podem conter “Século XXII” ou
“1921–1923”. O filtro atual atua sobre o valor inteiro no `onChange`: o primeiro
caractere digitado reduziria “Século XXII” a um dígito e “1921–1923” a
“19211923”. O banco real desta máquina está na v16, com um livro e nenhum
período preenchido; o risco atinge bancos de testadores da v0.1.0.

## Goals / Non-Goals

**Goals:**

- Preservar e sinalizar períodos legados, sem apagá-los na primeira edição.
- Oferecer conversão explícita com sugestões de dígitos e ação **Limpar**.
- Avisar no **Salvar** que o período continua legado, sem bloquear a gravação.
- Documentar uma auditoria somente leitura para suporte.
- Cobrir o fluxo no `verificar-rf011.mjs`.

**Non-Goals:**

- Migrar ou normalizar dados antigos automaticamente.
- Bloquear o salvamento ou validar o período no back-end nesta rodada.
- Definir ano de 4 dígitos, intervalo **De** ≤ **Até** ou tela de manutenção.
- Alterar banco, comandos Tauri ou dependências.

## Decisions

**D1 — Detecção e edição não destrutiva.** `temNaoNumerico()` marca o campo
legado; enquanto o valor atual for legado, o `onChange` grava o texto como veio
(sem `somenteNumeros()`). Quando o campo volta a ser numérico ou vazio, o filtro
volta a valer. Alternativa descartada: filtrar sempre — foi exatamente o que
apagaria a anotação antiga no primeiro caractere.

**D2 — Conversão explícita com sugestões.** O aviso extrai até dois grupos de
dígitos, priorizando grupos com 3+ dígitos (`1921–1923` → **Usar 1921** e
**Usar 1923**; `Século XXII` → só **Limpar**). Nada é convertido sem clique.
Alternativa descartada: extrair automaticamente ao abrir — escolheria um ano
arbitrário e perderia a intenção do escritor.

**D3 — Salvar tolerante com aviso.** O período legado é regravado intacto e um
`notice--warn` informa a pendência; os demais dados salvam normalmente.
Alternativa descartada: bloquear o **Salvar** — impediria corrigir qualquer
outro campo até resolver o período e contraria a tratativa branda aprovada.

**D4 — Sem migração.** Não há conversão determinística para “Século XXII”;
migrar apagaria informação. O valor permanece no banco e a pendência é visível
na própria ficha. Alternativa descartada: v17 que extrai dígitos — perda
silenciosa e irreversível na prática.

**D5 — Auditoria por consulta documentada.** O suporte identifica livros afetados
sem novo comando:
`SELECT id, titulo, periodo_de, periodo_ate FROM livro WHERE (periodo_de <> '' AND periodo_de GLOB '*[^0-9]*') OR (periodo_ate <> '' AND periodo_ate GLOB '*[^0-9]*');`
Alternativa descartada: comando Tauri sem tela — aumentaria a API sem caminho de
uso para o testador.

**D6 — Verificação no RF011.** O E2E grava um livro com “Século XXII” e
“1921–1923” via `salvar_livro`, reabre, confere aviso/destaque, simula a
digitação sem perda, salva com o legado, converte com os botões e relê o banco
(35 → 39 verificações).

## Risks / Trade-offs

- **Legado continua gravado** → é o comportamento desejado nesta fase; o aviso e
  a auditoria tornam a pendência visível. A validação no domínio fica para a
  próxima rodada, aceitando o legado inalterado na transição.
- **Sugestão pode não ser o ano pretendido** → o escritor escolhe ou limpa; nada
  é automático.
- **Enquanto for legado, o campo aceita texto** → é uma exceção transitória e
  sinalizada; ao ficar numérico ou vazio, o filtro volta.
- **E2E altera o livro ao final** → usa o banco isolado do verificador; nenhum
  dado real é tocado.

## Migration Plan

1. `DadosLivro.jsx`: `temNaoNumerico`, `extrairGruposNumericos`, `CampoPeriodo`,
   `AvisoPeriodoLegado`, edição tolerante e aviso pós-salvar.
2. `talecraft.css`: destaque do campo legado, linha de aviso/ações e
   `notice--warn`.
3. `verificar-rf011.mjs`: cenário legado completo.
4. Build, Vite e RF011; nenhum passo de banco ou rollback.

## Open Questions

Nenhuma. A validação numérica no back-end e a regra de intervalo/ano ficam para
requisito posterior.
