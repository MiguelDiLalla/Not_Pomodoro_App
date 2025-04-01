// Service worker for FlowLoops PWA
const CACHE_NAME = 'flowloops-cache-v1';

// Files to cache for offline use
const FILES_TO_CACHE = [
  '/not-pomodoro-app/',
  '/not-pomodoro-app/index.html',
  '/not-pomodoro-app/manifest.json',
  '/not-pomodoro-app/sounds/click.wav',
  '/not-pomodoro-app/icons/icon-192.png',
  '/not-pomodoro-app/icons/icon-512.png',
  '/not-pomodoro-app/fonts/lexend-deca/lexend-deca.woff2',
  '/not-pomodoro-app/fonts/montagu-slab/montagu-slab.woff2'
];

// Install event - cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  // Take control immediately
  return self.clients.claim();
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  // Skip non-HTTP(S) requests
  if (!event.request.url.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return the cached response
        if (response) {
          return response;
        }

        // If not in cache, fetch from network
        return fetch(event.request)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response as it can only be consumed once
            const responseToCache = response.clone();

            // Cache the fetched resource for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
      .catch(() => {
        // If both cache and network fail, return a fallback page
        if (event.request.url.indexOf('.html') > -1) {
          return caches.match('./index.html');
        }
      })
  );
});