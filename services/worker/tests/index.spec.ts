import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('index', async ({ page }) => {
  await page.fill('input[placeholder="Choose a Username"]', 'test-user');
  await page.locator('data-testid=login-button').click();
  await expect(page.locator('data-testid=username')).toContainText('test-user');
  await page.locator('data-testid=logout-button').click();
  await expect(
    page.locator('input[placeholder="Choose a Username"]'),
  ).toBeVisible();
});
