# 前端路由

随之 *Ajax* 的流行，异步数据请求可以在浏览器不刷新的情况下进行。



## 单页应用 *SPA*

- 仅在 *Web* 页面初始化时加载相应的 *HTML、JavaScript* 和 *CSS*
- 页面中的交互是不刷新页面的，就连页面跳转也都是不刷新页面的



优点

- 内容的改变无需重新加载整个页面，避免了不必要的跳转和重复渲染
- *SPA* 相对对服务器压力小
- 前后端分离，前端进行逻辑交互，后端负责数据处理

缺点

- 首屏加载慢 —— 需要在首次加载页面时统一加载所需 *HTML、CSS、JavaScript*
- 不利于 *SEO*



#### 什么是前端路由？

保证**只有一个 *HTML* 页面**，且与用户交互时**不刷新和跳转页面**的同时，为 *SPA* 中的每个视图展示形式**匹配一个特殊的 *url***



实现需求：

- 根据不同的 *URL* 渲染不同的内容
- 不刷新页面
- 监听 *URL* 的变化



### *Hash* 路由

*hash* 就是 *URL* 后的 *#*号以及后面的字符



*hash* 特性：

- *url* 中的 *hash* 值不会在被携带在请求报文中
- *hash* 值的改变：
  - 不会导致页面的刷新
  - 会在浏览器的访问历史中增加记录 —— 可通过后退、前进按钮控制 hash 切换
  - 会触发一个 *hashchange* 事件

控制 *hash* 的变化：

- 设置 *\<a>* 标签的 *href* 属性

```html
<a href="#hash1"></a>
<a href="#hash2"></a>
<a href="#hash3"></a>
```

- 通过 *JavaScript* 设置 *hash* 的值

```js
window.location.hash = "#hash1";
```

- 通过 *JavaScript* 获取 *hash* 的值

```js
let hash = window.location.hash;
```

- 实现一个路由对象控制页面颜色的的变化

```js
class HashRouter{
    constructor(){
        this.routes = {};
        this.refresh = this.refresh.bind(this);
        window.addEventListener('load',this.refresh);
        window.addEventListener('hashchange',this.refresh);
    }
    //注册路由
    register(hash,callback){
        this.routes[hash] = callback || function(){};
    }
    //刷新页面
    refresh(){
        this.routes[location.hash.slice(1)]();
    }
}

const body = document.querySelector('body');
const changeBgColor = function(color){
    body.style.backgroundColor = color;
}

const router = new HashRouter();
router.route('#gray',() => {
    changeBgColor('gray');
});
router.route('#green',() => {
    changeBgColor('green');
});
router.route('',() => {
    changeBgColor('white');
});
```



### *History*

*HTML5* 之前就出现了 *History API*：

- *window.history.back( )* —— 后退一步
- *window.history.forward( )* —— 前进一步
- *window.history.go(n)* —— 前进或后退n个页面



*HTML5* 新增了**两个方法**可以在不刷新页面的情况下操作浏览器历史记录

- *window.history.pushState(null,null,path)* —— 增加历史记录
- *window.history.replaceState(null,null,path)* —— 直接替换当前历史记录

- **三个参数**：
  - *state* —— 一个与指定网址相关的状态对象，*popstate* 事件触发时，该对象会传入回调函数
  - *title* —— 新页面的标题，用 *null* 代替
  - *url* —— 新的网址，用于更新浏览器的地址栏，**必须和当前页面处于同一个域**



*History* 特性：

- 可使用 popstate 事件监听url的变化
  - pushState 和 replaceState 不会触发 popstate 事件
  - 用户点击浏览器的后退、前进按钮会触发 popstate 事件
  - 使用 JavaScript 调用 go、back、forward方法回触发 popstate 事件



#### 如何选择 *hash* 与 *history*？

*hash* 相比 *history* 的优点

- 兼容性好



## *Vue Router*

#### 入门

- 使用 *\<router-link\>* 代替 *\<a\>* 进行导航
- 通过传递 *to* 属性指定连接
- 路由匹配到的组件将渲染在 *\<router-view\>*

```html
<div id="app">
	<h1>Hello App!</h1>
  	<p>
    	<router-link to="/">Go to Home</router-link>
    	<router-link to="/about">Go to About</router-link>
  	</p>
    <router-view></router-view>
</div>
```



