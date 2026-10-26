# Tarefas — RF006: painel retrátil, exportação da ficha e cor dos botões

## 1. Cor do rótulo dos botões (character-library)

- [x] 1.1 Corrigir o override do tema **Tundra** em `src/talecraft.css`: `[data-theme="tundra"] .btn--primary` com `color: #fff` e o `.icon` correspondente, alinhado ao token do tema ("botão primário: texto branco") e ao comentário da regra (RF006-RN004, RF006-CA016)
- [x] 1.2 Fazer a mesma correção em `prototype/css/talecraft.css`, mantendo os dois design systems iguais (RF006-RN004)
- [x] 1.3 Conferir que os botões Salvar (`TelaPersonagem.jsx`) e Novo personagem (`TelaPersonagens.jsx`) usam `btn--primary` e herdam o rótulo branco nos três temas, sem `color` fixa no componente (RF006-RN004, RF006-CA016)
- [x] 1.4 Conferir o contraste real nos três temas no app (Blade Byte, Old Tower e Tundra) e não apenas a presença da regra CSS — medido pelo verificador: 4.99:1 no Tundra (RF006-CA016)

## 2. Painel Vínculos com livros retrátil (character-library)

- [x] 2.1 Acrescentar o estado `vinculosRetraidos` em `TelaPersonagem.jsx`, inicializado como **retraído quando não há vínculos** (RF006-RN002, RF006-CA002)
- [x] 2.2 Trocar o ícone do cabeçalho por um `<button>` com `aria-expanded` e `aria-controls`, acionável por clique, Enter e Espaço, com rótulo acessível do estado (RF006-RN001, RF006-CA001, RF006-CA005)
- [x] 2.3 Retrair o painel escondendo apenas o corpo (`panel__body`), mantendo o cabeçalho com ícone, título e contador visíveis (RF006-RN001, RF006-CA002)
- [x] 2.4 Garantir que a alternância não recarrega a tela nem perde dados do formulário (RF006-CA004)
- [x] 2.5 Deixar a contagem de vínculos num único ponto, pronto para ser trocado pelo comando real quando o requisito de vínculos chegar (design D6)
- [x] 2.6 Ajustar `prototype/personagem.html` com o painel retrátil e os estilos necessários (regra do projeto: ajuste visual vai nos dois)
- [x] 2.7 Conferir que o painel expandido continua exibindo o estado vazio atual, sem regressão do RF004 (RF004-CA009)

## 3. Componente da ficha do personagem (character-sheet-export)

- [x] 3.1 Criar `src/componentes/FichaPersonagem.jsx` recebendo a ficha e a URL do retrato, com o design system (RF006-TL002, design D2)
- [x] 3.2 Montar a lista de campos **preenchidos** antes de renderizar, omitindo os vazios (RF006-RN006, RF006-CA009) — a montagem é no back-end (`ficha.rs`), o front-end só desenha
- [x] 3.3 Incluir a imagem quando houver retrato e o espaço reservado com iniciais quando não houver, sem falhar (RF006-RN007, RF006-CA010, RF006-CA011)
- [x] 3.4 Garantir que a ficha **não** inclui relações nem os livros do personagem (RF006-RN005, RF006-CA012) — a estrutura `FichaPersonagem` não tem onde guardá-los
- [x] 3.5 Reusar `urlRetrato` + `convertFileSrc` para a imagem, sem caminho novo (design D5, RF004-CA017)

## 4. Exportação da ficha em PDF (character-sheet-export)

