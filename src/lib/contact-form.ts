export function initContactForm() {
	const form = document.getElementById('contact-form') as HTMLFormElement;
	const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;

	if (form && submitBtn) {
		const updateButtonState = () => {
			const isValid = form.checkValidity();
			submitBtn.disabled = !isValid;

			if (isValid) {
				submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
			} else {
				submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
			}
		};

		updateButtonState();

		form.addEventListener('input', updateButtonState);
		form.addEventListener('change', updateButtonState);
	}
}