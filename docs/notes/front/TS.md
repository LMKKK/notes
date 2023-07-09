# 简述

TypeScript简称TS，是JS的超集，即兼容JS，同时在JS的基础上有拓展。

JS的代码直接在TS中写，是完全可以的，同时TS还有类型机制。

TypeScripr = Type + JavaScript，在JS的基础上，添加了类型支持。

只需要学习TS的类型机制就好了，其他的跟JS一样的。

## 优势

- 强大的类型约束
- 提升代码维护性

Vue3使用了TS进行了重写、React与TS完美结合，同时Angular也使用了TS进行重写。

开发大型项目的首选语言 。



## 安装编译工具

浏览器是不能直接运行TS代码的，需要借助工具将TS代码转换成JS，然后交给浏览器运行。

![image-20230518225629159](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230518225629159.png)

npm全局安装typescript

```sh
npm i typescript -g
```

检验是否安装成功

```sh
tsc -v
```

使用，默认会在ts的目录下生成同名js文件

```js
tsc hello.ts

// 在同级目录下,生成hello.js
```



> 如果想要在Node中直接运行TS代码，也是可以的
>
> 安装全局工具
>
> ```sh
> npm i ts-node -g
> ```
>
> 使用，就能直接运行ts代码
>
> ```sh
> ts-node hello.ts
> ```
>
> **本质上还是将ts转换为js代码，然后运行**

# 常用类型约束

对变量进行类型约束的基本语法：

```ts
// 声明一个变量age 是number类型
let age: number
// 赋值
age = 18


// 声明并赋值
let price: number = 9
```

在Ts中，声明了变量类型之后，就只能为其赋该类型的值，否则报错。

```ts
let age: number;
// 不允许
age = 'kk'
// 可以
age = 18
```



## JS中原有的类型

JS中原有的数据类型在TS中是支持的

```ts
// number类型
let age: number = 18

// string类型
let username: string = 'zhangsan'

// boolean类型
let isEffective: boolean 
isEffective = true

// null类型
let a: null

// undefined类型
let b: undefined

// 对象类型
let user: object
let person: {}

// 数组类型
let arr: number[] = [1, 2, 3, 4, 5]
let names: Array<string> = ['zs', 'ls', 'ww']

```



### 自动类型推断

TS是有自动类型推断机制的

***在声明的同时赋值，TS就认为该变量就是赋值的类型***

```ts
// number类型
let num = 25

// 不可以
num = 'abc'
```



## TS新增数据类型

TS中特有的数据类型有**字面量、any、unknown、void、never、tuple、enum**



### 联合类型

一个变量可以是多种类型，在类型声明时，使用`|`分隔开类型

```ts
// salary 既可以是number类型,也可以是string类型
let salary: number | string

salary = 18888

salary = '15K'



let student: number | string | string[]

student = 18

student = 'zs'

student = ['zs', 'ls', 'ww']




let scores: (number | string)[]

scores = [1,99,'kk',18,'English']
```





### 类型别名

当一个类型非常复杂，需要多次声明时，麻烦，可以为此类型起一个别名

使用`type`关键字

```ts
// 类型别名
type myType = (number | string)[] | number | string


let ss: myType

let sc: myType

```



### TS中新增数据类型

#### 字面量

在变量类型约束时，如果数据类型是一个字面量，那么此变量的类型就是该字面量。

```ts
let username: 'kk'
// 只能赋值'kk'
username = 'kk'

// 不可以赋值其他的值
username = 18
username = 'abc'
```



#### any

任意类型的值都可以，被此类型声明的变量，好像又回到了JS的时代

```ts
let a: any

a = 18

a = 'kk'

a = true
```

**注意：any类型的变量，可以赋值给任意类型的变量**

```ts
let x: any

let y: string

x = 18

// 可以的
y = x

console.log(x,y);
```

***因此，对于any还是尽量少用***

***TS中，如果一个变量声明时，没有给出类型，也没有赋值，那么就是any类型***



#### unknown

unknown也是可以表示任意类型，但是对于unknown类型的变量，会存在类型推断

unknown不可以赋给其他类型的变量，any是可以绕过类型检查的，但是unknown不可以。

```ts
let a: unknown

a = 4

a = '123'
```

```ts
let a: unknown

a = 4


let b: string

// 不可以
b = a

a = 'kkk'

// 还是不可以
b = a

```







#### void

**如果用来修饰变量，表示此变量不是任意类型，一般不会用来修饰变量，没有意义。**

**但是可以为void修饰的变量赋值undefined**

```ts
let a: void

// 不可以
a = 1
// 不可以
a = 'abc'
// 不可以
a = null

// 可以
a = undefined
```



