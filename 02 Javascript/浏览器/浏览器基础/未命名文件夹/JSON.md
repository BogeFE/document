## *JSON*

- 全称 *JavaScript Object Notation* —— *JavaScript* 对象简谱

- *JSON*不是编程语言，而是一种通用的数据格式，且不属于 *JavaScript*，很多语言都有解析和序列化 *JSON* 的内置能力



#### 语法

*JSON* 语法支持 *3* 种类型的值：

- 简单值：字符串、数值、布尔值和 *null*

  - *undefined* 不可以

  - *JSON* 字符串与 *JavaScript* 字符串的区别—— *JSON* 字符串必须使用双引号*" "*

    ```js
    //都是有效的 JSON
    5
    "Hello World"
    ```


- 对象：对象表示有序键值对

  - *JSON* 对象字面量没有声明变量 —— *JSON* 没有变量

  - *JSON* 对象字面量没有分号 —— 不是 *JavaScript* 语句

  - *JSON* 对象属性名必须使用双引号*" "*

    ```js
    {
     "name" : "Mike",
     "age" : 19
    }
    ```

- 数组

  ```js
  [25,"Hi",true]
  ```




## 解析与序列化

*JSON* 可以直接被解析为可用的 *JavaScript* 对象，在 *ECMAScript5*中增加了 *JSON* 全局对象



#### *JSON* 全局对象

- 不可做为构造函数调用

- *JSON.stringify( )* —— 将 *JavaScript → JSON* 字符串

  - 输出值 —— 不包含空格和所进的 *JSON* 字符串
  - 忽略所有函数和原型成员
  - 忽略属性值为 *undefined* 的任何属性

  ```js
  let book = {
    title: "A Book",
    authors: [
        "Mike",
        "Jack"
    ],
    edition: 4,
    year: 2021
  };
  
  let jsonText = JSON.stringify(book);
  //{"title":"A Book","authors":["Mike","Jack"],"edition":4,"year":2021}
  ```

- *JSON.parse( )* —— 将 *JSON* 字符串 →  原生 *JavaScript* 值

  ```js
  let bookCopy = JSON.parse(jsonText);
  //{title:"A Book",authors:["Mike","Jack"],edition:4,year:2021}
  ```

- 上述代码中：*book* 对象 →  *JSON* 字符串 → *bookcopy* 对象，**但是 *book* 和 *bookCopy* 完全不一样的对象，只是拥有相同的属性和属性值**

  ```js
  console.log(book === bookCopy);//false
  ```

  



#### 序列化选项

- *JSON.stringify( )* 除了要序列化的对象外，还可接收两个参数：

  - 过滤器 *replacer* —— 可以是**数组**或者**替代函数**
    - 函数 —— 被序列化的值的每个属性都会经过该函数的转换和处理
    
      ```js
      let jsonText1 = JSON.stringify(book,(value,key) => {
          switch(key){
              case "authors": {
                  return value.join(",");
              };
              case "year": {
                  return undefined;
              }
              default: {
                  return value;
              }
          }
      });
      ```
    
    - 数组 —— *JSON.stringify( )* 返回的结果只会包含该数组中列出的对象
    
      ```js
      let book = {
        title: "A Book",
        authors: [
            "Mike",
            "Jack"
        ],
        edition: 4,
        year: 2021
      };
      
      let jsonText2 = JSON.stringify(book, ["title","edition"]);
      //{"title":"A Book","edition":4}
      ```

  - 控制缩进和空格 *space* —— 数值表示每一个级缩进的空格数，最大值为10；字符串则作为缩进符号

    ```JS
    JSON.stringify(book,null,4);
    //'{\n    "title": "A Book",\n    "authors": [\n        "Mike",\n        "Jack"\n    ],\n    "edition": 4,\n    "year": 2021\n}'
    
    JSON.stringify(book,null,"--");
    //'{\n--"title": "A Book",\n--"authors": [\n----"Mike",\n----"Jack"\n--],\n--"edition": 4,\n--"year": 2021\n}'
    ```


- *toJSON( )* 方法

  - 作用 —— 在需要序列化的对象中添加 *toJSON( )* 方法，可在序列化时基于这个方法进行适当的 *JSON* 表示

    ```js
    const book = {
      	title: "A Book",
      	edition: 4,
      	year: 2021,
        toJSON(){
            return this.title;
        }
    };
    JSON.stringify(book);//'"A Book"'
    ```

  - 不能使用箭头函数 —— 箭头函数的词法作用域为全局作用域

  - 与过滤函数 *replacer* 搭配使用时的序列化流程

    - 若可获取实际的值 —— 优先调用 *toJSON( )*
    - 若提供了第二个参数 *replacer* —— 优先使用过滤函数 *replacer*
    - 若提供了第三个参数 *space* —— 进行缩进

- 序列化规则

  - 转换值具有 *toJSON( )* 方法 →  **调用 to*JSON* 方法后的返回值会被序列化**

  - 非数组对象**不保证**顺序

  - *Boolean*、*Number*、*String* 包装对象 → 原始值

    ```js
    JSON.stringify([new Number(1), new String("false"), new Boolean(false)]);
    //'[1,"false",false]'
    ```

  - *undefined*、*function*、*symbol* → 忽略

    ```js
    JSON.stringify({x: undefined, y: Object, z: Symbol("")},[Symbol("foo")]: "foo");
    //'{}
    ```

  - 循环引用的对象 —— 抛出错误

  - *Date* 对象会调用其内部的 *toJSON* 方法 → *String* 字符串
  - *Map / Set / WeakMap / WeakSet* → 仅序列化其中**可枚举**的属性 






#### 解析选项

*JSON.parse( )* 可以接受额外参数 —— 还原函数*reviver*

- 作用 —— 将解析出的 *JavaScript* 值进行一次指定的转换

- 参数 —— *key, value*

- 返回值

  - 返回 *undefined* —— 删除对应的 *key*
  - 返回其它任意值 —— 返回的值会成为当前属性新的属性值

- 应用 —— 将日期字符串转换为 *Date* 对象

  ```js
  let book = {
    	title: "A Book",
    	authors: [
        	"Mike",
        	"Jack"
    	],
    	edition: 4,
    	year: 2021,
      releaseDate: new Date(2017,11,1),
  };
  let jsonText = JSON.stringify(book);
  let bookCopy = JSON.parse(jsonText,(key,value) => {
      return key === "releaseDate" ? new Date(value) : value;
  })
  ```



## *JSON* 与 XML

#### 数据体积

*JSON* 相对于 XML 来讲，数据体积更小，传递速度更快



#### 数据交互

*JSON* 与 Javascript 的交互更为方便，更容易进行解析处理，能够进行更好的数据交互



#### 数据描述

*JSON* 对数据的描述性比 XML 较差



#### 传输速度

*JSON* 的速度远快于 XML



































