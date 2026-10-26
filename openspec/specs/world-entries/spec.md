# world-entries Specification

## Purpose
TBD - created by archiving change rf008-entradas-mundo. Update Purpose after archive.
## Requirements
### Requirement: Entradas do Mundo vinculadas a um mundo global
O sistema SHALL permitir cadastrar entradas vinculadas a um **Mundo global** (RF007), organizadas por tipo: **Localidades**, **Raças e Povos**, **Artefatos**, **Armas**, **Eventos** e **Sistemas**. Cada entrada pertence obrigatoriamente a um `mundo_id` e NÃO existe de forma global compartilhada entre mundos.

#### Scenario: RF008-CA001 - Entradas pertencem ao mundo
- **WHEN** uma entrada for criada ou consultada
- **THEN** ela SHALL estar vinculada a exatamente um `mundo_id` válido de `mundo_global`
- **AND** não SHALL existir mecanismo de compartilhamento global entre mundos neste requisito.

### Requirement: Abas de entradas na tela de detalhe do Mundo
Na tela `TelaMundo`, após as abas **Dados gerais** e **Imagem do mundo**, o sistema SHALL exibir as abas **Localidades**, **Raças e Povos**, **Artefatos**, **Armas**, **Eventos** e **Sistemas**, no mesmo padrão visual das abas já existentes.

#### Scenario: RF008-CA002 - Abas adicionadas
- **WHEN** o escritor abrir a tela de detalhe de um Mundo
- **THEN** as seis abas de entradas SHALL aparecer após as abas já existentes
- **AND** a navegação entre abas SHALL seguir o padrão já utilizado.

### Requirement: Listagem em tabela com paginação e ação Editar
Cada aba de sub-entidade SHALL exibir uma tabela com os itens cadastrados para aquele mundo, contendo pelo menos o **Nome** e as colunas mais relevantes. A tabela SHALL ter **paginação**. SHALL existir o botão **Novo(a) <entidade>** para abrir a janela de inclusão/edição, e ação **Editar** por item.

#### Scenario: RF008-CA003 - Tabela com paginação e Editar
- **WHEN** o escritor acessar uma aba de entrada com itens cadastrados
- **THEN** os itens SHALL ser exibidos em tabela com paginação
- **AND** SHALL existir ação **Editar** por item
- **AND** SHALL existir o botão **Novo(a) <entidade>**.

### Requirement: Janela responsiva para inclusão e edição
A inclusão e edição de qualquer entrada SHALL ocorrer em **janela responsiva (modal/diálogo)** com botões **Salvar** e **Cancelar**, rolagem interna quando necessário, validação de campos obrigatórios e adaptação ao tamanho da tela.

#### Scenario: RF008-CA004 - Janela responsiva
- **WHEN** o escritor clicar em **Novo(a) <entidade>** ou em **Editar**
- **THEN** uma janela responsiva SHALL ser aberta com os campos da sub-entidade
- **AND** SHALL conter botões **Salvar** e **Cancelar**
- **AND** SHALL ter rolagem interna quando o conteúdo não couber
- **AND** SHALL validar os campos obrigatórios ao salvar.

### Requirement: Mundo deve estar salvo para criar ou editar entradas
Para criar ou editar qualquer entrada, o **Mundo** SHALL estar salvo no banco. Enquanto o mundo não estiver salvo, os botões de inclusão SHALL ficar desabilitados com aviso orientativo.

#### Scenario: RF008-CA005 - Botões desabilitados enquanto não salvo
- **WHEN** a tela estiver aberta para um **Novo mundo** ainda não salvo
- **THEN** os botões de inclusão nas abas de entradas SHALL ficar desabilitados
- **AND** SHALL ser exibido um aviso orientativo informando que o mundo precisa estar salvo.

### Requirement: Nome obrigatório em todas as sub-entidades
O campo **Nome** SHALL ser obrigatório em **Localidades**, **Raças e Povos**, **Artefatos**, **Armas**, **Eventos** e **Sistemas**. Não SHALL ser possível salvar sem Nome.

#### Scenario: RF008-CA006 - Nome obrigatório
- **WHEN** o escritor tentar salvar uma entrada sem preencher o **Nome**
- **THEN** a aplicação SHALL impedir a gravação
- **AND** SHALL informar que o **Nome** é obrigatório.

### Requirement: Campos específicos por sub-entidade
O sistema SHALL aceitar os campos definidos para cada sub-entidade: **Localidades** (Nome obrigatório, Descrição, História); **Raças e Povos** (Nome obrigatório, Descrição, Características, Forças, Fraquezas); **Artefatos** (Nome obrigatório, Descrição, Poder, Funcionamento, Limitações, Custo de aquisição); **Armas** (Nome obrigatório, Descrição, Dano, Funcionamento, Limitações, Custo de aquisição); **Eventos** (Nome obrigatório, Descrição, Data **texto livre**, Impacto); **Sistemas** (Nome obrigatório, Descrição, Tipo em lista fechada, Regras).

#### Scenario: RF008-CA007 - Campos por entidade
- **WHEN** forem exibidos os formulários de cada sub-entidade
- **THEN** SHALL aparecer os campos conforme o requisito
- **AND** o campo **Data** de **Evento** SHALL aceitar **texto livre**
- **AND** o campo **Tipo** de **Sistema** SHALL ter os valores **Magia**, **Energia** ou **Combate**.

### Requirement: Regras ordenadas para Sistemas
Para **Sistemas**, SHALL existir uma lista de **Regras** gerenciável. Cada regra SHALL ter descrição obrigatória. O escritor SHALL poder **adicionar, remover e reordenar** as regras, e a **ordem** SHALL ser preservada.

#### Scenario: RF008-CA008 - Gerenciar regras ordenadas
- **WHEN** o escritor editar ou criar um **Sistema**
- **THEN** a janela SHALL permitir adicionar, remover e reordenar regras
- **AND** cada regra SHALL possuir descrição obrigatória
- **AND** a ordem das regras SHALL ser preservada ao salvar e ao exibir.

### Requirement: Migração v5 aditiva
O esquema SHALL ser evoluído por **migração versionada aditiva (v5)**, criando as tabelas das seis sub-entidades e `sistema_regra`, sem recriar nem apagar dados dos requisitos anteriores.

#### Scenario: RF008-CA009 - Migração aditiva sem perda
- **WHEN** um banco existente (RF001–RF007) for aberto
- **THEN** a migração v5 SHALL ser aplicada
- **AND** os dados existentes SHALL permanecer intactos
- **AND** as novas tabelas SHALL estar disponíveis.

### Requirement: Sem exclusão e sem associação a livros/capítulos neste requisito
A **exclusão** de entradas SHALL NOT fazer parte deste requisito. A **associação** dessas entradas a capítulos ou a utilização em livros SHALL NOT fazer parte deste requisito.

#### Scenario: RF008-CA010 - Escopo restrito
- **WHEN** forem implementadas as funcionalidades deste requisito
- **THEN** NÃO SHALL existir comando de exclusão de entradas
- **AND** NÃO SHALL existir associação entre entradas e livros/capítulos neste requisito.

