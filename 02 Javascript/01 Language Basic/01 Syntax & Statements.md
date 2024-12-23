# 语法

## 区分大小写

_ECMA_ 中一切都区分大小写，无论是变量、函数还是操作符

- `typeof` 作为关键字不能作为变量名 or 函数名，而 `Typeof` 是有效的变量名 or 函数名

  ```js
  const typeof = 'typeof'
  // caught SyntaxError: Unexpected token 'typeof'

  const Typeof = 'Typeof'
  // 完全OK
  ```

## 标识符

所谓标识符，就是变量、函数或函数参数的名称

- 第一个字符**必须是**一个字母、下划线( `_` )或美元符号( `$` )

  ```js
  const a = 'a'
  const _ = '_'
  const $ = '$'
  // 完全OK

  const 1 = '1'
  // caught SyntaxError: Unexpected number
  ```

- 剩下的其他字符可以是字母、下划线、美元符号或数字

- 标识符中的字母也可以是 `扩展ASCⅡ` 和 `Unicode` 中的字母字符

- 关键字、保留字、`true`、`false`、`null` 不能作为标识符

  ```js
  const break = 'break' // Uncaught SyntaxError: Unexpected token   'break'

  const enum = 'enum' // caught SyntaxError: Unexpected reserved word

  const true = 'true' //  Uncaught SyntaxError: Unexpected token 'true'

  const false = 'false' //  Uncaught SyntaxError: Unexpected token  'false'

  const null = 'null' // Uncaught SyntaxError: Unexpected token 'null'
  ```

**最佳实践** —— _ECMAScript_ 标识符使用**驼峰大小写形式**，即第一个单词的首字母小写，后面每个单词的首字符大写

## 注释

- 单行注释

  ```js
  // 单行注释
  ```

- 块/多行注释

  ```js
  /*
  多行注释
    */
  ```

## 严格模式

- 要对整个脚本启用严格模式，在脚本开头加上一行 `"use strict"`

  ```js
  'use strict'
  ```

- 可以**单独指定**一个函数在严格模式下执行，只要把 `"use strict"` 放到函数体开头即可

  ```js
  function doSomething() {
    'use strict'
    //函数体
  }
  ```

## 关键字与保留字

关键字有特殊用途，保留的关键字不能用作标识符或属性名

|            |            |              |          |
| :--------- | :--------- | :----------- | :------- |
| _break_    | _do_       | _in_         | _typeof_ |
| _case_     | _else_     | _instanceof_ | _var_    |
| _catch_    | _export_   | _new_        | _void_   |
| _class_    | _extends_  | _return_     | _while_  |
| _const_    | _finally_  | _super_      | _with_   |
| _continue_ | _for_      | _switch_     |          |
| _debugger_ | _function_ | _this_       |          |
| _default_  | _if_       | _throw_      |          |
| _delete_   | _import_   | _try_        |          |

规范中也描述了一组**未来的保留字**，同样不能用作标识符或属性名，他们是保留给未来做关键字用的

# 语句

_ECMAScript_ 语句以分号结尾，加分号有助于在某些情况下提升性能，因为解析器会尝试在合适的位置上不上分好以纠正语法错误

## _if_ 语句

_if_ 语句是使用最频繁的语句之一

- 条件 (_condition_) 可以是任何表达式，并且求值结果不一定是布尔值

- 隐式类型转换 —— _ECMAScript_ 会自动调用 _Boolean( )_ 函数将 _condition_ 表达式的值转换为布尔值

  ```js
  if(condition) statement1 else statement2
  ```

## _do-while_ 语句

_do-while_ 语句是一种 **后测试** 循环语句

- 循环体中的代码执行后才会对退出的条件进行求值

- 适用场景 —— **循环体内代码在退出前至少要执行一次**

  ```js
  do {
    statement
  } while (expression)
  ```

## _while_ 语句

_while_ 语句是一种 **先测试** 循环语句

- **先检测退出条件**，再执行循环体中的代码执行

- 循环体内的代码有可能不会执行

  ```js
  while (expression) statement
  ```

