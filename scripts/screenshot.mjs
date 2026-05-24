#!/usr/bin/env node
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/education", name: "education" },
  { path: "/work-experience", name: "work-experience" },
  { path: "/projects", name: "projects" },
  { path: "/skills", name: "skills" },
  { path: "/contact", name: "contact" },
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const THEMES = ["light", "dark"];

const BASE_URL = process.env.SCREENSHOT_BASE_URL || "http://localhost:3000";
const PHASE = process.env.SCREENSHOT_PHASE || "00-baseline";
const OUT_DIR = join(process.cwd(), "screenshots", PHASE);

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  for (const theme of THEMES) {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();

      await page.addInitScript((t) => {
        try {
          window.localStorage.setItem("theme", t);
        } catch {}
      }, theme);

      for (const route of ROUTES) {
        const url = `${BASE_URL}${route.path}`;
        try {
          await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
        } catch (e) {
          console.warn(`load failed (${url}): ${e.message}; retrying with domcontentloaded`);
          await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
        }

        // Scroll the whole page so framer-motion whileInView reveals fire
        // before fullPage capture. Then scroll back to top and let things settle.
        await page.evaluate(async () => {
          const stepPx = 240;
          const total = document.documentElement.scrollHeight;
          for (let y = 0; y < total; y += stepPx) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 60));
          }
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 250));
        });

        await page.waitForTimeout(500);
        const file = join(
          OUT_DIR,
          `${route.name}-${viewport.name}-${theme}.png`
        );
        await page.screenshot({ path: file, fullPage: true });
        console.log(`✓ ${file}`);
      }

      await context.close();
    }
  }

  await browser.close();
  console.log(`\nDone → ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
