# [Vue Router](https://router.vuejs.org/guide/)

## 创建路由

- 两个全局组件

  1. RouterLink —— 创建跳转链接，在页面不重新加载的情况下改变 URL 以及进行其他功能

  2. RouterView —— 告知 Vue Router 在哪里渲染当前路径对应的路由组件

- 创建路由器实例 —— createRouter()，该函数接收一个路由配置对象

- 注册路由器插件 —— Vue.use()

  - 全局注册 RouterView 和 RouterLink 组件

  - 添加全局 $router 和 $route 属性。

  - 启用 useRouter() 和 useRoute() 组合式函数。

  - 触发路由器解析初始路由。

- 全局属性 router & route

  - 路由器实例 router —— useRouter() / this.$router

  - 当前路由信息对象，包含多种路由信息参数 —— useRoute() / this.$route

- 选择不同的历史模式 —— 配置 createWebHashHistory() 的 history 属性

  1. Hash 模式 —— `history: createWebHashHistory()`

  2. Memory 模式 —— 适合 Node 环境 / SSR 等非浏览器环境 —— `history: createMemoryHistory()`

  3. HTML5 模式 —— ` history: createWebHistory()`

- 滚动行为 scrollBehavior 方法

  - 只在支持 history.pushState 的浏览器中可用

  - 参数 —— 路由对象 to & from、仅 popstate 导航可用的 savedPosition

  - 返回值 —— 一个 [ScrollToOptions](https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll) 位置对象

  - 延迟滚动 —— 返回一个 Promise

## 路由配置

1.  动态路由路径参数 —— 以冒号 `:` 表示，其值通过 $route.params 暴露

    - 组件的生命周期钩子不会重复调用

    - 用侦听器 watch 监听 $route.params 来作响应式处理

    - 也使用路由守卫 beforeRouteUpdate

