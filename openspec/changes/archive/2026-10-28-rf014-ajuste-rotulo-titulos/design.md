## Context

A modal de detalhe do RF014 tem duas áreas: **Dados do personagem** (ficha
global somente leitura) e **Vínculo com o livro** (editável). Hoje o campo local
se chama **Alcunha**, o mesmo nome da **Alcunha** global, o que confunde: a
global é o apelido do personagem em toda a biblioteca; a local guarda títulos e
outros nomes que ele recebe naquela história.

## Goals / Non-Goals

**Goals:**

- Exibir o rótulo **Títulos/Outros Nomes** no campo local do vínculo.
- Manter a **Alcunha** global somente leitura e a coluna `alcunha` do banco.
- Cobrir o rótulo no verificador do RF014.

**Non-Goals:**

- Alterar o cadastro global, o banco, a API ou a gravação do vínculo.
- Criar um campo separado para "títulos" e outro para "outros nomes".
- Mudar a ordem ou os demais rótulos do vínculo.

## Decisions

**D1 — Só o rótulo muda.** O estado `form.alcunha`, a coluna `alcunha` e o
payload `alcunha` continuam iguais; a troca é no texto do `<label>`. Assim não há
migração nem risco para vínculos já gravados. Alternativa descartada: renomear a
coluna — exigiria migração e não traria benefício funcional.

**D2 — A Alcunha global permanece.** A área **Dados do personagem** continua
mostrando **Alcunha** (RF004), porque é o apelido da ficha global. O novo rótulo
deixa clara a diferença entre os dois campos.

**D3 — Verificação pelo rótulo e pelo comportamento.** O `verificar-rf014.mjs`
passa a ler o texto do `<label for="vinculo-alcunha">` e continua conferindo que
a alcunha global permanece `Nove` depois de gravar o vínculo. O `id` do campo
não muda, então os testes existentes seguem válidos.

## Risks / Trade-offs

- **Rótulo longo** → "Títulos/Outros Nomes" ocupa mais espaço; o campo já é de
  largura total e o `.formfield` empilha rótulo e controle, sem quebra de layout.
- **Diferença entre spec e ficha global** → o texto da modal deixa explícito que
  a área de cima é a ficha global; a de baixo é o vínculo local.

## Migration Plan

1. Trocar o rótulo em `ModalPersonagemLivro.jsx`.
2. Atualizar o `verificar-rf014.mjs`.
3. Nenhuma mudança de banco; um build anterior continua lendo o mesmo `alcunha`.

## Open Questions

Nenhuma. O nome escolhido é **Títulos/Outros Nomes**, com a barra, como pedido.
