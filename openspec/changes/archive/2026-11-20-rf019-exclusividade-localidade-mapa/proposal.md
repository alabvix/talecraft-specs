## Why

Hoje a mesma localidade pode ser arrastada para vários mapas, inclusive para
dois mapas de **Prédio/Casa** ou para um mapa de **Cidade** e outro de **Mundo**.
Isso quebra a ideia de que o cômodo, a casa ou a cidade pertencem àquela planta.
A única exceção faz sentido entre **Mundo** e **Região**, que são visões
macro da mesma localidade.

## What Changes

- Uma localidade sem mapa continua disponível para qualquer mapa.
- Uma localidade em **Mundo/Região** só pode ser compartilhada com outro mapa
  **Mundo/Região**.
- Uma localidade em **Cidade**, **Bairro** ou **Prédio/Casa** fica presa a esse
  mapa e não aparece em nenhum outro.
- O painel do editor remove as localidades bloqueadas da lista, e
  `salvar_mapa` recusa a nova associação com `LocalidadeEmOutroMapa`.
- O domínio valida apenas as localidades **novas** no mapa; duplicatas legadas
  que já estavam nele continuam editáveis.
- `listar_localidades_mundo` passa a devolver as associações `mapas` de cada
  localidade para o editor decidir a disponibilidade.

**Fora do escopo:** migração, limpeza automática de duplicatas legadas e
compartilhamento entre mapas de escalas diferentes.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities

- `world-library`: disponibilidade e exclusividade da localidade no editor.
- `rust-bridge`: associações na listagem e validação no salvar.

## Impact

- **Requisitos:** RF019-TL006, RF019-FL003, RF019-RN005, RF019-RN024 e
  RF019-CA030.
- **Back-end:** `entradas_mundo.rs` (campo `mapas`), `mapa.rs` (validação) e
  `erro.rs` (novo código).
- **Front-end:** `MapaEditor.jsx` (filtro e guarda).
- **Testes:** Rust e `verificar-rf019.mjs`.
