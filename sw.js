const CACHE_NAME = 'taskguru-v2';
const ASSETS = [
  './index.html',
  './manifest.json',
  './sw.js'
];

// Installs the background worker and caches core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercepts fetch requests to serve files instantly from cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
