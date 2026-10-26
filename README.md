# TaleCraft — Especificações

Repositório de **requisitos, specs OpenSpec, protótipo visual e conceitos** do
TaleCraft.

O código executável (Tauri + Rust + React) fica no repositório irmão
[`talecraft-app`](https://github.com/alabvix/talecraft-app). Este repositório não
é compilado pelo build do aplicativo.

## Conteúdo

```text
documents/talecraft.md     requisitos RF001–RF009 e stack
openspec/                  config, specs consolidadas e changes/archive
prototype/                 referência visual HTML + CSS
concepts/                  imagens de conceito
archive/                   material antigo (prototype.rar)
```

## Fluxo OpenSpec

```powershell
openspec list
openspec status --change <change>
openspec validate --all
openspec archive <change> --yes
```

As specs consolidadas em `openspec/specs/` são a verdade do produto. O
`openspec/changes/archive/` guarda o histórico dos requisitos concluídos.

## Repositório do aplicativo

```text
https://github.com/alabvix/talecraft-app
```

Ao aprovar uma mudança que exige código, abra o PR correspondente no
`talecraft-app` e cite esta mudança/spec.

## CI

`.github/workflows/validar-specs.yml` roda `openspec validate --all` em cada
push/PR.
