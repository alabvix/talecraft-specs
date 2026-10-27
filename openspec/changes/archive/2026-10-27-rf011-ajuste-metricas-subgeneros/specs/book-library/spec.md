## MODIFIED Requirements

### Requirement: Métricas da biblioteca de livros
O sistema SHALL calcular as métricas da tela Meus Livros a partir do que está **associado aos livros**: **Livros na biblioteca** conta os livros cadastrados, **Personagens** conta somente personagens associados a livros, **Personagens · N em 2+ livros** conta somente personagens com vínculo em dois ou mais livros, **Capítulos planejados** conta somente capítulos dos livros e **Entradas de worldbuilding** conta somente entradas dos mundos associados a livros; sem vínculo personagem–livro e sem associação livro–mundo, **Personagens**, **0 em 2+ livros** e **Entradas de worldbuilding** exibem **0** (RF011-CA018).

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
