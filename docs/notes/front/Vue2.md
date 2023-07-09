# 简介

## 特性

主要体现在两个方面：

- **数据驱动视图**
- **双向数据绑定**



### 数据驱动视图

![image-20230521085834954](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521085834954.png)

**好处是单数据发生变化，会重新渲染数据**

*数据驱动视图就是单向数据绑定，即js对象中的数据要绑定到页面上，Js对象身上的数据发生了变化，那么就会自动同步到页面上*

在没有数据驱动视图前，我们需要先获取到DOM，然后通过innerHTML或innerText来修改页面上的数据，很难做到js对象中的数据时刻与页面数据保持一致。



### 双向数据绑定

在填写表单时，是页面上的数据发生了变化，Vue监听到数据发生了变化，就会自动同步到JS对象中。、

![image-20230521090309273](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521090309273.png)

*双向数据绑定使得我们无需操作DOM就能获取到表单的数据*

如果没有双向数据绑定，我们用普通的方法，首先要获取input元素，然后通过input.value获取表单中的数据，然后赋值给js中的对象留着ajax用。









## MVVM

**MVVM是Vue实现*数据驱动视图*和*双向数据绑定*的核心原理**

MVVM是Model、View、ViewModel的简写

每个HTML页面都被拆分为这三部分：

- Model表示当前页面所依赖的数据源
- View当前页面渲染的DOM结构
- ViewModel表示Vue实例，他是MVVM的核心

![image-20230521102604685](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521102604685.png)





# 基本使用

1. 在HTML中引入vue.js
2. 创建Vue实例
3. Vue实例挂载

```html
<body>
  <div id="app">{{ username }}</div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        username: '张三'
      }
    })
  </script>
</body>
```

**导入vue.js文件后，就能使用Vue的构造函数，通过new来创建一个Vue实例，创建时，传入一个配置对象，配置对象中的el属性是一个选择器，用来指定要控制的DOM元素，data属性是Vue实例身上的数据**

**通过Vue中的插值表达式{{}}来访问Vue实例身上的数据，即配置对象中data对象中的属性**



*如果el选择器选中的元素有多个，那么只有第一个元素才能生效*





## Vue指令

![image-20230521103907014](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521103907014.png)



### 内容渲染指令

用来渲染DOM元素中的内容，常用的3个内容渲染指令：

- v-text
- {{ }}
- v-html



#### v-text

**v-text的内容会被当做文本渲染到元素内部**

**会覆盖原有的DOM元素中的内容**

```html
<div id="app">
    <p v-text="username"></p>
    <p v-text="txt">我是DOM元素中的文本</p>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            username: '张三',
            txt: '我是Vue实例中的文本'
        }
    })
</script>
```





#### 插值表达式{{ }}

插值表达式，相当于占位符，只是将{{}}的位置替换为目标数据

```html
<div id="app">
    <h1>姓名:{{username}}</h1>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            username: '张三',
            txt: '我是Vue实例中的文本'
        }
    })
</script>
```

**v-text和{{}}都是直接文本渲染，不能对文本中的html元素进行解析**

**注意**：

- **插值表达式{{ }}只能用在标签体内，不能用在标签的属性中**





#### v-html

**如果需要对文本中的html元素进行解析，使用v-html指令**

```html
<div id="app">
    <p v-html="txt"></p>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            txt: '<h1>你好我是张三</h1>'
        }
    })
</script>
```

![image-20230521104949245](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521104949245.png)



### 属性绑定指令

#### v-bind

如果需要为标签的属性绑定值，即vue实例身上的值绑定给DOM元素的属性。

可以使用v-bind指令

```html
  <div id="app">
    <input v-bind:placeholder="txt" type="text">
    <img v-bind:src="png" v-bind:width="imgWidth">
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        txt: '请输入用户名',
        png: '/imgs/headimg.jpg',
        imgWidth: '150px'
      }
    })
  </script>
```

![image-20230521110830459](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521110830459.png)







**使用了v-bind绑定属性值后，那么该属性引号中的内容就是js表达式，不再是字符串了**



**v-bind指令可以简写为`:`**

上面的代码可以简化为：

```html
  <div id="app">
    <input :placeholder="txt" type="text">
    <img :src="png" :width="imgWidth">
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        txt: '请输入用户名',
        png: '/imgs/headimg.jpg',
        imgWidth: '150px'
      }
    })
  </script>
```





#### js表达式

**在插值表达式和属性绑定中，可以进行js表达式**

```html
<div id="app">
    <h3>{{ msg + '！确实！' }}</h3>
    <p>{{ msg > 10 ? '太贵了': '便宜'}}</p>
    <input :placeholder="msg.split('').reverse()">
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            msg: '我是大傻逼',
            price: 9.9
        }
    })
</script>
```

![image-20230521111717972](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521111717972.png)





### 事件绑定指令

#### v-on指令

**v-on指令来绑定元素的事件**

**利用v-on来绑定事件，需要我们自定义事件处理函数，应该定义在methods属性中**

```html
  <div id="app">
    <button v-on:click="fun">点我</button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
      },
      methods: {
        fun() {
          alert('点我干嘛')
        }
      }
    })
  </script>
```



![image-20230521112129392](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521112129392.png)

**我们在创建Vue实例时，传入了一个配置对象，这个配置对象中的内容会被Vue实例代理，也就是说这些属性直接挂载到了Vue实例上**

在方法中打印一下this，就是此vue实例

```html
  <div id="app">
    <button v-on:click="fun">点我</button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        msg: 'zhagnsan'
      },
      methods: {
        fun() {
          console.log(this)
        }
      }
    })
  </script>
```

![image-20230521113931563](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521113931563.png)



**所以，在方法中可以通过this来访问data中的数据**

```html
  <div id="app">
    <p>{{ num }}</p>
    <button v-on:click="fun">点我</button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        num: 0
      },
      methods: {
        fun() {
          this.num++
        }
      }
    })
  </script>
```

![image-20230521114101184](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521114101184.png)







#### 事件传参

**v-on可以简写为@**

**在绑定事件时，可以通过调用函数的方式来传参，只需要在函数定义时给出形参来接受即可**

```html
<div id="app">
    <p>{{ num }}</p>
    <button @click="fun(2)">点我</button>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            num: 0
        },
        methods: {
            fun(n) {
                this.num += n
            }
        }
    })
</script>
```

![image-20230521114412300](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521114412300.png)













#### 事件对象

**在学习BOM中的事件时，我们知道会有一个事件对象，这个对象中封装了事件的所有信息。**

那么如何在自定义的事件处理函数中接受这个事件对象呢？

**注意：在绑定事件时**

- `@click="fun"`是绑定事件处理函数，浏览器来调用，浏览器会负责传参（事件对象）
- `@click="fun()"`是调用事件处理函数

以上两种方式的原理是不同的。

我们在BOM中绑定事件处理函数时，第一个形参就是事件对象。

**在绑定事件处理函数时，是绑定，不是调用的方式，那么系统来调用这个事件处理函数，就会将事件对象传递给函数，在函数上使用形参来接受这个事件对象**

```html
  <div id="app">
    <p>{{ num }}</p>
    <button @click="fun">点我</button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        num: 0
      },
      methods: {
        fun(e) {
          console.log(e)
        }
      }
    })
  </script>
```

![image-20230521115103893](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521115103893.png)



**但是，在事件函数中，我既想要事件对象，又想要自定义传参，该怎么办**

既然是自定义传参，那么就需要通过调用的方式来绑定事件，那么该如何获取到事件对象呢？

```html
// 调用函数
<button @click="fun(1,2)"></button>
```

**在Vue中提供了一个内置对象`$event`，这个就是原生的事件对象** 

**所以在传参时，我们只需要将`$event`传过去就好了**

**而且形参顺序无关**

```html
<div id="app">
    <p>{{ num }}</p>
    <button @click="fun($event,1,2)">点我</button>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            num: 0
        },
        methods: {
            fun(e, a, b) {
                console.log(e)
                console.log(a + b)
            }
        }
    })
</script>
```

![image-20230521115812535](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521115812535.png)





#### 事件修饰符

在绑定事件时，同时修饰该事件

例如，阻止事件的默认行为，普通是这样做的

阻止a链接跳转的行为，原生是通过事件对象来阻止的

```html
<div id="app">
    <a href="http://baidu.com" @click="fun">点我一下试试</a>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
        },
        methods: {
            fun(e) {
                // 通过事件对象来阻止事件默认行为
                e.preventDefault();
            }
        }
    })
</script>
```

**利用vue提供的事件修饰符**

```html
  <div id="app">
    <a href="http://baidu.com" @click.prevent="fun">点我一下试试</a>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
      },
      methods: {
        fun() {
          console.log('我被阻止了');
        }
      }
    })
  </script>
```

**Vue提供的事件修饰符**

| 修饰符   | 说明                                       |
| -------- | ------------------------------------------ |
| .stop    | **阻止事件冒泡**                           |
| .prevent | **阻止事件默认行为**                       |
| .capture | 事件捕获，以捕获模式触发当前的事件处理函数 |
| .self    | 将事件绑定到自身，只有自身才能触发         |
| .once    | 事件只触发一次                             |

**在绑定事件时，直接添加上面的修饰符即可**

```html
<button @click.stop="fun"></button>

<button @click.once="myFun"></button>
```







#### 按键修饰符

**在键盘事件时，我们经常需要判断键盘事件触发的是哪一个按键**

例如：只有当输入框中按下了esc，才触发事件

```html
<div id="app">
    <input @keyup.esc="clearInput" type="text">
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
        },
        methods: {
            clearInput(e) {
                e.target.value = ''
            }
        }
    })
</script>
```

**Vue为大部分常用的按键都提供了别名**

- `.enter`
- `.tab`
- `.delete` (捕获“Delete”和“Backspace”两个按键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

系统自带的修饰符

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`



**鼠标事件修饰符**

- `.left`
- `.right`
- `.middle`



**注意：按键修饰符只能在绑定按键事件时使用，例如键盘敲击、鼠标点击事件**

例如鼠标右键点击

```js
  <div id="app">
    <button @click.right="opt">右键点我</button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
      },
      methods: {
        opt() {
          alert('你换左键点我试试')
        }
      }
    })
  </script>
```

> 
>
> **关于键盘码keyCode，MDN已经官宣弃用！！！**
>
> **使用提供的这些按键修饰符已经能满足大部分的需求了，不要使用键盘码keyCode了**
>
> ![image-20230521122659477](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521122659477.png)





### 双向绑定指令

#### v-model

**双向绑定只有在input中才能有效，因为这是页面数据发生变化的地方，因为页面其他地方的数据一般不会轻易发生改变。**

用户只能改变输入框中的内容，用户输入后，立即同步到Model中，即JS对象中。

而JS对象中的数据发生变化，页面也会立即被重新渲染



**v-model指令提供了双向绑定的功能，能够在不操作DOM的前提下，获取到表单数据**

```html
<div id="app">
    <input type="text" v-model="msg">
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            msg: '请输入'
        },
        methods: {
        }
    })
</script>
```

![image-20230521122836350](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521122836350.png)





**注意：**

- v-bind是单项数据绑定，即Mode ->  View，页面数据发生变化，Model不会拿到新数据
- v-model是双向数据绑定， Model <---> View，页面数据发生变化，Model能够立即变化；Model发生变化，View也会立即渲染



**当在表单组件中使用了v-model来进行双向绑定，那么表单组件的value属性就没有意义了，因为v-model底层就是监听的value属性**

*表单组件中已经用了v-model，那么v-bind:value无效了*





#### v-model的使用场景

**只有在表单元素中使用才有效，其他元素无效，因为其他元素的页面数据用户不能改变**

常见的用处：

- input
- textarea
- select

例如来看一个下拉框的案例

```html
  <div id="app">
    <select v-model="city">
      <option value="请选择">请选择城市</option>
      <option value="上海">上海</option>
      <option value="深圳">深圳</option>
      <option value="北京">北京</option>
    </select>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        city: '请选择'
      },
      methods: {
      }
    })
  </script>
```

![image-20230521124026295](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521124026295.png)









#### v-model修饰符

- `.lazy`，默认每次都是`input`事件来处理更新数据，有些浪费性能；可以`.lazy`修饰符来`change`事件时更新数据
- `.number`用户输入值自动转换为数字，因为默认获取到的表单数据都是字符串
- `.trim`自动处理两端空格

```html
  <div id="app">
    <input v-model.number="msg" type="text" placeholder="请输入账号">
  </div>
```







### 条件渲染指令

**帮助开发者按需的控制DOM元素的展示或隐藏**

Vue中提供了两个相关指令来控制DOM元素的展示或隐藏：

- v-show
- v-if

这两个指令的值是boolean值，true就显示元素，false不显示。

```html
  <div id="app">
    <h1 v-if="true">我是一段文字</h1>
    <h1 v-show="true">我是第二段文字</h1>
  </div>
```

但是这两者的原理是不同的：

- **v-if的展示与隐藏是直接通过控制DOM元素的添加或删除，操作的是DOM元素，在DOM树中插入、删除DOM节点，吃性能。**
- **v-show是通过改变元素display属性来控制元素的展示与隐藏，本质上这个元素是不会被删除的，仍然存在于DOM树中。**

**如果需要频繁地展示、隐藏一个元素，那么推荐使用v-show**

**如果只是想控制DOM元素的真实存在与否，使用v-if**





#### v-if、v-else-if、v-else

类似于Java、JavaScript中的

```js
if(){
    
}else if(){
    
}else if(){
    
}else{
    
}
```

**v-else-if 和v-else都要结合v-if一起使用**

```html
  <div id="app">
    <div>
      <p v-if="age < 18">未成年</p>
      <p v-else-if="age >= 18 && age <= 35">青年人</p>
      <p v-else-if="age>35 && age<=50">中年人</p>
      <p v-else="age >50">老年人</p>
    </div>
  </div>
