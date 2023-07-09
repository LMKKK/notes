# 基础

## 介绍

### JS的书写位置

1. 嵌套在HTML中，尽量在`</body>`的上方，因为DOM是从上而下解析的

```html
<body>

  <script>
    document.write('<h1>Hello！JavaScript')
  </script>
</body>
```



2. 引入，`<script>`标签体中不能再由内容，否则不会解析

```html
<head> 
  <script src="./js/index.js"></script>
</head>
```

尽量也放在`</body>`的上方

```html
<body>


  <script src="./js/index.js"></script>
</body>
```



3. 行内嵌入式，很少使用，一般在Vue中会遇到

```html
<body>
  <button onclick="alert('别点我')">按钮</button>
</body>
```



### 注释和分号

单行注释

```js
// 这是单行注释
```

多行注释

```js
/*
我是多行注释，啦啦啦啦
la la la
hhhh
*/
```

**关于加不加分号`;`这个问题**

其他语言中，一般会使用分号`;`来作为一行语句的结束符，用来分隔不同的语句。

但是浏览器根据语句自动识别，所以每行语句的末尾可以不用加分号

代码中应该保持一致，要么全加分号，要么全不加分号，符合规范





### 基本的输入输出

#### 输出

1. 页面输出

```js
document.write('<h1>hello</h1>')
```

**向页面中追加内容**

直接向页面中写入字符，特殊含义的字符，例如标签，会自动被解析



2. 弹出框提示

```js
alert('危险危险')
```



3. 控制台输出

```js
console.log('lalalala')
```



#### 输入

1. 弹出框输入

```js
    let msg = prompt('请输入')
    alert(msg)
```





### 变量的声明



#### 变量的命名规范

规则：

- **不能使用关键字，例如let、if、var**
- **只能使用下划线_、字母、数字、美元符号$组成，且不能使用数字开头**
- **变量名格区分大小写**，如Age和age不是同一个变量

规范：

- 变量的命名应该保证**见名知意**
- 小驼峰：userName、stuNo、stuName
- 大驼峰:：UserName、StuNo、StuName

#### 变量的声明

##### 普通的声明

使用let关键字来声明一个变量，在js中不需要指定变量的类型，系统会自动推断出变量类型

```js
let temp = 1
```

**使用=号运算符来进行赋值**

也可以先声明，后赋值

```js
// 声明变量
let temp 
// 变量赋值
temp = 3
```



#### 声明常量

不可以改变的变量，就称为常量

使用`const`关键字来声明一个常量

```js
// 声明并赋值
const PI = 3.14
```

**常量在声明时就需要赋值**

```js
// 声明
const PI = 3.14

// 修改
// 报错
PI = 3
```





#### var和let

var不建议使用，因为会存在问题：

- 变量域提升
- 变量未声明先使用
- 变量重复声明

let就不会出现这样的问题





### 数组

通过方括号来标识

```js
let list = [1, 2, 3]
console.log(list)
```

同样使用下标来访问，第一个元素的下标是0

```js
let list = [1, 2, 3]
console.log(list[0])
console.log(list[1])
```

数组本质也是一个对象，所以可以通过`length`属性来获取数组的长度
```js
let list = [1, 2, 3]
console.log('数组长度为', list.length)
```











## 数据类型

JS中的数据类型也是分为两大类

- 基本数据类型
- 引用数据类型



### 基本数据类型

- number数字型
- string字符串型
- boolean布尔型
- undefined未定义型
- null空类型



#### number数字型

所有的数字都称作number数字型，不区分整型、浮点数

只有数字类型的变量才能使用算数运算符

##### 算术运算符

```js
+ 加
- 减
* 乘
/ 整除
% 求模
```

先乘除后加减



##### NaN类型

在数字类型number中有一个特殊类型的值NaN

NaN的意思是Not a Number，代表计算错误

**代表计算错误，一个不正确的或未定义的数学操作所得到的结果**

例如，字符串与数字类型的运算

```js
console.log('liu' - 1)
// 输出NaN
```

**NaN是一个粘性的，NaN与值一起运算，得到的结果都是NaN**

```js
console.log(NaN + 2)
// 输出NaN
```



#### 字符串类型

使用**单引号**或**双引号**定义的

推荐使用单引号

```js
let str = 'Liu'
console.log(str)
```

字符串本质上也是一个数组，里面存放的是一个一个的单个字符

所以可以使用索引来访问其中的内容

```js
let str = 'Liu'
console.log(str[0])
```

**如果需要对单引号或双引号等特殊字符进行输出，使用`\`进行转义**

**单引号中，不能再出现单引号，同理双引号也是**

所以**单引号中嵌套双引号，双引号中嵌套单引号**



##### 字符串拼接

使用`+`运算符来进行字符串的拼接

```js
let str = 'Liu' + 'kk'
console.log(str)
```

其他的基本数据类型与字符串做`+`运算，也会被拼接

```js
console.log(123 + 'kk')
// '123kk'
console.log(false + 'abc')
// 'falseabc'
console.log('kk' + NaN)
// 'kkNaN'

let age= 18
console.log('我今年' + age + '岁了')
// 我今年18岁了
```



#### 模板字符串

模板字符串的出现是为了方便字符串与变量做拼接

使用**反引号``**来包含整个字符串，变量使用**${}**来包含

```js
let age = 18
console.log(`我今年${age}岁了`)
```



#### 布尔型

布尔型

- true真
- false假





#### 未定义类型undefined

未定义类型，

**如果只声明了变量，没有对变量赋值，那么这个类型就是默认的undefined类型**

**因为JS是弱数据类型，只有赋值后，才知道他的数据类型**

```js
let a 
console.log(a)
// undefined
```





#### 空类型null

代表“空”的意思

```js
let tm = null
console.log(null)
// null
```



**null和undefined的区别**

- undefined表示没有赋值
- null表示赋值了，值的内容是空

**null一般用来指定一个空对象**

```js
    console.log(undefined + 1)
    // NaN 

    console.log(null + 1)
    // 1
```



### typeof

typeof 关键字用来检测变量的数据类型

支持两种写法：

- typeof x
- typeof(x)

```js
let a = 1
console.log(typeof a)
// number

console.log(typeof (a))
// number

console.log(typeof ('sss' - 1))
// number 因为NaN是number中的一个特殊值

console.log(typeof ('kkk'))
// string
```



### 数据类型转换

JavaScript是弱数据类型

**坑：通过表单、prompt获取到的值默认是字符串类型，此时不能直接进行算术运算，需要类型转换**

```js
let age = prompt('请输入')
console.log(typeof age)
// string
```

**对于表单、prompt获取过来的数据，如果需要算数运算，需要转换为数字型number**



#### 隐式转换

**某些运算符被执行时，系统内部自动将数据类型进行转换，隐式转换**

规则：

- **+ 号两边只要有一个是字符串类型string ， 就会把另一个转换为字符串类型，然后进行拼接运算**
- **除了 + 号以外，其他的算术运算符都会将数据转换为数字类型number**

缺点：

- 转换类型不明确，可能会存在因为无法转换而导致报错
  - 例如，字符串类型无法转换为数字类型，导致运算结果是NaN



**技巧**：

- **在字符串string前加一个正号，字符串就会转换为number**
- 任何数据与字符串类型相加都是字符串类型

```js
console.log('123' + 123)
// '123123'
console.log(+'123' + 123)
// 246
console.log(typeof (+'123' + 123))
// nunmber
```





#### 显示数据类型转换

转换为数字型:

- 使用Number(数据)，类似于Java中的构造方法
  - 如果字符串能被转换成number，则成功
  - 如果字符串不能被转换为number，则结果是NaN
- parseInt(数据)
  - 只保留整数
- parseFloat(数据)
  - 可以保留小数部分



```js
    console.log(Number(true))
    // 1
    console.log(Number(false))
    // 0

	let num = '123'
    num = Number(num)
    console.log(typeof num)
    // number

    let a = '123abc'
    console.log(Number(a))
    // NaN

    let ab = 123.456
    console.log(parseInt(ab))
    // 123

    let aa = '123.456'
    console.log(parseInt(aa))
    // 123

    let b = '123px'
    console.log(parseInt(b))
    // 123

    let c = 'abc123abd'
    console.log(parseInt(c))
    // NaN

    let f = '123.456k'
    console.log(parseFloat(f))
    // 123.456
```

其他数据类型之间的转换，可以使用对应的构造方法

例如：

- String()
- Boolean()

注意：没有对应的转换为null、undefined的方法，没有Null()、Undefined()类似的方法



### 引用数据类型

object对象







## 运算符

两元运算符

```js
+
_
*
/
%

运算并赋值    
+=
-=
/=
*=
%=

比较运算符
>
>=
<
<=

逻辑运算符
&& 与
|| 或
! 非
    
算术移位
>>
<< 
>>=
<<=

逻辑移位    
>>>
>>>=
```

一元运算符

```js
++

--


    let a = 1
    console.log(++a)
    // 2
    console.log(a++)
    // 2

```



## == 和 ===

在JS中，== 和===都可以用于值比较

区别是：

- **==运算符在进行比较时，会先尝试进行类型转换，然后比较两个值是否相等**

```js
1 == 1 // true

1 == '1' // true

0 == false // true

undefined == null // true

false == '0'
```

> 类型转换的规则：
>
> - 如果两个数类型相同，则进行普通的比较
> - 如果一个是null，一个是undefined，返回true
> - 一个是数字类型，一个是字符串类型，则将数字类型转换为字符串类型，然后比较
> - 如果一个是数字，一个布尔，则将布尔转换为数字
> - 如果一个是布尔 ，另一个是非布尔，则先将布尔转换为数字，然后比较
> - 如果一个是对象类型，另一个是数字或字符串，则调用对象的valueOf()方法，将对象转换为字符串或数字，然后比较
> - 如果如果是两个对象，则调用这两个对象的toString()方法进行比较
>
> 

- **===运算符在进行比较时，不会进行类型转换，只有当两个值的类型相同时，才会进行比较，如果类型不相同，直接返回false**

  **===运算符更严格**

```js
1 === '1' // false

0 === false // false
```

**推荐使用===**



## 断点调试

1. 浏览器F12打开开发者工具
2. 点击source查看源码
3. 选定某行，打上断点
4. 刷新页面就可以进入Debug模式了



## 程序控制

顺序结构、分支、循环



### 分支结构

三种分支语句：

- if分支
- 三元运算符分支
- switch分支



#### if分支

##### 单分支

```js
if(条件){
    //...
}
```

if括号中的值只能是 true或 false

只有为true时才会执行if中的代码

**如果if中的条件不是布尔类型，那么就会发生自动隐式转换**

- **除了`''`之外的所有字符串都为true**

- **除了0和NaN之外的所有数字number都是true**
- **除了null之外的所有的对象类型都为true**
- **undefined相当于false**

但是还是推荐使用逻辑表达式，见名知意



##### 多分支

```js
if(condition1){
    // ...
}else if(condition2){
    // ...
}else if(condition3){
    //...
}else{
    //...
}
```

**满足其中一个，其他的条件就不会执行**





#### 三元运算符

```js
condition ? result1 : result2
```



#### swtich分支

```js
switch(数据){
    case data1:
        //...
        break;
    case data2:
        //..
        break;
    default:
        //...
}
```







### 循环结构



#### while循环

```js
while(condition){
    //...
}
```

只要满足condition就会执行while中的内容

直到不满足condition，跳出循环





#### 循环中的两个关键字

- **continue**

  **跳过本次，执行下一次循环，循环没有停止**

- break

  **终止本次循环，即跳出循环，循环停止了**





#### for循环

```js
for(初始值;condition;表达式){
    // ...
}
```





#### do...while..

先do再判断，如果符合继续do，不符合跳出，用的比较是少

```js
do{
    ...
}while(condition)
```





#### 循环嵌套

一个循环中嵌套另一个循环，缕清思路就好







## 数组

数组本质上就是一个对象，有属性和方法



1. 访问数据

```js
数组[index]
```



2. 修改数据

```js
数组[index] = newValue
```

```js
    let list = [1, 2, 3]
    list[0] = 0
    console.log(list)
```



3. 添加数据

可以调用数组的方法

```js
// 数组末尾追加,并返回新数组的长度
数组.push(data)

//或
// 数组的头部插入，同样返回新数组的长度
数组.unshift(data)
```

```js
let list = [1, 2, 3]
console.log(list.push(99))
// 4 即数组长度为4

// push()方法的参数是不定长参数，可以有多个参数
let list = [1, 2, 3]
let length = list.push(4, 5, 6, 7, 8, 9)
console.log(length)
// 9
```

```js
let list = [1, 2, 3]
let length = list.unshift(4)
console.log(length)
// 4

let list = [1, 2, 3]
let length = list.unshift(4, 5, 6)
console.log(list)
// 4,5,6,1,2,3
console.log(length)
// 6
```





4. 删除数组中的数据

```js
// 删除最后一个元素，并返回该元素的值
数组.pop()

// 删除第一个元素，并返回该元素的值
数组.shift()

