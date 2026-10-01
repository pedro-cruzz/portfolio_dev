import { test, expect } from "@playwright/test";
import { projects } from "../lib/portfolio";
import { getDocuments } from "../lib/documentation";
import { getDocumentHeadings } from "../lib/document-headings";

for (const width of [320, 390]) {
  test(`compact selection connects to preview and restores category at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({
      reducedMotion: width === 320 ? "reduce" : "no-preference",
    });
    await page.goto("/");
    await expect(page.locator(".selected-project")).toHaveAttribute(
      "data-project",
      "ija-system",
    );
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    const picker = page.getByRole("button", { name: /^Escolher projeto/ });
    await expect(picker).toHaveAttribute("aria-expanded", "false");
    const offset = await page
      .locator("#projetos")
      .evaluate(
        (section) =>
          section.querySelector(".project-cover")!.getBoundingClientRect().top -
          section.getBoundingClientRect().top,
      );
    expect(offset).toBeLessThan(550);
    await picker.click();
    await expect(page.locator("#project-directory button")).toHaveCount(12);
    await page
      .getByRole("button", { name: "Selecionar Pose Lab", exact: true })
      .focus();
    await page.keyboard.press("Enter");
    await expect(picker).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#project-results")).toBeFocused();
    await expect(page.locator(".selected-project")).toHaveAttribute(
      "data-project",
      "pose-lab",
    );
    await expect
      .poll(() =>
        page.locator("#project-results").evaluate((el) => {
          const top = el.getBoundingClientRect().top;
          return top >= 0 && top < 100;
        }),
      )
      .toBe(true);
    await page
      .getByRole("group", { name: "Filtrar projetos" })
      .getByRole("button", { name: /^3D/ })
      .click();
    await expect(
      page.getByRole("button", { name: "Próximo projeto", exact: true }),
    ).toHaveCount(0);
    await page
      .getByRole("link", { name: "Conhecer Pose Lab", exact: true })
      .click();
    await page
      .getByRole("link", { name: "Voltar aos projetos", exact: true })
      .click();
    await expect(page.locator(".selected-project")).toHaveAttribute(
      "data-project",
      "pose-lab",
    );
    await expect(
      page
        .getByRole("group", { name: "Filtrar projetos" })
        .getByRole("button", { name: /^3D/ }),
    ).toHaveAttribute("aria-pressed", "true");
    // Restoration does not run the explicit selection's focus/scroll behavior.
    await expect(page.locator("#project-results")).not.toBeFocused();
    await page.reload();
    await expect(page.locator(".selected-project")).toHaveAttribute(
      "data-project",
      "pose-lab",
    );
    await expect(
      page.getByRole("button", { name: "Próximo projeto", exact: true }),
    ).toHaveCount(0);
    await page
      .getByRole("group", { name: "Filtrar projetos" })
      .getByRole("button", { name: /^Todos/ })
      .click();
    await expect(
      page.getByRole("button", { name: "Próximo projeto", exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    ).toBe(0);
  });
}

test("case calls to action use only existing destinations", async ({
  page,
}) => {
  for (const project of projects) {
    await page.goto(`/projetos/${project.slug}`);
    const primary = page.locator(".case-links .primary");
    await expect(primary).toHaveCount(1);
    const demo = page.getByRole("link", { name: project.liveLabel ?? "Experimentar projeto" });
    if (project.live) {
      await expect(demo).toHaveAttribute("href", project.live);
      await expect(primary).toContainText(project.liveLabel ?? "Experimentar projeto");
      await expect(demo).toHaveAttribute("target", "_blank");
    } else {
      await expect(demo).toHaveCount(0);
      await expect(primary).toContainText(
        getDocuments(project.slug).length ? "Documentação" : "Ver repositório",
      );
    }
  }
});

test("published project links are available from the home cards", async ({ page }) => {
  const destinations = [
    ["IJA System", "https://www.system.oceanoazuldrones.com.br/portal-cidadao"],
    ["Oceano Azul", "https://www.oceanoazuldrones.com.br/oceano"],
    ["IJA Drones", "https://www.ijadrones.com.br/"],
    ["Pose Lab", "https://esqueleto-3d.vercel.app/"],
    ["HigiFlow", "https://gestao-higienizacao.onrender.com/"],
    ["Copa 2026", "https://copa-2026-one.vercel.app/"],
  ];
  await page.goto("/#projetos");
  for (const [name, url] of destinations) {
    await page.getByRole("button", { name: `Selecionar ${name}` }).click();
    await expect(page.locator(".selected-project .project-live-link")).toHaveAttribute("href", url);
  }
});

test("outline uses sanitized headings including duplicates and inline formatting", () => {
  expect(
    getDocumentHeadings(
      "# **Título**\n\n## `API` e dados\n\n## `API` e dados\n\n```md\n# Não é título\n```\n\n<script><h2>Inseguro</h2></script>\n\n<h3>HTML permitido</h3>",
    ),
  ).toEqual([
    { id: "doc-título", title: "Título", level: 1 },
    { id: "doc-api-e-dados", title: "API e dados", level: 2 },
    { id: "doc-api-e-dados-1", title: "API e dados", level: 2 },
    { id: "doc-html-permitido", title: "HTML permitido", level: 3 },
  ]);
});

