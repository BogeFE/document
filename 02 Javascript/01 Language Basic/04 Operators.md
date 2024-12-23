## 一元运算符

只操作一个值的运算符叫做一元运算符



#### 递减/递增运算符

- 前缀版 —— 变量的值会在语句被求值之前改变

  ```js
  let age = 29;
  let anotherAge = --age + 2;
  
  console.log(age);//28
  console.log(anotherAge);//30
  ```

- 前缀递增和前缀递减运算符在语句中的优先级是相等的，所以会从左到右依次求值

  ```js
  let num1 = 2;
  let num2 = 20;
  let num3 = --num1 + num2;//21
  ```

- 后缀版 —— 不会改变语句执行的结果，在语句被求值后才发生

  ```js
  let num1 = 2;
  let num2 = 20;
  let num3 = num1-- + num2;//22
  let num4 = num1 + num2;//21
  ```

- 这四个运算符可以作用于任何值，不限于整数 —— 字符串、布尔值、浮点值，甚至是对象

  - 对于字符串 *String*

    - 如果是有效的数值形式，则转换为数值再应用改变 —— 变量类型 *String* ➡ *Number*

      ```js
      let s1 = "2";
      s1++;//数值3
      ```

    - 如果不是有效的数值形式，则将变量的值设置为 *NaN* —— 变量类型 *String* ➡ *Number*

      ```js
      let s2 = "z";
      s2++;//NaN
      ```


  - 对于布尔值 *Boolean*

    - 如果是 *false*，则转换为 *0* 再应用改变 —— 变量类型 *Boolean* ➡ *Number*

      ```js
      let b = false;
      b++;//数值1
      ```

    - 如果是 *true*，则转换为 *1* 再应用改变 —— 变量类型 *Boolean* ➡ *Number*


  - 对于浮点值，正常加 *1* 或减 *1*

    ```js
    let f = 1.1;
    f--;//数值0.10000000000000000009（浮点数不精确）
    ```

  - 如果是对象
    - 调用 *valueOf( )* 方法取得可以操作的值，对得到的值应用上述规则
    
      ```js
      let o = {
          valueOf(){
              return -1;
          }
      };
      o--;//-2
      ```
    
    - 如果是 *NaN* 则调用 *toString( )* 并再次应用其他规则
    
    - 变量类型 *Object* ➡ *Number*




#### 一元加/减

- 一元加 *+* —— 放在变量前对数值没有任何影响
- 一元减 *-* —— 放在变量前将数值变成负值

- 应用到非数值，则会执行与 *Number( )* 转型函数一样的类型转换：

  - 布尔值 *false* 和 *true* 转换为 *0* 和 *1*

  - 字符串根据特殊规则进行解析

  - 对象会调用他们的 *valueOf( )* 和/或 *toString( )* 方法以得到可以转换的值

  ```js
  let s1 = "2";
  let s2 = "z";
  let s3 = "1.1"
  let b = false;
  let f = 1.1;
  let o ={
      valueOf(){
          return -1;
      }
  };
  
  +s1;//数值3
  +s2;//NaN
  +s3;//数值1.1
  +b;//数值0
  +f;//还是数值1.1
  +o;//数值-1
  ```

  

## 位运算符

- *ECMAcript* 中数值以 *IEEE 754 64* 位格式存储，但位操作先操作 *32* 位整数再将其转换为 *64* 位

- ⭐特殊值 *NaN* 和 *Infinity* 会被位运算符视为 *0*
- 位运算符会将非数值变量使用 *Number( )* 函数转换为数值在进行位操作



#### 按位非

- 按位非运算符用波浪号（*~*） 表示 —— 返回数值的一补数，最终效果是对数值取反并减1

  ```js
  let num = 25;//;
  let num1 = ~num;//-26
  let num2 = -num - 1;//26
  ```

- ⭐按位非的执行速度快于将数值取反减 1 —— 位操作在数值的底层表示上完成



#### 按位与

按位与运算符用和号(*&*) 表示

| 第一个数值的位 | 第二个数值的位 | 结果 |
| :------------: | :------------: | :--: |
|      *1*       |      *1*       | *1*  |
|      *1*       |      *0*       | *0*  |
|      *0*       |      *0*       | *0*  |
|      *0*       |      *1*       | *0*  |



