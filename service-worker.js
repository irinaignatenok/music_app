const cacheName = 'cacheAssets-v12'

// On install Event
self.addEventListener('install', (event) => {
    // console.log('[SW] Install: ', event);

    self.skipWaiting();

    // Create the static cache
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/js/main.js',
                    '/css/style.css',
                    '/manifest.json',
                    '/icons/favicon-32x32.png',
                    '/icon/manifest-icon-192.maskable.png',
                    '/asset/musical.png'
                ])
            })
            .catch((error) => {
                console.log('Cache failed:', error)
            })
    )
})

self.addEventListener('activate', (event) => {

    // Removes caches that are no longer necessary.
    // event.waitUntil(
    //     caches.keys()
    //     .then(function (cacheNames) {
    //         return Promise.all(
    //             cacheNames
    //                 .filter(item => item !== cacheName)
    //                 .map((item) => {
    //                     console.log("Deleting Caches", item)
    //                     return caches.delete(item)
    //                 })
    //         );
    //     }))

    // event.waitUntill(clients.claim());

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                cacheNames.forEach((item) => {
                    console.log('Found:', item)
                    if (item !== cacheName) {
                        caches.delete(item)
                    }
                })
            })
    )
})
// Stale While Revalidate
self.addEventListener('fetch', (event) => {
    if (event.request.method === 'GET') {
        event.respondWith(
            caches.open(cacheName)
                .then((cache) => {
                    return cache.match(event.request)
                        .then((cacheResponse) => {
                            const fetchResponse = fetch(event.request)
                                .then((networkResponse) => {
                                    cache.put(event.request, networkResponse.clone());
                                    return networkResponse
                                })

                            return cacheResponse || fetchResponse
                        })
                })
        )
    }

})