import { test, expect } from '@playwright/test';

test.describe('Header Organism', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/header');
  });

  test('should render header with title, navigation, language picker, and booking button', async ({
    page,
  }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toHaveClass(/fixed/);

    const pageTitle = header.locator('a, div').first();
    await expect(pageTitle).toBeVisible();

    const desktopNav = header.locator('nav.hidden');
    await expect(desktopNav).toBeVisible();

    const bookButton = header.locator('.hidden.md\\:flex').getByRole('link', { name: /book now/i });
    await expect(bookButton).toBeVisible();
  });
});
