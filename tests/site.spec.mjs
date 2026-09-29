import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/research", "/projects", "/about", "/contact"];

for (const route of routes) {
  test(`${route} has readable landmarks, no horizontal overflow, and no runtime errors`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(route);
    expect(response.status()).toBe(200);
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", (route === "/" ? /^https:\/\/www\.ronialtshuler\.com\/?$/ : `https://www.ronialtshuler.com${route}`));
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S.{30,}/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    expect(errors).toEqual([]);
  });

  test(`${route} passes automated accessibility checks in light mode`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile" ||
      (testInfo.project.name === "narrow-mobile" && !["/", "/contact"].includes(route)),
      "Shared styling is covered on desktop and representative narrow layouts.");
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "best-practice"])
      .analyze();
    expect(result.violations).toEqual([]);
  });
}

test("skip link is visible above the header and reaches main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: /skip to.*content/i });
  await expect(skip).toBeFocused();
  expect(await skip.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && element.contains(document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2));
  })).toBe(true);
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
});

test("mobile menu hides closed links, traps focus, and restores the trigger", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "desktop", "Drawer is a mobile navigation control.");
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
  await expect(dialog).toBeHidden();
  for (let step = 0; step < 12; step += 1) {
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => !document.activeElement.closest("dialog"))).toBe(true);
  }
  await trigger.click();
  await expect(dialog).toBeVisible();
  for (const direction of ["Tab", "Shift+Tab"]) {
    for (let step = 0; step < 12; step += 1) {
      await page.keyboard.press(direction);
      expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
    }
  }
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(result.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("button", { name: "Close navigation menu" }).click();
  await expect(trigger).toBeFocused();
});

test("light mode stays fixed despite saved preferences and device color changes", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => { if (!localStorage.getItem("theme")) localStorage.setItem("theme", "dark"); });
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(page.getByLabel("Color theme")).toHaveCount(0);
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#ffffff");
  }
  await page.evaluate(() => localStorage.setItem("theme", "system"));
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("content and navigation remain usable without JavaScript", async ({ browser }, testInfo) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    colorScheme: "dark",
    viewport: testInfo.project.use.viewport,
    baseURL: testInfo.project.use.baseURL,
  });
  const page = await context.newPage();
  try {
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
      await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
      const main = page.getByRole("main");
      await expect(main).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(await page.getByRole("heading", { level: 1 }).evaluate((element) => {
        for (let node = element; node; node = node.parentElement) {
          const style = getComputedStyle(node);
          if (Number(style.opacity) === 0 || style.visibility === "hidden" || style.display === "none") return false;
        }
        return true;
      })).toBe(true);
      if (route === "/") await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Roni Altshuler");
      expect(await page.getByRole("link", { name: "Research & Experience", exact: true }).filter({ visible: true }).count()).toBeGreaterThan(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    }
  } finally {
    await context.close();
  }
});

test("reduced motion preference disables interaction transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).not.toBe("smooth");
  const moving = await page.evaluate(() => [...document.querySelectorAll("body *")].filter((element) => {
    const style = getComputedStyle(element);
    const seconds = (value) => value.split(",").map((duration) => duration.endsWith("ms") ? parseFloat(duration) / 1000 : parseFloat(duration));
    return (style.animationName !== "none" && seconds(style.animationDuration).some((duration) => duration > 0.01)) || seconds(style.transitionDuration).some((duration) => duration > 0.01);
  }).map((element) => element.tagName + "." + element.className));
  expect(moving).toEqual([]);
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Roni Altshuler");
  await expect(page.getByRole("button", { name: /animation/i })).toHaveCount(0);
});

test("contact copies the published email and announces completion", async ({ page, context, baseURL }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: baseURL });
  await page.goto("/contact");
  const emailLink = page.locator('main a[href^="mailto:"]').first();
  const email = (await emailLink.getAttribute("href")).slice("mailto:".length).split("?")[0];
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toContainText(/copied/i);
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(email);
});

test("legacy URLs preserve their intended destinations", async ({ page }) => {
  const redirects = {
    "/education": "/about#education",
    "/skills": "/about#skills",
    "/work-experience": "/research",
    "/experience": "/research",
    "/build": "/projects",
  };
  for (const [oldPath, newPath] of Object.entries(redirects)) {
    await page.goto(oldPath);
    await expect(page).toHaveURL(new URL(newPath, page.url()).href);
  }
});


test("search discovery routes work and unknown pages return 404", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "HTTP behavior does not depend on viewport.");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const route of routes) {
    expect(xml).toContain(`https://www.ronialtshuler.com${route === "/" ? "" : route}`);
  }
  expect(xml).not.toMatch(/<loc>[^<]*\/(education|skills|work-experience|publications)<\/loc>/);
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("https://www.ronialtshuler.com/sitemap.xml");
  const missing = await request.get("/this-page-does-not-exist-regression-check");
  expect(missing.status()).toBe(404);
});