```



### 列表渲染指令

#### v-for指令

**利用v-for来批量渲染元素**

**遍历的容器是一个数组**

**语法**

```html
<标签名 v-for="item in items" ></标签名>
```



```html
<div id="app">
    <div>
        <ul>
            <li v-for="p in persons">姓名{{p.name}},年龄:{{p.age}}</li>
        </ul>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            persons: [
                { name: '张三', age: 18 },
                { name: '李四', age: 21 },
                { name: '王五', age: 25 },
            ]
        },
    })
</script>
```



**遍历时，也可以接受索引**

```js
v-for="(item,index) in items"
```

```html
  <div id="app">
    <div>
      <ul>
        <li v-for="(p,idx) in persons">序号{{idx}},姓名{{p.name}},年龄:{{p.age}}</li>
      </ul>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        persons: [
          { name: '张三', age: 18 },
          { name: '李四', age: 21 },
          { name: '王五', age: 25 },
        ]
      },
    })
  </script>
```







**官方规定：只要用到了v-for，那么就要为当前元素绑定一个唯一标识的属性key**

**key的属性值必须是字符串或数字**



***建议使用元素的id作为key，使用遍历时的索引作为key是没有意义的，因为不能与每一个元素产生关联，不具有唯一性，必须要唯一标识一个元素***

**key的值不能重复，是唯一的，否则报错**

```js
<div id="app">
    <div>
    <ul>
    <li v-for="(p,idx) in persons" :key="p.id">序号{{idx}},姓名{{p.name}},年龄:{{p.age}}</li>
</ul>
</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            persons: [
                { id: 1, name: '张三', age: 18 },
                { id: 2, name: '李四', age: 21 },
                { id: 3, name: '王五', age: 25 },
            ]
        },
    })
</script>
```



**通常v-for与v-if来组合使用，在遍历的同时进行筛选**

```html
<div id="app">
    <div>
        <ul>
            <li v-for="(p,idx) in persons" :key="p.id" v-if="p.age > 18">序号{{idx}},姓名{{p.name}},年龄:{{p.age}}</li>
        </ul>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            persons: [
                { id: 1, name: '张三', age: 18 },
                { id: 2, name: '李四', age: 21 },
                { id: 3, name: '王五', age: 25 },
            ]
        },
    })
</script>
```











## 过滤器

**vue2中还保留过滤器，Vue3中已经弃用了过滤器。**

**过滤器常用语文本格式化**

过滤器的两个使用地方：

- 插值表达式
- v-bind属性绑定

**过滤器的调用：使用管道符`|`**,*管道符前的内容会被作为参数传递给管道符后面的函数，函数需要返回一个处理过后的数据，作为最终的结果*

过滤器定义在filters属性下

```html
<div id="app">
    <h1>{{ msg | toUpper }}</h1>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            msg: 'hello'
        },
        filters: {
            toUpper(oldVal) {
                // 首字母大写
                return oldVal.charAt(0).toUpperCase() + oldVal.slice(1, oldVal.length)
            }
        }
    })
</script>
```

![image-20230521140200624](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521140200624.png)



**过滤器也可以连环调用，前一个过滤器的处理结果作为后一个过滤器的参数**

```html
  <div id="app">
    <h1>{{ msg | toUpper | pin }}</h1>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        msg: 'hello'
      },
      filters: {
        toUpper(oldVal) {
          // 首字母大写
          return oldVal.charAt(0).toUpperCase() + oldVal.slice(1, oldVal.length)
        },
        pin(oldVal) {
          return oldVal + "! Vue.js!"
        }
      }
    })
  </script>
```



### 全局过滤器与私有过滤器

**私有过滤器是定义在Vue实例中的，是此Vue实例私有的，只有在此Vue实例控制的元素上调用过滤器才会生效。**

**刚才定义的过滤器就是私有过滤器。**



那么如何创建全局过滤器呢？

**通过调用Vue构造函数的filter()方法来注册全局过滤器**

```js
Vue.filter(filterName, function(){})
```

- 第一个参数是过滤器的名称，即过滤器函数名称
- 第二个就是具体的函数

```html
<div id="app">
    <h1>{{ msg | toUpper }}</h1>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    Vue.filter('toUpper', function (oldVal) {
        // 首字母大写
        return oldVal.charAt(0).toUpperCase() + oldVal.slice(1, oldVal.length)
    })
    const vm = new Vue({
        el: '#app',
        data: {
            msg: 'hello'
        },
    })
</script>
```



**如果Vue实例中定义的私有过滤器，与全局过滤器重名，那么就是就近原则，选择私有的**





## 侦听器、监听器



也叫监听器

当页面中的数据发生变化，就会触发对应的侦听器。

**监听器要定义到watch属性中**

**要监听哪个数据，就用哪个数据的名称，作为监听器函数的名称**

**监听器函数要有两个参数，第一个变化后的数据，第二个是变化前的数据**

```html
<div id="app">
    <input type="text" v-model="username">
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            username: ''
        },
        watch: {
            username(newVal, oldVal) {
                console.log('旧值' + oldVal);
                console.log('新值' + newVal);
            }
        }
    })
</script>
```

![image-20230521142522127](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521142522127.png)



### immediate选项

上面的这种监听器的写法是方法格式的监听器，

**这种监听器的缺点是，只有当数据发生变化时才能被触发**

**如果想要在页面刚加载时，数据刚绑定到元素上时触发一次监听器，则是做不到的**

*此时可以使用对象格式的监听器*

**对象格式的监听器好处是，可以通过配置immediate选项，在数据被绑定到元素上时，触发一次监听器**

**在对象格式的监听器中通过handler()方法来定义具体的逻辑**

```html
<div id="app">
    <input type="text" v-model="username">
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            username: 'zhangsan'
        },
        watch: {
            username: {
                handler(newVal, oldVal) {
                    console.log('旧值:', oldVal, '新值:', newVal)
                },
                immediate: true
            }
        }
    })
</script>
```

![image-20230521143709695](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521143709695.png)



### deep选项

**如果要监听的数据不是简单数据类型，而是一个对象数据类型，监听这个对象身上的所有属性**

***此时使用方法格式的监听器，对象中的某一属性发生变化时，不会触发监听函数***

下面是方法格式的监听器，当修改对象中的某一个属性是，无法触发监听函数

```html
  <div id="app">
    <input type="text" v-model="info.username">
    <input type="text" v-model="info.age">
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        info: {
          username: 'zhangsan',
          age: 18
        }
      },
      watch: {
        info(newVal, oldVal) {
          console.log('新值', newVal, ',旧值', oldVal);
        }
      }
    })
  </script>
```

**使用对象格式的监听器，设置deep选项，就可以监听到对象中属性的变化**

**因为我们监听的是整个对象，所以处理函数的参数就是整个对象**

```html
  <div id="app">
    <input type="text" v-model="info.username">
    <input type="text" v-model="info.age">
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        info: {
          username: 'zhangsan',
          age: 18
        }
      },
      watch: {
        info: {
          handler(newVal, oldVal) {
            console.log('新值', newVal.username, newVal.age, '旧值', oldVal.username, oldVal.age);
          },
          deep: true
        }
      }
    })
  </script>
```

![image-20230521144537203](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521144537203.png)



**如果只想要监听对象中的某个特定的属性，只需要监听该属性，则可以这样写**

**监听对象使用引号括起来**

```html
<div id="app">
    <input type="text" v-model="info.username">
    <input type="text" v-model="info.age">
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            info: {
                username: 'zhangsan',
                age: 18
            }
        },
        watch: {
            'info.username'(newVal, oldVal) {
                console.log(newVal, oldVal);
            }
        }
    })
</script>
```







## 计算属性

**计算属性是通过一系列运算之后，最终得到一个属性值。**

**属性！属性！属性！**

***计算属性定义在computed节点下***

计算属性在调用时，就当做一个普通的属性，本质是一个方法，返回值作为这个属性的值。



**只要计算属性中的数据源(依赖项)发生变化，计算属性就会重新计算**

```html
  <div id="app">
    数学：<input type="text" v-model.number="math" placeholder="数学成绩"><br>
    语文：<input type="text" v-model.number="Chinese" placeholder="语文成绩"><br>
    英语：<input type="text" v-model.number="English" placeholder="英语成绩"><br>
    总分:<input type="text" v-model="score" readonly disabled>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        math: '',
        Chinese: '',
        English: ''
      },
      computed: {
        score() {
          return this.math + this.Chinese + this.English
        }
      }
    })
  </script>
```



![image-20230521150239380](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521150239380.png)

![image-20230521150326511](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521150326511.png)











# axios

Axios 是一个基于 *[promise](https://javascript.info/promise-basics)* 网络请求库，作用于[`node.js`](https://nodejs.org/) 和浏览器中。

*Promise是异步任务的实例，那么axios的请求就是异步网络请求，我们不再需要传统的XMLHttpRequest或jQuery AJAX了*



[中文官网Axios](https://www.axios-http.cn/docs/intro)

## 基本使用

**向axios()中传入一个配置对象，来创建一个请求，返回的是一个Promise对象。**

```js
// 返回一个Promise对象
axios({
  method: 'post',
  url: '/user/123',
  data: {
    firstName: 'Liu',
    age: 18
  }
})
```

既然axios()的返回对象是一个Promise对象，那么我们可以通过.then()方法来处理接受的数据

**因此基本语法格式如下：**

```js
axios({
  method: 'post',
  url: '/user/123',
  data: {
    firstName: 'Liu',
    age: 18
  }
}).then((res) => {
  console.log(res)
})
```



### axios返回的结果

**我们来看一下axios请求到的数据是什么样的**

```js
axios({
    method: 'get',
    url: 'http://localhost/user',
}).then((res) => {
    console.log('axios返回的数据如下');
    console.log(res);
})
```

以上代码打印的axios返回的结果是：

![image-20230521202830281](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521202830281.png)

真实的服务器返回的数据

![image-20230521202659856](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521202659856.png)

**axios对服务器响应的数据做了一层封装，将真实数据与本次请求的配置信息封装到了这个对象中**

![image-20230521205003918](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521205003918.png)





### axios的配置

在创建本次请求时，传入的配置对象有哪些常用的配置

```js

axios({
    method:'post', // 默认是get
    url:'', // 必填
    param: {}, // 请求参数,即url后面的参数,get使用
    data: {}, // 请求体数据,post方法才有请求体
    baseURL:'', // 基础路径,如果设置了此选项，真实的路径就是 baseURL + url
    headers:{},// 自定义请求头
    proxy:{}// 代理服务器的信息
})

```

*常用的配置就这些*







## 使用await/async来简化axios请求

**axios()的返回值是一个Promise，为了简化获取数据我们可以使用await的方式，那么返回的不再是一个Promise对象，而是Promise执行后的结果。**

**配合对象 结构，直接结构出真正的服务器数据**

```js
async function get() {
    const { data: res } = await axios({
        method: 'get',
        url: 'http://localhost/user',
    })
    console.log(res)

}
get()
```







## axios的别名方法

为了方便我们发起请求，在axios()的基础上，为常用的请求方式设置了别名，不需要再设置method属性

上述的配置仍然可以传入到get()、post()中

```js
axios.get(url [,config])// 发起get请求

axios.post(url [,config])// 发起post请求
```

设置了别名的请求方式，**以下方法的返回值也是一个Promise对象**

- ##### axios.request(config)

- ##### axios.get(url[, config])

- ##### axios.delete(url[, config])

- ##### axios.head(url[, config])

- ##### axios.options(url[, config])

- ##### axios.post(url[, data[, config]])

- ##### axios.put(url[, data[, config]])

- ##### axios.patch(url[, data[, config]])



### get()和post()的使用

get()的使用

```js
const { data: res } = await axios.get('http://localhost/user', {
    param: { id: 1 }
})
console.log(res)
```

post()的使用

```js
const { data: res } = await axios.post('http://localhost/user', {
    data: { id: 1 }
})
console.log(res)
```









# Vue组件



## SPA单页面应用程序

单页面应用程序（Signle Page Application)，简称SPA。

**一个Web网站中只有唯一的一个HTML页面，所有的功能与交互都在这个唯一的页面中完成**

一些常见的管理后台，基本都是SPA





## Vue-Cli

### 介绍

**vue-cli是Vue.js开发的标准工具，简化了我们基于Webpack创建工程化的Vue项目的过程**



*我们可以专注于编写应用，而不必纠结webpack的配置问题*

[vue-cli官网https://cli.vuejs.org/zh/index.html](https://cli.vuejs.org/zh/index.html)



### 安装和使用

**vue-cli是npm上的一个全局包**

1. 安装

```sh
npm i @vue/cli -g
```



2. 使用

```sh
vue create 项目名称
```

![image-20230521223907430](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521223907430.png)

![image-20230521223941059](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521223941059.png)

![image-20230521224024053](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521224024053.png)

![image-20230521224157116](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521224157116.png)

![image-20230521224345962](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521224345962.png)

![image-20230521224350638](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521224350638.png)

![image-20230521224414842](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521224414842.png)

![image-20230521224557488](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521224557488.png)

![image-20230521224723323](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521224723323.png)

![image-20230521224736183](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521224736183.png)



### 项目结构分析

利用VScode打开刚才创建的项目

![image-20230521225610497](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521225610497.png)



### Vue项目的执行流程

在工程化项目中，Vue的执行很单纯，**利用main.js将根组件App.vue中的内容渲染到index.html中**

来看main.js中的代码

```js
// 导入Vue，得到构造函数
import Vue from 'vue'
// 导入App.vue根组件
import App from './App.vue'

