## 新增语义化标签

并无特殊含义，是**语义！语义！语义！**

```
<header>	头部区域
<nav> 		导航区域
<main>		主体区域
<article>	内部标签
<section>	块级标签
<aside>		侧边栏标签
<footer>	尾部标签
<dialog>	对话框/窗口
<time>		时间
```



## 新增多媒体标签

```
<audio>		音频
<video>		视频
<source>	定义<audio>和<video>中资源的来源
```



## 新增表单元素

`<datalist>`

```
<datalist>		预定义选项,当在input中输入时,会提示预定义选项，需要搭配input的list属性使用
实例
<input list="browsers">
<datalist id="browsers">
   <option value="Internet Explorer">
   <option value="Firefox">
   <option value="Chrome">
   <option value="Opera">
   <option value="Safari">
</datalist> 
```

`<keygen>`

```
```





## 新增input类型

```
<input type="">

date				日期选择
datetime			时间日期
datetime-local		本地时间
month				选择月份
week				选择周
time				时间选择
number				数字输入框,有加减
range				拖动条,调节范围
search				搜索框
tel					电话框
url					地址框,自动验证,不是正确格式的url无法submit
color				选择颜色
email				邮箱地址输入框,自动验证,不是邮箱地址无法submit
```



### 新增的input属性

```
autocomplete		属性规定表单或输入字段是否应该自动填充,自动填充上一次的值
autofocus			布尔类型,自动获取焦点
form				可以在<form>标签之外使用<input>,通过此属性指定<form>的id,此<input>属于指定<form>
formaction			适用于type=submit,当有多个submit,可以通过此属性指定不同的请求url
formenctype			当把表单数据（form-data）提交至服务器时如何对其进行编码,仅针对 method="post" 的表单
					formenctype 属性覆盖 <form> 元素的 enctype 属性。
formmethod			适用于type=submit,定义请求方式,会覆盖<form>中的method,可以在有多个submit时使用
formnovalidate		规定在提交表单时不对 <input> 元素进行验证
formtarget			相当于<a>的target属性,是否打开新的页面
height 和 width		宽高尺寸,仅适用于type="image"
list				引用<datalist>,一个单独的<datalist>不会显示
min 和 max		   规定value的最大、最小值,适用于number、range、date、datetime、datetime-local、
					month、time 以及 week
multiple			布尔类型,允许用户在 <input> 元素中输入一个以上的值,适用于type=file和email
pattern (regexp)	规定用于检查 <input> 元素值的正则表达式
placeholder			预期提示文字
required			是否必填/必选
step				规定合法数字间隔,适用于number、range、date、datetime、datetime-local、month、time 以及 week
```





## 新增图像

```
<canvas>		JS绘制
<svg>			SVG绘制
```







## 本地存储

浏览器对数据进行本地存储。

在 HTML5 之前，应用程序数据只能存储在 cookie 中，包括每个服务器请求。本地存储则更安全，并且可在不影响网站性能的前提下将大量数据存储于本地。

与 cookie 不同，存储限制要大得多（至少5MB），并且信息不会被传输到服务器。

### HTML 本地存储对象

HTML 本地存储提供了两个在客户端存储数据的对象：

- window.localStorage - 存储没有截止日期的数据
- window.sessionStorage - 针对一个 session 来存储数据（当关闭浏览器标签页时数据会丢失）



### localStorage

localStorage 对象存储的是没有截止日期的数据。当浏览器被关闭时数据不会被删除

以键值对的形式存储数据

```js
// 存储
localStorage.setItem("lastname", "Gates");
// 取回
var data = localStorage.getItem("lastname");
// 或
var obj = localStorage.lastname

// 删除数据
localStorage.removeItem("lastname")
//
```



### sessionStorage

顾名思义，这个对象存储本次会话的内容，当浏览器关闭，代表本次会话关闭，数据就会消失。

sessionStorage与localStorage的使用是相同的，唯一不同的是sessionStorage的数据会在浏览器关闭时被清除。

 