***基本不用来修饰变量，一般用来定义函数的返回值类型。***



#### never

用来修饰变量，表示此变量啥都不是，一般也不会用来修饰变量，没有意义的。

给变量赋值undefined也是不可以的

```ts
let a: never
// 不可以
a = 1
// 不可以
a = null
// 不可以
a= undefined
```



#### tuple元组

元组：就是一个特殊的数组，数组的长度，元素类型都写死了。

***特殊的数组，长度、元素类型固定***

```ts
// 元组长度为3,每个元素都是number类型
let xt: [number, number, number]
// 可以
xt = [1,2,3]
// 不可以
xt = [1,2,3,4]
// 不可以
xt = ['a',2,1]
```



#### enum枚举



```ts
// 定义枚举类型
enum Gender{
  male,
 female 
}

// 变量sex 是枚举类型
let sex: Gender

sex = Gender.male

```

枚举变量的值都是number，默认从0开始，以上代码相当于

```ts
enum Gender{
  male = 0,
 female  = 1
}
```



#### 类型断言

变量在使用的过程中，可能因为ts的自动类型推断而报错，此时可以使用类型断言。

在已经确定了该变量的类型的情况下，明确告诉编译器将此变量当做特定类型来使用

```ts
let ss = 'Hello!TypeScript'

let len: number

// 明确告诉编译器
// ss当做string类型来使用
len = (ss as string).length
```



还有一种形式的写法，类似于Java中的强制类型转换，作用都是一样的

```ts
let ss = 'Hello!TypeScript'

let len: number

// 明确告诉编译器
// ss当做string类型来使用
len = (<string>ss).length
```



## 对象类型约束

对于对象中的每个属性，也可以做出约束。

```ts
// 对象必须是这样类型的
// 只有name这一个属性且必须是string类型
let user: { name: string }
// 可以
user = {name: 'zs'}

// 不可以
user = {age:18}

// 不可以
user = { name:'zs',age:18}


```

**结合type关键字使用更好**

如果对象中的某个属性是可选的，则可以在属性名后加问号`?`

```ts
// age属性是可选的
type user = {
  name: string,
  age?:number
}

let person: user

// 可以的
person = {
  name:'zs'
}

// 可以的哦
person = {
  name: 'lice',
  age:18
}
```

如果对象中的有多少个属性是不确定的，则可以这样写

```ts
// name属性必须要有且是string类型
// 其余属性的key是string,值类型不定
let user: {
  name: string,
  [key: string]: any
}


user = {
  name: 'zs',
  age: 18,
  salary: '18k',
  hobby: ['basketball','swim','bike']
}
```







## 函数类型约束

在TS中，可以对函数的类型进行约束，包括函数的参数类型、返回值类型

基本语法

```ts
function funName(arg: number, arg2: string): void{
  //....
}
```

比如,声明两个number相加的函数

```ts
function add(a: number, b: number): number{
  let res = a + b
  return res
}
```

***剪头函数，也可以简写***

```ts
let myFun = (a:number, b: string):string => { return b + a}


// 函数声明
let getSum: (a: number, b: number) => number 
// 函数定义
getSum = (a, b) => {
  return a + b
}
```

***表示该参数是可选的***

```ts
function fun(a: number, b?: number): number{
  return 1 + 2 + a
}
```

***省略参数***

```ts
function add(a: number, ...arg: any): void{
  let res= 0
  for (let i = 0; i < arg.length; i++){
    res += arg[i]
  }
  console.log(res);
}


add(1,2,3,3,4,45,5,8,9)


function add(a: number, ...arg: number[]): void{
  let res= 0
  for (let i = 0; i < arg.length; i++){
    res += arg[i]
  }
  console.log(res);
}


add(1,2,3,3,4,45,5,8,9)
```





规定了函数的约束之后，调用者必须严格按照函数的约束来使用，

不能出现类型不匹配、参数数量不匹配的情况

```ts
function fun(a: number, b: number): number{
  return a + b;
}
// 可以
fun(1,2)

// 不可以
fun(1)

//不可以
fun(1,2,3)
```





### void和never

**`void`修饰函数的返回值，表示该函数没有返回值**

```ts
function fun():void {
 console.log('hello');
}
```



**`never`表示永远不会有返回值**,通常在以下场景中使用：

- 抛出异常或崩溃时；
- 死循环；
- 类型不匹配时。

```ts
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // do something
  }
}
```





# TS的编译选项



## 自动监听

我们使用全局安装的typescript进行编译

```sh
tsc hello.ts
```



每次修改ts文件后，都需要重新执行此命令，可以使用以下命令

