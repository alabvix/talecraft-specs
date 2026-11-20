## Why

Nos mapas de **Prédio/Casa**, o marcador de 36 px não representa um cômodo e o
escritor não consegue montar a planta baixa: falta desenhar paredes, redimensionar
salas e marcar portas. **Polígono** e **Ligação** também não ajudam nessa escala.
O ajuste fecha essa lacuna usando a localidade como o próprio cômodo.

## What Changes

- **Cômodo retangular**: arrastar uma localidade em **Prédio/Casa** cria um
  quadrado de 120 × 120 com o nome no centro; o corpo move e as oito alças
  redimensionam, virando retângulo.
- **Porta**: a toolbar de **Prédio/Casa** troca **Polígono** e **Ligação** por
  **Porta**. Clicar numa parede cria a porta, que pode mudar de lado, largura e
  posição, acompanha o cômodo e sai com ele.
- **Legado preservado**: polígonos e ligações já gravados num mapa de
  **Prédio/Casa** continuam visíveis e apagáveis; só as ferramentas de criação
  somem.
- **Migração v21** aditiva: `mapa_localidade` ganha `largura`/`altura` e a nova
  tabela `mapa_porta` guarda lado, posição e largura.
- **Leitura e PDF**: o mesmo `MapaCanvas` passa a desenhar cômodos e portas no
  livro e no Documento do Mundo.

**Fora do escopo:** portas ligando dois cômodos, paredes livres desenhadas à mão,
medidas em metros, rotas de fuga, camadas e edição vértice a vértice.

## Capabilities

### New Capabilities

Nenhuma capability nova.

### Modified Capabilities

- `world-library`: editor de mapas com cômodos e portas em Prédio/Casa.
- `book-workspace`: leitura dos cômodos e portas na aba Mapas do livro.
- `world-sheet-export`: cômodos e portas no PDF do Mundo.
- `database-foundation`: migração **v21**.
- `rust-bridge`: validações e listas de cômodos e portas.

## Impact

- **Requisito:** ajuste do RF019 em `documents/talecraft.md` (RF019-TL012,
  RF019-FL011, RF019-RN020 a RF019-RN023, RF019-CA026 a RF019-CA028).
- **Banco:** migração v21 aditiva.
- **Back-end:** `mapa.rs` (estruturas, salvar, validações), `erro.rs` (dois
  códigos) e `banco/migracoes.rs`.
- **Front-end:** `MapaCanvas`, `MapaEditor`, `ModalMapa`, `Icone` e `mapas.css`.
- **Testes:** domínio, migração v21 e `verificar-rf019.mjs`.
