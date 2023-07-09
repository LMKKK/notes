import{_ as s,o as a,c as n,V as l}from"./chunks/framework.48c56699.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"notes/springcloud/Quartz定时组件.md","filePath":"notes/springcloud/Quartz定时组件.md","lastUpdated":null}'),o={name:"notes/springcloud/Quartz定时组件.md"},p=l(`<h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>Quartz是Job Scheduling(作业调度）领域的一个开源项目，非常出名的<strong>任务调度框架</strong> Quartz可以单独使用也可以整合到Spring中。 官网<a href="http://www.quartz-scheduler.org/" target="_blank" rel="noreferrer">Quartz Enterprise Job Scheduler</a> 定时任务举例：</p><ul><li>每天0点自动整理用户数据并发送至邮箱</li><li>每隔一小时执行一次</li><li>.......</li></ul><h2 id="非springboot环境下使用" tabindex="-1">非SpringBoot环境下使用 <a class="header-anchor" href="#非springboot环境下使用" aria-label="Permalink to &quot;非SpringBoot环境下使用&quot;">​</a></h2><p>非SpringBoot环境下使用，我们需要导入以下依赖</p><div class="language-xml"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">org.quartz-scheduler</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">quartz</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">2.3.2</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>首先要了解Quartz的核心原理 <img src="https://cdn.nlark.com/yuque/0/2023/jpeg/29136536/1685976153243-0aadc71b-d1f0-4366-9391-b48cbd4c14cb.jpeg" alt=""></p><ul><li>Job接口是自定义任务需要实现的接口，只有一个<code>execute()</code>方法</li><li>JobDetail能够对Job做出更丰富的设置，对Job任务封装，增加了很多的配置信息，每次执行的是JobDetail实例</li><li>Trigger触发器接口，用来规定任务触发的规则、时机。可以使用Cron表达式来定义执行规则，有两个子接口 <ul><li>SimpleTrigger简单规则的触发器</li><li>CronTrigger利用Cron创建复杂规则的触发器</li></ul></li><li>Scheduler调度器，根据JobDetail和Trigger去执行任务</li><li>SchedulerFactory工厂，每个Scheduler实例都是Factory负责创建的</li></ul><p><strong>注意，任务是以组来区分的，每个JobDetail可以绑定多个Trigger，每个Trigger也可绑定多个JobDetail</strong></p><h2 id="springboot整合quartz" tabindex="-1">SpringBoot整合Quartz <a class="header-anchor" href="#springboot整合quartz" aria-label="Permalink to &quot;SpringBoot整合Quartz&quot;">​</a></h2><blockquote><p><strong>巨人的肩膀</strong><a href="https://www.cnblogs.com/summerday152/p/14193968.html" target="_blank" rel="noreferrer">SpringBoot整合任务调度框架Quartz及持久化配置 - 天乔巴夏丶 - 博客园</a><a href="https://blog.csdn.net/qq798867485/article/details/128072743" target="_blank" rel="noreferrer">springboot整合quartz项目使用（含完整代码）_springboot quartz_小lee学编程的博客-CSDN博客</a></p></blockquote><p>开箱即用</p><ol><li>引入依赖，SpringBoot中已经预设了Quartz的依赖管理，我们只需要导入即可</li></ol><div class="language-xml"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">org.springframework.boot</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">spring-boot-starter-quartz</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><ol start="2"><li>创建任务，不需要实现Job接口了，只需要继承<code>QuartzJobBean</code></li></ol><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Slf4j</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyTimeJob</span><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">QuartzJobBean</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">protected</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">executeInternal</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">JobExecutionContext</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">context</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">throws</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">JobExecutionException</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        log</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">info</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">现在是{}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> DateTimeFormatter</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ofPattern</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">yyyy-MM-dd HH:mm:ss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">format</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">LocalDateTime</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">now</span><span style="color:#89DDFF;">()));</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><ol start="3"><li>创建JobDetail和Trigger</li></ol><p>对于简单的任务，可以使用SimpleTrigger 复杂的任务，可以使用CronTrigger <strong>定时任务的本质就是，我们实现JobDetail和Trigger，然后交给Scheduler去执行</strong></p><blockquote><p>在官网中介绍了，只要你引用了quartz的依赖后，springboot会自适配调度器。当然我们也可以新建bean，修改SchedulerFactoryBean的一些默认属性值。</p></blockquote><p>关于JobDetail和Trigger的提供方式，有两种：</p><ol><li>第一种方式：将JobDetail和Trigger直接提供出去，SpringBoot会自动适配调度器。</li></ol><p>我们将JobDetail和Trigger直接提供出去，SpringBoot会找到对应的Scheduler去执行，因为SpringBoot会自动注入一个叫做SchedulerFactory，所以我们不必提供Scheduler。 <em>注意：Schedule和Scheduler不是同一个意思</em></p><ul><li><em>Schedule可以理解为规则的定义</em></li><li><em>Scheduler才是调度器</em></li></ul><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Component</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">QuartzConfig</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//    组名前缀</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">static</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">String</span><span style="color:#A6ACCD;"> ID </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">SUMMERDAY</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">JobDetail</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getJobDetail</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> JobBuilder</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">newJob</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">MyTimeJob</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">class</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">withIdentity</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">01-Job</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 任务的唯一标识</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">storeDurably</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 持久化存储</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">build</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">Trigger</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getTrigger</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//        Cron表达式执行器</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">CronScheduleBuilder</span><span style="color:#A6ACCD;"> scheduleBuilder </span><span style="color:#89DDFF;">=</span></span>
<span class="line"><span style="color:#A6ACCD;">                CronScheduleBuilder</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">cronSchedule</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">0/2 * * * * ? *</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> TriggerBuilder</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">newTrigger</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forJob</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">01-Job</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 为哪一个任务调度，此处可以还是用identity,也可以将JobDetail实例注入</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">withIdentity</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">ID </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> 01Trigger</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// Trigger的唯一标识</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">withSchedule</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">scheduleBuilder</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">build</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><ol start="2"><li>第二种方式：利用原生的Quartz的方式，首先获取到Scheduler，然后将JobDetail和Trigger显式地交给它</li></ol><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Component</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">CronJobInit</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">static</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">final</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">String</span><span style="color:#A6ACCD;"> ID </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">SUMMERDAY</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 将Scheduler注入</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">Scheduler</span><span style="color:#A6ACCD;"> scheduler</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">PostConstruct</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">initJob</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">throws</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">Exception</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//        创建JobDetail</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">JobDetail</span><span style="color:#A6ACCD;"> jobDetail </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> JobBuilder</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">newJob</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">MyTimeJob</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">class</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">withIdentity</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">ID </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> 01</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">storeDurably</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">build</span><span style="color:#89DDFF;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//        Cron调度表</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">CronScheduleBuilder</span><span style="color:#A6ACCD;"> scheduleBuilder </span><span style="color:#89DDFF;">=</span></span>
<span class="line"><span style="color:#A6ACCD;">                CronScheduleBuilder</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">cronSchedule</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">0/5 * * * * ? *</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 创建任务触发器</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">Trigger</span><span style="color:#A6ACCD;"> trigger </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> TriggerBuilder</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">newTrigger</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forJob</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">jobDetail</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 此处也可以使用JobDetail的identity</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">withIdentity</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">ID </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> 01Trigger</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// Trigger的唯一标识</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">withSchedule</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">scheduleBuilder</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">startNow</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//立即執行一次任務</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">build</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 手动将JobDetail和Trigger交给Scheduler</span></span>
<span class="line"><span style="color:#A6ACCD;">        scheduler</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">scheduleJob</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">jobDetail</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> trigger</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>yml配置</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">spring</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">quartz</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">job-store-type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">memory</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#数据存储类型,可选jdbc</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">auto-startup</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 自启动</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">startup-delay</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#延迟N秒启动</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">wait-for-jobs-to-complete-on-shutdown</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 应用关闭时，是否等待定时任务执行完成，默认是false</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">overwrite-existing-jobs</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 是否覆盖已有Job的配置</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">properties</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">org</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">quartz</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">threadPool</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">threadCount</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 线程池大小</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">threadPriority</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 线程优先级</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">class</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">org.quartz.simpl.SimpleThreadPool</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#线程池类型</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#F07178;">threadNamePrefix</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">schedule-job-</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 线程池中线程名称前缀</span></span></code></pre></div><p>启动测试 <img src="https://cdn.nlark.com/yuque/0/2023/png/29136536/1686032112692-9b1ac6f5-8c07-48f0-b47d-6db9a9173a14.png#averageHue=%232e343c&amp;clientId=ua51d4f7f-c317-4&amp;from=paste&amp;height=216&amp;id=u64e85eac&amp;originHeight=238&amp;originWidth=1579&amp;originalType=binary&amp;ratio=1.100000023841858&amp;rotation=0&amp;showTitle=false&amp;size=48468&amp;status=done&amp;style=none&amp;taskId=u675842b1-6553-43c0-acdb-3823d8900c2&amp;title=&amp;width=1435.4545143419068" alt="image.png"></p><h2 id="cron表达式" tabindex="-1">Cron表达式 <a class="header-anchor" href="#cron表达式" aria-label="Permalink to &quot;Cron表达式&quot;">​</a></h2><p>Cron是用来描述时间\\周期的表达式，由7部分组成。 <img src="https://cdn.nlark.com/yuque/0/2023/jpeg/29136536/1685973761072-dff3faf0-6a1a-4602-b9cd-8a74216ff22d.jpeg" alt=""> 关于每个值的范围</p><table><thead><tr><th>名称</th><th>是否必须</th><th>值范围</th><th>允许字符</th></tr></thead><tbody><tr><td>秒</td><td>是</td><td>0-59</td><td>, - * /</td></tr><tr><td>分</td><td>是</td><td>0-59</td><td>, - * /</td></tr><tr><td>时</td><td>是</td><td>0-59</td><td>, - * /</td></tr><tr><td>日</td><td>是</td><td>0-31</td><td>, - * / ? L W</td></tr><tr><td>月</td><td>是</td><td>1-12</td><td>, - * /</td></tr><tr><td>周</td><td>是</td><td>1-7（1是周日）</td><td>, - * / ? L #</td></tr><tr><td>年</td><td>否，可以省略</td><td>1970-2099</td><td>, - * /</td></tr></tbody></table><p>字符的含义：</p><ul><li><code>,</code>并列的意思，例如：每月1号、2号，则日对应的位置的表达式是<code>1,2</code></li><li><code>-</code>范围，例如每月3号到10号，<code>3-10</code></li><li><code>*</code>所有值</li><li><code>/</code>递增，例如从第1秒开始，每隔10秒 <code>1/10</code></li><li><code>?</code>只能用在日和周上，但不能同时用，表示不指定</li><li><code>#</code>只能用在周上，用于指定第几个月的第几周，例如<code>6#3</code>第三周的星期五</li><li><code>L</code>最后一个</li><li><code>W</code>只能用在日上，表示工作日WeekDay</li></ul><p>例如：</p><ul><li>每个月的1号和2号早上7点执行一个任务，则Cron表达式为：<code>0 0 7 1,2 * ? *</code></li><li>每周五的下午五点到6点，每隔10分钟，执行一次任务，则为：<code>0 0/10 17-18 ? * 6 *</code>(周五的序号是6)</li></ul><h2 id="在线cron表达式生成器工具" tabindex="-1">在线Cron表达式生成器工具 <a class="header-anchor" href="#在线cron表达式生成器工具" aria-label="Permalink to &quot;在线Cron表达式生成器工具&quot;">​</a></h2><p><a href="https://cron.qqe2.com/" target="_blank" rel="noreferrer">在线Cron表达式生成器</a></p><hr><h2 id="quartz持久化存储" tabindex="-1">Quartz持久化存储 <a class="header-anchor" href="#quartz持久化存储" aria-label="Permalink to &quot;Quartz持久化存储&quot;">​</a></h2><p>将任务/作业存储到数据库中，因为系统运行期间，不可能为了某一个自定义任务去停掉系统。 将作业规定到数据库中，Quartz去数据库读取任务，然后执行。 待更新......(啥时候我用到的使用。。。。）</p>`,41),e=[p];function t(r,c,D,y,F,i){return a(),n("div",null,e)}const d=s(o,[["render",t]]);export{C as __pageData,d as default};
