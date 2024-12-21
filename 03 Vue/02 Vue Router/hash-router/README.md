# 手写实现 Hash Router

1. 初始化

   - 初始化一个对象 routes 收集路由，key 为 hash，value 为路由跳转后执行的回调 callback

   - 绑定 load 事件，回调函数为实例方法 refresh —— 目的是为了让路由初始化的时候就可以渲染

   - 绑定 hashchange 事件，回调函数为实例方法 refresh —— 切换路由时执行对应回调

     ```js
     class HashRouter {
       constructor() {
         this.routes = {}
         this.refresh = this.refresh.bind(this)

         window.addEventListener('load', this.refresh)
         window.addEventListener('hashchange', this.refresh)
       }
     }
     ```

2. route 方法 —— 注册路由回调函数，在 Hash 路由实例的 routes 对象中添加映射

   ```js
     route(hash, callback) {
   this.routes[hash] = callback || function () {}
   }
   ```

3. refresh 方法 —— 执行当前路由下的回调函数

   - 使用 location.hash 获取 url 中的 hash

   - 需要去除 hash 值的 `#`

     ```js
       refresh() {
          this.routes[`/${location.hash.slice(1) || ''}`]()
     }
     ```
