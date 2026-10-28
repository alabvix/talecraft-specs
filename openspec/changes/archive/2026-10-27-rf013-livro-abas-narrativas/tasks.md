## 1. Banco e domínio

- [x] 1.1 Criar a migração v10 aditiva em `src-tauri/src/banco/migracoes.rs` com as treze colunas das abas em `livro` e a tabela `livro_humor` (PK composta, `CHECK` e FK).
- [x] 1.2 Centralizar em `src-tauri/src/banco.rs` as listas `NARRADORES_LIVRO`, `TONS_LIVRO`, `TEMPOS_LIVRO`, `HUMORES_LIVRO`, `ESTILOS_LIVRO` e `RITMOS_LIVRO`.
- [x] 1.3 Acrescentar ao struct `Livro` os oito textos, as cinco listas de valor único e `humor: Vec<String>`, todos com `#[serde(default)]`.
- [x] 1.4 Fazer `obter` devolver todos os campos e `listar` devolver textos vazios, listas sem valor e humor vazio (design D3).
- [x] 1.5 Validar as listas no domínio com `CodigoErro::OpcaoNarrativaInvalida` e `CodigoErro::HumorInvalido`; gravar colunas, subgêneros, humor e demais campos na mesma transação.
- [x] 1.6 Testar gravação/releitura com quebras de linha, humor múltiplo sem repetição, recusa de valores fora das listas e migração v9 → v10 em `src-tauri/src/livro/testes.rs` e `src-tauri/src/banco/testes.rs`.

## 2. Front-end

- [x] 2.1 Extrair `src/componentes/DadosLivro.jsx` de `TelaLivro.jsx`, mantendo o estado do formulário, a aba ativa e o **Salvar**.
- [x] 2.2 Declarar as seis abas na ordem e renderizar cada aba por um componente próprio (`AbaDadosGerais`, `AbaResumo`, `AbaSinopse`, `AbaTema`, `AbaConflito`, `AbaVozNarrativa`).
- [x] 2.3 Criar os helpers de campo (`CampoTexto` com curto/médio/longo, `CampoLista` e `SelecaoMultipla`) com `id` estáveis (`livro-sinopse-comercial`, `livro-tema-central`, `livro-narrador`, `livro-humor`, …).
- [x] 2.4 Preencher `livroNovo()` em `src/livrosApi.js` com todos os campos novos e consumir as listas novas de `listas_livro`.
- [x] 2.5 Ajustar `livros.css` para o textarea médio e generalizar os chips de múltipla seleção para o Humor.
- [x] 2.6 Manter a edição pendente ao alternar entre as seis abas e a gravação de tudo em um único **Salvar**.

## 3. Verificação

- [x] 3.1 Criar `scripts/verificar-rf013.mjs` com banco isolado via `TALECRAFT_DADOS`, cobrindo v10, as seis abas, os tipos de campo, as listas fechadas, o humor múltiplo, a gravação, a reabertura e a preservação entre abas (RF013-CA001 a RF013-CA012).
- [x] 3.2 Ajustar `scripts/verificar-rf012.mjs` para conferir **Dados Gerais** e **Resumo** como as duas primeiras abas, sem exigir exatamente duas.
- [x] 3.3 Rodar `npm run verificar:rust` (fmt + Clippy `-D warnings` + testes) e `npm run build`.
- [x] 3.4 Rodar `node scripts/verificar-rf013.mjs`, `node scripts/verificar-rf012.mjs` e os verificadores RF002–RF011 para confirmar a ausência de regressão.

## 4. Documentação e fechamento

- [x] 4.1 Atualizar o `AGENTS.md` de `talecraft-app` com o estado do RF013, a migração v10, a extração de `DadosLivro.jsx` e as armadilhas novas.
- [x] 4.2 Atualizar o `AGENTS.md` de `talecraft-specs` com o RF013, as capabilities e o próximo passo.
- [x] 4.3 Validar com `openspec validate --all`.
- [x] 4.4 Arquivar o change com `openspec archive "rf013-livro-abas-narrativas" --yes` e confirmar as specs consolidadas de `book-workspace` e `database-foundation`.
