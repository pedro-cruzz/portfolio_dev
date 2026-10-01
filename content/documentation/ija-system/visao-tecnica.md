# IJA System — visão técnica

## O problema e o recorte

Segundo o relato sobre a operação, os pedidos de voo de drones para ações de combate à dengue ligadas à Prefeitura de São Paulo eram preenchidos um a um em planilhas. O IJA System passou a reunir pedidos, locais, agenda, execução e histórico em um único sistema. Esta página examina **o fluxo de solicitação e o controle de acesso** e aponta para módulos complementares; não é um inventário exaustivo das frentes agro, frota e portal do cidadão.

Esta é uma descrição do **código consultado**, não uma afirmação de que todos os fluxos estão implantados ou de que uma pessoa implementou cada módulo. O README do projeto traz a visão geral e instruções de execução.

## Organização do sistema

![Diagrama de componentes do IJA System: navegador, rotas Flask, serviços, regras de acesso e banco relacional](/docs/ija-system/arquitetura.svg)

As páginas Jinja2 e as requisições do navegador chegam aos blueprints Flask. As rotas chamam serviços de negócio, que consultam modelos SQLAlchemy. A *application factory* configura banco, migrações e login, e registra os blueprints. As funções de escopo por prefeitura e região são compartilhadas entre módulos; uma checagem de perfil na rota não substitui o filtro dos registros consultados. Fontes: [inicialização](https://github.com/pedro-cruzz/IJA-System/blob/main/app/__init__.py), [registro das rotas](https://github.com/pedro-cruzz/IJA-System/blob/main/app/routes.py) e [regras de acesso](https://github.com/pedro-cruzz/IJA-System/blob/main/app/shared/access.py).

## Modelo de entidades e relacionamentos

![Diagrama ER resumido do IJA System, com as relações entre prefeitura, usuário, solicitação e ordem de serviço, entre clientes e documentos agro e entre equipe, veículo, log e abastecimento](/docs/ija-system/modelo-dados.svg)

O diagrama mostra um **recorte**, não todas as tabelas. Na operação urbana, a solicitação é a demanda e a ordem de serviço registra a execução; o formulário da equipe UVIS usa outra entidade, `OrdemServicoEquipeUvis`. Na frente agro, cliente, orçamento, contrato e OS formam uma cadeia própria. Para conferir campos, chaves e restrições, consulte os [modelos](https://github.com/pedro-cruzz/IJA-System/blob/main/app/models.py) e o [diagrama ER completo na documentação do repositório](https://github.com/pedro-cruzz/IJA-System/blob/main/docs/arquitetura.md).

## Requisitos funcionais observáveis

| ID | Comportamento encontrado | Evidência no código |
| --- | --- | --- |
| RF-01 | Usuário autenticado com perfil autorizado pode registrar uma solicitação; dados inválidos retornam ao formulário com mensagem. | [Rota de solicitações](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/solicitacoes/routes.py), [serviço de solicitações](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/solicitacoes/service.py) |
| RF-02 | O sistema consulta possível bloqueio de solicitação por local antes do cadastro e retorna o resultado em JSON. | [Rota `api_solicitacao_checar_bloqueio`](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/solicitacoes/routes.py), [busca por local](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/solicitacoes/service.py) |
| RF-03 | A edição exige autenticação e passa por validação de acesso e dos dados antes de salvar. | [Rota `editar_solicitacao`](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/solicitacoes/routes.py), [serviço](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/solicitacoes/service.py) |
| RF-04 | Consultas podem ser limitadas à prefeitura ou região do usuário, conforme o contexto e o módulo chamador. | [Funções `apply_prefeitura_scope` e `apply_regiao_scope`](https://github.com/pedro-cruzz/IJA-System/blob/main/app/shared/access.py) |
| RF-05 | Equipes e veículos têm rotas próprias para cadastro, consulta e atualização operacional. | [Rotas de equipes](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/equipes/routes.py), [rotas de veículos](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/veiculos/routes.py) |
| RF-06 | O cadastro consulta CEP e pode preencher coordenadas e Place ID a partir do endereço. A consulta de CEP usa Correios se configurado, com ViaCEP e BrasilAPI como alternativas; a geocodificação usa Google Maps. | [Cliente de CEP](https://github.com/pedro-cruzz/IJA-System/blob/main/app/clients/cep_client.py), [cliente Google Maps](https://github.com/pedro-cruzz/IJA-System/blob/main/app/clients/google_maps_client.py), [formulário de cadastro](https://github.com/pedro-cruzz/IJA-System/blob/main/app/templates/cadastro.html) |
| RF-07 | A agenda reúne solicitações do dia com coordenadas disponíveis e oferece rota no Google Maps. | [Serviço da agenda](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/agenda_notificacoes/service.py), [interface](https://github.com/pedro-cruzz/IJA-System/blob/main/app/templates/agenda.html) |
| RF-08 | A importação de rotas KML pode vinculá-las automaticamente a ordens de serviço por uma pontuação de correspondência que inclui Place ID. | [Importação e associação KML](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/dji_flight_logs/service.py) |
| RF-09 | A OS registra dosagem, mídias e assinaturas desenhadas na interface; exportadores montam o PDF da execução. | [Dosagem](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/piloto_os/dosagem.py), [formulário](https://github.com/pedro-cruzz/IJA-System/blob/main/app/templates/piloto_os_formulario.html), [PDF](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/piloto_os/exporters.py) |
| RF-10 | A frente agro relaciona clientes, orçamentos, contratos e OS, com exportação de documentos em PDF. | [Rotas agro](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/agro/routes.py), [exportadores](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/agro/exporters.py) |

Os IDs organizam esta documentação; não representam uma especificação formal anterior ao desenvolvimento.

Essas capacidades têm dependências e limites distintos: geocodificação exige chave do Google Maps; a API dos Correios depende de credencial e tem alternativas; a associação automática de KML depende da correspondência encontrada; e o armazenamento remoto de mídia depende da configuração do serviço. As assinaturas mencionadas são traços capturados pela interface, não certificados criptográficos.

## Requisitos não funcionais e limites

| ID | Qualidade tratada | Evidência e limite da afirmação |
| --- | --- | --- |
| RNF-01 | Separação de responsabilidades | Rotas, serviços, modelos e regras compartilhadas aparecem em arquivos distintos. Isso facilita localizar a lógica, mas não mede manutenibilidade. [Rotas](https://github.com/pedro-cruzz/IJA-System/blob/main/app/routes.py) · [Modelos](https://github.com/pedro-cruzz/IJA-System/blob/main/app/models.py) |
| RNF-02 | Controle de acesso contextual | O código combina autenticação, autorização por perfil e filtros de consulta por prefeitura/região. A cobertura precisa ser avaliada por rota; esta análise não certifica segurança integral. [Solicitações](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/solicitacoes/routes.py) · [Escopos](https://github.com/pedro-cruzz/IJA-System/blob/main/app/shared/access.py) |
| RNF-03 | Persistência e evolução de schema | SQLAlchemy e Flask-Migrate são inicializados na fábrica da aplicação. A existência das migrações não demonstra uma implantação específica. [Inicialização](https://github.com/pedro-cruzz/IJA-System/blob/main/app/__init__.py) |
| RNF-04 | Observabilidade básica | Há um endpoint simples de saúde e outro que testa uma consulta ao banco, retornando erro quando ela falha. Não há meta de disponibilidade ou latência documentada aqui. [Endpoints de saúde](https://github.com/pedro-cruzz/IJA-System/blob/main/app/__init__.py) |

## Caminho de uma solicitação

1. A rota exige uma sessão autenticada e verifica o perfil que pode abrir o cadastro.
2. No envio, `create_nova_solicitacao` recebe o usuário e os campos do formulário.
3. Uma falha de validação devolve a tela preenchida e uma mensagem; o sucesso redireciona para o painel.
4. Ao editar, a rota pede ao serviço o contexto permitido para aquele usuário e trata erros de acesso separadamente.

Esse recorte pode ser conferido em [rotas](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/solicitacoes/routes.py) e [serviço](https://github.com/pedro-cruzz/IJA-System/blob/main/app/modules/solicitacoes/service.py). Ele descreve a sequência no código, sem pressupor o resultado de uma operação real em produção.

## Autoria e resultado

O [certificado de registro de programa de computador do INPI](/docs/ija-system/certificado-inpi-br-51-2026-007433-9.pdf) identifica o **IJA System** sob o processo **BR 51 2026 007433-9**, expedido em 15/09/2026. **[João Pedro Gomes da Silva](https://jpgomes035.github.io/joaopedro-portfolio/)** é um dos desenvolvedores e coautores registrados; a titular é **IJA Drones Brasil Ltda. - ME**. O documento comprova a autoria registrada; não deve ser descrito como patente nem como titularidade pessoal dos autores. Para conferir na fonte oficial, acesse a [busca pública de programas de computador do INPI](https://busca.inpi.gov.br/pePI/jsp/programas/ProgramaSearchBasico.jsp), escolha a pesquisa anônima e informe **BR512026007433-9** no campo do número do pedido.

O repositório mostra **como o sistema foi construído**, mas não separa com segurança quais partes foram feitas por cada coautor, em que período ou qual resultado mensurável elas tiveram. Esses dados devem ser acrescentados ao case depois de confirmados pelos autores. Também vale registrar um desafio concreto, a decisão tomada e a alternativa descartada; isso mostrará melhor a contribuição técnica do que uma lista de tecnologias.
