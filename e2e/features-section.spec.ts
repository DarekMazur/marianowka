import { test, expect } from '@playwright/test';

test.describe('Features Section Organism', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/features-section');
  });

  test('should render features section with header, description, and grid items', async ({
    page,
  }) => {
    const featuresSection = page.locator('section#features');
    await expect(featuresSection).toBeVisible();

    const header = featuresSection.locator('h2');
    const description = featuresSection.locator('p').first();
    await expect(header).toBeVisible();
    await expect(description).toBeVisible();

    const featureItems = featuresSection.locator('.grid > *');

    const count = await featureItems.count();
    expect(count).toBeGreaterThan(0);

    await expect(featureItems.first()).toBeVisible();
  });
});
