import type { Project } from "./portfolio";

export const additionalProjects: Project[] = [
  {
    slug: "oceano-azul",
    name: "Oceano Azul",
    repo: "Oceano-azul-page",
    category: "SITE INSTITUCIONAL",
    focus: "Serviços e contato",
    summary:
      "Site institucional que apresenta serviços, operações e cursos, com caminhos de contato para quem busca uma solução.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    live: "https://www.oceanoazuldrones.com.br/oceano",
    liveLabel: "Visitar site",
    images: [
      {
        src: "/projects/oceano-azul/overview.webp",
        alt: "Oceano Azul: Apresentação institucional e entrada para os serviços.",
        caption: "Apresentação institucional e entrada para os serviços.",
      },
      {
        src: "/projects/oceano-azul/detail.webp",
        alt: "Oceano Azul: Soluções e conteúdo da landing page.",
        caption: "Soluções e conteúdo da landing page.",
      },
    ],
    context:
      "Uma empresa com diferentes frentes de atuação precisa apresentar sua oferta sem exigir que o visitante conheça os detalhes da operação.",
    solution:
      "A landing page reúne apresentação, serviços, cases e contato em uma navegação por seções. Imagens e vídeos das operações ajudam a contextualizar as soluções.",
    features: [
      {
        title: "Navegação por interesse",
        description:
          "Seções para apresentar a empresa, os serviços e os caminhos de contato.",
      },
      {
        title: "Conteúdo visual",
        description:
          "Fotografias, vídeos e cases compõem a apresentação da operação.",
      },
      {
        title: "Formulário de contato",
        description:
          "Campos de interesse e mensagem, com retorno visual durante o envio.",
      },
    ],
    architecture: [
      {
        title: "Páginas e componentes",
        description:
          "Next.js e React organizam a landing page e o conteúdo institucional.",
      },
      {
        title: "Identidade e movimento",
        description:
          "TypeScript, Tailwind CSS e Motion sustentam os componentes e as transições.",
      },
      {
        title: "Contato",
        description:
          "O formulário envia os dados para uma rota de contato e apresenta sucesso ou erro.",
      },
    ],
    captureNote:
      "Capturas da landing page, incluindo sua versão publicada. Nenhum formulário foi enviado durante a preparação das imagens.",
  },
  {
    slug: "ija-drones",
    name: "IJA Drones",
    repo: "ija-drones-page",
    category: "LANDING PAGE",
    focus: "Marca e soluções",
    summary:
      "Landing page para apresentar pulverização agrícola e software de gestão, conectando a identidade da empresa às suas soluções.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    live: "https://www.ijadrones.com.br/",
    liveLabel: "Visitar site",
    images: [
      {
        src: "/projects/ija-drones/overview.webp",
        alt: "IJA Drones: Página inicial da landing page publicada.",
        caption: "Página inicial da landing page publicada.",
      },
      {
        src: "/projects/ija-drones/detail.webp",
        alt: "IJA Drones: Seção de soluções: operação no campo e software de gestão.",
        caption: "Seção de soluções: operação no campo e software de gestão.",
      },
      {
        src: "/projects/ija-drones/mapeamento.webp",
        alt: "IJA Drones: demonstração visual de mapeamento de uma operação agrícola",
        caption: "Apresentação do mapeamento de campo na página pública.",
      },
      {
        src: "/projects/ija-drones/plataforma-demo.webp",
        alt: "IJA Drones: seção da plataforma com painel de gestão demonstrativo",
        caption:
          "Seção da plataforma com um painel visual de dados demonstrativos.",
      },
    ],
    context:
      "Serviços de campo e software atendem necessidades relacionadas, mas precisam de uma apresentação que explique o papel de cada solução.",
    solution:
      "Uma página institucional apresenta a marca, explica soluções agrícolas e software e organiza o método de trabalho até o contato comercial.",
    features: [
      {
        title: "Soluções conectadas",
        description:
          "Apresentação de pulverização, mapeamento e gestão de missões, com uma demonstração visual do fluxo.",
      },
      {
        title: "Identidade responsiva",
        description:
          "Composição visual com as cores da marca e adaptação para diferentes telas.",
      },
      {
        title: "Contato direto",
        description:
          "Chamadas para conhecer as soluções e iniciar uma conversa por e-mail.",
      },
    ],
    architecture: [
      {
        title: "Conteúdo centralizado",
        description:
          "Textos, navegação e soluções ficam organizados em um módulo de conteúdo TypeScript.",
      },
      {
        title: "Componentes de interface",
        description:
          "Next.js e React compõem navegação, demonstrações interativas e seções da landing page.",
      },
      {
        title: "Temas e apresentação",
        description:
          "CSS e Tailwind organizam responsividade, animações e temas claro e escuro.",
      },
    ],
    captureNote:
      "Capturas do site publicado. O painel exibido na página usa dados demonstrativos e não representa uma sessão do sistema operacional.",
  },
  {
    slug: "aerofit",
    name: "AeroFit",
    repo: "AeroFit",
    category: "APLICAÇÃO WEB",
    focus: "Treinos e progresso",
    summary:
      "Aplicação para organizar rotinas de treino, consultar exercícios e acompanhar sessões e progresso em um painel pessoal.",
    stack: ["Python", "Django", "Bootstrap", "PostgreSQL"],
    images: [
      {
        src: "/projects/aerofit/overview.webp",
        alt: "AeroFit: Painel pessoal com dados demonstrativos.",
        caption: "Painel pessoal com dados demonstrativos.",
      },
      {
        src: "/projects/aerofit/detail.webp",
        alt: "AeroFit: Biblioteca e organização de rotinas de treino.",
        caption: "Biblioteca e organização de rotinas de treino.",
      },
    ],
    context:
      "Rotinas, exercícios e registros de execução precisam permanecer conectados para que o usuário acompanhe o próprio histórico de treino.",
    solution:
      "O AeroFit organiza catálogo de exercícios, montagem de rotinas e registro de sessões em uma aplicação Django. O painel reúne plano semanal e indicadores de progresso.",
    features: [
      {
        title: "Rotinas de treino",
        description: "Criação de rotinas com exercícios e dias de treinamento.",
      },
      {
        title: "Catálogo de exercícios",
        description:
          "Consulta de movimentos, categorias e informações para montar uma rotina.",
      },
      {
        title: "Sessões e evolução",
        description:
          "Registros de execução, histórico e elementos de progressão por experiência.",
      },
    ],
    architecture: [
      {
        title: "Aplicação Django",
        description:
          "Views, formulários e templates organizam autenticação, catálogo e área pessoal.",
      },
      {
        title: "Regras de treino",
        description:
          "Serviços concentram a montagem de rotinas e o cálculo de métricas de progresso.",
      },
      {
        title: "Persistência",
        description:
          "Modelos relacionais guardam usuários, exercícios, rotinas e sessões. Há configuração para SQLite e PostgreSQL.",
      },
    ],
    captureNote:
      "Aplicação executada localmente com banco SQLite temporário e dados demonstrativos. As imagens não representam informações de usuários reais.",
  },
  {
    slug: "academy-hub",
    name: "Academy Hub",
    repo: "academy-hub",
    category: "SISTEMA COLABORATIVO",
    focus: "Equipes e entregas",
    summary:
      "Hub acadêmico para organizar equipes, disciplinas, projetos e tarefas, com espaços de comunicação ligados aos trabalhos.",
    stack: ["React", "Django REST Framework", "Python", "Tailwind CSS"],
    images: [
      {
        src: "/projects/academy-hub/overview.webp",
        alt: "Academy Hub: Dashboard com equipe e atividades demonstrativas.",
        caption: "Dashboard com equipe e atividades demonstrativas.",
      },
      {
        src: "/projects/academy-hub/detail.webp",
        alt: "Academy Hub: Organização dos projetos e suas entregas.",
        caption: "Organização dos projetos e suas entregas.",
      },
    ],
    context:
      "Trabalhos em grupo distribuem informações entre disciplinas, participantes, tarefas e prazos. A consulta fica mais simples quando esses registros compartilham um contexto.",
    solution:
      "O Academy Hub combina uma interface React com uma API Django para organizar grupos, disciplinas, trabalhos e tarefas. Mensagens e reuniões ficam associadas às equipes e aos projetos.",
    features: [
      {
        title: "Equipes e papéis",
        description:
          "Grupos com membros, convites e responsabilidades acadêmicas.",
      },
      {
        title: "Projetos e tarefas",
        description:
          "Entregas relacionadas a disciplinas, com status, prazos e responsáveis.",
      },
      {
        title: "Comunicação contextual",
        description:
          "Mensagens e registros de reuniões vinculados ao trabalho em grupo.",
      },
    ],
    architecture: [
      {
        title: "Interface React",
        description:
          "Páginas de dashboard, grupos, disciplinas e tarefas compartilham uma camada de acesso à API.",
      },
      {
        title: "API e autenticação",
        description:
          "Django REST Framework expõe os recursos, com autenticação por tokens JWT.",
      },
      {
        title: "Modelo acadêmico",
        description:
          "Relações entre equipes, disciplinas, trabalhos, tarefas e participantes mantêm o contexto das entregas.",
      },
    ],
    captureNote:
      "Capturas da aplicação local com banco temporário e conteúdo demonstrativo. Nenhum dado acadêmico real foi utilizado.",
  },
  {
    slug: "ctrl-play",
    name: "Ctrl+Play",
    repo: "Ctrl-Play",
    category: "APLICATIVO MOBILE",
    focus: "Catálogo pessoal",
    summary:
      "Aplicativo Flutter para descobrir filmes e séries, organizar listas do que assistir e registrar avaliações.",
    stack: ["Flutter", "Dart", "Provider", "SQLite"],
    images: [],
    context:
      "Descobrir um título e lembrar o que já foi assistido são atividades complementares. O aplicativo aproxima a consulta ao catálogo da organização pessoal.",
    solution:
      "O Ctrl+Play consulta o TMDb e organiza títulos em listas de interesse e de assistidos. Avaliações e pequenas resenhas complementam o catálogo pessoal.",
    features: [
      {
        title: "Descoberta de títulos",
        description: "Consulta de filmes e séries pela integração com o TMDb.",
      },
      {
        title: "Listas pessoais",
        description:
          "Organização dos títulos entre quero assistir e já assistidos.",
      },
      {
        title: "Avaliações e resenhas",
        description: "Registro de notas e comentários relacionados aos filmes.",
      },
    ],
    architecture: [
      {
        title: "Interface mobile",
        description:
          "Flutter e Dart compõem telas de descoberta, detalhes e listas pessoais.",
      },
      {
        title: "Estado e serviços",
        description:
          "Provider conecta os repositórios às telas; um serviço HTTP consulta o catálogo do TMDb.",
      },
      {
        title: "Dados locais",
        description:
          "SQLite, por meio de sqflite, guarda listas e resenhas no dispositivo.",
      },
    ],
    captureNote:
      "Visão técnica elaborada a partir do repositório Flutter. Este projeto é apresentado pelo seu fluxo e arquitetura.",
  },
  {
    slug: "capitalize-invest",
    name: "Capitalize Invest",
    repo: "Investiment_Front-end",
    category: "APLICAÇÃO FRONT-END",
    focus: "Cadastro e persistência",
    summary:
      "Gerenciador de investimentos no navegador, com cadastro, edição, exclusão e armazenamento local dos registros.",
    stack: ["JavaScript", "HTML", "CSS", "LocalStorage"],
    live: "https://pedro-cruzz.github.io/Investiment_Front-end/",
    images: [
      {
        src: "/projects/capitalize-invest/overview.webp",
        alt: "Capitalize Invest: Interface da tabela de investimentos.",
        caption: "Interface da tabela de investimentos.",
      },
      {
        src: "/projects/capitalize-invest/detail.webp",
        alt: "Capitalize Invest: Formulário de cadastro com valores fictícios.",
        caption: "Formulário de cadastro com valores fictícios.",
      },
    ],
    context:
      "O projeto explora a organização de registros financeiros em uma interface simples, trabalhando o ciclo de cadastro, consulta, edição e exclusão.",
    solution:
      "HTML, CSS e JavaScript compõem uma tabela interativa e um formulário em modal. Os registros são persistidos no navegador com LocalStorage.",
    features: [
      {
        title: "Cadastro e edição",
        description:
          "Formulário em modal para nome, tipo, valor e data do investimento.",
      },
      {
        title: "Consulta e exclusão",
        description:
          "Tabela de registros com ações e confirmação antes de excluir.",
      },
      {
        title: "Persistência local",
        description:
          "Uso de LocalStorage para armazenar os registros no navegador.",
      },
    ],
    architecture: [
      {
        title: "Interface sem framework",
        description: "HTML e CSS organizam tabela, botões e modal de edição.",
      },
      {
        title: "Lógica no navegador",
        description:
          "JavaScript atualiza a tabela e conecta as ações aos registros.",
      },
      {
        title: "Armazenamento local",
        description:
          "LocalStorage mantém os dados no próprio navegador, sem uma API de persistência.",
      },
    ],
    captureNote:
      "Capturas locais de um estudo de front-end, com valores fictícios no formulário. Sem dados financeiros reais.",
  },
];
