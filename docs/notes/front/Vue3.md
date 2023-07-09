



# Vue3简介

- 2020年09月，Vue发布3.0版本，代号One Piece（海贼王）

[Vue3官网](https://cn.vuejs.org/)

[Vue3.0 github地址](https://github.com/vuejs/core)

[Vue.js3.0发布页](https://github.com/vuejs/core/releases/tag/v3.0.0)

*目前是是2023/05/26，最新版是3.3.4*

## Vue3的变化

了解就好

1. 性能的提升：
   1. 打包体积减少40%
   2. 初次渲染速度快55%、渲染快133%
   3. 内存占用减少54%
   4. …..
2. 源码的升级
   1. 使用Proxy代替defineProperty实现响应式
   2. 重写虚拟DOM的实现和Tree-Shaking(编码中的Tree-Shaking是剔除无用的代码)
   3. …….
3. 拥抱TypeScript
   1. Vue3可以更好地支持TypeScript
4. 新的特性：
   1. Composition API组合式API
      1. setup配置
      2. ref与reactive
      3. watch与watchEffect
      4. ….
   2. 新的内置组件
      1. Fragment
      2. Teleport
      3. Suspense
   3. 其他改变：
      1. 新的生命周期钩子
      2. data选项应该始终被声明为一个函数
      3. 移除keyCode支持
      4. ……
   4. …..





# 创建Vue3工程



## 利用vue-cli创建

*确保vue-cli的版本在4.5以上*

![image-20230524151306183](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230524151306183.png)

也可以在自定义配置中选择Vue的版本是3.x







## Vite

*下一代前端工具链*

[中文官网https://cn.vitejs.dev/](https://cn.vitejs.dev/)



当使用webpack对项目进行运行时，都会先打包，然后启动服务器，而且打包是非常耗时的一个过程，并且随着项目体积越来越大，打包的时间也越来越长，无论是开发还是生产环境，都要进行打包，然后启动服务器。

***相对于Webpack，Vite采用了不同的运行方式***

- 开发时，并不对代码打包，而是直接采用ESM（ES模板化）的方式来运行项目，项目启动巨快，瞬间级。
- 开发环境中，无需打包操作，冷启动
- 在项目进行部署时，再对项目进行打包
- 打包速度非常快，底层使用了一个esbuild技术，而且使用Go语言写的，开箱即用



传统的打包工具的工作原理：先打包、启动服务器、部署

![image-20230526134657817](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526134657817.png)

Vite构建：先准备服务器，然后按照ES6模块化，按需加载

![image-20230526134727667](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526134727667.png)

*构建速度真的快，用了Vite，都不想用Webpack了….*





### 基本使用

项目中安装vite

```html
npm i vite -D
```

当项目中安装了vite后，并不会有单独的命令，而是与npm的命令集成到了一起。

***vite默认的源代码目录就是项目根目录***，所以不需要创建src目录（不推荐，还是推荐src目录作为源代码目录）

然后此项目就是由vite接管了。

通过以下命令来直接启动服务器，**vite命令就是启动一个开发服务器。**

```sh
npm vite
```





### 利用vite创建

[vite中文官网](https://cn.vitejs.dev/)

**Vite只能创建Vue3的项目**

使用以下命令

```sh
npm create vite <project-name>
```

还可以使用模板

```sh
npm create vite <project-name> -- --template=vue
```

关于`npm create vite`这个命令，可以看我的这篇文章

[npm init和npm create、npm create vite什么意思](https://blog.csdn.net/weixin_55697693/article/details/130854304)

以下命令已被弃用

```sh
npm init vite-app <project-name>
```







## create-vue

新一代的Vue脚手架，针对于Vue3的一款脚手架。

vue-cli是依赖于webpack，而create-vue的底层是vite。

命令

```sh
npm init vue@latest
```

![image-20230528123354614](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230528123354614.png)





# 项目结构

看Vue3项目中的入口文件main.js

```js
// 导入createApp，用来创建Vue实例
import { createApp } from 'vue'
import './style.css'
// 导入根组件
import App from './App.vue'

// createApp()创建指定组件的Vue实例
// mount()绑定
createApp(App).mount('#app')

```

在来看App.vue

```vue
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

```

Vue3中组件将`<script>`放在最前面，`<template>`放在中间，方便样式在写CSS的时候，看DOM结构

***Vue3组件中允许不适用唯一根标签***









# 常用Composition API 

在Vue3中，是可以兼容Vue2的写法的，即你可以在setup()之外，定义data()、method、computed….

## 初始setup

**setup是Vue3中一个新的配置项，值为一个函数**

> 在Vue2中的配置项有data()、methods、computed、watch等

- **组件中所有用到的数据、方法等，均要配置在setup()中**

setup函数的两种返回值：

- **若返回一个对象，则对象中的属性、方法，在模板中可以直接使用！！！**
- 若返回的是一个渲染函数，则可以自定义渲染内容（了解）



***所有的组合式API都要写在setup()中***



先来说setup函数的基本使用

1. ***setup的返回值是一个对象***

```vue
<script>
export default {
  name: 'APP',
  setup() {
    // 此处数据不是响应式
    // 只是为了测试setup这个配置项
    let name = 'zhangsan'
    let age = 18
    function hello() {
      alert(`Hello!My name is ${name},我 ${age}岁了`)
    }

    // setup的返回值
    return {
      name,
      age,
      hello
    }
  }
}
</script>

<template>
  <h1>我是APP根组件</h1>
  <h1>姓名{{ name }}</h1>
  <h1>年龄{{ age }}</h1>
  <button type="button" @click="hello">点我</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

```



![image-20230526143017482](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526143017482.png)











在Vue2的配置项中访问setup()中的数据是可以的

```js
export default {
  name: 'APP',
  data() {
    return { a: 1 }
  },
  methods: {
    get() {
      // data配置项上的数据
      console.log(this.a)
      // setup返回的数据
      console.log(this.name)
      // !!! 都可以访问到
    }
  },
  setup() {
    // 此处数据不是响应式
    // 只是为了测试setup这个配置项
    let name = 'zhangsan'
    let age = 18
    function hello() {
      alert(`Hello!My name is ${name},我 ${age}岁了`)
    }

    // setup的返回值
    return {
      name,
      age,
      hello
    }
  }
}
```



但是在setup()中访问Vue2配置项中的数据是不可以的

```js
export default {
  name: 'APP',
  data() {
    return { a: 1 }
  },
  methods: {
    get() {
      // data配置项上的数据
      console.log(this.a)
      // setup返回的数据
      console.log(this.name)
      // !!! 都可以访问到
    }
  },
  setup() {
    // 此处数据不是响应式
    // 只是为了测试setup这个配置项
    let name = 'zhangsan'
    let age = 18
    function hello() {
      // setup中的数据
      console.log(name)
      // data配置项中的数据
      // undefined访问不到
      console.log(this.a)
    }

    // setup的返回值
    return {
      name,
      age,
      hello
    }
  }
}
```



***当data配置项与setup返回了同名的数据，则以setup的为主***



总结：

- ***记住，Vue2与Vue3的配置不要混用就好了！！！***
  - Vue2.x的配置(data、methods、computed…)==可以访问到==setup中的属性方法
  - 但是setup函数中==不能访问到==Vue2.x的配置(data、method、computed)
  - 如果有重名，setup优先
- ***！！！setup不能是一个async函数，因为方法被async修饰后，返回值不在是return的对象，而是一个Promise对象，模板中就不能使用return的对象了***





## ref函数

在setup函数中，定义的普通变量，**不是响应式的数据**

```js
let name = 'zhangsan'
let age = 18
```

对这两个数据做出修改后，Vue不会监测到，页面上不能得到变化后的值

```js
export default {
  name: 'APP',
  setup() {
    let name = 'zhangsan'
    let age = 18
    function update() {
      console.log('修改数据了')
      name = 'lisi'
      age = 21
    }
    function hello() {
      alert(`你好~~我是${name},今年${age}`)
    }

    // setup的返回值
    return {
      name,
      age,
      hello,
      update
    }
  }
}
```

![image-20230526151010170](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526151010170.png)

即这样定义的数据是死的。

***如何将数据变成一个响应式的呢？***

***就需要用到ref()这个函数了，对这个数据进行封装后，变成了一个响应式的对象返回***

```js
setup(){
  // 创建响应式数据
  let name = ref('zhagnsan')
  let age = ref(18)
}
```



**来看看ref()方法加工完成后的数据是什么?**

***对于简单数据类型，ref()包装后返回的是类型为RefImpl的实例，这个实例身上的value属性就是真正的数据***

![image-20230526195932553](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526195932553.png)





所以在修改时，需要修改这个RefImpl对象的value属性

![image-20230526200030388](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526200030388.png)

**修改后，Vue能监听到，页面上的数据也会发生变化**

***对于引用类型的数据，ref也可以将其转换成响应式数据***

同样，ref()也可以支持响应式对象

```js
  let user = ref({
    name:'zhangsan',
    age:18
  })
```

**ref()实现响应式对象的原理是不同的，看一下这个对象**

真正的数据是一个Proxy对象（Vue3中响应式对象的原理）

![image-20230526200414669](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526200414669.png)



**如果要想获取真正的对象，也是需要通过响应式数据身上的value属性。**

修改响应式对象身上的属性值。

![image-20230526200501927](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526200501927.png)



## reactive()函数

***reactive()函数的作用是创建一个对象类型的响应式数据（基本数据类型不能用reactive，要用ref）***

语法

```js
const proxyObject = reactive({源对象})
```

- **返回一个代理对象**
- ***reactive定义的响应式数据是“深层次的”***
- ***内部是基于ES6的Proxy实现的，通过代理对象操作源对象内部数据***
- ref()在创建响应式对象时，内部也是通过调用reactive()来实现的。

```js
const user = reactive({
  name: 'zhagnsan',
  age: 18
})
```

![image-20230526201607311](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526201607311.png)



***当修改响应式对象中的数据时，可以直接修改其属性值，不再需要像ref的对象通过value属性，因为reactive是深度响应，***

![image-20230526201747618](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230526201747618.png)









## Vue3 响应式原理



### Vue2中的响应式原理

实现原理：

- 对象类型：通过`Object.defineProperty()`对属性的读、写进行拦截（数据劫持）
- 数组类型：通过封装原始的Array数组来实现对常用方法的拦截，对常用的方法重新进行了包装

存在的问题：

- **新增属性、删除属性，页面不会自动更新**（Object.defineProperty()只能捕获get/set，无法捕获delete）
- **直接通过数组索引修改元素，页面不会自动更新**





### Vue3中的响应式原理

**Vue2中存在的问题，在Vue3中不存在了**

```vue
<script>
import { reactive, ref } from 'vue'
export default {
  name: 'APP',
  setup() {
    let user = reactive({
      name: 'zhangsan',
      age: 18
    })
    let hobby = reactive(['吃饭', '睡觉', '打豆豆'])

    function addSex() {
      user.sex = '男'
    }

    function deleteSex() {
      delete user.sex
    }

    function updateArray() {
      hobby[0] = '王者荣耀'
    }

    return {
      user,
      hobby,
      addSex,
      deleteSex,
      updateArray
    }
  }
}
</script>

<template>
  <h1>我是APP根组件</h1>
  <h1>姓名{{ user.name }}</h1>
  <h1>年龄{{ user.age }}</h1>
  <h1 v-show="user.sex">性别:{{ user.sex }}</h1>
  <button @click="addSex">添加性别属性</button>
  <button @click="deleteSex">删除性别属性</button>
  <br />
  <h1>爱好</h1>
  <h2 v-for="(item, idx) in hobby" :key="item">{{ item }}</h2>
  <button type="button" @click="updateArray">索引修改数组</button>
</template>
```

演示效果如下：

![GIF 2023年5月27日 10-14-43](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/GIF%202023%E5%B9%B45%E6%9C%8827%E6%97%A5%2010-14-43.gif)











### Proxy()

在浏览器的window对象中，有这样一个构造函数，用来创建一个代理对象

对代理对象进行操作，就会影响到目标对象

对目标对象做出修改，代理对象也能获取到最新的值

```js
window.Proxy(target, hadler)
// target 目标对象、源对象
// hander 配置
```

基本使用

```js
let person = {
  name: 'zhagnsan',
  age:18
}

let p = new Proxy(person,{})

p.name
// 'zhagnsan'

p.name = 'lisi'

person.name
// 'lisi'

person.age = 21

p.age
// 21

```

基本使用中，搭理对象直接操作目标对象，但是我们还没有对操作进行拦截处理。

我们可以通过new Proxy(targe,handler)第二个参数，来对代理对象做出一些配置

**通过`new Proxy()`创建的代理对象，能够捕获到对目标对象的增、删、改、查**

**通过代理对象直接对目标对象做出增删改查，就会触发代理对象中定义的具体getter/setter、delete，在这些拦截方法中给出更高级的操作**

```js
  let person = {
    name: 'zhagnsan',
    age: 18
  }
  let p = new Proxy(person, {
    // 读取
    // target 目标对象、源对象
    // key 要读取的属性
    get(target, key) {
      console.log('有人读取了属性...')
      return target[key]
    },
    // 修改或新增
    // 两个参数
    // target: 目标对象、源对象
    // key 要操作的属性
    // val 修改后的新值
    set(target, key, val) {
      target[key] = val
      console.log('Vue...修改完成... 解析模版....渲染模版');
    },
    // 删除属性
    deleteProperty(target, key) {
      console.log('Vue... 删除属性....解析模版....渲染模版');
      console.log();
      return delete target[key]
    }
  })
```

![image-20230527113145003](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527113145003.png)



### Reflect

同样是window对象中的一个对象，反射对象，通过该对象能够操对象，类似于Java中的反射。

能够通过Reflect对象可以对任何对象进行操作，Java中的反射也是。

![image-20230527113842585](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527113842585.png)

我们来看一下Reflect中的常用方法：

![image-20230527114457062](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527114457062.png)

***在框架中，是不能依赖于具体的对象的，导致强耦合，不利于拓展，所以利用Reflect对象来对任意的对象进行操作，降低对具体对象的依赖程度***

上面利用Proxy创建对象的代码，利用Reflect优化后，才是真正的Vue3的响应式原理

```js
  let person = {
    name: 'zhagnsan',
    age: 18
  }
  let p = new Proxy(person, {
    // 读取
    // target 目标对象、源对象
    // key 要读取的属性
    get(target, key) {
      console.log('有人读取了属性...')
      return Reflect.get(target, key)
    },
    // 修改或新增
    // 两个参数
    // target: 目标对象、源对象
    // key 要操作的属性
    // val 修改后的新值
    set(target, key, val) {
      Reflect.set(target, key, val)
      console.log('Vue...修改完成... 解析模版....渲染模版');
    },
    // 删除属性
    deleteProperty(target, key) {
      console.log('Vue... 删除属性....解析模版....渲染模版');
      return Reflect.deleteProperty(target, key)
    }
  })
```



### 总结

Vue3中实现响应式的原理是利用Proxy和Reflect

- 通过Prox()生成目标对象的代理对象，拦截对象中任意属性的变化，包括属性的读、写、添加、删除等
- 在拦截的方法中，通过Reflect对象反射操作具体的对象

```js
  let p = new Proxy(person, {
    // 读取
    // target 目标对象、源对象
    // key 要读取的属性
    get(target, key) {
      console.log('有人读取了属性...')
      return Reflect.get(target, key)
    },
    // 修改或新增
    // 两个参数
    // target: 目标对象、源对象
    // key 要操作的属性
    // val 修改后的新值
    set(target, key, val) {
      Reflect.set(target, key, val)
      console.log('Vue...修改完成... 解析模版....渲染模版');
    },
    // 删除属性
    deleteProperty(target, key) {
      console.log('Vue... 删除属性....解析模版....渲染模版');
      return Reflect.deleteProperty(target, key)
    }
  })
```











## ref()与reactive()的对比

定义数据的角度：

- ref()定义响应式数据：基本数据类型
- reactive()定义：对象(或数组)类型数据
- *备注：ref()也可以用来创建对象类型的响应式数据，内部是通过调用reactive转为代理对象*



从原理的角度：

- ref()就是Vue2中原生的Object.defineProperty()的getter/setter来实现简单数据类型响应式(数据劫持)
- reactive()通过浏览器中的Proxy()来对对象类型数据实现响应式，并通过Reflect操作目标对象中的数据



从使用角度：

- ref()创建的数据：操作的数据需要通过`.value()`来对真实数据进行操作，模版中读取数据时，不需要`.value`
- reactive()定义的数据：操作数据与读取数据，均不需要`.value`，直接拿来用





## setup()的两个注意点

### setup()的执行的时机

这个setup()函数是什么时候执行的？

![image-20230527130300967](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527130300967.png)

![image-20230527130309026](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527130309026.png)



可以看到这个setup()是在beforeCreate()生命周期函数之前执行的

***因此，在setup()中的this是undefined***





### setup()的两个参数

其实setup()函数是可以接受两个参数的

```js
setup( props ,context)

// props 外部传递过来，且组件内使用了props接收了的属性值, 即本组件接收到的属性值

// context 上下文对象

```

这是Home.vue组件

```vue
<template>
  <div>Home组件</div>
</template>

<script>
export default {
  props: ['msg', 'age'],
  setup(props, context) {
    console.log(props)
    console.log(context)
    return {}
  }
}
</script>

<style></style>

```

这是父组件App.vue，引用了Home.vue

```vue
<script>
import Home from './components/Home.vue'
export default {
  name: 'APP',
  components: {
    Home
  }
}
</script>

<template>
  <Home msg="123" age="18"></Home>
</template>

<style scoped></style>

```



来打印一下这个两个对象

![image-20230527135218739](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527135218739.png)

**此处的context参数，可以认为是本组件实例，因为setup()中的this是undefined，所以此处的context可以认为是此组件的实例对象**



### emit()方法

**attrs属性不说了，跟Vue2中的组件实例的`$attrs`是一样的，用于存储的是外部传入了，但本组件没有接收的属性值。**

此处的emit()方法与Vue2中的组件实例的`this.$emit()`基本一样，用来触发自定义事件。

这是App.vue，我们为Home组价绑定了自定义事件

```vue
<script>
import Home from './components/Home.vue'
export default {
  name: 'APP',
  setup() {
    function helloMsg(name) {
      alert(`Hello!我叫${name}`)
    }

    return {
      helloMsg
    }
  },
  components: {
    Home
  }
}
</script>

<template>
  <Home @hello="helloMsg"></Home>
</template>

<style scoped></style>

```

这是Home.vue

```vue
<template>
  <div>Home组件</div>
  <button @click="test">触发自定义事件</button>
</template>

<script>
export default {
  emits: ['hello'],
  setup(props, context) {
    function test() {
      context.emit('hello', '张三')
    }
    return {
      test
    }
  }
}
</script>

<style></style>

```



***我们通过context对象的emit()方法来触发自定义事件***

**但是在Vue3中，父组件给子组件绑定的自定义事件，建议在子组件中用`emits`这个属性记录一下，这样子组件就知道了父组件给自身绑定了一个名称叫这玩意儿的自定义事件，如果不在子组件的`emits`中给出也是可以的，但是会报warning**

> 在本组件中触发其他组件的自定义事件，需要在`emits`属性中对自定义事件名做注册一下。
>
> **如果不在emits中对自定义事件做注册，那么Vue就会认为这个事件是一个原生事件，**
>
> 在setup中注册自定义事件，使用`defineEmits()`方法



### setup中使用emit()方法

在setup中声明自定义事件，使用`defineEmits()`方法，此方法会返回一个事件集合的对象，利用此对象来触发自定义事件



子组件

```vue
<script setup>
const $emits = defineEmits('vx-click')
// 触发自定义事件
function clickOpt() {
  $emits('vx-click', 'HEllO!')
}
</script>
<template>
  <button @click="clickOpt">点我触发父组件的自定义事件</button>
</template>
```

父组件

```vue
<script setup>
import HelloWorld from './components/HelloWorld.vue';

function myEventOpt(val) {
  alert(val)
}

</script>

<template>
  <HelloWorld @vx-click="myEventOpt"></HelloWorld>
</template>
```





### 总结：

- **setup()的执行时机**
  - 在生命周期的beforeCreate()之前执行**一次**，this是undefined
- setup()的两个参数
  - 第一个参数props，组件外部传递过来，且组件内部使用props接收了的属性值
  - 第二个对象context：当前组件的上下文对象，该对象有以下几个对象
    - attrs值是对象，组件外部传过来，但是没有在props中接收的属性值，相当于`this.$attrs`
    - slots收到的插槽的具体节点内容，相当于`this.$slots`
    - emit分发自定义事件的函数,相当于`this.$emit()`









## computed()计算属性

虽然在Vue3中可以想Vue2一样，定义一个computed节点，然后定义计算属性。

在Vue3组合式API中，推荐使用针对计算属性的一个组合式API `computed`，用法都是一样的

```js
// 简写属性
let res = computed( function(){})

// 需要传入一个函数
// computed返回的就是一个计算属性

// 完整写法
computed({
  set(val){
    
  },
  get(){
    return ...
  }
})
```

简写形式

```js
import { computed, reactive } from 'vue'
export default {
  name: 'APP',
  setup() {
    // 响应式数据
    let person = reactive({
      firstName: '',
      lastName: ''
    })

    // 计算属性
    // 简写方式
    let fullName = computed(() => {
      return person.firstName + ' - ' + person.lastName
    })
    return {
      person,
      fullName
    }
  }
}
```

完整写法

```js
import { computed, reactive } from 'vue'
export default {
  name: 'APP',
  setup() {
    // 响应式数据
    let person = reactive({
      firstName: '',
      lastName: ''
    })

    // 计算属性
    // 完整写法
    person.fullName = computed({
      get() {
        return person.firstName + ' - ' + person.lastName
      },
      set(val) {
        let name = val.split('-')
        person.firstName = name[0]
        person.lastName = name[1]
      }
    })
    return {
      person
    }
  }
}
```







## watch侦听器

侦听器的作用与Vue2的是一样的，对数据的变化做出监视。

Vue3中的侦听器是一个组合式的API

### watch()

watch不需要有返回值，因为它不是一个结果

1. 监听一个属性，简写形式

```js
// 简写形式
watch(source, callback)
// source监听的源对象
// callback 回调函数

let a = ref(1)

watch(a, (newVal, oldVal) => {
      console.log('a发生了变化')
      console.log(newVal, oldVal)
})
```

2. 完整写法，在Vue2中完整写法是一个对象，同时做出配置项

   在Vue3 CompositionAPI的watch中，配置项由第三个参数给出

```js
    let person = reactive({
      username: '张三',
      age: 18
    })

    watch(
      person,
      function (newVal, oldVal) {
        console.log('Person被修改')
        console.log(newVal, oldVal)
      },
      {
        // 初始时触发一次监听器
        immediate: true,
        // 深度监听
        deep: true
      }
    )

```



3. 一次监听多个变量

```js
    watch([a, b], function (newVal, oldVal) {
      // newVal 是变化后的最新值
      // 其中包括了这两个值，以及对应的在数组（前一个参数）中的索引
      console.log(newVal, oldVal)
    })
```



但是有两点需要注意：

1. **使用watch监听的reactive对象，无法正确获取oldVal**

   **对于reactive类型的对象，已经强制开启了深度监听，此时配置deep选项无效**

```js
<script>
import { reactive, watch } from 'vue'
export default {
  name: 'APP',
  setup() {
    let person = reactive({
      username: '张三',
      age: 18
    })

    watch(person, (newVal, oldVal) => {
      console.log(newVal, oldVal)
    })

    return {
      person
    }
  }
}
</script>

<template>
  <br />
  <input type="text" v-model="person.username" />
</template>

<style scoped></style>

```

![image-20230527212802278](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527212802278.png)







2. **监听reactive定义的数据中的某个属性时，deep配置有效**

```js
<script>
import { reactive, watch } from 'vue'
export default {
  name: 'APP',
  setup() {
    let person = reactive({
      username: '张三',
      age: 18,
      job: {
        position: '后端Java',
        salary: '15000'
      }
    })

    watch(
      () => person.job,
      (newVal, oldVal) => {
        console.log(newVal, oldVal)
      },
      {
        immediate: true,
        deep: true
      }
    )

    return {
      person
    }
  }
}
</script>

<template>
  <br />
  <input type="text" v-model="person.job.salary" />
</template>
```

3. 监听一个对象身上的多个属性

```js
    let person = reactive({
      username: '张三',
      age: 18,
      job: {
        position: '后端Java',
        salary: '15000'
      }
    })

    watch([() => person.job, () => person.username], (newVal, oldVal) => {
      console.log(newVal, oldVal)
    })
```





### 总结一下：

- 语法格式

  ```js
  watch([sources], callback, options)
  
  ```

  - 第一个参数是监听的数据源，可以传入一个数组，同时监听多个
  - 第二个就是callback，回调函数
  - 第三个是配置项

- **如果监听的是reactive类型的对象，那么回调函数中的oldVal参数无法正确获取，且深度监听是强制开启的，deep选项无效**

- 如果想要监听对象中的某个属性，要这样用

  ```js
  watch(()=>person.name, callback, options)
  ```

- 对于响应式数据的的某个属性也是对象，要监听此对象中的属性变化，此时需要开启深度监听`deep: true`

  ```js
  let user = reactive({
    username: 'zhangsan',
    age: 18,
    job: {
      position: 'Java',
      salary: 15
    }
  })
  
  watch(() => user.job, callback, {deep: true})
  ```

  



### 关于监听ref定义的数据

对于ref定义的数据：分为两种基本数据类型和对象类型

1. 如果监听的是基本数据类型，是不需要`.value`属性

```js
    let num = 1

    watch(num, (newVal, oldVal) => {
      console.log(newVal, oldVal)
    })

```



2. 监视对象类型，需要`.value`

   *因为ref在定义响应式对象时，委托的是reactive()，ref返回的RefImpl的value才是真正Proxy对象*

```js
    let user = ref({
      username: 'zhagnsna',
      age: 18,
      job: {
        postion: 'java',
        salary: 15000
      }
    })

    watch(user.value, (newVal, oldVal) => {
      console.log(newVal, oldVal)
    })
```



监听ref定义的对象，还有一种方式，不写`.value`，但是需要开启深度监听

```js
  let user = ref({
    username: 'zhagnsna',
    age: 18,
    job: {
      postion: 'java',
      salary: 15000
    }
  })

  watch(
    user,
    (newVal, oldVal) => {
      console.log(newVal, oldVal)
    },
    { deep: true }
  )
```





### watchEffect()

watchEffect()也是一个组合式API，也能实现监听。

特点是：

- 不需要指定要监视的数据源

该函数在使用时，只需要指定回调函数就可以了

**回调函数中用到了哪些数据，当这些数据发生变化时，才会触发watchEffect的回调函数**

```js
<script>
import { ref, reactive, watchEffect } from 'vue'
export default {
  name: 'APP',
  setup() {
    let person = reactive({
      username: '张三',
      age: 18,
      job: {
        position: '后端Java',
        salary: '15000'
      }
    })
    let num = ref(100)
    watchEffect(() => {
      console.log('数据变化了')
      let salary = person.job.salary
      console.log(salary, num.value)
    })

    return {
      person,
      num
    }
  }
}
</script>

<template>
  <br />
  <input type="text" v-model="person.job.salary" />
  <input type="text" v-model="num" />
</template>

```



**watchEffect有点像computed：**

- **但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。**
- **而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。**

```js
  watchEffect(() => {
    console.log('数据变化了')
    let salary = person.job.salary
    console.log(salary, num.value)
  })
```











## Vue3生命周期函数

### 对比

Vue3与Vue2的生命周期钩子基本不变

![vue2-3lifestyle](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/vue2-3lifestyle.png)

区别：

生命周期开始的时机：

- Vue2中当创建了Vue实例，就会触发生命周期，就会立马执行beforeCreate()、created()
- Vue3中只有当Vue实例绑定时，才触发生命周期

绑定等待：

- Vue2会等待mount这个阶段
- Vue3中没有等待mount的阶段

最后的生命周期：

- 在Vue2中，Vue实例的最后生命周期叫做销毁destroy
- Vue3中，最后的阶段叫做卸载unmount





### 在setup中配置生命周期钩子函数

**在Vue3中可以向Vue2那样配置生命周期钩子函数，但是注意函数名称变了**

- `beforeDestroy` ==> `beforeMount`
- `destroyed` ==> `mounted`

```js
export default {
  name: 'APP',
  setup() {
    console.log('....setup....')
  },
  beforeCreate() {
    console.log('....beforeCreate...')
  },
  created() {
    console.log('....created....')
  },
  beforeMount() {
    console.log('....beforeMount...')
  },
  mounted() {
    console.log('....mounted...')
  },
  beforeUpdate() {
    console.log('....beforeUpdate...')
  },
  updated() {
    console.log('....updated...')
  },
  beforeUnmount() {
    console.log('....beforeUnmount...')
  },
  unmounted() {
    console.log('....unmounted...')
  }
}
```



如何利用组合式API的方式写生命周期函数？

即将生命周期函数写在setup()中

- `beforeCreate`===>`setup()`
- `created`=======>`setup()`
- `beforeMount` ===>`onBeforeMount`
- `mounted`======>`onMounted`
- `beforeUpdate`===>`onBeforeUpdate`
- `updated` =======>`onUpdated`
- `beforeUnmount` ==============>`onBeforeUnmount`
- `unmounted` ========>`onUnmounted`

注意：beforeCreate()和created()在setup()就认为是setup()中的内容

==同样，使用这些组合式API时，也需要导入，给出回调函数，这些回调函数就是原先的生命周期函数中的方法体==

```js
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'
export default {
  name: 'APP',
  setup() {
    console.log('....setup....')

    onBeforeMount(() => {
      console.log('...onBeforeMount...')
    })

    onMounted(() => {
      console.log('...onMounted...')
    })

    onBeforeUpdate(() => {
      console.log('...onBeforeUpdate...')
    })

    onUpdated(() => {
      console.log('...onUpdated...')
    })

    onBeforeUnmount(() => {
      console.log('...onBeforeUnmount...')
    })

    onUnmounted(() => {
      console.log('...onUnmounted...')
    })
  }
}

```



*在setup()中配置了生命周期的钩子函数之后，就不推荐在配置项中继续给出Vue2中的写法了，如果非要这么写，那么setup()中的组合式的生命周期钩子的优先级更高，先执行setup()中的对应的生命周期，然后是普通的生命周期函数*

```js
export default {
  name: 'APP',
  setup() {
    console.log('....setup....')

    onBeforeMount(() => {
      console.log('...onBeforeMount...')
    })

    onMounted(() => {
      console.log('...onMounted...')
    })

  },
  beforeCreate() {
    console.log('....beforeCreate...')
  },
  created() {
    console.log('....created....')
  },
  beforeMount() {
    console.log('....beforeMount...')
  },
  mounted() {
    console.log('....mounted...')
  },

}
```

结果是

![image-20230527231100149](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527231100149.png)







## 自定义hook函数

- 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装。

- 类似于vue2.x中的mixin。

现在我们来封装一个获取鼠标坐标的钩子

在`src/hook/point.js`

```js
import { onMounted, onUnmounted, reactive } from 'vue'

export default function () {
  // 鼠标坐标
  let point = reactive({
    x: 0,
    y: 0
  })

  function get(e) {
    point.x = e.offsetX
    point.y = e.offsetY
  }

  onMounted(() => {
    window.addEventListener('mousemove', get)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', get)
  })

  // 将目标对象导出
  return point
}

```

在组件的setup()直接使用这个钩子函数

```js
<script>
import getPoint from './hook/point.js'
export default {
  name: 'APP',
  setup() {
    console.log('....setup....')
    let point = getPoint()
    return {
      point
    }
  }
}
</script>

<template>
  <h1>X:{{ point.x }},Y: {{ point.y }}</h1>
</template>

<style scoped></style>

```

![image-20230527233223308](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230527233223308.png)



**自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂。**











## toRef和toRefs

### toRef()

`toRef()`可以生成一个ref()类似的对象，此对象的value属性指向响应式对象的某个属性。

***即toRef()可以生成一个指针，指向一个响应式对象的属性，可以直接修改响应式对象的这个属性，同时响应式对象也会更新***

用法

```js
let refImpl = toRef(obj, key)
```

比如说，我只想让user对象的age属性暴露出去，同时修改也会影响到user对象。

```js
    let user = reactive({
      name: 'zhangsan',
      age: 18,
      obj: {
        position: 'Java',
        salary: 10
      }
    })

    let age = toRef(user, 'age')

    console.log(age)
    return {
      age,
    }
```

![image-20230528125046514](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230528125046514.png)





![image-20230528125421964](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230528125421964.png)







### toRefs

toRef()一次只能指向一个对象的属性的引用，而toRefs()可以一次性将对象的所有属性都引用，返回一个对象，这个对象中key就是原始对象中的key，属性值就是原始对象中的真实的数据。

```js
 
let refImpl = toRefs(obj)
```

![image-20230528125855837](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230528125855837.png)

***配合对象解构，可以将对象的每个属性都引用出去***

```vue
<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'APP',
  setup() {
    let user = reactive({
      name: 'zhangsan',
      age: 18,
      obj: {
        position: 'Java',
        salary: 10
      }
    })

    return {
      ...toRefs(user)
    }
  }
}
</script>

<template>
  <h2>姓名{{ name }}</h2>
  <h2>年龄{{ age }}</h2>
  <h2>岗位{{ obj.position }}</h2>
  <h2>薪资{{ obj.salary }}K</h2>
  <button @click="age++">点我</button>
</template>

<style scoped></style>

```

![image-20230528130156431](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230528130156431.png)





## 获取DOM引用

在选项式API中获取DOM引用非常简单

```vue
<script>
export default {
  methods: {
    opt(){
      this.$refs.h1.style.color = 'red'
    }
  }
}
</script>
<template>
  <button @click="opt">点我</button>
  <h1 ref="h1">Hey! Boy~~</h1>
</template>
```

在setup中获取DOM引用，需要通过`ref()`这个函数，就是用来定义响应式数据的`ref()`

**要保证用来接受的变量名与 DOM元素身上的ref属性值相同，否则引用不到**

```vue
<script setup>
import { ref } from 'vue'
// 接受的变量名与 DOM中ref属性值相同
const xxx = ref(null)
function myEventOpt() {
  console.log('~~~~')
  console.log(xxx)
  xxx.value.style.color = 'red'
}

</script>

<template>
  <button @click="myEventOpt">点我</button>

  <h1 ref="xxx">我是傻逼</h1>
</template>
```

> 注意：
>
> `ref()`和`ref(null)`是同理的，都可以

**如果要通过DOM引用的方式来操作子组件中的属性，那么在子组件中需要利用`defineExpose()`函数暴露属性，只有暴露出去的属性，父组件才能通过引用的方式访问到**

子组件

```vue
<script setup>
let count = ref(0)
defineExpose({
  count
})
</script>
<template>
  <h1>{{ count }}</h1>
</template>
```

父组件

```vue
<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue';
// 接受的变量名与 DOM中ref属性值相同
const son = ref(null)
function myEventOpt() {
  // 利用 引用的方式操作 子组件中的属性
  son.value.count ++
}

</script>

<template>
  <button @click="myEventOpt">点我</button>

  <HelloWorld ref="son"></HelloWorld>
</template>

```





# 其它Composition API

## shallowRef和shallowReactive

- shallowReactive()对对象类型的数据不是深度响应式，只对对象的直接子属性进行响应式，不深度响应
- shallowRef()只能处理基本数据类型的响应式，不对对象的进行处理

shallowReactive()的使用

```vue
<script>
import { shallowReactive, toRefs } from 'vue'
export default {
  name: 'APP',
  setup() {
    let user = shallowReactive({
      name: 'zhangsan',
      age: 18,
      obj: {
        position: 'Java',
        salary: 10
      }
    })

    return {
      user,
      ...toRefs(user)
    }
  }
}
</script>

<template>
  <h1>{{ user }}</h1>
  <h2>姓名{{ name }}</h2>
  <h2>年龄{{ age }}</h2>
  <h2>岗位{{ obj.position }}</h2>
  <h2>薪资{{ obj.salary }}K</h2>
  <button @click="age++">年龄+1</button>
  <button @click="obj.salary++">薪资 + 1</button>
  <!-- 点击薪资+1， 但是页面没有反应 -->
</template>
```

shallowRef()的使用：***如果说传入的是基本数据类型，那么shallowRef与ref没有区别，但是如果是对象类型，那么shalloRef不做处理***

![image-20230528134509201](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230528134509201.png)

```js
<script>
import { shallowRef } from 'vue'
export default {
  name: 'APP',
  setup() {
    let x = shallowRef(0)
    // ref处理对象类型的数据，会调用reactive创建Proxy实例
    // 然后将此Proxy实例挂载到RefImpl实例的value上
    // 但是shallowRef只能处理基本数据类型，但是对于对象类型的数据不做处理
    // 对象类型的数据, 则直接挂载到 RefImpl实例的value上
    let user = shallowRef({
      name: 'zs',
      age: 18
    })
    console.log(user)
    return {
      x,
      user
    }
  }
}
</script>

<template>
  <h1>x: {{ x }}</h1>
  <button @click="x++">x + 1</button>
  <h1>user.age{{ user.age }}</h1>
  <button @click="user.age++">age+ 1</button>
</template>

<style scoped></style>

```



**总结：**

- 如果对象解构比较深，但是变化的只是对象的最外层的属性，即对象的第一层属性，此时可以使用shalloReactive
- 如果对于一个对象类型的数据，后续不会修改对象中的属性，则可以使用shalloRef，（可以整体替换shallowRef的value来实现数据的变化）





## readonly与shallowReadOnly

**readonly将一个响应式数据变成只读的（深只读），不可以修改这个对象的任何数据。**

**但是shallowReadonly也是将一个响应式数据变成只读的，（浅只读），不可以修改该数据的直接属性，但是深层的属性还是可以修改的**

readonly()

```js
<script>
import { reactive, readonly, shallowRef, toRefs } from 'vue'
export default {
  name: 'APP',
  setup() {
    // 定义响应式数据
    let person = reactive({
      name: 'zs',
      age: 18,
      address: {
        tel: 123,
        site: 'Shandong'
      }
    })

    // 响应式数据变成只读的
    person = readonly(person)

    return {
      ...toRefs(person)
    }
  }
}
</script>

<template>
  <h1>age: {{ age }}</h1>
  <button @click="age++">x + 1</button>
  <h1>电话{{ address.tel }}</h1>
  <button @click="address.tel++">tel+1</button>
</template>

<style scoped></style>

```



![image-20230528140038142](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230528140038142.png)





shalloReadonly()

```js
<script>
import { reactive, readonly, shallowReadonly, shallowRef, toRefs } from 'vue'
export default {
  name: 'APP',
  setup() {
    // 定义响应式数据
    let person = reactive({
      name: 'zs',
      age: 18,
      address: {
        tel: 123,
        site: 'Shandong'
      }
    })

    // 响应式数据变成只读的
    person = shallowReadonly(person)

    return {
      ...toRefs(person)
    }
  }
}
</script>

<template>
  <h1>age: {{ age }}</h1>
  <!-- 不可以修改第一层属性 -->
  <button @click="age++">x + 1</button>
  <h1>电话{{ address.tel }}</h1>
  <!-- 可以深度修改 -->
  <button @click="address.tel++">tel+1</button>
</template>

<style scoped></style>

```

![image-20230528140243488](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230528140243488.png)













## toRaw和markRaw

- **toRaw将一个响应式的对象转换为普通的对象**
- **markRaw将一个普通对象标记为普通对象，Vue在加工时，不会将此对象处理成响应式**

toRaw()

![image-20230528141657988](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230528141657988.png)

```js
<script>
import { reactive, toRaw } from 'vue'
export default {
  name: 'APP',
  setup() {
    // 定义响应式数据
    let person = reactive({
      name: 'zs',
      age: 18,
      address: {
        tel: 123,
        site: 'Shandong'
      }
    })

    // 响应式数据变成只读的
    person = toRaw(person)

    return {
      person
    }
  }
}
</script>

<template>
  <!-- 无法响应式 -->
  <h1>age: {{ person.age }}</h1>
  <button @click="age++">x + 1</button>
  <h1>电话{{ person.address.tel }}</h1>
  <button @click="person.address.tel++">tel+1</button>
</template>

<style scoped></style>
```



markRaw()

```js
<script>
import { markRaw, reactive, toRefs } from 'vue'
export default {
  name: 'APP',
  setup() {
    // 定义响应式数据
    let person = reactive({
      name: 'zs',
      age: 18,
      // 此对象不可变
      address: markRaw({
        tel: 123,
        site: 'Shandong'
      })
    })

    return {
      ...toRefs(person)
    }
  }
}
</script>

<template>
  <!-- age可以响应式 -->
  <h1>age: {{ age }}</h1>
  <button @click="age++">x + 1</button>
  <!-- 但是address不可以响应式 -->
  <h1>电话{{ address.tel }}</h1>
  <button @click="address.tel++">tel+1</button>
</template>

<style scoped></style>

```



## customRef

***自定义ref，并对其依赖项 跟踪 和 更新触发进行显示控制***

**就是我们自定义响应式数据的方法，我们可以对自定义响应式的过程进行控制，需要借助customRef这个方法**

自定义`ref`的本质是`return customRef()`

`customRef`函数接受一个工厂函数，该工厂函数有两个参数，分别是用于追踪的`track`与用于触发响应的`trigger`,并且返回一个的对象，该对象需要有`get`和`set`方法

在get中显示调用track()表示该数据需要被追踪，在set中显示的调用trigger()表示当数据被修改时，需要更新UI界面。

一般来说，`track()` 应该在 `get()` 方法中调用，而 `trigger()` 应该在 `set()` 中调用。然而事实上，你对何时调用、是否应该调用他们有完全的控制权。

```js
<script>
import { customRef } from 'vue'
export default {
  name: 'APP',
  setup() {
    // 自定义ref
    function myRef(value) {
      // customeRef需要传入一个回调函数
      // 该回调函数有两个形参
      // track函数用来追踪最新数据
      // trigger函数是一个触发器，用来触发页面的更新
      return customRef((track, trigger) => {
        return {
          set(newVal) {
            console.log('数据被修改', newVal)
            value = newVal
            // 触发更新页面
            trigger()
          },
          get() {
            console.log('获取数据')
            // 在return前追踪最新数据
            track()
            return value
          }
        }
      })
    }

    // 自定义响应式数据
    let msg = myRef(123)

    return {
      msg
    }
  }
}
</script>

<template>
  <input type="text" v-model="msg" /><br />
  <h1>{{ msg }}</h1>
</template>

<style scoped></style>

```



## provide和inject

通过这两个API，能够实现**父组件给任意后代组件传递数据**

- 父组件通过`provide()`提供数据，后代中通过`inject()`来注入父组件中指定的数据

***无论是多少层的后代，都可以直接通过inject()来获取祖先提供的数据，如果不同祖先提供了同名数据，就近原则***

![image-20230528154915778](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230528154915778.png)



父组件App.vue

```js
<script>
import { provide, reactive } from 'vue'
import Son from './components/Son.vue'
export default {
  name: 'APP',
  setup() {
    // 准备数据
    let car = reactive({
      name: 'Benz',
      price: '100W'
    })
    // 提供数据
    provide('car', car)
    return {
      car
    }
  },
  components: {
    Son
  }
}
</script>

<template>
  <div id="App">
    <h1>我是APP组件{{ car.name }} --- {{ car.price }}</h1>
    <Son />
  </div>
</template>

<style scoped>
#App {
  background-color: #14861d;
  padding: 10px;
}
</style>

```



Son.vue

```js
<script>
import GrandSon from './GrandSon.vue'
export default {
  setup() {},
  components: {
    GrandSon
  }
}
</script>
<template>
  <div id="son">
    <h1>我是儿子组件</h1>
    <GrandSon />
  </div>
</template>

<style>
#son {
  background-color: #885050;
  padding: 10px;
}
</style>

```



GrandSon.vue

```js
<script>
import { inject } from 'vue'
export default {
  setup() {
    // 注入祖先的数据
    let car = inject('car')
    return {
      car
    }
  }
}
</script>
<template>
  <div id="grandSon">
    <h1>我是孙子节点{{ car.name }} -- {{ car.price }}</h1>
  </div>
</template>

<style>
#grandSon {
  background-color: #fff;
  padding: 10px;
}
</style>

```



![image-20230528155100470](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230528155100470.png)





## 响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理





# CompositionAPI 的优势



## Options API存在的问题



![image-20230528161109483](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230528161109483.png)



## CompositionAPI的优势

不同功能就是一个单独的Hook，每个功能只需要维护与其相关的代码，且复用性更强。

![CompositionAPI](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/CompositionAPI.png)







# Vue3中新增的组件

## Fragment组件

正是因为这个组件的存在，我们在Vue3中的每个组件中不必必须存在一个根标签

vue2中的template，必须存在一个根标签

Vue3中的template，可以不用存在一个根标签。

**Vue3在处理时，会将这多个标签包含在一个Fragment虚拟组件中，而且此组件不参与渲染**

**好处：减少标签层级，减少内存占用**







## Teleport组件

**这个组件可以将内部的HTML结构，移动到指定的DOM元素的位置。**

```js
  <Teleport to="selector">
   // .... .HMTL 结构
  </Teleport>
```

to属性是一个CSS的选择器，用来选择目的地，要将内部的HTML结构搬运到 哪里？









## Suspense组件

**等待异步组件时渲染一些额外内容，让应用有更好的用户体验**

**Suspense是一个异步组件，用来渲染异步组件**

先来说异步组件，我们在引入组件时，普通的方式是同步引入，即后面的代码会被阻塞
```js
import Home from './componets/Home'
// 静态引入, 同步引入
```

我们也可以异步引入，同时将此组件定义成一个异步组件，异步组件的加载不会影响到主线程的渲染，啥时候好了啥时候通知主线程。

使用`defineAsyncComponent()`引入并定义一个异步组件，该方法需要传入一个函数，在函数中完成组件的加载并返回

```js
<script>
import { defineAsyncComponent } from 'vue'
// 异步引入
// 并将引入的组件定义成异步组件
const Home = defineAsyncComponent(() => import('./components/Home.vue'))
export default {
  name: 'APP',
  setup() {
    return {}
  },
  components: {
    Home
  }
}
</script>

<template>
  <div id="App">
    <h1>根组件</h1>
    <Home />
  </div>
</template>

<style scoped>
#App {
  background-color: #14861d;
  padding: 10px;
}
</style>

```



***异步组件的加载不会阻塞主线程加载渲染其他组件，当异步组件加载完毕之后，然后再渲染到页面***

***但是我们这种硬生生地加载渲染异步组件的用户体验感不好，万一用户的网速很慢，还没有看到页面上的异步组件，就已经开始操作了，用户并不知道有这个组件，体验感不好***

因此，我们可以使用`Suspense`这个组件，本质就是一个插槽，我们可以给出异步组件加载中和加载完成后的渲染不同的样式

`<Suspense>` 组件有两个插槽：`#default` 和 `#fallback`。两个插槽都只允许**一个**直接子节点。

加载过程中或加载失败，就显示`#fallback`这个插槽中的内容；加载成功就显示`#default`中的内容。

演示一波

```vue
<script>
import { defineAsyncComponent } from 'vue'
// 异步引入
// 并将引入的组件定义成异步组件
const Home = defineAsyncComponent(() => import('./components/Home.vue'))
export default {
  name: 'APP',
  setup() {
    return {}
  },
  components: {
    Home
  }
}
</script>

<template>
  <div id="App">
    <h1>根组件</h1>
    <Suspense>
      <template #default>
        <!-- 要渲染的组件 -->
        <Home />
      </template>

      <!-- 加载中时，要渲染的组件 -->
      <template #fallback>
        <h1>稍等,加载中....</h1>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
#App {
  background-color: #14861d;
  padding: 10px;
}
</style>

```

![image-20230528171643791](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230528171643791.png)

![image-20230528171707637](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230528171707637.png)







# Vue3的其他变化

## setup语法糖

在没有这个语法糖之前，我们需要这样来书写Composition API

```js
<script>
export default{
	setup(){
    //.....
    
    return {
      //....
    }
  }
}
</script>
```

我们只需要在`<script>`标签上标记`setup`，然后书写setup()中的代码就好了。

```js
<script setup>
  //...
  
</script>
```

我们在`<script setup>`中写的都是原先`setup()`中的代码，

- 无需通过return导出
- 无需注册组件，导入即用









## 全局API的转移

- Vue 2.x 有许多全局 API 和配置。

  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })
    
    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0中对这些API做出了调整：

  - **将全局的API，即：```Vue.xxx```调整到应用实例（```app```）上，即项目入口js文件中，通过createApp()创建的实例名称**

    | 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)                        |
    | ------------------------- | ------------------------------------------- |
    | Vue.config.xxxx           | app.config.xxxx                             |
    | Vue.config.productionTip  | <strong style="color:#DD5145">移除</strong> |
    | Vue.component             | app.component                               |
    | Vue.directive             | app.directive                               |
    | Vue.mixin                 | app.mixin                                   |
    | Vue.use                   | app.use                                     |
    | Vue.prototype             | app.config.globalProperties                 |

## 其他改变

- **data选项应始终被声明为一个函数，不论是组件中，还是普通的Vue实例中，data选项必须要是一个函数**

- 过度类名的更改：

  - Vue2.x写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
    
    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- <strong style="color:#DD5145">移除</strong>keyCode作为 v-on 的修饰符，同时也不再支持```config.keyCodes```

- <strong style="color:#DD5145">移除</strong>```v-on.native```修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - **子组件中声明自定义事件：如果不声明，那么在子组件上绑定事件，就认为该事件是一个原生事件。**

    只有在子组件中声明了的事件名称，才会被认为是自定义事件。

    ```vue
    <script>
      export default {
        emits: ['close']
      }
    </script>
    ```

- <strong style="color:#DD5145">移除</strong>过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ......











# Vue3中的路由

## 起步

Vue-router在Vue3中要安装4.x版本。

```sh
npm install vue-router@4
```

用法基本不变

首先创建路由模块

新建`router/index.js`

```js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router

```

在main.js中，直接注册插件

```js
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
// 直接注册插件
app.use(router)

app.mount('#app')

```

在组件中通过`<router-link>`和`<router-view>`来使用就好了。

```vue
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </div>
  </header>

  <router-view />
</template>
```



## 使用

创建路由实例，不再是直接new Router()了，而是使用类似于createApp()的一个函数

```js
 createRouter(options)
```

**创建路由模块**

```js
import { createRouter } from 'vue-router'
import { createWebHashHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'

const routes = [
    {

        path: '/',
        component: HelloWorld
    },
    {
        path:'/home',
        component: () => import('@/components/Home.vue')
    }
]

const router  = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
```



在`main.js`中挂载路由模块，

```js
import { createApp } from 'vue'
import App from './App.vue'
// 引入路由模块
import router from '@/router'

const app = createApp(App)
// 注册为插件
app.use(router)


app.mount('#app')

```

> 注意：
>
> 要在Vue实例挂载之前注册插件，不可以在挂载之后注册插件
>
> 错误的实例
>
> ```js
> import './assets/main.css'
> 
> import { createApp } from 'vue'
> import App from './App.vue'
> // 引入路由模块
> import router from '@/router'
> 
> const app = createApp(App)
> 
> app.mount('#app')
> 
> // 注册为插件
> app.use(router)
> ```
>
> 



在组合式API中，

- useRoute()返回当前的路由地址，相当于之前的`$route`
- useRouter()返回路由实例，相当于之前的`$router`

在Vue组件中使用时，也可以

- RouterLink 一个链接组件，相当与router-link
- RouterView 待渲染的组件，相当于router-view

***其余在Vue2中怎么使用还是怎么使用就好了***





## 不同历史记录模式

在Vue-router4.x中，创建路由模块时，必须要指定要使用的**历史记录模式**



### Hash模式

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ],
})
```

URL之间的跳转是通过hash地址的形式，例如`http://localhost:8080/#/home`

