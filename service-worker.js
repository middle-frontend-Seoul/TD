const CACHE_NAME = 'td-cache-v1';
const urls = [
  '/',
  '/play',
  '/auth/signin',
  '/auth/signup',
  '/profile',
  '/statistics',
  '/forum',
  '/forum/:section',
  '/forum/:section/show/:id'
]

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urls)
      })
      .catch((err) => {
        throw err
      })
    );
});

this.addEventListener('activate', function (event) {
})

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(res => {
        const fetchRequest = event.request.clone();

        return new Promise((resolve) => {
          fetch(fetchRequest)
            .then(response => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return resolve(response);
              }

              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });

              return resolve(response)
            })
            .catch(err => {
              if (res)
                return (resolve(res))
              else
                throw err
            })
        })
      })
  );
})
