## 1. Banco de dados e migração

- [x] 1.1 Acrescentar a migração **v4** em `src-tauri/src/banco.rs`, depois da v3, criando `mundo_global` (nome único `COLLATE NOCASE`, `CHECK` de Tipo e Nível, descrição, imagem e `criado_em`) e `mundo_genero` (chave composta, `CHECK` dos nove gêneros e chave estrangeira para o mundo).
- [x] 1.2 Criar as constantes `TIPOS_MUNDO` (4), `NIVEIS_TECNOLOGICOS` (5), `GENEROS_MUNDO` (9), `LIMITE_IMAGEM_BYTES` e `PASTA_MUNDOS`, mantendo os valores idênticos aos `CHECK` da migração.
- [x] 1.3 Escrever testes de migração: banco v1/v2/v3 migra para v4 preservando personagens, retratos e relações; o esquema v4 aceita Tipo, Nível e Gêneros válidos e recusa valores fora das listas.
- [x] 1.4 Rodar `cargo test --manifest-path src-tauri/Cargo.toml --lib` e conferir que os testes novos e os anteriores passam.

## 2. Domínio Rust dos mundos

- [x] 2.1 Criar `src-tauri/src/imagem.rs` com `copiar_imagem(origem, diretorio_dados, pasta, id, rotulo)`, validando JPG/PNG/WEBP, limite de 4 MB, criação da pasta, cópia e caminho relativo.
- [x] 2.2 Ajustar `personagem::associar_retrato` para usar `imagem::copiar_imagem`, mantendo as mensagens que os testes do RF004 verificam ("Formato" e "4 MB").
- [x] 2.3 Criar `src-tauri/src/mundo.rs` com a estrutura `Mundo` (`id`, `nome`, `tipo_mundo`, `nivel_tecnologico`, `descricao`, `imagem`, `generos`) no mesmo formato serde de `Personagem`.
- [x] 2.4 Implementar `listar` com busca por nome (`LIKE ... COLLATE NOCASE`), filtros opcionais por Tipo e por Gênero (`EXISTS` em `mundo_genero`) combinados por `AND` e ordem alfabética sem diferenciar caixa.
- [x] 2.5 Implementar `obter` carregando os gêneros do mundo.
- [x] 2.6 Implementar `salvar` com validação de Nome obrigatório, listas fechadas e transação que grava o mundo e substitui os gêneros; converter nome repetido em mensagem "Já existe um mundo com esse nome.".
- [x] 2.7 Implementar `associar_imagem` exigindo mundo salvo, copiando para `mundos/` e gravando o caminho relativo.
- [x] 2.8 Implementar `listas_mundo` devolvendo as três listas fechadas para o front-end.
- [x] 2.9 Escrever testes do domínio: criar só com Nome; criar com todos os campos; atualizar; Nome vazio; Nome repetido sem diferenciar caixa; Tipo/Nível/Gênero inválidos; múltiplos gêneros e substituição; busca e filtros combinados; ordem alfabética; imagem válida, formato inválido e acima de 4 MB.

## 3. Comandos Tauri

- [x] 3.1 Declarar `mod imagem;` e `mod mundo;` em `src-tauri/src/lib.rs` e registrar os seis comandos novos: `listar_mundos`, `obter_mundo`, `salvar_mundo`, `associar_imagem_mundo`, `listas_mundo` e `exportar_mundo`.
- [x] 3.2 Implementar `listar_mundos`, `obter_mundo`, `salvar_mundo` e `listar_mundos` com `com_conexao`/`com_conexao_mut` e comentários citando o RF007.
- [x] 3.3 Implementar `associar_imagem_mundo` usando `diretorio_dados(&app)`, no mesmo padrão de `associar_retrato`.
- [x] 3.4 Registrar os comandos no `invoke_handler` e conferir que nenhum comando de exclusão de mundo é exposto.
- [x] 3.5 Compilar com `cargo build --manifest-path src-tauri/Cargo.toml` e corrigir eventuais avisos/erros.

## 4. API do front-end e navegação

- [x] 4.1 Criar `src/mundosApi.js` com `listarMundos`, `obterMundo`, `salvarMundo`, `associarImagem`, `listasMundo`, `exportarMundo`, `urlImagem` e `mesmosDados`.
- [x] 4.2 Extrair `nomeDeArquivo` para `src/nomeArquivo.js` e usá-lo em `personagensApi.js` e `mundosApi.js`, sem alterar o comportamento do RF006.
- [x] 4.3 Criar `src/mundoModo.js` para reconhecer o marcador `#mundo=<id>` e sinalizar o documento pronto pelo comando existente `sinalizar_ficha_pronta`.
- [x] 4.4 Em `src/App.jsx`, adicionar o estado `mundoAberto` (id, `"novo"` ou `null`), renderizar `TelaMundos`/`TelaMundo` na página `worldbuilding`, ativar a busca superior também nessa página e reconhecer `#mundo=<id>` antes de `#ficha=<id>` no modo documento.
- [x] 4.5 Manter a navegação, o tema e o splash intactos ao alternar entre Personagens e Worldbuilding.

## 5. Tela Principal de Mundos