由于hash地址是以`#`作为标识，所以url地址不美观，而且对SEO不友好。

**由于Hash地址之间的跳转，不会将URL发送给服务器，所以不用担心服务器层面上的配置**



### HTML5模式

vue-router推荐使用这个模式，

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ],
})
```

当使用这种历史记录模式时，URL中不会出现`#`，url比较美观。

问题是：

取消了hash地址后，页面之间通过vue-router跳转是没有问题的。

但是直接在浏览器地址栏访问`http://example.com/user/id`，就会将这个url发送给服务器，就会得到404页面。

**需要我们在服务器层面做一个简单的配置**

[详见官网—服务器配置示例](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%85%8D%E7%BD%AE%E7%A4%BA%E4%BE%8B)



## 路由匹配

### 普通使用

```js
{
    path: '/user/:uid',
        component: () => import('@/views/User.vue'),
}
```



### 自定义正则表达式

**在参数后面的小括号中，直接书写正则表达式，注意正则表达式中部分元字符需要转义。**

```js
{
    path: '/user/:username([a-e]*)',
        component: () => import('@/views/User.vue'),
}
```

只有匹配该正则表达式`[a-e]*`的路径才会匹配到此路由

注意：简写字符集转义的问题，

例如在正则表达式中`\d`是匹配数字，但是在请求路径中`\`有特殊的函数，所以需要对`\d`做转义

```js
{
    path: '/user/:username([a-e]*\\d+)',
        component: () => import('@/views/User.vue'),
}
```







### 可选参数

只需要在参数后面加一个`?`，该参数就是可选的了

```js
{
    path: '/user/:username?',
        component: () => import('@/views/User.vue'),
}
```







### 可重复参数

在参数后面，通过`+`或`*`来设定此参数是可以重复的。

- `+` 1或多次
- `*` 0或多次

```js
const routes = [
  // /:chapters ->  匹配 /one, /one/two, /one/two/three, 等
  { path: '/:chapters+' },
  // /:chapters -> 匹配 /, /one, /one/two, /one/two/three, 等
  { path: '/:chapters*' },
]
```





## 重定向和别名

当访问一个路劲时，重定向到另一个路由，并且URL发生变化

```js
    {
        path: '/',
        redirect: '/home'
    },
    {
        path:'/home',
        component: () => import('@/components/Home.vue')
    },
