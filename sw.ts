const CACHE_NAME = 'td-cache-v1';

const urls = [
  '/',
  '/play',
  '/auth/signin',
  '/auth/signup',
  '/profile',
  '/statistics',
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

const putIntoAppCache = async (
  request: RequestInfo,
  response: Response
): Promise<void> => {
  const cache = await caches.open(CACHE_NAME);
  return cache.put(request, response);
};

const canBeCached = (request: Request) =>
  request.method === 'GET' &&
  request.url.startsWith('http') &&
  !request.url.includes('sockjs-node');
// no type definitions for the event :(

self.addEventListener('fetch', (event: any) => {
  if (!canBeCached(event.request)) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(
    (async () => {
      try {
        const fetchedResponse = await fetch(event.request);
        if (fetchedResponse.ok) {
          putIntoAppCache(event.request, fetchedResponse.clone());
        }
        return fetchedResponse;
      } catch {
        return caches.match(event.request);
      }
    })()
  );
});
