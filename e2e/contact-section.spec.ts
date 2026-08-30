import { test, expect } from '@playwright/test';

test.describe('Contact Section Organism', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/contact-section');
  });

  test('should render contact section with correct anchor ID and grid layout containing both info and form', async ({
    page,
  }) => {
    const contactSection = page.locator('section#contact');
    await expect(contactSection).toBeVisible();

    const infoHeading = contactSection.locator('h2');
    const formComponent = contactSection.locator('form#contact-form');

    await expect(infoHeading).toBeVisible();
    await expect(formComponent).toBeVisible();
  });
});
