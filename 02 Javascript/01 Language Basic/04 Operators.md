## 一元运算符

只操作一个值的运算符叫做一元运算符

### 递减/递增运算符

- 前缀版 —— 变量的值会在语句被求值之前改变

  ```js
  let age = 29
  let anotherAge = --age + 2

  console.log(age) // 28
  console.log(anotherAge) // 30
  ```

- 前缀递增和前缀递减运算符在语句中的优先级是相等的，所以会从左到右依次求值

  ```js
  let num1 = 2
  let num2 = 20
  let num3 = --num1 + num2 // 21
  ```

- 后缀版 —— 不会改变语句执行的结果，在语句被求值后才发生

  ```js
  let num1 = 2
  let num2 = 20
  let num3 = num1-- + num2 // 22
  let num4 = num1 + num2 // 21
  ```

- 这四个运算符可以作用于任何值，不限于整数 —— 字符串、布尔值、浮点值，甚至是对象

  - 对于字符串 _String_

    - 如果是有效的数值形式，则转换为数值再应用改变 —— 变量类型 _String_ ➡ _Number_

      ```js
      let s1 = '2'
      s1++ // 数值3
      ```

    - 如果不是有效的数值形式，则将变量的值设置为 _NaN_ —— 变量类型 _String_ ➡ _Number_

      ```js
      let s2 = 'z'
      s2++ // NaN
      ```

  - 对于布尔值 _Boolean_

    - 如果是 _false_，则转换为 _0_ 再应用改变 —— 变量类型 _Boolean_ ➡ _Number_

      ```js
      let b = false
      b++ // 数值1
      ```

    - 如果是 _true_，则转换为 _1_ 再应用改变 —— 变量类型 _Boolean_ ➡ _Number_

  - 对于浮点值，正常加 _1_ 或减 _1_

    ```js
    let f = 1.1
    f-- // 数值0.10000000000000000009（浮点数不精确）
    ```

  - 如果是对象

    - 调用 _valueOf( )_ 方法取得可以操作的值，对得到的值应用上述规则

      ```js
      let o = {
        valueOf() {
          return -1
        },
      }
      o-- // -2
      ```

    - 如果是 _NaN_ 则调用 _toString( )_ 并再次应用其他规则

    - 变量类型 _Object_ ➡ _Number_

### 一元加/减

- 一元加 _+_ —— 放在变量前对数值没有任何影响

- 一元减 _-_ —— 放在变量前将数值变成负值

- 应用到非数值，则会执行与 _Number( )_ 转型函数一样的类型转换：

  - 布尔值 _false_ 和 _true_ 转换为 _0_ 和 _1_

  - 字符串根据特殊规则进行解析

  - 对象会调用他们的 _valueOf( )_ 和/或 _toString( )_ 方法以得到可以转换的值

    ```js
    let s1 = '2'
    let s2 = 'z'
    let s3 = '1.1'
    let b = false
    let f = 1.1
    let o = {
      valueOf() {
        return -1
      },
    }

    ;+s1 // 数值3
    ;+s2 // NaN
    ;+s3 // 数值1.1
    ;+b // 数值0
    ;+f // 还是数值1.1
    ;+o // 数值-1
    ```

## 位运算符

- _ECMAcript_ 中数值以 _IEEE 754 64_ 位格式存储，但位操作先操作 _32_ 位整数再将其转换为 _64_ 位

- ⭐ 特殊值 _NaN_ 和 _Infinity_ 会被位运算符视为 _0_

- 位运算符会将非数值变量使用 _Number( )_ 函数转换为数值在进行位操作

### 按位非 ~

- 按位非运算符用波浪号（_~_） 表示 —— 返回数值的一补数，最终效果是对数值取反并减 1

  ```js
  let num = 25 // ;
  let num1 = ~num // -26
  let num2 = -num - 1 // 26
  ```

- ⭐ 按位非的执行速度快于将数值取反减 1 —— 位操作在数值的底层表示上完成

### 按位与 &

按位与运算符用和号(_&_) 表示

| 第一个数值的位 | 第二个数值的位 | 结果 |
| :------------: | :------------: | :--: |
|      _1_       |      _1_       | _1_  |
|      _1_       |      _0_       | _0_  |
|      _0_       |      _0_       | _0_  |
|      _0_       |      _1_       | _0_  |

