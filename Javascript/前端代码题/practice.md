
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

实现数组原型方法

EventBus 事件总线 —— 发布订阅模式

使用 setTimeout 实现 setInterval

深浅拷贝

函数柯里化

实现 Promise 及其相关方法

解析 URL 参数

数据双向绑定

JSONP

# 2024-11-30

## 实现继承

1. 原型链继承

    ```js
    function Parent(){}

    function Child(){}

    Child.prototype = new Parent()
    Child.prototype.constructor = Child
    ```

2. 构造函数继承

    ```js
    function Parent(){}

    function Child(){
        Parent.call(this)
    }
    ```

3. 组合继承

    ```js
    function Parent(){}

    function Child(){
        Parent.call(this)
    }

    Child.prototype = new Parent()
    Child.prototype.constructor = Child
    ```

4. 寄生组合继承

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

5. ES6 继承

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