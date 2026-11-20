## ADDED Requirements

### Requirement: Migração v21 dos cômodos e portas
O sistema SHALL evoluir o esquema para a **v21** por um passo **aditivo** que acrescenta `largura` e `altura` (`REAL NOT NULL DEFAULT 120`) em `mapa_localidade` e cria `mapa_porta` (`mapa_id`, `localidade_id`, `lado` com `CHECK` em norte/sul/leste/oeste, `posicao` de 0 a 1 e `largura` positiva), com chaves estrangeiras, cascata do mapa e da localidade e sem recriar nem apagar tabelas existentes (RF019-RN022, RF019-CA027).

#### Scenario: Banco v20 migra para a v21
- **GIVEN** um banco na v20 com mapas, posições, formas e ligações
- **WHEN** o aplicativo abre e aplica as migrações
- **THEN** o esquema fica na v21, as posições antigas ganham 120 × 120 e nenhum dado é perdido (RF019-RN022, RF019-CA027)

#### Scenario: Lado inválido recusado
- **GIVEN** a tabela `mapa_porta` já está na v21
- **WHEN** uma gravação tenta um lado fora de norte/sul/leste/oeste ou uma posição fora de 0..1
- **THEN** o `CHECK` do banco recusa o valor (RF019-RN021, RF019-RN022)

#### Scenario: Cascata das portas
- **GIVEN** um mapa com cômodos e portas
- **WHEN** o mapa ou o cômodo é excluído
- **THEN** as portas saem por cascata e as localidades continuam (RF019-RN021, RF019-RN022)
