importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) 
  console.log('workbox berhasil dimuat');
else
  console.log('workbox gagal dimuat');

workbox.precaching.precacheAndRoute([
  { url: "/", revision: "1"},
  { url: "/nav.html", revision: "1"},
  { url: "/index.html", revision: "1"},
  { url: "/standing.html", revision: "1"},
  { url: "/push.js", revision: "1"},
  { url: "/pages/home.html", revision: "1"},
  { url: "/", revision: "1"},
  { url: "/pages/about.html", revision: "1"},
  { url: "/pages/contact.html", revision: "1"},
  { url: "/pages/saved.html", revision: "1"},
  { url: "/css/materialize.min.css", revision: "1"},
  { url: "/js/materialize.min.js", revision: "1"},
  { url: "/js/nav.js", revision: "1"},
  { url: "/js/api.js", revision: "2"},
  { url: "/js/idb.js", revision: "1"},
  { url: "/js/db.js", revision: "1"},
  { url: "/icon.png", revision: "1"},
  { url: "/icon-192x192.png", revision: "1"},
  { url: "/icon-512x512.png", revision: "1"},
  { url: "/manifest.json", revision: "1"},
  { url: "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js", revision: "1"},
  { url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: "1"},
  { url: "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2", revision: "1"}
], {
  ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'BundesApp-data',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ]
  })
);

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    if (!event.action) {
      // Penguna menyentuh area notifikasi diluar action
      console.log('Notification Click.');
      return;
    }
    switch (event.action) {
      case 'yes-action':
        console.log('Pengguna memilih action yes.');
        // buka tab baru
        clients.openWindow('https://google.com');
        break;
      case 'no-action':
        console.log('Pengguna memilih action no');
        break;
      default:
        console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
        break;
    }
});

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});