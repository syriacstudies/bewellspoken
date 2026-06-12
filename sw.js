// Well Spoken — Service Worker
// Provides offline caching so the app works without a connection.
// Strategy: cache-first for static assets, network-first for navigation.

const CACHE_NAME = "wellspoken-v3";
const PRECACHE = [
  "/",
  "/index.html",
  "/manifest.json"
];

// Install: precache the shell
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: network-first for HTML (so deploys show immediately),
// stale-while-revalidate for everything else (icons, manifest, etc.)
self.addEventListener("fetch", event => {
  const { request } = event;

  // Skip non-GET and cross-origin requests
  if (request.method !== "GET" || !request.url.startsWith(self.location.origin)) {
    return;
  }

  // Never intercept the v3 preview — always straight to the network,
  // so John and Jill always see the latest deploy with fresh CSS.
  if (new URL(request.url).pathname.startsWith("/v3/")) {
    return;
  }

  const isNavigation = request.mode === "navigate"
    || request.destination === "document"
    || request.url.endsWith("/")
    || request.url.endsWith("/index.html");

  if (isNavigation) {
    // Network-first for the HTML — always get the latest deploy
    event.respondWith(
      fetch(request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => caches.match(request))
    );
  } else {
    // Stale-while-revalidate for static assets
    event.respondWith(
      caches.match(request).then(cached => {
        const fetchPromise = fetch(request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        }).catch(() => cached);

        return cached || fetchPromise;
      })
    );
  }
});
