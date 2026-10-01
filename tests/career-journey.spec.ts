import { test, expect } from "@playwright/test";

test("timeline expands one experience at a time with keyboard access", async ({
  page,
}) => {
  await page.goto("/#trajetoria");
  const journey = page.locator("#trajetoria");
  const steps = journey.locator("details");
  await expect(steps).toHaveCount(4);
  await expect(journey.locator("details[open]")).toHaveCount(0);
  const first = steps.nth(0).locator("summary");
  await first.focus();
  await page.keyboard.press("Enter");
  await expect(steps.nth(0)).toHaveAttribute("open", "");
  await expect(first).toBeFocused();
  await expect(
    journey.getByRole("link", { name: "Conhecer o IJA System" }),
  ).toBeVisible();
  const army = steps.nth(2).locator("summary");
  await army.focus();
  await page.keyboard.press("Space");
  await expect(steps.nth(2)).toHaveAttribute("open", "");
  await expect(journey.locator("details[open]")).toHaveCount(1);
  await expect(
    journey.getByRole("link", { name: "Conhecer o IJA System" }),
  ).not.toBeVisible();
  await expect(army).toBeFocused();
  await expect(steps.nth(2)).toContainText("Liderei equipes");
  await page.keyboard.press("Enter");
  await expect(journey.locator("details[open]")).toHaveCount(0);
  await page.screenshot({
    path: "/private/tmp/timeline-desktop.png",
    animations: "disabled",
  });
});

test("timeline works by touch in both themes and honors reduced motion", async ({
  browser,
}) => {
  test.setTimeout(60000);
  for (const width of [320, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: 950 },
      isMobile: true,
      hasTouch: true,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    try {
      await page.goto("/#trajetoria");
      const journey = page.locator("#trajetoria");
      for (const theme of ["light", "dark"]) {
        await page.evaluate((theme) => {
          document.documentElement.dataset.theme = theme;
        }, theme);
        const step = journey.locator("details").nth(2);
        await step.locator("summary").tap();
        await expect(step).toHaveAttribute("open", "");
        expect(
          await step
            .locator("div")
            .evaluate((el) => getComputedStyle(el).animationName),
        ).toBe("none");
        expect(
          await journey.evaluate((el) => el.scrollWidth <= el.clientWidth),
        ).toBe(true);
        await step.locator("summary").tap();
        await expect(journey.locator("details[open]")).toHaveCount(0);
        await journey.evaluate((el) =>
          el.scrollIntoView({ behavior: "instant" }),
        );
        await page.screenshot({
          path: `/private/tmp/timeline-${width}-${theme}.png`,
          animations: "disabled",
        });
      }
    } finally {
      await context.close();
    }
  }
});
