## Context

O formulário de **Dados do Livro** mantém `form.genero_principal` e
`form.subgeneros`. A implementação inicial, ao trocar o gênero, filtrava
`form.subgeneros` e descartava os valores incompatíveis. Como a lista exibida é
derivada do gênero atual, voltar ao gênero original não recuperava os valores
salvos.

## Goals / Non-Goals

**Goals:**

- Preservar a seleção de subgêneros de cada gênero enquanto o formulário não é
  salvo nem descartado.
- Garantir que os subgêneros salvos reapareçam marcados ao voltar ao gênero.
- Continuar gravando apenas os subgêneros do gênero atual.

**Non-Goals:**

- Alterar o esquema, as listas ou os comandos do back-end.
- Permitir gravar subgêneros de dois gêneros ao mesmo tempo.
- Criar novos campos ou abas.

## Decisions

**D1 — Mapa de seleções por gênero.** `DadosLivro` mantém
`selecoesPorGenero: { [genero]: string[] }`, inicializado com
`{ [livro.genero_principal]: livro.subgeneros }`. Trocar o gênero salva a
seleção atual no mapa e carrega a seleção do novo gênero. Voltar ao gênero
original devolve exatamente os valores anteriores, inclusive os salvos.
Alternativa descartada: reconstruir os salvos apenas quando o gênero volta ao
valor de `ultimoSalvo` — não preservaria seleções pendentes feitas antes da
troca.

**D2 — A gravação continua sendo do gênero atual.** `form.subgeneros` recebe
somente a lista do gênero ativo; o back-end e o `CHECK` da v8 continuam
validando a relação gênero → subgênero. O mapa é estado de interface e não vai
para o banco.

**D3 — Salvar e Descartar reinicializam o mapa.** Depois de salvar, o mapa
passa a conter apenas o gênero e os subgêneros relidos do banco. **Descartar**
faz o mesmo com `ultimoSalvo`, eliminando seleções pendentes de outros gêneros.

## Risks / Trade-offs

- **Mapa em memória pode divergir do formulário** → `form.subgeneros` e
  `selecoesPorGenero[genero]` são atualizados juntos no mesmo manipulador.
- **Após salvar um gênero, as seleções dos outros gêneros somem** → é o
  comportamento correto: somente o gênero salvo é persistido; os demais eram
  rascunho.

## Migration Plan

Sem migração de banco. A mudança é somente de estado no front-end; um build
anterior continua funcionando com o mesmo esquema v8.

## Open Questions

Nenhuma.
