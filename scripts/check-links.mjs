#!/usr/bin/env node
import { chromium } from "@playwright/test";

const baseURL = new URL(process.env.LINK_CHECK_BASE_URL || "http://localhost:3000");
const routes = ["/", "/research", "/projects", "/about", "/contact"];
const includeExternal = process.argv.includes("--external");
const internal = new Map();
const external = new Map();
const identifiers = new Map();
const failures = [];
const browser = await chromium.launch();
const record = (map, href, source) => map.set(href, [...(map.get(href) || []), source]);

try {
  const page = await browser.newPage();
  for (const route of routes) {
    const response = await page.goto(new URL(route, baseURL).href, { waitUntil: "load" });
    if (!response.ok()) failures.push(`${route}: HTTP ${response.status()}`);
    const content = await page.evaluate(() => ({
      links: [...document.querySelectorAll("a[href]")].map((element) => element.href),
      ids: [...document.querySelectorAll("[id]")].map((element) => element.id),
    }));
    identifiers.set(route, new Set(content.ids));
    for (const href of new Set(content.links)) {
      const url = new URL(href);
      if (!["http:", "https:"].includes(url.protocol)) continue;
      record(url.origin === baseURL.origin ? internal : external, href, route);
    }
  }
  for (const [href, sources] of internal) {
    const url = new URL(href);
    const knownRoute = identifiers.get(url.pathname);
    if (knownRoute && !url.search) {
      if (url.hash && !knownRoute.has(decodeURIComponent(url.hash.slice(1)))) {
        failures.push(`${url.pathname}${url.hash}: missing section anchor (from ${sources.join(", ")})`);
      }
      continue;
    }
    try {
      const response = await page.goto(href, { waitUntil: "domcontentloaded" });
      if (!response.ok()) throw new Error(`HTTP ${response.status()}`);
      if (url.hash && !await page.evaluate((id) => Boolean(document.getElementById(id)), decodeURIComponent(url.hash.slice(1)))) {
        throw new Error("missing section anchor");
      }
    } catch (error) {
      failures.push(`${href}: ${error.message} (from ${sources.join(", ")})`);
    }
  }
} finally {
  await browser.close();
}

if (includeExternal) {
  const pending = [...external];
  const checkExternal = async () => {
    while (pending.length) {
      const [href, sources] = pending.shift();
      try {
        let response = await fetch(href, { method: "HEAD", signal: AbortSignal.timeout(15_000), redirect: "follow" });
        if (!response.ok) {
          response = await fetch(href, { signal: AbortSignal.timeout(15_000), redirect: "follow" });
          if (response.body) await response.body.cancel();
        }
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        console.log(`OK ${href}`);
      } catch (error) {
        failures.push(`${href}: could not verify (${error.message}); manually review (from ${sources.join(", ")})`);
      }
    }
  };
  await Promise.all(Array.from({ length: 3 }, checkExternal));
}

console.log(`Checked ${routes.length} pages and ${internal.size} unique internal links; ${external.size} external links ${includeExternal ? "checked" : "not requested (use --external)"}.`);
if (failures.length) {
  for (const failure of failures) console.error(failure);
  process.exitCode = 1;
} else {
  console.log("All requested link checks passed.");
}
