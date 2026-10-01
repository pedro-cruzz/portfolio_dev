# Ctrl+Play — visão técnica

## Problema e solução observada

O aplicativo Flutter organiza descoberta de filmes, listas pessoais e resenhas. Ele consulta o TMDb para dados de conteúdo e usa SQLite local para guardar informações do usuário. O [README](README.md) menciona autenticação e estatísticas como futuras; o código analisado não as apresenta como funcionalidades prontas.

![Fluxo de componentes do Ctrl+Play](/docs/ctrl-play/arquitetura.svg)

## Requisitos funcionais

| ID | Comportamento no código | Evidência |
| --- | --- | --- |
| RF-01 | Exibir filmes populares consultados pela API TMDb. | [Serviço TMDb](https://github.com/pedro-cruzz/Ctrl-Play/blob/main/app_ctrlplay/lib/services/tmdb_service.dart) · [home](https://github.com/pedro-cruzz/Ctrl-Play/blob/main/app_ctrlplay/lib/views/home/home_page.dart) |
| RF-02 | Abrir detalhes, pesquisar títulos e navegar entre telas do aplicativo. | [Rotas](https://github.com/pedro-cruzz/Ctrl-Play/blob/main/app_ctrlplay/lib/routes/app_routes.dart) · [busca](https://github.com/pedro-cruzz/Ctrl-Play/blob/main/app_ctrlplay/lib/views/search/search_results_page.dart) |
| RF-03 | Marcar conteúdo como “quero assistir” ou “assistido” e persistir a escolha no banco local. | [Repositório de favoritos](https://github.com/pedro-cruzz/Ctrl-Play/blob/main/app_ctrlplay/lib/repositories/favorites_repository.dart) · [SQLite](https://github.com/pedro-cruzz/Ctrl-Play/blob/main/app_ctrlplay/lib/core/database/db_helper.dart) |
| RF-04 | Criar, editar e apagar resenhas/notas locais. | [Repositório de resenhas](https://github.com/pedro-cruzz/Ctrl-Play/blob/main/app_ctrlplay/lib/repositories/reviews_repository.dart) · [SQLite](https://github.com/pedro-cruzz/Ctrl-Play/blob/main/app_ctrlplay/lib/core/database/db_helper.dart) |

## Requisitos não funcionais

| ID | Qualidade observada | Limite |
| --- | --- | --- |
| RNF-01 | Dados pessoais de listas e resenhas são persistidos em SQLite no dispositivo. [DBHelper](https://github.com/pedro-cruzz/Ctrl-Play/blob/main/app_ctrlplay/lib/core/database/db_helper.dart) | Não há sincronização entre dispositivos demonstrada. |
| RNF-02 | Serviço remoto, repositórios locais e views ficam em módulos separados. [TMDb](https://github.com/pedro-cruzz/Ctrl-Play/blob/main/app_ctrlplay/lib/services/tmdb_service.dart) · [repositórios](https://github.com/pedro-cruzz/Ctrl-Play/tree/main/app_ctrlplay/lib/repositories) | A chave de API aparece no código cliente; uma distribuição pública exigiria revisão dessa exposição. |
| RNF-03 | O repositório inclui testes Flutter. [Testes](https://github.com/pedro-cruzz/Ctrl-Play/tree/main/app_ctrlplay/test) | Não há resultado recente de execução registrado aqui. |

## Decisão técnica que o código mostra

Separar dados de catálogo remoto dos dados pessoais locais permite que listas e resenhas tenham persistência própria. A justificativa, a participação de Pedro e os resultados de uso ainda precisam ser confirmados para compor o case pessoal.
