## *BOM*

*BOM*：浏览器对象模型，*Browser Object Model*

*BOM* 提供了与网页无关的浏览器对象功能，是使用 *JavaScript* 开发*Web* 应用程序的核心



## *window* 对象

*BOM* 的核心是*window* 对象，代表浏览器的实例，在浏览器中有两重身份

- *ECMAScript* 中的 *Global* 对象
- 浏览器窗口的 *JavaScript* 窗口

网页中定义的所有对象、变量、函数都是以 *window* 作为其 *Global*对象，都可以访问其上定义的全局方法



#### *Global* 作用域

- 通过 *var* 声明的所有全局变量和函数都会成为 *window* 对象的属性和方法

  ```js
  var age = 29;
  var sayAge = () => alert(this.age);
  
  alert(window.age);//29
  sayAge();//29
  window.sayAge();//29
  ```

- 使用 *let* 或 *const* 声明的变量和方法不会添加给*window* 对象



#### 窗口关系

- *window.top*：*top* 对象指向最上层（最外层）窗口，即浏览器窗口本身
- *window.parent*：*parent* 对象指向当前窗口的父窗口
- *window.self*：*self* 对象指向 *window*，是终极 *window* 属性



#### 窗口位置与像素比

- 表示页面窗口相对于屏幕左侧和顶部的位置的属性，返回值的单位是 *CSS* 像素：

  - *screenLeft*

  - *screenTop*


- 移动窗口的方法：

  - *moveTo( )*：接收要移动到的新位置的绝对坐标 *(x,y)*

    ```js
    //将窗口移动到左上角
    window.moveTo(0,0);
    ```

  - *moveBy( )*：接收相对当前位置在两个方向上移动的像素数

    ```js
    //将窗口向下移动100px
    window.moveBy(0,100);
    ```

- 表示物理像素与 *CSS* 像素的转换比率 —— *window.devicePixelRatio*



#### 窗口大小

