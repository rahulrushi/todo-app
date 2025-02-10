const CACHE_NAME = 'todo-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

// Cache assets on install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Clean old caches on activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Network first, falling back to cache
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Ignore non-HTTP/HTTPS requests (like chrome-extension://)
  if (!requestUrl.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Ensure response is valid and cacheable
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone response before caching
        const responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then((cache) => {
            // Check if request is from the same origin before caching
            if (requestUrl.origin === self.location.origin) {
              cache.put(event.request, responseToCache);
            }
          });

        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
