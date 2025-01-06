# CSS 多栏布局

1. [双栏布局](#双栏布局)

2. [三栏布局](#三栏布局)

3. [圣杯布局和双飞翼布局](#圣杯布局和双飞翼布局)

## 双栏布局

双栏布局非常常见，往往是以一个 **定宽栏** 和一个 **自适应的栏** 并排展示存在

### 基本思路

- 左侧组件使用 _float: left_

- 右侧组件使用 _margin-left_

  ```html
  <body>
    <div class="box">
      <div class="left">左边</div>
      <div class="right">右边</div>
      文本内容
    </div>
  </body>

  <style>
    .left {
      float: left;
      width: 200px;
      background-color: rgb(241, 136, 136);
      height: 400px;
    }
    .right {
      margin-left: 210px;
      background-color: rgb(140, 140, 201);
      height: 200px;
    }
  </style>
  ```

### 清除浮动

浮动的元素会脱离文档流，对一个元素应用了浮动，所有接下来的元素都会环绕它直到内容处于它下方且开始应用正常文档流

- 将父级也设置成浮动 —— 层层相联，弊大于利

  ```css
  .box {
    float: left;
  }
  ```

- 给父级增加定位 _absolute_ —— _position: absolute_ 也会脱离文档流

  ```css
  .box {
    position: absolute;
  }
  ```

- 给父级设置 _overflow: hidden_ —— 将父级元素变为 _BFC_

  ```css
  .box {
    overflow: hidden;
  }
  ```

- 给父级设置对应的高度 —— 不够灵活

- 在末尾增加空元素进行 _clear_ —— 增加了页面的**渲染负担**

  ```html
  <body>
    <div class="box">
      <div class="left">左边</div>
      <div class="right">右边</div>
      <div style="clear:both"></div>
    </div>
  </body>
  ```

- 给父级添加伪元素进行 _clear_

  ```css
  .box::after {
    clear: both;
  }
  ```

### BFC

- 块格式化上下文（_Block Formatting Context，BFC_），决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，简单来说，_BFC_ 是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局

- 触发 _BFC_ 的条件

  - 根元素 _html_ 标签

  - _float_ 属性不为 _none_ 的时候

  - _overflow_ 属性不为 _visible_ 的时候

  - _display_ 属性为 _inline-block、table-cell、table-caption、flex、inline-flex_ 的时候

  - _position_ 属性为 _absolute_ 或 _fixed_ 的时候

  - *contain*值为 _layout, content, paint_ 的时候

- 作用

  - 解决 _margin_ 重叠问题 —— _BFC_ 属于独立区域，内部元素和外部元素互不影响
    - 两个块级元素的上下边距 _margin_ 会取其中较大值作为合并值 —— 仅出现在垂直方向上
    - 兄弟元素重叠 —— 底部元素设置为 _BFC_
    - 父子元素重叠
  - 解决高度高度塌陷问题 —— 将父元素变成 _BFC_ 即可将浮动的子元素重新收回

## 三栏布局

所谓三栏布局：两边定宽，中间自适应

### 基础 _HTML_ 结构

```html
<body>
  <div class="container">
    <div class="main"></div>
    <div class="left"></div>
    <div class="right"></div>
  </div>
</body>
```

### 通过 _position + margin_ 实现三栏布局

- 父元素相对定位，左右两栏绝对定位

  ```css
  .box {
    position: relative;
  }
  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    background-color: rgb(252, 120, 212);
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    background-color: rgba(196, 61, 166, 0.13);
  }
  .middle {
    margin: 0 210px;
    height: 200px;
    background-color: rgb(130, 130, 240);
  }
  ```

### 通过浮动实现

- 将 _HTML_ 中的中间部分的标签放置于左右侧栏下方

- 左右两栏使用 _float_ 浮动到对应位置

- 中间部分使用 _margin_ 属性进行撑开

  ```css
  .box {
    overflow: hidden;
  }
  .left {
    float: left;
    width: 200px;
    height: 200px;
  }
  .right {
    float: right;
    width: 200px;
    height: 200px;
  }
  .middle {
    height: 200px;
    margin-left: 210px;
    margin-right: 210px;
  }
  ```

## 圣杯布局和双飞翼布局

特点：中间栏放在父元素的第一子位置，以优先渲染

### 圣杯布局

- 左、中、右都**向左浮动**

- 设置父元素 _padding_ 值为左、右侧栏预留位置

- 中间栏的宽度设置为 _100%_ 占满整个父元素

- 左侧栏的 _margin-left_ 设置为 _-100%_ ，即可向左移动整个父元素长度，到达中间栏最左侧

- 右侧栏的 _margin-left_ 设置为自身宽度的负值，即可到达中间栏的最右侧

- 左、右侧栏都设置为相对定位，并设置左元素的 _left_ 和右元素的 _right_ 为内边距的宽度的负值

  ```css
  .box {
      overflow: hidden;
      padding: 0 210px;
  }
  .middle {
      float: left;
      width: 100%;
      height: 200px;
  }
  .left {
      position: relative;
      float: left;
      width: 200px;
      height: 200px;
      margin-left: -100%
      left: -210px;
  }
  .right {
      position: relative;
      float: left;
      width: 200px;
      height: 200px;
      margin-left: -200px;
      right: -210px;
  }
  ```

### 使用 flex 布局实现圣杯布局

```css
.box {
  display: flex;
  flex: 1;
  min-height: 200px;
}
.middle {
  flex: 1;
}
.left,
.right {
  flex: 0 0 12em;
}
.left {
  order: -1;
  margin-right: 10px;
}
.right {
  margin-left: 10px;
}
```

### 双飞翼布局

- 左、中、右 **向左浮动**

- 中间栏的宽度设置为 _100%_ 占满整个父元素

- 左侧栏的 _margin-left_ 设置为 _-100%_ ，即可向左移动整个父元素长度，到达中间栏最左侧

- 右侧栏的 _margin-left_ 设置为自身宽度的负值，即可到达中间栏的最右侧

- **设置中间栏的子元素 _margin_ 值为左、右侧栏预留位置**

  ```css
  .box {
    overflow: hidden;
  }
  .middle {
    float: left;
    width: 100%;
  }
  .middle .content {
    margin: 0 210px;
    height: 200px;
  }
  .left {
    float: left;
    width: 200px;
    height: 200px;
    margin-left: -100%;
  }
  .right {
    float: left;
    width: 200px;
    height: 200px;
    margin-left: -200px;
  }
  ```

### 二者的区别

- 圣杯布局通过设置 **父元素的 padding** 为左、右侧栏预留位置，且需要 **设置左、右侧栏为相对定位 relative** 并设置左元素的 left 和右元素的 right 为内边距的宽度的负值
- 双飞翼布局通过设置 **中间栏的子元素的 *margin*** 为左、右侧栏预留位置

- 总结 —— **双飞翼比圣杯多了一个嵌套元素，但是少了左右元素的定位。**