```



### 别名







## 命名路由

为词条路由规则起一个名称，这样做的优点是：

- 没有硬编码URL
- `params`会自动编码解码

只需要在给出此条路由规则的name属性即可

```js
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User,
  },
]
```

**此时使用`<RouterLink>`进行路由跳转时，to属性需要给出一个对象，在对象中给出命名路由的名称，可以在对象中给出路径参数params**

```html
<router-link :to="{ 
                  name: 'user', 
                  params: 
                  	{ username: 'erina' }
                  }">
  User
</router-link>
```

**在编程式路由中，也可以使用该对象**

```js
router.push({ name: 'user', params: { username: 'erina' } })
```



## 命名视图

命名视图。

有时想要同时展示多个视图（组件），并不是嵌套关系，而是并列关系，此时就需要使用命名视图了。

**命名视图就是利用多个`<router-view>`来分发不同的路由组件而已~~**

一个`<router-view>`就看做一个视图，一个视图只负责一个组件的渲染。

`<router-view>`也是有name属性的，如果不给出name属性，那么默认此视图的名称就是`default`。

**我们在配置路由规则时，为不同的视图分发不同的组件即可。**

像这样：

给出不同名称的视图

```html
<template>
  <!-- 名称是default -->
  <RouterView/>
  <!-- 指定名称 -->
  <RouterView name="User"></RouterView>
  <RouterView name="sidebar"></RouterView>
