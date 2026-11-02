## Context

O `DetalhePersonagemLivro` é inline, abaixo da grade/lista, com quatro abas. O
cabeçalho ainda tem um botão de ícone X que chama `aoFechar` e limpa
`detalheId`. Os testes usam esse botão para reabrir o detalhe. O banco está na
v16; este ajuste é de interface.

## Goals / Non-Goals

**Goals:**

- Remover o ícone X do cabeçalho do detalhe.
- Manter a troca de personagem como forma de substituir o conteúdo e descartar
  pendências.
- Ajustar os testes sem depender de um fechamento explícito.

**Non-Goals:**

- Criar outro controle de fechar.
- Alterar a seleção, o `detalheId` ou as abas.
- Mudar banco, comandos ou gravação.

## Decisions

**D1 — Remover o botão e a prop `aoFechar`.** O `TelaPersonagensLivro` não passa
mais `aoFechar`; `DetalhePersonagemLivro` só recebe `livroId`, `personagemId`,
`diretorioDados` e `aoSalvar`. `detalheId` continua sendo trocado pelo clique em
outro card/linha. Sair da seção desmonta o componente.

**D2 — Troca de personagem é o descarte.** Ao selecionar outro personagem, o
efeito de `personagemId` recarrega o detalhe, volta para a primeira aba e
descarta o formulário pendente do anterior. Não existe mais “Fechar sem salvar”
com botão; o teste passa a usar a troca de personagem para provar o descarte.

**D3 — Verificação.** O E2E confere que não existe `#detalhe-personagem-fechar`
nem botão de rodapé **Fechar**, que o detalhe continua aberto ao trocar de
personagem e que o vínculo anterior permanece. O RF015 deixa de fechar o detalhe
antes de sair do livro.

## Risks / Trade-offs

- **Sem botão de fechar** → o detalhe ocupa a página até a troca de personagem ou
  a navegação; é o comportamento pedido.
- **Testes antigos** → os fluxos que clicavam no X foram substituídos por troca
  de personagem; não há regressão de gravação.

## Migration Plan

1. Remover o botão e a prop no componente e no pai.
2. Atualizar os E2E de RF014 e RF015.
3. Rodar build, testes e verificadores; nenhum banco é migrado.

## Open Questions

Nenhuma.
