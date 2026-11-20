## 1. Banco e domínio

- [x] Acrescentar a migração aditiva **v21** (`largura`/`altura` em `mapa_localidade` e tabela `mapa_porta`).
- [x] Criar os códigos `ComodoMapaInvalido` e `PortaMapaInvalida`.
- [x] Estender `LocalidadeNoMapa`, `PortaMapa`, `Mapa` e `ListasMapa` no domínio.
- [x] Carregar e gravar tamanhos e portas em `obter_mapa`/`salvar_mapa`.
- [x] Validar cômodo (tamanho e plano) e porta (cômodo, lado, posição, largura e escala).
- [x] Testes Rust do domínio, da cascata e da migração v20 → v21.

## 2. Editor e renderizador

- [x] Desenhar cômodos retangulares com nome central e portas no `MapaCanvas`.
- [x] Adicionar as oito alças, o arraste do corpo e o arraste da porta.
- [x] Trocar **Polígono**/**Ligação** por **Porta** na toolbar de Prédio/Casa.
- [x] Criar a porta pela parede mais próxima e editar lado/largura no painel.
- [x] Manter polígonos e ligações legados visíveis e apagáveis.
- [x] Garantir que mover/redimensionar/remover o cômodo atualiza ou remove as portas.
- [x] Avisar e limpar as portas ao trocar o tipo para fora de Prédio/Casa.
- [x] Reaproveitar o desenho no livro e no PDF, com paleta de impressão.
- [x] Trocar a planta baixa decorativa de Prédio/Casa por uma grade fixa.

## 3. Verificação

- [x] Estender `verificar-rf019.mjs` para cômodos, alças, porta, salvar/reabrir, livro e PDF.
- [x] Rodar `npm run build`, `npm run verificar:rust` e `verificar-rf019.mjs`.
- [x] Atualizar o `AGENTS.md` do app e o ponto de parada.

## 4. Fechamento

- [ ] Validar com o usuário.
- [ ] Arquivar o change em `openspec/changes/archive/`.
