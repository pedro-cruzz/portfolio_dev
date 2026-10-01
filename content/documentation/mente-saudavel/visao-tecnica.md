# Mente Saudável — visão técnica

## Problema e solução observada

O front-end organiza caminhos distintos para pacientes e psicólogos: descoberta de profissionais, perfis, artigos e cadastro. O repositório inclui uma API de desenvolvimento com `json-server`; as rotas protegidas são uma regra da interface, não prova de autorização em um servidor de produção.

![Fluxo de componentes do Mente Saudável](/docs/mente-saudavel/arquitetura.svg)

## Requisitos funcionais

| ID | Comportamento no código | Evidência |
| --- | --- | --- |
| RF-01 | Navegar entre página inicial, cadastro, login e diretório de psicólogos. | [Rotas](https://github.com/pedro-cruzz/mente-saudavel/blob/main/src/routes/index.tsx) |
| RF-02 | Abrir perfis, artigos e edição/criação de artigo a partir de rotas protegidas no cliente. | [Rotas](https://github.com/pedro-cruzz/mente-saudavel/blob/main/src/routes/index.tsx) · [PrivateRoute](https://github.com/pedro-cruzz/mente-saudavel/blob/main/src/components/PrivateRoute/index.tsx) |
| RF-03 | Manter token e identificadores de paciente/psicólogo no estado de autenticação da interface. | [AuthContext](https://github.com/pedro-cruzz/mente-saudavel/blob/main/src/contexts/AuthContext.tsx) |
| RF-04 | Centralizar requisições de perfis, favoritos e artigos em serviços HTTP. | [Serviços](https://github.com/pedro-cruzz/mente-saudavel/tree/main/src/services) · [cliente Axios](https://github.com/pedro-cruzz/mente-saudavel/blob/main/src/services/api.ts) |

## Requisitos não funcionais

| ID | Qualidade observada | Limite |
| --- | --- | --- |
| RNF-01 | Rotas, componentes e serviços HTTP ficam em pastas separadas. [Estrutura de rotas](https://github.com/pedro-cruzz/mente-saudavel/blob/main/src/routes/index.tsx) · [serviços](https://github.com/pedro-cruzz/mente-saudavel/tree/main/src/services) | A separação não mede qualidade de manutenção. |
| RNF-02 | O projeto compila TypeScript e usa Vite. [package.json](https://github.com/pedro-cruzz/mente-saudavel/blob/main/package.json) | Não há medição de desempenho ou acessibilidade aqui. |
| RNF-03 | A API local está configurada em `localhost:3001` e o script `server` executa `json-server`. [Cliente](https://github.com/pedro-cruzz/mente-saudavel/blob/main/src/services/api.ts) · [scripts](https://github.com/pedro-cruzz/mente-saudavel/blob/main/package.json) | Fluxos que dependem da API exigem esse serviço; proteção no cliente não substitui controle no servidor. |

## Decisão técnica que o código mostra

O uso de rotas separadas para públicos diferentes e um contexto de sessão permite reutilizar a navegação e os serviços. Para contar isso como decisão de Pedro, é preciso confirmar sua contribuição e por que escolheu essa estrutura. O [README atual](README.md) ainda contém texto inicial do Vite; esta página é a referência técnica específica do projeto.