Vue.config.productionTip = false

// 创建Vue实例
new Vue({
  // 把render函数指定的组件，渲染到HTML页面中
  render: (h) => h(App)
}).$mount('#app') // 挂载Vue实例，也可以写el属性

```

再来看index.html，预留了一个挂载点

![image-20230521230309286](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521230309286.png)







## 组件的基本使用

**组件化开发，就是把一些可以复用的结构抽象成组件**

**Vue是支持组件化开发的前端框架**

**以`.vue`后缀结尾的文件，就是一个vue组件。**

![image-20230521230434266](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521230434266.png)



### Vue组件的组成部分

一个Vue组件中由三部分组成：

- template组件的页面模板
- script组件的js行为
- style组件的样式

```html
<template>

</template>

<script>
// 组件的默认导出
export default{
    
}
</script>

<style>
</style>
```





### 组件中的data数据源

**在普通的Vue实例中，实例的数据源用data属性来给出。**

**但是在Vue组件中，Vue组件不是一个实例，必须由data()这个方法给出数据源，这个方法返回的对象就是这个Vue组件的数据源**

像这样

```html
<template>
  <h1>{{ msg }}</h1>
</template>

<script>
export default {
  data() {
    return {
      msg: '你好！',
      username: 'zhangsan'
    }
  }
}
</script>

<style></style>
```

在根组件中，引入这个组件，看效果

![image-20230521231846358](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521231846358.png)

![image-20230521231920389](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230521231920389.png)









**在组件中，除了数据源data有些特殊，其余的Vue实例的属性都是正常使用，例如**

- methods
- filters
- computed
- watch

```html
export default {
  data() {
    return {
      msg: '你好！',
      username: 'zhangsan'
    }
  },
  methods: {},
  watch: {},
  filters: {},
  computed: {}
}
</script>
```





### 注意事项

- **`<template></template>`中只能有一个根标签**
- **`<script></script>`中必须要默认导出一个Vue实例，在这个实例上，除了data属性有些特殊外，其余正常使用**
- **`<style></style>`如果想要使用less，只需要设置属性lang="less"即可，如果想要此样式只在本组件中有效，则设置scoped属性即可**

```html
<style lang="less">
    .text{
        color: black;
    }
</style>
```





### 组件之间的关系

组件创建好后，如果不使用，那么组件之间是没有任何关系的。

组件被使用后，就会形成父子、兄弟关系。

![image-20230522072926132](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522072926132.png)





### 组件的使用步骤

1. **在组件中导入要使用的其他组件**

```js
import test from './components/test1.vue'
```



2. **在components节点下注册组件**

```js
export default {
  components:{
    test
     // 在ES6中,如果属性名与属性 名称相同，则可以直接简写
     // 'test': test 则可以简写为 test
  }
}
```



3. **将注册好的组件以标签的形式来使用**

```html
<template>
  <div class="text">
    <h1>{{ msg }}</h1>
    <test></test>
  </div>
</template>
```







## 组件的props

**定义组件的属性，父组件在使用子组件时，可以向子组件中传递参数**

**props是组件的自定义属性**



1. **props的定义：**

**在组件中，使用props属性指定一个数组，数组中给出自定义的一个属性名**

```js
export default {
  props: ['init'],
  data() {
    return {
      msg: '你好！',
      username: 'zhangsan'
    }
  },
  methods: {},
  watch: {},
  filters: {},
  computed: {}
}
```



2. **组件自定义属性的使用**

**父组件之间传参就好了，在组件标签上为该属性赋值**

```js
<template>
  <div id="app">
    <My :init="123"></My>
  </div>
</template>

<script>
import My from './components/My.vue'
export default {
  name: 'App',
  components: {
    My
  }
}
</script>
```



### 结合v-bind为自定义属性传值

**利用v-bind将父组件身上的数据源、计算属性等值传递给组件的自定义属性**

```html
<template>
  <div id="app">
    <My :init="msg"></My>
  </div>
</template>

<script>
import My from './components/My.vue'
export default {
  name: 'App',
  data() {
    return {
      msg: 'Hello'
    }
  },
  components: {
    My
  }
}
</script>
```

![image-20230522074515100](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522074515100.png)







### 组件的props应当是只读的

**属性值应当是固定不变的，在组件中，Vue不推荐直接修改props中的自定义属性的**

- props是只读的
- data中的数据才是动态的

**所以，如果想要对父组件传过来的数据，进行改变，需要将props转交data中的数据，然后修改data中的数据即可**

```html
<template>
  <h1>{{ msg + '!!' }}</h1>
</template>

<script>
export default {
  props: ['init'],
  data() {
    return {
      msg: this.init,
      username: 'zhangsan'
    }
  },
  methods: {},
  watch: {},
  filters: {},
  computed: {}
}
```

![image-20230522075102373](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522075102373.png)







### props的默认值default

**上面使用数组的形式规定props，只能给出属性的名称，无法对属性做出复杂的约束**

例如：属性值的类型、属性的默认值

**此时就需要使用props对象来定义属性了**

```js
export default {
  props: {
    init: {
      default: 0,
    }
  },
  data() {
    return {
      msg: this.init,
      username: 'zhangsan'
    }
  },
  methods: {},
  watch: {},
  filters: {},
  computed: {}
}
```

- **自定义属性中，利用default属性给出默认值**



### type值类型

- **利用type属性规定属性值的类型**

```js
export default {
  props: {
    init: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      msg: this.init,
      username: 'zhangsan'
    }
  },
}
```

![image-20230522075557689](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522075557689.png)





### required是否必填项

**规定此属性是否是必填的**

```js
export default {
  props: {
    init: {
      default: 0,
      type: Number,
      required: true
    }
  },
  data() {
    return {
      msg: this.init,
      username: 'zhangsan'
    }
  },
}
```





### 组件实例的$attrs属性

首先说，当我们不在组件中定义props时，父组件能否向子组件传属性值。

**答案是可以的哦**

子组件Home.vue

```vue
<template>
  <div>
    <h1>首页</h1>
    <button type="button" @click="test">点我打印组件实例</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    test() {
      console.log(this)
    }
  }
}
</script>

<style></style>

```

父组件中使用该Home组件，并传递属性值

```vue
<template>
  <div id="app">
    <!-- 传递属性值 -->
    <Home msg="hello" age="18"></Home>
  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {},
  components: {
    Home
  },
  directives: {}
}
</script>

<style lang="less"></style>

```

打印Home组件实例

![image-20230527131458740](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527131458740.png)

***在组价实例中，有一个内置属性`$attrs`，这里面保存了父组件对本组件实例的传参，即prop的值***

当我在Home.vue组件中，定义了props后

```vue
<template>
  <div>
    <h1>首页</h1>
    <button type="button" @click="test">点我打印组件实例</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: ['msg', 'age'],
  methods: {
    test() {
      console.log(this)
    }
  }
}
</script>

<style></style>

```

再来看组件实例的`$attrs`属性

![image-20230527131707071](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527131707071.png)



**结论：组件实例的`$attrs`属性保存了父组件向子组件传递但子组件没有接收到的属性值**

**当我们在子组件中使用props属性对父组件传递过来的属性值进行接收了之后，组件实例的`$attr`的属性中就没有这个属性值了**







##  组件之间的样式冲突

### scoped



**默认情况下，在组件中定义的样式，在父组件中也会生效，父组件中的独有元素也会受到影响，因为父组件引用了子组件。**

这就导致了组件之间的样式冲突，

但是，这不符合我们的预期，我们的预期效果是：**组件中的样式，只在当前组件中生效。**



**解决方式**：

**在组件的`<style>`中写出scoped属性**

```html
<style lang="less" scoped>
h1 {
  font-weight: 100;
}
</style>
```

> `<style>`标签中给出scoped属性后，本质上Vue会给每个组件中的每个元素添加一个唯一的自定义属性
>
> 在css样式的选择器后，也会自动加上该自定义属性
>
> 以上组件所有的元素都会加上data-v-001这个自定义属性，以上css的选择器是`h1[data-v-001]`
>
> 每个组件中的css选择器只能选中该组件中的元素，所以就不会导致样式冲突



### /deep/样式穿透

**上述的scoped属性，只保证本组件的样式，只会在本组件中生效，不会对其他组件产生影响。**

**但是，如果其他的组件没有加scoped属性，那么其他组件的样式就会对本组件产生影响。**



**如果想要在父组件中，修改子组件的样式，因为scoped属性的限制，所以没有办法做到**

**此时可以使用/deep/选项，来表示样式穿透，修改子元素中的样式**

**因为scoped的存在，此修改只会对当前组件中引用的子组件的样式进行修改，不会对其他组件中的相同组件的样式产生影响**

*只需要在选择器前加/deep/即可*



![image-20230522083044897](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522083044897.png)

![image-20230522083135570](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522083135570.png)

```html
<style lang="less" scoped>
/deep/ h1 {
  color: aqua;
}
</style>
```

> 原理是以上选择器实际是`[data-v-001] h1`
>
> 由于在渲染后，子组件中的标签在此元素内部，所以以上选择器可以选择到



**`/deep/`选项的使用场景：当使用第三方组件库时，如果需要对使用的组件进行样式修改，就要用到/deep/**







## 组件的生命周期

**一个组件从创建、运行、销毁的全部过程，这个时间段内会触发不同的函数——生命周期函数。**

**以下是组件生命周期的全过程，对应的生命周期函数**

![lifecycle](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/lifecycle.png)

**如果想要在组件的生命周期中去做些事情，则可以利用这些生命周期函数**

![image-20230215235906850](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230215235906850.png)







### 创建阶段

**在创建阶段有两个关键点，也对应两个生命周期函数：**

- **beforeCreate()：当执行到此生命周期函数时，组件实例的data\props\methods还未初始化，不可用**
- **created()：此时Vue实例的已初始化完成，data\props\methods已经初始化完成，可以使用**

在Vue组件中使用两个生命周期函数

```js
export default {
  beforeCreate() {
    console.log('beforeCreate执行...')
    console.log('此时的data、props是', this.msg, this.init)
  },
  created() {
    console.log('created执行...')
    console.log('此时的data、props是', this.msg, this.init)
  },
  props: {
    init: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      msg: 'Hello'
    }
  }
}
```

会发现报错，因为在beforeCreate()时，Vue实例身上还没有props、data、methods属性

![image-20230522085725807](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522085725807.png)



**beforeCreate()这个生命周期函数基本没啥用**

**created()这个生命周期函数较常用，因为此时已经完成了data\props\methods的初始化，我们一般会在此阶段发起ajax请求来获取数据，但是此时页面的模板结构还没有生成，不能操作DOM，此时只是Vue实例初始化完成了**

```js
export default{
    created(){
        // 发起ajax请求
        // this.msg = ...
    },
    data(){
        return {
            msg: ''
        }
    }
}
```





### 绑定阶段

![image-20230522090614839](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522090614839.png)

**当Vue实例化后，会判断此Vue实例是否有el属性，或者此实例是否调用`$mounted()`方法来进行绑定，此时一般发生在main.js中，绑定根组件APP.vue**

**当确定了Vue实例要挂载的DOM元素后，会判断此Vue实例是否有template属性，这里的template是Vue实例的template属性**

![image-20230522090953292](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522090953292.png)

**因为在很久之前，`.vue`文件组件还没有普及前，就是使用这种方式来渲染模板的，目前基本不用了，因为我们有了`.vue`文件组件**

**如果存在该属性，则将模板交给渲染函数去渲染，如果没有该属性，则该el元素的outerHTML作为模板，即替换掉整个el元素**

```js
export default {
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  props: {
    init: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      msg: 'Hello'
    }
  }
}
```



**接下来来到beforeMount()生命周期函数：此时数据和模板已经在浏览器内存中了**

beforeMount()这个函数基本没啥用

**beforeMount()执行完成后，就会进行挂载，将内存中的DOM结构替换掉el指定元素**

**当mounted()执行时，此时已经大功告成了，DOM结构已经渲染完成**

**mounted()是最早可以操作DOM元素的阶段，在此之前的阶段是不能操作DOM的**



### 运行阶段

**在运行阶段，Vue不断监听Vue实例与页面上的数据的变化**

**当Vue实例中的数据发生变化时，就会触发beforeUpdate()、updated()这两个生命周期函数**



- **beforeUpdate()：此时Vue实例的数据是最新的，但是页面上的模板还没有来得及渲染，此时DOM是旧的**
- beforeUpdate()之后，根据最新的数据，重新渲染组件的模板结构
- **updated()：根据最新的数据，模板重新渲染完成，此时DOM是新的**

模拟一下

```html
<template>
  <div>
    <input v-model="msg" type="text" />
    <h1>此时的msg{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '123'
    }
  },
  beforeUpdate() {
    console.log('beforeUpdate...')
    console.log('此时的值：', this.msg)
    console.log('此时的h1标签', document.querySelector('h1').innerText)
  },
  updated() {
    console.log('updated...')
    console.log('此时的值', this.msg)
    console.log('此时的h1标签', document.querySelector('h1').innerText)
  },
  methods: {},
  watch: {},
  filters: {},
  computed: {},
  components: {}
}
</script>
```

![image-20230522093146125](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522093146125.png)







### 销毁阶段

组件销毁阶段的两个生命周期函数，**极少使用**。

- beforeDestroy()此时的Vue实例是正常运行
- beforeDestroy()之后，开始销毁组件的数据监听器、子组件、事件监听等
- destroyed()此时组件已经被销毁，此组件在浏览器的DOM结构中已经完全移除。





### 总结

- **除了beforeUpdate()和updated()之外，其余的生命周期函数只会执行一次**
- **最常用的是生命周期函数是created()**
- **mounted()是最早可以操作DOM的阶段，在此之前不能操作DOM**







## 组件之间的数据共享

在项目开发中，最常见的关系是：

- 父子关系
- 组件关系

![image-20230522094017438](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522094017438.png)







### 父子组件之间的数据共享



#### 父向子传值

最简单的一种数据共享，就是**利用子组件的自定义属性**

**简单数据类型与对象数据类型都是可以的，当传递简单数据类型时，是将值重新复制一份；当传递对象类型时，传递的是对象的引用**

子组件

```html
<template>
  <div id="son">
    <h1>我是儿子</h1>
    <h1>粑粑传过来的简单数据类型是:{{ init }}</h1>
    <h1>粑粑传过来的对象类型是:{{ person.name }}、{{ person.age }}</h1>
  </div>