- [x] 4.1 Implementar o comando Tauri de exportação renderizando a ficha numa **janela oculta** e gerando o PDF pelo WebView2 (`PrintToPdf` via `with_webview`), sem biblioteca de PDF (RF006-RN011, design D1, D2) — módulo `src-tauri/src/pdf.rs`
- [x] 4.2 Registrar o comando no `invoke_handler` e acrescentar a função correspondente em `src/personagensApi.js` (RF004-CA021) — `exportar_ficha` + `montar_ficha` + `sinalizar_ficha_pronta`
- [x] 4.3 Usar o diálogo nativo de **salvamento** (`save()` do `tauri-plugin-dialog`) com filtro `pdf` e nome sugerido a partir do personagem (RF006-RN010, RF006-CA013)
- [x] 4.4 Tratar o **cancelamento** do diálogo: sem arquivo gravado e sem alteração na tela (RF006-RN008, RF006-CA014)
- [x] 4.5 Acrescentar o botão **Exportar Ficha** ao lado do Salvar, **desabilitado** enquanto o personagem não estiver salvo (RF006-RN009, RF006-CA006, RF006-CA015)
- [x] 4.6 Feedback ao escritor: mensagem de sucesso com o caminho e mensagem útil em caso de falha, sem travar (RF006-RN008)
- [x] 4.7 Confirmar que nenhuma dependência de PDF foi acrescentada ao `package.json` ou ao `Cargo.toml` (RF006-CA017) — conferido pelo verificador
- [x] 4.8 Corrigir o **laço de diálogos** reportado no teste do usuário: o manipulador local do botão em `TelaPersonagem.jsx` chamava `exportarFicha`, **sombreando** o import da API e recursando — cada volta abria o diálogo de novo, infinitamente (RF006-CA013, RF006-CA015). O manipulador passou a se chamar `exportar`, seguindo o padrão do arquivo (`salvar` chama `salvarPersonagem`)

## 5. Protótipo (referência visual)

- [x] 5.1 Acrescentar o botão **Exportar Ficha** em `prototype/personagem.html`, ao lado do Salvar (RF006-TL001, RF006-CA006)
- [x] 5.2 Acrescentar os estilos necessários em `prototype/css/talecraft.css`, usando só tokens de tema (RF006-RN004)
- [x] 5.3 Validar o protótipo: chaves do CSS balanceadas, `<div>` balanceado, links e imagens existentes, 0 caracteres corrompidos

## 6. Testes automatizados (Rust)

- [x] 6.1 Teste da montagem da ficha: campos preenchidos entram e campos vazios são omitidos (RF006-RN006, RF006-CA008, RF006-CA009)
- [x] 6.2 Teste da ficha sem retrato: o documento é montado sem imagem e sem erro (RF006-RN007, RF006-CA011)
- [x] 6.3 Teste do escopo da ficha: o documento não contém relações nem livros (RF006-RN005, RF006-CA012)
- [x] 6.4 Rodar `cargo test --manifest-path src-tauri/Cargo.toml --lib` e conferir que os testes do RF001–RF005 continuam passando (RF006-RN012, RF006-CA018) — **31 testes, 0 falhas** (26 do RF001–RF005 + 5 do RF006)

## 7. Verificação no app real

- [x] 7.1 Criar `scripts/verificar-rf006.mjs` dirigindo o app Tauri de verdade (WebView2 + CDP), contra o diretório de dados isolado por `TALECRAFT_DADOS` (RF006-CA019)
- [x] 7.2 Verificações do painel: sem vínculos abre retraído, o ícone alterna, o estado é anunciado por `aria-expanded`, o **desenho do ícone combina com a ação** (seta para cima recolhe, para baixo abre) e o formulário não perde dados (RF006-CA001 a CA005)
- [x] 7.3 Verificações da exportação: botão ao lado do Salvar, desabilitado sem personagem salvo, geração do PDF no destino e cancelamento limpo (RF006-CA006, CA007, CA013 a CA015)
- [x] 7.4 Verificação do conteúdo do PDF gerado: dados globais presentes, campos vazios ausentes, **imagem embutida** (o arquivo cresce e o PDF traz `DCTDecode`) e ausência de dados de livro (RF006-CA008 a CA012)
- [x] 7.5 Verificação do rótulo branco dos botões nos três temas, incluindo o Tundra (RF006-CA016)
- [x] 7.6 Verificação de ausência de dependência de PDF no `package.json` e no `Cargo.toml` (RF006-CA017)
- [x] 7.7 Rodar os verificadores dos requisitos anteriores sem regressão: `verificar-rf002.mjs` (18/18), `verificar-rf003.mjs` (3/3), `verificar-rf004.mjs` (20/20) e `verificar-rf005.mjs` (29/29) + persistência (4/4) (RF006-RN012, RF006-CA018)
- [x] 7.8 Verificação do **fluxo real do botão** (botão -> diálogo -> comando -> PDF): o `invoke` do Tauri é congelado, então o diálogo nativo é substituído por um `fetch` interceptado, que devolve a resposta do comando `plugin:dialog|save`. O verificador confere que o diálogo foi pedido **uma única vez** e que o PDF foi gravado — com o defeito do sombreamento, a contagem chegou a 675.892 (RF006-CA007, RF006-CA013, RF006-CA015)

