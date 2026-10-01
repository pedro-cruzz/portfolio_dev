import { test, expect } from "@playwright/test";
import {
  contactChannels,
  profile,
  projects,
  repositoryUrl,
} from "../lib/portfolio";

const cases = projects.map((p) => [p.slug, p.name, p.repo]);

test("renders the 3D workbench without the object menu", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("canvas")).toBeVisible({ timeout: 30000 });
  await expect(page.locator(".scene-fallback")).not.toBeVisible();
  await expect(
    page.getByRole("group", { name: "Explorar objetos da bancada" }),
  ).toHaveCount(0);
  await expect(page.locator(".scene-bottom, .scene-tabs")).toHaveCount(0);
  await expect(
    page.getByLabel("Bancada 3D com notebook, café e headset"),
  ).toBeVisible();
  const stack = page.getByLabel("Tecnologias dos meus projetos");
  await expect(page.locator("h1")).toHaveText("PedroHenrique.");
  await expect(stack.getByRole("listitem")).toHaveCount(6);
  await expect(page.locator(".workbench-hotspots svg")).toHaveCount(0);
  for (const technology of [
    "Python",
    "React",
    "TypeScript",
    "Flask",
    "Django",
    "PostgreSQL",
  ]) {
    expect(await stack.getByRole("listitem").allTextContents()).toContain(
      technology,
    );
  }
  await expect(page.locator("body")).not.toContainText(
    /Arduino|IoT|Dispositivos conectados/,
  );
  expect(errors).toEqual([]);
});

test("all cases open, load their real photos or technical overview and link to the correct source", async ({
  page,
}) => {
  test.setTimeout(150000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/#projetos");
  await expect(page.locator(".selected-project")).toHaveCount(1);
  await expect(page.locator(".project-computer, .computer-frame")).toHaveCount(
    0,
  );
  for (const [i, [slug, name, repo]] of cases.entries()) {
    if (i > 0)
      await page
        .getByRole("button", { name: "Próximo projeto", exact: true })
        .click();
    await page
      .getByRole("link", { name: `Conhecer ${name}`, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`/projetos/${slug}$`));
    await expect(page.locator("h1")).toContainText(name);
    if (slug === "ecotron")
      await expect(page.locator("body")).not.toContainText(
        /Arduino|IoT|porta serial/,
      );
    await expect(
      page.getByRole("link", { name: "Ver repositório" }),
    ).toHaveAttribute("href", `https://github.com/pedro-cruzz/${repo}`);
    if (projects[i].images.length) {
      const img = page.locator(".gallery-open img");
      for (const [imageIndex, image] of projects[i].images.entries()) {
        await page
          .getByRole("button", {
            name: `Ver imagem ${imageIndex + 1} de ${name}`,
            exact: true,
          })
          .click();
        await expect(img).toHaveAttribute("src", image.src);
        await expect
          .poll(() =>
            img.evaluate(
              (e: HTMLImageElement) => e.complete && e.naturalWidth > 0,
            ),
          )
          .toBe(true);
      }
    } else {
      await expect(page.locator(".case-blueprint .blueprint-step")).toHaveCount(
        3,
      );
      await expect(page.locator(".gallery-open")).toHaveCount(0);
    }
    await page
      .getByRole("link", { name: "Voltar aos projetos", exact: true })
      .click();
    await expect(page).toHaveURL(/\/#projetos$/);
    await expect(page.locator(".selected-project")).toHaveAttribute(
      "data-project",
      slug,
    );
  }
  expect(errors).toEqual([]);
});

test("expanded photos support keyboard navigation, focus containment and Escape", async ({
  page,
}) => {
  await page.goto("/projetos/ija-system");
  const opener = page.getByRole("button", {
    name: "Ampliar imagem de IJA System",
  });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Fechar imagem ampliada" }),
  ).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.locator("img")).toHaveAttribute(
    "src",
    projects[0].images[1].src,
  );
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Fechar imagem ampliada" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test("theme persists through case navigation and reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await page.getByRole("button", { name: "Ativar tema claro" }).click();
  await page
    .getByRole("link", { name: "Conhecer IJA System", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projetos\/ija-system$/);
  await expect(page.locator("h1")).toContainText("IJA System");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Ativar tema escuro" }).click();
  await page
    .getByRole("link", { name: "Voltar aos projetos", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("home and detailed cases fit mobile, tablet and desktop in both themes", async ({
  page,
}) => {
  test.setTimeout(150000);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/projetos/mente-saudavel",
      "/projetos/ija-system",
      "/projetos/pose-lab",
    ]) {
      await page.goto(path);
      for (let theme = 0; theme < 2; theme++) {
        await expect(page.locator("h1")).toBeVisible();
        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        );
        expect(overflow, `${path} at ${width}px`).toBeLessThanOrEqual(1);
        await page.locator(".theme-toggle").click();
      }
    }
  }
});

test("reduced motion preserves the scene and project navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("canvas")).toBeVisible();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page
    .getByRole("button", { name: "Próximo projeto", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Conhecer Mente Saudável", exact: true })
    .click();
  await expect(page.locator("h1")).toContainText("Mente Saudável");
  expect(errors).toEqual([]);
});

test("resume and contact sections expose only configured destinations", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Navegação principal" })
    .getByRole("link", { name: "Currículo", exact: true })
    .click();
  await expect(page).toHaveURL(/#curriculo$/);
  const resume = page.getByRole("region", { name: "Além dos projetos." });
  await expect(resume).toBeVisible();
  if (profile.resume.url) {
    await expect(
      resume.getByRole("link", { name: "Abrir currículo em nova aba" }),
    ).toHaveAttribute("href", profile.resume.url);
    await expect(
      resume.getByRole("link", { name: "Baixar PDF" }),
    ).toHaveAttribute("download", profile.resume.filename);
  } else {
    await expect(
      resume.getByRole("button", { name: "Abrir currículo" }),
    ).toBeDisabled();
    await expect(
      resume.getByRole("button", { name: "Baixar PDF" }),
    ).toBeDisabled();
    await expect(resume.getByText(/estará disponível em breve/)).toBeVisible();
  }
  const contacts = page.getByRole("list", { name: "Canais de contato" });
  for (const channel of contactChannels) {
    const row = contacts
      .getByRole("listitem")
      .filter({ hasText: channel.label });
    if (channel.href) {
      await expect(
        row.getByRole("link", { name: channel.label, exact: true }),
      ).toHaveAttribute("href", channel.href);
    } else {
      await expect(row.getByText("EM BREVE", { exact: true })).toBeVisible();
      await expect(row.getByRole("link")).toHaveCount(0);
    }
  }
});

test("resume PDF is available and download needs confirmation", async ({
  page,
}) => {
  const response = await page.request.get(profile.resume.url);
  expect(response.ok()).toBe(true);
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");

  await page.goto("/#curriculo");
  const resume = page.getByRole("region", { name: "Além dos projetos." });
  const downloadLink = resume.getByRole("link", { name: "Baixar PDF" });
  await expect(
    resume.getByRole("link", { name: "Abrir currículo em nova aba" }),
  ).toHaveAttribute("href", profile.resume.url);
  const [pdfTab] = await Promise.all([
    page.waitForEvent("popup"),
    resume.getByRole("link", { name: "Abrir currículo em nova aba" }).click(),
  ]);
  await expect(pdfTab).toHaveURL(new RegExp(`${profile.resume.url}$`));
  await pdfTab.close();

  let downloads = 0;
  page.on("download", () => downloads++);
  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Deseja baixar o currículo em PDF?");
    await dialog.dismiss();
  });
  await downloadLink.click();
  expect(downloads).toBe(0);

  page.once("dialog", async (dialog) => await dialog.accept());
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    downloadLink.click(),
  ]);
  expect(download.suggestedFilename()).toBe(profile.resume.filename);
});

