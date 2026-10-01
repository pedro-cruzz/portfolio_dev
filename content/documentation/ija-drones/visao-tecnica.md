# IJA Drones — visão técnica

## Problema e solução observada

A landing page apresenta soluções de campo e software em uma mesma narrativa. O visitante pode explorar abas de soluções e uma **demonstração visual** da plataforma, então enviar uma mensagem pelo formulário. As telas de sistema nesta página são um mockup da apresentação comercial; não demonstram operações reais no backend do IJA System.

![Fluxo de componentes do site IJA Drones](/docs/ija-drones/arquitetura.svg)

## Requisitos funcionais

| ID | Comportamento no código | Evidência |
| --- | --- | --- |
| RF-01 | Navegar pelas soluções e alternar o conteúdo por abas. | [Conteúdo](https://github.com/pedro-cruzz/ija-drones-page/blob/main/src/content/site.ts) · [abas](https://github.com/pedro-cruzz/ija-drones-page/blob/main/src/components/service-tabs.tsx) |
| RF-02 | Explorar telas demonstrativas da plataforma na própria página. | [Mockup](https://github.com/pedro-cruzz/ija-drones-page/blob/main/src/components/system-mockup.tsx) · [telas e dados](https://github.com/pedro-cruzz/ija-drones-page/tree/main/src/components/system) |
| RF-03 | Preencher contato, enviar à rota `/api/send` e receber feedback de sucesso/erro. | [Formulário](https://github.com/pedro-cruzz/ija-drones-page/blob/main/src/components/contact-form.tsx) · [rota](https://github.com/pedro-cruzz/ija-drones-page/blob/main/src/app/api/send/route.ts) |
| RF-04 | Registrar service worker quando o navegador oferece suporte. | [Registro PWA](https://github.com/pedro-cruzz/ija-drones-page/blob/main/src/components/pwa-registration.tsx) |

## Requisitos não funcionais

| ID | Qualidade observada | Limite |
| --- | --- | --- |
| RNF-01 | Conteúdo de soluções fica em uma estrutura separada dos componentes visuais. [site.ts](https://github.com/pedro-cruzz/ija-drones-page/blob/main/src/content/site.ts) | A estrutura não valida as afirmações comerciais. |
| RNF-02 | Formulário mostra estado de envio e mensagens acessíveis (`role=status`/`alert`). [Formulário](https://github.com/pedro-cruzz/ija-drones-page/blob/main/src/components/contact-form.tsx) | Não equivale a uma auditoria completa de acessibilidade. |
| RNF-03 | Os dados da demonstração visual estão no front-end. [Componentes do mockup](https://github.com/pedro-cruzz/ija-drones-page/tree/main/src/components/system) | O mockup não deve ser interpretado como integração ao sistema operacional. |

## Decisão técnica que o código mostra

Separar o conteúdo em `site.ts` e encapsular a demonstração em componentes permite ajustar a mensagem comercial sem misturá-la ao formulário. A justificativa e o impacto dessa escolha dependem do relato de Pedro. O [README](README.md) contém instruções de execução.
