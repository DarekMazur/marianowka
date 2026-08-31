import { test, expect } from '@playwright/test';

test.describe('Carousel Controls Molecule', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/carousel-controls');
  });

  test('should render the exact number of indicator dots and the toggle button', async ({
    page,
  }) => {
    const controlsContainer = page.locator('div.absolute.bottom-4');
    await expect(controlsContainer).toBeVisible();

    const indicatorsWrapper = page.locator('[data-carousel-indicators]');
    await expect(indicatorsWrapper).toBeVisible();

    const indicatorButtons = indicatorsWrapper.locator('button[data-slide-to]');
    await expect(indicatorButtons).toHaveCount(4);

    const firstIndicator = indicatorsWrapper.locator('button[data-slide-to="0"]');
    await expect(firstIndicator).toHaveClass(/bg-farmstay-accent/);

    const toggleButton = controlsContainer.locator('button[data-carousel-toggle]');
    await expect(toggleButton).toBeVisible();
  });
});