test("each document has matching outline targets and accessible mobile navigation", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const slug of ["pose-lab", "ija-system", "mente-saudavel"]) {
    await page.goto(`/projetos/${slug}/documentacao/readme`);
    const headings = getDocumentHeadings(getDocuments(slug)[0].content);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      for (const theme of ["light", "dark"]) {
        await page.evaluate((theme) => {
          document.documentElement.dataset.theme = theme;
        }, theme);
        const toggle = page.getByRole("button", {
          name: "Sumário",
          exact: true,
        });
        if (width < 800) {
          await toggle.click();
          await expect(toggle).toHaveAttribute("aria-expanded", "true");
        }
        const links = page
          .getByRole("navigation", { name: "Sumário da documentação" })
          .getByRole("link");
        await expect(links).toHaveCount(headings.length);
        for (const heading of headings) {
          const target = page.locator(`[id="${heading.id}"]`);
          await expect(target).toHaveCount(1);
        }
        const link = links.nth(Math.min(1, headings.length - 1));
        const id = (await link.getAttribute("href"))!.slice(1);
        await link.focus();
        await page.keyboard.press("Enter");
        const target = page.locator(`[id="${id}"]`);
        await expect(target).toBeFocused();
        await expect(target).toBeInViewport();
        expect(
          await target.evaluate((el) => el.getBoundingClientRect().top),
        ).toBeGreaterThanOrEqual(0);
        if (width < 800)
          await expect(toggle).toHaveAttribute("aria-expanded", "false");
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth - innerWidth,
          ),
        ).toBe(0);
      }
    }
  }
});

test("touch selection closes the picker and browser back preserves the project and filter", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  try {
    await page.goto("/");
    await page
      .getByRole("group", { name: "Filtrar projetos" })
      .getByRole("button", { name: /^Sites e interfaces/ })
      .tap();
    const picker = page.getByRole("button", { name: /^Escolher projeto/ });
    await picker.tap();
    await page
      .getByRole("button", { name: "Selecionar IJA Drones", exact: true })
      .tap();
    await expect(picker).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#project-results")).toBeFocused();
    await expect(page.locator(".selected-project")).toHaveAttribute(
      "data-project",
      "ija-drones",
    );
    await page
      .getByRole("link", { name: "Conhecer IJA Drones", exact: true })
      .tap();
    await expect(page).toHaveURL(/\/projetos\/ija-drones$/);
    await page.goBack();
    await expect(page.locator(".selected-project")).toHaveAttribute(
      "data-project",
      "ija-drones",
    );
    await expect(
      page
        .getByRole("group", { name: "Filtrar projetos" })
        .getByRole("button", { name: /^Sites e interfaces/ }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(picker).toHaveAttribute("aria-expanded", "false");
  } finally {
    await context.close();
  }
});

test("a filter is restored even when it keeps the initial project selected", async ({
  page,
}) => {
  await page.goto("/#projetos");
  const systems = page
    .getByRole("group", { name: "Filtrar projetos" })
    .getByRole("button", { name: /^Sistemas/ });
  await systems.click();
  await page
    .getByRole("link", { name: "Conhecer IJA System", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Voltar aos projetos", exact: true })
    .click();
  await expect(systems).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".selected-project")).toHaveAttribute(
    "data-project",
    "ija-system",
  );
});
