# 实现Promise

1. new Promise() => Promise 应该是一个构造函数 or 类Class

    ```js
    class MyPromise {
        constructor() {

        }
    }
    ```

2. 定义 Promise 的三种状态

    ```js
    const PENDING = 'pending'
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'
    ```

3. 初始化状态

    ```js
    constructor() {
        this.status = PENDING
        this.value = null
        this.reason = null
    }
    ```

4. 实现 resolve 和 reject 方法

    - 这两个方法要更改 status

    - 入参 —— value / reason

    - 需要判断当前状态是否为 pending

        ```js
        if (this.status === PENDING) {
            // 更改status & value/reason
        }
        ```

5. 对于实例化 promise 时的入参处理

    ```js
    const p = new Promise((resolve, reject) => {})
    ```

    - 入参是一个执行器函数 executor，接收 reslove 和 reject 两个参数

    - 初始化 promise 时就要执行这个函数，即该函数是同步执行的，并且有任何的报错都要通过 reject 抛出

        ```js
        constructor(executor) {
             // 省略其他代码

            try {
                executor(this.resolve.bind(this), this.reject.bind(this))
            } catch (error) {
                this.reject(error)
            }
        }
        ```

6. 实现 then 方法

    - 接收两个参数 onFulfilled & onRejected

    - 检查参数是否为函数，如果不是就忽略 —— 添加一个判断是否为函数的公共方法

        ```js
        isFunction(param) {
            return typeof param === 'function'
        }    
        ```

    - 根据当前promise的状态调用不同函数 —— 使用 switch 语句

    - 拿到所有的回调函数 —— 新建两个数组分别收集onFulfilled 和 onRejected
        
        ```js
        ONFULFILLED_CALLBACK = []
        ONREJECTED_CALLBACK = []

        // 省略其余代码  

        switch (this.status){            
            case PENDING: {
                this.ONFULFILLED_CALLBACK_LIST.push(fulfilledFn)
                this.ONREJECTED_CALLBACK_LIST.push(rejectedFn)
                break
            }

        }
        ```

    - 在 status 发生变化后执行回调数组中的回调
        
        - 使用 ES6 的 getter & setter 来监听 status 的变化

            ```js
            get status() {
                return this._status
            }

            set status(newStatus) {
                this._status = newStatus

                switch (newStatus) {
                    case FULFILLED / REJECTED: {
                        this.ONFULFILLED_CALLBACK_LIST /    ONFULFILLED_CALLBACK_LIST.forEach(() => {})
                    }
                }
            }
            ```

        - 因为在 status 的 setter 中执行回调函数时使用到了 value 和 reason，所以 resolve 和 reject 中 value 和 reason 的赋值放置于 status 的赋值前

7. then 的返回值

    - 如果 onFulfilled / onRejected 抛出异常，则新生成的 promise 必须 reject 这个异常 —— 使用 try / catch 语句

        - 将所使用的 try / catch 语句进行封装 —— 将onFulfilled / onRejected 和 try / catch 语句组合为一个执行器函数形式的函数

            ```js
            const fulfilledFnWithCatch = (resolve, reject) => {
                try {
                    fulfilledFn(this.value)
                } catch (error) {
                    reject(error)
                }
            }
            const rejectedFnWithCatch = (resolve, reject) => {
                try {
                    rejectedFn(this.reason)
                } catch (error) {
                    reject(error)
                }
            }
            ```

        - then 返回的是一个 Promise，所以 switch 语句中返回的是 new MyPromise

            ```js
            switch (this.status) {
                case FULFILLED: {
                    return new MyPromise(fulfilledFnWithCatch)
                }
                case REJECTED: {
                    return new MyPromise(rejectedFnWithCatch)
                }
                case PENDING: {
                    return new MyPromise((resolve, reject) => {
                        this.ONFULFILLED_CALLBACK_LIST.push(() =>   fulfilledFnWithCatch(resolve, reject))
                        this.ONREJECTED_CALLBACK_LIST.push(() =>    rejectedFnWithCatch(resolve, reject))
                    })
                }
            }
            ```
    
    - 如果 onFulfilled 不是函数，且 promise 执行成功，则 promise2 必须返回同样的状态和 value 
        
        ```js
         try {
            fulfilledFn(this.value)

            // 在这里resolve表示上方fulfilledFn(this.value)语句执行成功
            resolve(this.value)
        } catch (error) {
            reject(error)
        }
        ```
    
    - 如果 onRejected 不是函数，且 promise 拒绝执行，则 promise2 必须返回同样的状态和 reason

        ```js
        try {
            rejectedFn(this.reason)

            // ?
            if (this.isFunction(onRejected)) {
                resolve()
            }
        } catch (error) {
            reject(error)
        }
        ```

    - 如果 onFulfilled / onRejected 返回一个值 x，则运行 resolvePromise 方法 

