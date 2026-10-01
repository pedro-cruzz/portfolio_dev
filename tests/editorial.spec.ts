import { test, expect } from "@playwright/test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ProjectExperienceDetails from "../components/project-experience";
import { projects } from "../lib/portfolio";

test("the direct selector exposes all projects and preserves the selected case on return", async ({
  page,
}) => {
  await page.goto("/#projetos");
  const selector = page.getByRole("group", { name: "Escolher projeto" });
  await expect(selector.getByRole("button")).toHaveCount(projects.length);
  for (const project of projects) {
    const button = selector.getByRole("button", {
      name: `Selecionar ${project.name}`,
      exact: true,
    });
    await expect(button).toBeVisible();
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(button).toBeFocused();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(selector.locator('[aria-pressed="true"]')).toHaveCount(1);
    await expect(page.locator(".selected-project")).toHaveAttribute(
      "data-project",
      project.slug,
    );
  }
  await selector
    .getByRole("button", { name: "Selecionar Pose Lab", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Conhecer Pose Lab", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Do catálogo à cena.", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Voltar aos projetos", exact: true })
    .click();
  await expect(
    selector.getByRole("button", { name: "Selecionar Pose Lab", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(page.locator(".selected-project")).toHaveAttribute(
    "data-project",
    "pose-lab",
  );
});

test("personal experience requires confirmation and never shows empty fields", () => {
  const render = (
    experience?: Parameters<typeof ProjectExperienceDetails>[0]["experience"],
  ) =>
    renderToStaticMarkup(
      createElement(ProjectExperienceDetails, { experience }),
    );
  expect(render()).toBe("");
  expect(
    render({ confirmed: false, contribution: "Texto de teste não confirmado" }),
  ).toBe("");
  expect(
    render({
      confirmed: true,
      contribution: " ",
      credits: [" "],
      responsibilities: [],
    }),
  ).toBe("");
  const partial = render({
    confirmed: true,
    contribution: "Contribuição confirmada de teste",
    responsibilities: ["Responsabilidade de teste", " "],
  });
  expect(partial).toContain("Contribuição confirmada de teste");
  expect(partial).toContain("Responsabilidade de teste");
  expect(partial).not.toMatch(
    /<dt>Período|<dt>Situação|<dt>Créditos|Resultado observado|Aprendizado/,
  );
});

test("published cases show confirmed authorship and hide unconfirmed details", async ({
  page,
  request,
}) => {
  for (const slug of ["ija-system", "pose-lab"]) {
    await page.goto(`/projetos/${slug}`);
    await expect(page.locator(".case-decision")).toBeVisible();
    await expect(page.locator(".case-walkthrough li")).toHaveCount(3);
    if (slug === "ija-system") {
      await expect(page.locator(".case-experience")).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Ver certificado (PDF)" }),
      ).toHaveAttribute(
        "href",
        "/docs/ija-system/certificado-inpi-br-51-2026-007433-9.pdf",
      );
      await expect(
        page.getByRole("link", { name: /João Pedro Gomes da Silva/ }),
      ).toHaveAttribute(
        "href",
        "https://jpgomes035.github.io/joaopedro-portfolio/",
      );
    } else {
      await expect(page.locator(".case-experience")).toHaveCount(0);
    }
    await expect(page.locator("main")).not.toContainText(
      /a confirmar|a preencher|placeholder|lorem ipsum/i,
    );
  }
  const certificate = await request.get(
    "/docs/ija-system/certificado-inpi-br-51-2026-007433-9.pdf",
  );
  expect(certificate.ok()).toBe(true);
  expect(certificate.headers()["content-type"]).toContain("application/pdf");
  expect((await certificate.body()).subarray(0, 4).toString()).toBe("%PDF");
});

test("the IJA home card shows coauthorship and INPI registration without opening the case", async ({
  page,
}) => {
  await page.goto("/#projetos");
  const card = page.locator('.selected-project[data-project="ija-system"]');
  const credentials = card.getByLabel("Autoria e registro do projeto");
  await expect(credentials).toContainText("João Pedro");
  await expect(credentials).not.toContainText("Pedro Henrique");
  await expect(
    credentials.getByRole("link", {
      name: "Abrir portfólio de João Pedro Gomes da Silva",
    }),
  ).toHaveAttribute(
    "href",
    "https://jpgomes035.github.io/joaopedro-portfolio/",
  );
  await expect(credentials).toContainText("BR 51 2026 007433-9");
  await expect(
    credentials.getByRole("link", {
      name: "Ver certificado do INPI de IJA System",
    }),
  ).toHaveAttribute(
    "href",
    "/docs/ija-system/certificado-inpi-br-51-2026-007433-9.pdf",
  );
});
