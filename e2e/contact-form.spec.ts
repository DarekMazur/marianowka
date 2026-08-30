import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/contact-form');
  });

  test('should render all fields, the honeypot, and the disabled submit button', async ({
    page,
  }) => {
    const form = page.locator('#contact-form');
    await expect(form).toBeVisible();

    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('[name="message"]')).toBeVisible();
    await expect(page.locator('#form_consent-checkbox')).toBeVisible();

    await expect(form).toHaveAttribute('data-netlify', 'true');

    const submitBtn = page.locator('#submit-btn');
    await expect(submitBtn).toBeDisabled();
  });

  test('should enable the “Send” button after the fields have been filled out and consent has been selected', async ({
    page,
  }) => {
    const submitBtn = page.locator('#submit-btn');

    await expect(submitBtn).toBeDisabled();

    await page.fill('input[name="name"]', 'Jan Kowalski');
    await page.fill('input[name="email"]', 'jan.kowalski@example.com');
    await page.fill(
      '[name="message"]',
      'To jest testowa wiadomość wysłana z testu E2E Playwright.'
    );

    await page.check('#form_consent-checkbox');

    await expect(submitBtn).toBeEnabled();
  });
});
