import { test, expect } from "@playwright/test";
import { projects } from "../lib/portfolio";
import { projectAreas, projectVisuals } from "../lib/project-explorer";

test("filters show only matching projects and navigation wraps within the category", async ({
  page,
}) => {
  await page.goto("/#projetos");
  const filters = page.getByRole("group", { name: "Filtrar projetos" });
  const directory = page.getByRole("group", { name: "Escolher projeto" });
  for (const area of projectAreas) {
    const matching = projects.filter(
      (p) => area.id === "all" || projectVisuals[p.slug].area === area.id,
    );
    const filter = filters.getByRole("button", {
      name: new RegExp(`^${area.label}`),
    });
    await filter.focus();
    await page.keyboard.press("Enter");
    await expect(filter).toBeFocused();
    await expect(filter).toHaveAttribute("aria-pressed", "true");
    await expect(directory.getByRole("button")).toHaveCount(matching.length);
    await directory
      .getByRole("button", {
        name: `Selecionar ${matching[0].name}`,
        exact: true,
      })
      .click();
    if (matching.length === 1) {
      await expect(
        page.getByRole("button", { name: "Projeto anterior", exact: true }),
      ).toHaveCount(0);
      await expect(
        page.getByRole("button", { name: "Próximo projeto", exact: true }),
      ).toHaveCount(0);
      continue;
    }
    await page
      .getByRole("button", { name: "Projeto anterior", exact: true })
      .click();
    await expect(page.locator(".selected-project")).toHaveAttribute(
      "data-project",
      matching.at(-1)!.slug,
    );
    await page
      .getByRole("button", { name: "Próximo projeto", exact: true })
      .click();
    await expect(page.locator(".selected-project")).toHaveAttribute(
      "data-project",
      matching[0].slug,
    );
  }
  await filters.getByRole("button", { name: /^Todos/ }).click();
  await expect(directory.getByRole("button")).toHaveCount(12);
  await expect(page.locator("main")).not.toContainText("LIAS");
});