</template>

<script>
export default {
  props: ['init', 'person']
}
</script>

<style scoped>
#son {
  border: 1px solid saddlebrown;
}
</style>

```

父组件

```html
<template>
  <div id="father">
    <Son :init="msg" :person="person"></Son>
  </div>
</template>

<script>
import Son from './Son.vue'
export default {
  data() {
    return {
      msg: '你好',
      person: {
        name: 'John',
        age: 18
      }
    }
  },
  components: {
    Son
  }
}
</script>

<style>
#father {
  border: 1px solid springgreen;
}
</style>

```

效果

![image-20230522095300733](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522095300733.png)







#### 子向父传递数据

在子组件中修改了数据，父组件中的数据能够立即发生变化。

**需要使用自定义事件，在子组件和父组件中都要定义事件**  



1. **在父组件中自定义事件**

![image-20230522101424671](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522101424671.png)

2. **在子组件中触发自定义事件，将参数传递进去**

![image-20230522101331230](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522101331230.png)



1. 父组件

```html
<template>
  <div id="father">
    <p>fatherMsg:{{ fatherCount }}</p>
    <Son @countChange="getNewCount"></Son>
  </div>
</template>

<script>
import Son from './Son.vue'
export default {
  data() {
    return {
      fatherCount: 0
    }
  },

  methods: {
    getNewCount(newVal) {
      this.fatherCount = newVal
    }
  },
  components: {
    Son
  }
}
</script>

<style>
#father {
  border: 1px solid springgreen;
}
</style>

```

2. 子组件

```html
<template>
  <div id="son">
    <p>SonCount:{{ sonCount }}</p>
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sonCount: 0
    }
  },
  methods: {
    add() {
      this.sonCount++

      // 触发自定义事件
      this.$emit('countChange', this.sonCount)
    }
  }
}
</script>

<style scoped>
#son {
  border: 1px solid saddlebrown;
}
</style>

```



### 兄弟组件之间共享数据

**在Vue2.x中，兄弟组件之间数据共享的方案是EventBus**

1. 兄弟组件之间共享数据需要借助一个中间实例。
2. 接收方绑定实例的自定义事件，定义处理函数，用来接受传过来的值
3. 发送方触发实例的自定义事件，并将值传过去

![image-20230216175851149](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230216175851149.png)





![image-20230522132017089](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522132017089.png)

![image-20230522131952186](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522131952186.png)

![image-20230522131910908](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522131910908.png)





1. 中间实例bus.js

```js
import Vue from 'vue'
export default new Vue()

```

2. 接收方

```js
<template>
  <div id="my">
    <h1>这是收到的数据:{{ accpetMsg }}</h1>
  </div>
</template>

<script>
import bus from './bus.js'
export default {
  created() {
    bus.$on('share', (msg) => {
      console.log('收到了')
      this.accpetMsg = msg
    })
  },
  data() {
    return {
      accpetMsg: ''
    }
  }
}
</script>

<style lang="less" scoped>
#my {
  height: 150px;
  width: 350px;
  border: 1px solid sandybrown;
}
</style>

```

3. 发送方

```js
<template>
  <div id="father">
    <h1>要发送的数据是:{{ sendMsg }}</h1>
    <button @click="send">点我发送数据</button>
  </div>
</template>

<script>
import bus from './bus.js'
export default {
  data() {
    return {
      sendMsg: '你好!'
    }
  },
  methods: {
    send() {
      bus.$emit('share', this.sendMsg)
    }
  }
}
</script>

<style>
#father {
  border: 1px solid springgreen;

  height: 150px;
}
</style>

```







## Vue操作DOM 

**在Vue中，我们不需要操作DOM，我们只需要维护好数据就好。**

**因此在Vue中，是不推荐操作DOM的。**



如果在Vue项目中真的有操作DOM的需求，Vue页提供了解决方案，能够在不调用DOM API的前提下，拿到对DOM的引用



### ref引用

**ref引用是开发者无需调用DOM API的前提下，获取到对DOM元素或组件的引用。**

**每一个Vue实例身上都有一个`$refs`属性，这个属性是本Vue实例对元素或组件的引用**

默认情况下，我们Vue实例没有引用其他元素的情况下，这个`$refs`是空的

![image-20230522134627969](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522134627969.png)



**只需要在本组件内，在需要引用的元素上添加ref属性，本Vue实例就会拿到此元素的引用**

![image-20230522134829254](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522134829254.png)

![image-20230522134916595](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522134916595.png)

**Vue实例对元素的引用，就会将此元素的引用名称以属性的方式放入`$refs`中，因此我们可以通过`$refs.引用名称`的方式来获取对DOM元素的引用**

![image-20230522135206482](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522135206482.png)

```html
<template>
  <div id="app">
    <h1 ref="xx">我是APP根组件</h1>
    <button @click="getRef">点我</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: 'Hello'
    }
  },
  methods: {
    getRef() {
      this.$refs.xx.innerText = 'Hello'
    }
  },
  components: {}
}
</script>

<style lang="less">
#app {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
```

**如果对组件引用，也是可以的**

**给子组件上添加ref属性，直接拿到的是这个组件实例，可以直接调用其身上的data、metod**

![image-20230522140026214](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522140026214.png)

![image-20230522140115923](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522140115923.png)





### $nextTick



场景：来看一个代码

需求：

- 通过点击按钮来显示输入框，当输入框输入完成后，自动隐藏输入框。
- 当点击显示输入框后，自动获取输入框焦点

![image-20230522142656153](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522142656153.png)

**Vue中提供了一个方法`$nextTick(callback)`，这个方法是等本组件DOM元素渲染完成后，执行其中的回调函数**

![image-20230522143035768](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230522143035768.png)







## 动态组件

动态组件就是动态切换组件的显示与隐藏。



### 如何实现动态组件的渲染？

Vue提供了一个内置的`<component>`组件，专门用来实现动态组件的渲染

**可以理解为`<component>`是一个占位符，其中的is属性用来指定要渲染的组件名称**

**需要使用v-bind为is属性绑定一个动态的值**

![image-20230523094313761](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523094313761.png)

![image-20230523094414671](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523094414671.png)







来 实现点不同的按钮，展示不同的组件

```html
<template>
  <div id="app">
    <div>
      <button @click="showLeft">Left</button>
      <button @click="showRight">Right</button>
    </div>
    <component :is="comName"></component>
  </div>
</template>

<script>
import Left from './components/Left.vue'
import Right from './components/Right.vue'
export default {
  name: 'App',
  data() {
    return {
      comName: 'Right'
    }
  },
  methods: {
    showLeft() {
      this.comName = 'Left'
    },
    showRight() {
      this.comName = 'Right'
    }
  },
  components: {
    Right,
    Left
  }
}
</script>

<style lang="less">
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

```

![image-20230523094902892](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523094902892.png)



![image-20230523094911067](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523094911067.png)





### keep-alive的使用

当利用`<component>`来动态渲染组件时，**在切换组件时，会销毁被替换掉的组件实例，然后创建一个新的组件实例渲染上去**，

![image-20230523095841310](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523095841310.png)



每次切换组件都会销毁前一个实例、创建一个新的实例，无法保存原始组件实例的状态，且频繁的创建、销毁，性能损耗严重。



**使用`<keep-alive>`组件来保证，组件切换时，不会销毁之前的组件实例，而是将组件缓存，保证在内存中的状态，渲染该组件时，直接在内存中取出，激活**

```html
<keep-alive>
    <component :is="comName"></component>
</keep-alive>
```

![image-20230523100224122](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523100224122.png)











### keep-alive的相关生命周期函数

- **当组件被缓存时，会自动触发组件的`deactived`生命周期函数**
- **但组件被激活时，会自动触发组件的`actived`生命周期函数**



在组件中看一下这两个生命周期函数

```js
export default {
  name: 'Left',
  data() {
    return {
      count: 0
    }
  },
  created() {
    console.log('组件被创建')
  },
  deactivated() {
    console.log('组件被缓存')
  },
  activated() {
    console.log('组件被激活')
  }
}
```

![image-20230523100731029](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523100731029.png)





### keep-alive的include属性

**keep-alive标签的include属性，用来指定特定的组件做缓存，其他的不指定的组件不会做缓存**

多个组件名之间用逗号隔开

**如果不指定这个属性，那么`<keep-alive>`标签中的所有组件都会被缓存**

```html
<keep-alive include="Right,Left">
    <component :is="comName"></component>
</keep-alive>
```



### keep-alive的exclude属性

**exclude此属性用来指定不需要被换粗的组件名称**

**注意：include和exclude属性不能同时使用**

```html
<keep-alive exclude="Right">
    <component :is="comName"></component>
</keep-alive>
```





### 组件的注册名称和组件的name属性



**在声明组件时，如果没有指定组件的name属性，那么组件的名称就是组件注册时的名称**

**如果在声明组件时，指定了组件的name属性，那么该组件的名称就是name值**



**keep-alive中的include和exclude的值是组件的名称！！！**

![image-20230523102554236](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523102554236.png)









## 插槽

**插槽Slot是Vue为组件的封装者提供的能力**

**允许开发者在封装组件时，把不确定，希望由用户指定的部分定义为插槽**

![image-20230523103619872](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523103619872.png)

![image-20230523103626828](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523103626828.png)



### 插槽的name属性

Vue官方规定

**组件中的插槽，应该指定一个name属性，如果不指定name属性，则默认为name="default"**

*因为一个组件中可能有多个不同的插槽*

![image-20230523110330468](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523110330468.png)



**在使用插槽时，如果不指明要使用具体哪一个插槽，那么就会使用name=“default"的插槽**

![image-20230523110455660](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523110455660.png)



在使用插槽时，如果要指定具体的插槽，可以使用`v-slot`指令

**注意：此指令只能用来`<template>`上，不能用在普通的标签中**

![image-20230523110743653](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523110743653.png)

**注意：`v-slot`指令可以简写为`#`**

![image-20230523110832041](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523110832041.png)



### 插槽的默认内容

**可以为插槽指定默认内容，如果用户没有给出插槽的具体内容，那么就会使用默认的内容**

**直接在`<slot></slot>`中给出默认内容**

![image-20230523111203041](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523111203041.png)

![image-20230523111211104](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523111211104.png)







### 具名插槽

**指定了name属性的插槽就是具名插槽**

**当组件中有多个插槽时，一定要指定name属性**

![image-20230523113355893](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523113355893.png)

Artical.vue

```html
<template>
  <div id="artical-container">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Artical'
}
</script>

<style scoped lang="less">
#artical-container {
  background-color: lightgoldenrodyellow;
  > div {
    width: 300px;
    height: 150px;
  }
  .header {
    background-color: #a05959;
  }

  .content {
    background-color: #b9c459;
  }

  .footer {
    background-color: #359172;
  }
}
</style>

```

App.vue

```html
<template>
  <div id="app">
    <Artical>
      <template #header><h1>标题：凤凰架构</h1></template>
      <template #content><p>这是一本关于分布式的书籍....</p></template>
      <template #footer><h5>机械工业出版社</h5></template>
    </Artical>
  </div>
</template>

<script>
import Artical from './components/Artical.vue'
export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {},
  components: {
    Artical
  }
}
</script>

<style lang="less">
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
```









### 作用域插槽

在定义插槽时，还可以在插槽身上定义数据，这些数据可以被使用者获取到。

这种自定义了数据的插槽，就叫做作用域插槽

像这样

```html
<slot name="header" msg="liumingkai" age="18"></slot>
```

除了name之外的属性的所有属性，都被认作是自定义的数据，也可以说是作用域数据。

这些数据会被封装到一个对象中，使用者在使用插槽时，可以接受这些数据

```html
// 使用一个变量来接受
<template #header="obj">
    <h1>{{ obj }}</h1>
</template>
```

![image-20230523115633289](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523115633289.png)

如果需要访问具体的属性值

```html
<template #header="obj">
    <h1>{{ obj.msg }}</h1>
    <h1>{{ obj.age }}</h1>
</template>
```

![image-20230523115737695](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523115737695.png)

***规范：在接受时，一般使用名称为`scope`来接受***

```html
<template #header="scope">
    <h1>{{ scope.msg }}</h1>
    <h1>{{ scope.age }}</h1>
</template>
```





**配合对象解构来接受作用域中的数据，按需引入，不再需要接受一整个完整的作用域对象**

