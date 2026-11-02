## Context

O RF015 entregou o painel do capítulo em uma única rolagem: os campos do
capítulo e o quadro de personagens do arco ficam na mesma sequência. Os ajustes
anteriores acrescentaram o **Motivo do Tipo** e o **Motivo do Evento**, e o
painel ficou longo. O banco está na v16; este ajuste não toca no esquema nem nos
comandos.

## Goals / Non-Goals

**Goals:**

- Separar os dados do capítulo dos personagens do arco em duas abas, sem perder
  a edição pendente ao trocar de aba.
- Reduzir **Motivo do Tipo** e **Meta** para três linhas de texto.
- Explicar **Evento** e **Tipo de Evento** com o mesmo padrão de ajuda do
  **Tipo**, sem alterar as listas fechadas nem a gravação.

**Non-Goals:**

- Alterar o mapa Evento → Tipo de Evento, os valores aceitos ou o `CHECK` do
  banco.
- Criar migração, comando, tabela ou campo novo.
- Reorganizar o quadro de status, o cabeçalho do painel ou os demais campos.
- Levantar a associação livro–mundo.

## Decisions

**D1 — Reusar `PainelAbas` dentro do painel do capítulo.** O componente já
existe para o Tab Panel do livro (RF011-TL004) e usa `.booktabs`. O painel passa
a manter `abaAtiva` local (`dados` por padrão) e renderiza as duas abas dentro do
`.panel__body`; a navegação e o painel recebem um modificador
`.chapterpanel .booktabs__nav` / `.chapterpanel .booktabs__panel` para não somar
o padding de 18 px ao padding que o painel já tem. Alternativa descartada:
criar um segundo componente de abas — duplicaria o comportamento e os estilos.

**D2 — O estado do formulário continua no `PainelCapitulo`.** Só o conteúdo
renderizado troca de aba; `form`, personagens, aviso e erro continuam no mesmo
componente. Assim a troca de aba não desmonta os campos nem perde o que foi
digitado (mesmo princípio do RF013). O **Salvar** fica no `.panel__head`, fora
das abas, e grava os dados e os personagens na mesma chamada de
`salvarCapitulo`.

**D3 — Aba 1 até o Resumo; aba 2 com os personagens.** A aba **Dados do
Capítulo** contém o `.formgrid` inteiro, do **Número** ao **Resumo**. A aba
**Personagens do Capítulo** contém o bloco `.chapterchar` (adicionar, lista,
Evento, Tipo de Evento, Motivo do Evento e Remover). O contador de personagens
fica no cabeçalho do bloco, como hoje, e não muda a ordem dos campos.

**D4 — Três linhas com `.textarea--short` e `rows={3}`.** O design system já
tem `.textarea--short` (84 px, cerca de três linhas de 13 px com `line-height:
1.6`, incluindo padding). **Motivo do Tipo** e **Meta** trocam
`.textarea--medium` por `.textarea--short` e recebem `rows={3}` para o
navegador calcular a altura inicial coerente. Não altere `.textarea--medium`:
ela continua servindo às abas narrativas do livro. Alternativa descartada:
criar `.textarea--three` — seria uma quarta altura para o mesmo resultado de 84
px.

**D5 — Ajudas de Evento e Tipo de Evento com o markup do Tipo.** O painel extrai
um pequeno componente local de ajuda (`worldform__label` + `button.help` +
`div.help__popup`, como o **Tipo** e o Nível Tecnológico do Mundo) e o usa nos
três rótulos. As legendas são texto fixo no componente, com um parágrafo por
conceito:

- **Evento:** **Ponto de Ligação** (acontecimento positivo de Ascensão ou
  negativo de Declínio que leva ao Ponto de Virada) e **Ponto de Virada**
  (**Apogeu** transforma positivamente, com exemplos; **Queda** arrasa o
  personagem, com exemplos).
- **Tipo de Evento:** **Ascensão** e **Declínio** como os acontecimentos do
  Ponto de Ligação; **Apogeu** e **Queda** com os exemplos do Ponto de Virada;
  **Neutro** não altera o arco.

O popup usa `role="tooltip"`, aparece por hover e por foco (CSS `.help`) e
precisa ficar acima do card do personagem (`z-index` e `overflow: visible` na
linha), porque a coluna de Evento é estreita. Nenhuma legenda altera o valor
selecionado.

**D6 — Verificação em dois níveis.** Não há teste Rust novo: o back-end não
muda. O `verificar-rf015.mjs` passa a conferir as duas abas, o conteúdo de cada
uma, a troca de aba preservando um valor digitado, as alturas de **Motivo do
Tipo** e **Meta** (menores que 140 px) e a presença das duas ajudas com os
termos Ponto de Ligação, Ponto de Virada, Ascensão, Declínio, Apogeu e Queda. A
regressão cobre `verificar-rf011.mjs` e `verificar-rf016.mjs`.

## Risks / Trade-offs

- **Duas abas escondem os personagens** → o contador no título da aba e o
  **Salvar** comum deixam claro que o capítulo inteiro é gravado de uma vez.
- **Troca de aba com edição pendente** → como o `form` não desmonta, o risco é
  apenas visual; o teste E2E fixa a regra.
- **Textos de três linhas rolam internamente** → é o comportamento pedido; o
  **Resumo** longo continua disponível para textos maiores.
- **Popup em coluna estreita** → o CSS precisa garantir que ele não seja
  cortado; o verificador mede a visibilidade depois do hover.

## Migration Plan

1. `PainelCapitulo.jsx`: estado `abaAtiva`, `PainelAbas` com as duas abas,
   conteúdo separado e componente local de ajuda.
2. `livros.css`: ajustes de padding das abas dentro do painel, `.textarea--short`
   nos dois campos e posicionamento das ajudas.
3. `scripts/verificar-rf015.mjs`: novas asserções.
4. Rodar `npm run build`, `npm run verificar:rust` (regressão) e os
   verificadores; nenhum banco é migrado.

## Open Questions

Nenhuma.