// 删除指定范围内的元素
// 即索引为[index,index + num) 
数组.splice(index, num)
```

pop()用法

```js
let list = [1, 2, 3]
console.log(list.pop())
// 3
console.log(list)
// [1,2]
```

shift()用法

```js
let list = [1, 2, 3]
console.log(list.shift())
// 1
console.log(list)
// [2,3]
```

splice()方法

```js
    let list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // 删除第3个到第5个元素
    // 即索引范围是[2,5)
    list.splice(2, 3)
    console.log(list)
    // [1,2,6,7,8,9]
```







## 函数

函数本质也是一个对象



### 函数定义

将可复用的代码封装起来

```js
function funName(arg0,arg2){
    //...
    // 方法体
}
```

例子

```js
    // 函数定义
    function sayHello() {
      console.log("Hello")
    }

    // 函数调用
    sayHello()
```

### 函数传参

```js
    // 函数定义
    // 求1 ~ end的累加和
    function sum(end) {
      let res = 0
      for (let i = 1; i <= end; i++) {
        res += end
      }
      console.log(res)
    }
    // 函数调用
    // 求1 ~ 50 的和
    sum(50)
    // 求 1~100 的和
    sum(100)
```

想要多少个参数直接写就可以

```js
function sum(a,b){
    console.log(a + b)
}

sum(1,2)
// 3
```

**函数定义时的参数叫做形参，调用时传入的真正参数叫做实参**

**在调用是实参会传递给形参**



#### 参数默认值

可以指定多个参数，如果有的参数用户不需要，则可以指定默认值

**在调用时，如果指定了所有的参数，那么就用提供的**

**如果没有提供该参数，则使用默认值**

```js
function getSum(x = 0, y = 0) {
    console.log(x + y)
}
getSum()
// 0
getSum(1)
// 1
getSum(1, 2)
// 2
```

**如果普通的参数没有传参，则该参数是undefined**



### 函数返回值

**将运算结果反馈给调用方**

通过return 关键字将运算结果返回给调用方

当方法执行到return后，就意味着这个方法的调用就结束了

```js
// 函数定义求 a~b的和
function getSum(a, b) {
    let res = 0
    for (let i = a; i <= b; i++) {
        res += i
    }
    return res
}
// 函数调用
// 使用一个变量来接收返回值
let ans = getSum(2, 8)
console.log(ans)
```





### 作用域

使用大括号`{}`来标记一块区域，这块区域叫做作用域

作用域之间是可以嵌套的，一个作用域中定义的变量，在当前范围已经子作用域中有效。

此作用域中定义的变量，超出这个作用域是无法使用的。



笼统来说：有两种作用域

- 全局作用域，即整个`<script>`标签中的最最大的作用域
- 局部作用域：例如函数作用域，只要使用`{}`来标记，就是一个局部作用域



**变量访问原则，最近原则，先从当前作用域找，如果没有，则找上一层的作用域找，找到就用**





**在声明变量时，如果不使用let、const、var这类的关键字，直接赋值就认为是全局变量，不推荐这样使用**

```js
function fun(){
    num = 10
}
// 调用一次
fun()
console.log(num)
// 10
```







### 匿名函数

没有名称的函数，没有名称的函数如何调用？

```js
function(){
    // ...
}
```

1. **可以将匿名函数赋值给一个变量来使用，称这种定义函数的方式叫做函数表达式**

```js
    // 匿名函数定义并赋值给变量
    let getSum = function (a, b) {
      return a + b
    }
    // 使用函数
    let res = getSum(1, 2)
    console.log(res)
```

匿名函数常用来传参使用，即一个形参的类型是一个函数，我们在调用此方法是需要传入一个函数，此时可以使用匿名函数。



2. **立即执行函数：函数定义完成之后立即调用执行，多个立即执行函数之间一定要加分号;隔开**

场景：避免全局变量之间的污染

```js
// 方式一
(function () {
    console.log('我是立即执行函数')
})();

// 方式二
(function () {
    console.log('我是立即执行函数')
}());
```

例子，也是可以传参的，在第二个小括号中给出参数即可

```js
(function (a, b) {
    console.log(`${a}+${b}的结果是${a + b}`)
    console.log('我是立即执行函数')
})(1, 2);
```



### 回调函数

一个方法的参数是一个方法，

A方法的参数需要一个方法B，在A方法内部会调用传入进来的B方法，那么B就是对调函数。

```js
// 定义b
function b(){
    console.log('b...')
}

// 定义a
function a(b){
    console.log('a..')
    b()
}

// 调用a
a(b)
```



### 递归函数

在函数内存，继续调用本身

必须要有递归结束的条件，否则就会陷入无限递归，导致栈溢出

```js
// 利用递归实现求一个数的阶乘
function fun(n) {
    if (n == 1) {
        return 1
    }
    return n * fun(n - 1)
}

console.log(fun(5))
// 5 * 4 *3 * 2* 1 = 120
```



# 对象

封装一组数据

## 对象的创建

对象的声明，使用一对大括号`{}`

```js
let objName = {}
```

**对象由属性和方法组成，属性名可以使用双引号或单引号来括起来，但一般不写**

**多个属性之间，方法之间，属性和方法之间使用逗号分割开来**

```js
let obj = {
    name: '张三',
    age: 18,
    sayHello: function(){
        console.log('Hello')
    }
}
```





## 对象的使用

### 访问对象的属性

**用这种方式**

```js
对象.属性名
```

也可以使用这样方式，但是不推荐使用，如果属性名有特殊符号可以使用这种方式

```js
对象名['属性名']
```



修改对象属性值的话，也是这样

```js
对象.属性名 = newValue
```

```js
let obj = {
    name: '张三',
    age: 18,
    sayHello: function () {
        console.log('Hello')
    }
}
console.log(obj)
console.log(obj.name)
obj.name = '李四'
console.log(obj)
```



### 删除对象属性

```js
delete 对象名.属性名
```

```js
    let obj = {
      name: '张三',
      age: 18,
      sayHello: function () {
        console.log('Hello')
      }
    }
    console.log(obj)
    delete obj.age
    console.log(obj)
```



### 遍历对象

增强for循环

```js
for(let item in container){
    //...
}
```

使用for增强循环来遍历数组

```js
let arr = [1, 2, 3, 4, 5]
for (let item in arr) {
    console.log(item)
}
```

**同样可以遍历对象，遍历出来的是属性名，是字符串类型**

```js
let obj = {
    name: '张三',
    age: 18,
    sayHello: function () {
        console.log('Hello')
    }
}
for (let k in obj) {
    console.log(`${k} --- ${obj[k]}`)
}
```

**不能通过`obj.k`来访问，相当于`obj.'name'`，但是没有这个属性，所以要使用`obj[k]`的方式**



## 内置对象

JavaScript中的内置对象



### Math对象

[官方文档中关于Math对象的信息](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)

常用属性：

- `PI`圆周率
- `E`自然底数

常用方法：

- `random()`生成`[0,1)`之间的随机数
- **`ceil()`向上取整**
- **`floor()`向下取整**
- `max()`求最大值
- `min()`求最小值，
- `pow()`幂运算
- `abs()`绝对值
- **`round()`四舍五入**

```js
let res = Math.max(1, 2)
console.log(res)
// 2
let ans = Math.max(2, 8, 9, 6, 1, 4, 3)
console.log(ans)
// 9
```



# Web-API

之前学习的js的API都是ECMAScipt这个官方组织中提供的。

Web-API 是浏览器提供的一套API，用来专门操作浏览器中的内容的

- DOM文档对象模型API，用来操作文档，即HTML结构的
- BOM浏览器对象模型，用来操作浏览器
  - 浏览器导航栏、历史记录、前进后退
  - 本地存储
  - ......





# DOM 

文档对象模型

HTML在浏览器渲染时，会将HTML结构解析成一颗DOM树

![image-20230513203721130](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230513203721130.png)



**在DOM文档对象模型API中，提供了一个对象`document`，用来指代整个DOM树，即HTML文档在浏览器内存中的对象**

**HTML文档的所有信息都在document这个对象中**



## 获取DOM元素

如何获取到DOM对象中的某个特定的标签，即DOM中的节点元素。

1. **根据CSS选择器来选择DOM元素，querySelector()返回的是DOM元素，即标签对象**(返回的是第一个符合的DOM元素)

```js
document.querySelector('css选择器')
```

![image-20230513204525045](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230513204525045.png)



2. **如果说有多个元素符合这个CSS选择器，则querySelector()只会返回第一个DOM元素，**

   **如果全部都要则使用querySelectorAll()方法，该方法的返回值是DOM元素数组**

![image-20230513205016208](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230513205016208.png)

![image-20230513205148492](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230513205148492.png)

**querySelectorAll()方法获取到的数组是一个伪数组，有数组的基本特征，有length属性，但是没有push()、pop()等一些数组的常用方法，**（因为浏览器不推荐直接修改DOM元素结构）



## 操作元素内容

DOM元素中有两个属性是与其中的内容相关的

- **innerHTML 获取标签体，innerHTML中的标签会被解析**
- **innerText 获取标签体中的内容,字符串，innerText中的内容不会被解析为标签**

![image-20230513213231644](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230513213231644.png)

![image-20230513213318627](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230513213318627.png)

## 操作元素属性



### 操作元素常用的属性

元素的常用属性，例如title、src等

**直接通过`对象.属性`的方式**

例如，修改图片的src

```js
let img = document.querySelector('img')
img.src = './xxx.png'
```



### 操作元素样式属性

三种方式：

- **元素的`style`属性**
- **元素的`className`属性**
- **元素的`classList`属性**



1. **元素的style属性，通过此属性能够拿到所有的CSS样式，不管你用没有过的，所有的都会有**

![image-20230513215449200](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230513215449200.png)

**然后直接给属性值赋值即可**

```js
document.querySelector('.box').style.height = '300px'
```

**如果css样式用有短横线连接，则按照小驼峰命名的规范即可**

例如，在CSS中背景色backgroun-color，但是在JS中命名不能使用`-`，

**此时js按照小驼峰对这样的属性名进行了重新命名**

```js
document.querySelector('div').style.backgroundColor = 'red';
// 或 border-top
document.querySelector('div').style.borderTop = ''
```



2. **通过类名修改**

直接给元素添加一个class，即类选择器，添加一个类名

通过`className`获取DOMY元素的所有类名，是一个string类型的值

```js
  <div class="box next display"></div>
  <script>
    let box = document.querySelector('.box')
    console.log(box.className)
	// box next display
  </script>
```

然后我们可以修改元素的类名，比如动态地添加display这个类

```js
let box = document.querySelector('.box')
box.className = 'box next'
// 添加上display这个类名
box.className = 'box next display'
```

**修改className的值，相当于对HTML标签的class属性进行覆盖写**





3. **通过classList来修改**

前面的className是直接拿到所有的类名，是一个string类型，修改的话是整体修改所有的类名，不能对单个的类名进行操作

**而`classList`属性是一个数组，里面的一个元素就是一个类名，所以可以动态的对一个类名进行操作**

```js
<div class="box next display"></div>
<script>
let box = document.querySelector('.box')
// 打印所有的类名
console.log(box.classList)
// ['box', 'next', 'display']

// 添加一个类名
box.classList.add('scroll')

// 删除一个类名
box.classList.remove('scorll')

// 切换一个类名,有就删除，没有就添加
box.classList.toggle('kk')
</script>
```







### 操作表单属性

**直接通过`dom元素.属性名`的方式**

例如
```js
  <input type="text" name="username" id="username">
  <script>
    let input = document.querySelector('input')
    input.value = '123456'
    input.type = 'password'
  </script>
```

**还有一些属性，例如disabled、checked、selected**

在HTML中，如果属性名与属性值相同，则可以简写，像这样

```html
<button disabled>  
</button>
```

但是在JS中，这些属性的值是true和false

- true代表添加了该属性
- false表示删除该属性

```js
  <button>一个按钮</button>
  <script>
    const btn = document.querySelector('button')
    btn.disabled = true
  </script>
```





### 自定义属性

在H5 中，可以自定义属性，在标签中一律以`data-`开头

在JS中一律通过`dataset`属性的方式来获取

**浏览器在解析HTML文档时，遇到`data-`开头的属性，就认为这是自定义属性，然后取`data-`之后的内容作为key，自定义属性的值作为value，将此元素的所有自定义属性封装到一个Map集合中**

```js
  <!-- 两个自定义属性 -->
  <div data-id="1" data-spm="6f"></div>
  <script>
    const box = document.querySelector('div')
    // 获取所有的自定义属性
    console.log(box.dataset)
    // {
    //    id: "1",
    //    spm: "6f"
    // }

    // 修改自定义的属性
    box.dataset.id = 2
    box.dataset.spm = "666"
  </script>
```





# 定时器

定时器有两种：

- 过了指定时间之后执行，就执行一次
- 每个固定时间执行一次，执行多次，间隔执行

**定时器可以开启，也可以关闭**



## 间隔执行定时器

### 开启定时器

使用`setInterval()`来开启间隔执行的定时器，

```js
setInterval(function, time)
// 第一个参数的类型是一个函数类型,每隔固定时间执行一次这个函数
// 可以在第一个函数中指定具体定时器的逻辑