#### 基本使用

- 引入路由

```js
Vue.use(Router);
```

- 定义路由配置

```js
const routes = [
    {
        path: '/',//路径
      	redirect:'/login',//重定向
      	name: 'Home',//路由名称
      	component: Home,//对应组件
      	//嵌套路由
      	children:[
      		{
       			path: '/index',
      			name: 'Index',
      			component: Index
      		},
        ]
	}
];
```

- 创建路由实例

```js
const router = new VueRouter({
    //传入路由配置信息对象
    routes
})

/*
export default new Router({
    
})
*/
```

- 创建和挂载根实例

```js
const app = new Vue({
    router
}).$mount('#app');
```



#### 路由组件传参

使用 *props* 传递参数给路由组件

- 布尔模式 —— *props: true → route.params* 将被设置为组件的 *props*

  ```js
  const User = {
    props: ['id'],
    template: '<div>User {{ id }}</div>'
  }
  const routes = [{
      path: '/user/:id', 
      component: User, 
      props: true 
  }]
  ```

- 对象模式

- 函数模式 —— 创建返回 *props* 的函数

  ```js
  const routes = [
    {
      path: '/search',
      component: SearchUser,
      props: route => ({ query: route.query.q })
    }
  ]
  ```

  

#### 编程式导航

- 使用 *$router* 访问路由实例
  - *this.$router.push(...)*  —— 访问路由实例；会向 *history* 栈添加一个新的记录

    - 字符串路径

      ```js
      router.push('/users/eduardo')
      ```

    - 带有路径的对象

      ```js
      router.push({
          path: '/users/eduardo'
      })
      ```

    - 命名的路由，并加上参数
  
      ```js
      router.push({ 
          name: 'user', 
          params: { 
              username: 'eduardo'
          }
      })
      ```

    - 带查询参数

      ```js
      router.push({ 
          path: 'register', 
          query: { 
              plan: 'private'
          }
      })
      //结果是 /register?plan=private
      ```
  
    - 带 *hash*
  
      ```js
      router.push({ 
          path: '/about', 
          hash: '#team'
      })
      //结果是 /about#team
      ```
  
  - *this.$router.replace( )* —— 替换掉当前的 *history* 记录
  
    ```js
    router.push({ path: '/home', replace: true })
    // 相当于
    router.replace({ path: '/home' })
    ```
  
  - *this.$router.go(n)*
  
- 点击 *\<router-link :to="...">* 相当于调用 *router.push(...)*

| 声明式                      | 编程式             |
| --------------------------- | ------------------ |
| *\<router-link :to="..."\>* | *router.push(...)* |



#### *History* 模式

*Vue Router* 默认 *hash* 模式

```js
const router = new VueRouter({
    //取消使用默认的hash模式，使用history模式
	mode: 'history',
    routes: [...]
})

// history模式 -> http://something.com/user/id
// hash模式 -> http://something.com#/user/id    
```



#### 动态路由

我们经常需要将某种模式匹配到所有路由，并映射到同个组件，比如用户信息组件，不同用户使用同一个组件

- 使用冒号*:*定义 —— 当一个路由被匹配时，它的 *params* 的值将在每个组件中以 *this.$route.params* 的形式暴露出来

```js
const User = {
    template: `<div>User {{ $route.params.id }}</div>`
}

const router = new VueRouter({
    routes: [
        {
            path: '/user/:id',
            component: User
        }
    ]
});
```

- 获取参数方法 —— *this.$route.params*

- 响应路由参数变化 —— ⭐相同的组件实例被重复使用，意味着组件的生命周期钩子不会被调用

  - *watch* *$route* 对象上的任意属性

  ```js
  const User = {
      template: `<div>User {{ $route.params.id }}</div>`,
      created() {
          this.$watch(() => this.$route.params, (toParams,previousParams) => {
              //...
          })
      }
  }
  ```

  - 使用 *beforeRouteUpdate* 导航守卫

  ```js
  const User = {
      template: `<div>User {{ $route.params.id }}</div>`,
     	beforeRouteUpdate (to,from,next){
          //对路由变化做出相应
         	next();
      }
  }
  ```

- 捕获所有路由或者 *404 Not Found* 路由



#### 嵌套路由

