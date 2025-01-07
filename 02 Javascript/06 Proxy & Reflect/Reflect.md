
## 代理捕获器与反射方法

#### *get( )*

- 调用时机 —— 用于拦截某个属性的读取操作

- 反射 *API* 方法 —— *Reflect.get(target, name, receiver)*

  - 作用 —— 查找并返回 *target* 对象的 *name* 属性，如果属性不存在则返回 *undefined*

  - ⭐属性 *name* 中获取函数 *getter* 的 *this* 会绑定 *receiver*

    ```js
    const myObject = {
        foo: 1,
        bar: 2,
        get baz(){
            return this.foo + this.bar;
        }
    };
    
    const myReceiver = {
        foo: 3,
        bar: 3,
    }
    
    Reflect.get(myObject,'baz',myReceiver);//6 (3+3)
    ```


- 返回值 —— 无限制

- 拦截操作
  - *proxy.property*
  - *proxy[property]*
  - *Object.create(proxy)[property]*
  - *Reflect.get(target, property, receiver)*

- 参数 —— *get(target, property, receiver)*
  - *target* —— 目标对象
  - *property* —— 目标对象上的字符类型属性
  - *receiver* —— 代理对象或继承代理对象的对象（操作行为所针对的对象）

- 捕获器不变式 
  - *target.property* 不可配置、不可写 —— *get* 的返回值必须与其相匹配
  - *target.property* 不可配置、*[[GET]]* 为 *undefined* —— *get* 的返回值必须是 *undefined*

- ⭐*get* 可继承

  ```js
  const proto = new Proxy({},{
      get(target,propertyKey,receiver){
          console.log(`GET ${propertyKey}`);
          return target[propertyKey];
      }
  });
  const obj = Object.create(proto);
  obj.foo;//GET foo
  ```

- 应用

  - 访问不存在属性时报错

  ```js
  const proxy = new Proxy({}, {
      get(target,property,receiver){
          if(property in target){
              return target[property];
          }else{
              throw new ReferenceError('Do not exist');
      }
          }
      }
  })
  ```

  - 数组读取负数索引

  ```js
  function createArray(){
      return new Proxy(Array.from(arguments), {
          get(target,property,receiver){
              const index = Number(property);
              if(index < 0){
                  property = String(target.length + index);
              }
              return Reflect.get(target,property,receiver);
          }
      };)
  };
  
  const arr = createArray('a','b','c');
  arr[-1];// c
  ```

  - 生成指定 *DOM* 节点

  ```js
  const dom = new Proxy({},{
      get(target,property){
          return function(attrs = {}, ...children){
              const el = document.createElement(property);\
              
              for(const prop of Object.keys(attrs)){
                  el.setAttribute(prop,attrs[prop]);
              }
              for(const child of children){
                  if(typeof child === 'string'){
                      child = document.createTextNode(child);
                  }
                  el.appendChild(child);
              }
              
              return el;
          }
      }
  });
  ```




#### *set( )*

- 调用时机 —— 拦截某个属性的赋值操作

- 反射 *API* 方法 —— *Reflect.set(target, name, receiver)*

  - 作用 —— 将 *target* 对象的 *name*属性为 *value*

  - ⭐属性 *name* 中赋值函数 *setter* 的 *this* 会绑定 *receiver*

    ```js
    const myObject = {
        foo: 4,
        set bar(value){
            return this.foo = value;
        },
    };
    const myReceiver = {
        foo: 0;
    };
    
    Refelect.set(myObject,'bar',1,myReceiver);
    myObject.foo;//4
    myReceiver.foo;//1
    ```

  - 在 *Proxy* 对象中使用 *Reflect.set* 并传入 *receiver* 会拦截 *Proxy.defineProperty*

- 返回值
  - *true* —— 成功
  - *false* —— 失败，严格模式下回 *false/undefined* 会抛出 *TypeError*

- 拦截操作
  - *proxy.property = value*
  - *proxy[property] = value*
  - *Object.create(proxy)[property]  = value*
  - *Reflect.get(target, property, value, receiver)*

- 参数 —— *set(target, property, value, receiver)*
  - *target* —— 目标对象
  - *property* —— 目标对象上的字符类型属性
  - *value* —— 赋予属性的新值
  - *receiver* —— 接受最初赋值的对象