## 8. Validação final e documentação

- [x] 8.1 Rodar `npm run build` sem erro (RF006-CA018)
- [x] 8.2 Rodar `npm run tauri build` e conferir a data do `.exe` release antes de pedir o teste (RF006-CA018)
- [x] 8.3 Rodar `openspec validate --all` sem falhas
- [x] 8.4 Conferir o encoding (BOM ausente e 0 caracteres corrompidos) em todos os arquivos tocados
- [x] 8.5 Atualizar o `AGENTS.md`: estado do RF006, decisões do PDF pelo WebView2, armadilhas novas e a correção do contraste do Tundra
- [x] 8.6 Aguardar o teste do usuário antes de arquivar o change (regra do projeto)

## 9. Exportar o que está na tela e árvore familiar no PDF

### 9.1 Dados da tela no PDF (character-library)

- [x] 9.1.1 Adicionar `mesmosDados` em `personagensApi.js` para detectar alterações pendentes (RF006-RN013, RF006-CA021)
- [x] 9.1.2 Acompanhar o último estado salvo em `TelaPersonagem.jsx` (`ultimoSalvo`), atualizado no carregamento, no salvar e na associação de retrato
- [x] 9.1.3 Em `exportar()`, gravar as alterações pendentes antes de abrir o diálogo, usando o id gravado para a exportação; mensagem diferenciada quando houve salvamento (RF006-RN013, RF006-CA021)
- [x] 9.1.4 Se o salvamento pendente falhar (por exemplo, Nome vazio), cancelar a exportação com mensagem útil e sem PDF

### 9.2 Árvore familiar no PDF (character-sheet-export)

- [x] 9.2.1 Acrescentar `familia: Option<ArvoreFamiliar>` a `FichaPersonagem` em `ficha.rs`, preenchida em `montar_por_id` a partir de `personagem::arvore_familiar`, ou `None` quando só há o próprio personagem (RF006-RN005, RF006-CA020)
- [x] 9.2.2 Adicionar `PartialEq` a `PapelNo`, `NoArvore`, `LigacaoTipo`, `Ligacao` e `ArvoreFamiliar` em `personagem.rs`, para `FichaPersonagem` continuar derivando `PartialEq`
- [x] 9.2.3 Atualizar `TelaFicha.jsx`: pré-carregar o retrato do personagem e os retratos da árvore familiar com `new Image()` antes de sinalizar "pronto" (RF006-CA010, RF006-CA020)
- [x] 9.2.4 Passar `diretorioDados` para `FichaPersonagem.jsx`, que desenha a seção Família com `ArvoreFamiliar` (RF006-CA020)
- [x] 9.2.5 Sobrescrever as cores da árvore com valores fixos dentro de `.ficha` em `talecraft.css`, e acrescentar `.ficha__familia` / `.ficha__secao` (RF006-RN005)
- [x] 9.2.6 Incluir a quebra `break-inside: avoid` para a seção Família na impressão

### 9.3 Testes e documentação

- [x] 9.3.1 Teste Rust: personagem sem relações familiares → `ficha.familia` é `None` (RF006-CA020)
- [x] 9.3.2 Teste Rust: relação que não é familiar não gera a árvore; relação familiar gera a árvore com os dois personagens (RF006-CA012, RF006-CA020)
- [x] 9.3.3 Atualizar `ficha_contem_apenas_dados_globais` → `ficha_nao_contem_livros_nem_curva_de_arco`, mantendo a verificação de livros/vínculos/arco (RF006-CA012)
- [x] 9.3.4 Atualizar `documents/talecraft.md` (RN005, CA012, RN013, CA020, CA021) e o delta `character-sheet-export/spec.md`
- [x] 9.3.5 Atualizar `AGENTS.md` (estado do RF006 e armadilhas novas)
- [x] 9.3.6 Aguardar o teste do usuário antes de arquivar o change (regra do projeto)
