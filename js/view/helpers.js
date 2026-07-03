export function escapeHtml(value = '') {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function formatPrice(value) {
    const price = Number(value || 0);

    if (price <= 0) {
        return 'Gratuito';
    }

    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

export function productCards(products) {
    if (!products.length) {
        return `
      <div class="empty-state">
        <span class="empty-symbol">☾</span>
        <strong>Nenhum item encontrado.</strong>
        <p>Tente pesquisar usando outro nome, tipo ou categoria.</p>
      </div>
    `;
    }

    return `
    <div class="grid catalog-grid">
      ${products.map((item, index) => `
        <article class="card catalog-card">
          <div class="catalog-index">${String(index + 1).padStart(2, '0')}</div>
          <div class="card-top">
            <div>
              <span class="eyebrow">${escapeHtml(item.categoria)}</span>
              <h3>${escapeHtml(item.nome)}</h3>
            </div>
            <span class="badge ${item.tipo === 'Serviço' ? 'service' : ''}">
              ${escapeHtml(item.tipo)}
            </span>
          </div>
          <p class="description">${escapeHtml(item.descricao)}</p>
          <div class="catalog-footer">
            <span>Valor</span>
            <strong>${formatPrice(item.preco)}</strong>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}
