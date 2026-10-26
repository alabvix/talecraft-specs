# Tarefas — RF005: relações familiares, bidirecionalidade e árvore familiar

## 1. Esquema e migração (database-foundation)

- [x] 1.1 Acrescentar o passo **v3** em `migracoes()` (`src-tauri/src/banco.rs`) recriando `relacao_personagem` com o `CHECK` de **dez** tipos, preservando `CHECK (origem_id <> destino_id)` e `UNIQUE (origem_id, destino_id)` (RF005-RN010, RF005-CA015)
- [x] 1.2 Ajustar `TIPOS_RELACAO` de 8 para **10** valores, acrescentando `Irmão/Irmã` e `Aprendiz` (RF005-RN001, RF005-CA001)
- [x] 1.3 Teste Rust `banco_v2_migra_para_v3_sem_perder_dados`: gravar personagens e relações na v2, migrar e conferir que nada se perdeu (RF005-CA015)
- [x] 1.4 Teste Rust de concordância: a constante `TIPOS_RELACAO` e o `CHECK` da v3 aceitam exatamente os mesmos dez valores (RF005-RN001)
- [x] 1.5 Teste Rust de banco v3: gravar relação com `Irmão/Irmã` e com `Aprendiz` é aceito pelo esquema (RF005-CA015)

## 2. Domínio: tabela de espelho e bidirecionalidade (character-library)

- [x] 2.1 Criar a função pura da **tabela de espelho** em `src-tauri/src/personagem.rs` — `Filho/Filha ⇄ Mãe/Pai`, `Mentor ⇄ Aprendiz`, e simétricos espelhando a si mesmos (RF005-RN003)
- [x] 2.2 Reescrever `salvar_relacao` para gravar o **par espelhado** em **uma transação** (`&mut Connection`), com `INSERT … ON CONFLICT (origem_id, destino_id) DO UPDATE SET tipo = excluded.tipo` nas duas arestas (RF005-RN002, RF005-CA002, RF005-CA003, RF005-CA004, RF005-CA006)
- [x] 2.3 Ajustar a validação do tipo em `salvar_relacao` para a lista dos dez e a mensagem de erro correspondente (RF005-RN001)
- [x] 2.4 Testes Rust do espelhamento: um teste por categoria — `Filho/Filha` → `Mãe/Pai`, `Mãe/Pai` → `Filho/Filha`, `Mentor` → `Aprendiz`, `Aprendiz` → `Mentor` e cada simétrico (RF005-CA002, RF005-CA003, RF005-CA004)
- [x] 2.5 Teste Rust de regravação do par: gravar A→B e depois regravar com outro tipo atualiza **as duas** arestas, sem duplicar (RF005-CA006)
- [x] 2.6 Teste Rust de exibição nos dois lados: na visão de Ofélia, Esther aparece como `Mãe/Pai`; na visão de Esther, Ofélia aparece como `Filho/Filha` (RF005-CA005)

## 3. Domínio: recusa de ciclo de ascendência (character-library)

- [x] 3.1 Implementar a detecção de ciclo por subida de ascendentes, rodando apenas para `Filho/Filha` e `Mãe/Pai`, com `HashSet` de visitados (RF005-RN005, RF005-CA007)
- [x] 3.2 Ligar a detecção em `salvar_relacao` **antes** da gravação, devolvendo mensagem útil e sem travar a aplicação (RF005-RN005, RF005-CA007)
- [x] 3.3 Teste Rust de ciclo **direto** recusado: A filho de B, tentar B filho de A (RF005-CA007)
- [x] 3.4 Teste Rust de ciclo **indireto** recusado: A filho de B, B filho de C, tentar C filho de A (RF005-CA007)
- [x] 3.5 Teste Rust de gravação válida não afetada: um filho novo em ramo existente é aceito (RF005-CA007)

## 4. Domínio: montagem da árvore familiar (family-tree)

- [x] 4.1 Definir as estruturas `NoArvore`, `Ligacao` e `ArvoreFamiliar` em `src-tauri/src/personagem.rs` (design D4)
- [x] 4.2 Implementar a leitura das relações familiares que tocam o personagem (`Filho/Filha`, `Mãe/Pai`, `Irmão/Irmã`, `Cônjuge`), ignorando as não familiares (RF005-RN006, RF005-CA009)
- [x] 4.3 Implementar a subida por **ascendentes** com `geracao` negativa e a descida por **descendentes** com `geracao` positiva, cobrindo toda a linhagem (RF005-RN009, RF005-CA009, RF005-CA013)
- [x] 4.4 Implementar os **irmãos** no nível 0, lado a lado, com `ordem` crescente, confiando no tipo **declarado** e sem deduzir de mãe/pai em comum (RF005-RN007, RF005-CA010)
- [x] 4.5 Implementar o nó **"?"** (`id: None`, `papel: desconhecido`) acima dos irmãos sem mãe/pai cadastrado — **um** nó por grupo (RF005-RN007, RF005-CA011)
- [x] 4.6 Implementar o **cônjuge** no nível 0 ao lado do personagem, com ligação de **união**, e os filhos abaixo do casal (RF005-RN008, RF005-CA012)
- [x] 4.7 Garantir que a varredura não entra em laço com ciclo antigo e devolve quadro vazio quando não há relação familiar (RF005-CA014)
- [x] 4.8 Testes Rust da árvore: linhagem completa (avós e netos), irmãos lado a lado, nó "?" do ascendente ausente, cônjuge no mesmo nível e filhos abaixo do casal (RF005-CA017)

