# ECOTRON — visão técnica

## Problema e solução observada

O código transforma leituras seriais em indicadores de consumo e custo. O servidor Node recebe linhas JSON de uma porta serial ou gera dados simulados, calcula valores acumulados e envia atualizações por Socket.IO. A interface apresenta os números recebidos; a tensão é uma constante configurada no servidor, não uma medição do sensor.

![Fluxo de componentes do ECOTRON](/docs/ecotron/arquitetura.svg)

## Requisitos funcionais

| ID | Comportamento no código | Evidência |
| --- | --- | --- |
| RF-01 | Receber uma linha JSON com corrente e potência por porta serial. | [server.js](https://github.com/pedro-cruzz/arduino_energia/blob/main/server.js) |
| RF-02 | Calcular consumo em kWh pelo intervalo entre leituras e custo por uma tarifa fixa configurada no código. | [server.js](https://github.com/pedro-cruzz/arduino_energia/blob/main/server.js) |
| RF-03 | Enviar leituras ao navegador por Socket.IO e exibir potência, corrente, tensão de referência e acumulados. | [server.js](https://github.com/pedro-cruzz/arduino_energia/blob/main/server.js) · [interface](https://github.com/pedro-cruzz/arduino_energia/blob/main/public/index.html) |
| RF-04 | Expor última leitura, histórico em memória e reset de acumuladores; aceitar modo de simulação por variável de ambiente. | [server.js](https://github.com/pedro-cruzz/arduino_energia/blob/main/server.js) |

## Requisitos não funcionais

| ID | Qualidade observada | Limite |
| --- | --- | --- |
| RNF-01 | Simulação permite demonstração sem hardware. [server.js](https://github.com/pedro-cruzz/arduino_energia/blob/main/server.js) | Dados simulados não validam a precisão do circuito. |
| RNF-02 | Histórico tem limite de 5.000 registros. [server.js](https://github.com/pedro-cruzz/arduino_energia/blob/main/server.js) | É mantido apenas em memória e se perde ao reiniciar. |
| RNF-03 | Porta serial, baud rate e porta HTTP usam variáveis de ambiente. [server.js](https://github.com/pedro-cruzz/arduino_energia/blob/main/server.js) | Tarifa e tensão continuam constantes no código; o endpoint de reset não mostra autenticação. |

## Decisão técnica que o código mostra

O cálculo integra a potência pelo tempo decorrido entre leituras, evitando tratar uma amostra instantânea como consumo acumulado. Para apresentar isso como contribuição de Pedro, falta confirmar sua participação na lógica, na integração serial e na interface, além dos testes feitos com hardware. O [README](README.md) explica execução e simulação.
