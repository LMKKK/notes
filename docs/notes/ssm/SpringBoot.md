# 入门

## 简介

SpringBoot设计的目的是用来**简化**Spring应用的初始搭建以及开发过程。

### 原生SpringMVC程序开发过程

- 导入相关依赖
- 创建Web容器
- 配置Spring的配置类
- 数据层、服务层、表现层开发



### SpringBoot初体验

创建SpringBoot项目

> SpringBoot3.0.2以上的项目需要Java17及以上的版本

![image-20230210222914723](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210222914723.png)

![image-20230210223058979](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210223058979.png)

![image-20230210223213452](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210223213452.png)

![image-20230210223318817](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210223318817.png)



接下来看一下SpringBoot程序如何启动。

![image-20230210223922690](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210223922690.png)

![image-20230210223957204](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210223957204.png)

**SpringBoot的启动类会加载当前类所在的包及其子包下的Bean**

![image-20230210224101695](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210224101695.png)

![image-20230210224233869](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210224233869.png)



一个SpringBoot项目就已经创建成功并运行了，可以发现相比于原生的SSM开发，简化了非常多。

看一下SpringBoot的pom文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <!--    指定了一个父工程，父工程中的设置可以继承到本项目中，SpringBoot项目必须要做的就是继承这个父工程-->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.8</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.liumingkai</groupId>
    <artifactId>SpringBootFirst</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>SpringBootFirst</name>
    <description>SpringBootFirst</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
<!--        SpringBoot-Web的依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

<!--        SpringBoot单元测试的依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```



### SpringBoot与原生SSM的对比

![image-20230210225317476](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210225317476.png)

* **坐标**

  `Spring` 程序中的坐标需要自己编写，而且坐标非常多

  `SpringBoot` 程序中的坐标是我们在创建工程时进行勾选自动生成的

* **web3.0配置类**

  `Spring` 程序需要自己编写这个配置类。这个配置类大家之前编写过，肯定感觉很复杂

  `SpringBoot` 程序不需要我们自己书写

* **配置类**

  `Spring/SpringMVC` 程序的配置类需要自己书写。而 `SpringBoot`  程序则不需要书写。

> 基于IDEA的`Spring Initializr` 快速构建 `SpringBoot` 工程时需要联网
>
> 设备没有联网的情况：
>
> 去官网下载
>
> https://start.spring.io/
>
> ![image-20230210230346769](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210230346769.png)
>
> ![image-20230210230448902](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210230448902.png)
>
> ![image-20230210230522526](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210230522526.png)



### SpringBoot项目快速启动

如果想要自己的SpringBoot项目在其他电脑上运行，而其他电脑上又没有IDEA这种工具，此时可以将SpringBoot项目打成Jar包，直接运行此jar包即可。

**在打包前，需要保证项目中添加了这个插件，也就是我们使用SpringInitializr快速构建项目时自带的这个插件，否则打包后的项目无法直接运行**

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>    

```



![image-20230210231206231](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210231206231.png)

将此jar包发送到其他设备，通过命令行工具运行项目

```
java -jar xxx.jar
```

![image-20230210231831782](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210231831782.png)



### SpringBoot的依赖管理

#### 起步依赖

