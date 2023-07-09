# HTML页面基本结构

一个基本的HTML结构

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

## `<!DOCTYPE html>`

## `<html>`

## `<head>`

### `<meta>`

https://www.w3school.com.cn/tags/tag_meta.asp

`<meta>`标签定义了与页面相关的原信息，可以有这些属性

![image-20221015121110221](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221015121110221.png)



### `<title>`



## `<body>`

利用此标签来标志本文档的类型是HTML类型

## `<meta>`标签





# HTML基本语法

HTML超文本标记语言

## 标题标签

```html
<h1></h1>
h1~~h6重要性依次递减
```

注意：

* 加了标题的文字会加粗、变大
* 一个标题独占一行

## 段落标签

```html
<p></p>
```

注意:

* 文本在一个段落中会根据浏览器窗口的大小自动换行
* 段落和段落之间保留有空隙

## 换行标签

```html
<br>
```

注意:

* 强制换行
* 单表签
* 两行之间没有间隙

## 文本格式化标签

```html
加粗
	<strong></strong>
	<b></b>
倾斜
	<em></em>
	<i></i>
删除线
	<del></del>
	<s></s>
下划线
	<ins></ins>
	<u></u>
```

## div和span

这两个是没有语义的，他们就是一个盒子，用来装内容

```html
<div></div>
<span></span>
```

注意:

* div表示分割、分区，division
* span跨度、跨距

特点:

* div用来布局，一行只能放一个div，大盒子
* span也是用来布局，一行可以放多个span,小盒子

## 图像标签

```html
<img>
```

属性:

* src必须的属性，指定用于显示的图像的文件路径
* alt替换文本，图像不能显示时的替换文本
* title提示文本，鼠标放到图像上显示的文字
* width设置图像的宽度
* height设置图像的高度
* border设置图像的边框粗细

注意:

* 多个属性之间部分先后顺序，不同属性之间用空格分开

## 超链接标签

```html
<a></a>
```

**anchor** 锚

属性：

* href跳转的链接地址
* target打开链接的方式，默认的是此窗口打开
  * `_self`此窗口打开,默认值
  * `_blank`空白页打开
  * 只有这两个属性

**分类**：

* 外部链接
  * 必须写上http://

* 内部链接
  * 同一网站下，不同网页之间的跳转
  * 只需要写上网页的地址即可(相对路径)
* 空连接
  * 只需要 href="#"
* 下载链接
  * 一般来说，下载的是压缩包或文件
  * 只需要给出下载文件的地址即可
* 网页元素链接
  * 标签嵌套
  * 一个图片、文字设置成一个链接
* 锚点链接
  * 定位到页面的某个标签
  * 只需要为定位到的标签设置id属性即可
  * href="#id名"



## iframe

用于创建一个行内框架

```html
<iframe src="www.xxxxx...."></iframe>
```





## 注释

```html
<!--注释-->
```

## 表格

```html
<table></table>定义表格
<tr></tr>定义行
<td></td>定义单元格，单元格内放数据
```

注意:

* tr必须放在table中
* td必须放在tr中

### 表头单元格

表头文字会加粗、居中，凸显出表头的重要性

```html
<table>
    <tr>
        <th>姓名</th>
        <th>性别</th>
        <th>年龄</th>
    </tr>
    <tr>
        <td>刘明凯</td>
        <td>男</td>
        <td>20</td>
    </tr>
</table>
```

### 属性

```html
属性			属性值					描述
align		left/center/right		规定表格相对于周围其他元素的位置
border		1或""					规定单元格是否有边框,默认为"",没有边框
cellpadding 像数值						设置单元格内，文字与边框的空白大小
cellspacing	像素值						规定单元格之间的空白，默认为2像素
width		像素值或百分比				规定表格的宽度
height		像素值或百分比				规定表格的高度
```

### 表格的结构标签

因为表格可能很长，所以把表格分为表格头部和表格主体两部分

```html
<thead></thead>表示表格头部的部分
				thead中必须有<tr></tr>,一般位于第一行，放表头信息
<tbody></tbody>表示表格主体区域
```

### 单元格合并

1. 跨行合并rowspan
2. 跨列合并colspan

步骤:

1. 先确定是跨行还是跨列
2. 找到目标单元格，写上合并方式=合并单元格数量
3. 删除多余的单元格

```html
跨列合并
<table border="1" cellspacing="0" width="200" height="200">
        <tr>
            <td></td>
            <td colspan="2"></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </table>
    <br><br><br>
跨行合并
    <table border="1" cellspacing="0" width="200" height="200">
        <tr>
            <td rowspan="2"></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </table>
```

## 列表

分类:

* 无序列表(重点)
* 有序列表
* 自定义列表(重点)

### 无序列表

各列表项之间没有顺序

ul定义无序列表

li定义列表项

```html
<ul>
    <li></li>
    <li></li>
</ul>
```

注意：

* ul中只能嵌套li,其余标签或文字不可以
* li相当于一个容器，可以容纳所有元素

### 有序列表

各个列表项按照一定的顺序排列

```html
<ol>
    <li></li>
    <li></li>
</ol>
```

其余和无序列表一样

### 自定义列表

常用于对术语或名词进行解释，定义的列表项前没有任何项目符号

```html
<dl>
    <dt></dt>
    <dd></dd>
</dl>
```

特点：

* dl域中只能抱哈dt和dd
* dt和dd个数没有限制，一般一个dt对应多个dd

## label标签

label标签的意思

可以将某个文字和表单控件绑定到一起

当用户点击文本时，可以触发某个标签

增加用户体验感

```html
<label for="#标签id"></label>
```



## 表单

使用表单为了手机用户信息，与用户进行交互

```html
<form>
    
</form>
表单域会把表单元素信息提交给服务器

属性			含义
action 		url地址	用于指定接收并处理表单数据的服务器程序的url地址
method		get/post 用于设置表单数据的提交方式
name		名称		用于指定表单的名称，以区分同一页面中的多个表单
```

### 表单控件

* input输入表单元素
* select下拉表单元素
* textarea文本域元素

### input

```html
type属性	用于指定此input元素的种类

属性值
button	定义可点击按钮，一般搭配js使用
file	上传文件按钮
hidden	定义隐藏的输入字段
image	定义图像形式的提交按钮(这个提交按钮是一个小图像)
password定义密码字段,该字段中的字符会被掩码
text	定义单行的输入字段，用户可以在其中输入文本，默认宽度是20个字符
radio	定义单选按钮
checkbox定义复选按钮
reset	重置按钮
submit	提交按钮,会把表单数据发送到服务器


name属性
	定义input元素的名称
value属性
	规定input元素的默认值
checked属性
	表示默认选中状态，可以用在单选按钮和复选按钮
maxlength属性
	规定输入的字段的字符最大长度

!!!!!!注意：
1.如果想要实现单选和多选按钮，那个这几个input元素必须具有相同的name属性

```

实例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="">
        <label for="user">用户名</label><input type="text" id="user" value="请输入用户名">
        <br>
        <label for="psw">密码&nbsp;&nbsp;&nbsp;&nbsp;</label><input type="password" id="psw">
        <br>
        <input type="image" src="手掌.png" width="100" title="这是个提交按钮">
        <br>
        性别: <input type="radio" id="nan" name="sex"><label for="nan">男<input type="radio" id="nv" name="sex"></label><label for="nv">女</label>
        <br>
        爱好: <input type="checkbox" name="hobby" id="read" checked="checked"> <label for="read">读书</label> <input type="checkbox" id="sleep" name="hobby"> <label for="sleep">睡觉</label>
            <input type="checkbox" name="hobby" id="eat"> <label for="eat">吃饭</label>
        <br>
        <input type="reset" value="重新输入">
        <br>
        <input type="submit" value="注册">
    </form>
</body>
</html>
```

### select

常用在分类里面

```html
<select>
    <option></option>
    <option></option>
</select>
```

注意：

* select至少有两个option，否则意义不大
* 在option中定义selectde="selected"，当前项即为默认项

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="">
        <label for="province">省份</label>
        <select name="place" id="province" value="请选择">
            <option value="">山东</option>
            <option value="" selected="selected">黑龙江</option>
            <option value="">北京</option>
            <option value="">上海</option>
            <option value="">南京</option>
            <option value="">深圳</option>
            <option value="">广州</option>
            <option value="">杭州</option>
        </select>
    </form>
</body>
</html>
```

### textarea

当用户输入的内容较多时，就可以使用文本域

```html
<textarea name="" cols="30" rows="10"> </textarea>

cols	每行中的字符数
rows	显示的行数
```

## 可编辑属性

想让页面的文字能够像`input`里的文字一样被编辑，可以在html元素中添加`contenteditable`属性

```html
<h1 contenteditable="true">我是刘明凯</h1>
```





# CSS基础

CSS层叠样式表的简称

CSS的最大价值：实现结构和样式相分离

CSS规则主要由两部分组成：

* 选择器
* 声明部分

CSS一般写在head中，放在style标签中



### 选择器命名规则

* 不能以数字开头

## 选择器

就是选择不同的标签，进行样式美化

多个属性之间用分号";"隔开

分类：

* 基础选择器
* 复合选择器

**基础选择器**:

* 标签选择器
* 类选择器
* id选择器
* 通配符选择器

## 基础选择器

### 标签选择器

```css
标签名{
    .....
}
```

特点:

* 可以把某一类标签选择出来
* 不能设计差异化样式，只能选择全部的同类标签

### 类选择器

```html
.类名{
	....
}
```

在标签中需要指出，该标签引用了哪个类

```html
<p class="类名"></p>
```

**注意：**

* 不能使用关键字来定义类名
* 可以使用类名可以使用**中横线**
* 不要使用纯数字，尽量使用英文字母来显示

#### 多类名

一个标签可以引用多个类，中间记得用空格分开

```html
<p class="name1 name2">
    
</p>
```

### id选择器

id是每个标签都有的属性，可以单独针对某个标签进行美化

每个标签的id是不能重复的

```html
#id名{
	...
}

<p id="name"></p>
```

### 通配符选择器

```html
*{
.....
}
```

选择了所有的标签

### 总结

* 类选择器可以选择多个标签
* id选择器只能选择一个标签



## 复合选择器

1. 后代选择器
2. 子选择器
3. 并集选择器
4. 伪类选择器

### 后代选择器

又称为包含选择器,可以选择父元素里面的子元素

