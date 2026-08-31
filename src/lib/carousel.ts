export const carousel = () => {
  const setupCarousels = () => {
    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach((carousel) => {
      if (carousel.hasAttribute('data-carousel-initialized')) return;
      carousel.setAttribute('data-carousel-initialized', 'true');

      const slides = carousel.querySelectorAll('[data-slide]');
      const indicators = carousel.querySelectorAll('[data-slide-to]');
      const btnPrev = carousel.querySelector('[data-carousel-prev]');
      const btnNext = carousel.querySelector('[data-carousel-next]');
      const btnToggle = carousel.querySelector('[data-carousel-toggle]');
      const pauseIcon = btnToggle?.querySelector('.pause-icon');
      const playIcon = btnToggle?.querySelector('.play-icon');

      const intervalTime = parseInt(carousel.getAttribute('data-interval') || '5000', 10);

      let slideInterval: number | null = null;
      let isPlaying = true;

      // Pomocnicza funkcja pobierająca aktualny index bezpośrednio z DOM
      const getCurrentIndex = () => {
        return Array.from(slides).findIndex((slide) => slide.classList.contains('opacity-100'));
      };

      const updateCarousel = (newIndex: number) => {
        if (!slides.length) return;

        const currentIndex = getCurrentIndex();
        if (currentIndex === newIndex) return;

        // Ukryj stary slajd
        slides[currentIndex].classList.remove('opacity-100', 'z-10');
        slides[currentIndex].classList.add('opacity-0', 'z-0');

        if (indicators[currentIndex]) {
          indicators[currentIndex].classList.remove('bg-farmstay-accent', 'w-6');
          indicators[currentIndex].classList.add('bg-farmstay-bg/50');
        }

        // Pokaż nowy slajd
        const targetIndex = (newIndex + slides.length) % slides.length;

        slides[targetIndex].classList.remove('opacity-0', 'z-0');
        slides[targetIndex].classList.add('opacity-100', 'z-10');

        if (indicators[targetIndex]) {
          indicators[targetIndex].classList.remove('bg-farmstay-bg/50');
          indicators[targetIndex].classList.add('bg-farmstay-accent', 'w-6');
        }
      };

      const nextSlide = () => {
        const currentIndex = getCurrentIndex();
        updateCarousel(currentIndex + 1);
      };

      const prevSlide = () => {
        const currentIndex = getCurrentIndex();
        updateCarousel(currentIndex - 1);
      };

      const startAutoplay = () => {
        if (slideInterval !== null) return;

        slideInterval = window.setInterval(nextSlide, intervalTime);
        isPlaying = true;
        pauseIcon?.classList.remove('hidden');
        playIcon?.classList.add('hidden');
      };

      const stopAutoplay = () => {
        if (slideInterval !== null) {
          clearInterval(slideInterval);
          slideInterval = null;
        }
        isPlaying = false;
        pauseIcon?.classList.add('hidden');
        playIcon?.classList.remove('hidden');
      };

      btnNext?.addEventListener('click', () => {
        nextSlide();
        if (isPlaying) {
          stopAutoplay();
          startAutoplay();
        }
      });

      btnPrev?.addEventListener('click', () => {
        prevSlide();
        if (isPlaying) {
          stopAutoplay();
          startAutoplay();
        }
      });

      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          updateCarousel(index);
          if (isPlaying) {
            stopAutoplay();
            startAutoplay();
          }
        });
      });

      btnToggle?.addEventListener('click', () => {
        if (isPlaying) {
          stopAutoplay();
        } else {
          startAutoplay();
        }
      });

      carousel.addEventListener('mouseenter', () => {
        if (isPlaying && slideInterval !== null) {
          clearInterval(slideInterval);
          slideInterval = null;
        }
      });

      carousel.addEventListener('mouseleave', () => {
        if (isPlaying && slideInterval === null) {
          slideInterval = window.setInterval(nextSlide, intervalTime);
        }
      });

      startAutoplay();
    });
  };

  setupCarousels();
};
