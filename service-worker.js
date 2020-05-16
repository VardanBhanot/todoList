const staticCacheName = "site-static";
const assets = [
  "/",
  "/index.html",
  "/app.js",
  "/assets/fonts/Rubik-Regular.ttf",
  "/styles.css",
  "/assets/img/sun.jpg",
  "/assets/img/try.jpg",

  "/manifest.json"
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("cashing in the shell");
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (evt) => {
  //console.log('service worker has been activated');
});

self.addEventListener("fetch", (evt) => {
  //console.log("fetch",evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes =>{
      return cacheRes || fetch(evt.request);
    })
  );
});
