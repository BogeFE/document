## 节点层级
- 任何 *HTML* 或 *XML* 文档都可以用 *DOM* 表示为一个由节点构成的层级结构，*DOM*中共有12种节点类型

- 根节点 —— *document*
- 文档元素 *<\html>* —— *documentElement*
  - 根节点的唯一子节点
  - 每个文档只能有一个文档元素
  - 在 *HTML* 中文档元素始终是 *<\html>*
  - 在 *XML* 中文档元素可以是任何元素 



## *Node* 类型

- ⭐在 *JavaScript* 中，所有节点类型都继承 *Node* 类型

- 每个节点都有 *nodeType* 属性，表示该结点的类型

  - *Node.ELEMENT_NODE (1)* —— 元素节点类型

  - *Node.ARRTIBUTE_NODE (2)*

  - *Node.TEXT_NODE (3)*

  - *Node.CDATA_SECTION_NODE (4)*

  - *Node.ENTITY_REFERENCE_NODE (5)*

  - *Node.ENTITY_NODE (6)*

  - *Node.PROCESSING_INSTRUCTION_NODE (7)*

  - *Node.COMMENT_NODE (8)*

  - *Node.DOCUMENT_NODE (9)* —— 文档节点类型

  - *Node.DOCUMENT_TYPE_NODE (10)*

  - *Node.DOCUMENT_FRAGMENT_NODE (11)*

  - *Node.NOTATION_NODE (12)*

- *nodeName* —— 元素节点的标签名

- *nodeValue*




