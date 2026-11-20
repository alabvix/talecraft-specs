## 1. Banco e domínio

- [x] Criar a migração **v22** com o tipo **Mundo**, a coluna `raiz`, a raiz de cada mundo e o índice único parcial.
- [x] Criar a migração corretiva **v23** da FK `capitulo.cenario_localidade_id` para `localidade`.
- [x] Criar/sincronizar a raiz em `mundo::salvar`.
- [x] Devolver `raiz` em `listar_localidades_mundo`.
- [x] Usar a raiz como pai padrão e bloquear a edição da raiz em `salvar_entrada`.
- [x] Filtrar a raiz das entradas, contagens, cenário do capítulo e PDF.
- [x] Adicionar `TIPOS_LOCALIDADE_MUNDO` e `TIPOS_LOCALIDADE_REGIAO` e validar todas as escalas.
- [x] Testes Rust de migração, raiz, filtros e contagens.

## 2. Front-end

- [x] Mostrar a raiz fixa no topo da árvore, sem Editar, com ícone de mundo.
- [x] Paginar os filhos da raiz mantendo-a fixa.
- [x] Remover **Nenhuma (raiz)** e iniciar novas localidades na raiz/âncora.
- [x] Filtrar a raiz e os tipos por escala no painel de localidades do mapa.
- [x] Reaproveitar o polígono compartilhado em Região.

## 3. Verificação

- [x] Atualizar `verificar-rf018.mjs`, `verificar-rf019.mjs`, `verificar-rf017.mjs` e `verificar-rf008.mjs`.
- [x] Rodar `npm run build`, `npm run verificar:rust` e os verificadores afetados.
- [x] Atualizar os `AGENTS.md`.

## 4. Fechamento

- [ ] Validar com o usuário.
- [ ] Arquivar o change em `openspec/changes/archive/`.
