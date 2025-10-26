import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkOnly } from 'workbox-strategies';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { ExpirationPlugin } from 'workbox-expiration';
import { enable as navigationPreloadEnable } from 'workbox-navigation-preload';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Enable navigation preload
navigationPreloadEnable();

// Precache critical assets
precacheAndRoute(self.__WB_MANIFEST);

// Runtime caching for same-origin GET requests
registerRoute(
  ({ request, url }) => request.method === 'GET' && url.origin === self.location.origin,
  new StaleWhileRevalidate()
);

// Runtime caching for images and fonts
registerRoute(
  ({ request }) => request.destination === 'image' || request.destination === 'font',
  new CacheFirst({
    cacheName: 'assets-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

// Offline fallback
setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case 'document':
      return caches.match('/offline.html');
    default:
      return Response.error();
  }
});

// Queue failed POST requests to /api/book
const bgSyncPlugin = new BackgroundSyncPlugin('bookingQueue', {
  maxRetentionTime: 24 * 60, // Retry for up to 24 hours
});

registerRoute(
  ({ url }) => url.pathname === '/api/book',
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);
