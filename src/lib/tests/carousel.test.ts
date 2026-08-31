import { describe, beforeEach, afterEach, expect, test, vi } from 'vitest';
import { carousel } from '../carousel.ts';

describe('carousel', () => {
  let carouselEl: HTMLElement;
  let slides: NodeListOf<HTMLElement>;
  let indicators: NodeListOf<HTMLElement>;
  let btnPrev: HTMLButtonElement;
  let btnNext: HTMLButtonElement;
  let btnToggle: HTMLButtonElement;
  let pauseIcon: HTMLElement;
  let playIcon: HTMLElement;

  beforeEach(() => {
    vi.useFakeTimers();

    document.body.innerHTML = `
      <div data-carousel data-interval="3000">
        <div data-slide class="opacity-100 z-10">Slide 1</div>
        <div data-slide class="opacity-0 z-0">Slide 2</div>
        <div data-slide class="opacity-0 z-0">Slide 3</div>

        <button data-slide-to="0" class="bg-farmstay-accent w-6">Ind 0</button>
        <button data-slide-to="1" class="bg-farmstay-bg/50">Ind 1</button>
        <button data-slide-to="2" class="bg-farmstay-bg/50">Ind 2</button>

        <button data-carousel-prev>Prev</button>
        <button data-carousel-next>Next</button>

        <button data-carousel-toggle>
          <span class="pause-icon">Pause</span>
          <span class="play-icon hidden">Play</span>
        </button>
      </div>
    `;

    carouselEl = document.querySelector('[data-carousel]') as HTMLElement;
    slides = carouselEl.querySelectorAll('[data-slide]');
    indicators = carouselEl.querySelectorAll('[data-slide-to]');
    btnPrev = carouselEl.querySelector('[data-carousel-prev]') as HTMLButtonElement;
    btnNext = carouselEl.querySelector('[data-carousel-next]') as HTMLButtonElement;
    btnToggle = carouselEl.querySelector('[data-carousel-toggle]') as HTMLButtonElement;
    pauseIcon = btnToggle.querySelector('.pause-icon') as HTMLElement;
    playIcon = btnToggle.querySelector('.play-icon') as HTMLElement;
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  test('should initialize and move to the next slide automatically via autoplay', () => {
    carousel();

    expect(slides[0].classList.contains('opacity-100')).toBe(true);
    expect(slides[1].classList.contains('opacity-0')).toBe(true);

    vi.advanceTimersByTime(3000);

    expect(slides[0].classList.contains('opacity-0')).toBe(true);
    expect(slides[1].classList.contains('opacity-100')).toBe(true);
    expect(slides[1].classList.contains('z-10')).toBe(true);
  });

  test('should move to the next slide when next button is clicked', () => {
    carousel();

    expect(slides[0].classList.contains('opacity-100')).toBe(true);

    btnNext.click();

    expect(slides[0].classList.contains('opacity-0')).toBe(true);
    expect(slides[1].classList.contains('opacity-100')).toBe(true);
  });

  test('should move to the previous slide when prev button is clicked', () => {
    carousel();

    expect(slides[0].classList.contains('opacity-100')).toBe(true);

    btnPrev.click();

    expect(slides[0].classList.contains('opacity-0')).toBe(true);
    expect(slides[2].classList.contains('opacity-100')).toBe(true);
  });

  test('should switch to specific slide when indicator is clicked', () => {
    carousel();

    expect(slides[0].classList.contains('opacity-100')).toBe(true);

    indicators[2].click();

    expect(slides[0].classList.contains('opacity-0')).toBe(true);
    expect(slides[2].classList.contains('opacity-100')).toBe(true);
    expect(indicators[2].classList.contains('bg-farmstay-accent')).toBe(true);
  });

  test('should toggle autoplay when toggle button is clicked', () => {
    carousel();

    expect(pauseIcon.classList.contains('hidden')).toBe(false);
    expect(playIcon.classList.contains('hidden')).toBe(true);

    btnToggle.click();

    expect(pauseIcon.classList.contains('hidden')).toBe(true);
    expect(playIcon.classList.contains('hidden')).toBe(false);

    vi.advanceTimersByTime(3000);
    expect(slides[0].classList.contains('opacity-100')).toBe(true);

    btnToggle.click();

    expect(pauseIcon.classList.contains('hidden')).toBe(false);
    expect(playIcon.classList.contains('hidden')).toBe(true);

    vi.advanceTimersByTime(3000);
    expect(slides[1].classList.contains('opacity-100')).toBe(true);
  });

  test('should pause autoplay on mouseenter and resume on mouseleave', () => {
    carousel();

    carouselEl.dispatchEvent(new MouseEvent('mouseenter'));

    vi.advanceTimersByTime(3000);
    expect(slides[0].classList.contains('opacity-100')).toBe(true);

    carouselEl.dispatchEvent(new MouseEvent('mouseleave'));

    vi.advanceTimersByTime(3000);
    expect(slides[1].classList.contains('opacity-100')).toBe(true);
  });
});
