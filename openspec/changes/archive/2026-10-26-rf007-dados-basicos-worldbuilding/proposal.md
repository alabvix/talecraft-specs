## Why

O TaleCraft já mantém a **biblioteca global de personagens** (RF004–RF006), mas o
menu **Worldbuilding** ainda abre uma tela vazia. O primeiro passo do domínio é o
**Mundo**: a entidade global que reúne a imagem, o Tipo de Mundo, o Nível
Tecnológico, os Gêneros e a Descrição — a base à qual as entradas (localidades,
raças, artefatos, magia, mapa etc.) serão vinculadas em requisitos posteriores.

Sem o Mundo, o escritor não consegue registrar o cenário dos livros nem
reaproveitá-lo entre projetos. Este requisito entrega a entidade e a interface de
listagem, criação, edição e exportação dos dados básicos (RF007).

## What Changes

- Cria a entidade **Mundo global** com os dados básicos: **Imagem**, **Nome**
  (único obrigatório), **Tipo de Mundo**, **Nível Tecnológico**, **Gêneros**
  (múltiplos) e **Descrição** (RF007-RN001 a RF007-RN013).
- **Tipo de Mundo** entra como campo próprio — Medieval, Moderno, Futurista e
  Antigo — e alimenta o filtro por Tipo da listagem (RF007-RN004,
  RF007-CA009).
- **Nível Tecnológico** é uma lista fechada inspirada na escala de Kardashev:
  Tipo-0 Sub-Planetário, Tipo-1 Planetário, Tipo-2 Estelar, Tipo-3 Galáctico e
  Tipo-4 Universal, com ajuda em quadro flutuante no controle **?**
  (RF007-RN005, RF007-RN006).
- Cria a **Tela Principal de Mundos** com cards/lista, busca por nome, filtros
  por Tipo e Gênero, filtro por livro sem opções e inclusão de novo mundo
  (RF007-TL001, RF007-CA001 a RF007-CA013).
- Cria a **Tela de Detalhe/Criação do Mundo** com o card **Vínculos com livros**
  retrátil (sem dados) e o card **Dados Compartilhados**; botões Voltar,
  Exportar Mundo e Salvar (RF007-TL002, RF007-CA014 a RF007-CA025).
- Permite **associar uma imagem ao mundo** (JPG/PNG/WEBP até 4 MB), copiada para
  o diretório de dados do aplicativo e exibida em 16:9 no detalhe, no card e na
  lista (RF007-RN010 a RF007-RN013).
- Cria a **exportação do mundo em PDF** com os dados básicos e a imagem, pelo
  mecanismo de impressão do próprio WebView, sem biblioteca nova de PDF
  (RF007-TL003, RF007-FL006, RF007-RN015 a RF007-RN019).
- Evolui o banco por **migração aditiva v4** (`mundo_global` e `mundo_genero`),
  sem alterar nem perder os dados dos requisitos anteriores (RF007-RN023).
- **Fora do escopo:** as entradas do mundo (Localidades, Raças e povos,
  Artefatos, Armas, Eventos, Sistema de energia, Sistema de Magia e Mapa Geral),
  a associação entre mundo e livro, os dados por livro, a exclusão de mundos e o
  botão "Exportar mundos" do protótipo (RF007-RN021, RF007-RN022,
  RF007-CA013, RF007-CA034).

## Capabilities

### New Capabilities

- `world-library`: entidade Mundo global e seus dados básicos; tela principal
  com cards/lista, busca e filtros; tela de detalhe/criação; imagem 16:9; painel
  de vínculos retrátil sem dados; persistência, comandos Tauri e testes.
- `world-sheet-export`: exportação do Mundo em PDF com os dados básicos e a
  imagem, incluindo o salvamento das alterações pendentes e o diálogo nativo.

### Modified Capabilities

- `database-foundation`: o requisito de migrações idempotentes e não destrutivas
  passa a citar a migração **v4** do domínio de mundos, acrescentando um cenário
  de preservação dos dados dos requisitos anteriores.
- `rust-bridge`: acrescenta os **comandos Tauri do domínio de mundos** (listar
  com busca e filtros, obter, salvar, associar imagem, obter diretório de dados
  e exportar o mundo), registrados no `invoke_handler` e invocáveis pelo React.

## Impact

- **Banco:** nova migração v4 com `mundo_global` (nome único sem diferenciar
  caixa, tipo de mundo e nível tecnológico com `CHECK`, descrição, imagem,
  `criado_em`) e `mundo_genero` (chave composta mundo/gênero, `CHECK` dos nove
  gêneros e chave estrangeira para o mundo). Nenhuma tabela existente é alterada.
- **Back-end Rust:** novo módulo de domínio `mundo.rs` (validação das listas
  fechadas, gravação transacional dos gêneros, filtros e imagem), comandos
  registrados em `lib.rs` e reuso de `pdf.rs`/`ficha.rs` para o documento.
- **Front-end React:** `worldbuildingApi.js`, `TelaMundos.jsx`,
  `TelaMundo.jsx`, `DocumentoMundo.jsx`, `TelaDocumentoMundo.jsx`, estilos em
  `mundos.css` e novos ícones; a página `worldbuilding` deixa de usar
  `TelaVazia`.
- **Exportação:** reusa o `PrintToPdf` do WebView2 do RF006; nenhuma biblioteca
  de PDF nova.
- **Dependências:** nenhuma nova. `tauri-plugin-dialog` e o protocolo de asset
  já estão configurados.
- **Verificação:** novo `scripts/verificar-rf007.mjs` no app Tauri real, com
  banco isolado por `TALECRAFT_DADOS`, além dos testes Rust e
  `npm run build`.
