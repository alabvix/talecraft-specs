## Context

O RF011 entregou as métricas de Meus Livros e a lista de subgêneros de Fantasia.
A primeira versão somava a biblioteca global de personagens e todas as entradas
de mundo, o que não corresponde ao painel de livros: Personagem e Mundo são
entidades globais separadas. A lista de Fantasia também ficou menor que a
necessidade do produto.

## Goals / Non-Goals

**Goals:**

- Fazer **Personagens** e **Entradas de worldbuilding** contarem somente o que
  está associado a livros.
- Exibir **0** nas duas métricas enquanto os vínculos não existirem.
- Ampliar Fantasia para doze subgêneros.
- Preservar bancos existentes com migração aditiva v8.

**Non-Goals:**

- Criar as tabelas de vínculo personagem–livro ou de associação livro–mundo.
- Criar capítulos ou alterar a métrica de capítulos.
- Alterar as listas de Ficção Científica e Terror.

## Decisions

**D1 — Métricas ligadas ao livro, não à biblioteca global.** `estatisticas()`
passa a devolver `personagens = 0`, `personagens_em_varios_livros = 0` e
`entradas_mundo = 0` até existirem as tabelas de vínculo. Alternativa
descartada: manter a contagem global e só trocar o rótulo — continuaria
mostrando números que não pertencem ao painel.

**D2 — Migração v8, não edição da v7.** A v7 já foi aplicada em bancos de teste
e possivelmente no banco do usuário. O SQLite não altera `CHECK` in-place, então
a v8 recria `livro_subgenero` com o `CHECK` ampliado, copia as linhas, derruba a
tabela antiga e renomeia a nova — o mesmo padrão do RF005 (v3).

**D3 — A lista de Fantasia é a única alterada.** `SUBGENEROS_FANTASIA` passa de
5 para 12 valores: entram Gótico, Baixa Fantasia, Grindark, Mitológica,
Histórica, Científica e Espada e Feitiçaria. `Gótico` e `Distopia` aparecem em
mais de um gênero, o que é permitido porque o `CHECK` é a união das listas e a
relação gênero → subgênero é validada no domínio.

**D4 — Nenhuma mudança de tela.** `TelaLivros` já renderiza as métricas
devolvidas pelo comando; o subtítulo também usa o mesmo número de personagens.
A lista de subgêneros já vem de `listas_livro`.

## Risks / Trade-offs

- **Métricas zeradas podem parecer defeito** → o rótulo continua **Personagens**
  e **Entradas de worldbuilding**, e a LCD do requisito explica que o vínculo
  pertence a requisito futuro. O painel de personagens compartilhados continua
  com estado vazio explícito.
- **Migração v8 recria a tabela** → roda em transação e copia as linhas; teste
  com banco v7 confirma a preservação.
- **Mais subgêneros alongam o formulário** → a seleção já usa chips com quebra de
  linha.

## Migration Plan

1. Aplicar a v8 na subida, criando `livro_subgenero_novo`, copiando as linhas,
   derrubando a antiga e renomeando.
2. Nenhum dado é apagado; o `CHECK` novo é superconjunto do antigo.
3. Rollback: um build anterior ignora a v8 e continua lendo os valores antigos.

## Open Questions

Nenhuma.
