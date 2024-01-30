# 基本语法

<a href="https://www.ruanyifeng.com/blog/2015/07/flex-examples.html">Flex 布局实例</a>

```css
.container{
    display: flex;
    display: -webkit-flex;
}
```

**设为 *Flex* 布局以后，子元素的 *float*、*clear* 和 *vertical-align* 属性将失效**



#### 基本概念

###### <img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png" alt="img" style="zoom: 150%;" />

容器默认存在两根轴：

- 主轴（*main axis*）—— 默认为水平轴
- 交叉轴（*cross axis*）—— 默认为垂直轴



#### 容器的属性

*flex* 容器上有 *6* 个属性可设置

| **属性**          | **作用**                               |
| ----------------- | :------------------------------------- |
| *flex-direction*  | 主轴方向，即 *flex item* 的排列方向    |
| *flex-wrap*       | *flex item* 换行方式                   |
| *flex-flow*       | *flex-direction* 和 *flex-wrap* 的简写 |
| *justify-content* | 在主轴上的对齐方式                     |
| *align-items*     | 在交叉轴上的对齐方式                   |
| *align-content*   | 定义多根轴线的对齐方式                 |

- *flex-direction* —— 决定主轴的方向，即 *flex item* 的排列方向
  - *row* —— **默认值**，水平方向排列，起点在**左端**
  - *row-reverse* —— 水平方向排列，起点在**右端**
  - *column* —— 垂直方向排列，起点在**上沿**
  - *column-reverse* —— 垂直方向排列，起点在**下沿**

###### ![img](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071005.png)

- *flex-wrap* —— 决定 *flex item* 的换行方式

  - *nowrap* —— 默认不换行，即主轴的长度是固定并且空间不足时，项目尺寸会随之进行调整

  ###### <img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071007.png" alt="img" style="zoom: 67%;" />

  - *wrap* —— 换行，第一行在上方

  ###### <img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071008.jpg" alt="img" style="zoom: 67%;" />

  - *wrap-reverse* —— 换行，第一行在下方

  ###### <img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071009.jpg" alt="img" style="zoom: 67%;" />

- *flex-flow* —— *flex direction* 和 *flex wrap* 的简写形式

  - 默认值 —— *row nowrap*

- ***justify-content*** —— 决定 *flex item* 在主轴上的**对齐方式**

  - *flex-start* —— 默认值；左对齐
  - *flex-end* —— 右对齐
  - *center* —— 居中
  - *space-between* —— 两端对齐，***flex item* 之间间隔相等**
  - *space-around* —— *flex item* 之间间隔相等

  ###### <img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071010.png" alt="img" style="zoom: 80%;" />

- ***align-items*** —— 定义 *flex item* 在交叉轴上如何对齐

  - *flex-start* —— 交叉轴的起点对齐
  - *flex-end* —— 交叉轴的终点对齐
  - *center* —— 交叉轴的中点对齐
  - *baseline* —— *flex item* 内第一行文字的基线对齐
  - *stretch* —— 默认值；**如果 *flex item* 没有设置高度或者为 *auto*，则占满整个容器的高度**
  
  ###### <img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png" alt="img" style="zoom:80%;" />
  
- ***align-content*** —— 定义多根轴线的对齐方式（当 *item* 的排列出现换行时就会出现多根轴线）

  - *flex-start* —— 与交叉轴的起点对齐
  - *flex-end* —— 交叉轴的终点对齐
  - *center* —— 交叉轴的中点对齐
  - *space-between* —— 与交叉轴两端对齐，轴线之间的间隔平均分布
  - *space-around* —— 每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
  - *stretch* —— 默认值；轴线占满整个交叉轴

  ###### <img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png" alt="img" style="zoom:80%;" />

#### *flex item* 的属性

以下6个属性设置在 *flex item* 上

| 属性          | 作用                                            |
| ------------- | ----------------------------------------------- |
| *order*       | 排列顺序号，默认为0                             |
| *flex-grow*   | 放大比例，默认为0                               |
| *flex-shrink* | 缩小比例，默认为1                               |
| *flex-basis*  | 占据主轴空间，默认auto                          |
| *flex*        | *flex-grow*、*flex-shrink*、*flex-basis* 的简写 |
| *align-self*  | 独立的对齐方式                                  |

- ***order*** —— *flex item* 排列顺序；**数值越小越靠前，默认为 *0***
- ***flex-grow*** —— *flex item* 的放大比例
  - **默认为0** —— 即使存在剩余空间也不进行放大
  - 如果所有项目的 *flex-grow* 属性都为 *1*，则它们将等分剩余空间
  - 如果一个项目的 *flex-grow* 属性为 *2*，其他项目都为 *1*，则前者占据的剩余空间将比其他项多一倍

###### ![img](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071014.png)

- ***flex-shrink*** —— *flex item* 的缩小比例
  - 不能设置为负值
  - **默认值为1** —— 如果空间不足，该 *flex item* 将缩小
  - 如果所有 *flex item* 的 *flex-shrink* 都为 *1* —— 空间不足时将等比例缩小
  - 如果有一个 *flex item* 的 *flex-shrink* 都为 *0* ，而其他 *flex item* 的 *flex-shrink* 都为 *1* —— **空间不足时前者将不会缩小**
  
  ###### <img src="https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071015.jpg" alt="img" style="zoom:80%;" />

