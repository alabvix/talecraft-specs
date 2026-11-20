# Design — RF019 cômodos e portas em Prédio/Casa

## Contexto

O RF019 posiciona localidades como marcadores de tamanho fixo e oferece
**Polígono** e **Ligação** em todas as escalas. Em **Prédio/Casa**, a planta
baixa é só um fundo: o escritor não consegue representar os cômodos nem as
passagens. A localidade continua sendo a fonte da verdade (nome, tipo, imagem e
hierarquia vêm do RF018); o mapa ganha apenas geometria e portas.

## Decisões

### D1 — Migração v21 aditiva

- `mapa_localidade` ganha `largura` e `altura` (`REAL NOT NULL DEFAULT 120`).
  Bancos v20 abrem com quadrados de 120 × 120 e nenhuma posição é perdida.
- Nova `mapa_porta (id, mapa_id, localidade_id, lado, posicao, largura)`:
  - `lado` com `CHECK` em **norte**, **sul**, **leste** e **oeste**;
  - `posicao` de **0 a 1** (fração do lado) para a porta acompanhar o
    redimensionamento sem recálculo;
  - `largura` com `CHECK > 0`;
  - FKs para `mapa` e `localidade`, com cascata.
- O salvar continua **substituindo as listas filhas** na mesma transação. As
  portas são apagadas antes das posições e inseridas depois delas.

### D2 — Cômodo no lugar do marcador

`LocalidadeNoMapa` ganha `largura` e `altura` com `serde(default)` para não
quebrar payloads antigos. O centro continua em `x/y`; o retângulo é desenhado de
`x - largura/2` a `x + largura/2`. Em escalas que não são **Prédio/Casa** os
campos existem, mas o marcador de 36 px continua sendo usado — a mudança é só
dessa escala (RF019-TL012).

### D3 — Porta presa à parede

A porta pertence a um cômodo e a um lado. A posição é uma **fração 0..1** do
lado, e a largura é dada em unidades lógicas. O desenho usa um sistema local
(parede no eixo x, interior no +y) e um `transform` por lado; o vão usa a cor do
fundo e a folha/arco usam as linhas do tema. No PDF, o vão é branco. Mover ou
redimensionar o cômodo reposiciona a porta sem tocar nos dados dela; apagar o
cômodo apaga as portas dele.

### D4 — Interação por ponteiro

O editor reusa os eventos de ponteiro já usados para arrastar marcadores. O
arraste do corpo move o cômodo; as **oito alças** (cantos e lados) redimensionam
com mínimo de **40** e ficam inteiras no plano. O histórico registra **um passo**
por arraste (o `aoIniciarArrasto` é chamado apenas no primeiro movimento). A
ferramenta **Porta** encontra a parede mais próxima do clique (até 16 unidades) e
cria a porta; arrastar a porta selecionada atualiza a fração ao longo do lado.

### D5 — Ferramentas por escala

`ferramentasMapa` é derivado de `mapa.tipo`: **Prédio/Casa** mostra
**Selecionar/Mover** e **Porta**; as demais escalas continuam com
**Polígono** e **Ligação**. Polígonos e ligações legados de um mapa de
**Prédio/Casa** continuam renderizados, selecionáveis e apagáveis, mas não podem
ser criados.

### D6 — Renderizador compartilhado

O `MapaCanvas` é o mesmo do editor, do livro e do PDF. Cômodos, nomes centrais e
portas são desenhados nele; as telas de leitura não recebem toolbar nem
callbacks, então já herdam a nova representação. O nome é quebrado em até duas
linhas, com reticências e o nome completo no `<title>`.

### D7 — Validação no domínio

`salvar_mapa` recusa (`ComodoMapaInvalido` e `PortaMapaInvalida`):

- cômodo menor que 40 ou retângulo que passa do plano em **Prédio/Casa**;
- porta com lado fora da lista, posição fora de 0..1, largura maior que a parede
  ou cômodo que não está no mapa;
- porta em mapa que não é **Prédio/Casa**.

Trocar o tipo para fora de **Prédio/Casa** mostra aviso na modal e remove as
portas ao salvar, evitando dado invisível.

### D8 — Listas fechadas

`listas_mapa` passa a devolver os **lados de porta**, a largura/altura padrão do
cômodo e a largura padrão da porta. O front-end não duplica os valores; o
`CHECK` do banco é o backstop, como nas demais listas do RF019.

### D9 — Fundo de Prédio/Casa é grade fixa

A planta baixa decorativa do RF019 competia com os cômodos desenhados pelo
escritor. Em **Prédio/Casa**, o `PlantaMapa` deixa de renderizar paredes e o
`MapaCanvas` usa o mesmo padrão de **grade** dos fundos decorativos, sempre,
independente do campo `fundo` gravado. O seletor de **Fundo** continua escondido
e o cabeçalho mostra o selo **Grade**. **Cidade** e **Bairro** mantêm as plantas
próprias.
