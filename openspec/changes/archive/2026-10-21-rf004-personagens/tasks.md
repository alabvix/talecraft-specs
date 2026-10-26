# Tasks — RF004: Personagens

## 1. Esquema e migração

- [x] 1.1 Acrescentar a migração **v2** em `src-tauri/src/banco.rs` criando a
  tabela `personagem_global` (id, nome, idade, retrato, personalidade, forca,
  fraqueza, interesses, raca, alcunha, biografia, criado_em) (RF004-CA020)
- [x] 1.2 Na mesma migração, criar a tabela `relacao_personagem` (id, origem_id,
  destino_id, tipo) com chaves estrangeiras para `personagem_global`
- [x] 1.3 Aplicar as restrições no esquema: `nome` obrigatório e único
  (`COLLATE NOCASE`), tipo restrito aos oito valores e `CHECK` de autorrelação
  (RF004-RN003, RF004-RN005, RF004-RN006, RF004-RN007)
- [x] 1.4 Garantir relação única por par com `UNIQUE(origem_id, destino_id)` e
  gravação por `ON CONFLICT ... DO UPDATE` (RF004-RN008)
- [x] 1.5 Testar que um banco na v1 (do RF003) migra para a v2 sem perder dados
  (RF004-CA020)

## 2. Módulo de domínio no back-end

- [x] 2.1 Criar `src-tauri/src/personagem.rs` com a estrutura do personagem e
  as operações de listar (com busca por nome), obter e salvar
  (RF004-CA001, RF004-CA006, RF004-CA019)
- [x] 2.2 Implementar a validação de Nome obrigatório e a mensagem de conflito
  de nome repetido, traduzindo os erros do banco em texto útil (RF004-RN003,
  RF004-RN005)
- [x] 2.3 Implementar as operações de relação: listar os personagens para a
  modal (excluindo o próprio), listar as relações do personagem e salvar/
  atualizar a relação com tipo validado (RF004-RN006, RF004-RN007,
  RF004-RN008)
- [x] 2.4 Implementar a associação de retrato: validar que é imagem de **até
  4 MB**, copiar o arquivo para `<app_data_dir>/retratos/` e gravar o caminho
  no personagem (RF004-RN002, RF004-CA016, RF004-CA017, RF004-CA018)
- [x] 2.5 Recusar arquivo acima de 4 MB ou de formato não suportado com
  mensagem útil, sem travar a aplicação (RF004-CA018)

## 3. Comandos Tauri

- [x] 3.1 Expor `listar_personagens`, `obter_personagem` e `salvar_personagem`
  em `lib.rs`, registrando-os no `invoke_handler` (RF004-CA021)
- [x] 3.2 Expor `associar_retrato`, `listar_personagens_para_relacao` e
  `salvar_relacao`, também registrados no `invoke_handler` (RF004-CA014,
  RF004-CA021)
- [x] 3.3 Garantir respostas `Result<T, String>` com mensagens úteis, sem
  derrubar a aplicação (RF004-CA021)

## 4. Tela principal de Personagens

- [x] 4.1 Criar `src/componentes/TelaPersonagens.jsx` com a listagem dos
  personagens em **cards** e o botão de novo personagem, conforme o protótipo
  (RF004-TL001, RF004-CA004, RF004-CA005)
- [x] 4.2 Implementar a **alternância entre cards e lista** (RF004-CA004)
- [x] 4.3 Ligar a **busca por nome** da barra geral ao filtro da lista,
  ignorando maiúsculas/minúsculas (RF004-CA006)
- [x] 4.4 Abrir a tela de detalhe ao clicar no card ou no nome (RF004-CA007)
- [x] 4.5 Exibir o card de Vínculos com Livros vazio no card do personagem e o
  campo **Filtrar por livro** sem opções (RF004-CA009, RF004-CA010)
- [x] 4.6 Apontar a tela Personagens de `paginas.js` para o novo componente
  (deixando de ser tela vazia)

