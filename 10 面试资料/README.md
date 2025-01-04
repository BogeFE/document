# HTML

1. [cookie & localStorage & sessionStorage](https://juejin.cn/post/6844903516826255373?searchId=20250104145004F844BD1A5775C4E8CF5D)

2. `<script>` & `<script async>` & `<script defer>`

3. 标准模式 Standard & 怪异模式 Quirks

4. [`<meta name="viewport">`](https://juejin.cn/post/6844903943298891790)

# CSS

![CSS](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6b28ec9e7a24c7c90a55e6429fdc016~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

1. 标准盒模型 & IE 盒模型

   ![standard](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0f50417c11ab478388263512fbd2bd55~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

   ![IE](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac20b596101a416eb2cd7f4abfdbb22c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

2. CSS 选择器

   1. [选择器种类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_selectors)

   2. [选择器优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)

      ![specificity](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b226c55b87c426c840d2c70d51d3511~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

   3. [@规则](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule)

3. [CSS 定位规则](https://juejin.cn/post/6886247611318140942?searchId=20250104150551355939981B221FDADCC9#heading-11)

   - 浮动 —— 清除浮动

   - BFC

   - 定位

4. 水平垂直居中方案

   - 水平居中

     1. 行内元素 —— 父元素 `text-align: center`

     2. 块级元素 —— 元素自身 `margin: 0 auto`

     3. 绝对定位 —— 元素自身 `left: 50%; transform: translateX(-50%)`

     4. flex 布局 —— 父元素 `display: flex; justify-content: center`

   - 垂直居中

     1. 单行行内元素 —— 元素 `line-height: height`

     2. 多行行内元素 —— 父元素 `display: table-cell; vertical-align: middle`

     3. 绝对定位 —— 元素自身 `top: 50%; transform: translateY(-50%)`

     4. flex 布局 —— 父元素 `display: flex; align-items: center`

5. CSS 函数

6. 预编译器 —— Sass

7. CSS 命名规则 BEM