</template>
```

配置多视图，注释是`components`，不是`component`，

`component`是用来配置单个组件，`components`才是配置多个组件

```js
const routes = [
    {

        path: '/',
        components: {
            default: HelloWorld,
            'User': () => import('@/views/User.vue'),
            'sidebar': () => import('@/views/Sidebar.vue')
        }
    }
]
```









## 路由传参

虽然可以通过route对象来获取请求参数，但是这就导致了组件与route对象的紧耦合。

**我们需要在组件中定义同名的属性prop**

**在路由配置时，开启props传参**



组件

```js
<script setup>
defineProps({
    uid: {
        required: true
    }
})
</script>

<template>
    <h1>这是用户详情界面，你的id是{{ uid }}</h1>
</template>

<style></style>
```

配置路由规则时，开启props传参

```js
    {
        path: '/user/:uid',
        component: () => import('@/views/User.vue'),
        // 开启props传参
        props: true
    }
```

> 注意：
>
> 在组件中定义属性时，要保证**属性名与url中占位符的名称相同**
>
> 即，在定义路由规则时，`/user/:uid`，那么在组件中定义属性时，属性名必须也是`uid`，否则请求参数无法映射到属性上





### 布尔模式

当路由规则中的props设置为true时，`route.params`中的参数会映射到组件的props中，如上所示。



### 命名视图

对于具有**命名视图**的路由，需要为每个组件都要设置是否开启props传参。

```js
const routes = [
  {
    path: '/user/:id',
    components: { 
        default: User, 
        sidebar: Sidebar 
    },
    props: { 
        default: true, 
        sidebar: false 
    }
  }
]
```





### 对象模式

**当props是一个对象时，将会原样把这个对象赋给组件的props属性。**

*即，这个对象中的属性会自动映射到 props中同名的属性*

同样需要我们在组件中定义同名属性

像这样

组件

```vue
<script setup>
// 定义接受的路由参数
defineProps(['uid','username'])
</script>

