# Design — ícone na árvore de Localidades

## Contexto

O RF018 exibe a árvore de Localidades com um quadradinho de 34 × 34 antes do
nome. Com imagem, aparece a miniatura; sem imagem, o quadrado ficava vazio. O
RF019 já tem o `IconeLocalidade`, que resolve o glifo pela **família do Tipo da
Localidade** e a variante pelo **Tipo do Mundo**.

## Decisões

### D1 — Reusar o `IconeLocalidade`

Nada novo de desenho: a árvore importa o componente do RF019 e passa
`tipo={no.tipo}`, `mundo={tipoMundo}` e uma classe própria (`arvoreloc__icone`,
24 px). A imagem cadastrada continua tendo prioridade; sem imagem, o ícone ocupa
o mesmo quadradinho.

### D2 — Tipo do Mundo desce por prop

`ArvoreLocalidades` recebe `tipoMundo` opcional. `TelaMundo` passa
`form.tipo_mundo` e `TelaWorldbuildingLivro` passa `mundo.tipoMundo`, que já vem
de `listar_mundos_do_livro`. Sem a prop, o componente cai no estilo Medieval,
como o mapa.

### D3 — Tipos sem glifo mantêm o quadrado vazio

`IconeLocalidade` devolve `null` para tipos sem família e **Não definido**; o
quadradinho continua vazio, sem inventar símbolo. A árvore não altera o
comportamento de imagem, nome, tipo, contador ou paginação.

### D4 — Sem domínio novo

A informação já vem em `listar_localidades_mundo` (`tipo` e `imagem`) e o tipo
do mundo já está na tela. Nenhuma migração, comando ou campo é criado.
