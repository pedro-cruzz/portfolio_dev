import fs from "node:fs";
import path from "node:path";

const diagrams = {
  "mente-saudavel": ["React e rotas", "Contexto de sessão", "Serviços Axios", "JSON Server local"],
  "pose-lab": ["Menu de sistemas", "Catálogo selecionado", "Three.js e estudo", "Modelo GLB"],
  "copa-2026": ["Páginas React", "Filtros e seções", "Dados do torneio", "APIs de placar"],
  "oceano-azul": ["Landing page", "Formulário de lead", "Rota de contato", "Envio de email"],
  "ija-drones": ["Landing page", "Soluções e mockup", "Formulário", "Rota de email"],
  aerofit: ["Templates Django", "Views e serviços", "Modelos de treino", "Banco de dados"],
  "academy-hub": ["Frontend React", "Cliente de API", "Django REST", "Modelos e banco"],
  "ctrl-play": ["Telas Flutter", "Serviço TMDb", "Repositórios", "SQLite local"],
  "capitalize-invest": ["Formulário HTML", "JavaScript", "Tabela de registros", "localStorage"],
  ecotron: ["Serial ou simulação", "Servidor Node", "Socket.IO", "Painel web"],
};

const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
for (const [slug, labels] of Object.entries(diagrams)) {
  const boxes = labels.map((label, i) => {
    const x = 30 + i * 210;
    return `<rect x="${x}" y="90" width="170" height="100" rx="12" fill="#172842" stroke="#5e84b8" stroke-width="2"/><text x="${x + 85}" y="145" fill="#eff6ff" font-family="Arial,sans-serif" font-size="16" text-anchor="middle">${escape(label)}</text>`;
  }).join("");
  const arrows = labels.slice(0, -1).map((_, i) => `<path d="M${200 + i * 210} 140H${235 + i * 210}" stroke="#71a6ff" stroke-width="3" fill="none" marker-end="url(#arrow)"/>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="280" viewBox="0 0 900 280" role="img" aria-labelledby="title description"><title id="title">Fluxo de componentes: ${escape(slug)}</title><desc id="description">${labels.map(escape).join("; ")}</desc><defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#71a6ff"/></marker></defs><rect width="900" height="280" rx="18" fill="#101a2c"/>${arrows}${boxes}</svg>\n`;
  const folder = path.join("public", "docs", slug);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, "arquitetura.svg"), svg);
}
