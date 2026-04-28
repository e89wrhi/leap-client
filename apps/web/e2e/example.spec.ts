import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Leap AI SDK/);
});

test('get started link', async ({ page }) => {
  await page.goto('/');
});
