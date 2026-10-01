import fs from "node:fs";
import path from "node:path";
import { projects } from "./portfolio";

export type DocumentSource = {
  repository: string;
  path: string;
  rawUrl: string;
  htmlUrl: string;
  syncedAt: string;
};
export type ProjectDocument = {
  id: string;
  filename: string;
  title: string;
  content: string;
  source?: DocumentSource;
};

export function getDocuments(slug: string): ProjectDocument[] {
  if (!projects.some((project) => project.slug === slug)) return [];
  const folder = path.join(process.cwd(), "content/documentation", slug);
  if (!fs.existsSync(folder)) return [];
  const documents = fs
    .readdirSync(folder, { withFileTypes: true })
    .filter(
      (file) => file.isFile() && /^[a-z0-9][a-z0-9-]*\.md$/i.test(file.name),
    )
    .map((file) => {
      const content = fs.readFileSync(path.join(folder, file.name), "utf8");
      const id = file.name.slice(0, -3).toLowerCase();
      const sourcePath = path.join(folder, "source.json");
      return {
        id,
        filename: file.name,
        content,
        title:
          id === "readme"
            ? "README"
            : (content.match(/^#\s+(.+)$/m)?.[1] ?? id.replaceAll("-", " ")),
        source:
          id === "readme" && fs.existsSync(sourcePath)
            ? (JSON.parse(
                fs.readFileSync(sourcePath, "utf8"),
              ) as DocumentSource)
            : undefined,
      };
    });
  if (new Set(documents.map((doc) => doc.id)).size !== documents.length) {
    throw new Error(`Documentos com nomes duplicados em ${slug}`);
  }
  return documents.sort((a, b) =>
    a.id === "readme"
      ? -1
      : b.id === "readme"
        ? 1
        : a.title.localeCompare(b.title, "pt-BR"),
  );
}

export function documentUrl(slug: string, id: string) {
  return `/projetos/${slug}/documentacao/${id}`;
}
