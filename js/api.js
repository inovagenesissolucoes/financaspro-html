const API = {
  async call(action, data = {}) {
    const token = localStorage.getItem('fp_token') || '';
    const payload = encodeURIComponent(JSON.stringify({ action, token, data }));
    const url = `${CONFIG.API_URL}?payload=${payload}`;
    try {
      const res = await fetch(url, { method: 'GET', redirect: 'follow' });
      const result = await res.json();
      if (!result.success && result.error?.includes('Token inválido')) Auth.logout();
      return result;
    } catch (e) {
      console.error('API Error:', e);
      return { success: false, error: 'Erro de conexão. Verifique sua internet.' };
    }
  },

  /**
   * Bootstrap: retorna TUDO (accounts, cards, categories, recurrences,
   * invoices, transactions do mês, vencidas, summary) numa única chamada.
   * 
   * Uso com cache:
   *   API.bootstrap(month)          → sempre busca do backend
   *   API.bootstrap(month, true)    → retorna cache instantâneo se existir,
   *                                    e atualiza em background (stale-while-revalidate)
   */
  bootstrap(month, useCache = false) {
    const m = month || new Date().toISOString().slice(0, 7);
    const cacheKey = `fp_bootstrap_${m}`;

    if (useCache) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          // Retorna cache imediato + promise de atualização em background
          const bgUpdate = API.call('bootstrap.load', { month: m }).then(fresh => {
            if (fresh.success) {
              localStorage.setItem(cacheKey, JSON.stringify(fresh));
            }
            return fresh;
          });
          return { cached: parsed, fresh: bgUpdate };
        } catch (e) {
          // Cache corrompido, ignora
        }
      }
    }

    // Sem cache disponível ou não solicitado — busca do backend
    return API.call('bootstrap.load', { month: m }).then(res => {
      if (res.success) {
        try { localStorage.setItem(cacheKey, JSON.stringify(res)); } catch (e) {}
      }
      return res;
    });
  },

  /**
   * Invalida o cache do bootstrap. Chamar após mutações (create/update/delete).
   */
  invalidateCache(month) {
    if (month) {
      localStorage.removeItem(`fp_bootstrap_${month}`);
    } else {
      // Remove todos os caches de bootstrap
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('fp_bootstrap_')) localStorage.removeItem(k);
      });
    }
  },

  login: (email, password) => API.call('auth.login', { email, password }),
  requestReset: (email) => API.call('auth.requestReset', { email }),
  resetPassword: (email, code, newPassword) => API.call('auth.resetPassword', { email, code, newPassword }),
  listAccounts: () => API.call('accounts.list'),
  createAccount: (data) => API.call('accounts.create', data),
  listTransactions: (filters = {}) => API.call('transactions.list', filters),
  createTransaction: (data) => API.call('transactions.create', data),
  markPaid: (data) => API.call('transactions.markPaid', data),
  deleteTransaction: (id) => API.call('transactions.delete', { transaction_id: id }),
  listDebts: () => API.call('debts.list'),
  createDebt: (data) => API.call('debts.create', data),
  listCards: () => API.call('cards.list'),
  createCard: (data) => API.call('cards.create', data),
  listCategories: () => API.call('categories.list'),
  createCategory: (data) => API.call('categories.create', data),
  listRecurrences: () => API.call('recurrences.list'),
  createRecurrence: (data) => API.call('recurrences.create', data),
  generateMonth: (month) => API.call('recurrences.generateMonth', { month }),
  listGoals: () => API.call('goals.list'),
  createGoal: (data) => API.call('goals.create', data),
  updateGoal: (data) => API.call('goals.update', data),
  getDashboard: (month) => API.call('dashboard.summary', { month }),
  getCategoryBreakdown: (month) => API.call('dashboard.categoryBreakdown', { month }),
  getDebtPlan: (strategy) => API.call('dashboard.debtPlan', { strategy }),
};

const Auth = {
  isLoggedIn() { return !!localStorage.getItem('fp_token'); },
  getUser() { const u = localStorage.getItem('fp_user'); return u ? JSON.parse(u) : null; },
  setSession(user, token) {
    localStorage.setItem('fp_token', token);
    localStorage.setItem('fp_user', JSON.stringify(user));
  },
  logout() {
    // Limpa todos os caches ao fazer logout
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith('fp_bootstrap_') || k === 'fp_token' || k === 'fp_user') {
        localStorage.removeItem(k);
      }
    });
    window.location.href = '/index.html';
  },
  requireAuth() {
    if (!this.isLoggedIn()) { window.location.href = '/index.html'; return false; }
    return true;
  }
};
