
# 变量

*ECMAScript* 变量是**松散类型**的 —— 变量可以用于保存任何类型的数据，每个变量只是特定时间点的一个特定值的名称，变量的值和数据类型在脚本生命周期内是可以改变的



## *var* 关键字

#### 声明作用域

- 使用 *var* 定义的变量会成为包含它的函数的局部变量

  ```js
  function test() {
      var message = 'hi'; //局部变量
  }
  test()
  console.log(message); //出错！
  ```

- 省略 *var* 操作符 —— 创建一个全局变量

  ```js
  function test(){
      message = 'hi'; //全局变量
  }
  test()
  console.log(message); //hi
  ```

- 在严格模式下

  - 对未声明的变量赋值，则会导致抛出 *ReferenceError*
  - 不允许将变量名定义为 *eval* 和 *arguments*



#### 声明提升

提升（*hoist*）—— 把所有变量声明都拉到函数作用域顶部

```js
function foo(){
    console.log(age);
    var age = 29;
}
foo();//undefined
```

*ECMAScript* 运行时把它看成等价于如下代码

```js
function foo(){
    var age;
    console.log(age);
    age = 29;
}
foo();//undefined
```





## *let* 声明

#### 作用域

*let* 与 *var* 最明显的区别是 ——

- *let* 声明的范围是块作用域

  ```js
  if(true){
      let age = 26;
      console.log(age);//26
  }
  console.log(age);//ReferenceError:age没有定义
  ```

-  *var* 声明的范围是函数作用域

  ```js
  if(true){
      var age = 26;
      console.log(age);//26
  }
  console.log(age);//26
  ```

- 块作用域是函数作用域的子集 —— 适用于 *var* 的作用域限制同样也适用于 *let*



#### 变量提升

*let* 与 *var* 的另一个重要的区别，就是 *let* 声明的变量不会在作用域中被提升

```js
//name会被提升
console.log(name);//undefined
var name = 'Matt';

//age不会被提升
console.log(age);//ReferenceError:age 没有定义
let age = 26;
```



#### 暂时性死区

- 解释 —— 只要块级作用域中存在 *let* 命令，则该 *let* 声明的变量就会绑定该区域，不受外部影响

  ```js
  var tmp = 123;
  if (true) {
    tmp = 'abc'; // ReferenceError
    let tmp;
  }
  ```

- 目的 —— 防止在变量声明前就是用这个变量，从而导致意外的错误

- 对于 *typeof* 操作符而言

```js
typeof x;//ReferenceError
let x;
```

- *typeof* 对于未被声明的变量返回 *undefined*

```js
typeof y; //"undefined"
```



#### 全局声明

在全局作用域

- *var* 声明的变量会成为 *window* 对象的属性

  ```js
  var name = 'Matt';
  console.log(window.name);//'Matt'
  ```

- *let* 声明的变量**不会**成为 *window* 对象的属性 —— 从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩

  ```js
  let age = 26;
  console.log(window.age);//undefined
  ```




#### 条件声明

- 在使用 *var* 声明变量时，由于声明会提升，*JavaScript* 引擎会自动将多余的声明在作用于顶部合并为一个声明

- 因为 *let* 的作用域是块，所以不可能检查前面是否已经使用 *let* 声明过同名变量，同时也就不可能在没有声明的情况下声明它



#### *for* 循环中的变量声明

- 使用 *var* 定义 *for* 循环的迭代变量

  - 迭代变量会渗透到循环体外部

    ```js
    for(var i = 0; i < 5; ++i){
        //循环逻辑
    }
    console.log(i);//5
    ```

  - 迭代变量被**宏任务代码**（例如 *setTimeout*）使用造成意外的结果

    ```js
    for(var i = 0; i < 5; ++i){
        setTimeout(() => console.log(i), 0)
    }
    //会输出5、5、5、5、5
    ```

- 使用 *let* 定义 *for* 循环的迭代变量

  - 迭代变量不会溢出 —— 迭代变量的作用域仅限于 *for* 循环块内部

    ```js
    for(let i = 0; i < 5; ++i){
        //循环逻辑
    }
    console.log(i);//ReferenceError:i没有定义
    ```

  - 使用 *let* 声明迭代变量时，每次迭代都会声明一个**独立**变量实例

    ```js
    for(let i = 0; i < 5; ++i){
        setTimeout(() => console.log(i),0)
    }
    //会输出0、1、2、3、4
    ```

- *for* 循环还有一个特别之处

  - 设置循环变量的部分是一个父作用域
  - 循环体内部是一个单独的子作用域

  ```js
  for(let i = 0; i < 3; i++){
      let i = 'abc';
      console.log(i);
  }
  //abc
  //abc
  //abc
  ```

  

## *const* 声明

- *const* 声明变量时必须同时初始化变量

  ```js
  const a;//Uncaught SyntaxError
  ```

- 尝试修改 *const* 声明的变量会导致运行时的错误

  ```js
  const ae = 26;
  a = 26;//Uncaught TypeError
  ```

- *const* 不允许重复声明

  ```js
  const name = 'Matt';
  const name = 'Nicholas';//Uncaught SyntaxError
  ```

- *const* 属于块作用域

  ```js
  const name = 'outer';
  if(true){
      const name = 'inner';
  }
  console.log(name);//outer
  ```

