## Context

O TaleCraft ainda não tem código de aplicação; existe apenas o protótipo visual
em `prototype/` (HTML + CSS, sem build), que serve de referência de interface e
de conteúdo, mas **não** define a stack. O requisito RF001 pede a estrutura
inicial do app desktop e a prova de que a stack funciona ponta a ponta no
Windows.

A stack definida em `documents/talecraft.md` é:

- Desktop: **Tauri 2**
- Back-end: **Rust**
- Front-end: **React com JavaScript e Vite**
- Banco de dados: **SQLite** (apenas previsto; fora do escopo do RF001)
- Ambiente de desenvolvimento inicial: **Windows**

Observação de contexto: o `AGENTS.md` atual descreve a stack como
Java/Kotlin/Spring Boot/Thymeleaf. Isso contradiz o documento de requisitos; o
documento é a fonte da verdade e o `AGENTS.md` deverá ser corrigido.

## Goals / Non-Goals

**Goals:**

- Criar a estrutura inicial Tauri 2 + Rust + React/Vite que compila e executa no
  Windows.
- Exibir uma janela desktop com o nome TaleCraft e uma mensagem de inicialização
  bem-sucedida.
- Validar o IPC React → Rust com um comando de demonstração, exibindo o retorno
  no front-end.
- Oferecer comandos únicos, a partir da raiz, para desenvolvimento e compilação.
- Documentar pré-requisitos, preparação do ambiente e comandos.

**Non-Goals:**

- Banco de dados SQLite funcional, esquema, migrações ou persistência.
- Entidades de negócio (livros, personagens, capítulos, worldbuilding).
- Gráficos e exportação (HTML/PDC/MD).
- Portar ou integrar o protótipo `prototype/` (nem CSS nem telas).
- Empacotamento/instalador avançado (MSI/MSIX), assinatura de código,
  atualização automática ou CI/CD.

## Decisions

### D1. Usar o `create-tauri-app` como ponto de partida

Gerar o esqueleto com o template oficial **React (JavaScript) + Vite** do Tauri
2, em vez de montar a estrutura à mão.

- **Por quê:** garante versões compatíveis de `@tauri-apps/cli`, `@tauri-apps/api`,
  `tauri.conf.json` e `Cargo.toml` sem risco de incompatibilidade entre as
  camadas; é o caminho suportado oficialmente.
- **Alternativa considerada:** montar manualmente `src-tauri/` + Vite. Rejeitada
  por aumentar a chance de erro de integração e de versões.

### D2. JavaScript (não TypeScript) no front-end

Manter o front-end em JavaScript, conforme o documento de requisitos.

- **Por quê:** o requisito fala explicitamente "React com JavaScript e Vite".
- **Alternativa considerada:** TypeScript, que é o padrão do ecossistema atual.
  Rejeitada por divergir do documento; pode ser reavaliada em requisito futuro.

### D3. Comando de demonstração minimalista

O comando Rust de demonstração será uma função simples, registrada no
`invoke_handler`, que retorna uma mensagem curta identificando que veio do
back-end Rust (por exemplo, incluindo uma versão/identificador). O front-end
chama via `invoke` e mostra o texto na tela.

- **Por quê:** atende RF001-RN003/RF001-CA004 com o mínimo de superfície, sem
  criar contrato de domínio.
- **Alternativa considerada:** criar um comando com parâmetros/estrutura
  complexa. Rejeitada: adicionaria complexidade e contrato prematuro antes das
  specs de domínio.

### D4. Uma única API de comandos na raiz

Padronizar os comandos do `package.json` na raiz:

- `npm run dev` → sobe somente o servidor Vite.
- `npm run tauri dev` → sobe o Vite e a janela Tauri (desenvolvimento).
- `npm run tauri build` → compila para Windows.

- **Por quê:** atende RF001-RN004/RF001-RN005 com uma entrada única e documentável.
- **Alternativa considerada:** expor comandos separados de Vite e de Cargo.
  Rejeitada por não cobrir "a partir da raiz do projeto" com uma só instrução.

### D5. Estrutura de pastas na raiz do repositório

Colocar o app na raiz (ao lado de `prototype/`, `documents/` e `openspec/`), com
`src/` (React) e `src-tauri/` (Rust), mantendo o protótipo intacto.

- **Por quê:** comandos "a partir da raiz" ficam naturais e o protótipo continua
  disponível como referência.
- **Alternativa considerada:** app em `app/` ou `desktop/`. Rejeitada por exigir
  `cd` antes dos comandos, contrariando RF001-RN004.

### D6. Documentação em documento dedicado

Criar um guia de setup em `documents/setup.md`, referenciado pelo `AGENTS.md`.

- **Por quê:** atende RF001-RN006 e cria um ponto único de verdade para o
  ambiente, ao lado do documento de requisitos.

### D7. Vite 6 (compatibilidade com o Node da máquina)

Fixar `vite@^6.4.4` e `@vitejs/plugin-react@^4.7.0`.

- **Por quê:** o Vite 7/8 exige Node `^20.19.0 || >=22.12.0`, e a máquina de
  desenvolvimento roda Node `20.15.1`. O Vite 6 aceita `^20.0.0`, então o
  ambiente preparado conforme o guia (Node LTS) funciona sem surpresas.
- **Alternativa considerada:** usar o Vite mais recente (8.x) e exigir um Node
  mais novo. Rejeitada por tornar o passo de setup mais frágil; pode ser
  reavaliada quando a máquina/CI usar Node 22+.

### D8. Ícone gerado por script

Gerar a imagem de origem do ícone (1024×1024) por um script Node sem
dependências (`scripts/gerar-icone.mjs`) e expandir para todos os formatos com
`npx tauri icon`.

- **Por quê:** o `tauri build` exige os ícones listados no `tauri.conf.json`;
  versionar a origem torna o ícone reproduzível e evita binários opacos.

## Risks / Trade-offs

- **[Toolchain Rust/Tauri ausente na máquina do desenvolvedor]** → Mitigação: a
  documentação lista explicitamente os pré-requisitos (Node.js LTS, Rust
  `stable` + `cargo`, Tauri CLI, Microsoft C++ Build Tools e WebView2) e como
  verificar cada um.
- **[Primeira compilação Rust é lenta e baixa muitas crates]** → Mitigação:
  documentar que o primeiro `build` demora e exige rede; não faz parte de nenhum
  critério de aceite de desempenho.
- **[Divergência de documentação entre AGENTS.md e o documento de requisitos]** →
  Mitigação: atualizar o `AGENTS.md` para apontar o documento como fonte da
  verdade e registrar a stack correta.
- **[`npm run tauri` não existir se o CLI não estiver instalado]** → Mitigação:
  usar a dependência `@tauri-apps/cli` no `package.json` (disponível via
  `npm run tauri ...` sem instalação global).
- **[Escopo inflar para "primeira tela do app"]** → Mitigação: manter o
  Non-Goals explícito; a interface do RF001 é apenas identidade + mensagem +
  retorno do comando.

## Migration Plan

Não há migração: é a criação inicial do projeto. Não há dados nem
comportamento anterior a preservar. Rollback = remover os arquivos criados
(`src/`, `src-tauri/`, `package.json`, `vite.config.js`, `index.html` e a
documentação de setup) e o change não terá efeito sobre o protótipo.

## Open Questions

- Nenhuma pendente. As duas dúvidas anteriores foram resolvidas: o guia de setup
  ficou em `documents/setup.md` (D6) e o comando/mensagem ficaram em português —
  comando `mensagem_inicial`, mensagem "Inicialização bem-sucedida".