## 5. Comandos Tauri (rust-bridge)

- [x] 5.1 Criar o comando `arvore_familiar` devolvendo `ArvoreFamiliar` e registrar no `invoke_handler` (RF005-CA009)
- [x] 5.2 Criar o comando `listar_tipos_relacao` devolvendo os **dez** tipos e registrar no `invoke_handler` (RF005-CA001)
- [x] 5.3 Ajustar o comando de gravação de relação para a assinatura com `&mut Connection` do domínio (design D2)
- [x] 5.4 Conferir que a recusa de ciclo chega ao front-end como **mensagem útil**, sem derrubar a aplicação (RF005-CA007)

## 6. Front-end: tipos de relação e par espelhado (character-library)

- [x] 6.1 Acrescentar em `src/personagensApi.js` as chamadas a `arvore_familiar` e `listar_tipos_relacao` (RF005-CA001, RF005-CA009)
- [x] 6.2 Trocar em `src/componentes/ModalRelacoes.jsx` a lista fixa de oito tipos pela lista devolvida pelo back-end — **dez** opções (RF005-RN001, RF005-CA001)
- [x] 6.3 Conferir que o painel de Relações Globais exibe o **lado do par** do personagem atual, sem mudança de código (RF005-CA005)
- [x] 6.4 Exibir a mensagem de erro da recusa de ciclo na modal, sem quebrar a tela (RF005-CA007)

## 7. Front-end: quadro Família e árvore em SVG (family-tree)

- [x] 7.1 Criar o componente `src/componentes/ArvoreFamiliar.jsx` desenhando um SVG inline com `viewBox`, sem largura/altura fixas (RF005-TL002, RF005-CA009)
- [x] 7.2 Desenhar os nós com retrato (quando houver) e nome; nó desconhecido com o rótulo **"?"** e estilo esmaecido (RF005-CA011)
- [x] 7.3 Desenhar as linhas de **filho** (cotovelo) e de **união** do casal (RF005-RN008, RF005-CA012)
- [x] 7.4 Acrescentar o quadro **Família** em `src/componentes/TelaPersonagem.jsx`, **abaixo** do quadro de Relações Globais, com estado vazio quando não há relação familiar (RF005-TL002, RF005-CA008, RF005-CA014)
- [x] 7.5 Acrescentar os estilos da árvore em `src/personagens.css` usando **só tokens de tema** (RF005-CA016)
- [x] 7.6 Conferir a árvore nos três temas (Blade Byte, Old Tower, Tundra), sem cor fixa e sem regressão de navegação, busca, splash ou alternância cards/lista (RF005-CA016)

## 8. Verificação no app real

- [x] 8.1 Criar `scripts/verificar-rf005.mjs` dirigindo o app Tauri real (WebView2 + CDP) contra banco isolado (`TALECRAFT_DADOS`), como o `verificar-rf004.mjs` (RF005-CA001)
- [x] 8.2 Verificar na tela: a modal lista os dez tipos (RF005-CA001)
- [x] 8.3 Verificar na tela: gravar Ofélia como `Filho/Filha` de Esther faz Esther aparecer como `Mãe/Pai` de Ofélia e vice-versa nas duas páginas (RF005-CA002, RF005-CA005)
- [x] 8.4 Verificar na tela: par simétrico (`Rival`/`Irmão/Irmã`) e par de Mentor (`Aprendiz`) gravados automaticamente (RF005-CA003, RF005-CA004)
- [x] 8.5 Verificar na tela: ciclo de ascendência recusado com mensagem, sem travar (RF005-CA007)
- [x] 8.6 Verificar na tela: o quadro Família aparece abaixo de Relações Globais e desenha a árvore com irmãos lado a lado, nó "?" e cônjuge (RF005-CA008, RF005-CA009, RF005-CA010, RF005-CA011, RF005-CA012)
- [x] 8.7 Verificar na tela: personagem sem relação familiar mostra estado vazio no quadro Família (RF005-CA014)
- [x] 8.8 Verificar migração no app real: um banco do RF004 abre no RF005 com personagens e relações preservados (RF005-CA015)
- [x] 8.9 Verificar persistência entre execuções: fechar e reabrir mantém as relações e a árvore coerentes (RF005-CA005)

## 9. Validação final e documentação

