"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { Project } from "@/lib/portfolio";
import { withBasePath } from "@/lib/site-path";
export default function ProjectGallery({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const thumbnails = useRef<HTMLDivElement>(null);
  const image = project.images[index];
  useEffect(() => {
    const strip = thumbnails.current;
    const active = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !active) return;

    const left =
      active.getBoundingClientRect().left -
      strip.getBoundingClientRect().left +
      strip.scrollLeft;
    const right = left + active.offsetWidth;
    if (left < strip.scrollLeft) strip.scrollTo({ left, behavior: "smooth" });
    else if (right > strip.scrollLeft + strip.clientWidth)
      strip.scrollTo({ left: right - strip.clientWidth, behavior: "smooth" });
  }, [index]);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = old;
      };
    } else dialog.current?.close();
  }, [open]);
  function move(step: number) {
    setIndex((i) => (i + step + project.images.length) % project.images.length);
  }
  return (
    <div className={`project-gallery ${compact ? "compact" : ""} ${project.slug === "ija-system" ? "is-ija" : ""}`}>
      <figure className="gallery-figure">
        <button
          className="gallery-open"
          style={
            project.slug === "ija-system"
              ? { backgroundImage: `url("${withBasePath(image.src)}")` }
              : undefined
          }
          onClick={() => setOpen(true)}
          aria-label={`Ampliar imagem de ${project.name}`}
        >
          <img
            src={withBasePath(image.src)}
            alt={image.alt}
            width={image.width ?? 1440}
            height={image.height ?? 960}
          />
          <span className="gallery-expand">
            <Maximize2 size={15} />
            Ampliar
          </span>
        </button>
        <figcaption>{image.caption}</figcaption>
      </figure>
      <div className="gallery-controls">
        <div
          className="gallery-thumbnails"
          ref={thumbnails}
          role="group"
          aria-label={`Imagens de ${project.name}`}
        >
          {project.images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setIndex(i)}
              aria-pressed={index === i}
              aria-label={`Ver imagem ${i + 1} de ${project.name}`}
            >
              <img
                src={withBasePath(img.src)}
                alt=""
                width={img.width ?? 96}
                height={img.height ?? 64}
              />
              <span>0{i + 1}</span>
            </button>
          ))}
        </div>
        <div className="gallery-arrows">
          <span className="mono">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(project.images.length).padStart(2, "0")}
          </span>
          <button onClick={() => move(-1)} aria-label="Imagem anterior">
            <ChevronLeft size={17} />
          </button>
          <button onClick={() => move(1)} aria-label="Próxima imagem">
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="image-dialog"
        aria-label={`Galeria ampliada de ${project.name}`}
        onCancel={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            const buttons =
              e.currentTarget.querySelectorAll<HTMLButtonElement>("button");
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last?.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first?.focus();
            }
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
        }}
      >
        <div className="image-dialog-bar">
          <span>
            {project.name}{" "}
            <span className="muted">
              / {index + 1} de {project.images.length}
            </span>
          </span>
          <button
            autoFocus
            onClick={() => setOpen(false)}
            aria-label="Fechar imagem ampliada"
          >
            <X size={20} />
          </button>
        </div>
        <img
          src={withBasePath(image.src)}
          alt={image.alt}
          width={image.width ?? 1440}
          height={image.height ?? 960}
        />
        <div className="image-dialog-footer">
          <button
            onClick={() => move(-1)}
            aria-label="Imagem anterior ampliada"
          >
            <ChevronLeft size={19} />
          </button>
          <p>{image.caption}</p>
          <button onClick={() => move(1)} aria-label="Próxima imagem ampliada">
            <ChevronRight size={19} />
          </button>
        </div>
      </dialog>
    </div>
  );
}
