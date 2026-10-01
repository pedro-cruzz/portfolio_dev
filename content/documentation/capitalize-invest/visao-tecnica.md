# Capitalize Invest — visão técnica

## Problema e solução observada

O projeto é um gerenciador simples de registros de investimento no navegador. O usuário preenche um modal, vê os itens em uma tabela e pode editar ou excluir. Os dados ficam em `localStorage`; não há servidor, conta ou integração com corretora no código analisado.

![Fluxo de componentes do Capitalize Invest](/docs/capitalize-invest/arquitetura.svg)

## Requisitos funcionais

| ID | Comportamento no código | Evidência |
| --- | --- | --- |
| RF-01 | Cadastrar nome, tipo, valor e data de um investimento pelo modal. | [HTML](https://github.com/pedro-cruzz/Investiment_Front-end/blob/main/index.html) · [JavaScript](https://github.com/pedro-cruzz/Investiment_Front-end/blob/main/scripts/scripts.js) |
| RF-02 | Listar, editar e excluir registros, com confirmação antes da exclusão. | [scripts.js](https://github.com/pedro-cruzz/Investiment_Front-end/blob/main/scripts/scripts.js) |
| RF-03 | Persistir e recuperar a lista após recarregar a página. | [Uso de localStorage](https://github.com/pedro-cruzz/Investiment_Front-end/blob/main/scripts/scripts.js) |

## Requisitos não funcionais

| ID | Qualidade observada | Limite |
| --- | --- | --- |
| RNF-01 | Campos obrigatórios, valor positivo e formato de data são verificados antes de salvar. [scripts.js](https://github.com/pedro-cruzz/Investiment_Front-end/blob/main/scripts/scripts.js) | A checagem de formato não valida todos os dias possíveis do calendário. |
| RNF-02 | Executa inteiramente no navegador, sem dependência de API para os registros. [index.html](https://github.com/pedro-cruzz/Investiment_Front-end/blob/main/index.html) · [scripts.js](https://github.com/pedro-cruzz/Investiment_Front-end/blob/main/scripts/scripts.js) | Os dados pertencem àquele navegador; não há backup ou sincronização. |

## Decisão técnica que o código mostra

`localStorage` torna o protótipo utilizável sem backend e simplifica a demonstração do fluxo de cadastro. Para o case, falta confirmar a motivação de Pedro para essa escolha, o problema que resolveu e o que aprendeu. O [README](README.md) explica o uso básico.
