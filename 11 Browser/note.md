# 12.18

## 浏览器进程与线程

- 浏览器主要进程 —— 「更多工具」 ➡️ 「任务管理器」

  1. GPU 进程 —— 图形渲染

  2. 其他插件进程

  3. Browser 进程 —— 主要功能是负责浏览器界面显示 & 各个页面的管理

  4. 浏览器渲染进程，即浏览器内核 —— 页面渲染、脚本执行、事件处理、网络请求等功能

- 浏览器渲染进程

  1. GUI 渲染线程 —— 解析 HTML 文件

     - CSSOM 树的生成不会阻塞 DOM 树的生成

     - 在根据 DOM 树 和 CSSOM 树生成 render 树的过程中，如果有一方没有解析完毕就会等待其解析完毕，此时双方会互相阻塞

  2. JS 引擎线程 —— 执行 JS 代码

  3. 事件触发线程

  4. 定时器线程 —— 为什么定时器不在 JS 引擎线程中执行呢？

     - 因为 JS 引擎线程是单线程的，因此定时器的执行会阻塞 JS 引擎线程的执行，因此定时器的执行会在 JS 引擎线程之外的线程中执行。

     - 每一个页面只有一个定时器线程

  5. 异步 http 请求线程

## HTML 解析

- 词法分析 —— 将一大段字符串分解成一个个有意义的词法单元，再根据这个最小意义单元的相应数据生成一个 token

  - 标记化算法

  - 最小有意义单元 —— 开始标签的开始 `<p` & 结束 `/>`、结束标签 `</p>`结束、属性、文本、注释 `<!--` & `-->`

  - token 的数据结构

- 语法分析 —— 根据词法分析生成的 htmlToken 转化为树状结构

  - 生成过程使用栈

  - 如果

## CSS 解析

- 从右往左进行匹配

- 会被解析为「选择器」+ 「属性」+ 「值」三个部分

### 面试题？

1. Vue 的 template 模版怎么编译成 render 函数 / react 的 render 函数怎么进行编译的

从左往右进行匹配，根据所定义的词法规则生成对应的 htmlToken，在语法分析阶段，根据这些 htmlToken 生成 render 树。

## JS 线程与 GUI 线程互斥的原因？

## PWA

- 优点

- 技术

  1. [Web APP Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest#members)

  2. Service Worker

     - 对资源进行缓存 —— [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) & fetch 事件

     - 生命周期 —— 安装阶段、激活阶段、等待阶段

     - [使用场景](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API#other_use_case_ideas)

     - [使用指南](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)

       ![basic architecture](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers/sw-lifecycle.svg)

     - 安装阶段报错并不会中断后续的安装过程 —— 使用 event.waitUtils 方法进行改进

       ```js
       // service-worker.js
       self.addEventListener('install', (event) => {
         event.waitUntil(
           new Promise((reslove, reject) => {
             // 报错将会中断 Serviec Worker 的后续生命周期
             reject('error')
           })
         )
       })
       ```

      - 整个浏览器只有一个 Service Worker 

  3. Push Notification

  4. Background Sync