- [x] 9.1 Rodar `cargo test --manifest-path src-tauri/Cargo.toml --lib` e confirmar que todos os testes (RF004 + RF005) passam (RF005-CA017)
- [x] 9.2 Rodar `npm run build` sem erro (RF005-CA016)
- [x] 9.3 Rodar `scripts/verificar-rf002.mjs`, `verificar-rf003.mjs` e `verificar-rf004.mjs` para confirmar **sem regressão** (RF005-CA016)
- [x] 9.4 Rodar `scripts/verificar-rf005.mjs` e registrar o resultado (RF005-CA001 a RF005-CA015)
- [x] 9.5 Atualizar `AGENTS.md`: RF005 no estado atual, nova capability `family-tree`, migração v3, tabela de espelho e armadilhas encontradas
- [x] 9.6 Atualizar o **protótipo** (`prototype/personagem.html` e `prototype/css/talecraft.css`) com o quadro Família, mantendo encoding UTF-8 sem BOM e divisões `<div>` balanceadas
- [x] 9.7 Rodar `openspec validate --all` e confirmar que passa
- [x] 9.8 Aguardar o teste do usuário antes de arquivar o change (regra do projeto) — **aprovado no 3º teste** (dois pais e duas filhas aparecem; casal unido)

## 10. Ajustes pedidos no teste do usuário

- [x] 10.1 Garantir que a **mãe/pai** (e avós) fique **sempre na primeira linha** da árvore, com o personagem no meio e filhos/irmãos abaixo — verificado por teste Rust (`arvore_pendura_ascendentes_para_cima_e_descendentes_para_baixo`) e no app real (RF005-CA009)
- [x] 10.2 Diminuir a fonte do nome do personagem no nó (12px → **10px**) e posicioná-lo **abaixo** do retrato, com o retrato acima (ajuste visual)
- [x] 10.3 Tornar cada nó **clicável**: clicar no retrato ou no nome abre a ficha daquele personagem, permitindo navegar pela árvore; o nó "?" não é clicável (RF005-CA011)
- [x] 10.4 Estilo de nó clicável: cursor de ponteiro, realce no `hover`/`focus` e `role="button"` com rótulo acessível
- [x] 10.5 Propagar `aoAbrirPersonagem` de `App.jsx` → `TelaPersonagem.jsx` → `ArvoreFamiliar.jsx`
- [x] 10.6 Refletir as mudanças no **protótipo** (`prototype/personagem.html` e `css/talecraft.css`): retrato acima, nome abaixo, nós clicáveis e exemplo com mãe/avó acima e filha abaixo
- [x] 10.7 Estender `scripts/verificar-rf005.mjs` com as asserções novas (nome abaixo do retrato com 10px; nó clicável que abre a ficha; mãe/pai na primeira linha) — **25/25**
- [x] 10.8 **Corrigir os dados antigos** gravados pelo binário anterior ao RF005 (relações unilaterais): acrescentar as arestas de espelho que faltavam no banco real, com backup
- [x] 10.9 Recompilar o binário **release** para o usuário testar o código atual (não o antigo das 22:43)

## 11. Correção do sentido do seletor da modal (2º teste do usuário)

- [x] 11.1 Corrigir `escolher` em `ModalRelacoes.jsx`: o tipo escolhido descreve o **outro** personagem, então a gravação é `salvarRelacao(destinoId, personagemId, tipo)` — antes gravava invertido e "Filho/Filha" virava "Mãe/Pai" (RF005-CA005)
- [x] 11.2 Acrescentar ao `verificar-rf005.mjs` duas asserções que exercitam o **seletor da modal** (não o comando direto): o painel mostra o outro como `Filho/Filha` e o par espelhado como `Mãe/Pai` — **27/27**
- [x] 11.3 **Corrigir os dados reais** do usuário (Daime Calan como pai de Ofélia/Ariadne e cônjuge de Esther), gravando pelo comando do app na direção correta, com backup (`talecraft.db.bak3-daime`)

## 12. Nós sobrepostos na árvore (3º teste do usuário)

- [x] 12.1 Corrigir `subir_ascendentes` e `descer_descendentes` em `personagem.rs`: cada nó passa a receber uma **coluna própria** (`ordem`) na sua geração, vinda do contador `proxima_ordem` — antes os dois pais (e os dois filhos) caíam na mesma célula `(geracao, ordem)` e um cobria o outro no SVG (RF005-CA009, RF005-CA013)
- [x] 12.2 Agrupar os **pais cônjuges** como casal na árvore do filho: lado a lado e ligados por uma linha de união, com o auxiliar `sao_conjuges` (RF005-CA012)
- [x] 12.3 Teste Rust `arvore_nao_sobrepoe_nos_da_mesma_geracao`: dois pais e duas filhas — nenhuma célula `(geracao, ordem)` repetida e ambos os pais/unhas presentes (RF005-CA009)
- [x] 12.4 Acrescentar ao `verificar-rf005.mjs` duas asserções no app real: os **dois pais** lado a lado e unidos, e as **duas filhas** visíveis — **29/29**
