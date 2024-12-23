# this 全面解析

## this 对象

*this* 是在运行时绑定的，而不是编写时绑定

- 标准函数中 *this* 引用把函数当成方法调用的上下文对象

- 在网页的全局上下文中调用函数时 *this* 指向 *window*

  ```js
  window.color = 'red'
  let o = {
      color: 'blue'
  }
  
  function sayColor(){
      console.log(this.color)
  }
  
  sayColor() // red

  o.sayColor = sayColor
  o.sayColor() // blue
  ```

- 箭头函数中的 *this* 会保留定义该函数时的上下文

    ```js
    function King() {
        this.royalName = 'Henry'
        setTimeout(() => console.log(this.royalName), 1000)
    }
  
    function Queen() {
        this.royalName = 'Elizabeth'
    
        setTimeout(function(){
            console.log(this.royalName)
            }, 1000
  	    )
    }   
    
    new King() // Henry
    new Queen() // undefined
    ```

## this 绑定规则

- 默认绑定 —— 函数直接调用
    
    - 可将这条规则视作无法应用其他规则时的默认规则

  - 非严格模式下，默认绑定指向全局对象

    ```js
    function fn(){
        console.log(this)
    }
    fn() // window
    ```

  - 严格模式下，*this* 绑定为 *undefined*

  	```js
  	function fn() {
    	'use strict'
    	console.log(this)
  	}
  	
  	fn() // undefined
  	```

  - 严格模式下调用 *fn( )* 不影响默认绑定规则

  	```js
  	function fn() {
  	  console.log(this)
  	}
  	
  	(function(){
  	    'use strict'
  	    fn() // window
  	})()
  	```

- 隐式绑定 —— 属性访问调用（调用堆栈的上一级）

    - 当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 *this* 绑定到这个上下文对象

    ```js
    function fn () {
      console.log(this.a)
    }
    const obj1 = {
      a: 1,
      fn,
    }
    const obj2 = {
      a: 2,
      obj1,
    }
    obj2.obj1.fn() // 1
    ```

    - 丢失绑定对象 —— 下述代码中 *fn1* 虽然是 *obj1.fn* 的引用，但它实际引用的是 *fn* 本身，因此 *fn1()* 是一个不带任何修饰准函数调用，因此应用了默认绑定规则，其 *this* 绑定为全局对象

        ```js
        function fn() {
            console.log(this.a)
        }
        const obj1 = {
            a: 1,
            fn,
        }
        const fn1 = obj1.fn
        fn1() // undefined
        ```

    - *setTimeout* —— 执行环境为全局环境，*this* 绑定为全局对象

        ```js
        setTimeout(obj1.fn, 1000) // undefined
        ```

    - 函数作为参数传递 —— 参数传递是一种隐式赋值。函数 *run* 中 *fn* 看似是 *obj1.fn*，实际是对 *fn* 本身的引用，因此函数 *run* 中 *fn()* 是一个不带任何修饰准函数调用，因此应用了默认绑定规则，其 *this* 绑定为全局对象

        ```js
        function fn() {
            console.log(this.a)
        }
        const obj1 = {
            a: 1,
            fn,
        }

        function run(fn) {
            fn()
        }

        var a = 'global a'
        run(obj1.fn) // 'global a'
        ```

    - 间接引用 —— 赋值表达式 *(p.fn = o.fn)* 返回的是目标函数的引用，即调用 *fn()* 而非 *p.fn()* *o.fn()*

        ```js
        function fn() {
            console.log(this.a)
        }
        var a = 2
        var o = {
            a: 3,
            fn: fn,
        }
        var p = {
            a: 4
        }
        (p.fn = o.fn)() // 2
        ```
    
    - 匿名函数的 *this* 绑定为 *window*

        ```js
        var name = 'The Window';
        var obj = {
            name: 'My obj',
            getName: function() {
                // 这是一个匿名函数
                return function() { 
                    console.log(this.name)
                };
            }
        }
        obj.getName()() // The Window
        ```

    - IIFE 中的 *this* 绑定为 *window*
        ```js
        ```

