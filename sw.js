// sw.js — FinançasPRO PWA
// Estratégia: network-first para GET do próprio domínio (sempre atualiza quando online,
// cai pro cache quando offline). POST (chamadas de API) e domínios externos não são tocados.

const CACHE = 'financaspro-v1';

self.addEventListener('install', (e) => {
  // ativa a nova versão imediatamente
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    // limpa caches antigos de versões anteriores
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;

  // não intercepta chamadas de API (POST) nem nada que não seja GET
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // só lida com recursos do próprio domínio (ignora CDN, Apps Script, etc.)
  if (url.origin !== self.location.origin) return;

  e.respondWith((async () => {
    try {
      const fresh = await fetch(req);
      const cache = await caches.open(CACHE);
      cache.put(req, fresh.clone());
      return fresh;
    } catch (err) {
      const cached = await caches.match(req);
      if (cached) return cached;
      throw err;
    }
  })());
});
