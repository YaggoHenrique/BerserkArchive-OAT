export function bindProductSearch(onSearch) {
    document.getElementById('search-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const search = document.getElementById('search').value;
        onSearch(search);
    });
}

export function bindAdminEvents({ onSave, onSearch, onDelete, onLogout }) {
    document.getElementById('product-form')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const submitButton = event.target.querySelector('button[type="submit"]');
        const formData = new FormData(event.target);

        if (submitButton) submitButton.disabled = true;

        try {
            await onSave(Object.fromEntries(formData));
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });

    document.getElementById('admin-search-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const search = document.getElementById('admin-search').value;
        onSearch(search);
    });

    document.querySelectorAll('.delete-button').forEach((button) => {
        button.addEventListener('click', async () => {
            const confirmed = window.confirm('Deseja excluir este cadastro?');

            if (confirmed) {
                button.disabled = true;
                try {
                    await onDelete(button.dataset.id);
                } finally {
                    button.disabled = false;
                }
            }
        });
    });

    document.getElementById('logout-button')?.addEventListener('click', onLogout);
}
