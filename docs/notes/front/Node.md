# 初识Node和内置模块

## 初识node.js

### 在node.js环境中执行JavaScript代码

1. 打开终端
2. 输入 `node 待执行文件路径`

#### 终端中的快捷键

* 使用`↑` , 上一条命令
* 使用`tab`  能够快速补全路径
* 使用能够`esc`  能够快速清空当前已输入的命令
* `cls`命令  , 清空终端

**初始化项目**

```js
npm init -y
```

**启动项目**

```dos
node project.js
```



## fs文件系统模块

### 什么是fs文件系统模块

fs模块时node.js官方提供的 , 用来操作文件的模块 , 他提供了一系列的方法和属性 , 用来满足用户对文件的操作需求

例如

* `fs.readFile()` , 用来读取指定文件中的内容
* `fs.writeFile()` 用来向指定文件中写入内容

**导入文件系统模块**

```js
const fs = require('fs')
```

### 读取指定文件中的内容

```javascript
fs.readFile(path,[options],callback);
```

* `path`  必选参数, 表示文件的路径
* `options`   可选参数 , 表示以什么编码格式来读取文件
* `callback`   回调函数 , 通过此函数拿到读取的结果

使用fs模块的前提是在代码中导入该模块

```javascript
const fs = require('fs');
```

**使用fs.readFile()读取文件内容**

```javascript
const fs = require('fs');
fs.readFile('./files/test.txt','utf8',function(err,dataStr){
    if(err){
        return console.log('文件读取失败'+err.message);
    }
    console.log('文件读取成功'+dataStr);
})
/*
此处的回调函数有两个参数
第一个参数err : 是文件读取失败的返回值 , 若文件读取成功则err=null,否则err为错误对象
第二个参数dataStr: 是文件内容字符串 , 若文件读取成功 , 则dataStr是字符串,若文件读取失败则是undefined
*/
```



### 向指定文件中写入内容

```javascript
fs.writeFile(file,data,[options],callback);
```

* `file` 文件路径
* `data`   要写入的内容 , 是一个字符串
* `options`   可选参数, 可以指定以什么编码格式写入文件内容,**默认是utf8**
* `callback`   回调函数
* 待写入的文件不存在时,会自动创建该文件



```javascript
const fs = require('fs');
fs.writeFile('./files/test.txt', 'hello node.js!', function (err) {
    if (err) {
        return console.log('文件写入失败' + err.message);
    }
    console.log('文件写入成功');
}
)
/*
此处的回调函数只有一个err
err: 如果写入成功, 则err=null , 否则 err=一个错误对象
写入时会重新删除原来的内容
*/
```

注意:

* `fs.writeFile()`只能用于创建文件, 不能用于创建路径
* `fs.writeFile()`  新写入的内容会覆盖旧的内容





### 动态路径拼接

在使用`fs.readFile()` 和` fs.writeFile()` 方法时 , 若传入的参数是一个相对路径,即路径中带有`./` 或者`../`  , 那么在执行时很容易发生错误

这是因为`node`命令是在当前目录下的一个命令,所以会发生错误

解决方案: **直接提供绝对路径**

```javascript
'd:\\test\\node\\hello.js'
这样的路径是一个写死的字符串, 且不易移植 , 维护性较差
```

**那么可以使用一个专门的对象, 专门用来提供当前的绝对路径**

`__dirname` 表示当前的绝对路径, 我们只需要拼接上待执行文件的文件名即可

```javascript
console.log(__dirname);

fs.readFile(__dirname+'/file/test.txt');
但是使用加号也会出现拼接错误的问题
例如
fs.readFile(__dirname+'./file/test.txt');
console.log(__dirname+'./file/test.txt');
这样这个路径就变成了 d:\test\.\file\test.txt 这样显示是不正确的路径
```

接下来的`path`模块为我们提供了一个路径拼接的方法



## path路径模块

### 什么是path路径模块

`path`模块是Node.js官方提供的, 用来处理路径的模块,他提供了一系列的方法和属性,用来满足用户**对路径的处理需求**

例如,常用的

* `path.join()`   用来将多个路径片段拼接成一个完整的路径字符串
* `path.basename()`  用来从路径字符串中, 将文件名解析出来

还是一样, 想要在代码中使用`path`模块, 需要导入

```javascript
const path = require('path');
```



### 路径拼接

在上面讲到的`__dirname`时 , 使用`+`号 拼接也会出现问题, 那么`path.join()`就解决了这个问题

使用`path.join()` , 可以把多个片段拼接成一个完整的路径字符串

```javascript
path.join([...paths]);
```

* `...paths`  多个路径的片段
* 返回值是一个    `string`字符串
* 使用`path.join()`就可以避免使用`+`号带来拼接路径错误

```javascript
const path = require('path');
var pathStr = path.join('/a','/b/c','../','./d','e');
console.log(pathStr)

var pathStr2 = path.join(__dirname,'./files/test.txt');
console.log(pathStr2);
/*
会自动的去识别 ../ 和 ./ 
自动的完成拼接
*/
```



### 获取路径中的文件名

使用`path.basename()`方法可以获取路径中的最后一部分 , 经常通过这个方法获取路径中的文件名

```javascript
path.basename(path[,ext]);
```

* `path`   必选参数, 表示一个路径的字符串
* `ext` 可选参数 , 表示文件拓展名, 指定了拓展名之后,就不会返回文件的后缀, 只返回文件名
* 返回值一个`string`字符串

```javascript
var fpath = '/a/b/c/index.html';
var fullName = path.basename(fpath);
console.log(fullName);
//输出index.html

var nameWithoutExt = path.basename(fpath,'.html');
console.log(nameWithoutExt);
//输出index
```



### 获取路径中的文件拓展名

使用`path.extname()`方法 , 可以获取路径中的拓展名部分

```javascript
path.extname(path);
```

* `path`必选参数 , ,  路径的字符串
* 返回一个`string` 字符串

```javascript
const path = require('path')

var fext = path.extname(fpath)
console.log(fext);
//输出.html
```







## http 模块

### 什么是http模块

首先要知道什么是**客户端和服务器**，在网络中, 负责消耗资源的电脑叫做 客户端 , 负责对外提供网络资源的电脑 , 叫做服务器。



`http` 模块是Node.js官方提供的, 用于**创建Web服务器的模块** , 通过调用提供的`http.createServer()`方法 , 就能方便的把电脑变成服务器 , 从而对外部提供Web资源。

还是老样子 , 要想使用http模块, 需要导入

```javascript
const http = require('http');
```

### 进一步了解http模块的作用

服务器和客户端的区别在于 , 服务器上安装了web服务器软件 , 例如: `IIS` , `Apache` , 通过安装这些服务器软件,就能把电脑变成服务器

在Node.js 中 , 我们不需要使用`IIS`, `Apache`等这些第三方web服务器软件

因为我们可以基于Node.js提供的http模块 , 通过简单的代码 , 就能轻松的手写一个服务器软件 , 

从而对外提供web服务



### 服务器相关的概念

#### IP地址

IP 地址就是互联网上每台计算机的唯一地址 

常用的是IPv4的地址格式 , `a.b.c.d`  ,其中每个字母都是`0~~255`之间的十进制整数

例如 

* 本地回环地址 `127.0.0.1`  , 代表本地主机
* 路由地址`192.168.0.1`

注意

* 互联网中的每台服务器 , 都有自己的IP地址 , 例如可以在终端中 `ping www.baidu.com` , 查看百度服务器的IP地址
* 在开发期间 , 自己的电脑既可以是服务器, 也可以是客户端 , 可以在浏览器中输入`127.0.01`,把自己的电脑当做服务器访问



#### 域名和域名服务器

IP地址不方便记忆, 不直观易懂 , 所以又出现了域名,例如`www.baidu.com`就是百度服务器IP地址的映射的域名 , 相对于百度的IP地址 , 域名更方便我们记忆理解,我们可以通过域名来访问百度的服务器

**域名和IP地址是一一对应的关系** , 根据域名解析出对应的IP地址, 就需要用到一个**域名服务器**

注意

* 单纯地使用IP地址 , 互联网中的电脑是能够正常工作的 , 但是有了域名 , 能够让互联网世界变得更加方便
* 在开发测试期间 , `127.0.0.1` 对应的域名就是`localhost` ,代指本机

#### 端口号

电脑上的端口是用来放程序的地方 , 也可以理解为服务程序存放的端口

每个电脑上可以有很多服务,每个服务都对应一个端口

客户端发过来的网络请求, 通过端口号, 可以被准确地交给对应的Web服务进行处理

**端口号就是用来辨别电脑上的端口**

注意

* 每个端口号不能同时被多个web应用占用
* 在实际应用中 , 如果web服务器的端口号为80 , 则URL中的**80端口可以被省略**  , 只有80端口号是可以省略的, 其他不行!!!





### 创建最基本的Web服务器

#### 基本步骤

1. 导入`http`模块
2. 创建web服务器实例
3. 为服务器实例绑定`request`事件, 监听客户端的请求
4. 启动服务器

```javascript
// 1.导入http模块
const http = require('http')
// 2. 创建web服务器实例
const server = http.createServer();
// 3. 为服务器实例绑定request事件, 监听客户端请求
server.on('request',function(){
  .....  
})
//4.启动服务器,
server.listen(80,function(){
    .,...
})
```



#### req请求对象

只要我们服务器接收到了客户端的请求, 就会调用通过`server()`为服务器绑定的`request`事件处理函数

