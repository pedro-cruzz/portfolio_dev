import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: [
    "--enable-webgl",
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  ],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  colorScheme: "dark",
});
page.on("pageerror", (e) => console.log("PAGE ERROR", e.message));
await page.goto("http://127.0.0.1:3000");
await page.locator("canvas").waitFor();
await page.waitForTimeout(1600);
await reveal();
await page.screenshot({
  path: "/private/tmp/portfolio-dark.png",
  fullPage: true,
});
await page.getByRole("button", { name: "Ativar tema claro" }).click();
await page.waitForTimeout(800);
await page.screenshot({
  path: "/private/tmp/portfolio-light.png",
  fullPage: true,
});
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(800);
await reveal();
await page.screenshot({
  path: "/private/tmp/portfolio-mobile.png",
  fullPage: true,
});
await page.setViewportSize({ width: 320, height: 800 });
console.log(
  "Overflow",
  await page.evaluate(() =>
    Array.from(document.querySelectorAll("body *"))
      .map((e) => ({
        tag: e.tagName,
        cls: e.className,
        r: e.getBoundingClientRect().right,
        w: e.getBoundingClientRect().width,
      }))
      .filter((e) => e.r > 320 && e.w > 0),
  ),
);
console.log(
  "Canvas",
  await page
    .locator("canvas")
    .evaluate((c) => ({ width: c.width, height: c.height })),
);
await browser.close();

async function reveal() {
  for (const card of await page.locator(".selected-project").all()) {
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(800);
}