![image-20230523120325250](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523120325250.png)















### 组件实例的$slots属性

在Vue组件实例的身上有一个属性是`$slots`,这个属性保存了父组件中在使用子组件时，给出的所有插槽的具体节点，即真正的要渲染到插槽中的内容。

来看，不管子组件中有没有给出插槽，父组件都可以给出具体的内容。

这是子组件，并没有预留插槽位置

```vue
<template>
  <div>
    <h1>首页</h1>
    <button type="button" @click="test">点我打印组件实例</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    test() {
      console.log(this)
    }
  }
}
</script>

<style></style>

```

父组件在使用子组件时，给出具体的内容

```vue
<template>
  <div id="app">
    <!-- 传递属性值 -->
    <Home>
      <template #test1>
        <h1>我是具体内容</h1>
      </template>
      <h2>我是二级标题</h2>
      <h3>我是三级标题....</h3>
    </Home>
  </div>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {},
  components: {
    Home
  },
  directives: {}
}
</script>

<style lang="less"></style>

```

**来看子组件身上的`$slots`属性，这里面保存了需要渲染给插槽的虚拟节点，Virtual Node**

![image-20230527133012347](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527133012347.png)



- `$slots`对象中保存了父组件中要交给插槽渲染的内容
- `$slots`对象中的属性是父组件指定的插槽名称，属性值是一个数组，是所有指定了此名称插槽的所有节点
- 父组件中不给出插槽名称，那么就是**名称为default**的插槽









## 自定义指令

自定义指令可以分为：

- 全局自定义指令：所有的组件都可以使用指令
- 私有自定义指令：只有该组件能使用此指令

**在自定义指令时，不需要给出`v-`前缀，但是在使用时要给出`v-`前缀**



### 私有自定义指令

在每个组件中，可以在`directives`节点下声明**私有自定义指令**

**用指令名作为`directives`中的属性名，在配置对象中，给出bind()方法的具体逻辑**

```html
<template>
  <div id="app">
    <h1 v-color>一级标题</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {},
  components: {},
  directives: {
    color: {
      bind(el) {
        el.style.color = 'red'
      }
    }
  }
}
</script>
```

**bind()方法的第一个参数就是绑定了该指令的DOM元素**

**在该指令第一次绑定到DOM元素上时，就会触发自定义指令的bind()方法**

**bind()方法的第二个参数封装了是该指令的相关信息，可以通过这个参数拿到自定义指令的属性值**

```html
<template>
  <div id="app">
    <h1 v-color="color">一级标题</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      color: 'red'
    }
  },
  methods: {},
  components: {},
  directives: {
    color: {
      bind(el, binding) {
        console.log(binding)
        el.style.color = 'red'
      }
    }
  }
}
</script>
```

打印一下这个对象

![image-20230523121815543](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523121815543.png)

**express是这个指令的值表达式，value才是真正的属性值**

*因此可以通过指令的值，来动态的操作DOM元素*

![image-20230523122120127](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523122120127.png)







### update()函数

**自定义指令的bind()函数只有在第一次绑定到DOM元素上时，才会被触发。**

**如果自定义指令绑定的属性值发生了变化，也不会触发该bind()方法**

- bind()方法只会触发一次，当第一次绑定到该元素上时，当DOM更新时不会触发该函数
- update()函数在每次DOM更新时触发

***一般这两个方法都是配对用***

```html
<template>
  <div id="app">
    <h1 v-color="color">一级标题</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      color: 'red'
    }
  },
  methods: {},
  components: {},
  directives: {
    color: {
      bind(el, binding) {
        el.style.color = binding.value
      },
      update(el, binding) {
        el.style.color = binding.value
      }
    }
  }
}
</script>
```





### 函数简写

**如果bind()和update()方法的逻辑完全相同，则可以使用函数的形式来简化自定义指令的书写。**

![image-20230523122951629](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230523122951629.png)

```js
export default {
  name: 'App',
  data() {
    return {
      color: 'red'
    }
  },
  methods: {},
  components: {},
  directives: {
    color(el, binding) {
      el.style.color = binding.value
    }
  }
}
```

**这样写，无论是第一次绑定该指令，还是DOM发生变化，都会触发该函数**









### 全局自定义指令

***一般定义在main.js中***

```js
Vue.directive('指令名',function(){})

Vue.directive('color', function (el, binding) {
  el.style.color = binding.value
})
```







## 挂载axios到Vue的原型链上

在Vue组件中，如果需要发起请求，那么在每个组件中都需要import导入，然后使用。

甚是繁琐，而且不能对所有的请求做出统一配置。

**此时可以将配置好的axios实例挂载到Vue原型上**

在组件中，就不用每次都导入axios了，而且还能做到统一的配置。

在main.js中

```js
import axios from 'axios'

// 将axios挂载到Vue原型上
Vue.prototype.axios = axios
```

在Vue组件中，直接使用

```js
  methods: {
    async getInfo() {
      const res = await this.axios.get(url)
      console.log(res)
    }
  },
```

***但是为了符合Vue内置对象的规范，而且装杯，一般这样挂载***

```js
import axios from 'axios'

// 将axios挂载到Vue原型上
Vue.prototype.$http = axios
```







### 全局配置

