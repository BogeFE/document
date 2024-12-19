# **一、Vue 基础**

#### Vue的基本原理

#### 双向数据绑定的原理

#### 使用 Object.defineProperty() 来进行数据劫持有什么缺点？

#### MVVM、MVC、MVP的区别

#### Computed 和 Watch 的区别

#### Computed 和 Meth·ods 的区别

#### slot是什么？有什么作用？原理是什么？

#### 过滤器的作用，如何实现一个过滤器

#### 如何保存页面的当前的状态

#### 常见的事件修饰符及其作用

- .stop —— 阻止事件的传播，相当于 JavaScript 中的 event.stopPropagation()
- .prevent —— 阻止事件的默认行为，相当于 JavaScript 中的 event.preventDefa()
- .capture —— 将事件冒泡改为事件捕获
- .once —— 事件只触发一次
- 

#### v-if、v-show、v-html 的原理

- v-if：会调用 addIfCondition 方法，生成 vnode 的时候会忽略该节点，render 的时候就不会渲染
- v-show：会生成 vnode 并且 render 时全部渲染为真实节点，在 render 过程中会设置节点的 display 属性
- v-html：本质上是设置节点的 innerHTML 为 v-html 的值

#### v-if 和 v-show的区别

- 手段
  - v-if 是动态地向 DOM 树中添加或删除 DOM 节点
  - v-show 通过设置 DOM 元素的 display 属性来控制显隐
- 编译过程：
  - v-if 会有一个局部编译/卸载的过程，在 DOM 树中适当地销毁、重建组件事件监听器和子组件
  - v-show 只是基于简单的 CSS 切换
- 渲染过程：
  - v-if 是惰性的，只有在条件第一次为真时才会进行渲染
  - v-show 会直接编译并渲染所有DOM节点，缓存在内存中
- 性能：
  - v-if 有大量的切换消耗
  - v-show 有大量的初始渲染消耗
- 使用场景：
  - v-if 适用于运行条件变化不大的场景
  - v-show 适用于频繁切换的场景

#### v-model 是如何实现的，语法糖实际是什么？

- 用于表单上

```html
<input v-model="demo"></input>
```

⬇

```html
<input 
	v-bind:value = "demo"
	v-on:input = "demo = $event.target.value"
></input>
```

#### v-model 可以被用在自定义组件上吗？如果可以，如何使用？

可以，本质上是父子组件的通信，通过 prop 和 $emit 来实现

- 自定义组件中，默认使用名为 value 的 prop 和名为 input 的 方法

```html
<self-input v-model="demo"></self-input>
```

⬇

```html
<self-input
	v-bind:value = "demo"
    v-on:input = "demo = $event.target.value"
></self-input>
```

父组件的内部实现：

```vue
Vue.component('selt-input',{
    template:
    `
	<self-input
		v-bind:value = "value"
    	v-on:input = "$emit('input',$event.target.value)"
	></self-input>
	`
})
```



####  data为什么是一个函数而不是对象

- JavaScript 的对象是引用类型，当多个实例引用同一个对象，只要其中一个实例对这个对象进行操作，操作带来的影响会体现在所有实例上
- Vue 希望实现组件的复用，所以每个组件应当由属于自己的数据，这样组件之间才不会互相影响



#### 对keep-alive的理解，它是如何实现的，具体缓存的是什么？

#### $nextTick 原理及作用

#### Vue 中给 data 中的对象属性添加一个新的属性时会发生什么？如何解决？

使用 `$set()`方法将属性变为可响应的属性，视图也会随之变化

```html
<script>
    export default { 
       data () { 
          return { 
              obj: { 
                  a: 'obj.a' 
              } 
          } 
       },
       methods: { 
          addObjB () { 
              this.$set(this.obj,'b','obj.b')
              console.log(this.obj) 
          } 
      }
   }
</script>
```



#### Vue中封装的数组方法有哪些，其如何实现页面更新

#### Vue 单页应用与多页应用的区别

- 单页应用 ——  
- 多页应用

#### <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76b3d747986e45e096abaf64faf5e332~tplv-k3u1fbpfcp-watermark.awebp" alt="775316ebb4c727f7c8771cc2c06e06dd.jpg" style="zoom:50%;" />

#### Vue template 到 render 的过程

#### Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？

#### 简述 mixin、extends 的覆盖逻辑

#### 描述下Vue自定义指令

