import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Code2,
  ChevronRight,
} from "lucide-react";
import { documentUrl, getDocuments } from "@/lib/documentation";
import { profile, projects, repositoryUrl } from "@/lib/portfolio";
import ProjectBlueprint from "@/components/project-blueprint";
import ProjectGallery from "@/components/project-gallery";
import ThemeToggle from "@/components/theme-toggle";
import ProjectExperienceDetails from "@/components/project-experience";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return {
    title: p ? `${p.name} — ${profile.name}` : "Projeto",
    description: p?.summary,
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const documents = getDocuments(slug);
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
      <a className="skip-link" href="#case-content">
        Pular para o case
      </a>
      <header className="header wrap case-header">
        <Link href="/#projetos" className="case-back">
          <ArrowLeft size={16} />
          Voltar aos projetos
        </Link>
        <ThemeToggle />
      </header>
      <main id="case-content" className="case-page wrap">
        <div className="case-breadcrumb mono">
          <Link href="/#projetos">projetos</Link>
          <ChevronRight size={13} />
          <span>{project.repoLabel ?? project.repo}</span>
        </div>
        <section className="case-hero">
          <p className="eyebrow">
            <span>//</span>
            {project.category}
          </p>
          <h1>
            {project.name}
            <span className="blue">.</span>
          </h1>
          <p>{project.summary}</p>
          <div className="case-links">
            {project.live && (
              <a
                className="button primary"
                href={project.live}
                target="_blank"
                rel="noreferrer"
              >
                {project.liveLabel ?? "Experimentar projeto"}
                <ArrowUpRight size={16} />
              </a>
            )}
            {documents.length > 0 && (
              <Link
                className={`button ${project.live ? "secondary" : "primary"}`}
                href={documentUrl(slug, documents.find((doc) => doc.id === "visao-tecnica")?.id ?? documents[0].id)}
              >
                <BookOpen size={17} /> Documentação
              </Link>
            )}
            <a
              className={`button ${project.live || documents.length ? "secondary" : "primary"}`}
              href={repositoryUrl(project)}
              target="_blank"
              rel="noreferrer"
            >
              <Code2 size={17} />
              Ver repositório
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="tags">
            {project.stack.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </section>
        <section
          className="case-gallery-section"
          aria-label={`${project.images.length ? "Capturas" : "Visão técnica"} de ${project.name}`}
        >
          {project.images.length ? (
            <ProjectGallery project={project} />
          ) : (
            <div className="case-blueprint">
              <ProjectBlueprint slug={project.slug} />
            </div>
          )}
          <p className="capture-note">{project.captureNote}</p>
        </section>
        <section className="case-story">
          <div>
            <p className="eyebrow">
              <span>//</span>CONTEXTO
            </p>
            <h2>O problema.</h2>
            <p>{project.context}</p>
          </div>
          <div>
            <p className="eyebrow">
              <span>//</span>CONSTRUÇÃO
            </p>
            <h2>A solução.</h2>
            <p>{project.solution}</p>
          </div>
        </section>
        <ProjectExperienceDetails experience={project.experience} />
        {project.technicalStory &&
          !(
            project.experience?.confirmed && project.experience.decision?.trim()
          ) && (
            <section className="case-decision" aria-labelledby="decision-title">
              <div className="case-decision-intro">
                <p className="eyebrow">
                  <span>//</span>LEITURA TÉCNICA
                </p>
                <h2 id="decision-title">{project.technicalStory.title}</h2>
                <ol className="case-walkthrough" aria-label="Fluxo do projeto">
                  {project.technicalStory.walkthrough.map((step, index) => (
                    <li key={step}>
                      <span className="mono" aria-hidden="true">
                        0{index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="case-decision-copy">
                <div>
                  <h3>O desafio</h3>
                  <p>{project.technicalStory.challenge}</p>
                </div>
                <div>
                  <h3>A abordagem</h3>
                  <p>{project.technicalStory.approach}</p>
                </div>
                <div>
                  <h3>O que essa abordagem permite</h3>
                  <p>{project.technicalStory.rationale}</p>
                </div>
              </div>
            </section>
          )}
        <section className="case-features">
          <p className="eyebrow">
            <span>//</span>NA PRÁTICA
          </p>
          <h2>O que você pode explorar.</h2>
          <div>
            {project.features.map((f, i) => (
              <article key={f.title}>
                <span className="mono blue">0{i + 1}</span>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="case-architecture">
          <p className="eyebrow">
            <span>//</span>POR DENTRO DO PROJETO
          </p>
          <h2>Como as partes se conectam.</h2>
          <div>
            {project.architecture.map((item, i) => (
              <article key={item.title}>
                <span className="mono">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="case-source">
          <Code2 size={19} />
          <p>
            Recursos e tecnologias descritos a partir do código e da
            documentação do projeto.
          </p>
          <a href={repositoryUrl(project)} target="_blank" rel="noreferrer">
            Consultar fonte
            <ArrowUpRight size={14} />
          </a>
        </div>
        <nav className="case-next" aria-label="Mais projetos">
          <Link className="case-back" href="/#projetos">
            <ArrowLeft size={16} />
            Todos os projetos
          </Link>
          <Link href={`/projetos/${next.slug}`}>
            <span className="mono">PRÓXIMO PROJETO</span>
            <strong>
              {next.name}
              <ArrowUpRight size={26} />
            </strong>
          </Link>
        </nav>
      </main>
    </>
  );
}
