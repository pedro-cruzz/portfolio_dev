import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import styles from "./career-journey.module.css";

// Roles and dates from public/pedro-henrique-curriculo.pdf.
// Earlier roles describe transferable skills, not software-development duties.
const experiences = [
  {
    organization: "IJA Drones",
    role: "Pessoa Desenvolvedora Full Stack",
    kind: "Estágio",
    start: "2025-12",
    end: "2026-06",
    period: "Dez 2025 — Jun 2026",
    description:
      "Fui coautor do IJA System, um sistema web para gestão de operações com drones. Trabalhei com Python, Flask e PostgreSQL, modelagem de dados, permissões, integrações e manutenção em produção.",
    connection:
      "Do entendimento da rotina dos usuários às correções em produção, essa experiência reuniu regras de negócio, organização do código e responsabilidade pelo funcionamento da aplicação.",
    project: { href: "/projetos/ija-system", label: "Conhecer o IJA System" },
  },
  {
    organization: "Tamura",
    role: "Bobinador",
    start: "2023-03",
    end: "2024-03",
    period: "Mar 2023 — Mar 2024",
    description:
      "Atuei em uma rotina produtiva com organização, controle de qualidade, cumprimento de prazos e melhoria de processos.",
    connection:
      "Na programação, esse cuidado com qualidade e prazos se conecta à revisão das entregas e à atenção aos detalhes.",
  },
  {
    organization: "Exército Brasileiro · 4º BECmb",
    role: "Aspirante a Oficial da Reserva",
    start: "2022-02",
    end: "2022-12",
    period: "Fev 2022 — Dez 2022",
    description:
      "Liderei equipes e apoiei tarefas logísticas e administrativas, com comunicação e tomada de decisão sob pressão.",
    connection:
      "São habilidades que levo para a colaboração com outras pessoas, a organização de prioridades e a resolução de problemas no desenvolvimento.",
  },
  {
    organization: "Sisvoo",
    role: "Aprendiz em Administração",
    start: "2019-06",
    end: "2019-12",
    period: "Jun 2019 — Dez 2019",
    description:
      "Apoiei rotinas administrativas, organização de documentos, atendimento interno e melhoria de processos.",
    connection:
      "Essa vivência ajuda a compreender os fluxos de trabalho das pessoas antes de transformá-los em regras e telas de um sistema.",
  },
];

export default function CareerJourney() {
  return (
    <section
      className={`section wrap ${styles.section}`}
      id="trajetoria"
      aria-labelledby="journey-title"
    >
      <div className={styles.intro}>
        <p className="eyebrow">
          <span>//</span> EXPERIÊNCIA PROFISSIONAL
        </p>
        <h2 id="journey-title">
          Minha trajetória<span className="blue">.</span>
        </h2>
        <p>Selecione uma etapa para conhecer minha experiência.</p>
        <a href="#curriculo" className={styles.link}>
          Ver currículo <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <ol
        className={styles.timeline}
        aria-label="Experiências profissionais, da mais recente à mais antiga"
      >
        {experiences.map((experience) => (
          <li key={experience.organization} className={styles.entry}>
            <details name="career-journey" className={styles.step}>
              <summary className={styles.trigger}>
                <span className={`${styles.period} mono`}>
                  <time dateTime={experience.start}>
                    {experience.period.split(" — ")[0]}
                  </time>
                  {" — "}
                  <time dateTime={experience.end}>
                    {experience.period.split(" — ")[1]}
                  </time>
                </span>
                <span className={styles.heading}>
                  <strong>{experience.role}</strong>
                  <span>
                    {experience.organization}
                    {experience.kind ? ` · ${experience.kind}` : ""}
                  </span>
                </span>
                <ChevronDown
                  className={styles.chevron}
                  size={18}
                  aria-hidden="true"
                />
              </summary>
              <div className={styles.content}>
                <p>{experience.description}</p>
                <p className={styles.connection}>{experience.connection}</p>
                {experience.project && (
                  <Link href={experience.project.href} className={styles.link}>
                    {experience.project.label}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}
