## Why

O rótulo da aba de gráfico ficou longo e o detalhe do personagem no livro não
oferece uma leitura tabular dos eventos. O escritor precisa consultar capítulo,
tipo do evento e motivo sem abrir cada capítulo.

## What Changes

- A aba **Gráfico de Evolução do Personagem no Livro** passa a se chamar apenas
  **Gráfico de Evolução**.
- Nova aba **Eventos**, com a tabela **Capítulo**, **Tipo Evento** e **Motivo do
  evento**, listando somente Ascensão, Declínio, Apogeu e Queda.
- A tabela pagina de cinco em cinco, com **Anterior** e **Próxima**.
- O comando `dados_graficos_livro` passa a devolver o `motivo` de cada ponto do
  arco; nenhum comando ou migração novo.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `book-workspace`: a aba do gráfico é renomeada e a aba **Eventos** é
  acrescentada ao detalhe do personagem no livro.

## Impact

- **Requisito coberto:** RF014 (RF014-TL004, RF014-RN017, RF014-CA021,
  RF014-CA024).
- **Fora do escopo:** alterar o cálculo dos gráficos, a gravação dos capítulos ou
  a aba do gráfico.
- **Banco:** nenhuma migração; o esquema continua na v16.
- **Back-end:** `grafico.rs` inclui `motivo` em `PontoArco`; nenhum comando novo.
- **Front-end:** `DetalhePersonagemLivro.jsx`.
- **Verificação:** `verificar-rf014.mjs` cobre as quatro abas, a tabela de
  eventos e a paginação 5+1.
