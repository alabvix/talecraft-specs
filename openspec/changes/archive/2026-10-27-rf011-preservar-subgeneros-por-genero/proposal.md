## Why

Na tela **Dados do Livro**, trocar o Gênero Principal descartava imediatamente os
subgêneros marcados. Se o escritor voltasse ao gênero original sem salvar, os
subgêneros salvos apareciam desmarcados, como se tivessem sido perdidos. Isso
quebra a expectativa de que o formulário preserve o que já estava salvo até o
próximo **Salvar** ou **Descartar**.

## What Changes

- A seleção de subgêneros passa a ser mantida **por gênero** no estado do
  formulário.
- Trocar o gênero filtra a lista exibida, mas não apaga a seleção dos outros
  gêneros enquanto o livro não é salvo.
- Ao voltar ao gênero original, os subgêneros salvos reaparecem **marcados**.
- Ao salvar, somente os subgêneros do gênero atual são enviados ao back-end; os
  demais continuam descartados da gravação.
- **Descartar** restaura o gênero e os subgêneros do último salvamento, limpando
  as seleções pendentes dos outros gêneros.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities

- `book-workspace`: a troca de gênero em **Dados do Livro** preserva a seleção de
  subgêneros por gênero até salvar ou descartar.

## Impact

- **Requisitos ajustados:** RF011-RN004, RF011-FL009 e RF011-CA009.
- **Front-end:** `src/componentes/TelaLivro.jsx` (`DadosLivro`), sem mudança de
  banco ou de comandos.
- **Verificação:** `verificar-rf011.mjs` passa a trocar o gênero, voltar ao
  original e conferir que os subgêneros salvos continuam marcados.
