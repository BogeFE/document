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

### Vue

- 数据双向绑定原理

  - 采用数据劫持 + 发布订阅模式，实现数据层 Model 和视图 View 之间的响应式更新

  - 初始化响应式数据 —— Object.defineProperty 劫持 data，对每个属性设置 getter 和 setter，在 setter 触发时通知视图更新

  - 依赖收集 —— 问数据时（getter），将当前组件的 Watcher 订阅到 Dep（依赖收集器）中 ｜ 当数据变化时（setter），调用 Dep.notice 通知 Watcher.update 执行，触发视图更新。

  - Watcher 触发虚拟 DOM 重新渲染，更新视图。

- Vue 2 & Vue 3

### 性能优化

- 首屏加载 FCP

-

### 排序算法

- 快速排序

  ```js
  function quickSort(arr) {
    return quick(arr, 0, arr.length - 1)
  }

  function quick(arr, left, right) {
    if (left < right) {
      const index = artition(arr, left, right)
      quick(arr, left, index - 1)
      quick(arr, index + 1, right)
    }
    return arr
  }

  function partition(arr, left, right) {
    const pivotIndex = left
    const pivot = arr[pivotIndex]

    let point = pivotIndex + 1

    for (let i = point; i <= right; i++) {
      if (arr[i] < pivot) {
        ;[arr[point], arr[i]] = [arr[i], arr[point]]
        point++
      }
    }

    // 为什么-1 —— point 会指向最后一个小于基准值 pivot 的后一个下标
    point -= 1
    ;[arr[point], arr[pivotIndex]] = [arr[pivotIndex], arr[point]]

    return point
  }
  ```

- 冒泡排序

  ```js
  function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        }
      }
    }
    return arr
  }
  ```

- 选择排序

  ```js
  function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i

      for (let j = i; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j
        }
      }
      ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }

    return arr
  }
  ```

### 前端缓存

- HTTP 缓存 / 浏览器缓存 —— 强缓存 & 协商缓存

## Electron

- 核心架构

  - 主进程 Main Process —— 控制整个应用的生命周期，管理窗口、菜单、文件访问等。

  - 渲染进程 Renderer Process —— 每个窗口都有一个渲染进程，用于显示 UI，类似浏览器的网页。

  - 进程间通信 IPC —— 数据交互

- 常见问题

  - 体检大

  - 性能问题 ——

### Electron 中的 Node.js

- 应用生命周期管理 —— Electron 的主进程依赖 Node.js 来管理应用的生命周期

  - 启动应用 —— app.whenReady

  - 监听窗口关闭 —— app.on('window-all-closed', app.quit)

- 窗口管理 —— 依靠 Node.js 的 BrowserWindow 创建和管理窗口

- 进程间通信 —— Node.js 负责在主进程中监听和处理事件

  - 主进程 —— ipcMain

  - 渲染进程 —— ipcRenderer

- 访问文件系统 —— 使用原生 fs 模块

- 获取系统信息 —— 使用原生 os 模块

- 发送 HTTP 请求 —— 原生 https 模块

- 系统级别 API

  - 读取环境变量 —— process.env

  - 监听键盘快捷键 —— globalShortcut

  - 发送系统通知 —— new Notification()

- 运行子进程 —— child_process
