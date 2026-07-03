export function bindLoginForm(onLogin) {
    document.getElementById('login-form')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const button = event.target.querySelector('button[type="submit"]');
        const formData = new FormData(event.target);

        if (button) button.disabled = true;

        try {
            await onLogin({
                email: formData.get('email').trim(),
                senha: formData.get('senha')
            });
        } finally {
            if (button) button.disabled = false;
        }
    });
}

export function bindRegisterForm(onRegister) {
    document.getElementById('register-form')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const button = event.target.querySelector('button[type="submit"]');
        const formData = new FormData(event.target);

        if (button) button.disabled = true;

        try {
            await onRegister(Object.fromEntries(formData));
        } finally {
            if (button) button.disabled = false;
        }
    });
}

export function bindLogoutButton(onLogout) {
    document.getElementById('logout-button')?.addEventListener('click', onLogout);
}