一个被渲染的组件也可以包含自己嵌套的 *\<router-view>*，即在模板内添加  *\<router-view>*

```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `,
}
```

要渲染这个嵌套的  *\<router-view>* ，需要在路由中配置 *children*

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        path: 'profile', // 当 /user/:id/profile 匹配成功 
        component: UserProfile, // UserProfile将被渲染到User的<router-view>内部
      },
      {
        path: 'posts',// 当/user/:id/posts匹配成功
        component: UserPosts,//UserPosts将被渲染到User的<router-view>内部
      },
    ],
  },
]
```





#### 导航守卫

- 全局导航守卫 

  - 全局前置守卫 *router.beforeEach* —— 每当一个导航出发都会调用

  - 全局解析守卫 *router.beforeResolve*
  - 全局后置钩子 *router.afterEach*

  ```js
  const router = new VueRouter()
  router.beforeEach((to,from,next) => {
      //...
  })
  router.afterEach((to,from,next) => {
      //...
  })
  ```

- 路由独享守卫

  - *beforeEnter* —— 在进入路由时触发

  ```js
  const router = new VueRouter({
      routes: [
          {
              path: '/foo',
              component: Foo,
              beforeEnter: (to,from,next) => {
                  //...
              }
          }
      ]
  })
  ```

- 组件内部守卫

  - *beforeRouteEnter* —— 在渲染该组件的对应路由被验证前调用
  - *beforeRouteUpdate* —— 在当前路由改变，但是该**组件被复用时**调用
  - *beforeRouteLeave* —— 在导航离开渲染该组件的对应路由时调用

  ```js
  const Foo = {
      template: `<div>foo</div>`,
      beforeRouteEnter(to,from,next){
      	//无法获取组件实例 this
      	//该守卫执行时，组件还未被创建
  	},
      beforeRouteUpdate(to,from,next){
          //...
  	},
      beforeRouteLeave(to,from,next){
          //...
  	},
  }
  ```

- 完整的导航解析流程

  - 导航被触发
  - 在失活的组件里调用 `beforeRouteLeave`
  - 调用全局前置守卫 `beforeEach`
  - （在重用的组件内调用 `beforeRouteUpdate`）
  - 在路由配置里调用 `beforeEnter`
  - 解析异步路由组件
  - 在被激活的组件里调用 `beforeRouteEnter`
  - 导航被确认
  - 调用全局后置钩子 `afterEach`
  - 触发 DOM 更新

#### 路由懒加载

将不同路由对应的组件分割不同代码块，当路由被访问时再加载对应组件

```js
const router = new VueRouter({
    routes: [
        {
            path: '/foo',
            component: () => {
                import('./foo.vue');
            }
        }
    ]
})
```



# 面试题

## Vue Router 的两种模式

- hash 模式 —— 默认
- history 模式



#### hash 模式

- URL 中带着 `#` 
- hash 值会出现在 URL 中而不是在 HTTP 请求中
- onhashchange 事件



#### history 模式

- 没有 `#` ，使用传统的路由分发模式
- history API
  - 修改历史状态 —— 修改 url 后浏览器不会立即向后端发送请求
    - pushState()
    - replaceState()
  - 切换历史状态
    - forward()
    - back()
    - go()
- popState 事件
  - pushState()/replaceState() 不会触发
  - 点击浏览器的前进/后退按钮时触发
  - JavaScript 调用 forward、back、go方法时触发

- 使用 history 模式

  ```js
  new VueRouter({
      mode: 'history',
      routes: [...]
  })
  ```



## 获取页面的 hash 变化

- 监听$route的变化

  ```js
  watch:{
      $route:{
          handler: function(val,oldVal){
              console.log(val);
          },
          deep: true
      }
  }
  ```

- 读取 window.location.hash 



## \$route 与 \$router 的区别？

- $route 是**路由信息对象**，包含多种路由信息参数
  - path
  - params
  - hash
  - query
  - fullPath
  - name
- $router 是**路由实例**



## 动态路由与动态参数

#### param 方式

- 路由定义

  - 在标签上

    ```html
    <router-link :to="'/user/'+userId"></router-link>
    ```

  - 在路由文件中

    ```js
    {
        path: '/user/:userId'
        component: User,
    }
    ```

- 路由跳转

  - 在标签上
  - 

#### query 方式