test("project navigation shows one case, wraps both ways and supports the keyboard", async ({
  page,
}) => {
  await page.goto("/#projetos");
  const next = page.getByRole("button", {
    name: "Próximo projeto",
    exact: true,
  });
  const previous = page.getByRole("button", {
    name: "Projeto anterior",
    exact: true,
  });
  const card = page.locator(".selected-project");
  await expect(card).toHaveCount(1);
  await previous.click();
  await expect(card).toHaveAttribute("data-project", projects.at(-1)!.slug);
  await expect(page.getByRole("status")).toContainText(
    `${projects.length} / ${projects.length}`,
  );
  await next.click();
  await expect(card).toHaveAttribute("data-project", "ija-system");
  for (const [index, [slug, name]] of cases.entries()) {
    if (index > 0) {
      await next.focus();
      await page.keyboard.press("Enter");
    }
    await expect(card).toHaveCount(1);
    await expect(card).toHaveAttribute("data-project", slug);
    await expect(page.getByRole("status")).toContainText(name);
    await expect(card.getByRole("button", { name: "Esquema" })).toHaveCount(0);
    await expect(
      card.getByRole("link", { name: "Documentação", exact: true }),
    ).toHaveAttribute("href", `/projetos/${slug}/documentacao/visao-tecnica`);
    await expect(
      card.getByRole("link", { name: "Ver no GitHub" }),
    ).toHaveAttribute("href", repositoryUrl(projects[index]));
  }
  await next.click();
  await expect(card).toHaveAttribute("data-project", "ija-system");
  await expect(next).toBeFocused();
  await page.reload();
  await expect(card).toHaveAttribute("data-project", "ija-system");
});

test("project previews cycle through photos and keep resource links usable on small screens", async ({
  page,
}) => {
  test.setTimeout(60000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 320, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#projetos");
  for (const [i, [slug, name]] of cases.entries()) {
    if (i > 0)
      await page
        .getByRole("button", { name: "Próximo projeto", exact: true })
        .click();
    const card = page.locator(`[data-project="${slug}"]`);
    if (!projects[i].images.length) {
      await expect(card.locator(".blueprint-step")).toHaveCount(3);
      continue;
    }
    const image = card.locator(".project-cover img");
    const initial = await image.getAttribute("src");
    await card
      .getByRole("button", { name: `Próxima imagem de ${name}`, exact: true })
      .click();
    await expect(image).not.toHaveAttribute("src", initial!);
    await card
      .getByRole("button", { name: `Imagem anterior de ${name}`, exact: true })
      .click();
    await expect(image).toHaveAttribute("src", initial!);
  }
  for (const width of [768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const [slug] of cases) {
      await page
        .getByRole("button", { name: "Próximo projeto", exact: true })
        .click();
      const card = page.locator(`[data-project="${slug}"]`);
      await expect(
        card.getByRole("link", { name: "Ver no GitHub" }),
      ).toBeVisible();
      await expect(
        card.getByRole("link", { name: "Documentação" }),
      ).toBeVisible();
      const fits = await card.evaluate(
        (el) => el.scrollWidth <= el.clientWidth + 1,
      );
      expect(fits, `Project card overflows: ${slug} at ${width}px`).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});
