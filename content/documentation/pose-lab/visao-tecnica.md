# Pose Lab — visão técnica

## Problema e solução observada

O atlas permite estudar relações espaciais entre estruturas anatômicas. A interface seleciona um sistema, carrega seu catálogo e modelo 3D e oferece busca, filtros e ações sobre as malhas. É uma ferramenta educacional; o código não demonstra validação clínica nem autoria dos modelos 3D.

![Fluxo de componentes do Pose Lab](/docs/pose-lab/arquitetura.svg)

## Requisitos funcionais

| ID | Comportamento no código | Evidência |
| --- | --- | --- |
| RF-01 | Escolher um sistema disponível e carregar catálogo e GLB correspondentes. | [Sistemas](https://github.com/pedro-cruzz/esqueleto-3d/blob/main/src/data/systems.js) · [carregador](https://github.com/pedro-cruzz/esqueleto-3d/blob/main/src/core/catalog-loader.js) · [visualizador](https://github.com/pedro-cruzz/esqueleto-3d/blob/main/src/core/app.js) |
| RF-02 | Associar malhas do modelo a metadados de nome, tipo, região e lado. | [Visualizador](https://github.com/pedro-cruzz/esqueleto-3d/blob/main/src/core/app.js) · [estudo](https://github.com/pedro-cruzz/esqueleto-3d/blob/main/src/components/study.js) |
| RF-03 | Buscar, filtrar, selecionar, isolar, ocultar, separar e restaurar estruturas. | [Estudo](https://github.com/pedro-cruzz/esqueleto-3d/blob/main/src/components/study.js) · [lógica de filtros e separação](https://github.com/pedro-cruzz/esqueleto-3d/blob/main/src/logic/study-logic.js) |
| RF-04 | Ajustar a pose esquelética dentro dos limites definidos para cada controle. | [Controles de movimento](https://github.com/pedro-cruzz/esqueleto-3d/blob/main/src/core/app.js) |

## Requisitos não funcionais

| ID | Qualidade observada | Limite |
| --- | --- | --- |
| RNF-01 | Catálogo do sistema é solicitado antes do modelo e funções de filtro são separadas do renderizador. [Código](https://github.com/pedro-cruzz/esqueleto-3d/blob/main/src/core/catalog-loader.js) · [testes](https://github.com/pedro-cruzz/esqueleto-3d/blob/main/tests/study-logic.test.cjs) | Não há meta de tempo de carregamento. |
| RNF-02 | Interface móvel e service worker aparecem no projeto. [Controles](https://github.com/pedro-cruzz/esqueleto-3d/blob/main/src/components/mobile-controls.js) · [registro](https://github.com/pedro-cruzz/esqueleto-3d/blob/main/src/core/register-sw.js) | Uso offline depende dos recursos presentes no cache. |
| RNF-03 | A renderização é solicitada quando o estado muda. [requestRender](https://github.com/pedro-cruzz/esqueleto-3d/blob/main/src/core/app.js) | Não há medição de FPS neste documento. |

## Decisão técnica que o código mostra

O catálogo mantém metadados separados das malhas, permitindo apresentar nomes legíveis e filtros sem depender diretamente do nome exibido no arquivo 3D. O [visualizador](https://github.com/pedro-cruzz/esqueleto-3d/blob/main/src/core/app.js) cria a associação e a [camada de estudo](https://github.com/pedro-cruzz/esqueleto-3d/blob/main/src/components/study.js) usa esses dados. A motivação pessoal por trás da decisão e o resultado observado ainda precisam ser confirmados por Pedro.

## O que falta para o case pessoal

Confirmar quais controles, catálogos e modelos Pedro desenvolveu ou adaptou, o maior problema encontrado, a decisão que tomou e como verificou o resultado. O [README](README.md) traz execução e navegação completas.