### 按位或 |

按位或运算符用管道符（_|_） 表示

| 第一个数值的位 | 第二个数值的位 | 结果 |
| :------------: | :------------: | :--: |
|      _1_       |      _1_       | _1_  |
|      _1_       |      _0_       | _1_  |
|      _0_       |      _0_       | _0_  |
|      _0_       |      _1_       | _1_  |

### 按位异或 ^

按位异或用脱字符（_^_ ) 表示

| 第一个数值的位 | 第二个数值的位 | 结果 |
| :------------: | :------------: | :--: |
|      _1_       |      _1_       | _0_  |
|      _1_       |      _0_       | _1_  |
|      _0_       |      _0_       | _0_  |
|      _0_       |      _1_       | _1_  |

### 左移 <<

- 左移运算符用两个小于号 _<<_ 表示 —— 按照指定的位数将数值的所有位向左移动

- 左移会以 _0_ 填充右端出现的空位

- 左移会保留操作数的符号

  ```js
  let oldValue = 2 // 二进制10
  let newValue = oldValue << 5 // 二进制1000000
  ```

### 有符号右移 >>

- 有符号右移运算符用两个大于号 _>>_ 表示 —— 将数值的所有 _32_ 位都向右移，同时保留符号

- _ECMAScript_ 会用**符号位的值**来填充右移后出现的空位

### 无符号右移 >>>

- 无符号右移运算符用三个大于号 _>>>_ 表示 —— 将数值的所有 _32_ 位都向右移

- 对于正数，无符号右移与有符号右移结果相同

- 对于负数，无符号右移运算符将负数的二进制表示当成正数的二进制表示来处理

## 布尔运算符

### 逻辑非 !

- 逻辑非操作由一个叹号 _!_ 表示 —— 先将操作数转换为 _Boolean_ 类型 → 取反

  |   操作数    | 返回值  |
  | :---------: | :-----: |
  |    对象     | _false_ |
  |  空字符串   | _true_  |
  | 非空字符串  | _false_ |
  |  数值 _0_   | _true_  |
  | 非 _0_ 数值 | _false_ |
  |   _null_    | _true_  |
  |    _NaN_    | _true_  |
  | _undefined_ | _true_  |

- 同时使用两个叹号 _!!_ 相当于调用了转型函数 _Boolean( )_ 函数

### 逻辑与 &&

- 逻辑与操作由两个和号 _&&_ 表示

  | 第一个数值的位 | 第二个数值的位 |  结果   |
  | :------------: | :------------: | :-----: |
  |     _true_     |     _true_     | _true_  |
  |     _true_     |    _false_     | _false_ |
  |    _false_     |     _true_     | _false_ |
  |    _false_     |    _false_     | _false_ |

- 逻辑与运算符可以用于任何类型的操作数

  - 操作数包含对象 _Object_

    - 如果第一个操作数是对象，则返回第二个操作数

      ```js
      const obj = { a: 1 }
      obj && 0 // 0
      obj && 1 // 1
      ```

    - 如果第二个操作数是对象，则只有第一个操作数求值为 _true_ 才会返回该对象

      ```js
      const obj = { a: 1 }
      0 && obj // 0
      1 && obj // {a: 1}
      ```

    - 如果两个操作数都是对象，则返回第二个操作数

      ```js
      const obj1 = { a: 1 }
      const obj2 = { a: 2 }

      obj1 && obj2 // {a: 2}
      obj2 && obj1 // {a: 1}
      ```

  - 如果有一个操作数是 _null_，则返回 _null_

  - 如果有一个操作数是 _NaN_，则返回 _NaN_

  - 如果有一个操作数是 _undefined_，则返回 _undefined_

- 逻辑与操作数是一种 **短路** 运算符 —— 如果第一个操作数决定了结果，那么永远不会对第二个操作数求值

  ```js
  let a = 1,
    b = 1
  true && a++ // a=2
  false && b++ // b=1
  ```

### 逻辑或 ||

- 逻辑或操作由两个管道符 _||_ 表示

  | 第一个数值的位 | 第二个数值的位 |  结果   |
  | :------------: | :------------: | :-----: |
  |     _true_     |     _true_     | _true_  |
  |     _true_     |    _false_     | _true_  |
  |    _false_     |     _true_     | _true_  |
  |    _false_     |    _false_     | _false_ |

