#### *Vue* 的生命周期？

开始创建 ➡ 初始化数据 ➡ 模板编译 ➡ 挂载 DOM ➡ 渲染 ➡ 更新、渲染 ➡ 卸载

#### vue 生命周期的作用是什么？

每个生命周期都有一个对应的钩子事件，有利于我们操作 Vue 生命周期时更具有逻辑性

#### vue 生命周期总共有几个阶段？

- beforeCreate
- created
- beforMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

#### 第一次页面加载会触发哪几个钩子？

- beforeCreate

- created
- beforMount
- mounted

#### vue 获取数据在哪个周期函数？

- created
- beforMount
- mounted

#### mvvm 框架是什么？

==Model + View + View-Model==

- Model 和  View-Model 之间有着双向数据绑定的关系
- Model 中数据的改变会触发 View 层的刷新
- View 层由于用户交互操作产生的数据变化也会在 Model 中同步

#### Vue中双向数据绑定是如何实现的？

核心：使用 *Object.prototype.defineProperty( )*

- 数据劫持 *getter/setter*
- 发布订阅模式

#### ==vue是如何实现响应式数据的呢？（响应式数据原理）❗==

- 使用`Object.prototype.defineProperty()`劫持每个属性的 `getter/setter`

```js
const obj = {};

Object.keys(obj).forEach(key => {
    let value = obj[key];
    
    Object.defineProperty(obj,key,{
        get(){
        	return value;    
        }
        set(newValue){
        	value = newValue;
    	}
    })
})
```

- 发布订阅模式 —— 当 key 对应的数据改变，Vue需要知道通知哪些数据也要发生改变

  - 订阅者 Watcher

    ```js
    class Watcher{
        constructor(name){
            this.name = name;
        }
        update(value){
            this.name = value;
        }
    }
    ```

  - 发布者 Dep

    ```js
    class Dep{
        constructor(){
            this.sub = [];
        }
        add(watcher){
            this.sub.push(watcher);
        }
        notify(value){
            this.sub.forEach(watcher => {
                watcher.update(value);
            })
        }
    }
    ```
  
    

#### vue组件中的data为什么是函数？

Vue 为了实现组件的复用，希望每个组件拥有自己的私有数据空间，避免组件间互相影响

- 在 *JavaScript* 中，对象属于引用类型，多个组件实例引用同一个对象，某个实例的操作会影响到其他实例
- 通过返回一个函数来提供 data，每次复用组件时都会返回一份新的 *data*



#### 分别简述 computed 和 watch 的使用场景?

- computed —— 当一个属性被多个属性所影响
  - 购物车
- watch —— 当一条数据影响多条数据的时候就需要用 watch

#### created和mounted的区别?

- created —— 在模板编译渲染为 HTML 前调用，通常用于初始化某些属性
- mounted —— 在模板编译渲染为 HTML 后调用，通常用于对 DOM 进行操作

#### vue-router的两种模式？

- hash
- history

#### params和query的区别?

#### 组件之间传值？

- 父组件：props
- 子组件：`$emit()`方法

### $nextTick的使用?

#### < keep-alive></ keep-alive>的作用是什么?

保留组件状态，主要用于避免组建的重复渲染

- activate —— 当组件被切换回来，触发 activated 钩子函数，将组件从缓存中调出
- deactivated —— 当组件被切换掉，触发 deactivated 钩子函数，将组件缓存在内存中

### 为什么使用key?

### v-show 和 v-if指令的共同点和不同点？

- 手段：
  - v-if 是通过向 DOM 树增添或删减元素
  - v-show 是通过设置 DOM 元素的 display 属性
- 切换过程
  - v-if 切换时会有局部编译或卸载的过程，切换过程中伴随着监听器和子组件的局部编译或卸载
  - v-shwo 切换时只是简单地进行 CSS 属性的切换
- 编译条件
  - v-if 只有在条件第一次为真值时才会进行编译渲染
  - v-show 无论条件都会进行编译，然后将节点混缓存在内存中
- 性能：
  - v-if 的切换消耗较大
  - v-show的初始渲染消耗较大
- 使用场景：
  - v-if 适用于运行状态基本不变的场景
  - v-show 适用于频繁切换的场景

### 如何让CSS只在当前组件中起作用？

*scoped*

### **如何获取dom?**

#### 说出几种vue当中的指令和它的用法？

#### v-model的使用？

v-model 用于表单的双向数据绑定，本质上是语法糖

```html
<input v-bind:value v-on:input="value = $event.tar">
```

