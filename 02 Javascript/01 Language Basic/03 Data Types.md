## _Undefined_ 类型

- _Undefined_ 类型只有一个值 —— 特殊值 _undefined_

- 未经过初始化的变量会被赋予 _undefined_ 值

  ```js
  let a
  console.log(typeof a) // undefined
  console.log(a) // undefined
  ```

- 未被定义 _(not defined)_ 的变量使用 _typeof_ 操作符返回 _undefined_

  ```js
  console.log(typeof a) // undefined
  console.log(a) // ReferenceError: a is not defined
  ```

- _undefined_ 是一个假值

## _Null_ 类型

- _Null_ 类型只有一个值 —— 特殊值 _null_

- 逻辑上讲，_null_ 值表示一个空对象指针

  ```js
  typeof null === 'object' // true
  ```

- 用等于操作符 _==_ 比较 _null_ 和 _undefined_ 始终返回 _true_

  ```js
  null == undefined // true
  ```

- 用全等操作符 _===_ 比较 _null_ 和 _undefined_ 返回 _false_

  ```js
  null === undefined // false
  ```

- _null_ 是一个假值

## _Boolean_ 类型

- _Boolean_ 类型有两个字面值：_true_ 和 _false_

- _true_ 和 _false_ 不同于数值 —— _true_ 不等于 _1_，_false_ 不等于 _0_

- _true_ 和 _false_ 是区分大小写的

