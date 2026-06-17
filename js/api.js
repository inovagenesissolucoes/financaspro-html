// ============================================================
// js/api.js — Comunicação com o Apps Script
// ============================================================

const API = {
  async call(action, data = {}) {
    const token = localStorage.getItem('fp_token');
    try {
      const res = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, token, data })
      });
      const result = await res.json();
      if (!result.success && result.error?.includes('Token inválido')) {
        Auth.logout();
      }
      return result;
    } catch (e) {
      console.error('API Error:', e);
      return { success: false, error: 'Erro de conexão. Verifique sua internet.' };
    }
  },

  // Auth
  login: (email, password) => API.call('auth.login', { email, password }),
  requestReset: (email) => API.call('auth.requestReset', { email }),
  resetPassword: (email, code, newPassword) => API.call('auth.resetPassword', { email, code, newPassword }),

  // Accounts
  listAccounts: () => API.call('accounts.list'),
  createAccount: (data) => API.call('accounts.create', data),

  // Transactions
  listTransactions: (filters = {}) => API.call('transactions.list', filters),
  createTransaction: (data) => API.call('transactions.create', data),
  markPaid: (data) => API.call('transactions.markPaid', data),
  deleteTransaction: (id) => API.call('transactions.delete', { transaction_id: id }),

  // Debts
  listDebts: () => API.call('debts.list'),
  createDebt: (data) => API.call('debts.create', data),

  // Cards
  listCards: () => API.call('cards.list'),
  createCard: (data) => API.call('cards.create', data),

  // Categories
  listCategories: () => API.call('categories.list'),

  // Recurrences
  listRecurrences: () => API.call('recurrences.list'),
  createRecurrence: (data) => API.call('recurrences.create', data),
  generateMonth: (month) => API.call('recurrences.generateMonth', { month }),

  // Goals
  listGoals: () => API.call('goals.list'),
  createGoal: (data) => API.call('goals.create', data),
  updateGoal: (data) => API.call('goals.update', data),

  // Dashboard
  getDashboard: (month) => API.call('dashboard.summary', { month }),
  getCategoryBreakdown: (month) => API.call('dashboard.categoryBreakdown', { month }),
  getDebtPlan: (strategy) => API.call('dashboard.debtPlan', { strategy }),
};

// ============================================================
// js/auth.js — Controle de sessão
// ============================================================
const Auth = {
  isLoggedIn() {
    return !!localStorage.getItem('fp_token');
  },
  getUser() {
    const u = localStorage.getItem('fp_user');
    return u ? JSON.parse(u) : null;
  },
  setSession(user, token) {
    localStorage.setItem('fp_token', token);
    localStorage.setItem('fp_user', JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem('fp_token');
    localStorage.removeItem('fp_user');
    window.location.href = '/index.html';
  },
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = '/index.html';
      return false;
    }
    return true;
  }
};
