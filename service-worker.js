const CACHE_NAME = 'belote-cache-v3';
const URLS_TO_CACHE = [
  '/Belote-Calculator/',
  '/Belote-Calculator/index.html',
  '/Belote-Calculator/manifest.json',
  '/Belote-Calculator/icon-192.png',
  '/Belote-Calculator/icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
