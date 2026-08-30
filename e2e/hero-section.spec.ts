import { test, expect } from '@playwright/test';

test.describe('Hero Section Organism', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/hero-section');
  });

  test('should render hero section with background, title elements, and main action buttons', async ({
    page,
  }) => {
    const heroSection = page.locator('section#about');
    await expect(heroSection).toBeVisible();

    const backgroundLayer = heroSection.locator('.absolute.inset-0.bg-cover');
    await expect(backgroundLayer).toHaveCount(1);

    const contentWrapper = heroSection.locator('.relative.z-10');
    await expect(contentWrapper).toBeVisible();

    const actionButtons = heroSection.locator('a');
    await expect(actionButtons.first()).toBeVisible();
  });
});
