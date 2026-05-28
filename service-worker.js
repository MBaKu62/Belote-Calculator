// Service worker disabled - clearing all caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(names.map(name => caches.delete(name))))
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  // No caching, passthrough only
});
