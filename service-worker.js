const CACHE_NAME = "ufestival-cache-v2";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/icons/logoWhite.png",
  "./assets/icons/logo_white.svg",
  "./assets/icons/logoBlack.png",
  "./js/qrcode.min.js",
  "./js/qr.js",
  "./data/acts.json",
  "./data/schedule.json",
  "./data/map-markers.json",
  "./data/i18n.js",
  "./data/map-markers.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse || caches.match("./"));

      if (cachedResponse) {
        return cachedResponse;
      }
      return fetchPromise;
    })
  );
});

// Handle messages from the main app
self.addEventListener("message", (event) => {
  if (event.data.type === "SHOW_NOTIFICATION") {
    self.registration.showNotification(event.data.title, event.data.options);
  }
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  
  // Open or focus the app window
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(clientList => {
      for (let client of clientList) {
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});

// Handle notification close
self.addEventListener("notificationclose", (event) => {
  console.log("Notification closed:", event.notification.tag);
});