项目的pom文件中，继承了一个父工程

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.7.8</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
```

**而这个工程又继承自**

```xml
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-dependencies</artifactId>
<version>2.7.8</version>
```

**在这个工程的pom文件中，我们可以看到，他已经将大部分的技术的版本号配置好了,不用担心各个技术之间版本的冲突了。**

![image-20230210233859039](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210233859039.png)

**同时设置了这些技术对应的依赖管理**

![image-20230210234125741](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210234125741.png)

因此，我们只需要在自己的SpringBoot项目中，添加依赖的groupId和artifactId即可，无需指定版本号，因为都是从父工程中继承过来的，父工程中已经做好了处理好了相关依赖之间的版本（如果有特殊要求也可以指定版本）

**这些 xxx-starter-xxx的依赖就是起始依赖，我们只需要导入这种起始依赖就可以快速构建对应技术的项目，接下来要使用什么技术，只需要导入对应的起始依赖就行了**





再来看一下这个依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

在这个依赖中，已经设置了好了tomcat、webmvc等依赖，因此我们可以创建并运行Web项目。

![image-20230210234523207](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230210234523207.png)



#### 程序启动

还有这个启动类，我们每个SpringBoot程序都要有这个类，我们也可以将这个类叫做引导类

```java
@SpringBootApplication
public class SpringBootFirstApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootFirstApplication.class, args);
    }

}
```

这个启动类帮我们完成了Spring配置、SpringMVC的配置。

* `SpringBoot` 在创建项目时，采用jar的打包方式

* `SpringBoot` 的引导类是项目的入口，运行 `main` 方法就可以启动项目



#### 使用指定依赖

因为在SpringBoot的父工程中，默认设置了对应的版本的依赖，如果想过要换掉一些默认的依赖，使用指定的依赖。

先将默认的依赖排除掉，然后添加指定的依赖。

比如说，我们不想使用Tomcat这个服务器，换成Jetty

Tomcat的依赖是在这个依赖中的

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

我们先看一下这个依赖中的tomcat的groupId和articald

![image-20230211005052574](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230211005052574.png)

然后将其排除掉，**添加指定技术的起始依赖**

![image-20230211005302031](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230211005302031.png)

运行就可以了。

> Jetty是一个更加轻量级的服务器，如果想要开启指定的功能，就需要单独的设置。
>
> Tomcat默认开启了很多设置，所以更加偏重量。
>
> 如果想要开启大型的复杂的系统，可以使用Tomcat；如果想要开发小型简单系统，可以使用Jetty





#### 依赖管理总结

SpringBoot的依赖管理，具体是`spring-boot-dependencies`这个模块在管理，可以通过这个地址来查看所有SpringBoot管理的依赖。

> [Managed Dependency Coordinates](https://docs.spring.io/spring-boot/docs/current/reference/html/dependency-versions.html)

因此，我们导入依赖时，可以不用指定版本号。



## 总结

原始 `Spring` 环境搭建和开发存在以下问题：

* 配置繁琐
* 依赖设置繁琐

`SpringBoot` 程序优点恰巧就是针对 `Spring` 的缺点

* 自动配置。这个是用来解决 `Spring` 程序配置繁琐的问题
* 起步依赖。这个是用来解决 `Spring` 程序依赖设置繁琐的问题
* 辅助功能（内置服务器,...）。我们在启动 `SpringBoot` 程序时既没有使用本地的 `tomcat` 也没有使用 `tomcat` 插件，而是使用 `SpringBoot` 内置的服务器。







# 配置文件

对SpringBoot程序作出配置，如果不做设置，就是使用的SpringBoot默认的格式。

SpringBoot支持多种文件格式的配置文件，以修改SpringBoot默认的端口号为例。

## 三种配置文件

SpringBoot的配置文件的名称都是`application`

### .properties

这种格式的配置文件是非常常见的

```properties
server.port= 80
```



### .yml

写法有些不同

```yaml
server:
  port: 80
```

yml格式的配置文件是有层次结构的，

如果一级一级的缩进，到最后写值时，一定要在**冒号与值之间保留一个空格**。



### .yaml

yaml的格式与yml的格式相同，只不过后缀名不同

`.yml`是`.yaml`的简写

```yaml
server:
  port: 82
```



### 配置文件提示

如果想要配置某一个选项，则可以在配置文件中敲出关键词，然后就会有相关提示。

![image-20230211202648160](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230211202648160.png)

但是如果在 yml、yaml中没有提示的话，这样做

![image-20230211202854904](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230211202854904.png)



### 三种配置文件的优先级

如果这三个配置文件共同存在，而且都配置了同一个选项，那么哪一个生效呢？

```
.properties > .yml > .yaml
```

今后开发中最常用的是yml格式。



## yaml格式

YAML(YAML Ain't Markup Language)，一种数据序列化格式

最开始我们使用的是 `xml` ，格式如下：

```xml
<enterprise>
    <name>itcast</name>
    <age>16</age>
    <tel>4006184000</tel>
</enterprise>
```

而 `properties` 类型的配置文件如下

```properties
enterprise.name=itcast
enterprise.age=16
enterprise.tel=4006184000
```

`yaml` 类型的配置文件内容如下

```yaml
enterprise:
	name: itcast
	age: 16
	tel: 4006184000
```



**优点：**

* 容易阅读

  `yaml` 类型的配置文件比 `xml` 类型的配置文件更容易阅读，结构更加清晰

* 容易与脚本语言交互

* 以数据为核心，重数据轻格式

  `yaml` 更注重数据，而 `xml` 更注重格式

**YAML 文件扩展名：**

* `.yml` (主流)
* `.yaml`

上面两种后缀名都可以，以后使用更多的还是 `yml` 的。



### 语法规则

* **大小写敏感**

* 属性层级关系使用多行描述，每行结尾使用冒号结束

* 使用缩进表示层级关系，同层级左侧对齐，只允许使用空格（不允许使用Tab键）

  空格的个数并不重要，只要保证同层级的左侧对齐即可。

* **属性值前面添加空格（属性名与属性值之间使用冒号+空格作为分隔）**

* **\# 表示注释**

**值与冒号之间有空格**



如果一个属性有多个值，即**数组的形式**，此时可以这样写

```yaml
enterprise:
  name: itcast
  age: 16
  tel: 4006184000
  subject:
    - Java
    - 前端
    - 大数据
