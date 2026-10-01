import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BookOpen, FileText } from "lucide-react";
import { projects } from "@/lib/portfolio";
import { documentUrl, getDocuments } from "@/lib/documentation";
import DocumentMarkdown from "@/components/document-markdown";
import DocumentToc from "@/components/document-toc";
import ProjectBlueprint from "@/components/project-blueprint";
import { getDocumentHeadings } from "@/lib/document-headings";
import ThemeToggle from "@/components/theme-toggle";

type Props = { params: Promise<{ slug: string; document: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.flatMap((project) =>
    getDocuments(project.slug).map((doc) => ({
      slug: project.slug,
      document: doc.id,
    })),
  );
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, document } = await params;
  const project = projects.find((p) => p.slug === slug);
  const doc = getDocuments(slug).find((d) => d.id === document);
  return {
    title: `${doc?.title ?? "Documentação"} · ${project?.name ?? "Projeto"} — Pedro Henrique`,
  };
}
export default async function DocumentationPage({ params }: Props) {
  const { slug, document } = await params;
  const project = projects.find((p) => p.slug === slug);
  const documents = getDocuments(slug);
  const doc = documents.find((d) => d.id === document);
  if (!project || !doc) notFound();
  return (
    <>
      <a className="skip-link" href="#document-content">
        Pular para a documentação
      </a>
      <header className="header wrap case-header">
        <Link href={`/projetos/${slug}`} className="case-back">
          <ArrowLeft size={16} />
          Voltar ao projeto
        </Link>
        <ThemeToggle />
      </header>
      <main className="wrap documentation-page">
        <div className="documentation-heading">
          <p className="eyebrow">
            <span>//</span> DOCUMENTAÇÃO
          </p>
          <h1>
            {project.name}
            <span className="blue">.</span>
          </h1>
          <p>Requisitos, arquitetura e evidências no código.</p>
        </div>
        <div className="documentation-layout">
          <aside className="documentation-sidebar">
            <p className="mono">
              <BookOpen size={15} /> Documentos
            </p>
            <nav aria-label="Documentação do projeto">
              {documents.map((item) => (
                <Link
                  key={item.id}
                  href={documentUrl(slug, item.id)}
                  aria-current={item.id === doc.id ? "page" : undefined}
                >
                  <FileText size={15} />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
            <Link className="doc-project-link" href={`/projetos/${slug}`}>
              Conhecer o projeto <ArrowUpRight size={14} />
            </Link>
            <DocumentToc
              key={doc.id}
              headings={getDocumentHeadings(doc.content)}
            />
          </aside>
          <article id="document-content" className="documentation-article">
            <div className="document-toolbar">
              <span className="mono">
                <FileText size={14} />
                {doc.filename}
              </span>
              {doc.source && (
                <a
                  href={doc.source.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver no GitHub <ArrowUpRight size={14} />
                </a>
              )}
            </div>
            {doc.id === "visao-tecnica" && (
              <section
                className="documentation-scheme"
                aria-labelledby="documentation-scheme-title"
              >
                <h2 id="documentation-scheme-title">Esquema do projeto</h2>
                <ProjectBlueprint slug={slug} />
              </section>
            )}
            <DocumentMarkdown
              slug={slug}
              document={doc}
              documents={documents}
            />
            {doc.source && (
              <p className="document-source">
                {slug === "ija-system"
                  ? "README adaptado para o portfólio · Versão do repositório consultada em "
                  : "Cópia do README do repositório · Sincronizada em "}
                {new Date(doc.source.syncedAt).toLocaleDateString("pt-BR", {
                  timeZone: "America/Sao_Paulo",
                })}
              </p>
            )}
          </article>
        </div>
      </main>
    </>
  );
}