- _Boolean( )_ 转型函数 —— 将一个其他类型的值转换为布尔值

  | 数据类型    | 转换为 _true_ 的值     | 转换为 _false_ 的值 |
  | :---------- | :--------------------- | :------------------ |
  | _Boolean_   | _true_                 | _false_             |
  | _String_    | 非空字符串             | _' '_(空字符串）    |
  | _Number_    | 非零数值（包括无穷值） | _0、NaN_            |
  | _Object_    | 任意对象               | _null_              |
  | _Undefined_ | _×_                    | _undefined_         |

## _Number_ 类型

_Number_ 类型使用 _IEEE 754_ 格式表示整数和浮点值

### 浮点值

_ECMAScript_ 总是想方设法把值转化为整数 —— 存储浮点值使用的内存空间是存储整数值的两倍

- 在小数点后面没有数字的情况下数值就会变成整数

  ```js
  let num = 1 // 1
  ```

- 如果数值本身就是整数，只是小数点后面跟着 0，那它也会被转换为整数

  ```js
  let num = 1.0 // 1
  ```

- 科学计数法 —— 一个数值（整数或浮点数）后跟一个大写或小写的字母 _e_，再加上一个要乘的 _10_ 的多少次幂

  ```js
  let num = 3.125e7 // 31250000
  ```

### 值的范围

- 可表示的最大/小数值

  - _Number.MIN_VALUE_ —— 在多数浏览器中是 _5e-324_

  - _Number.MAX_VALUE_ —— 多数浏览器中是 _1.797 693 134 862 315 7e+308_

- 若超过了 _JavaScript_ 可以表示的范围，则会被自动转换为一个特殊的 _Infinity_（无穷）值

  - _Number.NEGAIVE_INFINITY / -Infinity_ —— 任何无法表示的负数（负无穷大）

  - _Number.POSITIVE_INFINITY / Infinity_ —— 任何无法表示的正数（正无穷大）

### _NaN_

- 不是数值 _Not a Number_ —— 用来表示本来要返回数值的操作失败了（而不是抛出错误）

- _0_、_+0_ 或 _-0_ 相除都会返回 _NaN_

  ```js
  0 / 0 // NaN
  ;+0 / -0 // NaN
  ```

- 如果分子是非 _0_ 值，分母是有符号 _0_ 或无符号 _0_，则会返回 _-Infinity_ 或 _Infinity_

  ```js
  5 / 0 // Infinity
  5 / -0 // -Infinity
  ```

- 独特的属性：

  - 任何涉及 _NaN_ 的操作始终返回 _NaN_ (如 _NaN/10_)

    ```js
    NaN / 10 // NaN
    ```

  - _NaN_ 不等于包括 _NaN_ 在内的任何值

    ```js
    NaN === NaN // false
    ```

- _isNaN( )_ —— 判断一个数值（会进行类型转换）是否为 _NaN_

  ```js
  isNaN(NaN) // true
  isNaN(10) // false,10是数值
  isNaN('10') // false,可以转换为数值10
  isNaN('blue') // true,不可以转换为数值
  isNaN(true) // false，可以转换为数值1
  ```

- _isNaN( )_ 与 _Number.isNaN( )_ 的区别

  - _isNaN( )_ 属于全局方法可直接调用而 _Number.isNaN( )_ 属于 _Number_ 类型方法

  - 数值转换

    - _isNaN( )_ 会尝试将接收到的参数转换为 _Number_，且任何无法转换为数值的值都会返回 _true_

    - _Number.isNaN( )_ 不会对参数进行类型转换，对于 _NaN_ 的判断更为精准

### 数值转换

- _Number( )_ 转型函数

  - 布尔值：_true_ 转换为 _1_，_false_ 转换为 _0_

    ```js
    Number(true) // 1
    Number(false) // 0
    ```

  - 数值：直接返回

    ```js
    Number(10) // 10
    ```

  - _null_：返回 _0_

    ```js
    Number(null) // 0
    ```

  - _undefined_：返回 _NaN_

    ```js
    Number(undefined) // NaN
    ```

  - 字符串，应用如下规则：

    - 如果字符串包含数值字符，包括数值字符前面带加、减号的情况，则转换为一个十进制数值

      ```js
      Number('10') // 10
      Number('-10') // -10
      ```

    - 如果字符串包含有效的浮点格式如 _'1.1'_ 则会转换为相应的浮点值

      ```js
      Number('10.1') // 10.1
      ```

    - 如果字符串包含有效的十六进制格式如 _'0xf'_ 则会转换为与十六进制值对应的十进制整数值

      ```js
      Number('0xf') // 15
      ```

    - 如果是空字符串（不包含字符）则返回 _0_

      ```js
      Number('') // 0
      ```

    - 如果字符串包含除上述情况之外的其他字符，返回 _NaN_

      ```js
      Number('123abc') // NaN
      ```

  - 对象

    - 调用 _valueOf( )_ 方法，并按照上述规则转换返回的值

      ```js
      Number({
        valueOf() {
          return 10
        },
      }) // 10
      ```

    - 如果转换的结果是 _NaN_，则调用 _toString( )_ 方法，再按照转换字符串的规则转换

      ```js
      Number({
        valueOf() {
          return '10'
        },
      }) // 10
      ```

- _parseInt( )_ —— 在需要得到整数时可以优先使用

  - 字符串最前面的空格会被忽略，从第一个非空格字符开始转换

    ```js
    parseInt('   123') // 123
    ```

  - 如果第一个字符不是数值字符、加号、减号，则立即返回 _NaN_

    ```js
    parseInt('a123') // NaN
    ```

  - 如果第一个字符是数值字符、加号、减号，则继续依次检测每个字符，直到字符串末尾或碰到非数值字符

    ```js
    parseInt('-123abc') // -123
    ```

  - 如果字符串以 _0x / 0X_ 开头，就会被解释为十六进制整数

    ```js
    parseInt('0xa') // 10
    ```

  - 如果字符串以 _0_ 开头且紧跟数值字符，就会被解释为八进制整数

  - 第二个参数 —— 用于指定底数（进制数）

    ```js
    parseInt('1111', 2) // 15
    ```

- _parseFloat( )_

  - 第一次出现的小数点是有效的，第二次出现的小数点是无效的

    ```js
    parseFloat('10.1.10') // 10.1
    ```

  - ⭐ 只解析十进制值，因此不能指定底数

  - 可返回整数 —— 当字符串表示整数（没有小数点或者小数点后面只有一个零）

    ```js
    parseFloat('10.0000') // 10
    ```

## _String_ 类型

_String_（字符串）数据类型表示零或多个 _16_ 位的 _Unicode_ 字符序列

### 字符字面量

字符串数据类型包含一些字符字面量，用于表示非打印字符或有其他用途的字符

| 字面量  | 含义                                    |
| :------ | :-------------------------------------- |
| _\n_    | 换行                                    |
| _\t_    | 制表                                    |
| _\b_    | 退格                                    |
| _\r_    | 回车                                    |
| _\f_    | 换页                                    |
| _\\_    | 反斜杠（_\\_）                          |
| _\'_    | 单引号（_'_）                           |
| _\"_    | 双引号（_"_）                           |
| _\\_    | 反引号( \* )                            |
| _\xnn_  | 以十六进制编码*nn*表示的字符            |
| _\unnn_ | 以十六进制编码*nnnn*表示的*Unicode*字符 |

### 特点

_ECMAScript_ 中的字符串一旦创建，它们的值就不能改变 —— 要修改该某个变量中的字符串值，必须先销毁原始的字符串，然后将包含新值的另一个字符串保存到该变量

### 转换为字符串

- _toString( )_ —— 返回当前值的字符串等价物

  - 目标 —— 数值、布尔值、对象和字符串值

  - _null_ 和 _undefined_ 值没有 _toString( )_ 方法

  - 参数 —— 表示以什么底数来输出数值的字符串表示

- _String( )_ 转型函数 —— 返回表示相应类型值的字符串

  - 如果值有 _toString( )_ 方法，则调用该方法并返回结果

  - 如果值是 _null_，则返回 _"null"_

  - 如果值是 _undefined_，则返回 _"undefined"_

### 模板字面量

_ES6_ 新增了使用模板字面量定义字符串的能力

- 模板字面量使用反引号，保留换行字符，可以跨行定义字符

  ```js
  console.log(
    `first line
  second line`
  )
  // first line
  // second line
  ```

- 字符串插值 —— 通过再 _${}_ 中使用一个 _JavaScript_ 表达式实现

  ```js
  let value = 5
  let exponent = 'second'
  ;`${value} to the ${exponent} power is ${value * value}` // '5 to the second power is 25'
  ```

  - 所有插入的值都会使用 _toString()_ 强制转型

  - 任何 _JavaScript_ 表达式都可以用于插值

  - 嵌套的模板字符串无需转义

    ```js
    console.log(`hello,${`world`}!`)
    // hello,world!
    ```

  - 将表达式转换为字符串时会调用 _toString( )_

    ```js
    let foo = {
      toString: () => 'world',
    }
    console.log(`hello,${foo}!`) // hello,world!
    ```

  - 在插值表达式中可以调用函数和方法

    ```js
    function capitalize(word) {
      return `${word[0].toUpperCase()}${word.slice(1)}`
    }
    console.log(`${capitalize('hello')},${capitalize('world')}`) // Hello,World
    ```

  - 模板也可以插入自己之前的值

    ```js
    let value = ''
    function append() {
      value = `${value}abc`
      console.log(value)
    }
    append() // abc
    append() // abcabc
    append() // abcabcabc
    ```

### 模板字面量标签函数

模板字面量也支持定义标签函数，而通过标签函数可以自定义插值行为

标签函数会接收被插值记号分割后的模板和对每个表达式求值的结果

```js
let a = 6;
let b = 9;

function simpleTag(strings,aValExpression,bValExpression,sumValExpression){
    console.log(strings);
    console.log(aValExpression);
    console.log(bValExpression);
    console.log(sumValExpression);

    return 'foobar'
}
let untaggedResult = *${a} + ${b} = ${a+b}*;
let taggedResult = simpleTag*${a} + ${b} = ${a+b}*;
// ["","+","","=",""]
// 6
// 9
// 15
console.log(untaggedResult);// "6+9=15"
console.log(taggedResult);// "foobar"
```

### 原始字符串

使用模板字面量也可以直接获取原始的模板字面量内容，而不是被转换后的字符表示；为此，可以使用默认的 *String.raw*标签函数

```js
// Unicode示例
console.log(*\u00A9*);// ©
console.log(String.raw*\u00A9*);// \u00A9

// 换行符实例
console.log(*first line\nsecond line*);
// first line
// second line

console.log(String.raw*first line\nsecond line*);
// first line\nsecond line

// 对实际的换行符来说是不行的
// 它们不会被转换成转义序列的形式
console.log(*first line
second line*);
// first line
// second line

console.log(String.raw*first line
second line*);
// first line
// second line
```

另外，也可以通过标签函数的第一个参数，即字符串数组的*.raw*属性取得每个字符串的原始内容

```js
function printRaw(strings){
    console.log('Actual characters:');
    for(const string of strings){
        console.log(string);
    }
    console.log('Escaped characters:');
    for(const rawString of strings.raw){
        console.log(rawString);
    }
}
printRaw*\u00A9${'and'}\n*;
// Actual characters:
// ©
// (换行符)
// Escaped characters:
//  \n
```

## _Symbol_ 类型

符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险

### 基本用法

- 使用 _Symbol( )_ 函数初始化

  - 不传入参数

    ```js
    const sym = Symbol()
    ```

  - 可传入一个字符串参数作为对符号的的描述 —— 这个字符串参数与符号定义或标识完全无关

    ```js
    Symbol('foo') === Symbol('foo') // false
    ```

- _Symbol( )_ 函数不能用作构造函数，与*new*关键字一起使用 —— 为了避免创建符号包装对象

  ```js
  let mySymbol = new Symbol() // TypeError:Symbol is not a constructor
  ```

### 全局符号注册表

- _Symbol.for( )_ —— 在全局符号注册表中创建并重用符号

  ```js
  const fooGlobalSymbol = Symbol.for('foo')
  ```

  - _Symbol.for( )_ 对每个字符串键都执行**幂等操作**

    - 调用时会检查全局运行时注册表，若不存在则会生成一个新符号实例并添加到注册表中

    - 后续使用**相同字符串**的调用同样会检查注册表，返回该符号实例

      ```js
      const fooSymbol = Symbol.for('foo') // 创建新符号
      const ohterFooSymbol = Symbol.for('foo') // 重用已有符号

      console.log(fooSymbol === otherFooSymbol) // tru
      ```

  - 使用相同的符号描述，在全局注册表中定义的符号跟使用 _Symbol( )_ 定义的符号也不等同

    ```js
    Symbol('foo') === Symbol.for('foo') // false
    ```

  - 作为参数传给 _Symbol.for()_ 的任何值都会被转换为字符串

- _Symbol.keyFor( )_ —— 查询全局注册表

  - 参数 —— 符号，如果不是符号则抛出 _TypeError_

    ```js
    Symbol.keyFor(123) // TypeError:123 is not a symbol
    ```

  - 返回值 —— 该全局符号对应的字符串键

    ```js
    let s = Symbol.for('foo')
    console.log(Symbol.keyFor(s)) // foo
    ```

  - 如果查询的不是全局符号，则返回 _undefined_

    ```js
    let s = Symbol('bar')
    console.log(Symbol.keyFor(s2)) // undefined
    ```

### 使用符号作为属性

- _Object.getOwnPropertyNames( )_ 返回对象实例的常规属性数组

- _Object.getOwnPropertySymbols( )_ 返回对象实例的符号属性数组

- _Object.getOwnPropertyDescriptors( )_ 会返回同时包含常规和符号属性描述符的对象

- _Reflect.ownKeys( )_ 会返回两种类型的键

```js
const s1 = Symbol('foo')
const s2 = Symbol('bar')
const o = {
  // 符号属性
  [s1]: 'foo val',
  [s2]: 'bar val',

  // 常规属性
  baz: 'baz val',
  qux: 'qux val',
}

console.log(Object.getOwnPropertyNames(o))
// ["baz", "qux"]

console.log(Object.getOwnPropertySymbols(o))
// [Symbol(foo), Symbol(bar)]

console.log(Object.getOwnPropertyDescriptors(o))
// {baz: {…}, qux: {…}, Symbol(foo): {…}, Symbol(bar): {…}}

console.log(Reflect.ownKeys(o))
// ["baz", "qux", Symbol(foo), Symbol(bar)]
```

### 常用内置符号

- _Symbol.iterator_

  - 一个方法 —— 返回对象默认的迭代器

  - 使用 —— _for-of_ 语句循环时会调用 _Symbol.iterator_ 为键的函数

    ```js
    class Foo {
      *[Symbol.iterator]() {}
    }
    let f = new Foo()

    console.log(f[Symbol.iterator]())
    // Generator {<suspended>}
    ```

  - 由 _Symbol.iterator_ 函数生成的对象的返回值

    - 显示地调用 _next( )_ 方法返回

    - 隐式地通过生成器函数返回

      ```js
      class Emitter {
        constructor(max) {
          this.max = max
          this.idx = 0
        }

        *[Symbol.iterator]() {
          while (this.idx < this.max) {
            yield this.idx++
          }
        }
      }
      function Count() {
        let emitter = new Emitter(5)

        for (const x of emitter) {
          console.log(x)
        }
      }

      Count()
      // 0
      // 1
      // 2
      // 3
      // 4
      ```

- _Symbol.asyncIterator_

  - 一个实现异步迭代器 _API_ 的函数

  - 使用者 —— _for-await-of_ 语句

_for-await-of_ 循环会利用这个函数执行异步迭代操作；循环时，他们会调用*Symbol.asyncIterator*为键的函数，并期望这个函数会返回一个实现迭代器*API*的对象

很多时候，返回的对象是实现该*API*的*AsyncGenerator*

```js
class Foo {
  async *[Symbol.asyncIterator]() {}
}
let f = new Foo()

console.log(f[Symbol.asyncIterator]())
// AsyncGenerator {<suspended>}
```

技术上，这个由*Symbol.asyncIterator*函数生成的对象应该通过其*next()*方法陆续返回*Promise*实例；可以通过显示地调用*next()*方法返回，也可以隐式地通过异步生成器函数返回

```js
class Emitter {
  constructor(max) {
    this.max = max
    this.asyncIdx = 0
  }
  async *[Symbol.asyncIterator]() {
    while (this.asyncIdx < this.max) {
      yield new Promise((resolve) => resolve(this.asyncIdx++))
    }
  }
}
async function asyncCount() {
  let emitter = new Emitter(5)

  for await (const x of emitter) {
    console.log(x)
  }
}

asyncCount()
// 0
// 1
// 2
// 3
// 4
```

### Symbol.hasInstance

根据*ECMAScript*规范，这个符号作为一个属性表示“一个方法，该方法决定一个构造器对象是否认可一个对象是它的实例；由*instanceof*操作符使用”；*instanceof*操作符可以用来确定一个对象实例的原型链上是否有原型

```js
function Foo() {}
let f = new Foo()
console.log(f instanceof Foo) // true

class Bar {}
let b = new Baz()
console.log(b instanceof Bar) // true
```

在*ES6*中，*instanceof*操作符会使用*Symbol.hasInstance*函数来确定关系；以*Symbol.hasInstance*为键的函数会执行同样的操作，只是操作数对调了一下

```js
function Foo() {}
let f = new Foo()
console.log(Foo[Symbol.hasInstance](f))
// true

class Bar {}
let b = new Baz()
console.log(Bar[Symbol.hasInstance](b))
// true
```

这个属性定义在*Function*原型上，因此默认在所有函数和类上都可以调用；由于*instanceof*操作符会在原型链上寻找这个属性定义，就跟在原型链上寻找其他属性一样，因此可以在继承的类上通过静态方法重新定义这个函数

```js
class Bar {}
class Baz extends Bar {
  static [Symbol.hasInstance]() {
    return false
  }
}
let b = new Baz()
console.log(Bar[Symbol.hasInstance](b)) // true
console.log(b instanceof Bar) // true

console.log(Baz[Symbol.hasInstance](b)) // false
console.log(b instanceof Baz) // false
```

### Symbol.isConcatSpreadable

根据*ECMAScript*规范，这个符号作为一个属性表示“一个布尔值，如果是*true*则对象应该用*Array.prototype.concat()*打平其数组元素”；*ES6*中的*Array.prototype.concat()*方法会根据接收到的对象类型选择如何将一个类数组对象拼接成数组实例；覆盖*Symbol.isConcatSpreadable*的值可以修改这个行为

- 数组对象默认情况下会被打平到已有的数组，*false*或假值会导致整个对象被追加到数组末尾；

- 类数组对象情况下会被追加到数组末尾，*true*或真值会导致这个类数组对象被打平到数组里

- 其他不是类数组对象的对象在*Symbol.isConcatSpreadable*被设置为*true*的情况下将被忽略

  ```js
  let initial = ['foo']

  let array = ['bar']
  console.log(array[Symbol.isConcatSpreadable]) // undefined
  console.log(initial.concat(array)) // ['foo','bar']
  array[Symbol.isConcatSpreadable] = false
  console.log(initial.concat(array)) // ['foo',['bar']]

  let arrayLikeObject = { length: 1, 0: 'baz' }
  console.log(arrayLikeObject[Symbol.isConcatSpreadable]) // undefined
  console.log(initial.concat(arrayLikeObject)) // ['foo',{...}]
  arrayLikeObject[Symbol.isConcatSpreadable] = true
  console.log(initial.concat(arrayLikeObject)) // ['foo','baz']

  let otherObject = new Set().add('qux')
  console.log(otherObject[Symbol.isConcatSpreadable]) // undefined
  console.log(initial.concat(otherObject)) // ['foo',Set(1)]
  otherObject[Symbol.isConcatSpreadable] = true
  console.log(initial.concat(otherObject)) // ['foo']
  ```

### Symbol.match

根据*ECMAScript*规范，这个符号作为一个属性表示“一个正则表达式方法，该方法用正则表达式去匹配字符串；由*String.prototype.match()*方法使用”；*String.prototype.match()*方法会使用以*Symbol.match*为键的函数来对正则表达式求值；正则表达式的原型上默认有这个函数的定义，因此所有正则表达式实例默认是这个*String*方法的有效参数

```js
console.log(RegExp.prototype[Symbol.match])
// ƒ [Symbol.match]() { [native code] }

console.log('foobar'.match(/bar/))
// ["bar", index: 3, input: "foobar", groups: undefined]
```

给这个方法传入非正则表达式值会导致值被转换为*RegExp*对象；

如果想改变这种行为，让方法直接使用参数，则可以重新定义*Symbol.match*函数以取代默认对正则表达式求值的行为，从而让*match()*方法使用非正则表达式实例；*Symbol.match*函数接收一个参数，就是调用*match()*方法的字符串实例；返回值没有限制

```js
class FooMatcher {
  static [Symbol.match](target) {
    return target.includes('foo')
  }
}
console.log('foobar'.match(FooMatcher)) // true
console.log('bazbar'.match(FooMatcher)) // false

class StringMatcher {
  constructor(str) {
    this.str = str
  }
  [Symbol.match](target) {
    return target.includes(this.str)
  }
}
console.log('foobar'.match(new StringMatcher('foo'))) // true
console.log('bazbar'.match(new StringMatcher('quz'))) // false
```

### Symbol.replace

根据*ECMAScript*规范，这个符号作为一个属性表示“一个正则表达式方法，该方法替换一个字符串中匹配的子串；由*String.prototype.replace()*方法使用”；*String.prototype.replace()*方法会使用以*Symbol.replace*为键的函数来对正则表达式求值；正则表达式的原型上默认有这个函数的定义，因此所有正则表达式实例默认是这个*String*方法的有效参数

```js
console.log(RegExp.prototype[Symbol.replace]);
// ƒ [Symbol.replace]() { [native code] }

console.log('foobarbaz'.replace(/bar/，'quz'));
// 'fooquxbaz'
```

给这个方法传入非正则表达式值会导致值被转换为*RegExp*对象；

如果想改变这种行为，让方法直接使用参数，则可以重新定义*Symbol.replace*函数以取代默认对正则表达式求值的行为，从而*replace()*方法使用非正则表达式实例；*Symbol.replace()*函数接收两个参数，就是调用*replace()*方法的字符串实例和替换字符串；返回值没有限制

```js
class FooReplacer {
  static [Symbol.replace](target, replacement) {
    return target.split('foo').join(replacement)
  }
}
console.log('foobarbaz'.replace(FooReplacer, 'qux'))
// fooquxbaz

class StringReplacer {
  constructor(str) {
    this.str = str
  }
  [Symbol.replace](target, replacement) {
    return target.split(this.str).join(replacement)
  }
}
console.log('foobarbaz'.replace(new StringReplacer('foo'), 'qux'))
// fooquxbaz
```

### Symbol.search

根据*ECMAScript*规范，这个符号作为一个属性表示“一个正则表达式方法，该方法返回字符串中匹配正则表达式的索引；由*String.prototype.search()*方法使用”；*String.prototype.search()*方法会使用以*Symbol.search*为键的函数来对正则表达式求值；正则表达式的原型上默认有这个函数的定义，因此所有正则表达式实例默认是这个*String*方法的有效参数

```js
console.log(RegExp.prototype[Symbol.search])
// ƒ [Symbol.search]() { [native code] }

console.log('foobar'.search(/bar/))
// 3
```

给这个方法传入非正则表达式值会导致值被转换为*RegExp*对象；

如果想改变这种行为，让方法直接使用参数，则可以重新定义*Symbol.search*函数以取代默认对正则表达式求值的行为，从而让*search()*方法使用非正则表达式实例；*Symbol.search*函数接收一个参数，就是调用*match()*方法的字符串实例；返回值没有限制

```js
class FooSearcher {
  static [Symbol.search](target) {
    return target.indexOf('foo')
  }
}
console.log('foobar'.search(FooSearcher)) // 0
console.log('barfoo'.search(FooSearcher)) // 3
console.log('barbaz'.search(FooSearcher)) // -1

class StringSearcher {
  constructor(str) {
    this.str = str
  }
  [Symbol.search](target) {
    return target.indexOf(this.str)
  }
}
console.log('foobar'.search(new StringSearcher('foo'))) // 0
console.log('barfoo'.search(new StringSearcher('foo'))) // 3
console.log('barbaz'.search(new StringSearcher('qux'))) // -1
```

### Symbol.species

根据*ECMAScript*规范，这个符号作为一个属性表示“一个函数值，该函数作为创建派生对象的构造函数”；这个属性在内置类型中最常用，用于对内置类型实例方法的返回值暴露实例化派生对象的方法；用*Symbol.species*定义静态的获取器(_getter_)方法，可以覆盖新创建实例的原型定义

```js
class Bar extends Array {}
class Baz extends Array {
  static get [Symbol.species]() {
    return Array
  }
}
let bar = new Bar()
console.log(bar instanceof Array) // true
console.log(bar instanceof Bar) // true
bar = bar.concat('bar')
console.log(bar instanceof Array) // true
console.log(bar instanceof Bar) // true

let baz = new Baz()
console.log(baz instanceof Array) // true
console.log(baz instanceof Baz) // true
baz = baz.concat('baz')
console.log(baz instanceof Array) // true
console.log(baz instanceof Baz) // false
```

### Symbol.split

根据*ECMAScript*规范，这个符号作为一个属性表示“一个正则表达式方法，该方法在匹配正则表达式的索引位置拆分字符串；由*String.prototype.split()*方法使用”；*String.prototype.split()*方法会使用以*Symbol.split*为键的函数来对正则表达式求值；正则表达式的原型上默认有这个函数的定义，因此所有正则表达式实例默认是这个*String*方法的有效参数

```js
console.log(RegExp.prototype[Symbol.split])
// ƒ [Symbol.split]() { [native code] }

console.log('foobarbaz'.split(/bar/))
// ['foo','baz']
```

给这个方法传入非正则表达式值会导致值被转换为*RegExp*对象；

如果想改变这种行为，让方法直接使用参数，则可以重新定义*Symbol.split*函数以取代默认对正则表达式求值的行为，从而让*split()*方法使用非正则表达式实例；*Symbol.split*函数接收一个参数，就是调用*match()*方法的字符串实例；返回值没有限制

```js
class FooSpliter {
  static [Symbol.split](target) {
    return target.split('foo')
  }
}
console.log('foobarbaz'.split(FooSpliter))
// ["", "barbaz"

class StringSpliter {
  constructor(str) {
    this.str = str
  }
  [Symbol.split](target) {
    return target.split(this.str)
  }
}
console.log('bazfoobar'.split(new StringSpliter('foo')))
// ["baz", "bar"]
```

### Symbol.toPrimitive

根据*ECMAScript*规范，这个符号作为一个属性表示“一个方法，该方法将对象转换成相应的原始值；由*ToPrimitive*抽象操作使用”；许多内置操作都会尝试强制将对象转换为原始值，包括字符串、数值和未指定的原始类型；对于一个自定义对象实例，通过在这个实例的*Symbol.toPrimitive*属性上定义一个函数可以改变默认行为

根据提供给这个函数的参数（_string、number 或 default_），可以控制返回的原始值

- _Number_：该场合需要转成数值
- _String_：该场合需要转成字符串
- _Default_：该场合可以转成数值，也可以转成字符串

```js
class Foo {}
let foo = new Foo()

console.log(3 + foo) // "3[object Object]"
console.log(3 - foo) // NaN
console.log(String(foo)) // "[object Object]"

class Bar {
  constructor() {
    this[Symbol.toPrimitive] = function (hint) {
      switch (hint) {
        case 'number':
          return 3
        case 'string':
          return 'string bar'
        case 'default':
          return 'default bar'
      }
    }
  }
}
let bar = new Bar()
console.log(3 + bar) // 3default bar
console.log(3 - bar) // 0
console.log(String(bar)) // string bar
```

### Symbol.toStringTag

根据*ECMAScript*规范，这个符号作为一个属性表示“一个字符串，该字符串用于创建对象的默认字符串描述；由内置方法*Object.prototype.toString()*方法使用”

通过*toString()*方法获取对象标识时，会检索由*Symbol.toStringTag*指定的实例标识符，默认为*"Obejct"*；内置类型已经指定了这个值，但自定义类实例还需要明确定义

```js
let s = new Set()

console.log(s) // Set(0) {}
console.log(s.toString()) // [object Set]
console.log(s[Symbol.toStringTag]) // Set

class Foo {}
let foo = new Foo()
console.log(foo) // Foo {}
console.log(foo.toString()) // [object Object]
console.log(foo[Symbol.toStringTag]) // undefined

class Bar {
  constructor() {
    this[Symbol.toStringTag] = 'Bar'
  }
}
let bar = new Bar()
console.log(bar) // Bar {Symbol(Symbol.toStringTag): "Bar"}
console.log(bar.toString()) // [object Bar]
console.log(bar[Symbol.toStringTag]) // Bar
```

### Symbol.unscopables

根据*ECMAScript*规范，这个符号作为一个属性表示 “一个对象，该对象所有的以及继承的属性，都会从关联对象的*with*环境绑定中排除” ；设置这个符号并让其映射对应属性的键为\*true*\*\*，就可以组织该属性出现在*with\*环境绑定中

```js
let o = { foo: 'bar' }

with (o) {
  console.log(foo) // bar
}
o[Symbol.unscopables] = {
  foo: true,
}
with (o) {
  console.log(foo) // ReferenceError
}
```

## [_Object_ 类型](../02%20Object/对象.md)

*ECMAScript*中的对象其实就是一组数据和功能的集合；对象通过 new 操作符后跟对象类型的名称来创建

```js
let o = new Object()
```

*ECMAScript*中的 Object 是派生其他对象的基类；Object 类型的所有属性和方法在派生对象上同样存在

每个 Object 实例都有如下属性和方法

- construct：用于创建当前对象的函数

- hasOwnProperty(propertyName)：用于判断当前对象实例上是否存在给定的属性；要检查的属性名必须是字符串

- isPrototypeof(object)：用于判断当前对象是否为另一个对象的的原型

- propertyIsEnumerable(propertyName)：用于判断给定的属性是否可以使用

- toLocaleString()：返回对象的字符串表示；该字符串反映对象所在的本地化执行环境

- toString()：返回对象的字符串表示

- valueOf()：返回对象对应的字符串、数值或布尔值表示；通常与 toString()的返回值相同

因为在*ECMAScript*中 Object 是所有对象的基类，所以任何对象都有这些属性和方法

## _typeof_ 操作符

对一个值使用 _typeof_ 操作符会返回下列字符串之一：

1. _"undefined"_ —— 未定义

2. _"boolean"_ —— 布尔值

3. _"string"_ —— 字符串

4. _"number"_ —— 数值

5. _"object"_ —— 对象或 _null_

6. _"function"_ —— 函数

7. _"symbol"_ —— 符号

### _typeof_ 原理

不同的对象在底层都表示为二进制，在 _Javascript_ 中二进制前（低）三位存储其类型信息。

- _000_：对象

- _010_：浮点数

- _100_：字符串

- _110_：布尔

- _1_：整数

在 _Javascript_ 中二进制前（低）三位都为 _0_ 的话会被判断为 _Object_ 类型，_null_ 的二进制表示全为 _0_，自然前三位也是 _0_，所以执行 _typeof_ 时会返回 _"object"_