- ***flex-basis*** —— 分配了多余空间之前，该 *flex item* 占据的主轴空间
  - 默认为 *auto* —— *flex item* 本身的大小
  - 需要搭配 *flex-grow* 和 *flex-shrink* 使用才能生效
  - 可设置为与 *width* 或 *height* 属性一样的值 —— 则 *flex item* 将**占据固定空间**
- ***flex*** —— *flex-grow*、*flex-shrink* 和 *flex-basis* 的简写
  - 默认值为： *0 1 auto* —— 有剩余空间时只放大不缩小
  - 快捷键：
    - *auto* —— *1 1 auto* —— 尺寸不足时优先**最大化**内容尺寸
    - *1 1 0%* —— 尺寸不足时优先最小化内容尺寸
    - *none* —— *0 0 auto* —— 有剩余空间时不放大不缩小
    - ⭐*0 1 0%* —— 当有剩余空间时，项目宽度为其**内容的宽度**
- ***align-self*** —— 独立的对齐方式，可覆盖 *align-items* 属性
  - *auto* —— 默认值，继承父元素的 *align-items* 属性
  - *flex-start* —— 交叉轴的起点对齐
  - *flex-end* —— 交叉轴的终点对齐
  - *center* —— 交叉轴的中点对齐
  - *baseline* —— *flex item* 内第一行文字的基线对齐
  - *stretch* —— **如果 *flex item* 没有设置高度或者为 *auto*，则占满整个容器的高度**



# *Flex* 布局实例



## 骰子布局

#### 单项目

![image-20210909121112324](C:\Users\ThunderUp\AppData\Roaming\Typora\typora-user-images\image-20210909121112324.png)

- 左上角 —— 默认值

```css
.container{
    display: flex;
}
```

- 上居中

```css
.container{
    display: flex;
    justify-content: center;
}
```

- 右上角

```css
.container{
    display: flex;
    justify-content: flex-end;
}
```

- 左居中

```css
.container{
    display: flex;
    align-items: center;
}
```

- 正中心

```css
.container{
    display: flex;
    justify-content: center;
    align-items: center;
}
```

- 右居中

```css
.container{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
```

- 左下角

```css
.container{
    display: flex;
    align-items: flex-end;
}
```

- 下居中

```css
.container{
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
```

- 右下角

```css
.container{
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}
```

#### 双项目

###### ![image-20210909144752285](C:\Users\ThunderUp\AppData\Roaming\Typora\typora-user-images\image-20210909144752285.png)

- ```css
  .container{
      display: flex;
      justify-content: space-between;
  }
  ```

- ```css
  .container{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  }
  ```

- ```css
  .container{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
  }
  ```

- ```css
  .container{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
  }
  ```

- ```css
  .container{
      display: flex;
  }
  .item:nth-child(2){
      align-self: center
  }
  ```

- ```css
  .container{
      display: flex;
      justify: space-between;
  }
  .item:nth-child(2){
      align-self: flex-end;
  }
  ```
#### 三项目
###### ![image-20210909145529937](C:\Users\ThunderUp\AppData\Roaming\Typora\typora-user-images\image-20210909145529937.png)

```css
.container{
    display: flex;
}
.item:nth-child(2){
    align-self: center;
}
.item:nth-child(3){
    align-self: flex-end;
}
```

#### 四项目

###### ![image-20210909150718345](C:\Users\ThunderUp\AppData\Roaming\Typora\typora-user-images\image-20210909150718345.png)

- ```css
  .container{
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      align-content: space-between;
  }
  ```

- ```html
  <div class="box">
    <div class="column">
      <span class="item"></span>
      <span class="item"></span>
    </div>
    <div class="column">
      <span class="item"></span>
      <span class="item"></span>
    </div>
  </div
  ```

  ```css
  .box{
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
  }
  .column{
      display: flex;
      flex-basis: 100%;
      justify-content: space-between;
  }
  ```

#### 六项目

###### ![image-20210909152058540](C:\Users\ThunderUp\AppData\Roaming\Typora\typora-user-images\image-20210909152058540.png)

- ```css
  .container{
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
  }
  ```

- ```css
  .container{
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-content: space-between;
  }
  ```

- ```html
  <div class="box">
    <div class="row">
      <span class="item"></span>
      <span class="item"></span>
      <span class="item"></span>
    </div>
    <div class="row">
      <span class="item"></span>
    </div>
    <div class="row">
       <span class="item"></span>
       <span class="item"></span>
    </div>
  </div>
  ```

  ```css
  .box{
      display: flex;
      flex-wrap: wrap;
  }
  .row{
      display: flex;
      flex-basis: 100%;
  }
  .row:nth-child(2){
      justify-content: center;
  }
  .row:nth-child(3){
      justify-content: space-between;
  }
  ```

#### 九项目

  ###### ![image-20210909152536577](C:\Users\ThunderUp\AppData\Roaming\Typora\typora-user-images\image-20210909152536577.png)

```css
.container{
    display: flex;
    flex-wrap: wrap;
}
```

