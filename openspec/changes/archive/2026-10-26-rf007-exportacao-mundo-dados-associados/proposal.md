# Proposal: RF007 — Exportação do Mundo com dados associados

## Why
O Documento do Mundo exportado em PDF estava saindo apenas com os dados básicos
e a imagem, mesmo depois de o escritor cadastrar entradas do mundo e facções. O
PDF precisa representar todo o planejamento informado, não uma parte dele.

## What Changes
- O comando de montagem do documento passa a agregar o Mundo, todas as entradas
  das seis categorias (com todos os campos e as regras dos Sistemas) e todas as
  facções, com os personagens associados e os respectivos papéis.
- O front-end do documento renderiza seções de **Entradas do Mundo** e
  **Facções**, omitindo categorias vazias e campos vazios.
- A exportação continua usando o `PrintToPdf` do WebView2, sem biblioteca nova
  de PDF.
- A verificação automatizada passa a conferir o agregado e o documento
  renderizado, além do PDF gerado.
