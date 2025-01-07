# 前端代码题

✅ [实现 instanceof 运算符](#实现-instanceof-运算符)

✅ [实现继承](#实现继承)

✅ [实现 new 关键字](#实现-new-关键字)

✅ [实现 Object.create](#实现-objectcreate)

✅ [实现 Object.assign](#实现-objectassign)

✅ [使用 Promise 封装 Ajax](#使用-promise-封装-ajax)

✅ [实现 Function.prototype.call 方法](#实现-functionprototypecall-方法)

✅ [实现 Function.prototype.apply 方法](#实现-functionprototypeapply-方法)

✅ [实现 Function.prototype.bind 方法](#实现-functionprototypebind-方法)

✅ [打平数组](#打平数组)

✅ [防抖（debounce）](#防抖debounce)

✅ [节流（throttle）](#节流throttle)

✅ [实现数组原型方法](#实现数组原型方法)

✅ [使用 setTimeout 实现 setInterval](#使用-settimeout-实现-setinterval)

✅ [深拷贝](#深拷贝)

✅ [函数柯里化](#函数柯里化)

✅ [实现 Promise 静态方法](#实现-promise-静态方法)

✅ [解析 URL 参数](#解析-url-参数)

✅ [数据双向绑定](../../03%20Vue/05%20Source%20Code/reactivity/Vue%20响应式原理.md)

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

    return () => {
      clearTimeout(timeout)
    }
  }

  const cancelTimeout = mySetInterval()

  cancelTimeout()
  ```

## 防抖（debounce）

```js
function debounce(func, delay) {
  let timer = null
  return function () {
    const ctx = this
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(ctx, [...arguments])
    }, delay)
  }
}
```

## 节流（throttle）

- 节流的目的 —— 在一段时间内只执行一次函数

- 用 **时间戳** 实现 —— 停止触发后不会再执行

  ```js
  function throttle(func, timeout) {
    let last = 0

    return function () {
      const [now, ctx] = [Date.now(), this]

      if (now - last > timeout) {
        func.apply(ctx, [...arguments])
        last = now
      }
    }
  }
  ```

- 用 **定时器** 实现 —— 无法立即执行，第一次执行在 n 秒后

  ```js
  function throttle(func, timeout) {
    let timer = null

    return function () {
      const ctx = this
      if (timer) {
        timer = setTimeout(() => {
          clearTimeout(timer)
          func.apply(ctx, [...args])
        }, timeout)
      }
    }
  }
  ```

- 最终实现

  ```js
  function throttle(func, timeout) {
    let [last, timer] = [0, null]

    return function () {
      let [ctx, now] = [this, Date.now()]
      let remaining = timeout - (now - last)

      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      if (remaining <= 0) {
        last = now
        func.apply(ctx, [...arguments])
      } else {
        timer = setTimeout(() => {
          func.apply(ctx, [...arguments])
        }, remaining)
      }
    }
  }
  ```

## 深拷贝

- 普通版本

  ```js
  function deepClone(source) {
    if (!['object', 'function'].includes(typeof source)) {
      return source
    }

    const target = Array.isArray(source) ? [] : {}

    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (source[key] && typeof source[key] === 'object') {
          target[key] = deepClone(source[key])
        } else {
          target[key] = source[key]
        }
      }
    }

    return target
  }
  ```

- 进阶版本 —— 考虑源对象是否是 Date、RegExp 实例对象并使用 WeakMap 来避免循环引用的情况出现

  ```js
  function deepClone(source, has = new WeakMap()) {
    if (source === null) return null

    if (source instanceof Date) return new Date(source)

    if (source instanceof RegExp) return new RegExp(source)

    if (typeof source !== 'object') return source

    if (hash.has(source)) return hash.get(source)

    const target = Array.isArray(source) ? [] : {}

    Reflect.ownKeys(source).forEach((key) => {
      target[key] = deepClone(source[key], hash)
    })

    return target
  }
  ```

## 函数柯里化

```js
function curry(func) {
  const paramsCollector = (...args1) => {
    if (args1.length === func.length) {
      return func.args
    } else {
      return (...args2) => paramsCollector(...args1, ...args2)
    }
  }

  return paramsCollector
}
```

## 解析 URL 参数

- 使用正则表达式将 URL 问号 ? 之后的部分提取出来

- 以 & 作为分隔符将提取得到的字符串分割为参数键值对数组

- 使用 test 方法判断参数键值对中是否包含等号 =

- 如果不包含`等号 =` —— 直接赋值为 true

- 如果包含`等号 =` —— 以 `等号 =` 分割字符串得到 key & value

- 对参数值 val 使用 [decodeURIComponent](https:/developer.mozilla.org/zh-CN/docs/Web/JavaScriptReference/Global_Objects/decodeURIComponent) 方法进行解码

- 对参数值 val 使用 test 方法判断是否为一个纯数字字符串 —— 果是则转换为 Number 类型

- 判断参数对象中是否已经存在 key —— 如果存在则以 Array 形式储

  ```js
  function parseUrl(url) {
    const paramsStr = /.+\?(.+)$/.exec(url)[1]
    const paramsList = paramsStr.split('&')
    const params = {}

    paramsList.forEach((param) => {
      if (/=/.test(param)) {
        let [key, value] = param.split('=')
        value = decodeURIComponent(value)
        value = isNaN(value) ? value : parseFloat(value)

        if (params.hasOwnProperty(key)) {
          params[key] = [].concat(params[key], value)
        } else {
          params[key] = value
        }
      } else {
        params[param] = true
      }
    })

    return params
  }
  ```
