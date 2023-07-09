## SpringMVC简介

SpringMVC是隶属于Spring中的内容。

在之前学习JavaWeb时，学习了Servlet技术，这是一个表现层的技术，开发较为繁琐。

**SpringMVC是一种基于Java实现MVC模型的轻量级Web框架**



### MVC模式

![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230122224659169.png)

> 在原始的MVC开发中，前端使用异步的方式向后台发送请求，后端采用MVC的结构，首先是表现层Servlet接收到请求，并交给业务层，在业务层中去调用数据层（原生的JDBC）来实现数据的增删改查，处理完成后，再由表现层Servlet将处理结果以JSON的格式响应给前台，前台渲染出数据展示。

![image-20230122225807400](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230122225807400.png)

现如今主流的SSM框架，使用的是SpringMVC来代替传统的Servlet。

SpringMVC的优点：

- 使用简单、开发便捷(相比于Servlet)
- 灵活性强



## SpringMVC

### 基本流程

1. 导入依赖

```xml
<dependency>
  <groupId>javax.servlet</groupId>
  <artifactId>javax.servlet-api</artifactId>
  <version>3.1.0</version>
  <scope>provided</scope>
</dependency>

<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-webmvc</artifactId>
  <version>5.2.10.RELEASE</version>
</dependency>
```

只需要导入spring-webmvc这一个Spring选项，因为此依赖会依赖Spring的基础依赖，会自动导入

![image-20230124005546502](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230124005546502.png)

2. 创建SpringMVC控制器类（作用等同于Servlet）

```java
@Controller
public class FirstController {

    @RequestMapping("/save")
    @ResponseBody
    public String save() {
        System.out.println("user save...");
        return "{'info':'springmvc'}";
    }

}
```



3. 初始化SpringMVC环境

```java
@Configuration
@ComponentScan("com")
public class SpringConfig {
}
```



4. 初始化Servlet容器，加载SpringMVC环境，并设置SpringMVC技术处理请求

```java
public class ServletContainersInitConfig extends AbstractDispatcherServletInitializer {
    @Override
    protected WebApplicationContext createServletApplicationContext() {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.register(SpringConfig.class);
        return context;
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    @Override
    protected WebApplicationContext createRootApplicationContext() {
        return null;
    }
}
```



tomcat-maven的插件

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.tomcat.maven</groupId>
            <artifactId>tomcat7-maven-plugin</artifactId>
            <version>2.1</version>
            <configuration>
                <port>8888</port>
                <path>/springmvc</path>
            </configuration>
        </plugin>
    </plugins>
</build>
```



5. 启动看效果

![image-20230125214607021](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125214607021.png)



### 流程分析

这是整个Web容器的结构

![image-20230125220618599](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125220618599.png)

#### 初始化过程

1. 服务器启动，服务器根据我们写的Servlet容器，来初始化Web容器，就是我们继承了`AbstractDispatcherServletInitializer`的类

   ![image-20230125215742986](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125215742986.png)

2. 执行该类中的`createServletApplicationContext()`方法来创建`WebApplication`对象

   ![image-20230125215804137](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125215804137.png)

   在该方法中会去创建我们的SpringMVC的容器对象

3. 加载SpringMVC配置，初始化SpringMVC的容器，加载Bean

   ![image-20230125220000341](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125220000341.png)

4. 执行Web容器中的`getServletMappings()`方法，设定SpringMVC拦截请求路径的规则

   ![image-20230125220147994](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125220147994.png)



#### 单次请求处理过程

1. 访问我们配置好的`http://localhost:8888/save`路径
2. Web容器拦截到，发现满足SpringMVC拦截规则，交给SpringMVC处理
3. SpringMVC解析请求路径
4. 根据`/save`匹配到`save()`方法，执行`save()`方法
5. 检测到有`@ResponseBody()`直接将`save()`方法的返回值作为响应体返回给请求方



### Bean加载控制

在实际开发中，不同的Bean应该交给不同的容器来管理。

SpringMVC应当只负责表现层Bean的控制，即使用`@Controller`注解的类。

Spring应当负责业务层(service)、数据层(Dao层)Bean 的加载。



实现这种功能有三种方式

1. 在Spring的配置类中使用更详细的包扫描路径，将controller的包排除在外

![image-20230125222304277](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125222304277.png)



2. 在Spring的配置类中,使用`@ComponetScan`中的`excludeFilters`属性来配置过滤规则。

配置过滤规则

![image-20230125222910455](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125222910455.png)

在FilterType中，有多种不同类型的过滤规则

![image-20230125223153382](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125223153382.png)



3. 不区分Spring与SpringMVC的环境，加载到同一个环境中[了解即可]



### 简化开发Web容器

我们的Web容器是继承的`AbstractDispatcherServletInitializer`类。

![image-20230125230304026](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125230304026.png)

还有一个更加简单的类`AbstractAnnotationConfigDispatcherServletInitializer`，这个类是`AbstractDispatcherServletInitializer`的子类，我们直接继承这个类

![image-20230125230813800](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125230813800.png)





### Postman工具的使用

Postman是一款功能强大的网页调试与发送网页HTTP请求的Chrome插件，**常用来进行接口测试**

一般来说，我们要测试后端的接口，如果是GET请求还好，可以在浏览器地址栏中直接输入，但是如果要测试POST请求，则需要我们手写一个表单；如果说是异步请求，还需要我们书写JS代码。

现在利用Postman这个工具，各种冗余的事情不需要我们负责了，我们只需要写入后台地址就行。



创建工作空间

![image-20230125225130620](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125225130620.png)

进入到工作空间之后，就可以创建请求了

![image-20230125225319298](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125225319298.png)

![image-20230125225417032](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125225417032.png)

![image-20230125225440448](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125225440448.png)

还可以将一个请求保存到集合中

![image-20230125225552832](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125225552832.png)

![image-20230125225624932](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125225624932.png)



所有的测试记录也都会保存在自己的账户中。



### 请求

#### 请求路径映射

