
// sw.js
var cacheName = 'bs-0-2-111';
var apiCacheName = 'api-0-1-11';
const alreadyCacheMap = new Map();
var cacheFiles = [
    '/',
    './index.html',
    // './index.js',
    './style.css',
    './img/book.png',
    './img/loading.svg'
];

// 监听install事件，安装完成后，进行文件缓存
self.addEventListener('install', function (e) {
    // self.skipWaiting();
    console.log('Service Worker 状态： install');
    var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
        return cache.addAll(cacheFiles);
    });
    e.waitUntil(cacheOpenPromise);
});
self.addEventListener('fetch', function (e) {
    // 需要缓存的xhr请求
    caches.open(cacheName).then(function(cache) {
    // cache.keys().then(function(keys) {
    //   keys.forEach(function(request, index, array) {
    //     // cache.delete(request);
    //     console.log('缓存的请求都有哪些---', request);
    //   });
    // });
    })
    var cacheRequestUrls = [
        '/test1'
    ];
    fetch('/test1');
    console.log('现在正在请求：' + e.request.url);
    // 判断当前请求是否需要缓存
    var needCache = cacheRequestUrls.some(function (url) {
        return e.request.url.indexOf(url) > -1;
    });
    /**** 这里是对XHR数据缓存的相关操作 ****/
    if (needCache) {
        // 使用fetch请求数据，并将请求结果clone一份缓存到cache
        // 此部分缓存后在browser中使用全局变量caches获取
        const tag = alreadyCacheMap.has(e.request.url);
        console.log('alreadyCacheMap---', alreadyCacheMap)
        if (tag) {
            fetchFun(e);
            return;
        }
        caches.open(apiCacheName).then(function (cache) {
            return fetch(e.request).then(function (response) {
                alreadyCacheMap.set(e.request.url, 1);
                cache.put(e.request.url, response.clone());
                return response;
            });
        });
    }
    /* ******************************* */

    else {
        // 非api请求，直接查询cache
        // 如果有cache则直接返回，否则通过fetch请求
        fetchFun(e);
    }
});
self.addEventListener('activate', function (e) {
    console.log('Service Worker 状态： activate');
    var cachePromise = caches.keys().then(function (keys) {
        return Promise.all(keys.map(function (key) {
            if (key !== cacheName) {
                return caches.delete(key);
            }
        }));
    })
    e.waitUntil(cachePromise);
    return self.clients.claim();
});

function fetchFun(e) {
    e.respondWith(
        caches.match(e.request).then(function (cache) {
            return cache || fetch(e.request);
        }).catch(function (err) {
            console.log(err);
            return fetch(e.request);
        })
    );
};

// 在server-worker中进行集成
function pushServer() {
navigator.serviceWorker.getRegistration().then(function (registration) {
    registration.showNotification('PWA', {
        body: '爪哇教育——大巫老师',
        icon: './img/icons/zhuawa-32.png',
        tag: 'user',
        renotify: true,
        data: {
            msg: '这是权限通知中的data',
        },
    })
    .then(function () {
    // 通知展现成功
    })
    .catch(function (e) {
// 通知展现未授权
    })
})
};

self.addEventListener('push', function (e) {
    console.log('我收到了----');
    if (!e.data) {
        return
    }
    // 解析获取推送消息
    let payload = e.data.json()
    // 根据推送消息生成桌面通知并展现出来
    let promise = self.registration.showNotification(payload.title, {
        body: payload.body,
        icon: payload.icon,
        data: {
        url: payload.url
        }
    })
    e.waitUntil(promise)
    })
    // 监听通知点击事件
    self.addEventListener('notificationclick', function (e) {
    // 关闭窗口
    e.notification.close()
    // 打开网页
    e.waitUntil(clients.openWindow(e.data.url))
    })
