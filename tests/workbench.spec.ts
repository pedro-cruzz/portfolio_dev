import { test, expect } from "@playwright/test";

type AudioWindow = Window & { workbenchAudioContexts: AudioContext[] };

test("the workbench responds to keyboard input and audio only starts on request", async ({
  page,
}) => {
  const errors: string[] = [];
  const mediaRequests: string[] = [];
  page.on("request", (request) => {
    if (/\.(mp3|ogg)(?:\?|$)/.test(request.url()))
      mediaRequests.push(request.url());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    const contexts: AudioContext[] = [];
    (window as unknown as AudioWindow).workbenchAudioContexts = contexts;
    const OriginalAudioContext = window.AudioContext;
    window.AudioContext = class extends OriginalAudioContext {
      constructor(options?: AudioContextOptions) {
        super(options);
        contexts.push(this);
      }
    };
  });
  await page.goto("/");
  const coffee = page.getByRole("button", { name: "Animar café", exact: true });
  await expect(coffee).toBeVisible({ timeout: 20000 });
  expect(
    await page.evaluate(
      () => (window as unknown as AudioWindow).workbenchAudioContexts.length,
    ),
  ).toBe(0);
  await expect(page.getByLabel("Controle do áudio do headset")).toHaveCount(0);
  expect(mediaRequests).toEqual([]);
  await coffee.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".scene-instruction")).toContainText(
    "Uma pausa para o café",
  );

  const headset = page.getByRole("button", {
    name: "Ativar som pelo headset",
    exact: true,
  });
  await headset.focus();
  await page.keyboard.press("Space");
  const player = page.getByLabel("Controle do áudio do headset");
  await expect(player).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "Desligar som pelo headset",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(player.locator(".player-now strong")).toHaveText("Lofi Study");
  await expect(player.getByRole("link", { name: "Pixabay" })).toHaveAttribute(
    "href",
    "https://pixabay.com/service/license-summary/",
  );
  await expect(
    player.getByRole("slider", { name: "Volume do headset" }),
  ).toHaveValue("25");
  await expect
    .poll(async () =>
      Number(
        await player
          .getByRole("slider", { name: "Progresso da faixa" })
          .inputValue(),
      ),
    )
    .toBeGreaterThan(0);
  expect(
    mediaRequests.some((url) => url.endsWith("/audio/lofi-study.mp3")),
  ).toBe(true);
  for (const [name, file, source] of [
    [
      "Lofi Chill 2",
      "lofi-chill-2.mp3",
      "https://pixabay.com/music/lofi-lofi-chill-2-462279/",
    ],
    [
      "Good Night",
      "good-night.mp3",
      "https://pixabay.com/music/beats-good-night-lofi-cozy-chill-music-160166/",
    ],
  ]) {
    await player.getByRole("button", { name: "Próxima faixa" }).click();
    await expect(player.locator(".player-now strong")).toHaveText(name);
    await expect(player.getByRole("link", { name: "origem" })).toHaveAttribute(
      "href",
      source,
    );
    await expect
      .poll(async () =>
        Number(
          await player
            .getByRole("slider", { name: "Progresso da faixa" })
            .getAttribute("max"),
        ),
      )
      .toBeGreaterThan(140);
    await expect
      .poll(async () =>
        Number(
          await player
            .getByRole("slider", { name: "Progresso da faixa" })
            .inputValue(),
        ),
      )
      .toBeGreaterThan(0);
    expect(mediaRequests.some((url) => url.endsWith(`/audio/${file}`))).toBe(
      true,
    );
  }
  await player.getByRole("button", { name: "Faixa anterior" }).click();
  await expect(player.locator(".player-now strong")).toHaveText("Lofi Chill 2");
  await player.getByRole("button", { name: "Ver lista de faixas" }).click();
  await player.getByRole("button", { name: "Selecionar Chuva suave" }).click();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as AudioWindow).workbenchAudioContexts[0]?.state,
      ),
    )
    .toBe("running");
  for (const name of ["Mar calmo", "Foco leve", "Noite calma", "Chuva suave"]) {
    await player.getByRole("button", { name: `Selecionar ${name}` }).click();
    await expect(player.locator(".player-now strong")).toHaveText(name);
  }
  await player.getByRole("button", { name: "Próxima faixa" }).click();
  await expect(player.locator(".player-now strong")).toHaveText("Mar calmo");
  await player.getByRole("button", { name: "Faixa anterior" }).click();
  await expect(player.locator(".player-now strong")).toHaveText("Chuva suave");
  expect(
    await page.evaluate(
      () => (window as unknown as AudioWindow).workbenchAudioContexts.length,
    ),
  ).toBe(1);
  await player.getByRole("button", { name: "Pausar áudio" }).click();
  await expect(
    player.getByRole("button", { name: "Reproduzir áudio" }),
  ).toBeVisible();
  await player.getByRole("button", { name: "Reproduzir áudio" }).click();
  await expect(
    player.getByRole("button", { name: "Pausar áudio" }),
  ).toBeVisible();
  const progress = player.getByRole("slider", { name: "Progresso da faixa" });
  await expect(progress).toHaveAttribute("max", "16");
  await player.getByRole("button", { name: "Selecionar Cat Caffe" }).click();
  await expect(player.locator(".player-now strong")).toHaveText("Cat Caffe");
  await expect(player.getByRole("link", { name: "CC0" })).toBeVisible();
  await expect
    .poll(async () => Number(await progress.getAttribute("max")))
    .toBeGreaterThan(30);
  await expect
    .poll(async () => Number(await progress.inputValue()))
    .toBeGreaterThan(0);
  await player.getByRole("button", { name: "Pausar áudio" }).click();
  const pausedAt = Number(await progress.inputValue());
  await expect(
    player.getByRole("button", { name: "Reproduzir áudio" }),
  ).toBeVisible();
  await player.getByRole("button", { name: "Reproduzir áudio" }).click();
  await expect
    .poll(async () => Number(await progress.inputValue()))
    .toBeGreaterThan(pausedAt);
  await player.getByRole("button", { name: "Selecionar Cachoeira" }).click();
  await expect(player.locator(".player-now strong")).toHaveText("Cachoeira");
  await expect(player.getByRole("link", { name: "CC BY 3.0" })).toBeVisible();
  await expect
    .poll(async () => Number(await progress.getAttribute("max")))
    .toBeGreaterThan(1);
  await player.getByRole("button", { name: "Selecionar Chuva suave" }).click();
  await expect(progress).toHaveAttribute("max", "16");
  const volume = player.getByRole("slider", { name: "Volume do headset" });
  await volume.focus();
  await page.keyboard.press("Home");
  await expect(volume).toHaveValue("0");
  await expect(volume).toHaveAttribute("aria-valuetext", "0%");
  await page.keyboard.press("End");
  await expect(volume).toHaveValue("100");
  await player
    .getByRole("button", { name: "Desligar áudio do headset", exact: true })
    .click();
  await expect(player).toHaveCount(0);
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as AudioWindow).workbenchAudioContexts[0].state,
      ),
    )
    .toBe("suspended");

  // Reuse the audio context, then release it when the portfolio is unmounted.
  await headset.click();
  await expect(player).toBeVisible();
  expect(
    await page.evaluate(
      () => (window as unknown as AudioWindow).workbenchAudioContexts.length,
    ),
  ).toBe(1);
  await page
    .getByRole("button", { name: "Abrir notebook e explorar projetos" })
    .click();
  await expect(page).toHaveURL(/#projetos$/);
  await expect(
    page.getByRole("heading", { name: "Projetos.", exact: true }),
  ).toBeFocused();
  await expect(player).toBeVisible();
  await page
    .getByRole("link", { name: "Conhecer IJA System", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projetos\/ija-system$/);
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as AudioWindow).workbenchAudioContexts[0].state,
      ),
    )
    .toBe("closed");
  expect(errors).toEqual([]);
});

