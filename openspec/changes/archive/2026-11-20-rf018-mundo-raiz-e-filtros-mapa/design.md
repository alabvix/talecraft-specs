# Design — mundo como raiz e filtros por escala

## Contexto

`mundo_global` e `localidade` são cadastros separados; `localidade.pai_id`
permite hierarquia, mas as raízes são as linhas sem pai. Os mapas de Mundo e
Região aceitavam os 49 tipos, ao contrário de Cidade, Bairro e Prédio/Casa.

## Decisões

### D1 — Raiz física na tabela `localidade`

Cada mundo ganha uma linha `tipo = 'Mundo'`, `raiz = 1`, `pai_id = NULL`, com o
nome do mundo. O tipo **Mundo** é interno: não entra em `TIPOS_LOCALIDADE`
(49 selecionáveis) e `validar_tipo_localidade` o recusa para criação comum. O
`CHECK` da migração v22 inclui o valor, porque a raiz precisa ser gravada.

### D2 — Migração v22 recria a tabela

O SQLite não altera `CHECK`, então a v22 recria `localidade` com:
- o `CHECK` ampliado para `Mundo`;
- `raiz INTEGER NOT NULL DEFAULT 0 CHECK (raiz IN (0,1))`;
- índice único parcial `(mundo_id) WHERE raiz = 1`.

Depois da cópia, insere uma raiz por mundo com o nome do mundo e atualiza as
localidades `raiz = 0 AND pai_id IS NULL` para apontar para ela. As FKs ficam
desligadas durante o `to_latest`, como na v19. A **v23** é uma correção: um banco
que passou por uma recriação anterior pode ter ficado com
`capitulo.cenario_localidade_id` apontando para `localidade_antiga`; a v23 recria
`capitulo` com a FK correta, preservando as linhas e recriando os índices.

### D3 — Sincronização pelo domínio do Mundo

`mundo::salvar` atualiza a raiz na mesma transação do mundo: no cadastro novo,
insere; no renomear, atualiza o nome. Se a raiz não existir (banco antigo), é
criada. O domínio das localidades nunca altera `raiz`.

### D4 — Pai padrão e bloqueio da raiz

`listar_localidades_mundo` devolve `raiz`. `salvar_entrada`:
- interpreta `pai_id` vazio/zero como a raiz do mundo;
- recusa editar a raiz com `LocalidadeRaizNaoEditavel`;
- mantém o tipo **Mundo** fora da validação de usuário, devolvendo
  `TipoLocalidadeInvalido`;
- valida ciclo e mundo como antes.

A interface remove **Nenhuma (raiz)** do seletor e inicia novas localidades na
raiz (ou na âncora do mapa). A raiz é marcada no front por `raiz: true`, aparece
sem **Editar** e usa o ícone de globo.

### D5 — Paginação da árvore

Com uma raiz obrigatória, paginar por raiz deixaria a árvore inteira numa página.
A raiz fica **fixa no topo** e a paginação de 20 em 20 passa a agrupar os
**filhos da raiz** (sem cortar subárvores). Sem raiz, o comportamento antigo
continua como fallback.

### D6 — Filtros por escala

`mapa.rs` ganha:
- `TIPOS_LOCALIDADE_MUNDO`: 22 tipos macro/geográficos e assentamentos;
- `TIPOS_LOCALIDADE_REGIAO`: os 49 menos Cômodo, Quarto, Sala e Salão.

`tipos_da_escala` devolve lista para as cinco escalas e `listas_mapa` expõe as
cinco. O painel, o **Nova localidade** e `salvar_mapa` filtram/rejeitam; a raiz é
removida do painel porque não é um lugar do mapa.

### D7 — Raiz fora do conteúdo

A raiz não é uma “entrada” do mundo: `listar`/`listar_todas` de
`entradas_mundo` filtram `raiz = 0`, assim como as contagens de
`livros`/`mundo do livro` e a lista de localidades do capítulo. O caminho do
cenário continua subindo a hierarquia e passa a incluir o nome do mundo
(`Kepler › Porto › …`).

### D8 — Sem alteração de comandos

Nenhum comando novo: `listar_localidades_mundo` ganha o campo `raiz`; `salvar_mapa`
continua com as validações e passa a ter listas para todas as escalas.
