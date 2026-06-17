# 💰 FinançasPRO — Frontend HTML

Frontend em HTML/CSS/JS puro para hospedar na Vercel.

---

## 📁 Estrutura

```
financaspro-html/
├── index.html          ← Tela de login
├── recover.html        ← Recuperar senha
├── manifest.json       ← PWA config
├── vercel.json         ← Config da Vercel
├── css/
│   └── style.css       ← Todos os estilos
├── js/
│   ├── config.js       ← ⚠️ EDITE AQUI com sua URL
│   ├── api.js          ← Chamadas ao Apps Script
│   ├── utils.js        ← Funções utilitárias
│   └── nav.js          ← Bottom navigation
└── pages/
    ├── dashboard.html  ← Tela principal
    ├── transactions.html ← Lançamentos
    ├── debts.html      ← Dívidas parceladas
    ├── cards.html      ← Cartões de crédito
    └── goals.html      ← Metas de economia
```

---

## 🚀 Como publicar na Vercel

### Passo 1 — Configure a URL do Apps Script

Abra o arquivo `js/config.js` e substitua pela URL do seu Web App:

```js
const CONFIG = {
  API_URL: 'https://script.google.com/macros/s/SUA_URL_REAL_AQUI/exec'
};
```

### Passo 2 — Suba para o GitHub

```bash
git init
git add .
git commit -m "FinançasPRO inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/financaspro.git
git push -u origin main
```

### Passo 3 — Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New Project"**
3. Importe o repositório do GitHub
4. Em "Framework Preset" selecione **"Other"**
5. Deixe todas as configurações padrão e clique em **"Deploy"**
6. Pronto! Sua URL estará disponível em segundos

---

## 📱 Instalar no celular (PWA)

Após publicar na Vercel:
- **Android (Chrome):** Acesse o site → menu dos 3 pontos → "Adicionar à tela inicial"
- **iPhone (Safari):** Acesse o site → botão compartilhar → "Adicionar à tela de início"

---

## ⚠️ CORS do Apps Script

Se aparecer erro de CORS no console do navegador, no Apps Script você precisa garantir que o Web App está publicado como:
- **Executar como:** Eu mesmo
- **Quem tem acesso:** Qualquer pessoa

E no `Code.gs`, o `doPost` deve retornar com `ContentService` (já está configurado no código fornecido).

---

## 🔧 Manutenção

Para atualizar o app após mudanças:
```bash
git add .
git commit -m "descrição da mudança"
git push
```
A Vercel fará o redeploy automaticamente.
