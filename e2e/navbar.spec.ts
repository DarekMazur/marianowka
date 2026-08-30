import { test, expect } from '@playwright/test';

test.describe('Navbar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/navbar');
  });

  test('should render desktop navigation and mobile toggle button', async ({ page }) => {
    const desktopNav = page.locator('nav.hidden.md\\:flex');
    await expect(desktopNav).toBeVisible();

    const menuToggleBtn = page.locator('#menu-toggle');
    await expect(menuToggleBtn).toBeVisible();

    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toHaveClass(/-translate-y-full/);
  });

  test('should toggle mobile menu visibility when clicking the menu button', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const menuToggleBtn = page.locator('#menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');

    await expect(mobileMenu).toHaveClass(/-translate-y-full/);

    await menuToggleBtn.click();

    await expect(mobileMenu).not.toHaveClass(/-translate-y-full/);

    await menuToggleBtn.click();
    await expect(mobileMenu).toHaveClass(/-translate-y-full/);
  });
});