- 现代浏览器提供的窗口大小相关属性

  - *outerWidth* —— 返回浏览器自身窗口的宽度

  - *outerHeight* —— 返回浏览器自身窗口的高度

  - *innerWidth* /*document.documentElement.clientWidth* —— 返回浏览器窗口中页面视口的宽度（不包含浏览器边框和工具栏）

  - *innerHeight* /*document.documentElement.clientHeight* —— 返回浏览器窗口中页面视口的高度（不包含浏览器边框和工具栏）

  ###### ![image-20210912094739708](C:\Users\ThunderUp\AppData\Roaming\Typora\typora-user-images\image-20210912094739708.png)

- 调整窗口大小的方法：

  - *resizeTo( )*：接收新的宽度和高度值

  - *resizeBy( )*：接收宽度和高的的缩放比






#### 视口位置

- 文档相对于视口滚动距离的属性有两对，**返回相同的值**：

  - *window.pageXoffset* |*window.scrollX*

  - *window.pageYoffset* |*window.scrollY*


- 滚动页面的方法：

  - *scroll( )*：接收要滚动到的坐标 *(x,y)*

  - *scrollTo( )*：接收要滚动到的坐标 *(x,y)*

  - *scrollBy( )*：接收相对当前位置在两个方向上移动的距离

  - 这三个方法可以接受一个对象作为参数，其中包含偏移值以及表示是否平滑滚动的*behavior*

    ```js
    window.scrollTo({
        left: 100,
        top: 100,
        behavior: 'smooth'
    });
    ```




#### 导航与打开新窗口

*window.open( )* 返回一个对新建窗口的引用，接收*4*个参数

- 要加载的 *URL*
- 目标窗口：
  - 一个已存在的窗口或窗格 *frame* 名字
  - 特殊窗口名：*_sefl*、*_parent*、*_top*、*_blank*
- 特性字符串 —— 指定新窗口的配置
  - 若不传入第三个参数，则新窗口带有默认值
  - 若打开的不是新窗口，则忽略第三个参数
- 表示新窗口在浏览器历史记录中是否代替当前加载页面的布尔值

*window.close( )*关闭当前窗口，**只适用于关闭*window.open()*创建的弹出窗口**

对于第三个参数，特性字符串是一个用逗号分隔的设置字符串，用于指定新窗口包含的特性

| 参数         | 取值范围      | 说明                                 |
| ------------ | ------------- | ------------------------------------ |
| *fullscreen* | *yes/no*      | 表示新窗口是否最大化，**仅*IE*支持** |
| *height*     | *pixel value* | 窗口高度，不小于*100*                |
| *Width*      | *pixel value* | 窗口宽度，不小于*100*                |
| *left*       | *pixel value* | 窗口的*x*轴坐标，不能是负值          |
| *top*        | *pixel value* | 窗口的*y*轴坐标，不能是负值          |
| *location*   | *yes/no*      | 位置栏是否可见                       |
| *menubar*    | *yes/no*      | 菜单栏是否可见，默认*no*             |
| *resizable*  | *yes/no*      | 窗口大小是否可调整，默认*no*         |
| *scrollbars* | *yes/no*      | 窗口是否可有滚动栏，默认*no*         |
| *toolbar*    | *yes/no*      | 窗口工具栏是否可见，默认*no*         |
| *status*     | *yes/no*      | 窗口显示栏是否可见                   |

这些设置需要**以逗号分隔的名值对**出现，不能包含空格

```js
window.open("http://www.baidu.com",
            "framName",
            "height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no")
```



新建的*window*对象有一个*opener*属性，指向将它打开的页面，且只对*window.top*对象有定义

将*opener*属性设置为*null*，表示新打开的标签页不需要与将其打开的标签页进行通信，且**无法恢复连接**

<hr>


#### 定时器

- *setTimeout( )*：指定在一段时间后执行某些代码

  ```js
  setTimeout(() => alert('Hello World'),1000);
  ```

  - 第一个参数可以是包含 *JavaScript* 代码的字符串或者函数
  
  - 第二个参数告诉 *JavaScript* 引擎在指定毫秒数过后将任务添加到任务队列中

  - 返回一个表示该超时排期的数值 *ID*，可在指定时间之前使用 *clearTimeout( )* 取消超时任务
  
    ```js
    let timeoutID = setTimeout(()=>alert('Hello World'),1000);
    
    clearTimeout(timeoutID);
    ```


- *setInterval( )*：指定每隔一段时间执行段某些码

  ```js
  setInterval(() => alert('Hello World'),10000);
  ```

    - 第一个参数可以是包含 *JavaScript* 代码的字符串或者函数

    - 第二个参数告诉 *JavaScript* 引擎在指定毫秒数过后将任务添加到任务队列中

    - 返回一个表示该循环定时的数值*ID*，可在指定时间之前使用 *clearIntervalt( )* 取消循环定时

      ```js
      let timeoutID = setInterval(() => alert('Hello World'),10000);
      
      clearInterval(timeoutID);
      ```




## 系统对话框

浏览器调用系统对话框向用户显示消息的方法：

- *alert( )*：警告框，只接收一个参数
  
  - 显示字符串
  - 不是原始字符串则调用 *toString( )* 转换成字符串
  
- *confirm( )*：确认框
  
  - 点击 *OK* 按钮返回 *true*
  
  - 点击 *Cancel* 按钮返回 *false*
  
    ```js
    if(confirm("Are you sure?")){
        alert("I'm so glad you're sure!");
    }else{
        alert("I'm so glad you're not sure!");
    }
    ```

- *promt( )*：提示框，接受两个参数

  ```js
   promt(要显示给用户的文本,文本框的默认值)
  ```

  - 点击 *OK* 按钮返回文本框中的值
  - 点击 *Cancel* 按钮返回 *null*

- *JavaScript* 还有两种异步显示的对话框：

  - *find( )*	

  - *print( )*




# *location* 对象

- *location* 对象提供了当前窗口中加载文档的信息，以及通常的导航功能

- *location* 对象既是 *window* 的属性，也是 *document* 的属性——*window.location* 和 *document.location*指向同一个对象

- *location* 对象存储着把 *URL* 解析为离散片段后能够通过属性访问的信息

````
http://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=javascript#contents
````

| 属性                | 值                                                           | 说明                                                         |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| *location.hash*     | *#contents*                                                  | 返回 *URL* 中的 *hash*（*#*号后跟零或多个字符），如果不包含则返回空字符串*""* |
| *location.host*     | *www.wrox.com:80*                                            | 服务器名称和端口号                                           |
| *location.hostname* | *www.wrox.com*                                               | 服务器名称                                                   |
| *location.href*     | *http://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=javascript#contents* | 当前加载页面的完整 *URL*                                     |
| *location.pathname* | */WileyCDA/*                                                 | 返回*URL*中的目录和（或）文件名                              |
| *location.port*     | *80*                                                         | *URL* 中指定的端口号，如果没有返回空字符串                   |
| *location.protocal* | *http:*                                                      | 页面使用的协议                                               |
| *location.search*   | *?q=javascript*                                              | *URL* 的查询字符串，以 *?* 开头                              |
| *location.username* | *foouser*                                                    | 域名前指定的用户名                                           |
| *location.password* | *barpassword*                                                | 域名前指定的密码                                             |
| *location.origin*   | *www.wrox.com*                                               | *URL* 的源地址                                               |



#### 查询字符串

可以通过 *URLSearchParams* 对查询字符串进行检查和修改

- 给 *URLSearchParams( )* 构造函数传入一个查询字符串创建实例

  ```js
  const sp = new URLSearchParams("?q=javascript&num=10").toString();//'q=javascript&num=10'
  ```

- *has(key: stirng): boolean*

  ```js
  console.log(sp.has("num"));//true
  ```

- *get(key: stirng)*

  ```js
  console.log(sp.get("num"));//10
  ```

- *set(key,val)*

  ```js
  sp.set("page","3");
  console.log(sp.toString());//q=javascript&num=10&page=3
  ```

- *delete(key)*

  ```js
  sp.delete("q");
  console.log(sp.toString());//num=10&page=3
  ```

- *URLSearchParams* 实例可用作迭代对象

  ```js
  sq[Symbol.iterator]();//Iterator {}[[Prototype]]: Iterator
  ```

  



#### 操作地址

- 使用 *location.assign( )* 并传入一个 *URL*：会立即导航到新 *URL* 并**在历史记录中增加一条记录**

  ```js
  location.assign("http://www/wrox.com");
  ```

- 设置 *location.href* 或 *window.location* 会执行与 *assign( )* 同样的操作

  ```js
  location.href = "http://www/wrox.com";
  window.location = "http://www/wrox.com";
  ```

- 除了*hash*之外，只要修改*location*对象的任一属性都会导致页面重新加载新的URL

  ```js
  location.hash = "#hash1";
  location.search = "?q=java";
  location.hostname = "www.baidu.com";
  location.pathname = "pathname1";
  location.port = 8080;
  ```

- 若不希望增加历史记录 —— 使用 *replace( )* 方法
- 使用 *reload( )* 方法
  - 若不传入参数，页面会以最有效的方式重新加载
  - 传入*true*作为参数则会强制服务器重新加载




# *navigator* 对象

只要浏览器启用 *JavaScript*，*navigator* 对象就一定存在

*navigator* 对象实现了如下接口所定义的属性和方法

- *NavigatorID*
- *NavigatorLanguage*
- *NavigatorOnLine*
- *NavigatorGeolocation*
- *NavigatorPlugins*
- *NavigatorUserMedia*
- *NetworkInformation*

<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator">Navigator对象实现的属性和方法</a>

*navigator*对象的属性通常用于确定浏览器类型



#### 检测插件

通过 *plugins* 数组来检测浏览器是否安装某个插件，每个数组项包含如下属性：

- *name*：插件名称
- *description*：插件介绍
- *filename*：插件的文件名称
- *length*：由当前插件处理的*MIME*类型数量

插件检测就是遍历浏览器可用的插件，并逐个比较插件名称

```js
for(let plugin of window.navigator.plugins){    
    if(plugin.name.toLowerCase().indexOf(pluginName) > -1){
        return true;    
    }    
	return false
}
```



#### 注册处理程序

使用 *Navigator.registerProtocolHandler(scheme, url, title)* 方法将一个网站注册为处理某种特定类型信息应用类型：

- *scheme*：一个包含站点希望处理的协议的字符串。
- *url*：处理器的 *URL*
- *title*：一个用户可理解的处理器标题

```js
navigator.registerProtocolHandler("mailto","http://www.baidu.com","Some Mail Client");
```



# *screen* 对象

*window.screen* 对象包含用户屏幕的信息

| 属性                 | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| *screen.height*      | 返回屏幕的高度                                               |
| *screen.width*       | 返回屏幕的宽度                                               |
| *screen.left*        | 返回从最左边界到当前屏幕的像素值。                           |
| *screen.top*         | 返回从顶端边界到当前屏幕的像素值。                           |
| *screen.availHeight* | 返回访问者屏幕的高度（屏幕像素高度-系统组件高度）            |
| *screen.availWidth*  | 返回访问者屏幕的宽度（屏幕像素宽度-系统组件宽度）            |
| *screen.availLeft*   | 返回屏幕左边边界的第一个像素点（没有被系统组件占用的屏幕的最左侧像素） |
| *screen.availTop*    | 返回屏幕顶端边界的第一个像素点（没有被系统组件占用的屏幕的最顶端像素） |
| *screen.colorDepth*  | 返回屏幕的色彩深度                                           |
| *screen.pixelDepth*  | 屏幕的位深                                                   |
| *Screen.orientation* | 返回当前屏幕的转向                                           |






# *history* 对象

*window.history* 对象包含浏览器导航历史记录，出于安全考虑不会暴露访问过的 *URL*




#### 导航

- *go( )* 方法可在用户历史记录中任何方向导航
  - 参数为整数：表示前进或后退的步数
  - 参数为字符串：导航到历史中包含该字符串的第一个位置；若没有匹配项则静默处理


- *history.forward( )*：前进一页
- *history.back( )*：后退一页

- *history* 对象的 *length* 属性表示历史记录的数量



#### 历史状态管理

- *history.pushState( )*—— 开发者改变浏览器 *URL* 而不会加载新页面

  - 接收三个参数：

    - 一个 *state* 对象 —— 只包含被序列化的信息

    - 一个新状态的标题

    - 一个可选的相对 *URL*

      ```js
      let stateObj = { foo : "bar" };
      history.pushState(stateObj,"My title","baz.html");
      ```

  - 浏览器不会向服务器发起请求

  - 点击后退按钮会触发 *window* 对象上的 *popstate* 事件，*popstate* 事件的时间对象有一个 *state* 属性包含了 *pushState( )* 所传入的第一个参数 *state* 对象

    ```js
    window.addEventListner("popstate", event => {    
        let state = event.state;    
        if(state){        
            processState(state);    
        }
    })
    ```

    **页面初次加载时没有状态，因此点击*back*按钮直到返回最初页面时，*event.state = null***

- *history.state* —— 用于获取当前的状态**对象**

- *history.replaceState( )* —— 不创建新历史记录，只是覆盖当前状态

  ```js
  let stateObj = { foo: "bar" };
  history.pushState(stateObj,"My title","baz.html");
  history.replaceState(stateObj,"New title");
  ```

  

  