```
ul li{
	font-weight: 700;
}
选择ul中的li标签
```

### 子选择器 

选择儿子级别的标签

```html
div>p{
	color: blue;
}
```

### 并集选择器

一起选择同级别的多个标签

```html
h1,h2{
	text-decoration:underline;
}
```

### 伪类选择器

用于向具有某些特殊状态标签添加特殊效果

#### 链接伪类选择器

```html
a:link			未被访问的链接
a:visited		已访问过的链接
a:hover			鼠标选中的链接
a:active		活动链接(鼠标点下还没有抬起的链接)
```

注意:

* 为了确保生效,请按照LVHA的顺序声明

  ​	   link , visited , hover , active

* 一般开发中,只需要指定链接颜色和鼠标经过的颜色即可

  ```html
  a{
  	color: blue;
  }
  a:hover{
  	color: red;
  }
  ```

#### :focus伪类选择器

用于获取焦点的表单元素(鼠标选中就是焦点)

```html
input:focus{
     background-color: rgb(130, 179, 236);
 }
```

### 总结

```HTML
			 书写				说明
后代选择器		a b			用来选择后代元素
子代选择器 		a>b			用来选取儿子
并集选择器		a,b			集体声明
链接伪类选择器	   a:link				使用较多
:focue伪类选择器	 input:focus		 使用较少
```



## CSS字体属性

### 字体样式

```html
font-family字体样式
	多个单词组成的字体名称,用引号包含起来

font-family:字体1,字体2,字体3;
一般指明多种字体,浏览器会先去检查第一种字体,如果设备上有这种字体,就会用这种字体去显示
如果没有,就会去看第二种字体,以此类推
如果都没有就会使用系统默认的字体

一般会把字体样式写在body中,因为所有的标签都写在body中
body{
	font-family:'Microsoft Yahei',tahoma,arial;
}
```

### 字体大小

```html
font-size字体大小
单位: px

不同浏览器可能默认的字号大小不一致,我们尽量给一个明确值大小，不要默认大小
        可以将字体大小写在body选择器中
 
```

**标题标签比较特殊，需要单独指定文字大小**

### 字体粗细

```html
font-weigth字体粗细
font-weight: normal | bold  |  bolder	| lighter
			  正常	  加粗		特粗		轻体
实际开发中更喜欢用数字
font-weight: 400	|	700

```

### 文字样式

```html
 font-style 斜体？
        normal正常
        italic斜体
平时很少给文字加斜体，一般都是用在让<em></em>和<i></i>改为正常体

```

### 字体的复合样式

```html
font: font-style font-weight font-size/line-height font-family;
顺序不可改变,否则此语句无效
各个属性之间用空格隔开
不需要设置的属性可以省略,但是必须保留font-size 和font-family,否则此语句无效

```

### 总结

```html
属性
font-size		字号		通常用的单位是px
font-family		字体样式	
font-weight		字体粗细	normal--400		bold---700
font-style		文字样式	normal	italic倾斜
font			连写		 顺序不可乱;可以省略,但是必须保留font-size和font-family
```



## 文本属性

### 文本颜色

```html
color 文本颜色
color: 预定义的颜色值 | 十六进制 | RGB代码

预定义的颜色值		red	green	blue  pink
十六进制		#ff0000	 #29D794
RGB代码		rgb(255,0,0)  或  rgb(100%,0%,0%)
```

### 文本对齐

```html
text-align文本水平对齐方式
本质是盒子内的内容的对齐方式
text-align: left	|	center	|	right
			左对齐			居中		右对齐
```

### 装饰文本

```
text-decoration文本装饰
text-decoration: none | underline | overline | line-through
				 无		下划线		  上划线		删除线
还有 wavy	 dotted
	波浪线  点状线
	需要搭配上面的三种基础线来使用
text-decoration: dotted underline;
```

### 文本缩进

```html
text-indent文本缩进
单位: px或em
em就是相对单位,就是当前文字的大小
```

### 行间距

行间距包括三部分:

* 上间距
* 文本高度
* 下间距

因为文本高度一般设置好了,所以用此方法设置上下间距

**减去文本高度,上下间距平分剩余间距**

```html
line-height: 32px;
```

**tips**;

1. 行高等于盒子高度,文字居中
2. 行高大于盒子高度,文字偏下
3. 行高小于盒子高度,文字偏上





## CSS 引入方式

1. 行内样式表(行内式)
2. 内部样式表(嵌入式)
3. 外部样式表(链接式)

### 行内样式表

在标签内,写上style 属性,然后直接跟上样式属性值

```html
<p style="color: pink;font-size: 20px">
    行内样式表
</p>
```

### 内部样式表

```html
把CSS语句写在HTML页面内部,
是将CSS的代码放在<style></style>标签中
        
理论上<style></style>标签可以放在html页面的的任何部位，
但是习惯放在<head></head>中

        通过这种方式，可以控制当前整个页面的元素
        代码结构清晰，但并没有实现结构与样式完全分离
        这就叫做嵌入式样式表
```

### 外部样式表

使用最多

```html
样式写在.css文件中,引入这个文件即可
    
使用<link>标签引入.css文件

属性
rel     定义当前文档与被链接文档之间的关系,在这里需要指定为stylesheet,表示被链接的文档是			一个样式表文件
href    引入文件的路径
```

### CSS引入方式总结

```html
				优点					控制范围			使用频率
行内样式表		书写方便,权重高		 一个标签				较少
内部样式表		部分结构和样式分离		一个页面				较多
外部样式表		完全实现结构和样式分离	  可以控制多个页面			最多
```

## emmet语法

