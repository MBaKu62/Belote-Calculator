// Self-destructing service worker
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(names.map(name => caches.delete(name))))
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {});