- 逻辑或运算符可以用于任何类型的操作数

  - 如果第一个操作数是对象，则返回第一个操作数

    ```js
    const obj = { a: 1 }
    obj || 0 // {a: 1}
    obj || 1 // {a: 1}
    ```

  - 如果第一个操作数求值为 _true_，则返回第二个操作数

  - 如果两个操作数都是对象，则返回第一个操作数

    ```js
    const obj1 = { a: 1 }
    const obj2 = { a: 2 }

    obj1 || obj2 // {a: 1}
    obj2 || obj1 // {a: 2}
    ```

  - 如果两个操作数都是 _null_，则返回 _null_

    ```js
    null || null // null
    ```

  - 如果两个操作数都是 _NaN_，则返回 _NaN_

    ```js
    NaN || NaN // NaN
    ```

  - 如果两个操作数都是 _undefined_，则返回 _undefined_

    ```js
    undefined || undefined // undefined
    ```

- 逻辑或运算符是一种短路运算符 —— 如果第一个操作数求值为 _true_，那么第二个操作数就不会再被求值了

  ```js
  let a = 1,
    b = 1
  true || a++ // a=1
  false || b++ // b=2
  ```

## 乘性运算符

处理非数值时会包含一些自动的类型转换

### 乘法运算符

- 乘法运算符用一个星号 \* 表示

- 乘法运算符处理特殊值时有一些特殊的行为

  - 如果操作数都是数值，执行常规的乘法运算 —— 如果乘积无法表示，返回 _Infinity_ 或 _-Infinity_

  - 如果有任一操作数为 _NaN_ —— 返回 _NaN_

    ```js
    NaN * 1 // NaN
    ```

  - 如果有任一操作数为 _Infinity_

    - 如果是 _Infinity_ 乘以 _0_ —— 返回 _NaN_

      ```js
      Infinity * 0 // NaN
      ```

    - 如果是 _Infinity_ 乘以非 _0_ 的有限数 —— 根据第二个操作数的符号返回 _Infinity_ 或 _-Infinity_

      ```js
      Infinity * 1 // Infinity
      Infinity * -1 // -Infinity
      ```

    - 如果是 _Infinity_ 乘以 _Infinity_ —— 返回 _Infinity_

      ```js
      Infinity * Infinity // Infinity
      Infinity * -Infinity // -Infinity
      ;-Infinity * -Infinity // Infinity
      ```

  - 如果有不是数值的操作数，则先在后台用 _Number( )_ 转型为数值，再应用上述规则

### 除法运算符

- 除法运算符用一个斜杠 \ 表示

- 除法运算符再处理特殊值时也有一些特殊的行为

  - 如果操作数都是数值，执行常规的除法运算 —— 如果商无法表示，返回 _Infinity_ 或 -_Infinity_

  - 如果有任一操作数为 _NaN_ —— 返回 _NaN_

    ```js
    1 / NaN // NaN
    NaN / 1 // NaN
    ```

  - 如果有任一操作数为 _Infinity_

    - 如果是 _Infinity_ 除以 _Infinity_ —— 返回 _NaN_

      ```js
      Infinity / Infinity // NaN
      Infinity / -Infinity // NaN
      ;-Infinity / -Infinity // NaN
      ;-Infinity / Infinity // NaN
      ```

    - 如果是 _Infinity_ 除以任何数 —— 根据第二个操作数的符号返回 _Infinity_ 或 _-Infinity_

      ```js
      Infinity / 1 // Infinity
      Infinity / -1 // -Infinity
      ```

  - 如果除数为 _0_

    - 如果是 _0_ 除以 _0_ —— 返回 _NaN_

      ```js
      0 / 0 // NaN
      ```

    - 如果是非 _0_ 的有限值除以 _0_ —— 根据第一个操作数的符号返回 _Infinity_ 或 _-Infinity_

      ```js
      1 / 0 // Infinity
      ;-1 / 0 // -Infinity
      ```

  - 如果有不是数值的操作数，则现在后台用 _Number( )_ 转型为数值，再应用上述规则

### 取模运算符

- 取模（余数）运算符用一个百分比符号 _%_ 表示

