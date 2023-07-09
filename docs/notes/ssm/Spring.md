# Spring简介

## Spring介绍

[Spring官网](https://spring.io/)

目前JavaWeb后端基本上被Spring占领了，大概90%的JavaWeb项目的后端都是Spring全家桶。

为什么学习Spring：

- Spring可以简化开发，降低开发复杂性
- Spring可以高效的整合第三方技术与框架

Spring框架的主要优势是**简化开发**和**框架整合**

Spring中的两大核心技术：

- IoC
- AOP
  - 事务处理



## Spring全家桶

Spring已经发展到了一种开发的生态圈，你想要完成的任何项目，都可以完全使用Spring提供的工具来完成。

![image-20221009150647378](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221009150647378.png)



## Spring系统架构

![image-20221009151405897](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221009151405897.png)

## 学习路线

![image-20221009151553866](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221009151553866.png)









# IoC/DI

## Spring初体验

### 目前项目中存在的问题

![image-20221225205946693](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221225205946693.png)

1. 业务层直接调用数据层方法，直接new一个数据层对象，拓展功能时需要直接改动代码
2. 如果数据层的实现类发生变化，那么业务层的代码也要跟着改变，需要重新编译打包部署，这就是**耦合性较高**



针对这个问题，Spring提出了一个解决方案：

**在程序中不主动使用new产生对象，由外部提供对象。**

这种实现思想就是Spring的核心概念——IoC



### 基本概念

IoC思想：**不再主动地new对象，而是由“外部”提供对象，对象的创建控制权由程序转移到外部，这种思想称为控制反转**



Spring技术对IoC思想进行了实现：

* **Spring提供了一个容器，称为IoC容器，用来充当IoC思想中的“外部”。**
* **IoC容器负责对象的创建、初始化等一系列工作，被创建或管理的对象在IoC容器中统称为Bean**



当Ioc容器中有了service和dao两个对象后，程序能运行吗？

不能，因为service需要依赖dao对象来运行，但容器中有了两个对象，但是这两个对象之间还没有建立任何关系。

![image-20221225212004259](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221225212004259.png)

**在容器中建立对象与对象之间的绑定关系就要用到DI——依赖注入**

**给IOC容器中的Bean之间建立关系的过程，绑定对象与对象之间的关系叫做依赖注入**



IoC与DI的目标就是：**充分解耦**，具体实现为：

* 使用IoC容器管理Bean
* 在IoC容器中将有依赖关系的Bean进行绑定
* 最终结果为：使用对象时不仅可以直接从IoC容器中获取，并且可以获取到的bean已经绑定了依赖关系。



### IoC入门案例

创建Service和Dao 的模拟类

```java
public class DaoImpl implements Dao {
    @Override
    public void save() {
        System.out.println("DaoImpl save...");
    }
}
```

```java
public class ServiceImpl implements Service {

    Dao dao  = new DaoImpl();

    @Override
    public void save() {
        System.out.println("ServiceImpl is save ....");

        dao.save();
    }
}
```

导入spring坐标

```xml
<!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.2.10.RELEASE</version>
</dependency>
```

导入spring的坐标之后，就可以直接new一个Spring的配置文件

![image-20221229204817009](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221229204817009.png)

![image-20221229205039310](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221229205039310.png)

有了配置文件，还需要一个IoC容器，如何拿到一个IoC容器，在Spring中给出了接口，ApplicationContext接口，需要直接new一个此接口的实现类。

```java
    public static void main(String[] args) {
        ApplicationContext crx = new ClassPathXmlApplicationContext("applicationContext.xml");
//      根据配置文件中的id来获取bean对象
        Service service = (Service) crx.getBean("serviceImpl");
//      调用Bean的 方法
        service.save();

    }
```

一个基本的IoC案例就做完了**，在此案例中，Service对象不再直接new，而是通过配置文件来配置该实现类，直接获取该类。**



### DI入门案例

目前在Service的实现类中，还是通过new的形式来创建业务层对象，依然存在耦合度较高的问题。

Spring 中的解决方法：

1. 删除Service实现类中的new代码

2. 在配置文件中给两个bean建立联系
3. 在Service实现类中提供方法来给Service的实例设置Dao的对象

来看一下代码，首先在Service中删除new的代码，添加一个设置Dao对象的方法

```java
public class ServiceImpl implements Service {

    private Dao dao;

    //添加设置方法
    public void setDao(Dao dao) {
        this.dao = dao;
    }

    @Override
    public void save() {
        System.out.println("ServiceImpl is save ....");
        dao.save();
    }
}
```

在配置文件中设置两个bean的关系

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="daoImpl" class="com.dao.impl.DaoImpl"/>
    <bean id="serviceImpl" class="com.service.impl.ServiceImpl">
<!--        property标签用来定义bean身上的属性-->
<!--        name用来指定属性的名称，需要与类中的属性名保持一致-->
<!--        ref表示该属性参照哪一个bean实例-->
        <property name="dao" ref="daoImpl"/>
    </bean>

</beans>
```

测试方法不变，仍然有运行结果

```java
public class App2 {
    public static void main(String[] args) {
        ApplicationContext crx = new ClassPathXmlApplicationContext("applicationContext.xml");
//      根据配置文件中的id来获取bean对象
        Service service = (Service) crx.getBean("serviceImpl");
//      调用Bean的 方法
        service.save();
    }
}
```

在此案例中，为service对象与dao对象之间建立了依赖关系：service对象的运行需要依赖dao对象



### 查看Spring报错信息

对于Spring的报错信息，如何查看呢？

一般来说，将报错信息拉到最后，看最后一个caused by信息，一般就能解决，如果不能继续看上一个。

**每向上一个报错信息，就会将下面的报错信息拼接上去。**

![image-20221229222844680](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221229222844680.png)

所以，对于Spring 的报错，通常都是**从下往上看。**



## Bean配置

### Bean的基础设置

需要管理的对象，就放在IoC容器中，需要在Spring的配置文件中

使用

``` 
<bean id="" class="">
```

来引入交给IoC容器的对象，其中

- `id`：用来唯一标识一个Bean
- `class`：用来指定此类的全类名



### Bean别名配置

在刚才的两个案例演示中，我们在配置文件中定义bean时，是使用id来标识一个唯一的类，在获取bean实例时，也是使用Id来获取的。

还可以为bean定义一个别名，**bean标签有一个name属性，可以为bean起别名，多个别名之间使用逗号、空格 或者分号隔开**

```xml
<bean id="serviceImpl" name="service serviceEbi" class="com.service.impl.ServiceImpl">
    <property name="dao" ref="daoImpl" />
</bean>
```

**在代码中获取bean时，传入bean的name也是可以的**

同理，**在property的标签中，使用ref来指定引入依赖的Bean时，也是可以使用Bean的name的值**

```xml
<bean id="daoImpl" name="dao1 dao2" class="com.dao.impl.DaoImpl"/>
<bean id="serviceImpl" name="service serviceEbi" class="com.service.impl.ServiceImpl">
    <property name="dao" ref="dao1" />
</bean>
```



### 获取Bean时的异常

在使用`getBean()`方法来获取bean时，如果传入的值是一个配置文件中没有定义的bean，会怎样？

就会报一个没有此bean的异常

![image-20221229212149261](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221229212149261.png)

咱们需要掌握如何来看Spring的报错信息

如果发生了此异常，有两种原因

1. **你在getBean时写错了信息**
2. **在配置文件中定义bean时写错了**



### bean作用范围配置

通过IoC容器创建的是一个对象还是多个对象？这就是Bean的作用范围，简单地说，**通过IoC容器对象获取的实例是单例的还是非单例的**

来测试一下

```java
        ApplicationContext crx = new ClassPathXmlApplicationContext("applicationContext.xml");
//      根据配置文件中的id来获取bean对象
        Service service = (Service) crx.getBean("service");
        Service service1 = (Service) crx.getBean("service");
        System.out.println(service == service1);
```

结果输出为true，代表**Spring默认为我们创建的实例是单例的.**



但是如果我想要非单例的模式，是怎样操作呢？

同样还是通过配置的方式，**在bean标签中有一个scope属性，用此属性来定义该bean是否是单例。**

**scope有两个属性**

- **singleton默认，单例模式**
- **prototype非单例**

```xml
<bean id="serviceImpl" name="service serviceEbi" class="com.service.impl.ServiceImpl" scope="prototype">
    <property name="dao" ref="daoImpl"/>
</bean>
```

思考回来？

为什么Spring默认的bean是单例？

因为在IoC容器中，如果一个实例不是单例的，那么就会有很多个同类型的实例，就会给IoC容器带来压力，但是大部分的实例都是可以复用的，这样就减少了IoC的压力，这样IoC的效率也能更高。

适合交给容器进行管理的Bean

- 表现层对象
- 业务层对象
- 数据层对象
- 工具对象



不适合交给容器进行管理的Bean

- 封装实体的域对象





## Bean的实例化

考虑一个问题，Spring是如何来实例化bean的

**Bean本质上就是一个对象，既然是一个对象，那么就离不开构造方法**

### 构造方法

测试一下，在类中的构造方法中添加一个打印

```java
public class DaoImpl implements Dao {
    public DaoImpl() {
        System.out.println("无参构造已执行...");
    }

    @Override
    public void save() {
        System.out.println("DaoImpl save...");
    }
}
```

测试一下

```java
    public static void main(String[] args) {
        ApplicationContext crx = new ClassPathXmlApplicationContext("applicationContext.xml");
        Dao dao = (Dao) crx.getBean("daoImpl");

        dao.save();
    }
```

![image-20221229222216191](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221229222216191.png)

如果将构造方法private化，测试的效果是不变的。

这就说明，**在Spring的底层是使用反射来进行Bean实例化的**



当我们的**类中没有无参构造时，此时Spring就会报错：无法实例化**

```java
public class DaoImpl implements Dao {
    private DaoImpl(int a) {
        System.out.println("无参构造已执行...");
    }

    @Override
    public void save() {
        System.out.println("DaoImpl save...");
    }
}
```

![image-20221229222514056](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221229222514056.png)

**说明Spring在实例化时，默认调用的是Bean的无参构造方法来进行实例化**





### 静态工厂

静态工厂：获取产品对象的方法是静态的，可以直接通过`类名.方法名()`的形式获取产品对象。

一个普通静态工厂的代码

```java
public class DaoFactory {
    
    public static Dao getDao(){
        return new DaoImpl();
    }
    
}
```

如果说你的对象是通过静态工厂来创建的，怎么整？

**最简单的方法是：你可以直接返回这个工厂对象，然后通过工厂对象获取实体类对象**

配置文件

```xml
<bean id="factory" class="com.dao.impl.DaoFactory"/>
```

测试代码

```java
ApplicationContext crx = new ClassPathXmlApplicationContext("applicationContext.xml");
DaoFactory factory = (DaoFactory) crx.getBean("factory");
Dao dao = factory.getDao();
dao.save();
```

> 这样的逻辑反而使得代码的书写更加复杂，这个静态工厂有些多余了



**在Spring中，针对工厂方法来获取对象的方式，在`<bean>`中提供了一个属性`factory-method`，通过此属性来指定工厂获取产品对象的方法**，这样通过容器来获取工厂Bean时，会通过调用工厂方法，来直接返回产品对象。



**修改后的配置文件，只需要加一个`factory-method`属性即可，属性值是工厂中的方法名称**

```java
<bean id="factory" class="com.dao.impl.DaoFactory" factory-method="getDao"/>
```

测试代码，这样**通过调用容器的getBean方法获取bean时，返回的不是工厂对象，而是工厂生产的产品对象**

```java
ApplicationContext crx = new ClassPathXmlApplicationContext("applicationContext.xml");
Dao dao = (Dao) crx.getBean("factory");
dao.save();
```





### 实例工厂

上述的静态工厂，因为获取对象的方法是静态的，不需要实例化工厂对象。

但是还有一些实例工厂的方法，**需要先有工厂对象，然后通过工厂对象的方法来获取产品对象**，比如说设计模式中的抽象工厂、抽象方法这两种工厂模式。

对于此种实例工厂获取产品对象的方式，在Spring中应该如何设置呢？



1. 首先你需要先有这个工厂对象，在Spring配置文件中正常定义这个工厂Bean

```xml
<bean id="userFactory" class="com.dao.impl.UserFactory"/>
```

2. 定义产品Bean

**不用写class属性**了，因为不是Spring来实例化产品了，是通过实例工厂来获取产品了，产品的配置应该这样写

- `factory-bean`指定工厂的Bean，告诉Spring此对象是通过哪一个工厂Bean来产生的
- `fatory-metho`指定工厂类获取产品的方法

```xml
<bean id="userDao" factory-bean="userFactory" factory-method="getUser"/>
```

看测试代码，直接获取产品对象即可

```java
ApplicationContext crx = new ClassPathXmlApplicationContext("applicationContext.xml");
UserDao user = (UserDao) crx.getBean("userDao");
user.save();
```

此时获取产品Bean时，直接通过产品Bean的id或name或class类型来获取即可，底层并不是Spring来负责此Bean的实例化，而是通过我们指定的工厂Bean来实例化的此产品Bean



### Spring工厂规范

上述两种工厂来实例化并获取Bean的方式，由于是自定义的工厂，并没有一个统一的工厂规范。

于是在Spring中对工厂类做出了规范——`FactoryBean`接口

**首先，我们在定义工厂类时，需要实现FactoryBean这个接口，并通过泛型来指定我们产品的类型**

```java
public class UserDaoFactoryBean implements FactoryBean<UserDao> {

    @Override
    public UserDao getObject() throws Exception {
        return new UserDaoImpl();
    }

    @Override
    public Class<?> getObjectType() {
        return UserDao.class;
    }

}
```

**在实现接口时，需要指定泛型，这里的泛型就是我们需要返回的产品的类型**

> getObject()方法中实现返回一个产品对象
>
> getObjectType()方法中返回产品类型的字节码对象



**在Spring配置文件中，只需要给出这个工厂的全类名即可，就可以直接返回该产品对象**

```xml
<bean id="userDao" class="com.dao.impl.UserDaoFactoryBean"/>
```

测试代码，通过getBean方法直接返回产品的对象
```java
ApplicationContext crx = new ClassPathXmlApplicationContext("applicationContext.xml");
UserDao user = (UserDao) crx.getBean("userDao");
user.save();
```

> 其实底层是Spring首先实例化工厂Bean，然后通过调用getObject()来返回产品Bean



在实现FactoryBean 接口时，你会注意到还有一个默认方法

```java
@Override
public boolean isSingleton() {
    return true;
}
```

**这个方法是用来定义产品是否是单例模式，默认返回值是true(单例模式)，将返回值改为false，产品对象就变成了非单例**





## Bean的生命周期

**生命周期：Bean实例从创建到消亡的整个过程**

上一次接触生命周期这个概念，还是在Servlet的生命周期

**对于一个完整的生命周期，应该有初始化、调用、销毁三个过程**



### 配置属性来控制生命周期

定义一个Bean，并声明init、destroy方法来模拟整个初始化和销毁过程

```java
public class DaoImpl implements Dao {
    DaoImpl() {
        System.out.println("无参构造已执行...");
    }

    public void init() {
        System.out.println("Dao init ...");
    }

    @Override
    public void save() {
        System.out.println("DaoImpl save...");
    }

    public void destroy() {
        System.out.println("Dao destroy....");
    }
    
}
```

配置Bean，通过`init-method`和`destroy-method`方法来指定bean的初始化和销毁的方法名称

```xml
<bean id="daoImpl" name="dao1 dao2" class="com.dao.impl.DaoImpl" init-method="init" destroy-method="destroy"/>
```

测试代码就一行

```java
ApplicationContext crx = new ClassPathXmlApplicationContext("applicationContext.xml");
```

运行看效果

![image-20221231200142328](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221231200142328.png)

会发现，只执行了初始化方法，而没有执行销毁的方法。

**这是因为：Java虚拟机与IoC容器的关系导致的，在IoC容器初始化后，就会去初始化容器中的Bean，此时就会去调用Bean的init方法，但是当程序结束时，Java虚拟机关闭，IoC容器被强制关闭，IoC容器并没有被正常关闭，所以就无法去执行Bean中的destroy方法。**

**解决方法：我们需要显式地声明容器的关闭即可。**



#### 正常关闭容器的两种方式

##### 第一种close()

在ApplicationContext的实现类中（此时IoC容器类型不能是Application），**有一个`close()`方法，可以强制关闭IoC容器**

来看测试代码

```java
ClassPathXmlApplicationContext crx = new ClassPathXmlApplicationContext("applicationContext.xml");
crx.close();
```

这时候就可以看到销毁的方法正常执行了

![image-20221231201318074](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221231201318074.png)

这种强制关闭IoC容器的方法是不推荐的，因为这是暴力的方式，**这句代码的位置也是不可以随意的，必须在所有正常代码执行之后**，如果在正常代码之前调用此方法，就会导致后面正常的代码报错。



##### 第二种 设置关闭钩子

在代码中声明一下IoC容器与Java虚拟机的关系，通知Java虚拟机在关闭前需要正常关闭IoC容器。

只需要在代码中加入这一行代码即可

```java
crx.registerShutdownHook();
```

这一行代码的位置是随意的，无论在哪，虚拟机都能被通知。



设置完成IoC容器的关闭后，会看到我们定义的Bean的真个生命周期。

![image-20221231202052206](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221231202052206.png)

> 1. 首先会调用Bean的无参构造来实例化Bean
> 2. 接下来调用此Bean对象的初始化方法来模拟Bean的初始设置阶段
> 3. 当容器关闭时，就会调用Bean的销毁方法来销毁该Bean实例





### 规范生命周期

以上通过在`<bean>`标签中，通过两个属性来指定Bean的初始化和销毁的方法名，因为Bean类是我们自定义的，对于Spring来说负责此Bean的生命周期并没有规范，需要我们为每一个Bean指定`init-method`和`destroy-metho`来指定方式，较为繁琐。

Spring中定义了Bean的生命周期规范

Bean只需要实现这两个接口，在这两个接口中分别都有一个方法：

- `InitializingBean`中只有一个方法，初始化的方法
- `DisposableBean`中只有一个方法，销毁的方法

Bean的代码

```java
public class DaoImpl implements Dao, InitializingBean, DisposableBean {
    DaoImpl() {
        System.out.println("无参构造已执行...");
    }


    @Override
    public void save() {
        System.out.println("DaoImpl save...");
    }


    @Override
    public void destroy() throws Exception {
        System.out.println("dao destroy ...");
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("dao init ...");
    }
}
```

在配置文件中正常设置我们的Bean，不需要再通过`init-method`和`destroy-method`这两个属性来指定特定方法了。

```xml
<bean id="daoImpl" class="com.dao.impl.DaoImpl"/>
```

测试的代码

```java
ClassPathXmlApplicationContext crx = new ClassPathXmlApplicationContext("applicationContext.xml");
crx.registerShutdownHook();
```

看到初始化和销毁的方法被正常运行，通过这两个接口就规范了Bean的生命周期中的初始化和销毁这两个阶段

![image-20221231202732784](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221231202732784.png)

在`InitializingBean`接口中，方法名叫`afterPropertiesSet`，而不是我们认为的`init`，这个方法名直接翻译就是"在属性设置之后",通过运行效果我们也看出来了，这个方法是在构造方法之后运行的，因为构造方法就是设置属性的。



**在Spring的生命周期中，初始化方法调用的时期是在构造方法和setter之后的**(没有构造方法哪来的实例，没有实例怎么调用初始化方法)





### 总结

对于Bean的生命周期，整个流程是这样的：

![image-20221231203942619](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221231203942619.png)

### 小技巧——查看继承体系

在IDEA中，如何查看一个接口或类的继承体系，像这样，只需要用鼠标选中一个类名，然后按下快捷键

![image-20221231205229204](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221231205229204.png)

如果的IDEA设置的Key Map是Windows，那么就是Ctrl + H

如果你的IDEA的Keymap是Eclipse，那么就是F4





## 依赖注入的两种方式

在类中为这些属性赋值的方式，一般有两种

- 构造器注入
- setter注入

接下来就根据这两种方式的如何注入两种类型的属性

### setter注入

**通过setter注入依赖，此类中必须有对应的setter**

#### setter注入引用类型

对于**setter注入引用类型**，在前面了解过

**在Bean标签中通过`<property>`标签的`ref`属性来指定依赖某个对象，`name`属性用来指定类中属性的名称**

```java
public class ServiceImpl implements Service {

    private Dao dao;

    private UserDao user;

    public void setUser(UserDao user) {
        this.user = user;
    }

    public void setDao(Dao dao) {
        this.dao = dao;
    }

    @Override
    public void save() {
        System.out.println("ServiceImpl is save ....");
        dao.save();
    }
}
```

配置文件

```xml
<bean id="daoImpl" class="com.dao.impl.DaoImpl"/>
<bean id="userDaoImpl" class="com.dao.impl.UserDaoImpl"/>
<bean id="serviceImpl" name="service serviceEbi" class="com.service.impl.ServiceImpl" scope="prototype">
    <!--        property标签用来定义bean身上的属性-->
    <!--        name用来指定属性的名称，需要与类中的属性名保持一致-->
    <!--        ref表示该属性参照哪一个bean实例-->
    <property name="dao" ref="daoImpl"/>
    <property name="user" ref="userDaoImpl"/>
</bean>
```

测试

```java
ClassPathXmlApplicationContext crx = new ClassPathXmlApplicationContext("applicationContext.xml");
Service serviceImpl = (Service) crx.getBean("serviceImpl");
serviceImpl.save();
```

成功运行。

![image-20221231212904772](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221231212904772.png)



#### setter注入简单类型

简单数据类型的注入方式与引用数据类型相似

首先，在Bean中声明简单类型的属性，并定义对应的setter

```java
public class DBBean {
    
    int num;
    String username;

    public void setNum(int num) {
        this.num = num;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "DBBean{" +
                "num=" + num +
                ", username='" + username + '\'' +
                '}';
    }
}
```

**通过Bean标签中的**

- **name属性来指定类中属性（依赖）的名称**
- **value属性直接给出属性值**

**对于简单数据类型，不用担心数据类型的问题，Spring会自动转换**

```xml
<bean id="dbBean" class="com.dao.impl.DBBean">
    <property name="num" value="100"/>
    <property name="username" value="root"/>
</bean>
```

测试一下

```java
ClassPathXmlApplicationContext crx = new ClassPathXmlApplicationContext("applicationContext.xml");
DBBean dbBean = (DBBean) crx.getBean("dbBean");
System.out.println(dbBean);
```

成功注入属性

![image-20221231213805304](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20221231213805304.png)



### 构造器注入

对于构造器的注入方式，只是在配置文件中将标签换成了`<constructor-arg>`，其余用法与setter注入基本相同

#### 构造器注入引用类型

**在定义类时，需要根据属性设置对应的构造方法**

```java
public class ServiceImpl implements Service {

    private Dao dao;

    private UserDao user;

    public ServiceImpl(Dao dao, UserDao user) {
        this.dao = dao;
        this.user = user;
    }

    @Override
    public void save() {
        System.out.println("ServiceImpl is save ....");
        dao.save();
        user.save();
    }
}
```

**与setter注入引用类型相似，只不过标签换成了`<constructor-arg>`**

- **name属性来指定构造方法中对应形参的名称**
- **ref属性用来指定需要依赖的Bean**

```xml
    <bean id="daoImpl" class="com.dao.impl.DaoImpl"/>
    <bean id="userDaoImpl" class="com.dao.impl.UserDaoImpl"/>
    <bean id="serviceImpl" name="service serviceEbi" class="com.service.impl.ServiceImpl" scope="prototype">
        <constructor-arg name="dao" ref="daoImpl"/>
        <constructor-arg name="user" ref="userDaoImpl"/>
    </bean>
```

**注意：此处的name是构造方法中的形参的名称**



#### 构造器注入简单数据类型

类，给出对应构造方法

```java
public class DBBean {
    int num;
    String username;

    public DBBean(int num, String username) {
        this.num = num;
        this.username = username;
    }

    @Override
    public String toString() {
        return "DBBean{" +
                "num=" + num +
                ", username='" + username + '\'' +
                '}';
    }

}
```

**配置文件中，用value直接给出值**

- **name属性用来指定构造方法中形参的名称**
- **value属性直接给出简单类型的值**

```java
<bean id="dbBean" class="com.dao.impl.DBBean">
    <constructor-arg name="num" value="100"/>
    <constructor-arg name="username" value="root"/>
</bean>
```



#### 优化

##### 第一种优化方式

**在构造器注入中，存在的问题是，配置文件与构造方法的参数的耦合**，在传参时，需要指定形参的姓名

在Spring 中，又出现了另一种方式，不用给出形参的名称，这样就降低了配置文件与形参的耦合

```xml
    <bean id="dbBean" class="com.dao.impl.DBBean">
        <constructor-arg type="int" value="99"/>
        <constructor-arg type="java.lang.String" value="root"/>
    </bean>
```

这样，在传参时就会根据参数的类型为构造方法传参

但是新的问题又出现了，假如构造方法中的两个参数的类型是相同的，就会发生紊乱。



##### 第二种优化方式

对于构造方法的不同参数，给出形参的位置就可以解决同类型参数的问题

参数的索引是从0开始的

看一下这个类的构造方法

```java
public class DBBean {
    int num;
    String username;
    String url;

    public DBBean(int num, String username, String url) {
        this.num = num;
        this.username = username;
        this.url = url;
    }

    @Override
    public String toString() {
        return "DBBean{" +
                "num=" + num +
                ", username='" + username + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
```

构造方法的第一个是int，索引是0，第二个参数是String，索引是1，第三个参数也是String，索引是2，那么配置文件就可以这样写

```xml
<bean id="dbBean" class="com.dao.impl.DBBean">
    <constructor-arg index="0" value="99"/>
    <constructor-arg index="1" value="root"/>
    <constructor-arg index="2" value="jdbc:mysql://localhost:3306/mydb"/>
</bean>
```



### 总结

**对于两种的注入方式，应该如何选择？**

1. 实例要运行必须要传入的参数，就叫做强制依赖，强制依赖应该使用构造器注入，此种情况如果使用setter会存在null的问题
2. 可选依赖使用setter方式注入，灵活性更强
3. Spring框架推荐使用构造器注入，第三方框架内部大多数采用构造器注入的形式进行数据初始化，这样相对严谨
4. 如果有必要，两者同时使用，使用构造器注入完成强制依赖的注入，使用setter完成可选依赖的注入
5. 实际开发中还要根据实际情况分析，如果受控对象没有提供setter，就使用构造器注入
6. **自己开发模块推荐使用setter注入**，灵活方便





## 依赖自动装配

**IoC容器根据bean所依赖的资源在容器中自动查找并注入到bean中的过程称为自动装配**

实现自动装配，只需要在配置文件中加入`autowire`这个属性即可。

### 通过类型

`autowire`的值是`byType`

**自动装备是利用setter的方式注入的，需要在类中设置对应的setter**

```java
public class ServiceImpl implements Service {

    private Dao dao;

    private UserDao user;

    public void setDao(Dao dao) {
        this.dao = dao;
    }

    public void setUser(UserDao user) {
        this.user = user;
    }

    @Override
    public void save() {
        System.out.println("ServiceImpl is save ....");
        dao.save();
        user.save();
    }
}
```
设置autowire的值是byType
```xml
<bean id="daoImpl" class="com.dao.impl.DaoImpl"/>
<bean id="userDaoImpl" class="com.dao.impl.UserDaoImpl"/>

<bean id="serviceImpl" name="service serviceEbi" class="com.service.impl.ServiceImpl" autowire="byType"/>
```

**要实现根据类型自动装配，需要保证容器中有对应类型的Bean且唯一 , 否则就会报错，容器中不可以出现两个相同类型的Bean**



### 通过名称

`autowire`的值是`byName`

类的代码不需要改，配置文件中的`autowire`改成`byName`

**注意：这里的根据名称，需要对应的bean的id与setter名称中的属性名保持规范**

比如说，我的setter的名称是

```java
public void setDao(Dao dao) {
    this.dao = dao;
}

public void setUser(UserDao user) {
    this.user = user;
}
```

那么在容器中，对应的Bean的就应该这样写

```xml
    <bean id="dao" class="com.dao.impl.DaoImpl"/>
    <bean id="user" class="com.dao.impl.UserDaoImpl"/>
```

必须符合名称规范，标准命名规范(驼峰命名)

只有这样，才会根据名称来自动装配成功


### 总结

- 自动装配只能用于引用类型的依赖注入，不能对简单数据类型进行依赖注入
- 使用按类型byType装配时，必须保证容器中的对应类型的Bean唯一，推荐使用
- 使用按名称byName装配时，必须保障容器中具有指定名称的bean，注意id是否对应setter，因变量名与配置耦合，不推荐使用
- **自动装配的优先级低于setter注入和构造器注入，同时出现自动装配会失效**

**在Spring中，不推荐使用自动装配了**





## 集合注入

如果一个Bean的有一个属性是集合类型，应当怎样注入，我们注入的应当是带有元素的集合。

常见的集合有几种类型：

- 数组
- List
- Set
- Map
- Properties



通过一个小案例来综合一下

这是Bean类，在这个类中给出了几种常用的集合，并设置对应的setter

```java
public class UserService implements Service {

    private int[] array;
    private List<String> userList;
    private Set<String> userSet;
    private Map<String, String> userMap;
    private Properties properties;

    public void setArray(int[] array) {
        this.array = array;
    }

    public void setUserList(List<String> userList) {
        this.userList = userList;
    }

    public void setUserSet(Set<String> userSet) {
        this.userSet = userSet;
    }

    public void setUserMap(Map<String, String> userMap) {
        this.userMap = userMap;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    @Override
    public void save(){
        System.out.println("数组遍历" + Arrays.toString(array));
        System.out.println("List遍历:" +userList);
        System.out.println("Set遍历" + userSet);
        System.out.println("Map遍历" + userMap);
        System.out.println("Properties遍历" + properties);

    }
}
```



### 数组的注入

使用setter注入的方式，继续使用`property`标签，name属性是Bean中的属性名，使用`array`标签来为这个数组赋值，`value`是具体的值

```xml
<property name="array">
    <array>
        <value>1</value>
        <value>2</value>
        <value>3</value>
    </array>
</property>
```



### List的注入

使用`list`标签标识这个属性，继续使用`value`标签来指定

```xml
<property name="userList">
    <list>
        <value>广州</value>
        <value>杭州</value>
        <value>上海</value>
    </list>
</property>
```



### Set集合注入

**使用`set`标签，继续使用`value`标签来赋值，在赋值时会自动过滤重复的元素**

```xml
<property name="userSet">
    <set>
        <value>广州</value>
        <value>杭州</value>
        <value>广州</value>
        <value>北京</value>
    </set>
</property>
```



### Map注入

Map注入的方式就开始有些不同了，因为Map是双列集合

使用`map`来标记这个Map，使用`entry`来标记一组键值对，用`key`和`value`来赋值

```xml
<property name="userMap">
    <map>
        <entry key="country" value="China"/>
        <entry key="province" value="Shandong"/>
        <entry key="city" value="Weihai"/>
        <entry key="city" value="Rongcheng"/>
    </map>
</property>
```



### Properties注入

Properties本质上与Map相同，但是注入的方式有些不同

**使用`props`标签来标记这个Properties，使用`prop`来标记一组键值对，在`prop`中直接使用key属性来指出key，value写在标签体中**

```xml
<property name="properties">
    <props>
        <prop key="country">China</prop>
        <prop key="province">shandogn</prop>
        <prop key="city">Binzhou</prop>
    </props>
</property>
```



综上：我们了解了常见集合的注入方式，这一部分只是做了解即可，我们真正开发中使用这种方式的概率很小。





## 数据源对象管理

对于第三方的对象，又应该如何管理。

我们平时用的比较多的第三方的对象就是数据库连接池对象，这个对象是第三方提供给我们的，对于这种对象，应该如何配置？

首先要知道这个第三方的对象是谁？叫什么名字？

```xml
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">

</bean>
```

对于一个数据库连接池对象，需要配置一些属性，比如说数据库驱动名、url、用户名、密码等

确定好要注入哪些属性，可以在Spring的配置文件中敲出一段，然后会有提示。

![image-20230101215930976](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230101215930976.png)



怎样来注入这些信息，就需要到这个类中去找构造方法或setter

打开这个类后，按Ctrl + F12（如果keymap是Eclipse那就是Ctrl+O)就会看到这个类的所有方法，然后就可以去看这个类的构造方法或setter，确定好了这个类是使用什么样的方式注入属性：构造器注入或setter注入？

![image-20230101220955822](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230101220955822.png)

确定好使用构造器还是setter注入后，即可在配置文件中书写





## 加载配置文件Properties

对于一些第三方工具的配置信息，比如数据库连接池，利用SPring配置文件就会造成过高的耦合，一般都会单独的定义一个`.properties`配置文件，在配置文件中写出配置信息，然后读取这个配置文件，这样只需要改动这个配置文件即可。

对于配置文件，Spring的配置文件中有一个单独的命名空间，我们需要自己开启

1. 开辟新的命名空间

一步一步地设置，首先将第一行的url复制一下，将里面的beans改成context，输入`xmlns:context`等于这个新的url

![image-20230101223543983](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230101223543983.png)

在`xsi:schemaLocation`这个属性中会有多个url，复制一下这两个url，将其中的beans替换成context，然后继续粘贴到这个属性中

![image-20230101224021912](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230101224021912.png)



2. 使用命名空间

在整个配置文件的根标签下，也就是`beans`目录下，使用`context`标签即可

![image-20230101224347765](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230101224347765.png)

使用location属性给出配置文件的位置，一般放在resources目录下

```xml
<context:property-placeholder location="jdbc.properties"/>
```



3. 使用配置占位符来注入属性

在需要注入属性的Bean的标签中，使用`${}`占位符来提供配置文件中的数据

注意：properties配置文件中的key是什么就要写什么

![image-20230101224942816](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230101224942816.png)

```xml
<bean id="testUser" class="com.service.impl.TestUser">
    <property name="url" value="${url}"/>
    <property name="password" value="${password}"/>
    <property name="username" value="${username}"/>
</bean>
```

看测试的结果

![image-20230101225133190](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230101225133190.png)

OK！到此，使用properties读取配置文件注入的方式就完成了

### 注意点

1. 不加载系统属性

如果你的properties配置文件中的value并没有加载成功，出现了value错误的情况，可能是你的系统环境变量中也有同名的属性，在运行时，**系统环境变量中的属性的优先级是要比我们自定义的配置文件的属性的优先级要高的。**此时就会对运行产生影响，那么就需要屏蔽掉系统的环境变量，只需要在配置文件的标签中加上这个属性`system-properties-mode`

```xml
<context:property-placeholder location="jdbc.properties" system-properties-mode="NEVER"/>

```

2. 如果配置文件有多个，那么如何加载呢？

只需要在location属性中用逗号隔开即可

```xml
<context:property-placeholder location="jdbc.properties,abc.properties" system-properties-mode="NEVER"/>
```

![image-20230101230056964](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230101230056964.png)



3. 加载所有的配置文件

如果配置文件有很多，都需要加载，那么就可以使用通配符`*`，来加载所有的配置文件

```xml
<context:property-placeholder location="*.properties" system-properties-mode="NEVER"/>
```



4. 配置文件中的配置信息同名

如果在两个配置文件中有相同名称的配置信息，那么在注入时会注入哪一个呢？

**就会按照加载的顺序，后面的配置文件会把前面配置文件的信息覆盖掉**



5. 加载Properties文件的标准格式

在配置文件的名称前面加上`classpath:`，代表类目录，**将类目录下的配置文件加载**

```xml
<context:property-placeholder location="classpath:*.properties"/>
```





6. 从类路径或jar包中加载配置文件

有些配置文件不仅仅在类路径下，第三方的jar包也有可能是有配置文件的。

> 类路径就是项目编译后，会有一个classes目录，这个目录下放生成的.class文件
>
> 利用Maven构建项目，resources目录下的配置文件会被放到classes目录下

只需要在`classpath`后面加一个`*`，这样类路径和jar包中的配置文件都可以读取到

```xml
<context:property-placeholder location="classpath*:*.properties"/>
```



## 总结/补充

对前面内容的补充！

### 容器

我们之前创建容器的方式就是直接读取项目中的配置文件

```java
ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
```

还有一种创建容器的方式：假如配置文件不在项目中，怎么加载配置文件来创建容器

**就需要用到`FileSystemXmlApplicationContext`这个实现类了，需要传入这个配置文件的绝对路径**

```java
ApplicationContext ctx = new FileSystemXmlApplicationContext("D:\\IDEA\\IDEA_Projects\\springTest\\src\\main\\resources\\applicationContext.xml");

```

对于这两种创建容器的方式，都可以直接传入多个配置文件的路径，会根据这两个配置文件合并成一个容器

```java
ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml","jdbc.xml");
```



### 获取Bean

1. 根据Bean名称获取

获取Bean的方式，前面遇到了这样的获取Bean的方式，每次都要强制类型转换，有些繁琐

```java
TestUser testUser = (TestUser) crx.getBean("testUser");
```

2. 使用Bean名称并指定类型

传入Bean类型的字节码对象，这样就省去了强制类型转换

```java
DBBean dbBean = ctx.getBean("dbBean", DBBean.class);
```

3. 根据类型获取

前面在学习自动装配时，有一个根据类型自动装配。

在获取Bean时，也有一个根据类型获取Bean，**但是前提需要保证：容器中只有一个某类型的Bean**

```java
DBBean bean = ctx.getBean(DBBean.class);
```



### BeanFactory

我们之前创建容器，都是通过`ApplicationContext`这个接口实现的，通过查看这个接口的继承体系

![image-20230102001308141](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230102001308141.png)

会发现有一个顶级接口BeanFactory，所有的实现类都是在这个顶级接口的基础上实现而来。

来测试一个BeanFactory这个类

```java
        Resource resource = new ClassPathResource("applicationContext.xml");
        BeanFactory bf = new XmlBeanFactory(resource);
```

我们在Bean的构造方法中设置打印语句

```java
public class DaoImpl{
  	DaoImpl() {
    	    System.out.println("无参构造已执行...");
    }
}
```

运行后，发现并没有打印这句话，说明这个Bean还没有被创建。

获取一下这个类

```java
Resource resource = new ClassPathResource("applicationContext.xml");
BeanFactory bf = new XmlBeanFactory(resource);
DaoImpl bean = bf.getBean(DaoImpl.class);
```

此时会发现构造方法中的打印语句输出出来了。

**证明：BeanFactory容器中的Bean是延迟加载的，并不会伴随容器的创建而创建，是随用随创建的**

**那么在ApplicationContext这个子接口中能否实现这个效果，只需要在对应的Bean上加一个`lazy-init`即可**

```xml
<bean id="daoImpl" class="com.dao.impl.DaoImpl" lazy-init="true"/>
```

此时使用ApplicationContext创建容器就会有这个Bean延迟加载的效果。





### 核心容器总结

总结一下前面学到的所有内容

#### 容器相关

- BeanFactory是IoC容器的顶级接口，使用这个接口初始化容器时，加载的Bean是延迟加载的
- ApplicationContext接口是Spring容器的核心接口，初始化时Bean会立即加载
- ApplicationContext接口提供基础的Bean的操作相关方法，通过子接口扩展其功能
- ApplicationContext接口常用的初始化类
  - ClassPathXmlApplicationContext类
  - FileSystemXmlAplictionContext类



#### Bean相关

![image-20230102003032327](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230102003032327.png)



#### 依赖注入相关

![image-20230102003105161](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230102003105161.png)



## 注解开发容器

### 注解开发定义Bean

使用配置的形式开发Bean的学习已经结束，为了**简化开发**，需要用到注解这种简化方式。

从Spring2.5之后，注解开发Bean的功能就已经非常完善了，Spring3.0之后的版本，可以使用纯注解的形式来开发了。



在配置的形式定义Bean时，需要在配置文件中使用`<bean>`标签来声明这个Bean，现在使用注解来开发Bean了，就不需要这个标签了，删除这个标签就行了。

**Spring提供了一个基础的注解，`@Component`使用这个注解来标识一个Bean类**

1. 在Bean类前使用**@Component**来标识，并给出这个Bean的名称，在获取Bean时，我们就可以通过这个名称来获取，可以理解为这个Bean的ID

```java
@Component("daoImpl")
public class DaoImpl implements Dao {

    @Override
    public void save() {
        System.out.println("DaoImpl save...");
    }

}
```

2. 配置文件中声明

我们使用了注解开发的形式，可以省略了`bean`标签，但是Spring并不知道我们的Bean使用了注解来标注，需要告诉IoC容器去扫描哪一个Bean类，IoC容器扫描到这个类上有`@Componet`注解后，就会将这个Bean加载到容器中。

所以我们需要告诉IoC容器去哪个位置找Bean

**注意：`component-scan`标签在context命名空间中**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"

       xmlns:context="http://www.springframework.org/schema/context"

       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd
">

    <context:component-scan base-package="com.dao.impl"/>
</beans>
```

3. 测试一下，现在使用Bean的名称就可以来获取Bean了

```java
ApplicationContext crx = new ClassPathXmlApplicationContext("applicationContext.xml");
DaoImpl daoImpl = (DaoImpl) crx.getBean("daoImpl");

System.out.println(daoImpl);
```

> **使用@Component标签来标注Bean类时，Bean的名称不可以重复呦！负责获取Bean时就会报错**
>
> 如果**使用@Component没有指定名称**，那么你在获取Bean时该怎么办呢？
>
> 答：**按照类型来获取Bean**（注意：此时容器中只能有一种此类型的Bean，否则也是获取不到的）





#### 衍生注解

对于`@Component`这个注解，Spring又衍生出了其他三个标签，分别用来表示不同层次的Bean

- `@Controller`：用于表现层Bean定义
- `@Service`：用于业务层Bean定义
- `Repository`：用于数据层Bean定义

这三个注解使用起来与`@Component`相同，只是用来区分不同层次的Bean，利于开发人员管理Bean

```java
@Repository("daoImpl")
public class DaoImpl implements Dao {

    @Override
    public void save() {
        System.out.println("DaoImpl save...");
    }

}
```



### 纯注解开发

Spring3.0升级了纯注解开发模式，不用写配置文件了，能够更快地加快开发效率。

既然不用写配置文件了，那么如何配置IoC容器呢？

使用类来管理IoC容器，使用定义的类来替换配置文件。

那么如何让Spring知道我们自定义的这个配置类呢？

**使用`@Configuration`注解来标识这个类**

```java
@Configuration
public class SpringConfig {
}
```

我们使用了注解来开发Bean，需要告诉配置文件去哪里扫描我们的Bean，对于配置类，依然是用注解的方式来配置IoC容器去哪里扫描Bean

**使用`@ComponentScan`来标注要扫描的位置**

```java
@Configuration
@ComponentScan("com.dao.impl")
public class SpringConfig {
}
```

没有了配置文件，如何获取IoC容器呢？

**使用ApplicationContext接口的AnnotationConfigApplicationContext实现类，将配置类作为参数传入**

```java
ApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);

DaoImpl daoImpl = (DaoImpl) ctx.getBean("daoImpl");
System.out.println(daoImpl);
```

得到了IoC容器之后，就可以正常使用了。

#### 总结

- `@Configuration`注解用来标注此类是一个配置类
- `@ComponentScan`用来设定Bean的扫描路径，这个注解只能添加一次，如果需要扫描多个路径，使用数组的形式给出即可

```java
@Configuration
@ComponentScan({"com.dao.impl","com.service.impl"})
public class SpringConfig {
}
```







### 注解开发Bean的作用范围

在配置文件中，使用scope属性来标识Bean是单例还是非单例，也就是Bean的作用范围，默认是单例的。

在注解开发中，使用`@Scope`注解来指出，有两个属性值

- singleton默认，单例
- prototype非单例

```java
@Repository("daoImpl")
@Scope("prototype")
public class DaoImpl implements Dao {

    @Override
    public void save() {
        System.out.println("DaoImpl save...");
    }

}
```



### 注解开发Bean的生命周期

在配置开发中，通过`init-method`和`destroy-method`方法来指定bean的初始化和销毁方法

或者通过实现`InitializingBean`, `DisposableBean`这两个接口来规范Bean的生命周期。

在注解中，只需要在自定义的方法上用注解来标注即可

- `@PostConstruct`标注初始化方法
- `@PreDestroy`标注销毁方法

```java
@Repository("daoImpl")
public class DaoImpl implements Dao {

    @Override
    public void save() {
        System.out.println("DaoImpl save...");
    }

    @PostConstruct
    public void init(){
        System.out.println("DaoImpl init ...");
    }

    @PreDestroy
    public void destroy(){
        System.out.println("DaoImpl destroy ...");
    }
}
```

来看测试代码

```java
AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);
DaoImpl daoImpl = (DaoImpl) ctx.getBean("daoImpl");
daoImpl.save();
ctx.close();
```

成功运行！

![image-20230103173335112](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230103173335112.png)



### 注解依赖注入

注解是为了简化开发，在配置文件开发时，需要我们为Bean指定id或name，然后使用构造器或者setter注入。

在注解依赖注入时，为了简化开发，直接使用了**自动装配**的模式。

**只需要在Bean的属性上使用`@Autowired`注解标注即可，就会自动按照类型来装配**

这是我们的配置类

```java
@Configuration
@ComponentScan({"com.dao.impl","com.service.impl"})
public class SpringConfig {
}
```

这是我们要注入的类

```java
@Repository()
public class DaoImpl implements Dao {

    @Override
    public void save() {
        System.out.println("DaoImpl save...");
    }

}
```

这是需要被注入的类，不用提供依赖注入的接口也是可以的，不用提供构造器或setter

```java
@Component("serviceImpl")
public class ServiceImpl implements Service {

    @Autowired
    private Dao dao;

    @Override
    public void save() {
        System.out.println("ServiceImpl is save ....");
        dao.save();
    }
}
```

测试

```java
AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);
Service serviceImpl = (Service) ctx.getBean("serviceImpl");

serviceImpl.save();
```

是可以正常运行的

如果有两个相同类型的Bean，会怎样？比如说有两个接口的实现类，在属性中直接依赖的是接口类型，此时会注入哪一个呢？

**此时按照类型注入是行不通的，此时就需要是按照名称装配了，为Bean起名称，保证属性名与Bean的名称一致，就会选择注入同名称的Bean。**

来看测试

这是需要注入依赖的Bean，依赖属性名叫daoImpl

```java
@Component("serviceImpl")
public class ServiceImpl implements Service {

    @Autowired
    private Dao daoImpl;

    @Override
    public void save() {
        System.out.println("ServiceImpl is save ....");
        daoImpl.save();
    }
}
```



这是一个Bean，这是需要注入的Bean，为此Bean起名称为daoImpl

```java
@Repository("daoImpl")
public class DaoImpl implements Dao {

    @Override
    public void save() {
        System.out.println("DaoImpl save...");
    }

}
```

这是另一个同类型的Bean，起名称为daoImpl2，此时这个Bean就不会被注入

```java
@Repository("daoImpl2")
public class DaoImpl2 implements Dao {

    @Override
    public void save() {
        System.out.println("DaoImpl save2...");
    }

}
```

测试代码
```java
AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);
Service serviceImpl = (Service) ctx.getBean("serviceImpl");

serviceImpl.save();
```

![image-20230103180910293](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230103180910293.png)





#### @Qualifier注解

只使用`@Autowired`注解来自动装配时，存在不严谨的情况。

此时使用`@Qualifier`注解来指定注入哪一个名称的Bean，这样更严谨。

还是上面的那个代码，我们将需要被注入依赖的类中添加这个`@Qualifier`注解

```java
@Component("serviceImpl")
public class ServiceImpl implements Service {

    @Autowired
    @Qualifier("daoImpl2")
    private Dao daoImpl;

    @Override
    public void save() {
        System.out.println("ServiceImpl is save ....");
        daoImpl.save();
    }
}
```

使用此注解来指定同类型的第二个Bean，看看运行效果哦

![image-20230103181432699](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230103181432699.png)

**注意：	**

- 自动装配是使用反射设计创建对象，并**暴力反射**对应属性为私有属性初始化数据，因此无需提供setter方法
- 自动装配建议使用无参构造方法创建对象（默认），如果不提供对应的构造方法，请提供唯一的构造方法
- `@Qualifier`注解是无法单独使用的，必须配合`@Autowired`注解同时使用



​                                 

#### 简单类型注入

对于简单数据类型（字符串和基本数据类型），如何注入？

只需要在属性上使用`@Value`注解来给出即可

```java
@Controller("user")
public class TestUser {
    @Value("LMK")
    private  String username;

    public void hello(){
        System.out.println("Hello , I am " + username);
    }
}
```



#### 配置文件注入

在配置开发中，需要在配置文件中写明配置文件的名称或路径。

在注解开发中，依然需要。

在配置类前，使用`@PropertySource`注解来引入配置文件，

```pro
url= jdbc:mysql://localhost:3306/db_dorm
username= root
password= root
```

Spring配置类，

```java
@Configuration
@ComponentScan({"com.dao.impl","com.service.impl"})
@PropertySource("jdbc.properties")
public class SpringConfig {
}
```

在Bean中需要注入配置文件属性的地方，继续使用`@Value`注解来引入值即可，使用`${}`引用配置文件中的key

```java
@Component("DBBean")
public class DBBean {


    @Value("${username}")
    private String username;

    @Value("${url}")
    private String url;

    @Value("${password}")
    private String password;

    @Override
    public String toString() {
        return "DBBean{" +
                "username='" + username + '\'' +
                ", url='" + url + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
```



**注意**：

- 如果需要导入多个配置文件，则可以在`@PropertySource`注解中使用数组引入

```java
@PropertySource({"jdbc.properties","abc.properties"})
```

- `@PropertySource`注解是不支持通配符`*`的，会将这个`*`作为配置文件的一部分而寻找配置文件

```java
// 报错，错误写法
@PropertySource({"*.properties"})
```

- `@PropertySource`注解是支持`classpath`这个配置的，但是在classpath后不可以跟通配符`*`

```java
@PropertySource({"classpath:jdbc.properties"})
```



### 注解管理第三方Bean

在配置方式管理第三方Bean中，管理方式与普通的Bean是相同的。

#### 获取第三方Bean

但是在注解开发中，因为我们是使用配置类来替代配置文件，所以需要在配置类中书写代码了。

**在配置类中定义一个获取该Bean的方法，在方法中直接将该Bean创建出来并返回，然后在此方法上使用`@Bean`注解标注**（类似于工厂模式）

比如说，我要管理一个数据库连接池的对象，则可以在配置类中这样写，直接在代码中注入依赖属性

```java
@Configuration
@ComponentScan({"com.dao.impl","com.service.impl"})
public class SpringConfig {

    @Bean("dataSource")
    public DataSource getDataSource() {
        DruidDataSource ds = new DruidDataSource();
        ds.setUrl("jdbc:mysql://localhost:3306/db");
        ds.setUsername("root");
        ds.setPassword("root");

        return ds;
    }
}
```

在开发中，要管理的第三方Bean有很多，如果每一个Bean都需要在配置类中写一个方法，就会导致配置类爆炸。

对于同类型的类，都会将这些获取Bean的方法整合到一个单独的类中，就会避免上述问题。

还是以上述代码为例，单独将该方法整合到一个类中。

```java
public class JdbcConfig {
    @Bean("dataSource")
    public DataSource getDataSource() {
        DruidDataSource ds = new DruidDataSource();
        ds.setUrl("jdbc:mysql://localhost:3306/db");
        ds.setUsername("root");
        ds.setPassword("root");

        return ds;
    }
}
```

那么如何在配置类中导入这个类呢？有两种方式

1. **第一种方式**

在这个单独的类上，继续使用`@Configuration`注解标注，在真正的配置类中去扫描这个类

```java
@Configuration
public class JdbcConfig {
    @Bean("dataSource")
    public DataSource getDataSource() {
        DruidDataSource ds = new DruidDataSource();
        ds.setUrl("jdbc:mysql://localhost:3306/db");
        ds.setUsername("root");
        ds.setPassword("root");

        return ds;
    }
}
```

配置类

```java
@Configuration
@ComponentScan({"com.config"})
public class SpringConfig {

}
```

测试代码，运行成功

```java
AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);
DataSource dataSource = (DataSource) ctx.getBean("dataSource");
System.out.println(dataSource);
```



2. **第二种方式**

对于上述方式，还是不建议使用，因为滥用了`@Configuration`，在扫描时也会造成混乱。

因此更推荐使用第二种方式

**在配置类上使用`@Import`注解来导入这个单独的类**

单独的类不要再使用`@Configuration`这个注解了

```java
public class JdbcConfig {
    
    @Bean("dataSource")
    public DataSource getDataSource() {
        DruidDataSource ds = new DruidDataSource();
        ds.setUrl("jdbc:mysql://localhost:3306/db");
        ds.setUsername("root");
        ds.setPassword("root");

        return ds;
    }
}
```

**配置类，使用`@Import`注解来导入这个类，多个类时使用数组即可**

```java
@Configuration
@Import({JdbcConfig.class})
public class SpringConfig {


}
```



#### 注解管理第三方Bean依赖注入

对于第三方Bean中的依赖注入，这样的信息直接写死了，而这些信息应该是配置或者传入的，抵制这样写

```java
public class JdbcConfig {
    
    @Bean("dataSource")
    public DataSource getDataSource() {
        DruidDataSource ds = new DruidDataSource();
        ds.setUrl("jdbc:mysql://localhost:3306/db");
        ds.setUsername("root");
        ds.setPassword("root");

        return ds;
    }
}
```

##### 简单类型注入

可以将这些属性单独的定义为类的私有属性，然后利用正常的方式注入即可。

还是上述的例子：获取数据库连接池对象

单独的类，**使用`@Value`注解注入类的成员属性，在注入时直接注入该成员即可**

```java
public class JdbcConfig {

    @Value("root")
    private String username;

    @Value("${url}")
    private String password;

    @Value("${url}")


    private String url;
    @Bean("dataSource")
    public DataSource getDataSource() {
        DruidDataSource ds = new DruidDataSource();
        ds.setUrl(url);
        ds.setUsername(username);
        ds.setPassword(password);

        return ds;
    }
}
```

配置类

```java
@Configuration
@Import({JdbcConfig.class})
@PropertySource({"classpath:jdbc.properties"})
public class SpringConfig {

}
```

以上就是简单类型依赖的注入



##### 引用类型注入

对于引用数据类型的依赖，如何注入?

**只需要在这个获取第三方Bean的方法中，使用形参给出这个引用类型即可，Spring 就会实现自动装箱（按照类型）**

举个例子：需要依赖DaoImpl这个引用类型的对象，则获取该Bean的方法应该这样写

```java
public class JdbcConfig {

    @Value("root")
    private String username;

    @Value("${url}")
    private String password;

    @Value("${url}")


    private String url;
    @Bean("dataSource")
    public DataSource getDataSource(Dao dao) {
        dao.save();
        DruidDataSource ds = new DruidDataSource();
        ds.setUrl(url);
        ds.setUsername(username);
        ds.setPassword(password);

        return ds;
    }
}
```

**前提是IoC容器中有这个类型的Bean才能按照类型注入，并且该类型的Bean唯一**

配置类

```java

@Configuration
@Import({JdbcConfig.class})
@PropertySource({"classpath:jdbc.properties"})
@ComponentScan("com.dao.impl")
public class SpringConfig {

}
```

测试一下

```java
AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);
DataSource dataSource = (DataSource) ctx.getBean("dataSource");
System.out.println(dataSource);
```

正常运行

![image-20230103230315090](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230103230315090.png)





### 注解开发总结

![image-20230103230458125](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230103230458125.png)



## 第三方技术整合

### Spring整合MyBatis

#### 整合思路

首先我们知道，Spring是一个管理Bean的容器，那么在MyBatis中，哪一个Bean需要交给Spring来管理。

分析MyBatis的基本代码，确定我们要用Spring管理哪一个对象？

![image-20230117210231808](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230117210231808.png)

> 每次的SqlSession对象是我们通过SqlSessionFactory获取的，而且系统每次与数据库的会话（每个会话就代表一个SQLSession对象）都是不能是同一个，SQLSession对象应该是根据系统的访问产生的，而且可能同时存在多个不同的SqlSession对象，这个所以说并不能直接管理SqlSession对象，应该管理的是获取SqlSession对象的对象——SqlSessionFactory



知道了接下啦需要管理的对象后，就看代码

#### 前提准备

1. 导入依赖

首先我们需要导入Spring操作数据库的包，与Spring的核心包版本尽量保持一致

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.2.10.RELEASE</version>
</dependency>
```

因为Spring要整合MyBatis，所以还要导入一个整合相关的包

> 这个包是MyBatis发布的，有些类似于JDBC，Java发布JDBC规范，各个数据库厂商自己实现驱动
>
> Spring对外公布相关接口，第三方机构根据接口来实现自身的整合

```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>3.0.1</version>
</dependency>
```



2. 创建数据库表

![image-20230117223023468](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230117223023468.png)

3. 创建对应的实体类

![image-20230117223101093](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230117223101093.png)

4. 创建Dao层接口

```java
public interface UserMapper {

    /**
     * 数据访问层，根据id来获取用户
     * @param id Integer
     * @return User
     */
    @Select("select * from t_user")
    User selectUserById(@Param("id") Integer id);

}
```

5. 创建Service层实现类

```java
@Service
public class UserService {

    @Autowired
    private UserMapper mapper;

    public void getUserById(Integer id){
        User user = mapper.selectUserById(id);
        System.out.println(user);
    }

}
```





#### 整合Mybatis

1. 首先是第三方数据源设置

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



2. 创建SqlSessionFactory的配置类，用来获取SqlSessionFactory对象

在MyBatis的整合包中，有一个新的类`SqlSessionFactoryBean`，通过这个类的源码可以看到，这个类实现了我们前面提到的`FacytoryBean`接口，是Spring规范的工厂接口，那么就可以通过`SqlSessionFactoryBean`这个类来获取`SqlSessionFactory`对象了。

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

3. 主配置类中引入这个MyBatis的配置类

```java
@Configuration
@Import({JdbcConfig.class,MyBatisConfig.class})
@PropertySource({"classpath:jdbc.properties"})
@ComponentScan("com")
public class SpringConfig {

}
```

4. 测试一下

```java
AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
UserService userService = context.getBean(UserService.class);
userService.getUserById(24);
```



#### 总结

1. 导入依赖

```xml
<!--Spring操作数据库的依赖-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.2.10.RELEASE</version>
</dependency>

<!--Spring整合MyBatis的依赖，注意与Spring、MyBatis的版本问题-->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>1.3.0</version>
</dependency>
```

2. 配置MyBatis

```java
public class MyBatisConfig {


    @Bean
    public SqlSessionFactoryBean sqlSessionFactoryBean(DataSource dataSource){
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
        mscf.setBasePackage("com.mapper");

        return  mscf;
    }

}
```

3. Spring 的核心配置类中导入MyBatis的配置类

```java
@Configuration
@ComponentScan({"com.config","com.service"})
@PropertySource({"classpath:jdbc.properties"})
@Import({JdbcConfig.class, MyBatisConfig.class})
public class SpringConfig {

}
```



### Spring整合Junit

1. 导入依赖

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

2. 在测试类上使用这两个注解

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class SpringMyBatisTest {
    
}
```

其中：

- `@RunWith`用来指定Junit测试类的运行器
- `@ContextConfiguration`用来指定Spring的配置类，加载Spring的核心配置

3. 常规使用即可

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class SpringMyBatisTest {

    @Autowired
    private UserService userService;
    
    
    @Test
    public void testMyBatis(){
        userService.getUserById(24);
    }
}
```



# AOP

Spring的两个核心概念：一个是IoC/DI，另一个就是AOP

其中IoC/DI的前面已经学习完成了。

### AOP简介

学习过面向对象编程(Object Oriented Programming)——OOP，这是一种编程思想。

那么这个AOP(Aspect Oriented Programming)就是面向切面编程，也是一种编程思想。

**AOP可以在不改动原有代码的基础上对其进行增强**

Spring理念：无侵入式编程



#### 基本概念

比较正规的说法是这样的：

* 连接点(JoinPoint)：程序执行过程中的任意位置，粒度为执行方法、抛出异常、设置变量等
  * 在SpringAOP中，理解为方法的执行
* 切入点(Pointcut):匹配连接点的式子
  * 在SpringAOP中，一个切入点可以描述一个具体方法，也可也匹配多个方法
    * 一个具体的方法:如com.itheima.dao包下的BookDao接口中的无形参无返回值的save方法
    * 匹配多个方法:所有的save方法，所有的get开头的方法，所有以Dao结尾的接口中的任意方法，所有带有一个参数的方法
  * 连接点范围要比切入点范围大，是切入点的方法也一定是连接点，但是是连接点的方法就不一定要被增强，所以可能不是切入点。
* 通知(Advice):在切入点处执行的操作，也就是共性功能
  * 在SpringAOP中，功能最终以方法的形式呈现
* 通知类：定义通知的类
* 切面(Aspect):描述通知与切入点的对应关系。



一般来说，在Java中一个功能就定义成一个方法，那么就可以这样来解释

- 连接点：可以用来增强的方法
- 切入点：要被增强的方法
- 通知：额外增强的功能
- 切面：通知与切入点之间的绑定关系
- 通知类：用来存放通知

![image-20230118232441515](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230118232441515.png)



#### 案例

利用注解的方式来做一个AOP入门案例。

1. 导入依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.2.10.RELEASE</version>
</dependency>

<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.4</version>
</dependency>
```

在导入`Spring-context`依赖时，Spring-Aop的依赖就会默认导入，除此之外还需要导入一个`aspect`的依赖。

![image-20230118234048213](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230118234048213.png)

> 导入AspectJ的jar包,AspectJ是AOP思想的一个具体实现，Spring有自己的AOP实现，但是相比于AspectJ来说比较麻烦，所以我们直接采用Spring整合ApsectJ的方式进行AOP开发。



2. 定义我们的连接点和切入点，给这其中的每一个方法增强：调用前先输出当前时间

```java
@Repository
public class DaoImpl implements Dao {

    @Override
    public void update() {
        System.out.println("update ....");
    }

    @Override
    public void deltete() {
        System.out.println("delete ....");
    }

    @Override
    public void save() {
        System.out.println("save ....");
    }
}
```



3. 制作通知类

```java
@Component
@Aspect
public class MyAdvice {

    /**
     * 切入点
     * 使用@Pointcut来定义一个切入点，使用execution来指明 （ 返回值类型 方法全路径)
     */
    @Pointcut("execution(void com.dao.impl.DaoImpl.save())")
    private void pt(){}

    /**
     * 增强的功能
     * 使用注解来设置增强的功能在切入点的什么位置执行
     */
    @Before("pt()")
    public void method(){
        System.out.println(System.currentTimeMillis());
    }

}
```

![image-20230118235224911](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230118235224911.png)

![image-20230118235605472](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230118235605472.png)



3. Spring的配置类

![image-20230118235848849](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230118235848849.png)



4. 测试一下

```java
ApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
Dao dao = context.getBean(Dao.class);
dao.save();
```

![image-20230119002824633](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230119002824633.png)



> 异常处理[getBean时无法获取](http://cn.voidcc.com/question/p-qbewysgg-bx.html)



### AOP执行流程

1. Spring容器启动
2. 读取所有切面配置的切入点，**读取完成了配置的切入点**（如果一个切入点定义了，但没有接入或使用，那么不会读取此切入点）

![image-20230119191425990](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230119191425990.png)

3. 初始化Bean

判断Bean中的方法是否匹配到任意切入点：

- 匹配失败，那就创建Bean对象

- 匹配成功，创建**原始对象**的**代理对象**

  ![image-20230119192145317](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230119192145317.png)

4. 获取Bean，执行方法



### AOP切入点表达式

我们刚才在`@Pointcut("")`中写的那一串，就是AOP切入点的表达式。

切入点：要增强的方法

切入点表达式：对切入点进行描述的式子

**语法格式**

```
动作关键字(访问修饰符 返回值类型 包名.类名/接口名.方法名(参数) 异常名)
```

```java
@Pointcut("execution(void com.dao.impl.DaoImpl.save())")
```

- 动作关键字：描述切入点的行为动作，例如execution表示执行到指定切入点
- 访问修饰符：public、private等，可以省略
- 返回值类型
- 异常名：方法中定义的抛出指定异常，可以省略

**对一个切入点的描述，可以是描述的接口中的方法，也可以是实现类中的方法，因为都是面向接口的编程，而且AOP动态代理也是面对的接口。**



**通配符**

如果使用上述的格式来一个一个描述切入点，非常繁琐，效率太低。

此时就可以使用通配符来对切入点进行批量的描述

- `*`：用来匹配**单个任意**的符号，可以独立出现，也可以作为前缀或后缀的匹配符来出现

```java
@Pointcut("execution(* com.*.dao.Serviec.find*(*))")
//返回值为任意类型  
// com包下的任意包中的Service类中的以find开头的方法，参数是一个任意类型
```

- `..`：用来匹配**多个任意**的符号，可以独立出现，通常用来描述包名和方法参数

```java
@Pointcut("execution(void com..UserService.findById(..))")
//匹配com任意包下的UserService类的findById方法，参数是多个任意参数
```

- `+`：专用于匹配子类类型

```java
@Pointcut("execution(* *..*Service+.*(..))")
// 返回值为任意类型
// 任意包下的以Service结尾的类名的子类中的任意方法
```



![image-20230119195234603](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230119195234603.png)



### AOP通知类型

根据AOP通知插入的位置不同，可以将通知分为5类

- 前置通知
- 后置通知
- 环绕通知(重点)
- 返回后通知(了解)
- 抛出异常后通知(了解)



#### 前置通知

前置通知就是在原始方法执行前，执行增强的功能

使用`@Before`注解来完成

```java
@Pointcut("execution(void com.dao.impl.DaoImpl.save())")
private void pt(){}

@Before("pt()")
public void method(){
    System.out.println(System.currentTimeMillis());
}
```



#### 后置通知

后置通知就是在原始方法执行完成后，再执行增强的功能

使用`@After`注解即可

```java
@Pointcut("execution(void com.dao.impl.DaoImpl.update())")
private void pt1(){}

@After("pt1()")
public void after(){
    System.out.println("after ....");
}
```



#### 环绕通知

通知在原始方法执行的前后都有执行，通知将原始方法包裹住了。

使用`@Around()`注解来完成，并在通知的方法中指定原始方法调用的位置。

**无参的原始方法**，我们可以这样来

1. 使用`@Around`注解通知
2. 通知方法中接收一个`ProceedingJointPoint`类型的对象，使用此对象的`proceed()`方法来表示原始方法的调用

![image-20230119211419267](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230119211419267.png)





如果**原始方法有返回值**，那么就不能这样来写了。

我们在调用原始方法时，肯定要接收这个返回值，所以要在通知方法中将原始方法的返回值返回。

![image-20230119211941776](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230119211941776.png)



#### 返回后通知

返回后通知：在原始方法**成功完成执行后**的增强的通知（如果原始方法发生了异常，此时就不会成功执行，此时就不会有返回后通知）

使用`@AfterReturning`注解来完成

![image-20230119212825995](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230119212825995.png)



#### 抛出异常后通知

在原始方法发生异常后的通知

使用`@AfterThrowing`注解来完成

![image-20230119213018403](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230119213018403.png)



### 获取原始方法信息

在进行环绕增强时，可能需要原始方法的信息，此时可以通过`ProceedingJoinPoint`参数来获取原始方法的签名信息。

在这个签名信息中可以获取到原始方法的信息。

![image-20230119222609224](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230119222609224.png)





![image-20230611125452648](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230611125452648.png)

![image-20230611125800397](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230611125800397.png)

### AOP获取数据

AOP获取原始方法的各种数据，可以分为这几种数据：

- 获取**切入点方法的参数**，所有的通知类型都可以获取参数
  - JoinPoint：适用于前置、后置、返回后、抛出异常后通知
  - ProceedingJoinPoint：适用于环绕通知
- 获取**切入点方法返回值**，前置和抛出异常后通知是没有返回值，后置通知可有可无，所以不做研究
  - 返回后通知
  - 环绕通知
- 获取**切入点方法运行异常信息**，前置和返回后通知是不会有，后置通知可有可无，所以不做研究
  - 抛出异常后通知
  - 环绕通知



#### 获取方法参数

对于除了环绕通知之外的所有类型的通知，都可以在通知方法中指定`JoinPoint`类型的参数，这个`JoinPoint`对象中封装了原始方法的信息，例如方法参数、签名信息、类型等。

![image-20230120173843984](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230120173843984.png)

如果是环绕通知，则需要通知方法中指定形参类型为`ProceedingJjoinPoint`

> ProceedingJoinPoint是JoinPoint的子接口，JoinPoint中的方法都可以在ProceedingJoinPoint身上调用

![image-20230120174411939](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230120174411939.png)

> 接收到原始方法的参数后，可以对原始的方法参数进行修改。
>
> 如果直接通过`proceed()`方法来执行原始方法，则会使用原始方法的默认参数来运行。
>
> 我们接收到原始方法的参数后，可以对参数进行处理，将处理后的参数数组作为参数`proceed()`方法执行
>
> ![image-20230120175510174](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230120175510174.png)



#### 获取返回值

获取方法的返回值，只有在方法成功执行后才可以获取，有两种方式。

- 一种是使用`@AfterReturning`返回后通知来接收
- 另一种是使用`@Around`环绕通知来接收



##### 返回后通知

使用`@AfterReturning`返回后通知来获取返回值，可以**在注解中指定一个返回值的接收名**

就可以**将返回后的返回值传递通知方法中的同名参数**

![image-20230120175816170](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230120175816170.png)

如果既想要使用`JoinPoint`来获取原始方法的信息，又想获取返回数据。

那么在方法参数中**JoinPoint一定要在接收返回值的同名参数之前**

![image-20230120180323830](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230120180323830.png)



##### 环绕通知

因为我们可以在环绕通知中直接调用原始方法，那么就可以获取到返回值。

![image-20230120210442337](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230120210442337.png)





#### 获取异常信息

获取原始方法发生异常时的信息，也是有两种方法

- 使用`@AfterThrowing`抛出异常后通知来获取异常信息
- 使用`@Around`环绕通知来获取异常信息



##### 抛出异常后通知

`@AfterThrowing`注解的使用，在注解中**指定接收异常对象的名称**

![image-20230120211249863](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230120211249863.png)

同样，如果需要想要获取原始方法的其他信息，则需要在定义形参时，将`JoinPoint`放在最前面

![image-20230120211523931](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230120211523931.png)





# Spring事务

## 事务简介

事务：在数据层保障一系列的数据库操作同成功或同失败。

Spring事务作用：在数据层或业务层保障一系列的数据库操作同成功或同失败。

在银行转账这一个业务，就可以看做一个事务，账户余额减少、账户余额增加应该是同步的，若某一个环节出现问题，事务应该回滚。



Spring为了管理事务，提供了一个平台事务管理器`PlatformTransactionManager`


![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/1630243651541.png)

commit是用来提交事务，rollback是用来回滚事务。

PlatformTransactionManager只是一个接口，Spring还为其提供了一个具体的实现:
![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/1630243993380.png)

从名称上可以看出，我们只需要给它一个DataSource对象，它就可以帮你去在业务层管理事务。**其内部采用的是JDBC的事务**。

所以说如果你持久层采用的是JDBC相关的技术，就可以采用这个事务管理器来管理你的事务。

而Mybatis内部采用的就是JDBC的事务，所以后期我们Spring整合Mybatis就采用的这个DataSourceTransactionManager事务管理器。



## 步骤

1. 配置一个事务管理器

利用Spring提供的`PlatformTransactionManager`接口，以及Spring提供的实现类`DataSourceTransactionManager`，实现JDBC管理事务的功能。

```java
/**
 * 事务管理器
 * @param ds DataSource 数据源对象
 * @return PlatformTransactionManager
 */
@Bean
public PlatformTransactionManager transactionManager(DataSource ds) {
    DataSourceTransactionManager tm = new DataSourceTransactionManager();
    tm.setDataSource(ds);
    return tm;
}
```

2. 在接口上声明为事务

```java
public interface AccountService {

    @Transactional
    void transfrom(Account accountReduce, Account accountAdd, Integer money);

    Account selectAccount(Integer id);

}
```

`@Transactional`注解是声明该接口中的所有方法或某个方法接收事务管理器的管理。

`@Transactional`注解可以是声明在接口或类名上，也可以声明在具体的方法上。

为了降低耦合性，会在业务层的接口上声明，不要在实现类上声明。

```java
@Transactional
public interface AccountService {

    void transfrom(Account accountReduce, Account accountAdd, Integer money);

    Account selectAccount(Integer id);

}
```



3. 在Spring的配置类上开启事务管理

使用`@EnableTransactionManagement`注解

```java
@Configuration
@ComponentScan({"com"})
@PropertySource({"classpath:jdbc.properties"})
@Import({JdbcConfig.class,MybatisConfig.class})
@EnableTransactionManagement
public class SpringConfig {
}
```



这三个步骤，就实现了一个简单的Spring管理事务，这样当业务发生异常时，就会自动回滚。



## Spring事务角色

![image-20230122204234351](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230122204234351.png)



在银行转账的案例中，业务层调用转账方法，此时业务层就会去调用数据层的 增加余额 和减少余额两个方法，但是这两个方法是单独的增删改，所以会单独为每一个方法开启一个事务。当第二个事务发生异常时，此时第一个业务并不会回滚，因为这是两个独立的事务。整个转账业务中有两个独立的事务。

**当在业务层添加了`@Transactional`注解后，就会开启Spring的事务管理。此时就会为业务层的转账业务开启一个事务，将数据层的两个独立的事务（增加余额、减少余额）加入到此事务中，此时就可以统一管理增加余额、减少月余额两个功能了，此时转账业务中只有一个事务，达到了转账业务管理的要求**

![image-20230122205052776](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230122205052776.png)



到此，就有了Spring中事务的两个角色。

- 事务管理员：事务的发起方，在Spring中通常指代业务层开启事务的方法
- 事务协调员：加入事务方，在Spring中通常指代数据层方法，也可以是业务层方法

**注意：目前的Spring的`DataSourceTransactionManager`使用的`DataSource`对象与`SqlSessionFactoryBean`是同一个，否则Spring无法管理事务**



## 事务配置

在Spring的事务管理中，提供了如下配置，这些配置都可以在注解中开启。

![image-20230122205605807](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230122205605807.png)

在`@Transactional`注解上开启。

* readOnly：true只读事务，false读写事务，增删改要设为false,查询设为true。

* timeout:设置超时时间单位秒，在多长时间之内事务没有提交成功就自动回滚，-1表示不设置超时时间。

在这些配置中，有一个配置非常重要`rollbackFor`设置事务回滚异常。

**在`@Transactional`中，并不是所有的事务都会回滚：Spring的事务只会对`Error异常`和`RuntimeException异常`及其子类进行事务回顾，其他的异常类型是不会回滚的**

![image-20230122214638995](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230122214638995.png)

当业务中发生不可回滚的异常时，就会导致业务的运行出错，此时可以使用`rollbackFor`属性来指定某异常发生时要回滚。

```java
@Transactional(rollbackFor = IOException.class)
public interface AccountService {

    void transfrom(Account accountReduce, Account accountAdd, Integer money);

    Account selectAccount(Integer id);

}
```

此时当业务中出现`IOException`时，Spring就会回滚。



## 事务的传播行为

先来看一小案例，在银行转账业务中，需要对操作进行日志记录，无论操作是否成功，都需要进行日志记录。

此时可以重新定义一个日志的模块，在转账业务中去调用日志的功能。

这是我们的转账业务，为了保证无论是否发生异常都要执行记录日志的功能，使用了`try..finally..`的结构。

```java
@Service
public class ServiceImpl implements AccountService {

    @Autowired
    private AccountDao dao;

    @Autowired
    private LogService log;

    @Override
    public void transfrom(Account accountReduce, Account accountAdd, Integer money) throws IOException {

        try{
            dao.moneyReduce(accountReduce.getId(), money);
            dao.moneyAdd(accountAdd.getId(), money);
        }finally {
            log.insertLog(accountReduce.getId(),accountAdd.getId(),money);
        }

    }

    @Override
    public Account selectAccount(Integer id) {
        return dao.selectById(id);
    }
}
```

这是日志的代码

```java
public interface LogService {

    @Transactional
    void insertLog(Integer id1, Integer id2, Integer money);
}
```

当没有异常发生时，此功能是正常的，但是当异常发生时，日志并没有被记录。

这是因为：事务管理员与事务协调员的关系。

转账业务会开启三个事务：余额增加、余额减少、日志记录，这是三个事务协调员。

当事务管理员开启了事务之后，这三个事务协调员就加入到了转账这一个业务中去了，成为了一个事务，此时当异常发生时，就会回滚，导致日志就不会被记录。

![image-20230122222112873](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230122222112873.png)

这就是事务的传播行为：**事务管理员与事务协调员的关系，事务协调员员要不要加入到事务管理员中去**

可以在事务协调员身上使用`@Transactional`注解中的`propagation`属性来管理：当前事务与事务管理员的关系。

![image-20230122222349806](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230122222349806.png)

![image-20230122222747435](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230122222747435.png)

















