如果想访问客户端相关的数据 或属性

```javascript
server.on('request',(reg) => {
    // req 是请求对象 , 他包含了客户端相关的数据和属性
    // 例如 req.url 表示客户端请求的url地址
    // req.method 是客户端请求类型
    const str = `Your request url is ${req.url} , and request method is ${req.method}`
    console.log(str)
})
```



#### res响应对象

在服务器的request事件处理函数中 ,如果想访问与服务器相关的数据或属性

```javascript
server.on('request',(reg,res) => {
    // res是响应对象 ,他包含了服务器相关的数据和属性
    // 例如  ,要发送到客户端的字符串
    //此处的req.url是 URL中端口号后面的部分
    const str = `Your request url is ${req.url} , and request method is ${req.method}`
    //res.end()方法的作用
    // 向客户端发送指定的内容 , 并结束这次请求的处理
    res.end(str);
})
```



#### 解决中文乱码问题

当调用`res.end()`方法 ,向客户端发送中文内容的时候, 会出现乱码问题 , 因此需要手动设置内容的编码格式

```javascript
server.on('request',(reg,res) =>{
    //发送的内容中包含中文
    const str = '您请求的地址是 ${req.url} , 请求的method类型是 ${req.method}'
    // 为了防止中文乱码问题 , 需要手动设置响应头的编码格式
    res.setHeader('Content-Type','text/html; charset=utf-8')
    // 把包含中文的内容响应给客户端
    res.end(str)
})
```



### 根据不同的URL响应不同的HTML内容

#### 核心步骤

1. 获取请求的URL地址
2. 设置默认的响应内容为 404 Not found
3. 判断用户请求是否为`/` 或 `/index.html`首页
4. 判断用户请求的是否为`/about.html`页面
5. 设置`Content-Type`响应头 , 防止中文乱码
6. 使用`res.end()`把内容响应给客户端, 并结束这次请求

```javascript
server.on('request',(req , res)=>{
    const url = req.url // 1. 获取请求地址
    let content = '<h1>404 not found</h1>'//2.设置默认的内容
    if(url === '/' || url === 'index.html')//3如果用户请求的是首页
    {
        content = '<h1>首页</h1>'
    }else if(url === '/about.html'){//4. 如果用户请求的是关于页面
        content='<h1>关于页面</h1>'
    }
    //5.设置响应头 , 防止中文乱码
    res.setHeader('Content-Type','text/html; charset=utf-8');
    //6.把内容发送给客户端
    res.end(content);
})
```









# 模块化

## 模块化的基本概念

### 什么是模块化

模块化是指解决一个复杂问题时 , 自顶向下 逐层把系统划分成若干模块的过程 , 对于整个系统来说,模块是可组合,分解和更换的单元

**编程中的模块化**

遵守固定的规则, 把一个大文件 拆分成独立并互相依赖的多个小模块



优点

* 提高了代码的重用性
* 提高了代码的可维护性
* 可以实现按需加载



### 模块化规范

**模块化规范**就是对代码进行模块化拆分与组合时, 需要遵守的那些规则

例如

* 使用什么样的语法格式来**引用模块**
* 在模块中使用什么样的语法格式**向外暴露成员**

**模块化规范的好处: ** 大家都遵守同样的模块化规范写代码 , 降低了沟通的成本 ,极大方便了各个模块之间的相互调用



## Node.js中的模块化

### Node.js中模块的分类

Node.js中根据模块的来源不同 , 将模块分为了3大类

* **内置模块**  由Node.js官方提供的 , 例如 fs , path  , http等,在安装Node.js时就已经将这些模块安装到本地了
* **自定义模块**   **用户创建的每个.js文件, 都是自定义模块 ;** 
* **第三方模块**   第三方开发出来的模板 , 并非官方提供的内置模板 , 也不是用户创建的自定义模板,使用前需要先下载

### 加载模块

使用强大的`require()`方法,可以加载需要的**内置模块,,用户自定义模块, 第三方模块**进行使用

```javascript
// 1. 加载内置模块
const fs = require('fs')

//2. 加载用户自定义模块
// 给出本地路径
const custom = require('./custom.js')

//3.加载第三方模块
const moment = require('moment')

```

**注意** : 当使用`require()`方法加载其他模块时, 会执行被加载模块中的代码

```javascript
const custom = require('./myModule.js')
//在加载用户自定义模块时, 可以省略.js后缀名
//效果相同
const custom = require('./myModule')
console.log(custom)
```



### Node.js中的模块作用域

#### 什么是模块作用域

和**函数作用域** 类似, **在自定义模块中定义的变量 , 方法等成员 , 只能在当前的模块中访问** , 这种模块级别的访问限制,叫做模块的作用域

#### 模块作用域的好处

**防止 了全局变量污染的问题**

例如:

> 在浏览器中, 没有模块作用域的概念
>
> 我导入first.js 模块, 里面的username="张三";
>
> 然后我又导入second.js模块,里面有username="李四"
>
> 这时候,我打印console.log(username) 结果为"李四" ,
>
> first.js中的username被污染





### 向外共享模块作用域中的成员

#### module对象

在每一个.js自定义模块中都有一个module对象, 他存储了当前模块有关的信息

```javascript
console.log(module)
/*
Module {
  id: '.',
  path: 'D:\\test\\node',
  exports: {},
  filename: 'D:\\test\\node\\myModule.js',
  loaded: false,
  children: [],
  paths: [
    'D:\\test\\node\\node_modules',
    'D:\\test\\node_modules',
    'D:\\node_modules'
  ]
}
*/
```



#### module.exports 对象

**在自定义模块中, 可以使用`module.exports`对象,将模块内的成员分享出去, 供外界使用**

**外界使用`requir()`方法导入自定义模块时, 得到的就是`module.exports`所指的对象**

在一个自定义模块中, `module.exports`默认为空

```javascript
// 当前文件就是用户自定义模块
const username = '张三'
function sayHello(){
    console.log(`大家好,我是${username}`)
}
const age = 20
// console.log(module)

// 向module.exports对象上挂载属性
module.exports.username='赵6'
module.exports.myfunction=function(){
    console.log('我是傻逼')
}
module.exports.sayHello=sayHello
module.exports.age=age
```



**注意点** : 使用`require()` 方法导入模块时, 永远以`module.exports`指向的最后一个对象为准



 

#### exports对象

由于`module.exports`单词写起来比较复杂, 为了简化共享成员的代码,Node提供了`exports`对象,默认情况下 , `exports`和`module.exports`指向同一个对象 , 最终的共享结果 , 还是以`module.exports`指向的对象为准

只不过`exports`写起来更加方便

```javascript
console.log(exports === module.exports)
//结果为true
```

```javascript
const username = '张三'
exports.username = username
exports.sayHello = function(){
    console.log('大家好')
}
```



#### exports和module.exports使用误区

```javascript
exports.username='张三'
module.exports ={
    gender: 'boy',
    age : 22
}

//在另一个模块中,导入该模块
const m = require('')
console.log(m)
//结果为
{gender: 'boy' , age:22}
```

原理: 原来`exports`和`module.exports`指向同一个对象 , 然后又在内存中开辟了一个新的对象, 让`module.exports`对象指向这个新对象 , 由于`require()`导入的最终结果以`module.exports`为准, 所以就会出现这种情况

![image-20220426120723396](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220426120723396.png)

![image-20220426121127924](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220426121127924.png)





**注意** :  为了防止混乱, 建议大家不要在同一个模块中同时使用`exports`和`module.exports`





### CommonJS 规范

Node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了**模块的特性和各模块之间如何相互依赖。**

CommonJS规定

* 每个模块内部 , **module变量** 代表当前模块
* **module** 变量是一个对象 , 他的**exports**  属性(即 module.exports) 是对外接口
* 加载整个模块 , 其实就是加载该模块的`module.exports`属性 , `require()`用于加载模块



## npm与包

### 包

Node.js中的**第三方模块** 又叫做 **包**

不同于Node.js中的内置模块与自定义模块 , **包由第三方个人或者团队开发出来**,  免费提供给所有人使用

**注意**:  Node.js中的包都是免费且开源的 , 不需要付费即可免费下载使用



#### 如何下载包

国外有一家 IT 公司，叫做 **npm, Inc.** 这家公司旗下有一个非常著名的网站： https://www.npmjs.com/ ，它是**全球最大的包共享平台**，你可以从这个网站上搜索到任何你需要的包.

**npm, Inc.** **公司**提供了一个地址为 https://registry.npmjs.org/ 的服务器，来对外共享所有的包，我们可以从这个服务器上下载自己所需要的包。



**注意：**

-  从 https://www.npmjs.com/ 网站上搜索自己所需要的包
-  从 https://registry.npmjs.org/ 服务器上下载自己需要的包



**npm, Inc.** **公司**提供了一个包管理工具，我们可以使用这个包管理工具，从 https://registry.npmjs.org/ 服务器把需要的包下载到本地使用。

这个包管理工具的名字叫做 Node Package Manager（简称 npm 包管理工具），这个包管理工具随着 Node.js 的安装包一起被安装到了用户的电脑上。

大家可以在终端中执行 **npm -v** 命令，来查看自己电脑上所安装的 npm 包管理工具的版本号：

```javascript
npm -v
```

当我们需要安装某个包时,执行这条命令即可

```javascript
npm install 包名;
可以简写为
npm i 包名
```

当然我们也可以安装指定版本的包