```sh
tsc hello.ts -w
```

tsc会监听此文件，一旦文件修改后，就会自动编译成js。



## 配置文件

在项目根目录下，新建`tsconfig.json`

只需要tsc命令，就可以根据配置文件中的配置项进行运行

### 自动编译整个项目

在`tsconfig.json`文件中，输入

include需要自动编译的目录，exclude不需要参与自动编译的目录

```json
```



- include

  - 定义希望被编译文件所在的目录

  - 默认值：["\*\*/\*"]

  - 示例：

    - ```json
      "include":["src/**/*", "tests/**/*"]
      ```

    - 上述示例中，所有src目录和tests目录下的文件都会被编译

  exclude

  - 定义需要排除在外的目录

  - 默认值：["node_modules", "bower_components", "jspm_packages"]

  - 示例：

    - ```json
      "exclude": ["./src/hello/**/*"]
      ```

    - 上述示例中，src下hello目录下的文件都不会被编译

tsconfig.json中的内容

```json
{
  "include": ["src/**/*", "test/**/*"],
  "exclude": ["/src/rescources/**/*"]
}

```



***通过include和exclude指定了需要编译的目录后，***

```sh
// 直接编译整个项目
tsc

// 监视整个项目
tsc -w
```



extends

  - 定义被继承的配置文件

  - 示例：

    - ```json
      "extends": "./configs/base"
      ```

    - 上述示例中，当前配置文件中会自动包含config目录下base.json中的所有配置信息



files

- 指定被编译文件的列表，只有需要编译的文件少时才会用到

- 示例：

  - ```json
    "files": [
        "core.ts",
        "sys.ts",
        "types.ts",
        "scanner.ts",
        "parser.ts",
        "utilities.ts",
        "binder.ts",
        "checker.ts",
        "tsc.ts"
      ]
    ```

  - 列表中的文件都会被TS编译器所编译



compilerOptions

- 编译选项是配置文件中非常重要也比较复杂的配置选项

- 在compilerOptions中包含多个子选项，用来完成对编译的配置

  - target

    - 设置ts代码编译的目标版本

    - 可选值：

      - **ES3（默认）**、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext

    - 示例：

      - ```json
      "compilerOptions": {
            "target": "ES6"
        }
        ```
  
      - 如上设置，我们所编写的ts代码将会被编译为ES6版本的js代码

  - lib

    - 指定代码运行时所包含的库（宿主环境）

    - 可选值：

      - ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost ......

    - 示例：

      - ```json
        "compilerOptions": {
            "target": "ES6",
            "lib": ["ES6", "DOM"],
            "outDir": "dist",
            "outFile": "dist/aa.js"
        }
        ```
  
  - module

    - 设置编译后代码使用的模块化系统

    - 可选值：

      - CommonJS、UMD、AMD、System、ES2020、ESNext、None

    - 示例：

      - ```typescript
        "compilerOptions": {
            "module": "CommonJS"
        }
        ```
  
  - outDir

    - 编译后文件的所在目录

    - 默认情况下，编译后的js文件会和ts文件位于相同的目录，设置outDir后可以改变编译后文件的位置

    - 示例：

      - ```json
      "compilerOptions": {
            "outDir": "dist"
        }
        ```
  
      - 设置后编译后的js文件将会生成到dist目录

  - outFile

    - 将所有的文件编译为一个js文件

    - 默认会将所有的编写在全局作用域中的代码合并为一个js文件，如果module制定了None、System或AMD则会将模块一起合并到文件之中

    - 示例：

      - ```json
        "compilerOptions": {
            "outFile": "dist/app.js"
        }
        ```
  
  - rootDir

    - 指定代码的根目录，默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过rootDir可以手动指定根目录

    - 示例：

      - ```json
        "compilerOptions": {
            "rootDir": "./src"
        }
        ```
  
  - allowJs

    - 是否对js文件编译

  - checkJs

    - 是否对js文件进行检查

    - 示例：

      - ```json
        "compilerOptions": {
            "allowJs": true,
            "checkJs": true
        }
        ```
  
  - removeComments

    - 是否删除注释
  - 默认值：false
  
  - noEmit

    - 不对代码进行编译
  - 默认值：false
  
  - sourceMap

    - 是否生成sourceMap
  - 默认值：false
  
    
  
