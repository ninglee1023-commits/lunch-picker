importScripts('./menu-data.js?v=menu-202611-reviews-v5');
const CACHE_NAME = 'aisg-lunch-picker-menu-202611-reviews-v5';
const APP_ASSETS = [
  './', './index.html', './styles.css?v=menu-202611-reviews-v5',
  './app.js?v=menu-202611-reviews-v5', './menu-data.js?v=menu-202611-reviews-v5',
  './manifest.webmanifest', './icons/icon-180.png', './icons/icon-192.png',
  './sync-config.js?v=menu-202611-reviews-v5', './sync-crypto.js?v=menu-202611-reviews-v5',
  './sync-client.js?v=menu-202611-reviews-v5', './sync-ui.js?v=menu-202611-reviews-v5',
  './icons/icon-512.png', './icons/icon-maskable-512.png',
  ...MENU_WEEKS.map((week) => './' + week.source),
  ...ALL_MENU_ITEMS.map((item) => './' + item.image)
];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key.startsWith('aisg-lunch-picker-') && key !== CACHE_NAME).map((key) => caches.delete(key))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then((response) => {
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)));
    }
    return response;
  }).catch(() => caches.match(event.request).then((cached) => cached || Response.error())));
});
