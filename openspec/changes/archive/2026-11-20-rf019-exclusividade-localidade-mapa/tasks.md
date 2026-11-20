## 1. Domínio e API

- [x] Adicionar `mapas` à `LocalidadeArvore` e preencher em `listar_localidades_mundo`.
- [x] Criar o erro `LocalidadeEmOutroMapa`.
- [x] Validar no `salvar_mapa` apenas as localidades novas no mapa.
- [x] Testes Rust de Prédio, Cidade/Mundo, Mundo/Região e duplicata legada.

## 2. Editor

- [x] Remover da lista as localidades presas a outro mapa incompatível.
- [x] Bloquear clique, arraste e soltura sintética.
- [x] Atualizar associações após **Salvar**.

## 3. Verificação

- [x] Ajustar os dados do E2E para não compartilhar Centro/Solar entre Região e Cidade.
- [x] Cobrir Prédio repetido, Cidade bloqueada e Mundo/Região compartilhado.
- [x] Rodar `npm run build`, `npm run verificar:rust` e `verificar-rf019.mjs`.
- [x] Atualizar os `AGENTS.md`.

## 4. Fechamento

- [ ] Validar com o usuário.
- [ ] Arquivar o change em `openspec/changes/archive/`.
