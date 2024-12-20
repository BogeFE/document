## 原理

#### Vue的基本原理

- 当一个 Vue 实例创建时，Vue 会遍历 data 中的属性，使用 Object.defineProperty 将它们转化为 getter/setter，并在内部追踪其相关依赖，在属性被访问和修改时通知变化
- 每个组件实例都有相应的 watcher 程序实例，会在组件渲染时把属性记录为依赖，之后当依赖项的 setter 被调用，会通知 watcher 重新计算，并将它关联的组件进行更新



#### 双向数据绑定的原理

采用数据劫持 + 发布订阅模式

- Object.defineProperty —— 设置属性的 getter 和 setter，实现数据劫持

  - 添加、删除对象德的属性时检测不到 —— 未在初始化时进行响应式处理

  - 无法监听到数组内部变化，数组长度变化，数组的截取变化等

    - push()
    - pop()
    - shift()
    - unshift()
    - splice()
    - sort()
    - reverse()

  - 无法将新声明的属性转换为响应式的属性 —— **使用 $set**

    - 目标是数组 —— 使用 splice 方法出发响应
    - 目标是对象 —— 判断属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理

    ```js
    this.$set(this.obj,'b','valueB')
    ```

  - Vue 3.0 使用了 Proxy 代理，可以监听到任何方式的数据改变

    - 代理整个对象而非对象属性

- Observer 监听器 —— 用来监听属性的变化通知订阅者

  ```js
  function observer(obj){
      if(!obj || typeof obj !== 'object'){
          return;
      }
      let keys = Object.keys(obj);
      keys.forEach(key => {
          defineReactive(obj,key,obj[key]);
      })
      return obj；
  }
  
  function defineReactive(obj,key,val){
      //递归调用，监听所有属性
    	observer(val);
      
      const dep = new Dep();
      Object.defineProperty(obj,key,{
  		get(){
              if(Dep.target){
                  dep.addSub(Dep.target);
              }
              return val;
          },
          set(newVal){
              if(newVal === val){
                  return;
              }
              val = newVal;
              dep.nofify();
          }
      })
  };
  ```

- Dep 订阅器 —— 收集订阅者，对监听器和订阅者进行统一管理

  ```js
  class Dep{
      constructor(){
          this.subs = [];
      }
      static target = null;
  
      addSub(sub){
      	this.subs.push(sub);    
      }
      notify(){
          this.subs.forEach(sub => {
              sub.update();
          })
      }
  }
  ```

  

- Watcher 订阅者 —— 收到属性的变化，然后更新视图

  ```js
  class Watcher{
      constructor(vm,prop,callback){
          this.vm = vm;// Vue实例
          this.prop = prop; //节点的指令的属性
          this.callback = callback;// Watch 绑定的更新函数
          this.value = this.get();
      }
      update(){
          this.run();
      }
      run(){
          var value = this.vm.$data[this.prop];
          var oldValue = this.value;
          if(value !== oldValue){
              this.value = value;
              this.callback.call(this.vm,value,oldValue);
          }
      }
      get(){
          Dep.target = this; //将自己赋值为全局订阅者
          var value = this.vm.$data[this.prop];//这一步会触发数据的get 属性
          Dep.target = null;
          return value;
      }
  }
  ```

- Compile 解析器 —— 解析指令，初始化模版，绑定订阅者



#### ⭐$nextTick 原理及作用

本质是为了利用 JavaScript 的异步回调任务队列来实现 Vue 框架中自己的异步回调队列

- 引入异步更新队列机制的原因
  - 同步更新的话，多次对一个或多个属性赋值，会频繁出发 UI/DOM 的渲染
  - VirtualDOM 的引入，组件内部使用 VirtualDOM 进行计算得出需要更新的具体的 DOM 节点，然后对 DOM 进行更新操作

- 使用场景
  - 在数据变化后执行的某个操作，而这个操作需要使用随数据变化而变化的 DOM 结构的时候，这个操作就需要方法在 `nextTick()` 的回调函数中
  - ⭐若在 created() 钩子进行 DOM 操作，也一定要放在 `nextTick()` 的回调函数中



