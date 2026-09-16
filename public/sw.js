// PSY-NURSE KILL-SWITCH SERVICE WORKER
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => {
      return self.registration.unregister();
    })
  );
  self.clients.claim().then(() => {
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => client.navigate(client.url));
    });
  });
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