```



### yaml配置文件读取数据

我们定义了yaml格式的配置文件，如何将这种格式中的配置信息读取到程序中。

这是我们的配置信息

```yaml
lesson: springboot

person:
  name: zhangsan
  age: 21
  likes:
    - music
    - dance
    - rap
```



#### 第一种：@Value读取配置文件

直接使用`@Value()`获取

层次之间使用`.`来表达，数组的值直接给出索引

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Value("${lesson}")
    private String lesson;

    @Value(("${person.name}"))
    private String name;

    @Value("${person.likes[0]}")
    private String like;
    @GetMapping("/{id}")
    public String getById(@PathVariable Integer id){
        System.out.println(lesson);
        System.out.println(name);
        System.out.println(like);
        
        System.out.println("id ==>" + id);
        return "hello SpringBoot";
    }

}
```



#### 第二种：内置的Environment对象

使用一个SpringBoot中内置的Environment对象来接收。

```java
@RestController
@RequestMapping("/user")
public class UserController {

    // Environment实例代表一个配置文件的实例，使用自动装配的格式
    @Autowired
    private Environment environment;



    @GetMapping("/{id}")
    public String getById(@PathVariable Integer id){
        System.out.println("lesson  " + environment.getProperty("lesson"));
        System.out.println("person.name  " + environment.getProperty("person.name"));
        System.out.println("like[1]  " + environment.getProperty("person.likes[1]"));
        System.out.println("id ==>" + id);
        return "hello SpringBoot";
    }

}
```





#### 第三种：自定义配置文件的Bean

最常用的就是第三种

使用一个自定义的实体类来接收

* 将实体类 `bean` 的创建交给 `Spring` 管理。

  在类上添加 `@Component` 注解

* 使用 `@ConfigurationProperties` 注解表示加载配置文件

  在该注解中也可以使用 `prefix` 属性指定只加载指定前缀的数据

* 在 `BookController` 中进行注入

```java
@Component
@ConfigurationProperties(prefix = "person")
public class Student {

    public Student() {
    }

    private String name;

    private Integer age;

    private String[] likes;

    @Override
    public String toString() {
        return "Student{" +
                "age=" + age +
                ", name='" + name + '\'' +
                ", likes=" + Arrays.toString(likes) +
                '}';
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getLikes() {
        return likes;
    }

    public void setLikes(String[] likes) {
        this.likes = likes;
    }
}
```



有了这个Bean之后，在用到地方注入就好了

```java
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private Student student;

    @GetMapping("/{id}")
    public String getById(@PathVariable Integer id){
        System.out.println(student);
        System.out.println("id ==>" + id);
        return "hello SpringBoot";
    }

}
```

在使用这种方式来进行注入配置信息时，可能会报这样的错误。

![image-20230211211723859](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230211211723859.png)

只需要导入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```





# 多环境开发

SpringBoot的程序在不同的环境中部署

![image-20230212142109054](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230212142109054.png)

如果直接在配置文件中来回修改是繁琐的，所以SpringBoot提供了多环境开发配置，需要切换环境时，只需要修改称为环境的名称即可。



### yaml格式

在yaml格式的配置文件中，使用`---`来分隔不同的配置。

```yaml
# 设置启用的环境
spring:
  profiles:
    active: dev # 使用开发环境的名称

---
# 这是生产环境的配置
spring:
  profiles: pro # 配置的名称
server:
  port: 8080

---

# 这是开发环境的配置
spring:
  profiles: dev
server:
  port: 8081

---
# 这是测试环境的配置
spring:
  profiles: test
server:
  port: 8082
```

使用这个语法来定义一个环境

```yaml
spring:
  profiles: test
```

使用这个语法来选择使用哪一个环境

```yaml
# 设置启用的环境
spring:
  profiles:
    active: dev # 使用开发环境的名称
```

在SpringBoot中，以下的格式已经被弃用了

```yaml
spring:
  profiles: test
```

这是现在推荐的写法

```yaml
spring:
  config:
    activate:
      on-profile: test
```



这样，只需要修改选择启用的环境名称就能在不同环境之间部署。



### .properties格式的设置

使用`.properties`格式的配置文件来设置多环境，虽然这种老的格式已经不推荐使用了，但是了解一下。

一种环境的配置就对应一个`.properties`的配置文件

定义开发环境的配置`application-dev.properties`

```properties
server.port=8080
```

再定义一个测试环境的配置`applicatin-test.properties`

```properties
server.port=8081
```

在主配置文件中指定需要使用的环境配置`application.properties`

```properties
spring.profiles.active=test
```



### 命令行启动参数设置

如果将SpringBoot程序交给其他人，我们都是以jar包的方式。

既然打包后，修改配置文件就不太容易使用了。

此时可以使用命令的方式来指定运行jar包中的某个指定环境。

在打包之前，因为我们的配置文件中可能会用中文注释，所以要先确定一下编码格式。

![image-20230212144028054](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230212144028054.png)

![image-20230212144305901](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230212144305901.png)

如何在命令行切换环境呢？

我们在配置文件中是这样来切换环境的

```yaml
# 设置启用的环境
spring:
  profiles:
    active: pro # 使用开发环境的名称
