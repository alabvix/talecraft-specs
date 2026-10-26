## ADDED Requirements

### Requirement: Facções vinculadas ao Mundo
O sistema SHALL permitir cadastrar **Facções** vinculadas a um **Mundo global** (RF007), com os campos **Nome** (obrigatório), **Tipo** (lista fechada), **Ideologia/Objetivos**, **Líder(es)**, **Base/Território**, **Descrição** e **História**. Cada facção pertence obrigatoriamente a um `mundo_id`.

#### Scenario: RF009-CA002 - Cadastro de Facção
- **WHEN** o escritor acessar a aba **Facções** em um Mundo salvo e criar uma nova facção preenchendo os campos
- **THEN** o sistema SHALL salvar a facção com **Nome** obrigatório e **Tipo** da lista fechada (**Política**, **Religiosa**, **Militar**, **Comercial/Empresa**, **Seita**, **Criminosa** ou **Outra**)
- **AND** a facção SHALL aparecer na tabela da aba **Facções**

#### Scenario: RF009-RN001 - Mundo deve estar salvo para gerenciar facções
- **WHEN** o Mundo ainda não estiver salvo
- **THEN** os botões de inclusão na aba **Facções** SHALL ficar desabilitados com aviso orientativo

### Requirement: Aba de Facções no detalhe do Mundo
Na tela `TelaMundo`, após as abas já existentes, o sistema SHALL exibir a aba **Facções** com listagem em tabela, paginação e ação **Editar**.

#### Scenario: RF009-CA001 - Aba Facções presente
- **WHEN** o escritor abrir a tela de detalhe de um Mundo salvo
- **THEN** a aba **Facções** SHALL estar disponível
- **AND** a listagem SHALL exibir a tabela com paginação e ação **Editar**

### Requirement: Associação Personagem–Facção com papel
O sistema SHALL permitir associar **Personagens** a **Facções** com papel **Líder** ou **Membro**. Um personagem pode pertencer a mais de uma facção. Não SHALL haver duplicidade da mesma associação (mesmo personagem e mesma facção).

#### Scenario: RF009-CA003 - Associar personagem a Facção
- **WHEN** o escritor, a partir da tela de detalhe do Personagem, adicionar uma Facção e definir o papel **Líder** ou **Membro**
- **THEN** a associação SHALL ser criada e refletida no cadastro do Personagem

#### Scenario: RF009-CA004 - Personagem pode pertencer a várias facções
- **WHEN** o escritor associar o mesmo Personagem a diferentes Facções
- **THEN** todas as associações SHALL ser exibidas no detalhe do Personagem com seus respectivos papéis

#### Scenario: RF009-RN008 - Sem duplicidade de associação
- **WHEN** o escritor tentar associar o mesmo Personagem à mesma Facção novamente
- **THEN** o sistema SHALL impedir a duplicidade da associação

### Requirement: Gerenciamento de Facções no cadastro do Personagem
Na tela de detalhe do Personagem, o sistema SHALL exibir um quadro/painel para gerenciar as **Facções** do personagem, permitindo adicionar, remover e alterar o papel (**Líder** ou **Membro**).

#### Scenario: RF009-CA005 - Gerenciamento no Personagem
- **WHEN** o escritor abrir o detalhe de um Personagem que possui associações com Facções
- **THEN** o painel SHALL exibir a lista de Facções com o papel de cada associação
- **AND** SHALL ser possível alterar o papel ou remover a associação

#### Scenario: RF009-CA006 - Consistência da associação
- **WHEN** a associação for criada ou alterada a partir do detalhe do Personagem
- **THEN** o vínculo SHALL permanecer consistente e não SHALL haver duplicidade entre Personagem e Facção
