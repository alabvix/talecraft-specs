## Context

O RF001–RF006 entregaram a casca do aplicativo (Tauri 2 + React), a
infraestrutura do SQLite (esquema **v3**) e os domínios de **personagens**,
**relações familiares** e **exportação da ficha em PDF**. O menu
**Worldbuilding** ainda abre `TelaVazia` (`src/App.jsx`, `src/paginas.js`).

O RF007 é o primeiro requisito de Worldbuilding: cria o **Mundo global** e os
seus dados básicos, com listagem, detalhe/criação, imagem, painel de vínculos
vazio e exportação em PDF. As entradas do mundo e a associação com livros ficam
para requisitos posteriores.

O padrão de domínio já está provado pelo RF004 e deve ser repetido: migração
aditiva em `banco.rs`, módulo de domínio em `src-tauri/src/`, comandos Tauri
registrados em `lib.rs`, módulo de API no front-end, telas React reusando o
design system e um verificador que dirige o app Tauri real com banco isolado
(`TALECRAFT_DADOS`).

## Goals / Non-Goals

**Goals:**

- Criar as tabelas do Mundo e dos seus gêneros pela **migração v4**, sem tocar
  nas tabelas dos requisitos anteriores (RF007-RN023, RF007-CA030).
- Entregar a Tela Principal de Mundos (cards/lista, busca por nome, filtros por
  Tipo e Gênero, filtro por livro sem opções) e a Tela de Detalhe/Criação com
  Voltar, Exportar Mundo e Salvar (RF007-TL001, RF007-TL002).
- Entregar a imagem do mundo em **16:9**, com as mesmas regras do retrato de
  personagem (JPG/PNG/WEBP até 4 MB), copiada para o diretório de dados.
- Entregar a exportação do Mundo em PDF com os dados básicos e a imagem,
  reusando o `PrintToPdf` do WebView2 do RF006 e **sem biblioteca nova**.
- Repetir as garantias do domínio: Nome obrigatório e único, listas fechadas no
  banco e no domínio, gêneros múltiplos, persistência e testes automatizados.

**Non-Goals:**

- Entradas do mundo (Localidades, Raças e povos, Artefatos, Armas, Eventos,
  Sistema de energia, Sistema de Magia e Mapa Geral) — RF007-RN022.
- Associação entre mundo e livro, dados por livro e vínculos reais
  (RF007-RN022, RF007-CA024).
- Exclusão de mundos — RF007-RN021.
- Botão "Exportar mundos" do protótipo — RF007-CA013.
- Edição da imagem no PDF, galeria de imagens ou recorte escolhido pelo
  usuário — apenas uma imagem, recortada por CSS em 16:9.

## Decisions

### D1 — Migração v4 aditiva com `mundo_global` e `mundo_genero`

Novo passo `M::up` em `banco.rs`, depois da v3, sem editar nenhum passo
publicado:

```sql
CREATE TABLE IF NOT EXISTS mundo_global (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    nome              TEXT NOT NULL COLLATE NOCASE UNIQUE,
    tipo_mundo        TEXT CHECK (tipo_mundo IN (
                          'Medieval', 'Moderno', 'Futurista', 'Antigo')),
    nivel_tecnologico TEXT CHECK (nivel_tecnologico IN (
                          'Tipo-0 Sub-Planetário', 'Tipo-1 Planetário',
                          'Tipo-2 Estelar', 'Tipo-3 Galáctico',
                          'Tipo-4 Universal')),
    descricao         TEXT NOT NULL DEFAULT '',
    imagem            TEXT,
    criado_em         TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS mundo_genero (
    mundo_id INTEGER NOT NULL REFERENCES mundo_global(id),
    genero   TEXT NOT NULL CHECK (genero IN (
                 'Alta Fantasia', 'Fantasia Sombria', 'Cyberpunk',
                 'SteamPunk', 'Urbano', 'Sci-Fi', 'SolarPunk',
                 'Sobrenatural', 'Gótico')),
    PRIMARY KEY (mundo_id, genero)
);
```

O `CHECK` das colunas opcionais aceita `NULL`; a ausência de Tipo, Nível ou
Descrição é gravada como `NULL` (Tipo/Nível) ou `''` (Descrição), sem violar as
listas. A chave composta de `mundo_genero` impede gênero repetido e a chave
estrangeira impede gênero órfão.

