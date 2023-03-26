const CACHE_NAME = 'qrcode-app-cache-v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icons/128.png',
        '/icons/144.png',
        '/icons/192.png',
        '/icons/256.png',
        '/icons/512.png',
        'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js',
        'https://cdn.bootcdn.net/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});
