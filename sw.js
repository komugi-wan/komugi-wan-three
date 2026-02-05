const CACHE_NAME = 'fav-panel-v1.3'; // 更新時はここを変更
const ASSETS = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500&family=Quicksand:wght@500&display=swap'
];

// 1. インストール時にリソースをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  // 新しいSWをすぐに有効化させる
  self.skipWaiting();
});

// 2. 古いキャッシュを削除（アクティベート時）
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // 制御中の全クライアントを即座に新しいSWの配下に置く
  return self.clients.claim();
});

// 3. フェッチ（ネットワーク優先、失敗したらキャッシュ）
// ※ 常に最新を反映させたい場合、この「Network First」戦略がおすすめです
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