**Alternativa descartada:** uma coluna `generos` com texto separado por vírgula.
Ela dificultaria o filtro por gênero (RF007-CA010), permitiria valor livre e não
teria integridade. A tabela de gêneros é o mesmo modelo do protótipo e permite
`EXISTS` no filtro.

### D2 — Listas fechadas no back-end e no esquema

As constantes ficam em `mundo.rs` — `TIPOS_MUNDO` (4), `NIVEIS_TECNOLOGICOS`
(5) e `GENEROS_MUNDO` (9) — e um teste Rust confere que cada constante é aceita
pelo `CHECK` do banco, como já é feito com `TIPOS_RELACAO`. O front-end **não
duplica** as listas: um comando `listas_mundo` devolve as três listas prontas
para os controles, no mesmo espírito de `listar_tipos_relacao` (RF007-RN004,
RF007-RN005, RF007-RN007).

**Alternativa descartada:** manter as listas também em `mundosApi.js`. Duas
fontes divergem na primeira alteração; o seletor deve ler do back-end.

### D3 — Estrutura `Mundo` e filtros em SQL

`Mundo` segue o formato de `Personagem` (serde em `snake_case`, campos
opcionais com `#[serde(default)]`):

```text
id: Option<i64>, nome: String, tipo_mundo: Option<String>,
nivel_tecnologico: Option<String>, descricao: String,
imagem: Option<String>, generos: Vec<String>
```

`listar(conexao, filtro_nome, tipo, genero)` monta uma consulta com parâmetros
opcionais:

- nome: `nome LIKE '%' || ?1 || '%' COLLATE NOCASE`;
- tipo: `(?2 IS NULL OR tipo_mundo = ?2)`;
- gênero: `EXISTS (SELECT 1 FROM mundo_genero g WHERE g.mundo_id = m.id AND
  g.genero = ?3)`;
- ordem: `ORDER BY nome COLLATE NOCASE ASC` (RF007-RN020).

Os gêneros de cada mundo são carregados numa segunda consulta por id. Para a
escala de uma biblioteca pessoal, o N+1 é irrelevante e evita `GROUP_CONCAT`
com separador que possa aparecer no nome de um gênero. A busca e os filtros
combinam com `AND` (RF007-CA008 a RF007-CA011).

**Alternativa descartada:** filtrar em JavaScript depois de listar tudo. Não
escala e tira do back-end a regra que o requisito pede (RF007-CA031).

### D4 — Gravação transacional e nome único

`salvar(conexao: &mut Connection, &Mundo)`:

1. valida `nome` não vazio (com `trim`) e as listas fechadas;
2. inicia uma transação;
3. `INSERT` (id ausente) ou `UPDATE` (id presente) em `mundo_global`;
4. apaga os gêneros do mundo e reinsere os selecionados, sem duplicar;
5. confirma a transação e devolve o mundo com o `id`.

O nome repetido é detectado pela restrição `UNIQUE COLLATE NOCASE` e convertido
em mensagem útil ("Já existe um mundo com esse nome."), em vez de vazar o erro
do SQLite (RF007-RN002, RF007-CA007). Gravar os gêneros na mesma transação
garante que um mundo nunca fique com metade dos gêneros (RF007-CA018).

### D5 — Imagem: regra compartilhada em `imagem.rs`

O RF007 precisa das mesmas regras do retrato (formatos, 4 MB, cópia para o
diretório de dados e caminho relativo). Para não duplicar a validação, extrair
para `src-tauri/src/imagem.rs`:

```text
copiar_imagem(origem, diretorio_dados, pasta, id, rotulo) -> Result<String, String>
```

A função valida extensão (`jpg`, `jpeg`, `png`, `webp`), tamanho
(`LIMITE_IMAGEM_BYTES = 4 * 1024 * 1024`), cria a pasta, copia para
`<pasta>/<id>.<ext>` e devolve o caminho relativo. O `rotulo` entra nas
mensagens ("retrato" ou "imagem do mundo"). `personagem::associar_retrato` passa
a chamar essa função — os testes existentes continuam valendo, pois as
mensagens mantêm "Formato" e "4 MB".

