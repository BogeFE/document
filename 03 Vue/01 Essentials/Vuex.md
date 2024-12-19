## *Vuex* 是什么？

*Vuex* 是一个专为 *Vue.js* 应用程序开发的状**态管理模式**，每一个 *Vuex* 应用的核心就是 *store*（仓库）

- *Vuex* 的状态存储是响应式的 —— 若 *store* 中的状态发生变化，那么相应的组件也会相应地得到高效更新
- 改变 *store* 中的状态的**唯一途径**就是显式地提交  (*commit*) *mutation*



#### 什么是状态管理？

将多个组件**共享的变量**存储在一个对象里面



#### 为什么使用 *Vuex*？

在大型 *SPA* 中，会出现多个视图组件依赖同一个状态，来自不同视图的行为需要变更同一个状态



#### *Vuex* 基本属性

- *state* —— 基本数据的存放地
- *getters* —— 从基本数据**派生**出来的数据
- *mutation*s —— 更改数据的唯一方法，配合 *commit* 使用
- *actions* —— 包裹 *mutation*s，使其可以异步
- *modules* —— 模块化 *Vuex*



#### *Vuex* 严格模式

在严格模式下，不是由 *mutation*s 所引起的状态变更都会抛出错误

```js
const store = new Vuex.Store({
    strict: true
})
```



## *Vuex* 的使用

#### 最简单的使用

每一个 *Vuex* 应用就是一个 ==*store*==

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state){
            state.count++
        }
    }
})
```

- ==*state*== —— 组件共享状态
- ==*mutations*== —— 改变状态的方法
- ==*commit*== —— 触发 *mutation*s 改变 state

```js
store.commit('increment');

console.log(store.state.count);//1
```



#### *Mutations*

*mutations* 是一系列更改 *Vuex* 的 *store* 中的状态 *state* 的**唯一方法** 

- 事件类型 *type*
- 回调函数 *handler*

```js
import { Vuex } from 'vuex';

const store = new Vuex.Store({
    state:{
        count: 1
    }
    mutations:{
    	//increment 就是 *mutation*s 的事件类型 type
    	increment(state){
    		//这个函数提就是 *mutation*s 的回调函数 handler
    		state.count++
		}
	}
})
```

- 通过 *store.commit* 方法调用

  - 第一个参数  *mutations type*

   ```js
  store.commit('increment')
   ```

  - 第二个参数 *mutations payload* ，即提交载荷

  ```js
  mutaion: {
      increment1 (state, n) {
          state.count += n;
      },
      increment2 (state, payload) {
          state.totalPrince += payload.price + payload.count;
      }
  }
  
  store.commit('increment1', 10);
  store.commit({
  	type: 'increment2',
      price: 10,
      count: 8,
  });
  ```

  

#### *Actions*

- *Actions* 可以包含任何异步操作
- *Actions* 提交的是 *mutation*s，而不是直接变更状态

```js
const store = new Vuex.Store({
  	state: {
    	count: 0
  	},
  	mutations: {
    	increment (state) {
      		state.count++
    	}
  	},
  	actions: {
    	increment (context) {
      		context.commit('increment')
    	}
  	}
})
```

*Actions* 函数接受一个与 *store* 实例具有相同方法和属性的 *context* 对象

- 可以调用 *context.commit* 提交一个 *mutation*
- 可以通过 *context.state* 和 *context.getters* 来获取 *state* 和 *getters*



#### *Mutation* 和 *Action* 的区别

- 同步 / 异步
  - *Mutations* 必须同步执行
  - *Actions* 支持异步执行，但不能直接操作 *State*
- 参数
  - *mutation*s 参数为 state —— 包含 *store* 中的数据
  - *actions* 的参数是 *context* —— 作为 *state* 的父级 ，包含 *state、getters*
- 视图更新时 → 先触发 *actions* → *actions* 触发 *mutation*s



#### *getters* 对象

方便在 *store* 中对状态做集中处理

- 接收 *state* 作为第一个参数

```js
const store = new Vuex({
    state: {
        todos: [
            { id: 1, text: '...', done: true },
      		{ id: 2, text: '...', done: false }
        ]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done);
        }
    }
})
```

- 接收其他 *getters* 对象作为第二个参数

```js
getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done);
        }
        doneTodosCount: (state,getters) => {
            return getters.donetodos.length
        }
    }
```

- 在 *Vue* 中通过 *store.getters* 对象调用

```js
computed: {
    doneTodos(){
        return this.$store.getters.doneTodos
    }
}
```



#### 在 Vue 组件中使用 *Vuex*

如果希望 *Vuex* 状态更新，相应的 *Vue* 组件也得到更新

- 在计算属性 *computed* 中获取 *state*
  - 直接操作了**全局状态** *store.state.count*，需要在每个使用该 *Vue* 的组件引入

```js
const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
        count(){
            return store.state.count;
        }
    }
}
```

- 将状态从根组件注入每一个子组件的机制

```js
//根组件
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const app = new Vue({
    el: '#app',
    store,//使用了 store 选项
    components: {
        Counter
    },
    template: `
			<div class='app'>
				<counter></counter>	
			</div>`
}) 
```

注入后，可以在子组件 *Counter* 中通过 *this.$store* 访问

```JS
const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
        count(){
            return this.$store.state.count
        }
    }
}
```



#### *mapState* 函数

```js
import { mapState } from 'vuex';

export default {
    computed: mapState({
        count: state => state.count,
        conutAlias: 'count',
        //赋予 count 一个别名
    })
}
```

⬇更为简单的映射方法

```js
computed: mapState([
    'count'
    //直接映射 this.count === stroe.state.count
])
```



#### *mapGetters* 函数

将 *store* 中的 *getters* 映射到**局部计算属性**

```js
import { mapGetters } from 'vuex'

export default{
    computed: {
        ...mapGetters(['doneTodosCount','anotherGetter'])
		//直接映射 this.doneTodosCount === stroe.getters.doneTodosCount
		//直接映射 this.anotherGetter === stroe.getters.anotherGetter
    }
}
```



#### *mapMutations* 函数

将组件中的 methods 映射到 **store*.*commit** 方法调用

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment' // 映射 this.increment() 为 this.$store.commit('increment')
    ]),
    ...mapMutations({
      add: 'increment' // 映射 this.add() 为 this.$store.commit('increment')
    })
  }
}
```



## 区别

#### 与 *localStorage* 的区别

- 存储区域
  - *Vuex* 存储在内存
  - *localStorage* 存储在浏览器本地
- 应用场景
  - *Vuex* 用于组件之间的传值
  - *localStorage* 是浏览器本地存储，用于跨页面传递数据

- 时效性
  - *Vuex* 存储的数据会在页面刷新时丢失
  - *localStorage* 存储的数据具有永久性，需要手动清除
- *Vuex* 能做到数据的响应式，而 *localStorage* 无法做到

