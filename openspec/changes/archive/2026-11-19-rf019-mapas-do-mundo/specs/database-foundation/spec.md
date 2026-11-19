## ADDED Requirements

### Requirement: Migração v20 dos mapas
O sistema SHALL evoluir o esquema para a **v20** por um passo **aditivo** que cria `mapa` (mundo, nome, escala com `CHECK`, âncora opcional, fundo com `CHECK`, datas), `mapa_localidade` (chave composta mapa + localidade, posição), `mapa_forma` (pontos, rótulo, cor com `CHECK`, ordem) e `mapa_ligacao` (origem, destino, rótulo, estilo com `CHECK`, par único), com chaves estrangeiras e **cascata do mapa** para os filhos, sem recriar nem apagar tabelas existentes e sem perder dados (RF019-RN011, RF019-CA018).

#### Scenario: Banco v19 migra para a v20
- **GIVEN** um banco na v19 com mundos, localidades, entradas, facções, livros e capítulos
- **WHEN** o aplicativo abre e aplica as migrações
- **THEN** o esquema fica na v20, as quatro tabelas existem e nenhum dado anterior é perdido (RF019-RN011, RF019-CA018)

#### Scenario: Cascata do mapa
- **GIVEN** um mapa com posições, formas e ligações
- **WHEN** o mapa é excluído
- **THEN** os filhos saem por cascata e as localidades continuam (RF019-RN010, RF019-CA013)

#### Scenario: Escala e fundo inválidos
- **GIVEN** a tabela `mapa` já está na v20
- **WHEN** uma gravação tenta uma escala ou um fundo fora da lista
- **THEN** o `CHECK` do banco recusa o valor (RF019-RN002, RF019-RN004)
