## 1. Requisito e implementação

- [x] 1.1 Ajustar o RF014 em `documents/talecraft.md`: TL004, TL005, RN003 e o cenário de independência passam a falar **Títulos/Outros Nomes** no vínculo, mantendo a **Alcunha** global.
- [x] 1.2 Trocar o rótulo do campo em `src/componentes/ModalPersonagemLivro.jsx` para **Títulos/Outros Nomes**, sem mudar o `id`, o estado `alcunha` nem a coluna do banco (design D1).
- [x] 1.3 Confirmar que a área **Dados do personagem** continua exibindo **Alcunha** (design D2).

## 2. Verificação

- [x] 2.1 Acrescentar ao `scripts/verificar-rf014.mjs` a leitura do `<label for="vinculo-alcunha">` e a checagem de que a alcunha global continua somente leitura (design D3).
- [x] 2.2 Rodar `node scripts/verificar-rf014.mjs` e `npm run build`; regressão sem mudanças de banco.

## 3. Documentação e fechamento

- [x] 3.1 Atualizar o `AGENTS.md` de `talecraft-app` com o novo rótulo e a distinção entre a alcunha global e os títulos locais.
- [x] 3.2 Atualizar o `AGENTS.md` de `talecraft-specs`.
- [x] 3.3 Validar com `openspec validate --all` e arquivar o change com `openspec archive "rf014-ajuste-rotulo-titulos" --yes`.
