# 同步和异步

## 同步通讯

同步就是按照顺序，依次调用，上一个任务完成之后，才可以执行下一个任务，整体是一个排队的状态。

![image-20230619205621587](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619205621587.png)

优点：

1. 即时性比较好，能够快速调用、快速响应



存在的问题：

1. 改动苦难，如果需要添加功能，则需要在对应的编码的位置添加对应的代码，违反开闭原则，**服务耦合性较高**
2. 资源浪费问题，后面的服务都需要等到前一个耗时的任务完成之后才能继续
3. 级联失败，如果前一个任务执行失败了，那么后面的任务也会失败。



微服务间通过Feign实现调用的就属于同步方式



## 异步通讯

目前**异步调用最常见的方式就是事件驱动模式**

发布者发布事件到Broker，Broker是一个事件的周转中心，事件发布者发布事件到Broker，其余服务订阅事件，当收到订阅的事件时，就会各自去执行，不必排队。

![image-20230619205812735](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619205812735.png)

**经典的观察者模式**

![image-20230618160906170](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230618160906170.png)

优点就是：

- 服务解耦
- 性能提升、吞吐量提升
- 服务之间不存在依赖关系，不必担心级联问题
- 流量削峰



缺点：

- 依赖于Broker的可靠性、安全性、吞吐能力
- 架构复杂，各个业务并没有明确的流程线，不易追踪业务管理







# MQ

MQ（Message Queue），是消息队列，充当事件驱动架构中的Broker。

常见的MQ技术：

![image-20230618162128083](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230618162128083.png)





## RabbitMQ安装

### 非Docker方式安装

因为RabbitMQ是基于Erlang语言编写的，所以首先要下载Erlang语言的环境，然后安装RabbitMQ。

