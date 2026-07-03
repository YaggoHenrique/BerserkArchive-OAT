export function bindContactForm(onSubmit) {
    document.getElementById('contact-form')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const button = event.target.querySelector('button[type="submit"]');
        const formData = new FormData(event.target);

        if (button) button.disabled = true;

        try {
            await onSubmit(Object.fromEntries(formData));
        } finally {
            if (button) button.disabled = false;
        }
    });
}