- 取模运算符处理特殊值时有一些特殊的行为

  - 如果操作数都是数值，执行常规的除法运算，返回余数

    ```js
    1 % 2 // 1
    ```

  - 如果被除数是 _Infinity_ —— 返回 _NaN_

    ```js
    Infinity % 1 // NaN
    Infinity % Infinity // NaN
    ```

  - 如果被除数是有限值

    - 除数是 _0_ —— 返回 _NaN_

      ```js
      1 % 0 // NaN
      ```

    - 除数是无限值 —— 返回被除数

      ```js
      1 % Infinity // 1
      ```

  - 如果被除数是 _0_，除数不是 _0_ —— 返回 _0_

    ```js
    0 % 1 // 0
    ```

  - 如果有不是数值的操作数，则现在后台用*Number( )*转型为数值，再应用上述规则

## 指数运算符

- _ES7_ 新增了指数运算符，_Math.pow( )_ 有了自己的的运算符 \*\*

- 指数赋值运算符 _\*\*\=_

  ```js
  let squared = 3
  squared **= 2 // 9
  ```

## 加性运算符

### 加法运算符

如果两个操作数都是数值：

- 如果有任一操作数为 _NaN_，则返回 _NaN_

  ```js
  NaN + 1 // NaN
  ```

- 如果两个操作数都是 _Infinity_

  - _Infinity_ 加 _Infinity_ —— _Infinity_

    ```js
    Infinity + Infinity // Infinity
    ```

  - _-Infinity_ 加 _-Infinity —— -Infinity_

    ```js
    ;-Infinity + -Infinity // -Infinity
    ```

  - _Infinity_ 加 _-Infinity_ —— _NaN_

    ```js
    ;-Infinity + Infinity // NaN
    ```

- 如果两个操作数都是 _0_

  - _+0_ 加 _+0_ —— _+0_

    ```js
    ;+0 + +0 // +0
    ```

  - _-0_ 加 _-0_ —— _-0_

    ```js
    ;-0 + -0 // -0
    ```

  - _-0_ 加 _+0 —— +0_

    ```js
    ;-0 + +0 // +0
    ```

- 如果有一个操作数是字符串

  - 如果两个操作数都是字符串，则将第二个字符串拼接到第一个字符串后面

    ```js
    'hello' + 'world' // 'helloworld'
    ```

  - 如果只有一个操作数是字符串，则将另一个操作数转换为字符串，再将两个字符串拼接在一起

    ```js
    '' + 123 // '123'
    123 + '' // '123'
    ```

- 如果有一个操作数是对象、数值、布尔值，则调用他们的 _toStrting( )_ 方法获取字符串

  ```js
  '' + true // 'true'
  '' +
    {
      toString() {
        return true
      },
    }
  ;('true')
  ```

- 对于 _undefined_、_null_ —— 调用 _String( )_ 函数，分别获取 _"undefined"_ 和 _"null"_

  ```js
  '' + undefined // 'undefined'
  '' + null // 'null'
  ```

### 减法运算符

如果两个操作数都是数值：

- 如果有任一操作数为 _NaN_ —— 返回 _NaN_

  ```js
  NaN - 1 // NaN
  ```

- 如果两个操作数都是 _Infinity_

  - _Infinity_ 减 _Infinity_ —— _NaN_

    ```js
    Infinity - Infinity // NaN
    ```

  - _-Infinity_ 减 _-Infinity_ —— _NaN_

    ```js
    ;-Infinity - -Infinity // NaN
    ```

  - _Infinity_ 减 -_Infinity_ —— _Infinity_

    ```js
    Infinity - -Infinity // Infinity
    ```

  - -_Infinity_ 减 _Infinity_ —— -_Infinity_

    ```js
    ;-Infinity - Infinity // -Infinity
    ```

- 如果两个操作数都是 _0_

  - _+0_ 减 _+0_ —— _+0_

    ```js
    ;+0 - +0 // +0
    ```

  - _+0_ 减 _-0_ —— _-0_

    ```js
    ;+0 - -0 // -0
    ```

  - _-0_ 减 _-0_ —— _+0_

    ```js
    ;-0 - -0 // +0
    ```