test("touch actions and project navigation work with reduced motion", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 900 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  try {
    await page.goto("/");
    await page.getByRole("button", { name: "Animar café", exact: true }).tap();
    await expect(page.locator(".scene-instruction")).toContainText(
      "Uma pausa para o café",
    );
    await page
      .getByRole("button", { name: "Ativar som pelo headset", exact: true })
      .tap();
    const player = page.getByLabel("Controle do áudio do headset");
    await expect(player).toBeVisible();
    await expect(player.locator(".player-now strong")).toHaveText("Lofi Study");
    await player.getByRole("button", { name: "Ver lista de faixas" }).tap();
    await player.getByRole("button", { name: "Selecionar Foco leve" }).tap();
    await expect(player.locator(".player-now strong")).toHaveText("Foco leve");
    await page
      .getByRole("button", { name: "Desligar som pelo headset", exact: true })
      .tap();
    await expect(player).toHaveCount(0);
    await page
      .getByRole("button", { name: "Abrir notebook e explorar projetos" })
      .tap();
    await expect(page).toHaveURL(/#projetos$/);
    await expect(
      page.getByRole("heading", { name: "Projetos.", exact: true }),
    ).toBeFocused();
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
  } finally {
    await context.close();
  }
});

test("Pixabay playlist fits a 320px screen", async ({ browser }, testInfo) => {
  const context = await browser.newContext({
    viewport: { width: 320, height: 800 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await page
      .getByRole("button", { name: "Ativar som pelo headset", exact: true })
      .tap();
    const player = page.getByLabel("Controle do áudio do headset");
    await player.getByRole("button", { name: "Ver lista de faixas" }).tap();
    for (const name of ["Lofi Study", "Lofi Chill 2", "Good Night"]) {
      await expect(
        player.getByRole("button", { name: `Selecionar ${name}`, exact: true }),
      ).toBeVisible();
    }
    const bounds = await player.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
    await page.screenshot({
      path: testInfo.outputPath("pixabay-player-320.png"),
    });
    await player
      .getByRole("button", { name: "Desligar áudio do headset", exact: true })
      .tap();
    await expect(player).toHaveCount(0);
  } finally {
    await context.close();
  }
});
