const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    // 存储回调，会在实例状态status变化时依序执行
    ONFULFILLED_CALLBACK_LIST = []
    ONREJECTED_CALLBACK_LIST = []

    // 私有变量
    _status = PENDING

    constructor(excutor) {
        this.status = PENDING
        this.value = null
        this.reason = null

        try {
            excutor(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }

    get status() {
        return this._status
    }

    set status(newStatus) {
        this._status = newStatus

        switch (newStatus) {
            case FULFILLED: {
                this.ONFULFILLED_CALLBACK_LIST.forEach(callback => {
                    callback(this.value)
                })
                break
            }
            case REJECTED: {
                this.ONFULFILLED_CALLBACK_LIST.forEach(callback => {
                    callback(this.reason)
                })
                break
            }
            default: {
                break
            }
        }
    }

    resolve(value) {
        if (this.status === PENDING) {
            this.value = value
            this.status = FULFILLED
        }

    }

    reject(reason) {
        if (this.status === PENDING) {
            this.reason = reason
            this.status = REJECTED
        }
    }

    then(onFulfilled, onRejected) {
        const fulfilledFn = this.isFunction(onFulfilled) ? onFulfilled : (value) => value
        const rejectedFn = this.isFunction(onRejected) ? onRejected : (reason) => { throw reason }

        const fulfilledFnWithCatch = (resolve, reject, newPromise) => {
            queueMicrotask(() => {
                try {
                    if (!this.isFunction(onFulfilled)) {
                        resolve(this.value)
                    } else {
                        const x = fulfilledFn(this.value)

                        this.resolvePromise(newPromise, x, resolve, reject)
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

                        this.resolvePromise(newPromise, x, resolve, reject)
                    }
                } catch (error) {
                    reject(error)
                }
            })
        }

        switch (this.status) {
            case FULFILLED: {
                const newPromise = new MyPromise((resolve, reject) => fulfilledFnWithCatch(resolve, reject, newPromise))

                return newPromise
            }
            case REJECTED: {
                const newPromise = new MyPromise((resolve, reject) => rejectedFnWithCatch(resolve, reject, newPromise))

                return newPromise
            }
            case PENDING: {
                const newPromise = new MyPromise((resolve, reject) => {
                    this.ONFULFILLED_CALLBACK_LIST.push(() => fulfilledFnWithCatch(resolve, reject, newPromise))
                    this.ONREJECTED_CALLBACK_LIST.push(() => rejectedFnWithCatch(resolve, reject, newPromise))
                })

                return newPromise
            }
        }
    }

    resolvePromise(newPromise, x, resolve, reject) {
        if (newPromise === x) {
            return reject(new TypeError('...'))
        }

        if (x instanceof MyPromise) {
            const [onFulfilled, onRejected] = [
                (y) => {
                    this.resolvePromise(newPromise, y, resolve, reject)
                },
                (r) => { reject(r) }
            ]

            x.then(onFulfilled, onRejected)
        } else if (typeof x === 'object' || this.isFunction(x)) {
            if (x === null) {
                return resolve(x)
            }

            let then = null
            try {
                then = x.then
            } catch (error) {
                return reject(error)
            }

            if (this.isFunction(then)) {
                let called = false

                try {
                    const onFulfilled = (y) => {
                        if (called) {
                            return
                        }
                        called = true
                        this.resolvePromise(newPromise, y, resolve, reject)
                    }
                    const onRejected = (r) => {
                        if (called) {
                            return
                        }
                        called = true
                        reject(r)
                    }
                    then.call(x, onFulfilled, onRejected)
                    if (called) {
                        return
                    }


                } catch (error) {
                    if (called) {
                        return
                    }
                    reject(error)
                }
            } else {
                resolve(x)
            }
        } else {
            resolve(x)
        }


    }

    isFunction(param) {
        return typeof param === 'function'
    }
}

// 测试用例
const test = new MyPromise((resolve,reject)=>{
    setTimeout(() => {
        resolve('MyPromise resolve')
    })
}).then(console.log)