在我们的Controller类中，使用`@RequestMapping`注解来设置方法的访问路径。

![image-20230125231650375](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125231650375.png)

为了防止不同模块的路径冲突，应当在方法的路径名中以模块名作为前缀。

但是如果要为每一方法都要设置前缀名，非常繁琐，此时可以继续使用`@RequestMapping`在该类上指定该类的前缀，在方法上只需要给出方法路径即可。访问时需要通过 前缀+方法路径 才能访问到。

![image-20230125232109841](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125232109841.png)



#### 请求参数处理

利用GET和POST如何来处理请求参数？



##### 接收GET请求参数

只需要在Controller的方法中，给定形参即可，**在访问时需要保证访问的参数名与形参名保持一致，否则无法匹配上。**

![image-20230125233656832](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125233656832.png)

访问

![image-20230125233741577](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125233741577.png)

![image-20230125233813672](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125233813672.png)



##### 接收POST请求

对于SpringMVC来说，我们写的方法是不区分GET与POST请求的，所以后端的代码不需要变动。

注意：因为是POST请求，参数要写在请求体中。

![image-20230125234012213](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125234012213.png)



##### 参数别名

在设置访问参数时，如果方法的形参名与URL中的参数名不一致，是不会匹配到的，此时就拿不到数据。

此时可以使用`@RequestParam`注解来设置请求的参数名，类似于MyBatis中的`@Param`

![image-20230125235421062](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125235421062.png)





##### 处理POST乱码

在提交的表单中，一般都会有中文，那就避免不了乱码问题。

在之前使用Servlet开发时，我们就使用一个Filter过滤器来处理字符编码。

在SpringMVC中，也有一个设置过滤器的方法，这个方法就在我们的Web配置类中。

在Web容器中有两个可以设置过滤器的方法`registerServletFilter()`和`getServletFilters()`方法，我们使用更简洁的`getServletFilters()`方法

![image-20230125234558534](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125234558534.png)

我们定义的过滤器也是SpringMVC中提供的，同时还有更多不同功能的过滤器。



#### 不同类型的参数

- 普通参数
- POJO类型参数
- 嵌套POJO类型参数
- 数组类型参数
- 集合类型参数

##### 普通参数

普通参数我们直接写在方法的形参中，并使用`@RequestParam`注解来标注请求参数名称

![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230125235421062.png)



##### POJO类型参数

一般来说，我们接收到参数，一般都会组合成一个POJO对象来交个其他功能或模块。

此时可以直接指定参数类型是一个POJO类型。

这是我们的实体类

```java
public class User {
    private String username;
    private String age;
    ...
}
```

方法中直接给出POJO类型的形参即可。

![image-20230126002149920](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126002149920.png)

**SpringMVC会自动根据请求参数名与实体类的属性名去自动匹配封装**

**需要保证请求参数名与实体类的属性名保持一致**



##### 嵌套POJO类型参数

就是我们的实体类中的属性是一个引用类型，此时如何给这个引用类型赋值？

这是引用类型

```java
public class Adress {
    private String name;
    private String id;
    ...
}
```

这是我们的实体类

```java
public class User {
    private String username;
    private String age;
    private Adress adress;
    ...
}
```

此时我们的方法参数不变，仍然这样写

![image-20230126002149920](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126002149920.png)

但是我们的请求路径中的参数就需要根据实体类的引用类型属性中的属性名保持一致

![image-20230126003055561](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126003055561.png)

##### 数组类型参数

如果多个参数名都是同名的，此时可以使用数组来接收。

**需要保证请求参数名与形参数组名保持一致**

![image-20230126003645085](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126003645085.png)

![image-20230126003709321](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126003709321.png)



##### 集合类型的参数

在开发中更多地是使用集合，集合比数组更常用。

此时在方法中这样来定义参数就不对了

![image-20230126004325217](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126004325217.png)

此时SpringMVC会将List作为一个普通的引用类型，去实例化这个应用类型，然后通过setter将请求参数设置到属性上。

但是，我们使用的是集合，我们想要请求参数作为其中的数据，而不是属性。

此时只需要使用`@RequestParam`来声明一下即可，此时就会将List作为一个普通的参数，根据参数名与形参名作为匹配。

![image-20230126004616792](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126004616792.png)





#### JSON类型参数

在前后端的交互中，更多使用的是JSON格式的数据。

对于JSON数据类型，我们常见的有三种:

- json普通数组（["value1","value2","value3",...]）
- json对象（{key1:value1,key2:value2,...}）
- json对象数组（[{key1:value1,...},{key2:value2,...}]）





那么后端如何来接收前端传过来的JSON数据？

