import { initContactForm } from '../contact-form.ts';
import { describe, beforeEach, afterEach, expect, test } from 'vitest';

describe('initContactForm', () => {
  let form: HTMLFormElement;
  let submitBtn: HTMLButtonElement;
  let input: HTMLInputElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="contact-form">
        <input id="name" type="text" required />
        <button id="submit-btn" type="submit" class="opacity-50 cursor-not-allowed" disabled>Submit</button>
      </form>
    `;

    form = document.getElementById('contact-form') as HTMLFormElement;
    submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
    input = document.getElementById('name') as HTMLInputElement;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should initially set the button to “locked” if the form is incomplete', () => {
    initContactForm();

    expect(submitBtn.disabled).toBe(true);
    expect(submitBtn.classList.contains('opacity-50')).toBe(true);
    expect(submitBtn.classList.contains('cursor-not-allowed')).toBe(true);
  });

  test('should unlock the button and remove the classes after the required fields have been filled in', () => {
    initContactForm();

    input.value = 'Jan Kowalski';

    form.dispatchEvent(new Event('input', { bubbles: true }));

    expect(submitBtn.disabled).toBe(false);
    expect(submitBtn.classList.contains('opacity-50')).toBe(false);
    expect(submitBtn.classList.contains('cursor-not-allowed')).toBe(false);
  });

  test('should re-disable the button when the form is no longer valid', () => {
    initContactForm();

    input.value = 'Jan Kowalski';
    form.dispatchEvent(new Event('input', { bubbles: true }));

    expect(submitBtn.disabled).toBe(false);

    input.value = '';
    form.dispatchEvent(new Event('input', { bubbles: true }));

    expect(submitBtn.disabled).toBe(true);
    expect(submitBtn.classList.contains('opacity-50')).toBe(true);
    expect(submitBtn.classList.contains('cursor-not-allowed')).toBe(true);
  });

  test('should respond to the “change” event', () => {
    document.body.innerHTML = `
      <form id="contact-form">
        <select id="topic" required>
          <option value="">Wybierz</option>
          <option value="help">Pomoc</option>
        </select>
        <button id="submit-btn" type="submit" class="opacity-50 cursor-not-allowed" disabled>Submit</button>
      </form>
    `;

    form = document.getElementById('contact-form') as HTMLFormElement;
    submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
    const select = document.getElementById('topic') as HTMLSelectElement;

    initContactForm();

    expect(submitBtn.disabled).toBe(true);

    select.value = 'help';
    form.dispatchEvent(new Event('change', { bubbles: true }));

    expect(submitBtn.disabled).toBe(false);
  });

  test('should not throw an error if the form elements do not exist in the DOM', () => {
    document.body.innerHTML = '';

    expect(() => initContactForm()).not.toThrow();
  });
});
