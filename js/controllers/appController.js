import { ProductModel } from '../model/productModel.js';
import { UserModel } from '../model/userModel.js';
import { ContactModel } from '../model/contactModel.js';
import { PublicView } from '../view/publicView.js';
import { AuthView } from '../view/authView.js';
import { AdminView } from '../view/adminView.js';
import { renderPage, closeMenu, configureMenu } from './uiController.js';
import { bindProductSearch, bindAdminEvents } from './productController.js';
import { bindLoginForm, bindRegisterForm, bindLogoutButton } from './authController.js';
import { bindContactForm } from './contactController.js';

function getRoute() {
    const hash = window.location.hash || '#/';
    const [path, queryString = ''] = hash.slice(1).split('?');

    return {
        path: path || '/',
        params: new URLSearchParams(queryString)
    };
}

async function render(html, path = getRoute().path) {
    const session = await UserModel.getSession();
    renderPage(html, session, path);
}

function showError(error) {
    console.error(error);
    alert(`Não foi possível concluir a operação: ${error.message}`);
}

async function logout() {
    try {
        await UserModel.logout();
        window.location.hash = '#/login';
    } catch (error) {
        showError(error);
    }
}

async function showProducts(search = '') {
    try {
        const products = await ProductModel.list(search);
        await render(PublicView.products(products, search), '/produtos');
        bindProductSearch(showProducts);
    } catch (error) {
        showError(error);
    }
}

async function showContact(message = '') {
    await render(PublicView.contact(message), '/contato');

    bindContactForm(async (contact) => {
        try {
            await ContactModel.save(contact);
            await showContact('Mensagem enviada com sucesso.');
        } catch (error) {
            showError(error);
        }
    });
}

async function showLogin(message = '', isError = false) {
    await render(AuthView.login(message, isError), '/login');

    bindLoginForm(async ({ email, senha }) => {
        try {
            const user = await UserModel.login(email, senha);

            if (!user) {
                await showLogin('E-mail ou senha inválidos.', true);
                return;
            }

            window.location.hash = user.perfil === 'admin' ? '#/admin' : '#/conta';
        } catch (error) {
            await showLogin(error.message, true);
        }
    });
}

async function showRegister(message = '', isError = false) {
    await render(AuthView.register(message, isError), '/cadastro');

    bindRegisterForm(async (user) => {
        try {
            const saved = await UserModel.register(user);

            if (!saved) {
                await showRegister('Este e-mail já está cadastrado.', true);
                return;
            }

            await showLogin(
                'Cadastro realizado. Caso a confirmação de e-mail esteja ativada, confirme seu e-mail antes de entrar.'
            );
        } catch (error) {
            await showRegister(error.message, true);
        }
    });
}

async function showAdmin(editId = null, search = '') {
    try {
        const products = await ProductModel.list(search);
        const editingProduct = editId ? await ProductModel.findById(editId) : null;

        await render(AdminView.admin(products, editingProduct, search), '/admin');

        bindAdminEvents({
            async onSave(product) {
                try {
                    await ProductModel.save(product);
                    window.location.hash = '#/admin';
                    await showAdmin();
                } catch (error) {
                    showError(error);
                }
            },
            onSearch(term) {
                showAdmin(null, term);
            },
            async onDelete(id) {
                try {
                    await ProductModel.remove(id);
                    await showAdmin(null, search);
                } catch (error) {
                    showError(error);
                }
            },
            onLogout: logout
        });
    } catch (error) {
        showError(error);
    }
}

export async function route() {
    closeMenu();
    const { path, params } = getRoute();

    if (path === '/') {
        await render(PublicView.home(), path);
        return;
    }

    if (path === '/sobre') {
        await render(PublicView.about(), path);
        return;
    }

    if (path === '/produtos') {
        await showProducts();
        return;
    }

    if (path === '/contato') {
        await showContact();
        return;
    }

    if (path === '/login') {
        await showLogin();
        return;
    }

    if (path === '/cadastro') {
        await showRegister();
        return;
    }

    if (path === '/conta') {
        const session = await UserModel.getSession();

        if (!session) {
            await showLogin('Faça login para acessar sua conta.', true);
            return;
        }

        await render(AuthView.account(session), path);
        bindLogoutButton(logout);
        return;
    }

    if (path === '/admin') {
        const session = await UserModel.getSession();

        if (!session || session.perfil !== 'admin') {
            await showLogin('Faça login como administrador para acessar esta página.', true);
            return;
        }

        await showAdmin(params.get('editar'));
        return;
    }

    await render(PublicView.notFound(), path);
}

export function startApplication() {
    configureMenu();
    window.addEventListener('hashchange', route);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', route, { once: true });
    } else {
        route();
    }
}
