const CACHE_NAME = "aisg-lunch-picker-menu-20260824-v1";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=garden-top-20260527",
  "./app.js?v=menu-20260824",
  "./manifest.webmanifest",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./assets/source/original-menu.jpg",
  "./assets/food/asian-mon-pork-mince-egg-20260824.webp",
  "./assets/food/western-mon-roasted-chicken-orange-fennel-20260824.webp",
  "./assets/food/veg-mon-curry-udon-tofu-20260824.webp",
  "./assets/food/asian-tue-beef-pepper-lettuce-20260825.webp",
  "./assets/food/western-tue-pulled-pork-sandwich-20260825.webp",
  "./assets/food/veg-tue-sweet-sour-beancurd-20260825.webp",
  "./assets/food/asian-wed-pork-taro-soya-20260826.webp",
  "./assets/food/western-wed-beef-lasagna-20260826.webp",
  "./assets/food/veg-wed-stewed-tofu-onigiri-20260826.webp",
  "./assets/food/asian-thu-yangzhou-fried-rice-20260827.webp",
  "./assets/food/western-thu-pork-chop-pesto-20260827.webp",
  "./assets/food/veg-thu-tomato-noodles-tofu-20260827.webp",
  "./assets/food/fri-southeast-asia-festival-20260828.webp",
  "./assets/food/veg-fri-kwai-teow-green-curry-20260828.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