// 第二个参数是time,即间隔时间，单位是ms, 
// 1s = 1000ms
```

例子

```js
let i = 0
function fun() {
    console.log(`第${i}次执行`)
    i++
}
setInterval(fun, 2000)

// 可以使用匿名函数的方式
let i = 0

setInterval(function () {
    console.log(`第${i}次执行`)
    i++
}, 2000)
```

**setInterval()方法用来设置一个间隔定时器，此方法的返回值是此定时器的id，因为一个应用中可能有多个定时器，为了区分不同的定时器，需要使用id来区分，在关闭定时器时，需要说明定时器的id**

```js
let id = setInterval(function () {
    console.log(`第${i}次执行`)
    i++
}, 2000)
// id是一个number类型
console.log(id)
```



### 关闭间隔定时器

使用`clearInterval()`函数来关闭间隔定时器，需要传入定时器的id

```js
function fun(){
    console.log('执行..')
}
// 开启定时器
let id = setInterval(fun, 2000)

// 关闭定时器
clearInterval(id)
```



## 延时函数定时器

延迟一定时间后执行，就执行这一次

使用`setTimeout()`来设置延时定时器

```js
setTimeout(function,毫秒数)
```

```js
function fun() {
    alert('hahahaha')
}
setTimeout(fun, 2000)
```

同样，该方法会返回一个定时器的id，用来唯一标识这个定时器



### 关闭延时定时器

通过定时器的id来关闭，一般来说不需要我们关闭，因为执行一次后就会自动消失

但是因为递归机制的存在，这个延时定时器也可以无限执行，所以需要手动关闭

```js
clearTimeout(id)
```

```js
let timer = setTimeout(function () {
    alert('hello')
}, 2000)
clearTimeout(timer)
```



通过递归函数实现间隔执行定时器

```js
function getTime() {
    document.querySelector('h1').innerHTML = new Date().toLocaleString()
    setTimeout(getTime, 1000)
}

getTime()
```





# 事件

事件就是一个动作

那么事件函数就是，当这个事件被触发时，就会执行这个函数

**浏览器会有事件监听机制，一旦监听到某个事件发生了，就会执行指定的事件函数**



## 添加事件监听





事件监听的三要素：

- 事件源：‘谁？’，在哪？在哪个DOM元素身上触发了事件
- 事件类型：这是个什么事件？
- 事件函数：事件发生后我要做什么？

关于事件函数的绑定，在原生的HTML中也可以实现?



1. 第一种方式：通过`on事件`的方式来绑定事件函数

在HTML中，使用`on+事件类型`这样的属性可以绑定事件，**但是已经不推荐使用了**

[关于HTML属性中的所有事件——菜鸟教程](https://www.runoob.com/tags/ref-eventattributes.html)

```html
<button onclick="alert('Hello')">点我</button>

// 或者
<button onclick="fun()">click me</button>
<script>
    function fun() {
        alert('hahahaha')
    }
</script>
```

既然不推荐在HTML中书写JS，那么上面的写法在JS是可以这样写

```html
<button>click me</button>

<script>
	let btn = document.querySelector('button')
    btn.onclick = function(){
        console.log('...')
    }
</script>
```



2. 第二种方式：**使用addEventListener()添加事件处理函数**

上述的方式，是通过`on事件`这个DOM元素的属性来绑定的，但还是不推荐。

利用`addEventListener()`来绑定事件函数时，不需要加`on`这个单词，直接写事件类型就好

```js
addEventListenr('事件类型',function)
// 第一个参数指定要监听的是什么事件
// 第二个就是事件函数,事件触发后执行的函数

```

使用`addEventListener()`函数来添加一个监听器

```js
  <button>click me</button>
  <script>
    let btn = document.querySelector('button')
    btn.addEventListener('click', function () {
      alert('hahahaha')
    })
  </script>
```

[关于JS中所有的事件](https://www.w3school.com.cn/jsref/dom_obj_event.asp)



**利用JS的addEvenListener()的好处是，可以对一个DOM元素添加同一个事件的不同处理函数**

**当事件发生后，函数会按照添加的顺序依次执行**

```js
let btn = document.querySelector('button')
function haha() {
    alert('hahahaha')
}
btn.addEventListener('click', haha)
btn.addEventListener('click', function () {
    alert('222')
})
```





## 移除事件监听器

使用`removeEventListener()`函数来移除元素的某个事件监听器。

```js
removeEventListener(type, function)
// 要移除的事件类型
// 要移除的哪个函数
```

[https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)

```js
    function fun() {
      alert('Hello')
    }
    // 添加事件监听器
    let btn = document.querySelector('button')
    btn.addEventListener('click', fun)
    // 移除事件监听器
    btn.removeEventListener('click', fun)
```

匿名函数是无法解绑的，因为不知道函数名称



## 事件类型

常用的事件类型：

鼠标事件：[关于两种鼠标经过、鼠标离开的解释](#鼠标经过事件的区别)

- click 鼠标点击
- mouseover 鼠标经过
- mouseout 鼠标离开
- mouseleave 鼠标离开
- mouseenter 鼠标经过

焦点事件：

- focus 获取焦点
- blur 失去焦点

键盘事件：

- keydown 键盘按下事件
- keyup 键盘抬起事件

文件表单：

- input 用户输入事件

还有很多事件 

[关于JS中所有的事件](https://www.w3school.com.cn/jsref/dom_obj_event.asp)



## 事件对象

**当事件发生时，浏览器会将事件发生时的所有环境信息、自身信息都封装到了一个对象中，这个对象就是事件对象**

**触发事件后，会将事件对象传递给处理函数。**

**我们只需要在我们的事件处理函数中给出形参来接收**，然后就可以在获取到事件对象身上的所有属性。

**事件处理函数的第一个参数就是事件对象**

```js
    let btn = document.querySelector('button')
    btn.addEventListener('click', function (event) {
      console.log(event)
    })
```

![image-20230514101741592](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230514101741592.png)



### 常用的事件对象的属性

- type 事件类型
- clientX / clientY 鼠标触发时的坐标，相对于浏览器可见窗口左上角的位置
- offsetX / offsetY 获取光标相对于当前DOM元素的左上角的位置
- key
  - 用户按下的键盘的值
  - 现在不提倡使用keyCode键盘码了



 ## 环境对象

**指的是函数内部特殊的一个变量this，它代指当前函数运行时所处的环境**

**每个函数中都会有this这个环境变量**

函数调用的方式不同，this的指向就不同：**谁调用这个函数，this就指向谁**

```js
function fun() {
    console.log(this)
}
fun()

// window
let btn = document.querySelector('button')
btn.addEventListener('click', function (event) {
    console.log(this)
    // button这个DOM 元素
})
```





## 事件流

**事件流是事件完整执行过程中的流动路径**

事件流的两个阶段：

![image-20230514104238942](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230514104238942.png)

这张图更通俗易懂

![image-20230514104708846](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230514104708846.png)

捕获阶段：

- **当事件发生时，先是父元素捕获住事件，接着是子元素捕获到事件**

冒泡阶段：

- **先是子元素，后父元素**，

**冒泡阶段用的比较多，捕获阶段用的比较少**



### 捕获阶段

**捕获阶段是从上到下的，是父元素先捕获到事件，然后是子元素捕获到事件，**

**所以父元素的事件处理函数先执行，然后子元素的事件处理函数后执行**

**默认事件捕获阶段是关闭的，如果想要开启捕获阶段，则在addEventListener()的第三个参数为true**

addEventListener()的第三个参数**是否开启捕获阶段，默认是false，即关闭捕获阶段**

```html
  <div class="father">
    <div class="son"></div>
  </div>
  <script>
    document.addEventListener('click', function () {
      alert('document 处理函数执行了..')
    }, true)

    document.querySelector('.father').addEventListener('click', function () {
      alert('father 处理...')
    }, true)

    document.querySelector('.son').addEventListener('click', function () {
      alert('额...我是son ')
    }, true)
  </script>
```

当点击son元素后，显示document的处理函数执行，然后是father的执行，最后是目标元素son





### 冒泡阶段

**冒泡阶段是先执行子元素的处理函数，然后依次是父元素。**

事件处理默认的机制就是**冒泡机制**

```html
  <div class="father">
    <div class="son"></div>
  </div>
  <script>
    document.addEventListener('click', function () {
      alert('document 处理函数执行了..')
    })

    document.querySelector('.father').addEventListener('click', function () {
      alert('father 处理...')
    })

    document.querySelector('.son').addEventListener('click', function () {
      alert('额...我是son ')
    })
  </script>
```



### 阻止冒泡

**因为冒泡机制的存在，所以当事件触发后，会影响到父元素。**

**阻止冒泡就是将当前事件限制在本元素内，不再向外传播**

**阻止事件对象的前提是拿到事件对象**

```js
事件对象.stopPropagation()
```

**事件对象的此方法会阻止事件的传播，在捕获阶段和冒泡阶段，此方法都可以生效**

在哪调用这个方法，事件就会停止在这个阶段，不会继续向外传播

```html
  <div class="father">
    <div class="son"></div>
  </div>
  <script>
    document.addEventListener('click', function () {
      alert('document 处理函数执行了..')
    })

    document.querySelector('.father').addEventListener('click', function () {
      alert('father 处理...')
    })

    document.querySelector('.son').addEventListener('click', function (e) {

      alert('额...我是son ')
      e.stopPropagation()
    })
  </script>
```

此时点击son元素，只有son元素的处理函数执行了，father和document就不会执行，因为在冒泡阶段拦截了此事件。





### 移除事件监听器

使用removeEventListener（）函数来解绑

```js
reomveEventListener(type,function [,option])
// type 事件类型
// function 需要解绑的函数
// 第三个可选参数, true是捕获阶段
// 默认是false,即冒泡阶段
```

```js
function fun() {
    alert('Hello')
}
// 添加事件监听器
let btn = document.querySelector('button')
btn.addEventListener('click', fun)
// 移除事件监听器
btn.removeEventListener('click', fun)
```





### 鼠标经过事件的区别

**mouseover和mouseentter都是鼠标经过的意思，mouseleave和mouseout都是鼠标离开的意思，有什么区别呢?**

- mouseover和mouseout都会有冒泡效果
- mouseenter和mouseleave没有冒泡效果，推荐使用



## 事件委托

事件冒泡可以用来做事件委托

事件委托是利用事件流的的特征来解决一些需求

**好处是:**

- **减少事件注册次数，提高程序性能**

**原理是：**

- **事件冒泡**

**给父元素注册事件，当触发子元素时，会冒泡到父元素身上，从而触发父元素事件**

**通过事件对象的target属性拿到事件触发的对象，即真正的子元素**

**还可以通过DOM元素的tagName来获取触发的标签名称，即子元素的标签名称**

```html
  <ul>
    <li>我是第1个li</li>
    <li>我是第2个li</li>
    <li>我是第3个li</li>
    <li>我是第4个li</li>
    <li>我是第5个li</li>
    <p>我不是Li</p>
  </ul>
  <script>
    let ul = document.querySelector('ul')
    ul.addEventListener('click', function (e) {
      if (e.target.tagName === 'LI') {
        e.target.style.color = 'red'
      }
    })
  </script>
```





## 阻止事件的默认行为

事件的默认行为，比如，当点击了链接后，直接跳转；或者当点击了form表单的submit，就会自动提交。

我们现在可以对这些默认的事件作出限制，阻止这些默认的行为。

当满足某些条件，才会让它执行默认行为。

**通过事件对象的preventDefault()来阻止默认行为**

```html
  <form action="http://baidu.com">
    <input type="submit" value="提交">
  </form>
  <script>
    let btn = document.querySelector('input')
    btn.addEventListener('click', function (e) {
      // 阻止默认行为
      e.preventDefault()
    })
  </script>
```



## 其他事件

### 页面加载事件

#### load事件

**页面加载完外部资源，例如图片、js、css等资源，包括自身的HTML文件，即本页面的所有资源，加载完毕时执行触发的事件。** 



**事件名：load**

**给window对象添加load事件监听器**

**当`<script>`标签写在`<body>`前面时，此时的DOM元素还没有加载完成，此时写js代码是不会生效的。**

像这样：

```html
<head> 
  <script>
    document.querySelector('button').addEventListener('click', function () {
      alert('hahah')
    }
    )
  </script>
</head>

<body>
  <button>点我</button>
</body>
```

此时可以使用这个页面加载完毕的事件，当页面加载完毕后，此时DOM元素已经加载完成，此时去执行回调函数就会成功。

```html
<head>
  <script>
    window.addEventListener('load', function () {
      document.querySelector('button').addEventListener('click', function () {
        alert('hahah')
      })
    })
  </script>
</head>

<body>
  <button>点我</button>
</body>

```



#### DOMContentLoaded事件

**上面的load事件是等页面所有的资源都加载完毕，除了本身HTML结构外，还包括css、js、图片等。**

**还有一个事件DOMContentLoaded事件，这个事件是HTML的DOM元素加载完成后的事件，无需等待其他的外部资源**

**给document添加DOMContentLoaded事件**

```html
<head>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('button').addEventListener('click', function () {
        alert('hahah')
      })
    })
  </script>
</head>

<body>
  <button>点我</button>
