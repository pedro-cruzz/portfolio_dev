export type ProjectArea = "all" | "systems" | "web" | "3d" | "mobile";
export const projectAreas: { id: ProjectArea; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "systems", label: "Sistemas" },
  { id: "web", label: "Sites e interfaces" },
  { id: "3d", label: "3D" },
  { id: "mobile", label: "Mobile" },
];

type ProjectVisual = {
  area: Exclude<ProjectArea, "all">;
  symbol: string;
  language: string;
  title: string;
  steps: [string, string, string];
  technologies: [string, string, string];
  note: string;
};

// Architectural summaries of the projects, not live telemetry.
export const projectVisuals: Record<string, ProjectVisual> = {
  "ija-system": {
    area: "systems",
    symbol: "py",
    language: "Python",
    title: "Da solicitação à operação",
    steps: ["Interface", "Regras de negócio", "Dados da operação"],
    technologies: ["Jinja2", "Flask", "PostgreSQL"],
    note: "Solicitações, permissões e histórico conectam o painel à rotina das equipes.",
  },
  "mente-saudavel": {
    area: "web",
    symbol: "tsx",
    language: "TypeScript",
    title: "Interfaces que conectam pessoas",
    steps: ["Componentes", "Navegação", "Integração"],
    technologies: ["React", "React Router", "Axios / API"],
    note: "Telas de paciente e profissional compartilham componentes e serviços de dados.",
  },
  "pose-lab": {
    area: "3d",
    symbol: "3D",
    language: "JavaScript",
    title: "Do modelo à descoberta",
    steps: ["Modelo", "Cena", "Interação"],
    technologies: ["GLB", "Three.js", "WebGL"],
    note: "Cada estrutura do modelo pode ser selecionada, isolada e estudada no navegador.",
  },
  higiflow: {
    area: "systems",
    symbol: "py",
    language: "Python",
    title: "Do orçamento ao serviço",
    steps: ["Catálogo", "Orçamento", "Ordem de serviço"],
    technologies: ["Templates", "Django", "SQLite"],
    note: "Uma proposta aprovada conecta cliente, equipe e execução do serviço.",
  },
  "copa-2026": {
    area: "web",
    symbol: "jsx",
    language: "JavaScript",
    title: "Informação em movimento",
    steps: ["Informações", "Interface", "Experiência"],
    technologies: ["Jogos e grupos", "React", "Three.js / Motion"],
    note: "Calendário, seleções e chaveamento dividem espaço com cenas 3D e transições.",
  },
  ecotron: {
    area: "systems",
    symbol: "</>",
    language: "JavaScript",
    title: "Dos dados ao resultado",
    steps: ["Dados", "Processamento", "Atualização"],
    technologies: ["JSON", "Node.js / Express", "Socket.IO"],
    note: "Lógica de cálculo transforma as leituras em consumo, custo estimado e gráficos.",
  },

  "oceano-azul": {
    area: "web",
    symbol: "tsx",
    language: "TypeScript",
    title: "Da apresentação ao contato",
    steps: ["Conteúdo", "Interface", "Contato"],
    technologies: ["Serviços e cases", "Next.js / React", "Formulário"],
    note: "A navegação conecta a oferta da empresa aos interesses do visitante.",
  },
  "ija-drones": {
    area: "web",
    symbol: "tsx",
    language: "TypeScript",
    title: "Da marca às soluções",
    steps: ["Identidade", "Soluções", "Contato"],
    technologies: ["Conteúdo TypeScript", "Interface React", "E-mail"],
    note: "A landing page apresenta os serviços e direciona a conversa comercial.",
  },
  aerofit: {
    area: "systems",
    symbol: "py",
    language: "Python",
    title: "Da rotina ao progresso",
    steps: ["Exercícios", "Rotinas", "Sessões"],
    technologies: ["Catálogo", "Django", "Dados relacionais"],
    note: "Exercícios e dias de treino compõem rotinas que se conectam ao histórico pessoal.",
  },
  "academy-hub": {
    area: "systems",
    symbol: "jsx",
    language: "JavaScript",
    title: "Da equipe à entrega",
    steps: ["Interface", "API", "Trabalhos"],
    technologies: ["React", "Django REST", "Equipes e tarefas"],
    note: "Disciplinas, participantes e prazos compartilham o contexto de cada trabalho.",
  },
  "ctrl-play": {
    area: "mobile",
    symbol: "dart",
    language: "Dart",
    title: "Descobrir. Organizar. Avaliar.",
    steps: ["Catálogo", "Aplicativo", "Listas pessoais"],
    technologies: ["TMDb / HTTP", "Flutter / Provider", "SQLite"],
    note: "O catálogo externo alimenta a descoberta; listas e resenhas ficam no dispositivo.",
  },
  "capitalize-invest": {
    area: "web",
    symbol: "js",
    language: "JavaScript",
    title: "Do formulário à carteira",
    steps: ["Cadastro", "Tabela", "Persistência"],
    technologies: ["Modal HTML", "JavaScript", "LocalStorage"],
    note: "Cada alteração atualiza os registros e mantém os dados no próprio navegador.",
  },
};