`mundo::associar_imagem` exige o mundo salvo, chama o helper com a pasta
`mundos` e grava o caminho relativo em `mundo_global.imagem`. O front-end monta
a URL com `convertFileSrc(diretorioDados + "/" + caminho)`; o protocolo de asset
já está habilitado desde o RF004.

**Alternativa descartada:** copiar o bloco de validação para `mundo.rs`. Duas
cópias divergem (limite, formatos, mensagem) e uma delas ficaria sem teste.
**Risco aceito:** trocar a imagem deixa o arquivo antigo órfão em `mundos/`,
como já acontece com retratos; limpeza fica para um requisito de mídia.

### D6 — Exportação em PDF reusando o WebView2, sem generalizar o RF006

`exportar_mundo(app, estado, prontas, id, caminho_destino)` espelha
`exportar_ficha`:

1. confere que o mundo existe (senão, mensagem útil);
2. registra um canal no estado `FichasProntas` com rótulo único
   `mundo-<id>-<tempo>`;
3. abre uma janela **oculta** `index.html#mundo=<id>` (794×1123, A4 a 96 dpi);
4. espera o aviso `sinalizar_ficha_pronta` (o comando já é genérico por rótulo);
5. chama `pdf::gravar_pdf`, fecha a janela e limpa o canal.

O documento é desenhado por `DocumentoMundo.jsx` e `TelaDocumentoMundo.jsx`,
com cores fixas de impressão (como a ficha do RF006), preload da imagem via
`new Image()` e aviso de "pronto" só depois de a imagem carregar. Reusa o
design system e **não** acrescenta biblioteca de PDF (RF007-RN019).

**Alternativa descartada:** generalizar `exportar_ficha` para receber um tipo de
documento. Mexeria no fluxo do RF006 já testado (janela, canal, marcador) por um
ganho pequeno. Quando houver um terceiro documento, a generalização vira um
change próprio, com a verificação do RF006 como rede de segurança.

### D7 — Front-end: API própria, navegação e alterações pendentes

- `src/mundosApi.js`: `listarMundos(filtros)`, `obterMundo(id)`,
  `salvarMundo(mundo)`, `associarImagem(id, caminho)`, `listasMundo()`,
  `exportarMundo(id, destino)`, `urlImagem(mundo, diretorio)` e
  `mesmosDados(a, b)` para detectar edições não salvas.
- `src/nomeArquivo.js`: extrai o `nomeDeArquivo()` hoje em
  `personagensApi.js`, usado pelo diálogo de salvar dos dois domínios. Os testes
  do RF006 continuam cobrindo o comportamento.
- `src/App.jsx`: novo estado `mundoAberto` (id, `"novo"` ou `null`), análogo a
  `personagemAberto`; a busca superior passa a valer para `worldbuilding`
  também. O modo documento reconhece `#mundo=<id>` **antes** de `#ficha=<id>`.
- `src/componentes/TelaMundos.jsx`: cards/lista, alternância por radio nativo
  (padrão do RF004), busca, filtros de Tipo e Gênero, filtro de livro
  desabilitado com "Nenhum livro cadastrado", botão "Novo mundo" e card "Novo
  mundo" (`libcard--add`).
- `src/componentes/TelaMundo.jsx`: formulário dos dados básicos; seletor de
  Tipo; seletor de Nível Tecnológico com ajuda `?`; gêneros como caixas de
  seleção; Descrição; imagem 16:9; painel **Vínculos com livros** retrátil
  (mesmo padrão `aria-expanded` do RF006, contador zero); botões Voltar,
  Exportar Mundo e Salvar. Exportar Mundo fica desabilitado sem `id`.
- A exportação grava as alterações pendentes (`mesmosDados`) antes de abrir o
  diálogo, como no RF006 (RF007-CA028).

### D8 — Ajuda do Nível Tecnológico sem JavaScript

O rótulo do campo ganha um `<button type="button" class="help">?</button>` com
`aria-label` e o quadro flutuante irmão com `role="tooltip"`. O quadro aparece
com `.help:hover + .help__popup` e `.help:focus + .help__popup`, e o botão é
focável por Tab. Sem `onMouseOver`/`onFocus`: a regra fica no CSS e funciona
por teclado e por mouse (RF007-CA017).