- 严格检查

    - strict
    启用所有的严格检查，默认值为true，设置后相当于开启了下面所有的严格检查

    - alwaysStrict
    
    - 总是以严格模式对代码进行编译
    
    - noImplicitAny
      - 禁止隐式的any类型
    - noImplicitThis
      - 禁止类型不明确的this
    - strictBindCallApply
      - 严格检查bind、call和apply的参数列表
    - strictFunctionTypes
      - 严格检查函数的类型
    - strictNullChecks
      - 严格的空值检查
    - strictPropertyInitialization
      - 严格检查属性是否初始化
    
    
    
  - 额外检查

    - noFallthroughCasesInSwitch
      - 检查switch语句包含正确的break
    - noImplicitReturns
      - 检查函数没有隐式的返回值
    - noUnusedLocals
      - 检查未使用的局部变量
    - noUnusedParameters
      - 检查未使用的参数

  

  - 高级	
  
    - allowUnreachableCode
      - 检查不可达代码
      - 可选值：
        - true，忽略不可达代码
        - false，不可达代码将引起错误
  
    - noEmitOnError
      - 有错误的情况下不进行编译
      - 默认值：false





### 配置文件例子

```json
{
  "include": ["src/**/*", "test/**/*"],
  "exclude": ["/src/rescources/**/*"],
  "extends":[],
  // 很少使用
  "files": [
    "./src/ts/hello.ts",
  ],
  "compilerOptions": {
    // 编译后的js规范
    "target": "ES6",
    // 项目依赖的库
    "lib":["DOM","ES6"],
    // 模块化规范,也可以是CommonJS
    "module": "ES6",
    // 编译后的文件目录
    "outDir": "./dist/",
    // 将所有的ts文件，编译后汇总到一个文件中
    // 配置了module选项后，就不能再配置该选项了
    // "outFile": "./dist/app.js"
    // 指定源码根目录
    "rootDir": "./src/",
    // 是否对js文件编译
    "allowJs": true,
    // 是否对js文件进行检查
    "checkJs": true,
    // 是否移除注释
    "removeComments": true,
    // 不对代码进行编译
    "noEmit": false,
    // 是否生成sourceMap
    "sourceMap": false,
    // 开启严格模式，开启后，下面所有的严格检查也会开启
    // "strict": true,
    // 禁止隐式this
    "noImplicitThis": true
  }

}
```





# Webpack编译TS

项目中，一般不会手动去编译ts文件，而是借助打包/构建工具，自动编译。

目前常用的构建工具还是Webpack、Vite。

项目中需要的开发依赖

- typescript
- ts-loader
- webpack 构建工具
- webpack-cli  webpack的命令行工具
- webpack-dev-server 服务器
- clean-webpack-plugin



```sh
npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin
```



***我们现在的开发中，一般不会去使用原生的Webpack，都是脚手架，所以了解就好***

比如vue的脚手架、react的脚手架



# 面向对象

TS中的面向对象与ES6的面向对象基本一样，只不过对类中的属性添加约束。

在ES6中，通过class、super、extends来实现面向对象工作，TS中也是，但是TS中的约束较多。

## 类基础

与Java中的面向对象大差不差

- public修饰的成员对外公开，**默认类型**
- private修饰的成员只能类内访问
- protected修饰的成员可以在本类、子类中访问

***与实例对象无关的属性、方法，可以定义成静态的，通过类名的方式直接访问，使用`static`关键字***

```ts
class Person {
// 定义实例属性
// 在js中不需要
  private name: string
  private age: number
  
  
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  // 静态属性
  static area: string = 'China'

  // 静态方法
  static sayHello() {
    console.log('Hello!');
    
  }

  // 实例方法
  public introduce(): void{
    console.log(`Hello!I am ${this.name} and ${this.age} years old!`);
  }

}



// 创建对象
let p = new Person('zhangsan', 18)
// 调用实例方法
p.introduce()

// 类属性
console.log(Person.area);
// 类方法
Person.sayHello()
```



## setter / getter

属性是私有，不能直接操作属性，需要对外提供访问的方法

在JS中，通过set/get来生成setter/getter，TS中也是这样

同样还是要注意：***属性名不要与setter/getter名相同，否则无限递归***

***注意：setter、getter默认就是public***

```ts
class Animal{
  private _name: string
  
  constructor(name: string) {
    this._name = name
  }

  set name(name:string) {
    this._name = name
  }

  get name() {
    return this._name
  }
}


let dd = new Animal('Dog')
// 通过getter访问
console.log(dd.name);
// 通过getter修改
dd.name = 'XiuGou'
console.log(dd);
```







## 继承

通过`extends`关键字实现继承

**子类会拥有父类的非private的属性和方法**

- 子类中的构造方法，去调用父类的构造方法，要在ths之前
- 子类可以额外定义特有的属性、方法
- 子类中定义的方法与父类相同，就是重写

