# NestJS

## 概述

- 基于 Express 的 Node.js 框架，也可配置为 Fastify

- 安装

  ```bash
  npm install -g @nestjs/cli
  ```

- 创建项目

  ```bash
  nest new project-name
  ```

### 控制器 Controller

- 目的 —— 控制器负责处理传入请求并向客户端返回响应

- 路由 —— 路由机制控制哪个控制器接收哪些请求

  - 装饰器 `@Controller()` —— 指定路径前缀

  - 配置 hosts 选项

- HTTP 请求方法装饰器

  - `@Get()` —— 处理 GET 请求

  - `@Post()` —— 处理 POST 请求

  - `@All()` —— 处理所有请求

- 请求对象装饰器

  - `@Query()` —— 获取查询参数

  - `@Body()` —— 获取请求体

  - `@Param()` —— 获取请求参数

  - `@Headers()` —— 获取请求头

- 状态码装饰器 `@HttpCode()` —— 设置响应状态码

- 每个异步函数必须返回 Promise

- 注册控制器 —— `app.module.ts`

  ```js
  import { Module } from '@nestjs/common'
  import { CatsController } from './cats/cats.controller'

  @Module({
    controllers: [CatsController],
  })
  export class AppModule {}
  ```

### 提供器 Provider

- 目的 —— 依赖注入，在对象之间创建关系

- `@Injectable()` 装饰器

- 提供器 `XService` 在控制器文件中通过类构造函数注入

  ```js
  import { TopicService } from './topic.service'

  export class TopicController {
  constructor(private topicService: TopicService) {}
  }
  ```

### 模块

- 本质 —— 用 `@Module()` 装饰器注释的类

  ![module](https://nest.nodejs.cn/assets/Modules_1.png)

- `@Module()` 装饰器接收一个对象，包含以下属性

  1. `providers` —— 提供器，用于创建对象

  2. `controllers` —— 控制器，用于处理请求

  3. `imports` —— 导入模块

  4. `exports` —— 导出模块

- 功能模块 —— 配置 controllers 数组 & providers 数组

- 共享模块 —— 配置 exports 数组

- 全局模块 —— 配置 `@Global()` 装饰器

- 动态模块 —— 使用 `forRoot()` 方法，会扩展`@Module()` 装饰器定义的元数据

### 中间件

- 功能 —— 中间件是在路由处理程序之前调用的函数。

  ![middleware](https://nest.nodejs.cn/assets/Middlewares_1.png)

- 基本使用

  - @Injectable() 装饰器

  - NestMiddleware 接口

    ```js
    import { Logger, Injectable, NestMiddleware } from '@nestjs/common'
    import { Request, Response } from 'express'

    @Injectable()
    export class LoggerMiddleware implements NestMiddleware {
      use(req: Request, res: Response, next: Function) {
        next()
      }
    }
    ```

- 函数式中间件

  ```js
  import { Request, Response, NextFunction } from 'express'

  export function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...`)
    next()
  }
  ```

- 使用中间件

  - 使用模块类的 configure() 方法设置

  - apply() 方法

  - forRoutes() 方法

- 使用多个中间件 —— 传入逗号分隔的列表

  ```js
  consumer.apply(cors(), helmet(), logger).forRoutes(CatsController)
  ```

### 异常过滤器

### 管道

### 守卫

### 拦截器

###