> [windows安装RabbitMQ教程](https://developer.aliyun.com/article/1134566)
>
> [GitHubRelease、RabbitMQ-Server](https://github.com/rabbitmq/rabbitmq-server/releases/)

### Docker快速部署

我们使用Docker快速安装RabbitMQ，无需关注环境依赖问题，直接运行，推荐使用这种方式。

在线拉取RabbitMQ的镜像

> **注意：**
>
> 在 Docker Hub 上，`rabbitmq` 和 `rabbitmq:management` 实际上是两个不同的镜像。
>
> - `rabbitmq` 镜像：这是一个基本的 RabbitMQ 镜像，没有任何插件或工具。要添加插件或工具，需要自定义镜像或在容器中手动安装它们。
> - `rabbitmq:management` 镜像：这是一个包含 RabbitMQ 管理插件的镜像，可以通过 Web 界面管理 RabbitMQ Broker。
>
> 通常，在 Docker 中启动 RabbitMQ 时，建议使用带有管理插件的镜像 `rabbitmq:management`，以便在管理界面上直观地查看和操作 RabbitMQ 的队列、交换器、绑定等。
>
> 

1. 拉取镜像

```sh
docker pull rabbitmq:3-management
```



2. 拉取镜像完成之后，我们只需要启动容器就好了。

```sh
docker run \
 -e RABBITMQ_DEFAULT_USER=root \
 -e RABBITMQ_DEFAULT_PASS=root \
 --name mq \
 --hostname mq1 \
 -p 15672:15672 \
 -p 5672:5672 \
 -d \
 rabbitmq:3-management
```

- 15672是UI管理后台的端口
- 5672是消息通信的端口



接下来访问`ip:15672`就能看到RabbitMQ的后台管理页面了，使用我们刚才指定的用户名和密码登录

![image-20230619140000041](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619140000041.png)

![image-20230619140012364](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619140012364.png)





## 功能介绍

**RabbitMQ是支持多租户系统的，可以新建用户并为之分配虚拟机路径。**

![image-20230619141043667](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619141043667.png)

**目前是只有一个虚拟主机`\`，还可以新建虚拟主机**

![image-20230619141318068](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619141318068.png)

**可以为用户分配虚拟主机**

![image-20230619141353012](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619141353012.png)

![image-20230619141418117](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619141418117.png)



## 结构概念

- **Channel通道，操作MQ的工具**
- **Exchange，可以叫做交换机或路由器，路由消息到队列中**
- **queue缓存消息**
- **virtual host虚拟主机，是对exchange、queue等的逻辑分组**

整体的架构图

![rabbitmqstructure](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/rabbitmqstructure.webp)

> 图片来源：
>
> [全网最详细的RabbitMQ基本概念](https://juejin.cn/post/7049160818834800677)

### Channel通道

Channel是在一个TCP连接中逻辑链接，建立在TCP连接基础之上，是与Exchange交互的工具。

一个TCP上可以有多个Channel。



### Exchange

**发布者负责将消息发送给Exchange，交换机，这个Exchange就是一个路由器，负责将消息路由到指定的queue队列，而后消费者从queue中取出消息进行消费**

每个虚拟机中都有多个不同功能的路由器Exchange

![image-20230619141713178](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619141713178.png)



### Queue队列

用来存放消息，对头取出，队尾追加。







# 常见消息模型

在RabbitMQ的官方网站中，给出了几个Demo样例：[RabbitMQ官方快速入门Demo](https://www.rabbitmq.com/getstarted.html)

这几个Demo就包含了基本的消息模型，大致可以分为五种：

- 基本消息队列BasicQueue
- 工作消息队列WorkQueue

**这两种消息模型都是直接基于队列queue来完成的，没有交换机的概念，看图**

![image-20230619143054109](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619143054109.png)



还有三种，可以笼统地概括为**发布订阅模式**，又根据交换机Exchange的不同，继续划分：

- 广播Fanout Exchange
- 路由Direct Exchange
- 主题Topic Exchange





## 基本队列消息模型的使用

在基本消息模型中，只有三个角色：

![image-20230619143505901](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619143505901.png)

- publisher消息发布者，将消息发送到queue中
- queue消息队列，负责接收并缓存消息
- consumer消费者，订阅者，负责消费消息



来一波演示：

我们需要搭建两个工程，一个生产者、一个消费者

导入依赖

```xml
<!--AMQP依赖，包含RabbitMQ-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```



先来看生产者的，大致的流程是这样的：

- 建立连接connection
- 建立通道channel
- 利用channel声明队列queue
- 利用channel向队列发送消息

```java
// 1.创建连接工厂
ConnectionFactory factory = new ConnectionFactory();
// 1.1.设置连接参数，分别是：主机名、端口号、vhost、用户名、密码
factory.setHost("192.168.220.3");
// 注意: 5672是RabbitMQ的连接端口,15672只不过是UI管理后台的端口
factory.setPort(5672);
// 设置虚拟主机
factory.setVirtualHost("/mq-test");
factory.setUsername("lmk");
factory.setPassword("root");
// 1.2.建立连接
Connection connection = factory.newConnection();

// 2.创建通道Channel
Channel channel = connection.createChannel();

// 3.创建队列
String queueName = "simple.queue";
channel.queueDeclare(queueName, false, false, false, null);

// 4.发送消息
String message = "hello, rabbitmq!";
// 发送的数据是基于字节流的形式
channel.basicPublish("", queueName, null, message.getBytes());
System.out.println("发送消息成功：【" + message + "】");

// 5.关闭通道和连接
channel.close();
connection.close();
```

**如果想要看到连接的过程，可以通过Debug的方式来运行。**

![image-20230619150256193](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619150256193.png)

![image-20230619150335791](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619150335791.png)

![image-20230619150428456](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619150428456.png)



**可以查看队列中的消息**

![image-20230619150530874](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619150530874.png)











再来看消费者，大致流程一样：

- 建立连接connection
- 建立通道channel
- 利用channel来声明队列queue
- 定义消费者consumer的消费行为，handleDelivery()
- 利用channel将消费者与队列绑定

```java
// 1.建立连接
ConnectionFactory factory = new ConnectionFactory();
// 1.1.设置连接参数，分别是：主机名、端口号、vhost、用户名、密码
factory.setHost("192.168.220.3");
factory.setPort(5672);
factory.setVirtualHost("/mq-test");
factory.setUsername("lmk");
factory.setPassword("root");
// 1.2.建立连接
Connection connection = factory.newConnection();

// 2.创建通道Channel
Channel channel = connection.createChannel();

// 3.创建队列
String queueName = "simple.queue";
//        声明与哪一个队列绑定
channel.queueDeclare(queueName, false, false, false, null);

// 4.订阅消息
// 通过匿名函数的形式来定义消费行为
channel.basicConsume(queueName, true, new DefaultConsumer(channel){
    @Override
    public void handleDelivery(String consumerTag, Envelope envelope,
                               AMQP.BasicProperties properties, byte[] body) throws IOException {
        // 5.处理消息
        String message = new String(body);
        System.out.println("接收到消息：【" + message + "】");
    }
});
System.out.println("等待接收消息。。。。");
```

**消费者获取队列中的消息，队头中的消息就不存在了，阅后即焚**

![image-20230619151141742](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619151141742.png)





# SpringAMQP

## 基本介绍

刚才的代码是原生的使用RabbitMQ，需要手写很多繁琐的步骤，因此在Spring中做了整合简化。

**首先要了解AMQP，全称Advanced Message Queuing Protocol，高级消息队列协议**

**用于在应用程序或业务之间的*开放标准*** ，是一个标准，因此是与语言无关的，更符合微服务中技术独立性的要求。



**那SpringAMQP就是，基于AMQP协议定义的一套API规范，提供了模版来发送和接受消息，包含两部分：**

- Spring-amqp是基础抽象层
- spring-rabbit是底层的默认实现

（类似于日志框架的架构 ）

可以看SpringAMQP的官网[Spring-AMQP](https://spring.io/projects/spring-amqp)

在官网的介绍中，大致有这三个部分组成：

- **侦听器容器Listener Container，异步处理入队列的消息**
- **RabbitTemplate**，模版，用来发送和接收消息，**但是一般用来发送消息**，把接收消息交给ListenerContainer处理。
- **RabbitAdmin**，用于自动声明队列、交换机exchange和绑定



## 利用SpringAMQP实现简单的消息队列功能SimpleQueue



### 生产者

1. 引入SpringAMQP依赖

```xml
<!--AMQP依赖，包含RabbitMQ-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

只需要引入这一个starter，RabbitMQ的依赖就会自动引入，因为RabbitMQ是SpringAMQP的默认实现。

![image-20230619154957087](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619154957087.png)



2. 在生产者中利用RabbitTemplate发送消息

首先编写生产者的配置文件

```yaml
spring:
  rabbitmq:
    host: 192.168.220.3 #ip
    port: 5672
    username: lmk
    password: root
    virtual-host: /mq-test #虚拟机
```

使用RabbitTemplate发送消息非常简单

**直接将RabbitTempate注入使用就好了**

```java
public class PublisherTest {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void testSendMessage(){
        String queueName = "simple.queue";
        String message = "Hello!RabbitMq";
        rabbitTemplate.convertAndSend(queueName, message);
    }

}
```

**发送成功**

![image-20230619160808639](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619160808639.png)





### 消费者

再来看消费者，只需要编写消费逻辑就好了

1. 引入依赖`spirng-boot-starter-amqp`
2. 配置RabbitMQ的信息

```yaml
spring:
  rabbitmq:
    host: 192.168.220.3
    port: 5672
    username: lmk
    password: root
    virtual-host: /mq-test
```



3. 编写消费逻辑

```java
@Component
public class SimpleConsumer {

    @RabbitListener(queues = {"simple.queue"})
    public void listenSimpleMessageQueue(String msg){
//        用一个形参 来接受队列中的消息
        System.out.println("接收到的消息是【 "+ msg + " 】");
    }

}
```

![image-20230619161726182](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619161726182.png)











## 工作队列WorkQueue

与简单队列原理相同，只不过有多个消费者。

**为了提供消息消费的速度，避免消息在队列中长时间堆积，导致消息延迟过高或消息丢失的问题。**



### 生产者

在生产者中，模拟消息量巨大的情况。

```java
@SpringBootTest
@RunWith(SpringRunner.class)
public class PublisherTest {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    public void testSendMessage() throws Exception{
        String queueName = "simple.queue";
        String message = "message---";
        // 模拟消息量庞大的场景
        for (int i = 0; i < 50; i++) {
            rabbitTemplate.convertAndSend(queueName, message + i);
            Thread.sleep(20);
        }
    }

}
```







### 消费者

在消费者中定义两个消息监听者，模拟多个应用。

休眠来模拟处理过程

```java
@Component
public class SimpleConsumer {

    @RabbitListener(queues = {"simple.queue"})
    public void listenWork1Queue(String msg) throws Exception{
        System.out.println("Work1接收到的消息 【 " + msg + " 】");
        Thread.sleep(20);
    }

    @RabbitListener(queues = {"simple.queue"})
    public void listenWork2Queue(String msg) throws Exception{
        System.err.println("Work2.......接收到的消息 【 " + msg + " 】");
        Thread.sleep(200);
    }
}

```



先启动消费者，然后启动生产者

发现消费者并不是按照处理速度的比例来处理的，两个消费者的处理速度不同，但是处理了相同数量的数据。

![image-20230619163724240](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619163724240.png)

这是因为消费者存在消费预取机制。



### 消费预取机制

当消费者来不及处理时，就会对队列中的消息进行预取，然后自己慢慢消费，相当于在每个消费者内部有一个队列。

**默认这个预取的数量是没有限制的**，这就导致了上面的情况发生了：虽然两者的处理速度不同，但是处理的数量却是相同的。

**可以修改`preFetch`这个配置项，用来设置预取数量的大小**

我们设置`preFetch`为1，每个消费者每次只能取一个，这样就会每次消费一个取一个。

**我们一般会根据消费者的能力来设置preFetch的大小，处理能力强的，就设置preFetch大一点**

**这样就会根据处理能力来分配消息，能者多劳**

![image-20230619164330447](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619164330447.png)







## 发布、订阅

之前的简单消息队列模型，是基于队列queue的，被任一消费者消费后，就会立即在队列中消失，无法做到一个消息被多个服务同时消费的情况。

**发布与订阅模式，允许将一个消费发送给多个消费者，实现方式是加入exchange**

![image-20230619165142745](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619165142745.png)

原理还是很简单的：

**通过交换机将消息转发给多个队列**

常见的Exchange类型有三种：

- Fanout广播
- Direct路由
- Topic话题

**注意：交换机只负责消息的转发，不负责消息的存储，消息的存储是队列queue的职责**



### FanoutExchange广播

**FanoutExchange会将接收到的消息路由到每一个与其绑定的队列queue**



**在SpringAMQP中提供了声明交换机、队列、绑定的API**

- **Exchange交换机的顶级接口**
- **Queue队列的顶层类**
- **Binding，用来描述queue与exchange的绑定关系**







在SpringAMQP中，使用FanoutExchange。

大致的思路如下：

- 在consumer中，**声明队列queue、交换机exchange，并将两者绑定。**
- 在publisher中，推送消息到交换机



#### 消费者

新建一个配置类，用于提供Exchange实例、Queue实例，并绑定。

创建了两个队列queue，并绑定到了一个广播交换机FanoutExchange

```java
@Configuration
public class FanoutConfig {

    /**
     * 创建广播FanoutExchange交换机
     *
     * @return
     */
    @Bean
    public FanoutExchange fanoutExchange() {
        // 指定交换机的名称
        return new FanoutExchange("my-fanout");
    }

    /**
     * 创建一个队列
     *
     * @return
     */
    @Bean
    public Queue queue1() {
        // 创建一个队列，并指定名称
        return new Queue("queue1");
    }

    /**
     * 绑定队列到交换机，通过自动注入的方式注入FanoutExchange和Queue
     *
     * @param queue1
     * @param fanoutExchange
     * @return Binding 通过一个Binding对象来描述绑定关系
     */
    @Bean
    public Binding bindingQueue12MyFanout(Queue queue1, FanoutExchange fanoutExchange) {
        return BindingBuilder.bind(queue1).to(fanoutExchange);
    }


    /**
     * 继续创建队列
     * @return
     */
    @Bean
    public Queue queue2() {
        // 创建一个队列，并指定名称
        return new Queue("queue2");
    }

    /**
     * 绑定第二个队列到交换机
     * @param queue2
     * @param fanoutExchange
     * @return
     */
    @Bean
    public Binding bindingQueue22MyFanout(Queue queue2, FanoutExchange fanoutExchange) {
        return BindingBuilder.bind(queue2).to(fanoutExchange);
    }
}

```



新建消费逻辑

```java
@Component
public class FanoutConsumer {
    @RabbitListener(queues = {"queue1"})
    public void queue1Consumer(String msg) {
        System.out.println("收到queue1...的消息" + msg);
    }

    @RabbitListener(queues = {"queue2"})
    public void queue2Consumer(String msg) {
        System.err.println("收到queue2...的消息" + msg);
    }
}

```



启动消费者，会看到Rabbit中已经有了我们声明的交换机已经绑定的两个队列

![image-20230619173201847](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619173201847.png)

![image-20230619173219790](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619173219790.png)







#### 发布者

只需要将消息发送给交换机就好了。

```java
@SpringBootTest
@RunWith(SpringRunner.class)
public class PublisherTest {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    public void testFanoutExchange(){
        String exchangeName = "my-fanout";
        String message = "Hello!EveryOne";
        rabbitTemplate.convertAndSend(exchangeName,"",message);
    }
}
```













### DirectExchange路由

**DirectExchange会将接收到的消息根据规则路由到指定的Queue，因此叫做路由模式**

- 每个Queue都设置对应的Bindingkey
- 发布者publisher在发送消息时，也要指定一个key，叫做RoutingKey
- DirectExchange交换机就会将消息路由到Bindingkey与Routingkey一致的队列中。

- **一个队列可以绑定多个Bindingkey**

![image-20230619195709580](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619195709580.png)

#### 消费者

在消费者中，进行队列与交换机的绑定，如果利用上面基于Bean的方式来绑定Exchange与Queue，甚是繁琐。

**我们利用`@RabbitListener`的属性的方式来绑定队列与交换机**

新建一个消费者

```java
@Component
public class DirectConsumer {
    @RabbitListener(bindings = {
            @QueueBinding(
                    value = @Queue(name = "queue1"),// 队列名称
                    exchange = @Exchange(name = "my-direct", type = ExchangeTypes.DIRECT),// 交换机名称、类型，默认就是Direct
                    key = {"red", "blue"}// 指定多个BindingKey
            )
    }
    )
    public void queue1Consumer(String msg) {
        System.out.println("收到queue1的消息,bindingKey为red、blue" + msg);
    }


    @RabbitListener(bindings = {
            @QueueBinding(
                    value = @Queue(name = "queue2"), // 队列名称
                    exchange = @Exchange(name = "my-direct", type = ExchangeTypes.DIRECT), //交换机名称、类型，默认就是direct
                    key = {"red", "yellow"} // 指定bindingKey,可以指定多个
            )
    }
    )
    public void queue2Consumer(String msg) {
        System.err.println("收到queue2的消息,bindingKey为red、yellow" + msg);
    }

}
```

(也没比Bean注入简单多少~~~)

![image-20230619180201029](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619180201029.png)

![image-20230619180232318](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619180232318.png)

#### 发布者

在发送给交换机消息时，指定RoutingKey，即可

```java
        String exchangeName = "my-direct";
        String routingkey = "blue";
        String message = "这条消息只有BindingKey为blue的才能收到";
        rabbitTemplate.convertAndSend(exchangeName, routingkey, message);
```











### TopicExchange话题

**TopicExchange与DirectExchange类似，区别在于RoutingKey必须是多个单词的列表，并且以`.`分割**

会去匹配RoutingKey与BindingKey相符的queue，进行消息的发送

**Queue与Exchange绑定时，可以使用通配符：**

- **`*`代表一个单词**
- **`#`代指0个或多个单词**

![image-20230619200049094](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619200049094.png)







#### 消费者

只需要修改Exchange的类型即可

```java
@Component
public class TopicConsumer {

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = "queue2topic"),
            exchange = @Exchange(name = "my-topic", type = ExchangeTypes.TOPIC),
            key = "china.#"
    ))
    public void testTopicMessage(String msg) {
        System.out.println("中国的" + msg);
    }

    @RabbitListener(bindings = {@QueueBinding(
            value = @Queue(name = "queue3topci"),
            exchange = @Exchange(name = "my-topic", type = ExchangeTypes.TOPIC),
            key = "#.weather"
    )})
    public void testTopicMsg(String msg) {
        System.err.println("今天的天气是" + msg);
    }
}

```

![image-20230619201451694](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619201451694.png)

![image-20230619201501165](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619201501165.png)

#### 发布者

指定RoutingKey

```java
    @Test
    public void testTopic() {
        String exchangeName = "my-topic";
        String routingkey = "china.weacher";
        String message = "天气真不错~~";
        rabbitTemplate.convertAndSend(exchangeName, routingkey, message);
    }
```

![image-20230619201623446](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619201623446.png)











## 消息转换器

**在原生的使用RabbitMQ时，只能够发送字节流。**

**在SpringAMQP中，发送数据时，发现类型是Object类型，这就意味着我们可以发送任意类型的数据。**

**在SpringAMQP内部发送时，默认会自动帮我们把对象系列化，然后进行传输。**



来看一波，我们发送一个Map集合，来查看管道中的消息是什么样的

```java
HashMap<String, String> map = new HashMap<>();
map.put("name", "liumingkai");
map.put("age", "18");

rabbitTemplate.convertAndSend("test-queue", map);
```



![image-20230619202646174](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619202646174.png)



**Spring对消息对象处理是由`org.springframework.amqp.support.converter.MessageConverter`来处理的，而这个接口的默认实现时`SimpleMessageConverter`，是基于JDK的`ObjectOutputStream`来完成序列化**

比如说，我们需要要将发送的消息是JSON格式的，那么可以将对应的转换器Bean注入即可。

首先引入依赖

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
```



**在消息发布者和消费者中都要注入Jackson的转换器，之后正常使用就好了。**

**双方都要注入Jackson的转换器！！！**

```java
@Bean
public MessageConverter jacksonMessageConverter() {
    return new Jackson2JsonMessageConverter();
}
```



![image-20230619204853981](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619204853981.png)



在消息接收方，直接指定转换后的形参类型，Jackson的转换器会自动转换为形参类型并赋值。

```java
@RabbitListener(queues = "test-queue")
public void testObjectMessage(Map<String, String> map) {
    System.out.println(map);
}
```



















