- 如果有任一操作数是字符串、布尔值、_undefined_、_null_

  - 在后台使用 _Number( )_ 将其转换成数值，再根据前面的规则执行数学运算

    ```js
    1 - true // 0
    1 - false // 1
    1 - '1' // 0
    1 - null // 1
    1 - undefined // NaN
    ```

  - 如果转换结果是 _NaN_，则减法计算结果为 _NaN_

    ```js
    1 - undefined // NaN;
    1 - 'true' // NaN
    ```

- 如果有任一操作数是对象

  - 调用其 _valueOf( )_ 方法取得表示它的值

    ```js
    1 -
      {
        valueOf() {
          return 1
        },
      } // 0
    ```

  - 如果该值是 _NaN_，则减法计算结果为 _NaN_

    ```js
    1 -
      {
        valueOf() {
          return 'a'
        },
      } // NaN
    ```

  - 如果对象没有 _valueOf( )_ 方法，则调用 _toStrting( )_ 方法，然后再将字符串转换为数值

    ```js
    1 -
      {
        toString() {
          return '1'
        },
      } // 0
    1 -
      {
        toString() {
          return 'a'
        },
      } // NaN
    ```

## 关系运算符

大于 _>_、小于 _<_、小于等于 _<=_、大于等于 _>=_

- 如果操作数都是数值，则执行数值比较

- 如果操作数都是字符串，则逐个比较字符串中对应字符的编码

- 如果有任一操作数是数值，则将另一个操作数转换为数值，执行数值比较

- 如果有任一操作数是对象，则调用其 _valueOf( )_ 方法；如果对象没有 _valueOf( )_ 方法，则调用 _toStrting( )_ 方法

## 相等运算符

### 等于和不等于

- 符号

  - 等于运算符用两个等于号 _==_ 表示 —— 如果操作数相等，返回 _true_

  - 不等于运算符用叹号和等于号 _!=_ 表示 —— 如果操作数不相等，返回 _false_

- 类型相等

  - 值相等则返回 _true_

  - 特殊情况

    ```js
    NaN == NaN;// false
    +0 == -0;// false
    {} == {};// false —— 两个对象字面量分别属于两个不同的存储空间
    ```

- 类型不相等

  - _String == Number_ —— 将 _String_ → _Number_ 再进行比较

    ```js
    1 == '1' // true —— 转换成 1 == 1
    ```

  - _Boolean == Others_ —— 将 _Boolean_ → _Number_ 再进行比较

    ```js
    '1' == true // true —— 转换成 '1' == 1 再转换成 1 == 1
    '0' == false // true —— 转换成 '0' == 0 再转换成 0 == 0
    ```

  - _Null == Undefined_ —— _null_ 和 _undefined_ 均不可再转换为其他类型的值进行比较

    ```js
    null == undefined // true

    null == false // false
    undefined == 0 // false
    ```

  - _Object - Others_ —— 调用其 _valueOf( )_ 方法取得其原始值，再根据前面的规则进行比较

- 常见特殊情况

  | 表达式              | 结果    |
  | :------------------ | :------ |
  | _null == undefined_ | _true_  |
  | _undefined == 0_    | _false_ |
  | _null == 0_         | _false_ |
  | _5 == "5"_          | _true_  |
  | _5 == NaN_          | _false_ |
  | _"NaN" == NaN_      | _false_ |
  | _NaN == NaN_        | _false_ |
  | _NaN != NaN_        | _true_  |
  | _false == 0_        | _true_  |
  | _true == 1_         | _true_  |
  | _true == 2_         | _false_ |

### 全等于和不全等

- 符号

  - 全等于运算符用两个等于号 _==_ 表示 —— 只有在两个操作数不转换的前提下相等才返回 _true_

  - 不全等运算符用叹号和等于号 _!==_ 表示

- 与等于运算符的本质区别 —— == 允许在比较过程中进行强制类型转换，而 === 不允许

## 条件运算符

条件运算符是 _ECMAScript_ 中用途最为广泛的运算符之一

```js
varible = boolean_expression ? true_value : false_value
```

## 赋值运算符

- 使用等于号 _=_ 进行简单赋值

- 复合赋值运算符 —— 仅作为简写语法，并不会提升性能

  - 乘后赋值 \*\=\*\*

  - 除后赋值 _/=_

  - 取模后赋值 _%=_

  - 加后赋值 _+=_

  - 减后赋值 _-=_

  - 左移后赋值 _<<=_

  - 右移赋值 _>>=_

  - 无符号右移赋值 _>>>=_