- 捕获器不变式
  - *target.property* 不可配置、不可写/ *[[SET]]* 为 *undefined*  —— 不可修改属性值

  ```js
  const obj = {};
  Object.defineProperty(obj,'foo',{
      value: ' bar',
      writable: false;
  });
  
  const proxy = new Proxy(obj, {
    	set(obj, prop, value, receiver) {
      	obj[prop] = 'baz';
      	return true;
    	}
  });
  
  proxy.foo = 'baz';
  proxy.foo // "bar"
  ```

- 应用

  - 为属性值设定赋值要求

    ```js
    //本例中使用 Proxy 保证 age 的属性值是一个不大于 200 的整数
    const proxy = new Proxy({},{
        set(target,property,value,receiver){
            if(property === 'age'){
                if(!Number.isInteger(Value)){
                    throw new TypeError('Not an integer!');
                }
                if(value > 200){
                    throw new RangeError('The age seems invalid');
                }
                
                target[property] = value;
                return true;
            }
        }
    })
    ```



#### *has( )*

- 调用时机 —— *in* 操作符，即判断对象是否具有某个属性

- 反射 *API* 方法 —— *Reflect.has(obj, name)*

  ```js
  const myObject = {
      foo: 1
  };
  Reflect.has(myObject,'foo');//true
  //foo in myObject
  ```

- 返回值 —— 必须是 *Boolean*，非布尔值会转型为布尔值

- 拦截操作
  - *property in proxy*
  - *with(proxy) { (property); }*
  - *property in Object.create(proxy)*
  - *Reflect.has(proxy, property)*

- 参数 —— *has(target, property)*
  - *target* —— 目标对象
  - *property* —— 目标对象上的字符类型属性

- 捕获器不变式
  - *target.property* 存在、不可配置 / 目标对象不可拓展 —— 必须返回 *true*



#### *defineProperty( )*

- 调用时机 —— 使用 *Object.defineProperty*
- 反射 *API* 方法 —— *Reflect.defineProperty(target, property, descriptior)*
  - 第一个参数不是对象 —— *Reflect.defineProperty* 会抛出错误
  - 与 *Proxy* 搭配
    - *Proxy.defineProperty* 对属性赋值设置了拦截
    - *Reflect.defineProperty* 完成赋值

- 返回值 —— 必须是 *Boolean*，非布尔值会转型为布尔值
- 拦截操作
  - *Object.defineProperty(proxy, property, descriptior)*
  - *Reflect.defineProperty(proxy, property, descriptior)*
- 参数 —— *defineProperty(target, property, descriptior)*
  - *target* —— 目标对象
  - *property* —— 目标对象上的字符类型属性
  - *descriptior* —— 包含属性配置选项的对象
- 捕获器不变式
  - 如果 *target* 不可拓展 —— 无法定义属性
  - 如果 *target* 有一个可配置属性 —— 不可添加同名的不可配置属性
  - 如果 *target* 有一个不可配置属性 —— 不可添加同名的可配置属性



#### *getOwnPropertyDescriptor( )*

- 调用时机 —— 拦截 *Object.getOwnPropertyDescriptor* 操作
- 反射 *API* 方法 —— *Reflect.getOwnPropertyDescriptor(target, property)*
  - 如果第一个参数不是对象，*Object.getOwnPropertyDescriptor* 不报错，返回 *undefined*
  - *Reflect.getOwnPropertyDescriptor* 会抛出错误，表示参数非法

- 返回值 —— 返回对象 / *undefined*
- 拦截操作
  - *Object.getOwnPropertyDescriptor(proxy, property)*
  - *Reflect.getOwnPropertyDescriptor(proxy, property)*
- 参数 —— *Object.getOwnPropertyDescriptor(target, property)*
  - *target* —— 目标对象
  - *property* —— 目标对象上的字符类型属性
- 捕获器不变式
  - 如果自有的 *target.property* 存在
    - 不可配置 / *target* 不可拓展 —— 返回表示该属性存在的对象
    - 可配置 —— 返回表示该属性可配置的对象
  - 如果 *target.property* 不存在
    - 不可返回表示可配置的对象
    - 如果 *target* 不可拓展 —— 返回 *undefined*



#### *deleteProperty( )*

- 调用时机 —— 拦截 *delete* 操作

- 反射 *API* 方法 —— *Reflect.deleteProperty(obj, name)*

  ```js
  const myObject = {
      foo: 'bar'
  };
  Reflect.deleteProperty(myObject,'foo');
  //delete myObject.foo
  ```

- 返回值 —— 必须是 *Boolean*，非布尔值会转型为布尔值

