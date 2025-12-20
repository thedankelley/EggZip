const CACHE_NAME = "eggzip-v1";
const FILES_TO_CACHE = [
  "/index.html",
  "/manifest.json",
  "/ui/app.js",
  "/modules/zip.js",
  "/modules/7z.js",
  "/modules/libarchive.js",
  "/vendor/fflate/fflate.min.js",
  "/vendor/7z/7z-wasm.js",
  "/vendor/7z/7z-wasm.wasm",
  "/vendor/libarchive/libarchive-wasm.js",
  "/vendor/libarchive/libarchive-wasm.wasm",
  "/icons/egg-icon-192.png",
  "/icons/egg-icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
