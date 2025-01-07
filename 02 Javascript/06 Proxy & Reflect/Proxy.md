# 代理基础

代理是目标对象的抽象，即可以作为目标对象的替身，又可以完全独立于目标对象

## 创建空代理

- 构造函数 Proxy，接受两个参数

    ```js
    const target = {
      id: 'target',
    }
    const handler = {}
    const proxy = new Proxy(target, handler)
    ```

  - 目标对象 target: any —— 表示所要拦截的目标对象

  - 处理程序对象 handler: ProxyHandler <any\> —— 定制拦截行为的对象

  - 缺少任意一个参数都会抛出 TypeError

- 在代理对象上执行任何操作都会应用到目标对象

  ```js
  proxy.id = 'proxy'
  console.log(target.id) // "proxy"
  ```

- Proxy.prototype 为 undefined —— 不能使用 instanceof 操作符

  ```js
  proxy instanceof Proxy
  target instanceof Proxy
  // Function has non-object prototype 'undefined' in instanceof check
  ```

- 严格相等可以用于区分代理和目标

  ```js
  target === proxy //false
  ```

## 捕获器

- 概念 —— 在处理程序对象 handler 中定义的基本操作的拦截器

  ```js
  const target = {
    id: 'target',
  }
  const handler = {
    get() {
      return 'handler override'
    },
  }
  const proxy = new Proxy(target, handler)

  console.log(proxy.id) // handler override
  ```

- ⭐ 反射 API —— Reflect 包含了所有 handler 中可以捕获的方法

  ```js
  const target = {
    id: 'target',
  }
  const handler = {
    get() {
      return Reflect.get(...arguments)
    },
  }
  const proxy = new Proxy(target, handler)

  console.log(proxy.id) // target
  ```

- 捕获器不变式

## 可撤销代理

- Proxy.revocable(target, handler) —— 撤销函数和代理对象在实例化时同时生成

  ```js
  const target = {
    id: 'target',
  }
  const handler = {
    get() {
      return 'proxy'
    },
  }
  const { proxy, revoke } = Proxy.revocable(target, handler)
  console.log(target.id) // target
  console.log(proxy.id) // proxy
  ```

- 撤销函数是幂等的，撤销代理之后再次调用代理对象则会抛出 TypeError

  ```js
  const { proxy, revoke } = Proxy.revocable(target, handler)
  revoke()

  console.log(proxy.id)
  //Cannot perform 'get' on a proxy that has been revoked
  ```

- 撤销代理的操作不可逆

## 代理的局限性

- 代理中的 this

- 代理与内部槽位

## 反射对象 Reflect

⭐ 设计目的

- 对 Object 部分原有方法的返回结果进行修正

  - 参数类型不符合要求则抛出 TypeError

  - 在无法定义属性时，Reflect.defineProperty 会返回 false 而非抛出错误

- 让 Object 操作成为函数行为，例如

  - property in obj → Reflect.has(obj, property)

  - delete obj[property] → Reflect.deleteProperty(obj, property)
  
- 便于 Proxy 对象在修改默认行为后仍然能够在 Reflect 上取得具有原有功能的默认行为
