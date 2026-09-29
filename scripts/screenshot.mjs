#!/usr/bin/env node
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const routes = ["/", "/research", "/projects", "/about", "/contact"];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
  { name: "narrow-mobile", width: 320, height: 740 },
];
const baseURL = process.env.SCREENSHOT_BASE_URL || "http://localhost:3000";
const output = join(process.cwd(), "screenshots", process.env.SCREENSHOT_PHASE || "current");
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
try {
  for (const theme of ["light"]) {
    for (const { name, width, height } of viewports) {
      const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, colorScheme: "dark", reducedMotion: "reduce" });
      const page = await context.newPage();
      for (const route of routes) {
        const response = await page.goto(new URL(route, baseURL).href, { waitUntil: "load" });
        if (!response.ok()) throw new Error(`${route} returned HTTP ${response.status()}`);
        await page.waitForFunction(() => document.querySelector(".menu-button")?.style.visibility === "visible");
        await page.evaluate(async () => {
          await document.fonts.ready;
          await Promise.all([...document.images].map((image) => {
            image.loading = "eager";
            return image.decode().catch((error) => {
              throw new Error(`Image failed to load: ${image.currentSrc || image.src} (${error.message})`);
            });
          }));
        });
        const file = join(output, `${route === "/" ? "home" : route.slice(1)}-${name}-${theme}.png`);
        await page.screenshot({ path: file, fullPage: true, animations: "disabled" });
        console.log(file);
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
}
