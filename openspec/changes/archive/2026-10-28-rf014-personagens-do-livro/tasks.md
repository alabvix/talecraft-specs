## 1. Banco e domínio

- [x] 1.1 Criar a migração v12 aditiva em `src-tauri/src/banco/migracoes.rs` com a tabela `livro_personagem` (PK composta `livro_id` + `personagem_id`, FKs, `CHECK` do **Papel** com os seis valores + **Não definido**, quatro colunas de texto com `DEFAULT ''`) e o índice por `personagem_id` (design D1).
- [x] 1.2 Centralizar em `src-tauri/src/banco.rs` a lista `PAPEIS_PERSONAGEM_LIVRO` na ordem do requisito, incluindo o valor vazio **Não definido**.
- [x] 1.3 Criar `src-tauri/src/livro_personagem.rs` com os structs do elenco (resumo), do detalhe (dados globais + vínculo), do relatório de associação e do vínculo para gravação, todos com `serde(rename_all = "camelCase")` (design D2, D4, D5).
- [x] 1.4 Implementar `listar_personagens_do_livro` (elenco com retrato, nome e papel) e `listar_personagens_para_livro` (biblioteca global com `jaAssociado`), validando que o livro existe.
- [x] 1.5 Implementar `associar_personagens_ao_livro` em transação, recusando seleção vazia com `CodigoErro::NenhumPersonagemSelecionado`, inserindo somente os novos e devolvendo `associados`/`jaAssociados` (design D4).
- [x] 1.6 Implementar `obter_personagem_do_livro` (registro completo do personagem global + os cinco campos do vínculo) e `salvar_personagem_do_livro` (somente `UPDATE`, conferindo linhas afetadas e devolvendo `CodigoErro::VinculoNaoEncontrado` quando não existir) (design D5, D6).
- [x] 1.7 Recusar associação e gravação quando o livro não estiver salvo, com `CodigoErro::LivroNaoSalvo`, e validar o **Papel** contra `PAPEIS_PERSONAGEM_LIVRO` com código de erro estável (RF014-RN004, RF014-RN008).
- [x] 1.8 Testar em `src-tauri/src/livro_personagem/testes.rs` e `src-tauri/src/banco/testes.rs`: associação em lote, duplicidade sem segundo vínculo, recusa de papel inválido, gravação/releitura dos cinco campos, ficha global inalterada, personagem em dois livros e migração v11 → v12 sem perda (RF014-CA013).

## 2. Comandos Tauri

- [x] 2.1 Registrar os seis comandos no `invoke_handler` de `src-tauri/src/lib.rs`, com comentário citando o RF014, usando `com_conexao`/`com_conexao_mut` e convertendo o erro apenas na borda.
- [x] 2.2 Atualizar `livro::estatisticas` para contar **Personagens** com `COUNT(DISTINCT personagem_id)` e **Personagens · N em 2+ livros** com `GROUP BY ... HAVING COUNT(*) >= 2`, mantendo **Capítulos planejados** e **Entradas de worldbuilding** em **0** (design D7; RF014-RN011, RF014-CA014).
- [x] 2.3 Acrescentar testes das métricas com um personagem em um livro, um personagem em dois livros e um personagem global sem vínculo.

## 3. Front-end

- [x] 3.1 Criar `src/livroPersonagensApi.js` com as chamadas aos seis comandos, no padrão de `personagensApi.js` e `faccoesApi.js`.
- [x] 3.2 Criar `src/componentes/TelaPersonagensLivro.jsx`: cabeçalho com **Adicionar Personagens**, alternância **Cards/Lista** por radio nativo, cards reusando `.libcard` com retrato/nome/papel, estado vazio e mensagem quando o livro não está salvo (design D8; RF014-TL001, RF014-TL002).
- [x] 3.3 Criar `src/componentes/ModalSelecaoPersonagens.jsx` com checkbox por personagem, selo **Já associado** e checkbox desabilitado, estado vazio da biblioteca global, mensagem de nenhuma seleção e os botões **Associar**/**Fechar** (RF014-TL003, RF014-FL001, RF014-FL002, RF014-CA003 a RF014-CA005, RF014-CA011, RF014-CA012).
- [x] 3.4 Criar `src/componentes/ModalPersonagemLivro.jsx` com a área **Dados do personagem** somente leitura (retrato, Nome, Idade, Raça, Personalidade, Força, Fraqueza, Interesses, Alcunha e Biografia), a área **Vínculo com o livro** editável (**Papel**, **Resumo do Papel**, **Papel no mundo**, **Alcunha**, **Resumo da atuação na história**) e os botões **Salvar**/**Fechar** (RF014-TL004, RF014-TL005, RF014-TL006, RF014-CA007 a RF014-CA010).
- [x] 3.5 Trocar a seção informativa de **Personagens** pela tela real em `TelaLivro.jsx` e remover **Personagens** das seções futuras em `src/livros.js`, sem antecipar Capítulos, Worldbuilding, Gráficos ou Exportar (RF014-CA001).
- [x] 3.6 Montar os cards e a modal com o `diretorioDados` recebido por prop e com `urlRetrato`, garantindo que o retrato carregue; não chamar o helper com string vazia.
- [x] 3.7 Ajustar `src/livros.css` (ou `personagens.css`) para a seção do elenco, o selo **Já associado**, o papel na listagem e a modal de duas áreas, usando apenas tokens de tema.
- [x] 3.8 Atualizar as métricas do Painel/Meus Livros para refletir os vínculos, sem somar a biblioteca global solta (RF014-RN011).

## 4. Verificação

- [x] 4.1 Criar `scripts/verificar-rf014.mjs` com banco isolado via `TALECRAFT_DADOS`, cobrindo a seção, o botão, a modal de seleção, a associação múltipla, a duplicidade, os cards/lista, o detalhe, o papel, a gravação, o **Fechar** sem salvar, o estado vazio, a ausência de desvincular e as métricas (RF014-CA001 a RF014-CA017).
- [x] 4.2 Ajustar `scripts/verificar-rf011.mjs` para esperar a seção real de **Personagens** no lugar da tela informativa, preservando as demais checagens.
- [x] 4.3 Rodar `npm run verificar:rust` (fmt + Clippy `-D warnings` + testes) e `npm run build`.
- [x] 4.4 Rodar `node scripts/verificar-rf014.mjs`, `node scripts/verificar-rf011.mjs` e os verificadores RF002–RF013 para confirmar a ausência de regressão.

## 5. Documentação e fechamento

- [x] 5.1 Atualizar o `AGENTS.md` de `talecraft-app` com o estado do RF014, a migração v12, os comandos novos, as métricas e as armadilhas encontradas.
- [x] 5.2 Atualizar o `AGENTS.md` de `talecraft-specs` com o RF014, as capabilities alteradas e o próximo passo.
- [x] 5.3 Validar com `openspec validate --all`.
- [x] 5.4 Arquivar o change com `openspec archive "rf014-personagens-do-livro" --yes` e confirmar as specs consolidadas de `book-workspace`, `database-foundation` e `book-library`.
