# 手写实现 Hash Router

1. 初始化

   - 初始化一个对象 routes 收集路由，key 为路径 path，value 为路由跳转后执行的回调 callback

   - 绑定 popstate 事件 —— 将事件绑定封装为一个实例方法 bindPopState

     ```js
     class HistoryRouter {
       constructor() {
         this.routes = {}
         this._bindPopState()
       }
     }
     ```

2. bindPopState 方法 —— 绑定监听 popstate 事

   - 获取当前路径 —— 事件目标对象 e.state.path

   - 执行当前路径对应回调函数 —— 封装为一个实例方法 invokePathCallback

     ```js
     function _bindPopState() {
       // 监听 popstate 事件
       window.addEventListener('popstate', (e) => {
         const path = e.state && e.state.path

         this.invokePathCallback(path)
       })
     }
     ```

3. route 方法 —— 注册路由回调函数，在路由实例的 routes 对象中添加映射

   ```js
   function route(path, callback) {
     this.routes[path] = callback || function () {}
   }
   ```

4. invokePathCallback 方法 —— 根据传入的路径执行存储在 routes 中的回调函数

   - 使用 location.hash 获取 url 中的 hash

   - 需要去除 hash 值的 `#`

     ```js
     function invokePathCallback(path) {
       this.routes[path] && this.routes[path]()
     }
     ```

5. go 方法 —— 主动跳转到对应路径

   - 使用 window.history.pushState 向浏览器的会话历史栈增加一个条目

   - pushState 不会触发 popstate 事件，所以要主动调用 invokePathCallback 方法进行回调函数的执行

     ```js
     function go(path) {
       window.history.pushState({ path }, null, path)

       this.invokePathCallback(path)
     }
     ```