1. 导入依赖，需要将JSON数据转换为Java中数据类型。SpringMVC默认使用的是jackson来处理json的转换。

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.0</version>
</dependency>
```

2. **在SpringMVC 的配置类中使用`@EnableWebMvc`注解来开启，这个注解中就包括了开启JSON转对象的功能。**

```java
@Configuration
@ComponentScan("com.controller")
@EnableWebMvc
public class SpringMVCConfig {
}
```

3. 在方法参数前时候`@RequestBody`注解，此注解的意思是将请求体中的数据转换为实参。因为JSON的数据只能放在请求体中。

4. 在Postman中发送JSON数据

![image-20230126173254831](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126173254831.png)



##### 普通的json数组

这样的JSON数据

![image-20230126173526738](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126173526738.png)

我们的方法使用一个集合来接收这个JSON数组即可，SpringMVC会自动将JSON数组转换为集合。

![image-20230126173623035](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126173623035.png)



##### JSON对象数据

形式这样的JSON数据

![image-20230126174039076](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126174039076.png)

我们在方法中使用一个实体类型的形参接收即可

![image-20230126174113417](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126174113417.png)

**注意：要保持JSON中的key与实体类的属性名一致，否则无法映射成功**

如果我们的实体类中还有引用类型，则JSON中直接使用嵌套即可

![image-20230126174354742](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126174354742.png)

![image-20230126174328709](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126174328709.png)





##### JSON对象数组

类似这样的JSON格式

```json
[
    {
        "username":"zhangsan",
        "age":18
    },
    {
        "username":"lisi",
        "age":28
    },
    {
        "username":"wangwu",
        "age":23
    }
]
```

此时接口方法，直接使用**集合+实体类**来接收

![image-20230126194120297](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126194120297.png)

SpringMVC会将JSON数组中的每一个元素转换为一个实体对象，将整个JSON数组转换为集合。

注意：**接收JSON数据时，一定要使用`@RequestBody`注解来标注形参，因为JSON是要放在请求体中的**



##### @RequestParam和@RequestBody

* 区别
  * @RequestParam用于接收url地址传参，表单传参【application/x-www-form-urlencoded】
  * @RequestBody用于接收json数据【application/json】

* 应用
  * 后期开发中，发送json格式数据为主，@RequestBody应用较广
  * 如果发送非json格式数据，选用@RequestParam接收请求参数









#### 日期类型参数

对于日期类型的参数，应该如何接收？

日期类型比较特殊：

- 2022-01-26
- 01/26/2023
- 2023-01-26 19:59:37
- ......

SpringMVC默认会转换以`/`为分隔符的日期字符串，但是其他格式的日期字符串就无法自动转换了，需要我们手动设定。

使用`@MM/dd/yyyy`注解来指定日期的格式，SpringMVC会将日期字符串解析为Date的日期对象。

![image-20230126201710143](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126201710143.png)

![image-20230126201724802](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126201724802.png)





#### SpringMVC是如何实现日期格式转换的

在Spring中有一个Converter接口，该接口中有一个`convert()`方法，同时Spring中也有该接口的各种实现类，实现不同格式之间的转换。

这是所有类型转换器的根接口

```java

package org.springframework.core.convert.converter;

import org.springframework.lang.Nullable;

@FunctionalInterface
public interface Converter<S, T> {
    @Nullable
    T convert(S var1);
}

```

可以看到很多此接口的实现类

![image-20230420231417310](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230420231417310.png)







### Http报文消息JSON的转换

对于Http报文消息，

- 如果转换为Java中的pojo
- java中的pojo如何转换为http报文消息

有一个重要的接口`HttpMessageConverter`接口，这个接口是Http报文消息转换的根接口

我们在JSON格式转换时会了解此类，

此接口的最重要的两个作用：

1、将服务端返回的对象序列化为JSON字符串。
2、将前端传来的JSON字符串反序列化为Java对象。

**所有的JSON生成都离不开相关的HttpMessageConverter接口**

SpringMVC自动配置了Jackson的JSON转换器，所以我们只需要导入Jackson的依赖，无需额外配置。

SpringMVC就会自动使用Jackson中的Json转换器：

- **当请求体是JSON格式，就会自动解析JSON封装到接口参数实体类中**
- **当接口返回值类型是POJO 类型，就会自动将java对象转换为JSON字符串**





#### Jackson

SpringMVC默认的JSON消息转换器是MappingJackson2HttpMessageConverter类，该类实现了我们上述的HttpMessageConverter接口。

该类是Spring提供的，但是该类需要依赖于Jackson，所以需要导入jackson的依赖

类图

![image-20230420232715063](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230420232715063.png)

看此类的源码

```java
package org.springframework.http.converter.json;
// 导入jackson的依赖
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.io.IOException;
import org.springframework.http.MediaType;
import org.springframework.lang.Nullable;

public class MappingJackson2HttpMessageConverter extends AbstractJackson2HttpMessageConverter {
    @Nullable
    private String jsonPrefix;

    public MappingJackson2HttpMessageConverter() {
        this(Jackson2ObjectMapperBuilder.json().build());
    }

    public MappingJackson2HttpMessageConverter(ObjectMapper objectMapper) {
        super(objectMapper, new MediaType[]{MediaType.APPLICATION_JSON, new MediaType("application", "*+json")});
    }

    public void setJsonPrefix(String jsonPrefix) {
        this.jsonPrefix = jsonPrefix;
    }

    public void setPrefixJson(boolean prefixJson) {
        this.jsonPrefix = prefixJson ? ")]}', " : null;
    }

    protected void writePrefix(JsonGenerator generator, Object object) throws IOException {
        if (this.jsonPrefix != null) {
            generator.writeRaw(this.jsonPrefix);
        }

    }
}

```



#### fastJSON

如果想要替换掉SpringMVC默认的JSON转换器，例如替换成FastJSON的序列化器，需要找到FastJSON中实现了HttpMessageConverter接口的实现类，然后在SpringMVC的配置中注入该实现类即可。





### 响应

处理完成之后，将响应结果返回给客户。

对于响应，主要是响应两种形式的结果

- 响应页面（我们之前在学习Serlvet时就这样使用的）
- 响应数据
  - 文本数据
  - JSON数据



#### 响应页面

只需要将页面的路径名返回就好了

![image-20230126232337415](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126232337415.png)





#### 响应一个文本

将这个文本作为内容直接返回到页面上显示

![image-20230126232614008](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126232614008.png)



#### 响应JSON数据

响应JSON格式的数据非常简单，只需要将要返回的内容直接返回，SpringMVC就会自动转换为JSON发送给（导入jackson依赖）前端。

还需要使用`@ResponseBody`注解，如果不使用这个注解，SpringMVC就会将响应结果作为新的请求路径继续访问。

设置了`@ResponseBody`注解之后，就会将return结果作为响应体返回。

![image-20230126233934759](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126233934759.png)

##### 响应POJO对象

![image-20230126233430340](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126233430340.png)

![image-20230126233416430](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126233416430.png)





#### 响应POJO集合

同样，将集合返回。

![image-20230126233713142](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126233713142.png)

![image-20230126233642580](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230126233642580.png)



##### 如何实现JSON数据与对象转换

在Spring中，有这样一个接口

*  HttpMessageConverter接口

我们导入的Jackson的依赖，因为Jackson实现了这个接口。





## REST风格

### 简介

REST（Representational State Transfer），表现形式状态转换,它是一种软件架构==风格==

当我们想表示一个网络资源的时候，可以使用两种方式:

* 传统风格资源描述形式
  * `http://localhost/user/getById?id=1` 查询id为1的用户信息
  * `http://localhost/user/saveUser` 保存用户信息