- 拦截操作
  - *delete proxy.property*
  - *delete proxy[property]*
  - *Reflect.deleteProperty(target, property)*

- 参数 —— *deleteProperty(target, property)*
  - *target* —— 目标对象
  - *property* —— 目标对象上的字符类型属性

- 捕获器不变式
  - 如果自有的 *target.property* 存在、不可配置 —— 不可删除这个属性

- 应用 —— 保护用下划线定义的私有属性

  ```js
  const target = {
      _prop: 'foo'
  };
  const proxy = new Proxy(target,{
      deleteProperty(target,property){
          if(property[0] === '_'){
              throw new Error('Do not delete private property!')
          }
          
          delete target[property];
          return true;                    
      }
  });
  
  delete proxy._prop;//'Do not delete private property!'
  ```




#### *ownKeys( )*

- 调用时机 —— 调用 *Object.keys( )*

- 反射 *API* 方法 —— *Reflect.ownKeys( )*

  - 作用 —— 返回对象所有属性，即 *Object.getOwnPropertyNames* 与 *Object.getOwnPropertySymbols* 之和

    ```js
    const target = {
        foo: 1,
        bar: 2,
        [Symbol.for('baz')]: 3,
        [Symbol.for('qux')]: 4,
    };
    Reflect.ownKeys(target);
    //['foo', 'bar', Symbol(baz), Symbol(qux)]
    
    Object.getOwnPropertyNames(target);
    //['foo', 'bar']
    Object.getOwnPropertySymbols(target);
    //[Symbol(baz), Symbol(qux)]
    ```

  - 如果 *Reflect.ownKeys()* 方法的第一个参数不是对象 —— 会报错

    ```js
    Reflect.ownKeys(1);//TypeError
    
    Object.getOwnPropertySymbols(1);//[]
    Object.getOwnPropertyNames(1);//[]
    ```

- 返回值 —— 包含字符串 / 符号的可枚举对象

- 拦截操作
  - *Object.getOwnPropertyNames(proxy)*
  - *Object.getOwnPropertySymbols(proxy)*
  - *Object.keys(proxy)*
  - *Reflect.ownKeys(proxy)*

- 参数 —— *ownKeys(target)*
  - *target* —— 目标对象

- 捕获器不变式
  - 返回值必须包含 *target* 的所有不可配置的自有属性 



#### *getPrototypeOf( )*

- 调用时机 —— 调用 *Object.getPrototypeOf*

- 反射 *API* 方法 —— *Reflect.getPrototypeOf(obj)*

  - 作用 —— 读取对象 *obj* 的 *\__proto_\_* 属性

    ```js
    const instance = new Person();
    
    Reflect.getPrototypeOf(instance) === Person.prototype;
    ```

  - ⭐与 *Object.getPrototypeOf* 的区别 —— *Reflect.getPrototypeOf* 不会将非对象的参数转为对象，而是直接报错

    ```js
    Object.getPrototypeOf(1);// Number
    Reflect.getPrototypeOf(1);// TypeError
    ```

- 返回值 —— 对象 *|| null*

- 拦截操作
  - *Object.getPrototypeOf(proxy)*
  - *Reflect.getPrototypeOf(proxy)*
  - *proxy.\_\_proto\_\_*
  - *Object.prototype.isPrototype(proxy)*
  - *proxy instanceof Object*

- 参数 —— *getPrototypeOf(target)*
  - *target* —— 目标对象

- 捕获器不变式
  - 如果 *target* 不可扩展 —— 唯一有效的 *Object.getPrototypeOf(proxy)* 为 *Object.getPrototypeOf(target)*



#### *setPrototypeOf( )*

- 调用时机 —— 调用 *Object.setPrototypeOf* 中被调用

- 反射 *API* 方法 —— *Reflect.setPrototypeOf(obj, newProto)*

  - 第一个参数不是对象

    - *Object.setPrototypeOf*会返回第一个参数本身

    ```js
    Object.setPrototypeOf(1, {});//1
    ```

    - *Reflect.setPrototypeOf* 会报错

    ```js
    Reflect.setPrototypeOf(1, {});//TypeError
    ```

  - 第一个参数是 *undefined / null* —— 两个方法都报错

    ```js
    Object.setPrototypeOf(null, {});//TypeError
    Reflect.setPrototypeOf(null, {});//TypeError
    ```

- 返回值 —— 必须是 *Boolean*，非布尔值会转型为布尔值

