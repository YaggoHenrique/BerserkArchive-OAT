import { escapeHtml } from './helpers.js';

export const AuthView = {
    login(message = '', isError = false) {
        return `
      <section class="auth-section">
        <article class="form-card narrow auth-card">
          <div class="auth-symbol">⚔</div>
          <span class="eyebrow">Área restrita</span>
          <h2>Entrar no arquivo</h2>
          <p>Informe seu e-mail e senha para continuar.</p>

          ${message ? `<div class="message ${isError ? 'error' : ''}">${escapeHtml(message)}</div>` : ''}

          <form id="login-form">
            <div class="form-group">
              <label for="email">E-mail</label>
              <input id="email" name="email" type="email" required>
            </div>

            <div class="form-group">
              <label for="senha">Senha</label>
              <input id="senha" name="senha" type="password" required>
            </div>

            <button class="btn full-button" type="submit">Entrar</button>
          </form>

          <p class="helper-text">Ainda não possui cadastro? <a href="#/cadastro">Criar conta</a></p>

          <div class="helper-box">
            O acesso é protegido pela autenticação do Supabase.
          </div>
        </article>
      </section>
    `;
    },

    register(message = '', isError = false) {
        return `
      <section class="auth-section">
        <article class="form-card narrow auth-card">
          <div class="auth-symbol">☾</div>
          <span class="eyebrow">Novo usuário</span>
          <h2>Faça parte da jornada</h2>
          <p>Preencha os dados abaixo para realizar seu cadastro.</p>

          ${message ? `<div class="message ${isError ? 'error' : ''}">${escapeHtml(message)}</div>` : ''}

          <form id="register-form">
            <div class="form-group">
              <label for="nome">Nome</label>
              <input id="nome" name="nome" required>
            </div>

            <div class="form-group">
              <label for="register-email">E-mail</label>
              <input id="register-email" name="email" type="email" required>
            </div>

            <div class="form-group">
              <label for="register-password">Senha</label>
              <input id="register-password" name="senha" type="password" minlength="6" required>
            </div>

            <button class="btn full-button" type="submit">Cadastrar</button>
          </form>

          <p class="helper-text">Já possui uma conta? <a href="#/login">Fazer login</a></p>
        </article>
      </section>
    `;
    },

    account(user) {
        const firstLetter = escapeHtml(user.nome.charAt(0).toUpperCase());

        return `
      <section class="auth-section">
        <article class="form-card narrow account-card">
          <div class="account-avatar">${firstLetter}</div>
          <span class="eyebrow">Minha conta</span>
          <h2>${escapeHtml(user.nome)}</h2>
          <p>${escapeHtml(user.email)}</p>

          <div class="helper-box">
            Seu cadastro e sua sessão são gerenciados pelo Supabase.
          </div>

          <div class="form-actions centered-actions">
            <a class="btn" href="#/produtos">Explorar acervo</a>
            <button class="btn btn-secondary" id="logout-button" type="button">Sair da conta</button>
          </div>
        </article>
      </section>
    `;
    }
};
