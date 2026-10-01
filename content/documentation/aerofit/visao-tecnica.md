# AeroFit — visão técnica

## Problema e solução observada

O sistema organiza criação de rotinas, registro de sessões e acompanhamento de progresso. O código Django separa modelos de treino, serviços de cálculo e views que apresentam o plano ao usuário.

![Fluxo de componentes do AeroFit](/docs/aerofit/arquitetura.svg)

## Requisitos funcionais

| ID | Comportamento no código | Evidência |
| --- | --- | --- |
| RF-01 | Usuário pode criar conta, entrar e acessar painel e treinos. | [URLs](https://github.com/pedro-cruzz/AeroFit/blob/main/dashboard/urls.py) · [views](https://github.com/pedro-cruzz/AeroFit/blob/main/dashboard/views.py) |
| RF-02 | Montar, editar, consultar e excluir rotinas com exercícios e dias de treino. | [Views](https://github.com/pedro-cruzz/AeroFit/blob/main/dashboard/views.py) · [serviço de montagem](https://github.com/pedro-cruzz/AeroFit/blob/main/dashboard/services.py) · [modelos](https://github.com/pedro-cruzz/AeroFit/blob/main/dashboard/models.py) |
| RF-03 | Registrar sessões e acompanhar histórico e progresso do usuário. | [Modelos de sessão e progresso](https://github.com/pedro-cruzz/AeroFit/blob/main/dashboard/models.py) · [views de progresso](https://github.com/pedro-cruzz/AeroFit/blob/main/dashboard/views.py) |
| RF-04 | Calcular estimativas de duração, calorias e XP a partir de regras no serviço. | [services.py](https://github.com/pedro-cruzz/AeroFit/blob/main/dashboard/services.py) |

## Requisitos não funcionais

| ID | Qualidade observada | Limite |
| --- | --- | --- |
| RNF-01 | Regras de montagem e pontuação estão em funções separadas das views. [Serviços](https://github.com/pedro-cruzz/AeroFit/blob/main/dashboard/services.py) | Calorias e duração são estimativas, não medições físicas. |
| RNF-02 | Estrutura de dados evolui por migrações Django. [Migrações](https://github.com/pedro-cruzz/AeroFit/tree/main/dashboard/migrations) | Não há confirmação de implantação de cada migração em produção. |
| RNF-03 | Há testes do app. [dashboard/tests.py](https://github.com/pedro-cruzz/AeroFit/blob/main/dashboard/tests.py) | Esta documentação não certifica a última execução nem cobertura completa. |

## Decisão técnica que o código mostra

As rotinas e sessões são entidades distintas: o plano pode ser reutilizado, enquanto cada execução guarda dados próprios. Isso aparece em [models.py](https://github.com/pedro-cruzz/AeroFit/blob/main/dashboard/models.py). O motivo da escolha, a contribuição de Pedro e resultados de uso precisam ser confirmados.
