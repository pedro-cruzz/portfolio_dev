/** @jsxImportSource react */
import { createElement } from "react";
import Markdown, { defaultUrlTransform, type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { rehypeDocumentHeadings } from "@/lib/document-headings";
import type { ProjectDocument } from "@/lib/documentation";
import { withBasePath } from "@/lib/site-path";

type Props = {
  slug: string;
  document: ProjectDocument;
  documents: ProjectDocument[];
};

export default function DocumentMarkdown({ slug, document, documents }: Props) {
  const components: Components = {
    a: ({ href, children }) => (
      <a
        href={href}
        {...(href?.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    ),
    img: ({ src, alt, width, height }) =>
      src ? (
        <img
          src={src}
          alt={alt ?? ""}
          width={width}
          height={height}
          loading="lazy"
        />
      ) : null,
    table: ({ children }) => (
      <div
        className="doc-table"
        role="region"
        aria-label="Tabela da documentação"
        tabIndex={0}
      >
        <table>{children}</table>
      </div>
    ),
  };
  for (const level of [1, 2, 3, 4, 5, 6] as const) {
    components[`h${level}`] = ({ children, node }) =>
      createElement(
        `h${Math.min(level + 1, 6)}`,
        { id: node?.properties.id, tabIndex: -1 },
        children,
      );
  }
  function resolveUrl(value: string, key: string) {
    const safe = defaultUrlTransform(value);
    if (!safe) return "";
    if (safe.startsWith("#")) return `#doc-${safe.slice(1)}`;
    if (/^[a-z][a-z\d+.-]*:/i.test(safe)) {
      return /^(https?:|mailto:)/i.test(safe) ? safe : "";
    }
    if (safe.startsWith("//")) return `https:${safe}`;
    const [pathname, fragment] = safe.split("#", 2);
    let decodedPath: string;
    try {
      decodedPath = decodeURIComponent(pathname).replace(/^\.\//, "");
    } catch {
      return "";
    }
    // Sibling Markdown files open in the portfolio once added locally.
    const local =
      key === "href" &&
      documents.find(
        (doc) => doc.filename.toLowerCase() === decodedPath.toLowerCase(),
      );
    if (local)
      return withBasePath(
        `/projetos/${slug}/documentacao/${local.id}${fragment ? `#doc-${fragment}` : ""}`,
      );
    if (document.source) {
      const base =
        key === "src" ? document.source.rawUrl : document.source.htmlUrl;
      // Repository-root paths are relative to its branch, not github.com itself.
      const rootBase = base.slice(0, base.length - document.source.path.length);
      return new URL(
        safe.replace(/^\//, ""),
        safe.startsWith("/") ? rootBase : base,
      ).href;
    }
    return withBasePath(safe);
  }
  return (
    <div className="doc-markdown">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeDocumentHeadings]}
        components={components}
        urlTransform={resolveUrl}
      >
        {document.content}
      </Markdown>
    </div>
  );
}