* REST风格描述形式
  * `http://localhost/user/1` 
  * `http://localhost/user`

传统方式一般是一个请求url对应一种操作，这样做不仅麻烦，也不安全，因为会程序的人读取了你的请求url地址，就大概知道该url实现的是一个什么样的操作。

查看REST风格的描述，你会发现请求地址变的简单了，并且光看请求URL并不是很能猜出来该URL的具体功能

所以REST的优点有:

- **隐藏资源的访问行为，无法通过地址得知对资源是何种操作**
- **书写简化**



### 动作

那么如何能够根据相同的URL来区分不同的操作呢？

**根据动作来区分**，在学习HTTP时，知道常用的提交方式不止GET、POST，还有PUT、Delete等。

* `http://localhost/users`	查询全部用户信息 **GET（查询）**
* `http://localhost/users/1`  查询指定用户信息 **GET（查询）**
* `http://localhost/users`    添加用户信息    **POST（新增/保存）**
* `http://localhost/users`    修改用户信息    **PUT（修改/更新）**
* `http://localhost/users/1`  删除用户信息    **DELETE（删除）**



**REST是一种发开的风格，并不是一种规范，规范是强制遵守的、不能随意的，而风格当然是可以打破、随意的**

**使用REST风格来进行开发就叫做RESTful**



### 基本流程

1. 在`@RequestMapping`中指定请求的特定动作

**在`@RequestMapping`注解中有一个属性是`method`，这个属性的值是一个数组**，用此属性来指定该路径的请求方式

![image-20230129154830830](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230129154830830.png)

2. 在请求路径中设置占位符，来替代请求路径中的请求参数，使用`{}`，不是`${}`

![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230129160211899.png)

3. 在形参中使用`@PathVariable`来标注请求参数来自请求路径

**需要保证映射路径中的占位符名称与方法的形参名保持一致**

![image-20230129160259690](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230129160259690.png)

至此，一个Restful的开发就完成了，测试一下。

![image-20230129160343382](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230129160343382.png)





### Rest快速开发

1. 路径简写

在整个类前使用`@RequestMapping`注解来指明这个模块的前缀，类中的方法就可以简写路径

```java
@Controller
@RequestMapping("/user")
public class UserController {

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    @ResponseBody
    public String getUser(@PathVariable Integer id ){
        System.out.println("id：" + id);
        return  "{'获取User成功'}";
    }


    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public String getAllUser(){
        return "get all user successfully";
    }


    @RequestMapping(method = RequestMethod.PUT)
    @ResponseBody
    public String addUser(@RequestBody User user){
        System.out.println(user);
        return "add user successfully";
    }


    @RequestMapping(value = "/users/{id}",method = RequestMethod.DELETE)
    @ResponseBody
    public String deleteUser(@PathVariable Integer id){
        System.out.println("id" + id);
        return "delete user successfully";
    }


}
```



2. `@ResponseBody`的简化

在每个方法中都有一个`@ResponseBody`的注解，重复性太高，也可以直接在类前使用`@ResponseBody`的使用，类中的方法就可以省略此注解。

![image-20230129163809891](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230129163809891.png)



3. 表现层的Bean需要交给SpringMVC处理，我们利用了Restful开发后，SpringMVC中也有一个针对Restful开发的注解。

**`@RestController`注解，用来代替`@Controller`和`@ResoponseBody`两个注解。**

![image-20230129165133824](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230129165133824.png)



4. 请求方式简化

在每一个方法都使用`@ResquestMapping`中的`method`方法来设置请求的方式，较为繁琐。

在SpringMVC中针对每种不同的请求方式，分别不同路径映射注解。

- POST的提交方式，用`@PostMapping`注解
- GET的提交方式，用`@GetMapping`注解
- PUT的方式，用`@PutMapping`注解
- DELTETE的方式，用`@DeleteMapping`注解

使用了这些注解后，就无须使用`@RequestMapping`中的`method`属性来指定请求方式了。

使用这些注解的`value`属性给出映射路径即可。

![image-20230129165556899](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230129165556899.png)









## SSM整合

 将Spring 、SpringMVC、MyBatis整合到一起工作。



### 0. 项目结构

![image-20230130225041859](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230130225041859.png)

#### 导入依赖
```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.itheima</groupId>
  <artifactId>springmvc_08_ssm</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>war</packaging>

  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>5.2.10.RELEASE</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>5.2.10.RELEASE</version>
    </dependency>
    
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-test</artifactId>
      <version>5.2.10.RELEASE</version>
    </dependency>
    
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.5.6</version>
    </dependency>
    
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>1.3.0</version>
    </dependency>
    
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>5.1.47</version>
    </dependency>
    
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.1.16</version>
    </dependency>
    
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>
    
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>
    
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.9.0</version>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
        <version>2.1</version>
        <configuration>
          <port>80</port>
          <path>/</path>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>

```





### 1. Mybatis配置

1. 创建JDBC.properties

```properties
jdbc.driver= com.mysql.cj.jdbc.Driver
jdbc.url= jdbc:mysql://localhost:3306/mybatis
jdbc.username= root
jdbc.password= root
```

2. 创建Jdbc配置类，主要是设置数据源和事务管理器

```java
public class JdbcConfig {

    @Value("${jdbc.driver}")
    private String driver;

    @Value("${jdbc.url}")
    private String url;

    @Value("${jdbc.username}")
    private String username;

    @Value("${jdbc.password}")
    private String password;

    @Bean
    public DataSource getDataSource() {
        DruidDataSource ds = new DruidDataSource();
        ds.setDriverClassName(driver);
        ds.setUrl(url);
        ds.setUsername(username);
        ds.setPassword(password);
        return ds;
    }


    @Bean
    public PlatformTransactionManager platformTransactionManager(DataSource dataSource){
        PlatformTransactionManager dataSourceTransactionManager = null;
        dataSourceTransactionManager = new DataSourceTransactionManager(dataSource);
        return dataSourceTransactionManager;
    }
}
```

