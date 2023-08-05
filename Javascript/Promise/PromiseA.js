const  PENDING = 'pending';
const  FULFILLED = 'fulfilled';
const  REJECTED = 'rejected';

class PromiseA{
    constructor(executor){
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        try{
            executor(this.resolve.bind(this),this.reject.bind(this));//执行器函数是同步执行的
        }catch(e){
            this.reject(e);
        }
    }

    //存储回调
    onFulfilled_Callback = [];
    onRejected_Callback = [];
    _status = PENDING;

    //数据劫持，监听状态变化
    get status(){
        return this._status;
    }
    set status(newStatus){
        this._status = newStatus;
        switch(this._status){
            //依次执行回调注册表中的所有回调函数
            case FULFILLED:{
                this.onFulfilled_Callback.forEach(callback => {
                    callback(this.value);
                });
                break;
            }
            case REJECTED:{
                this.onRejected_Callback.forEach(callback => {
                    callback(this.reason);
                });
                break;
            };
        }
    }

    resolve(value){
        //状态只改变一次
        if(this.status === PENDING){
            //先赋值再改变状态
            this.value = value;
            this.status = FULFILLED;
        }
    }
    reject(reason){
        //状态只改变一次
        if(this.status === PENDING){
            //先赋值再改变状态
            this.reason = reason;
            this.status = REJECTED;
        }
    }
    then(onFulfilled,onRejected){
        const onFulfilledWithCatch = (resolve,reject,Promise2) => {
            //处理程序执行时若抛出错误 —— 捕获这个错误
            queueMicrotask(()=>{
                try{
                    //如果onFulfilled不是一个函数 ——> 原样后传，接收value
                    if(!this.isFunction(onFulfilled)){
                        resolve(this.value);
                    }else{
                        const x = onFulfilled(this.value);
                        this.resolvePromise(Promise2,x,resolve,reject);
                    }
                }catch(e){
                    reject(e);
                }
            })
        }
        const onRejectedWithCatch = (resolve,reject,Promise2) =>  {
            //处理程序执行时若抛出错误 —— 捕获这个错误
            queueMicrotask(()=>{
                try{
                    //如果onRejected不是一个函数 ——> 原样后传，接收reason
                    if(!this.isFunction(onRejected)){
                        reject(this.reason);
                    }else{
                        const x = onRejected(this.reason);
                        this.resolvePromise(Promise2,x,resolve,reject);
                    }
                    onRejected(this.reason);
                }catch(e){
                    reject(e);
                }
            })
        }

        switch(this.status){
            case FULFILLED:{
                const Promise2 = new PromiseA((resolve,reject) => onFulfilledWithCatch(resolve,reject,Promise2));
                return Promise2;
            }
            case REJECTED:{
                const Promise2 = new PromiseA((resolve,reject) => onRejectedWithCatch(resolve,reject,Promise2));
                return Promise2;
            }
            case PENDING:{
                const Promise2 = new PromiseA((resolve,reject) => {
                    //注册回调函数
                    this.onFulfilled_Callback.push(() => onFulfilledWithCatch(resolve,reject,Promise2));
                    this.onRejected_Callback.push(() => onRejectedWithCatch(resolve,reject,Promise2));
                });
                return Promise2;
            }
        }
    }

    resolvePromise(Promise2,x,resolve,reject){
        //情况1：如果处理函数的返回值x和 promise1 是同一个引用 ——> 避免循环引用，抛出错误
        if(Promise2 === x) return new TypeError('Error');

        //情况2：如果处理函数的返回值x是一个 Promise 实例 ——> 递归调用直至状态转变
        if(x instanceof Promise2){
            x.then((y) => {
                //y就是当作为Promise实例的x转换为fulfilled状态的value
                this.resolvePromise(Promise2,y,resolve,reject);
            },reject);
        }else if(typeof x === 'object'|| this.isFunction(x)){
            //情况3：如果处理函数的返回值x是一个对象或函数 ——> 将x的then赋给then变量
            if(x === null){
                resolve(x);
            }
            let then = null;
            try{
                then = x.then;
            }catch(e){
                reject(e);
            }

            //如果 then 是一个函数 ——> 让x调用then方法
            if(this.isFunction(then)){
                //利用一个 布尔类型 的变量让处理程序只执行一次
                let called = false;
                try{
                    then.call(x,
                        (y) => {
                            if(called) return;
                            called = true;
                            this.resolvePromise(Promise2,y,resolve,reject);
                        },
                        (r)=>{
                            if(called) return;
                            called = true;
                            resolve(r);
                        });
                }catch(e){
                    if(called) return;
                    reject(e);
                }
            }else{
                //如果 then 不是一个函数 ——> 直接resolve(x);
                resolve(x);
            }
        }else{
             //如果返回值x不是函数、对象、Promise实例 ——> 直接resolve(x);
            resolve(x);
        }
    }

    isFunction(param){
        return typeof param === 'function';
    }
}