- 显式绑定  —— 在某个对象上强制调用函数，直接绑定 *this*

    - 装箱 —— 传入一个原始值（String类型、Boolean类型和Number类型）则会被包装成原始值对象，即new String()、new Boolean() 和 new Number()
        ```js
        function fn() {
            console.log(this.a)
        }
        const obj1 = {
            a: 100
        }
        const obj2 = {
            a: 200
        }
        fn.call(obj1) // 100
        fn.apply(obj2) // 200

    - *call* 、 *apply* 和 *bind* 的第一个参数如果传入 *null* / *undefined* 则绑定到全局
    
        ```js
        function fn () {
        	console.log(this.a)
        }
        const obj1 = {
        	a: 100
        }
        const obj2 = {
            a: 200
        }
        fn.call(obj1) // 100
        fn.apply(obj2) // 200
        fn.apply(null) // undefined
        ```
    
    - 实现 *call* 和 *apply*
    
        ```js
        Function.prototype.mycall = function   (context,...    args){
            //如传入null则将上下文c绑定至全局
            context = context || window
            args = args ? args : []
            //为context设置符号属性避免冲突
            let key = Symbol()
            context[key] = this
            //通过隐式绑定的方法调用函数并传入参数
            const result = context[key](...args)
            //删除context中的key属性，使其恢复原样
            delete context[key]
            //返回函数调用的返回值
            return result
        }
        Function.prototype.myapply = function  (context,  args){
            //如传入null则将上下文绑定至全局
            context = context || window
            args = args ? args : []
            //为context设置符号属性避免冲突
            let key = Symbol()
            context[key] = this
            //通过隐式绑定的方法调用函数并传入参数
            const result = context[key](...args)
            //删除context中的key属性，使其恢复原样
            delete context[key]
            //返回函数调用的返回值
            return result
        }
        ```

    - *bind* 具有装箱的特性，*this* 的绑定只看第一个 *bind*
    
        ```js
        function fn() {
          console.log(this)
        }
        fn.bind(1).bind(2)() // 1
        ```
    
    - 实现 *bind*

        ```js
        if(!Function.prototype.bind) {
            Function.prototype.bind = function(ohterThis) {
                if(typeof this !== 'function') {
                    throw Error('...')
                }
                const args = Array.prototype.slice.apply(arguments, 1)

                let fNOP = function() {}
                let fToBind = this
                let fBound = function() {
                    const newArgs = Array.prototype.concat.apply(arguments, args)
                    return fToBind.apply(
                        // 判断是不是 new 调用的情况
                        // 在 new 调用的情况下 this 是以 fBound 为构造函数所生成的实例
                        this instanceof fNOP ? this : ohterThis, 
                        newArgs
                        )
                }

                if(this.prototype) {
                    fNOP.prototype = this.prototype
                }
                fBound.prototype = new fNOP()

                return fBound
            }
        }
        ```
  
- *new* 绑定

    - 如果 constructor  里没有返回对象的话 *this* 指向的是 *new* 之后得到的实例

        ```js
        function foo(a) {
          this.a = a
        }

        const f = new foo(2)
        f.a // 2

        function bar(a) {
          this.a = a
          return {
            a: 100
          }
        }
        const b = new bar(3)
        b.a // 100
        ```


- 箭头函数 —— 箭头函数本身是没有 *this* 的，继承的是外层的 *this*

    ```js
    function fn() {
      return {
        b: () => {
          console.log(this)
        }
      }
    }

    fn().b() // window
    // 箭头函数 b 继承了外层 fn 的 this
    // 外层的 fn 是直接调用的，this 绑定到了全局，即window

    fn().b.bind(1)() // window
    // bind函数不会改变箭头函数 b 的 this
    // 箭头函数 b 仍继承了外层 fn 的 this
    // 外层的 fn 是直接调用的，this 绑定到了全局，即window

    fn.bind(2)().b.bind(3)() // 2
    // bind函数不会改变箭头函数 b 的 this
    // 箭头函数 b 仍继承了外层 fn 的 this
    // 外层的 fn 的 this 经由 bind 函数的作用绑定到了Number(2)上
    ```

## this 优级

「new 绑定」 > 「显绑」 > 「隐绑」 > 「默认绑定」


## this 指向实战

- 第一题
    ```js
    function foo() {
      console.log( this.a )
    }

    var a = 2;

    (function(){
      "use strict"
      foo();
    })();
    ```

- 第二题

    ```js
    var a = 10;
    var name = "the window"

    var object = {
      name: "My Object", 
      getName: function() { 
        return this.name
      } 
    }

    object.getName() // My Object

    (object.getName)() // My Object

    (object.getName = object.getName)() 
    // the window
    // 赋值表达值 object.getName = object.getName 的返回值是目标函数的引用，即调用 getName() 而非 object.getName()

    (object.getName, object.getName)() 
    // the window
    // 逗号运算符会最后一个表达式的返回值会作为当前复合表达式的值 
    // (object.getName, object.getName)的返回值为object.getName的引用，即getName本身
    // 因此是调用 getName()
    ```

- 第三题

    ```js
    var x = 3
    var obj3 = {
      x: 1,
      getX: function() {
        var x = 5
        return function() {
          return this.x
        }()
      }
    }

    console.log(obj3.getX())
    ```

- 第四题

    ```js
    function a(x) {
      this.x = x
      return this
    }
    var x = a(5) 
    var y = a(6) 

    console.log(x.x)
    console.log(y.x)
    ```