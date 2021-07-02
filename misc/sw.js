var cacheFalcon = 'falconDexPWA' + new Date()
var arquivosToCache = ['/', '/img', '/misc/ChamadosSolicitante.js', '/style', '/', '/index.html', '/chamado.html', '/pages/Techs/Offline.aspx']

self.addEventListener('install', event => {
    this.skipWaiting();

    event.waitUntil(
        caches.open(cacheFalcon)
            .then(cache => {
                return cache.addAll(arquivosToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return caches.match('/pages/Techs/Offline.aspx');
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith('falconDexPWA')))
                    .filter(cacheName => (cacheName !== staticCacheName))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});