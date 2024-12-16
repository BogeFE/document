# 12.16

## Buffer

- Buffer 是 Node.js 提供的一个用于操作二进制数据的全局对象，它可以用于处理网络数据、文件读写等场景。

- Buffer 使用堆外内存

- Buffer 是一个字节数组，8 位无符号整数表示一个字节，最大长度为 255。

- Buffer.from

- Buffer.alloc

- Buffer.allocUnsafe —— 不预设初始值，优势是比 allco 速度快，但有内存泄漏风险

- 应用场景

  - 文件的读写 —— fs.readFileSync + Buffer.from + fs.writeFileSync

- fs.createReadStream 出现乱码 —— highWaterMark 默认为 64KB，可能会出现预期之外的截断

  - 如何解决 —— setEncoding —— 底层逻辑为先编码再截断

  - 解决方案二 —— 将小 Buffer 拼接为大 Buffer —— Buffer.concat

  - utf8 中的中文汉字占 3 个字节，单个汉字被截断时会出现乱码

## Stream

- 类型

  - Readable —— 可读流

  - Writable —— 可写流

  - Duplex —— 可读可写流

  - Transform —— 可读写转换流

- 在硬盘和客户端之间搭建一条管道 pipe

- pipe 的实现原理 —— 基于观察者模式

- 使用流相比完整读文件的优势 —— 底层使用了 Buffer，节省内存

## Events

- 常用 API

  - on

  - once

  - emit

  - off

  - addListener

  - removeListener

  - removeAllListeners

- 简单实现事件触发器 Emitter

  ```js
  class Emitter {
    constructor() {
      this.events = {}
    }
    // 绑定事件
    on(event, callback) {
      if (!this.events[event]) {
        this.events[event] = []
      }
      this.events[event].push(callback)

      return this
    }
    // 解绑事件
    off(event, callback) {
      if (this.events[event]) {
        this.events[event] = this.events[event].filter((fn) => fn !== callback)
      }
    }
    // 绑定事件并且只执行一次
    once(event, callback) {
      const fn = (...args) => {
        callback(...args)
        this.off(event, fn)
      }
      this.on(event, fn)

      return this
    }
    // 触发事件
    emit(event, ...args) {
      if (this.events[event]) {
        this.events[event].forEach((fn) => fn.call(this, ...args))
      }
    }
  }
  ```

## 全局对象 global

- 全局对象 global 是 Node.js 中的一个特殊对象，它是在 Node.js 启动时创建的，并且在整个 Node.js 应用程序中都可以访问。

## Node.js 事件循环模型

- 事件循环机制每个阶段都有一个 FIFO 队列来执行回调

- 基本框架

  - 同步代码

  - 微任务 —— process.nextTick、promise.then

  - timer：setTimeout、setInterval

  - pending callbacks

  - idle、prepare

  - poll ⬅️ incoming：connections、data、etc.

  - check ：setImmediate

  - close ➡️ timer

- 陷阱题

  ```js
  setTimeout(() => {
    console.log('setTimeout')
  }, 0)
  setImmediate(() => {
    console.log('setImmediate')
  })
  ```

  - 答案：setImmediate、setTimeout / setTimeout、setImmediate 都有可能

  - 原因：setTimeout 的回调被推入 timer 阶段的队列中有一定的延时，哪怕是 0 —— 如果当执行到 timer 阶段时 setTimeout 的回调还未被推入队列，那么事件循环就会继续往后执行

  - 何时答案会是确定的呢 —— setImmediate & setTimeout 定义在同一个回调中

    ```js
    setTimeout(() => {
      setTimeout(() => {
        console.log('setTimeout')
      }, 0)
      setImmediate(() => {
        console.log('setImmediate')
      })
    }, 0)

    // 答案：setImmediate、setTimeout 
    ```
- process.nextTick 永远会在 promise.then 之前执行  