#### **节点关系**
- *childNodes*属性 —— 包含一个**类数组**形式的 *NodeList* 实例

  - *NodeList.length* —— 子节点个数

  - 访问 *NodeList* 实例中的元素 —— *item(index) /* 中括号语法

    ```js
    let firstChild = someNode.childNodes[0]
    let secondChild = someNode.childNodes.item(1);
    ```

  - ⭐*NodeList* 是**实时**的活动对象，而不是访问时所获取内容的快照

- *parentNode* 属性 —— 指向其 *DOM* 结构中的父元素

- *firstChild* —— 作为父节点的节点的第一个子节点

- *lastChild* —— 作为父节点的节点的最后一个子节点

- *prevSibling* —— 上一个同胞节点

- *nextSibling* —— 下一个同胞节点

  ###### <img src="C:\Users\ThunderUp\AppData\Roaming\Typora\typora-user-images\image-20211123140807311.png" alt="image-20211123140807311" style="zoom:67%;" />

- *ownerDocument* —— 指向代表整个文档的文档节点的指针




#### 操纵节点
- *appendChild()*

  - 作用 —— 在 *childNodes* 列表**末尾**添加节点

    ```js
    const returnedNode = someNode.appendChild(newNode);
    returnedNode === someNode.lastChild;//true
    ```

  - 返回值 —— 新添加的节点

    ```js
    const returnedNode = someNode.appendChild(newNode);
    returnedNode === newNode;//true
    ```

  - 添加已存在节点 —— 转移到新位置

    ```js
    const returnedNode = someNode.appendChild(someNode.firstChild);
    returnedNode === someNode.firstChild;//false
    returnedNode === someNode.lastChild;//true
    ```

- *insertBefore( )*

  - 参数 —— 插入节点 *&* 参照节点

  - 作用 —— 将第一个参数节点插入到第二个参数节点**之前**

    ```js
    const returnedNode = someNode.insertBefore(newNode,someNode.childNodes[1]);
    returnedNode === someNode.childNodes[1];//true
    ```

- *replaceChild( )* —— 将节点插入文档并替换原有的节点

  ```js
  someNode.replaceChild(newNode,replacedNode);
  ```

- *removeChild()* —— 移除节点，返回被移除的节点

  ```js
  someNode.removeChild(removedNode);
  ```



#### 其他方法

- *cloneNode()* —— 返回与调用它的节点一模一样的节点
  - 若传入 *true* 参数，会进行深复制 —— 复制节点及其整个 *DOM* 树
  - 不会复制添加到 *DOM*节点的 *JavaScript* 属性，只复制 *HTML* 属性以及可选地复制子节点
- *normalize( )* —— 用于处理文档子树中的**文本节点**，检测这个节点的所有后代
  - 发现空文本节点——删除
  - 两个同胞节点相邻——合并为一个文本节点




## *Document* 类型
- 在浏览器中

  - 文档对象 *document* 是 *HTMLDocument* 的实例 —— 表示整个*HTML*页面

  - 文档对象 *document* 是 *window* 对象的属性 —— 因此是一个全局对象


- *Document* 类型的节点有以下特征：

  - *nodeType* 等于 *9*

  - *nodeName* 值为*"#document"*

  - *nodeValue* 值为 *null*

  - *parentNodes* 值为 *null*

  - *ownerDocument* 值为 *null*

  - 子节点可以是 
    - *Element*（最多一个）—— *\<html>* 元素
    - *DocumentType*（最多一个）
    - *ProcessingInstruction* 或 *Comment*类型





#### 文档子节点
- *document.documentElement* —— *HTML*页面中的 *\<html>* 元素
- *document.body —— HTML*页面中的 *<\body>* 元素
- *document.doctype —— HTML*页面中的 *<!doctype>* 元素

###### ![image-20210912104518406](C:\Users\ThunderUp\AppData\Roaming\Typora\typora-user-images\image-20210912104518406.png)



#### 文档信息

- *title*：包含 *\<title>* 元素中的内容，可用于修改页面标题，且修改 *title* 不会改变 *\<title>* 元素

  ###### ![image-20211123142748888](C:\Users\ThunderUp\AppData\Roaming\Typora\typora-user-images\image-20211123142748888.png)

- *URL*：包含当前页面的完整 *URL*

  ```js
  document.URL;
  //'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=DOM&oq=DOM%2520%25E8%258A%2582%25E7%2582%25B9%25E5%2585%25B3%25E7%25B3%25BB%25E5%259B%25BE&rsv_pq=d55af06300008e57&rsv_t=fcf2ZVsAUgD44iy9EvAiiDPHwZ6WTcPD%2FXvPF%2FqLOKWxjp38zm9bEXVmO5g&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_btype=t&inputT=1060&rsv_sug3=35&rsv_sug1=29&rsv_sug7=100&rsv_sug2=0&rsv_sug4=1656'
  ```

- *domain*：包含页面的域名 —— 仅有*domain*属性可以设置，但属性值是有限制的：

  - 不允许设置URL中不包含的值
  - 该属性一旦放松就不能再收紧

  ```js
  document.domain;//'www.baidu.com'
  ```

- *referrer*：包含链接到当前页面的那个页面的 *URL*

  ```js
  document.referrer;//'https://www.baidu.com/'
  ```




#### 定位元素
- *document.getElementById( )*

  - 参数为所要获取元素的*ID*，严格区分大小写
  - 返回值
    - 若没有找到返回 *null*
    - 若找到了则返回该元素的引用
    - 如果存在多个相同 *ID* 的元素则返回第一个出现的元素的引用

- *document.getElementByTagName( )*

  - 参数 —— 为所要获取元素的标签名，

  - 返回值 —— 一个 *HTMLCollection* 对象

    - 与 *NodeList* 非常相似

    ```js
    let images = document.getElementByTagName("img");
    alert(images.length);
    alert(images[0]);
    alert(images.item(0))
    ```

    - *namedItem() / [name]* —— 根据元素的 *name* 属性进行访问

- *document.getElementByName( )*：返回具有给定 *name* 属性的所有元素，同为一个 *HTMLCollection* 对象
- *querySelector( )* 
  - 参数 —— *CSS* 选择器参数
  - 返回值 —— 匹配该选择器的**第一个**后代元素，若没有匹配项则返回 *null*
  - *Document* 类型节点上使用 *querySelector( )*方法会从文档元素开始搜索
  - ⭐*Element* 类型节点上使用 *querySelector( )* 方法会从当前元素的**后代**中搜索
- *querySelectorAll( )* —— 接收*CSS*选择器参数，返回一个 *NodeList* 的**静态实例**，包含匹配该选择器的节点
- *matches( )* —— 接收 *CSS* 选择器参数，检测某个元素是否会被 *querySelector( )* 或 *querySelectorAll( )* 方法返回



#### 特殊集合

*document* 对象上暴露了几个为 ==*HTMLCollection*== 对象的特殊集合

- *document.anchors*：包含所有带 *name* 属性的 *\<a>* 元素
- *document.links*：包含所有带 *href* 属性的 *<\a>* 元素
- *document.forms*：包含所有 *\<form>* 元素
- *document.img*：包含所有 *<\img>* 元素
- *document.applets*：已废除






#### *DOM* 兼容性检测
- *document.implementation.hasFeature( )* 

  - 作用 —— 检测浏览器是否支持指定特性和版本
  - 参数 —— 特性名称和 *DOM* 版本

  - 返回值 —— 若支持则返回 *true*




#### 文档写入
- *write( )* —— 接收一个字符串参数，将文本写入网页
- *writeln( )* —— 接收一个字符串参数，将文本写入网页并追加一个换行符(*\n*)
- *open( )* —— 打开网页输出流
- *close( )* —— 关闭网页输出流



## *Element* 类型

- *Element* 类型的节点有以下特征：

  - *nodeType* 等于 *1*
  - *nodeName / tagName* 值为元素的标签名 —— ==始终为大写==，建议使用 *toLowerCase* 处理
  - *nodeValue* 值为 *null*
  - *parentNodes* 值为 *Element*、*Document* 对象
  - 子节点可以是 
    - *Element*
    - *Text*
    - *Comment*
    - *ProcessingInstruction*
    - *CDATASection*
    - *EntityReference*



#### *HTML* 元素

- *id*：元素在文档中的唯一标识符
- *title*：包含元素的额外信息
- *lang*：元素内容的语言代码
- *dir*：语言的书写方向
- *className*：相当于 *class* 属性 —— *class* 为 *JavaScript* 的关键字
```html
<div id="myDiv" class="bd" title="Body text" lang="en" dir="ltr"></div>
```
```js
const div = document.getElementById("myDiv");

alert(div.id);//"myDiv"
alert(div.className);//"bd"
alert(div.title);//"Body text"
alert(div.lang);//"en"
alert(div.dir);//"ltr"
```



#### 操作属性
- *getAttribute( )*
  - 作用 —— 取得属性
  - 参数 —— 实际属性名（包括自定义属性），不区分大小写
  - 返回值 —— 目标属性的属性值，若属性不存在则返回 *null*
  - *style* 属性
    - 使用 *getAttribute()* 访问 *style* 属性返回 *CSS* 字符
    - 通过 *DOM* 对象访问的 *style* 属性返回一个对象
  - 事件处理程序
    - 使用 *getAttribute( )* 访问事件属性返字符串形式的源代码
    - 通过 *DOM* 对象访问的事件属性返回一段 *JavaScript* 代码

- *setAttribute( )*
  - 作用 —— 设置属性，支持设置自定义属性（会被规范为小写形式）
  - 两个参数：
    - 要设置的属性名
    - 要设置的属性值

- *removeAttribute( )* —— 从元素中删除属性，会将整个属性完全从元素中删除




#### *attributes* 属性
- *getNamedItem(name)*：返回 *nodeName* 属性等于 *name* 的节点
- *removeNamedItem(name)*：删除 *nodeName* 属性等于 *name* 的节点
- *setNamedItem(node)*：向列表中添加 *node* 节点，以其 *nodeName* 为索引
- *item(pos)*：返回索引位置 *pos* 处的节点




#### **创建元素**
- 使用 *document.createElement( )* 创建新元素，接收一个参数为要创建元素的标签名

```js
const div = document.createElement("div");
```
- 创建元素后可以使用*appendChild( )*、*insertBefore( )*、*replaceChild( )*将新建元素添加到DOM树中

```js
const div = document.createElement("div");
document.body.appendChlid("div");
```


## *Text* 类型

#### 基本特性

- *nodeType* 等于 *3*

- *nodeName* 为 *“#text”*

- *nodeValue / data* 属性值为文本节点中包含的文本

- *parentNodes* 值为 *Element* 对象

- 不支持子节点



#### 操作方法

- *appendData( text )* —— 向节点末尾添加文本 *text*
- *deleteData(offset, count)* —— 从位置 *offset* 开始删除 *count* 个字符
- *insertData(offset, text)* —— 在位置 *offset* 插入文本 *text*
- *replaceData(offset, count, text)* —— 用 *text* 从 *offset* 位置替换 *count* 个字符
- *splitText(offset)* —— 在 *offset* 位置将当前文本节点拆分为两个文本节点
- *substringData(offset, count)* —— 提取从位置 *offset* 开始的的 *count* 个字符



#### 创建文本节点

- *document.createTextNode( )* —— 参数为要插入节点的文本

  ```js
  const textNode = document.createTextNode("<strong>Hello</strong> world");
  ```

- 需要将其插入到文档中才会在浏览器中显示

  ```js
  const element = document.createElement("div");
  const textNode = document.createTextNode("<strong>Hello</strong> world");
  
  element.appendChild(textNode);
  document.body.appendChild(element);
  ```

- 在一个文本节点作为另一个文本节点的同胞插入后，这两个文本节点的文本之间不会包含空格



#### 规范化文本节点

- *Node* 类型上的 *normalize( )* 方法会将调用节点及其子节点中所有相邻文本节点合并一个文本节点
- 浏览器解析文档时，永远不会创建同胞文本节点



#### 拆分文本节点

- *splitText(offset)* —— 在 *offset* 位置将当前文本节点拆分为两个文本节点
- 应用场景 —— 从文本节点中提取数据的 *DOM* 解析技术







## *DOM* 编程

#### **动态脚本**
动态脚本：在页面初始加载时不存在，之后又通过*DOM*包含的脚本
- 引入外部文件
```html
<script src="index.js"></script>
```
也可通过*DOM*编程实现
```js
let script = document.createElement("script");
script.src = "index.js";
document.body.appendChild("script");
```
- 嵌入源代码
```html
<script>
    function sayHi(){
        alert("Hi!");
    }
</script>
```
也可通过*DOM*编程实现
```js
let script = document.createElement("script");
script.text = "function sayHi(){alert("Hi!");}";
document.body.appendChild(script);
```
通过*innerHTML*属性创建的*<script>*元素永远不会执行
<hr>

#### **动态样式**
动态样式：在页面初始加载时不存在，之后又通过*DOM*包含的样式：
- 使用*<link>*引入外部*CSS*文件
```html
<link rel="stylesheet" type="text/css" href="index.css">
```
也可通过*DOM*编程实现
```js
let link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "index.css";

let head = document.getElementByTagName("head")[0];
head.appendChild(link);
```
通过外部文件加载样式是一个异步过程
- 使用*<style>*元素包含嵌入的CSS规则
```html
<style type = "text/css">
    body{
        background:red;
    }
</style>    
```
也可通过*DOM*编程实现
```js
let style = document.createElement("style");
style.type = "text/css";
style.appendChild(document.createTextNode("body{background:red}"));

let head = document.getElementByTagName("head")[0];
head.appendChild(style);
```









## 元素遍历
- *childElementCount* —— 返回子元素数量
- *firstElementChild* —— 指向第一个 *Element* 类型的子元素 —— *Element* 版 *firstChild*
- *lastElementChild* —— 指向最后一个 *Element* 类型的子元素 —— *Element* 版 *lastChild*
- *previousElementSibling* —— 指向前一个 *Element* 类型的子元素 —— *Element* 版 *previousSibling*
- *nextElementSibling* —— 指向后一个 *Element* 类型的子元素 —— *Element* 版 *nextSibling*




## *HTML5*
#### *CSS* 类扩展
- *getElementByClassName( )*
  - 参数 —— 包含一个或多个类型的字符串
  - 返回值 —— 类名中包含相应类的元素的 *NodeList*
  - ⭐以调用该方法的对象为根元素
    - *Document* 类型节点上使用 *getElementByClassName( )* 方法会返回文档中所有匹配的元素
    - 特定元素上使用 *getElementByClassName( )* 方法当前元素的后代中匹配的元素

- *classList* 属性，简化了对类名的操作

  - *item(index)*

  - *add(value)* —— 向类名列表中添加指定的字符串值 *value*

  - *contains(value)* —— 返回布尔值，表示指定的 *value* 是否存在

  - *remove(value)* —— 从类名列表中删除指定的字符串值 *value*

  - *toggle(value)* —— 如果类名列表中存在指定的字符串值 *value* 则删除；不存在则添加

  ```html
  <div class="class1 class2 class3">
  ```

  ```js
  //删除div的类名中的值class1
  div.classList.remove("class1");
  
  //为div的类名添加值class4
  div.classList.add("class4");
  
  div.classList.toggle("class3");
  div.classList.toggle("class5");
  ```




#### 焦点管理
- *document.activeElement* —— 包含当前拥有焦点的 *DOM* 元素

  - 页面刚刚加载完之后，*document.activeElement* 会设置为 *document.body*

  - 在页面完全加载之前，*document.activeElement* 的值为 *null*


- *document.hasFocus( )* —— 返回一个布尔值，表示文档是否拥有焦点




#### *HTMLDocument* 扩展
- *document.readyState*

  - *loading* —— 表示文档正在加载

  - *complete* —— 表示文档加载完成


- *document.compatMode* —— 指示浏览器当前处于什么渲染模式

  - *CSS1Compat* —— 标准模式

  - *BackCompat* —— 混杂模式


- *document.head* —— 始终指向文档的 *\<head>*元素




#### 字符集属性
*document.characterSet* —— 表示文档实际使用的字符集，默认值为*"UTF-16"*，可用于修改该属性修改字符集




#### 自定义数据属性
*HTML5*允许给元素指定非标准属性，但要使用*data-*前缀以便告诉浏览器
```html
<div id="myDiv" data-appID="12345" data-myname="abc"></div>
```
可以通过元素的 *dataset* 属性访问，*dataset* 属性是一个 *DOMTokenList* 实例
```js
let div = document.getElementById("myDiv");

let appID = div.dataset.appID;
let myName = div.dataset.myname;

div.dataset.appID = 123456;
div.dataset.myname = "ABC";
```



#### 插入标记
- *innerHTML*

  - 读取 *innerHTML* 属性 —— 返回元素所有后代的 *HTML* 字符串，包括元素、注释和文本节点

  - 写入 *innerHTML* 属性 —— 根据提供的字符串值以新的 *DOM* 子树代替元素中原来包含的所有节点


-  *outerHTML* 属性

  - 读取 *outerHTML* 属性 —— 返回调用它的元素及所有后代的 *HTML* 字符串，包括元素、注释和文本节点

  - 写入 *outerHTML* 属性 —— 调用它的元素会被传入的*HTML*字符串经过解释之后生成的*DOM*子树取代


- *insertAdjacentHTML( )* 与 *insertAdjacentText( )*

  - 参数 —— 要插入的标记和要插入的HTML或文本

  - 其中第一个参数的值必须为：

    - *"beforebegin"*：插入当前元素前面，作为前一个同胞节点
    - *"afterend"*：插入当前元素后面，作为下一个同胞节点
    - *"afterbegin"*：插入当前元素内部，作为新的子节点或放在第一个子节点前面
    - *"beforeend"*：插入当前元素内部，作为新的子节点或放在最后一个子节点前面




#### *scrollIntoView()*
*scrollIntoView()*这个方法存在于所有*HTML*元素上，可以滚动浏览器窗口或容易元素以便包含元素进入视口；这个方法参数如下：

1. *alignToTop* —— 布尔值：
- *true*：窗口滚动后，元素的顶部于视口顶部对齐
- *false*：窗口滚动后，元素的底部于视口底部对齐
2. *scrollIntoViewOptions* —— 选项对象：
- *behavior*：过渡动画 —— *"auto"(默认)*和*"smooth"*
- *block*：垂直方向的对齐 —— *"start"(默认)*、*"center"*、*"end"*、*"nearest"*
- *inline*：水平方向的对齐 —— *"start"(默认)*、*"center"*、*"end"*、*"nearest"*
3. 不传入参数 —— *alignToTop = true*
<hr>
<br>

## 专有扩展
#### **children属性**
*children*属性是一个*HTMLCollection*，只包含元素的*Element*类型的子节点

<hr>

#### **contains()方法**
*contains()*方法可以让开发者在不遍历*DOM*的情况下确定一个元素是否为另一个元素的后代，由要搜索的祖先元素调用，并传入目标节点作为参数

<hr>

#### **插入标记**
两个未被纳入*HTML5*的属性
- *innerText*
- *outerText*
<hr>