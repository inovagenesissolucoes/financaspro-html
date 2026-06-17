// nav.js — Drawer lateral esquerdo

function injectNav(activePage) {
  document.body.insertAdjacentHTML('beforeend', `
    <div id="drawer-overlay" onclick="closeDrawer()" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:300;opacity:0;pointer-events:none;transition:opacity 0.25s;"></div>

    <div id="drawer" style="position:fixed;top:0;left:0;height:100%;width:280px;max-width:80vw;background:var(--bg-card);z-index:301;transform:translateX(-100%);transition:transform 0.28s ease;overflow-y:auto;display:flex;flex-direction:column;">
      <div style="background:linear-gradient(145deg,#4338CA,#7C3AED);padding:48px 20px 20px;position:relative;">
        <button onclick="closeDrawer()" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.15);border:none;color:#fff;width:32px;height:32px;border-radius:10px;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
        <div id="drawer-avatar" style="width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:#fff;border:2px solid rgba(255,255,255,0.3);margin-bottom:10px;">?</div>
        <p id="drawer-name" style="font-size:15px;font-weight:700;color:#fff;margin-bottom:2px;">...</p>
        <p id="drawer-email" style="font-size:11px;color:rgba(255,255,255,0.65);">...</p>
      </div>

      <nav style="flex:1;padding:12px 0;">
        ${di('dashboard.html','🏠','Início',activePage)}
        ${di('transactions.html','📋','Lançamentos',activePage)}
        ${di('cards.html','💳','Cartões de Crédito',activePage)}
        ${di('debts.html','📌','Dívidas Parceladas',activePage)}
        ${di('goals.html','🎯','Metas de Economia',activePage)}
        ${di('recurrences.html','🔄','Recorrências',activePage)}
        ${di('reports.html','📊','Relatórios',activePage)}
        <div style="height:0.5px;background:var(--border);margin:8px 16px;"></div>
        ${di('settings.html','⚙️','Configurações',activePage)}
      </nav>

      <div style="padding:16px;">
        <button onclick="Auth.logout()" style="width:100%;padding:12px;border-radius:12px;border:1px solid var(--red-bg);background:var(--red-bg);color:var(--red);font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;">
          🚪 Sair da conta
        </button>
      </div>
    </div>
  `);

  const user = Auth.getUser();
  if (user) {
    const initials = user.name.split(' ').map(n=>n[0]).slice(0,2).join('');
    document.getElementById('drawer-avatar').textContent = initials;
    document.getElementById('drawer-name').textContent = user.name;
    document.getElementById('drawer-email').textContent = user.email;
  }
}

function di(href, icon, label, activePage) {
  const isActive = activePage === href;
  return `<a href="${href}" style="display:flex;align-items:center;gap:14px;padding:13px 20px;text-decoration:none;background:${isActive?'var(--accent-light)':'transparent'};border-right:${isActive?'3px solid var(--accent-2)':'3px solid transparent'};"><span style="font-size:18px;">${icon}</span><span style="font-size:14px;font-weight:${isActive?'700':'500'};color:${isActive?'var(--accent-2)':'var(--text)'};">${label}</span></a>`;
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
