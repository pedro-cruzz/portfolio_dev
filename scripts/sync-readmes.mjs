import { readFile, mkdir, writeFile, rename } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const sources = JSON.parse(
  await readFile(path.join(root, "lib/documentation-sources.json"), "utf8"),
);
const requested = process.argv.slice(2);
const slugs = requested.length ? requested : Object.keys(sources);
const ijaSourceCredit =
  "## Autor\n\nDesenvolvido por Pedro Cruz e João Pedro, com foco em sistemas web, automação de processos operacionais, gestão de dados e ferramentas internas para equipes de campo.";
const ijaPortfolioCredit =
  "## Coautoria\n\nDesenvolvido em coautoria com [João Pedro Gomes da Silva](https://jpgomes035.github.io/joaopedro-portfolio/), com foco em sistemas web, automação de processos operacionais, gestão de dados e ferramentas internas para equipes de campo.";

function adaptReadme(slug, content) {
  if (slug !== "ija-system") return content;
  if (content.includes(ijaPortfolioCredit)) return content;
  if (!content.includes(ijaSourceCredit)) {
    throw new Error(
      "Crédito do IJA mudou; revise a adaptação antes de sincronizar",
    );
  }
  return content.replace(ijaSourceCredit, ijaPortfolioCredit);
}

if (slugs.some((slug) => !Object.hasOwn(sources, slug))) {
  console.error(
    "Projeto desconhecido. Consulte lib/documentation-sources.json.",
  );
  process.exit(1);
}
for (const slug of slugs) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${sources[slug]}/readme`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "pedro-portfolio-docs",
        },
        signal: AbortSignal.timeout(20000),
      },
    );
    if (response.status === 404) {
      console.log(
        `${slug}: README não encontrado no GitHub; nenhuma alteração.`,
      );
      continue;
    }
    if (!response.ok) throw new Error(`GitHub respondeu ${response.status}`);
    const data = await response.json();
    if (
      data.encoding !== "base64" ||
      !data.content ||
      !data.download_url ||
      !data.html_url
    ) {
      throw new Error("README indisponível ou resposta inesperada");
    }
    const content = adaptReadme(
      slug,
      Buffer.from(data.content, "base64").toString("utf8"),
    );
    const folder = path.join(root, "content/documentation", slug);
    await mkdir(folder, { recursive: true });
    // Keep the previous snapshot on download failure; never overwrite additional .md files.
    await writeFile(path.join(folder, "README.md.tmp"), content);
    await writeFile(
      path.join(folder, "source.json.tmp"),
      JSON.stringify(
        {
          repository: sources[slug],
          path: data.path,
          rawUrl: data.download_url,
          htmlUrl: data.html_url,
          syncedAt: new Date().toISOString(),
        },
        null,
        2,
      ) + "\n",
    );
    await rename(
      path.join(folder, "source.json.tmp"),
      path.join(folder, "source.json"),
    );
    await rename(
      path.join(folder, "README.md.tmp"),
      path.join(folder, "README.md"),
    );
    console.log(`${slug}: README atualizado`);
  } catch (error) {
    console.error(`${slug}: ${error.message}. Cópia anterior preservada.`);
    process.exitCode = 1;
  }
}