</body>
```







### 页面滚动事件

**元素在滚动时触发的事件** 

**页面的上下、左右滚动都可以**

**事件名：scroll**

**给window或document添加页面滚动事件**

```js
window.addEventListener('scroll', function () {
    console.log('页面滚动了')
})
```

**如果想要监听元素内的滚动事件，则可以给某个元素添加滚动监听**



#### 关于页面滚动事件的属性

这两个属性是在具体的DOM元素身上，不是在事件对象身上

- **scrollLeft：被卷去的左边的距离**
- **scrollTop：被卷去的上边的距离**



![image-20230514123945737](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230514123945737.png)

比如说，我要查看整个页面滚动的距离，整个页面就是html标签

**如果获取html这个DOM元素呢?**

**通过document.documentElement**属性来获取整个HTML文档的根节点，即html标签

```js
    window.addEventListener('scroll', function () {
      let topOffSet = document.documentElement.scrollTop
      if (topOffSet > 100) {
        console.log('已经滚动的距离超过100px了')
      }
    })
```





### 页面尺寸事件

当窗口尺寸发生改变时触发的事件

**事件名：resize**

比如：当浏览器窗口尺寸发生变化时

```js
window.addEventListener('resize', function () {
    console.log('页面尺寸发生变化')
})
```



#### 获取元素的宽高

**还有一个用途，就是获取元素可见 的宽高（不包含边框、margin、滚动条等）**

- clientWidth
- clientHeight

例如：获取元素的课件内容的宽高

```js
  <div>11111111</div>
  <script>
    let box = document.querySelector('div')
    console.log(box.clientHeight)
    console.log(box.clientWidth)
  </script>
```





还有另一组属性：

- **offsetWidth：获取元素的宽度，包含自身设置的宽度、padding、border**
- **offsetHeight：获取元素的高度，包含自身设置的高度、padding、border**





**还有另一组属性：获取元素的真实位置**

**获取自身元素距离父级定位的左、上边距的距离**

- offsetLeft：获取距离父级定位的左距离
- offsetTop：获取距离父级定位的右边距离

**注意：这两个属性是只读的** 





## 日期对象

Date对象，用来获取系统时间。

我们创建的时间对象，就是此时刻的系统时间。

```js
    let now = new Date()
    console.log(now)
```

**如果需要创建指定日期的Date对象，也是可以的额**

```js
    let now = new Date('2023-05-14 13:25')
    console.log(now)
```

Date对象的方法

![image-20230514132558394](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230514132558394.png)

除此之外还有一些常用的方法：

- toLocaleString()本地系统日期+时间
- toLocaleDateString()本地系统日期
- toLocaleTimeString()本地系统时间

```js
    let now = new Date()
    console.log(now.toLocaleString())
    // 2023/5/14 13:25:00
    console.log(now.toLocaleDateString())
    // 2023/5/14
    console.log(now.toLocaleTimeString())
    // 13:25:00
```



### 时间戳

自1970年1月1日00:00:00以来的毫秒数

**大部分语言的时间日期对象的内部实现就是时间戳**

如果两个时间进行运算，是不容易直接进行运算的。

**可以用这两个时间的时间戳进行运算，然后转换为目标结果。**



**获取时间戳的三种方式：**

- 将Date对象转换为number类型

```js
console.log(Number(new Date()))
// 1684042870575

// 或者
console.log(+ new Date())
```

- 通过Date对象的getTime()方法

```js
    let now = new Date()
    console.log(now.getTime())
    // 1684043035918
```

- Date对象的一个方法，无需实例化Date

```js
console.log(Date.now())
// 1684043113786
```







# DOM节点的操作

HTML文档在被浏览器解析时，会解析成一个DOM树，每个节点就是一个DOM元素。

对于DOM元素的操作有哪些？

![image-20230514152807801](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230514152807801.png)

DOM元素/ 节点的分类：

- 元素节点
  - 即一个标签
- 属性节点
  - 在一个标签中，这个标签的属性也可以看做一个节点，叫做属性节点
- 文本节点
  - 这个标签体中的文字部分，也可以是一个节点，叫做文本节点
- 其他

## 查找节点

节点之间的关系：

- 父节点
- 子节点
- 兄弟节点



1. 父节点：返回父节点，如果没有则返回null

```js
子元素.parentNode
```

2. 子节点：

- **childNodes所有的节点，包括元素节点、文本节点、注释节点**,基本不用
- **children所有的元素节点，即所有的子标签**，选择的是子节点，不包含孙子节点或其他后代节点

```js
// 获取所有的子节点、包括文本节点、注释节点等
元素.childNodes

// 获取所有元素节点
// 返回值是一个伪数组
元素.children
```

```js
    let ul = document.querySelector('ul')
    console.log(ul.childNodes)
    // [text, li, text, li, text, li, text]
    // 第一个text是ul的text,为null
    // 其次是li、li的text
```

```js
    let ul = document.querySelector('ul')
    console.log(ul.children)
    // [li, li, li]
```



3. 兄弟节点

- nextElementSibling：下一个兄弟节点
- previousElementSibling：上一个兄弟节点

```js
  <ul>
    <li>1</li>
    <li id="self">2</li>
    <li>3</li>
  </ul>
  <script>
    let li = document.querySelector('#self')
    console.log(li.nextElementSibling)
    console.log(li.previousElementSibling)
  </script>
```



## 增加节点

两个步骤：

1. 创建一个新的节点
2. 将新的节点放入指定元素的内部



1. 创建结点

```js
document.createElement('标签名称')
```

2. 添加到DOM中
   - `父元素.appendChild()`： 追加到父元素的中
   - `父元素.insertBefore(要插入的元素,那个元素的前面)`：插入到父元素的某个子元素的前面

```js
    let ul = document.querySelector('ul')
    let li = document.createElement('li')
    li.innerHTML = '我是第一个li '
    // 追加到父元素中
    ul.appendChild(li)
    let li2 = document.createElement('li')
    li2.innerHTML = '我是第2个li'
    // 插入到此第一个节点的前面
    ul.insertBefore(li2, li)
```







### 克隆节点

克隆一个已有的结点，把新复制出来的结点放到某个位置

```js
元素.cloneNode(布尔值)
```

布尔值：

- true：将后代节点一起克隆
- false：只克隆当前的结点，不复制后代节点
- 默认是false

```js
let ul = document.querySelector('ul')
// 获取当前的第一个子元素
let li = ul.children[0]
// 克隆已存在的节点
let li2 = li.cloneNode(true)
// 追加
ul.appendChild(li2)
```





### 删除结点



```js
父元素.removeChild(要删除的子节点)
```

注意：

- 如果不存在父子关系，则删除不成功

> 删除结点与隐藏节点的区别：
>
> - 删除节点是直接将DOM元素从DOM树中删除
> - 而隐藏节点通过display:none，该元素在DOM中还存在，只不过不会渲染

```js
  <ul>
    <li>我是已存在节点</li>
  </ul>
  <script>
    let ul = document.querySelector('ul')
    ul.removeChild(ul.children[0])
  </script>
```



**但是最近新增了一个方法，remove（）**

**直接在DOM元素上调用此方法，就会删除此DOM节点**

[MDN-官方文档-remove](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/remove)

```js
  <ul>
    <li>我是已存在节点</li>
  </ul>
  <script>
    let ul = document.querySelector('ul')
    ul.remove()
  </script>
```





# M端事件

就是移动端事件，移动端特有的事件，例如触摸

来说一下这个触摸事件

![image-20230514155914950](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230514155914950.png)



用法与其他的事件相同









# BOM

浏览器对象模型

在浏览器中，最最最最牛逼的一个对象叫做window对象，浏览器中的大部分对象都可以由window来管理，也叫window对象为顶级对象

![image-20230514160743902](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230514160743902.png)

基本上的大部分函数，都是基于window对象的，所以window可以省略

包括alert()、console.log()、setInterval()

```js
alert()
// 等价的
window.alert()
```







## JS 执行机制

JS是单线程的，为了解决单线程的痛点，又引出了

- 同步：有先后顺序
- 异步：类似于一个分支线程，去执行任务

**JS 中同步线程都在主线程上执行，形成一个执行栈**

**异步任务，JS的异步是通过回调函数来实现的，异步任务会被添加到任务队列中（消息队列）**

一般而言：异步任务的三种类型：

- 普通事件，如click、resize
- 资源加载，如load、error
- 定时器，如setInterval、setTimeou



**JS的执行任务：**

1. 先去执行执行栈中的同步任务
2. 将异步任务添加到任务队列中
3. 一旦执行栈中的同步任务都执行完毕，系统就会依次读取任务队列中的异步任务，于是任务队列中的异步任务结束等待，进入执行栈，开始执行

![image-20230514163135577](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230514163135577.png)

![image-20230514163551232](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230514163551232.png)









## location对象

location对象是浏览器当前的URL对象

常用方法和属性

- **href当前的链接地址，**
- **search获取url ？后面的参数**
- **hash当前url的hash值，url中#后面的内容，常用来做路由**

- **reload()方法，强制刷新页面，传入true才会刷新**

![image-20230514164627598](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230514164627598.png)





## navigator对象

navigator对象主要记录了浏览器的信息

![image-20230514164819467](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230514164819467.png)



常用方法：

- userAgent属性用来检测浏览器的版本和平台

![image-20230514164934048](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230514164934048.png)





## history对象

history对象主要管理历史记录，该对象与浏览器地址栏的操作相对应，比如前进、后退、历史记录等

常用属性：

- back() 后退功能
- forward()前进功能
- go(参数)前进或后退，
  - 参数是正数，则前进几次；
  - 参数是负数，则后退几次

**history在实际开发中有的比较少，在自动化办公系统OA中比较常见**





## 本地存储对象

H5新增的一个功能，用户的数据存储在浏览器中，容量较大。



### localStorage

**使用localStorage对象将数据保存在浏览器中，**

**可以将用户数据永久的保留到本地，除非手动删除，否则关闭页面也会存在。**

特性： 

- 可以在多个窗口之间共享数据
- 以键值对的方式存储使用

用法：

**存储，改的话也是这个方法**

```js
localStorage.setItem(key, value)
```

**读取使用**

```js
localStorage.getItem(key)
```

**删除数据**

```js
localStorage.removeItem(key)
```

**本地存储只能存储字符串类型**

![image-20230514171048587](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230514171048587.png)



### sessionStorage

特征： 

- 生命周期是会话，即关闭浏览器窗口就会消除
- 在同一个窗口下数据可以共享
- 以键值对形式存储使用

用法与localStorage一致

```js
    // 存储或修改
    sessionStorage.setItem('session-id', '123')
    // 获取值
    sessionStorage.getItem('session-id')
    // 移除数据
    sessionStorage.removeItem('session-id')
```





### 复杂数据类型存储

本地存储只能存储字符串string类型，无法存储复杂数据类型

所以就需要用到将复杂数据类型转换为字符串，然后存储到本地

```js
JSON.stringify(复杂数据类型)
```

**使用以上方法，将一个复杂数据类型转换为JSON字符串并返回，然后存储这个JSON字符串**

> JSON 对象有两个方法
>
> - parse()将JSON字符串解析成对象
> - **stringify()将对象转换为JSON字符串，如果对象中有方法，那么方法就会被自动忽略，只会存储属性**

```js
    let obj = {
      name: '张三',
      age: 18,
    }
    let jsonObj = JSON.stringify(obj)
    console.log(jsonObj)
    console.log(JSON.parse(jsonObj))
```





# JS进阶

## 新增数组方法

### 数组遍历方法forEach()

```js
arr.forEach(function(ele,index){
    //...
});
```

**需要传入一个函数，用来指定遍历的具体逻辑**

```js
    let arr = [1, 2, 3]
    arr.forEach((el, idx) => {
      console.log(el)
      console.log(idx)
    })
```

**数组的map()方法常用来对数组中的每个元素做转换，然后返回一个新数组；而forEach()方法更适合做数组的遍历循环，比如对象数组的遍历**





### 数组过滤filter()

返回筛选后的新数组

**对于每个元素，返回true则保留，返回false遗弃，最终返回一个筛选后的新数组**

**不过影响原数组**

```js
let newArr = arr.filter((item, idx) => {
    // ...
    return true | false
})
```



### 数组

### 数组方法map()和join()

字符串拼接新思路，利用数组的map()和join()方法

### map()元素处理

**map()可以遍历数组处理数据，并且返回新的数组**

```js
let arr = []

// 具体的逻辑需要我们用一个函数给出
// 第一个参数是遍历出来的元素
// 第二个参数是当前的索引
// 在方法体中返回对每个元素的操作，用作新数组中的每个元素
let newArr = arr.map(function(ele, index){
    // ...
    return ..
})
```

看个例子

```js
    let arr = [1, 2, 3, 4, 5]
    let newArr = arr.map(function (ele, index) {
      console.log(`当前的索引---${index},数据---${ele}`)
      return ele + 'px'
    })

    console.log(newArr)
    // ['1px', '2px', '3px', '4px', '5px']
```



### join()

**join()方法用于把数组中的所有元素转换成一个字符串**

```js
let arr = []

