/** @jsxImportSource react */
import { ArrowUpRight } from "lucide-react";
import type { ProjectExperience } from "@/lib/portfolio";
import { withBasePath } from "@/lib/site-path";

export default function ProjectExperienceDetails({
  experience,
}: {
  experience?: ProjectExperience;
}) {
  if (!experience?.confirmed) return null;
  const responsibilities =
    experience.responsibilities?.filter((item) => item.trim()) ?? [];
  const facts = [
    ["Período", experience.period],
    [
      "Colaboração",
      experience.collaborator ? undefined : experience.collaboration,
    ],
    ["Natureza", experience.nature],
    ["Situação", experience.status],
    ["Registro", experience.registration],
    [
      "Créditos",
      experience.credits?.filter((credit) => credit.trim()).join(" · "),
    ],
  ].filter(([, value]) => value?.trim());
  const notes = [
    ["Minha contribuição", experience.contribution],
    ["O desafio que enfrentei", experience.challenge],
    ["A decisão tomada", experience.decision],
    ["Por que escolhi esse caminho", experience.rationale],
    ["Resultado observado", experience.outcome],
    ["Aprendizado", experience.learning],
  ].filter(([, value]) => value?.trim());
  if (
    !facts.length &&
    !notes.length &&
    !responsibilities.length &&
    !experience.collaborator
  )
    return null;

  return (
    <section className="case-experience" aria-labelledby="experience-title">
      <p className="eyebrow">
        <span>//</span>PARTICIPAÇÃO & TRAJETÓRIA
      </p>
      <h2 id="experience-title">
        {experience.collaborator
          ? "Autoria e participação no projeto."
          : "Minha experiência no projeto."}
      </h2>
      {experience.collaborator && (
        <a
          className="case-collaborator"
          href={experience.collaborator.portfolio}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>DESENVOLVEDOR E COAUTOR</span>
          <strong>{experience.collaborator.name}</strong>
          <span>
            Conhecer o portfólio dele <ArrowUpRight size={16} />
          </span>
        </a>
      )}
      {facts.length > 0 && (
        <dl className="case-facts">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                {value}
                {label === "Registro" && experience.registrationDocument && (
                  <a
                    className="case-certificate-link"
                    href={withBasePath(experience.registrationDocument)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver certificado (PDF)
                  </a>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {responsibilities.length > 0 && (
        <div className="case-experience-note">
          <h3>Minhas responsabilidades</h3>
          <ul>
            {responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {notes.map(([label, value]) => (
        <div className="case-experience-note" key={label}>
          <h3>{label}</h3>
          <p>{value}</p>
        </div>
      ))}
    </section>
  );
}