```ts
class Animal{
  private _name: string
  
  constructor(name: string) {
    this._name = name
  }

  public call(): void{
    console.log('ao ... ao....')
  }

  set name(name:string) {
    this._name = name
  }

  get name() {
    return this._name
  }
}




class Dog extends Animal{

  private _age: number 
  
  constructor(name: string, age: number) {
    super(name)
    this.age = age
  }

  // 重写父类方法
  public call(): void{
    console.log('wang ... wang....')
  }

  // 子类特有的方法
  public introduce(): void{
    // 注意：此处的this.name访问的是父类的 getter
    console.log(`你好我是${this.name},i am ${this.age} years old`)
  }
  get age() {
    return this._age
  }

  set age(age:number) {
    this._age = age
  }
}

let d = new Dog('SmallBlack',1)
d.introduce()

```











## 抽象类

**含有抽象方法的类，就是抽象类，抽象类是不能被实例化的**

***抽象方法，只需要给出方法名，不需要给出方法实现，子类继承此抽象类，必须要实现父类的抽象方法***

***抽象类和抽象方法，都需要使用`abstract`修饰***

```ts
abstract class Animal{
  private _name: string
  
  constructor(name: string) {
    this._name = name
  }

  public call(): void{
    console.log('ao ... ao....')
  }

  set name(name:string) {
    this._name = name
  }

  get name() {
    return this._name
  }

  // 抽象方法
  abstract run():void
}




class Dog extends Animal{

  private _age: number 
  
  constructor(name: string, age: number) {
    super(name)
    this.age = age
  }

  // 重写父类方法
  public call(): void{
    console.log('wang ... wang....')
  }

  // 子类特有的方法
  public introduce(): void{
    // 注意：此处的this.name访问的是父类的 getter
    console.log(`你好我是${this.name},i am ${this.age} years old`)
  }
  get age() {
    return this._age
  }

  set age(age:number) {
    this._age = age
  }

  // 实现父类的抽象方法
  run(): void {
    console.log('hu..hu..liao..')
  }
}

let d = new Dog('SmallBlack',1)
d.introduce()
d.run()
```









## 接口interface

接口这种类型，真的是TS中独有的，JS中没有呦~~~

***接口中的所有方法都是抽象的，接口中的方法都是没有实值***

接口主要用来规定一个类的结构。

常用来约束一个类

```ts
interface Person{
  name: string
  say():void
}


// 定义一个方法
// 检查数据类型
function fun(p: Person) {
  console.log('argument p is statisfy condition')
}

let pp = {
  name: '孙悟空',
  say() {
    console.log('HEI~~~Monster!!!')
  }
}
// 可以
fun(pp)

// 不可以
fun({name:'123'})
```





实现该接口

```ts
interface Person{
  name: string
  say():void
}


// 定义一个方法
// 检查数据类型
function fun(p: Person) {
  console.log('argument p is statisfy condition')
}

// 实现类中 需要有接口中规定的所有东西
class Student implements Person{
  name:string
  age:number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  // 实现方法
  say(): void {
    console.log(`你好！我是${this.name},${this.age}岁了，我今天考试又挂科了~~~555~~~`);
  }

}

let p = new Student('小明', 18)
p.say()
```













## 泛型

规定一个函数或类中，某些成分的类型，调用时再确定。



### 类中使用泛型

在类名后使用`<T>`给出类型的占位符

表示次类中有包含T类型的属性

```ts
class MyMath<T>{ 
  p: T
  q: T
  

  constructor(a: T, b: T){
    this.p = a
    this.q = b
  }
  
}
```

**可以同时指定多种不同的类型**

```ts
class MyMath<T,K>{ 
  p: T
  q: K
  

  constructor(a: T, q: K){
    this.p = a
    this.q = q
  }

}
```

还可以对泛型做出约束

```ts
class MyMath<T extends TestClass, K>{ 
  p: T
  q: T
  

  constructor(a: T, q: T){
    this.p = a
    this.q = q
  }

}
```



使用时，确定泛型的具体类型

```ts

class MyMath<T, K>{ 
  p: T
  q: K

  constructor(a: T, q: K){
    this.p = a
    this.q = q
  }

}

// 真正使用时，确定泛型的真正类型
let p = new MyMath(10, 'kk')
```





### 函数中的泛型

与类中相似，在方法名之后`<>`给出泛型的占位符

```ts
function fun<T>(a: T): void{
  //...
}
```

```ts
function test<T, K>(a: T, b: K): void{
  //.....
}

test(10,'abdc')

```

泛型的类型约束

```ts
function fun<T extends Animal>(p: T): boolean{
  return true
}
```

























































