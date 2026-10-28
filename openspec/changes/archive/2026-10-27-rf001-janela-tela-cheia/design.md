## Context

A janela principal é configurada em `src-tauri/tauri.conf.json` com `width`,
`height`, `minWidth`, `minHeight`, `resizable` e `center`. O Tauri 2 aceita a
propriedade `fullscreen` por janela; ela é aplicada na criação, antes de o
front-end carregar.

## Goals / Non-Goals

**Goals:**

- Abrir a janela principal em modo de tela cheia em toda execução.
- Validar que o viewport do WebView cobre a tela.
- Manter o restante da configuração e o layout intactos.

**Non-Goals:**

- Atalho para sair/entrar em tela cheia.
- Lembrar posição, monitor ou tamanho anterior da janela.
- Mudar o layout, os temas ou as telas.

## Decisions

**D1 — `fullscreen: true` na configuração da janela.** É a propriedade nativa do
Tauri 2; vale para `tauri dev`, debug e release. Alternativa descartada:
maximizar no `setup` com código Rust — exigiria comando/estado extra e não é o
que o requisito pede.

**D2 — Tela cheia, não maximizada.** O requisito diz **tela cheia**; maximizada
mantém a barra de título e a barra de tarefas visíveis. `fullscreen: true`
remove as bordas e cobre o monitor. Alternativa descartada: `maximized: true` —
seria um comportamento diferente do pedido.

**D3 — Verificação pelo viewport.** Como a janela nativa não é acessível pelo
CDP, o verificador compara `window.innerWidth/innerHeight` com
`screen.width/height`. Em tela cheia os dois pares coincidem; em janela
maximizada, a altura interna seria menor por causa da barra de título e da barra
de tarefas.

## Risks / Trade-offs

- **Sem barra de título** → fechar o aplicativo exige `Alt+F4` (ou o item de
  menu do sistema operacional). O requisito prioriza a imersão; um atalho de
  alternância fica para requisito posterior, se necessário.
- **Monitor escolhido pelo sistema** → a janela abre no monitor padrão. Escolher
  monitor não faz parte deste ajuste.
- **Testes com janela pequena** → os verificadores existentes não dependem de
  largura/altura fixas; o layout é responsivo e usa a área disponível.

## Migration Plan

1. Acrescentar `"fullscreen": true` à janela em `tauri.conf.json`.
2. Manter `width`, `height`, `minWidth`, `minHeight`, `resizable` e `center` como
   fallback caso a janela saia do modo de tela cheia pelo sistema operacional.
3. Não há migração de banco, comando novo nem mudança no front-end.

## Open Questions

Nenhuma. Se o escritor quiser voltar ao modo janela, isso será um requisito
próprio (atalho/toggle).
