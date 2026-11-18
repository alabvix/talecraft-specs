## Why

As **Localidades** do Mundo (RF008) hoje são uma lista plana com Nome, Descrição e
História. O escritor não consegue representar a estrutura do cenário — uma
Taverna dentro de uma Cidade, um Cômodo dentro de uma Casa, um País dentro de um
Território — nem identificar o que cada lugar é, e não há imagem para localidade
(como já existe para personagem e mundo).

## What Changes

- **Imagem da localidade**: JPG/PNG/WEBP até 4 MB, copiada para
  `<app_data_dir>/localidades/` com o caminho relativo no banco, miniatura na
  árvore e prévia na modal.
- **Tipo da Localidade**: lista fechada de 49 valores em ordem alfabética (inclui
  **Bairro**, **Catacumba**, **Caverna**, **Igreja**, **Mar**, **Praça**,
  **Ruína** e **Estádio**) +
  **Não definido**, opcional.
- **Hierarquia**: cada localidade pode ter uma **localidade pai** do mesmo mundo,
  com vários filhos e profundidade livre (Cidade → Bairro → Casa → Quarto).
  Contenção livre por tipo, com **recusa de ciclos** no domínio.
- A aba **Localidades** passa a exibir uma **árvore expansível** no lugar da
  tabela paginada; as demais categorias continuam iguais.
- O **Cenário Worldbuilding** do capítulo passa a mostrar o **caminho completo**
  da localidade.
- A categoria Localidades da seção **Worldbuilding do livro** (RF017) usa a mesma
  árvore, em consulta, com criação no mundo da aba.
- Migração **v18** aditiva (`tipo`, `imagem`, `pai_id` + índice) e **v19** que
  recria `localidade` para ampliar o `CHECK` aos 49 tipos, preservando os ids.

**Fora do escopo:** exclusão de localidades ou imagens, restrições de contenção
por tipo, arrastar e soltar para mover nós, tela de detalhe da localidade,
alteração da hierarquia no PDF do mundo (além de incluir o Tipo).

## Capabilities

### New Capabilities

Nenhuma capability nova: o RF018 estende as entradas do mundo e a seção do livro
já existentes.

### Modified Capabilities

- `world-entries`: Localidades ganham imagem, tipo e hierarquia em árvore; a
  listagem em tabela deixa de valer para Localidades.
- `book-workspace`: a categoria Localidades da seção Worldbuilding do livro usa a
  árvore e o cenário do capítulo mostra o caminho.
- `database-foundation`: migrações **v18** (colunas) e **v19** (CHECK ampliado) das localidades.
- `rust-bridge`: comandos de listagem em árvore e de imagem da localidade.

## Impact

- **Requisito:** RF018 em `documents/talecraft.md` (RF018-TL001 a RF018-TL005,
  RF018-FL001 a RF018-FL006, RF018-RN001 a RF018-RN010, RF018-CA001 a
  RF018-CA018).
- **Banco:** migrações v18 e v19 em `localidade`.
- **Back-end:** `entradas_mundo.rs` (tipo, imagem, pai, validação de ciclo e
  listagem da árvore), `livro_mundo.rs` (caminho da localidade), `banco.rs`
  (lista fechada dos tipos), `erro.rs` (códigos novos) e dois comandos.
- **Front-end:** `ArvoreLocalidades`, ajustes em `ModalEntradaMundo` (tipo, pai e
  imagem), `TelaMundo`, `TelaWorldbuildingLivro`, `PainelCapitulo` e APIs.
- **Testes:** domínio e migrações v18/v19; `scripts/verificar-rf018.mjs`; ajustes em
  RF008, RF017 e RF015.
