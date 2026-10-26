/* 오프라인 · 업데이트(인터넷 되면 새 판을 받고, 안 되면 저장해 둔 판으로) — kr.topicenglish.musicpro 1.0.8 */
var C = 'kr.topicenglish.musicpro-1.0.8', PRE = 'kr.topicenglish.musicpro-';
self.addEventListener('install', function (e) { e.waitUntil(caches.open(C).then(function (c) { return c.addAll(['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-512.png']); })); self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k.indexOf(PRE) === 0 && k !== C; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function (r) { var cp = r.clone(); caches.open(C).then(function (c) { c.put(e.request, cp); }); return r; })
    .catch(function () { return caches.match(e.request).then(function (m) { return m || caches.match('./index.html'); }); }));
});
