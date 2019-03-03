# 这是一个NB的项目
## 牛不牛比用心去感受每一行代码中的诗情雅意

### 我们是有灵魂的程序员，所以我们的代码富有诗意

#### 丫的，实在编不下去了,哈哈哈

## [主流开原协议之间有何异同？](https://www.zhihu.com/question/19568896/answer/20907890)

## 用传统方式（命令行）把修改过后的代码上传到码云？

1. git add .
2. git commit -m '提交信息'
3. git push

// 初始使用：
到项目文件夹下
git config --global user.name "panGit"
git config --global user.email "2074992712@qq.com"

git init
git add .
git commit -m '提交信息'

git remote add remote origin https://gitee.com/testPan/vue-cms.git
git push -u origin master

## 制作首页中的App组件，
1. 完成Header区域，使用的Mint-UI中的Header组件
2. 制作底部的Tabbar区域，使用的是MUI的Tabbar.html
    + 在制作购物车小图标时候，操作会相对多一些
    + 先把扩展图标的css样式，拷贝到项目中， 
    + 拷贝扩展字体库ttf文件到项目中，
    + 修改<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
3. 要在中间区域放置一个router-view，来展示路由匹配到的组件

##  改tabbar为router-link

## 设置路由高亮

## 点击tabbar中的路由连接，展示对应的组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，如何获取，使用vue-resource
2. 使用vue-resource的this.$http.get获取数据
3. 获取到的数据要保存到data身上
4. 使用v-for 循环渲染每个item项
 
##  改造 九宫格 区域的样式

##  改造  新闻资讯 路由链接
## 新闻资讯 页面制作
1. 先绘制界面， 使用MUI中的media-list.html
2. 使用vue-resource 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为router-link,同时，在跳转的时候应该提供唯一的ID标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中，将新闻详情的路由地址和组件页面联系起来

## 实现新闻详情的页面布局和数据渲染

## 单独封装一个comment.vue评论子组件
1. 先创建一个单独的comment.vue组件模板
2. 在需要使用comment组件的页面中，先手动导入comment组件
 + import comment from './comment.vue'
3. 在父组件中，使用components属性将刚才导入的comment组件，注册为自己的子组件
4. 将注册子组件时候的注册名称，以标签形式，在页面中引用即可

## 获取所有的评论数据，显示到页面中，

##实现点击，加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求下一页内容
2. 点击加载更多，让pageInde++,然后重新调用this.getComments()方法重新获取
3. 为了防止新数据覆盖老数据，我们在点击加载更多的时候，老+新（用数组的concat方法）

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果是，则Toast提示用户 
4. 通过vue-resource发送一个请求，把评论内容提交给服务器
5. 当发表评论ok后，重新刷新列表，以查看最新的评论。
  + 如果调用getComments方法重新刷新列表评论的话，可能只得到最后一页评论，前几页获取不到
  + 换思路：当评论成功后，在客户端，手动拼接处一个最新的评论对象，然后调用数组的unshift方法，把最新的评论，追加到data中comments开头；这样，就能完美刷新评论列表需求

## 改造图片分享按钮为  路由连接并显示对应的组件页面

## 绘制图片列表组件页面结构，并美化结构样式
1. 制作顶部的滑动条
2. 制作底部的图片列表

### 制作顶部滑动条的坑
1. 需要借助于MUI中欧的tab-top-webview-main.html
2. 需要把slider区域的mui-fullscreen类去掉
3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS文档，需要被初始化下
  + 导入mui.js
  + 调用官方提供的方式去初始化
   ```
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

   ```
   4. 我们在初始化 滑动条的时候，导入mui.js，但是，控制台报错，
   'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
    + 经过合理推测，觉得可能是mui.js用到了'caller','callee',and 'arguments'东西，但是webpack打包好的bundle.js中，默认是启用严格模式的，所以这两者冲突了；
    + 解决方案：1. 把mui.js中的非严格模式的代码改掉，不现实。2. 把webpack的严格模式禁用掉
    + 最终选择了第二种方案，移除严格模式。使用
     babel-plugin-transform-remove-strict-mode 插件
5. 刚进入图片分享页面的时候，滑动条无法正常工作，经过我们认真的分析， 发现，如果要初始化，滑动条必须要等DOM元素加载完毕，所以我们把初始化滑动条的代码搬到了mounted函数中。

6. 当滑动条调试ok后，发现，tabbar无法正常工作了额，这时候，我们需要把每个样式中'mui-tab-item'重新改一下名字

7. 获取所有分类，并渲染分类列表

### 制作图片列表
1. 图片列表需要使用懒加载技术，我们可以使用Mint-UI提供的现成的组件'lazy-load'
2. 根据lazy-load的使用文档，尝试使用
3. 渲染图片列表数据

### 实现了图片列表的懒加载改造和样式美化


##  实现了点击图片跳转到图片详情页面
1. 在改造li成router-link时候，需要使用tag属性指定要渲染为哪种元素

## 实现详情页面的布局和美化，同时获取数据渲染页面

## 实现图片详情中 缩略图的功能

1. 使用插件pre-view这个缩略图插件
2. 获取到所有的图片列表，然后使用v-for指令渲染数据
3. img标签上的class不能去掉
4. 注意： 每个图片数据对象中，必须有w和h属性

## 绘制商品列表  页面结构并美化

## 尝试在手机上进行项目的预览和测试
1. 保证自己的手机可以正常运行
2. 要保证手机  和 电脑处于同一个wifi环境中，也就是说手机可以访问到电脑的ip
3. 打开自己的项目中 package.json文件，在dev脚本中，添加一个--host指令，把当前电脑的IP地址，设置回--host的指令值
 + 如何查看自己电脑所处IP(ipconfig)