3. 创建Mybatis的配置类，用来创建SqlSessionFactory，并设置Mapper接口扫描路径

```java
public class MyBatisConfig {

    /**
     * MyBatis中的h核心实例，返回SqlSessionFactory实例
     * 并设置类型别名
     * @param dataSource 数据源，JdbcConfig类中会创建
     * @return SqlSessionFactoryBean Spring中针对工厂的一个特殊实例
     */
    @Bean
    public SqlSessionFactoryBean sqlSessionFactoryBean(DataSource dataSource){
        SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
        sqlSessionFactory.setDataSource(dataSource);
        sqlSessionFactory.setTypeAliasesPackage("com.domain");
        return sqlSessionFactory;
    }

    /**
     * 设置Mapper接口扫描路径
     * @return MapperScannerConfigurer 实例
     */
    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer(){
        MapperScannerConfigurer msc = new MapperScannerConfigurer();
        msc.setBasePackage("com.dao");
        return msc;
    }
}
```

至此MyBatis的配置基本完成



### 2. Spring的配置



1. 创建Spring的配置类

设置Bean扫描路径，注意不要将controller包扫描进去。 

导入jdbc配置文件，导入jdbc和MyBatis的配置类

```java
@Configuration
@ComponentScan({"com.dao","com.domain","com.service"})
@PropertySource({"classpath:jdbc.properties"})
@Import({JdbcConfig.class,MyBatisConfig.class})
@EnableTransactionManagement
public class SpringConfig {

}
```





### 3. SpringMVC配置

1. 创建Web容器

此处继承`AbstractDispatcherServletInitializer`类与`AbstractAnnotationConfigDispatcherServletInitializer`都是可以的，这里继承的是后者。

在此SpringMVC的web容器中，需要加载Spring、SpringMVC的配置类，并设置SpringMVC的拦截路径，同时还可以设置Web容器过滤器的编码格式。

```java
public class WebContainer extends AbstractAnnotationConfigDispatcherServletInitializer {

    /**
     * 加载Spring配置类
     * @return
     */
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{SpringConfig.class};
    }

    /**
     * 加载SpringMVC的配置类
     * @return
     */
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{SpringMVCConfig.class};
    }

    /**
     * 配置SpringMVC的拦截路径
     * @return
     */
    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }


    /**
     * 设置编码格式，防止Post请求内容乱码
     * @return
     */
    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
        encodingFilter.setEncoding("UTF-8");
        return new Filter[]{encodingFilter};
    }
}
```





2. SpringMVC配置类

扫描controller包

```java
@Configuration
@ComponentScan("com.controller")
@EnableWebMvc
public class SpringMVCConfig {

}
```

至此SpingMVC的配置完成。







### 业务代码

1. 实体类，放在domain包下
```java
public class User {
    private Integer id;
    private String username;
    private String password;
    private String age;
    private String sex;
    private String email;

    public User() {
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", age='" + age + '\'' +
                ", sex='" + sex + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
```

2. Mapper接口，创建Mapper接口，此处使用MyBatis注解开发

```java
@Transactional
public interface UserMapper {
    /**
     * 获取全部用户
     * @return List<User>的集合
     */
    @Select("select * from t_user")
    List<User> getAll();

    /**
     * 根据Id插叙用户
     * @param id Integer
     * @return User类型用户
     */
    @Select("select * from t_user where id = #{id}")
    User getUserById(@Param("id") Integer id);

    /**
     * 添加用户
     * @param user User类型的实体类
     * @return Integer 数据库操作受影响的行数
     */
    @Insert("insert into t_user values(null,${username},${password},${age},${sex},${email})")
    Integer addUser(User user);

    /**
     * 根据Id删除用户
     * @return Integer 操作对数据库影响的行数
     */
    @Delete("delete from t_user where id = #{id}")
    Integer deleteById(@Param("id") Integer id);
}
```

3. Service层

接口

```java
public interface UserService {

    /**
     * 业务层 获取所有用户，调用数据层方法
     * @return List<User>集合类型题
     */
    List<User> getAll();

    /**
     * 根据ID查询用户
     * @param id 用户ID
     * @return User实体类
     */
    User getUserById(Integer id);

    /**
     * 业务层方法， 添加一个用户，返回false添加失败， 返回true添加失败
     * @param user User实例
     * @return false| true
     */
    boolean addUser(User user);

    /**
     * 根据ID返回删除用户， true成功删除， false删除失败
     * @param id Integer类型
     * @return true | false
     */
    boolean deleteById(Integer id);

    /**
     * 修改用户
     * @param user 封装完成的User类型的实例
     * @return true|false
     */
    boolean updateUser(User user);
}
```

实现类

```java
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper dao;

    /**
     * 业务层 获取所有用户，调用数据层方法
     * @return List<User>集合类型题
     */
    @Override
    public List<User> getAll(){
        List<User> all = null;
        all = dao.getAll();
        return all;
    }

    /**
     * 根据ID查询用户
     * @param id 用户ID
     * @return User实体类
     */
    @Override
    public User getUserById(Integer id){
        User user = null;
        user = dao.getUserById(id);
        return user;
    }

    /**
     * 业务层方法， 添加一个用户，返回false添加失败， 返回true添加失败
     * @param user User实例
     * @return false| true
     */
    @Override
    public boolean addUser(User user){
        Integer lines = dao.addUser(user);
        return lines > 0;
    }

    /**
     * 根据ID返回删除用户， true成功删除， false删除失败
     * @param id Integer类型
     * @return true | false
     */
    @Override
    public boolean deleteById(Integer id){
        Integer lines = dao.deleteById(id);
        return lines > 0;
    }

    /**
     * 修改用户信息
     * @param user 封装完成的实体类 User 类型
     * @return true | false
     */
    @Override
    public boolean updateUser(User user) {
        Integer lines = dao.updateUser(user);
        return lines > 0;
    }

}
```