<template>
    <h1>你好！{{ username }}</h1>
    <h1>这是用户详情界面，你的id是{{ uid }}</h1>
</template>

```

定义路由规则	

```js
const routes = [
	{
        path: '/user',
        component: () => import('@/views/User.vue'),
        // 开启props传参
        props: {
            username: 'zhangsan',
            uid: 18
        }
    }
]
```

![image-20230703143550687](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230703143550687.png)





### 函数模式

可以创建一个函数来返回props对象，**该函数可以接受本次路由对象route作为参数**

```js
const routes = [
  {
    path: '/search',
    component: SearchUser,
    props: route => ({ query: route.query.q })
  }
]
```

这样，当访问URL `/search?q=vue` 将传递 `{query: 'vue'}` 作为 props 传给 `SearchUser` 组件。







## 路由元信息

将额外的信息附加到本次路由上，可以通过meta属性来实现。

可以通过`route`对象来获取到本次路由中个meta属性。

定义meta属性

```js
    {
        path: '/user/:uid',
        component: () => import('@/views/User.vue'),
        // 开启props传参
        props: true,
        meta:{
            requireAuth: true,
            copyright: 'Mingkai Liu'
        }
    }
```

例如，在全局导航守卫中，就可以读取到route对象中的meta属性

```js
router.beforeEach((to,from, next) => {
    // 如果目标路由需要验证
    if(to.meta.requireAuth){
        console.log('请先登录')
        return {
            path: '/login',
            query: {
                // 保存目标路由，后续使用	
                redirect: to.fullPath
            }
        }
    }else{
        // 放行
        next()        
    }

})
```









# Vue3中的Vuex

在Vue3中使用Vuex 4. x版本，但是官方已经不推荐使用Vuex了，而是最新的pinia



## 起步

安装

```sh
npm i vuex@4
```

新建仓库模块`store/index.js`

```js
import { createStore } from 'vuex'
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      count: 0
    }
  },
  actions: {
    addAction(context, val) {
      context.commit('increment', val)
    }
  },
  mutations: {
    increment(state, val) {
      state.count += 1
    }
  }
})

