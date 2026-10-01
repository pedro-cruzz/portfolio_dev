"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  Code2,
  Moon,
  Sun,
} from "lucide-react";
import { contactChannels, profile } from "@/lib/portfolio";
import ProjectList from "./project-list";
import ResumeContact from "./resume-contact";
import AmbientControl from "./ambient-control";
import BrandMark from "./brand-mark";
import GitHubIcon from "./github-icon";
import useWorkbenchInteractions from "./use-workbench-interactions";
const Workbench = dynamic(() => import("./workbench"), {
  ssr: false,
  loading: () => (
    <div className="scene-loading">
      <span className="loader" />
      Preparando a bancada
      <span className="mono">notebook, café e som ambiente.</span>
    </div>
  ),
});

const technologies = [
  "Python",
  "React",
  "TypeScript",
  "PostgreSQL",
  "Flask",
  "Django",
];
export default function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [sceneActive, setSceneActive] = useState(true);
  const reduced = useReducedMotion();
  const workbench = useWorkbenchInteractions(!!reduced);
  const sceneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "light" ? "light" : "dark",
    );
    const system = matchMedia("(prefers-color-scheme: light)");
    const change = () => {
      try {
        if (localStorage.getItem("portfolio-theme")) return;
      } catch {}
      const next = system.matches ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    system.addEventListener("change", change);
    return () => system.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    let visible = true;
    const sync = () => setSceneActive(visible && !document.hidden);
    const observer = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        sync();
      },
      { rootMargin: "80px" },
    );
    if (sceneRef.current) observer.observe(sceneRef.current);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {}
  }
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="header wrap">
        <a className="brand" href="#inicio" aria-label="Pedro Henrique, início">
          <BrandMark />
          <span>
            Pedro Henrique
            <span className="brand-caption">SOFTWARE DEVELOPER</span>
          </span>
        </a>
        <nav aria-label="Navegação principal">
          <a className="nav-secondary" href="#sobre">
            Sobre
          </a>
          <a href="#projetos">Projetos</a>
          <a className="nav-secondary" href="#curriculo">
            Currículo
          </a>
          <a className="nav-secondary" href="#contato">
            Contato
          </a>
          <span className="nav-divider" />
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
            }
          >
            <Sun size={16} />
            <Moon size={15} />
            <span className={`theme-thumb ${theme}`} />
          </button>
        </nav>
      </header>
      <main id="conteudo">
        <section className="hero wrap" id="inicio" aria-labelledby="hero-title">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65 }}
          >
            <p className="greeting">
              <span className="tiny-line" />
              Desenvolvedor de software
            </p>
            <h1 id="hero-title">
              Pedro
              <br />
              <span>
                Henrique<span className="title-dot">.</span>
              </span>
            </h1>
            <p className="hero-description">
              Desenvolvo sistemas web para organizar operações reais, com foco
              em backend, dados e interfaces que ajudam as pessoas a trabalhar.
            </p>
            <div className="hero-actions">
              <a href="#projetos" className="button primary">
                Explorar projetos <ArrowUpRight size={18} />
              </a>
              {profile.github ? (
                <a
                  className="button secondary"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon size={17} />
                  Ver meu GitHub
                </a>
              ) : (
                <a className="button secondary" href="#sobre">
                  Sobre mim <ChevronRight size={16} />
                </a>
              )}
            </div>
            <a href="#sobre" className="scroll-hint">
              <span className="scroll-mouse">
                <i />
              </span>
              UM POUCO MAIS SOBRE MIM
              <ArrowDown size={13} />
            </a>
          </motion.div>
          <div className="scene-column" ref={sceneRef}>
            <div className="scene-stage">
              <Workbench
                theme={theme}
                notebookOpen={workbench.notebookOpen}
                coffeePulse={workbench.coffeePulse}
                audioPlaying={workbench.audioPlaying}
                onSelect={workbench.interact}
                reducedMotion={!!reduced}
                active={sceneActive}
              />
            </div>
            <div className="scene-instruction" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={workbench.message}
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.18 }}
                >
                  <span>{workbench.message}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
        <div
          className="stack-strip wrap"
          aria-label="Tecnologias dos meus projetos"
        >
          <span className="stack-caption mono">PRINCIPAIS TECNOLOGIAS</span>
          <ul>
            {technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          <Code2 size={19} />
        </div>
        <section className="about section wrap" id="sobre">
          <div className="section-intro">
            <p className="eyebrow">
              <span>//</span> SOBRE MIM
            </p>
            <h2>
              Software para <br />
              operações reais<span className="blue">.</span>
            </h2>
          </div>
          <div className="about-copy">
            <p>
              Sou Pedro Henrique Cruz Vilas Bôas, desenvolvedor de software
              formado em Análise e Desenvolvimento de Sistemas pelo Centro
              Universitário de Itajubá (FEPI, 2024–2026). Desde 2026, curso
              Sistemas de Informação na mesma instituição. Durante meu estágio
              na IJA Drones, trabalhei no desenvolvimento e na manutenção de
              um sistema usado para organizar solicitações, equipes, ordens de
              serviço, frota e relatórios de operações com drones.
            </p>
            <p className="muted">
              Tenho experiência prática com Python, Flask, PostgreSQL, modelagem
              de dados, regras de acesso e integrações. Nos meus projetos,
              também exploro Django, React, TypeScript e interfaces interativas.
              Gosto de entender o fluxo de trabalho antes de decidir como
              organizar as regras, os dados e as telas.
            </p>
          </div>
        </section>
        <section className="projects section wrap" id="projetos">
          <div className="section-heading projects-heading">
            <div>
              <p className="eyebrow">
                <span>//</span> PROJETOS SELECIONADOS
              </p>
              <h2 id="projects-title" tabIndex={-1}>
                Projetos<span className="blue">.</span>
              </h2>
            </div>
            <div className="projects-intro">
              <span className="project-directory mono">
                <Code2 size={16} /> ~/pedro/projetos
              </span>
              <p>
                Reuni aqui sistemas de gestão, aplicações web e experiências
                interativas. Em cada projeto, mostro o problema atendido, como a
                aplicação funciona e as escolhas técnicas que podem ser vistas
                no código.
              </p>
            </div>
          </div>
          <ProjectList />
        </section>
        <ResumeContact />
      </main>
      {workbench.audioPlaying && (
        <AmbientControl
          track={workbench.track}
          paused={workbench.audioPaused}
          progress={workbench.progress}
          duration={workbench.duration}
          volume={workbench.volume}
          onTrack={workbench.setTrack}
          onStep={workbench.stepTrack}
          onTogglePlayback={workbench.togglePlayback}
          onSeek={workbench.seekAudio}
          onVolume={workbench.setVolume}
          onStop={workbench.stopAudio}
        />
      )}
      <footer className="footer wrap">
        <a className="brand footer-brand" href="#inicio">
          <BrandMark />
          <span>
            Pedro Henrique
            <small>Sistemas web e experiências interativas.</small>
          </span>
        </a>
        <div className="footer-links">
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={13} />
            </a>
          )}
          {contactChannels
            .filter((channel) => channel.href)
            .map((channel) => (
              <a
                key={channel.id}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noreferrer" : undefined}
              >
                {channel.label} <ArrowUpRight size={13} />
              </a>
            ))}
          <a href="#curriculo">Currículo</a>
          <a href="#contato">
            Contato <ArrowUpRight size={13} />
          </a>
          <a href="#inicio" className="back-top" aria-label="Voltar ao topo">
            <ArrowDown size={16} />
          </a>
        </div>
      </footer>
    </MotionConfig>
  );
}
