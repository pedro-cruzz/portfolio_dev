import { additionalProjects } from "./additional-projects";

export type SceneItem = "notebook" | "coffee" | "headset";
export const profile = {
  name: "Pedro Henrique Cruz Vilas Bôas",
  role: "Software Developer",
  github: "https://github.com/pedro-cruzz",
  linkedin: "https://www.linkedin.com/in/pedro-henrique-vilas-boas/",
  whatsapp: "5535998603656",
  email: "phcruzvilasboas@gmail.com",
  instagram: "https://www.instagram.com/peedro.cruzz/",
  resume: {
    // Add the PDF under public/ and set its local URL when it is ready.
    url: "",
    filename: "pedro-henrique-curriculo.pdf",
  },
};
export const contactChannels = [
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "Experiência e conexões profissionais",
    href: profile.linkedin,
    external: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    description: "Para começar uma conversa",
    href: profile.whatsapp
      ? `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`
      : "",
    external: true,
  },
  {
    id: "email",
    label: "E-mail",
    description: profile.email || "Projetos, propostas e oportunidades",
    href: profile.email ? `mailto:${profile.email}` : "",
    external: false,
  },
  {
    id: "instagram",
    label: "Instagram",
    description: "@peedro.cruzz",
    href: profile.instagram,
    external: true,
  },
];
export type ProjectImage = { src: string; alt: string; caption: string };
// Fill only after Pedro confirms the information. Missing fields are not rendered.
export type ProjectExperience = {
  confirmed: boolean;
  contribution?: string;
  responsibilities?: string[];
  period?: string;
  collaboration?: string;
  collaborator?: { name: string; portfolio: string };
  credits?: string[];
  registration?: string;
  registrationNumber?: string;
  registrationDocument?: string;
  nature?: "Profissional" | "Acadêmico" | "Pessoal";
  status?: "Em desenvolvimento" | "Concluído" | "Em uso";
  challenge?: string;
  decision?: string;
  rationale?: string;
  outcome?: string;
  learning?: string;
};
export type Project = {
  slug: string;
  name: string;
  repo: string;
  repoLabel?: string;
  category: string;
  focus: string;
  summary: string;
  stack: string[];
  live?: string;
  liveLabel?: string;
  images: ProjectImage[];
  context: string;
  solution: string;
  features: { title: string; description: string }[];
  architecture: { title: string; description: string }[];
  captureNote: string;
  experience?: ProjectExperience;
  technicalStory?: {
    title: string;
    challenge: string;
    approach: string;
    rationale: string;
    walkthrough: [string, string, string];
  };
};
export const projects: Project[] = [
  {
    slug: "ija-system",
    name: "IJA System",
    repo: "IJA-System",
    category: "GESTÃO & OPERAÇÃO",
    focus: "Fluxos e permissões",
    summary:
      "Da planilha à ordem de serviço: gestão de voos de drones para operações de campo.",
    stack: ["Python", "Flask", "PostgreSQL", "SQLAlchemy"],
    live: "https://www.system.oceanoazuldrones.com.br/portal-cidadao",
    liveLabel: "Acessar Portal do Cidadão",
    images: [
      {
        src: "/projects/ija-system/login-limpo.png",
        alt: "Tela de entrada do IJA System com apresentação da plataforma operacional e opções de acesso",
        caption:
          "Entrada do IJA System: solicitações, agenda, rotas e relatórios apresentados antes do acesso à operação.",
      },
      {
        src: "/projects/ija-system/agenda-redigida.png",
        alt: "Agenda do IJA System com compromissos ocultados e ação Rota do Dia visível",
        caption:
          "Agenda operacional: solicitações organizadas por data e acesso à rota do dia. Endereços ocultados na captura.",
      },
      {
        src: "/projects/ija-system/agenda-street-view-redigida.png",
        alt: "Detalhes de um agendamento no IJA System com Street View e ações Maps e Traçar Rota; endereço e coordenadas ocultados",
        caption:
          "Detalhe da agenda: integração com Google Maps, visualização no Street View e acesso à rota. Endereço, coordenadas e identificadores ocultados.",
      },
      {
        src: "/projects/ija-system/overview.webp",
        alt: "Painel Agro do IJA System com indicadores demonstrativos",
        caption:
          "Painel Agro: acesso aos fluxos comercial, operacional e financeiro. Dados demonstrativos.",
      },
      {
        src: "/projects/ija-system/detail.webp",
        alt: "Central de Veículos do IJA System com seis áreas de gestão da frota",
        caption:
          "Central de Veículos atualizada: frota, rastreamento, logs, limpeza, checklist e alertas.",
      },
      {
        src: "/projects/ija-system/central-relatorios.webp",
        alt: "Central de Relatórios do IJA System com opções de solicitações, ordens de serviço, mídias e voos",
        caption:
          "Central de Relatórios: solicitações, OS, mídias, retornos automáticos e logs de voo.",
      },
      {
        src: "/projects/ija-system/rastreamento-demo.webp",
        alt: "Rastreamento demonstrativo do IJA System com veículos e rotas fictícios no mapa",
        caption:
          "Rastreamento da frota em modo demonstrativo, com veículos e trajetos fictícios.",
      },
      {
        src: "/projects/ija-system/boletim-saude.webp",
        alt: "Boletim de saúde público do Portal do Cidadão com indicadores de dengue",
        caption:
          "Portal do Cidadão: boletim de saúde com indicadores públicos do InfoDengue.",
      },
      {
        src: "/projects/ija-system/relatorio-arboviroses.webp",
        alt: "Relatório público de arboviroses com evolução semanal dos casos estimados",
        caption:
          "Relatório epidemiológico público: evolução semanal e origem dos dados.",
      },
    ],
    context:
      "Antes do IJA System, pedidos de voo de drones ligados ao combate à dengue na cidade de São Paulo eram preenchidos em planilhas, uma a uma. Solicitações, locais, agenda e registros da execução ficavam dispersos, exigindo trabalho manual para acompanhar a operação.",
    solution:
      "O IJA System reúne solicitações, aprovações, agenda, equipes, ordens de serviço e relatórios em uma aplicação Flask usada pela Oceano Azul e por UVIS de São Paulo. A API do Google Maps apoia a geocodificação, a visualização dos locais na agenda e o planejamento de rotas; os registros de execução conectam mídias, dados de voo e documentos à operação. O sistema também atende à frente agro, do cadastro de clientes aos orçamentos, contratos e serviços.",
    technicalStory: {
      title: "Acesso por perfil e contexto.",
      challenge:
        "Uma solicitação pode passar por perfis com responsabilidades diferentes. Além de permitir uma ação, a aplicação precisa considerar a prefeitura e a região relacionadas aos registros consultados.",
      approach:
        "O projeto reúne funções de escopo para filtrar consultas por prefeitura e região, além das verificações por perfil. Solicitações, equipes e ordens de serviço permanecem conectadas pelos registros da operação.",
      rationale:
        "Perfil e contexto respondem a perguntas diferentes: qual ação está disponível e quais registros entram na consulta. Essa separação torna as regras de acesso mais explícitas para quem mantém os fluxos.",
      walkthrough: [
        "Solicitação e aprovação",
        "Agenda e equipe responsável",
        "Execução e histórico",
      ],
    },
    features: [
      {
        title: "Da solicitação à execução",
        description:
          "Pedidos georreferenciados, aprovação, agenda, rota do dia e ordens de serviço para pilotos e equipes de campo.",
      },
      {
        title: "Operação agro",
        description:
          "Clientes, orçamentos, contratos em PDF, equipamentos e financeiro conectados à execução dos serviços.",
      },
      {
        title: "Frota e equipes",
        description:
          "Gestão de veículos, logs de uso, abastecimentos e checklists para acompanhar a rotina operacional.",
      },
      {
        title: "Evidências e relatórios",
        description:
          "Mídias, assinaturas capturadas na interface, dosagem, rotas KML e relatórios vinculados às OS, com exportação em PDF e Excel.",
      },
    ],
    architecture: [
      {
        title: "Domínios da operação",
        description:
          "Flask com application factory e módulos para agenda, solicitações, agro, veículos e relatórios. Templates Jinja2 compõem a interface.",
      },
      {
        title: "Dados e acesso",
        description:
          "SQLAlchemy e PostgreSQL para os dados relacionais, com migrações e permissões por perfil, prefeitura e região.",
      },
      {
        title: "Integrações",
        description:
          "API do Google Maps para geocodificação, visualização na agenda e rotas; Correios, ViaCEP e BrasilAPI para consulta de CEP; armazenamento externo e upload em partes para mídias maiores.",
      },
    ],
    captureNote:
      "Capturas da interface do sistema e de páginas públicas. O aviso de validação foi removido da tela de entrada. As imagens da agenda foram editadas para ocultar endereços, coordenadas e identificadores; o Street View foi mantido. O rastreamento usa dados fictícios. As demais capturas não mostram registros operacionais individuais.",
    experience: {
      confirmed: true,
      period: "03/12/2025 a 30/06/2026",
      contribution:
        "Sou coautor do IJA System, desenvolvido em colaboração com João Pedro Gomes da Silva. Durante o estágio, participei da construção e manutenção da aplicação em Flask e PostgreSQL, conectando solicitações, equipes, ordens de serviço, frota e relatórios.",
      responsibilities: [
        "Evolução dos modelos de dados e migrações com SQLAlchemy, Flask-Migrate e Alembic.",
        "Regras de acesso por perfil, prefeitura e região.",
        "Integração com mapas e processamento de planilhas XLSX e arquivos KML usados na operação.",
        "Geração de relatórios e manutenção do sistema em produção, com correções orientadas pelo uso da equipe.",
      ],
      outcome:
        "O projeto substituiu parte do acompanhamento feito em planilhas por fluxos conectados de solicitações, equipes, ordens de serviço, frota e relatórios. Foi minha experiência mais direta com um software usado em uma operação real, onde cada mudança precisava considerar quem teria acesso aos dados e como ela afetaria o trabalho da equipe.",
      collaboration:
        "Coautoria com João Pedro Gomes da Silva, também desenvolvedor do projeto.",
      collaborator: {
        name: "João Pedro Gomes da Silva",
        portfolio: "https://jpgomes035.github.io/joaopedro-portfolio/",
      },
      registration:
        "Programa de computador registrado no INPI sob nº BR 51 2026 007433-9. Titular: IJA Drones Brasil Ltda. - ME.",
      registrationNumber: "BR 51 2026 007433-9",
      registrationDocument:
        "/docs/ija-system/certificado-inpi-br-51-2026-007433-9.pdf",
    },
  },
  {
    slug: "mente-saudavel",
    name: "Mente Saudável",
    repo: "mente-saudavel",
    category: "WEB & SAÚDE MENTAL",
    focus: "Interface e navegação",
    summary:
      "Uma plataforma de acolhimento e informação, com interfaces para conectar pessoas e profissionais de psicologia.",
    stack: ["React", "TypeScript", "Styled Components", "Zod"],
    images: [
      {
        src: "/projects/mente-saudavel/overview.webp",
        alt: "Página inicial do Mente Saudável, com identidade visual verde e conteúdo de acolhimento",
        caption: "Página inicial e apresentação da proposta de acolhimento.",
      },
      {
        src: "/projects/mente-saudavel/detail.webp",
        alt: "Tela de escolha de cadastro para paciente ou psicólogo no Mente Saudável",
        caption: "Entrada para os diferentes perfis de cadastro.",
      },
    ],
    context:
      "O projeto semestral explora como uma interface pode apresentar informação sobre saúde mental e organizar a descoberta de profissionais. A navegação atende públicos distintos: quem procura apoio e quem oferece atendimento.",
    solution:
      "Aplicação React e TypeScript criada para organizar a navegação de pacientes e profissionais de psicologia. O projeto reúne interfaces de cadastro, diretório de profissionais e formulários com validação.",
    features: [
      {
        title: "Apresentação acolhedora",
        description:
          "Conteúdo sobre o propósito da plataforma, públicos atendidos e caminhos de contato, com identidade visual própria.",
      },
      {
        title: "Perfis distintos",
        description:
          "Telas de cadastro e perfil para pacientes e psicólogos, com componentes de edição de informações.",
      },
      {
        title: "Profissionais e conteúdo",
        description:
          "Interfaces para diretório de psicólogos, favoritos e criação e leitura de artigos.",
      },
      {
        title: "Formulários e navegação",
        description:
          "Validação de campos com Zod, feedback visual e rotas públicas e protegidas no front-end.",
      },
    ],
    architecture: [
      {
        title: "Componentes",
        description:
          "React, TypeScript e Vite, com layouts, formulários, cards e elementos de navegação reutilizáveis.",
      },
      {
        title: "Identidade visual",
        description:
          "Styled Components e um tema compartilhado, com Material UI em componentes de feedback e apoio à responsividade.",
      },
      {
        title: "Fluxos e dados",
        description:
          "React Router organiza as telas, contexto de autenticação controla a sessão da interface e serviços Axios concentram as chamadas de API.",
      },
    ],
    captureNote:
      "Capturas da interface executada localmente a partir do repositório. Recursos autenticados são descritos a partir do código; sua disponibilidade depende da API do projeto.",
  },
  {
    slug: "pose-lab",
    name: "Pose Lab",
    repo: "esqueleto-3d",
    category: "3D & EDUCAÇÃO",
    focus: "Interação espacial",
    summary:
      "Um atlas de anatomia que transforma o estudo do corpo humano em uma experiência interativa.",
    stack: ["JavaScript", "Three.js", "WebGL", "PWA"],
    live: "https://esqueleto-3d.vercel.app/",
    images: [
      {
        src: "/projects/pose-lab/detail.webp",
        alt: "Modelo 3D do esqueleto humano e controles de exploração no Pose Lab",
        caption:
          "O atlas em funcionamento, com seleção e controles de exploração em 3D.",
      },
      {
        src: "/projects/pose-lab/overview.webp",
        alt: "Interface do Pose Lab com as opções de estudo de anatomia",
        caption: "Exploração dos sistemas e recursos de estudo.",
      },
    ],
    context:
      "Estudar anatomia em imagens planas dificulta entender a posição e a relação entre as estruturas. O Pose Lab organiza modelos tridimensionais e controles de estudo em uma interface para desktop e celular.",
    solution:
      "Atlas de anatomia em 3D que liga um catálogo pesquisável às estruturas do modelo. A pessoa pode localizar, selecionar e isolar peças para estudá-las tanto no computador quanto no celular.",
    technicalStory: {
      title: "Do catálogo à cena.",
      challenge:
        "Os nomes internos das malhas de um modelo 3D não formam, por si só, um catálogo de estudo. A busca por uma estrutura precisa encontrar a peça certa mesmo quando o nome exibido é diferente do identificador original.",
      approach:
        "O catálogo mantém o nome original e acrescenta nome de apresentação, região, lado e tipo. Uma chave normalizada liga esses dados à malha; a mesma entrada alimenta a lista, a busca e a seleção na cena.",
      rationale:
        "O nome pode ficar legível para o visitante sem perder a referência ao modelo. Selecionar pela lista ou clicar na cena leva à mesma estrutura, que pode ser isolada e enquadrada para estudo.",
      walkthrough: [
        "Busca no catálogo",
        "Seleção no modelo 3D",
        "Foco e isolamento",
      ],
    },
    features: [
      {
        title: "Exploração direta",
        description:
          "Seleção por clique ou toque, destaque na cena, foco e isolamento de estruturas.",
      },
      {
        title: "Catálogo de anatomia",
        description:
          "Busca e filtros por região, lateralidade e tipo, vinculados ao modelo 3D.",
      },
      {
        title: "Movimento e estudo",
        description:
          "Controles articulares por região, vistas predefinidas e câmera orbital.",
      },
      {
        title: "Desktop e celular",
        description:
          "Interface responsiva e recursos de instalação como Progressive Web App.",
      },
    ],
    architecture: [
      {
        title: "Interface",
        description:
          "HTML, CSS e JavaScript sem framework, com navegação entre o catálogo e o atlas.",
      },
      {
        title: "Visualização",
        description:
          "Three.js, WebGL e carregamento de modelos GLB com GLTFLoader e DRACOLoader.",
      },
      {
        title: "Conteúdo",
        description:
          "Catálogos de estruturas associados às malhas e modelos disponibilizados pelo próprio projeto.",
      },
    ],
    captureNote:
      "Capturas da versão online indicada no repositório. O atlas tem finalidade de estudo; os movimentos são aproximações visuais.",
  },
  {
    slug: "higiflow",
    name: "HigiFlow",
    repo: "gestao-higienizacao",
    category: "ERP & OPERAÇÃO",
    focus: "Orçamentos e serviços",
    summary:
      "Do primeiro orçamento à execução do serviço: uma rotina de gestão reunida em um só lugar.",
    stack: ["Python", "Django", "SQLite", "Bootstrap"],
    live: "https://gestao-higienizacao.onrender.com/",
    liveLabel: "Ver HigiFlow (login)",
    images: [
      {
        src: "/projects/higiflow/overview.webp",
        alt: "Painel HigiFlow com indicadores, leads e ordens de serviço demonstrativos",
        caption: "Painel de gestão com dados demonstrativos.",
      },
      {
        src: "/projects/higiflow/detail.webp",
        alt: "Catálogo de serviços do HigiFlow renderizado localmente",
        caption: "Organização do catálogo usado na criação de orçamentos.",
      },
    ],
    context:
      "Catálogo, propostas, clientes e agenda precisam compartilhar informações. O HigiFlow conecta essas etapas para apoiar a operação de serviços de higienização.",
    solution:
      "Aplicação Django que conecta catálogo de serviços, orçamentos, clientes e ordens de serviço. Os modelos relacionais permitem acompanhar o caminho de uma proposta até a execução, com visões adequadas aos diferentes perfis de acesso.",
    features: [
      {
        title: "Catálogo de serviços",
        description:
          "Cadastro de produtos e serviços com informações que apoiam a composição de orçamentos.",
      },
      {
        title: "Orçamento até cliente",
        description:
          "Aprovação de propostas com criação automática do cadastro de cliente.",
      },
      {
        title: "Operação em campo",
        description:
          "Ordens de serviço com agenda, equipe responsável e conclusão.",
      },
      {
        title: "Acesso por perfil",
        description:
          "Autenticação e visões para administradores e equipe operacional.",
      },
    ],
    architecture: [
      {
        title: "Aplicação",
        description:
          "Python e Django organizam as regras, os modelos e a renderização das páginas.",
      },
      {
        title: "Interface",
        description:
          "Templates Django, Bootstrap e estilos próprios para painel, formulários e navegação.",
      },
      {
        title: "Persistência",
        description:
          "Modelos relacionais para catálogo, orçamentos, clientes, técnicos e ordens de serviço; SQLite na configuração documentada.",
      },
    ],
    captureNote:
      "Templates do repositório renderizados localmente com dados demonstrativos. Nenhum dado de cliente ou banco de produção foi usado.",
  },
  {
    slug: "copa-2026",
    name: "Copa 2026",
    repo: "copa-2026",
    category: "WEB & EXPERIÊNCIA",
    focus: "Informação e movimento",
    summary:
      "Jogos, grupos e seleções em uma experiência visual para acompanhar o campeonato.",
    stack: ["React", "Vite", "Three.js", "Motion"],
    live: "https://copa-2026-one.vercel.app/",
    images: [
      {
        src: "/projects/copa-2026/overview.webp",
        alt: "Página inicial do projeto Copa 2026",
        caption: "Apresentação e navegação do campeonato.",
      },
      {
        src: "/projects/copa-2026/detail.webp",
        alt: "Conteúdo e informações do campeonato no projeto Copa 2026",
        caption: "Consulta às informações e seções do campeonato.",
      },
    ],
    context:
      "Um campeonato reúne calendário, resultados, grupos e seleções. O projeto organiza essas informações em uma aplicação com navegação visual e adaptação para diferentes telas.",
    solution:
      "Uma interface React divide a experiência em páginas e seções para partidas, grupos, histórico, seleções e chaveamento, incluindo elementos tridimensionais e transições.",
    features: [
      {
        title: "Partidas e calendário",
        description:
          "Seções dedicadas à programação, aos jogos do dia e ao histórico de partidas.",
      },
      {
        title: "Grupos e seleções",
        description:
          "Navegação por grupos, páginas de seleções e modais de detalhes.",
      },
      {
        title: "Chaveamento",
        description:
          "Página própria para visualizar o mata-mata, com navegação adaptada ao celular.",
      },
      {
        title: "Experiência visual",
        description:
          "Componentes 3D, animações e suporte a instalação e atualização como PWA.",
      },
    ],
    architecture: [
      {
        title: "Interface",
        description:
          "React e Vite, com componentes separados para navegação, filtros, jogos e seleções.",
      },
      {
        title: "Cena e movimento",
        description:
          "Three.js, React Three Fiber e Drei nas cenas; Framer Motion nas animações.",
      },
      {
        title: "Carregamento",
        description:
          "Carregamento sob demanda de seções, tratamento de erros e atualização via service worker.",
      },
    ],
    captureNote:
      "Capturas da versão online indicada no repositório. Informações esportivas refletem o conteúdo exibido pelo projeto no momento da captura.",
  },
  {
    slug: "ecotron",
    name: "ECOTRON",
    repo: "arduino_energia",
    repoLabel: "ecotron",
    category: "BACK-END & TEMPO REAL",
    focus: "Dados em tempo real",
    summary:
      "Node.js, lógica de cálculo e dados em tempo real em um painel de monitoramento de energia.",
    stack: ["Node.js", "Express", "Socket.IO", "JavaScript"],
    images: [
      {
        src: "/projects/ecotron/overview.webp",
        alt: "Painel ECOTRON com medições de energia no modo simulado",
        caption: "Painel de energia com o modo simulado do próprio projeto.",
      },
      {
        src: "/projects/ecotron/detail.webp",
        alt: "Gráficos e histórico de consumo no ECOTRON",
        caption: "Histórico e visualização das leituras simuladas.",
      },
    ],
    context:
      "Valores de potência precisam ser processados ao longo do tempo para estimar consumo e custo. O ECOTRON explora essa lógica em um back-end que recebe dados e mantém a interface atualizada.",
    solution:
      "O servidor Node.js interpreta leituras em JSON, calcula energia acumulada e custo estimado e distribui as atualizações com Socket.IO. O modo simulado permite explorar o fluxo completo de processamento e visualização.",
    features: [
      {
        title: "Processamento de dados",
        description:
          "Interpretação de leituras em JSON e organização dos valores para cálculo e visualização.",
      },
      {
        title: "Atualização ao vivo",
        description:
          "Distribuição das leituras para o navegador por meio de Socket.IO.",
      },
      {
        title: "Consumo e custo",
        description:
          "Cálculo acumulado de energia e estimativas com base na potência e na tarifa configurada.",
      },
      {
        title: "Modo simulado",
        description:
          "Geração de dados de exemplo para acompanhar os cálculos e desenvolver a interface.",
      },
    ],
    architecture: [
      {
        title: "Entrada de dados",
        description:
          "Leituras em JSON e um gerador de dados simulados para exercitar o processamento.",
      },
      {
        title: "Servidor",
        description:
          "Node.js e Express recebem dados, mantêm um histórico em memória e calculam os acumulados.",
      },
      {
        title: "Navegador",
        description:
          "Socket.IO atualiza os indicadores, o gráfico e a tabela da interface web.",
      },
    ],
    captureNote:
      "Capturas da execução local com SIMULATED_DATA=1. As leituras são simuladas e não representam consumo real.",
  },
  ...additionalProjects,
];
export const repositoryUrl = (project: Project) =>
  `https://github.com/pedro-cruzz/${project.repo}`;
