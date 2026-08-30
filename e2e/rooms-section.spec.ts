import { test, expect } from '@playwright/test';

test.describe('Rooms Section Organism', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/rooms-section');
  });

  test('should render rooms section with heading, description, and a grid of room items', async ({
    page,
  }) => {
    const roomsSection = page.locator('section#rooms');
    await expect(roomsSection).toBeVisible();

    const heading = roomsSection.locator('h2');
    const description = roomsSection.locator('p').first();
    await expect(heading).toBeVisible();
    await expect(description).toBeVisible();

    const roomCards = roomsSection.locator('.grid > *');
    const count = await roomCards.count();

    expect(count).toBeGreaterThan(0);
    await expect(roomCards.first()).toBeVisible();
  });
});