2.  [更丰富的路由匹配语法](https://router.vuejs.org/zh/guide/essentials/route-matching-syntax.html)

3.  路由嵌套

    - 配置 children 选项

    - 对于嵌套的命名路由 ——

    - 可以忽略父路由的 component 和 components 选项

4.  命名路由 —— 配置路由的 name 属性

5.  路由重定向 —— 配置路由的 redirect 属性

    - 属性值可以是一个路径字符串

      ```js
      const routes = [{ path: '/home', redirect: '/' }]
      ```

    - 属性值可以是一个命名路由

      ```js
      const routes = [{ path: '/home', redirect: { name: 'homepage' } }]
      ```

    - 属性值可以是一个返回重定向目标的方法

      ```js
      const routes = [
        {
          // /search/screens -> /search?q=screens
          path: '/search/:searchText',
          redirect: (to) => {
            return { path: '/search', query: { q: to.params.searchText } }
          },
        },
      ]
      ```

6.  路由别名 —— 配置路由的 alias 属性

7.  路由组件传参数 —— 配置路由的 props 属性

    - 目的 —— 与 $route.params 解耦

    - 布尔模式 —— props: true

    - 对象模式

    - 函数模式 —— 接收一个返回 props 的函数

    - 对于命名视图路由必须逐一定义 props 配置

8.  路由元信息 —— 配置路由的 meta 属性

    - 属性值接收一个对象

    - 通过 route.meta 进行访问

## 编程式导航

- 导航到不同位置 —— this.$router.push()

  - 参数为一个字符串路径，或者一个描述地址的对象

  - 行为等同于 `<router-link :to="...">`

  - 所有导航方法都返回一个 Promise

- 替换当前位置 —— this.$router.replace(...)

  - 参数规则与 router.push 像童话，等同于在 router.push 的参数重增加 `replace: true`

  - 与 router.push 的不同 —— 在导航时不会向 history 添加新记录

  - 行为等同于 `<router-link :to="..." replace>`

- 横跨历史 —— this.$router.go(n)

  - 行为等同于浏览器 API window.history.go(n)

- 与 window.history API 的对照

  - router.push —— window.history.pushState

  - router.replace —— window.history.replaceState

  - router.go —— window.history.go

## [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

- 全局导航守卫

  - 全局前置守卫 `router.beforeEach((to, from, next) => {})`

    - 异步解析执行

    - 返回目标路由地址进行跳转

    - 返回 false 以取消导航并回到 from 对应地址

  - 全局解析守卫 `router.beforeResolve((to, from, next) => {})` —— 获取数据的理想位置

  - 全局后置钩子 `router.afterEach((to, from, failure) => {})`

- 路由独享守卫 `beforeEnter: (to, from) => {}`

  - 仅在进入路由时触，不会在 params、query 或 hash 改变时触发

  - 在具有相同父级的子路由之间移动时，定义在父路由中的 beforeEnter 不会被触发

- 组件内部守卫

  - `beforeRouteEnter(to, from) { }` —— 在渲染该组件的对应路由被验证前调用，组件实例尚未创建，无法访问 this

  - `beforeRouteUpdate(to, from) { }` —— 在当前路由改变，但是该**组件被复用时**调用

  - `beforeRouteLeave(to, from) { }` —— 在导航离开渲染该组件的对应路由时调用

- 完整的导航解析流程

  - 导航被触发

  - 在失活的组件里调用 `beforeRouteLeave`

  - 调用全局前置守卫 `beforeEach`

  - （在重用的组件内调用 `beforeRouteUpdate`）

  - 在路由配置里调用 `beforeEnter`

  - 解析异步路由组件

  - 在被激活的组件里调用 `beforeRouteEnter`

  - 调用全局的 `beforeResolve`

  - 导航被确认

  - 调用全局后置钩子 `afterEach`

  - 触发 DOM 更新

  - 调用 `beforeRouteEnter` 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

### 路由懒加载

- 将不同路由对应的组件分割不同代码块，当路由被访问时再加载对应组件

  ```js
  const UserDetails = () => import('./views/UserDetails.vue')

  const router = createRouter({
    routes: [
      { path: '/users/:id', component: UserDetails }
      // 或在路由定义里直接使用它
      { path: '/users/:id', component: () => import('./views/ UserDetails.vue') },
    ],
  })
  ```

- 使用 webpack 的命名 chunk

  ```js
  const UserDetails = () =>
    import(/* webpackChunkName: "group-user" */ './UserDetails.vue')
  const UserDashboard = () =>
    import(/* webpackChunkName: "group-user" */ './UserDashboard.vue')
  const UserProfileEdit = () =>
    import(/* webpackChunkName: "group-user" */ './UserProfileEditvue')
  ```

- 使用 vite 的 [rollupOptions](https://vite.dev/config/#build-rollupoptions) 配置定义分块

  ```js
  // vite.config.js
  export default defineConfig({
    build: {
      rollupOptions: {
        // https://rollupjs.org/guide/en/#outputmanualchunks
        output: {
          manualChunks: {
            'group-user': [
              './src/UserDetails',
              './src/UserDashboard',
              './src/UserProfileEdit',
            ],
          },
        },
      },
    },
  })
  ```

## 路由模式比较

- Hash 模式 —— 默认

- History 模式

### Hash 模式

- URL 中带着 `#`

- hash 值会出现在 URL 中而不是在 HTTP 请求中 —— hash值改变不会重新加载页面

- onhashchange 事件

- 通过访问 window.location.hash 来获取

### History 模式

- 没有 `#` ，使用传统的路由分发模式

- history API

  - 修改历史状态(HTML5 新增) —— 修改 url 后浏览器不会立即向后端发送请求，

    - pushState()

    - replaceState()

  - 切换历史状态

    - forward()

    - back()

    - go()

- popState 事件

  - pushState()/replaceState() 不会触发

  - 点击浏览器的前进/后退按钮时触发

  - JavaScript 调用 forward / back / go 方法时触发

- 通过访问 window.location.pathname 来获取