import { expect, test } from '@playwright/test';

async function ready(page, route) {
  await page.goto(route);
  await page.waitForFunction(() => document.querySelector('.menu-button')?.style.visibility === 'visible');
}
async function readVisuals(card) {
  return card.evaluate(element => ({
    transform: getComputedStyle(element).transform,
    light: getComputedStyle(element, '::before').transform,
    opacity: getComputedStyle(element, '::before').opacity,
  }));
}
async function moveAcross(page, card) {
  await card.scrollIntoViewIfNeeded();
  await page.mouse.move(1, 1);
  await expect(card).toHaveCSS('transform', 'none');
  const box = await card.boundingBox();
  const viewport = page.viewportSize();
  const top = Math.max(box.y + 30, 120);
  const bottom = Math.min(box.y + box.height - 30, viewport.height - 30);
  await page.mouse.move(box.x + box.width * 0.28, top + (bottom - top) * 0.3);
  await expect.poll(async () => (await readVisuals(card)).opacity).toBe('1');
  const first = await readVisuals(card);
  expect(first.transform).not.toBe('none');
  await page.mouse.move(box.x + box.width * 0.72, top + (bottom - top) * 0.7);
  await expect.poll(async () => (await readVisuals(card)).light).not.toBe(first.light);
  await expect.poll(async () => (await readVisuals(card)).transform).not.toBe(first.transform);
  await page.mouse.move(1, 1);
  await expect(card).toHaveCSS('transform', 'none');
  await expect.poll(async () => (await readVisuals(card)).opacity).toBe('0');
}

test('research and software cards follow the mouse and settle on exit', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Pointer following is a desktop interaction.');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const [route, selector] of [['/research', '#technion-phd'], ['/projects', '#nfl_predictor'], ['/', '.current-research']]) {
    await ready(page, route);
    await moveAcross(page, page.locator(selector));
  }
});

test('clickable tiles respond to the pointer and keyboard links still navigate', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Pointer following is a desktop interaction.');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await ready(page, '/');
  const affiliation = page.locator('.affiliation').first();
  await moveAcross(page, affiliation);
  await affiliation.focus();
  await expect(affiliation).toHaveCSS('transform', 'none');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/research#technion-phd$/);
  await moveAcross(page, page.locator('#technion-phd'));
  await ready(page, '/contact');
  await moveAcross(page, page.locator('.contact-channel').first());
});

test('changing motion preferences clears pointer effects immediately', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Pointer preference changes are checked on desktop.');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await ready(page, '/research');
  const card = page.locator('#technion-phd');
  await card.hover();
  await expect.poll(async () => (await readVisuals(card)).transform).not.toBe('none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(card).toHaveCSS('transform', 'none');
  await expect(card).toHaveCSS('transition-duration', '0s');
  await page.mouse.move(200, 400);
  await expect(card).toHaveCSS('transform', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await moveAcross(page, card);
});

test('touch navigation stays usable without tilting the reading panels', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'desktop', 'Touch input is checked at both mobile widths.');
  await ready(page, '/');
  await page.locator('.affiliation').first().tap();
  await expect(page).toHaveURL(/\/research#technion-phd$/);
  const card = page.locator('#technion-phd');
  await card.locator('h2').tap();
  await expect(card).toHaveCSS('transform', 'none');
  await expect(card.locator('a')).toBeVisible();
});
