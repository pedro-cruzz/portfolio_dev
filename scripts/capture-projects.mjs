// Read-only captures. Start the template previews and local apps before running.
// Optional project IDs: node scripts/capture-projects.mjs higiflow mente-saudavel
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
const jobs = [
  {
    id: "ija-system",
    url: "http://127.0.0.1:3012/overview.html",
    second: "http://127.0.0.1:3012/detail.html",
  },
  {
    id: "mente-saudavel",
    url: "http://127.0.0.1:3014/",
    second: "http://127.0.0.1:3014/choose-register",
  },
  { id: "pose-lab", url: "https://esqueleto-3d.vercel.app/" },
  {
    id: "higiflow",
    url: "http://127.0.0.1:3011/dashboard.html",
    second: "http://127.0.0.1:3011/catalogo.html",
  },
  { id: "copa-2026", url: "https://copa-2026-one.vercel.app/" },
  { id: "ecotron", url: "http://127.0.0.1:3013/" },
];
const selected = process.argv.slice(2);
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
try {
  for (const job of jobs.filter(
    (j) => !selected.length || selected.includes(j.id),
  )) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 960 },
      colorScheme: "light",
      deviceScaleFactor: 1,
    });
    try {
      const visit = async (url) => {
        const response = await page.goto(url, {
          waitUntil: job.id === "ecotron" ? "domcontentloaded" : "networkidle",
          timeout: 45000,
        });
        if (!response?.ok())
          throw new Error(`${job.id}: HTTP ${response?.status()} at ${url}`);
        await page.evaluate(() => document.fonts.ready);
      };
      const capture = async (name) => {
        await mkdir(`public/projects/${job.id}`, { recursive: true });
        await sharp(await page.screenshot())
          .webp({ quality: 86 })
          .toFile(`public/projects/${job.id}/${name}.webp`);
      };
      if (job.id === "ecotron") {
        // Local demo labels describe the simulated backend used in these captures.
        await page.route(job.url, async (route) => {
          const response = await route.fetch();
          const html = (await response.text())
            .replaceAll(
              "Leituras em tempo real via IoT",
              "Processamento de dados em tempo real",
            )
            .replaceAll(
              "Arduino enviando dados",
              "Dados simulados em processamento",
            )
            .replaceAll(
              "Aguardando JSON do Arduino...",
              "Aguardando dados JSON...",
            )
            .replaceAll(
              "Aguardando Hardware...",
              "Aguardando processamento...",
            );
          await route.fulfill({ response, body: html });
        });
      }
      await visit(job.url);
      if (job.id === "ecotron") {
        // Socket.IO keeps receiving data; wait for a reading instead of network idle.
        await page.locator("#status.receiving").waitFor();
        await page.evaluate(() => {
          const badge = document.createElement("div");
          badge.textContent = "MODO SIMULADO · DADOS DEMONSTRATIVOS";
          badge.style.cssText =
            "position:fixed;bottom:12px;right:14px;z-index:99999;background:#111a2b;color:#fff;border:1px solid #445;padding:7px 11px;font:11px monospace;border-radius:5px";
          document.body.append(badge);
        });
      }
      await capture("overview");
      if (job.second) await visit(job.second);
      else if (job.id === "pose-lab") {
        await page
          .getByRole("link", { name: /Abrir sistema esquelético/i })
          .click();
        await page.locator("canvas").waitFor();
        await page.waitForTimeout(8000); // Allow the GLB and its first rendered frame to finish.
      } else if (job.id === "ecotron") {
        await page
          .getByRole("button", { name: "Relatorios", exact: true })
          .click();
        await page.waitForTimeout(1500);
      } else {
        await page.evaluate(() =>
          window.scrollTo({
            top: window.innerHeight * 0.83,
            behavior: "instant",
          }),
        );
        await page.waitForTimeout(500);
      }
      await capture("detail");
      console.log(`Captured ${job.id}`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
