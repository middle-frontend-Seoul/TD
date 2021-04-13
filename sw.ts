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
  '/forum/:section/show/:id',
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urls);
      })
      .catch((err) => {
        throw err;
      })
  );
});

self.addEventListener('activate', function (event: any) {});

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      const canBeCached = (request: Request) =>
        request.method === "GET" &&
        request.url.startsWith("http") &&
        !request.url.includes("sockjs-node");
      const fetchRequest = event.request.clone();

      return new Promise((resolve) => {
        fetch(fetchRequest)
          .then((response) => {
            if (
              !response ||
              response.status !== 200 ||
              response.type !== 'basic' ||
              !canBeCached(event.request)
            ) {
              return resolve(response);
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return resolve(response);
          })
          .catch((err) => {
            if (res) return resolve(res);
            throw err;
          });
      });
    })
  );
});
