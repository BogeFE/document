
实现 instanceof 关键字

✅实现继承

✅实现 new 关键字

✅实现 Object.create

✅实现 Object.assign

使用 Promise 封装 Ajax

✅实现 Function.prototype.call 方法

✅实现 Function.prototype.apply 方法

✅实现 Function.prototype.bind 方法

✅打平数组

防抖（debounce）

节流（throttle）

✅实现数组原型方法

EventBus 事件总线 —— 发布订阅模式

使用 setTimeout 实现 setInterval

深浅拷贝

函数柯里化

✅实现 Promise 静态方法

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
function myCreate(obj){
    const tempFunc = function(){}
    tempFunc.prototype = obj

    return new tempFunc()
}
```



## 实现 Object.assign

```js
function myAssign(target, ...source){
    if(target === null){
        throw Error('...')
    }

    const result = Object(target)

    source.forEach((obj)=> {
        if(obj !== null){
            for(key in obj){
                if(target.hasOwnProperty(key)){
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
if(!Function.prototype.bind) {
    Function.prototype.bind = function(otherThis) {
        if(typeof this !== 'function'){
            throw Error('...')
        }

        const args = Array.prototype.slice(arguments, 1)

        const fToBind = this
        const fNop = function(){}
        const fBound = function() {
            const newArgs = Array.prototype.concat.apply(arguments, args)

            return fToBind.apply(this instanceof fNop ? this : otherThis, newArgs)
        }

        if(this.prototype){
            fNop.prototype = this.prototype
        }
        fBound.prototype = new fNop()

        return fBound
    }
}
```

## 实现 Function.prototype.call 方法

```js
if(!Function.prototype.call) {
    Function.prototype.call = function(context, ...args) {
        if(typeof this !== 'function'){
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
if(!Function.prototype.apply) {
    Function.prototype.apply = function(context, args) {
        if(typeof this !== 'function'){
            throw Error('...')
        }

        if(!Array.isArray(args)){
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
    if(depth >= 1) {
        return arr.reduce((res, item) => {
            if(Array.isArray(item)){
                return res.concat(flatDepth(item, depth - 1))
            }else {
                return res.concat(item)
            }
        })
    }else {
        return arr.slice()
    }
}
```

# 2024-12-03

## 实现数组原型方法

### Array.prototype.forEach()

```js
Array.prototype.forEach = function(callbackFn, thisArg) {
    if(typeof callbackFn !== 'function') {
        throw TypeError('callbackFn is not a function')
    }

    for(let i = 0; i < this.length; i++) {
        callbackFn.call(thisArg, this[i], i, this)
    }
}
```

### Array.prototype.map()

```js
Array.prototype.map = function(callbackFn, thisArg) {
    if(typeof callbackFn !== 'function') {
        throw TypeError('callbackFn is not a function')
    }

    const result = []
    for(let i = 0; i < this.length; i++) {
        result.push(callbackFn.call(thisArg, this[i], i, this))
    }

    return result

}
```

### Array.prototype.filter()

```js
Array.prototype.filter = function(callbackFn, thisArg) {
    if(typeof callbackFn !== 'function') {
        throw TypeError('callbackFn is not a function')
    }

    const result = []

    for(let i = 0; i < this.length; i++) {
        if(callbackFn.call(thisArg, this[i], i, this)) {
            result.push(this[i])
        }
    }

    return result
}
```

### Array.prototype.some()

```js
Array.prototype.some = function(callbackFn, thisArg) {
    if(typeof callbackFn !== 'function') {
        throw TypeError('callbackFn is not a function')
    }

    for(let i = 0; i < this.length; i++) {
        if(callbackFn.call(thisArg, this[i], i, this)) {
            return true
        }
    }

    return false
}
```

### Array.prototype.every()

```js
Array.prototype.every = function(callbackFn, thisArg) {
    if(typeof callbackFn !== 'function') {
        throw TypeError('callbackFn is not a function')
    }

    for(let i = 0; i < this.length; i++) {
        if(!callbackFn.call(thisArg, this[i], i, this)) {
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
Array.prototype.reduce = function(callbackFn, initialValue) {
    if(typeof callbackFn !== 'function') {
        throw TypeError('callbackFn is not a function')
    }

    const isInitialValue = [...arguments].length === 2

    if(this.length === 0 && !isInitialValue) {
        throw TypeError('Reduce of empty array with no initial value')
    }

    let res = isInitialValue ? initialValue : this[1]

    for(let i = isInitialValue ? 1 : 0; i < this.length; i++) {
        res = callbackFn(res, this[i], i, this)
    }

    return res
}
```

## 实现 Promise 静态方法

### Pomise.all()

- 接收的参数为一个可迭代对象 —— 利用扩展操作符和 try/catch 语句来进行对参数的校验

    ```js
    Promise.all = function(iterable) {
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
                    val => {
                        count++
                        res[index] = val
                        if(count === promiseArray.length) {
                            resolve(res)
                        }
                    },
                    err => { reject(err) }
                )
            })
        })

    }
    ```

### Promise.race()

- 接收的参数为一个可迭代对象 —— 利用扩展操作符和 try/catch 语句来进行对参数的校验

    ```js
    Promise.race = function() {
        let promiseArray
        try {
            promiseArray = [...iterable]
        } catch (error) {
            throw TypeError(error)
        }

        return new Promise((resolve, reject) => {
            promiseArray.forEach(item => {
                Promise.resolve(item).then(
                    val => { resolve(val) },
                    err => { reject(err) }
                )
            })
        })
    }
    ```

### Promise.allSettled()

- 接收的参数为一个可迭代对象 —— 利用扩展操作符和 try/catch 语句来进行对参数的校验

- 可以将计数已经判定统一放到 Promise.prototype.finally 方法中

    ```js
    Promise.all = function(iterable) {
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
                    value => {
                        res[index] = {
                            status: 'fulfilled', value
                        }
                    },
                    reason => { 
                        res[index] = {
                            status: 'rejected', reason
                        }
                    }
                ).finally(() => {
                    count++
                    if(count === promiseArray.length) {
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
    Promise.any = function(iterable) {
        let promiseArray
        try {
            promiseArray = [...iterable]
        } catch (error) {
            throw TypeError(error)
        }

        let [count,errors] = [0,[]]
        return new Promise((resolve, reject) => {
            if(promise.length === 0) {
                throw new AggregateError([], 'All promises were rejected')
            }

            promiseArray.forEach((item, index) => {
                Promise.resolve(item).then(
                    value => {
                        resolve(value)
                    },
                    error => {
                        count++
                        errors[index] = error
                        if(count === promiseArray.length) {
                            throw new AggregateError(errors, 'All promises were rejected')
                        }

                    }
                )
            })
        })
    }
    ```