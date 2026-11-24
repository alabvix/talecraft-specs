## Contexto

O painel do capítulo (RF015) reúne em uma única aba os campos estruturais e os
campos de composição narrativa. O cenário do capítulo (RF017) é gravado em uma
coluna única e a interface só permite uma localidade. O banco está na **v23** e
a associação livro–mundo é N:N; a hierarquia de localidades já tem caminho
completo pelo RF018.

## Decisões

### D1 — Três abas no mesmo formulário

`PainelCapitulo` passa a listar **Dados do Capítulo**, **Dados Complementares** e
**Personagens do Capítulo**, nesta ordem. A nova aba contém **Foreshadowing**,
**Plot Twist**, **Cliffhanger**, **Punch** e **K.O**; a primeira perde esses
campos. O estado `form` e o `Salvar` continuam únicos, então trocar de aba
preserva edição pendente (RF015-RN014) e a aba volta para **Dados do Capítulo**
quando muda o capítulo. Os `id` dos campos são mantidos para os verificadores e
para o CSS.

### D2 — Migração v24 aditiva com tabela própria

A v24 cria `capitulo_cenario (capitulo_id, localidade_id, ordem)`, com chave
primária composta `(capitulo_id, localidade_id)`, FKs para `capitulo` e
`localidade` e índice por `localidade_id`. A migração copia cada
`capitulo.cenario_localidade_id` para a tabela nova com `ordem = 0`.

A coluna antiga **não é removida**: o SQLite não permite remover uma coluna que
participa de FK sem recriar a tabela, e a migração deve ser aditiva. Ela deixa de
ser a fonte da verdade — o domínio lê e grava somente `capitulo_cenario` e zera
a coluna antiga ao salvar o capítulo, para não haver valores divergentes.

### D3 — Lista de cenários no domínio

`Capitulo` troca `cenario_localidade_id`/`cenario_localidade_nome` por
`cenarios: Vec<LocalidadeResumo>`. O tipo já existe em `livro_mundo` e traz
`id`, `nome` e `caminho`; no payload de gravação só o `id` é considerado.

- `obter` carrega a lista por `capitulo_cenario`, ordenada por `ordem` e nome.
- `salvar` valida cada item: existência (`CenarioNaoEncontrado`), mundo
  associado (`CenarioForaDoLivro`) e ausência de repetição
  (`AssociacaoDuplicada`). Depois apaga e regrava a lista na mesma transação do
  capítulo e dos personagens.
- `criar` devolve a lista vazia.
- O caminho completo é montado por um helper público em `livro_mundo`, reusando
  a hierarquia do livro.

### D4 — Interface de adicionar e remover

O campo **Cenário Worldbuilding** mantém o select agrupado por mundo e o caminho
completo, mas ganha o botão **Adicionar** e uma lista dos selecionados, cada um
com **Remover**. O select mostra **Adicionar cenário…** e oculta as localidades
já escolhidas. Sem mundo associado, o select continua desabilitado com o aviso
**Nenhum mundo associado a este livro**. A ordem da lista é a ordem de inclusão
e vai para o banco.

### D5 — Remoção de mundo e contagem

`remover_mundo_do_livro` apaga todas as linhas de `capitulo_cenario` cujas
localidades pertencem ao mundo, na mesma transação da associação. A contagem
`capitulos_limpos` e o campo `capitulos_com_cenario` de `listar_mundos_do_livro`
passam a contar **capítulos distintos** pela tabela nova; um capítulo com
cenários em dois mundos conta nos dois até a remoção.

### D6 — Verificação

- Testes Rust de domínio, migração e remoção de mundo.
- `verificar-rf015.mjs` cobre as três abas, os campos complementares e a lista
  de cenários.
- `verificar-rf017.mjs` cobre adicionar/remover cenários e a limpeza por mundo.
- `verificar-rf018.mjs` passa a usar a lista no cenário com caminho.

### Alternativas descartadas

- **Guardar a lista em uma coluna de texto ou JSON:** perderia as FKs e a
  validação de mundo no banco.
- **Recriar `capitulo` para remover a coluna antiga:** repetiria o custo e o
  risco da v23 sem necessidade; a coluna legada não atrapalha.
- **Multi-select nativo:** não mostra o caminho com conforto nem permite remover
  um item sem Ctrl; o par select + lista é o padrão já usado em Personagens.
