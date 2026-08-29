export const navbarView = () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  toggleBtn?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.contains('translate-y-0');

    if (isOpen) {
      mobileMenu?.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
      mobileMenu?.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
    } else {
      mobileMenu?.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
      mobileMenu?.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
    }
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
      mobileMenu.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
    });
  });
};
