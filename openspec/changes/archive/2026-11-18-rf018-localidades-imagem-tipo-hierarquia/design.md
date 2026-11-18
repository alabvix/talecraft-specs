# Design — RF018 Localidades: imagem, tipo e hierarquia

## Contexto

A aba **Localidades** do RF008 é uma tabela paginada com Nome, Descrição e
História. O RF018 acrescenta imagem, tipo e uma relação de contenção
auto-referenciada (`pai_id`), que precisa de árvore na interface, validação de
ciclos no domínio e caminho completo nos capítulos.

## Decisões

### D1 - Migrações v18 e v19 em `localidade`

```sql
ALTER TABLE localidade ADD COLUMN tipo TEXT NOT NULL DEFAULT 'Não definido'
    CHECK (tipo IN (... 49 valores + 'Não definido'));
ALTER TABLE localidade ADD COLUMN imagem TEXT;
ALTER TABLE localidade ADD COLUMN pai_id INTEGER REFERENCES localidade(id);
CREATE INDEX IF NOT EXISTS idx_localidade_pai ON localidade(pai_id);
```

Passo **aditivo** (v18): não recria a tabela (não há `CHECK` existente a
mudar) e as linhas antigas ganham o valor padrão. O `CHECK` do SQLite é o
backstop do tipo. Como a v18 já rodou no banco de desenvolvimento, a **v19**
recria `localidade` para ampliar a lista aos 49 tipos, copiando as linhas e
preservando os ids; as migrações rodam com `foreign_keys = OFF` e religam a
integridade no fim (ver `abrir_e_migrar`).

### D2 — Lista fechada no back-end

`TIPOS_LOCALIDADE` (49 valores em ordem alfabética) e
`TIPO_LOCALIDADE_PADRAO = "Não definido"` vivem
em `banco.rs`, como as demais listas fechadas. O comando `listar_tipos_localidade`
alimenta o seletor; o front-end não duplica a lista. O domínio normaliza vazio
para **Não definido** e recusa valor fora da lista.

### D3 — A variante `Localidade` ganha três campos

`EntradaMundo::Localidade` passa a ter `tipo: String` (`serde(default)`),
`imagem: Option<String>` (`serde(default)`) e `pai_id: Option<i64>`
(`serde(default)`). As consultas `sql_obter`, `sql_listar_completo`, o `mapear` e
o `salvar_entrada` são atualizados. O payload antigo continua válido porque os
campos têm default; `listar_entradas` (tabela) não muda para as outras
categorias.

### D4 — Validação de tipo e de ciclo no domínio

- Tipo vazio → **Não definido**; fora da lista → `TipoLocalidadeInvalido`.
- Pai: precisa existir, ser do **mesmo mundo** e não ser a própria localidade
  (`LocalidadeNaoEncontrada`/`CicloLocalidade`). A subida pela cadeia de pais usa
  um `HashSet` de visitados; se encontrar a localidade editada, é ciclo.
- A validação roda antes do `UPDATE`/`INSERT`, dentro da transação de
  `salvar_entrada`, então nada é gravado quando falha.

### D5 — Listagem da árvore

Novo comando `listar_localidades_mundo(mundo_id)` devolve uma **lista plana**
(`LocalidadeArvore { id, nome, tipo, imagem, pai_id, total_filhos }`) ordenada
pelo nome (ordenação no Rust com `to_lowercase`, tratando acentos). O front-end
monta a árvore com uma função pura: raízes = `pai_id` nulo, filhos agrupados por
pai e ordenados. A lista plana também alimenta o seletor de pai da modal, que
exclui a própria localidade e os seus descendentes.

**Paginação (ajuste do RF018):** como a árvore precisa do conjunto completo para
ser montada e uma subárvore não pode ser cortada, a paginação é feita no
front-end sobre as **raízes**, agrupando subárvores inteiras até **20 linhas por
página**. Se uma única subárvore tiver mais de 20 linhas, ela fica sozinha na sua
página. A página atual e o total de localidades aparecem no rodapé
(**Anterior**/**Próxima**).

### D6 — Imagem com o fluxo do mundo

`PASTA_LOCALIDADES = "localidades"` e `associar_imagem_localidade` usam o
`imagem.rs` compartilhado (JPG/PNG/WEBP, 4 MB), exigem a localidade salva e
gravam o caminho relativo (`localidades/<id>.<ext>`). O front-end reusa
`urlImagem` para a miniatura e a prévia; a escolha do arquivo usa o diálogo
nativo do `tauri-plugin-dialog`, como no retrato e no mundo.

### D7 — Front-end

- `ArvoreLocalidades.jsx`: carrega a lista plana, monta a árvore, controla
  expandir/recolher (abre expandida), mostra miniatura/nome/tipo/contador e as
  ações **Nova Localidade** e **Editar** (esta escondida com `somenteCriacao`).
- `ModalEntradaMundo` ganha, quando `entidade.tipo === "localidade"`, o bloco de
  **Tipo**, **Fica dentro de** e **Imagem** (prévia + **Enviar/Trocar imagem**).
  A imagem escolhida é associada depois do `salvar_entrada`, quando o id existe.
- `TelaMundo` usa a árvore na aba Localidades e mantém a tabela nas demais.
- `TelaWorldbuildingLivro` usa a árvore na categoria Localidades em modo de
  consulta, com criação.

### D8 — Caminho no cenário do capítulo

`LocalidadeResumo` (em `livro_mundo.rs`) ganha `caminho: String`, calculado no
back-end a partir da lista plana (subida pela cadeia de pais, separador ` › `).
`PainelCapitulo` usa `caminho` como rótulo da opção; o valor continua sendo o id.
`listar_localidades_do_livro` não muda de contrato além do campo novo.

### D9 — PDF do mundo

O documento do mundo (RF007/RF008) passa a mostrar o **Tipo** de cada localidade
na seção **Localidades**; a hierarquia não cria seções nem muda a ordem. O
agregado `documento_mundo` não muda de contrato (o campo já vem no enum).

### D10 — Validação

- Testes Rust: migração v17 → v18 e v18 → v19, tipo inválido/padrão, pai de outro mundo,
  auto-contenção, ciclo de dois e três níveis, mover subárvore, listagem com
  `totalFilhos`, imagem (extensão/tamanho), caminho no cenário e PDF com tipo.
- `scripts/verificar-rf018.mjs` no app real (CDP + banco isolado): árvore,
  expandir/recolher, tipo, imagem, pai, ciclo, cenário com caminho, seção do
  livro e estado vazio.
- Ajustes em `verificar-rf008.mjs` (Localidades não é mais tabela) e
  `verificar-rf017.mjs`/`verificar-rf015.mjs` se o rótulo do cenário mudar.

## Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Ciclo criado por edição | Subida pela cadeia no domínio, dentro da transação, com teste de 3 níveis |
| Pai de outro mundo | Consulta do `mundo_id` do pai antes da gravação |
| Árvore com acentos fora de ordem | Ordenação no Rust com `to_lowercase`, como nas buscas |
| Paginação x árvore | Localidades usam `listar_localidades_mundo` sem paginação; as outras categorias mantêm `listar_entradas_mundo` |
| Imagem antes de salvar | A imagem só é associada depois do `salvar_entrada`; a modal guarda o caminho escolhido e atualiza a prévia |