## _for_ 语句

_for_ 语句是**先测试**循环语句

- _initialization_ —— 进入循环之前的初始化代码

- _expression_ —— 退出条件

- _post-loop-expression_ —— 循环执行后要执行的表达式

  ```js
  for (initialization; expression; post - loop - expression) statement
  ```

## _for-in_ 语句

_for-in_ 语句是一种严格的迭代语句，用于枚举对象中的 **非符号键属性**

- _ECMAScript_ 中对象的属性是**无序**的，因此 _for-in_ 语句不保证顺序

- 如果 _for-in_ 循环要迭代的变量是 _null_ 或 _undefined_ —— 则不执行循环体

  ```js
  for (property in expression) statement
  ```

## _for-of_ 语句

_for-of_ 语句是一种严格的迭代语句，用于遍历**可迭代对象**的元素

- 目标可迭代 —— 如果尝试迭代的变量**不支持迭代**，则 _for-of_ 语句会抛出错误

- 迭代顺序 —— 按照可迭代对象的 _next( )_ 方法产生值的顺序迭代元素

  ```js
  for (property of expression) statement
  ```

## 标签语句

标签语句用于给语句加标签

```js
label: statment
```

标签语句最典型的应用场景是嵌套循环

## _break_ 和 _continue_ 语句

_break_ 和 _continue_ 语句为循环执行代码提供了更严格的控制手段

- _break_ 语句用于立即退出循环，强行执行循环后的下一条语句

  ```js
  let num = 0
  for (let i = 0; i < 10; i++) {
    if (i % 5 === 0) {
      break
    }
    num++
  }
  console.log(num) //4
  ```

- _continue_ 语句也用于立即退出循环，但会再次从循环顶部开始执行

  ```js
  let num = 0
  for (let i = 0; i < 10; i++) {
    if (i % 5 === 0) {
      continue
    }
    num++
  }
  console.log(num) //8
  ```

- _break_ 和 _continue_ 语句都可以与标签语句一起使用，返回代码中特定的位置

  ```js
  let num1 = 0
  outermost1:
  for (let i = 9; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (i === 5 && j === 5) {
        break outermost
        // 同时退出内部循环（使用变量j）和外部循环（使用变量i）
      }
      num1++
    }
  }

  let num2 = 0
  outermost:
  for (let i = 9; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (i === 5 && j === 5) {
        continue outermost
        // 当i和j都等于5时，会执行continue，跳到外部循环继续执行，从而导致内部循环少执行5次
      }
      num++
    }
  }
  ```

## _with_ 语句

- 用途 —— 将代码作用域设置为特定的对象

  ```js
  with (expression) statement
  ```

- 使用场景 —— 针对一个对象反复操作

  ```js
  with (location) {
    let qs = search.substring(1)
    let hostName = hostname
    let url = href
  }
  ```

- 严格模式下不允许使用 _with_ 语句

## _switch_ 语句

_switch_ 语句是与 _if_ 语句紧密相关的一种流控制语句

- 条件/分支 _case_ —— 如果表达式等于后面的值，则执行下面的语句

- 关键字 _break_ —— 强制代码台退出 switch 语句（如果没有 break，则代码会继续匹配下一个条件）

- 关键字 _default_ —— 用于在任何条件都没有满足时指定默认执行的语句，相当于 _else_

  ```js
  switch (expression) {
    case value1:
      statement1
      break
    case value2:
      statement2
      break
    case value3:
      statement3
      break
    default:
      statement
  }
  ```

_ECMAScript_ 为 _switch_ 语句赋予了一些独有的特性

- _switch_ 语句可以用于所有数据类型

- 条件的值可以是变量或者表达式

- ⭐ _case_ 中比较每个条件的值时会使用 **全等操作符 _===_**，不会强制转换数据类型

  ```js
  switch ("hello world"){
      case "hello"+"world":
        console.log("Greeting was found.");
        break;
      case "goodbye"
        console.log("Closing was found.");
        break;
      default:
        console.log("Unexpected message was found.");
        break;
  }
  ```
  