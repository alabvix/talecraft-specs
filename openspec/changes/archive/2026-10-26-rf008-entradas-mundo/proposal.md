## Why

O menu **Worldbuilding** já entrega a entidade **Mundo global** e seus dados básicos (RF007). Falta registrar as **entradas vinculadas ao Mundo**: localidades, raças e povos, artefatos, armas, eventos e sistemas. 

Essas entradas organizam o cenário do mundo dentro da própria ficha do Mundo, reutilizável entre livros. Sem elas, o escritor não consegue detalhar o universo do projeto, ficando restrito apenas aos dados básicos.

Este requisito entrega o cadastro básico das seis sub-entidades, organizadas em abas na tela de detalhe do Mundo, com listagem em tabela, paginação, janela responsiva para inclusão/edição e gerenciamento ordenado de regras para **Sistemas**.

## What Changes

- Cria **seis tabelas** vinculadas a `mundo_id`: `localidade`, `raca_povo`, `artefato`, `arma`, `evento`, `sistema`. Cada uma com **Nome obrigatório** e os campos específicos definidos pelo RF008 (RF008-RN003 a RF008-RN009).
- Cria **`sistema_regra`** com `sistema_id`, `descricao`, `ordem`, chave estrangeira com `ON DELETE CASCADE` e unicidade por `(sistema_id, ordem)` para preservar a ordem das regras (RF008-RN010).
- Evolui o esquema por **migração versionada aditiva (v5)**, sem recriar nem apagar dados dos requisitos anteriores.
- Adiciona **abas de entradas** na tela de detalhe do Mundo: após **Dados gerais** e **Imagem do mundo**, entram **Localidades**, **Raças e Povos**, **Artefatos**, **Armas**, **Eventos** e **Sistemas** (RF008-TL001).
- Cada aba exibe uma **tabela com paginação**, botão **Novo(a) <entidade>** e ação **Editar** por item (RF008-TL002).
- Inclusão/edição acontece em **janela responsiva (modal/diálogo)** com rolagem interna, botões **Salvar/Cancelar** e validação de campos obrigatórios (RF008-TL003).
- Para **Sistema**, a janela permite **adicionar, remover e reordenar** regras, com descrição obrigatória por regra (RF008-FL005, RF008-RN010).
- **Mundo deve estar salvo** para criar/editar entradas; botões ficam desabilitados enquanto não estiver salvo (RF008-RN002).
- **Campo `data`** do Evento é **texto livre** (RF008-RN008).
- **Sem exclusão** de entradas neste requisito (RF008-RN014). Sem associação a livros/capítulos (fora do escopo).
