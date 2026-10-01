import { test, expect } from "@playwright/test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync, unlinkSync } from "node:fs";
import DocumentMarkdown from "../components/document-markdown";
import { getDocuments } from "../lib/documentation";
import { projects, repositoryUrl } from "../lib/portfolio";
import sources from "../lib/documentation-sources.json" with { type: "json" };

test("READMEs belong to selected projects and local guides are discovered", () => {
  for (const [slug, repository] of Object.entries(sources)) {
    const project = projects.find((p) => p.slug === slug)!;
    expect(repositoryUrl(project)).toBe(`https://github.com/${repository}`);
    if (slug !== "copa-2026")
      expect(getDocuments(slug)[0]?.source?.repository).toBe(repository);
  }
  expect(getDocuments("../")).toEqual([]);
  expect(getDocuments("lias-news")).toEqual([]);
  const file = "content/documentation/ija-system/test-guide.md";
  try {
    writeFileSync(file, "# Guia de teste\n\nConteúdo local.");
    expect(
      getDocuments("ija-system").find((doc) => doc.id === "test-guide")?.title,
    ).toBe("Guia de teste");
  } finally {
    unlinkSync(file);
  }
});

test("home project controls open technical documentation directly", async ({
  page,
}) => {
  await page.goto("/#projetos");
  const card = page.locator('.selected-project[data-project="ija-system"]');
  await card.getByRole("link", { name: "Documentação", exact: true }).click();
  await expect(page).toHaveURL(
    /\/projetos\/ija-system\/documentacao\/visao-tecnica$/,
  );
  await expect(
    page.getByRole("heading", { name: "Requisitos funcionais observáveis" }),
  ).toBeVisible();
});

test("Markdown sanitizes active content and resolves links, images and heading anchors", async ({
  page,
}) => {
  const readme = getDocuments("ija-system")[0];
  const document = {
    ...readme,
    content: `# Exemplo

## Instalação

## Instalação

[Índice](#instalação)
[Guia](guia.md#etapas)
[Arquivo](docs/setup.md)
![Imagem](assets/demo.png)
[Perigoso](javascript:alert(1))
<script>window.injected = true</script>
<img src="https://example.com/test.png" onerror="window.injected=true">
<iframe src="https://example.com"></iframe>

| Campo | Valor |
| --- | --- |
| Exemplo | Sim |

\`\`\`js
const text = '<script>alert(1)</script>';
\`\`\`
`,
  };
  const guide = {
    id: "guia",
    filename: "guia.md",
    title: "Guia",
    content: "# Guia",
  };
  const html = renderToStaticMarkup(
    createElement(DocumentMarkdown, {
      slug: "ija-system",
      document,
      documents: [document, guide],
    }),
  );
  await page.route("https://**/*", (route) => route.abort());
  await page.setContent(html);
  expect(await page.locator("script,iframe,[onerror]").count()).toBe(0);
  await expect(page.getByText("Perigoso", { exact: true })).not.toHaveAttribute(
    "href",
    /javascript/,
  );
  await expect(
    page.getByRole("link", { name: "Guia", exact: true }),
  ).toHaveAttribute(
    "href",
    "/projetos/ija-system/documentacao/guia#doc-etapas",
  );
  await expect(page.getByRole("link", { name: "Arquivo" })).toHaveAttribute(
    "href",
    "https://github.com/pedro-cruzz/IJA-System/blob/main/docs/setup.md",
  );
  await expect(page.getByAltText("Imagem")).toHaveAttribute(
    "src",
    "https://raw.githubusercontent.com/pedro-cruzz/IJA-System/main/assets/demo.png",
  );
  await expect(page.locator("#doc-instalação")).toBeVisible();
  await expect(page.locator("#doc-instalação-1")).toBeVisible();
  await expect(page.locator("table")).toBeVisible();
  await expect(page.locator("pre code")).toContainText(
    "<script>alert(1)</script>",
  );
});

test("documentation opens from case, adapts to both themes and returns to project", async ({
  page,
}) => {
  await page.goto("/projetos/ija-system");
  await page.getByRole("link", { name: "Documentação", exact: true }).click();
  await expect(page).toHaveURL(/documentacao\/visao-tecnica$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "IJA System.",
  );
  await expect(page.locator(".doc-markdown")).toContainText("IJA");
  await expect(page.locator(".doc-markdown")).toContainText(
    "Requisitos funcionais observáveis",
  );
  await expect(
    page.getByRole("heading", { name: "Esquema do projeto" }),
  ).toBeVisible();
  await expect(
    page.locator(".documentation-scheme .blueprint-step"),
  ).toHaveCount(3);
  const architectureDiagram = page.locator(
    '.doc-markdown img[src="/docs/ija-system/arquitetura.svg"]',
  );
  await architectureDiagram.scrollIntoViewIfNeeded();
  await expect(architectureDiagram).toHaveJSProperty("naturalWidth", 900);
  const dataModelDiagram = page.locator(
    '.doc-markdown img[src="/docs/ija-system/modelo-dados.svg"]',
  );
  await dataModelDiagram.scrollIntoViewIfNeeded();
  await expect(dataModelDiagram).toHaveJSProperty("naturalWidth", 1040);
  await expect(
    page
      .getByRole("navigation", { name: "Documentação do projeto" })
      .getByRole("link", { name: "README" }),
  ).toBeVisible();
  for (const theme of ["dark", "light"]) {
    await page.evaluate(
      (theme) => (document.documentElement.dataset.theme = theme),
      theme,
    );
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      await expect(page.locator(".document-toolbar")).toBeVisible();
      if (
        (width === 390 && theme === "light") ||
        (width === 1440 && theme === "dark")
      ) {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({
          path: `/private/tmp/documentation-${width}-${theme}.png`,
        });
      }
    }
  }
  await page.getByRole("link", { name: "Voltar ao projeto" }).click();
  await expect(page).toHaveURL(/\/projetos\/ija-system$/);
});

test("all available READMEs open, unavailable ones do not advertise an empty reader", async ({
  page,
}) => {
  for (const project of projects) {
    const docs = getDocuments(project.slug);
    if (docs.length) {
      const response = await page.goto(
        `/projetos/${project.slug}/documentacao/${docs[0].id}`,
      );
      expect(response?.status()).toBe(200);
      await expect(page.locator(".doc-markdown")).toBeVisible();
    } else {
      await page.goto(`/projetos/${project.slug}`);
      await expect(
        page.getByRole("link", { name: "Documentação", exact: true }),
      ).toHaveCount(0);
    }
  }
});