```

在命令行中是这样的

```
java -jar xxx.jar --spring.profiles.active=envName
```

![image-20230212144804314](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230212144804314.png)



临时修改配置

如果说不想使用配置文件中预定义的配置，想要临时修改某一个选项，也是可以的。

我们在配置文件中如何写的，在命令行中怎么写就可以。

比如说，想要临时修改端口号

在配置文件中是这样写的

```yaml
spring:
  profiles: dev
server:
  port: 8081
```

在命令中这样写`---`后面跟上配置属性就行了

```
java -jar xx.jar -server.port=8888
```

![image-20230212145818840](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230212145818840.png)

同时也是支持选择环境配置的

```
java -jar xxx.jar -server.port=8888 --spring.profiles.active=test
```

这说明命令行参数的配置优先级要高于配置文件中的配置 。

> SpringBoot中参数的优先级
>
> [SpringBoot官网的文档](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config)
>
> ![image-20230212151306129](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230212151306129.png)



### 多环境开发控制

在学习Maven时，也学过Maven中的多环境设置，如果在maven和SpringBoot中都指定了多环境，那么哪一个会生效？

**Maven的环境会生效，因为我们的项目是使用Maven构建的，我们实际运行时是在命令行中运行的jar包**

所以要做到Maven与SpringBoot之间的多环境的统一，在SpringBoot的配置文件中读取Maven的配置信息。

首先我们的Maven的多环境配置中设置

```xml
  <profiles>
        <profile>
            <id>pro</id>
            <properties>
                <project.active>pro</project.active>
            </properties>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
        </profile>
        <profile>
            <id>dev</id>
            <properties>
                <project.active>dev</project.active>
            </properties>
        </profile>
        <profile>
            <id>test</id>
            <properties>
                <project.active>test</project.active>
            </properties>
        </profile>
    </profiles>
```

在Maven中添加一个插件，这个插件的作用是使用Maven配置中的信息干预其他的配置文件

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-resources-plugin</artifactId>
    <version>3.2.0</version>
    <configuration>
        <!--设置编码格式，如果确定两边的配置文件都是UTF-8,那么就不用设置-->
        <encoding>UTF-8</encoding>
        <useDefaultDelimiters>true</useDefaultDelimiters>
    </configuration>
</plugin>
```

在SpringBoot的配置中读取Maven的中的信息就可以了

```yaml
# 设置启用的环境
spring:
  profiles:
    active: ${project.active} # 使用开发环境的名称
```

现在，Maven与SpringBoot的多环境配置就兼容在一起了。



### 配置文件的分类

其实SpringBoot的配置文件分为四种，

![image-20230212154553370](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230212154553370.png)

![image-20230212154845905](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230212154845905.png)

![image-20230212155328212](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230212155328212.png)



我们在IDEA中开发项目时，resources目录下的application.xml属于classpath级别的，是最低的优先级。

一般classpath级别的配置文件会在开发中常用，另外，前两个优先级的配置文件是在项目部署上线时用到的，对项目作出临时的配置或修改。





<font color="red">以下内容尚未整理</font>



# 热部署

## 手动开启热部署

