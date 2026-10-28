## Context

A ficha global (`TelaPersonagem`) exibe o painel retrátil **Vínculos com Livros**
e o quadro **Curva de arco em cada livro** desde o RF004/RF006, mas os dois eram
preenchidos com zero e texto de "requisito posterior". O RF014 já grava os
vínculos em `livro_personagem`; falta ler o outro lado — do personagem para os
livros — e mostrar o papel e a contagem provisória de capítulos.

## Goals / Non-Goals

**Goals:**

- Listar, na ficha global, os livros vinculados com **Livro**, **Papel** e
  **Total de Capítulos em que aparece** (0, pendente).
- Mostrar cada livro vinculado no quadro **Curva de arco em cada livro** com
  **sem dados por enquanto**.
- Manter o painel retrátil do RF006 e os estados vazios.
- Cobrir o comportamento no verificador do RF014.

**Non-Goals:**

- Calcular o total de capítulos ou desenhar a curva (sem cadastro de Capítulos).
- Habilitar o **Filtrar por livro** da tela principal.
- Editar ou remover o vínculo pela ficha global.

## Decisions

**D1 — Comando de leitura dedicado.** `listar_livros_do_personagem(personagemId)`
devolve `LivroDoPersonagem { livroId, livroTitulo, papel, totalCapitulos }`,
lendo `livro_personagem` + `livro`. A ficha não conhece SQL e o comando segue o
padrão dos demais (`Resultado<T>`, erro `PersonagemNaoEncontrado`). Alternativa
descartada: reutilizar `listar_livros` e cruzar no front-end — traria a
biblioteca inteira e misturaria responsabilidades.

**D2 — `totalCapitulos` já no contrato, sempre 0.** O campo existe desde agora
para a UI e para o verificador; o domínio o preenche com **0** até a tabela de
capítulos existir. Quando os capítulos chegarem, só essa consulta muda — o
front-end e o contrato continuam iguais. Alternativa descartada: omitir o campo
e calcular no futuro — exigiria mudar o contrato e a tela de novo.

**D3 — Lista de livros em ordem alfabética.** A ordenação usa `to_lowercase` do
Rust, como a busca de livros, para tratar acentos. A lista é pequena; não há
paginação na ficha.

**D4 — O painel continua o do RF006.** O estado inicial segue a regra: sem
vínculos, retraído; com vínculos, expandido. Um efeito sincroniza o estado
quando a lista carrega, sem impedir o escritor de retrair/expandir manualmente
depois.

**D5 — Curva apenas nominal.** O quadro lista o nome de cada livro e o aviso
"Sem dados por enquanto."; a explicação no rodapé diz que a curva será calculada
a partir dos capítulos. Nada de gráfico fictício.

**D6 — Verificação no RF014.** O `verificar-rf014.mjs` cria os vínculos, abre a
ficha global de um personagem, confere o painel expandido com as colunas e a
curva com os nomes; depois volta para Meus Livros para as métricas. O estado sem
vínculo continua coberto pelo caminho de criação anterior.

## Risks / Trade-offs

- **Ficha desatualizada** → a lista é carregada ao abrir a ficha; como o vínculo
  é editado no livro, reabrir a ficha reflete o estado atual.
- **Capítulos futuros** → o campo `totalCapitulos` já está no contrato; quando a
  tabela existir, a consulta passa a contar sem mudar a UI.
- **Painel retrátil** → com vínculos ele abre expandido; se o escritor retrair,
  a escolha permanece até a lista mudar de tamanho.

## Migration Plan

1. Adicionar `LivroDoPersonagem` e `listar_livros_do_personagem` no domínio.
2. Registrar o comando (49 no total), sem migração.
3. Consumir na `TelaPersonagem` e ajustar os estados vazios.
4. Nenhum passo de banco é editado.

## Open Questions

Nenhuma. O total de capítulos e a curva ficam para o requisito de Capítulos.
