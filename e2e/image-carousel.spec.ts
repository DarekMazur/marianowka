import { test, expect } from '@playwright/test';

test.describe('Image Carousel Organism', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/image-carousel');
  });

  test('should render carousel container, slides, navigation buttons, and controls', async ({
    page,
  }) => {
    const carouselContainer = page.locator('div[data-carousel]');
    await expect(carouselContainer).toBeVisible();

    const slides = carouselContainer.locator('div[data-slide]');
    await expect(slides).toHaveCount(3);

    const prevButton = carouselContainer.locator('button[data-carousel-prev]');
    const nextButton = carouselContainer.locator('button[data-carousel-next]');
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();

    const indicators = carouselContainer.locator('button[data-slide-to]');
    await expect(indicators).toHaveCount(3);

    const toggleButton = carouselContainer.locator('button[data-carousel-toggle]');
    await expect(toggleButton).toBeVisible();
  });

  test('should switch active slide when clicking navigation buttons', async ({ page }) => {
    const carouselContainer = page.locator('div[data-carousel]');
    const nextButton = carouselContainer.locator('button[data-carousel-next]');
    const firstSlide = carouselContainer.locator('div[data-slide]').nth(0);
    const secondSlide = carouselContainer.locator('div[data-slide]').nth(1);

    await expect(firstSlide).toHaveClass(/opacity-100/);
    await expect(secondSlide).toHaveClass(/opacity-0/);

    await nextButton.click();

    await expect(secondSlide).toHaveClass(/opacity-100/);
    await expect(firstSlide).toHaveClass(/opacity-0/);
  });
});
