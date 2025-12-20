const CACHE_NAME = "eggzip-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/ui/app.js",
  "/modules/zip.js",
  "/modules/7z.js",
  "/modules/libarchive.js",
  "/vendor/fflate/index.min.js",
  "/vendor/7z/7zz.umd.js",
  "/vendor/7z/7zz.wasm",
  "/vendor/libarchive/libarchive-wasm.js",
  "/vendor/libarchive/libarchive-wasm.wasm"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});
