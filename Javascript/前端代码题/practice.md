✅ 实现 instanceof 运算符

✅ 实现继承

✅ 实现 new 关键字

✅ 实现 Object.create

✅ 实现 Object.assign

✅ 使用 Promise 封装 Ajax

✅ 实现 Function.prototype.call 方法

✅ 实现 Function.prototype.apply 方法

✅ 实现 Function.prototype.bind 方法

✅ 打平数组

防抖（debounce）

节流（throttle）

✅ 实现数组原型方法

EventBus 事件总线 —— 发布订阅模式

✅ 使用 setTimeout 实现 setInterval

深浅拷贝

函数柯里化

✅ 实现 Promise 静态方法

解析 URL 参数

数据双向绑定

JSONP

# 2024-11-30

## 实现继承

### 原型链继承

    ```js
    function Parent(){}

    function Child(){}

    Child.prototype = new Parent()
    Child.prototype.constructor = Child
    ```

### 构造函数继承

    ```js
    function Parent(){}

    function Child(){
        Parent.call(this)
    }
    ```

### 组合继承

    ```js
    function Parent(){}

    function Child(){
        Parent.call(this)
    }

    Child.prototype = new Parent()
    Child.prototype.constructor = Child
    ```

### 寄生组合继承

    ```js
    function Parent(){}

    function Child(name){
        Parent.call(this)
    }

    function tempFunction = (){}
    tempFunction.prototype = Parent.prototype
    Child.prototype = new tempFunction()
    // or
    Child.prototype = Object.create(Parent.prototype)

    Child.prototype.constructor = Child
    ```

### ES6 继承

    ```js
    class Parent {}

    class Child extends Parent {
        constructor(){
            super()
        }
    }
    ```

## 实现 new 关键字

```js
function myNew() {
  const constructor = Array.prototype.shift.call(arguments)

  const object = Object.create(constructor.prototype)
  // or
  const object = new Object()
  object.__proto__ = constrctor.prototype

  const result = constructor.apply(object, arguments)

  return typeof result === 'object' && result !== null ? result : object
}
```

## 实现 Object.create

```js
function myCreate(obj) {
  const tempFunc = function () {}
  tempFunc.prototype = obj

  return new tempFunc()
}
```

## 实现 Object.assign

```js
function myAssign(target, ...source) {
  if (target === null) {
    throw Error('...')
  }

  const result = Object(target)

  source.forEach((obj) => {
    if (obj !== null) {
      for (key in obj) {
        if (target.hasOwnProperty(key)) {
          result[key] = obj[key]
        }
      }
    }
  })

  return result
}
```

# 2024-12-01