4. Controller层

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public List<User> getAll() {
        List<User> all = service.getAll();
        return all;
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {
        User user = service.getUserById(id);
        return user;
    }

    @PostMapping
    public boolean addUser(@RequestBody User user) {
        return service.addUser(user);
    }

    @DeleteMapping("/{id}")
    public boolean deleteUserById(@PathVariable Integer id) {
        return service.deleteById(id);
    }

    @PutMapping
    public boolean updateUser(@RequestBody User user) {
        return service.updateUser(user);
    }
}
```



接口测试，全部成功。 



### 前后端数据规范

在前面的演示中，根据不同的功能，返回的JSON格式也是不一样的。

![image-20230131220238019](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230131220238019.png)

但是这些响应的JSON的数据并不是统一格式，而且响应结果没有辨识度，不能区分是哪一个功能的响应结果，也不知道响应结果的成功与否，也没有响应结果的描述信息。 

前端在接收到后 ，修改根据不同的功能来接收不同的格式的结果并渲染。 

为了简化前后端联调，使得前后端数据更规范。前后端应该协调传输数据的统一规范。

一般这样来定义传输的内容。

1. 将响应的数据内容单独放到JSON对象的属性中
2. 在JSON对象中有对响应结果的状态区分，一般使用自定义的状态码
3. 在JSON对象中要有对响应结果的描述信息



在后端中，专门定义一个类来实现对响应结果的封装。



首先来定义一个保存响应结果状态码的类

规定`10`是用户模块，`01`是查询功能，`00`是查询失败，`01`是查询成功。

则`100101`则表示用户模块查询功能成功。

```java
public class Code {

    // 执行成功的状态码
    public static final Integer GET_OK = 100101;
    public static final Integer UPDATE_OK = 100201;
    public static final Integer DELETE_OK = 100301;
    public static final Integer SAVE_OK = 100401;
    
    // 执行失败的状态码
    public static final Integer GET_ERROR = 100100;
    public static final Integer UPDATE_ERROR = 100200;
    public static final Integer DELETE_ERROR = 100300;
    public static final Integer SAVE_ERROR = 100400;
    
}
```

响应结果的封装类

```java
public class Result {

    private Integer statusCode;
    private String msg;
    private Object data;

    public Result() {
    }

    public Result(Integer statusCode, String msg) {
        this.statusCode = statusCode;
        this.msg = msg;
    }

