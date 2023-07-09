
## 前言
之前看到过很多这样的静态网站，基于Markdown格式，风格基本统一，而且这种网站非常常见，例如：
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709120856.png)



例如，以下的几个网址：
- [Java HashMap 源码分析 | 未读代码](https://www.wdbyte.com/2020/03/jdk/hashmap/)
- [BAT大厂面试题与全栈知识体系结合 | Java 全栈知识体系](https://pdai.tech/md/outline/x-outline.html)
- [3.1 HTTP 常见面试题 | 小林coding](https://xiaolincoding.com/network/2_http/http_interview.html#http-%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)
以及Vue生态中的各个官方文档，都是这样的风格：
- [简介 | Vue.js](https://cn.vuejs.org/guide/introduction.html)
- [介绍 | Vue Router](https://router.vuejs.org/zh/introduction.html)
- [简介 | Pinia](https://pinia.vuejs.org/zh/introduction.html)

当时好奇这种网站是怎么生成的，但是没有深究。
今天了解到了Vue生态链中有一个叫做静态站点生成工具——VuePress和VitePress。
于是来认真学习一下Vue的静态站点生成工具。



## VuePress与VitePress
VuePress和VitePress都是**基于Markdown和Vue的**静态网站生成工具。
VuePress1.x 基于 Vue 2 和 webpack。
而VitePress 是 VuePress 的精神继承者，借助 Vue 3 和 Vite，VitePress 提供了明显更好的 DX、更好的生产性能、更精致的默认主题以及更灵活的定制 API。
目前VuePress2.x 正在Beta阶段，支持Vue3和Vite。
VitePress 和 VuePress 之间的 API 差异主要在于主题和定制。如果您使用带有默认主题的 VuePress 1，那么迁移到 VitePress 应该相对简单。
鉴于Vue3会是以后的主流，而且Vue2也 将于 2023 年 12 月 31 日停止维护，因此Vue官方推荐使用VitePress。
毕竟VitePress目前处于初期，一些插件、主题等自定义配置没有VuePress丰富(毕竟现在的Vite在占用率照着webpack还有一定的差距。)
**VuePress和VitePress的原理与使用方式都是相同的，会了其中一个，另一个自然也就会了**

## 介绍
官网[VitePress | Vite & Vue Powered Static Site Generator](https://vitepress.dev/)
VitePress是Vue团队中一位外国人负责开发的，因此官网没有中文文档，但是有一个翻译过来的网站[VitePress中文官网](https://vitepress.qzxdp.cn/)
介绍一下Vite，**VitePress就是将你的Markdown文档生成HTML页面，同时还可以通过主题的方式，对生成的页面样式做个性化设置。使得你只需要专注于书写MarkDown文本就好了，无需过多的关注构建的过程**



## 基本使用
1. 安装开发依赖
```sh
npm install -D vitepress
```

2. 在项目根目录创建`docs/`目录，创建一个index.md文档，编写内容。
```txt
# 测试文本
## 这是二级标题
[这是一个链接](http://baidu.com)

```
3. 在package.json中注册VitePress的运行脚本
```json
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  ...
}
```

4. 运行命令，构建项目
```sh
npm run docs:dev
```
项目会在本地启动，预览即可。
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709121859.png)

这样，VitePress的基本使用就完成了。



## 原理和配置
### 原理
**VitePress会以项目下的`docs`目录作为服务器根目录，你只需要将你自己的MarkDown文档放在docs目录下**
docs的项目结构
```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ examples-test.md
│  ├─ examples.md
│  └─ index.md
```
**项目启动后，会在docs目录下生成一个`.vitepress`的目录，此目录用来存放VitePress相关的配置文件**
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709125638.png)

**VitePress会将docs下的所有的markdown文档编译成html文件，这个HTML文件的路径与markdown文档同级目录下(逻辑上的原理，真实并不会让你看到生成的HTML文件)**
因此，docs目录作为VitePress的根目录，docs下有一个index.md，就会被编译成index.html，我们只需要访问根路径`/`就可以访问到index.html;
有一个文档`docs/pages/api.md`，那么我们只需要访问`/pages/api/`就可以访问到这个页面。


### 配置
**在`.vitepress`目录下，新建一个`config.js`，作为VitePress的配置文件。**
该文件导出一个JS对象。
```js
export default {
	title:' 这是刘明凯的网站',
    description: '刘明凯是一个大厦比',
}
```

关于有哪些配置，可以看[官网——站点配置和API](https://vitepress.qzxdp.cn/reference/site-config.html)，说几个常用的配置项：

| 配置项      | 说明                               |
| ----------- | ---------------------------------- |
| title       | 网站的标题，即浏览器标签页上的文本 |
| description | 网站的描述信息，用来做SEO优化      |
| lang        | 站点的语言类型                     |



## 主题配置
主题配置就是对站点的页面样式做出配置。
所有的主题配置，都写在config.js中的themeConfig节点下
```js
export default {
	title: '这是我的网站',
	description:'测试VitePress网站',
	themeConfig:{
		// ....
	}
}
```

### 导航
就是网站的这一部分，看一下网站的导航怎么配置。
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709125057.png)


在config.js中，nav属性是一个数组，数组中的每个元素就是一个导航项。
```js
export default {
    title:' 这是刘明凯的网站',
    description: '刘明凯是一个大厦比',
    themeConfig: {
        nav: [
            { text: 'item-1', link: '/start'},
            { text: 'itme-2', link: '/Pinia'},
            { text: 'itme-3', link: '/test/abc'},
        ]
    }
}
```
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709125758.png)


#### 下拉框样式
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709130033.png)
导航链接也可以是下拉菜单。为此，请在链接选项上设置items键。
```js
export default {
    title:' 这是刘明凯的网站',
    description: '刘明凯是一个大厦比',
    themeConfig: {
        nav: [
            { text: 'item-1', link: '/start'},
            { text: 'itme-2', link: '/Pinia'},
            { 
                text: 'itme-3', 
                items: [
                    { text: 'item-3-1', link: '/item3/1'},
                    { text: 'item-3-2', link: '/item3/2'},
                    { text: 'item-3-3', link: '/item3/3'},
                    { text: 'item-3-4', link: '/item3/4'}
                ]
            },
        ]
    }
}
```

**在下拉框中，也是支持分组的，只需要继续嵌套items就好了**
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709130537.png)
```js
export default {
    title: ' 这是刘明凯的网站',
    description: '刘明凯是一个大厦比',
    themeConfig: {
        nav: [
            { text: 'item-1', link: '/start' },
            { text: 'itme-2', link: '/Pinia' },
            {
                text: 'itme-3',
                items: [
                    {
                        text: 'item-3-A',
                        items: [
                            { text: 'section-A-1', link: '/test/sectionA-1' },
                            { text: 'section-A-2', link: '/test/sectionA-2' },
                            { text: 'section-A-3', link: '/test/sectionA-3' },
                        ]
                    },
                    { 
                        text: 'item-3-B', 
                        items: [
                            {text: 'section-B-1', link: '/test/setctionB-1'},
                            {text: 'section-B-2', link: '/test/setctionB-2'},
                            {text: 'section-B-3', link: '/test/setctionB-3'},
                        ]
                    },
                    { text: 'item-3-3', link: '/item3/3' },
                    { text: 'item-3-4', link: '/item3/4' }
                ]
            },
        ]
    }
}
```

### 友情链接
VitePress中内置了一些网站的icon，可以直接用，没有内置的，你自己找个logo就好了。
> [关于内置了哪些logo?](https://vitepress.qzxdp.cn/reference/default-theme-config.html#sociallinks)
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709133028.png)

```js
export default {
    title: ' 这是刘明凯的网站',
    description: '刘明凯是一个大厦比',
    themeConfig: {
        nav: [],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/LMKKK' },
            { icon: 'youtube', link: 'http://baidu.com' },
            { icon: 'twitter', link: 'http://baidu.com'},
            // 自定义图标
            { 
                icon: {
                    svg: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="22" height="22"><path d="M777.514667 131.669333a53.333333 53.333333 0 0 1 0 75.434667L728.746667 255.829333h49.92A160 160 0 0 1 938.666667 415.872v320a160 160 0 0 1-160 160H245.333333A160 160 0 0 1 85.333333 735.872v-320a160 160 0 0 1 160-160h49.749334L246.4 207.146667a53.333333 53.333333 0 1 1 75.392-75.434667l113.152 113.152c3.370667 3.370667 6.186667 7.04 8.448 10.965333h137.088c2.261333-3.925333 5.12-7.68 8.490667-11.008l113.109333-113.152a53.333333 53.333333 0 0 1 75.434667 0z m1.152 231.253334H245.333333a53.333333 53.333333 0 0 0-53.205333 49.365333l-0.128 4.010667v320c0 28.117333 21.76 51.157333 49.365333 53.162666l3.968 0.170667h533.333334a53.333333 53.333333 0 0 0 53.205333-49.365333l0.128-3.968v-320c0-29.44-23.893333-53.333333-53.333333-53.333334z m-426.666667 106.666666c29.44 0 53.333333 23.893333 53.333333 53.333334v53.333333a53.333333 53.333333 0 1 1-106.666666 0v-53.333333c0-29.44 23.893333-53.333333 53.333333-53.333334z m320 0c29.44 0 53.333333 23.893333 53.333333 53.333334v53.333333a53.333333 53.333333 0 1 1-106.666666 0v-53.333333c0-29.44 23.893333-53.333333 53.333333-53.333334z" fill="#fb7299"></path></svg>',
                },
                link: 'https://space.bilibili.com/2071205694',
				// ariaLabel 提示文本, 可选的
                ariaLabel: '我的bilibili'
            }
        ]
    }
}
```



### 侧边栏
与导航栏的配置相同
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709133642.png)

```js
export default {
    title: ' 这是刘明凯的网站',
    description: '刘明凯是一个大厦比',
    themeConfig: {
        nav: [],
        socialLinks: [],
        sidebar: [
            {text: 'SpringBoot', link:'/springboot'},
            {text: 'pinia', link:'/pinia'},
            {text: 'start', link:'/start'},
        ]
    }
}
```

同样也支持嵌套，只需要利用items属性即可
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709133940.png)

```js
export default {
    title: ' 这是刘明凯的网站',
    description: '刘明凯是一个大厦比',
    themeConfig: {
        nav: [
        ],
        socialLinks: [
        ],
        sidebar: [
            {text: 'SpringBoot', link:'/springboot'},
            {text: 'pinia', link:'/pinia'},
            {
                text: 'start', 
                collapsed: false,
                items: [
                    {text: '别点我', link: '/test'},
                    {text: '别点我23', link: '/test22'},
                    {text: '别点我45', link: '/test1'},
                ]
        },
        ]
    }
}
```


#### 多个侧边栏
每个导航项的侧边栏可以不同，**根据路径显示不同的侧边栏**
此时只需要将`sidebar`修改为对象模式即可
```js
export default {
  themeConfig: {
    sidebar: {
    // 当路径是/guide时，显示这个侧边栏
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Index', link: '/guide/' },
            { text: 'One', link: '/guide/one' },
            { text: 'Two', link: '/guide/two' }
          ]
        }
      ],
// 当路径是 /config 时，显示这个侧边栏
      '/config/': [
        {
          text: 'Config',
          items: [
            { text: 'Index', link: '/config/' },
            { text: 'Three', link: '/config/three' },
            { text: 'Four', link: '/config/four' }
          ]
        }
      ]
    }
  }
}
```



### 页脚
```js
export default {
    themeConfig: {
        footer: {
            message: '本网站基于VitePress构建',
            copyright: '2023 © Mingkai Liu'
        },
    }
}
```

### 首页
这个页面是怎么来的？
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709135426.png)

