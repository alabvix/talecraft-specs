## MODIFIED Requirements

### Requirement: Métricas da biblioteca de livros
O sistema SHALL calcular as métricas da tela Meus Livros a partir do que está **associado aos livros**: **Livros na biblioteca** conta os livros cadastrados, **Personagens** conta somente personagens com vínculo em pelo menos um livro, **Personagens · N em 2+ livros** conta somente personagens com vínculo em dois ou mais livros, **Capítulos planejados** conta somente capítulos dos livros e **Entradas de worldbuilding** conta somente entradas dos mundos associados a livros; sem vínculo personagem–livro e sem associação livro–mundo, **Personagens**, **0 em 2+ livros** e **Entradas de worldbuilding** exibem **0** (RF011-CA018, RF014-RN011, RF014-CA014).

#### Scenario: Métricas sem vínculos com livros
- **GIVEN** existem personagens globais e entradas de mundo cadastrados, mas nenhum vínculo personagem–livro e nenhuma associação livro–mundo
- **WHEN** o escritor abre Meus Livros
- **THEN** **Livros na biblioteca** reflete os livros, e **Personagens**, **0 em 2+ livros**, **Capítulos planejados** e **Entradas de worldbuilding** exibem **0** (RF011-CA018)

#### Scenario: Métricas com livros e sem entidades associadas
- **GIVEN** existem livros cadastrados
- **WHEN** o escritor abre Meus Livros
- **THEN** **Livros na biblioteca** conta os livros e as demais métricas continuam **0** enquanto os vínculos não existirem (RF011-CA018)

#### Scenario: Métricas sem livros
- **GIVEN** não há livros cadastrados
- **WHEN** o escritor abre Meus Livros
- **THEN** as quatro métricas exibem **0** e a listagem mostra o estado vazio (RF010-CA004, RF011-CA018)

#### Scenario: Métricas contam os vínculos reais
- **GIVEN** existem personagens associados a livros, inclusive um personagem presente em dois livros, e existem personagens globais sem vínculo
- **WHEN** o escritor abre Meus Livros
- **THEN** **Personagens** conta somente os personagens com ao menos um vínculo, **Personagens · N em 2+ livros** conta somente o personagem presente em dois ou mais livros e os personagens sem vínculo não entram em nenhuma das duas métricas (RF014-RN011, RF014-CA014)

#### Scenario: Métricas após associar personagens
- **GIVEN** o escritor acabou de associar personagens ao livro na seção **Personagens**
- **WHEN** volta para Meus Livros
- **THEN** as métricas **Personagens** e **Personagens · N em 2+ livros** refletem os vínculos criados (RF014-FL001, RF014-CA014)
