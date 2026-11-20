# Design — exclusividade da localidade por mapa

## Contexto

A chave `mapa_localidade (mapa_id, localidade_id)` impede a localidade duas vezes
no mesmo mapa, mas permite associações em quantos mapas o escritor quiser. O
editor mostrava qualquer localidade que ainda não estivesse no mapa atual.

## Decisões

### D1 — Regra de compatibilidade

Uma localidade pode estar em vários mapas apenas se **todos** forem **Mundo** ou
**Região**. Nos demais casos, a primeira associação a Cidade, Bairro ou
Prédio/Casa a torna exclusiva daquele mapa. A regra é simétrica: uma localidade
em Cidade não entra em Mundo/Região.

### D2 — Associações na listagem

`LocalidadeArvore` ganha `mapas: Vec<MapaDaLocalidade>` com `id`, `nome` e `tipo`.
A consulta usa `mapa_localidade` + `mapa` filtrada pelo mundo e preenche a lista
em uma passada; a árvore ignora o campo, o editor usa para decidir a
disponibilidade. Sem comando novo.

### D3 — Filtro no editor

`MapaEditor` remove da lista as localidades que já estão em outro mapa
incompatível. O clique e o arraste são bloqueados, e `adicionarLocalidade`
também recusa a soltura sintética com mensagem. A regra é calculada com o mapa
atual (id e tipo) e as associações carregadas; após **Salvar**,
`carregarLocalidades` atualiza as associações.

### D4 — Validação no domínio

`salvar_mapa` carrega os ids que já estavam no mapa antes de regravar. Para cada
localidade **nova** naquele mapa, consulta os outros mapas da localidade e
recusa (`LocalidadeEmOutroMapa`) quando a compatibilidade falha. Localidades que
já estavam no mapa são ignoradas nessa checagem, então duplicatas legadas não
bloqueiam a edição nem o salvamento de um mapa existente.

### D5 — Sem migração

A tabela já suporta várias associações; a regra fica no domínio e na interface.
Não há limpeza automática de dados antigos.
