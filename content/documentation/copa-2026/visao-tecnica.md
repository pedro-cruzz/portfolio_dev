# Copa 2026 — visão técnica

## Problema e solução observada

Uma competição extensa exige navegação clara entre grupos, calendário, seleções e chaveamento. O código organiza essas visões em seções React, combina uma tabela de jogos mantida no projeto com serviços de placar e apresenta estados separados para carregamento e falha de integração.

![Fluxo de componentes do Copa 2026](/docs/copa-2026/arquitetura.svg)

## Requisitos funcionais

| ID | Comportamento no código | Evidência |
| --- | --- | --- |
| RF-01 | Mostrar grupos, jogos, seleções, histórico e chaveamento em visões distintas. | [App](https://github.com/pedro-cruzz/copa-2026/blob/main/src/App.jsx) |
| RF-02 | Filtrar o calendário por busca, grupo e seleção. | [ScheduleSection](https://github.com/pedro-cruzz/copa-2026/blob/main/src/sections/ScheduleSection.jsx) · [dados do torneio](https://github.com/pedro-cruzz/copa-2026/blob/main/src/data/tournament.js) |
| RF-03 | Consultar placares/detalhes ao vivo por serviços externos e exibir estados de carregamento/erro. | [LiveCenterSection](https://github.com/pedro-cruzz/copa-2026/blob/main/src/sections/LiveCenterSection.jsx) · [serviço API Sports](https://github.com/pedro-cruzz/copa-2026/blob/main/src/services/apisports.js) |
| RF-04 | Oferecer aviso de atualização quando o service worker encontrar uma versão nova. | [App e registro PWA](https://github.com/pedro-cruzz/copa-2026/blob/main/src/App.jsx) |

## Requisitos não funcionais

| ID | Qualidade observada | Limite |
| --- | --- | --- |
| RNF-01 | Chaveamento é carregado sob demanda com `lazy`/`Suspense`. [App](https://github.com/pedro-cruzz/copa-2026/blob/main/src/App.jsx) | O ganho em tempo de carregamento não foi medido. |
| RNF-02 | Um error boundary oferece recarga se a interface falhar ao renderizar. [App](https://github.com/pedro-cruzz/copa-2026/blob/main/src/App.jsx) | Isso não cobre falhas de todos os serviços externos. |
| RNF-03 | Dados locais e integrações são separados em `data` e `services`. [Torneio](https://github.com/pedro-cruzz/copa-2026/blob/main/src/data/tournament.js) · [serviço](https://github.com/pedro-cruzz/copa-2026/blob/main/src/services/apisports.js) | Datas e resultados precisam ser conferidos em fonte oficial antes de publicação; não se assume que o repositório esteja sempre atualizado. |

## Decisão técnica que o código mostra

O calendário local permite renderizar e filtrar jogos independentemente da resposta do provedor de placares. Essa divisão aparece em [ScheduleSection](https://github.com/pedro-cruzz/copa-2026/blob/main/src/sections/ScheduleSection.jsx). Falta confirmar se Pedro desenhou essa solução, o problema que encontrou ao integrar dados e o resultado obtido.
