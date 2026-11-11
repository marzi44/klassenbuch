// Weiterleitung der alten Adresse …/klassenbuch/ zu …/keimbook/.
// Bereits installierte Apps laden beim nächsten Öffnen diese Datei als Update,
// räumen ihren alten Offline-Speicher auf und öffnen KeimBook unter der neuen Adresse.
// Die Daten bleiben erhalten: Sie liegen auf derselben Domain (marzi44.github.io).
const NEW_URL = 'https://marzi44.github.io/keimbook/';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('kb-')) await caches.delete(k);
    await self.clients.claim();
    for (const c of await self.clients.matchAll({ type: 'window' })) { try { await c.navigate(NEW_URL); } catch (err) { } }
    await self.registration.unregister();
  })());
});

self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') e.respondWith(Response.redirect(NEW_URL, 302));
});
