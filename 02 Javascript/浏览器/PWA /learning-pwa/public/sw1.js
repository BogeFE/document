// sw.js
console.log('service worker 注册成功')

self.addEventListener('install', () => {
  // 安装回调的逻辑处理
  // console.log(a.undefined);
  // self.skipWaiting();
  console.log('service worker 安装成功')
})

self.addEventListener('activate', () => {
  // 激活回调的逻辑处理
  console.log('service worker 激活成功')
})

self.addEventListener('fetch', event => {
  console.log('service worker 抓取请求成功: ' + event.request.url)
  // 测试拦截
  if (event.request.url === 'http://localhost:8085/img/loading.svg') {
    event.respondWith(new Response('Hello World!'))
  }
})