#### 按位或

按位或运算符用管道符（*|*） 表示

| 第一个数值的位 | 第二个数值的位 | 结果 |
| :------------: | :------------: | :--: |
|      *1*       |      *1*       | *1*  |
|      *1*       |      *0*       | *1*  |
|      *0*       |      *0*       | *0*  |
|      *0*       |      *1*       | *1*  |



#### 按位异或

按位异或用脱字符（*^* ) 表示

| 第一个数值的位 | 第二个数值的位 | 结果 |
| :------------: | :------------: | :--: |
|      *1*       |      *1*       | *0*  |
|      *1*       |      *0*       | *1*  |
|      *0*       |      *0*       | *0*  |
|      *0*       |      *1*       | *1*  |



#### 左移

- 左移运算符用两个小于号 *<<* 表示 —— 按照指定的位数将数值的所有位向左移动

- 左移会以 *0* 填充右端出现的空位

- 左移会保留操作数的符号

```js
let oldValue = 2;//二进制10
let newValue = oldValue<<5;//二进制1000000
```



#### 有符号右移

- 有符号右移运算符用两个大于号 *>>* 表示 —— 将数值的所有 *32* 位都向右移，同时保留符号

- *ECMAScript* 会用**符号位的值**来填充右移后出现的空位



#### 无符号右移

- 无符号右移运算符用三个大于号 *>>>* 表示 —— 将数值的所有 *32* 位都向右移

- 对于正数，无符号右移与有符号右移结果相同
- 对于负数，无符号右移运算符将负数的二进制表示当成正数的二进制表示来处理





## 布尔运算符

#### 逻辑非

- 逻辑非操作由一个叹号 *!* 表示 —— 先将操作数转换为 *Boolean* 类型 → 取反

|   操作数    | 返回值  |
| :---------: | :-----: |
|    对象     | *false* |
|  空字符串   | *true*  |
| 非空字符串  | *false* |
|  数值 *0*   | *true*  |
| 非 *0* 数值 | *false* |
|   *null*    | *true*  |
|    *NaN*    | *true*  |
| *undefined* | *true*  |

- 同时使用两个叹号 *!!* 相当于调用了转型函数 *Boolean( )* 函数



#### 逻辑与

- 逻辑与操作由两个和号 *&&* 表示

| 第一个数值的位 | 第二个数值的位 |  结果   |
| :------------: | :------------: | :-----: |
|     *true*     |     *true*     | *true*  |
|     *true*     |    *false*     | *false* |
|    *false*     |     *true*     | *false* |
|    *false*     |    *false*     | *false* |

- 逻辑与运算符可以用于任何类型的操作数

  - 操作数包含对象 *Object*

    - 如果第一个操作数是对象，则返回第二个操作数

      ```js
      const obj = {a: 1};
      obj && 0;//0
      obj && 1;//1
      ```

    - 如果第二个操作数是对象，则只有第一个操作数求值为 *true* 才会返回该对象

      ```js
      const obj = {a: 1};
      0 && obj;//0
      1 && obj;//{a: 1}
      ```

    - 如果两个操作数都是对象，则返回第二个操作数

      ```js
      const obj1 = {a:1};
      const obj2 = {a:2};
      
      obj1 && obj2;//{a: 2}
      obj2 && obj1;//{a: 1}
      ```


  - 如果有一个操作数是 *null*，则返回 *null*

  - 如果有一个操作数是 *NaN*，则返回 *NaN*

  - 如果有一个操作数是 *undefined*，则返回 *undefined*


- 逻辑与操作数是一种**短路**运算符 —— 如果第一个操作数决定了结果，那么永远不会对第二个操作数求值

  ```js
  let a = 1, b = 1;
  true && a++;//a=2
  false && b++;;//b=1
  ```

  

#### 逻辑或

- 逻辑或操作由两个管道符 *||* 表示

| 第一个数值的位 | 第二个数值的位 |  结果   |
| :------------: | :------------: | :-----: |
|     *true*     |     *true*     | *true*  |
|     *true*     |    *false*     | *true*  |
|    *false*     |     *true*     | *true*  |
|    *false*     |    *false*     | *false* |

