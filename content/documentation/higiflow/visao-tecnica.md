# HigiFlow — visão técnica

## O problema e o recorte

Uma operação de higienização precisa preservar o vínculo entre contato comercial, catálogo, proposta, cliente, agenda e execução. Este documento acompanha esse caminho no código Django e resume os controles de acesso e as qualidades observáveis. O [README](README.md) explica como executar o projeto; o repositório também contém uma [especificação de requisitos mais extensa](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/docs/requisitos/00-documento-de-requisitos.md).

## Organização do sistema

![Diagrama do HigiFlow: navegador e templates Django, views e formulários, modelos, banco e serviços externos](/docs/higiflow/arquitetura.svg)

As [URLs](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/urls.py) aplicam decoradores de perfil às views. As views de [orçamentos](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/views/orcamentos.py) e [ordens](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/views/ordens.py) trabalham com formulários, modelos e templates. As entidades centrais são `Lead`, `Service_catalog`, `Orcamento`, `Cliente`, `Tecnico` e `OrdemServico`, definidas em [models.py](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/models.py). A configuração usa `DATABASE_URL` quando fornecida e SQLite como padrão local, conforme [settings.py](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/core/settings.py).

## Requisitos funcionais observáveis

| ID | Comportamento encontrado | Evidência no código |
| --- | --- | --- |
| RF-01 | Administradores podem registrar leads e itens do catálogo para compor propostas. | [Views comerciais](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/views/catalogo.py), [URLs com perfil](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/urls.py) |
| RF-02 | O orçamento reúne dados do contato, itens, adicionais e multiplicadores de preço; o formulário valida os valores antes de salvar. | [Modelo](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/models.py), [formulários](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/forms.py), [view](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/views/orcamentos.py) |
| RF-03 | A aprovação via POST exige email, cria ou atualiza um cliente, marca o orçamento como aprovado e pode gerar uma ordem de serviço. | [Fluxo de aprovação](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/views/orcamentos.py) |
| RF-04 | A ordem pode ser atribuída a técnico ou marcada para execução pelo administrador; agenda, status e conclusão são gerenciados no módulo operacional. | [Modelo de OS](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/models.py), [views de ordens](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/views/ordens.py) |
| RF-05 | Orçamentos podem ser exportados como proposta PDF; endereço e mapa recebem apoio de serviços externos. | [PDF e mapa](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/views/orcamentos.py), [ViaCEP](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/services/viacep.py), [Nominatim](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/services/nominatim.py) |

Os IDs resumem o estado do código para o portfólio. A [especificação original](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/docs/requisitos/03-requisitos-funcionais.md) cobre mais casos e critérios.

## Requisitos não funcionais e limites

| ID | Qualidade tratada | Evidência e limite da afirmação |
| --- | --- | --- |
| RNF-01 | Acesso por perfil | Decoradores exigem login e distinguem desenvolvedor, administrador e equipe. A equipe só recebe as rotas operacionais autorizadas. [access.py](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/access.py) · [URLs](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/urls.py) |
| RNF-02 | Separação dos dados | Registros possuem `owner`; consultas de administração filtram por dono e a equipe vê ordens vinculadas ao próprio técnico. Essa evidência não substitui uma auditoria de todas as views. [Modelos](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/models.py) · [ordens](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/views/ordens.py) · [testes](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/tests.py) |
| RNF-03 | Validação de entrada | Formulários validam campos comerciais e operacionais, incluindo preço, dados de contato e agendamento. [forms.py](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/forms.py) |
| RNF-04 | Configuração por ambiente | Banco, chave secreta, debug e parâmetros de segurança são configuráveis; `SECRET_KEY` é exigida quando debug está desligado. Não há afirmação sobre o ambiente atualmente publicado. [settings.py](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/core/settings.py) |
| RNF-05 | Verificação automatizada | O repositório contém testes de autorização, isolamento por dono, fluxo comercial e ordens. A existência dos testes não atesta o resultado da última execução. [service/tests.py](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/tests.py) |

## Caminho da proposta à execução

1. O administrador cadastra itens e cria um orçamento com valores calculados pelo formulário e pela view.
2. Na aprovação, a view busca o orçamento dentro do escopo do usuário, exige email e cria ou atualiza o cliente.
3. Se a opção de criar OS estiver ativa, uma ordem agendada é criada; o vínculo um a um evita outra OS automática para o mesmo orçamento.
4. A equipe visualiza apenas as ordens relacionadas ao técnico vinculado ao seu usuário; alterações de status e conclusão passam pelas views operacionais.

As etapas podem ser conferidas em [orcamentos.py](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/views/orcamentos.py), [ordens.py](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/views/ordens.py) e [models.py](https://github.com/pedro-cruzz/gestao-higienizacao/blob/main/service/models.py).

## Autoria e resultado

O código mostra o fluxo e seus controles. Para torná-lo um case de carreira, ainda é preciso confirmar quais partes Pedro implementou, se houve colaboração, qual decisão técnica foi dele e que resultado pôde observar. Não há métricas de ganho de tempo, receita ou adoção verificadas neste documento.
