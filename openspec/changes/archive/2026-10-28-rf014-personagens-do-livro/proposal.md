## Why

A seção **Personagens** do livro ainda abre uma tela informativa (RF011-TL006):
não existe vínculo entre o livro e a biblioteca global de personagens. Sem esse
vínculo, o escritor não consegue montar o elenco de cada livro nem registrar o
papel que o personagem exerce naquela história, e as métricas de personagens de
**Meus Livros** continuam permanentemente em **0** (RF011-RN017).

## What Changes

- A seção **Personagens** do livro passa a listar os personagens associados, em
  **cards** (padrão) ou **lista**, com retrato, nome e **Papel** do vínculo.
- Novo botão **Adicionar Personagens**, desabilitado enquanto o livro não estiver
  salvo, que abre a modal de seleção múltipla com **Associar** e **Fechar**.
- Personagens já associados aparecem com **Já associado** e não podem ser
  marcados; o domínio e o banco recusam vínculo duplicado com mensagem.
- Nova modal de detalhe do personagem no livro: dados globais herdados do
  cadastro (somente leitura) e os campos do vínculo editáveis — **Papel**,
  **Resumo do Papel**, **Papel no mundo**, **Alcunha** e **Resumo da atuação na
  história** — com **Salvar** e **Fechar**.
- Migração **v12** aditiva com a tabela `livro_personagem` (par livro–personagem
  como chave primária, referências, `CHECK` do **Papel** e os campos do vínculo).
- As métricas **Personagens** e **Personagens · N em 2+ livros** passam a contar
  os vínculos criados, sem somar a biblioteca global solta.
- Nenhuma remoção de personagem do livro, nenhum comando de exclusão e nenhuma
  biblioteca nova.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: a seção **Personagens** deixa de ser tela informativa e
  ganha a listagem do elenco, a modal de seleção e a modal de detalhe do vínculo
  com os cinco campos por livro.
- `database-foundation`: nova migração **v12** aditiva com a tabela
  `livro_personagem`.
- `book-library`: a métrica **Personagens** e **Personagens · N em 2+ livros**
  passa a ter dados reais quando existirem vínculos, mantendo **0** sem eles.

## Impact

- **Requisito coberto:** RF014 (RF014-TL001 a RF014-TL006, RF014-FL001 a
  RF014-FL005, RF014-RN001 a RF014-RN013, RF014-CA001 a RF014-CA017).
- **Requisito ajustado:** RF011-TL006 e RF011-CA014 deixam de valer para
  **Personagens**, que passa a ter conteúdo de domínio; **Capítulos**,
  **Worldbuilding**, **Gráficos** e **Exportar** continuam informativos.
- **Fora do escopo:** desvincular/remover personagens do livro, editar a ficha
  global dentro da modal, exibir o elenco em Meus Livros, no Painel do Livro ou
  na exportação, ordenar o elenco manualmente, buscar/filtrar dentro da modal de
  seleção e criar personagens a partir da seção do livro.
- **Banco:** migração v12 em `src-tauri/src/banco/migracoes.rs`; bancos v11
  migram sem perda e nenhum livro, personagem, aba ou humor é alterado.
- **Back-end:** novo módulo de domínio do vínculo, comandos Tauri registrados no
  `invoke_handler`, códigos de erro estáveis e testes; `livro::estatisticas`
  passa a contar a tabela nova.
- **Front-end:** tela da seção **Personagens**, modal de seleção, modal de
  detalhe, API do vínculo e estilos reusando o design system.
- **Verificação:** novo `scripts/verificar-rf014.mjs`; ajuste do
  `verificar-rf011.mjs`, que hoje espera a tela informativa em **Personagens**;
  sem regressão dos verificadores RF002–RF013.
