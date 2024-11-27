const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class PromiseA {
    constructor(excutor) {
        // promise实例的状态
        this.status = PENDING

        this.value = null
        this.reason = null

        // excutor执行器函数是同步执行的
        try {
            // 使用bind方法避免this指向出错
            excutor(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            this.reject(e)
        }
    }

    // 存储回调，会在实例状态status变化时依序执行
    onFulfilled_Callback = []
    onRejected_Callback = []

    // 私有变量
    _status = PENDING

    get status() {
        return this._status
    }

    // 使用ES6新特性进行数据劫持，从而监听Promise实例的状态变化
    set status(newStatus) {
        switch (newStatus) {
            case FULFILLED: {
                // 依序执行已注册的回调函数 
                this.onFulfilled_Callback.forEach(callback => {
                    callback(this.value)
                })
                break
            }
            case REJECTED: {
                this.onRejected_Callback.forEach(callback => {
                    callback(this.reason)
                })
                break
            }
            case PENDING: {
                this.onFulfilled_Callback.push()
                this.onRejected_Callback.push()
                break
            }

        }
    }

    then(onFulfilled, onRejected) {
        // 将处理程序进行封装，避免在多处代码里重复写入try/catch语句
        const onFulfilledWithCatch = (resolve, reject, Promise2) => {
            //处理程序执行时若抛出错误 —— 捕获这个错误

        }
        const onRejectedWithCatch = (resolve, reject, Promise2) => {  
        }

        // then方法的返回值是一个新的promise实例
        switch (this.status) {
            case FULFILLED: {
                return new PromiseA(onFulfilledWithCatch)
            }
            case REJECTED: {
                return new PromiseA(onRejectedWithCatch)
n            }
            case PENDING: {
                return new PromiseA((resolve, reject) => {
                    // 在pending状态时注册回调函数
                    this.onFulfilled_Callback.push(() => onFulfilledWithCatch(resolve, reject, Promise2));
                    this.onRejected_Callback.push(() => onRejectedWithCatch(resolve, reject, Promise2));
                })
            }

        }
    }

    resolve(value) {
        // 状态仅能更改一次
        if (this.status === PENDING) {
            //先赋值再改变状态 —— 在状态status的setter中，监听到状态变化时会同步执行value的读取，因此先对value赋值再变更状态status，reject()同理
            this.value = value
            this.status = FULFILLED
        }
    }

    reject(reason) {
        // 状态仅能更改一次
        if (this.status === PENDING) {
            this.reason = reason
            this.status = REJECTED
        }
    }

    isFunction(param) {
        return typeof param === 'function'
    }
}