export default store

```

在main.js中注册插件

```js
import store from '@/store'

// Vuex插件
app.use(store)
```

当我们注册了Vuex插件后，就会在组件实例上多了一个`$store`对象，可以通过该对象获取store模块的所有信息。

在组合式API中，通过useStore()来获取组件实例身上的`$store`对象

```vue
<script setup>
import { useStore } from 'vuex'
import { toRef } from 'vue'
let store = useStore()
let count = toRef(store.state, 'count')
function add() {
  store.dispatch('addAction', 1)
}
</script>
<template>
  <button type="button" @click="add">{{ count }}</button>
</template>

<style></style>

```



## 使用

在Vue2中，创建Store实例是`new Vuex.Store()`

在Vue3中，直接`createStore(options)`

组合式API中，获取state对象的方式是`useStore()`

***其余用法一致***







# Pinia

组合式API中的状态管理工具，Pinia的出现就是为了更好的结合组合式API。

[中文官网https://pinia.vuejs.org/zh/](https://pinia.vuejs.org/zh/)

这个小菠萝非常可爱`~~~~~`

![image-20230529135855520](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230529135855520.png)

还是先看Vuex，再来看这个Pinia更好一些，更容易理解。

Pinia是在Vuex4.x的版本上升级而来的。

Pinia的优势：

- 简单、轻量、易用
- 完美支持TS(未来一定是拥抱TS的时代)



## 起步

1. 安装依赖

```sh
npm i pinia
```



2. 在main.js中，注册pinia插件

```js
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
// 创建pinia实例，并注册为插件
app.use(createPinia())

app.mount('#app')

```

配置完成，接下来怎么使用

## 分析

在pinia中，直接将Mutations砍掉了，只有`state、Getter、action`

比Vuex更简单、更轻量。

![image-20230529185144449](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230529185144449.png)

***我们知道，在Vuex中是由一个叫做Store的实例，来负责管理state、action、getter等这些属性，在pinia中，同样是一个叫做store的实例来管理，而且在pinia中，这个store对象就是一个reactive()类型的对象***

在Vue3中，怎么创建这个Store实例对象？

***通过`defineStore()`的方法返回一个创建store对象的方法，我们将这个函数导出***

```js
import { defineStore } from 'pinia'