```javascript
npm i 包名@版本号
例如
npm i moment@2.22.2
```



### 初次下载

初次下载完包之后, 在项目文件夹下多了一个叫做`node_modules`的文件夹和`package-lock.json`的配置文件

* `node_modules`文件夹用来存放已安装项目中的包 , `require()`导入第三方包时, 就是从这个目录中查找并加载包
* `package-lock.json`配置文件用来记录`node_modules`目录下的每一个包的下载信息,例如包的名字 , 版本号 ,下载地址等

**注意** : 我们不要手动修改`node_modules`或`package-lock.json`文件中的代码 , npm包管理器会自动去维护他们







### 包管理配置文件

npm规定 , 在项目根目录中 , 必须提供一个`package.json`的包管理配置文件 , 用来记录与项目有关的一些配置文件, 例如

* 项目的名称 , 版本号 , 描述等
* 项目中都用到了那些包
* 哪些包只在开发期间用
* 哪些包在开发和部署时都需要用到



#### 多人协作问题

> 例如 , 我们需要多人协作时 ,通常将项目上传到Github上,但是有一个问题:
>
> 整个项目体积30M  , 第三方包体积是 28M , 源代码只有2M
>
> 第三方包的体积过大 , 不方便上传和下载

**解决方案就是: 共享时剔除`node_modules`文件夹** , 别人下载源代码后 , 只需要在本地安装包即可



#### 记录项目中安装了哪些包

我们剔除了`node_modules`文件夹 , 怎么知道项目中用到了哪些包呢?

**在项目根目录下,创建一个叫做`package.json`的配置文件 , 即可用来记录项目中用到了哪些包**



#### 快速创建pack.json

npm包管理工具提供了一个快捷命令 , 可以在执行命令所处的目录中 , 快速创建package.json这个包管理配置文件

```javascript
在执行命令所处的根目录中, 快速新建 package.json文件
npm init -y
```

注意

* 上述命令只能在**英文目录下成功运行**  , 所以项目文件夹的名称 一定要使用英文命令 ,**不要使用中文,不能出现空格**
* 运行`npm install 包` 安装包时, npm包管理工具会自动**包的名称**和**版本号** , 记录到`package.json`中



#### dependencies节点

`package.json`文件中 , 有一个`dependencies`节点 , 专门用来记录`npm install`命令安装了哪些包

![image-20220426183221504](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220426183221504.png)

 

#### 一次性安装所有的包

当我们拿到一个剔除了`node_modules`的项目后 , 需要先把所有的包下载到文件中 ,才能将项目运行起来否则会报错

![image-20220426183331101](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220426183331101.png)

可以通过命令把这个项目中要用到的包一次性安装下来

```javascript
npm install
或 简写
npm i
```

执行此命令时  , npm包管理工具会先读取`package.json`中的`dependencies`节点, 读取到所有依赖包的名称和版本号后,npm包管理工具把这些包一次性下载到项目中



#### 卸载包

可以运行指定的命令 , 来卸载指定的包

```javascript
npm uninstall 包名
例如
npm uninstall moment
```

**注意** : `npm uninstall `命令执行成功后 , 会把卸载的包 ,从`package.json`中的`dependencies`中移除掉



#### devDependencies节点

如果某些包只在项目开发阶段会用到 , 在项目上线后不会用到 , 则建议把这些包记录到`devDependencies`节点中 , 例如 `webpack`工具 , 与之对应的 , 如果某些包在项目开发和上线后都需要用到 , 则建议把这些包记录到`dependencies`节点中

可以执行如下命令 , 将包记录到`devDependencies`节点中

```javascript
npm install 包名 --save-dev
或简写为
npm i 包名 -D
```



### 包下载慢的问题

在使用npm包管理工具下载的时候 , 默认从国外的的 https://registry.npmjs.org/ 服务器进行下载,,所以会很慢

我们可以修改npm的下载路径 , 使其从国内的镜像服务器上下载 , 这样就解决了包下载慢的问题

我们可以从**淘宝NPM镜像服务器** 上下载 , 淘宝的镜像服务器每隔一段时间会自动把npm服务器的包同步到自己的服务器上 , 对国内用于提供下载服务

```javascript
//查看当前的下载包路径
npm config get registry
//默认为https://registry.npmjs.org/
//将包下载路径切换为淘宝镜像服务器
npm config set registry=https://registry.npm.taobao.org/
//检查镜像源是否修改成成功
npm config get registry
```



#### nrm 

当我们使用上面的命令来切换npm下载镜像源 时 , 非常麻烦 , 我们可以使用一个小工具`nrm`

```javascript
//将nrm 安装为全局可用的工具
npm i nrm -g
//查看所有的镜像源
nrm ls
//将下载包的镜像源切换为tabo
nrm use taobao
```

![image-20220426190523893](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220426190523893.png)



### 包的分类

使用npm包管理工具下载的包 , 共分为 两大类

* 项目包
* 全局包

#### 项目包

那些被安装到项目的`node_modules`目录中的包 ,都是**项目包**

项目包又分为两类

* **开发依赖包**  , 被记录到`devDependencies`节点中的包 , 只在开发期间会用到
* **核心依赖包**   , 被记录到`dependencies`节点中的包 , 在开发和项目上线之后都会用到

```javascript
npm i 包名 -D 安装开发依赖包
npm i 包名  核心依赖包
```



#### 全局包

在执行`npm install `命令时 , 如果提供了`-g `参数 ,则会把包安装为**全局包**

全局包默认会被安装到`C:\Users\用户目录\AppData\Roaming\npm\node_modules`目录下

```javascript
npm i 包名 -g 全局安装的包
npm uninstall 包名 -g   卸载全局包
```

**注意**

* 只有工具性质的包 , 才有全局安装的必要性 ,因为他们提供了好用的终端命令
* 判断某个包是否需要全局安装才能使用 , 可以参考官方提供的使用说明



#### i5ting_toc

推荐一个好用的小工具

`i5ting_toc`是一个可以把md文档转换为html页面的小工具

```javascript
//将i5ting_toc安装为全局包
npm install -g i5ting_toc
//调用i5ting_toc , 轻松实现 md 转 html 的功能
i5ting_toc -f 要转换的md文件路径 -o
```



### 包的规范

深入了解一下包的结构 

一个规范 的包, 他的组成结构,必须符合以下3点要求

* 包必须以**单独的目录** 而存在
* 包的顶级目录下要必须包含**package.json**这个包管理配置文件
* `package.json`中必须包含`name` , `version` , `main` 这三个属性 ,分别代表**包的名字,版本号 ,包的入口**
* `main`属性用来指明包的入口文件, 即`require()`需要引入的真正对象



## 模块加载机制

#### 优先从缓存中加载

**模块在第一次加载后会被缓存** , 这也就意味着多次调用`require()`引入统一模块不会导致模块内的代码被执行多次

**注意** : 不论是内置模块 , 用户自定义模块 , 还是第三方模块 ,他们都会优先从缓存中加载 , **从而提供模块的加载效率**



#### 内置模块的加载机制

内置模块是由Node.js官方提供的模块 , **内置模块的加载优先级最高**

```javascript
例如在node_moudles目录下有一个我自己创建的 fs模块
我现在引入 fs模块
require('fs')
实际引入的是系统内置模块的fs
```



#### 自定义模块的加载机制

使用`require()` 加载自定义模块时 , **必须指定`./`或`../`开头的 路径标识符**  , 如果没有指定`./`或`../`这样的路径标识符 , 则运行时会把他当做**内置模块** 或**第三方模块**进行加载

我们知道 , 在导入自定义模块时, 是可以省略`.js`后缀名的 , 其实真正的原理是这样的

1. 按照确切的文件名进行加载
2. 如果上一步 行不通 , 则 补全 `.js`拓展名进行加载
3. 如果上一步行不通 , 则补全`.json`拓展名进行加载
4. 如果上一步行不通 , 则补全`.node`拓展名进行加载
5. 最终还是不行 , 则加载失败 , 报错



#### 第三方模块的加载机制

如果传递给`require()`的不是一个内置模块 , 也不是`./`或`../`开头的标识符,  则系统会判定为第三方模块 , 尝试从 `/node_modules`文件夹中加载第三方模块

如果在当前项目的`node_modules`文件夹中没有找到该模块 , 则开始逐层向上寻找 , 直到文件系统的根目录

![image-20220427185033245](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220427185033245.png)

#### 目录作为模块

当我们给`require()` 传递的标识符是一个目录时 , 系统也会去加载 , 有三种加载方式

* 在被加载目录下查找一个叫做`package.json`的文件 , 并寻找`main`属性 , 作为`require()`加载的入口
* 如果在目录中没有`package.json`文件,  或者`main`入口不存在或无法解析 , 则Node.js将会视图加载目录下的`index.js`文件
* 如果上两步都失败了 , 则Node.js会报错



## 开发属于自己的包

1. 新建一个项目文件夹 , 作为包的根目录

2. 在包的根目录下 , 创建如下三个文件

   * `package.json` 包管理配置文件
   * `index.js`   包的入口文件
   * `README.md`  包的说明文档

3. 初始化`package.json`配置文件 , 必须包含以下几个属性,不能少

   ![image-20220427185615214](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220427185615214.png)

4. 编写`README.md`包的说明文档, 包括: **包的安装方式 , 导入方式 , 包内的方法和属性的使用说明 ,开源协议**



### 发布包

1. 注册`npm`账号 

