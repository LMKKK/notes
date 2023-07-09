import{_ as s,o as a,c as n,V as t}from"./chunks/framework.48c56699.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"notes/front/HTML5.md","filePath":"notes/front/HTML5.md","lastUpdated":null}'),l={name:"notes/front/HTML5.md"},e=t(`<h2 id="新增语义化标签" tabindex="-1">新增语义化标签 <a class="header-anchor" href="#新增语义化标签" aria-label="Permalink to &quot;新增语义化标签&quot;">​</a></h2><p>并无特殊含义，是<strong>语义！语义！语义！</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;header&gt;	头部区域</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;nav&gt; 		导航区域</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;main&gt;		主体区域</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;article&gt;	内部标签</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;section&gt;	块级标签</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;aside&gt;		侧边栏标签</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;footer&gt;	尾部标签</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;dialog&gt;	对话框/窗口</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;time&gt;		时间</span></span></code></pre></div><h2 id="新增多媒体标签" tabindex="-1">新增多媒体标签 <a class="header-anchor" href="#新增多媒体标签" aria-label="Permalink to &quot;新增多媒体标签&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;audio&gt;		音频</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;video&gt;		视频</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;source&gt;	定义&lt;audio&gt;和&lt;video&gt;中资源的来源</span></span></code></pre></div><h2 id="新增表单元素" tabindex="-1">新增表单元素 <a class="header-anchor" href="#新增表单元素" aria-label="Permalink to &quot;新增表单元素&quot;">​</a></h2><p><code>&lt;datalist&gt;</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;datalist&gt;		预定义选项,当在input中输入时,会提示预定义选项，需要搭配input的list属性使用</span></span>
<span class="line"><span style="color:#A6ACCD;">实例</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;input list=&quot;browsers&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;datalist id=&quot;browsers&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;option value=&quot;Internet Explorer&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;option value=&quot;Firefox&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;option value=&quot;Chrome&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;option value=&quot;Opera&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;option value=&quot;Safari&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/datalist&gt;</span></span></code></pre></div><p><code>&lt;keygen&gt;</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="新增input类型" tabindex="-1">新增input类型 <a class="header-anchor" href="#新增input类型" aria-label="Permalink to &quot;新增input类型&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;input type=&quot;&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">date				日期选择</span></span>
<span class="line"><span style="color:#A6ACCD;">datetime			时间日期</span></span>
<span class="line"><span style="color:#A6ACCD;">datetime-local		本地时间</span></span>
<span class="line"><span style="color:#A6ACCD;">month				选择月份</span></span>
<span class="line"><span style="color:#A6ACCD;">week				选择周</span></span>
<span class="line"><span style="color:#A6ACCD;">time				时间选择</span></span>
<span class="line"><span style="color:#A6ACCD;">number				数字输入框,有加减</span></span>
<span class="line"><span style="color:#A6ACCD;">range				拖动条,调节范围</span></span>
<span class="line"><span style="color:#A6ACCD;">search				搜索框</span></span>
<span class="line"><span style="color:#A6ACCD;">tel					电话框</span></span>
<span class="line"><span style="color:#A6ACCD;">url					地址框,自动验证,不是正确格式的url无法submit</span></span>
<span class="line"><span style="color:#A6ACCD;">color				选择颜色</span></span>
<span class="line"><span style="color:#A6ACCD;">email				邮箱地址输入框,自动验证,不是邮箱地址无法submit</span></span></code></pre></div><h3 id="新增的input属性" tabindex="-1">新增的input属性 <a class="header-anchor" href="#新增的input属性" aria-label="Permalink to &quot;新增的input属性&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">autocomplete		属性规定表单或输入字段是否应该自动填充,自动填充上一次的值</span></span>
<span class="line"><span style="color:#A6ACCD;">autofocus			布尔类型,自动获取焦点</span></span>
<span class="line"><span style="color:#A6ACCD;">form				可以在&lt;form&gt;标签之外使用&lt;input&gt;,通过此属性指定&lt;form&gt;的id,此&lt;input&gt;属于指定&lt;form&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">formaction			适用于type=submit,当有多个submit,可以通过此属性指定不同的请求url</span></span>
<span class="line"><span style="color:#A6ACCD;">formenctype			当把表单数据（form-data）提交至服务器时如何对其进行编码,仅针对 method=&quot;post&quot; 的表单</span></span>
<span class="line"><span style="color:#A6ACCD;">					formenctype 属性覆盖 &lt;form&gt; 元素的 enctype 属性。</span></span>
<span class="line"><span style="color:#A6ACCD;">formmethod			适用于type=submit,定义请求方式,会覆盖&lt;form&gt;中的method,可以在有多个submit时使用</span></span>
<span class="line"><span style="color:#A6ACCD;">formnovalidate		规定在提交表单时不对 &lt;input&gt; 元素进行验证</span></span>
<span class="line"><span style="color:#A6ACCD;">formtarget			相当于&lt;a&gt;的target属性,是否打开新的页面</span></span>
<span class="line"><span style="color:#A6ACCD;">height 和 width		宽高尺寸,仅适用于type=&quot;image&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">list				引用&lt;datalist&gt;,一个单独的&lt;datalist&gt;不会显示</span></span>
<span class="line"><span style="color:#A6ACCD;">min 和 max		   规定value的最大、最小值,适用于number、range、date、datetime、datetime-local、</span></span>
<span class="line"><span style="color:#A6ACCD;">					month、time 以及 week</span></span>
<span class="line"><span style="color:#A6ACCD;">multiple			布尔类型,允许用户在 &lt;input&gt; 元素中输入一个以上的值,适用于type=file和email</span></span>
<span class="line"><span style="color:#A6ACCD;">pattern (regexp)	规定用于检查 &lt;input&gt; 元素值的正则表达式</span></span>
<span class="line"><span style="color:#A6ACCD;">placeholder			预期提示文字</span></span>
<span class="line"><span style="color:#A6ACCD;">required			是否必填/必选</span></span>
<span class="line"><span style="color:#A6ACCD;">step				规定合法数字间隔,适用于number、range、date、datetime、datetime-local、month、time 以及 week</span></span></code></pre></div><h2 id="新增图像" tabindex="-1">新增图像 <a class="header-anchor" href="#新增图像" aria-label="Permalink to &quot;新增图像&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;canvas&gt;		JS绘制</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;svg&gt;			SVG绘制</span></span></code></pre></div><h2 id="本地存储" tabindex="-1">本地存储 <a class="header-anchor" href="#本地存储" aria-label="Permalink to &quot;本地存储&quot;">​</a></h2><p>浏览器对数据进行本地存储。</p><p>在 HTML5 之前，应用程序数据只能存储在 cookie 中，包括每个服务器请求。本地存储则更安全，并且可在不影响网站性能的前提下将大量数据存储于本地。</p><p>与 cookie 不同，存储限制要大得多（至少5MB），并且信息不会被传输到服务器。</p><h3 id="html-本地存储对象" tabindex="-1">HTML 本地存储对象 <a class="header-anchor" href="#html-本地存储对象" aria-label="Permalink to &quot;HTML 本地存储对象&quot;">​</a></h3><p>HTML 本地存储提供了两个在客户端存储数据的对象：</p><ul><li>window.localStorage - 存储没有截止日期的数据</li><li>window.sessionStorage - 针对一个 session 来存储数据（当关闭浏览器标签页时数据会丢失）</li></ul><h3 id="localstorage" tabindex="-1">localStorage <a class="header-anchor" href="#localstorage" aria-label="Permalink to &quot;localStorage&quot;">​</a></h3><p>localStorage 对象存储的是没有截止日期的数据。当浏览器被关闭时数据不会被删除</p><p>以键值对的形式存储数据</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 存储</span></span>
<span class="line"><span style="color:#A6ACCD;">localStorage</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setItem</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">lastname</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Gates</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 取回</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> localStorage</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getItem</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">lastname</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 或</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> localStorage</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">lastname</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 删除数据</span></span>
<span class="line"><span style="color:#A6ACCD;">localStorage</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">removeItem</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">lastname</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//</span></span></code></pre></div><h3 id="sessionstorage" tabindex="-1">sessionStorage <a class="header-anchor" href="#sessionstorage" aria-label="Permalink to &quot;sessionStorage&quot;">​</a></h3><p>顾名思义，这个对象存储本次会话的内容，当浏览器关闭，代表本次会话关闭，数据就会消失。</p><p>sessionStorage与localStorage的使用是相同的，唯一不同的是sessionStorage的数据会在浏览器关闭时被清除。</p>`,30),p=[e];function o(c,i,r,C,A,y){return a(),n("div",null,p)}const D=s(l,[["render",o]]);export{u as __pageData,D as default};