8. resolvePromise 

    - 四个参数 —— newPromise、x、resolve、reject

    - 需要在 onFulfilled & onRejected 执行的 try / catch 语句再次判断 onFulfilled & onRejected 是否是函数

        - 原因 —— onFulfilled & onRejected 为函数才会存在返回值 x

        - 如果不是函数直接 resolve

        - 如果是函数且存在返回值 x，则将 x 和 newPromise 传入 resolvePromise 方法并执行

    - 需要为 resolvePromise 方法提供 newPromise 参数

        - newPromise 是什么？ —— switch 语句中所返回的 new MyPromise

            ```js
            switch (this.status) {
                case FULFILLED: {
                    return new MyPromise(fulfilledFnWithCatch)
                }
                case REJECTED: {
                    return new MyPromise(rejectedFnWithCatch)
                }
                case PENDING: {
                    return new MyPromise((resolve, reject) => {
                        this.ONFULFILLED_CALLBACK_LIST.push(() =>   fulfilledFnWithCatch(resolve, reject))
                        this.ONREJECTED_CALLBACK_LIST.push(() =>    rejectedFnWithCatch(resolve, reject))
                    })
                }
            }
            ```

        - 改造 fulfilledFnWithCatch & rejectedFnWithCatch，加入命名参数 newPromise

            ```js
            const fulfilledFnWithCatch = (resolve, reject, newPromise) => {}

            const rejectedFnWithCatch = (resolve, reject, newPromise) => {}
            ```

        - 顺应上述的改造，将 switch 语句中返回的 promise 作为参数传入 fulfilledFnWithCatch & rejectedFnWithCatch

            ```js
            switch (this.status) {
                case FULFILLED: {
                    const newPromise = new MyPromise((resolve, reject) =>   fulfilledFnWithCatch(resolve, reject, newPromise))

                    return newPromise
                }
                case REJECTED: {
                    const newPromise = new MyPromise((resolve, reject) =>   rejectedFnWithCatch(resolve, reject, newPromise))

                    return newPromise
                }
                case PENDING: {
                    const newPromise = new MyPromise((resolve, reject) =>   {
                        this.ONFULFILLED_CALLBACK_LIST.push(() =>   fulfilledFnWithCatch(resolve, reject, newPromise))
                        this.ONREJECTED_CALLBACK_LIST.push(() =>    rejectedFnWithCatch(resolve, reject, newPromise))
                    })

                    return newPromise
                }
            }
            ```

9. 根据规范实现 Promise 处理程序 —— resolvePromise

    -  如果 newPromise 和 x 指向同一个引用（循环引用），则抛出错误 —— reject typeError

        ```js
        if (newPromise === x) {
            return reject(new TypeError(''))
        }
        ```

    - 如果 x 是一个 promise 实例
        
        - 如果 x 状态为 pending，则使用 then 来等待 x 的状态变更
        
        - 如果 x 状态为 fulfilled，则递归调用 resolvePromise 方法，递归的目的是使得 x 不再为 promise
        
        - 如果 x 状态为 rejected, 则 reject

            ```js
            if (x instanceof MyPromise) {
                const onFulfilled = (value) => {
                    this.resolvePromise(newPromise, value, resolve, reject)
                }

                const onRejected = (reason) => { reject(reason) }

                x.then(onFulfilled, onFulfilled)
            }
            ```
    
    - 如果 x 是一个对象或者函数类型

        - 如果是 null，直接 resolve

        - 获取 x.then 并赋值给一个 then 变量 —— 使用 try /catch 语句
        
        - 如果 then 是一个函数，则使用 call 方法将其绑定到 x 上并在 try / catch 语句中调用

            - 设置变量 called 来标识 then 的 onFulfilled & onRejected 回调是否已调用过，从而保证仅调用一次

            - then 的 onFulfilled 中递归地调用 resolvePromise

            - then 的 onRejected 中直接将 reject(reason)
            
        - 过程中如果抛出异常

            - 如果 then 的 onFulfilled & onRejected 回调已调用过，则忽略这个异常

            - 如果未被调用过，则直接 reject(error)

        - 如果 then 不是一个函数，则直接 resolve(x)

            ```js
            if(typeof x === 'object' || this.isFunction(x)) {
                if(x === null) {
                    return resolve(x)
                }

                let then = null 
                try {
                    then = x.then
                } catch (error) {
                    reject(error)
                }

                if(!this.isFunction(then)) {
                    resolve(x)
                } else {
                    let called = false

                    try {
                        const onFulfilled = (y) => {
                            if(called) return 

                            called = true
                            this.resolvePromise(newPromise, y, resolve, reject)
                        }

                        const onRejected = (r) => { 
                            if(called) return

                            called = true
                            reject(r) 
                        }

                        then.call(x, onFulfilled, onRejected)
                    } catch (error) {
                        if (called) return

                        reject(error)
                    }
                }
            }
            ```

    - 如果 x 不是 promise 实例、对象或者函数类型，则直接 resolve(x)

        ```js
        if (x instanceof MyPromise) {
            // 忽略其余代码
        } else if (typeof x === 'object' || this.isFunction(x)) {
            // 忽略其余代码
        } else {
            resolve(x)
        }
        ```

10. onFulfilled & onRejected 的执行环境为微任务环境 —— 将fulfilledFnWithCatch & rejectedFnWithCatch 的代码题由 queueMicrotask 包裹着即可

    ```js
        const fulfilledFnWithCatch = (resolve, reject, newPromise) => {
            queueMicrotask(() => {
                try {
                    if (!this.isFunction(onFulfilled)) {
                        resolve(this.value)
                    } else {
                        const x = fulfilledFn(this.value)
                        this.resolvePromise(newPromise, x, resolve,reject)
                    }
                } catch (error) {
                    reject(error)
                }
            })
        }
        const rejectedFnWithCatch = (resolve, reject, newPromise) => {
            queueMicrotask(() => {
                try {
                    if (!this.isFunction(onRejected)) {
                        reject(this.reason)
                    } else {
                        const x = rejectedFn(this.reason)
                        this.resolvePromise(newPromise, x, resolve,reject)
                    }
                } catch (error) {
                    reject(error)
                }
            })
        }
    ```

- 实现 catch 方法

    ```js
    catch(onRejected) {
        return this.then(null, onRejected)
    }
    ```