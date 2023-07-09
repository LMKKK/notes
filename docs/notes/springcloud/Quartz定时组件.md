## 介绍
Quartz是Job Scheduling(作业调度）领域的一个开源项目，非常出名的**任务调度框架**
Quartz可以单独使用也可以整合到Spring中。
官网[Quartz Enterprise Job Scheduler](http://www.quartz-scheduler.org/)
定时任务举例：

- 每天0点自动整理用户数据并发送至邮箱
- 每隔一小时执行一次
- .......

## 非SpringBoot环境下使用
非SpringBoot环境下使用，我们需要导入以下依赖
```xml
<dependency>
		<groupId>org.quartz-scheduler</groupId>
		<artifactId>quartz</artifactId>
		<version>2.3.2</version>
</dependency>
```
首先要了解Quartz的核心原理
![](https://cdn.nlark.com/yuque/0/2023/jpeg/29136536/1685976153243-0aadc71b-d1f0-4366-9391-b48cbd4c14cb.jpeg)

- Job接口是自定义任务需要实现的接口，只有一个`execute()`方法
- JobDetail能够对Job做出更丰富的设置，对Job任务封装，增加了很多的配置信息，每次执行的是JobDetail实例
- Trigger触发器接口，用来规定任务触发的规则、时机。可以使用Cron表达式来定义执行规则，有两个子接口
   - SimpleTrigger简单规则的触发器
   - CronTrigger利用Cron创建复杂规则的触发器
- Scheduler调度器，根据JobDetail和Trigger去执行任务
- SchedulerFactory工厂，每个Scheduler实例都是Factory负责创建的

**注意，任务是以组来区分的，每个JobDetail可以绑定多个Trigger，每个Trigger也可绑定多个JobDetail**



## SpringBoot整合Quartz
> **巨人的肩膀**
> [SpringBoot整合任务调度框架Quartz及持久化配置 - 天乔巴夏丶 - 博客园](https://www.cnblogs.com/summerday152/p/14193968.html)
> [springboot整合quartz项目使用（含完整代码）_springboot quartz_小lee学编程的博客-CSDN博客](https://blog.csdn.net/qq798867485/article/details/128072743)
> 

开箱即用

1. 引入依赖，SpringBoot中已经预设了Quartz的依赖管理，我们只需要导入即可
```xml
<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-quartz</artifactId>
</dependency>
```

2. 创建任务，不需要实现Job接口了，只需要继承`QuartzJobBean`
```java
@Slf4j
public class MyTimeJob  extends QuartzJobBean {

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        log.info("现在是{}", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(LocalDateTime.now()));
    }
}
```

3. 创建JobDetail和Trigger

对于简单的任务，可以使用SimpleTrigger
复杂的任务，可以使用CronTrigger
**定时任务的本质就是，我们实现JobDetail和Trigger，然后交给Scheduler去执行**
> 在官网中介绍了，只要你引用了quartz的依赖后，springboot会自适配调度器。当然我们也可以新建bean，修改SchedulerFactoryBean的一些默认属性值。

关于JobDetail和Trigger的提供方式，有两种：

1. 第一种方式：将JobDetail和Trigger直接提供出去，SpringBoot会自动适配调度器。

我们将JobDetail和Trigger直接提供出去，SpringBoot会找到对应的Scheduler去执行，因为SpringBoot会自动注入一个叫做SchedulerFactory，所以我们不必提供Scheduler。
_注意：Schedule和Scheduler不是同一个意思_

- _Schedule可以理解为规则的定义_
- _Scheduler才是调度器_
```java
@Component
public class QuartzConfig {

//    组名前缀
    private static final String ID = "SUMMERDAY";

    @Bean
    public JobDetail getJobDetail() {
        return JobBuilder.newJob(MyTimeJob.class)
                .withIdentity("01-Job") // 任务的唯一标识
                .storeDurably() // 持久化存储
                .build();
    }

    @Bean
    public Trigger getTrigger() {
//        Cron表达式执行器
        CronScheduleBuilder scheduleBuilder =
                CronScheduleBuilder.cronSchedule("0/2 * * * * ? *");

        return TriggerBuilder.newTrigger()
                .forJob("01-Job") // 为哪一个任务调度，此处可以还是用identity,也可以将JobDetail实例注入
                .withIdentity(ID + " 01Trigger") // Trigger的唯一标识
                .withSchedule(scheduleBuilder)
                .build();
    }

}
```

2. 第二种方式：利用原生的Quartz的方式，首先获取到Scheduler，然后将JobDetail和Trigger显式地交给它
```java
@Component
public class CronJobInit {

    private static final String ID = "SUMMERDAY";

    // 将Scheduler注入
    @Autowired
    private Scheduler scheduler;

    @PostConstruct
    public void initJob() throws Exception {
//        创建JobDetail
        JobDetail jobDetail = JobBuilder.newJob(MyTimeJob.class)
                .withIdentity(ID + " 01")
                .storeDurably()
                .build();

//        Cron调度表
        CronScheduleBuilder scheduleBuilder =
                CronScheduleBuilder.cronSchedule("0/5 * * * * ? *");

        // 创建任务触发器
        Trigger trigger = TriggerBuilder.newTrigger()
                .forJob(jobDetail) // 此处也可以使用JobDetail的identity
                .withIdentity(ID + " 01Trigger") // Trigger的唯一标识
                .withSchedule(scheduleBuilder)
                .startNow() //立即執行一次任務
                .build();
        // 手动将JobDetail和Trigger交给Scheduler
        scheduler.scheduleJob(jobDetail, trigger);
    }
}
```

yml配置
```yaml
spring:
  quartz:
    job-store-type: memory #数据存储类型,可选jdbc
    auto-startup: true # 自启动
    startup-delay: 0 #延迟N秒启动
    wait-for-jobs-to-complete-on-shutdown: false # 应用关闭时，是否等待定时任务执行完成，默认是false
    overwrite-existing-jobs: false # 是否覆盖已有Job的配置
    properties:
      org:
        quartz:
          threadPool:
            threadCount: 10 # 线程池大小
            threadPriority: 5 # 线程优先级
            class: org.quartz.simpl.SimpleThreadPool #线程池类型
            threadNamePrefix: 'schedule-job-' # 线程池中线程名称前缀
```

启动测试
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29136536/1686032112692-9b1ac6f5-8c07-48f0-b47d-6db9a9173a14.png#averageHue=%232e343c&clientId=ua51d4f7f-c317-4&from=paste&height=216&id=u64e85eac&originHeight=238&originWidth=1579&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=48468&status=done&style=none&taskId=u675842b1-6553-43c0-acdb-3823d8900c2&title=&width=1435.4545143419068)
## Cron表达式
Cron是用来描述时间\周期的表达式，由7部分组成。
![](https://cdn.nlark.com/yuque/0/2023/jpeg/29136536/1685973761072-dff3faf0-6a1a-4602-b9cd-8a74216ff22d.jpeg)
关于每个值的范围

| 名称 | 是否必须 | 值范围 | 允许字符 |
| --- | --- | --- | --- |
| 秒 | 是 | 0-59 | , - * / |
| 分 | 是 | 0-59 | , - * / |
| 时 | 是 | 0-59 | , - * / |
| 日 | 是 | 0-31 | , - * / ? L W  |
| 月 | 是 | 1-12 | , - * / |
| 周 | 是 | 1-7（1是周日） | , - * / ? L  # |
| 年 | 否，可以省略 | 1970-2099 | , - * / |

字符的含义：

- `,`并列的意思，例如：每月1号、2号，则日对应的位置的表达式是`1,2`
- `-`范围，例如每月3号到10号，`3-10`
- `*`所有值
- `/`递增，例如从第1秒开始，每隔10秒 `1/10`
- `?`只能用在日和周上，但不能同时用，表示不指定
- `#`只能用在周上，用于指定第几个月的第几周，例如`6#3`第三周的星期五
- `L`最后一个
- `W`只能用在日上，表示工作日WeekDay

例如：

- 每个月的1号和2号早上7点执行一个任务，则Cron表达式为：`0 0 7 1,2 * ? *`
- 每周五的下午五点到6点，每隔10分钟，执行一次任务，则为：`0 0/10 17-18 ? * 6 *`(周五的序号是6)

## 在线Cron表达式生成器工具
[在线Cron表达式生成器](https://cron.qqe2.com/)

---








## Quartz持久化存储
将任务/作业存储到数据库中，因为系统运行期间，不可能为了某一个自定义任务去停掉系统。
将作业规定到数据库中，Quartz去数据库读取任务，然后执行。
待更新......(啥时候我用到的使用。。。。）



















