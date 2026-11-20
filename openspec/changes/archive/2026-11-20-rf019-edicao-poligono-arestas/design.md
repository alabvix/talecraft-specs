# Design — edição de polígonos pelas arestas

## Contexto

A forma do mapa é uma string `x,y x,y ...` em `mapa_forma.pontos`. O requerimento
promete mover a forma, mas o `MapaCanvas` só tem `onClick` para selecionar. O
objetivo é editar a geometria sem criar tabela, vértice em tabela ou comando novo.

## Decisões

### D1 — Editar a string de pontos

`MapaCanvas` lê os vértices, aplica o deslocamento e serializa de volta com
`Math.round`, preso a 0..1000 × 0..700. O `MapaEditor` ganha
`alterarPontosForma(indice, pontos)`, que atualiza o documento **sem** registrar
histórico. O histórico fica no `aoIniciarArrasto`, chamado apenas no primeiro
movimento — o mesmo padrão do arraste de marcadores e cômodos.

### D2 — Aresta move só a própria aresta

Cada aresta tem uma linha de hit transparente de 14 unidades e, quando a forma
está selecionada, uma alça no ponto médio. No `pointerdown`, guardo os vértices
originais, a aresta, o ponteiro inicial e a **normal unitária** da aresta. O
deslocamento é a projeção do movimento nessa normal; os dois vértices da aresta
recebem o mesmo delta e os demais não mudam. O delta é limitado para os dois
vértices continuarem no plano. A direção da normal pode ser usada nos dois
sentidos — o sinal vem da projeção.

### D2b — Nó move um único vértice

Além da alça no meio da aresta, a forma selecionada mostra um nó em cada vértice.
O arraste usa a posição do ponteiro presa ao plano e altera somente aquele
vértice; o histórico e o `alterarPontosForma` são os mesmos das arestas. Os nós
ficam acima das linhas de aresta, então o alvo do vértice tem prioridade.

### D3 — Interior move o polígono inteiro

Arrastar o `polygon` (fora das linhas de aresta) inicia o movimento de todos os
vértices. O deslocamento é limitado pelo **retângulo envolvente** original, para
nenhum vértice sair do plano, e aplicado igualmente a todos.

### D4 — Interação e conflito de alvos

As linhas de aresta são renderizadas depois do polígono e antes do rótulo, com
`pointer-events: stroke`; o preenchimento continua recebendo o clique do
interior. As alças de aresta só aparecem com a forma selecionada e a ferramenta
**Selecionar/Mover**. `stopPropagation` impede o pan do fundo. O livro e o PDF
não recebem as linhas/alças porque não são interativos.

### D5 — Sem domínio novo

`validar_pontos` já exige 3+ vértices dentro do plano. Nenhuma migração, comando
ou campo é criado; `comparavel` já inclui `pontos`, então o indicador de alteração
pendente e o **Salvar** funcionam sem alteração.

### D6 — Teste do comportamento

O E2E desenha o triângulo, arrasta a primeira aresta e confere que só os dois
primeiros vértices mudaram; depois arrasta o interior e confere que os três
vértices tiveram o mesmo delta. Salvar e reabrir comparam a string final.