添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
</dependency>
```

以后，每次对代码修改，想要快速重启，重新Build一下即可，或者快捷键`Ctrl + F9`

![image-20230620212250933](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230620212250933.png)



## 关于热部署



- 重启Restart：自定义开发代码，包括类、页面、配置文件等，加载位置restart类加载器
- 重载Reload：jar包，加载位置base加载器 

热部署只会发生Restart，不会发生重载，因为依赖的jar没有变。



## 自动开启热部署

只需要做简单的配置

![image-20230620212837491](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230620212837491.png)

![image-20230620214230995](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230620214230995.png)

**java目录下的文件发生变动，就会触发热部署，当IDEA失去焦点5秒钟后，springboot就会重启**

![image-20230620215315904](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230620215315904.png)





## 热部署范围控制

并不是所有的文件修改后，都要触发热部署，可以设置热部署生效的范围。

默认不参与热部署的目录

- `/META-INF/maven`
- `/META-INF/resources`
- `/resources`
- `/static`
- `/public`
- `/templates`

**修改热部署范围也是可以的，在`application.yml`中进行配置，因为这个热部署是springboot的功能**

![image-20230620215036473](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230620215036473.png)

例如，修改resources目录下不参与热部署的目录

```yaml
spring:
  devtools:
    restart:
      exclude: config/**,public/**,template/**
```





## 关闭热部署

**热部署只在开发环境有效，生产环境是没有意义的（生产环境代码不会随意改动，而且重启的后果很严重）**

```yaml
spring:
  devtools:
    restart:
      exclude: config/**,public/**,template/**
      enabled: false
```











# 第三方Bean属性绑定

## @ConfigurationProperties与@Bean的使用

我们在`application.yml`中自定义的属性，怎么注入到第三方的Bean中？

在配置文件中自定义属性

```yaml
my-datasource:
  url: www.hrbust.com
  driver-class-name: com.liumingkai.jdbc.Driver
  username: 123321
  password: 987654
```

这样注入，这个Bean中有属性与配置文件中定义的属性同名的，就会自动赋值。

```java
@Bean
@ConfigurationProperties(prefix = "my-datasource")
public DruidDataSource druidDataSource() {
    return new DruidDataSource();
}
```

测试一下

```java
        ConfigurableApplicationContext context = SpringApplication.run(SpringbootReplenishApplication.class, args);
        DruidDataSource bean = context.getBean(DruidDataSource.class);
        System.out.println(bean.getDriverClassName());
        System.out.println(bean.getUrl());
        System.out.println(bean.getUsername());
        System.out.println(bean.getPassword());
```

![image-20230620221711551](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230620221711551.png)



## @ConfigurationProperties与@EnableConfiguationProperties

在之前，咱们是如何读取配置文件的？

- 是定义一个Bean（不定义成一个Bean，Spring容器怎么依赖注入？怎么操作这个Bean），

- 然后用`@ConfigurationProperties`注解来指定读取的配置文件前缀，像这样

```java
@Data
@Component
@ConfigurationProperties(prefix = "my-datasource")
public class DataSourceConfigBean {

    private String url;
    private String driverClassName;
    private String username;
    private String password;

}

```

> 使用@ConfigurationProperties不能重复读取配置文件中的属性到不同的Bean中。
>
> 比如我有两个Bean，这两个Bean都使用了@ConfigurationProperties来读取同一个前缀的配置文件中的属性，那么就会报错

**还有一个注解是`@EnableConfigurationProperties`，这个注解的作用是将`@ConfigurationProperties`修饰的类，自动初始化为一个Bean并属性注入**

演示一下，

**此时这个类，就不需要使用`@Component`来标注了，因为`@EnableConfigurationProperties`会将这个类初始化为Bean**

```java
@Data
@ConfigurationProperties(prefix = "my-datasource")
public class DataSourceConfigBean {

    private String url;
    private String driverClassName;
    private String username;
    private String password;

}
```

在配置类上使用`@EnableConfiguationProperties`来将属性注入到指定的类

```java
@SpringBootApplication
@EnableConfigurationProperties({DataSourceConfigBean.class})
public class SpringbootReplenishApplication {


    public static void main(String[] args) {

        ConfigurableApplicationContext context = SpringApplication.run(SpringbootReplenishApplication.class, args);
        DataSourceConfigBean bean = context.getBean(DataSourceConfigBean.class);
        System.out.println(bean);
    }

}
```

测试一下，成功属性注入

![image-20230620223425441](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230620223425441.png)

>  **注意：使用@ConfigurationProperties注入配置属性到Bean中，要保证此Bean的唯一** 
>
> **所以要使用@EnableConfigurationProperties来注入属性到Bean中，那么被@ConfigurationProperties修饰的类，就不要使用@Component来修饰了**
>
> 
>
> 但是@EnableConfigurationProperties真的不常用！还是@ConfigurationProperties方便



## 松散绑定

在使用`@ConfigurationProperties`来注入配置属性时，是支持**松散绑定**的，就是配置文件中属性名与类中的属性名的映射关系是不严格的。

在类中这样定义一个属性`driverClassName`

```java
@Data
@Component
@ConfigurationProperties(prefix = "my-datasource")
public class DataSourceConfigBean {
    private String driverClassName;
}
```

那么在配置文件中定义属性时，可以很多样式，像这样：

```yaml
my-datasource:
  driverClassName: com.liumingkai.jdbc.Driver
  driverclassname: com.liumingkai.jdbc.Driver
  DEIVERCLASSNAME: com.liumingkai.jdbc.Driver
  driver-class-name: com.liumingkai.jdbc.Driver
  driver-Class-name: com.liumingkai.jdbc.Driver
  driver_class_name: com.liumingkai.jdbc.Driver
  driver_CLASS_NAME: sdjfsalkdjf
```

以上这些写法都是可以的，

**在使用@ConfigurationProperties注入属性时**

- 会自动忽略所有的分隔符`_`、`-`
- 忽略大小写

**！！！！！但是使用`@Value`注解来实现属性注入时，是不支持松散绑定的，必须严格书写。**

还有一点需要注意：**属性是支持松散绑定的，但是@ConfigurationProperties的前缀名是不支持松散绑定的，必须遵守规范**

**使用@ConfigurationProperties注解来标注读取的配置文件的前缀时，这个注解中的前缀名的值有一个规范：**

- 名称的开头必须是小写字母
- 多个单词之间的连接是中划线`-`
- 不能有大写字母



例如，这是配置文件

```yaml
my-datasource:
  url: www.hrbust.com
  driver_class_name: com.liumingkai.jdbc.Driver
```

那么在Java代码中指定前缀时，

```java
@ConfigurationProperties(prefix = "my-datasource") // 正确
@ConfigurationProperties(prefix = "1my-datasource") // 错误，不能以数字开头
@ConfigurationProperties(prefix = "myDatasource") // 错误,不能包含大写字母
```



**SpringBoot推荐我们在配置文件中使用`-`中划线来作为单词的分解符，而且推荐使用小写字母**





## 常用计量单位

JDK8提供了常用的计量单位，SpringBoot中定义配置属性时，是支持这些计量单位的。

在配置文件中，定义数值类型时，如果不给出单位，在程序中还需要做转换。

### Duration类

**Duration是JDK8中提供的用来计量时间的单位，默认单位是秒s.。**

在配置文件中定义数值

```yaml
my-server:
  url: www.lmk.com
  timeout: 1000
```

定义Duration类型属性

```java
@Data
@Component
@ConfigurationProperties(prefix = "my-server")
public class ServerConfig {
    private String url;
    private Duration timeout;
}
```

![image-20230620231219515](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230620231219515.png)

当然也可以修改单位，利用`@DurationUnit`注解

```java
@Data
@Component
@ConfigurationProperties(prefix = "my-server")
public class ServerConfig {
    private String url;
    @DurationUnit(ChronoUnit.DAYS)
    private Duration timeout;
}
```



### DataSize

用来进行容量大小的单位，例如byte、Mb、GB

```java
public class ServerConfig {
    private String url;


    @DataSizeUnit(DataUnit.BYTES)
    private DataSize dataSize;
}

```





## Bean属性校验

> Servlet是一个规范，Tomcat实现的
>
> JDBC是一个规范，各个厂商实现的
>
> JSR303也是一个规范，有人提供实现
>
> 我们只需要面向接口编程即可。
>
> *一般来说，以javax开头的groupId，都是规范*

JSR303提供规范，其余框架实现规范。

1. 添加JSR303规范，在SpringBoot中不用给出版本号

```xml
<dependency>
	<groupId>javax.validation</groupId>
	<artifactId>validation-api</artifactId>
</dependency>
```

2. 添加实现技术

```xml
<dependency>
    <groupId>org.hibernate.validator</groupId>
    <artifactId>hibernate-validator</artifactId>
</dependency>
```

在需要校验的Bean上开启校验功能`@Validated`，然后使用JSR303规范中的注解去定义校验规则就好了。

```java
@Data
@Component
@ConfigurationProperties(prefix = "my-server")
@Validated
public class DataSourceConfigBean {
    private String url;

    @Max(value = 5000, message = "最大不能超过5000")
    @Min(value = 500, message = "最小不能低于500")
    private int timeout;
}

```

当属性注入时，就会进行属性校验，测试一下

![image-20230621135056939](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230621135056939.png)



关于常用的校验规则有哪些？可以进入到JSR303注解包`javax.validation.constraints`下查看，这里给出一些常用的。

JSR303中常用的注解有：

| 注解         | 说明                               |
| ------------ | ---------------------------------- |
| @AssertFalse | 断言为false                        |
| @AssertTrue  | 断言为true                         |
| **@Max**     | **整型最大值限制**                 |
| **@Min**     | **整型最小值限制**                 |
| @DecimalMax  | 适用于BigDecimal和String类型的属性 |
| @Null        | 值为null                           |
| **@NotNull** | **不为Null**                       |
| @NotBlank    | 不为空                             |
| @Pattern     | 正则校验                           |
| @Digits      | 是数字                             |
| @Email       | 是邮箱                             |
| @Negative    | 是负数                             |
| @Postiive    | 是正数                             |
| @Future      | 未来的时间                         |
| @Past        | 过去的时间                         |



# 数据层开发

## SpringBoot内置的数据源

SpringBoot内置的三种数据源；

- HikariCP(默认)
- Tomcat提供的DataSource
- Commons DBCP

**在配置数据源信息时，如果不指定数据源类型，则使用默认的HikariCP，这是一个非常轻量的数据源。**

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/db_test
    username: root
    password: root
```

如果要更换或对数据源进行配置，也是可以的

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db_test
    hikari:
      driver-class-name: com.mysql.cj.jdbc.Driver
      username: root
      password: root
```





## JdbcTemplate

Spring中JdbcTemplate就是封装的Jdbc，需要我们手动编写Sql、处理结果集（有了ORM框架之后，谁还用JdbcTemplate）



1. 引入依赖

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
```

2. 在配置文件中，配置数据源信息

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db_test
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: root
```



2. 注入JdbcTemplate直接使用

```java

@Autowired
JdbcTemplate jdbcTemplate;
```



### 常用的方法

JdbcTemplate中，大致就这三个方法：

- **DQL的语句，用`query`开头的方法**
- DML的语句，用`update()`方法
- DDL的语句，使用`execute()`方法

![image-20230621152535029](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230621152535029.png)



### 结果集映射

**关于查询结果集与POJO的映射关系，可以使用`RowMapper`接口来指定映射关系。**

![image-20230621152904120](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230621152904120.png)

```java
// 自定义结果集映射关系
RowMapper<Book> bookRowMapper = new RowMapper<Book>() {
    @Override
    public Book mapRow(ResultSet rs, int rowNum) throws SQLException {
        Book temp = new Book();
        temp.setBId(rs.getInt("id"));
        temp.setBookName(rs.getString("book_name"));
        temp.setAuthor(rs.getString("author"));
        temp.setPrice(rs.getFloat("price"));
        return temp;
    }
};

String sql = "select * from tb_book ";
//        使用RowMapper处理结果集映射问题
List<Book> query = jdbcTemplate.query(sql, bookRowMapper);
```







## SpringBoot内置数据库

SpringBoot提供了3中内嵌数据库：

- H2
- HSQL
- Derby

这些都是非常**轻量级的内存类型的数据库**，都是使用Java语言编写的，所以可以使用Spring容器管理。



例如，我们要使用H2这个内置的数据库

1. 引入依赖

```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```



2. 在配置文件中，还要指定H2的控制台的信息

默认用户名sa，密码123456

```yaml
spring:
  h2:
    console:
      enabled: true
      path: /h2

```

浏览器访问我们配置的路径

![image-20230621154613941](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230621154613941.png)

将配置文件中的数据源信息，修改为这些

![image-20230621154751865](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230621154751865.png)

```yaml
spring:
  datasource:
      url: jdbc:h2:~/test
      driver-class-name: org.h2.Driver
      username: sa
      password: 123456
  h2:
    console:
      enabled: true
      path: /h2
```

然后就可以登录到H2的控制台了

![image-20230621155037085](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230621155037085.png)

![image-20230621155413747](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230621155413747.png)

用的话正常用就好了，（谁用啊！）





# 整合第三方技术



## 整合Junit

#### Spring整合Junit

回顾一下Spring如何整合Junit

1. 首先导入依赖

```xml
<!--        Junit依赖-->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
</dependency>

<!--        Spring整合Junit的依赖-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.2.10.RELEASE</version>
</dependency>
```

2. 指定运行器和Spring容器

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class SpringMyBatisTest {
    
}
```

3. 正常使用就好了

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class SpringMyBatisTest {
    // 注入测试对象
    @AutoWired
    private BookService bookService;
    
    @Test
    public void testAdd(){
        ...
        bookService.save();
        ...
    }
}
```



#### SpringBoot整合Junit



1. 导入依赖(创建SpringBoot项目时默认自带的)

```xml
<!--        SpringBoot单元测试的依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
```

2. 添加`@SpringBootTest`注解

```java
@SpringBootTest
class SpringBootFirstApplicationTests {

    @Autowired
    private BookService bookService;

    @Test
    void contextLoads() {
        bookService.save();
    }

}
```

**添加了`@SpringBootTest`注解后，会自动加载源代码目录下同级目录下的SpringBoot的启动类，如果测试类不位于SpringBoot的同级目录及其子包下，则可以指定SpringBoot的启动类**

```java
@SpringBootTest(classes = SpringBootFirstApplication.class)
class SpringBootFirstApplicationTests {

    @Autowired
    private BookService bookService;

    @Test
    void contextLoads() {
        bookService.save();
    }

}
```

如果测试类位于启动类的同级目录及其子包下，则可以省略这个classes属性。







## 整合SSM

- SpringBoot整合Spring（不需要）
- SpringBoot整合SpringMVC（不需要）
- SpringBoot整合MyBatis(唯一干的事情)

因此SpringBoot整合SSM只需要整合MyBatis就好了。

首先回顾Spring怎样来整合MyBaits的

### Spring整合MyBatis

导入依赖

```xml
<!--Spring操作数据库的依赖-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.2.10.RELEASE</version>
</dependency>
<!--MyBatis的依赖-->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.11</version>
</dependency>
<!--Spring整合MyBatis的依赖-->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>3.0.1</version>
</dependency>
```



1. 定义JDBC配置类

```java
public class JdbcConfig {

    @Value("${jdbc.Driver}")
    private String driver;

    @Value("${jdbc.username}")
    private String username;

    @Value("${jdbc.password}")
    private String password;

    @Value("${jdbc.url}")
    private String url;

    @Bean
    public DataSource getDataSource() {
        DruidDataSource ds = new DruidDataSource();
        ds.setDriverClassName(driver);
        ds.setUrl(url);
        ds.setUsername(username);
        ds.setPassword(password);

        return ds;
    }
}
```



2. 定义MyBatis配置类

```java
public class MyBatisConfig {


    @Bean
    public SqlSessionFactoryBean sqlSessionFactory(DataSource dataSource){
        SqlSessionFactoryBean ssfb = new SqlSessionFactoryBean();

        // 设置类型别名的包
        ssfb.setTypeAliasesPackage("com.pojo");

        // 设置数据源，代替MyBatis中的<environment>标签
        ssfb.setDataSource(dataSource);

        return ssfb;
    }

    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer(){
        
        MapperScannerConfigurer mscf = new MapperScannerConfigurer();
        
        // 设置Mapper接口的扫描位置
        mscf.setBasePackage("com.dao");
        
        return  mscf;
    }

}
```



4. 在Spring的配置类中导入JDBC配置类和MyBatis配置类

```java
@Configuration
@Import({JdbcConfig.class,MyBatisConfig.class})
@PropertySource({"classpath:jdbc.properties"})
@ComponentScan("com")
public class SpringConfig {

}
```



### SpringBoot整合MyBatis

在创建项目时，自动导入相关依赖

![image-20230212164736217](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230212164736217.png)

来看一看这个帮我们导入了哪些依赖

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.3.0</version>
</dependency>
```

查看这个依赖

![image-20230212165159531](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230212165159531.png)

开始整合Mybatis



1. 在配置文件中定义数据库信息

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/mybatis
    username: root
    password: root
```

2. 定义我们的Mapper接口（如果使用自动代理的方式，则需要指定`@Mapper`注解

```java
@Mapper
public interface UserDao {
    @Select("select * from t_user where id = #{id}")
    User getUserById(@Param("id") Integer id);
}
```

3. 正常使用就好了

目前使用的是MyBatis内置的数据源，如果想要更换数据源也是非常简单的。

首先导入Druid的依赖

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.15</version>
</dependency>
```

在配置文件中设置数据源类型

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/mybatis
    username: root
    password: root
    type: com.alibaba.druid.pool.DruidDataSource
```



可以发现，SpringBoot整合MyBatis真的是巨简单。



**总结**

- 在SpringBoot中整合MyBaits，没有设置类型别名，因为SpringBoot会自动加载启动类所在包及其子包下的所有类，并默认设置为别名。
- 如果要使用MyBatis的自动代理的开发方式，只需要在Mapper接口上添加`@Mapper`接口即可。
- 总的来说，SpringBoot整合Mybatis只需要在配置文件中给出数据库信息和数据源就好了。





## 整合Druid

### 不整合

如果不使用SpringBoot整合Druid，也是可以的，需要导入Druid的坐标

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.17</version>
</dependency>
```

`application.yml`配置文件中，指定数据源类型

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db_test
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource

```



### 整合

Druid的依赖并没有被SpringBoot收录，所以我们需要自己到Maven中央仓库中搜索坐标。

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.17</version>
</dependency>
```

引入整合的依赖后，我们就可以在`application.yml`中，书写Druid的配置了。

```yaml
spring:
  datasource:
    druid:
      url: jdbc:mysql://localhost:3306/db_test
      driver: com.mysql.cj.jdbc.Driver
      username: root
      password: root
  
```

**同时对于数据库连接池的配置，Druid中也做出了很多默认设置**





## 整合MyBatisPlus

直接引入MyBatisPlus的starter，无需引入MyBatis的依赖。

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.3</version>
</dependency>
```

对于原先MyBatis的写法，不会产生影响。

如果要对MP做出配置，则在`application.yml`中做出配置即可

```yaml
mybatis-plus:
  global-config:
    banner: false # 关闭Banner图
    db-config:
      id-type: auto
      table-prefix: tb_
```





## 整合Redis





## 整合Quartz





## 整合MongoDB



## 整合ES



## 整合MQ



## 整合Kafka



# 监控





# Bean加载控制







# starter开发







# SpringBoot启动流程









