#### Vue 模版编译原理

- 为什么需要进行模板编译？ —— Vue 中的模板 template 无法被浏览器解析并渲染，因为这不属于浏览器的标准，不是正确的 HTML 语法
- 编译过程 —— **template -> ast -> render函数**
  - parse 解析阶段 —— 使用大量正则表达式对 template 字符串进行解析，转换成抽象语法树 AST
  - optimize 优化阶段 —— 遍历 AST，找到静态节点并标记，以便在页面重渲染时进行 diff 比较时可直接跳过，优化性能
  - generate 生成阶段 —— 将 AST 转化为 render 函数字符串



## 区别

#### MVVM、MVC、MVP的区别

- MVC —— Model + View + Controller

  ###### <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a65e1b9145894647a25788caf12ddd26~tplv-k3u1fbpfcp-watermark.awebp" alt="image.png" style="zoom: 80%;" />

- MVVM —— Model + View + ViewModel

  - 实现了 Model 和 View 数据自动同步，开发者无需自己操作 DOM
  - 优点：
    - 分离视图（View）和模型（Model），降低代码耦合，提高视图或者逻辑的重用性
    - 提高可测试性
    - 利用双向绑定，数据更新后自动更新视图
  - 缺点：
    - 数据绑定使得⼀个位置的Bug被快速传递到别的位置，要定位原始出问题的地方就变得不那么容易

  

  ###### <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5ce15b7b704483eb91ee1f5d1d64786~tplv-k3u1fbpfcp-watermark.awebp" alt="image.png" style="zoom: 80%;" /> 

- MVP —— 通过使用 Presenter 来实现对 View 层和 Model 层的解耦








#### Vue 单页应用与多页应用的区别

- 多页应用 —— 拥有多个独立页面的应用，每个页面需重复加载 js、css 等相关资源
- 单页应用 —— 只有一个主页面的应用，在一开始加载所有 js、css等相关资源
  - 优点
    - 用户体验好，避免了不必要的跳转和重复渲染
    - 前后端职责分离，架构清晰，前端负责交互逻辑，后端负责数据处理
  - 缺点：
    - 初始加载耗时较长
    - SEO 难度较大
    - 需要进行前进后退路由管理

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/76b3d747986e45e096abaf64faf5e332~tplv-k3u1fbpfcp-watermark.awebp" alt="775316ebb4c727f7c8771cc2c06e06dd.jpg" style="zoom:80%;" />



#### assets和static的区别

- 相同点 —— 存放静态资源文件
- 不同点
  - assets 中的静态文件会进行打包压缩格式化后上传，体积更小
  - static 中的静态文件直接进入打包好的目录直接上传，打包效率更高
- 使用建议
  - 将项目中 template需要的样式文件js文件等都可以放置在assets中 —— 减小体积
  - 第三方资源文件放置在static中，已经第三方处理过，可以直接上传



#### delete和Vue.delete删除数组的区别

- delete —— 被删除的元素变为了  undefined，其余数组元素的下标不变
- Vue.delete —— 直接删除元素，数组的键值因此发生改变



#### template和jsx的有什么区别？

#### mixin 和 mixins 区别

- 什么是 mixin？
  - 实现为 Vue 组件编写可插拔和可重用的功能
  - 抽离出多个组件之间的公共逻辑，例如生命周期、方法等

- mixin 的覆盖逻辑

  - 数据对象 —— 在内部递归合并，发生冲突时以**组件数据优先**
  - 钩子函数 —— 合并为数组，都会被调用；混入的钩子函数执行早于组件自身钩子函数
  - 值为对象的的选项，例如 methods、components 等 —— 合并为对象，两个对象的键名冲突时取组件对象的键值对

- mixin 和 mixins 区别

  - mixin —— 全局混入，数据来源不明确，且会影响到每一个 Vue 实例

    ```js
    Vue.mixin({
        created(){
            
        },
        mounted(){
            
        }
    })
    ```

  - mixins —— 局部混入

    ```js
    const mixinObj = {}
    new Vue({
        mixins: [mixinObj],
    }
    ```