// 你可以对 `defineStore()` 的返回值进行任意命名，
// 但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAlertsStore = defineStore('alerts', {
  // 其他配置...
})
```

**注意：**

这个defineStore()返回的是一个函数，通过这个函数能够获取到store对象







## 选项式中使用

选项式中是怎么用的

我们在`/store/`新建`studentStore.js`

```js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // 真正的数据
  state: () => ({ count: 0 }),
  // getters相当于计算属性computed
  getters: {
    double: (state) => state.count * 2
  },
  // 对数据进行修改的method
  actions: {
    increment() {
      this.count++
    }
  }
})

```

我认为官网的解释就很好

> 你可以认为 `state` 是 store 的数据 (`data`)，`getters` 是 store 的计算属性 (`computed`)，而 `actions` 则是方法 (`methods`)。

**此处的state配置项，类似于组件中的data，是一个函数且必须将数据作为对象返回。**

在组件中引入我们的store模块，直接使用就好了，

***注意：在创建store时，传入的配置项state、getters、actions中的内容，可以直接在store实例对象身上调用***



看个例子，首先创建`/stores/studenStore.js`模块

````js
import { defineStore } from 'pinia'

export const useStudentStore = defineStore('studentStore', {
  // 真正的数据
  state() {
    return {
      name: 'zhangsan',
      age: 18
    }
  },
  // getters相当于计算属性computed
  getters: {
    getInfo() {
      return `你好我是${this.name},我今年${this.age}`
    }
  },
  // 对数据进行修改的method
  actions: {
    increment() {
      this.age++
    }
  }
})

````



2. 在组价中如何获取store对象

引入该模块，在setup中直接获取

```vue
<script>
import { useStudentStore } from '@/stores/studentStore.js'
export default {
  setup() {
    // 获取store对象
    let student = useStudentStore()
    return {
      student
    }
  },
  data() {
    return {}
  },
  mounted() {}
}
</script>
<template>
  <h1>姓名:{{ student.name }}</h1>
  <h1>年龄:{{ student.age }}</h1>
  <h2>{{ student.hello }}</h2>
  <button @click="student.age++">age + 1</button>
</template>

<style></style>

```



![image-20230529193819330](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230529193819330.png)









## 组合式中使用

官方还是更推荐在组合式中使用，更简洁，拓展性更强。

需要这样来定义store模块

***`defineStore()`传入的不再是一个配置对象，而是一个函数，***

```js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // 普通数据相当于state
  const count = ref(0)
  // computed计算属性相当于 getter
  const doubleCount = computed(() => count.value * 2)
  // 普通函数相当于 action
  function increment() {
    count.value++
  }

  // 提供出去
  return { count, doubleCount, increment }
})

```

> 依旧是官网的解释
>
> 在 *Setup Store* 中：
>
> - `ref()` 就是 `state` 属性
> - `computed()` 就是 `getters`
> - `function()` 就是 `actions`

使用

```vue
<script setup>
import { useCounterStore } from '@/stores/counter.js'
const counterStore = useCounterStore()
</script>
<template>
  <button type="button" @click="counterStore.count++">
    {{ counterStore.count }}
  </button>
</template>
```







## state

State对象是Store中的核心了，因为state属性中存储我们的数据。

在setup中

在组合式API中，在store中，普通的数据都会直接甩给state属性

```js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useStudentStore = defineStore('studentStore', () => {
  // state中的数据
  let name = ref('zhangsan')
  let age = ref(18)

  // getters,也可以认为是computed
  let hello = computed(() => {
    return `你好！我是${name.value},我今年${age.value}`
  })

  // actions
  function addAge() {
    age++
  }

  // 导出
  return {
    name,
    age,
    hello,
    addAge
  }
})

```



**默认情况下，你可以通过 `store` 实例访问 state，直接对其进行读写，但是不推荐直接对state中的数据修改**

***更推荐通过action来修改state中的数据***



在选项式中，可以通过mapState()来将state中的数据映射成计算属性

跟Vuex中的mapState()用法一样



关于在setup()中使用，官网：

> 虽然并不是每个开发者都会使用组合式 API，但 `setup()` 钩子依旧可以使 Pinia 在选项式 API 中更易用。并且不需要额外的映射辅助函数!

**组合式中，一切都直接通过store对象访问就好了**



### storeToRefs



在组合式中，不能像普通对象一样解构store，这样会失去响应式

```js
import { useCounterStore } from '@/stores/counter.js'
const counterStore = useCounterStore()

// 错误做法
// 直接解构，相当于赋值
// count不是响应式的
let { count } = counterStore
```



可以通过pinia提供的`storeToRefs()`，类似与Vue中的toRefs()

***storeToRefs()会为store对象中的state、getter创建引用，配合解构出来的数据不会丢失响应式***

```js
<script setup>
import { useCounterStore } from '@/stores/counter.js'
import { storeToRefs } from 'pinia'
const counterStore = useCounterStore()
// 正确做法
let { count } = storeToRefs(counterStore)
</script>
<template>
  <button type="button" @click="count++">
    {{ count }}
  </button>
</template>

<style></style>

```





## Pinia持久化

Pinia中的数据是基于内存的，一旦刷新，数据就会丢失。

众所周知，所有的数据都是用户数据中，最重要的就是Token，每次与后端交互，都需要携带token来校验用户，所以想法将这个token持久化存储。

我们知道浏览器中，有localStorage，可以利用这一机制来实现token持久化存储。

基于这一原理，有一款插件，为了简化我们Pinia持久化存储

[中文官网Pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/)



1. 安装

```sh
npm i pinia-plugin-persistedstate
```



2. 注册为pinia的插件

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

app.mount('#app')

```



3. 创建Store时，将 `persist` 选项设置为 `true`。

```js
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore(
  'userStore',
  () => {
    // 定义用户数据
    const userInfo = ref({})
    return {
      userInfo
    }
  },
  {
    persist: true
  }
)
```





### 插件的运行机制

当在某个Store中的使用了该插件后，**此Store中的所有return出去的state就会持久化存储到localStorage中，获取数据时，同样是优先从localStorage中获取。**