## 5. Tela de detalhe do personagem

- [x] 5.1 Criar `src/componentes/TelaPersonagem.jsx` com o formulário dos campos
  do RF004 e o botão Salvar (RF004-TL002, RF004-CA008)
- [x] 5.2 Exibir o retrato com preview e o seletor de arquivo, com espaço
  reservado quando não houver imagem (RF004-CA016)
- [x] 5.3 Desabilitar retrato e relação enquanto o personagem não estiver salvo,
  habilitando após o primeiro Salvar (RF004-RN001, RF004-RN002, RF004-CA015)
- [x] 5.4 Exibir a seção **Curva de Arco em cada livro** sem gráfico e o card de
  Vínculos sem dados, conforme o protótipo (RF004-CA009)
- [x] 5.5 Exibir o painel **Relações Globais** com as relações do personagem e o
  botão Gerenciar Relações (RF004-CA011)
- [x] 5.6 Usar a tela de detalhe vazia também para a criação de um novo
  personagem (RF004-CA005)

## 6. Modal de Relações

- [x] 6.1 Criar `src/componentes/ModalRelacoes.jsx` abrindo como janela modal a
  partir de Gerenciar Relações (RF004-TL003, RF004-CA012)
- [x] 6.2 Listar os personagens com miniatura (quando houver), nome e o seletor
  com os oito tipos de relação (RF004-CA013)
- [x] 6.3 Incluir um **campo de busca** na modal para filtrar personagens pelo
  nome (RF004-CA014)
- [x] 6.4 Salvar a relação escolhida e refleti-la no painel de Relações Globais
  (RF004-CA014)
- [x] 6.5 Impedir a autorrelação e a duplicidade de par, atualizando a relação
  existente (RF004-RN007, RF004-RN008)

## 7. Estilos e tema

- [x] 7.1 Adicionar os estilos dos componentes de personagem apoiados nos tokens
  de tema já existentes, sem cores fixas (RF004-CA023)
- [x] 7.2 Conferir as telas nos três temas (Blade Byte, Old Tower e Tundra)
  (RF004-CA023)

## 8. Testes automatizados

- [x] 8.1 Teste de criação de personagem apenas com o Nome (RF004-CA002,
  RF004-CA023)
- [x] 8.2 Teste de leitura e atualização do personagem (RF004-CA008,
  RF004-CA023)
- [x] 8.3 Teste de nome obrigatório e de nome repetido recusado (RF004-RN003,
  RF004-RN005, RF004-CA003, RF004-CA023)
- [x] 8.4 Teste de gravação de relação, tipo inválido, autorrelação e par
  duplicado (RF004-RN006, RF004-RN007, RF004-RN008, RF004-CA023)
- [x] 8.5 Manter os testes do RF003 passando, sem regressão

## 9. Validação final

- [x] 9.1 `cargo test --manifest-path src-tauri/Cargo.toml --lib` passa
- [x] 9.2 `npm run build` conclui sem erros
- [x] 9.3 `npm run tauri dev`: cadastrar, buscar, editar, associar retrato e
  gerenciar relações funcionam nas telas (RF004-CA001 a RF004-CA018)
- [x] 9.4 Criar/atualizar `scripts/verificar-rf004.mjs` cobrindo a lista, a
  busca, o detalhe, a modal de relações e a busca na modal (RF004-CA004,
  RF004-CA006, RF004-CA007, RF004-CA012, RF004-CA014)
- [x] 9.5 Rodar `verificar-rf002.mjs` e `verificar-rf003.mjs` sem regressão
  (RF004-CA024)
- [x] 9.6 Conferir que os dados de personagens e relações persistem após fechar
  e reabrir a aplicação (RF004-CA017, RF004-CA019)
- [x] 9.7 `npm run tauri build` gera o executável para Windows
- [x] 9.8 `openspec validate rf004-personagens` e marcar as tarefas conforme
  concluídas
