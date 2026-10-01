"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderGit2,
  GitBranch,
  Layers3,
} from "lucide-react";
import {
  profile,
  projects,
  repositoryUrl,
  type Project,
} from "@/lib/portfolio";
import {
  projectVisuals,
  projectAreas,
  type ProjectArea,
} from "@/lib/project-explorer";
import ProjectBlueprint from "./project-blueprint";
import GitHubIcon from "./github-icon";
import { withBasePath } from "@/lib/site-path";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imageIndex, setImageIndex] = useState(0);
  const hasScreens = project.images.length > 0;
  const visual = projectVisuals[project.slug];
  const photo = project.images[imageIndex];
  const reduced = useReducedMotion();
  const move = (step: number) =>
    setImageIndex(
      (i) => (i + step + project.images.length) % project.images.length,
    );

  return (
    <motion.article
      initial={false}
      transition={{ duration: reduced ? 0 : 0.24 }}
      className="selected-project"
      data-project={project.slug}
    >
      <div className="project-repository">
        <span>
          <FolderGit2 size={16} />
          <span>{project.repoLabel ?? project.repo}</span>
        </span>
        {project.technicalStory ? (
          <span className="project-featured">
            <span /> EM DESTAQUE
          </span>
        ) : (
          <span className="project-index mono">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className="project-visual">
        <Link
          href={`/projetos/${project.slug}`}
          className={`project-cover ${hasScreens ? "" : "is-blueprint"} ${project.slug === "ija-system" ? "is-ija" : ""}`}
          style={
            project.slug === "ija-system" && photo
              ? { backgroundImage: `url("${withBasePath(photo.src)}")` }
              : undefined
          }
          aria-label={`Conhecer ${project.name}`}
        >
          {hasScreens ? (
            <>
              <img
                key={photo.src}
                src={withBasePath(photo.src)}
                alt={photo.alt}
                width={photo.width ?? 1440}
                height={photo.height ?? 960}
                loading="lazy"
              />
              <span className="cover-invitation">
                Explorar projeto <ArrowUpRight size={16} />
              </span>
            </>
          ) : (
            <ProjectBlueprint slug={project.slug} />
          )}
        </Link>
      </div>
      <div className="project-view-tools">
        <nav
          className="project-resource-links"
          aria-label={`Links de ${project.name}`}
        >
          <Link
            className="project-documentation-link"
            href={`/projetos/${project.slug}/documentacao/visao-tecnica`}
          >
            <FileText size={14} />
            Documentação
          </Link>
          <a
            className="project-github-link"
            href={repositoryUrl(project)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon size={15} />
            Ver no GitHub <ArrowUpRight size={13} />
          </a>
        </nav>
        {hasScreens ? (
          <div className="project-photo-nav">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={`Imagem anterior de ${project.name}`}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="mono" aria-live="polite">
              {imageIndex + 1}
              <span> / {project.images.length}</span>
            </span>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label={`Próxima imagem de ${project.name}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <span className="blueprint-label mono">
            <Layers3 size={13} />
            VISÃO GERAL
          </span>
        )}
      </div>
      <div className="project-card-details">
        <div className="project-byline">
          <span>{project.category}</span>
          <span className="project-language mono">
            <i />
            {visual.language}
          </span>
        </div>
        <h3>
          <Link href={`/projetos/${project.slug}`}>
            {project.name}
            <span className="project-code-symbol mono" aria-hidden="true">
              {visual.symbol}
            </span>
          </Link>
        </h3>
        <p className="project-summary">{project.summary}</p>
        {project.experience?.confirmed &&
          project.experience.collaboration &&
          project.experience.registrationNumber && (
            <div
              className="project-credentials"
              aria-label="Autoria e registro do projeto"
            >
              <p>
                <span>COAUTORES</span>
                <strong>{profile.name}</strong>
                {project.experience.collaborator ? (
                  <>
                    e
                    <strong className="project-partner-credit">
                      <a
                        href={project.experience.collaborator.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Abrir portfólio de ${project.experience.collaborator.name}`}
                      >
                        {project.experience.collaborator.name}
                        <ArrowUpRight size={13} />
                      </a>
                    </strong>
                  </>
                ) : (
                  project.experience.collaboration
                )}
              </p>
              <p>
                <span>REGISTRO INPI</span>
                <strong>{project.experience.registrationNumber}</strong>
                {project.experience.registrationDocument && (
                  <a
                    href={withBasePath(project.experience.registrationDocument)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver certificado do INPI de ${project.name}`}
                  >
                    Certificado <ArrowUpRight size={13} />
                  </a>
                )}
              </p>
            </div>
          )}
        <ul
          className="project-technologies"
          aria-label={`Tecnologias de ${project.name}`}
        >
          {project.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        {project.live && (
          <a
            className="project-live-link"
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.liveLabel ?? "Experimentar projeto"}
            <ArrowUpRight size={14} />
          </a>
        )}
        <div className="project-links">
          <Link className="project-open" href={`/projetos/${project.slug}`}>
            Explorar projeto <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectList() {
  const [index, setIndex] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const preview = useRef<HTMLDivElement>(null);
  const moveToPreview = useRef(false);
  const reduced = useReducedMotion();
  const [area, setArea] = useState<ProjectArea>("all");
  const visibleProjects = projects.filter(
    (p) => area === "all" || projectVisuals[p.slug].area === area,
  );
  const project = projects[index];
  useEffect(() => {
    try {
      const slug = sessionStorage.getItem("portfolio-project");
      const saved = projects.findIndex((p) => p.slug === slug);
      const savedArea = sessionStorage.getItem("portfolio-project-area");
      if (saved >= 0) {
        setIndex(saved);
        if (
          projectAreas.some((a) => a.id === savedArea) &&
          (savedArea === "all" ||
            projectVisuals[projects[saved].slug].area === savedArea)
        ) {
          setArea(savedArea as ProjectArea);
        }
      }
    } catch {}
  }, []);
  useLayoutEffect(() => {
    if (!moveToPreview.current) return;
    moveToPreview.current = false;
    preview.current?.focus({ preventScroll: true });
    preview.current?.scrollIntoView({
      behavior: reduced ? "instant" : "smooth",
      block: "start",
    });
  }, [index, pickerOpen, reduced]);
  function selectProject(next: number, explicitChoice = false) {
    if (explicitChoice && window.matchMedia("(max-width: 700px)").matches) {
      moveToPreview.current = true;
      setPickerOpen(false);
    }
    setIndex(next);
    try {
      sessionStorage.setItem("portfolio-project", projects[next].slug);
    } catch {}
  }
  function navigate(step: number) {
    const current = visibleProjects.indexOf(project);
    const next =
      visibleProjects[
        (current + step + visibleProjects.length) % visibleProjects.length
      ];
    selectProject(projects.indexOf(next));
  }
  function filterProjects(next: ProjectArea) {
    setArea(next);
    try {
      sessionStorage.setItem("portfolio-project-area", next);
    } catch {}
    selectProject(
      next !== "all" && projectVisuals[project.slug].area !== next
        ? projects.findIndex((p) => projectVisuals[p.slug].area === next)
        : index,
    );
  }
  return (
    <>
      <div
        className="project-area-filter"
        role="group"
        aria-label="Filtrar projetos"
      >
        {projectAreas.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={area === option.id}
            aria-controls="project-directory"
            onClick={() => filterProjects(option.id)}
          >
            {option.label}
            <span className="mono">
              {
                projects.filter(
                  (p) =>
                    option.id === "all" ||
                    projectVisuals[p.slug].area === option.id,
                ).length
              }
            </span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="project-picker-toggle"
        aria-expanded={pickerOpen}
        aria-controls="project-directory"
        onClick={() => setPickerOpen((open) => !open)}
      >
        <span>
          Escolher projeto <strong>{project.name}</strong>
        </span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      <div
        id="project-directory"
        className={`project-directory-list ${pickerOpen ? "is-open" : ""}`}
        role="group"
        aria-label="Escolher projeto"
      >
        {visibleProjects.map((item) => (
          <button
            key={item.slug}
            type="button"
            aria-pressed={project.slug === item.slug}
            aria-controls="project-results"
            aria-label={`Selecionar ${item.name}`}
            onClick={() => selectProject(projects.indexOf(item), true)}
          >
            <span className="project-choice-heading">
              <span className="mono" aria-hidden="true">
                {String(projects.indexOf(item) + 1).padStart(2, "0")}
              </span>
              <strong>{item.name}</strong>
            </span>
          </button>
        ))}
      </div>
      <nav className="project-switcher" aria-label="Navegar entre projetos">
        {visibleProjects.length > 1 && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Projeto anterior"
            aria-controls="project-results"
          >
            <ChevronLeft size={18} />
            <span>Anterior</span>
          </button>
        )}
        <div className="project-position" role="status" aria-atomic="true">
          <span className="mono">
            <strong>
              {String(visibleProjects.indexOf(project) + 1).padStart(2, "0")}
            </strong>{" "}
            / {String(visibleProjects.length).padStart(2, "0")}
          </span>
          <span>{project.name}</span>
        </div>
        {visibleProjects.length > 1 && (
          <button
            type="button"
            className="project-next"
            onClick={() => navigate(1)}
            aria-label="Próximo projeto"
            aria-controls="project-results"
          >
            <span>Próximo</span>
            <ChevronRight size={18} />
          </button>
        )}
      </nav>
      <div
        className="selected-projects project-showcase"
        id="project-results"
        ref={preview}
        tabIndex={-1}
        role="region"
        aria-label={`Projeto em destaque: ${project.name}`}
      >
        <ProjectCard key={project.slug} project={project} index={index} />
      </div>
      <div className="project-archive">
        <span className="archive-symbol" aria-hidden="true">
          <GitBranch size={25} />
        </span>
        <div>
          <span className="mono">REPOSITÓRIOS & ESTUDOS</span>
          <p>Outros projetos, estudos e experimentos.</p>
        </div>
        <a
          href={`${profile.github}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
        >
          Explorar meu GitHub <ArrowUpRight size={17} />
        </a>
      </div>
    </>
  );
}
