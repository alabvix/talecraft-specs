## Why

O RF004 entregou o domínio de personagens com relações **direcionadas** (decisão
D4) e oito tipos, sem nenhum mecanismo de parentesco. Isso deixa duas lacunas no
uso real: cadastrar "Ofélia é filha de Esther" não faz Esther "saber" que tem uma
filha, e o escritor não tem nenhuma visão da **estrutura familiar** da história,
justamente o tipo de dado que o TaleCraft existe para organizar.

O RF005 fecha essas lacunas: torna **todas** as relações **bidirecionais**
(gravando o par espelhado automaticamente), acrescenta os tipos **Irmão/Irmã** e
**Aprendiz** e introduz o quadro **Família** com a árvore familiar do personagem.
É o primeiro requisito que **revoga** uma decisão anterior do projeto — o sentido
direcionado do RF004 — e por isso precisa ser explícito sobre a reversão.

## What Changes

- **Relações passam a ser bidirecionais (BREAKING).** Ao gravar A→B com um
  tipo, o sistema grava automaticamente B→A com o tipo espelhado. Revoga a
  decisão D4 do RF004, que definia relações direcionadas.
- **Tabela de espelho explícita.** Pares assimétricos: `Filho/Filha ⇄ Mãe/Pai` e
  `Mentor ⇄ Aprendiz`. Pares simétricos (espelham a si mesmos): `Rival`,
  `Inimigo`, `Aliado`, `Irmão/Irmã`, `Cônjuge` e `Namorado`.
- **Dois tipos novos na lista fechada.** `Irmão/Irmã` e `Aprendiz` somam-se aos
  oito do RF004, que passa a ter **dez** tipos (RF005-RN001).
- **Recusa de ciclo de ascendência.** Uma relação familiar que criaria ciclo
  (A filho de B e B filho de A) é recusada com mensagem útil (RF005-RN005).
- **Novo quadro Família.** Na tela de Detalhe de Personagem, **abaixo** do
  quadro de Relações Globais, desenha a árvore familiar em SVG a partir das
  relações Filho/Filha, Mãe/Pai, Irmão/Irmã e Cônjuge (RF005-TL002,
  RF005-RN006).
- **Árvore com linhagem completa.** Sobe por todos os ascendentes e desce por
  todos os descendentes; irmãos ficam lado a lado; o cônjuge aparece no mesmo
  nível, ligado por linha de união, com os filhos abaixo do casal
  (RF005-RN007 a RF005-RN009).
- **Nó "?" para ascendente ausente.** Irmãos declarados sem mãe/pai cadastrado
  recebem um nó "?" acima deles (RF005-RN007).
- **Migração aditiva v3.** O `CHECK` da v2 não aceita os tipos novos; a mudança
  entra como novo passo, sem recriar nem apagar dados (RF005-RN010).
- **Fora do escopo:** exclusão de personagens; vínculo personagem ↔ livro e arco
  por livro; gráficos de curva de arco; exportação; edição da árvore por
  arrastar-e-soltar; parentesco deduzido (irmandade só vale por declaração).

## Capabilities

### New Capabilities

- `family-tree`: árvore familiar do personagem — montagem a partir das relações
  familiares, navegação por toda a linhagem, irmãos lado a lado, cônjuge como
  parceiro no mesmo nível e nó "?" para ascendente ausente.

### Modified Capabilities

- `character-library`: as relações deixam de ser direcionadas e passam a ser
  bidirecionais; a lista de tipos vai de oito para dez (acrescenta Irmão/Irmã e
  Aprendiz); a gravação recusa ciclo de ascendência; o painel de relações e a
  modal refletem o par espelhado; a tela de detalhe ganha o quadro Família.
- `database-foundation`: novo passo de migração (v3) que amplia a lista fechada
  de tipos e acomoda a bidirecionalidade, sem recriar nem apagar dados.
- `rust-bridge`: novos comandos Tauri para o espelhamento e para a leitura da
  árvore familiar.

## Impact

- **Back-end Rust:** `src-tauri/src/banco.rs` (migração v3, `TIPOS_RELACAO` de 8
  para 10, `CHECK` do esquema); `src-tauri/src/personagem.rs` (tabela de espelho,
  gravação transacional do par, detecção de ciclo, leitura da árvore);
  `src-tauri/src/lib.rs` (comandos novos no `invoke_handler`).
- **Front-end React:** `src/personagensApi.js` (chamadas novas);
  `src/componentes/ModalRelacoes.jsx` (dez tipos); `src/componentes/TelaPersonagem.jsx`
  (quadro Família); novo componente de árvore; `src/personagens.css` (estilos da
  árvore, usando só tokens de tema).
- **Dados:** bancos existentes do RF004 são migrados para o esquema v3 sem perda.
  As relações já gravadas permanecem como estão — são **unilaterais** até serem
  regravadas, porque a bidirecionalidade vale para gravações novas.
- **Testes:** testes Rust do espelhamento (por tipo), da recusa de ciclo e da
  montagem da árvore; script de verificação `scripts/verificar-rf005.mjs` no app
  Tauri real, com banco isolado (`TALECRAFT_DADOS`).
- **Sem dependência nova.** A árvore é SVG inline, como os gráficos do protótipo.
