const CACHE_NAME = "aisg-lunch-picker-cartoon-food-20260716-v1";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=garden-top-20260527",
  "./app.js?v=cartoon-food-20260716",
  "./manifest.webmanifest",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./assets/source/original-menu.jpg",
  "./assets/source/generated-meal-grid.png",
  "./assets/food/asian-mon-pork-mince-egg-cartoon.webp",
  "./assets/food/asian-tue-salty-chicken-egg-custard-cartoon.webp",
  "./assets/food/asian-wed-pork-taro-soya-cartoon.webp",
  "./assets/food/asian-thu-beef-brisket-curry-cartoon.webp",
  "./assets/food/fri-mexican-food-festival-cartoon.webp",
  "./assets/food/veg-fri-quesadillas-cartoon.webp",
  "./assets/food/veg-mon-udon-tofu-cartoon.webp",
  "./assets/food/veg-thu-cheese-macaroni-cartoon.webp",
  "./assets/food/veg-tue-frittata-cheese-toast-cartoon.webp",
  "./assets/food/veg-wed-bean-curd-tempura-cartoon.webp",
  "./assets/food/western-mon-bbq-chicken-cartoon.webp",
  "./assets/food/western-thu-ham-cheese-sandwich-cartoon.webp",
  "./assets/food/western-tue-beef-lasagna-cartoon.webp",
  "./assets/food/western-wed-chicken-sausage-pasta-cartoon.webp"
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