**这个页面也是利用Markdown绘制来的**
在一个Markdown页面中，利用`---`给出页面的配置信息，==我们称`---`中的配置信息叫做FrontMatter，用来对Markdown页面做出配置==
**!!!frontmatter 必须位于 Markdown 文件的顶部**
示例：这是一篇Markdown文档
```txt
---
layout: home

title: Docs with VitePress
editLink: true
---

# 接下来正常书写Markdown文档
```
关于Frontmatter的配置，可以看[Frontmatter 配置 | VitePress 中文网](https://vitepress.qzxdp.cn/reference/frontmatter-config.html)

**只需要在Frontmatter中，给出`layout:home`，那么此文档就是首页的布局模式了**
如何利用Frontmatter定义首页[首页 | VitePress 中文网](https://vitepress.qzxdp.cn/reference/default-theme-home-page.html)

首页由两部分组成：
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709140650.png)


#### Hero部分
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709141640.png)

给出一个实例，效果图如下
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709141803.png)

```txt
---
layout: home

hero:
  name: hero的标题
  text: 这是一个首页文本内容
  tagline: 这是标签栏中的内容
#   网站logo
  image:
    src: https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/test-hero-page.jpg
    alt: 这是网站的logo,当图片不能显示时，这段文本就是显示出来  
# 跳转按钮
  actions:
    # 按钮的样式，brand | alt
    - theme: brand
      text: Get Started
      link: /
    - theme: alt
      text: View on GitHub
      link: https://github.com/LMKKK
---
```