    public Result(Integer statusCode, String msg, Object data) {
        this.statusCode = statusCode;
        this.msg = msg;
        this.data = data;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
```



对应的Controller这样来写

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public Result getAll() {
        List<User> all = service.getAll();
        Integer statusCode = all == null ? Code.GET_OK : Code.GET_ERROR;
        String msg = all != null ? "查询成功" : "查询失败";
        return new Result(statusCode, msg, all);
    }

    @GetMapping("/{id}")
    public Result getUserById(@PathVariable Integer id) {
        User user = service.getUserById(id);
        Integer statusCode = user == null ? Code.GET_OK : Code.GET_ERROR;
        String msg = user != null ? "查询成功" : "查询失败";
        return new Result(statusCode, msg, user);
    }

    @PostMapping
    public Result addUser(@RequestBody User user) {

        boolean flag = service.addUser(user);
        Integer statusCode = flag ? Code.SAVE_OK : Code.SAVE_ERROR;
        String msg = flag ? "新增成功" : "添加失败";
        Result result = new Result(statusCode, msg);
        return result;
    }

    @DeleteMapping("/{id}")
    public Result deleteUserById(@PathVariable Integer id) {
        boolean flag = service.deleteById(id);
        Integer statusCode = flag ? Code.DELETE_OK : Code.DELETE_ERROR;
        String msg = flag ? "删除成功" : "删除失败";
        Result result = new Result(statusCode, msg);
        return result;
    }

    @PutMapping
    public Result updateUser(@RequestBody User user) {
        boolean flag = service.updateUser(user);
        Integer statusCode = flag ? Code.UPDATE_OK : Code.UPDATE_ERROR;
        String msg = flag ? "修改成功" : "修改失败";
        return new Result(statusCode, msg);
    }
}
```

此时前端收到的数据就会有一个统一的格式

![image-20230131223141501](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230131223141501.png)



### 异常处理器

#### 分析

各个模块、各个层级都会有异常发生，如果异常发生了，则响应结果不会成功响应给前端，前端可能也会根据报错。

因此，要对系统中的异常进行处理，对异常形成统一的管理，避免对前端的影响。 

- 框架内部抛出的异常：因使用不合规导致
- 数据层抛出的异常：因外部服务器故障导致（例如：服务器访问超时）
- 业务层抛出的异常：因业务逻辑书写错误导致（例如：遍历业务书写操作，导致索引异常等）
- 表现层抛出的异常：因数据收集、校验等规则导致（例如：不匹配的数据类型间导致异常）
- 工具类抛出的异常：因工具类书写不严谨不够健壮导致（例如：必要释放的连接长期未释放等）

**思考**：

1. 每一层都会出现错误，那么异常处理应该写在哪一层中？

   ***所有异常都抛到表现层处理***

2. 异常的种类有很多？每种异常应该怎样处理？

   ***异常分类***

3. 如何来进行异常处理？

   如果要在表现层的代码中直接进行异常处理，则代码量是巨大的，将占到整个表现层的一半，且维护性差。

   **应该利用AOP的思想**

在SpringMVC中已经提供了一套异常处理的方案，也是基于AOP的思想的实现。

**分析**：有哪些异常？如何对异常进行分类？

- 业务异常
  - 规范的用户行为产生的（数据格式填写错误）
  - 不规范的用户行为（故意的）
- 系统异常
  - 服务器故障
  - 数据库故障
- 其他异常
  - 开发人员未预料到的异常
  - 开发人员的疏忽导致的

我们将异常大致分为了三种，那么对于每种应该如何处理？

- 业务异常
  - 发送消息提醒用户规范操作
- 系统异常
  - 发送消息给用户，安抚用户
    - 系统繁忙，请稍后再试
    - 系统正在维护升级，请稍后再试
    - 系统出问题，请联系系统管理员等
  - 发送消息给运维人员，提醒维护
    - 可以通过邮件、短信等方式提醒
  - 记录日志
    - 将异常信息记录下来，方便后期维护
- 其他异常
  - 发送消息给用户，安抚用户
  - 发送消息给编程人员，提醒维护
  - 记录日志



### 实现

##### 自定义异常类

大致分为了三类异常，我们在系统中自定义三种异常类。

1. 业务异常

```java
public class BusinessException extends  RuntimeException{

    // 异常编号，对异常种类进行区分
    private Integer code;

    public BusinessException(Integer code,String message) {
        super(message);
        this.code = code;
    }

    public BusinessException(Integer code,String message, Throwable cause) {
        super(message, cause);
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
```



2. 系统异常

```java
public class SystemException extends RuntimeException {

    private Integer code;

    public SystemException(Integer code, String message) {
        super(message);
        this.code = code;
    }

    public SystemException(Integer code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
```



3. 其他异常

```java
public class OtherException extends RuntimeException{

    private Integer code;

    public OtherException(Integer code, String message) {
        super(message);
        this.code = code;
    }

    public OtherException(Integer code, String message, Throwable cause ) {
        super(message, cause);
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
```



说明：

- 让自定义异常类继承`RuntimeException`的好处是，后期在抛出这两个异常的时候，就不用在try...catch...或throws了
- 自定义异常类中添加`code`属性的原因是为了更好的区分异常是来自哪个业务的

可以用一类中来设置异常的状态码

```java
public class Code {

    // 执行成功的状态码
    public static final Integer GET_OK = 100101;
    public static final Integer UPDATE_OK = 100201;
    public static final Integer DELETE_OK = 100301;
    public static final Integer SAVE_OK = 100401;

    // 执行失败的状态码
    public static final Integer GET_ERROR = 100100;
    public static final Integer UPDATE_ERROR = 100200;
    public static final Integer DELETE_ERROR = 100300;
    public static final Integer SAVE_ERROR = 100400;



    // 异常状态码
    public static final Integer SYSTEM_ERR = 50001;
    public static final Integer SYSTEM_TIMEOUT_ERR = 50002;
    public static final Integer SYSTEM_UNKNOW_ERR = 59999;

    public static final Integer BUSINESS_ERR = 60002;
}
```



##### 异常处理器

在Controller层中定义我们的异常处理器。 

```java
@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(SystemException.class)
    public Result doSystemException(SystemException ex) {

        // 1.记录日志 , logger.warn(ex)
        // 2.通知运维人员
        // 3.通知开发人员
        // 4.安抚用户
        return new Result(ex.getCode(), ex.getMessage(), null);
    }

    @ExceptionHandler(BusinessException.class)
    public Result doBusinessException(BusinessException ex) {
        // 1. 提醒用户规范操作
        return new Result(ex.getCode(), ex.getMessage(), null);
    }

    @ExceptionHandler(OtherException.class)
    public Result doOtherException(OtherException ex) {
        // 1. 记录日志
        // 2. 通知运维人员
        // 3. 通知开发人员
        // 4. 安抚用户
        return new Result(ex.getCode(), "系统繁忙！请稍后再试", null);
    }

}
```

- **使用`@RestControllerAdvice`注解来标注这是一个Rest风格的异常处理器**
- **使用`@ExceptionHandler`在方法上标注此方法用来处理何种类型的异常**

- **在异常处理的方法中进行处理**





##### 异常包装

在我们的表现层中，对发生异常的地方进行捕获，封装成我们的自定义异常类或者直接抛出我们的自定义异常类

```java
if(id < 0){
    // 直接抛出异常
   throw new BusinessException(Code.BUSINESS_ERR,"请规范您的操作!");
}
try{
    // 模拟发生的异常
    int i = 1/0;
}catch (Exception e){
    // 封装成自定义的异常类
    throw new BusinessException(Code.BUSINESS_ERR,"请规范您的操作!",e);
}
```



### 前后台协议联调

#### 设置SpringMVC拦截规则

我们在初始化SpringMVCWeb容器时，设置的是`/`，即所有的请求都交给SpringMVC处理。

此时访问静态的资源，SpringMVC也会拦截到，并寻找这个请求，但是这并不是一种请求

![image-20230201161401790](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230201161401810.png)

![image-20230201161338315](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230201161338315.png)



此时就需要配置一下SpringMVC，告诉SpringMVC哪些资源放行。

新定义一个配置类，继承`WebMVCConfigurationSupport`类，在这个类中有很多的配置方法


```java
@Configuration
public class SpringMvcSupport extends WebMvcConfigurationSupport {
    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/pages/**").addResourceLocations("/pages/");
        registry.addResourceHandler("/css/**").addResourceLocations("/css/");
        registry.addResourceHandler("/js/**").addResourceLocations("/js/");
        registry.addResourceHandler("/plugins/**").addResourceLocations("/plugins/");
    }
}
```



在SpringMVC的配置类中去扫描这个配置类

```java
@Configuration
@ComponentScan({"com.itheima.controller","com.itheima.config"})
@EnableWebMvc
public class SpringMvcConfig {
}
```







### 拦截器

#### 简述

SpringMVC中的拦截器与Servlet中的过滤器比较相似。

![image-20230201172949150](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230201172949150.png)

在业务组件的前后都会对请求、响应的结果做一些处理（通常是一些不区分业务的公共逻辑，例如编码格式、响应格式等）



**拦截器（Interceptor）是一种动态拦截方法调用的机制，在SpringMVC中动态拦截控制器方法的执行**

* **作用:**
  * **在指定的方法调用前后执行预先设定的代码**
  * **阻止原始方法的执行**
  * **总结：拦截器就是用来做增强**



拦截器与过滤器的流程基本一致：

![image-20230201173507956](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230201173507956.png)

请求进入时，最外层的拦截器先处理，一层一层递进， 响应时，最内侧的拦截器先处理，一层一层的出来。

![image-20230201173759676](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230201173759676.png)



**过滤器与拦截器的异同**

- 归属不同：Filter属于Servlet技术，Interceptor属于SpringMVC技术
- 拦截内容不同：Filter对所有访问进行增强，Interceptor仅针对SpringMVC的访问进行增强





#### 流程

1. 首先定义一个拦截器类

在SpringMVC中，定义一个拦截器，需要实现`HandlerInterceptorHandlerInterceptor`接口，一般习惯放在`interceptor`包下

并配置一个此拦截器的Bean

```java
@Component
public class MyInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("perHandler ...");
        return  true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle...");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("afterCompletion ...");
    }
}
```

在`preHandle()`方法中，如果返回true则代表放行，会继续执行接下来的Controller中的方法，如果返回false则表示拦截。

![image-20230203152719618](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230203152719618.png)





2. 注册拦截器

我们之前在处理拦截静态资源时，继承了一个`WebMvcConfigurationSupport`的类， 在此类中就有注册拦截器的方法

`addPathPatterns()`方法是设置拦截路径，其中的参数是支持变长参数的，可以设置多个拦截路径。

![image-20230203151721882](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230203151721882.png)

![image-20230203152521638](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230203152521638.png)



3. 在SpringMVC的配置类中扫描这个配置

```java
@Configuration
@ComponentScan({"com.itheima.controller","com.itheima.config"})
@EnableWebMvc
public class SpringMvcConfig {
}
```



至此，一个基本的拦截器就配置完成了。



##### 简化

我们是单独定义了一个SpringMVCSport的类，在此类中设置拦截器。

我们还可以直接用SpringMVC的配置类来实现接口，直接在SpringMVC的配置类中去设置拦截器。 

实现`WebMvcConfigurer`接口，在此接口中有很多设置方法，其中就有注册拦截器的方法。

![image-20230203153204288](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230203153204288.png)





#### 各种参数的使用

在定义拦截器时，会方法的参数中可以看到很多参数，这些参数是如何使用的？

![image-20230203154919631](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230203154919631.png)



##### 前置处理——preHandle方法

```java
public boolean preHandle(HttpServletRequest request, 
                         HttpServletResponse response, 
                         Object handler) throws Exception {
    System.out.println("perHandler ...");
    return  true;
}
```

- HttpServletRequest request 原生Servlet中的请求对象
- HttpServletResponse response，原生Servlet中的响应对象
- Object handler



首先是`HttpServletRequest`和`HttpServletResponse`这两个类型的参数，这两个参数在学习Servlet时遇到过。

![image-20230203154601517](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230203154601517.png)

这两个参数就是对请求、响应信息的封装，通过这两个对象可以拿到请求、响应中的参数、内容等，在Servlet中这两个对象怎么用，在此处还是怎么用。

例如

```java
// 获取请求参数
request.getParameter();
// 获取Session
request.getSession();
// 获取项目路径
request.getContextPath();
// 获取请求头
request.getHeader("Content-Type");
```

 

其次，还有一个`Object`类型的`handler`对象，此对象是对访问的处理方法的一个描述。 

打印一下这个对象

```java
com.itheima.controller.BookController#getAll()
```

打印出来的就是对处理该请求方法的描述(也就是请求对应的Controller中的具体方法)

通过调用此对象的`getClass()`方法，看一下该对象的具体类型。

会看到该对象是一个`HanlerMethod`类型的对象。

![image-20230203155944127](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230203155944127.png)

可以通过此`handler`对象获取对应Controller中的对应方法中的信息。 

```java
HandlerMethod hm =  (HandlerMethod) handler;
System.out.println(hm.getMethod().getName());
```



##### 后置处理——postHandle方法

```java
public void postHandle(
    HttpServletRequest request, 
    HttpServletResponse response, 
    Object handler, 
    ModelAndView modelAndView) throws Exception {

}
```

这里面有一个ModelAdnView类型的参数，这个参数是如果Controller处理完成之后有返回结果，那么可以通过此对象获取到对应的数据和页面信息，并进行调整。

咱们现在开发大部分都是用的JSON，所以此参数基本不用。 



##### 完成时处理——afterCompletion方法

```java
public void afterCompletion(HttpServletRequest request, 
                            HttpServletResponse response, 
                            Object handler, 
                            Exception ex) throws Exception {
 
}
```

此方法中有一个Exception类型的参数， 如果处理器执行过程中出现异常对象，可以针对异常情况进行单独处理  。

因为我们现在已经有全局异常处理器类，所以该参数的使用率也不高。





这三个方法中，最常用的是preHandle,在这个方法中可以通过返回值来决定是否要进行放行，我们可以把业务逻辑放在该方法中，如果满足业务则返回true放行，不满足则返回false拦截。



### 拦截器链

当配置多个拦截器时，如何形成拦截器链？

当我们有多个拦截器，只需要在注册拦截器的方法中，根据前后顺序添加即可。

![image-20230203163803007](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230203163803007.png)

这是单个拦截器的执行流程，当在preHandle中返回false时，后面的controller、postHanle、afterCompletion都不会执行
![image-20230203152719618](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230203152719618.png)





当有了多个拦截器时，执行流程是这样的，这是在所有的preHandle都返回true的前提下。

![image-20230203164803871](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230203164803871.png)



当preHandle_3处返回false时，执行流程 是这样的。

![image-20230203165000660](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230203165000660.png)

当preHandle_2处返回false时，执行流程是这样的。

![image-20230203165048184](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230203165048184.png)



当在preHandle_1处返回false时，执行流程是这样的

![image-20230203165239344](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230203165239344.png)





