- 使用 [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 进行存储
- [`store.$id`](https://pinia.vuejs.org/api/interfaces/pinia.StoreProperties.html) 作为 storage 默认的 key
- 使用 [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)/[`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 进行序列化/反序列化
- 整个 state 默认将被持久化

以Store的名称为key，自动序列化存储到localStorage中。

重新加载时，会自动从localStorage中加载同名称属性到Pinia中

**始终保持store中的state与localStorage中的同步**

![image-20230607091056929](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230607091056929.png)







## 总结



> **关于Pinia，没啥说的，会了Vuex，就会Pinia了。**
>
> **建议先去看看Vuex**

















# Vue3进阶

## 组件之间的通信方式

在Vue3中组件之间的自定义事件，非常多

### 1. props传参

子组件定义props，父组件在引用子组件时，给属性传参。

**注意：在`setup`中，定义属性需要使用`defineProps()`方法，该方法不需要引入，返回值就是全部的属性组成的一个对象**

**defineProps()的返回值是一个全部属性的一个对象，这个对象也是Proxy类型的**

**defineProps()方法在setup中只能被使用一次，不可以多次调用，否则报错**

defineProps()该方法的参数可以是一个对象，也可以是一个数组

```js
// 数组的写法
let props = defineProps(['msg', 'type'])

// 对象的写法
let props = defineProps({
  msg: {
    default: 'Hello',
    type: String
  },
  name: {
    required: true
  }
})

```

案例：

1. 子组件定义props

```js
<script setup>
let props = defineProps({
  msg: {
    default: 'Hello',
    type: String
  },
  name: {
    required: true
  }
})

// 但是组件需要通过props属性对象来访问属性
console.log(props.msg)
</script>
<template>
  <!-- 模版中可以直接使用 -->
  <h1>{{ msg }}</h1>
  <h2>{{ name }}</h2>
</template>

<style></style>

```



2. 父组件传参

```js
<script setup>
import Son from './Son.vue'
</script>

<template>
  <Son msg="Hello!My Son" name="23"></Son>
</template>
<style></style>

```



### 2. 自定义事件

在Vue3中，给子组件身上绑定事件，如果不通过子组件内的`defineEmits()`方法生命，那么就认为此事件是原生事件。

例如：

```html
<Son @transfer="accept"></Son>
```

这句代码，给子组件绑定了自定义事件，因为没有在子组件中声明此事件，所以就认为此事件是原生事件。



***在子组件中声明自定义事件***

***子组件setup中，利用defineEmits()，来声明自定义事件，父组件中绑定的自定义事件，必须是子组件中声明的***



案例：

1. Son.vue组件

生命自定义事件，并触发自定义事件

```vue
<script setup>
// 子组件声明自定义事件
// 被声明了的事件，就是自定义的了，不是原生的了
// 即使我声明了click，那么click对于此组件来说，就是自定义的，不再是原生的了

// 该方法返回一个包含了所有自定义事件的对象，可以通过此对象来触发自定义事件
let $emit = defineEmits(['transfer', 'hello'])

// 触发自定义事件
function handler() {
  // $emit接受两个参数
  // 第一个要触发的自定义事件名
  // 第二个是要传递的参数,是一个省略[不定长]参数
  $emit('transfer', 99)
}
</script>
<template>
  <!-- 模版中可以直接使用 -->
  <button type="button" @click="handler">点我给父组件发送数据</button>
</template>

<style></style>

```



2. 父组件给自定义事件绑定处理函数

```js
<script setup>
import { ref } from 'vue'
import Son from './Son.vue'

let sonVal = ref('')
function accept(val) {
  sonVal.value = val
}
</script>

<template>
  <h1>儿子组件传递过来的值{{ sonVal }}</h1>
  <Son @transfer="accept"></Son>
</template>
<style></style>

```



> 如果要在选项式中，声明组件的自定义事件，通过`emits`这个配置项
>
> ```js
> export default {
>   // 声明组件的自定义事件
>   emits: ['hello', 'transfer'],
>   data() {
>     return {}
>   }
> }
> ```



### 3. event - bus事件总线

在Vue2中可以通过`new Vue()`的方式来创建一个中间变量

但是在Vue3中，没有了构造函数，而且setup中没有this

***可以借助一个插件来实现event-bus***

插件名称叫做`mitt`

```sh
npm i mitt
```



1. 创建bus.js模块

```js
import mitt from 'mitt'
// mitt是一个方法，会返回一个bus实例
const $bus = mitt()
// 导出bus对象
export default $bus
```



2. 在接收的组件中，绑定事件

导入此对象，并绑定事件

```js
import $bus from './modules/bus.js'
$bus.on('hello', function (msg) {
  alert(`这是接收到的数据${msg}`)
})
```





2. 在发送的组件中，触发事件

导入bus对象，触发事件

```js
<template>
  <button type="button" @click="submit">发送</button>
</template>

<script setup>
import $bus from './modules/bus.js'
function submit() {
  $bus.emit('hello', '你好！')
}
</script>

<style></style>

```











### 4. 利用v-model传参

**v-model在组件身上使用，相当于**

- 给子组件定义了一个prop，名称叫做`modelValue`
- 给子组件绑定了一个自定义事件，事件名称叫做`update:modelValue`

> [Vue官方文档——v-model组件上使用](https://cn.vuejs.org/guide/components/v-model.html)

1. 父组件通过`v-model`传参

```js
<script setup>
import { ref } from 'vue'
import Son from './Son.vue'
let num = ref(0)
</script>

<template>
  <input v-model="num" />
  <Son v-model="num"></Son>
</template>
```



2. 子组件中只需要做两件事
   - 接受这个prop参数
   - 声明自定义事件

```js
<script setup>
// 接受参数
let props = defineProps(['modelValue'])
// 生命自定义事件
defineEmits('update:modelValue')
</script>

<template>
  <h1>
    子组件接受到的
    {{ modelValue }}
  </h1>
</template>
<style></style>

```









***如果有多个参数要传递给子组件，则可以使用这样的方式***

1. 父组件中，传递数据

```js
<script setup>
import { ref } from 'vue'
import Son from './Son.vue'
let num = ref(0)
let msg = ref('')
let age = ref(666)
</script>

<template>
  <Son v-model:pageNo="num" v-model:pageMsg="msg" v-model:personAge="age"></Son>
</template>
```



2. 子组件中，给出prop和自定义事件名

```js
// 接受参数
let props = defineProps(['pageNo', 'pageMsg', 'personAge'])
// 生命自定义事件
defineEmits(['update:pageNo', 'update:pageMsg', 'update:personAge'])
```





### 5. useAttr()

在Vue2中，每个VC上都有一个属性`$attr`这里面保存了**父组件中给出但是子组件中没有接收的值**

在`setup`中，通过`useAttr()`方法来获取`$attr`属性



1. 父组件给出属性值

```vue
<script setup>
import Son from './Son.vue'
</script>

<template>
  <Son msg="你好" age="18" num="99"></Son>
</template>
<style></style>

```



2. 子组件中

通过`useAttrs()`来获取**父组件中给出但是子组件中没有通过props接受的**所有属性值

```vue
<script setup>
import { useAttrs } from 'vue'

let $attr = useAttrs()
</script>

<template>
  <h1>子组件接受到的</h1>
  <h2>{{ $attr.msg }}---{{ $attr.age }}---${{ $attr.num }}</h2>
</template>
<style></style>

```



***注意：如果在子组件中通过`defineProps()`声明接收了该属性，那么通过`useAttrs()`中就没有该属性***

对上面的子组件稍作修改

```vue
<script setup>
import { useAttrs } from 'vue'
let props = defineProps(['msg'])
let $attr = useAttrs()
</script>

<template>
  <h1>子组件接受到的</h1>
  <h2>{{ $attr.msg }}---{{ $attr.age }}---${{ $attr.num }}</h2>
</template>
```







### 6. 通过ref和$parent

在Vue组件中，通过ref可以获取DOM元素的引用。

***同理，在父组件中，也可以通过ref获取子组件实例的引用***

*在setup中，通过ref()直接获取到引用实例*

**组件如果想要外部访问到本实例内的属性，需要通过`defineExpose()`方法来暴露想要被外界访问的实例**



1. 子组件暴露想要被外界访问的属性

```vue
<script setup>
import { ref } from 'vue'
let num = ref(0)
defineExpose({
  num
})
</script>

<template>
  <h1>子组件中的num{{ num }}</h1>
</template>
<style></style>

```



2. 父组件中通过ref拿到引用，直接操作

```js
<script setup>
import { ref } from 'vue'
import Son from './Son.vue'
//获取组件实例的引用
let son = ref()
// 直接操作子组件中的数据
function add() {
  son.value.num++
}
</script>

<template>
  <button @click="add" type="button">点我</button>
  <Son ref="son"></Son>
</template>
<style></style>

```



> 注意：
>
> 通过ref获取的组件实例的引用，是一个被封装成的RefImpl，因为是通过ref()来获取的
>
> 这个RefImpl的实例的value属性是Proxy，才是真正的组件实例



***在组件中，通过`$parent`来获取父组件的引用，父组件也需要通过`defineExpose()向外暴露属性***

***这个$parent属性，与Vue中 的事件对象$event是相似的***

```vue
<script setup>
import GrandSon from './GrandSon.vue'
function handle(parent) {
  parent.num++
}
</script>

<template><button @click="handle($parent)">点我</button></template>
<style></style>

```





### 7. provide和inject

***组件通过provide()提供数据，后代组件通过inject来获取数据，***

**只要是后代组件，都可以通过inject获取数据**

*如果多个组价，通过provide提供了相同名称的数据，那么后代在使用时，就近原则*



1. Father.vue

```js
<script setup>
import { provide } from 'vue'
import Son from './Son.vue'
// 提供数据
provide('lastMsg', '你可真可爱~~')
</script>

<template>
  <Son></Son>
</template>
```

Son.vue

```js
<script setup>
import GrandSon from './GrandSon.vue'
</script>

<template>
  <GrandSon></GrandSon>
</template>
```





2. 后代组件,，接受数据

GrandSon.vue

```vue
<template>
  <h2>爷爷的数据{{ lasgMsg }}</h2>
</template>

<script setup>
import { inject } from 'vue'
// 接受数据
let lasgMsg = inject('lastMsg')
</script>
```









### 8. 状态管理工具Pinia

利用状态管理工具Pinia或Vuex

**利用状态管理工具，可以实现任意组件之间的通信**





### 9. slot插槽

作用于插槽，插槽将数据回传给使用者。



在插槽的位置定义数据

```js
<slot name="header" msg="liumingkai" age="18"></slot>
```

会将所有的数据，封装到一个对象中，回传给使用者

在使用插槽的位置，使用一个对象来接受

```js
// 使用一个变量来接受
<template #header="scope">
    <h1>{{ scope.msg }}</h1>
    <h1>{{ scope.age }}</h1>
</template>
```











## axios二次封装

项目中使用axios进行网络请求，经常将axios进行二次封装，目的是：

- **使用请求拦截器**，可以在请求拦截器中处理一些业务（开始进度条、请求头携带公共参数）
- **使用响应拦截器**，可以在响应拦截器中处理一些业务（进度条结束、简化服务器返回的数据、处理Http网络错误）

利用axios封装统一的请求对象，来统一管理整个应用的网络请求。

在src下创建utils文件夹，用来封装axios工具

例如，这是`request.js`文件，用来对axios请求实例做出配置并导出

```js
import axios from 'axios'

// 创建 请求实例
const http = axios.create({
    baseURL: 'http://localhost/',
    timeout: 5000
})

// 请求拦截器
// 1. 统一携带token
http.interceptors.request.use(
    // 请求配置
    (config) => {
        // 获取token
        // 将token拼接到请求头头中
        config.headers.Authorization = token
        return config
    },
    // 请求时统一异常处理
    (e) => Promise.reject(e))

// 响应拦截器
// 1. 对响应结果进行解包
http.interceptors.response.use(
    // 相应结果解构
    (res) => res.data,
    // 统一响应异常处理
    (e) => {
        //....以合理的方式通知客户
        return Promise.reject(e)
    }
)

// 默认导出
export default http

```



这样，我们就对请求做了统一的配置，在所有要发起网络请求的地方，都要使用此axios实例来发起请求，以便达到统一管理请求、响应的目的。



## API接口统一管理

**我们上面对请求实例做了配置，那么接下来就要使用此请求对象来发起请求。**

**对于各个模块的请求，要统一管理**

例如，用户模块的请求，就要单独封装在`user.js`这个请求模块中。

例如，在user.js模块中，

```js
// 使用统一配置的请求对象
import request from '@/utils/request.js'

// 用户登录相关的 网络请求 API
export const loginAPI = ({ account, password }) => {
  return request({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}


// 用户详情页面 的 API
export const userInfo = ({ uid } => {
    return request.get({
        url: '/user',
        params: {
            uid
        }
    })
})
```





## ElementPlus

ElementUI是基于Vue2.0的UI库，ElementPlus是基于ElementUI的升级版，基于Vue3.0

### 安装使用

1. 安装

```sh
npm i element-plus
```



使用

#### 完整引入

不推荐，导致打包体积非常大

```ts
// main.ts
import { createApp } from 'vue'
// 引入ElementPlus
import ElementPlus from 'element-plus'
// 引入ElementPlus样式
import 'element-plus/dist/index.css'

import App from './App.vue'

const app = createApp(App)
// 注册插件
app.use(ElementPlus)
app.mount('#app')
```





#### 按需引入(推荐)

1. 自动导入（！！！**推荐**）

   **无需在main.js中注册插件，也无需导入全部的样式**

安装插件

```sh
npm install -D unplugin-vue-components unplugin-auto-import
```

安装完成之后，在构建工具(Webpack或Vite)的配置文件中，配置插件

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

接下来就是在Vue组件中，直接使用ElementPlus的组件就好了，无需通过Import导入

```vue
<template>
  <el-button>我是 ElButton</el-button>
</template>
<script>
// 无需通过import引入
</script>
```



2. 手动导入(不推荐)

安装插件

```sh
npm i unplugin-element-plus -D
```

在构建工具中配置插件

```js
// vite.config.ts
import { defineConfig } from 'vite'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig({
  // ...
  plugins: [ElementPlus()],
})
```

在组件中，手动引入使用即可

```vue
<template>
  <el-button>我是 ElButton</el-button>
</template>
<script>
  // 引入
  import { ElButton } from 'element-plus'
  export default {
    components: { ElButton },
  }
</script>
```



### 国际化

ElementPlus默认使用英文，如果希望使用其他语言。

可以在注册ElementPlus插件时，同时可以传入一个配置对象

```js
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

app.use(ElementPlus, {
  locale: zhCn,
})
```



















































































