test("tablet and small-desktop layouts keep content and headings within bounds", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "This case supplies its own viewport matrix.");
  for (const width of [640, 768, 900, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({
        page: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
        headings: [...document.querySelectorAll("h1")].map((element) => ({ content: element.scrollWidth, container: element.clientWidth })),
      }));
      expect(dimensions.page, `${route} at ${width}px: page overflow`).toBeLessThanOrEqual(dimensions.viewport + 1);
      for (const heading of dimensions.headings) {
        expect(heading.content, `${route} at ${width}px: heading overflow`).toBeLessThanOrEqual(heading.container + 1);
      }
    }
  }
});

test("landscape mobile navigation stays on screen and its last link is reachable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "This case supplies a landscape viewport.");
  await page.setViewportSize({ width: 667, height: 320 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
  await expect(dialog).toBeVisible();
  const bounds = await dialog.boundingBox();
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.y).toBeGreaterThanOrEqual(0);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(667);
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(320);
  const lastLink = dialog.getByRole("link").last();
  const destination = await lastLink.getAttribute("href");
  await lastLink.scrollIntoViewIfNeeded();
  await expect(lastLink).toBeInViewport();
  await lastLink.click();
  await expect(page).toHaveURL(new URL(destination, page.url()).href);
  await expect(dialog).toBeHidden();
});


test("background and introduction stay still during pointer movement and scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => localStorage.setItem("site-motion", "running"));
  await page.goto("/");
  await expect(page.locator(".ambient-background, .ambient-pointer, .motion-toggle")).toHaveCount(0);
  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toHaveAccessibleName("Roni Altshuler");
  const before = await heading.evaluate(element => ({ transform: getComputedStyle(element).transform, opacity: getComputedStyle(element).opacity }));
  await page.mouse.move(200, 300);
  await page.mouse.move(1000, 450);
  await page.evaluate(() => window.scrollTo(0, 400));
  expect(await heading.evaluate(element => ({ transform: getComputedStyle(element).transform, opacity: getComputedStyle(element).opacity }))).toEqual(before);
  expect(await page.evaluate(() => document.getAnimations().filter(animation => animation.effect.getTiming().iterations === Infinity).length)).toBe(0);
  await expect(page.getByRole("button", { name: /animation/i })).toHaveCount(0);
});

test("featured projects navigate to their full project descriptions", async ({ page }) => {
  await page.goto("/");
  const research = page.getByRole("article", { name: "Immunometabolism & Aging" });
  await expect(research).toContainText("T-cells");
  await expect(research).toContainText("Cell Culture");
  const project = page.locator(".selected-project-copy").filter({ has: page.getByRole("heading", { name: "Gridiron", exact: true }) });
  await project.getByRole("link", { name: "Explore Gridiron", exact: true }).click();
  await expect(page).toHaveURL(/\/projects#nfl_predictor$/);
  await expect(page.locator("#nfl_predictor").getByRole("heading", { name: "Gridiron", exact: true })).toBeVisible();
});

test("page copy uses clean headings and institutional logos load", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Copy and image sources are shared across layouts.");
  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByRole("button", { name: /animation/i })).toHaveCount(0);
    expect(await page.getByRole("main").innerText(), `${route}: T-cell spelling`).not.toMatch(/\bT cells?\b/i);
    const headings = await page.locator("main h1, main h2, main h3, main h4").allTextContents();
    for (const heading of headings) expect(heading.trim(), `${route}: heading punctuation`).not.toMatch(/\.$/);
    for (const eyebrow of await page.locator("main .eyebrow").allTextContents()) {
      expect(eyebrow.trim(), `${route}: numbered eyebrow`).not.toMatch(/^\d{1,2}\s*[/|.:)]/);
    }
    expect(await page.getByRole("main").innerText(), `${route}: avoid em/en dashes in prose`).not.toMatch(/[\u2013\u2014]/);
    if (["/", "/research", "/about"].includes(route)) {
      const logos = page.locator("main .organization-logo img");
      expect(await logos.count(), `${route}: institutional logos`).toBeGreaterThan(0);
      for (const logo of await logos.all()) {
        await logo.scrollIntoViewIfNeeded();
        await expect(logo).toBeVisible();
        await expect(logo).toHaveAttribute("alt", /\S/);
        expect(await logo.evaluate(async (image) => {
          await image.decode();
          return image.naturalWidth > 0 && image.naturalHeight > 0;
        })).toBe(true);
      }
    }
  }
});


test("editor framing is allowed only on local preview hosts", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Response headers are independent of viewport.");
  for (const host of ["localhost:3000", "127.0.0.1:3000"]) {
    const response = await request.get("/", { headers: { Host: host } });
    expect(response.ok()).toBe(true);
    const policy = response.headers()["content-security-policy"];
    expect(policy).toContain("frame-ancestors 'self' vscode-webview:");
    expect(policy).toContain("object-src 'none'");
  }
  const publicResponse = await request.get("/", { headers: { Host: "www.ronialtshuler.com" } });
  expect(publicResponse.ok()).toBe(true);
  expect(publicResponse.headers()["content-security-policy"]).toContain("frame-ancestors 'none'");
});
