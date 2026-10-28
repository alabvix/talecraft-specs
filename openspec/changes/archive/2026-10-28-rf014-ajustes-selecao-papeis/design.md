## Context

O RF014 entregou a modal de seleção como uma lista vertical com todos os
personagens globais e um `CHECK` de **Papel** com seis valores. Com muitos
personagens, a lista não escala; e o escritor pediu sete funções narrativas
adicionais (**Oponente**, **Confidente**, **Figurante**, **Coprotagonista**,
**Mentor**, **Herói** e **Vilão**). O banco está na v12.

## Goals / Non-Goals

**Goals:**

- Buscar personagens pelo nome na modal de seleção, sem diferenciar maiúsculas.
- Exibir o resultado em uma **grade paginada**, mantendo a seleção entre páginas
  e buscas.
- Ampliar o **Papel** para treze valores + **Não definido**, com migração
  aditiva que preserva os vínculos.
- Cobrir busca, paginação, seleção entre páginas e os novos papéis na
  verificação E2E e nos testes Rust.

**Non-Goals:**

- Buscar por outros campos, filtrar por papel/raça ou ordenar manualmente.
- Alterar a listagem do elenco do livro (cards/lista) ou criar desvincular.
- Reescrever a modal de detalhe além das novas opções de **Papel**.

## Decisions

**D1 — Migração v13 recria `livro_personagem`.** O SQLite não altera `CHECK`
com `ALTER TABLE`, então a v13 cria `livro_personagem_novo` com a lista ampliada,
copia todas as linhas, remove a tabela antiga, renomeia a nova e recria o índice
por `personagem_id`. Nenhum passo da v1 à v12 é editado. Alternativa descartada:
validar o papel só no domínio — o banco deixaria de ser a garantia final.

**D2 — Novos papéis acrescentados ao fim, antes de Não definido.** A ordem fica
**Protagonista**, **Antagonista**, **Coadjuvante**, **Aliado**, **Falso
Antagonista**, **Falso Protagonista**, **Oponente**, **Confidente**,
**Figurante**, **Coprotagonista**, **Mentor**, **Herói**, **Vilão** e
**Não definido**. Manter os seis primeiros na posição já documentada evita
mexer no que o escritor já conhece; o valor vazio continua por último.

**D3 — Busca e paginação no domínio.** `listar_personagens_para_livro` passa a
receber `filtro_nome`, `pagina` e `por_pagina` (padrão 12) e devolve
`ListaPersonagensParaLivro { itens, total, pagina, porPagina }`. O filtro usa
`to_lowercase()` do Rust — o mesmo critério da busca de livros, que trata
maiúsculas e acentos corretamente e evita o `NOCASE` limitado a ASCII do
SQLite. A lista global é pequena; filtrar em memória e fatiar a página é
suficiente e mantém o total exato. Alternativa descartada: `LIKE` + `LIMIT`
direto no SQL — a contagem e a busca divergiriam em nomes com acento.

**D4 — Seleção independe da página.** O React guarda os `personagemId` marcados
em um array próprio. Trocar de página ou de busca não limpa a seleção; o rodapé
mostra quantos estão marcados. A busca volta para a página 1. Personagens já
associados continuam com a caixa desabilitada e nunca entram na seleção.

**D5 — Grade com paginação visível.** A grade usa
`grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))` e o rodapé tem
**Anterior** / **Página X de Y** / **Próxima**, com o total de personagens. Com
a biblioteca vazia, o texto de cadastro continua; com busca sem resultado, a
mensagem é específica.

**D6 — Verificação em dois níveis.** Os testes Rust cobrem a migração v12 → v13,
a busca, a paginação e os papéis novos. O `verificar-rf014.mjs` cria personagens
suficientes para duas páginas, exercita a busca, marca personagens em páginas
diferentes, associa, confere a lista de 14 papéis e grava um vínculo com um papel
novo.

## Risks / Trade-offs

- **Seleção "escondida" pela busca/página** → o rodapé mostra a contagem de
  selecionados; a associação envia todos os ids marcados.
- **Papel novo exige migração** → bancos v12 são recriados na v13; o teste de
  migração confirma que os vínculos e textos sobrevivem.
- **Busca em memória** → a biblioteca global é pequena; se crescer muito, um
  índice textual pode substituir o filtro.
- **Duplicidade fora da página** → o relatório do domínio continua por id; se o
  nome não estiver na página atual, a mensagem informa que havia personagens já
  associados sem listar todos os nomes.

## Migration Plan

1. Migração **v13** aditiva em `banco/migracoes.rs`, depois da v12.
2. `PAPEIS_PERSONAGEM_LIVRO` passa a 14 valores; o domínio valida pela lista.
3. `listar_personagens_para_livro` ganha busca e paginação; o comando muda a
   assinatura, sem criar comando novo.
4. Front-end da modal e estilos; atualização do verificador.
5. Bancos v12 migram na subida; um build anterior ignora a v13 e continua lendo
   os mesmos vínculos.

## Open Questions

Nenhuma. A ordem dos novos papéis e o tamanho de página (12) foram decididos
nesta mudança.
