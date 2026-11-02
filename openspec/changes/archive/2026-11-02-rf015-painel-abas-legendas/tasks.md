## 1. Painel em duas abas

- [x] 1.1 Reusar `PainelAbas` em `PainelCapitulo.jsx`, com `abaAtiva` local e as abas **Dados do Capítulo** e **Personagens do Capítulo** (design D1, D2, D3).
- [x] 1.2 Mover o `.formgrid` do **Número** ao **Resumo** para a primeira aba e o bloco `.chapterchar` para a segunda, mantendo o **Salvar** no `.panel__head` e o contador de personagens (design D2, D3).
- [x] 1.3 Ajustar `.chapterpanel .booktabs__nav` e `.chapterpanel .booktabs__panel` em `livros.css` para as abas não somarem padding ao painel (design D1).

## 2. Campos de três linhas e ajudas

- [x] 2.1 Trocar **Motivo do Tipo** e **Meta** de `textarea--medium` para `textarea--short`, com `rows={3}`, sem alterar `.textarea--medium` (design D4).
- [x] 2.2 Extrair o markup de ajuda do **Tipo** em um componente local e aplicá-lo a **Evento** e **Tipo de Evento**, com as legendas de Ponto de Ligação, Ponto de Virada, Ascensão, Declínio, Apogeu, Queda e Neutro (design D5).
- [x] 2.3 Ajustar o posicionamento do popup na coluna estreita de Evento/Tipo de Evento, garantindo que ele não seja cortado, e repetir a conferência nos três temas (design D5).

## 3. Verificação e fechamento

- [x] 3.1 Atualizar `scripts/verificar-rf015.mjs` para cobrir as duas abas, a troca sem perder edição pendente, as alturas de Motivo do Tipo/Meta e as duas ajudas com os termos do requisito (design D6).
- [x] 3.2 Rodar `npm run build`, `npm run verificar:rust` e os verificadores `verificar-rf015.mjs`, `verificar-rf011.mjs` e `verificar-rf016.mjs` (design D6).
- [x] 3.3 Atualizar os `AGENTS.md` dos dois repositórios, rodar `openspec validate --all` e arquivar o change.
