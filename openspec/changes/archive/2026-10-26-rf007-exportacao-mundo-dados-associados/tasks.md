## 1. Back-end

- [x] 1.1 Criar `src-tauri/src/documento_mundo.rs` com `DocumentoMundo` e `FaccaoDocumento`.
- [x] 1.2 Implementar `entradas_mundo::listar_todas`, carregando as seis categorias e as regras dos Sistemas.
- [x] 1.3 Implementar `faccao::listar_todas`, carregando as facções completas.
- [x] 1.4 Implementar `documento_mundo::montar_por_id` e o comando `montar_documento_mundo` no `invoke_handler`.
- [x] 1.5 Escrever testes Rust do agregado, incluindo entradas de todas as categorias e facção com personagem/papel.

## 2. Front-end

- [x] 2.1 Adicionar `montarDocumentoMundo` em `src/mundosApi.js`.
- [x] 2.2 Atualizar `TelaDocumentoMundo.jsx` para carregar o agregado e continuar esperando a imagem antes de sinalizar pronto.
- [x] 2.3 Renderizar dados básicos, imagem, entradas e facções em `DocumentoMundo.jsx`, omitindo campos e categorias vazios.
- [x] 2.4 Adicionar estilos de impressão para entradas, regras e facções em `src/mundos.css`.

## 3. Verificação e fechamento

- [x] 3.1 Atualizar `scripts/verificar-rf007.mjs` para criar entradas e facção, conferir o agregado, o documento renderizado e o PDF.
- [x] 3.2 Rodar `cargo test --manifest-path src-tauri/Cargo.toml --lib` e `npm run build`.
- [x] 3.3 Rodar `verificar-rf007.mjs` e a regressão dos requisitos anteriores.
- [x] 3.4 Atualizar `documents/talecraft.md` e `AGENTS.md` com o escopo completo do PDF.
- [x] 3.5 Rodar `openspec validate --all` e arquivar o change.