- [x] 5.1 Criar `src/componentes/TelaMundos.jsx` com cabeçalho, botão "Novo mundo", card "Novo mundo" e ausência do botão "Exportar mundos".
- [x] 5.2 Implementar a listagem em cards com imagem (ou espaço reservado), Nome, Tipo, Nível Tecnológico e Gêneros.
- [x] 5.3 Implementar a visualização em lista com imagem, Nome, Tipo, Nível Tecnológico e Gêneros, usando o alternador por radio nativo do RF004.
- [x] 5.4 Ligar a busca superior por Nome e os filtros por Tipo e por Gênero, combinando os três critérios.
- [x] 5.5 Exibir o filtro "Filtrar por livro" desabilitado com "Nenhum livro cadastrado".
- [x] 5.6 Abrir o detalhe ao clicar no card ou no nome e abrir a tela vazia em "Novo mundo".
- [x] 5.7 Ordenar a listagem alfabeticamente sem diferenciar maiúsculas de minúsculas.

## 6. Tela de Detalhe/Criação do Mundo

- [x] 6.1 Criar `src/componentes/TelaMundo.jsx` com os botões Voltar, Exportar Mundo (desabilitado sem `id`) e Salvar.
- [x] 6.2 Implementar o card "Dados Compartilhados" com Nome, Tipo de Mundo, Nível Tecnológico, Gêneros e Descrição.
- [x] 6.3 Criar o seletor de Tipo alimentado por `listasMundo()` e o seletor de Nível Tecnológico com as cinco opções.
- [x] 6.4 Criar o controle "?" do Nível Tecnológico com quadro flutuante por `:hover`/`:focus`, `role="tooltip"`, `aria-label` e fechamento ao sair do foco, sem JavaScript.
- [x] 6.5 Implementar os Gêneros como caixas de seleção múltiplas, sem repetição e lidas de `listasMundo()`.
- [x] 6.6 Implementar a associação de imagem (diálogo nativo, JPG/PNG/WEBP até 4 MB), desabilitada enquanto o mundo não estiver salvo, com pré-visualização 16:9 e espaço reservado quando ausente.
- [x] 6.7 Implementar o painel "Vínculos com livros" retrátil, iniciando retraído, com contador zero, `aria-expanded`/`aria-controls`, acionável por Enter/Espaço e ícone coerente com a ação.
- [x] 6.8 Salvar o mundo pelo comando, atualizar o `id` após a criação e recarregar a lista/detalhe.
- [x] 6.9 Detectar alterações pendentes com `mesmosDados` e gravar antes de exportar.

## 7. Exportação do Mundo em PDF

- [x] 7.1 Criar `src/componentes/DocumentoMundo.jsx` com o documento A4 de cores fixas, contendo Nome, Tipo, Nível por extenso, Gêneros, Descrição e imagem, omitindo campos vazios e sem entradas/livros.
- [x] 7.2 Criar `src/componentes/TelaDocumentoMundo.jsx` para a janela oculta, pré-carregando a imagem e sinalizando "pronto" somente depois do carregamento (ou imediatamente quando não houver imagem).
- [x] 7.3 Implementar `exportar_mundo` em `lib.rs` espelhando `exportar_ficha`: janela oculta `index.html#mundo=<id>`, canal em `FichasProntas`, prazo de 30 s, `pdf::gravar_pdf`, fechamento e limpeza.
- [x] 7.4 No botão Exportar Mundo, abrir o diálogo nativo de salvamento com filtro `pdf` e nome sugerido `<Nome>.pdf`, usando `nomeDeArquivo()`.
- [x] 7.5 Tratar o cancelamento do diálogo sem gravar arquivo nem alterar a tela.
- [x] 7.6 Confirmar que nenhuma biblioteca de PDF foi acrescentada ao `Cargo.toml` ou ao `package.json`.

## 8. Estilos e acabamento

- [x] 8.1 Criar `src/mundos.css` com os estilos específicos (`.worldcard`, `.world-hero`, `.worldform`, ajuda do Nível), reusando tokens e classes do design system.
- [x] 8.2 Aplicar `aspect-ratio: 16 / 9`, `object-fit: cover` e `object-position: center` à imagem nos três contextos.
- [x] 8.3 Conferir os três temas (Blade Byte, Old Tower e Tundra), em especial o contraste dos botões primários e do quadro de ajuda.
- [x] 8.4 Conferir acessibilidade: rótulos dos campos, `aria-label` do "?", `aria-expanded` do painel, foco visível e nós/controles acionáveis por teclado.
- [x] 8.5 Rodar `npm run build` e corrigir erros de compilação do front-end.

## 9. Verificação viva e fechamento

- [x] 9.1 Criar `scripts/verificar-rf007.mjs` dirigindo o app Tauri real (WebView2 + CDP) com `TALECRAFT_DADOS` apontando para um diretório temporário.
- [x] 9.2 Cobrir no verificador: abertura pelo menu, card "Novo mundo", gravação só com Nome, Nome obrigatório/único, Tipo/Nível/Gêneros, busca, filtros combinados, alternância cards/lista, detalhe, painel retrátil, imagem carregada e exportação em PDF.
- [x] 9.3 Rodar `scripts/verificar-rf007.mjs` e obter todas as verificações aprovadas.
- [x] 9.4 Rodar sem regressão `verificar-rf002.mjs`, `verificar-rf003.mjs`, `verificar-rf004.mjs`, `verificar-rf005.mjs`, `verificar-rf005-persistencia.mjs` e `verificar-rf006.mjs`.
- [x] 9.5 Atualizar o `AGENTS.md` com as decisões do RF007 (listas fechadas, migração v4, `imagem.rs`, exportação e armadilhas encontradas).
- [x] 9.6 Rodar `openspec validate --all` e confirmar que as specs antigas e as novas continuam válidas.
