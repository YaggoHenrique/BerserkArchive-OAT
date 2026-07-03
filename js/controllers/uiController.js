const app = document.getElementById('app');
const loginLink = document.getElementById('login-link');
const menuButton = document.getElementById('menu-button');
const mainNav = document.getElementById('main-nav');

export function renderPage(html, session, currentPath) {
    app.innerHTML = html;
    window.scrollTo(0, 0);
    updateHeader(session, currentPath);
}

export function updateHeader(session, currentPath) {
    if (session?.perfil === 'admin') {
        loginLink.textContent = 'Administração';
        loginLink.href = '#/admin';
    } else if (session) {
        loginLink.textContent = 'Minha conta';
        loginLink.href = '#/conta';
    } else {
        loginLink.textContent = 'Login';
        loginLink.href = '#/login';
    }

    document.querySelectorAll('#main-nav a').forEach((link) => {
        const linkPath = link.getAttribute('href').replace('#', '');
        link.classList.toggle('active', linkPath === currentPath);
    });
}

export function closeMenu() {
    mainNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
}

export function configureMenu() {
    menuButton.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
    });
}
