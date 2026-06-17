// ============================================================
// js/utils.js — Funções utilitárias compartilhadas
// ============================================================

const Utils = {
  formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0);
  },

  formatDate(str) {
    if (!str) return '—';
    const [y, m, d] = str.split('T')[0].split('-');
    return `${d}/${m}/${y}`;
  },

  formatMonth(str) {
    if (!str) return '';
    const [y, m] = str.split('-');
    const names = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    return `${names[parseInt(m)-1]} ${y}`;
  },

  currentMonth() {
    return new Date().toISOString().slice(0, 7);
  },

  addMonths(monthStr, delta) {
    const [y, m] = monthStr.split('-').map(Number);
    const d = new Date(y, m - 1 + delta, 1);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  },

  isOverdue(dateStr, status) {
    if (status === 'paid' || status === 'cancelled') return false;
    return dateStr < new Date().toISOString().split('T')[0];
  },

  toast(msg, type = 'success') {
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('show'), 10);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3000);
  },

  showLoading(containerId) {
    const el = document.getElementById(containerId);
    if (el) el.innerHTML = `
      <div class="skeleton"></div>
      <div class="skeleton" style="height:80px"></div>
      <div class="skeleton"></div>
    `;
  },

  setUserName() {
    const user = Auth.getUser();
    const el = document.getElementById('user-name');
    if (el && user) el.textContent = user.name.split(' ')[0];
  },

  // State for current month (shared via sessionStorage)
  getActiveMonth() {
    return sessionStorage.getItem('fp_month') || this.currentMonth();
  },
  setActiveMonth(m) {
    sessionStorage.setItem('fp_month', m);
  }
};
