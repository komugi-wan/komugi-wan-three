const CACHE_NAME = 'fav-panel-v1.1';
const ASSETS = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500&family=Quicksand:wght@500&display=swap'
];

// インストール時にリソースをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// フェッチ時にキャッシュがあればそれを返し、なければネットワークから取得
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );

});
