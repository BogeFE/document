# 学习仓库

## 学习重点

- [手写实现 Promises/A+ 规范](https://github.com/BogeFE/Document/tree/main/02%20Javascript/Promise/%E5%AE%9E%E7%8E%B0Promise)

- [Node.js 事件循环模型]()

- [从输入 URL 到页面的最终呈现都发生了什么？](./08%20Web%20Performance/Populating%20the%20page.md)

- [Hash 模式路由的简单实现](./03%20Vue/02%20Vue%20Router/hash-router/README.md)

- [History 模式路由的简单实现](./03%20Vue/02%20Vue%20Router/history-router/README.md)

- [手写实现题](./02%20Javascript/前端代码题/practice.md)

- [Vue Reactivity](./03%20Vue/05%20Source%20Code/reactivity/Vue%20响应式原理.md)

## 学习网站

- [ES6 标准入门](https://es6.ruanyifeng.com/)

## 面试题

### HTML & CSS

- [常见布局的实现]()

- [flex 布局](./01%20HTML&CSS/Layout/flex/flex.md)

- [场景应用]()

### JavaScript

- 常见 DOM 操作

  - 增 —— document.createElement ｜ document.createTextNode ｜ appendChild ｜ insertBefore

  - 删 —— removeChild

  - 改 —— innerHTML ｜ style ｜ innerText

  - 查 —— document.querySelector ｜ document.querySelectorAll

- BOM 对象

  - Window —— moveBy ｜ moveTo | resizeBy | resizeTo | scrollTo | scrollBy

  - Location —— hash ｜ pathname ｜ host ｜ hostname

  - Navigator

  - Screen

  - History —— go ｜ forward ｜ back

- typeof 和 instanceof 的区别

  - 返回值 —— typeof 返回字符串 ｜ instanceof 返回布尔值

  - 判断范围

- 原型 & 原型链

  - ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9afcd1172d340508d25c095b1103fac~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

  - 当一个对象试图访问一个属性或方法时，如果在该对象自身没有找到，JavaScript 会沿着原型链向上查找，直到找到对应的属性或方法，或者达到原型链的顶端 null 为止。

  - 原型链的终点 —— `Object.prototype.__proto__ → null`

  - 作用 —— 存放实例中的公共属性、方法，可以大大减少内存消耗。

- 作用域链

  - 作用域 —— 变量和函数生效的区域

  - 分类 —— 全局作用域 ｜ 函数作用域 ｜ 块级作用域

  - 作用域链 —— 在代码执行过程中，查找变量和函数的机制。作用域链确保了在当前作用域中找不到某个变量时，能够沿着作用域链向上查找，直到找到该变量或到达全局作用域

- [this 指向](./02%20JavaScript/04%20Function/this.md)

- apply、call、bind 的区别

  - 三者都改变函数的 this 指向

  - 三者的第一个参数都是 this 要指向的对象 —— 如果为 null、undefined、空则指向 window

  - 传参 —— apply 传数组，call 传参数列表

  - bind 返回一个函数 ｜ apply & call 立即执行

- 闭包

  - 是什么 —— 在一个内层函数访问到其外层函数的作用域

  - 使用 —— 函数柯里化 & 延长变量生命周期 & 创建私有变量

- 缓存

  - cookie —— 4KB ｜ Expires ｜ Max-Age —— 标记用户 & 跟踪用户行为

  - sessionStorage —— 页面关闭就删除 —— 一次性登陆

  - localStorage —— 5MB ｜ 永不过期 ｜ setItem、getItem、key、removeItem、clear —— 长期保存在本地的数据(令牌)

  - indexedDB

- AJAX —— XMLHttpRequest

- 元素是否在可视区域

    - 本质 —— 元素相对于上边框的偏移量是否小于视窗高度 + 滚动距离

    - 偏移量 el.offsetTop

    - 视窗高度 —— window.innerHeight / document.documentElement.clientHeight / document.body.clientHeight

    - 滚动距离 scrollTop

- 上拉加载 & 下拉刷新

  - 第三方库 —— iscroll ｜ better-scroll ｜ pulltorefresh.js

  - 上拉加载 —— 本质是当前页面触底

    - 滚动视窗的高度距离顶部的距离 document.documentElement.scrollTop

    - 屏幕可视区域高度 document.documentElement.clientHeight

    - 所有元素总长度 document.body.scrollHeight

    - 公式 `scrollTop + clientHeight >= scrollHeight`

  - 下拉刷新 —— 页面本身置于顶部时，用户下拉时需要触发的动作

    - 原生事件 touchStart —— 记录初始位置

    - 原生事件 touchmove —— 记录位置差值

    - 原生事件 touchend —— 页面下拉到最大值时出发事件回调

- 正则表达式

  - 字符串方法 —— match ｜ matchAll ｜ search ｜ replace

  - 正则对象方法 —— exec ｜ test ｜ match ｜ matchAll

- 编程范式

  - 命令式编程

  - 声明式编程

  - 函数式编程

- [前端安全](./14%20Security/index.md)

- 内存泄漏

  - 说明 —— 由于疏忽或错误导致未能释放已经不再使用的内存并非物理上消失，而是失去对其的控制，导致内存浪费

  - 垃圾回收机制 —— 标记清除 & 引用计数

- 数字精度丢失问题

  - 存储机制 —— 双精度浮点数 ｜ 十进制 → 二进制 ｜

  - 限制 —— 64 位 ｜ 转换过程出现无限循环

  - 解决方案 —— bignumber.js

- 尾递归 —— 在尾部直接调用自身的递归函数