### D9 — Estilos em `src/mundos.css`

Novo arquivo só com o que é específico de mundos (`.worldcard`, `.world-hero`,
`.worldform`), reusando tokens e classes existentes (`.libcard`, `.panel`,
`.toggle`, `.btn`, `.field`). A imagem usa
`aspect-ratio: 16 / 9; object-fit: cover; object-position: center;`
(RF007-CA023). Nenhuma cor hexadecimal solta fora dos blocos de tema.

### D10 — Testes

- **Rust (domínio):** criar/ler/atualizar; Nome obrigatório e único sem
  diferenciar caixa; listas fechadas recusadas; múltiplos gêneros gravados e
  substituídos; filtros combinados; ordem alfabética; imagem copiada e recusada
  por formato/tamanho; migração v1/v2/v3 → v4 preservando personagens e
  relações.
- **Rust (esquema):** as constantes de Tipo, Nível e Gênero concordam com os
  `CHECK` (mesmo padrão de `TIPOS_RELACAO`).
- **Verificação viva:** `scripts/verificar-rf007.mjs` dirige o app Tauri real
  (WebView2 + CDP, banco isolado por `TALECRAFT_DADOS`) e cobre a listagem, a
  alternância cards/lista, a busca, os filtros, o detalhe, a gravação, a imagem
  carregada (`naturalWidth > 0`), o painel retrátil, o PDF com assinatura
  `%PDF` e o diálogo de exportação, além de regressão de tema/splash.

## Risks / Trade-offs

- **[Mundos sem vínculo real com livros]** → O painel existe, mas o corpo
  informa que a associação é de requisito posterior; o contador é um ponto único
  (`totalVinculos = 0`), como no RF006.
- **[N+1 ao carregar gêneros na listagem]** → Aceitável para uma biblioteca
  pessoal (dezenas de mundos). Se crescer, trocar por uma consulta única com
  agregação, mantendo o mesmo contrato.
- **[Imagem órfã ao trocar]** → O arquivo antigo permanece em `mundos/`; limpeza
  fica para requisito de mídia. O caminho gravado continua correto.
- **[Refatoração do retrato para `imagem.rs`]** → Pode alterar mensagens do
  RF004. Mitigação: manter os textos ("Formato de imagem não suportado...",
  "no máximo 4 MB") e rodar os testes e o `verificar-rf004.mjs`.
- **[Janela oculta de exportação]** → Se a imagem não carregar, o PDF sai sem
  ela. Mitigação: `TelaDocumentoMundo` pré-carrega a imagem e só sinaliza
  "pronto" no `onLoad`, com prazo de 30 s no back-end.
- **[Duas listas de gênero diferentes no repositório]** → O protótipo tem
  Romantasia/Terror; o RF007 fixa nove gêneros. O app usa a lista do requisito e
  o protótipo permanece como referência visual, sem ser alterado neste change.

## Migration Plan

1. Acrescentar o passo v4 em `banco.rs` (bancos existentes migram v3 → v4 na
   abertura; nenhum dado anterior é tocado).
2. Criar `imagem.rs` e ajustar `personagem::associar_retrato` para reusá-lo.
3. Criar `mundo.rs`, os comandos em `lib.rs` e o estado de exportação.
4. Criar `mundosApi.js`, `TelaMundos.jsx`, `TelaMundo.jsx`,
   `DocumentoMundo.jsx`, `TelaDocumentoMundo.jsx`, `mundos.css` e o modo
   `#mundo=`.
5. Ligar a página `worldbuilding` em `App.jsx`.
6. Rodar `cargo test`, `npm run build` e `verificar-rf007.mjs`; depois os
   verificadores anteriores para garantir ausência de regressão.

**Rollback:** remover o passo v4 não é necessário para desfazer a interface
(basta voltar o front-end). O banco antigo continua válido; as tabelas de mundos
ficam sem uso. Como a migração é aditiva, não há perda de dados dos requisitos
anteriores.

## Open Questions

Nenhuma pendente. As listas fechadas, o formato 16:9, o limite de 4 MB e o
escopo da exportação foram confirmados com o usuário antes da escrita do RF007.
