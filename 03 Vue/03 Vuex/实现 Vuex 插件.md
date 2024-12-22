# [Vuex 基础](https://vuex.vuejs.org/zh/)

## State

- 在 Vue 组件中访问 Vuex 状态

  ```js
  this.$store.state.xxx
  ```

- mapState 辅助函数 —— 返回一个对象

  ```js
  import { mapState } from 'vuex'
  export default {
    //...
    computed: mapState({
      // 箭头函数可使代码更简练
      count: (state) => state.count,

      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState(state) {
        return state.count + this.localCount
      },
    }),
  }
  ```

- 对象展开运算符

  ```js
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        //...
      }),
    },
  }
  ```

## Getter

- 本质就是 Vuex 的计算属性，接收 state 作为第一个参数

  ```js
  const store = createStore({
    state: { count: 0 },
    getters: {
      doubleCount(state) {
        return state.count * 2
      },
    },
  })
  ```

- 接收 getters 作为第二个参数

  ```js
  const store = createStore({
    state: { count: 0 },
    getters: {
      doubleCount(state) {
        return state.count * 2
      },
      doubleCountPlusOne(state, getters) {
        return getters.doubleCount + 1
      },
    },
  })
  ```

- 可以让 getter 返回一个函数来实现给 getter 传参

  ```js
  const store = createStore({
    state: { count: 0 },
    getters: {
      doubleCountPlusOne(state, getters) {
        return getters.doubleCount + 1
      },
      doubleCountPlusN(state, getters) {
        return (n) => {
          return getters.doubleCount + n
        }
      },
    },
  })
  ```

- 通过属性访问

  ```js
  this.$store.getters.doubleCount
  this.$store.getters.doubleCountPlusN(10)
  ```

- mapGetters 辅助函数，接收一个数组 or 一个对象作为参数

  ```js
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['getterA', 'getterB']),
      ...mapGetters({
        myGetterC: 'getterC',
      }),
    },
  }
  ```

## Mutation

- 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation

- 每个 mutation 都有一个字符串的事件类型 type 和一个回调函数 handler

- 回调函数 handler 的函数名为事件类型 type，第一个参数为 state，第二个可选参数为 payload

  ```js
  const store = createStore({
    state: {},
    mutations: {
      increment(state, payload) {},
    },
  })
  ```

- 使用 commit 方法提交触发 mutation，第一个参数为 mutation 的 type，第二个可选参数为 payload

  ```js
  this.$store.commit('increment', 1)

  this.$store.commit('increment', {
    amount: 10,
  })
  ```

- commit 方法可直接传入一个包含 type 属性的对象

  ```js
  this.$store.commit({
    type: 'increment',
    amount: 10,
  })
  ```

- mapMutations 辅助函数，接收一个数组 or 一个对象作为参数

  ```js
  import { mapMutations } from 'vuex'
  export default {
    methods: {
      ...mapMutations(['increment', 'decrement']),
      ...mapMutations({
        add: 'increment',
      }),
    },
  }
  ```

- mutation 必须是同步函数，不能是异步函数

## Action

- Action 与 Mutation 类似，不同在于：

  - Action 提交的是 mutation，而不是直接变更状态

  - Action 可以包含任意异步操作

- Action 函数接收一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation

  ```js
  const store = createStore({
    state: {},
    mutations: {
      increment(state) {},
      decrement(state) {},
    },
    actions: {
      increment(context, payload) {
        context.commit('increment')
      },
      decrement({ commit, state }, payload) {
        commit('decrement')
      },
    },
  })
  ```

- 通过 this.$store.dispatch 触发 action，第一个参数为 action 的 type，第二个可选参数为 payload

  ```js
  this.$store.dispatch('increment')
  this.$store.dispatch('increment', {
    amount: 10,
  })
  ```

- dispatch 方法可直接传入一个包含 type 属性的对象

  ```js
  this.$store.dispatch({
    type: 'increment',
    amount: 10,
  })
  ```

- mapActions 辅助函数，接收一个数组 or 一个对象作为参数

  ```js
  import { mapActions } from 'vuex'
  export default {
    methods: {
      ...mapActions(['increment', 'decrement']),
      ...mapActions({
        add: 'increment',
      }),
    },
  }
  ```

- store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise

  ```js
  store.dispatch('actionA').then(() => {
    // ...
  })
  ```

## Module

- 目的 —— 将 store 分割成多个 store 模块

- 对于模块内部的功能

  - 模块内部的 mutation & getter 的第一个参数 state 为模块局部状态对象

  - 模块内部的 action 的第一个参数 context 可以分别访问局部状态 state & 根节点状态 rootState

  - 模块内部的 getter 的第三个参数为根节点状态 rootState & 第四个参数为根节点计算属性 rootGetters

- 命名空间 —— 配置 `namespaced: true`

- 在全局命名空间分发 action & 提交 mutation —— dispatch & commit 传递第三个参数 `{ root: true }`