- 逻辑或运算符可以用于任何类型的操作数

  - 如果第一个操作数是对象，则返回第一个操作数

    ```js
    const obj = {a: 1};
    obj || 0;//{a: 1}
    obj || 1;//{a: 1}
    ```

  - 如果第一个操作数求值为 *true*，则返回第二个操作数

  - 如果两个操作数都是对象，则返回第一个操作数

    ```js
    const obj1 = {a:1};
    const obj2 = {a:2};
    
    obj1 || obj2;//{a: 1}
    obj2 || obj1;//{a: 2}
    ```

  - 如果两个操作数都是 *null*，则返回 *null*

    ```js
    null || null;//null
    ```

  - 如果两个操作数都是 *NaN*，则返回 *NaN*

    ```js
    NaN || NaN;//NaN
    ```

  - 如果两个操作数都是 *undefined*，则返回 *undefined*

    ```js
    undefined || undefined;//undefined
    ```


- 逻辑或运算符是一种短路运算符 —— 如果第一个操作数求值为 *true*，那么第二个操作数就不会再被求值了

  ```js
  let a = 1, b = 1;
  true || a++;//a=1
  false || b++;;//b=2
  ```



## 乘性运算符

处理非数值时会包含一些自动的类型转换



#### 乘法运算符

- 乘法运算符用一个星号 *\** 表示

- 乘法运算符处理特殊值时有一些特殊的行为

  - 如果操作数都是数值，执行常规的乘法运算 —— 如果乘积无法表示，返回 *Infinity* 或 *-Infinity*

  - 如果有任一操作数为 *NaN* —— 返回 *NaN*

    ```js
    NaN * 1;//NaN
    ```

  - 如果有任一操作数为 *Infinity*

    - 如果是 *Infinity* 乘以 *0* —— 返回 *NaN*

      ```js
      Infinity * 0;//NaN
      ```

    - 如果是 *Infinity* 乘以非 *0* 的有限数 —— 根据第二个操作数的符号返回 *Infinity* 或 *-Infinity*

      ```js
      Infinity * 1;//Infinity
      Infinity * -1;//-Infinity
      ```

    - 如果是 *Infinity* 乘以 *Infinity* —— 返回 *Infinity*

      ```js
      Infinity * Infinity;//Infinity
      Infinity * -Infinity;//-Infinity
      -Infinity * -Infinity;//Infinity
      ```


  - 如果有不是数值的操作数，则先在后台用 *Number( )* 转型为数值，再应用上述规则




#### 除法运算符

