import { test, expect } from '@playwright/test';

test.describe('Main Homepage Integration', () => {
  test('should render all major sections and navigate correctly via anchors', async ({ page }) => {
    await page.goto('/en');

    const header = page.locator('header');
    await expect(header).toBeVisible();

    const heroSection = page.locator('section#about');
    await expect(heroSection).toBeVisible();

    const roomsSection = page.locator('section#rooms');
    await expect(roomsSection).toBeVisible();

    const featuresSection = page.locator('section#features');
    await expect(featuresSection).toBeVisible();

    const contactSection = page.locator('section#contact');
    await expect(contactSection).toBeVisible();

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const bookButton = header.locator('.hidden.md\\:flex').getByRole('link', { name: /book now/i });
    await bookButton.click();
    await expect(page).toHaveURL(/#contact$/);
  });
});
