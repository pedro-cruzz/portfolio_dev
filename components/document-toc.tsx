"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DocumentHeading } from "@/lib/document-headings";

export default function DocumentToc({
  headings,
}: {
  headings: DocumentHeading[];
}) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  if (!headings.length) return null;
  const baseLevel = Math.min(...headings.map((heading) => heading.level));
  return (
    <div className="document-toc">
      <p className="toc-desktop-label">Nesta documentação</p>
      <button
        ref={toggle}
        type="button"
        className="toc-toggle"
        aria-expanded={open}
        aria-controls="document-toc-links"
        onClick={() => setOpen(!open)}
      >
        Sumário <ChevronDown size={16} aria-hidden="true" />
      </button>
      <nav
        id="document-toc-links"
        className={open ? "is-open" : ""}
        aria-label="Sumário da documentação"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            toggle.current?.focus();
          }
        }}
      >
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            style={{
              paddingInlineStart: `${12 + Math.min(heading.level - baseLevel, 2) * 12}px`,
            }}
            onClick={(event) => {
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return;
              const target = document.getElementById(heading.id);
              if (!target) return;
              event.preventDefault();
              setOpen(false);
              history.pushState(null, "", `#${encodeURIComponent(heading.id)}`);
              requestAnimationFrame(() => {
                target.focus({ preventScroll: true });
                target.scrollIntoView({ behavior: "instant", block: "start" });
              });
            }}
          >
            {heading.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