[Emmet语法](https://editor.csdn.net/md/?articleId=123714598)

emmet语法用来提高html/css的编写速度

```html
1.快速生成标签
 标签名+Tab
 标签名*数量+tab
 父子关系的标签	
		ul>li
 兄弟关系的标签
		div+p
 带id的标签
		标签名#id
 带类名的标签
		标签名.类名

$自增符号(从1开始)
 
标签+{内容}*数量

2.快速生成样式
	采取简写的方式即可
   例如:background-color
	只需要bgc+Tab即可
```



## CSS显示模式

了解元素的选择模式,可以有助于网页布局

### 分类

* 块元素
* 行内元素(内联元素)
* 行内块元素

### 块元素

常见的块元素

```html
h1~~h6
p
div
ul
ol
li
```

特点:

* 独占一行
* 可以设置**高度\宽度\外边距以及内边距**
* 默认宽度是容器(父级元素)的100%
* 是一个盒子或容器,里面可以放行内元素或块元素

注意:

* 文字标签内不能使用块元素
* p标签主要用于存放文字所以p标签内不能放块元素
* 同理h1~~h6也是这样



### 行内元素(内联元素)

常见的行内标签

```html
a
span
```

特点:

* 相邻行内元素在一行上,一行可以有多个行内元素
* 高\宽直接设置无效的
* 默认宽度是他本身内容的大小
* 行内元素只能容纳文本或其他行内元素

注意:

* 链接里面不能再放链接
* 特殊情况a里面可以放块级元素,但是给a转换一下块元素最安全



### 行内块元素

同时具有块元素和行内元素的特点

常见的行内块元素

```html
img
input
td
```

特点:

* 一行可以有多个行内块元素
* 默认宽度是内容的宽度
* 高度\宽度\行高\外边距可以设置

### 总结

```html

块级元素			一行可以放一\个块级元素		可以设置宽高
行内元素			一行可以放多个行内元素			不可以设置宽\高
行内块元素			一行内可以放多个行内块元素	  可以设置宽\高
```

### 显示类型

```html
转换为块级元素
	display:block
转换为行内元素
	display:inline
转换为行内块元素
	display:inline-block
```



## CSS背景

### 背景颜色

```html
background-color:颜色值;
元素的背景颜色默认值是transparent(透明的)
```

### 背景图片

```html
background-image:url(图像地址);

实际开发中,常用于logo或者装饰性的小图片或者是超大的背景图片
优点是非常便于控制位置
```

### 背景平铺

```html
background-repeat: repeat | no-repeat | repeat-x |repeat-y;
				   			 不平铺		x方向平铺	y方向平铺
```

**页面图片会压住背景颜色**

### 背景图片位置

```html
background-position:x y;

background-position: 方位名词 | 准确单位

方位名词: 
 background-position:left top;
	x方向:left	center 	right
	y方向:top		center	bottom
  省略x方向则默认是垂直居中
  省略y方向则默认是水平居中

准确位置
 background-position:20px 30px;

混合单位
 background-positon:20px center;
```

### 背景图像固定

设置背景图像是否随着页面的其余部分滚动

```html
background-attachment: scroll | fixed;
						滚动		固定
```

### 背景复合写法

没有特定的书写顺序   ,  一般习惯这样写

```html
background: 背景颜色 背景图片地址 背景平铺 背景图像滚动 背景图片位置
```

### 背景色半透明

```html
background:rgba(0,0,0,0.3)
最后一个参数是alpha透明度,取值在0~1之间
特点:
	这是盒子背景半透明,盒子里面的内容不受影响
	CSS3新增特性
```



## CSS三大特性

### 层叠性

相同选择器给设置相同的样式,此时一个样式就会覆盖(层叠)另一个冲突样式

层叠性主要解决样式冲突问题

原则:

- 样式冲突,就近原则,哪个样式离得近,就执行哪个样式(最后一个生效)
- 样式不冲突,不会层叠

### 继承性

子标签会继承父标签的某些样式

合理地使用继承,可以简化代码,降低CSS的复杂性

子标签可以继承父元素的样式(text-,font-,line-,color-)

**行高的继承**

 行高也可以不跟单位,可以写1.5,就是当前文字大小的1.5倍

### 优先级

 当同一个元素指定多个选择器,就会有优先级的产生

选择器相同,则执行层叠属性

**选择器不同,则根据选择器权重执行**

```html
继承 * < 标签选择器 < 类选择器  伪类选择器 < ID选择器 < 行内样式 < !important
 0         1               10            100       1000       无穷
```

**tips:**

​		a链接,浏览器默认指定了一个样式:蓝色带下划线

## 权重的叠加

复合选择器会有权重叠加的问题

```html
ul li{
  //权重为2
	color: green;
}
li{
  //权重为1
	color:red;
}
实际颜色会是  绿色

```

再来个例子

```html
.lmk li {
    color: darkmagenta;
	//权重为11
}

#kk li {
   color: black;
	//权重为101
}
颜色为:黑色
```

## 盒子模型

页面布局三大核心

* 盒子模型
* 浮动
* 定位



**看透网页布局的本质**

* 过程

  1. 先准备好网页元素,网页元素基本都是盒子box
  2. 利用css设置好盒子样式,然后摆放到相应的位置
  3. 往盒子中装内容

* 核心

  利用css摆盒子



盒子模型组成

* border    边框
* content   内容
* padding   内边距
* margin    外边距



### 边框 border

**border-width 设置边框的粗细,一般px为单位**



**border-style  边框样式**

* solid 实线
* dashed 虚线
* dotted 点状线



**border-color 边框颜色**

边框的复合写法(没有顺序)

```css
border: 1px solid red;
```



**边框可以单独设置**

```css
border-top
border-bottom
border-right
border-left

//例如
border-top: 2px dotted blue;

```



表格的细线边框

```css
border-collapse: collapse:
单元格合并,相邻边框合并到一起
```



**边框会影响盒子的实际大小**

​      **盒子的实际大小是:盒子的宽度+边框的宽度**



### 内边距 padding

```css
padding-top
padding-bottom
padding-right
padding-left

padding简写
padding: 5px;   上下左右内边距都是5px
padding:5px 10px; 上下是5px,左右是10px;
padding: 5px 10px 20px; 上边距是5px,左右是10px,下内边距20px
padding: 5px 10px 20px 30px 分别对应上下左右

```

**padding会影响盒子的实际大小**

* **如果盒子已经设置了宽高**,此时再指定内边距,就会撑大盒子
* 解决方案:
  * 如果保证盒子大小固定,可以让width/height减去内边距的大小
  * 如果盒子没有指定宽度,则padding不会撑宽盒子

### 外边距  margin

margin设置外边距,控制盒子与盒子之间的距离

```css
margin-left
margin-right
margin-top
margin-bottom

margin 的简写方式和padding是一样的

```



**外边距的典型应用**

* **盒子水平居中(块级元素)**

  * 盒子必须指定了宽度
  * 左右的外边距都设置了auto
  * 常见写法
    * margin-left: auto;      margin-right: auto;
    * margin: auto;
    * margin: 0  auto;

* 行内元素和行内块元素水平居中

  * 行内元素和行内块元素水平居中只需要给其父元素添加: text-align: center;

* 外边距合并--嵌套块元素塌陷

  * 对于两个嵌套关系的块元素,父元素有上外边距同时子元素也有上外边距,此时父元素就会塌陷较大的外边距值
  * 解决方案:
    1. 可以为父元素定义上边框
    2. 可以为父元素定义上内边距
    3. 可以为父元素添加 overflow: hidden ;   *常用*

* 清楚内外边距

  * 不同元素带有默认的内外边距,而且不同浏览器默认的也不一样

  * 例如ul, li

  * 因此我们在布局前,首先要清楚一下元素的内外边距

  * 使用通配符选择器清楚元素的内外边距

    ```css
    *{
        padding: 0;
        margin: 0;
    }
    ```

  * 行内元素为了照顾兼容性,尽量只设置左右内外边距,不要设置上下内外边距,但是转换成行内块元素就可以了

### 圆角边框 border-radius

```css
border-radius: 10px;
参数值可以是数值或百分比

原理:
	radius是半径的意思,就是一个指定半径的圆去和盒子的角的两条边相切
	所以说,数值越大,弧度越大

和margin  padding 一样,有四个方向,也可以简写

radius: 10px 20px 25px 30px;
		左上  右上  右下  左下  (顺时针)

分开写:
border-top-left-radius  左上角
border-top-right-radius 右上角
border-bottom-left-radiu 左下角
border-bottom-right-radiu 右下角

```



**应用**

1. 圆形

   半径为宽度的一半(前提:盒子是正方形)   或直接设置为50%

2. 圆角矩形: 半径设置为高度的一半



### 盒子阴影

```css
box-shadow: h-shadow  v-shadow blur spread color inset;
属性含义:
h-shadow: 必须写,水平阴影的位置,x轴,允许负值
v-shadow: 必须写,竖直阴影的位置,y轴,允许负值
blur: 可选,模糊距离
spread: 可选,阴影尺寸
color: 阴影颜色
inset: 可选,外阴影,内阴影

注意:
	默认的是外阴影,但是不可以写这个单词,否则阴影无效
 	盒子阴影不占用空间,不会影响其他盒子排列
```



### 文字阴影

在CSS3中,可以使用`text-shadow`对文字设置阴影

```css
text-shadow: h-shadow v-shadow blur color;
这四个属性和盒子阴影的的属性相同
```



## 浮动

### css传统的布局方式

1. 普通流(也叫文档流)

   含义: 就是按照标签规定好的默认方式排列

   (1) 块级元素独占一行,从上向下排列

   (2) 行内元素按照顺讯,从左到右排列,碰到父元素边缘自动换行

   标准流是最基本的布局方式

2. 浮动

3. 定位

实际开发中,一般都包含了这三种布局方式

### 为什么需要浮动

1. 如何让多个块级元素排列成一行

   如果转行为行内块元素,他们之间会有较大的空白缝隙,比较难控制

2. 如何实现两个盒子的左右对齐

有很多的布局效果,标准流无法实现,此时就需要使用浮动完成布局,因为浮动可以改变元素的默认排列方式



### 什么是浮动

`float`属性用于创建浮动框,将其移动到一边,直到左边缘或者右边缘触及包含块或另一个浮动框的边缘

```css
float : none | left | right ;
```

网页布局第一准则:

**<font color = "red">多个块级元素纵向排列找标准流,多个块级元素横向排列找浮动</font>**

网页布局第一准则
<font color ="red">**网页布局第二准则:先设置盒子大小,之后设置盒子的位置**</font>



### 浮动的特性

1. 浮动元素会脱离标准流(脱标)

   1. 脱离标准流的控制(浮),移动到指定位置(动)
   2. 浮动的盒子不再保留原先的位置
   3. 会产生叠加的效果

2. 浮动的元素会一行内显示并且元素顶部对齐

   浮动的元素是互相靠在一起的(**不会有缝隙)**,如果父级宽度装不下这些浮动的盒子,多出的盒子就会另起一行

3. 浮动的元素会具有**行内块**元素的特性

   **任何元素都可以添加浮动**,**不管原先是什么模式的元素,添加浮动之后具有行内块元素的特性**

   <font color = red>如果行内元素有了浮动,则不需要转换块\行内块元素就可以直接设置宽高</font>

   <font color = red>如果块级盒子没有设置宽度,默认宽度和父级一样宽,**但是添加浮动后,他的大小会根据内容来决定,**浮动的盒子中间没有缝隙,是紧挨着的</font>



**浮动布局注意点:**

* 浮动元素经常和标准流父级搭配使用:
  * 为了约束浮动元素位置,一般采取的措施是:
    *  **先用标准流的父元素排列上下位置,之后内部子元素采取浮动排列左右位置,符合网页布局第一准则**
* 一个元素浮动了,理论上其余兄弟元素也要浮动
  * 一个盒子粒粒面有多个子盒子,如果其中一个浮动了,那么其他兄弟也应该浮动,以防止引起问题
    * **浮动的盒子指挥影响盒子后面的标准流而不会影响前面的标准流**

​    

### 清除浮动

理想中的状态:**让子盒子撑开父盒子,有多少个子元素,父元素就会有多高**(不应该把盒子的高度写死)

父盒子在有些情况下不能直接给出高度,但是子盒子浮动不占用位置,此时父盒子高度为0,就会影响下面的标准流盒子

由于浮动元素不再占有原文档流动的位置,所以会对后面的元素排版产生影响

所以需要清除浮动

#### 清除浮动的本质

* 就是清除浮动元素造成的影响
* 如果父盒子本身有高度,则不需要清除浮动
* 清除浮动后,父级就会根据浮动的子盒子自动检测高度
* 父级有了高度,就不会影响下面的标准流

```css
选择器{
    clear : left | right | both;
}
left 不允许左侧有浮动元素
right 不允许右侧有浮动元素
both 左右两侧都不允许有浮动元素
```

清除浮动的策略是:闭合浮动

#### 清除浮动的方法

1. 额外标签法,也叫隔墙法

   1. 在浮动元素末尾添加一个空的标签(必须是块级元素),或者其他标签

      ```css
      添加一个标签,这个标签中有一个clear 属性
      clear 属性是不允许浮动的意思
      clear: left | right | both | none
      ```

      1. 通俗易懂,书写方便
      2. 添加许多无意义的标签,结构化差

      

2. 父级添加`overflow`属性

   ```css
   给父元素添加overflow
           overflow是溢出的意思
           overflow对容器内溢出内容的处理
           overflow : hidden | auto | scroll
   
   .father{
       overflow : hidden;
   }
   ```

3. 父级添加`after`伪元素

   只需要复制粘贴过来用即可了

   ```css
   .father::after{
       content: "";
       display: block;
       height: 0;
       clear: both;
       visibility: hidden;
   }
   .father{
       /* 为了兼容IE6,7的一种写法 */
       *zoom : 1;
   }
   ```

4. 父级添加双伪元素

   复制粘贴即可

   ```css
   .father:before,
   .father:after{
       content:"";
       display: table;
   }
   .father:after{
       clear:both;
   }
   .father{
       *zoom:1;
   }
   ```

   

## PS切图

1. `jpg`格式:`jpg`对色彩的信息保留较好,高清,颜色较多,**我们产品类的图片经常用`jpg`格式**,包括手机相机的直出图片就是`jpg`格式
2. `gif`格式:`gif`格式最多只能存储256色,所以通常用来显示简单图形及字体,但是可以保存透明背景和动画效果,**实际经常用于一些图片小动画效果**
3. `png`格式:一种新兴的网络图形格式,结合了`gif`和`jpg`的优点,具有存储形式丰富的特点,能够保持透明背景,**如果想要切成背景透明的图片,请选择`png`格式**
4. `PSD`格式:`PSD`格式是Photoshop的专用格式,里面可以存放图层,通道,遮罩等多种设计稿,**对我们前端人员来说,最大的优点,我们可以直接从上面赋值文字,获得图片,还可以测量大小和距离**

### 导出PS切图

* **导出PS切图,选择相应的图层,右击选择"导出为PNG"**

* **若需要导出的图片是由多个图层组成的,可以选择"合并图层",然后导出**

### 切片工具

使用**切片工具**选择需要导出的部分,然后选择"导出为Web格式",然后选择"jpg"等格式



导出透明的图片,在图层列表,选择背景图层不可见,然后使用切片工具导出

### PS插件切图

**Cutterman**插件,百度去找!

## CSS书写顺序

  CSS 书写顺序

  建议遵循以下顺讯(一个选择器内部怎么写,从整体到局部)

```css 
1.布局定位属性display/position/float/clear/visibility/overflow
2.自身属性width/height/margin/padding/border/background
3.文本属性color/font/text-decoration/vertical-align/white-space/break-word
4.其他属性content/cursor/border-radius/box-shadow/text-shadow/background:linear-gradient....
```

 

## 网页布局整体思路

```css
    1.首先确定网页的可视区大小
    2.分析行模块,以及每行中有几个列模块
    3.一行中列模块经常使用浮动布局,先确定每个列的大小,
      然后指定列的位置,页面布局第二准则
    4.写HTML结构,先有结构后有样式
    5.弄清楚布局结构,再写代码
```



## 定位

`定位= 定位模式 + 边偏移`

```css
定位模式
static 		静态定位
relative 	相对定位
absolute	绝对定位
fixed		固定定位


边偏移
边偏移决定盒子的最终位置
top bottom left right
```

### 静态定位

静态定位就是没有定位的意思

```css
选择器{
    position:static;
}

```

静态定位就是按照标准流(就是没有定位的意思)摆放位置,没有边偏移

静态定位在布局中很少使用



### 相对定位

相对定位就是移动位置时,相对于盒子`本身原来的位置`进行偏移

```css
选择器{position:relative};
```

特点:

* 相对于盒子原来的位置进行偏移
* 不脱标,还保留原来标准流中的位置,后面的盒子不会占据他的位置





### 绝对定位

绝对定位是在移动位置时,是`相对于祖先元素`偏移的

```css
选择器{position:absolute;}
```

特点:

* 如果**没有祖先元素**,或者**祖先元素没有定位**,则会以浏览器的`Document`文档为准定位
* 如果祖先元素元素有定位, 则以**最近一级有定位的祖先元素**为准移动
* 绝对定位是脱离标准流, 不再占有原先的位置



#### 使用场景

 常用口诀:**子绝父相**

子元素是绝对定位的话,父级要用相对定位



* 子级元素绝对定位,不会占有位置,可以放到父盒子里面的任何一个位置,不会影响其他的兄弟盒子
* 父盒子需要加定位限制子盒子在父盒子中显示



相对定位常用来作为绝对定位的父级

因为父级需要占有位置,因此是相对定位,子盒子不需要占用位置,所以是绝对定位



子绝父相 不是绝对的,有时候 子绝父绝,...





### 固定定位

固定定位是元素固定于浏览器可视区的位置,主要使用场景:可以在浏览器页面滚动时元素的位置不会改变

```css
选择器{position: fixed}
```



#### 固定定位小技巧

固定定位也可以根据版心来定位

比如说:固定在版心右侧位置

需要用到一个小算法

1. 让固定定位的盒子left: 50% , 走到浏览器可视区(也可以是版心)的一半的位置
2. 让固定定位的盒子margin-left版心宽度的一半距离, 然后就到了版心的右侧





### 粘性定位

相对定位和固定定位的混合

```css
选择器{position: sticky};
```

特点:

* 以浏览器的可视窗口为参照
* 粘性定位占有原先的位置
* 必须添加 top , left , right , bottom其中一个才有效







### 定位总结

<table>
    <tr>
    	<th>定位模式</th>
        <th>是否脱标</th>
        <th>移动位置</th>
        <th>是否常用</th>
    </tr>
    <tr>
    	<td>static静态定位</td>
        <td>否</td>
        <td>不能使用边偏移</td>
        <td>很少</td>
    </tr>
    <tr>
    	<td>relative相对定位</td>
        <td>否(占有位置)</td>
       <td>相对于自身位置移动</td>
        <td>常用</td>
    </tr>
    <tr>
    	<td>absolute绝对定位</td>
        <td>是(不占有位置)</td>
        <td>带有定位的父级</td>
        <td>常用</td>
    </tr>
    <tr>
    	<td>fixed固定定位</td>
        <td>是(不占有位置)</td>
        <td>浏览器可视区</td>
        <td>常用</td>
    </tr>
    <tr>
    	<td>sticky</td>
        <td>否(占有位置)</td>
        <td>浏览器可视区</td>
        <td>当前阶段较少</td>
    </tr>
</table>





### 定位叠放次序

在使用定位布局时,可能出现盒子重叠的情况,

可以使用`z-index`来控制盒子的前后次数(z轴)

```css
选择器{z-index:1;}
```

 **使用`z-index`来控制同级别定位模式的优先级**'

**数值越大,越靠上**







特点:

* 数值可以是正整数,负数或0 , 默认是auto,数值越大,盒子越靠上
* 如果属性值相同,则按照书写顺序,后来居上
* <font color= "red">只有定位的盒子才能使用`z-index`属性</font>



### 定位的拓展

#### 绝对定位的盒子居中

加了绝对定位的盒子不能通过`margin:  0 auto`来设置水平居中



小小算法

先向右走浏览器的50%, 再向左走盒子本身宽度的50%

```css
/* */
.box{
    position: absolute;
    left: 50%;
    width: 100px;
    height: 100px;
    margin-left: -50px;
}
```



固定定位也可以通过这种小算法来实现水平居中或者垂直居中



#### 定位的特殊性

绝对定位和固定定位和浮动有类似的性质

* 行内元素添加了绝对或者固定定位,可以直接设置宽高属性
* 块级元素,设置了绝对定位和固定定位,如果不设置宽高,会默认是里面内容的宽度





#### 定位的拓展

**绝对定位,固定定位会完全压住盒子**

<font color="red">浮动元素不同,他只会压住下面标准流的盒子,但是不会压住下面标准流里面的文字,图片</font>

浮动之所以不会压住文字, 因为浮动产生的最初就是为了做文字环绕效果的,文字会围绕浮动元素







## 网页布局总结

通过盒子模型,清除直到大部分html标签是一个盒子

通过css浮动,定位可以让每一个盒子排列为网页

一个完整的网页,是标准流,浮动,定位一起完成布局的,每个都有自己专门的用法



1.标准流

可以让盒子上下排列或左右排列,**处置的块级盒子就用标准流布局**

2.浮动

可以让多个块级元素一行显示或者左右对齐盒子,**多个块级盒子水平显示就用浮动布局**

3.定位

定位最大的特点就是层叠,,可以让多个盒子前后层叠来显示 **可以固定到网页的某个区域**



## 元素的显示和隐藏

例如: 网页侧边的小广告, 我们点击了关闭按钮 , 它就会不见, 其实并没有去除,只是隐藏了而已

还有, 比如说,我们的鼠标经过一个地方,就会展开一些内容,



本质: **让一个元素在页面中隐藏或显示出来**

```css
display 显示隐藏
visibility显示隐藏
overflow溢出显示隐藏
```



### display

display属性用于设置一个元素应该如何显示

```css
display: none;  隐藏元素
display: block; 除了转换为块级元素外, 同时还有显示元素的意思
```

**display隐藏元素后,不再占有原来的位置**

搭配JS应用及其广泛



### visibility

visibility属性拥有指定一个元素应可见还是隐藏

```css
visibility:visible;元素可视
visibility: hidden;元素隐藏
```

**visibility隐藏元素后,继续占用原来的位置**



### overflow

**对溢出的内容处理**

```css
overflow: visible |  auto |  hidden |  scroll
visible: 默认的, 对溢出部分不做处理,正常显示
hidden:隐藏溢出的部分
auto: 在需要的时候添加滚动条
scroll:无论是否溢出,都以滚动条的方式显示
```

如果有定位的盒子,请慎用`overflow`,因为他会隐藏多余的部分





# CSS高级



## 精灵图

### Why

一个网页中往往会应用很多小的背景图作为装饰, 当网页中的图像过多时,服务器就会频繁地接收和发送请求图片,造成服务器请求压力过大, 这就大大降低了页面的加载速度

因此,为了有效地减少服务器接收和发送方请求的次数,提高页面的加载速度,出现了CSS精灵技术

**核心原理**:**将网页中的一些小背景图像整合到一张大图中,这样服务器只需要一次请求即可**



### 使用sprites

使用精灵图核心

1. 精灵技术主要针对于背景图片使用, 就是把多个小背景图片整合到一张大图片中
2. 这个大图片也称为 sprites精灵图或 雪碧图
3. 移动背景图片的位置,此时可以使用`background-position`
4. 移动的距离就是这个目标图片的`x`和`y`坐标





## 字体图标

使用场景:主要用于显示网页中通用的, 常用的一些小图标

精灵图的缺点也很明显:

1. 图片文件还是比较大
2. 图片本身放大和缩小 导致失真
3. 一旦图片制作完毕想要更换是非常复杂的

此时一种新的技术就很好的解决了以上的问题-----**字体图标iconfont**

**字体图标**可以为前端设计提供方便高效的图标使用方式, **展示的是图标 , 本质属于字体**





### 使用

字体图标是一些网页常见的小图标, 我们直接在网上下载使用即可, 因此使用可以分为:

1. 字体图标的下载
2. 字体图标的引入(引入到HTML页面中)
3. 字体图标的追加(以后添加新的小图标)



#### 下载

推荐下载网站

* [icomoon](http://icomoon.io)

  这个网站成立比较早 , 推出了第一个自定义图标字体生成器, 允许用户选择所需要的图标, 使他们成一字型, 该字库内容种类繁多 ,  非常全面, 唯一的遗憾就是国外服务器, 打开速度较慢

* [阿里iconfont](http://www.iconfont.cn/)

  阿里推出的一个iconfont字体图标库,包含了淘宝图标库和阿里图标库,可以使用AI 制作图标上传生成,  重点是免费

  

#### 字体文件格式

不同浏览器所支持的字体格式是不一样的 , 字体图标之所以兼容, 就是因为包含了主流浏览器支持的字体文件

* `.ttf`(TureType)格式, `.ttf`字体是Windows和Mac最常见的字体 ,
* `.woff`(Web Open Font Format)格式 , `.woff`格式
* `.eot` (Embedded Open Type) 是IE专用的字体, 支持这种字体的浏览器有 IE4+
* `.svg`格式是基于SVG字体渲染的一种格式 



#### 引入

首先将解压后的`fonts`文件夹放到`.html`文件同一根目录下

在CSS样式中全局声明字体:简单理解把这些字体文件通过css引入到我们页面中,一定要注意字体文件路径的问题

只需要打开刚才解压出来的文件 , 找到`style.css`文件, 打开, 找到`@font-face`这个全局选择器, 复制粘贴到自己的`.html`文件中即可



#### 使用

还是 , 找到刚才解压出来的文件夹,  打开`demo.html`这个文件

找到想要用的图标  , 因为浏览器还不支持这些字体, 所以就会显示一个小框框, 我们只需要复制这个小框框或者相对应的编码`\编码`,然后粘贴到需要使用 的地方

然后为这个标签元素指定字体样式`font-family`,就是在上面的css中的名字,, 这样浏览器在渲染时,才会根据`fonts`文件夹中的字体渲染出来



**既然是字体, 那么他就可以使用字体的所有属性,包括字体颜色, 大小,透明度等等**



#### 字体图标的追加

工作中, 原来的字体图标不够用了, 我么需要添加新的字体图标到原来的字体文件中

还是解压的文件夹, 找到`selection.json`,然后上传,

然后继续选中自己想要追加的图标,重新下载压缩包,并替换原来的文件即可





### 总结

#### 优点

* 轻量级: 一个图标字体要比一系列的图像要小, 一旦字体加载了 , 图标就会马上渲染出来, 减少了服务器请求
* 灵活性: 本质就是文字, 可以随意的改变颜色, 产生阴影, 透明效果, 旋转等
* 兼容性: 几乎支持所有的浏览器, 放心使用

注意: **字体图标不能代替精灵图技术, 只是对工作中图标部分技术的提升和优化**



1. 如果遇到一些结构和样式比较简单的小图标, 就用字体图标
2. 如果遇到一些结构复杂的小图片, 就要使用精灵图







## CSS三角

网页中常见的一些三角 , 使用CSS直接画出来,不必做成字体图标或者图片



正常的盒子

```css
        .BOX{
            width: 100px;
            height: 100px;
            border-top: 10px solid red;
            border-bottom: 10px solid green;
            border-left: 10px solid yellowgreen;
            border-right: 10px solid blue;

        }
```

![image-20220410213036583](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220410213036583.png)

可以看出边框的交汇处是这样式儿的

由此得到启发,我们可以将`宽高设置为0`既可以得到三角形了

```css
        .box1{
            width: 0;
            height: 0;
            border-top: 30px solid yellow;
            border-right: 30px solid green;
            border-left: 30px solid red;
            border-bottom: 30px solid blue;
            margin: 0 auto;
        }
```

![image-20220410213352313](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220410213352313.png)

所以..这样就得到了三角形, 

比如说,我们想要一个朝向右边的三角, 只需要给`border-left`设置颜色即可,其他的三条边设置`transparent`即可



**注意: 宽高必须设置为0**







## CSS用户界面样式

就是更改一些用户操作样式, 以便提高更好的用户体验

### 鼠标样式cursor

cursor  光标,游标的意思

```css
li{
    cursor: pointer;
}
```



设置或检索在对象上移动的鼠标采用何种系统预定义的光标形式

<table>
    <tr>
    	<th>属性值</th><th>描述</th>
    </tr>
    <tr>
    	<td>default</td><td>小白 默认</td>
    </tr>
    <tr>
    	<td>pointer</td><td>小手</td>
    </tr>
    <tr>
    	<td>move</td><td>移动</td>
    </tr>
    <tr>
    	<td>text</td><td>文本</td>
    </tr>
    <tr>
        <td>not-allowed</td><td>禁止</td>
    </tr>
</table>





### 取消表单轮廓

当我们点击输入框时, 输入框的轮廓会发生变化

给表单添加`outline: 0;`或者`outline: none;`样式之后,就可以去掉默认的蓝色边框

```css
input{outline: none;}
```



### 防止拖拽文本域

文本输入框`<textarea name="" id="" cols="30" rows="10"></textarea>`默认是可以放大缩小的,但是通过放大缩小会影响其他元素的布局

所以我们需要禁止放大缩小

```css
textarea{
    resize: none;
}
```



## vertical - align属性应用

用于设置一个元素的垂直对齐方式, 但是它只针对**行内元素**或者**行内块元素**有效

应用场景:**经常用于设置图片或者表单(行内块元素)和文字垂直对齐**

![image-20220411105236463](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220411105236463.png)

```css
vertical-align: baseline | top | middle | bottom;

baseline: 默认, 元素放置在父元素的基线上
top:把元素的顶端与行中最高元素的顶端对齐
middle:把此元素放置在父元素的中间,元素与文字的
bottom:把元素的底端与行中最低元素的底端对齐,元素与文字的底线对齐

```



另一个应用场景:**解决图片底部默认空白缝隙问题**

bug:图片底层会有一个空白缝隙, 原始是行内块元素会和文字的基线对齐

![image-20220411121611432](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220411121611432.png)

这个空隙是为了给文字预留的,图片的下边线就是文字的基线



**解决方案**

```css
//1.只要不是基线就行
img{
    vertical-align: middle | top | bottom;
}

//2.将图片转换为block,因为vertical-align是行内元素和行内块元素才有的属性
img{
    display: block;
}
```



## 溢出的文字省略号显示

### 单行文本溢出显示省略号

必须满足三个条件,缺一不可

```css
1.先强制一行内文本显示
white-space: nowrap;(默认normal 自动换行,wrap是换行的意思,nowrap就是不换行) 
2.超出部分隐藏
overflow: hidden;
3.文字用省略号替代超出的部分
text-overflow: ellipsis;

```



### 多行文本溢出省略号显示

多行文本溢出显示省略号, 有较差的兼容性, 适合于webkit浏览器或移动端(移动端大部分是webkit内核)

直接复制粘贴即可

```css
            overflow: hidden;
            text-overflow: ellipsis;
            /* 弹性伸缩盒子模型显示 */
            display: -webkit-box;
            /* 限制一个块元素显示的文本的行数 */
            -webkit-line-clamp: 3;
            /* 设置或检索伸缩盒对象的子元素的排列方式 */
            -webkit-box-orient: vertical;
```

**这样做完之后,会在第三行末尾显示省略号,如果盒子够大,那么第四行正常显示,这时候我们只需要调整一下盒子的高度就可以了.**

更推荐后台人员来做这个效果, 因为后台人员可以设置显示多少个字,操作更简单







## 常见的布局技巧

### margin负值运用

当我们又几个相邻的盒子时,因为添加浮动,所以就会导致边界处是两倍的边框宽度,影响美观

![image-20220411171342655](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220411171342655.png)

所以我们就利用`margin`负值,只需要盖住一个边框就行,所以这个负值就是边框的宽度

```css
ul li {
    float: left;
    margin-left: -2px;//边框的宽度,
}
```



此时要实现鼠标经过盒子,边框就会变颜色的效果,有两种解决方案

1. 如果没有定位,则加相对定位即可(相对定位保留位置,定位的盒子会压住其他标准流和浮动的盒子)
2. 如果盒子本身有定位,则加`z-index`提高层叠等级







### 文字环绕浮动元素

巧妙运用浮动元素不会压住文字的特性

![image-20220411173213829](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220411173213829.png)



### 行内块巧妙运用

![image-20220411173621693](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220411173621693.png)

页码的布局,位于整个页面的中心



### 三角强化

做一个直角三角形,

例如,我们做一个朝向右的直角三角形,

1. 让下边框为0 , 左边框0
2. 上边框拉高并设置`transparent`

```css	
            width: 0;
            height: 0;
            border-color:transparent red transparent transparent;
            border-style: solid;
            border-width: 100px 40px 0 0 ;
```





## CSS初始化

不同浏览器对某些标签的默认值是不一样的,为了清除不同浏览器对标签元素的显示差异,照顾浏览效果的兼容性,我们要对CSS初始化

CSS初始化就是重设浏览器的样式,每个浏览器都必须首先进行CSS初始化

```CSS

/* 清除内外边距 */
*{
    margin: 0;
    padding: 0;
}

/* em和i倾斜的文字不倾斜 */
em,
i{
    font-style: normal;
}

/* 去掉li的小圆点 */
li{
    list-style: none;
}

/* border:0 照顾低版本浏览器,如果图片外面包含了链接会有边框的问题 */
img{
    border: 0 ;
    vertical-align: middle;
}

/* 当我们鼠标经过button时,鼠标变成小手 */
button{
    cursor: pointer;
}



a{
    color: #666;
    text-decoration: none;
}

a:hover{
    color: red;
}


body{
    /* 抗锯齿形,让文字显示更清晰,放大时 */
    -webkit-font-smoothing: antialiased;
    font:12px/1.5 Microsoft Yahei,Heiti SC,tahoma,arial,Hiragino Sans GB , "\5B8B\4F53";
    
}

/* 清除浮动 */
.clearfix::after{
    visibility: hidden;
    clear: both;
    content: '';
    height: 0;
}

```







**Unicode编码字体**

把中文字体的名称用响应的Unicode编码来代替,这样就可以有效的避免浏览器解释CSS代码时候出现乱码的情况

例如:"宋体"   用Unicode编码表示为 "\5B8B\4F53"







## 网站favicon图标

`favicon.ico`一般用于作为缩略的网站标志,它显示在浏览器的地址栏或者标签上

目前主要的浏览器都支持`favicon.ico`图标

三个步骤

1. 制作favicon图标
2. favicon图标放到网站根目录下
3. HTML页面引入favicon图标



### 制作favicon图标

1. 把图标制作成png图片
2. 把png图片转换为ico图标,这需要借助于第三方转换网站,[制作ico图标 | 在线ico图标转换工具 方便制作favicon.ico - 比特虫 - Bitbug.net](https://www.bitbug.net/)



### 引入

1. 在html页面里面的`<head></head>`元素之间引入代码
2. `<link rel="shortcut icon" href="/favicon.ico"/>`





## 网站的TDK三大标签SEO优化

`SEO(Search Engine Optimizatioin)`翻译为**搜索引擎优化**,是一种利用搜索引擎的规则提高网站在有关引擎内自然排名的方式

SEO的目的是**对网站进行深度的优化**,从而帮助网站获取免费的流量,进而在搜索引擎上提升网站的排名,提高网站的知名度

页面必须有三个标签来符合SEO优化

* `title`
* `description`
* `keyword`



### 网站标题

`title`具有不可代替性,是我们页面内的一个重要标签,是搜索引擎了解网页的入口和对网页主题归属的最佳判断点

建议: **<font color=red>网站名(产品名)-网站的介绍</font>**(尽量不要超过30个汉字)





### description网站说明

简要说明网站是来干什么的,介绍网站的总体业务和主题概括

多采用 **我们是......**,  **我们提供......**  ,  **xxx网作为.....**    ,  **电话: 010.....** 之类的语句



### keywords关键字

`keywords`是页面关键词,是搜索引擎的关注点之一

最好限制在6~~8个关键词, 关键词之间用英文逗号隔开, 





### LOGO SEO优化

1. `logo`里面首先放一个`h1`标签,目的是为了提权,告诉搜索引擎,这个地方的很重要
2. `h1`里面放一个链接,可以返回首页,把logo的背景图片给连接即可
3. 为了让搜索引擎收录,链接里面要放文字(网站名称) , 但是文字不要显示出来
   1. 方法1 : `text-indent`移到盒子外面(`text-indent:-99999px`),然后`overflow:hidden`
   2. 方法2: 直接给`font-size:0`即可
4. 最后给链接一个`title`属性,这样鼠标放上去就可以看见提示文字









## 常用模块类名命名

![image-20220416125537106](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220416125537106.png)











# H5和CSS3

## HTML5新特性

HTML5的新增特性主要是针对于以前的不足,增加了一些**新的标签,新的表单和新的表单属性**等

这些新特性都有兼容性的问题,基本是 IE9+以上的版本的浏览器才支持的,如果不考虑兼容性问题,可以大量使用这些新特性

### 语义化标签

以前我们布局,我们基本都是使用`div`, `div`对于搜索引擎来说,是没有语义的

为此,新增了很多语义化标签

![image-20220411202029420](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220411202029420.png)

```html
<header>头部标签</header>
<nav>导航标签</nav>
<article>内容标签</article>
<section>定义文档某个区域</section>
<aside>侧边栏标签</aside>
<footer>尾部标签</footer>
```



**注意**

* 这种语义标椎主要针**对于搜索引擎**
* 在IE9中,需要把这些元素转换为**块级元素**
* 其实,移动端更喜欢用这些标签



### 多媒体标签

```html
<audio></audio>音频
<video></video>视频
```

使用他们可以很方便地在网页中嵌入音频和视频,而不再使用 flash和其他浏览器插件

#### video

常见属性

<table>
    <tr>
    	<th>属性</th><th>值</th><th>描述</th>
    </tr>
    <tr>
    	<td>autoplay</td><td>autoplay</td><td>视频就绪自动播放(Chrome需要添加muted来解决自动播放问题)</td>
    </tr>
    <tr><td>controls</td><td>controls</td><td>向用户显示播放控件</td></tr>
    <tr><td>width<br>height</td><td>宽高</td></tr>
    <tr><td>loop</td><td>loop</td><td>播放完是否继续播放该视频,循环播放</td></tr>
	<tr><td>src</td><td>url</td><td>视频URL地址</td></tr>
	<tr><td>poster</td><td>Imgurl</td><td>加载等待的画面图片</td></tr>
    <tr><td>muted</td><td>muted</td><td>静音播放</td></tr>
</table>



HTML5在不使用插件的情况下,也可以原生的支持视频格式文件的播放,当然支持的格式有限

当前`<video>`支持三种视频格式:`MP4,WebM,Ogg`

尽量放`MP4`格式的,`MP4`格式所有的浏览器都支持

```html
<video src="路径" controls="controls"></video>
```

为了照顾兼容性

```html
    <video src="">
        <source src="movie.mp4" type="video/mp4">
        <source src="movie.ogg" type="vide/ogg">
        您的浏览器不支持播放视频
    </video>
```

```html
<video src="素材/Xiaomi 12.mp4" autoplay="autoplay" controls="controls" muted="muted" loop="loop"></video>
```





#### audio

支持三种音频格式`mp3,wav,ogg`

尽量使用`mp3`格式,所有的浏览器都支持`MP3`



属性

<table>
    <tr><th>属性</th><th>值</th><th>描述</th></tr>
    <tr>
    	<td>autoplay</td><td>autoplay</td><td>音频自动播放</td>
    </tr>
    <tr><td>controls</td><td>controls</td><td>显示播放控件</td></tr>
    <tr><td>loop</td><td>loop</td><td>音频结束后重新开始播放</td></tr>
    <tr><td>src</td><td>ulr</td><td>音频文件的URL</td></tr>
</table>



总结:

* 音视频的使用方式基本一致
* 尽量选择`mp3`和`mp4`格式





### input

#### 新增input类型

<table>
    <tr>
    	<th>属性值</th><th>说明</th>
    </tr>
    <tr>
    	<td>type="emaili"</td><td>限制用户输入必须为Email类型</td>
    </tr>
    <tr><td>type="url"</td><td>限制用户输入必须为URL类型</td></tr>
    <tr><td>type="date"</td><td>限制用户输入必须为日期类型</td></tr>
    <tr><td>type="time"</td><td>限制用户输入必须为时间类型</td></tr>
    <tr><td>type="month"</td><td>限制用户输入必须为月类型</td></tr>
    <tr><td>type="week"</td><td>限制用户输入必须为周类型</td></tr>
    <tr><td>type="number"</td><td>限制用户输入必须为数字类型</td></tr>
    <tr><td>type="tel"</td><td>手机号码</td></tr>
    <tr><td>type="search"</td><td>搜索框</td></tr>
    <tr><td>type="color"</td><td>生成一个颜色选择表单</td></tr>
</table>





```html
    <!-- 我们要使用form表单域验证 -->
    <form action="">
        <ul>
            <li>邮箱:<input type="email"></li>
            <li>网址:<input type="url"></li>
            <li>日期:<input type="date"></li>
            <li>日期:<input type="time"></li>
            <li>数量:<input type="number"></li>
            <li>手机号码:<input tyep="tel"></li>
            <li>搜索:<input type="search"></li>
            <li>颜色:<input type="color"></li>
            <li><input type="submit" value="提交"></li>
        </ul>
    </form>
```





#### input新增属性



<table>
    <tr><th>属性</th><th>值</th><th>说明</th></tr>
    <tr><td>placeholder</td><td>提示文本</td><td>表单的提示信息,存在默认值不显示</td></tr>
    <tr><td>required</td><td>required</td><td>内容不能为空,必填</td></tr>
    <tr><td>autofocus</td><td>autofocus</td><td>自动聚焦属性,页面加载完成自动聚焦到指定表单</td></tr>
    <tr><td>autocomplete</td><td>off/on</td><td>显示之前提交成功过的值,当用户在字段开始键入时,浏览器基于之前键入的值,应该显示出来在字段中填写的选项.默认已经打开,autocomplete="on",需要放在表单内,同时加上name属性,同时成功提交</td></tr>
    <tr><td>multiple</td><td>multiple</td><td>可以多选文件提交,适用于file按钮</td></tr>
</table>

可以通过下面的代码修改框内的提示文本

```css
        input::placeholder{
            color: aqua;
        }
```







## CSS3新特性

### 属性选择器

属性选择器可以根据元素特定的属性来选择元素,这样就可以不用借助于类或id选择器





* `元素名[属性]`: 选择具有该属性的元素

```css
        /* 必须是input,同时具有value这个属性 */
        input[value]{
            color: red;
        }
```



* `元素名[属性="属性值"]` : 选择具有该属性且属性值等于此 的元素

```css
        input[type="password"]{
            background-color: green;
        }
```



* `元素名[属性^="value"]` : 选择具有该属性,且属性值以"value"开头的元素

```css
    <div class="icon1">小图标1</div>
    <div class="icon2">小图标2</div>
    <div class="icon3">小图标3</div>
    <div class="icon4">小图标4</div>


        div[class^="icon"]{
            color: blue;
        }
```



* `元素名[属性$="value"]` : 选择具有该属性且属性值以"value"结尾的元素

```css
    <section class="icon1-data">我是傻逼</section>
    <section class="icon2-data">我是傻逼</section>
    <section class="icon3-xcx">我是天才</section>

        section[class$="data"]{
            background-color: skyblue;
        }
```



* `元素名[属性*="value` : 选择具有该属性且属性值中含有"value"的元素

```css
    <p class="xxxicoyy">我是第1段</p>
    <p class="aaicobb">我是第2段</p>
    <p class="wwicoss">我是第3段</p>

        p[class*="ico"]{
            font-size: larger;
        }
```



**注意:类选择器 , 属性选择器 , 伪类选择器 , 权值都为0**

```css
标签选择器 + 属性选择器 = 11
div[class^="icon"]{
    color: green;
}
类选择器 = 10;
.icon1{
    color: red;
}

<!--结果为绿色,-->
```



### 结构伪类选择器

结构伪类选择器主要根据文档结构来选择元素,常用于根据父级选择器匹配里面的子元素

`E:first-child` : 匹配父元素中的第一个子元素

`E:last-child` : 匹配父元素中最后一个元素

`E:nth-child(n)` : 匹配父元素中的第n个元素

```css
    <ul>
        <li>我是第1个孩子</li>
        <li>我是第2个孩子</li>
        <li>我是第3个孩子</li>
        <li>我是第4个孩子</li>
        <li>我是第5个孩子</li>
        <li>我是第6个孩子</li>
        <li>我是第7个孩子</li>
        <li>我是第8个孩子</li>
    </ul>

//这样也可以,只不过如果ul中还有其他的标签元素,例如p,span等,会影响
        ul :first-child{
            color:brown;
        }
//这时候可以这样
        ul li:first-child{
            color:brown;
        }

//选择最后一个孩子
        ul li:last-child{
            color: blueviolet;
        }
//选择第6个孩子
        ul li:nth-child(6){
            color:darkgoldenrod
        }
```



**!!!!**

* `nth-child(n)` : n 可以是数字,关键字 和公式
  * n是数字,那么就是选择第n个子元素
  * n可以是关键字 , even 偶数 , odd 奇数
  * n可以是公式 ,   公式的变量必须是n, 不能是其他字母 , 从0开始计算,每次加1  

```css
//选择第0,1,2,...个子元素
ul li:nth-child(n){
    background-color: gray;
}

//选择第0,2,4,6...个子元素
ul li:nth-child(2n){
    background-color: gray;
}

//选择第5,7,9,11....
ul li:nth-child(2n+5){
    background-color: gray;
}
```







`E :first-of-type` : 指定类型E的第一个

`E :last-of-type` : 指定类型E的最后一个

`E :nth-of-type(n)` : 指定类型E 的第n个,n可以是数字,关键字,表达式





`nth-child(n)` :

```css
        /* 首先nth-child()会把所有的子元素排列序号,
        然后根据nth-child(n)中的n 去选 , 选完之后再回头看前面的div */
        section div :nth-child(1){
            background-color: green;
        }

    <section>
        <p>光头强</p>
        <div>熊大</div>
        <div>熊二</div>
    </section>
<!--结果为都不变色-->
```

`nth-of-type(n)`

```css
        /* :nth-of-type() 会把指定元素排列序号
        然后根据nth-child(n)中的n 去选 , 选完之后再回头看前面的div */ */
        section div:nth-of-type(1){
            background-color: green;
        }
```

**区别**

1. `nth-child(n)`会把所有的子元素排序,然后选择n, 然后在看匹配
2. `nth-of-type(n)`会把指定类型的子元素培训,然后选择n, 然后看匹配



```css
1      +   1 + 10  = 12
section div:nth-of-type(n){
    background-color: green;
}
权重为12
```







### 伪元素选择器

伪元素选择器可以利用css创建新标签元素, 而不需要HTML标签, 从而简化HTMl结构

* `::before` : 在元素内容的前面插入内容
* `::after` :在元素内部的后面插入内容



**注意**

* `::before`和`after`创建一个元素,但是属于行内元素
* 新创建的这个元素在文档树中找不到,所以我们称为**伪元素**
* 语法`element ::before{}`
* before 和 after 必须有**content属性**
* before在父元素内容的前面创建元素, after在父元素内容的后面插入元素
* **伪元素选择器和标签选择器一样, 权重为1 **，伪元素就可以认为是一个虚拟的标签

> CSS 中使用单个冒号 (`:`) 表示伪类，而使用双冒号 (`::`) 表示伪元素。这是为了区分伪类和伪元素，并且符合 CSS 标准规范。不过，从 CSS3 开始，单个冒号也被允许用于表示伪元素，但是为了与伪类区分开来，推荐使用双冒号。
>
> 例如，`:hover` 是一个伪类，用于表示将鼠标悬停在一个元素上的状态，而`::before`是一个伪元素，用于向一个元素的内容前添加一个伪元素。
>
> 虽然在 CSS3 规范之前也使用单冒号来表示伪元素，但由于历史原因和部分旧浏览器的兼容问题，建议尽量遵循 CSS 标准规范，使用双冒号作为伪元素的表示符号。

#### 配合字体图标

创建一个小图标



#### 伪元素清除浮动

清除浮动的方法

* 额外标签法
* 父级添加overflow属性
* 父级添加after伪元素
* 父级添加双伪元素



父级添加after伪元素

```css
.clearfix::after{
    content:"";
    display:block;
    height: 0;
    clear:both;
    visibility: hidden;
}
```



双伪元素清除浮动

```css
.clearfix::before,.clear::after{
    content:"";
    display:table;
}
.clearfix::after{
    clear:both;
}
```





### 盒子模型 border-box

以前令人非常难受的一点是, border,padding能够撑大盒子,还需要额外计算

但是CSS3盒子模型的出现可以有效解决上面的问题

可以通过`box-sizing`来指定盒模型,有两个值`content-box`和`border-box`

* `content-box`就是以前用的盒子,盒子大小为`width+padding+border`
* `border-box`盒子大小为`width`
* 有了`border-box`之后`padding`和`border`就不会撑大盒子





### css3图片模糊处理

css3的滤镜`filter` : `filter`css属性将模糊或 颜色片偏移等效果应用于元素

后面可以通过js来自定义函数

```css
filet: 函数();	//例如   filter: blur(5px);blur模糊处理,数值越大越模糊
```





### calc函数

`calc()`此css函数让你在声明css属性值时会执行一些计算

```css
width: clac(100%-80px);
```

括号里面可以使用`+ , - , * , / `来计算



### 属性过渡

```css
/* 需要过渡的属性 */
transition-property: none | all | property;

/* 过渡的时间 */
transition-duration: 过渡的时间

     /* 过渡运动曲线 */
transition-timing-function: linear;

/* 过渡延迟的时间 */
transition-delay: 1s;
```

简写：顺序不可颠倒

```css
transition: property duration timing-function delay;
```

例如：

```css
    #box {
      width: 200px;
      height: 200px;
      background-color: gray;
      position: relative;
      transition: border-radius 0.5s linear;
    }


    #box:hover {
      border-radius: 100px;
    }
```





**过渡需要搭配`:hover`使用**

过渡属性写在要过渡的元素身上

```css
transition: 要过渡的属性 花费时间 运动曲线 何时开始;

属性: 想要变化的css属性, 宽度高度 背景颜色 内外边距都可以 ,如果想要所有的属性都变化过渡,可以写all
花费时间: 单位是 秒(必须写单位) 比如0.5s
运动曲线: 默认是ease , 可以省略
何时开始: 单位是秒(必须写单位),可以设置延时触发事件 , 默认是0s(可以省略)

transition: width .5;
transition: width .5s ease 0s;

```

**运动曲线可以是**

```css
`linear`匀速

`ease`逐渐慢下来

`ease-in`加速

`ease-out`减速

`ease-in-out`先加速后减速
```





```css
当我们需要过渡多个属性时,不能书写多个transition属性,因为会有样式冲突的问题
可以这样写
transition: 第一个要过渡的属性 , 第二个要过渡的属性;
例如,我的宽和高都需要过渡,可以这样写
transition: width .5s,height .5s;
也可以这样写
transition: all .5s;
```



当过渡结合定位使用时，要在过渡前后的状态中，给出定位的值，不可以只写一个中。

例如：将定位的值，只写在过渡后的状态中，这样不会有效果

```css
/* 无过渡效果 */

#box {
    width: 200px;
    height: 200px;
    background-color: gray;
    position: relative;
    transition: all 0.5s linear;
  }

#box:hover {
  top: 200px;
}
```

必须要在过渡前后的状态中，添加定位值

```css
/* 此写法可以过渡 */
#box {
  width: 200px;
  height: 200px;
  background-color: gray;
  position: relative;
  transition: all 0.5s linear;
  top: 0;
}

#box:hover {
  top: 200px;
}
```





### 2D转换

转换`transform`是css3的重要特征之一, 可以实现元素的位移 , 旋转, 缩放等效果

* **translate移动**
* **rotate旋转**
* **scale缩放**



#### translate

2D移动可以改变元素在页面中的位置,类似于定位，**平移**

**不需要定位也可以使用**

语法

```css
transform: translate(x,y);
//或者分开写
transform: translateX(n);
transform: translateY(n);
如果里面的参数是%,那么就是参照盒子自身的宽度和高度
transform: translate(50%,50%)
```

* `translate`最大的优点: 不会影响其他元素的位置
* `translate`中的百分比单位是相对于自身元素的`translate: (50%,50%)`
* 对行内标签没有效果



一个盒子的水平垂直居中的新方法,

以前利用定位,需要向右走父元素的50%,然后向左走自身的一半,之前的向左走是直接写死的,现在不用写死,更灵活

```css
div{
    width: 200px;
    height: 220px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
```



#### rotate

```css
transform: rotate(度数);
transform: rotate(90deg);//单位不能省
正值顺时针旋转
负值逆时针旋转
```

**设置中心点**

```css
transform-origin: x y;
x y 可以是百分比 , 像素, 方位名词
```

* x y 默认的转换点是元素的中心点(50% 50%)
* 还可以给x  y设置像素或者方位名词(top , bottom , left ,right , center)





#### scale

缩放scale

```css
transform: scale(x,y);

transform: scale(1,1);宽和高放大到1倍,相当于没有放大
transfrom: scale(2,2);宽和高放大到2倍
transfrom: scale(2);等价于scale(2,2)
transform: scale(0.5,0.5);//缩小
```

* 不会 影响其他的盒子,而且可以设置缩放中心点

```css
transform-orgin: x y;
x y 可以是像素,百分比,方位名词
```







#### 2D转换总和写法

* 同时使用多个转换, 其格式为`transform: translate() rotate()....`
* 其顺序会影响转换效果(先旋转会改变坐标轴方向)
* 当我们同时有位移和其他属性时,记得要将位移放到最前面

```css
            transform: translate(500px,40px) rotate(180deg);
 要把位移写在前面,
假如rotate在前面,那么先旋转后的x,y坐标轴也跟着转了,所以会跑偏
```







### CSS3动画

`animation`可以通过设置多个节点来精确控制一个或一组动画,常用来实现复杂的动画效果

相比较过渡, 动画可以实现更多变化,更多控制,连续自动播放等效果

制作动画分为两步

* 先定义动画
* 再使用(调用)动画



#### 动画序列

* 0%是动画的开始,100%是动画的完成,这样的规则就是动画序列
* 动画是使元素从一种样式逐渐变化为另一种样式的效果,可以改变任意多的样式,任意多的次数
* 关键字`from`和`to`等同于`0%`和`100%`



#### 使用keyframes定义动画

```css
    #box {
      width: 200px;
      height: 200px;
      background-color: gray;
      /* 动画的名称 */
      animation-name: appear;
      /* 动画持续时间 */
      animation-duration: 0.5s;
      /* 动画曲线 */
      animation-timing-function: linear;
      /* 动画延迟开始时间 */
      animation-delay: 1s;
      /* 动画播放次数 */
      animation-iteration-count: 3;
      /* 动画播放顺序 */
      /* 即播放完之后是否逆向交替循环 */
      animation-direction: normal;

    }

    /* 定义一个动画 */
    @keyframes appear {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }
```



**类似定义类选择器**

```css
@keyframes 动画名称{
    0%{
        width: 100px;
    }
    100%{
        width:200px;
    }
}
```

**使用动画**

```css

div{
    width: 200px;
    height: 200px;
    background-color: blue;
    //调用动画
    animation-name:动画名称;
    animation-duration: 持续时间;
}
```

**定义动画序列**

百分比是动画的关键帧

```css
        @keyframes mmove{
            0%{
                transform: translate(0,0);
            }
            25%{
                transform: translate(1000px,0);
            }
            50%{
                transform: translate(1000px, 800px);
            }
            75%{
                transform: translate(0,800px);
            }
            100%{
                transform: translate(0,0);
            }
        }
```





####  动画常用的属性

```css
@keyframes	规定动画
animation	所有动画属性的简写,除了animation-play-state属性
animation-name	规定动画的名称
animation-duration	规定动画完成一个周期所花费的时间,单位秒或毫秒
animation-timing-function	规定动画的速度曲线,默认是ease
animation-delay	规定动画何时开始,默认是0
animation-iteration-count	规定动画被播放的此时,默认是1,infinite是无限
animation-direction	固定动画在下一周期逆向播放,默认是normal , alternate逆播放
animation-play-state	规定动画是否正在运行或播放,默认是running, 还有paused
aimation-fill-mode	规定动画结束后状态,保持结束状态forwards , 回到起始状态backwards

```

`animation-timing-function`

``` css
linear	匀速
ease	低速开始,加速,减速
ease-in	低速开始,加速
ease-out 高速开始,减速
ease-in-out 低速开始,低速结束
steps()	指定时间函数中的间隔数量(步长),分几步走完这个过程
```



#### 动画属性简写

```css
animation:动画名称 持续时间 运动曲线 何时开始 播放次数 是否方向 动画何时开始或者结束的状态
动画名称和持续时间不能省略,其余可以省略
顺序不可乱
```



animation简写
```css
animation: name duration timingfunction delay iteration-count direction;
```

- animation-name和animation-duration必须指定，其余可选







### 3D转换

特点:

* 远小近大
* 物体后面遮挡不可见

只不过是多了一维, x轴,y轴,z轴

* x轴 : 向右为正
* y轴 : 向下为正
* z轴 : 屏幕向外为正



#### 透视perspective

在2D平面差生远小近大的视觉立体,但是只是效果二维的

* 如果要想在网页产生3D效果就需要透视
* 模拟人的视觉
* 透视也称为**视距**, 视距就是人的眼镜到屏幕的距离 , 距离越大, 效果越小
* 透视的单位是像素

**透视写在被观察元素的父盒子中**

* d是视距 , 视距就是距离人的眼睛到屏幕的距离
* z就是z轴 , 物体距离屏幕的距离, z轴越大 , 我们看到的物理就越大

![image-20220422141628001](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220422141628001.png)







#### 3D位移

```css
translateX()
translateY()
translateZ()//z轴一般用px作单位
translate3d(x,y,z)//xyz不能省略,如果没有就写0

```

* `translate3d(x,y,z)`  里面的参数一个也不能省略,可以写0





#### translateZ

仅仅是在Z轴上移动,有了透视,就能看到`translateZ`引起的变化了





#### 3D旋转

3D旋转可以让元素在三维内沿着x , y, z轴旋转

语法

```
transform: rotateX(45deg) 沿着x轴正方向旋转45度
transform: rotateY(45deg) 沿着y轴正方向旋转45度
transform: rotateZ(45deg) 沿着z轴正方向旋转45度
transform: rotate3d(x,y,z,deg) 沿着自定义轴旋转deg为角度(了解即可)
```

对于元素旋转的方向的判断, 需要一**左手准则**

* 左手的手拇指指向x轴的正方向
* 其余手指的弯曲方向就是该元素沿着x轴旋转的正方向





#### 3D呈现

```
transform-style:
```

要实现这样的效果

![image-20220424104515265](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220424104515265.png)



* 控制子元素是否三维立体环境
* `transform-style:flat` 子元素不开启3d立体空间, 默认的
* `transfomr-style: preserve-3d` 子元素开启立体空间
* 代码写给父级, 但是影响的是子盒子





## flex

Flexible Box 模型, 一维布局模型 , 

因为一个flexbox一次只能处理一个维度上的元素, 一行或者一列

**给flexbox的子元素之间提供了强大的空间分布和对齐能力**

### 两根轴线

当使用Flex布局时,首先要想到两根轴线 -----**主轴和交叉轴** 

主轴由`flex-direction`定义 ,交叉轴垂直于它

#### 主轴

主轴由`flex-direction`定义 , 可取四个值

* row 
* row-reverse
* column
* column-reverse

![image-20220424201421075](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220424201421075.png)



#### 交叉轴

![image-20220424201521153](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220424201521153.png)



### 起始线和终止线

flexbox不会对文档的书写模式做出规定,(之前我们默认的书写模式都是,从左到右书写,新的行的出现在下面)

如果`flex-direction: row`,那么我在书写英文时,主轴的起始线是左边,终止线是右边







### Flex容器

采用了flexbox的区域叫做flex容器 , 为了创建flex容器 , 我们把一个容器的`display: flex`或`display: inline-flex`

flex容器中的所有flex元素都会有下列行为 , 以`flex-direction: row`为例

* 元素排列为一行
* **元素从主轴的起始线开始**
* **元素不会在主维度方向上拉伸,但是可以缩小**
* 元素被拉伸来填充交叉轴的大小
* `flex-basis`默认为`auto`
* `flex-wrap`默认为`nowrap`

这会让你的元素呈线性排列,并且把自己的大小作为主轴上的大小

如果有太多元素超出容器, 他们会溢出而不会换行 , 如果一些元素比其他元素高,那么元素会沿着交叉轴被拉伸来填满他的大小



### flex-wrap

用`flex-wrap`实现多行Flex容器

虽然`flexbox`是一维模型,但是我们可以使我们的`flex`项目应用到多行中

**可以把每一行看做一个新的flex容器**,任何空间分布都将在该行上发生,而不影响该空间其他的行

**为了实现多行效果,`flex-wrap: wrap`  , 现在,如果项目太大无法全部显示在一行中,则会换行显示**

`flex-wrap: no-wrap`就是默认值,也是不会换行, 无法显示时,**会缩小每个元素在主轴上的值**,如果子元素无法缩小 , 那么就将溢出



### 简写属性flex-flow

可以将`flex-direction`和`flex-wrap`组合为简写属性`flex-flow`

第一个指定的值为`flex-direction`,第二个指定的值为`flex-wrap`

```css
flex-flow: row wrap;
```



### flex元素上的属性

为了更好的控制flex元素,有三个元素可以作用于他们

* `flex-grow`
* `flex-shrink`
* `flex-basis`

需要先了解**可用空间**available space这个概念

这几个flex属性的作用就是改变了flex容器中的可用空间的行为

**同时,可用空间对于flex元素的对齐行为也是很重要的**

![image-20220424225929173](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220424225929173.png)



#### flex-basis

`flex-basis`定义了该元素的**空间大小** , flex容器里除了元素所占的空间以外的富余空间就是**可用空间** 

默认值`flex-basis: auto` , 此时浏览器会检测这个元素是否具有确定的尺寸 ,  在上面的例子中,所有的元素都设定了宽度width为100px , 所以`flex-basis: 100px`

**如果没有给元素设定尺寸 , `flex-basis `的值采用元素内容的尺寸** ,这就解释了: 我们只要给Flex元素的父元素的声明了`display: flex` ,所有的子元素就会排成一行,且自动分配大小以充分展示元素的内容



#### flex-grow

`flex-grow`若被赋值为一个正整数,flex元素会议`flex-basis`为基础,沿着主轴方向增加尺寸,这会使该元素**延展**,,并占据此方向轴上的可用空间. 如果有其他元素也被允许延展 , 那么会各自占据可用空间的一部分 , **这些元素会按照比例被拉伸**

如果我们给所有元素的`flex-grow: 1`, 那么容器中的可用空间会被这些元素平分 , 他们会延展以填满容器主轴方向上的空间



**`flex-grow`写到 flex容器中的子元素中**

**举个栗子**

flex容器中有3个元素, `flex-grow`属性可以按比例分配空间 ,如果第一个元素`flex-grow`值为2 ,其他元素的值为1 , 则第一个元素将占有 2/4 ,另外两个元素各站 1/4 



#### flex-shrink

`flex-grow`是处理flex元素在主轴上增加空间的问题 , 

相反`flex-shrink`属性是处理flex元素收缩的问题 

如果我们容器中没有足够排列的空间时, 那么就可以把`flex-shrink`属性设置为正整数来缩小它所占空间到`flex-basis`以下 ,

与`flex-grow`属性一样  , 可以赋予不同的值来控制flex元素收缩的程度 ---给`flex-shrink`属性赋予更大的数值,可以比赋予小数值的同级元素收缩程度更大

在计算flex元素收缩大小的同时 , 他的最小尺寸也会被考虑进去 , 就是说实际上`flex-shrink`属性可能会和`flex-grow`属性表现的不一致 , 因此



### 元素间的对齐和空间分配

Flexbox的一个关键特性就是能够设置flex元素沿着主轴方向和交叉轴方向的对齐方式,以及他们之间的空间分配

#### align-items

`align-items`属性可以使元**素在交叉轴方向对齐方式**

这个属性的初始值为`stretch`,这就是为什么会默认被拉伸到最高元素的高度.实际上,他们被拉伸来填满flex容器-----**最高元素定义了容器的高度**

`align-items`的四个属性值

* `stretch`  与容器的高度保持一致 , 拉伸元素
* `flex-start `  与交叉轴的起始位置对齐
* `flex-end`  与交叉轴的终止线对齐
* `center`  与交叉轴的中间对齐



#### justify-content

`justify-content`属性用来使**元素在主轴方向上对齐方式**

属性值

* `stretch` 拉伸
* `flex-start`   初始值 , 元素从容器的起始线开始排列
* `flex-end`  元素从容器的终止线开始排列
* `center` : 居中对齐
* `space-around`  **容器的左边距等于右边距 , 元素之间的间隔相等**
* `space-between`  把元素排列好之后的剩余空间拿出来 ,平局分配到元素之间 ,所以使**元素之间的间隔相等**
* `space-evenly`  **每个元素的左右空间相等**






# HTML事件

## 常用HTML事件

![image-20220326110901381](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220326110901381.png)





## Window事件属性

![image-20220324220326808](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220324220326808.png)





## Form事件

由HTML表单内的动作触发的事件,能应用到几乎所有的元素,但最常用与form元素中

![image-20220324220642111](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220324220642111.png)



## Keyboard事件

![image-20220324220702719](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220324220702719.png)







## Mouse事件

由鼠标触发的事件

![image-20220324220902048](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220324220902048.png)







## Media事件

不常用

![image-20220324220941209](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220324220941209.png)























































































































































