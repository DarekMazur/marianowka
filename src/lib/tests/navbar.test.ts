import { describe, beforeEach, afterEach, expect, test } from 'vitest';
import { navbarView } from '../navbar.ts';

describe('navbarView', () => {
  let toggleBtn: HTMLButtonElement;
  let mobileMenu: HTMLElement;
  let navLink: HTMLAnchorElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="menu-toggle">Toggle</button>
      <div id="mobile-menu" class="-translate-y-full opacity-0 pointer-events-none">
        <a href="#home">Home</a>
      </div>
    `;

    toggleBtn = document.getElementById('menu-toggle') as HTMLButtonElement;
    mobileMenu = document.getElementById('mobile-menu') as HTMLElement;
    navLink = mobileMenu.querySelector('a') as HTMLAnchorElement;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should open the mobile menu when toggle button is clicked and menu is closed', () => {
    navbarView();

    toggleBtn.click();

    expect(mobileMenu.classList.contains('translate-y-0')).toBe(true);
    expect(mobileMenu.classList.contains('opacity-100')).toBe(true);
    expect(mobileMenu.classList.contains('pointer-events-auto')).toBe(true);
    expect(mobileMenu.classList.contains('-translate-y-full')).toBe(false);
    expect(mobileMenu.classList.contains('opacity-0')).toBe(false);
    expect(mobileMenu.classList.contains('pointer-events-none')).toBe(false);
  });

  test('should close the mobile menu when toggle button is clicked and menu is open', () => {
    mobileMenu.className = 'translate-y-0 opacity-100 pointer-events-auto';
    navbarView();

    toggleBtn.click();

    expect(mobileMenu.classList.contains('-translate-y-full')).toBe(true);
    expect(mobileMenu.classList.contains('opacity-0')).toBe(true);
    expect(mobileMenu.classList.contains('pointer-events-none')).toBe(true);
    expect(mobileMenu.classList.contains('translate-y-0')).toBe(false);
    expect(mobileMenu.classList.contains('opacity-100')).toBe(false);
    expect(mobileMenu.classList.contains('pointer-events-auto')).toBe(false);
  });

  test('should close the mobile menu when a navigation link is clicked', () => {
    mobileMenu.className = 'translate-y-0 opacity-100 pointer-events-auto';
    navbarView();

    navLink.click();

    expect(mobileMenu.classList.contains('-translate-y-full')).toBe(true);
    expect(mobileMenu.classList.contains('opacity-0')).toBe(true);
    expect(mobileMenu.classList.contains('pointer-events-none')).toBe(true);
  });

  test('should not throw an error if elements are missing from the DOM', () => {
    document.body.innerHTML = '';

    expect(() => navbarView()).not.toThrow();
  });
});
