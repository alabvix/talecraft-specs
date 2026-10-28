## Why

No **Vínculo com o livro**, o campo **Alcunha** guarda títulos e outros nomes
que o personagem recebe naquela história. O rótulo "Alcunha" ficou estreito e se
confunde com a **Alcunha** global do cadastro; o escritor pediu o rótulo
**Títulos/Outros Nomes**.

## What Changes

- Renomear o rótulo do campo do vínculo de **Alcunha** para
  **Títulos/Outros Nomes** na modal de detalhe.
- Manter a **Alcunha** global somente leitura com o nome atual e manter a coluna
  `alcunha` no banco (o rótulo muda, a persistência não).
- Nenhuma migração, comando ou biblioteca nova.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: o campo do vínculo passa a se chamar
  **Títulos/Outros Nomes** na modal de detalhe.

## Impact

- **Requisito coberto:** RF014 (RF014-TL004, RF014-TL005, RF014-RN003,
  RF014-CA009).
- **Fora do escopo:** alterar a **Alcunha** global, renomear a coluna `alcunha`,
  criar um segundo campo de texto ou mudar a validação/gravação do vínculo.
- **Back-end:** nenhuma mudança; a API continua com `alcunha`.
- **Front-end:** `src/componentes/ModalPersonagemLivro.jsx` e o rótulo do campo.
- **Verificação:** `scripts/verificar-rf014.mjs` confere o novo rótulo e mantém
  a checagem da alcunha global; sem regressão dos demais verificadores.