- *const* 声明的限制只适用于它**指向的变量的引用** —— 如果 *const* 变量引用的是一个对象，那么修改这个对象内部的属性并不违反 *const* 的限制

  ```js
  const person = {};
  person.name = 'Matt';//{name: 'Matt'}
  ```

- 不能用 *const* 声明迭代变量，因为迭代变量会自增；不过用 *const* 声明一个不会被修改的 *for* 循环变量也是可以的

  ```js
  let i = 0;
  for(const j = 7; i < 5; ++i){
      console.log(j);
  }
  //7、7、7、7、7
  ```

  

## 声明风格及最佳实践

- 不使用 *var* —— 只使用 *let* 和 *const* 有助于提升代码质量，因为变量有了明确的作用域、声明位置，以及不变的值

- *const* 优先，*let* 次之
  - 使用 *const* 声明可以让浏览器运行强制保持变量不变
  - 可以让静态代码分析工具提前发现不合法的赋值操作
  - 只在提前知道未来会有修改时在使用 *let*



# 原始值与引用值

*ECMAScript* 变量包含两种不同类型的数据：

- 原始值 —— 保存原始值的变量是**按值访问**
- 引用值 —— 保存引用值的变量是**按引用访问**



####  动态属性

- 对于引用值而言，可以随时添加、修改和删除其属性和方法

  ```js
  let person = new Object();
  person.name = "A";//A
  ```

- 原始值不能有属性，但给原始值添加属性不会报错

  ```js
  let name = "A";
  name.age = 27;//undefined
  ```

- 原始类型的初始化

  - 原始字面量形式

  ```js
  let name = "Mike";
  name.age = 22;//undefined
  typeof name;///string
  ```

  - *new* 关键字 —— 会创建 *Object* 类型实例，但行为类似原始值

  ```js
  let name = new String("Mike");
  name.age = 22;//22
  typeof name;///object
  ```

  

#### 复制值

- 把原始值从一个变量赋给另一个变量 —— 两个变量完全独立，互不干扰

  ```js
  let num1 = 1;
  let num2 = num1;
  ```

- 把引用值从一个变量赋给另一个变量 —— **复制指针**，指向内存中同一个对象



#### 传递参数

*ECMAScript* 中所有函数的参数都是**按值传递**

- 按值传递参数，值会被复制到另一个**局部变量**

  ```js
  function addTen(num){
      num += 10;
      return num;
  }
  let count = 10;
  let res = addTen(count);
  console.log(count);//10;
  console.log(res);//20
  ```

- 按引用传递参数 —— 传入对象的引用被作为值传给参数

  ```js
  function setName(obj){
      obj.name = "Mike";
  }
  const person = new Object();
  setName(person);
  console.log(person);//Mike
  ```

- 如果在函数内部重写传入的对象
  - ⭐*obj = new Object( )* 的效果为将函数参数 *obj* 赋予新创建对象的引用，**函数执行结束时即被销毁**
  
  ```js
  function setName(obj){
      obj.name = "Mike";
      obj = new Object();
      obj.name = "John";
  }
  const person = new Object();
  setName(person);
  console.log(person);//Mike
  ```

- 经典题目

  ```js
  const obj = {name: "mike"};
  const str = "str";
  const arr = [1,2,3];
  
  function doSomething(obj,str,arr){
      obj.name = 'Mike';
      obj = {name: "mike"};
  
      str = "string";
  
      arr.push(4);
      arr = [1,2,3];
  }
  
  doSomething(obj,str,arr);
  console.log(obj);//{name: "Mike"}
  console.log(str);//"str"
  console.log(arr);//[1,2,3,4]
  ```

  

#### 确定类型

- *typeof* 操作符
  - 判断一个变量是否为字符串、数值、布尔值或 *undefined* 的最好方式，即**判断原始类型**
  - 对 *null* 或对象使用 *typeof* 操作符返回 *”object“*

- *instanceof* 操作符
  - 用于判断一个值是否为某一类型的对象
  
  - 用 *instanceof* 操作符检测原始值会返回 *false*
  
  - 实现 *instanceof* 
  
    ```js
    function myInstanceOf(left,right){
        let leftProto = Object.getPrototypeOf(left);
        let rightProto = right.prototype;
        
        while(true){
            if(!leftProto){
                return false;
            }
            if(leftProto === rightProto){
                return true;
            }
            leftProto = Object.getPrototypeOf(leftProto);
        }
    }
    ```
  
    



# 执行上下文与作用域

变量或函数的上下文决定了它们可以访问哪些数据，以及它们的行为

- 全局上下文
  - 最外层的上下文，也是作用域链的最后一个变量对象
  - 在浏览器中为 *window* 对象，通过 *var* 定义的全局变量和函数会成为 *window* 对象的属性和方法 
- 内部上下文可以通过作用域链访问外部上下文的一切，但外部上下文无法访问内部上下文中的任何东西



#### 作用域链增强

- *with* 语句 —— 会向作用域链前端添加指定的对象
- *try/catch* 中的 *catch* 块 —— 创建新的变量对象

这些语句会**临时**在作用域链前端添加一个上下文，**在代码执行后会被删除**



#### 变量声明

- *var* —— 函数作用域声明
  - 自动添加到最接近的上下文
  - 未经声明就初始化的变量会自动添加到全局上下文
- *let* —— 块级作用域声明
  - 重复的 let 声明会报错
- *const* —— 常量声明