let newStr = arr.join('')
```

join()方法的参数是一个字符串，用来作为每个元素之间的拼接字符。

一般给一个空串就好了

```js
    let arr = [1, 2, 3, 4, 5]
    let newArr = arr.map(function (ele, index) {
      console.log(`当前的索引---${index},数据---${ele}`)
      return ele + 'px'
    })

    console.log(newArr)
    // ['1px', '2px', '3px', '4px', '5px']

    let newStr = newArr.join('')
    // 1px2px3px4px5px
```



利用map()和join()方法搭配使用，能更好的做字符串拼接。

例如：我们有一个对象数组，现在需要把这个对象数组渲染到页面上，可以这样做

```js
    let arr = [
      {
        name: '张三',
        age: 18
      },
      {
        name: '刘明凯',
        age: 21
      },
      {
        name: 'kk',
        age: 20
      }
    ]

    let newArr = arr.map(function (ele, idx) {
      return `<tr><td>${ele.name}</td><td>${ele.age}</td></tr>`
    })

    let newStr = newArr.join('')

    document.querySelector('tbody').innerHTML = newStr
```





### some()找元素

forEach()方法是遍历所有的元素，一旦开始，就必须遍历完成整个数组。

而some()方法在找到目标数据后，返回true，就能停止遍历。

```js
let arr = ['aa','bb','cc','dd']

arr.some((item,idx) => {
    console.log(item)
    if(item === 'cc'){
        return true
    }
})
// aa
// bb
// cc
```



### every()判断每一个元素

用来判断数组中的每一项是否满足特定条件，遍历结束后，如果每一项都满足则返回true；如果有一项不满足，则返回false；

```js
let arr = ['aab','lmk','123']

arr.every((item,idx) =>{
    if(item.length < 5){
        return true
    }
})
// true
```



### reduce()计算结果

常用来累加运算

```js
// 或
arr.reduce(function(上一次计算的结果,当前的元素),起始值)

// 当然也可以没有初始值
reduce(function(上一次的结算结果,当前的元素))
```

```js
// 没有初始值
let arr = [1, 2, 3, 4, 5]
let res = arr.reduce((lastRes, ele) => {
    return lastRes + ele
})
console.log(res)
// 15


// 有初始值
let arr = [1, 2, 3, 4, 5]
let res = arr.reduce((lastRes, ele) => lastRes + ele, 10)
console.log(res)
// 25
```









## 正则表达式

关于正则表达式，我之前写过一个更详细的，去看吧。

数据校验

在js中怎么写正则表达式

```js
/regularExpression/
```

规则校验

```js
/expression/.test('字符串')
```

替换

```js
str.replace(/expression/, '要替换的字符串')
```







## 作用域链

就是查找变量的机制，先从本作用域内查找，没有就继续向父级作用域找，直到找到为止，然后使用。

找不到就会报is not defined的错误



## 闭包

一个函数对周围状态的引用捆绑在一起，内层函数访问到外层函数的的作用域。

**闭包： 内层函数 + 外层函数的变量**

例子，这就是一个闭包

```js
    function outer() {
      let a = 1
      function f() {
        console.log(a)
      }
      f()
    }
```

特点就是**外部也能使用函数内部的变量**

基本格式

```js
    function outer() {
      let a = 1
      function f() {
        console.log(a)
      }
      return f
    }


    let fun = outer()
    fun()
```

**能够避免函数内部的变量被污染的情况**

**闭包可能会引起的问题？**

- 内存泄漏，因为return了一个函数，属于全局作用域，一直在引用的话，函数内的变量就不会销毁回收。







## 变量提升

**利用var关键字来声明变量，会有变量提升的过程**

**原理：**

- **会将var关键字声明的变量的声明部分，提升到*当前作用域*的最前面**
- **只是提升了声明部分，赋值部分没有提升**
- **因此在前面就可以使用“未声明”的变量，结果是undefined**



```js
console.log(num)
var num = 10
// 结果是undefined
```

以上代码相当于

```js
var num 
console.log(num)
num = 10
```

**let 和const不会存在变量提升的现象**，不推荐使用var





## 函数进阶

### 函数提升

函数提升与变量提升是类似的，即**函数的声明会被提升到当做作用域的最前面**

所以在函数声明之前调用函数也是可以的额。

```js
fun()

function fun(){
    console.log('123')
}
```

**函数表达式在声明之前调用是会报错的，因为函数表达式相当于变量赋值，变量声明提升了，但是赋值没有**

```js
bar() // 无法调用

var bar = function(){
    console.log('231')
}
```





### 函数参数



### 动态参数

在函数内部会有一个对象arguments，是一个伪数组变量，里面封装了所有的参数。

调用时的所有参数都封装到了这个arguments对象中。

```js
    function getSum() {
      let res = 0
      for (let i = 0; i < arguments.length; i++) {
        res += arguments[i]
      }
      return res
    }
    getSum(1, 2, 3)
    // 6
```

**因此可以使用arguments对象实现动态变长参数的场景**







### 剩余参数

允许将剩余的参数封装到一个数组中

在形参前使用`...`来标识这是一个剩余参数，会将其他多余的实参封装到数组中

```js
    function getSum(a, b, ...other) {
      console.log(a, b)
      // 1 2
      console.log(other)
      // [3,4,5,6]
    }

    getSum(1, 2, 3, 4, 5, 6)
```

**arguments与剩余参数的区别**：

- arguments是一个伪数组，能获取到所有的参数
- 剩余参数是一个真数组，只能获取到剩余参数

**推荐使用剩余参数**





## 展开运算符

**`..`将容器解开，里面所有的元素就会暴露出来**

例如，解开数组

```js
    let arr = [1, 2, 3]
    console.log(...arr)
    // 1 2 3


// ...arr = 1,2,3
```



**使用较少，使用场景：求数组最大值、合并两个数组**

1. 求数组最大值

因为Math.max()的参数是剩余参数，并不是一个数组，所以需要对数组解开

```js
let arr = [1, 2, 3]
    Math.max(...arr)
```

2. 数组合并

```js
    let arr1 = [1, 2, 3]
    let arr2 = [2, 3, 4]
    let arr3 = [...arr1, ...arr2]
    // [1,2,3,2,3,4]
```







## 箭头函数

语法

```js
(arg) => {
    // ...
}
```

**简化匿名函数的书写**

```js
    function fun() {
      console.log('123')
    }

    let fu = () => {
      console.log(456)
    }
```

几个小规则：

- 如果参数只有一个，则小括号可以省略
- 如果方法体只有一条语句，则可以省略大括号，只有return的话，不可以省略大括号
- 如果方法体只有一行return语句，则大括号和return都可以省略
- 箭头函数可以直接返回一个对象，加括号就可以

```js
// 一个参数，省略小括号
let fu = x => {
      console.log(x)
    }
fu(2)

// 方法体只有一句，省略大括号

let fu = x => console.log(x)
fu(2)

// 方法体只有一行return, 省略return
let fu = x => { return x * 2 }
let fun = x => x * 2

// 直接返回对象
let fu = name => {
    return {
        name: name
    }
}

let fun = name => ({ name: name })
```





### 箭头函数的参数

**箭头函数没有arguments这个函数内置对象**

**只能使用剩余参数`...arg`**

```js
    let fun = (a, b, ...args) => {
      console.log(a, b)
      let res = 0
      for (let i = 0; i < args.length; i++) {
        res += args[i]
      }
      return res
    }
    fun(1, 2, 3, 4, 5, 6)
```





### 箭头函数中的this

**普通函数中，谁调用这个函数，那么this就指向谁。**

```js
function fun() {
    console.log(this)
    // window
}

fun()
// window
```

**箭头函数不会创建自己的this，只会从自己的作用域的链上一层一层沿用this对象**

```js
let fun = () => {
    console.log(this)
}
fun()
// window

```

```js
let obj = {
    name: 'zhangsan',
    sayHello: () => {
        console.log(this)
    },
    opt: function () {
        console.log(this)
    }
}
obj.opt()
// obj
obj.sayHello()
// window
```

**因为this对象是函数内部特有的对象，在上面这个案例中，箭头函数中没有自己的this，所以就去上一层找，因为obj是对象，不会有this，继续去上一层找，找到全局作用域，所以就找到 了window对象**

```js
    let obj = {
      name: 'zhangsan',
      sayHello: function () {
        console.log(this) // obj
        let inner = () => {
          console.log(this) // obj
        }
        inner()
      }

    }

    obj.sayHello()
```



**在DOM事件中回调函数中的this指向window，所以如果在DOM事件回调函数中获取到元素本身，不要用剪头函数**

```js
// 此时this指向button
btn.addEventListener('click', function () {
    console.log(this)
})

// 箭头函数，this指向window
btn.addEventListener('click', () => {
    console.log(this)
})
```





## 解构赋值

使用解构语法能快速为变量赋值

### 数组解构

**数组解构是将数组的单元元素快速批量赋给一系列变量的简介语法**

```js
let [a, b, c, d, e] = [3, 4, 1, 2, 6]
console.log(a, b, c, d, e)
// 3, 4, 1, 2 ,6

// ...
let arr = [3, 4, 1, 2, 6]
let [a, b, c, d, e] = arr
console.log(a, b, c, d, e)
// 3, 4, 1, 2 ,6
```

**变量的顺序以数组中的单元值的顺序一致**

**应用场景：可以快速交换两个变量**

```js
let a = 1
let b = 2
;[a, b] = [b, a]
console.log(a, b)
// 2, 1
```

**以数组开头的语句,即以`[ ]`开头的语句，前面要加一个分号**，因为会将这个语句与上一句拼接成一条语句

```js
console.log('123')
[1, 2, 3].map((ele, idx) => {
    console.log(ele, idx)
})
// 报错

console.log('123')
;[1, 2, 3].map((ele, idx) => {
    console.log(ele, idx)
})
// 可以执行


let a= 1
let b = 2
[a,b] = [b,a]
// 报错

let a = 1
let b = 2
;[a,b] = [b,a]
```

接收变量与原数组数量不一致，也是可以的额

1. **接收变量少**

```js
    let [a, b] = [1, 2, 3, 4, 5]
    console.log(a, b)
    // 1, 2
```

2. **接收变量少时，可以使用剩余参数来接收**

```js
    let [a, b, ...c] = [1, 2, 3, 4, 5, 6]
    console.log(a, b, c)
    // 1 2
    // [3, 4, 5, 6]
```

3. **接收变量多**

```js
    let [a, b, c, d, e] = [1, 2]
    console.log(a, b, c, d, e)
    // 1 2 undefined undefined undefined
```

4. **接收变量也可以给默认值，当赋值时就用真正的值，没有赋值时就用默认值，可以避免接收变量多时赋值出现undefined现象**

```js
    let [a = 0, b = 0, c = 0] = [1, 2]
    console.log(a, b, c)
    // 1, 2, 0
```

5. **按需导入**

```js
    let [a, b, , c] = [1, 2, 3, 4]
    console.log(a, b, c)
    // 1 2 4
```







### 对象解构

将对象的属性和方法快速批量的赋值给某一系列变量

**注意：接收的变量名与对象的属性名一致，否则无法映射**

```js
let obj = {
    name: 'zhangsan',
    age: 18
}
let {name, age} = obj


// 或者
let {name, age} = {name:'zhangsan', age:18}
```

**如果对象的属性名与作用域内的变量命名冲突了，可以用新的变量名来接收**

```js
let name = 'li'
let obj = {
    name: 'zhangsan',
    age: 18
}

// 此时属性名与变量名冲突，报错
let { name, age } = obj
```

**使用这种格式`旧属性名：新变量名`**

```js
let name = 'li'
let obj = {
    name: 'zhangsan',
    age: 18
}

// 此时属性名与变量名冲突，报错
let { name: uname, age } = obj
console.log(uname, age)
```





## 对象的创建的三种方式



### 字面量创建对象

```js
let obj = {
    name: 'zhangsan'
}
```



### 利用new Object创建对象

```js
let obj = new Object()
obj.name = 'zhangsan'


// 或
let obj = new Object({
    name: 'zhangsan'
})
```





### 利用构造函数

构造函数，一种特殊的函数，主要用来初始化对象

**常规的字面量创建对象，无法达到复用的目的**

**利用构造函数来创建对象，可以实现复用一套对象的模板**



约定：(不是强制规则)

- **构造函数名称的第一个字母大写，为了与普通的函数做区分**
- **构造函数必须要有“new”关键字来调用**

**在构造函数中，通过this来为属性赋值**

```js
function Person(name, age) {
    this.name = name,
        this.age = age
}
let p = new Person('zhangsan', 18)
console.log(p)
```



**说明**：

- 利用new关键字调用函数的行为被称为**实例化**
- 实例化构造函数时，没有参数时，可以省略`()`
- 构造函数内部无需写return，返回值就是新创建的对象
- 构造函数内部的return返回的值无效，所以在构造函数内部不要写return





#### 原理

当执行了new构造函数之后，发生了什么？

1. 创建一个新的对象
2. 构造函数的this指向新对象
3. 执行构造函数中的代码，利用this为对象属性赋值
4. 返回新对象







#### 静态属性

**直接在构造函数上挂载属性和方法，就叫做“静态属性”和“静态方法”**

- **静态成员只能通过构造函数来访问，不能在实例对象上调用静态成员**
- **静态方法中的this指向构造函数**（注意箭头函数中this的指向问题，箭头函数中没有this）

```js
    function Person(name, age) {
      this.name = name,
        this.age = age
    }
    // 静态方法
    Person.say = function () {
      console.log('你好')
    }
    // 静态属性
    Person.language = 'Chinese'
    // 调用
    Person.say()
    console.log(Person.language)