- 拦截操作
  - *Object.setPrototypeOf(proxy)*
  - *Reflect.setPrototypeOf(proxy)*

- 参数 —— *setPrototypeOf(target, prototype)*
  - *target* —— 目标对象
  - *prototype* —— 替代原型，如果是顶级原型则为 *null*

- 捕获器不变式
  - 如果 *target* 不可扩展 —— 唯一有效的 *prototype* 为 *Object.getPrototypeOf(target)*



#### *isExtensible( )*

- 调用时机 —— 在 *Object.isExtensible* 中调用 
- 反射 *API* 方法 —— *Reflect.isExtensible(target)*
  - 如果参数 *target* 不是对象
    - *Object.isExtensible* 返回 *false*
    - *Reflect.isExtensible* 会报错 *TypeError*


- 返回值 —— 必须是 *Boolean*，非布尔值会转型为布尔值
- 拦截操作
  - *Object.isExtensible(proxy)*
  - *Reflect.isExtensible(proxy)*
- 参数 —— *isExtensible(target)*
  - *target* —— 目标对象
- 捕获器不变式
  - 如果 *target* 不可扩展 —— 必须返回 *false*
  - 如果 *target* 可扩展 —— 必须返回 *true*



#### *preventExtensions( )*

- 调用时机 —— 在 *Object.preventExtensions* 中调用

- 反射 *API* 方法 —— *Reflect.preventExtensions(target)*

  -  作用 —— 用于让一个对象变为不可扩展

    ```js
    const object = {};
    Reflect.preventExtensions(object);//true
    //Object.preventExtensions(object)
    ```

  - 如果参数 *target* 不是对象

    - *Object.preventExtensions* —— *ES5* 环境下报错 / *ES6* 环境下返回参数本身

    ```js
    // ES5 环境
    Object.preventExtensions(1) // 报错
    
    // ES6 环境
    Object.preventExtensions(1) // 1
    ```

    - *Reflect.preventExtensions* —— 报错

    ```js
    Reflect.preventExtensions(1) // 报错
    ```

    

- 返回值 —— 必须是 *Boolean*，非布尔值会转型为布尔值

- 拦截操作
  - *Object.preventExtensions(proxy)*
  - *Reflect.preventExtensions( proxy)*

- 参数 —— *preventExtensions(target)*
  - *target* —— 目标对象

- 捕获器不变式 —— 如果 *Object.isExtensible(proxy) === false* 则返回 *true*



#### *apply( )*

- 调用时机 —— 调用函数中时被调用

- 反射 *API* 方法 —— *Reflect.apply(func, thisArg, args)*

  - 场景 —— 当函数的 *apply* 经过改写后的操作简化（*Function.prototype.apply(func, obj, args*)）

    ```js
    const type = Reflect.apply(Object.prototype.tioString,something,[]);
    //const type = Object.prototype.toString.call(something);
    ```

- 返回值 —— 无限制

- 拦截操作
  - *proxy(...argumentList)*
  - *Function.prototype.apply(thisArg, argumentList)*
  - *Function.prototype.call(thisArg, ...argumentList)*
  - *Reflect.apply(target, thisArg, argumentList)*

- 参数 —— *apply(target, thisArg, argumentList)*
  - *target* —— 目标函数
  - *thisArg* —— 调用函数时的 *this*
  - *argumentList* —— 传入目标构造函数的参数列表

- 捕获器不变式 —— *target* 必须是一个函数



#### *constructor( )*

- 调用时机 —— 拦截 *new* 命令

- 反射 *API* 方法 —— *Reflect.constructor(target, args)*

  ```js
  function Person(name){
      this.name = name;
  }
  const instance = Reflec.constructor(Person,['张三'])；
  //const instance = new Person('张三')
  ```

- 返回值 —— 对象

- 拦截操作
  - *new Proxy(...argumentList)*
  - *Reflect.constructor(target, argumentList, newTarget)*
  
- 参数 —— *constructor(target, argumentList, newTarget)*
  - *target* —— 目标构造函数
  - *argumentList* —— 传入目标构造函数的参数列表
  - *newTarget* —— 最初被调用的构造函数
  
- 捕获器不变式 —— *target* 必须可以用作构造函数

- 基本使用

  ```js
  const proxyConstructor = new Proxy(function(){}, {
      constructor(target,args){
          console.log('new object!');
          return new target(...args);
      }
  });
  ```

  

  