2. 在终端登录`npm`账号(在运行`npm login`命令之前, 必须保证包的下载地址为官方 , 可以使用`nrm`修改下载地址,可以看前面的修改下载地址的文字)

   ```javascript
   //执行
   npm login
   //然后依次输入账户名和密码即可
   ```

3. `cd`到包的根目录下 , 运行`npm publish`命令 , 即可发布到npm官网上 (注意: 包名不能雷同 , 可以去官网去搜索有没有同名的包)

4. **发布包的时候要慎重 , 尽量不要去发布没有意义的包**



#### 删除已发布的包

在终端命令行登录后

运行命令`npm unpublish 包名 --force` , 即可删除已发布的包

注意:

* `npm unpublish`命令只能删除**72小时以内发布的包**
* `npm unpublish`删除的包 , **在24小时内不允许再次发布**







# Expreses

## 初始Express

### Express简介

#### 什么是Express

官方给出的概念：Express 是基于 Node.js 平台，快速、开放、极简的 Web 开发框架。

通俗的理解：Express 的作用和 Node.js 内置的 http 模块类似，**是专门用来创建 Web 服务器的。**

**Express** **的本质**：就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法。

Express 的中文官网：[ http://www.expressjs.com.cn/](http://www.expressjs.com.cn/)



#### 进一步了解Express

![image-20220427192949078](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220427192949078.png)



#### Express能做什么

对于前端程序员来说 , 最常见的两种服务器 , 分别是

* **Web网站服务器**  : 专门对外提供Web网页资源的服务器
* **API接口服务器** : 专门对外提供API的接口服务器

使用Express , 我们可以方便快捷地创建以上的这两种服务器



### Express的基本使用

#### 安装

在项目所处的目录中 , 运行命令 , 即可将Express安装到项目中使用

```javascript
npm i express
在黑马程序员的课程中 推荐安装的是4.17.1
npm i exprss@4.17.1
```

> 从Express官方的历史版本可以看出
>
> 4.17.1版本发布将近3年后, 才出现了4.17.2版本
>
> 说明4.17.1是这段时间最稳的,也是安装最多的

#### 创建基本的Web服务器

```javascript
//1.导入Express
const express = require('express')
//2.创建web服务器
const app = express()
//3.启动web服务器
app.listen(80,() => {
    console.log('express server running at http://127.0.0.1')
})
```

#### 监听GET请求

通过`app.get()`方法 , 可以监听客户端的GET请求 

```javascript
const express = require('express')
//创建web服务器
const app = express()
//监听GET请求
/*
参数1 : 请求的URL地址
参数2 : 请求对应的处理函数
        req 请求对象 
        res 响应对象
*/
app.get('/user',(req,res) =>{
    res.send({name:'zs',age:20,gender:'boy'})
})
//启动web服务器
app.listen(80,() => {
    console.log('express server running at http://127.0.0.1')
})
```

#### 监听POST请求

通过`app.post()`方法 , 可以监听客户端的POST请求

```javascript
//监听POST请求
/*
参数和上面一样
*/
app.post('/user',(req,res)=>{
    res.send('请求成功')
})

```

#### 把内容响应给客户端 

通过 `res.send()`方法,可以把处理好的内容, 发送给客户端 

```javascript
app.get('/user',(req,res) =>{
    res.send({name:'zs',age:20,gender:'boy'})
})
app.post('/user',(req,res)=>{
    res.send('请求成功')
})
```

#### 获取URL中携带的查询参数

通过`req.query` 对象 , 可以访问到客户端通过查询字符串的形式,发送到服务器的参数,拿到这些参数后, 会把参数解析到`req.query`对象身上

```javascript
app.get('/',(req,res)=>{
    //req.query 默认是一个空对象
    //客户端使用 ?name=za&age=20这种查询字符串形式,发送到服务器端的参数
    //可以通过req.query 对象访问到,例如
    //req.query.name      req.query.age
    console.log(req.query)

})
```

此时我们访问`http:localhost/?name='zs'&id=5` , 就会看到请求的信息

#### 获取URL中的动态参数

通过`req.params`对象,  可以访问到URL中的动态参数部分 , 通过`:`号去匹配参数到 `req.params`身上

```javascript
app.get('/user/:id',(req,res) => {
    ///res.params 默认是一个空对象 
    // 此处的 :id是一个动态参数 , id是参数名
    // :号是动态参数的一个标志 , 这个参数名无所谓
    // 会自动去匹配这个 动态参数 到 res.params身上
    console.log(req.params)
    res.send(req.params)
})
```

此时我们访问`http://localhost/user/58` , 就会得到数字58



### 托管静态资源

#### express.static()

express提供了一个函数 , 叫做`express.static()`  , 通过他 ,我们可以非常方便地创建一个**静态资源服务器**

我们想去开放某一个目录下的文件, 只需要将这个目录静态托管即可

如果要访问一些资源,我们只需要在URL跟上资源名, 然后服务器就会去我托管的目录下去寻找并相应给客户端

```javascript
app.use(express.static('目录名'));
```

**注意** : **Express在指定的静态目录中去查找文件** , 并对外提供资源的访问路径 , 因此, **存放静态资源的目录名不会出现在URL中**

**举个栗子** , 这是我的项目目录结构 , 我要静态托管`files`文件夹下载的资源

```javascript
app.use(express.static(./files))
//app.use()的用法后面说 , 我也不会(手动狗头)
```

![image-20220428214732448](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220428214732448.png)

那么我在请求这个某个资源时 , 就不需要再加上`files`这个目录名 , 比如说我想要请求`flies`文件夹下的`index.html` , 那么我们只需要在URL中这么写`http:127.0.0.1/index.html`即可, 不需要再加上`files`目录名 

#### 托管多个静态资源

如果想要托管多个静态资源目录 , 那么我们只需要多次调用`express.static()`函数即可

**举个栗子** ,我想要托管`files`和`public`目录下的静态资源,只需要这么写

```javascript
app.use(express.static('./files'))
app.use(express.static('./public'))
```

**注意** : 我们在访问静态资源时, `express.static()`就会根据添加目录的顺序去查找所需要的的资源文件

**举个栗子**  , 我的`flies`和`public`目录下都有一个叫`index.html`的文件,

我在这样访问时`http://127.0.0.1/index.html` , 就会响应给客户端`files`目录下的`index.html`文件

#### 挂载路径前缀

前面说过了,使用`express.static()`静态托管的目录 ,当我们访问时,不需要在URL中给出目录名

为了确保URL易理解, 系统易维护,我们可以**自定义一个路径的前缀**,我们在访问里面的资源时,需要在URL中补上这个路径前缀

```javascript
app.use('路径前缀',express.static('托管目录'))
```

**举个栗子** , 我托管了`files`目录下的静态资源, 我还想要别人访问时加上确切的URL路径,这样我在看到这个URL时,就能一眼看出资源的准确位置,我可以这样写

```javascript
app.use('/files',express.static('./files'));
```

访问时`http://127.0.0.1/files/index.html` 就这样



看个小的案例 ,同时托管两个目录, 访问`files`的资源时需要加上`files`目录名

```javascript
//导入express包
const express = require('express')
//新建一个服务器
const app = express()
//静态托管两个目录
app.use('/files',express.static('./files'))
app.use(express.static('./clock'))
app.listen(80,()=>{
    console.log('app is running at http:127.0.0.1')
})
```



### nodemon

#### 介绍

在编写调试Node.js项目时,如果我们经常对项目作出调试 , 我们需要频繁的去关闭服务器,启动服务器 , 非常繁琐

接下来, 就有了一个好用的小工具 , `nodemon` , 安装了这个小工具之后,我们每次修改项目代码,他就能够监听到项目文件的变动, 然后自动帮我们重启服务器, 非常NICE!

#### 安装

安装还用说嘛? 直接命令行 命令 , 记得一定要全局可用

```javascript
npm i nodemon -g;
```

#### 使用

之前我们启动服务, 是用的这个命令`node xxx.js` , 这样做的坏处上面也说了

现在我们把`node`命令替换为`nodemon`命令 , 使用`nodemon xxx.js `就可以启动项目 , 并且自动去监听这个文件的代码变动来重启服务

**注意** :是我们`ctrl+s`保存代码时,会帮我们重启服务



## Express路由

### 路由的概念

#### 什么是路由

广义上来讲,路由就是映射关系

![image-20220429123844599](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220429123844599.png)

#### Express中的路由

在Express中,路由指的是**客户端的请求和服务处理函数之间的映射关系**

Express中的路由分3部分组成,分别是**请求的类型 , 请求的URL地址 , 处理函数**

#### Express路由实例

这个就是我们前面经常用的例子

```javascript
//匹配GET请求,且请求URL为/
app.get('/',function(req,res){
    res.send('Hello world')
})
//匹配POST请求,且请求URL为/
app.post('/',function(req,res){
    res.send('GOT a POST request')
})
```

#### 路由的匹配过程

每当一个请求到达服务器之后, 需要先经过路由的匹配 , 只有匹配成功后 , 才会调用对应的处理函数

在匹配时,**按照路由的顺序进行匹配,如果请求的类型和URL同时匹配,则会执行对应的函数**来处理这次的请求

就是说,我们可以根据不同的请求类型和不同的URL,定义多个`app.get()`和`app.post()` , 当收到一个请求时, 按照刚才定义的顺序去匹配

![image-20220429124533066](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220429124533066.png)

**注意**

* 按照定义的先后顺序进行匹配
* 请求类型和请求URL同时匹配成功,才会调用相应的处理函数

### 路由的使用

#### 最简单的用法

也就是我们刚才说的那个示例代码

```javascript
const express = require('express')
//创建web服务器
const app = express()

//挂载路由
app.get('/',(req,res)=>{res.send('hello world')})
app.post('/',(req,res)=>{res.send('别发了,我收到了')})
//启动web服务器
app.listen(80,()=>{
    console.log('app is running at http://127.0.0.1')
})
```

但是这种方法我们一般很少使用, 你想想 , 加入我的项目结构很复杂 , 那岂不是需要些很多的`app.get()`和`app.post()`  , 整个代码的体量就会很大

#### 模块化路由

为了方便对路由进行模块化的管理,Express不建议将路由直接挂载到app上 , 而是**推荐将路由抽离为单位的模块** , 简单点说 , 就是我们把挂载路由的部分代码单独放到一个.js文件中

1. 创建路由模块对应的.js文件
2. 调用`express.Router()`函数创建路由对象
3. 向路由对象上挂载具体的路由
4. 调用`module.exports`向外共享这个路由对象
5. 使用`app.use()`函数注册路由模块

#### 创建路由模块

```javascript
var express = require('express')
var router = express.Router()
router.get('/user',(req,res) => {
    res.send('Get User list')
})
router.post('/user',(req,res) => {
    res.send('Post a request')
})
module.exports = router
```

#### 注册路由

在项目文件`.js` 引入路由模块 

```javascript
// 导入路由模块
const userRouter = require('./Router.js')
// 使用app.use() 注册路由模块 
app.use(userRouter)
```

这样访问`http://127.0.0.1/user`



#### 为路由模块添加前缀

类似于前面所说的静态资源托管 , 路由模块也支持添加前缀的方式

```javascript
//导入路由模块
const userRouter = require('./Router.js')
//调用app.use()注册路由模块 , 并添加统一的访问前缀 /api
app.use('/api',userRouter)
```

这样 , 当我们请求时,需要加上`api`前缀,`http://127.0.0.1/api/user`

## Express中间件

### 中间件的概念

#### 什么是中间件

特指业务流程的中间处理环节

中间价一般都输输入和输出, **上一级的输出作为下一级的输入**

举个现实生活中的例子

![image-20220429194046688](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220429194046688.png)

#### Express中间件的调用流程

当一个请求达到Express服务器之后,  可以连续调用多个中间件, 从而对这次请求进行预处理

![image-20220429194223562](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220429194223562.png)



#### Express中间件的格式

Express中间件的**本质就是一个function处理函数**

![image-20220429203824176](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220429203824176.png)

前面的路由函数的形参列表只包含`req,res`两个参数,

在中间件函数的形参列表中, 必须包含`next`参数

#### next函数的作用

`next`函数是多个中间件连续调用的关键 , 他表示把流转关系转交给下一个中间件或路由

`next`就好像是C语言中的一个指针 , 他指向下一个中间件或路由

![image-20220429204051311](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220429204051311.png)



### Express中间件初体验

#### 定义中间件函数

可以通过如下的方式, 定义一个最简单的中间件函数

```javascript
//常量mw 所指向的,就是一个中间件函数
const mw = function(req, res ,next){
    console.log('这是一个最简单的中间件函数')
    //注意, 在当前中间件的业务处理完毕后, 必须调用next()方法
    //表示把流转关系转交给下一个中间件或路由
    next();
}
```



#### 全局生效的中间件

**客户端发起的任何请求, 到达服务器之后 , 就会触发的中间件 ,叫做全局生效的中间件**

通过调用`app.use(中间件函数)` , 即可定义一个全局生效的中间件函数

```javascript
//常量mw 所指向的,就是一个中间件函数
const mw = function(req, res ,next){
    console.log('这是一个最简单的中间件函数')
    //注意, 在当前中间件的业务处理完毕后, 必须调用next()方法
    //表示把流转关系转交给下一个中间件或路由
    next();
}
app.use(mw)
```



#### 定义全局中间件的简化形式

```javascript
//全局生效的中间件的简化形式
app.use(function(req,res,next){
    console.log('这是一个中间件函数')
    next()
})
```



#### 中间件的作用

多个中间件之间 , **共享同一份req和res ** , 基于这样的特性 , 我们可以在上游的中间件中,统一为req或res对象添加自定义的属性或方法 , 供下游的中间件或路由进行使用

![image-20220429210318783](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220429210318783.png)

#### 定义多个全局中间件

当我们定义了多个全局中间件时 , 程序会按照全局中间件的顺序来依次处理

```javascript
const express = require('express')
const app = express()
//这是第一个全局中间件
app.use((req,res,next)=>{
    console.log('经过第一次处理')
    next()
})
//这是第二个全局中间件
app.use((req,res,next)=>{
    console.log('经过第二次处理')
    next()
})
app.get('/user',(req,res)=>{
    res.send('User page')
})
app.listen(80,()=>{
    console.log('app is running')
})
```



#### 局部生效的中间件

不使用`app.use()`定义的中间件 , 叫做局部生效的中间件

想要在哪个地方使用中间件函数, 直接在哪个地方调用即可

```javascript
const express = require('express')
const app = express()

//定义一个中间件函数
const m1 = (req,res , next)=>{
    console.log('我是一个局部生效的中间件')
    next()
}
//我们想要这个中间件函数只在第一个路由中生效
//只需要将这个中间件函数放在路由处理函数前面的参数位置即可
app.get('/',m1,(req,res)=>{
    res.send('Home page')
})

app.get('/user',(req,res)=>{
    res.send('user page')
})
app.listen(80,()=>{
    console.log('app is running')
})
```



#### 定义多个局部中间件

可以在路由中, 通过如下两种等价的方式 , 使用多个局部中间件

```javascript
//以下两种写法是完全等价的
app.get('/',m1,m2,(req,res)=>{res.send('HOme page')})
app.get('/',[m1,m2],(req,res)=>{res.send('HOMe Page')})
```

也是按照局部中间件的顺序去调用的



#### 了解中间件的5个使用注意事项

* **一定要在路由之前注册中间件** , 因为整个程序是从前到后执行的 , 如果中间价在路由之后, 那么久直接响应给客户端了 , 中间件就没有用了
* 执行完中间件的处理后, **千万别忘记调用`next()`函数**
* **调用完`next()`之后, 就不要再写多余的代码了**  , 因为执行到`next()`的时候,就已经转入下一个中间件或者路由了, `next()`后面的代码就屁用没有了



### 中间件的分类

为了方便使用 , Express官方把常见的中间件用法 , 分成了5大类 , 分别是

- **应用级别**的中间件
- **路由级别**的中间件
- **错误级别**的中间件
- Express **内置的中间件**
-  第三方的中间件

#### 应用级别的中间件

通过`app.use()`或`app.get()`或`app.post()` , 绑定到app实例上的中间件 , 叫做应用级别的中间件

```javascript
app.use((req,res,next)=>{
    console.log('经过第一次处理')
    next()
})
app.get('/',[m1,m2],(req,res)=>{
    res.send('Home page')
})
```



#### 路由级别的中间件

绑定到`express.Router()`实例上的中间件 , 叫做路由级别的中间件  , 他的用法和应用级别中间件相同.

只不过,应用级别的中间件是绑定到app实例上的 , 路由级别的中间件是绑定到`router`实例上, 

```javascript
const router = express.Router()

//路由级别的中间件
router.use(function(req,res,next){
    console.log('到达路由级别中间件')
    next()
})

app.use(router)
```



#### 错误级别的中间件

**作用: 专门用来捕获项目中发生的异常 , 从而防止项目异常崩溃**

**当项目中发生错误时 , 就会直接进入到错误级别的中间件 进行处理**

**格式** : 错误级别的中间件处理函数 , 必须有4个形参 , 且这四个形参的顺序不能乱,分别是`(err,req,res,next)`

```javascript
app.get('/',(req,res)=>{
    throw new Error('服务器内部发生错误')
    res.send('Home page')
})
app.use((err,req,res,next)=>{
    console.log('发生了错误:'+err.message)
    res.send('Error:'+err.message)
})
```

项目发生错误后, 直接进入错误级别中间件 

**注意** : 错误级别中中间件 , **必须注册在所有路由之后** , 否则无效



#### Express内置的中间件

自express4.16.0版本之后 , Express内置了3个常用的中间件 , 极大地提高了Express项目的开发效率和体验

* `express.static` 快速静态托管静态资源的内置中间件 ,  例如 , HTML 文件 , 图片 ,css样式
* `express.json`   解析JSON格式的请求体数据 
* `express.urlencoded` 解析URL-encoded格式的请求体数据

使用时只需要配置一下中间件即可

```javascript
//配置全局中间件
//配置解析application/json格式数据的内置中间件
app.use(express.json())
//配置解析application/x-www-form-urlencoded格式数据的内置中间件
//x-www-form-urlencode格式的数据就是表单数据
app.use(express.urlencoded({extended: false}))
```

看一个实例 , `express.json`的使用 , 向服务器发送一个json格式的数据

```javascript
const express = require('express')
const app = express()
//配置全局中间件
// 配置解析application/json格式数据的内置中间件
//通过这个中间件, 就会将解析出来的数据挂载到req.body身上
app.use(express.json())

app.post('/user', (req, res) => {
    //在服务器 , 可以使用req.body这个属性 
    //来接收客户端发送过来的请求体数据
    //默认情况下 , 如不配置解析表单数据的中间件 , 
    //则req.body默认等于undefined
    console.log(req.body)
    res.send('ok')
})
app.listen(80, () => {
    console.log('app is running')
})
```

`express.urlencoded`的使用, 向服务器发送一个`x-www-form-urlencoded`格式的数据

```javascript
const express = require('express')
const app = express()
//配置全局中间件

//配置解析application/x-www-form-urlencoded格式数据的内置中间件
//需要传一个配置对象 
//将解析出来的数据挂载到req.body身上
app.use(express.urlencoded({extended: false}))

app.post('/book',(req,res) =>{
    //在服务器端 , 可以通过req.body来获取json格式的表单数据和url-encoded格式的数据
    //url-encoded是一种键值对形式的数据
    console.log(req.body)
    res.send('OK')
})
app.listen(80, () => {
    console.log('app is running')
})
```

#### 第三方的中间件

非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置第三方中间件，从而提高项目的开发效率。

![image-20220430123214310](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220430123214310.png)

**注意**:  express内置的`express.urlencoded`中间件就是基于body-parser这个第三方中间件进一步封装出来的 , 4.16之后的版本就不需要安装上面提到的那个插件了



### 自定义中间件

#### 需求描述与实现步骤

自己手动模拟一个类似于`express.urlencoded`这样的中间件 , 来解析POST提交到服务器的表单数据

实现步骤

1. 定义中间件
2. 监听 req 的 data 事件
3. 监听 req 的 end 事件
4. 使用 querystring 模块解析请求体数据
5. 将解析出来的数据对象挂载为 req.body
6. 将自定义中间件封装为模块

#### 定义中间件

使用`app.use()`来配置全局中间件

```javascript
app.use((req,res,next){
	//.....        
})
```

#### 监听req的data事件

在中间件中国 , 需要监听req对象的data事件, 来获取客户端发送到服务器的数据

如果数据量比较大 , **无法一次性发送完毕 , 则客户端会把数据切割后** , 分批发送到服务器

所以data事件可能会触发多次 , 每一次触发data事件 , **获取到数据只是完整数据的一部分,** 需要手动对接收到的数据进行拼接

```javascript
    //待拼接的字符串
    let str = ''
    req.on('data',(chunk) =>{
        str += chunk;
    })
```



#### 监听req的end事件

当请求体数据**接收完毕**之后, 会自动触发req的end 事件

因此我们可以在req的end事件中 , **拿到并处理完整的请求体数据**



#### 使用querystring模块解析请求体数据

Node.js内置了一个`querystring`模块 , 专门用来处理查询字符串, 通过这个模块提供的`parse()`函数 , 可以轻松把**查询字符串, 解析成对象的格式**

```javascript
    req.on('end',()=>{
        //在str中存放的是完整的数
        // console.log(str)
        //把字符串解析为对象格式
        const body = qs.parse(str)
        console.log(body)
    })
```

整体代码

```javascript
const express = require('express')
const res = require('express/lib/response')
const qs = require('querystring')
const app = express()
//这是解析表单数据的中间件
app.use((req,res,next)=>{
    //定义中间件的逻辑处理
    //待拼接的字符串
    let str = ''
    req.on('data',(chunk) =>{
        str += chunk;
    })
    req.on('end',()=>{
        //在str中存放的是完整的数
        // console.log(str)
        //把字符串解析为对象格式
        const body = qs.parse(str)
        console.log(body)
        req.body = body
        next()
    })
})
app.post('/user',(req,res)=>{
    res.send(req.body)
})
app.listen(80,()=>{
    console.log('app is running')
})
```



#### 将解析出来的数据对象挂载为req.body

因为整个过程中, 中间件和路由共享同一份`req`和`res` , 所以可以在上游中间件中挂载自定义属性

```javascript
red.body = body
```



#### 将自定义中间件封装为模块

为了优化代码结构, 我们把自定义的中间件函数 , 封装为独立的模块, 向外共享这个函数

```javascript
const qs = require('querystring')
//定义一个中间件函数
my_urlencoded = (req,res,next)=>{
    //定义中间件的逻辑处理
    //待拼接的字符串
    let str = ''
    req.on('data',(chunk) =>{
        str += chunk;
    })
    req.on('end',()=>{
        //在str中存放的是完整的数
        // console.log(str)
        //把字符串解析为对象格式
        const body = qs.parse(str)
        console.log(body)
        req.body = body
        next()
    })
}
module.exports = {
    my_urlencoded
}    
```





## 使用Express写接口

到此为止, Express的基本使用已经了解的差不多了 

汇总一下整个Express的基本使用

### 创建基本的服务器

```javascript
const express = require('express')
//创建一个服务器实例
const app = express()

//导入路由模块


//启动服务
app.listen(80,()=>{
    console.log('server is running ')
})
```

### 创建API路由模块

将服务器的路由封装为一个独立的模块

```javascript
const express = require('express')
//创建实例路由
const apiRouter = express.Router()

//.....

//向外共享这个路由
module.exports = {
    apiRouter
}

```

### 编写GET接口

在路由模块中编写GET接口

```javascript
apiRouter.get('/get',(req,res) =>{
    //通过req.query获取用户端通过查询字符串,发送到服务器的数据
    const query = req.query
    //调用res.send()方法 , 向客户端响应处理的结果
    res.send({
        status: 0,
        msg: 'Get请求成功',
        data: query //原封不动的返回
    })
})
```



### 编写POST接口

在路由模块中编写POST 接口

```javascript
//想要获得请求体的数据,必须要配置中间件
apiRouter.post('/post',(req,res)=>{
    //通过req.body获得请求体
    const body = req.body
    res.send({
        status: 0,
        msg: 'Post请求成功',
        data: body
    })
})
```

### CORS跨域资源共享

#### 接口的跨域问题

刚才编写的GET和POST接口, 存在一个很严重的问题,, 不支持**跨域请求**

当我们在使用浏览器打开一个HTML文件时 , 在页面中点击按钮来发起请求 , 就会报错.

因为, 我们打开HTML文件是按照`file`协议 , 而请求服务器接口却使用的是`http`协议 , 协议不统一,所以会产生跨域问题

只要是协议,域名或端口号上的不同 , 就会产生跨域问题



解决接口跨域问题的方案主要有两种

* CORS (主流的解决方案 , 推荐使用)
* JSONP (有缺陷的解决方案 , **只支持GET请求)**



#### 使用cors解决跨域问题

CORS是Express的一个第三方中间件 , 通过安装和配置CORS中间件 , 可以很方便地解决跨域问题

还是基本的老套路

1. 安装cors , `npm i cors`
2. 导入cors , `const cors = require('cors')`
3. 在路由之前配置cors , 调用`app.use(cors)`配置中间件



#### 什么是CORS

CORS(Cross-Orign Resource Sharing ,跨域资源共享)由一系列**HTTP响应头**组成 , 这些**HTTP响应头决定浏览器是否阻止前端JS代码跨域获取资源**

浏览器的**同源安全策略**默认会阻止网页跨域资源获取 , 但如果接口服务器配置了**CORS相关的HTTP响应头** , 就可以**解决浏览器端的跨域访问限制**

![image-20220502175528741](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220502175528741.png)

#### CORS的注意事项

- CORS 主要在服务器端进行配置。客户端浏览器**无须做任何额外的配置**，即可请求开启了 CORS 的接口。
- CORS 在浏览器中有兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE10+、Chrome4+、FireFox3.5+）

#### CORS响应头部

1.  -Access-Control-Allow-Origin

响应头部中可以携带一个`Access-Control-Allow-Orign`字段

语法:

```c
Access-Control-Allow-Orign: <origin> | *
```

`<origin>` : 参数指定了允许访问该资源的外域URL

**举个栗子** : 下面的字段值 只允许来自`http:itkkk.blog.csdn.net`的请求

```c
res.setHeader('Access-Control-Allow-Orign','http://itkkk.blog.csdn.net')
```

`通配符*`表示允许来自任何域的请求

```c
res.setHeader('Access-Control-Allow-Origin','*')
```



2. -Access-Control-Allow-Headers

默认情况下 , CORS**仅**支持客户端向服务器发送如下的9个请求头

Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）

如果客户端向服务器**发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败！**

**举个栗子**

```c
//允许客户端向服务器发送Content-Type请求头和X-Custom-Header请求头
//注意 : 多个请求头之间使用英文逗号进行分隔
res.setHeader('Access-Control-Allow-Headers','Content-Type,X-Custom-Header')
```



3. -Access-Control-Allow-Methods

默认情况下 , Cors仅支持客户端发起GET , POST ,HEAD 请求

如果客户端希望通过`PUT,DELETE`等方式请求服务器的资源 , 则需要在服务器端,通过`Access-Control-Allow-Methods`来**指明实际请求所允许使用的HTTP方法**

**举个栗子**

```c
//只允许POST , GET , DELETE , HEAD请求方法 
res.setHeader('Access-Control-Allow-Methods','POST,GET,DELETE,HEAD')
//允许所有的HTTP请求方法    
res.setHeader('Access-Control-Allow-Methods','*')    
```



#### CORS请求的分类

客户端在请求CORS接口时 , 根据请求方式和请求头的不同 , 可以将CORS的请求分为两大类, 分别是

1. 简单请求
2. 预检请求



#### 简单请求

同时满足以下两大条件的请求 , 就属于简单请求

1. **请求方式** : GET , POST ,HEAD三者之一
2. **HTTP头部信息** 不超过以下几种字段: **无自定义头部字段**, Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）

#### 预检请求

只要符合任何一个条件的请求 , 都需要进行预检请求

1. 请求方式为**GET, POST ,HEAD之外的请求Method类型** 
2. 请求头中包含自定义头部字段
3. 向服务器发送了**application格式的数据**

在浏览器与服务器正式通信之前 , 浏览器会发送OPTION请求进行预检 ,以获知服务器是否允许该实际请求 , 所以这一次的OPTION请求称为"预检请求" ,, **服务器成功响应预检请求后 , 才会发送真正的请求 , 并且携带真实数据**



#### 简单请求和预检请求的区别

**简单请求的特点: ** 客户端与服务器之间只会发生一次请求

**预检请求的特点**: 客户端与服务器之间会发生两次请求 , **OPTIION预检请求成功之后 , 才会发起真正的请求**







### JSONP接口

#### 什么是JSONP

概念**: 浏览器通过`<script>`标签的`src`属性  , 请求服务器上的数据 , 同时服务器返回一个函数的调用 . 这种请求数据的方式叫做JSONP**

**通俗点说,就是浏览器通过`<script>`标签向服务器发送一个函数的名字, 希望服务器返回这个函数的调用 , 在调用期间将数据传进来处理即可**

**特点**

1. JSONP不属于真正的AJAX请求 , 因为他没有使用`XMLHttpRequest`这个对象
2. JSONP仅支持GET请求 , 不支持POST , PUT , HEAD等请求

#### 创建JSONP接口的注意事项

**如果项目中已经配置了CORS跨域资源共享 , 为了防止冲突 , 必须在配置CORS中间件之前声明JSONP的接口 . 否则 JSONP接口会被处理成开启了CORS的接口**

```c
//优先创建 JSONP 接口[这个窗口不会被处理成CORS 接口]
app.get('/api/jsonp',(req,res) =>{})
    
//再配置CORS中间件 [后续的所有接口,都会被处理成CORS接口]    
app.use(cors())    

//这是一个开启了CORS 的接口
app.get('/api/get',(req,res)=>{})    
```



#### 实现JSONP接口的步骤

1. **获取客户端发送过来的回调函数的名字**
2. 得到要通过 JSONP 形式发送给客户端的数据
3. 根据前两步得到的数据，拼接出一个函数调用的字符串
4. 把上一步拼接得到的字符串，响应给客户端的 `<script> `标签进行解析执行

```javascript
// 必须在配置 cors 中间件之前，配置 JSONP 的接口
app.get('/api/jsonp', (req, res) => {
  // TODO: 定义 JSONP 接口具体的实现过程
  // 1. 得到函数的名称
  const funcName = req.query.callback
  // 2. 定义要发送到客户端的数据对象
  const data = { name: 'zs', age: 22 }
  // 3. 拼接出一个函数的调用 , 这里面是函数的调用
  const scriptStr = `${funcName}(${JSON.stringify(data)})`
  // 4. 把拼接的字符串，响应给客户端
  res.send(scriptStr)
})
```





#### 在网页中使用jQuery发起JSONP请求

前面讲了JSONP的基本使用 , 现在一个小实例 , 通过jquery发起JSONP请求

调用`$.ajax()`函数 , 提供JSONP的配置选项 , 从而发起JSONP请求

```javascript
        // 4. 为 JSONP 按钮绑定点击事件处理函数
        $('#btnJSONP').on('click', function () {
          $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1/api/jsonp',
            dataType: 'jsonp',
            success: function (res) {
              console.log(res)
            },
          })
        })
```





# Web开发模式

目前主流的Web开发模式有两种 , 分别是

1. 基于**服务端渲染** 的传统Web开发模式
2. 基于**前后端分离** 的新型Web开发模式

## 服务端渲染

服务端渲染的概念

**服务器发送给客户端的HTML页面 , 是在服务器通过内容拼接, 动态生成的** , 因此客户端不需要使用**ajax**这样的额外技术来请求页面数据

### 服务端渲染的优缺点

#### 优点

1. **前端耗时少** , 服务器负责动态生成HTML内容 , 浏览器只是直接渲染页面即可,尤其是移动端,更省电
2. **有利于SEO**  , 因为服务器响应给客户端的是完整的HTML页面内容 , 所以爬虫更容易获取信息, 更有利于SEO

#### 缺点

1. **占用服务端资源** , 即服务器端完成HTML页面内容的拼接 , 如果请求过多 , 会对服务器造成一定的访问压力
2. **不利于前后端分离 , 开发效率低** , 使用服务器端渲染 , 则无法进行分工合作 , 尤其是对于**前端复杂度高**的项目 , 不利于项目高效开发

## 前后端分离的web开发模式

前后端分离的概念 

**前后端分离的开发模式 , 依赖于Ajax技术的广泛应用 , 简而言之 , 前后端分离的Web开发模式 , 就是后端只负责提供API接口 , 前端 使用Ajax调用接口的开发模式**

### 优缺点

#### 优点

1. **开发体验好** , 前端专注于UI页面的开发 , 后端专注于API的开发 , 且后端有更多的选择性
2. **用户体验好** , Ajax技术的广泛应用 , 极大地提高了用户的体验 , 可以轻松实现页面的局部刷新
3. **减轻了服务端的渲染压力** , 页面最终是在每个用户的浏览器生成的, 不再是服务器生成的了

#### 缺点

**不利于SEO** , 因为完成的HTML页面需要在客户端动态拼接完成 , 所以爬虫无法爬取有效的信息.

但是可以使用Vue, React等前端框架的SSR技术很好地解决SEO问题



## 如何选择Web开发模式

web开发模式的选择要根据不同的业务场景

* 比如**企业级网站** , 主要功能是展现内容,而没有复杂的交互,并且需要良好的SEO, 则这时我们可以选择服务端渲染
* 而类似于**后台管理项目** , 交互性比较强 , 需要不断地更新数据 , 不需要考虑SEO, 那么可以选择前后端分离的开发模式

具体使用哪种开发模式不是绝对的

比如说, **为了同时兼顾首页的渲染速度和前后端分离的开发效率**, 有些网站采用 **首页服务器端渲染+ 其他页面前后端分离**的开发模式



# 连接MySQL数据库

在学习Java的JDBC时, 需要导入一个第三方的驱动`jar`包 , 在Node.js中也差不多 , 需要导入`mysql`模块

## 为什么需要导入模块

首先你要知道市面上大大小小的数据库产品几十款 , 每一款的开发商都不一样 , 每一款数据库的底层实现也是不一样 . 

假如让每一个程序员都根据每一款数据库产品写一套API , 肯定是不太现实的 . 

所以Node.js官方给出API的设计规范 , 每一个厂商都根据设计规范自主开发一套API , 并封装成模块.

这样, 程序员连接你家的数据库产品时 , 只需要导入这些封装好的API即可.

## 在Node.js中操作数据库

### 导入模块

```javascript
//安装模块
npm i mysql
//导入模块
const mysql = require('mysql');
```

### 获取链接

首先通过`createConnection()`方法注册链接 , 返回一个链接的对象

接着调用此对象的`connect()` 向数据库发起链接

```javascript
//返回一个链接对象
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'my_db'
})
connection.connect()
```

参数名

* `host` 主机域名
* `user` 用户名
* `password` 数据库密码
* `database` 指明我要连接哪一个库

在使用`connection.connect()`连接数据库时,可能连接不上 , 这是就会报错,可以使用回调函数来处理

```javascript
connection.connect(function(err){
    if(err)
        return console.log('连接失败!'+err.message);
    console.log('连接成功')
})
```



### 操作数据库

通过`connection.query()`来执行sql语句

```javascript
connection.query('select * from user',function(err,results){
    //查询失败
    if(err)
        return console.log(err.message)
   //查询成功
    console.log(results)
})
```

第一个参数是待执行的sql语句 

第二个参数是回调函数,这个回调函数的两个参数

1. 第一个参数`err`是一个错误对象, 当sql语句执行失败时, 会生成一个错误对象 , 传递给回调函数, 等待处理; 当sql执行成功时, `err = null`;
2. 第二个参数是`results` , sql操作成功后会返回一个结果集 , 当sql语句执行失败时, `results=null`

**若执行的是查询操作 , results为一个数组 , 一行为一个单位**

![image-20220505222329831](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220505222329831.png)

**其他的操作 , results则为一个包含执行后状态的对象**

![image-20220505222351667](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220505222351667.png)



### 预编译语句

前面的sql语句是通过字符串直接写好的 , sql语句是写死的 , 不能再变了 ,如果向再次执行类似的语句还要重新写一遍

这时候可以使用预编译的语句

```sql
var sqlStr = 'insert into users values(?,?,?)'
```

像这样, 在参数的位置使用问号`?`充当一个占位符 , 后期使用时只需要替换问号`?`的地方即可

在调用`connection.query()`方法时 , 需要传入预编译的sql语句 ,

如果只有一个`?`占位符, 那么第二个参数可以是数值型, 字符串  ,  对象等

```javascript
var sqlStr = 'select * from users where id = ?'
connection.query(sqlStr,2,function(){
    if(err)
        return console.log('操作失败')
    console.log(results)
})
```

如果有多个`?`占位符, 可以传入一个数组, 数组内的元素与占位符一一对应

```javascript
var sqlStr = 'insert into users values(?,?,?)'
connection.query(sqlStr,[5,'小王','10086'],function(err,result){
    if(err)
        return console.log('操作失败')
   	if(err.affectedRows==1)
        console.log('插入数据成功')
})
```

**插入数据的快捷方式**

如果数据对象的每个属性和表中的字段一一对应 , 那么可以直接传入一个对象

```javascript
var sqlStr = 'insert into users set ?';
var u{
    id: 10,
    uname:'小李',
    ph_num: '10000'    
}
connection.query(sqlStr,u,(err,results)=>{
	if(err)
        return console.log('操作失败')
    console.log(results);
}
)
```



### 关闭链接

当数据库操作完成之后,  要及时关闭链接 , 防止连接占用大量的资源

调用`connection.end()`方法来关闭连接











# 身份认证

这个概念大家肯定都懂 ,就是通过各种手段, **完成对用户身份的确认**

比如说, **手机验证码登录 , 邮箱密码登录 , 二维码登录**.....

## 不同开发模式下的身份认证

对于服务端渲染和前后端分离这两种开发模式,分别有不同的身份认证方案

1. **服务端渲染** 推荐使用**Session认证机制**
2. **前后端分离** 推荐使用**JWT认证机制**



## Session认证机制

### HTTP协议的无状态性

HTTP协议的无状态性 , 是指**客户端每次HTTP请求都是独立的** , 连续多个请求之间没有直接的联系 , 服务器不会主动保留每次HTTP请求的状态

### 突破HTTP无状态的限制

在Web开发中使用**`Cookie`** 来突破HTTP无状态限制

#### 什么是Cookie

**`Cookie`是存储在用户浏览器中的一段不超过 4KB 的字符串** , 它是由**键值对**的形式和其他几个用于控制Cookie**有效期, 安全性 , 使用范围**的可选属性组成的

**不同域名下的Cookie各自独立** ,每当客户端发起请求时, **会自动把当前域名下的所有未过期Cookie一同发送给服务器**

**Cookie的几大特性**

1. **自动发送**
2. **域名独立**
3. **过期时限**
4. **4KB限制**



#### Cookie在身份认证中的作用

客户端**第一次请求**服务器的时候, 服务器通过**响应头的形式** ,向客户端发送一个身份认证的Cookie ,客户端会自动将Cookie保存在浏览器中

随后, 每当客户端浏览器再次发起请求时, 浏**览器会自动将身份认证相关的Cookie , 通过请求头的形式发送给服务器** , 服务器即可验证用户身份



![image-20220503193555462](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220503193555462.png)

#### Cookie具有不安全性

**由于Cookie是存储在浏览器中 , 而且浏览器也提供了读写Cookie的API , 因此Cooki很容易被认为的修改,不具有安全性**

因此,不建议服务器将重要的隐私数据, 通过Cookie的形式发送给浏览器

可以使用**客户端浏览器Cookie + 服务器识别认证** 来提高安全性



#### Session工作原理

![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220503193900923.png)



### 在Express中使用Session

在Express项目中 , 只需要安装`express-session`中间件 , 即可在项目中使用Session认证

安装`express-session`中间件

```javascript
npm i express-session
```

#### 配置express-session中间件

使用`app.use()`来注册session中间件

```javascript
// 导入session中间件
const session = require('express-session')
//配置session中间件
app.use(session({
    secret: 'lmk',//secret属性的值可以为任意字符串
    resave: false,//固定写法
    saveUninitialized: true//固定写法
}))
```



#### 向session中存数据

当`express-session`中间件配置成功后 ,才能通过`req.session`对象来访问和使用session对象,从而存储用户的关键信息

```javascript
// 登录的 API 接口
app.post('/api/login', (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({ status: 1, msg: '登录失败' })
  }

  // TODO_02：请将登录成功后的用户信息，保存到 Session 中
  // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
    //req.session内的变量是可以自定义的
  req.session.user = req.body // 用户的信息
  req.session.islogin = true // 用户的登录状态

  res.send({ status: 0, msg: '登录成功' })
})
```

#### 从session中取数据

可以直接从`req.session`对象上获取之前存储的数据

```javascript
// 获取用户姓名的接口
app.get('/api/username', (req, res) => {
  // TODO_03：请从 Session 中获取用户的名称，响应给客户端
  if (!req.session.islogin) {
    return res.send({ status: 1, msg: 'fail' })
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username,
  })
})
```



#### 清空session

调用`req.session.destroy()`函数 , 即可清空服务器保存的session信息

```javascript
// 退出登录的接口
app.post('/api/logout', (req, res) => {
  // TODO_04：清空 Session 信息
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出登录成功',
  })
})
 
```



### JWT认证机制

#### Session认证的局限性

Session认证机制**需要配合Cookie才能实现**。由于 Cookie 默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口的时候，**需要做很多额外的配置**，才能实现跨域 Session 认证。

注意：

- 当前端请求后端接口**不存在跨域问题**的时候，**推荐使用** **Session** 身份认证机制。
- 当前端需要跨域请求后端接口的时候，不推荐使用 Session 身份认证机制，推荐使用 JWT 认证机制。

#### 什么是JWT

JSON Web Token的缩写 , 是目前最流行的跨域认证解决方案

#### JWT工作原理

![image-20220504210452645](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20220504210452645.png)

用户首次登录时, 服务器经过加密会生成一个Token字符串 , 服务器将这个Token字符串响应给客户端, 客户端将Token存储在LocalStorage或SessionStorage中

客户端再次发起请求时,通过请求头的`Authorization`字段, 将Token发送给服务器, 服务器把Token还原成用户的信息对象 , 根据不同的用户身份响应不同的内容

#### JWT的组成部分

JWT字符串通常由三部分组成 , 分别是**Header(头部)** , **Payload(有效荷载)** , **Signature(签名)**

三者之间英文的 点 `.`分隔, 只是为了起分隔作用

```javascript
Header.Payload.Signature
```

注意

* **Payload**部分才是真正的用户信息 , 他**是用户信息经过加密之后生成的字符串**
* Header和Signature是**安全相关的部分** , 只是为了保证Token的安全性

#### JWT的使用方式

客户端收到服务器返回的JWT之后 , 通常会将它存储在**localStorage** 或 **sessionStorage**中

此后 , 客户端每次与服务器通信, 都会带上这个JWT字符串 , 从而进行身份认证

推荐的做法是**将JWT放在HTTP请求头的Authorization字段中** , 格式如下

```javascript
Authorization: Bearer <token>
//必须要加一个Bearer否则不能正常解析    
```



### 在express中生成Token

首先第一步 , 还是安装包 , 需要安装两个包

```
npm i jsonwebtoken express-jwt
```

其中:

- **jsonwebtoken** 用于**生成JWT字符串**
- **express-jwt** 用于将**JWT字符串解析还原成JSON对象**



#### 定义secret密钥

为了**保证JWT字符串的安全性**, 防止JWT字符串在网络传输过程中被别人破解 , 我么需要定义一个用于加密和解密的secret密钥

1. 当生成JWT字符串时, 需要使用secret密钥对用户信息进行**加密** , 最终得到加密好的JWT字符串
2. 当把JWT字符串解析成JSON对象时, 需要使用同一个secret密钥进行解密

就是定义一个字符串, 这个字符串越复杂越好

```
const secretKey = 'liu_ming&kai!'
```

#### 生成JWT字符串 

调用`jsonwebtoken`包中的`sign()`方法 , 将用户的信息加密成JWT字符串 , 响应给客户端

```javascript
//定义一个密钥
const secretKey = 'liu_ming&kai!'
// 调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
// 参数1：用户的信息对象
// 参数2：加密的秘钥
// 参数3：配置对象，可以配置当前 token 的有效期 , 30s---30秒内有效
//		30h ---30小时内有效
const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' })
  res.send({
    status: 200,
    message: '登录成功！',
    token: tokenStr, // 要发送给客户端的 token 字符串
  }) 
```

**记住：千万不要把密码加密到 token 字符中**

#### 解析JWT字符串

将JWT字符串还原为JSON对象

客户端每次在访问那些有权限接口的时候 , 需要主动地在**请求头中的Authorization** , 将Token字符串发送给服务器进行认证

可以通过`express-jwt`这个中间件 , 自动将客户端发送过来的Token解析成JSON对象

```javascript
//使用app.use()来注册中间件
//expressJWT({secret: secretKey}) 就是中间件
//.unless({path:[/^\/api\//]}) 用来指定哪些接口不需要设定访问权限
app.use(expressJWT({secret:secretKey}).unless({path:[/^\/api\//]}))
```

当express-jwt这个中间件配置成功后 , `req` 中就会多一个`user`对象 ,通过`req.user`对象访问从JWT字符串中解析出来的用户信息

```
//只要配置完express-jwt中间件后,就会将解析出来的用户信息挂载到req.user对象身上
// 使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
console.log(req.user)
res.send({
   status: 200,
   message: '获取用户信息成功！',
   data: req.user, // 要发送给客户端的用户信息
})
```

#### JWT解析错误

当使用 express-jwt 解析 Token 字符串时，如果客户端发送过来的 Token 字符串**过期**或**不合法**，会产生一个**解析失败**的错误，影响项目的正常运行。我们可以通过 **Express** **的错误中间件**，捕获这个错误并进行相关的处理，示例代码如下：

```javascript
//使用app.use()注册一个错误中间件
//捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token',
    })
  }
  res.send({
    status: 500,
    message: '未知的错误',
  })
})
```













