## 实现 Function.prototype.bind 方法

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function (otherThis) {
    if (typeof this !== 'function') {
      throw Error('...')
    }

    const args = Array.prototype.slice(arguments, 1)

    const fToBind = this
    const fNop = function () {}
    const fBound = function () {
      const newArgs = Array.prototype.concat.apply(arguments, args)

      return fToBind.apply(this instanceof fNop ? this : otherThis, newArgs)
    }

    if (this.prototype) {
      fNop.prototype = this.prototype
    }
    fBound.prototype = new fNop()

    return fBound
  }
}
```

## 实现 Function.prototype.call 方法

```js
if (!Function.prototype.call) {
  Function.prototype.call = function (context, ...args) {
    if (typeof this !== 'function') {
      throw Error('...')
    }

    context = context || window

    const key = Symbol()
    context[key] = this
    const res = context[key](...args)

    delete context[key]

    return res
  }
}
```

## 实现 Function.prototype.apply 方法

```js
if (!Function.prototype.apply) {
  Function.prototype.apply = function (context, args) {
    if (typeof this !== 'function') {
      throw Error('...')
    }

    if (!Array.isArray(args)) {
      throw Error('...')
    }

    context = context || window

    const key = Symbol()
    context[key] = this
    const res = context[key](...args)

    delete context[key]

    return res
  }
}
```

# 2024-12-02

## 打平数组

```js
function flatDepth(arr, depth = 1) {
  if (depth >= 1) {
    return arr.reduce((res, item) => {
      if (Array.isArray(item)) {
        return res.concat(flatDepth(item, depth - 1))
      } else {
        return res.concat(item)
      }
    })
  } else {
    return arr.slice()
  }
}
```

# 2024-12-03

## 实现数组原型方法

### Array.prototype.forEach()

```js
Array.prototype.forEach = function (callbackFn, thisArg) {
  if (typeof callbackFn !== 'function') {
    throw TypeError('callbackFn is not a function')
  }

  for (let i = 0; i < this.length; i++) {
    callbackFn.call(thisArg, this[i], i, this)
  }
}
```

### Array.prototype.map()

```js
Array.prototype.map = function (callbackFn, thisArg) {
  if (typeof callbackFn !== 'function') {
    throw TypeError('callbackFn is not a function')
  }

  const result = []
  for (let i = 0; i < this.length; i++) {
    result.push(callbackFn.call(thisArg, this[i], i, this))
  }

  return result
}
```

### Array.prototype.filter()

```js
Array.prototype.filter = function (callbackFn, thisArg) {
  if (typeof callbackFn !== 'function') {
    throw TypeError('callbackFn is not a function')
  }

  const result = []

  for (let i = 0; i < this.length; i++) {
    if (callbackFn.call(thisArg, this[i], i, this)) {
      result.push(this[i])
    }
  }

  return result
}
```

### Array.prototype.some()

```js
Array.prototype.some = function (callbackFn, thisArg) {
  if (typeof callbackFn !== 'function') {
    throw TypeError('callbackFn is not a function')
  }

  for (let i = 0; i < this.length; i++) {
    if (callbackFn.call(thisArg, this[i], i, this)) {
      return true
    }
  }

  return false
}
```

### Array.prototype.every()

```js
Array.prototype.every = function (callbackFn, thisArg) {
  if (typeof callbackFn !== 'function') {
    throw TypeError('callbackFn is not a function')
  }

  for (let i = 0; i < this.length; i++) {
    if (!callbackFn.call(thisArg, this[i], i, this)) {
      return false
    }
  }

  return true
}
```

### Array.prototype.reduce()

- MDN —— 如果数组为空且未提供 initialValue，则会抛出异常

- 需要利用类数组对象 arguments 来判断是否传入了第二个参数 initialValue，因为 initialValue = null 或 undefined 时函数也能正常运行

```js
Array.prototype.reduce = function (callbackFn, initialValue) {
  if (typeof callbackFn !== 'function') {
    throw TypeError('callbackFn is not a function')
  }

  const isInitialValue = [...arguments].length === 2

  if (this.length === 0 && !isInitialValue) {
    throw TypeError('Reduce of empty array with no initial value')
  }

  let res = isInitialValue ? initialValue : this[1]

  for (let i = isInitialValue ? 1 : 0; i < this.length; i++) {
    res = callbackFn(res, this[i], i, this)
  }

  return res
}
```

## 实现 Promise 静态方法

### Pomise.all()

- 接收的参数为一个可迭代对象 —— 利用扩展操作符和 try/catch 语句来进行对参数的校验

  ```js
  Promise.all = function (iterable) {
    let promiseArray
    try {
      promiseArray = [...iterable]
    } catch (error) {
      throw TypeError(error)
    }

    let [count, res] = [0, []]
    return new Promise((resolve, reject) => {
      promiseArray.forEach((item, index) => {
        Promise.resolve(p).then(
          (val) => {
            count++
            res[index] = val
            if (count === promiseArray.length) {
              resolve(res)
            }
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }
  ```

### Promise.race()

- 接收的参数为一个可迭代对象 —— 利用扩展操作符和 try/catch 语句来进行对参数的校验

  ```js
  Promise.race = function () {
    let promiseArray
    try {
      promiseArray = [...iterable]
    } catch (error) {
      throw TypeError(error)
    }

    return new Promise((resolve, reject) => {
      promiseArray.forEach((item) => {
        Promise.resolve(item).then(
          (val) => {
            resolve(val)
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }
  ```

### Promise.allSettled()

- 接收的参数为一个可迭代对象 —— 利用扩展操作符和 try/catch 语句来进行对参数的校验

- 可以将计数已经判定统一放到 Promise.prototype.finally 方法中

  ```js
  Promise.all = function (iterable) {
    let promiseArray
    try {
      promiseArray = [...iterable]
    } catch (error) {
      throw TypeError(error)
    }

    let [count, res] = [0, []]
    return new Promise((resolve, reject) => {
      promiseArray.forEach((item, index) => {
        Promise.resolve(p)
          .then(
            (value) => {
              res[index] = {
                status: 'fulfilled',
                value,
              }
            },
            (reason) => {
              res[index] = {
                status: 'rejected',
                reason,
              }
            }
          )
          .finally(() => {
            count++
            if (count === promiseArray.length) {
              resolve(res)
            }
          })
      })
    })
  }
  ```

### Promise.any()

- 接收的参数为一个可迭代对象 —— 利用扩展操作符和 try/catch 语句来进行对参数的校验

- 当给定的 iterable 中的所有 Promise 都被拒绝时。拒绝原因是一个 AggregateError，其 errors 属性包含一个拒绝原因数组。

  ```js
  Promise.any = function (iterable) {
    let promiseArray
    try {
      promiseArray = [...iterable]
    } catch (error) {
      throw TypeError(error)
    }

    let [count, errors] = [0, []]
    return new Promise((resolve, reject) => {
      if (promise.length === 0) {
        throw new AggregateError([], 'All promises were rejected')
      }

      promiseArray.forEach((item, index) => {
        Promise.resolve(item).then(
          (value) => {
            resolve(value)
          },
          (error) => {
            count++
            errors[index] = error
            if (count === promiseArray.length) {
              throw new AggregateError(errors, 'All promises were rejected')
            }
          }
        )
      })
    })
  }
  ```

# 2024-12-04

## 使用 Promise 封装 AJAX

- AJAX —— Asynchronous JavaScript and XML，即异步的 Javascript 和 XML

- 基于 [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 实现

  - XMLHttpRequest.open() —— 初始化一个请求

  - XMLHttpRequest.send() —— 发送请求

  - onreadystatechange 事件监听 —— 当 readyState 属性发生变化时，调用的事件处理器

  - readyStatus —— XMLHttpRequest 代理当前所处的状态，值为 4 表示请求操作已经完成

    ```js
    type AjaxType = 'GET' | 'POST' | 'PUT' | 'DELETE'

    interface MyOptions {
      url: string
      type?: AjaxType
      data: any
      timeout?: number
    }

    function formatUrl(json) {
      let [dataArray, newJson] = [[], { ...json }]
      for (const key in neJson) {
        dataArray.push(`${key}=${encodeURIComponent(json[key])}`)
      }

      return dataArray.join('&')
    }

    function ajax(
      options: MyOptions = {
        type: 'GET',
        timeout: 3000,
        url: '',
        data: {},
      }
    ) {
      return new Promise((resolve, reject) => {
        if (!options.url) return

        let dataToUrlStr = formatUrl(options.data)
        let xhr, timer

        if ((window as any).XMLHttpRequest) {
          xhr = new XMLHttpRequest()
        } else {
          xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }

        if (options.type.toUpperCase() === 'GET') {
          xhr.open('get', `${options.url}?${dataToUrlStr}`)
          xhr.send()
        } else if (options.type.toUpperCase() === 'POST') {
          xhr.open('post', options.url)
          xhr.setRequestHeader(
            'ContentType',
            'application/x-www-form-urlencoded'
          )
          xhr.send(options.data)
        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            clearTimeout(timer)

            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
              resolve(xhr.responseText)
            } else {
              reject(xhr.status)
            }
          }
        }

        if (options.timeout) {
          timer = setTimeout(() => {
            xhr.abort()
            reject('超时')
          }, options.timeout)
        }
      })
    }
    ```

## 实现 instanceof 运算符

目的：用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

- 判断左侧参数是否为一个对象 —— 如果不是则直接返回 false

- 获取左侧对象的原型对象 —— 使用 Object.getPrototypeOf

- 获取左侧构造函数的原型 —— 访问其 prototype 属性

- 不断比较二者

  - 使用 while 循环

  - 若两侧不相等，获取并赋值为左侧对象的原型对象的原型对象并继续比较 —— leftPrototype = Object.getPrototypeOf(leftPrototype)

  - 如果获取到的原型对象 leftPrototype 为 null 则返回 false

```js
function MyInstanceOf(left, right) {
  if (typeof left !== 'object' || left === null) {
    return false
  }

  let leftPrototype = Object.getPrototypeOf(left)
  let rightPrototype = right.prototype

  while (true) {
    if (!leftPrototype) return false

    if (leftPrototype === rightPrototype) return true

    leftPrototype = Object.getPrototypeOf(leftPrototype)
  }
}
```

### 使用 setTimeout 实现 setInterval

- setInterval —— 重复调用一个函数或执行一个代码片段，在每次调用之间具有固定的时间间隔

  - 第一个参数 func —— 需要重复执行的函数/代码片段

  - 第二个参数 delay —— 重复执行的时间间隔

  - 第三个参数 ...args —— 需要传入 func 的参数，使用扩展操作符收集

- 简单的实现思路 —— 在一个函数 recur 中使用 setTimeout，同时调用 func 和 recur

- 能否提供一个取消定时的功能？ —— 通过闭包将 clearTimeout(timer) 暴露给外界访问

  ```js
  function mySetInterval(func, delay, ...args) {
    let timer

    const recur = () => {
      timer = setTimeout(() => {
        func.apply(this, args)
        recur()
      }, delay)

    }
      recur()

      return () =>{
        clearTimeout(timeout)
      }
  }

  const cancelTimeout = mySetInterval()

  cancelTimeout()
  ```