#### Feature部分
**Feature主要是对网站的一些功能、特点，做展示。**
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709142000.png)

给出实例，效果图
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709142417.png)

```text
---
features:
  - icon: 🛠️
    title:  快速构建
    details: 牛逼克拉斯
  - icon:
#   使用自定义图标
      src: https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/a46f86730f2dc1d1aeac6cc35536d4c260a6d71d.webp
    title: 我吊不吊
    details: 碉堡了！！
  - icon:
#   分别指定普通、暗黑模式时的图片
      dark: /dark-feature-icon.svg
      light: /light-feature-icon.svg
    title: Another cool feature
    details: Lorem ipsum...
---    
```

### 搜索框
只需要在配置对象中开启即可。
```js
export default {
  themeConfig: {
    search: {
      provider: 'local'
    }
  }
}
```
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709143753.png)


### 404页面
VitePress中自带了一个404页面，如果要自定义404页面，请使用自定义主题。
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709134052.png)






## Markdown中书写Vue

[在 Markdown 中使用 Vue | VitePress 中文网](https://vitepress.qzxdp.cn/guide/using-vue.html)
每个Markdown都会被转换为html页面，并可以作为Vue的一个单文件组件。
因此，你之前怎么写Vue组件，那么在Markdown文档中怎么写就可以了。
例如：
```txt
# 我是Pinia页面

<div v-for="idx in 6">测试v-for指令{{ idx }}</div>
```
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/20230709144148.png)

```vue
# 我是Pinia页面

<script setup>

    import { ref } from 'vue'

    const msg = ref('HelloVitePress')

</script>
<style>
    h1 {
        color: 'red';
    }
</style>
<h1>{{  msg }}</h1>
<div v-for="idx in 6">测试v-for指令{{ idx }}</div>
```
> 注意：
> 在Markdown中书写Vue代码，不要使用`<style scope>`


## 拓展
可以将VitePress构建后的静态资源文件，利用GitHubPage，生成自己专属的静态网站，支持别人访问。