- 对于辅助函数

  - 将模块的命名空间字符串作为第一个参数传入

  - 使用 createNamespacedHelpers 方法得到基于某个命名空间的辅助函数

## 与 [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage) 的区别

- 存储区域

  - Vuex 存储在内存

  - localStorage 存储在浏览器本地

- 应用场景

  - Vuex 用于组件之间的传值

  - localStorage 是浏览器本地存储，用于跨页面传递数据

- 时效性

  - Vuex 存储的数据会在页面刷新时丢失

  - localStorage 存储的数据具有永久性，需要手动清除

- Vuex 能做到数据的响应式，而 localStorage 无法做到

# 简单实现 Vuex

## Vuex 原理

- \$store —— 在每个 Vue 组件实例的 beforeCreate 生命周期中通过 Vue.mixin 混入同一个 Store 实例作为 \$store 属性

- 响应式 —— 利用 Vue 的响应式原理，即 new Vue()

## 实现步骤

1. 以 Vue 插件的形式实现 Vuex，需要提供一个 install 方法，在 install 方法中通过 Vue.mixin 在每个 Vue 组件实例的 beforeCreate 生命周期中混入 Store 实例

   ```js
   let Vue

   export default {
     install(_Vue) {
       Vue = _Vue

       Vue.minxin({ beforeCreate: vuexInit })
     },
   }
   ```

2. 实现用于注入 Store 实例的方法 vuexInit

   ```js
   vuexInit() {
     const options = this.$options
     if (options.store) {
       this.$store =
         typeof options.store === 'function' ? options.store() : options.store
     } else if (options.parent && options.parent.$store) {
       this.$store = options.parent.$store
     }
   }
   ```

3. 声明 Store 类

   ```js
   export class Store {
     constructor() {}
   }
   ```

4. 实现 store 实例中 state 的响应式 —— 将实例的 state 赋予为一个 Vue 实例，从而利用 Vue 实例 data 的响应式

   ```js
   export class Store {
     constructor(options = {}) {
       initStoreVM(this, options.state)
     }

     // this.$store.state.xxx = this.$store._vm._data.$state.xxx
     get state() {
       return this._vm._data.$state
     }
   }

   function initStoreVM(store, state) {
     store._vm = new Vue({
       data: {
         $state: state,
       },
     })
   }
   ```

5. 实现 Getters —— 将每个 getter 的 get 属性设置为其执行后的结果，即计算属性

   ```js
   export class Store {
     constructor(options = {}) {
       initStoreVM(this, options.state)

       this.getters = {}
       Object.entries(options.getters).forEach(([key, func]) => {
         Object.defineProperty(this.getters, key, {
           get: () => func(this.state, this.getters),
         })
       })
     }

     get state() {
       return this._vm._data.$state
     }
   }

   function initStoreVM(store, state) {}
   ```

6. 实现 Mutation & Action

   ```js
   export class Store {
     constructor(options = {}) {
       initStoreVM(this, options.state)

       // Getters
       this.getters = {}
       Object.entries(options.getters).forEach(([key, func]) => {
         Object.defineProperty(this.getters, key, {
           get: () => func(this.state, this.getters),
         })
       })

       // Mutations
       this.mutations = {}
       Object.entries(options.mutations).forEach(([type, handler]) => {
         this.mutations[type] = (payload) => {
           handler(this.state, payload)
         }
       })

       // Actions
       this.actions = {}
       Object.entries(options.actions).forEach(([type, handler]) => {
         this.actions[type] = (payload) => {
           handler(this, payload)
         }
       })
     }

     get state() {
       return this._vm._data.$state
     }
   }

   function initStoreVM(store, state) {}
   ```

7. 实现提交 mutation 的 commit 方法 & 提交 action 的 dispatch 方法

   ```js
   export class Store {
     constructor(options = {}) {
       initStoreVM(this, options.state)

       // Getters
       this.getters = {}
       Object.entries(options.getters).forEach(([key, func]) => {
         Object.defineProperty(this.getters, key, {
           get: () => func(this.state, this.getters),
         })
       })

       // Mutations
       this.mutations = {}
       Object.entries(options.mutations).forEach(([type, handler]) => {
         this.mutations[type] = (payload) => {
           handler(this.state, payload)
         }
       })

       // Actions
       this.actions = {}
       Object.entries(options.actions).forEach(([type, handler]) => {
         this.actions[type] = (payload) => {
           handler(this, payload)
         }
       })
     }

     get state() {
       return this._vm._data.$state
     }

     commit(type, payload) {
       this.mutations.type && this.mutations[type](payload)
     }

     dispatch(type, payload) {}
       this.actions.type && this.actions[type](payload)
   }

   function initStoreVM(store, state) {}
   ```

## 可进一步实现

- 辅助函数 mapState、mapGetters、mapMutations、mapGetters

- 模块化 Module

- [其他 API](https://vuex.vuejs.org/zh/api/)
