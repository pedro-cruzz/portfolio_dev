import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import type { Root, RootContent } from "hast";

export type DocumentHeading = { id: string; title: string; level: number };
function textContent(node: Root | RootContent): string {
  if (node.type === "text") return node.value;
  return "children" in node ? node.children.map(textContent).join("") : "";
}

// Run after sanitization, in both the reader and the table of contents.
// A fresh slugger preserves duplicate-heading suffixes in document order.
export function rehypeDocumentHeadings(options?: {
  headings?: DocumentHeading[];
}) {
  return (tree: Root) => {
    const slugger = new GithubSlugger();
    function visit(node: Root | RootContent) {
      if (node.type === "element" && /^h[1-6]$/.test(node.tagName)) {
        const title = textContent(node);
        const id = `doc-${slugger.slug(title)}`;
        node.properties.id = id;
        if (title.trim())
          options?.headings?.push({
            id,
            title,
            level: Number(node.tagName[1]),
          });
      }
      if ("children" in node) node.children.forEach(visit);
    }
    visit(tree);
  };
}

export function getDocumentHeadings(content: string): DocumentHeading[] {
  const headings: DocumentHeading[] = [];
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize)
    .use(rehypeDocumentHeadings, { headings });
  processor.runSync(processor.parse(content));
  return headings;
}
