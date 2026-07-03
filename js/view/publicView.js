import { escapeHtml, productCards } from './helpers.js';

export const PublicView = {
    home() {
        return `
      <section class="hero">
        <div class="hero-glow" aria-hidden="true"></div>
        <div class="container hero-content">
          <div class="hero-copy">
            <span class="eyebrow">O Espadachim Negro</span>
            <h1>Sobreviva à noite.<br><span>Continue lutando.</span></h1>
            <p>
              Explore um acervo inspirado no universo de Berserk, conheça os arcos,
              personagens, volumes e itens cadastrados pela comunidade.
            </p>
            <div class="hero-actions">
              <a class="btn" href="#/produtos">Explorar acervo</a>
              <a class="btn btn-outline" href="#/sobre">Conhecer o universo</a>
            </div>
          </div>

          <div class="hero-visual" aria-hidden="true">
            <div class="moon"></div>
            <div class="sword-emblem">
              <span class="blade"></span>
              <span class="guard"></span>
              <span class="handle"></span>
            </div>
            <span class="hero-rune">BERSERK</span>
          </div>
        </div>
      </section>

      <section class="page-section highlights-section">
        <div class="container">
          <div class="section-heading center">
            <span class="eyebrow">Arquivo da luta</span>
            <h2>Um mundo marcado por guerra, destino e resistência</h2>
            <p>Conteúdo organizado de forma simples para fãs e novos leitores.</p>
          </div>

          <div class="grid feature-grid">
            <article class="card feature-card">
              <span class="card-number">01</span>
              <div class="card-icon">⚔</div>
              <h3>Volumes</h3>
              <p>Consulte mangás, edições e itens cadastrados no acervo.</p>
            </article>

            <article class="card feature-card">
              <span class="card-number">02</span>
              <div class="card-icon">☾</div>
              <h3>Arcos</h3>
              <p>Conheça partes importantes da jornada do Espadachim Negro.</p>
            </article>

            <article class="card feature-card">
              <span class="card-number">03</span>
              <div class="card-icon">✦</div>
              <h3>Comunidade</h3>
              <p>Envie mensagens, sugestões e ideias para o projeto.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="quote-section">
        <div class="container quote-card">
          <span class="quote-mark">“</span>
          <div>
            <span class="eyebrow">Tema do projeto</span>
            <h2>Mesmo em um mundo cruel, a vontade de seguir em frente permanece.</h2>
          </div>
        </div>
      </section>
    `;
    },

    about() {
        return `
      <section class="page-banner">
        <div class="container">
          <span class="eyebrow">Universo</span>
          <h1>Berserk Archive</h1>
          <p>Um espaço de fã dedicado à obra, aos personagens e à jornada de Guts.</p>
        </div>
      </section>

      <section class="page-section">
        <div class="container two-columns">
          <article class="content-card accent-card">
            <span class="eyebrow">Sobre o projeto</span>
            <h2>Uma homenagem em formato de SPA</h2>
            <p>
              O Berserk Archive foi criado como projeto acadêmico para organizar
              produtos, serviços e conteúdos inspirados no universo da obra.
            </p>
            <p>
              O sistema possui páginas públicas, cadastro de usuários, autenticação
              e uma área administrativa completa conectada ao Supabase.
            </p>
          </article>

          <article class="content-card">
            <span class="eyebrow">Temas centrais</span>
            <h2>O que você encontra aqui</h2>
            <ul class="info-list">
              <li>A jornada do Espadachim Negro.</li>
              <li>Arcos e momentos importantes da história.</li>
              <li>Volumes, edições e itens colecionáveis.</li>
              <li>Serviços e atividades para a comunidade de fãs.</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="page-section dark-section">
        <div class="container timeline-grid">
          <article class="timeline-item">
            <span>01</span>
            <div>
              <h3>Era de Ouro</h3>
              <p>A origem das alianças, dos sonhos e da tragédia que mudou tudo.</p>
            </div>
          </article>
          <article class="timeline-item">
            <span>02</span>
            <div>
              <h3>Espadachim Negro</h3>
              <p>Uma jornada solitária marcada por vingança e sobrevivência.</p>
            </div>
          </article>
          <article class="timeline-item">
            <span>03</span>
            <div>
              <h3>Novos Caminhos</h3>
              <p>Companheiros surgem e a luta passa a ter novos significados.</p>
            </div>
          </article>
        </div>
      </section>
    `;
    },

    products(products, search = '') {
        return `
      <section class="page-banner">
        <div class="container">
          <span class="eyebrow">Catálogo</span>
          <h1>Acervo do Eclipse</h1>
          <p>Pesquise volumes, colecionáveis e serviços cadastrados.</p>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <form id="search-form" class="search-row">
            <input
              id="search"
              type="search"
              placeholder="Pesquise por nome, tipo ou categoria"
              value="${escapeHtml(search)}"
              aria-label="Pesquisar no acervo"
            >
            <button class="btn" type="submit">Pesquisar</button>
            ${search ? '<a class="btn btn-outline" href="#/produtos">Limpar</a>' : ''}
          </form>

          <div id="product-list">
            ${productCards(products)}
          </div>
        </div>
      </section>
    `;
    },

    contact(message = '') {
        return `
      <section class="page-banner">
        <div class="container">
          <span class="eyebrow">Contato</span>
          <h1>Envie sua mensagem</h1>
          <p>Compartilhe uma sugestão, dúvida ou ideia para o projeto.</p>
        </div>
      </section>

      <section class="page-section">
        <div class="container two-columns contact-layout">
          <article class="content-card accent-card">
            <span class="eyebrow">Fale conosco</span>
            <h2>A comunidade também faz parte da jornada</h2>
            <p>
              Use o formulário para enviar sugestões de itens, melhorias no site
              ou conteúdos relacionados ao universo de Berserk.
            </p>

            <div class="contact-info">
              <div class="contact-item">
                <strong>Projeto</strong>
                <span>Berserk Archive</span>
              </div>
              <div class="contact-item">
                <strong>E-mail</strong>
                <span>yaggo@berserk.com</span>
              </div>
              <div class="contact-item">
                <strong>Atendimento</strong>
                <span>Segunda a sexta, das 9h às 18h</span>
              </div>
            </div>
          </article>

          <article class="form-card">
            <span class="eyebrow">Mensagem</span>
            <h2>Entre em contato</h2>
            ${message ? `<div class="message">${escapeHtml(message)}</div>` : ''}

            <form id="contact-form">
              <div class="form-group">
                <label for="contact-name">Nome</label>
                <input id="contact-name" name="nome" required>
              </div>

              <div class="form-group">
                <label for="contact-email">E-mail</label>
                <input id="contact-email" name="email" type="email" required>
              </div>

              <div class="form-group">
                <label for="contact-subject">Assunto</label>
                <input id="contact-subject" name="assunto" required>
              </div>

              <div class="form-group">
                <label for="contact-message">Mensagem</label>
                <textarea id="contact-message" name="mensagem" required></textarea>
              </div>

              <button class="btn" type="submit">Enviar mensagem</button>
            </form>
          </article>
        </div>
      </section>
    `;
    },

    notFound() {
        return `
      <section class="page-section">
        <article class="form-card narrow account-card">
          <span class="eyebrow">Erro 404</span>
          <h2>Página perdida na escuridão</h2>
          <p>O endereço informado não existe neste projeto.</p>
          <a class="btn" href="#/">Voltar ao início</a>
        </article>
      </section>
    `;
    }
};
