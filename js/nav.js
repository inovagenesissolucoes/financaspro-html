// js/nav.js — Injetar bottom nav em todas as páginas

function renderNav(active) {
  const items = [
    { href: 'dashboard.html', icon: '📊', label: 'Início' },
    { href: 'transactions.html', icon: '📋', label: 'Lançamentos' },
    { href: 'cards.html', icon: '💳', label: 'Cartões' },
    { href: 'debts.html', icon: '📌', label: 'Dívidas' },
    { href: 'goals.html', icon: '🎯', label: 'Metas' },
  ];

  const html = `<nav class="bottom-nav">
    ${items.map(item => `
      <a href="${item.href}" class="nav-item ${active === item.href ? 'active' : ''}">
        <span class="nav-icon">${item.icon}</span>
        <span class="nav-label">${item.label}</span>
        ${active === item.href ? '<span class="nav-dot"></span>' : ''}
      </a>
    `).join('')}
  </nav>`;

  document.body.insertAdjacentHTML('beforeend', html);
}