- 除法运算符用一个斜杠 */*  表示

- 除法运算符再处理特殊值时也有一些特殊的行为

  - 如果操作数都是数值，执行常规的除法运算 —— 如果商无法表示，返回 *Infinity* 或 -*Infinity*

  - 如果有任一操作数为 *NaN* —— 返回 *NaN*

    ```js
    1 / NaN;//NaN
    NaN / 1;//NaN
    ```

  - 如果有任一操作数为 *Infinity*

    - 如果是 *Infinity* 除以 *Infinity* —— 返回 *NaN*

      ```js
      Infinity / Infinity;//NaN
      Infinity / -Infinity;//NaN
      -Infinity / -Infinity;//NaN
      -Infinity / Infinity;//NaN
      ```

    - 如果是 *Infinity* 除以任何数 —— 根据第二个操作数的符号返回 *Infinity* 或 *-Infinity*

      ```js
      Infinity / 1;//Infinity
      Infinity / -1;//-Infinity
      ```


  - 如果除数为 *0*

    - 如果是 *0* 除以 *0* —— 返回 *NaN*

      ```js
      0 / 0;//NaN
      ```

    - 如果是非 *0* 的有限值除以 *0* —— 根据第一个操作数的符号返回 *Infinity* 或 *-Infinity*

      ```js
      1 / 0;//Infinity
      -1 / 0;//-Infinity
      ```


  - 如果有不是数值的操作数，则现在后台用 *Number( )* 转型为数值，再应用上述规则



#### 取模运算符

- 取模（余数）运算符用一个百分比符号 *%* 表示

- 取模运算符处理特殊值时有一些特殊的行为

  - 如果操作数都是数值，执行常规的除法运算，返回余数

    ```js
    1 % 2;//1
    ```

  - 如果被除数是 *Infinity* —— 返回 *NaN*

    ```js
    Infinity % 1;//NaN
    Infinity % Infinity;//NaN
    ```

  - 如果被除数是有限值

    - 除数是 *0* —— 返回 *NaN*

      ```js
      1 % 0;//NaN
      ```

    - 除数是无限值 —— 返回被除数

      ```js
      1 % Infinity;//1
      ```


  - 如果被除数是 *0*，除数不是 *0* —— 返回 *0*

    ```js
    0 % 1;//0
    ```

  - 如果有不是数值的操作数，则现在后台用*Number( )*转型为数值，再应用上述规则






## 指数运算符

- *ES7* 新增了指数运算符，*Math.pow( )* 有了自己的的运算符 *\*\**

- 指数赋值运算符 *\*\*\=*

  ```js
  let squared = 3;
  squared **= 2;//9
  ```



## 加性运算符

#### 加法运算符

如果两个操作数都是数值：

- 如果有任一操作数为 *NaN*，则返回 *NaN*

  ```js
  NaN + 1;//NaN
  ```

- 如果两个操作数都是 *Infinity* 

  - *Infinity* 加 *Infinity* —— *Infinity*

    ```js
    Infinity + Infinity;//Infinity
    ```

  - *-Infinity* 加 *-Infinity —— -Infinity*

    ```js
    -Infinity + -Infinity;//-Infinity
    ```

  - *Infinity* 加 *-Infinity* —— *NaN*

    ```js
    -Infinity + Infinity;//NaN
    ```

- 如果两个操作数都是 *0*

  - *+0* 加 *+0* —— *+0*

    ```js
    +0 + +0;//+0
    ```

  - *-0* 加 *-0* —— *-0*

    ```js
    -0 + -0;//-0
    ```

  - *-0* 加 *+0 —— +0*

    ```js
    -0 + +0;//+0
    ```

- 如果有一个操作数是字符串

  - 如果两个操作数都是字符串，则将第二个字符串拼接到第一个字符串后面

    ```js
    "hello" + "world";//'helloworld'
    ```

  - 如果只有一个操作数是字符串，则将另一个操作数转换为字符串，再将两个字符串拼接在一起

    ```js
    "" + 123;//'123'
    123 + "";//'123'
    ```


- 如果有一个操作数是对象、数值、布尔值，则调用他们的 *toStrting( )* 方法获取字符串

  ```js
  "" + true;//'true'
  "" + {toString(){return true}};'true'
  ```

- 对于 *undefined*、*null* —— 调用 *String( )* 函数，分别获取 *"undefined"* 和 *"null"*

  ```js
  "" + undefined;//'undefined'
  "" + null;//'null'
  ```

  



#### 减法运算符

如果两个操作数都是数值：

- 如果有任一操作数为 *NaN* —— 返回 *NaN*

  ```js
  NaN - 1;//NaN
  ```

- 如果两个操作数都是 *Infinity* 

  - *Infinity* 减 *Infinity* —— *NaN*

    ```js
    Infinity - Infinity;//NaN
    ```

  - *-Infinity* 减 *-Infinity* —— *NaN*

    ```js
    -Infinity - -Infinity;//NaN
    ```

  - *Infinity* 减 -*Infinity* —— *Infinity*

    ```js
    Infinity - -Infinity;//Infinity
    ```

  - -*Infinity* 减 *Infinity* —— -*Infinity*

    ```js
    -Infinity - Infinity;//-Infinity
    ```

- 如果两个操作数都是 *0*

  - *+0* 减 *+0* —— *+0*

    ```js
    +0 - +0;//+0
    ```

  - *+0* 减 *-0* —— *-0*

    ```js
    +0 - -0;//-0
    ```

  - *-0* 减 *-0* —— *+0*

    ```js
    -0 - -0;//+0
    ```

- 如果有任一操作数是字符串、布尔值、*undefined*、*null*

  - 在后台使用 *Number( )* 将其转换成数值，再根据前面的规则执行数学运算

    ```js
    1 - true;//0
    1 - false;//1
    1 - "1";//0
    1 - null;//1
    1 - undefined;//NaN
    ```

  - 如果转换结果是 *NaN*，则减法计算结果为 *NaN*

    ```js
    1 - undefined;//NaN;
    1 - "true";//NaN
    ```


- 如果有任一操作数是对象

  - 调用其 *valueOf( )* 方法取得表示它的值

    ```js
    1 - {valueOf(){return 1}};//0
    ```

  - 如果该值是 *NaN*，则减法计算结果为 *NaN*

    ```js
    1 - {valueOf(){return "a"}};//NaN
    ```

  - 如果对象没有 *valueOf( )* 方法，则调用 *toStrting( )* 方法，然后再将字符串转换为数值

    ```js
    1 - {toString(){return "1"}};//0
    1 - {toString(){return "a"}};//NaN
    ```




## 关系运算符

大于 *>*、小于 *<*、小于等于*<=*、大于等于*>=*

- 如果操作数都是数值，则执行数值比较
- 如果操作数都是字符串，则逐个比较字符串中对应字符的编码
- 如果有任一操作数是数值，则将另一个操作数转换为数值，执行数值比较
- 如果有任一操作数是对象，则调用其 *valueOf( )* 方法；如果对象没有 *valueOf( )* 方法，则调用 *toStrting( )* 方法



## 相等运算符

#### 等于和不等于

- 符号

  - 等于运算符用两个等于号 *==* 表示 —— 如果操作数相等，返回 *true*

  - 不等于运算符用叹号和等于号 *!=* 表示 —— 如果操作数不相等，返回 *false*


- 类型相等

  - 值相等则返回 *true*

  - 特殊情况

    ```js
    NaN == NaN;//false
    +0 == -0;//false
    {} == {};//false —— 两个对象字面量分别属于两个不同的存储空间
    ```

- 类型不相等

  - *String == Number* —— 将 *String* → *Number* 再进行比较

    ```js
    1 == '1';//true —— 转换成 1 == 1
    ```

  - *Boolean == Others* —— 将 *Boolean* → *Number* 再进行比较

    ```js
    '1' == true;//true —— 转换成 '1' == 1 再转换成 1 == 1
    '0' == false;//true —— 转换成 '0' == 0 再转换成 0 == 0
    ```

  - *Null == Undefined* —— *null* 和 *undefined* 均不可再转换为其他类型的值进行比较

    ```js
    null == undefined;//true
    
    null == false;//false
    undefined == 0;//false
    ```

  - *Object - Others* —— 调用其 *valueOf( )* 方法取得其原始值，再根据前面的规则进行比较
  
- 常见特殊情况

| 表达式              | 结果    |
| :------------------ | :------ |
| *null == undefined* | *true*  |
| *undefined == 0*    | *false* |
| *null == 0*         | *false* |
| *5 == "5"*          | *true*  |
| *5 == NaN*          | *false* |
| *"NaN" == NaN*      | *false* |
| *NaN == NaN*        | *false* |
| *NaN != NaN*        | *true*  |
| *false == 0*        | *true*  |
| *true == 1*         | *true*  |
| *true == 2*         | *false* |



#### 全等于和不全等

- 符号

  - 全等于运算符用两个等于号 *==* 表示 —— 只有在两个操作数不转换的前提下相等才返回 *true*

  - 不全等运算符用叹号和等于号 *!==* 表示

- 与等于运算符的本质区别 —— == 允许在比较过程中进行强制类型转换，而 === 不允许




## 条件运算符

条件运算符是 *ECMAScript* 中用途最为广泛的运算符之一

```js
varible = boolean_expression ? true_value : false_value;
```



## 赋值运算符

- 使用等于号 *=* 进行简单赋值

- 复合赋值运算符 —— 仅作为简写语法，并不会提升性能
  - 乘后赋值 *\=\**
  - 除后赋值 */=*
  - 取模后赋值 *%=*
  - 加后赋值 *+=*
  - 减后赋值 *-=*
  - 左移后赋值 *<<=*
  - 右移赋值 *>>=*
  - 无符号右移赋值 *>>>=*

