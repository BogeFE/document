# Node.js 事件循环机制

## 流程

# Node.js 基础

## 谈谈 Node.js

- 什么是 Node.js —— 一个服务器端的、非阻塞式 I/O 的、事件驱动的 JavaScript 运行环境

- 非阻塞式 I/O ——

- 事件驱动 —— 事件队列

## fs 模块

- 异步操作 & 同步（sync）操作

- 文件读取

  - fs.readFileSync —— 可传入编码方式，返回值默认为 Buffer 类型

  - fs.readFile —— 第三个参数为回调函数，无返回值

- 文件写入 —— fs.writeFileSync & fs.wirteFile

- 追加写入 —— fs.appendFileSync & fs.appendFile

- 文件拷贝 —— fs.copyFileSync & fs.copyFile

- 创建目录 —— fs.mkdirSync & fs.mkdir

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

## Node.js 性能

- 性能指标

  - CPU —— 负载 & 使用率

  - 内存 —— 使用内存缓存数据，减少磁盘的使用，如 redis

  - I/O

  - 网络

- 优化方式

  - 版本更新 —— V8 版本 & 代码更新

  - 流 Stream —— 例如大文件以流形式发送，不需要完全读入内存

  - 代码优化 —— 减少数据库查询次数

  - 内存管理

# 场景分析

## 文件上传

- POST 方法

- 请求头

  ```
  content-type: mutipart/form-data
  ```

- 文件解析 —— 中间件 koa-body & koa-multer

## 实现 JWT 鉴权机制

- JWT —— JSON Web Token

  - 头部 Header

  - 载荷 Payload

  - 签名 Signature

- 实现

  - 生成 Token —— 第三方库

  - 验证 Token —— koa-jwt 中间件

## 分页查询功能设计

- 请求字段列表

  - 目标页码 page

  - 每页数据量 pageSize

- 响应字段列表

  - 总页数 totalPages

  - 当前页数 currentPage

  - 总数据量 totalCount

  - 当前数据 data

- SQL 语句

  ```
  SELECT * FROM record limit ${pageSize} OFFSET ${start}
  ```
