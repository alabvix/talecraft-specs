## Context

O livro já tem capítulos com Tipo e personagens com Evento/Tipo de Evento
(RF015), além do papel de cada personagem no elenco (RF014). A seção
**Gráficos** do menu do livro ainda é uma tela informativa. O protótipo tem
gráficos SVG, mas as curvas pedidas neste requisito são específicas e serão
desenhadas do zero.

## Goals / Non-Goals

**Goals:**

- Abrir a seção **Gráficos** com duas abas reais e estados vazios claros.
- Desenhar a curva de progressão acumulada e um gráfico de arco por personagem.
- Calcular as séries no back-end, com testes de domínio.
- Manter tudo somente leitura e coerente com o tema ativo.

**Non-Goals:**

- Criar tabelas, migrações ou gravar qualquer dado.
- Exportar os gráficos, comparar personagens no mesmo eixo ou desenhar tensão,
  POV e mapa de calor do protótipo.
- Trocar o Tipo ou o Evento pela tela de gráficos.

## Decisions

**D1 — Comando de leitura com as séries prontas.** `dados_graficos_livro`
devolve `capitulos` (progressão) e `personagens` (arcos) já calculados. O
front-end não recalcula regra de negócio e os testes Rust cobrem a matemática.
Alternativa descartada: montar tudo no React a partir de `listar_capitulos` +
`obter_capitulo` — faria N+1 consultas e espalharia a regra de acumulação.

**D2 — Módulo `grafico.rs`, sem migração.** O módulo lê `capitulo`,
`capitulo_personagem`, `livro_personagem` e `personagem_global`, valida o livro
e devolve structs `PontoProgressao`, `ArcoPersonagem` e `PontoArco`. Nenhuma
tabela nova; o esquema continua na v15.

**D3 — Acumulação no back-end.** A progressão percorre os capítulos em ordem de
Número: Ação Direta/Indireta +1; Suspensão Direta/Indireta e Não definido +0.
O arco de cada personagem percorre só os capítulos em que ele aparece:
Neutro 0; Ascensão +1; Declínio -1; Apogeu +2; Queda -2.

**D4 — Ausência vira quebra de segmento.** O eixo X usa todos os capítulos; o
front-end compara o índice do capítulo de cada ponto com o índice do ponto
anterior. Se não for consecutivo, começa um novo segmento. Isso mantém a escala
do livro e mostra o vazio sem inventar pontos.

**D5 — Protagonista primeiro.** A consulta traz o papel de `livro_personagem`.
A ordenação é: `papel = 'Protagonista'` primeiro, depois a primeira aparição e,
no empate, o nome em `to_lowercase`. Personagens sem aparição não entram.

**D6 — SVG inline, sem biblioteca.** Dois componentes puros desenham os
gráficos com `viewBox` e coordenadas calculadas no React. A curva de progressão
usa `polyline`; os arcos usam um `polyline` por segmento contínuo e `circle`
para os marcadores. Eixos, grade e rótulos usam os tokens do design system.

**D7 — Marcadores semânticos.** Azul (`--info`) para Ascensão (raio pequeno) e
Apogeu (raio maior); vermelho (`--danger`) para Declínio (pequeno) e Queda
(maior). Neutro não desenha marcador. As cores acompanham o tema, mas mantêm o
significado azul/vermelho.

**D8 — Tab Panel reutilizado.** `PainelAbas` já entrega `role="tablist"` e
`role="tabpanel"`; a tela usa as abas **Curva de Progressão por Capítulo** e
**Evolução de Personagem**, com a primeira ativa.

**D9 — Verificação.** Testes Rust cobrem a progressão, os deltas do arco, a
ordem dos personagens, a quebra de ausência (pelo índice devolvido), os estados
vazios e o livro inexistente. O `verificar-rf016.mjs` dirige o app real e mede
as duas abas, os eixos, a linha, os marcadores, a ordem e os estados vazios.

## Risks / Trade-offs

- **Muitos capítulos** → o eixo X pode ficar denso; os rótulos são reduzidos a
  intervalos quando necessário, mas a linha continua com todos os pontos.
- **Personagem só com Neutro** → o gráfico aparece com linha horizontal e sem
  marcador; isso é correto, mas o escritor pode estranhar. A legenda explica.
- **Escala acumulada** → um Apogeu vale +2 e pode dominar a escala visual; o
  eixo Y é ajustado ao menor e ao maior valor de cada personagem.
- **Sem migração** → nenhum dado antigo é tocado; se o RF015 mudar, o gráfico
  acompanha automaticamente.

## Migration Plan

1. `grafico.rs` + testes.
2. Comando `dados_graficos_livro` no `invoke_handler`.
3. API e componentes de gráfico; roteamento e estilos.
4. Verificadores e documentação; nenhuma migração a aplicar.

## Open Questions

Nenhuma. As decisões de eixo, ausência, status e ordem foram confirmadas com o
usuário em 28/10/2026.