[Axios--默认配置](https://www.axios-http.cn/docs/config_defaults)

配置axios，作用于每一个axios实例

全局axios的默认值

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

在Vue原型中挂载axios，同时指定基础路径

```js
import axios from 'axios'
// 配置
axios.defaults.baseURL = 'http://localhost/'

// 将axios挂载到Vue原型上
Vue.prototype.$http = axios
```







### 缺点

虽然将axios挂载到Vue原型链上，简化了发起请求的步骤。

但是这样做也有一个缺点，就是无法做到API的复用。

**如果要在多个组件中，都要请求同一个后台接口，那么这个`this.$http.get()`就要写多次**









# vue-router路由



## SPA与前端路由

SPA 单页面应用程序，SPA中如何实现页面内的跳转？

**SPA中通过hash地址来实现跳转**

**就是URL后`#`后的地址就是hash地址。**



**SPA的路由原理：**

**当a链接被点击后，导致url中hash地址的变化，通过BOM 中的 location监听到hash地址的变化，然后将对应的组件渲染到页面**





## Vue-router的配置

vue-router就是将上述的路由原理实现了封装了。

[Vue-router中文官网](https://router.vuejs.org/zh/)

Vue官方的路由组件。



1. **项目中安装vue-router依赖**

vue2安装3.x的vue-router

```sh
npm i vue-router@3 -S
```



2. **导入并挂载路由模块**

在src目录下，新建`/router/index.js`作为路由模块，并初始化以下代码

```js
// 导入Vue和Vue-router 的包
import Vue from 'vue'
import VueRouter from 'vue-router'

// 调用Vue.use()函数,把Vue-router 安装为Vue的插件
Vue.use(VueRouter)

// 创建路由的实例对象
const router = new VueRouter()

// 向外共享路由的实例对象
export default router

```

在main.js中挂载路由模块

```js
import Vue from 'vue'
import App from './App.vue'

// 导入路由模块，拿到路由对象
// 这样写也是可以的,会找该目录下的index.js文件
// import router from './router'
import router from './router/index.js'

new Vue({
  render: (h) => h(App),
  // 挂载路由对象
  // 'router': router
  router
}).$mount('#app')
```





3. **声明路由链接和占位符**

```html
<template>
  <div>
    <h1>APP根组件</h1>
    <div>
      <a href="#/home">首页</a>&nbsp; <a href="#/msg">消息</a>&nbsp;
      <a href="#/about">关于</a>
    </div>
    <div>
      <!-- 导入并配置了vue-router后，就可以使用router-view这个组件了 -->
      <!-- router-view就是一个占位符 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less"></style>

```



4. **在路由模板配置Hash地址与组件的关系**

在路由模块中，VueRouter对象中有一个属性routes，是一个数组，用来书写Hash与组件的映射关系。

```js
// 导入Vue和Vue-router 的包
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import MyHome from '../components/MyHome.vue'
import MyAbout from '../components/MyAbout.vue'
import MyMsg from '../components/MyMsg.vue'
// 调用Vue.use()函数,把Vue-router 安装为Vue的插件
Vue.use(VueRouter)

// 创建路由的实例对象
// 传入一个配置对象
const router = new VueRouter({
  // routes是一个数组,用来定义 hash地址 与 组件 之间的映射关系
  routes: [
    // 注意：不要写#, 直接写# 后面的
    { path: '/home', component: MyHome },
    { path: '/about', component: MyAbout },
    { path: '/msg', component: MyMsg }
  ]
})

// 向外共享路由的实例对象
export default router

```





## router-link

使用`<router-link>`来代替`<a>`标签，效果跟`<a>`标签没有区别，Vue渲染出来还是一个`<a>`标签

以后在路由时，尽量都使用`<router-link>`来代替`<a>`

```html
<!-- 当导入并配置了vue-router后,就可以使用router-link组件了 -->
<!-- 注意:此时不要写 # 号，这个组件会自动补全 # 号 -->
<router-link to="/home">首页</router-link>&nbsp;
<router-link to="/msg">消息</router-link>&nbsp;
<router-link to="/about">关于</router-link>
```



### replace属性

首先要知道浏览器历史记录的两种写入方式：

- push是追加历史记录
- replace是替换当前记录

路由跳转的方式，默认是push，这种跳转方式，是会产生历史记录，可以通过浏览器前进、后退的方式更换页面。

开启`<router-link>`的replace属性后，此条链接就会以替换的方式来跳转，就是将历史记录的最后一条替换为当前的跳转的地址，浏览器前进、后退无法回到前一个链接了

```vue
<router-link replace to="/home">主页</router-link>
```



## 组件分类

Vue中的组件，为了区分路由组件与普通的组件，我们会将组件进行分类。

将路由组件单独放在`pages` 或`view`目录下，而`components`目录下存放的是与路由无关的普通组件。



## 路由重定向

配置了vue-router后，当访问首页，`http://localhost:8080`会自动跳转到`http://localhost:8080/#/`这个地址。

但是没有叫`/`的组件，此时可以使用重定向，当访问某个地址时，强制跳转到另一个地址。

通过路由规则中的redirect属性，可以实现重定向。

```js
const router = new VueRouter({
  // routes是一个数组,用来定义 hash地址 与 组件 之间的映射关系
  routes: [
    // 注意：不要写#, 直接写# 后面的
    { path: '/', redirect: '/home' },
    { path: '/home', component: MyHome },
    { path: '/about', component: MyAbout },
    { path: '/msg', component: MyMsg }
  ]
})
```





## 嵌套路由

![image-20230218230752283](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230218230752283.png)

在组件中继续使用`<router-view>`和`<router-link>`

![image-20230218233947620](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230218233947620.png)

通过children属性声明子路由规则

```js
const router = new VueRouter({
  // routes是一个数组,用来定义 hash地址 与 组件 之间的映射关系
  routes: [
    // 注意：不要写#, 直接写# 后面的
    { path: '/', redirect: '/home' },
    { path: '/home', component: MyHome },
    { path: '/msg', component: MyMsg },
    {
      path: '/about',
      component: MyAbout,
      // children是一个数组,定义子组件的路由规则
      // children中的路径，尽量不要加`/` 
      children: [
        { path: 'author', component: MyAuthor },
        { path: 'blog', component: MyBlog }
      ]
    }
  ]
})
```

这是组件

```html
<template>
  <div class="about">
    <h1>关于</h1>
    <hr />
    <router-link to="/about/author">作者:刘明凯</router-link>&nbsp;
    <router-link to="/about/blog">博客地址xxx</router-link>
    <hr />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less"></style>

```

在组件嵌套中使用重定向，小优化

```js
const router = new VueRouter({
  // routes是一个数组,用来定义 hash地址 与 组件 之间的映射关系
  routes: [
    // 注意：不要写#, 直接写# 后面的
    { path: '/', redirect: '/home' },
    { path: '/home', component: MyHome },
    { path: '/msg', component: MyMsg },
    {
      path: '/about',
      component: MyAbout,
      // 默认重定向到第一个组件
      redirect: '/about/author',
      // children是一个数组,定义子组件的路由规则
      children: [
        { path: 'author', component: MyAuthor },
        { path: 'blog', component: MyBlog }
      ]
    }
  ]
})
```



### 默认子路由

默认显示某个子组件，此时可以不用重定向了。

```js
const router = new VueRouter({
  // routes是一个数组,用来定义 hash地址 与 组件 之间的映射关系
  routes: [
    // 注意：不要写#, 直接写# 后面的
    { path: '/', redirect: '/home' },
    { path: '/home', component: MyHome },
    { path: '/msg', component: MyMsg },
    {
      path: '/about',
      component: MyAbout,
      // children是一个数组,定义子组件的路由规则
      children: [
        // 默认子路由，如果children中，某个路由规则的path值为空字符串，
        // 则这条路由规则，叫做 "默认子路由"
        { path: '', component: MyAuthor },
        { path: 'blog', component: MyBlog }
      ]
    }
  ]
})
```

此时第一个组件的Hash地址就可以写成`/about`

```html
    <router-link to="/about/">作者:刘明凯</router-link>&nbsp;
    <router-link to="/about/blog">博客地址xxx</router-link>
    <hr />
    <div>
      <router-view></router-view>
    </div>
```

**默认子路由与重定向使用哪个都可以**









## 动态路由

把Hash地址中可变的部分定义为参数项，从而提供路由规则的复用。

例如RESTFul风格api，`http://localhost/project/1`和`http://localhost/user/2`，不可能为了这两个URL，单独提供两个组件。

这分明就是同一个组件，只不过数据部分不同。

**因此动态路由就应用了，允许在跳转路由时，携带参数。**





1. **在Vue-Router中，通过冒号`:`来指定参数项**

![image-20230524205355143](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230524205355143.png)



2. **`<router-link>`中给出参数**

![image-20230524204433434](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230524204433434.png)



3. **在组件中，如何接受这个参数？**

看一下这个组件实例，**组价实例身上有一个`$route`对象，这个对象中就包含了这次条件的路由信息**

![image-20230524205710904](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230524205710904.png)



***因此可以通过`$route.param`获取到参数值***

![image-20230524205826683](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230524205826683.png)







#### props组件传参

**为当前组件开启props传参，这样就可以直接获取到参数值，无需通过`$route.param`了**



1. 首先，在路由模块开启props传参

![image-20230524210328940](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230524210328940.png)



2. 在组件中定义同名prop

![image-20230524210504845](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230524210504845.png)







#### 路径参数与查询参数

url中`/`后的参数是路径参数，而`?`后的参数是查询参数

`http://localhost/user/2?name=zhagnsan&age=18`

- 2是路径参数
- name和age是查询参数



**如何获取查询参数？**

***同样还是组件实例身上的`$route.query`属性***

![image-20230524211519530](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230524211519530.png)



在`<router-link>`中携带查询参数

1. 第一种方式，模版字符串

```vue
<template>
  <router-link :to="`/user?id=${user.id}&ppid=${user.ppid}`">点我用户</router-link
  >
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: 1,
        ppid: 23
      }
    }
  }
}
</script>
```



2. 第二种方式，to的对象写法

```js
<template>
  <router-link
    :to="{
      path: '/user',
      query: {
        id: 1,
        ppid: 231
      }
    }"
    >用户</router-link
  >
</template>

<script>
export default {}
</script>
```







## 命名路由

为一条路由规则起名字，能够简化路由跳转的书写

在想要起名字路由规则中给出name属性

```js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'homePage',
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      name: 'user',
      path: '/user',
      component: User,
      children: [
        {
          name: 'Admin',
          path: '/admin',
          component: Admin
        },
        {
          name: 'Sellet',
          path: 'seller',
          component: Seller
        }
      ]
    },
    {
      name: 'guanyu',
      path: '/about',
      component: AboutView
    }
  ]
})

export default router

```

路由有了name之后，`<router-link>`写起来就非常方便了，尤其是嵌套路由，直接用to属性对象写法，给出name即可

```vue
  <router-link :to="{ name: 'homePage' }">Home</router-link>
  <router-link
    :to="{
      name: 'Admin'
    }"
    >管理员页面</router-link
  >
```

嵌套路由的一般写法

```js
<router-link to="/user/admin">管理员</router-link>
```

用了name属性，直接给出路由规则的name值，无需写非常长的url地址

```vue
<router-link 
:to="{
	name: 'Admin'
}"
>管理员</router-link>
```



**注意：在跳转时，使用路由规则的name属性，to必须是对象的写法**

**只有在路径非常长的时候，命名路由的优势才能体现出来，如果url非常短，还是一般的写法就可以**











## Vue中编程式导航

**通过点击链接导致页面上组件的切换，这种方式就叫做导航**



***在浏览器中，通过点击链接实现导航的方式，叫做声明式导航***、

- 普通项目中通过`<a>`链接，Vue项目中通过`<router-link>`



**在编码中，通过调用浏览器API来实现导航的方式，叫做编程式导航**

- 例如,BOM中`location.href` 跳转页面



在Vue中如何实现编程式API，其中最常用的导航API分别是：

**注意，此处是`$router`对象，不是`$route`对象**

![image-20230524212659898](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230524212659898.png)

![image-20230524214028383](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230524214028383.png)







## 路由守卫

### 导航守卫

导航守卫可以控制路由的控制权限。

例如，只有登录了之后才能访问个人主页。

![image-20230524214452648](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230524214452648.png)



***我们可以在导航守卫中完成用户权限的校验***



### 全局前置守卫

**每次发生路由的导航跳转时，都会触发全局前置守卫。**

***在全局前置守卫中，我们可以进行权限的校验***



**如何配置全局前置守卫？**

```js
// 路由实例对象
const router = new Router({....});

// 调用路由实例的beforeEach()方法
// 即可声明"全局前置守卫"
// 每次发生路由导航跳转的时候，都会触发fn这个回调函数
router.beforeEach(fn)
```

来看一下这个回调函数的三个形参:

```js
function(to, from, next){
    // to 将要访问的路由的信息对象
    // from 将要离开的路由的信息对象,也就是当前的路由组件对象
    // next 这个也是一个回调函数，调用next()表示放行，允许本次导航
}
```

- **此处的to和from就是前面提到的`$route`对象**





#### next()函数的三种调用方式

```js
// 放行
next()

// 没有权限，强制跳转到登录页面
next('/login')

// 不允许跳转
next(false)
```

例如：模拟一个权限校验

```js
// 模拟权限校验
// 全局路由前置守卫
router.beforeEach(function (to, from, next) {
  // 如果要访问的地址是后台
  if (to.path === '/main') {
    // 获取本地token信息
    let user = localStorage.getItem('USER-TOKEN')
    if (user === null) {
      // 未登录，跳转到登录页面
      next('/login')
    }
    // 解析Token...
    // 登录了,判断用户类型
    if (user.role === 'amdin') {
      // 放行
      next()
    }
    // 普通用户,禁止访问
    next(false)
  }
  // 其他页面，直接放行
  next()
})
```



**注意：全局路由守卫的调用时机**

- 组件初始化时，
- 每次组件切换时



### 全局后置守卫

后置路由守卫的调用时机

- 组件初始化时
- 组件切换完成之后

```js
// 没有next参数了
router.afterEach((to,from) => {
  // ...
})
```





### 独享路由守卫

在路由规则中，单独写

```js
beforeEnter( (to, from, next) => {})
```

```js
  routes: [
    {
      name: 'homePage',
      path: '/',
      name: 'home',
      component: HomeView,
      eforeEnter(to, from, next) {}
    },
    {
      name: 'user',
      path: '/user',
      component: User,
      children: [
        {
          name: 'Admin',
          path: '/admin',
          component: Admin,
          beforeEnter(to, from, next) {}
        },
      ]
    },
  ]
```







### 组件内的路由守卫

在组件内部

```js
export default {
  name: 'User',
  methods: {},
  data() {
    return {}
  },
  // 通过路由规则，进入该组件时触发
  beforeRouteEnter(to, from, next) {
    // ...
  },
  // 通过路由规则，离开该组件时触发
  beforeRouteLeave(to, from, next) {
    // ...
  }
}
```









## 路由器的两种工作方式

对于一个URL来说，什么是hash值，就是**#号及其后面的内容**就是hash值

hash值不会包含在HTTP请求中，即：hash值不会发送给服务器。

Hash模式：

- url地址中会带着#号，不美观
- 兼容性好

history模式：

- 去掉了#号
- 问题是将原来的hash值，直接拼接到了url中，
- 兼容性差
- 应用部署上线时，需要后端的支持，才能解决页面刷新时的404问题

可以在vue-router中修改路由器的工作模式，默认是hash

```js
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/user/:id',
      component: User,
      props: true
    },
    {
      path: '/home',
      component: Home
    }
  ]
})
```







## 路由懒加载

```js
const router  = createRouter({
    history: createWebHashHistory(),
    routes:[
        {

            path: '/',
            component: HelloWorld
        },
        {
            path:'/home',
            component: () => import('@/components/Home.vue')
        }
    ]
})
```



# Vuex

## 概述

### **什么是Vuex？**

专门在Vue应用程序中实现集中式状态（数据）管理的一个Vue插件，对Vue应用中的多个组件的共享状态进行集中式管理（读/写），也是一种组件间通信的方式，且使用于任意组件之间的通信。

[官方文档https://vuex.vuejs.org/zh/](https://vuex.vuejs.org/zh/)

[Vuex3.x官方文档https://v3.vuex.vuejs.org/zh/](https://v3.vuex.vuejs.org/zh/)

> 注意:
>
> ==Vue2.x只能使用Vuex3.x版本==
>
> Vue3.只能使用Vuex4.x版本

### 组件之间的通信方案

组件之间的关系是非常复杂的

![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20210323175925844.png)

通常来说，组件之间的通信方式：

| 组件关系       | 通信方式                                               |
| -------------- | ------------------------------------------------------ |
| 父向子传值     | props                                                  |
| 子向父传值     | 自定义事件,$emit触发自定义事件                         |
| 兄弟之间的通信 | EventBus，中间变量运输数据（有了Vuex之后，基本不用了） |
| 非父子关系     | Vuex，一种组件通信方案                                 |

**Vuex是什么？专门为Vue.js应用程序开发的状态管理模式，采用集中式的存储管理数据，以相应的规则保证状态以一种可预测的方式发生变化**

原因：

- **程序页面多，数据量多**
- **不同组件之间数据保持同步**
- **数据的修改都是可追踪的**





**Vuex中存储的是，多个组件共享状态，某个组件中私有的数据，仍然存储在data中**

![image-20230525163521622](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525163521622.png)



### 什么时候使用Vuex

多个组件依赖于同一状态



### Vuex的工作原理

在Vuex中，最核心的就是这三部分，相互协作

![image-20230525214451960](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525214451960.png)

1. 首先是在Vuex中有一个state对象，负责存储组件托管给Vuex的数据
2. 组件在State对象身上获取到目标数据
3. 当组件对数据进行修改后，要调用Actions对象中的方法
4. Actions对象对变化的数据做初步处理，例如请求后台加工等，然后交给Mutations
5. Mutations做最后的处理，然后将新的数据同步到State对象中

***这就是Vuex的工作原理***

***以上三部分（三个对象），都有Vuex中的Store对象统一调度管理，因此我们需要将Store对象注册为Vue的插件***

***当我们在Vue中注册了插件，那么在Vue实例中就会多一个$store对象，也就是Vuex的核心对象***

再来说更详细的部分，

1. Vuex中的渲染到组件中，
2. 组件中数据发生变化后，在组件中如何通知Actions中的方法对数据进行处理呢？
3. 因为Vuex中的三部分，都是通过Vuex中的Store对象来调度的，所以我们通过组件实例身上的`$store.dispatch()`方法来调用Actions中定义的处理方法，并将数据传递过去
4. 同理在Actions中，通知Mutations对象中的方法去处理，也可以通过`$store.commit()`方法来调用actions对象中定义的方法



## 配置

与Vue-router的使用基本一致。

1. 项目中引入依赖，

```sh
npm install vuex@3
```

2. 新建Vuex模块

在src下新建`store/index.js`

```js
// 1. 引入Vue
import Vue from 'vue'
// 2. 引入Vuex
import Vuex from 'vuex'
// 3. 注册插件
Vue.use(Vuex)
// 4. 实例化Vuex的Store对象
const store = new Vuex.Store({
  // ... 配置信息
})
// 5. 默认导出
export default store

```





3. 在main.js中挂载Vuex

```js
import Vue from 'vue'
import App from './App.vue'
import store from './store/'
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  // 挂载到Vue实例上
  store
}).$mount('#app')

```



***当我们配置完成之后，就可以组件实例身上访问到`$stroe`对象了，Vuex的api也都在这个对象身上***

**来看一下这个`$store`对象**

![image-20230525224316194](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525224316194.png)

## 使用

前面配置好Vuex后，我们就可以使用了

1. 首先我们在store模块中给出要 托管的数据

```js
// 1. 引入Vue
import Vue from 'vue'
// 2. 引入Vuex
import Vuex from 'vuex'
// 3. 注册插件
Vue.use(Vuex)
// 4. 实例化Vuex.store对象
const store = new Vuex.Store({
  // state 数据源
  state: {
    count: 100,
    age: 18
  },
})
// 5. 默认导出
export default store

```



2. 然后在组件中尝试通过拿到这个托管的数据

```vue
<template>
  <div>
    <span>{{ $store.state.count }}</span>
  </div>
</template>

<script>
export default {}
</script>

<style></style>

```

成功拿到

![image-20230525223514445](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525223514445.png)



3. 在Vue组件中对数据进行修改

```vue
<template>
  <div>
    <span>{{ $store.state.count }}</span>
    <button type="button" @click="updateCount">+1</button>
  </div>
</template>

<script>
export default {
  methods: {
    updateCount() {
      // 通过this.$store.dispatch()方法来触发Actions中的方法
      // 两个参数，要调用的方法名，要传递的参数
      this.$store.dispatch('ADD', 1)
    }
  }
}
</script>

<style></style>

```



4. 在store模块中定义actions对象的方法

```js
// 1. 引入Vue
import Vue from 'vue'
// 2. 引入Vuex
import Vuex from 'vuex'
// 3. 注册插件
Vue.use(Vuex)
// 4. 实例化Vuex.store对象
const store = new Vuex.Store({
  // state 数据源
  state: {
    count: 100,
    age: 18
  },
  actions: {
    // 该方法会接受两个参数
    // 1. context 是Vuex的上下文对象
    // 2. 接受的数据，
    ADD(context, val) {
      console.log('actions被调用')
      console.log(context, val)
    }
  },
})
// 5. 默认导出
export default store

```



在Actions对象中定义的方法，需要接受两个参数

- 一个参数context是Vuex的上下文对象
- 第二个参数就是要接受的参数，也就是dispatch(‘method’,arg)中的第二个参数

**重点来看一下这个contex上下文对象**

![image-20230525224347995](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525224347995.png)

***这个上下文对象中的部分属性是来自于`$store`对象身上的属性，commit()、dispatch()、state***

***同时封装了针对这次数据变化的信息***

***所以我们可以在Actions对象的方法中利用context这个上下文对象来访问commit()、dispatch()、state***

因为Vuex不属于任何一个组件，所以是不能获取到Vue组件实例的，更不能通过`this.$store`获取Vuex的Store对象，所以才会有Context上下文对象，也就是Vuex内部的一个环境对象。



5. 现在我们在actions对象的方法中，利用context参数，调用mutations对象中的方法，交给Mutations对象处理

```js
// 1. 引入Vue
import Vue from 'vue'
// 2. 引入Vuex
import Vuex from 'vuex'
// 3. 注册插件
Vue.use(Vuex)
// 4. 实例化Vuex.store对象
const store = new Vuex.Store({
  // state 数据源
  state: {
    count: 100,
    age: 18
  },
  actions: {
    // 该方法会接受两个参数
    // 1. context 是Vuex的上下文对象
    // 2. 接受的数据，
    ADD(context, val) {
      console.log('actions被调用')
      if (val === 1) {
        context.commit('UPDATE', val)
      }
    }
  },
})
// 5. 默认导出
export default store

```



6. 我们在mutations对象中定义相关方法，来看一下这个方法的两个参数

```js
// 1. 引入Vue
import Vue from 'vue'
// 2. 引入Vuex
import Vuex from 'vuex'
// 3. 注册插件
Vue.use(Vuex)
// 4. 实例化Vuex.store对象
const store = new Vuex.Store({
  // state 数据源
  state: {
    count: 100,
    age: 18
  },
  actions: {
    // 该方法会接受两个参数
    // 1. context 是Vuex的上下文对象
    // 2. 接受的数据，
    ADD(context, val) {
      console.log('actions被调用')
      if (val === 1) {
        context.commit('UPDATE', val)
      }
    }
  },
  mutations: {
    // 1. state就是$store身上的state
    // 2. 接受的参数
    UPDATE(state, val) {
      console.log('mutations被调用')
      console.log(state, val)
    }
  }
})
// 5. 默认导出
export default store

```



![image-20230525225409694](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525225409694.png)

- 第一个参数就是我们的Stroe中的state对象，里面有我们的托管的数据
- 第二个参数是接受的参数

***因此，可以在mutations中做最初的数据处理***



6. 最终在mutations中完成数据的同步

```js
// 1. 引入Vue
import Vue from 'vue'
// 2. 引入Vuex
import Vuex from 'vuex'
// 3. 注册插件
Vue.use(Vuex)
// 4. 实例化Vuex.store对象
const store = new Vuex.Store({
  // state 数据源
  state: {
    count: 100,
    age: 18
  },
  actions: {
    // 该方法会接受两个参数
    // 1. context 是Vuex的上下文对象
    // 2. 接受的数据，
    ADD(context, val) {
      console.log('actions被调用')
      if (val === 1) {
        context.commit('UPDATE', val)
      }
    }
  },
  mutations: {
    // 1. state就是$store身上的state
    // 2. 接受的参数
    UPDATE(state, val) {
      console.log('mutations被调用')
      state.count += val
    }
  }
})
// 5. 默认导出
export default store

```





***注意：不是必须要按照这个步骤，如果你感觉数据的处理非常简单，则可以略过Actions的处理，在组件中直接调用Mutations的方法，做最终的处理***

![image-20230525231444834](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525231444834.png)

***这样设计的目的是：对于简化复杂数据的处理，各个模块各司其职，降低代码的冗余性，增强代码的可维护性***



至此，Vuex的使用就弄明白了。

下面来总结一下。



## 总结

### 配置

Vuex是一个集中式状态（数据）管理插件。

第一步，在项目中安装Vue

```sh
npm i vuex@3
```

第二步，创建store模块，其中的index.js内容如下

```js
//1. 导入Vue和Vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 2. 注册插件
Vue.use(Vuex)

// 3. 创建并导出Store对象

export default new Vuex.Store({
  // state要托管的数据
  state:{},
  // 数据初步处理的方法
  actions:{},
  // 数据最终提交的处理方法
  mutations:{}
})
```



第三步，将store模块中的store对象挂载到Vue实例身上

在main.js中，内容如下

```js
import Vue from 'vue'
import App from './App.vue'
// 1. 导入store对象
import store from './store/'
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  // 2. 将store对象挂载到Vue实例上
  store
}).$mount('#app')

```







### 使用

梳理了清楚Vuex的工作原理后，就会使用了。

![image-20230525230611158](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525230611158.png)

1. 在组件中，通过`this.$store.state`获取到Vuex中集中管理的状态（数据）

![image-20230525230812859](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525230812859.png)

2. 在组件中，数据发生变化时，调用`this.$store.dispatch()`方法来交给Vuex中的Actions对象中的方法进行处理

![image-20230525230825980](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525230825980.png)



3. 在Store模块中的，给出Actions的相关方法，并在方法中调用mutations中的方法

*规范，一般Actions和Mutations中的方法名称全部大写*

![image-20230525230911236](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525230911236.png)



4. 在store模块的mutations中给出相关方法，做最后的处理

![image-20230525231007288](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525231007288.png)





以上只是基本使用，下面来讲优化的操作









## Devtools搭配Vuex使用

***在这里可以看到所有Vuex托管的数据***

![image-20230525231837436](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525231837436.png)

![image-20230525231953039](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525231953039.png)



***在这里可以看到所有Vuex变化的过程***

![image-20230525232502976](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525232502976.png)





## getters

在看组件实例身上的`$store`对象时，还有一个属性是`getters`

![image-20230525233256850](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230525233256850.png)

目前getters是空的

很简单，就是对state数据源中的getter方法，类似于组件中的计算属性computed

***利用getters来获取state时，可以对数据做一些加工，然后交给组件***



```js
// 1. 引入Vue
import Vue from 'vue'
// 2. 引入Vuex
import Vuex from 'vuex'
// 3. 注册插件
Vue.use(Vuex)
// 4. 实例化Vuex.store对象
const store = new Vuex.Store({
  // state 数据源
  state: {
    count: 100,
    age: 18
  },
  actions: {
    // 该方法会接受两个参数
    // 1. context 是Vuex的上下文对象
    // 2. 接受的数据，
    ADD(context, val) {
      console.log('actions被调用')
      if (val === 1) {
        context.commit('UPDATE', val)
      }
    }
  },
  mutations: {
    // 1. state就是$store身上的state
    // 2. 接受的参数
    UPDATE(state, val) {
      console.log('mutations被调用')
      state.count += val
    }
  },
  getters: {
    bigCount(state) {
      // 对state的数据做处理后返回给组件
      return state.count * 10 + 1
    }
  }
})
// 5. 默认导出
export default store

```



***getters中的方法不能对state中的数据做出修改，修改state是actions和mutations的责任***

**在组件中获取数据，直接调用getters中的方法，注意：不需要给出小括号，就当做计算属性来用**

```vue
<template>
  <div>
    <span>{{ $store.getters.bigCount }}</span>
    <button type="button" @click="updateCount">+1</button>
  </div>
</template>

<script>
export default {
  methods: {
    updateCount() {
      this.$store.commit('UPDATE', 1)
      console.log(this.$store)
    }
  }
}
</script>

<style></style>

```







## mapState

map映射的意思。

组件中每次在取数据的时候，通过`this.$store.state.xx`非常繁琐，同时耦合性较强。

因此我们可以将Vuex中的数据处理为本组件的一个计算数据，那么在取数据时就非常方便了。

像这样：

![image-20230526091908475](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526091908475.png)

***但是书写，并没有简化书写，仍然后`this.$store.state`这些冗余代码***

***Vuex中提供了一个函数`mapState()`，可以将state中的数据映射成计算属性并返回***

mapState()方法将所有的计算属性封装成了一个对象并返回

![image-20230526092333137](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526092333137.png)





***配合对象解构，将mapState()中的方法直接赋给computed属性***

```vue
<template>
  <div>
    <span>原始值{{ myCount }}</span>
    <button type="button" @click="updateCount">+1</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {
    updateCount() {
      this.$store.commit('UPDATE', 1)
      console.log(this.$store)
    }
  },
  computed: {
    ...mapState({ myCount: 'count' })
  }
}
</script>

<style></style>

```

mapState()的使用有两种方式，

- 如果要使用自定义计算属性名，则需要使用对象的方式
- 如果对组件中的计算属性没有要求，则可以使用state中状态的名称作为本组件的计算属性的名称

```js
  computed: {
    // 1. 对象的写法
    // myCount是计算属性名
    // 'count'是要映射的state中的状态名称
    ...mapState({ myCount: 'count', myAge: 'age' }),
    // 2. 数组的写法
    // 映射出来的计算属性名称与state中的状态名称一致
    ...mapState(['count', 'age'])
  }
```





## mapGetters

前面提到，mapState()是将state中的变量映射成计算属性。

同理mapGetters()函数是将getters中的变量映射成计算属性，用法是一样的。

mapGetters()方法的使用方式与mapState()的用法一致，

```js
  computed: {
    // 1. 对象格式使用
    // myCount计算属性名
    // 'bigInt' getters中的方法名
    ...mapGetters({ myCount: 'bigCount', myAge: 'youther' }),
    // 2. 数组格式
    ...mapGetters(['bigCount', 'youther'])
  }
```





## mapActions

在组件中数据发生变化后，我们在定义方法中使用`this.$store.dispatch()`或`this.$store.commit()`来交给Vuex做处理。

这种写法也能优化。

同样mapActions()方法生成actions中方法的映射

我们在自定义方法中是这样写的

```js
  methods: {
    updateCount() {
      // 'ADD'要调用的actions中的方法名
      // 2传递过去的参数
      this.$store.dispatch('ADD', 2)
    }
  },
```

我们利用mapActions()方法这样写，同样也是两种方式

```js
  methods: {
    updateCount() {
      // 'ADD'要调用的actions中的方法名
      // 2传递过去的参数
      this.$store.dispatch('ADD', 2)
    },

    // 1. 第一种写法：对象格式
    // myAdd 自定义的方法名
    // 'ADD' actions中的方法名
    ...mapActions({ myAdd: 'ADD' }),

    // 2. 第二种写法：数组的格式
    // 直接使用actions的方法名作为本组件中的方法名
    ...mapActions(['ADD'])
  },
```

***注意：通过`…mapActions()`解构后的方法是这样的，默认有一个参数，就是我们要传递的数据***

```js
    ...mapActions({ myAdd: 'ADD' }),
    // 解构后
    myAdd(n) {
      this.$store.dispatch('ADD', n)
    }
```

**所以，我们在为事件绑定此方法时，需要进行传参，否则就会默认传入事件对象**

![image-20230526100214911](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526100214911.png)

![image-20230526095949204](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526095949204.png)





## mapMutations

**同理，mapMutations()方法是将mutations中的方法进行映射，**

**也是两种调用方式**

![image-20230526100436464](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526100436464.png)

















## Vuex模块化开发

对于不同模块的数据，由不同的Vuex模块管理，有利于数据的维护。

避免在一个Vuex模块中，管理各种各样的数据。



### Vuex中的modules

在`store/index.js`中，我们直接将state\mutations\actions\getters等属性直接定义到了store对象身上。

现在我们的数据分模块了，每个模块中都有state\mutations\actions\getters

步骤：

1. **在index.js定义两个普通的对象，作为模块**
2. 在这两个普通的对象身上，给出state\mutations\actions\getters等属性
3. 将这两个对象在Store中注册为模块
4. 在对象中利用`namespaced:true`，是将注册时的名称作为模块名

看下面的例子

```js
// 1. 引入Vue
import Vue from 'vue'
// 2. 引入Vuex
import Vuex from 'vuex'
// 3. 注册插件
Vue.use(Vuex)

// 创建用户模块
const user = {
  // 将注册时的名称作为模块名
  namespaced: true,
  state: {
    username: 'zhangsan',
    age: 18
  },
  actions: {
    UPDATENAME(context, val) {
      context.commit('NAME', val)
    },
    UPDATEAGE(context, val) {
      if (val == 1) {
        context.commit('AGE', val)
      }
    }
  },
  mutations: {
    NAME(state, val) {
      state.username = val
    },
    AGE(state, val) {
      state.age += val
    }
  },
  getters: {
    hello(state) {
      return 'Hello!' + state.username
    }
  }
}

// 商品模块
const goods = {
  namespaced: true,
  state: {
    name: '蓝牙耳机',
    price: '9.9'
  },
  actions: {
    UPDAPRICE(context, val) {
      context.commit('PRICE', val)
    }
  },
  mutations: {
    PRICE(state, val) {
      state.price = val
    }
  },
  getters: {
    show(state) {
      return `商品名称${state.name},价格${state.price}`
    }
  }
}
// 4. 实例化Vuex.store对象
const store = new Vuex.Store({
  // 将user和goods注册为store的模块
  modules: {
    user,
    goods
  }
})
// 5. 默认导出
export default store

```





#### 在组件中如何使用模块中的数据

我们此时再来看Vue实例身上的$store对象

![image-20230526105802848](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526105802848.png)



##### 直接访问

**在组件中通过这个$store直接访问state中的数据的话，需要给出模块名**

![image-20230526110058043](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526110058043.png)

***在组件中，如何直接访问模块中actions\mutations中的方法呢***

需要通过`/`来分割不同的模块

![image-20230526110636223](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526110636223.png)



***直接访问模块的getters时，同样需要通过`/`来分割模块***

![image-20230526110259167](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526110259167.png)

![image-20230526110432147](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526110432147.png)



##### map映射解构

以上的直接访问非常繁琐，可以直接利用我们上述说的各种map来做映射

- mapState()
- mapGetters()
- mapActions()
- mapMutations()

我们在映射时，可以通过第一个参数，来指定映射的模块名称

![image-20230526111123928](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526111123928.png)



### 模块化文件

以上的是把所有的模块都写在了index.js中了，我们可以将模块拆分出来

我们可以将不同的模块定义为不同的js文件

比如，在stroe文件夹下，新建用户模块和商品模块

![image-20230526111418042](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526111418042.png)

***每个文件就是一个独立的Vuex模块***

然后在index.js中注册模块就好了



这是user.js

![image-20230526111920294](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526111920294.png)

```js
// 创建用户模块
const user = {
  // 将注册时的名称作为模块名
  namespaced: true,
  state: {
    username: 'zhangsan',
    age: 18
  },
  actions: {
    UPDATENAME(context, val) {
      context.commit('NAME', val)
    },
    UPDATEAGE(context, val) {
      if (val == 1) {
        context.commit('AGE', val)
      }
    }
  },
  mutations: {
    NAME(state, val) {
      state.username = val
    },
    AGE(state, val) {
      state.age += val
    }
  },
  getters: {
    hello(state) {
      return 'Hello!' + state.username
    }
  }
}
export default user

```



在index.js中导入user模块并注册为模块

![image-20230526111859840](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526111859840.png)











# 补充

## Vue2中的响应式数据的原理

### Object.defineProperty()

在学习ES6的使用，Object构造函数中有一个方法是`defineProperty()`，用来为一个对象添加一个新的属性。

基本使用

```js
    let user = {
      name: 'zhangsan',
      age: 18,
    }
    // Object.defineProperty(obj, property, {})
    // 三个参数
    // 第一个参数是实例对象
    // 第二个参数是要添加的属性名
    // 第三个参数是一个配置项
    Object.defineProperty(user, 'sex', {
      value: '男'
    })
    console.log(user)
```

![image-20230526203000436](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526203000436.png)

***通过Object.defineProperty()为对象添加的属性与在对象定义时直接定义该属性，有什么区别吗？***

通过浏览器输出的颜色也可以感觉到不同

![image-20230526203412200](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526203412200.png)

![image-20230526203513024](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526203513024.png)



***通过Object.defineProperty()定义的属性的特点是：***

- ***该属性是不可以被枚举，即该属性不能被遍历***

![image-20230526203721079](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526203721079.png)

关于defineProperty()中的第三个参数的配置项：

```js
    Object.defineProperty(user, 'sex', {
      value: '男',
      enumerable: true,// 控制属性是否可以被枚举
      writable: true,// 控制属性是否否可以被修改
      configurable: true // 控制属性是否可以被删除
    })
```

还有两个高级的配置,set()和get()

假如说，user的age属性是依赖于一个变量number，这个number发生变化，同样对象中的age也会发生变化，age发生修改，number也会发生变化。

此时就可以使用set()和get()配置了

```js
    let number = 18
    let user = {
      name: 'zhangsan',
      age: number,
    }
    Object.defineProperty(user, 'age', {
      // 只有当读取该属性时，才会通过get(getter)来获取该属性的值
      get() {
        return number
      },
      // 当修改改属性时，会通过set(setter)方法来设置新的值
      set(val) {
        number = val
      }
    })
```

![image-20230526205427975](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526205427975.png)

![image-20230526205617180](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526205617180.png)

> 注意：有了get/set配置项后，就不能指定value和writeable这两个配置项了，冲突、!

### Vue2中的响应式原理

**数据代理：通过代理对象来操作源对象身上的数据**

**在Vue中，我们在创建Vue实例时，传入一个配置对象，这个配置对象中的需要有一个data属性来给出数据**

看一下Vue实例

![image-20230526222652412](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526222652412.png)

***在创建Vue实例时，我们通过传入配置对象，配置对象上的data属性用来定义我们的数据源，Vue实例会代理配置对象中的data中的所有数据，原理就是通过Object.defineProperty()方法来为Vue实例身上挂载属性，同时指定对应的getter/setter***

**这样做的好处是，方便我们获取数据，简化对数据的操作**

![image-20230526231110868](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526231110868.png)



>  在Vue实例身上还有一个`_data`属性，这个`_data`就是配置对象中的data部分，但是稍微有些不同。
>
> Vue实例会对配置对象中的data做进一步的处理后，然后直接挂载到Vue实例身上的`_data`属性
>
> ![image-20230526223357717](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526223357717.png)

总结：

![image-20230526225050073](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526225050073.png)







## Vue监测数据变化的原理

Vue对传入的配置对象中的data属性做了加工，加工后直接将新的data赋给Vue实例的`_data`，同时将data中的数据交给Vue直接代理。

![image-20230527075507000](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527075507000.png)

![image-20230526231607192](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526231607192.png)

那么这个加工的原理是什么？

我们来简单模拟一下这个过程，就懂了

```js
  // 模拟配置对象中的源数据
  let data = {
    name: 'zhangsan',
    age: 18
  }

  // Vue实例
  let vm = {}

  // 对data进行加工
  // data重新引用
  data = new Observe(data)

  // 原始的data指向的对象并没有消失
  // 只是data重新指向了一个对象的引用

  // 将data挂载到Vue实例的_data
  vm._data = data

  // 构造方法
  function Observe(obj) {
    let keys = Object.keys(obj)

    // 获取所有的数据
    keys.forEach((k) => {

      // 为此对象Observer添加属性
      Object.defineProperty(this, k, {
        get() {
          return obj[k]
        },
        set(val) {
          obj[k] = val
          // 数据发生变化，重新解析并渲染模版
        }
      })


      // 为Vue实例代理
      Object.defineProperty(vm, k, {
        get() {
          return obj[k]
        },
        set(val) {
          obj[k] = val
          // 数据发生变化，我要重新解析并渲染
        }
      })
    })
  }
```

1. 首先Vue会对传入的配置对象中data，作为参数传入一个构造函数Observer()
2. 在构造函数Observer()中，将原始的data中的数据代理到此Observer实例和Vue实例身上
3. 并为data变量重新引用为这个Observer实例
4. 将data赋给Vue实例的`_data`属性
5. 这样，data就成为了响应式的数据代理，同样Vue实例中也直接代理了原始数据
6. data和Vue实例代理的都是同一份数据

***这个`_data`属性也叫做Vue实例的跟数据源***

![image-20230527074235591](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527074235591.png)

*原始的data并没有消失，只是不被data这个变量引用了，原始的data数据仍保存在内存中，被代理对象中的getter/setter引用*

**真正的Vue做的处理肯定要比模拟的这个代码更复杂，以上代码只模拟了简单数据类型的代理，不支持引用数据类型的代理，但是Vue在实现时，会通过递归的方式，代理引用类型实例身上的每一个属性，同样也会有setter/getter**

***因此，通过代理的方式，可以直接通过Vue实例来访问、修改真正的数据，当修改数据时，就会触发对象的setter，Vue会在setter中重新解析模版、渲染***



### Vue.set()和$set()

我们知道，在创建Vue实例时，传入的配置对象中的data属性会被加工成响应式的数据，并被_data属性和Vue实例代理。

在创建Vue实例时，一定要将所有的数据一次给出，否则后期自己手动添加的数据不是响应式的。

像这样：

![image-20230527074833300](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527074833300.png)

***如果想要实现自己追加的数据的响应式，其实是在真正的经过加工后的data中追加属性，并生成对应的getter/setter，同时还要挂载到Vue实例身上，以上这种方式肯定不是响应式的，就是一个普通的属性***

***所以，我们自己手动追加的数据`_data.sex=‘男’`本质就是一个普通的属性，并没有在data中生成对应的setter/getter，也没有没挂载到Vue实例上，本质上我们需要手动的为`_data`和Vue实例通过`Object.defineProperty()`的方式才能实现真正的追加数据也是响应式。但是Vue实例在创建时，为普通的数据加工成响应式数据时，远远比我们想的要更复杂，对于具体的setter/getter逻辑要更复杂，因为需要考虑到模版解析、渲染等问题，所以我们通过手动Object.defineProperty()的为Vue实例或Vue实例身上的，也是不可行的。所以说，Vue实例在创建完成后，通过我们手动的方式追加响应式数据，是不可能的。这就是为什么要在创建VUe实例时，一次性将所有的数据准备好。***

![image-20230527081323511](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527081323511.png)



***Vue中也考虑到了这一点，Vue中提供了一个方法，可以让我们追加响应式数据，在内部会自动帮我们做处理，在内部完成对数据的挂载以及复杂的处理逻辑***

```js
Vue.set(target, key, value)
```

- 第一个参数target,是要追加属性的实例
- 第二个参数key,是要追加的属性名称
- 第三个参数value，就是属性值

![image-20230527083738838](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527083738838.png)

![image-20230527084039483](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527084039483.png)

**Vue实例中也有这样的方法，叫做$set()，用法是一样的**

```js
vm.$set(target, key, value)
```

![image-20230527084335279](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527084335279.png)

**注意**：

- 上面演示的是向根数据源`_data`中的student对象追加的属性，并不是向根数据源`_data`中直接追加响应式数据
- **不能向Vue实例或其根数据源对象`_data`上直接追加响应式数据**
- ![image-20230527084840226](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527084840226.png)



### Vue.delete()和$delete()

在响应式对象身上删除数据，页面也是不会更新的。

![image-20230527095713729](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527095713729.png)



Vue中也有对应的API来解决，

```js
Vue.delete(target, key)

// 或

vm.$set(target, key)
```

与Vue.set()和vm.$set()的用法是一致的。

```js
    const vm = new Vue({
      el: '#app',
      data: {
        student: {
          name: '张三',
          age: 18,
          sex: '男'
        }
      },
      methods: {
        deleteSex() {
          this.$set(this.student, 'sex')
          // 或
          Vue.delete(this.student, 'sex')
        }
      }
```





### 监测数组对象的原理

先来看Vue中对数据监听的一个小问题

![image-20230527090627745](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527090627745.png)

**这就需要说VUe对数组的监听是怎样的了**

我们来看Vue实例根数据源`_data`上的数组

![image-20230527090825004](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527090825004.png)

这就解释了，为什么我们通过数组索引的方式修改，Vue没有监听到，并且重新渲染的原因

为什么不这样做呢？为每一个元素生成getter/setter。

**肯定不会这样做！一个数组中的元素的数量是非常多的，在初始化Vue实例时，为数组中的每个元素都生成getter/setter，会占用大量的时间、内存，而且数组是动态的，对数组的增加、删除元素，还要重新增加、删除getter/setter，严重影响性能**

那Vue中是如何实现对数组的代理的呢？

Vue官方文档中是这样说的

![image-20230527091324390](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527091324390.png)

***Vue对原始的数组进行了一层封装，也就是说Vue实例的跟数据源`_data`中的数组并不是原生的Array了。在新包装的数组对象中，重新定义了`push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()`这几个数组的常用方法。当我们在数组对象上调用以上的几个方法，走的是Vue封装的数组对象中的方法，在这个方法中，同时调用了原始Array的对应方法，然后对数组进行重新渲染***

***所以说，我们通过数组索引的方式修改元素是不能Vue监听到的，所以不会重新渲染，只有通过Vue包装的这些方法来改变数组时，才能被Vue监听到，并重新渲染***

![image-20230527092237880](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527092237880.png)





**注意：**

- 所以我们通过索引的方式直接修改数组的元素是不会被监听到哦
- 在Vue中修改数组，需要使用以上提供的几个方法

> 暴力修改
>
> 还是通过Vue.set()或vm.$set()，但是不推荐
>
> ![image-20230527092559522](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527092559522.png)





## 总结

1. **Vue监听data中的数据是所有层次的数据，即不论data中的数据对象有多深**
2. **如何见识对象中的数据？**
   1. 通过setter/getter实现监视，且在new Vue()时就要传入检测的数据
   2. 如需给后添加的属性做响应式，使用以下API：
      1. Vue.set(target, key, val)
      2. vm.$set(target, key, val)
3. **如何监视数组中的数据？**
   1. 通过包装原始的数组对象，并生成新的数组常用方法，主要做了两件事
      1. 调用原生的Array对应的方法实现真正数据的更新
      2. 重新解析、渲染模版
4. **修改数组中的方法时，一定要调用以下的方法**
   1. ``push()`、`pop()`、`shif()`、`unshift()`、`splice()`、`sort()`、`reverse()`
   2. 【不推荐】Vue.set()或vm.$set()
5. **Vue.set()或vm.$set()只能给根数据源`_data`中已有的对象追加响应式数据，不能直接在Vue实例或跟数据源`_data`上追加响应式数据**









# 第三方组件库

来说一下第三方组件库如何使用？

别人封装好了的组件，我们只需要知道怎么拿来用就好了。



基于Vue的组件库有以下这些：

移动端常用的UI组件库：

- [VantUI](https://vant-ui.github.io/vant/#/zh-CN)
- [Cube UI](https://didi.github.io/cube-ui/#/zh-CN)
- [Mint UI](https://mint-ui.github.io/#!/zh-cn)



PC端常用UI组件库

- [ElementUI](https://element.eleme.cn/#/zh-CN)
- [IView UI](https://www.iviewui.com/)



***没啥说的，照着官方文档copy就完事了！***































