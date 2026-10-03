import { test, expect } from '@playwright/test';

test('March Lab has a real preview and verified app, source and evidence links', async ({ page }) => {
  await page.goto('/projects#march_madness_predictor');
  const card = page.locator('#march_madness_predictor');
  await card.scrollIntoViewIfNeeded();
  await expect(card.getByRole('heading', { name: 'March Lab', exact: true })).toBeVisible();
  await expect(card).toContainText('The 2027 field awaits announcement.');
  await expect(card).toContainText('377 games');
  await expect(card.getByRole('link', { name: 'View demo: March Lab', exact: true })).toHaveAttribute(
    'href', 'https://roni-altshuler.github.io/march_madness_predictor/'
  );
  await expect(card.getByRole('link', { name: 'View code: March Lab on GitHub', exact: true })).toHaveAttribute(
    'href', 'https://github.com/roni-altshuler/march_madness_predictor'
  );
  await expect(card.getByRole('link', { name: 'Read the Evaluation', exact: true })).toHaveAttribute(
    'href', 'https://github.com/roni-altshuler/march_madness_predictor#measured-prediction-record'
  );
  const image = card.getByRole('img');
  await expect(image).toBeVisible();
  expect(await image.evaluate(async (element) => {
    await element.decode();
    return element.naturalWidth > 0 && element.naturalHeight > 0;
  })).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
