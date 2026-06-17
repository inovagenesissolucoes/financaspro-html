const Utils = {
  formatCurrency(v) { return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(v)||0); },
  formatDate(s) { if(!s)return'—'; const[y,m,d]=(s+'').split('T')[0].split('-'); return`${d}/${m}/${y}`; },
  formatMonth(s) { if(!s)return''; const[y,m]=s.split('-'); const n=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']; return`${n[parseInt(m)-1]} ${y}`; },
  currentMonth() { return new Date().toISOString().slice(0,7); },
  addMonths(s,d) { const[y,m]=s.split('-').map(Number); const dt=new Date(y,m-1+d,1); return`${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}`; },
  isOverdue(date,status) { if(status==='paid'||status==='cancelled')return false; return(date+'').split('T')[0]<new Date().toISOString().split('T')[0]; },
  getActiveMonth() { return sessionStorage.getItem('fp_month')||this.currentMonth(); },
  setActiveMonth(m) { sessionStorage.setItem('fp_month',m); },
  toast(msg,type='success') {
    const t=document.createElement('div');
    t.className=`toast toast-${type}`;
    t.textContent=msg;
    document.body.appendChild(t);
    setTimeout(()=>t.classList.add('show'),10);
    setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),300);},3000);
  }
};

function applyTheme() {
  const saved = localStorage.getItem('fp_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  const btn = document.querySelector('.theme-btn');
  if (btn) btn.textContent = saved === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('fp_theme', next);
  document.documentElement.setAttribute('data-theme', next);
  const btn = document.querySelector('.theme-btn');
  if (btn) btn.textContent = next === 'dark' ? '☀️' : '🌙';
}
