# Oceano Azul — visão técnica

## Problema e solução observada

O site organiza serviços, conteúdo institucional e contato em uma navegação única. O formulário transforma o interesse do visitante em uma mensagem enviada pela rota do servidor; o código separa a experiência visual da validação e entrega do contato.

![Fluxo de componentes do site Oceano Azul](/docs/oceano-azul/arquitetura.svg)

## Requisitos funcionais

| ID | Comportamento no código | Evidência |
| --- | --- | --- |
| RF-01 | Navegar pelas seções de serviços, cursos, apresentação e contato em layouts responsivos. | [Página](https://github.com/pedro-cruzz/Oceano-azul-page/blob/main/app/components/oceano/OceanoLandingPage.tsx) · [navegação](https://github.com/pedro-cruzz/Oceano-azul-page/blob/main/app/components/oceano/OceanoNavbar.tsx) |
| RF-02 | Coletar nome, email, interesse e mensagem com feedback de sucesso/erro ao visitante. | [Formulário](https://github.com/pedro-cruzz/Oceano-azul-page/blob/main/app/components/shared/lead-form.tsx) |
| RF-03 | Validar o contato no servidor, selecionar destinatário configurado e enviar email pelo Resend. | [Rota de contato](https://github.com/pedro-cruzz/Oceano-azul-page/blob/main/app/api/contact/route.ts) · [template](https://github.com/pedro-cruzz/Oceano-azul-page/blob/main/app/api/contact/email-template.ts) |

## Requisitos não funcionais

| ID | Qualidade observada | Limite |
| --- | --- | --- |
| RNF-01 | Validação ocorre tanto na interface quanto na rota de contato. [Formulário](https://github.com/pedro-cruzz/Oceano-azul-page/blob/main/app/components/shared/lead-form.tsx) · [rota](https://github.com/pedro-cruzz/Oceano-azul-page/blob/main/app/api/contact/route.ts) | Não há garantia de entrega final do email quando o provedor aceita a requisição. |
| RNF-02 | A rota exige chave e destinatário configurados por ambiente e retorna erro caso faltem. [Rota](https://github.com/pedro-cruzz/Oceano-azul-page/blob/main/app/api/contact/route.ts) | A configuração do ambiente publicado não foi verificada. |
| RNF-03 | O site tem modo de desempenho que reduz efeitos visuais conforme o dispositivo. [UI kit](https://github.com/pedro-cruzz/Oceano-azul-page/blob/main/app/components/ui-kit.tsx) | Não há medição de ganho em FPS aqui. |

## Decisão técnica que o código mostra

O formulário compartilhado centraliza o comportamento de contato, enquanto a rota do servidor valida e envia a mensagem. Isso evita duplicar lógica em seções diferentes. A contribuição pessoal de Pedro e o resultado comercial ainda precisam ser confirmados antes de virar uma afirmação no case. O [README](README.md) detalha configuração e execução.