#### 子组件可以直接改变父组件的数据吗？

#### Vue是如何收集依赖的？

#### 对 React 和 Vue 的理解，它们的异同

#### Vue的优点

#### assets和static的区别

#### delete和Vue.delete删除数组的区别

#### vue如何监听对象或者数组某个属性的变化

#### 什么是 mixin ？

#### Vue模版编译原理

#### 对SSR的理解

#### Vue的性能优化有哪些

#### 对 SPA 单页面的理解，它的优缺点分别是什么？

#### template和jsx的有什么分别？

#### vue初始化页面闪动问题

#### extend 有什么作用

#### mixin 和 mixins 区别

#### MVVM的优缺点?

# **二、生命周期**

#### 说一下Vue的生命周期

每一个 Vue 实例都有完整的生命周期：

==开始创建 ➡初始化数据 ➡渲染模板 ➡ 挂载DOM节点 ➡ 渲染、更新 ➡ 渲染、卸载==

- beforeCreate —— 创建前，无法访问到 data、methods、computed等
- ==created —— data、methods、computed等都配置完成，渲染的节点尚未挂载到 DOM 上，无法访问 `$el`==
- beforeMount —— 编译模板，把 data 里面的数据和模板生成 html
- mounted —— 完成模板中的 html 渲染到 html 页面中
- beforeUpdate
- updated
- beforeDestroy
- destroyed

#### Vue 子组件和父组件执行顺序

- 创建 渲染
  - 父组件 beforeCreate
  - 父组件 created
  - 父组件 beforeMount
  - 子组件 beforeCreate
  - 子组件 created
  - 子组件 beforeMount
  - 子组件 mounted
  - 父组件 mounted
- 更新 渲染
  - 父组件 beforeUpdate
  - 子组件 beforeUpdate
  - 子组件 updated
  - 子组件 updated
- 卸载
  - 父组件 beforeDestroy
  - 子组件 beforeDestroy
  - 子组件 destroyed
  - 父组件 destroyed

#### created和mounted的区别

- created —— 在模板渲染成 HTML 标签前调用，即初始化某些属性值
- mounted —— 在模板渲染成 HTML 标签后调用

#### 一般在哪个生命周期请求异步数据

- created
- beforeMount
- mounted

==在这三个阶段时，data 已经创建，可以将服务器端返回的数据进行赋值，在 created 阶段请求异步数据为最佳==

#### keep-alive 中的生命周期哪些

- activated 
- deactivated

keep-alive 用于对组件进行缓存，防止重复渲染DOM。

- ==当组件被替换时不会真正被销毁，而是被缓存到内存中并触发 deactivated 生命周期==
- 当组件被切换回来时，从缓存中取出组件，并触发 activated 生命周期

# **三、组件通信**

1. 组件通信的方式

# 四、路由

1. Vue-Router 的懒加载如何实现
2. 路由的hash和history模式的区别
3. 如何获取页面的hash变化
4. route和route 和route和router 的区别
5. 如何定义动态路由？如何获取传过来的动态参数？
6. Vue-router 路由钩子在生命周期的体现
7. Vue-router跳转和location.href有什么区别
8. params和query的区别
9. Vue-router 导航守卫有哪些
10. 对前端路由的理解

# **五、Vuex**

1. Vuex 的原理
2. Vuex中action和mutation的区别
3. Vuex 和 localStorage 的区别
4. Redux 和 Vuex 有什么区别，它们的共同思想
5. 为什么要用 Vuex 或者 Redux
6. Vuex有哪几种属性？
7. Vuex和单纯的全局对象有什么区别？
8. 为什么 Vuex 的 mutation 中不能做异步操作？
9. Vuex的严格模式是什么,有什么作用，如何开启？
10. 如何在组件中批量使用Vuex的getter属性
11. 如何在组件中重复使用Vuex的mutation

# **六、Vue 3.0**

1. Vue3.0有什么更新
2. defineProperty和proxy的区别
3. Vue3.0 为什么要用 proxy？
4. Vue 3.0 中的 Vue Composition API？
5. Composition API与React Hook很像，区别是什么

# **七、虚拟DOM**

1. 对虚拟DOM的理解？
2. 虚拟DOM的解析过程
3. 为什么要用虚拟DOM
4. 虚拟DOM真的比真实DOM性能好吗
5. DIFF算法的原理
6. Vue中key的作用
7. 为什么不建议用index作为key?