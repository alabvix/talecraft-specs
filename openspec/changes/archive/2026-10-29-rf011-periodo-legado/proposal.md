## Why

O ajuste anterior passou a aceitar somente dígitos em **De** e **Até**, mas
livros gravados antes dele podem ter período em texto livre (“Século XXII”,
“1921–1923”). Aplicar o filtro ao valor inteiro no primeiro caractere digitado
apagaria a anotação antiga sem aviso. É preciso tratar esse dado legado sem
migração destrutiva e sem perder informação.

## What Changes

- A interface passa a **detectar período legado** (texto não numérico) e a
  exibi-lo intacto, com aviso e destaque no campo, em vez de filtrá-lo.
- O aviso oferece ações explícitas **Usar <dígitos>** (quando o valor antigo
  contém números) e **Limpar**; a conversão nunca é automática.
- Enquanto o valor for legado, a edição não é filtrada; depois que o campo
  volta a ser numérico ou vazio, o filtro de dígitos volta a valer.
- **Salvar** com período legado continua permitido e preserva o texto, mas
  exibe um aviso de que o período precisa ser ajustado.
- A auditoria de suporte fica documentada por consulta SQL somente leitura.
- Nenhuma migração, comando Tauri ou biblioteca nova.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: **Dados do Livro com Tab Panel** passa a tratar período
  legado de forma não destrutiva; **Salvar o livro e os dados gerais** passa a
  preservar o período legado inalterado ao salvar.

## Impact

- **Requisito coberto:** RF011 (RF011-RN018, RF011-CA023).
- **Fora do escopo:** migração automática dos valores antigos, validação no
  back-end, bloqueio do **Salvar**, tela de manutenção e conversão em massa.
- **Banco:** nenhuma migração; `periodo_de`/`periodo_ate` continuam
  `TEXT NOT NULL DEFAULT ''`.
- **Front-end:** `src/componentes/DadosLivro.jsx` (detecção, aviso, ações e
  edição não destrutiva) e `src/talecraft.css` (`.input--legado`,
  `.periodo__aviso`, `.notice--warn`).
- **Verificação:** `scripts/verificar-rf011.mjs` passa a semear um livro com
  período em texto e conferir exibição, edição não destrutiva, aviso no
  salvar e conversão (35 → 39 verificações).
