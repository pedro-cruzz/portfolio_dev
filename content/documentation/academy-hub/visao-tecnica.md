# Academy Hub — visão técnica

## Problema e solução observada

O projeto reúne grupos acadêmicos, disciplinas, trabalhos, tarefas e mensagens. O frontend React usa um cliente de API; o backend Django REST expõe recursos e limita as consultas às equipes das quais o usuário participa.

![Fluxo de componentes do Academy Hub](/docs/academy-hub/arquitetura.svg)

## Requisitos funcionais

| ID | Comportamento no código | Evidência |
| --- | --- | --- |
| RF-01 | Registrar, autenticar, renovar e encerrar sessão. | [URLs de autenticação](https://github.com/pedro-cruzz/academy-hub/blob/main/core/urls.py) · [cliente](https://github.com/pedro-cruzz/academy-hub/blob/main/frontend/src/api.js) |
| RF-02 | Criar e administrar equipes, membros e convites. | [ViewSets](https://github.com/pedro-cruzz/academy-hub/blob/main/core/views.py) · [modelos](https://github.com/pedro-cruzz/academy-hub/blob/main/core/models.py) |
| RF-03 | Organizar disciplinas, trabalhos, tarefas, reuniões e artefatos por equipe. | [Rotas REST](https://github.com/pedro-cruzz/academy-hub/blob/main/core/urls.py) · [modelos](https://github.com/pedro-cruzz/academy-hub/blob/main/core/models.py) |
| RF-04 | Exibir dashboard, projetos, tarefas, calendário e mensagens no frontend. | [Páginas](https://github.com/pedro-cruzz/academy-hub/tree/main/frontend/src/aplicativo/pages) |

## Requisitos não funcionais

| ID | Qualidade observada | Limite |
| --- | --- | --- |
| RNF-01 | ViewSets filtram registros pelas equipes ativas do usuário e verificam liderança em ações específicas. [Views](https://github.com/pedro-cruzz/academy-hub/blob/main/core/views.py) | A cobertura de todas as ações precisa de auditoria específica. |
| RNF-02 | Cliente armazena tokens localmente e tenta renovar acesso expirado. [api.js](https://github.com/pedro-cruzz/academy-hub/blob/main/frontend/src/api.js) | Armazenamento no navegador tem implicações de segurança; não se afirma proteção completa. |
| RNF-03 | Backend inclui testes. [core/tests.py](https://github.com/pedro-cruzz/academy-hub/blob/main/core/tests.py) | Não há resultado de execução registrado neste documento. |

## Decisão técnica que o código mostra

O escopo por participação ativa é uma regra central da API: a interface pode listar muitos recursos, mas o servidor define quais pertencem ao usuário. Essa separação está em [views.py](https://github.com/pedro-cruzz/academy-hub/blob/main/core/views.py). Para o case pessoal, faltam autoria, desafio concreto e resultado observado.
