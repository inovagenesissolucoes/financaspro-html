// ============================================================
// nav.js — Drawer lateral + bottom nav
// ============================================================

function injectNav(activePage) {
  // Inject drawer
  document.body.insertAdjacentHTML('beforeend', `
    <!-- Drawer overlay -->
    <div id="drawer-overlay" onclick="closeDrawer()" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:300;opacity:0;pointer-events:none;transition:opacity 0.25s;"></div>

    <!-- Drawer -->
    <div id="drawer" style="position:fixed;top:0;left:0;height:100%;width:280px;max-width:80vw;background:var(--bg-card);z-index:301;transform:translateX(-100%);transition:transform 0.28s ease;overflow-y:auto;display:flex;flex-direction:column;">
      <!-- Drawer header -->
      <div style="background:linear-gradient(145deg,#4338CA,#7C3AED);padding:48px 20px 20px;position:relative;">
        <button onclick="closeDrawer()" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.15);border:none;color:#fff;width:32px;height:32px;border-radius:10px;font-size:18px;cursor:pointer;">✕</button>
        <div id="drawer-avatar" style="width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:#fff;border:2px solid rgba(255,255,255,0.3);margin-bottom:10px;">?</div>
        <p id="drawer-name" style="font-size:15px;font-weight:700;color:#fff;margin-bottom:2px;">...</p>
        <p id="drawer-email" style="font-size:11px;color:rgba(255,255,255,0.65);">...</p>
      </div>

      <!-- Drawer menu items -->
      <nav style="flex:1;padding:12px 0;">
        ${drawerItem('dashboard.html','ti-home','Início', activePage)}
        ${drawerItem('transactions.html','ti-list','Lançamentos', activePage)}
        ${drawerItem('cards.html','ti-credit-card','Cartões de Crédito', activePage)}
        ${drawerItem('debts.html','ti-pin','Dívidas Parceladas', activePage)}
        ${drawerItem('goals.html','ti-target','Metas de Economia', activePage)}
        ${drawerItem('recurrences.html','ti-repeat','Recorrências', activePage)}
        ${drawerItem('reports.html','ti-chart-bar','Relatórios', activePage)}
        <div style="height:0.5px;background:var(--border);margin:8px 16px;"></div>
        ${drawerItem('settings.html','ti-settings','Configurações', activePage)}
      </nav>

      <!-- Drawer footer -->
      <div style="padding:16px;">
        <button onclick="Auth.logout()" style="width:100%;padding:12px;border-radius:12px;border:1px solid var(--red-bg);background:var(--red-bg);color:var(--red);font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:8px;">
          <i class="ti ti-logout" style="font-size:18px;"></i> Sair da conta
        </button>
      </div>
    </div>
  `);

  // Fill user info
  const user = Auth.getUser();
  if (user) {
    const initials = user.name.split(' ').map(n=>n[0]).slice(0,2).join('');
    document.getElementById('drawer-avatar').textContent = initials;
    document.getElementById('drawer-name').textContent = user.name;
    document.getElementById('drawer-email').textContent = user.email;
  }
}

function drawerItem(href, icon, label, activePage) {
  const isActive = activePage === href;
  return `
    <a href="${href}" style="display:flex;align-items:center;gap:14px;padding:13px 20px;text-decoration:none;background:${isActive ? 'var(--accent-light)' : 'transparent'};border-right:${isActive ? '3px solid var(--accent-2)' : '3px solid transparent'};">
      <i class="ti ${icon}" style="font-size:20px;color:${isActive ? 'var(--accent-2)' : 'var(--text-3)'};"></i>
      <span style="font-size:14px;font-weight:${isActive ? '700' : '500'};color:${isActive ? 'var(--accent-2)' : 'var(--text)'};">${label}</span>
    </a>`;
}

function openDrawer() {
  document.getElementById('drawer').style.transform = 'translateX(0)';
  document.getElementById('drawer-overlay').style.opacity = '1';
  document.getElementById('drawer-overlay').style.pointerEvents = 'all';
}

function closeDrawer() {
  document.getElementById('drawer').style.transform = 'translateX(-100%)';
  document.getElementById('drawer-overlay').style.opacity = '0';
  document.getElementById('drawer-overlay').style.pointerEvents = 'none';
}