```

```js
    function Person(name, age) {
      this.name = name,
        this.age = age
    }
    // 静态方法
    Person.say = function () {
      console.log(this)
    }
    // 调用
    Person.say()
	// 指向构造函数，因为函数本质也是一个对象
    // ƒ Person(name, age) {
    //   this.name = name,
    //     this.age = age
    // }
```

```js
    function Person(name, age) {
      this.name = name,
        this.age = age
    }
    // 静态方法
    Person.say = () => {
      console.log(this)
    }
    // 调用
    Person.say()
    // window
```







### 内置构造函数

#### 基本数据类型与包装类

5种基本数据类型：

- number
- string
- boolean
- null
- undefined

**其余都是引用数据类型，也就是对象。**

针对这5种基本数据类型，也是有对应的引用类型，称为包装类。

**JS中几乎所有的数据都是基于构造函数来创建的。**

按道理来说，基本数据类型是不能有属性或方法的，但是你会发现

```js
let str = 'abc'
str.length

let num = 123
num.toFixed(2)
```

原因是：

**当我们使用基本数据类型来赋值时，其实底层都是通过构造函数来创建了对应的包装类，本质是一个引用数据类型，所以就可以调用属性或方法了**

```js
let num = 123
// 本质是
let num = new Number(123)
```



#### 内置的构造函数

**js内置的构造函数有**：

- Object 普通对象
- Array数组对象
- RegExp正则表达式对象
- Date时间日期对象
- ...



#### Object的三个重要的静态方法

1. **`Object.keys(obj)`获取对象中所有的属性，即key，返回一个由key组成的数组**

```js
let obj = {
    name: 'zhangsan',
    age: 18
}
let arr = Object.keys(obj)
console.log(arr)
// ['name', 'age']
```



2. **`Object.values(obj)`获取所有的属性值，即value，返回一个由value组成的数组**

```js
    let obj = {
      name: 'zhangsan',
      age: 18
    }
    let arr = Object.values(obj)
    console.log(arr)
    // ['zhangsan', 18]
```



3. **`Object.assign(target, source)`对象拷贝**

```js
    let obj = {
      name: 'zhangsan',
      age: 18
    }
    let objCopy = {}
    Object.assign(objCopy, obj)
    console.log(objCopy)
    // {name: 'zhangsan', age: 18}
```

**常用来为对象的属性赋值**

```js
// 常规对象属性赋值
let obj 
obj.name = 'xxx' 
obj.age  = 18

//使用Object.assign()属性批量赋值
let obj 
Object.assign(obj,{
    name: 'xxx',
    age: 18
})
```





#### Array

通过Array构造函数来创建数组

```js
let arr = new Array(1,2,3)
```

数组常见的**实例方法**：

- `forEach()` 遍历数组
- `filter()`过滤数组，返回新数组
- `map()` 数组元素的处理，返回新数组
- `reduce()` 累加器，常用于数组求和

前三个方法都见过了，说一下这个reduce()方法

```js
let res = arr.reduce(function, 起始值)

// 或
arr.reduce(function(上一次计算的结果,当前的元素),起始值)

// 当然也可以没有初始值
reduce(function(上一次的结算结果,当前的元素))
```

```js
// 没有初始值
let arr = [1, 2, 3, 4, 5]
let res = arr.reduce((lastRes, ele) => {
    return lastRes + ele
})
console.log(res)
// 15


// 有初始值
let arr = [1, 2, 3, 4, 5]
let res = arr.reduce((lastRes, ele) => lastRes + ele, 10)
console.log(res)
// 25
```

**其他常用方法：**

![image-20230515193137365](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230515193137365.png)







#### String

常用实例方法：

![image-20230515193254539](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230515193254539.png)





#### Number

实例方法：

- toFixed(n)保留到小数点后n位











## 原型



### 原型

我们有一个构造函数，其中有一个成员方法，不因实例而变化，即这个方法在每个实例上调用都是相同的

```js
function Person(name, age) {
    this.name = name,
        this.age = age,
        this.say = function () {
        console.log('hello')
    }
}

let zhangsan = new Person('zhangsan', 18)
let lisi = new Person('lisi', 18)
```

既然这个成员方法与实例无关，而且每个实例都需要。

每当一个实例对象创建了，就会为这个实例方法分配一段内存，随着创建的对象的数量越来越多，每个对象内部都会为同一个方法开辟内存，为同一个东西分配多余的内存，就导致了内存的浪费。

**第一个想法是：可以将这个与实例无关的方法定义成构造函数的静态方法**，这样虽然避免了内存的浪费，但是实例是无法调用这个方法的，必须通过构造函数来调用，不符合我们的预期目标（在实例身上调用）



**因此，原型就出现了**

**js规定，每个构造函数都要有一个prototype属性，指向一个对象，这个对象就称作`原型对象`**

**构造函数分配的原型对象是每个实例对象共享的**

**因此我们可以在原型对象身上挂载属性和方法，来达到所以实例共享的目的**

**构造函数和原型对象方法中的this都指向实例化对象**

![image-20230515203837054](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230515203837054.png)

![image-20230515205336753](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230515205336753.png)

**将一些与实例无关的方法和属性定义的原型对象身上，然后就可以在实例对象身上直接调用了，同时避免了内存的浪费**

```js
function Person(name, age) {
    this.name = name,
        this.age = age
}
Person.prototype.say = function () {
    console.log('hello')
}

// 创建两个实例
let zhangsan = new Person('zhangsan', 18)
zhangsan.say()
let lisi = new Person('lisi', 21)
// 判断两个say()方法是否是同一个
console.log(zhangsan.say === lisi.say)
// true
```

原型对象中的方法是指向实例对象的，因为是实例对象调用的方法，所以谁调用指向谁

```js
    function Person(name, age) {
      this.name = name,
        this.age = age
    }
    Person.prototype.say = function () {
      console.log(this)
    }

    let obj = new Person('zhangsan', 18)
    obj.say()
    // 指向实例对象
    // Person {name: 'zhangsan', age: 18}
```





### constructor属性

每个原型对象身上都有一个constructor属性（也可以叫做constructor构造函数）

**constructor属性指向构造函数**

![image-20230515205755994](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230515205755994.png)

![image-20230515205928693](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230515205928693.png)









### 对象原型

**在每个对象中都有一个属性`__proto__`属性指向构造函数的原型对象**

![image-20230515220059915](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230515220059915.png)

**注意：**

- `__proto__`不是JS标准，因此会在不同的浏览器中有所不同

- 查看对象时，会看到有一个`[[Prototype]]`，这个就是Chrome浏览器为了方便展示`__proto__`属性而设置的一个显示方式

  `[[Prototype]]`本质上就是`__proto__`，只不过Chrome将`__proto__`显示出来是`[[Prototype]]`

![image-20230515220554873](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230515220554873.png)







### 原型继承

在JS中，继承是怎么实现的？

前面了解了对象原型。

**如何利用JS的原型机制来实现继承？**

**我们知道，构造函数的`prototype`属性指向一个对象，这个对象是所有实例共享的，所以我们把公共的部分挂载到原型对象身上**

**继承同样，继承的本质就是抽象，一层一层的抽取公共的部分，父类的部分可以被子类使用**

因此，需要实现继承的想法，我们可以将公共的部分放在自定义原型对象中，修改构造函数的prototype指向自定义原型对象，这个原型对象就是父类，这样就实现了继承

```js
// 创建一个对象,用来存放公共部分
// 作为构造函数的原型对象
let Person = {
    eyes: 2,
    say: function () {
        console.log('Hello')
    }
}

// 构造函数
function Man() { }

// 关键的两步
Man.prototype = Person
Man.prototype.constructor = Man


let zhangsan = new Man()

// 使用原型对象身上的属性
zhangsan.say()
```

**优化：将公共部分封装到一个构造函数中，即这个构造函数就是父类**

```js
    function Person() {
      this.eyes = 2
      this.say = function () {
        console.log('Hello')
      }
    }
    // 构造函数
    function Man() {

    }


    // 关键的两步
    Man.prototype = new Person()
    Man.prototype.constructor = Man


    let zhangsan = new Man()

    // 使用原型对象身上的属性
    zhangsan.say()
```







### 原型链

只要是一个对象，就会有`__proto__`属性，指向一个原型对象，而原型对象又会有`__proto__`属性，继续指向一个原型对象，因此就形成了原型链

```js
function Person(){
    
}

let zhangsan = new Person()
```



![image-20230515225617797](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230515225617797.png)





**分析：**

- **Object类是JavaScript中最顶级的类**

就这个代码分析

```js
function Person(){
    
}
let zhangsan  = new Person();
```

1. **zhangsan对象 的`__proto__`指向Person的原型对象，咱们叫这个原型对象为x**
2. **而x也是一个对象，也会有`__proto__`属性，也会指向一个原型对象**
3. **因为Object类是js的顶级类，所以x的`__proto__`指向Object的原型对象，我们称这个原型对象为y**
4. **而y又是一个原型对象，也会有`__proto__`属性，此时这个属性继续指的话就没有意义了，所以y的`__proto__`为null**

这就是原型链

![image-20230515231253730](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230515231253730.png)





继续以上面的例子来说一下**原型链的查找规则**

1. **当在zhangsan身上调用了一个方法，如果有这个方法，那么直接调用**
2. **如果zhagnsan身上没有这个方法，那么就去看zhangsan的原型对象身上有没有，也就是x身上**
3. **如果x身上有，那么调用**
4. **如果x身上没有，那么x继续向上找，找x的原型对象，也就是y**
5. **如果y有，交付下去，调用**
6. **如果y没有，那么y继续向上找，就是null**





**可以使用instanceof运算符用于检测构造函数的prototype属性是否出现在一个对象的原型链上**

```js
function Person(){
    
}

let zs = new Person();

zs instanceof Person	// true

zs instanceof Object 	// true

zs instanceof Array		// false
```







## 深浅拷贝

复制对象

**直接赋值不属于拷贝，因为指向的是同一个对象**

```js
let zhangsan = {
    name: 'zsa',
    age: 18
}

let li = zhangsan
```

![image-20230515233800984](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230515233800984.png)



### 浅拷贝

**浅拷贝，对于简单数据类型，就是复制一个新的出来，是另一个数据了。但是对于引用数据类型，会直接复制这个引用的地址，而不是新创建一个对象**

![image-20230515234104834](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230515234105131.png)

浅拷贝的常用方法：

- 拷贝对象：`Object.assign(target, sourceObj)`或者对象解构`{...obj}`
- 拷贝数组：`Array.prototype.concat()`或者数组解构`[...arr]`

![image-20230515234607257](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230515234607257.png)











### 深拷贝

**深拷贝就是所有的数据都是新的一份，包括简单数据类型和引用数据类型，都会创建新的**

常用方法：

- 通过递归实现深拷贝
- 库函数lodash/cloneDeep
- 通过JSON.stringify()实现



#### 通过递归实现深拷贝

遍历旧的对象，如果是简单数据类型，直接赋值就好。

如果是引用数据类型，则继续递归遍历对象。

但是数组对象Array属于是Object，所以要先判断Array，然后判断Object，否则会将数组当做对象来拷贝

```js
    function deepCopy(newObj, oldObj) {
      for (let k in oldObj) {
        if (oldObj[k] instanceof Array) {
          newObj[k] = []
          deepCopy(newObj[k], oldObj[k])
        } else if (oldObj[k] instanceof Object) {
          newObj[k] = {}
          deepCopy(newObj[k], oldObj[k])
        } else {
          // 简单数据类型
          newObj[k] = oldObj[k]
        }
      }
    }
    let obj = {
      name: 'zhagnsan',
      age: 18,
      likes: ['basketball', 'swiming'],
      address: {
        from: 'China',
        region: 'Shandong'
      }
    }
    let o = {}
    deepCopy(o, obj)
```



#### lodash库

第三方js库lodash里面的`cloneDeep()`方法实现了深拷贝，秉承着“不重复造轮子”的原理，直接拿来用，hhh

[官网:https://lodash.com/](https://lodash.com/)

[中文文档https://www.lodashjs.com/](https://www.lodashjs.com/)

首先导入lodash，以下是CDN的方式引入

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.min.js"></script>
```

然后在js中使用lodash的方法就可以了，lodash内置的对象是`_`，通过`_`来调用

[官网对cloneDeep()的解释](https://www.lodashjs.com/docs/lodash.cloneDeep)

传入旧的对象，返回新的对象

```js
    let obj = {
      name: 'zhagsna',
      age: 18,
      likes: ['basketball', 'swimming'],
      address: {
        country: 'China',
        province: 'Shandong'
      }
    }

    let newObj = _.cloneDeep(obj)

    newObj.address.province = 'beijing'

    console.log(newObj)
    console.log(obj)
```







#### 利用JSON.stringify()实现深拷贝

JSON中的两个方法

- stringify()将对象转换为JSON字符串
- parse()将JSON字符串转换为对象

```js
    let obj = {
      name: 'zhagsna',
      age: 18,
      likes: ['basketball', 'swimming'],
      address: {
        country: 'China',
        province: 'Shandong'
      }
    }

    let newObj = JSON.parse(JSON.stringify(obj))

    newObj.address.province = 'Beijing'

    console.log(newObj)
    console.log(obj)
```







## 异常处理



### throw关键字

抛出异常

![image-20230516110130348](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230516110130348.png)

**throw关键字通常与Error类来配合使用**

![image-20230516105930048](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230516105930048.png)







### try...catch

如果对于抛出的异常不做处理，那么程序就会终止运行。

为了能对程序中抛出的异常做出处理，避免影响整个程序，可以使用try...catch...来处理

**在try代码块中书写可能会发生异常的代码，当异常发生后，浏览器会捕获异常信息，并封装成一个异常对象，交给catch来处理**

```js
try{
    // 可能会发生异常的代码
}catch(err){
    //对捕获到的异常进行的处理
}
```

**与try...catch...搭配使用的，还有一个finally代码块，try中的代码发生异常后，就不会继续执行try中的剩余代码**

**如果想要实现，无论try中有没有异常，都要执行一部分固定的代码，可以将这部分代码放在finally代码块中**

*学过Java的基本都懂，没啥说的*

```js
      if (!x || !y) {
        throw '参数不能为空'
      }
      return x + y
    }

    try {
      fun()
    } catch (err) {
      console.log('调用函数时发生了异常，异常信息', err.message)
    } finally {
      console.log('管你有没有异常，老子这句代码都要执行')
    }
```







### debugger

在代码中插入`debugger`关键字，然后在浏览器打开页面时，就会直接跳转到这个“断点”处，方便程序调试

![image-20230516111421341](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230516111421341.png)

![image-20230516111404175](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230516111404175.png)







## this的指向

*(JS 中最恶心的一处，就是this的指向，不像Java严谨，我爱java)*

**普通的函数（不包括箭头函数），谁调用这个函数，那么函数中的this就指向谁**

普通函数，没有明确调用者时，那么this就指向window

（严格模式下，没有明确调用者时，this是undefined，关于严格模式后面说）

```js
function fun() {
    console.log(this)
}

fun()
// window


let obj = {
    say: function () {
        console.log(this)
    }
}
obj.say()
// obj
```







### 箭头函数中的this

箭头函数中，本身是没有this的

**箭头函数中的this，是沿用作用域链中的this，向外层作用域中，一层一层查找this，找到就沿用过来**

```js
let obj = {
    say: () => {
        console.log(this)
    }
}
obj.say()
// window
```

**由于箭头函数中this的指向问题：**

- 事件的回调函数，是事件源对象本身调用的，如果想要在事件回调函数中获取事件源本身，那么就不要用剪头函数作为回调函数
- 在原型继承中，原型对象中普通函数的this指向实例对象，如果原型对象身上是一个箭头函数，那么就不会指向实例对象





### 改变this指向

js中允许改变this的指向(*恶心*)，有三个方法可以动态指定普通函数中this的指向

#### call()

**call()函数的主要作用就是调用函数，同时可以指定被调用函数中的this**

**就是在函数身上调用call()方法，因为本身函数也是一个对象**

语法

```js
fun.call(thisArg, arg0,arg1...)
```

- thisArg，函数被调用时的this值
- arg函数的参数

```js
let obj = {
    name: 'zhangsan'
}
function sum(x, y) {
    console.log(this)
    console.log(x + y);
}

sum.call(obj, 1, 2)
// obj
```





#### apply()

apply的用法与call基本一致

**使用apply()方法来调用函数，同时指定被调用函数中的this**

语法

```js
fun.call(thisArg [,arg0,arg1])
```

- thisArg在fun函数运行时指定的this
- `[arg0,arg1]`，函数的参数，必须是一个数组的形式



```js
    let obj = {
      name: 'zhangsan'
    }
    function sum(x, y) {
      console.log(this)
      console.log(x + y);
    }

    sum.apply(obj, [1, 2])
    // obj
```

因此apply主要与数组相关，例如求数组的最大值Math.max()

在没有解开运算符之前，求数组的最大值

因为Math.max()的参数是不定长参数，不能直接传入一个数组

```js
let arr = [5, 2, 1, 4, 3]
let res = Math.max.apply(null, arr)
```



**call()与apply()没啥大的区别，就是函数调用传参不同，apply需要将参数以数组的形式传递**





#### bind()

**bind()方法不会调用函数，但是能改变函数内部this的指向**

语法:

```js
fun.bind(thisArg,arg0,arg1...)
```

- thisArg函数运行时的this指向
- arg函数的参数

**返回由指定this值和初始化参数改造的 原函数的拷贝**（新函数）

*类似于Java中的AOP*

```js
let obj = {
    name: 'zhangsan'
}
function sum(x, y) {
    console.log(this)
    console.log(x + y);
}
let newFun = sum.bind(obj, 1, 2)

// 调用新函数
newFun()
```

例如，改变定时器中回调函数的指向，定时器中的回调函数是由window来调用的，但是想要改。

```js
  <button>获取验证码</button>
  <script>
    document.querySelector('button').addEventListener('click', function () {
      this.disabled = true
      // 2s 之后可以继续点击
      setTimeout(function () {
        this.disabled = false
      }.bind(this), 2000)
    })
  </script>
```





### 总结

![image-20230516122506259](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230516122506259.png)







## 防抖debounce

**单位之间内，频繁触发事件，只执行最后一次**

例如：在搜索框输入时，会有提示，不能每输入一个字符都要请求一次后台，要等用户全部输入完了，再请求后台（用户输入时停顿，我们认为输入完了）

![image-20230516123120772](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230516123120772.png)

**我们只要最后一次事件的触发，这就是防抖**

关于防抖的实现：

- **手写防抖函数**
- **lodash库函数解决防抖**



**防抖的原理就是延迟固定时间之后执行，底层是通过定时器实现的**



### **先来看lodash中关于防抖的处理函数**

[Lodash_防抖](https://www.lodashjs.com/docs/lodash.debounce#_debouncefunc-wait0-options)

![image-20230516123536652](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230516123536652.png)

![image-20230516124052131](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230516124052131.png)





### 手写防抖函数

核心思路:

防抖的核心就是利用定时器setTimeout()来实现的

- **声明一个定时器变量**
- **当事件触发时，先判断是否有了定时器，如果有先清除定时器**
- **如果以前没有定时器，则开启定时器**
- **定时器中写函数调用**

看具体的代码

```js
let input = document.querySelector('input')
// 接收一个处理函数fn 和 一个延时时间t
function debounce(fn, t) {
    // 声明一个定时器
    let timer
    
    // 将事件处理函数返回
    // e用来接收事件对象
    return function (e) {
        // 如果有定时器，则清空        
        if (timer) clearTimeout(timer)
        // 重新设置定时器
        timer = setTimeout(function () {
            // 定时器中执行处理函数
            fn(e);
        }, t)
    }
}

function fn(e) {
    console.log(e.data)
    console.log('我要发起请求楼~~')
}

// 添加事件处理
input.addEventListener('input', debounce(fn, 2000))
```



![image-20230516125258125](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230516125258125.png)











## 节流throttle

**单位时间内，频繁触发事件，只执行一次**

在这段冷却时间内，再次触发事件不会执行



注意与防抖区分开来，防抖是只执行最后一次

**使用场景：高频事件**

- mouseover、resize、scroll等事件

例如：如果没有节流，短时间内触发了超级多的事件处理函数，非常影响性能

![image-20230516160749503](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230516160749503.png)

关于实现节流：

- **lodash库函数实现**
- **手写节流函数**



 

### lodash节流函数

![image-20230516125936823](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230516125936823.png)



```js
    function fun() {
      console.log('滚动了')
    }
    window.addEventListener('scroll', _.throttle(fun, 2000))
```

设置了节流之后，在这2s内这个事件处理函数只会触发一次

![image-20230516161206980](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230516161206980.png)





### 手写节流函数

节流的核心也是利用定时器setTimeou来实现的

1. 声明一个定时器变量

2. 当事件触发时，先判断是否有定时器了

3. 如果有则不开启新定时器

4. 如果没有定时器，保存到变量中

   定时器里面调用执行函数

   定时器里面要把定时器清空

看代码

```js
function fun() {
    console.log('滚动了')
}

function throttle(fn, t) {
    let timer = null
    return function () {
        // 如果没有定时器，则开启
        if (!timer) {
            timer = setTimeout(function () {
                // 调用目标函数
                fn();
                // 清空定时器
                timer = null
            }, t)
        }
    }
}
window.addEventListener('scroll', throttle(fun, 1000))
```

![image-20230516162432452](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230516162432452.png)









### 防抖和节流总结

![image-20230516162547147](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230516162547147.png)







## EventLoop事件循环

JS是单线程语言，同一时间只能做一件事。

![image-20230521171327425](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521171327425.png)

**单线程的缺点就是：只有前一个任务执行完成，后一个任务才能执行，如果前一个任务非常耗时，后一个任务只能等待，程序出现假死现象**

JS为了提供执行能力，做了很大的优化：

**JS将待执行的任务分为了两种：**

- **同步任务**synchronous
  - **又叫*非耗时任务*，主线程上的待执行的任务**
  - **只有前一个执行完了，后一个才能执行**
- **异步任务**asynchronous
  - **又叫做*耗时任务*，异步任务由JS委托给*宿主环境*进行执行**
  - **当异步任务执行完成后，会通知JS主线程来执行异步任务的回调函数**



**常见的异步任务**：

- 事件监听
- AJAX
- 定时器
- 文件操作

**大部分用到回调函数的地方，都是一个异步任务**



### 同步任务和异步任务的执行流程

![js执行机制2](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/js%E6%89%A7%E8%A1%8C%E6%9C%BA%E5%88%B62.png)

1. 同步任务由主线程来完成

2. 异步任务委托给宿主环境执行

3. 宿主环境负责运行异步任务，虽然js是单线程的，但是宿主环境不是单线程，可以因此可以将一些耗时的任务委托给宿主环境。

   宿主环境执行完成异步任务后，会将异步任务的回调函数放到任务队列中

4. **js主线程的执行栈清空后，会读取任务队列中的回调函数到主线程的执行栈中，继续按照上面的步骤**

5. js主线程不断重复第4步



### EventLoop

**JavaScript 主线程从“任务队列”中读取异步任务的回调函数，放到执行栈中依次执行。执行栈中空了，就继续去任务队列中取回调函数，这个过程是循环不断的，所以整个的这种运行机又称为 eventLoop(事件循环）。**





## 宏任务与微任务

**JS将异步任务又做了细的划分**

将异步任务分为两类：

- **宏任务**macroTask
  - 异步AJAX请求
  - 定时器
  - 文件操作
  - 其他宏任务
- **微任务**microTask
  - Promise.then()、.catch()、.finally()
  - process.nextTick
  - 其他微任务

![image-20230521190640742](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521190640742.png)



### 宏任务和微任务的执行顺序



![image-20230521191256026](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521191256026.png)

**每一个宏任务执行完成，都会检查是否存在*待执行的微任务*，如果有先执行微任务，再执行下一个宏任务**

**这样设计的目的仍然是为了提升JS的执行效率**



![image-20230521192149064](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521192149064.png)

1. **先执行同步任务**，输出2,4
2. **然后执行微任务**，输出3
3. **然后执行下一个宏任务**，输出1



再来看一个案例

![image-20230521193437753](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521193437753.png)

1. 先执行同步，输出1
2. 来到定时器，直接交给宿主
3. 来到Promise，里面的function是同步的，输出5，
4. Promise的function中的resolve()就是后面的then()，这是微任务，交给宿主
5. 又来到定时器，直接交给宿主
6. 至此主线程的执行栈结束
7. 宿主先执行微任务，主线程先拿到微任务的回调函数，输出6
8. 然后主线程继续从任务队列取回调函数，也就是第一个定时器的回调函数
9. 继续，同步任务，输出2,3,
10. 微任务，交给宿主，
11. 然后主线程又空了，先取到刚才的微任务的回调函数，输出4
12. 第二个定时器也是这样







# 面向对象

## 基础

利用`class`关键字来定义类，利用`constructor()`来定义构造函数

***类的本质就是构造函数***

类中`this`指向当前实例

***一个类中，只能有一个构造方法constructor()***

```js
// 定义类
class Person {
  // 构造方法
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  sayHello() {
    console.log(`Hello,I am ${this.name} and ${this.age} years old`)
  }
}

// 创建对象
let zs = new Person('zs', 18)
zs.sayHello()

```



### 类属性

将与类实例无关的方法、属性，定义成静态的，无需通过实例对象来调用，直接通过`类名.属性名`或`类名.方法名()`的形式调用

***这种与实例无关的属性、方法，也可以叫做类属性、类方法***

类属性、类方法被所有的实例所共享，所有的实例也可以访问到。

**使用`static`关键字来定义成静态的。**

```js
// 定义类
class Person {
  static area = 'China'
  // 构造方法
  constructor(username, age) {
    this.username = username
    this.age = age
  }

  static sayHello() {
    console.log('Hello')
  }

  introduce() {
    console.log(`Hello,I am ${this.username} and ${this.age} years old`)
  }
}

// 访问静态属性
console.log(Person.area)
// 调用静态方法
Person.sayHello()

```



```js
class MyMath {
  // 静态方法，也可以叫做类方法
  static add(a, b) {
    return a + b
  }
}
// 调用方法
let res = MyMath.add(1, 2)
```



## 继承

通过关键字`extends`来实现继承

在ES6中，所有的class中的属性都是公开的，没有Java中public、private这些概念。

**所以通过继承，子类拥有父类的所有属性、方法**

通过`super`关键字来访问父类中的属性、方法

```js
class Animal {
  constructor(speice) {
    this.speice = speice
  }

  call() {
    console.log('ao ... ao....')
  }
}

// 继承父类的所有属性、方法
class Dog extends Animal {}

let d = new Dog()
d.call()

```

调用父类的构造方法，**要注意，super在this之前**

```js
class Animal {
  constructor(speice) {
    this.speice = speice
  }

  call() {
    console.log('ao ... ao....')
  }
}

// 继承父类的所有属性、方法
class Dog extends Animal {
  constructor(speice, name) {
    super(speice)
    // 没有父类，哪来的子类
    // super在this之前
    this.name = name
  }

  // 重写父类方法
  call() {
    console.log('wagn ... wang ...')
  }

  // 子类独有的方法
  sayHello() {
    console.log(`Wang!My name is ${this.name},I am a good ${this.speice}`)
  }
}

let d = new Dog('Dog', '小黑')
d.call()
// wagn ... wang ...
d.sayHello()
// Wang!My name is 小黑,I am a good Dog

```





## setter/getter

在 ES6 中，我们可以使用 `get` 和 `set` 关键字来创建 getter 和 setter 方法，用于访问和设置类的属性



***当在实例身上直接访问属性，会调用getter， 修改时会调用setter***

```js
class Person {
  constructor(name, age, sex) {
    this._name = name
    this._age = age
    this._sex = sex
  }

  get name() {
    console.log('访问 name ...')
    return this._name
  }

  set name(name) {
    console.log('set name....')
    this._name = name
  }

  get age() {
    console.log('访问 age ...')
    return this._age
  }

  set age(age) {
    console.log('set age....')
    this._age = age
  }

  get sex() {
    console.log('访问sex属性')
    return this._sex
  }

  set sex(sex) {
    console.log('set sex....')
    this._sex = sex
  }
}

let p = new Person('张三', 18, '男')
// 通过getter获取属性
p.name

// 通过setter修改
p.name = 'lisi'
```



**注意：**

- 在类内部，定义属性时，使用了`_name`的命名方式，只是一个标识作用，表示此属性是类内的私有的

- 像这样，会产生无限递归

  ![image-20230530154308126](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230530154308126.png)



**反正，就是注意属性名不要与setter/getter同名就好了**

我们在外部访问，都是通过setter/getter，并不是真正的属性。





# Promise

## 回掉地狱

多层回调函数的相互嵌套，就形成了回掉地狱。

像这样：

![image-20230521151910221](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521151910221.png)

回掉地狱的缺点：

- 代码耦合性太高，难以维护
- 大量冗余代码相互嵌套，可读性变差

**为了解决回掉地狱的问题，ES6中提出了Promise的概念**







## Promise的基本概念

**Promise是一个构造函数**

- 我们可以通过new来创建Promise实例, const p = new Promise()
- **一个Promise实例对象，就代表一个异步操作**



**Promise构造函数的原型上有一个then()方法**



**.then()方法用来预先制定成功和失败的回调函数**

- p.then(成功的回调函数，失败的回调函数)
- **成功的回调函数是必选的，失败的回调函数是可选的**



**如果异步操作成功了，就会调用成功的回调函数，如果失败了，就会调用失败的回调函数**





## Promise的使用

### 体验——基于Promise读取文件

基于回调函数来实现按照顺序依次读取三个文件

```js
const fs = require('fs')

fs.readFile('./resources/1.txt', 'utf-8', (err1, res1) => {
  // 读取失败
  if (err1) return console.log(err1.message)
  console.log(res1)

  // 读取第二个文件
  fs.readFile('./resources/2.txt', 'utf-8', (err2, res2) => {
    // 读取失败
    if (err2) return console.log(err2.message)
    console.log(res2)

    // 读取第三个文件
    fs.readFile('./resources/3.txt', 'utf-8', (err3, res3) => {
      // 读取失败
      if (err3) return console.log(err3.message)
      console.log(res3)
    })
  })
})

```

![image-20230521153528579](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521153528579.png)





**由于Node.js官方提供的fs模块*仅支持*以*回调函数的方式*读取文件，不支持Promise的调用方式。因此需要安装第三方模块，从而支持基于Promise的方式读取文件**

```sh
npm install then-fs
```

**基于then-fs实现基于Promise读取文件**

**调用then-fs提供的readFile()方法，可以异步地读取文件内容，返回值是一个Promise实例对象，因此可以调用此Promise实例的then()方法来为每一个Promise异步操作指定成功和失败之后的回调函数**

*以下代码不保证读取文件的有序性，等会改进*

*以下是3个异步任务，无法保证谁先完成*

```js
const fs = require('then-fs')
// 忽略失败的回调函数
// 以下是3个异步任务，无法保证有序性
fs.readFile('./resources/1.txt', 'utf-8').then((res) => console.log(res))
fs.readFile('./resources/2.txt', 'utf-8').then((res) => console.log(res))
fs.readFile('./resources/3.txt', 'utf-8').then((res) => console.log(res))

```

![image-20230521154355489](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521154355489.png)





### then()方法

如果then()方法返回一个**新的Promise实例对象，**，就可以在then()后继续`.then()`，形成链式调用，就解决了回调地狱问题。

上述代码的优化，并且保证有序性

```js
const fs = require('then-fs')

fs.readFile('./resources/1.txt', 'utf-8')
  .then((res) => {
    console.log(res)
    // 返回一个新的Promise对象
    return fs.readFile('./resources/2.txt', 'utf-8')
  })
  .then((res) => {
    console.log(res)
    // 返回一个新的Promise
    return fs.readFile('./resources/3.txt', 'utf-8')
  })
  .then((res) => {
    console.log(res)
  })

```

![image-20230521155803758](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521155803758.png)







### catch()

**在Promise的链式操作中如果发生了错误，可以使用Promise.prototye.catch()来捕获错误。**

**发生异常后，后面的.then()就不会执行了**

```js
const fs = require('then-fs')
fs.readFile('./resources/1.txt', 'utf-8')
  .then((res) => {
    console.log(res)
    // 返回一个新的Promise对象
    // 读取一个不存在的文件
    return fs.readFile('./resources/22.txt', 'utf-8')
  })
  .then((res) => {
    console.log(res)
    // 返回一个新的Promise
    return fs.readFile('./resources/3.txt', 'utf-8')
  })
  .then((res) => {
    console.log(res)
  })
  //  捕获链式调用过程中的错误
  .catch((err) => {
    console.log(err.message)
  })

```

![image-20230521160240747](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521160240747.png)





**如果想要发生错误后不影响后面的.then()，可以将.catch()提前**

```js
const fs = require('then-fs')
fs.readFile('./resources/1.txt', 'utf-8')
  .then((res) => {
    console.log(res)
    // 返回一个新的Promise对象
    // 读取一个不存在的文件
    return fs.readFile('./resources/22.txt', 'utf-8')
  })
  .catch((err) => {
    console.log(err.message)
  })
  .then((res) => {
    console.log(res)
    // 返回一个新的Promise
    return fs.readFile('./resources/3.txt', 'utf-8')
  })
  .then((res) => {
    console.log(res)
  })

```

![image-20230521160609776](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521160609776.png)







### Promise.all()

Promise.all()方法会**发起并行的Promise异步操作**，等所有的**异步操作全部操作结束后，**才会执行下一步的.then()操作，后面的.then()方法相当于在等待，存在一个等待机制。

```js
const fs = require('then-fs')
// 定义三个异步操作数组
const promiseArr = [
  fs.readFile('./resources/1.txt', 'utf-8'),
  fs.readFile('./resources/2.txt', 'utf-8'),
  fs.readFile('./resources/3.txt', 'utf-8')
]

// 发起并行请求
Promise.all(promiseArr)
  // 数组中定义的异步任务的书序
  //就是这里拿到三个对应的返回结果
  .then(([r1, r2, r3]) => {
    console.log(r1, r2, r3) //所有文件读取成功，等待机制
  })
  //  捕获异常
  .catch((err) => {
    console.log(err.message)
  })

```

Promise.all()发起三个异步请求，等到这三个异步请求都成功后，将这三个异步任务的返回结果交给.then()，这里三个参数的顺序，就是数组中的顺序。

![image-20230521162135899](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521162135899.png)



### Promise.race()

**Promise.race()方法会发起并行的Promise异步操作，只要任何一个异步操作完成了，就立即执行下一步的.then()，赛跑机制**

```js
const fs = require('then-fs')
// 定义三个异步操作数组
const promiseArr = [
  fs.readFile('./resources/1.txt', 'utf-8'),
  fs.readFile('./resources/2.txt', 'utf-8'),
  fs.readFile('./resources/3.txt', 'utf-8')
]

// 发起并行请求
Promise.race(promiseArr)
  .then((res) => {
    console.log(res)
  })
  //  捕获异常
  .catch((err) => {
    console.log(err.message)
  })

```

![image-20230521162249762](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521162249762.png)



### Promise.reject()

**`Promise.reject()`** 方法返回一个带有拒绝原因的 `Promise` 对象。



### 自封装一个基于Promise的文件读取操作

我们现在基于Node.js提供的fs模块来封装一个基于Promise的文件读取。

一个Promise实例就是一个异步任务，如何创建具体的异步操作呢？

**只需要在创建Promise时，传入一个function函数，将需要异步操作的代码写在这个function中。**

```js
return new Promise(function(){
    fs.readFile()
})
```

在Promise实例后调用.then()来设置异步任务成功和失败的回调函数。

那么是怎么设置到Promise实例身上的呢？

**当在Promise实例上调用方法.then(success, reject)时，就会将.then()的两个参数传递给Promise(function(success, reject))**

**因此，我们在创建Promise时，传入一个function对象，给function()设置形参，来接受成功和回调的函数**

![image-20230521164354319](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521164354319.png)

测试

```js
// 导入Node.js中的fs模块
const fs = require('fs')
// 自定义方法，封装Promise
function getFile(path) {
  return new Promise(function (resolve, reject) {
    // 异步的操作
    fs.readFile(path, 'utf-8', (err, data) => {
      // 如果失败，调用失败的回调函数
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

// 测试
getFile('./resources/1.txt')
  .then(
    (res) => {
      console.log(res)
      // 返回Promise
      return getFile('./resources/2.txt')
    },
    (err) => console.log(err.message)
  )
  .then(
    (res) => console.log(res),
    (err) => console.log(err)
  )
  .catch((err) => console.log(err.message))

```

![image-20230521164428326](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521164428326.png)







# async/await



## async/await介绍

**async/await 是ES8引入的新语法，用来简化Promise异步操作。**

在async/awati之前，我们只能通过.链式then()的方式处理Promise异步操作

像这样

```js
const fs = require('then-fs')
fs.readFile('./resources/1.txt', 'utf-8')
  .then((res) => {
    console.log(res)
    // 返回一个新的Promise对象
    // 读取一个不存在的文件
    return fs.readFile('./resources/22.txt', 'utf-8')
  })
  .then((res) => {
    console.log(res)
    // 返回一个新的Promise
    return fs.readFile('./resources/3.txt', 'utf-8')
  })
  .then((res) => {
    console.log(res)
  })
  //  捕获链式调用过程中的错误
  .catch((err) => {
    console.log(err.message)
  })

```

**Promise的链式.then()方法虽然解决了回调地狱的问题，但是也会造成代码冗余、可读性差**



## async/await的基本使用

使用async/await简化Promise异步操作的示例代码

```js
import thenFs from 'then-fs'

async function getFile() {
  const res1 = await thenFs.readFile('./resources/1.txt', 'utf-8')
  console.log(res1)

  const res2 = await thenFs.readFile('./resources/2.txt', 'utf-8')
  console.log(res2)

  const res3 = await thenFs.readFile('./resources/3.txt', 'utf-8')
  console.log(res3)
}

getFile()
```

**如果使用await修饰返回值为Promise的异步操作，那么该异步操作的返回值就不是Promise实例了，而是最终异步任务的结果**

**如果一个方法内部使用了await关键字，那么该方法就要用async来修饰**

**这样就不用.then()的方式指定异步任务成功后的回调函数了**





## 注意事项

- **如果在function中使用了await，则function必须被async修饰**
- **在async方法中，第一个await之前的代码会被同步执行，await之后的代码会异步执行**

![image-20230521170540839](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521170540839.png)





















