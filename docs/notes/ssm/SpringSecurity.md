## 简介

SpringSecurity是一个**认证、鉴权**的安全框架。

- 认证：鉴别用户身份
- 鉴权：用户的操作是否有这个权限



## 快速入门

### 准备工作

首先要搭建一个SpringBoot项目

1. 设置父工程，添加依赖

```xml
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.9</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>2.7.8</version>
        </dependency>
    </dependencies>
```



2. 创建控制器

```java
package com.liumingkai.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月10日 13:07
 */
@RestController
public class HelloController {
    
    @RequestMapping("/hello")
    public String hello(){
        return "hello springsecurity";
    }
    
}

```



3. 创建启动器

```java
package com.liumingkai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月10日 13:04
 */
@SpringBootApplication
public class SpringSecurityApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringSecurityApplication.class);
    }

}

```

运行项目，访问我们的Controller，正常。

![image-20230410131300775](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230410131300775.png)

至此，前提准备工作已经搭建完成。



### 引入SpringSecurity

在项目中引入SpringSecurity

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
```

重新启动项目，然后重新访问我们的控制器，但是发现让我们登录，跳转到了登录页面`/login`

![image-20230410131645713](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230410131645713.png)

此时SpringSecurity已经整合完成了。

默认生成了用户名和密码，

默认的用户名是user，密码是在控制台

![image-20230410131806701](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230410131806701.png)

登录后，就跳转到了我们要访问的页面

![image-20230410131900853](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230410131900853.png)

同时，还自带了一个退出登录的接口，`/logout`

![image-20230410131959487](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230410131959487.png)

退出之后，再次访问控制器，又需要重新登录。



## 前提依赖

此项目用到的所有依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.10</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.liumingkai</groupId>
    <artifactId>SpringSecurity</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>SpringSecurity</name>
    <description>SpringSecurity</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <!--fastjson依赖-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.33</version>
        </dependency>
        <!--jwt依赖-->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt</artifactId>
            <version>0.9.0</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.3.0</version>
        </dependency>

        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
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





## 认证



### 登录校验流程

原理流程图分析

![image-20230410133537907](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230410133537907.png)





### 调整

1. SpringSecurity默认生成的登录和退出是具有页面的，但是我们在前后端分离的模式下，是不需要登录页面的，**只要有一个登录接口就好了。**
2. SpringSecurity默认是基于Session来完成校验的，我们需要改为JWT
3. 去数据库查询用户，实现真正的校验。

如何去调整，调整这个安全框架？

SpringSecurity中提供了很多的实现类，我们只需要了解这些实现类的作用。



### 原理

#### SpringSecurity的完整流程

SpringSecurity的原理其实就是一个过滤器链，内部包含了提供各种功能的过滤器。

其中大致是这样的：

![image-20230410223753186](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230410223753186.png)

三个比较常用的过滤器的：

- **UsernamePasswordAuthenticationFilter**:负责处理用户名和密码校验的一个过滤器
- **ExceptionTranslationFilter：**处理过滤器链中抛出的任何AccessDeniedException和AuthenticationException异常，都交给此处理器处理。 
- **FilterSecurityInterceptor：**负责最后的权限校验的过滤器



**我们可以通过Debug的方式来查看所有的过滤器，以及其顺序**

![image-20230410224011174](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230410224011174.png)







### 认证原理分析

对于单独的验证这一个环节，就是对用户名和密码验证的这一环节，具体是怎么实现的。

认证是由SpringSecurity过滤器链中的UsernamePasswordAuthenticationFilter这个过滤器实现。

这个过滤器是如何实现验证的？

这个过程中用到的接口

流程是这样的：理解就好

当UsernamePasswordAuthenticationFilter这个过滤器接收到用户请求时，首先会将请求中的用户名和密码封装到一个Authentication的对象中，将这个Authentication对象作为参数传递给AuthenticationManager接口的autheticate()方法进行校验，AuthenticationManager接口调用AbastractUserDetailsAuthenticationProvider的authencicate()方法，此此方法中，通过调用UserDetailsService来获取数据库中真实的用户信息，UserDetailsService会将用户信息封装成一个UserDetails对象，AbstractUserDetailsAuthencicationProvider中会对Authentication对象和UserDetails对象进行对比，如果验证通过，就将Authentication对象返回，并将UserDetails对象身上的权限信息设置到Authentication对象身上，最终Authentication对象返回到UsernamePasswordAuthenticationFilter对象中，将Authentication设置到SecurityContext上下文对象中，以便后续的过滤器在上下文中获取用户的权限信息。	

![image-20230411193509406](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230411193509406.png)





用到的接口：

- Authentication接口: 封装用户请求信息，表示当前访问的用户。

- AuthenticationManager接口：定义了认证Authentication的方法，是认证相关的核心接口，也是发起认证的出发点，因为在实际需求中，我们可能会允许用户使用用户名+密码登录，同时允许用户使用邮箱+密码，手机号码+密码登录，甚至，可能允许用户使用指纹登录（还有这样的操作？没想到吧），所以说AuthenticationManager一般不直接认证，AuthenticationManager接口的常用实现类ProviderManager 内部会维护一个List列表，存放多种认证方式，实际上这是委托者模式的应用（Delegate）。也就是说，核心的认证入口始终只有一个：AuthenticationManager

  AuthenticationManager，ProviderManager ，AuthenticationProvider…

  用户名+密码（UsernamePasswordAuthenticationToken），邮箱+密码，手机号码+密码登录则对应了三个AuthenticationProvider

- UserDetailsService接口：加载用户真实数据的核心接口，查询数据库，将真正的用户信息封装到UserDetails的对象中。

- UserDetails接口：提供核心用户信息。通过UserDetailsService根据用户名获取处理的用户信息要封装成UserDetails对象返回。

默认的UserDetailsService的实现类是InMemoryUserDetailsManager，这个实现类会去内存中找默认的用户名和密码，所以我们要实现真实的校验，需要自己实现UserDetailsService接口，在接口中通过数据库来查询，还需要自己实现UserDetails接口来封装数据库中的用户信息。

所以，我们要想真正实现自定义的登录认证，需要做的事情是：

1. 自定义登录接口，也就是我们需要自己实现一个类似于UsernamePasswordAuthencicationFilter的实现类

   在这个实现类中，我们需要实现

   调用ProviderManager进行认证，如果认证成功通过生成Jwt，

   把用户信息存入redis中

2. 自定义UserDetailsService

   实现去获取数据库中真实的用户信息，包括用户名、密码、权限信息等

3. 自定义UserDetails

   用来封装用户的数据库查询信息

4. 存入SecurityContextHolder







### 实现数据库查询

自定义mapper接口

```java
package com.liumingkai.mapper;

import com.liumingkai.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

    @Select("select * from tb_user where userName = #{userName}")
    public User getUserByUserName(@Param("userName") String userName);

}

```

启动类开启mapper扫描

```java
package com.liumingkai;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.liumingkai.mapper")
public class SpringSecurityApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringSecurityApplication.class, args);
    }

}
```



我们要实现从数据库中获取信息，需要重写UserDetailService这个接口，实现里面的loadUserByUsername()这个方法。

```java
package com.liumingkai.service;

import com.liumingkai.dao.UserMapper;
import com.liumingkai.domain.LoginUser;
import com.liumingkai.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * 查询数据库用户
 *
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月17日 20:22
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //TODO 查询用户信息
        User user = userMapper.getUserByUserName(username);
        // 如果查询结果为null,抛出异常
        if (user == null) {
            throw new RuntimeException("用户名或密码错误！你妹的");
        }
        // TODO 查询用户权限信息

        return new LoginUser(user);
    }
}

```

为了封装数据库查询出来的信息，我们也需要实现UserDetail接口，用来封装我们的真实信息。

```java
package com.liumingkai.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月17日 20:21
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginUser implements UserDetails {

    private User user;

    /**
     * 获取权限信息的方法,目前先设置为null
     *
     * @return
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUserName();
    }

    /**
     * 账户是否没有过期
     *
     * @return
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * 账户是否没有被锁定
     *
     * @return
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * 证书是否没有过期
     *
     * @return
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 用户是否可用
     *
     * @return
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}

```



默认的流程中，在AbastractUserDetailsAuthenticationProvider接口中，也就是实现类DaoAuthenticationProvider中，默认使用PasswordEncoder来进行Authentication对象和UserDetails对象的密码校验，这个PasswordEncoder对象要求数据库中存储的密码格式是：

```sh
{id}passwordText
```

其中：

- `{id}`是数据库密码字段的加密算法的标识

PasswordEncoder会根据id去判断密码的加密方式，然后进行校验。

但是这种方式不推荐，所以我们需要替换掉PasswordEncoder。

**我们一般采用SpringSecurity提供的BCryptPasswordEncoder类来进行加密、校验。**

我们只需要使用把BCryptPasswordEncoder对象注入Spring容器中，SpringSecurity就会使用该PasswordEncoder来进行密码校验。

我们可以定义一个SpringSecurity的配置类，SpringSecurity要求这个配置类要继承WebSecurityConfigurerAdapter。

BCryptPasswordEncoder中的方法

```java
// 加密方法，会将明文加密后的密文返回
// 同一字符串,加密出来的密文是不同的
// 因为会采用随机生成盐值的方式来加密
public String encode(CharSequence rawPassword) ;

// 校验方法,校验通过会返回true
// 第一个参数是 请求参数中的明文
// 第二个参数是 数据库中存储的密文
public boolean matches(CharSequence rawPassword, String encodedPassword) ;
```

配置BCryptPasswordEncoder的Bean

```java
/**
 * @Author 三更  B站： https://space.bilibili.com/663528522
 */
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
```

**为了保证BCryptPasswordEncoder对象能够完成正确的校验，我们需要在用户注册时，使用这个对象来对密码字段进行加密，这样在校验时，才会通过。**

这样就实现了我们从数据库中查询用户信息，并完成验证。



#### 数据库查询总结

- 自定义实现UserDetailsService接口，实现数据库查询用户的操作
- 自定义实现UserDetails接口，以便用来封装用户信息



## 实现登录

为了后续的能够客户端的请求携带Token，所以我们要有一个自定义的登录Controller，这个Controller是不需要过滤就能访问的，让springsecurity对登录的请求放行，

然后我们在这个Controller中直接调用前面提到的UsernamePasswordFilter流程中的ProviderManager的authenticate()方法来实现数据库校验，然后根据userid生成token，响应给前端。

为了能实现统一响应，我们需要封装响应消息

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseResult<T> {
    private Integer code;

    private String msg;

    private T data;
}
```

SpringSecurity将AuthenticationManager提供出来，在SpringSecurity中获取ProviderManager，

```java
@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * 将AuthenticationManager提供出来
     * @return
     * @throws Exception
     */
    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
    
    
    public PasswordEncoder passwordEncoder() {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder;
    }
}
```

JWT工具类

```java
package com.liumingkai.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

/**
 * JWT工具类
 */
public class JwtUtil {

    //有效期为
    public static final Long JWT_TTL = 60 * 60 * 1000L;// 60 * 60 *1000  一个小时
    //设置秘钥明文
    public static final String JWT_KEY = "liumingkai";

    public static String getUUID() {
        String token = UUID.randomUUID().toString().replaceAll("-", "");
        return token;
    }

    /**
     * 生成jtw
     *
     * @param subject token中要存放的数据（json格式）
     * @return
     */
    public static String createJWT(String subject) {
        JwtBuilder builder = getJwtBuilder(subject, null, getUUID());// 设置过期时间
        return builder.compact();
    }

    /**
     * 生成jtw
     *
     * @param subject   token中要存放的数据（json格式）
     * @param ttlMillis token超时时间
     * @return
     */
    public static String createJWT(String subject, Long ttlMillis) {
        JwtBuilder builder = getJwtBuilder(subject, ttlMillis, getUUID());// 设置过期时间
        return builder.compact();
    }

    private static JwtBuilder getJwtBuilder(String subject, Long ttlMillis, String uuid) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        SecretKey secretKey = generalKey();
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        if (ttlMillis == null) {
            ttlMillis = JwtUtil.JWT_TTL;
        }
        long expMillis = nowMillis + ttlMillis;
        Date expDate = new Date(expMillis);
        return Jwts.builder()
                .setId(uuid)              //唯一的ID
                .setSubject(subject)   // 主题  可以是JSON数据
                .setIssuer("sg")     // 签发者
                .setIssuedAt(now)      // 签发时间
                .signWith(signatureAlgorithm, secretKey) //使用HS256对称加密算法签名, 第二个参数为秘钥
                .setExpiration(expDate);
    }

    /**
     * 创建token
     *
     * @param id
     * @param subject
     * @param ttlMillis
     * @return
     */
    public static String createJWT(String id, String subject, Long ttlMillis) {
        JwtBuilder builder = getJwtBuilder(subject, ttlMillis, id);// 设置过期时间
        return builder.compact();
    }

    /**
     * 生成加密后的秘钥 secretKey
     *
     * @return
     */
    public static SecretKey generalKey() {
        byte[] encodedKey = Base64.getDecoder().decode(JwtUtil.JWT_KEY);
        SecretKey key = new SecretKeySpec(encodedKey, 0, encodedKey.length, "AES");
        return key;
    }

    /**
     * 解析
     *
     * @param jwt
     * @return
     * @throws Exception
     */
    public static Claims parseJWT(String jwt) throws Exception {
        SecretKey secretKey = generalKey();
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(jwt)
                .getBody();
    }
}
```

Redis的配置

```java
package com.liumingkai.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * Redis配置类
 *
 */
@Configuration
public class RedisConfig {

    @Bean
    @SuppressWarnings(value = { "unchecked", "rawtypes" })
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory connectionFactory)
    {
        RedisTemplate<Object, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        FastJsonRedisSerializer serializer = new FastJsonRedisSerializer(Object.class);

        // 使用StringRedisSerializer来序列化和反序列化redis的key值
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(serializer);

        // Hash的key也采用StringRedisSerializer的序列化方式
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(serializer);

        template.afterPropertiesSet();
        return template;
    }
}
```

FastJSon的序列化器

```java
package com.liumingkai.config;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.parser.ParserConfig;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.SerializationException;

import java.nio.charset.Charset;

/**
 * Redis使用FastJson序列化
 * 
 * @author sg
 */
public class FastJsonRedisSerializer<T> implements RedisSerializer<T>
{

    public static final Charset DEFAULT_CHARSET = Charset.forName("UTF-8");

    private Class<T> clazz;

    static
    {
        ParserConfig.getGlobalInstance().setAutoTypeSupport(true);
    }

    public FastJsonRedisSerializer(Class<T> clazz)
    {
        super();
        this.clazz = clazz;
    }

    @Override
    public byte[] serialize(T t) throws SerializationException
    {
        if (t == null)
        {
            return new byte[0];
        }
        return JSON.toJSONString(t, SerializerFeature.WriteClassName).getBytes(DEFAULT_CHARSET);
    }

    @Override
    public T deserialize(byte[] bytes) throws SerializationException
    {
        if (bytes == null || bytes.length <= 0)
        {
            return null;
        }
        String str = new String(bytes, DEFAULT_CHARSET);

        return JSON.parseObject(str, clazz);
    }


    protected JavaType getJavaType(Class<?> clazz)
    {
        return TypeFactory.defaultInstance().constructType(clazz);
    }
}
```

Redis的工具类
```java
package com.liumingkai.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.BoundSetOperations;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.TimeUnit;

@SuppressWarnings(value = { "unchecked", "rawtypes" })
@Component
public class RedisCache
{
    @Autowired
    public RedisTemplate redisTemplate;

    /**
     * 缓存基本的对象，Integer、String、实体类等
     *
     * @param key 缓存的键值
     * @param value 缓存的值
     */
    public <T> void setCacheObject(final String key, final T value)
    {
        redisTemplate.opsForValue().set(key, value);
    }

    /**
     * 缓存基本的对象，Integer、String、实体类等
     *
     * @param key 缓存的键值
     * @param value 缓存的值
     * @param timeout 时间
     * @param timeUnit 时间颗粒度
     */
    public <T> void setCacheObject(final String key, final T value, final Integer timeout, final TimeUnit timeUnit)
    {
        redisTemplate.opsForValue().set(key, value, timeout, timeUnit);
    }

    /**
     * 设置有效时间
     *
     * @param key Redis键
     * @param timeout 超时时间
     * @return true=设置成功；false=设置失败
     */
    public boolean expire(final String key, final long timeout)
    {
        return expire(key, timeout, TimeUnit.SECONDS);
    }

    /**
     * 设置有效时间
     *
     * @param key Redis键
     * @param timeout 超时时间
     * @param unit 时间单位
     * @return true=设置成功；false=设置失败
     */
    public boolean expire(final String key, final long timeout, final TimeUnit unit)
    {
        return redisTemplate.expire(key, timeout, unit);
    }

    /**
     * 获得缓存的基本对象。
     *
     * @param key 缓存键值
     * @return 缓存键值对应的数据
     */
    public <T> T getCacheObject(final String key)
    {
        ValueOperations<String, T> operation = redisTemplate.opsForValue();
        return operation.get(key);
    }

    /**
     * 删除单个对象
     *
     * @param key
     */
    public boolean deleteObject(final String key)
    {
        return redisTemplate.delete(key);
    }

    /**
     * 删除集合对象
     *
     * @param collection 多个对象
     * @return
     */
    public long deleteObject(final Collection collection)
    {
        return redisTemplate.delete(collection);
    }

    /**
     * 缓存List数据
     *
     * @param key 缓存的键值
     * @param dataList 待缓存的List数据
     * @return 缓存的对象
     */
    public <T> long setCacheList(final String key, final List<T> dataList)
    {
        Long count = redisTemplate.opsForList().rightPushAll(key, dataList);
        return count == null ? 0 : count;
    }

    /**
     * 获得缓存的list对象
     *
     * @param key 缓存的键值
     * @return 缓存键值对应的数据
     */
    public <T> List<T> getCacheList(final String key)
    {
        return redisTemplate.opsForList().range(key, 0, -1);
    }

    /**
     * 缓存Set
     *
     * @param key 缓存键值
     * @param dataSet 缓存的数据
     * @return 缓存数据的对象
     */
    public <T> BoundSetOperations<String, T> setCacheSet(final String key, final Set<T> dataSet)
    {
        BoundSetOperations<String, T> setOperation = redisTemplate.boundSetOps(key);
        Iterator<T> it = dataSet.iterator();
        while (it.hasNext())
        {
            setOperation.add(it.next());
        }
        return setOperation;
    }

    /**
     * 获得缓存的set
     *
     * @param key
     * @return
     */
    public <T> Set<T> getCacheSet(final String key)
    {
        return redisTemplate.opsForSet().members(key);
    }

    /**
     * 缓存Map
     *
     * @param key
     * @param dataMap
     */
    public <T> void setCacheMap(final String key, final Map<String, T> dataMap)
    {
        if (dataMap != null) {
            redisTemplate.opsForHash().putAll(key, dataMap);
        }
    }

    /**
     * 获得缓存的Map
     *
     * @param key
     * @return
     */
    public <T> Map<String, T> getCacheMap(final String key)
    {
        return redisTemplate.opsForHash().entries(key);
    }

    /**
     * 往Hash中存入数据
     *
     * @param key Redis键
     * @param hKey Hash键
     * @param value 值
     */
    public <T> void setCacheMapValue(final String key, final String hKey, final T value)
    {
        redisTemplate.opsForHash().put(key, hKey, value);
    }

    /**
     * 获取Hash中的数据
     *
     * @param key Redis键
     * @param hKey Hash键
     * @return Hash中的对象
     */
    public <T> T getCacheMapValue(final String key, final String hKey)
    {
        HashOperations<String, String, T> opsForHash = redisTemplate.opsForHash();
        return opsForHash.get(key, hKey);
    }

    /**
     * 删除Hash中的数据
     * 
     * @param key
     * @param hkey
     */
    public void delCacheMapValue(final String key, final String hkey)
    {
        HashOperations hashOperations = redisTemplate.opsForHash();
        hashOperations.delete(key, hkey);
    }

    /**
     * 获取多个Hash中的数据
     *
     * @param key Redis键
     * @param hKeys Hash键集合
     * @return Hash对象集合
     */
    public <T> List<T> getMultiCacheMapValue(final String key, final Collection<Object> hKeys)
    {
        return redisTemplate.opsForHash().multiGet(key, hKeys);
    }

    /**
     * 获得缓存的基本对象列表
     *
     * @param pattern 字符串前缀
     * @return 对象列表
     */
    public Collection<String> keys(final String pattern)
    {
        return redisTemplate.keys(pattern);
    }
}
```



创建UserService接口，其中定义登录服务方法

```java
public interface IUserService {
    ResponseResult login(User user);
}
```

UserService实现类

```java
package com.liumingkai.service.impl;

import com.liumingkai.domain.LoginUser;
import com.liumingkai.domain.ResponseResult;
import com.liumingkai.domain.User;
import com.liumingkai.service.IUserService;
import com.liumingkai.utils.JwtUtil;
import com.liumingkai.utils.RedisCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月17日 22:52
 */
@Service
public class UserServiceImpl implements IUserService {

    // TODO 注入AuthenticationManager
    @Autowired
    AuthenticationManager authenticationManager;

    // TODO将Redis工具类对象注入
    @Autowired
    RedisCache redisCache;

    @Override
    public ResponseResult login(User user) {
        // TODO 将用户请求信息封装到Authentication中
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword());
        // 进行验证
        Authentication authenticate = authenticationManager.authenticate(authenticationToken);
        // 如果认证失败，返回对应的提示
        if (authenticate == null) {
            throw new RuntimeException("用户名或密码错误!滚！");
        }
        // 认证通过,生成token, 将token封装到响应结果中
        // 根据userid生成jwt，目前请求参数中的username不是userid
        // 获取UserDetails对象,其中封装了数据库中查询出来的User
        LoginUser userDetails = (LoginUser) authenticate.getPrincipal();
        String uid = userDetails.getUser().getId().toString();
        String jwt = JwtUtil.createJWT(uid);
        // 目标的响应格式是 token : jwt
        Map<String, String> map = new HashMap<String, String>();
        map.put("token", jwt);
        // TODO 将token存入redis中
        redisCache.setCacheObject("login:" + uid, userDetails);
        return new ResponseResult(200, "登录成功", map);
    }
}

```



最后，配置SpringSecurity，进行放行

```java
package com.liumingkai.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月17日 22:50
 */
@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //关闭csrf
                .csrf().disable()
                //不通过Session获取SecurityContext
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                // 对于登录接口 允许匿名访问
                .antMatchers("/user/login").anonymous()
                // 除上面外的所有请求全部需要鉴权认证
                .anyRequest().authenticated();
    }

    /**
     * 将AuthenticationManager提供出来
     *
     * @return
     * @throws Exception
     */
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


    /**
     * 密码校验器
     *
     * @return
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder;
    }
}
```

目前我们能获取到后端返回的token



### 登录总结

- Controller实现登录的接口
- Service层实现登录逻辑
  - 调用ProviderManager方法进行验证
  - 验证通过生成token，并将用户信息保存在redis中，将token返回
- SpringSecurity层
  - 将ProviderManager提供出来
  - 对登录接口不过滤，放行





## 认证过滤器

自定义一个过滤器，需要在UsernamePasswordAuthenticationFilter之前完成过滤，否则又要经历一遍从数据库校验，这样资源损耗太严重，所以要这个过滤器就是取出携带的token，从redis中取出用户信息。



我们要完成：

- 获取token并解析
- 从redis中获取用户信息
- 存入SpringSecurityContext
  - 因为后续的过滤器会从SpringSecurityContext中获取用户信息，来判断用户是否是一个未认证的状态
- 将自定义的过滤器配置到SpringSecurity的过滤器链中



自定义过滤器

```java
package com.liumingkai.contoller;

import com.liumingkai.config.RedisCache;
import com.liumingkai.domain.LoginUser;
import com.liumingkai.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 18:44
 */
@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private RedisCache redisCache;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("token");
        // 如果没有token,认为没有登录,放行
        if (token == null || "".equals(token)) {
            System.out.println("没有token");
            // 放行
            filterChain.doFilter(request, response);
            return;
        }
        System.out.println("有token");
        // 解析token
        String userId = null;
        try {
            Claims claims = JwtUtil.parseJWT(token);
            userId = claims.getSubject();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Token 非法");
        }

        // 从redis中获取用户信息
        String key = "user:" + userId;
        LoginUser loginUser = redisCache.getCacheObject(key);
        System.out.println("从redis中取出来的信息是这样的"+loginUser);
        if (loginUser == null) {
            throw new RuntimeException("用户未登录");
        }

        // 存入SecurityContext以便后面的过滤器使用
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginUser, null, loginUser.getAuthorities());
        System.out.println("存入SercurityContext中的LoginUser是"+loginUser);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        // 放行
        filterChain.doFilter(request, response);
    }
}

```

修改Security配置，配置自定义过滤器的位置

```java
package com.liumingkai.config;

import com.liumingkai.contoller.JWTAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 18:07
 */
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JWTAuthenticationFilter jwtAuthenticationFilterl;

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //关闭csrf
                .csrf().disable()
                //不通过Session获取SecurityContext
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                // 对于登录接口 允许匿名访问
                .antMatchers("/user/login").anonymous()
                // 除上面外的所有请求全部需要鉴权认证
                .anyRequest().authenticated();
        http.addFilterBefore(jwtAuthenticationFilterl, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

```

然后就可以实现在携带token的情况下直接访问`/hello`接口





## 退出登录

退出登录：

1. 获取token
2. 删除redis中的用户信息

这是认证过滤器中，代码不变

```java
package com.liumingkai.contoller;

import com.liumingkai.config.RedisCache;
import com.liumingkai.domain.LoginUser;
import com.liumingkai.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 18:44
 */
@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private RedisCache redisCache;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("token");
        // 如果没有token,认为没有登录,放行
        if (token == null || "".equals(token)) {
            System.out.println("没有token");
            // 放行
            filterChain.doFilter(request, response);
            return;
        }
        System.out.println("有token");
        // 解析token
        String userId = null;
        try {
            Claims claims = JwtUtil.parseJWT(token);
            userId = claims.getSubject();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Token 非法");
        }

        // 从redis中获取用户信息
        String key = "user:" + userId;
        LoginUser loginUser = redisCache.getCacheObject(key);
        System.out.println("从redis中取出来的信息是这样的"+loginUser);
        if (loginUser == null) {
            throw new RuntimeException("用户未登录");
        }

        // 存入SecurityContext以便后面的过滤器使用
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginUser, null, loginUser.getAuthorities());
        System.out.println("存入SercurityContext中的LoginUser是"+loginUser);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        // 放行
        filterChain.doFilter(request, response);
    }
}

```

Controller接口

```java
package com.liumingkai.contoller;

import com.liumingkai.domain.ResponseResult;
import com.liumingkai.domain.User;
import com.liumingkai.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 18:20
 */
@Controller
public class LogController {
    @Autowired
    IUserService userService;

    @PostMapping("/user/login")
    @ResponseBody
    public ResponseResult login(User user){
        return userService.login(user);
    }


    @RequestMapping("/user/logout")
    @ResponseBody
    public ResponseResult logout(){
        return userService.logout();
    }
}

```

Service层完成大部分的逻辑

```java
package com.liumingkai.service;

import com.liumingkai.domain.ResponseResult;
import com.liumingkai.domain.User;

public interface IUserService {

    ResponseResult login(User user);

    ResponseResult logout();
}

```

Service实现类
```java
package com.liumingkai.service.impl;

import com.liumingkai.config.RedisCache;
import com.liumingkai.domain.LoginUser;
import com.liumingkai.domain.ResponseResult;
import com.liumingkai.domain.User;
import com.liumingkai.service.IUserService;
import com.liumingkai.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.hash.HashMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 18:23
 */
@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RedisCache redisCache;
    @Override
    public ResponseResult login(User user) {
        // 将userName和password封装到Authentication中
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword());

        // 封装了真实用户信息的Authentication
        Authentication authenticate = authenticationManager.authenticate(authenticationToken);

        // 如果认证失败
        if(authenticate == null){
            throw new RuntimeException("用户名或密码错误");
        }
        // 认证通过
        // 获取用户信息
        LoginUser loginUser = (LoginUser) authenticate.getPrincipal();
        String userId = loginUser.getUser().getId();
        // 根据UserID生成JWT
        String jwt = JwtUtil.createJWT(userId);
        // 存入redis
        redisCache.setCacheObject("user:"+userId,loginUser);
        // 把token响应给前端
        HashMap<String, String> map = new HashMap<>();
        map.put("token",jwt);
        return new ResponseResult(200,"登录成功",map);
    }

    @Override
    public ResponseResult logout() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        String userId = loginUser.getUser().getId();
        String key = "user:" + userId;
        redisCache.deleteObject(key);

        return new ResponseResult(200,"退出登录成功");
    }
}

```



## 认证配置

在SpringSecurity的配置类中，最为核心的就是configure()方法，可以对我们的FilterChain做出配置。

来看一下Security的配置

```java
package com.liumingkai.config;

import com.liumingkai.controller.JWTAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月17日 22:50
 */
@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JWTAuthenticationFilter jwtAuthenticationFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //关闭csrf
                .csrf().disable()
                //不通过Session获取SecurityContext
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                // 对于登录接口 允许匿名访问
                .antMatchers("/user/login").anonymous()
                // 登录、未登录都可以
                .antMatchers("/hello").permitAll()
                // 除上面外的所有请求全部需要鉴权认证
                .anyRequest().authenticated();
        // 配置自定义过滤器的位置
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }

    /**
     * 将AuthenticationManager提供出来
     *
     * @return
     * @throws Exception
     */
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


    /**
     * 密码校验器
     *
     * @return
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder;
    }
}

```





## 授权 

在过滤器链中，最后一个过滤器FilterSecurityInterceptor中，  完成对用户的权限校验操作。

FilterSecurityInterceptor会从SecurityContextHolder中获取Authentication，这其中就封装了用户的权限信息。

**所以完成授权的业务，我们需要：**

- 将权限信息封装到Authentication中
- 在资源上设置所需要的权限

SpringSecurity权限配置是可以基于配置文件和注解的，我们实际中用的更多的是注解



1. 在SpringSecurity的配置类上开启注解，使用`@EnableGlobalMethodSecurity`

```java
package com.liumingkai.config;

import com.liumingkai.contoller.JWTAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 18:07
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JWTAuthenticationFilter jwtAuthenticationFilterl;

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //关闭csrf
                .csrf().disable()
                //不通过Session获取SecurityContext
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                // 对于登录接口 允许匿名访问
                .antMatchers("/user/login").anonymous()
                // 除上面外的所有请求全部需要鉴权认证
                .anyRequest().authenticated();
        http.addFilterBefore(jwtAuthenticationFilterl, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

```



2. 在接口上标注需要的权限，使用`@PreAuthorize()`注解，标注需要的权限

```java
package com.liumingkai.contoller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 18:03
 */
@Controller
public class HelloController {

    @RequestMapping("/hello")
    @ResponseBody
    @PreAuthorize("hasAuthority('test')")
    public String hello() {
        System.out.println("你小子竟然有权限!");
        return "hello";
    }

}

```





3. 在我们的UserDetails中封装权限信息

我们模拟一些权限，并未从数据库中封装

```java
package com.liumingkai.domain;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 18:15
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class LoginUser implements UserDetails {
    @NonNull
    private User user;

    // 用户的权限信息
    @NonNull
    private List<String> permissions;

    // 权限校验组
    @JSONField(serialize = false)
    List<GrantedAuthority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (authorities != null) {
            return authorities;
        }
        authorities = new ArrayList<GrantedAuthority>();
        authorities = permissions.stream()
                .map((Function<String, GrantedAuthority>) SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUserName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

```



4. 在UserDetailsService中，我们查询用户时，封装一些模拟权限信息

```java
package com.liumingkai.service;

import com.liumingkai.domain.LoginUser;
import com.liumingkai.domain.User;
import com.liumingkai.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 18:09
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userMapper.getUserByUserName(username);
        if (user == null) {
            throw new RuntimeException("用户名不存在！老铁你注册了吗?");
        }
        // 模拟权限信息
        List<String> permissions = new ArrayList<>(Arrays.asList("optHello", "admin", "test"));
        return new LoginUser(user, permissions);
    }
}

```



### 其他授权的方法

在这次的授权中，我们使用的使用`hasAuthority()`方法，指明访问此资源需要具备的权限，

查看此方法的原理实现，内部是通过获取到我们封装的Authentication对象，然后获取到Authority权限集合，遍历此集合来判断是否有这个权限。

SpringSecurity还提供了其他的方法：

- `hasAnyAhority()`只要有其中一个权限即可
- `hasRole()`要求有这个角色
- `hasAnyRole()`只要有其中任意一个角色

```java
@RequestMapping("/hello")
@ResponseBody
@PreAuthorize("hasAnyAuthority('system:user:delete','system:opt')")
public String hello() {
    System.out.println("你小子竟然有权限!");
    return "hello";
}
```

这三个方法的底层实现与`hasAuthority()`是一样的，

`hasRole()`方法会将我们传进去的参数拼接上`ROLE_`前缀然后再进行比较，使用此方法时需要我们用户的权限也要有`ROLE_`这个前缀才可以。



### 自定义权限校验方法

如果有更复杂的验证方式，需要我们自定义来解决。

我们只需要自定义一个处理方法，参数是String的单个权限或集合类型，

然后在`@PreAuthorize()`中调用我们自定义的验证方法即可

```java
package com.liumingkai.contoller.handler;

import com.liumingkai.domain.LoginUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 自定义权限校验方法
 *
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月20日 17:55
 */

@Component("myAuthorize")
public class MyAuthorize {

    public boolean hasMyAuthority(String authority) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        // 这是权限的验证信息
//        Collection<? extends GrantedAuthority> authorities = loginUser.getAuthorities();
        // 我们的自定义权限信息在permissions这个属性中
        List<String> permissions = loginUser.getPermissions();

        boolean flag = false;
        for (String permission : permissions) {
            if (permission.equals(authority)) {
                flag = true;
                break;
            }
        }
        return flag;
    }

}

```

使用SPEL表达式来指定权限认证的方法，`@bean名称.方法调用`的形式

```java
@RequestMapping("/hello")
@ResponseBody
@PreAuthorize("@myAuthority.hasMyAuthority('sys:list:look')")
public String hello() {
    System.out.println("你小子竟然有权限!");
    return "hello";
}
```





### 基于配置的权限控制

我们在控制接口的权限时，是使用的注解。

同时还可以在SpringSecurity的配置类中使用.

调用我们提到过的`hasAuthority()`、`hasRole()`、`hasAnyAuthority()`等方法

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http
        //关闭csrf
        .csrf().disable()
        //不通过Session获取SecurityContext
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authorizeRequests()
        // 对于登录接口 允许匿名访问
        .antMatchers("/user/login").anonymous()
        // 权限控制
        .antMatchers("/hello").hasAnyAuthority("sys:user:list")
        // 除上面外的所有请求全部需要鉴权认证
        .anyRequest().authenticated();
    // 配置认证过滤器
    http.addFilterBefore(jwtAuthenticationFilterl, UsernamePasswordAuthenticationFilter.class);
    // 配置自定义异常处理器
    http.exceptionHandling()
        .authenticationEntryPoint(authenticationEntryPoint)
        .accessDeniedHandler(accessDeniedHandler);

    // 允许跨域
    http.cors();
}
```









## 基于RBCA的权限

在系统中，用户和权限是密不可分的。

RBCA（Role-Based Access Controll）基于角色的访问控制。

一个操作可以对应一个权限，一个用户可以有多个权限，但是系统的权限非常多时，单独为用户设置权限是非常繁琐且不易于维护的，所以就有了角色的概念。

**一个用户可以是多种角色，一个角色可以被多个用户认证，一个角色可以包含多个权限，一个权限可以被多个不同角色拥有，一个角色可以认为是一个权限组**

看ER图

![image-20230419212414899](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230419212414899.png)

看案例

![image-20230419213157157](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230419213157157.png)

基于RBAC的权限模型，在系统维护、校验、管理等具有非常高的效率。



### 数据库表结构

用户表:

```sql
CREATE TABLE `sys_user` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` VARCHAR(64) NOT NULL DEFAULT 'NULL' COMMENT '用户名',
  `nick_name` VARCHAR(64) NOT NULL DEFAULT 'NULL' COMMENT '昵称',
  `password` VARCHAR(64) NOT NULL DEFAULT 'NULL' COMMENT '密码',
  `status` CHAR(1) DEFAULT '0' COMMENT '账号状态（0正常 1停用）',
  `email` VARCHAR(64) DEFAULT NULL COMMENT '邮箱',
  `phonenumber` VARCHAR(32) DEFAULT NULL COMMENT '手机号',
  `sex` CHAR(1) DEFAULT NULL COMMENT '用户性别（0男，1女，2未知）',
  `avatar` VARCHAR(128) DEFAULT NULL COMMENT '头像',
  `user_type` CHAR(1) NOT NULL DEFAULT '1' COMMENT '用户类型（0管理员，1普通用户）',
  `create_by` BIGINT(20) DEFAULT NULL COMMENT '创建人的用户id',
  `create_time` DATETIME DEFAULT NULL COMMENT '创建时间',
  `update_by` BIGINT(20) DEFAULT NULL COMMENT '更新人',
  `update_time` DATETIME DEFAULT NULL COMMENT '更新时间',
  `del_flag` INT(11) DEFAULT '0' COMMENT '删除标志（0代表未删除，1代表已删除）',
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='用户表'
```



权限表：一个权限也可以看做是一个菜单，实际开发中常规命名

```sql
DROP TABLE IF EXISTS `sys_menu`;

CREATE TABLE `sys_menu` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `menu_name` VARCHAR(64) NOT NULL DEFAULT 'NULL' COMMENT '菜单名',
  `path` VARCHAR(200) DEFAULT NULL COMMENT '路由地址',
  `component` VARCHAR(255) DEFAULT NULL COMMENT '组件路径',
  `visible` CHAR(1) DEFAULT '0' COMMENT '菜单状态（0显示 1隐藏）',
  `status` CHAR(1) DEFAULT '0' COMMENT '菜单状态（0正常 1停用）',
  `perms` VARCHAR(100) DEFAULT NULL COMMENT '权限标识',
  `icon` VARCHAR(100) DEFAULT '#' COMMENT '菜单图标',
  `create_by` BIGINT(20) DEFAULT NULL,
  `create_time` DATETIME DEFAULT NULL,
  `update_by` BIGINT(20) DEFAULT NULL,
  `update_time` DATETIME DEFAULT NULL,
  `del_flag` INT(11) DEFAULT '0' COMMENT '是否删除（0未删除 1已删除）',
  `remark` VARCHAR(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='菜单表';
```



角色表：

```sql
DROP TABLE IF EXISTS `sys_role`;

CREATE TABLE `sys_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `role_key` varchar(100) DEFAULT NULL COMMENT '角色权限字符串',
  `status` char(1) DEFAULT '0' COMMENT '角色状态（0正常 1停用）',
  `del_flag` int(1) DEFAULT '0' COMMENT 'del_flag',
  `create_by` bigint(200) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_by` bigint(200) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COMMENT='角色表';
```



用户—角色表:**userid和roleid作为联合主键**

```sql
CREATE TABLE `sys_user_role` (
  `user_id` bigint(200) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `role_id` bigint(200) NOT NULL DEFAULT '0' COMMENT '角色id',
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```



角色—菜单表：**roleid和menuid作为联合主键**

```sql
DROP TABLE IF EXISTS `sys_role_menu`;

CREATE TABLE `sys_role_menu` (
  `role_id` bigint(200) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `menu_id` bigint(200) NOT NULL DEFAULT '0' COMMENT '菜单id',
  PRIMARY KEY (`role_id`,`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
```



查询一个用户的所有权限的关键字

```sql
SELECT 
	M.`perms`
FROM `sys_user_role` UR
LEFT JOIN
	`sys_role` R
ON UR.`role_id` = R.`id`
LEFT JOIN
	`sys_role_menu` RM
ON 
	RM.`role_id` = R.`id`
LEFT JOIN
	`sys_menu` M
ON 	
	M.`id` = RM.`menu_id`
WHERE `user_id` = 1
```



### 代码实现

这是之前的User类

```java
package com.liumingkai.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;


/**
 * 用户表(User)实体类
 *
 * @author 三更
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {
    private static final long serialVersionUID = -40356785423868312L;

    /**
     * 主键
     */
    private String id;
    /**
     * 用户名
     */
    private String userName;
    /**
     * 昵称
     */
    private String nickName;
    /**
     * 密码
     */
    private String password;
    /**
     * 账号状态（0正常 1停用）
     */
    private String status;
    /**
     * 邮箱
     */
    private String email;
    /**
     * 手机号
     */
    private String phonenumber;
    /**
     * 用户性别（0男，1女，2未知）
     */
    private String sex;
    /**
     * 头像
     */
    private String avatar;
    /**
     * 用户类型（0管理员，1普通用户）
     */
    private String userType;
    /**
     * 创建人的用户id
     */
    private Long createBy;
    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 更新人
     */
    private Long updateBy;
    /**
     * 更新时间
     */
    private Date updateTime;
    /**
     * 删除标志（0代表未删除，1代表已删除）
     */
    private Integer delFlag;
}
```



只需要额外添加一个menu的实体类

```java
package com.liumingkai.domain;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * 菜单表(Menu)实体类
 *
 * @author makejava
 * @since 2021-11-24 15:30:08
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Menu implements Serializable {
    private static final long serialVersionUID = -54979041104113736L;

    private Long id;
    /**
     * 菜单名
     */
    private String menuName;
    /**
     * 路由地址
     */
    private String path;
    /**
     * 组件路径
     */
    private String component;
    /**
     * 菜单状态（0显示 1隐藏）
     */
    private String visible;
    /**
     * 菜单状态（0正常 1停用）
     */
    private String status;
    /**
     * 权限标识
     */
    private String perms;
    /**
     * 菜单图标
     */
    private String icon;

    private Long createBy;

    private Date createTime;

    private Long updateBy;

    private Date updateTime;
    /**
     * 是否删除（0未删除 1已删除）
     */
    private Integer delFlag;
    /**
     * 备注
     */
    private String remark;
}
```

MenuMapper的接口

```java
package com.liumingkai.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MenuMapper {

    List<String> getMenuListByUserId(@Param("userId") String userId);
}

```

MenuMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.liumingkai.mapper.MenuMapper">

    <select id="getMenuListByUserId" resultType="String">
        SELECT
        M.`perms`
        FROM
        `sys_user_role` UR
        LEFT JOIN
        `sys_role` R
        ON
        UR.`role_id` = R.`id`
        LEFT JOIN
        `sys_role_menu` RM
        ON
        RM.`role_id` = R.`id`
        LEFT JOIN
        `sys_menu` M
        ON
        M.`id` = RM.`menu_id`
        WHERE `user_id` = #{userId}
    </select>
</mapper>
```

只需要在UserDetailsService中实现查询出真正的权限信息并封装到UserDetails中即可

```java
package com.liumingkai.service;

import com.liumingkai.domain.LoginUser;
import com.liumingkai.domain.Menu;
import com.liumingkai.domain.User;
import com.liumingkai.mapper.MenuMapper;
import com.liumingkai.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 18:09
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserMapper userMapper;

    @Autowired
    MenuMapper menuMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userMapper.getUserByUserName(username);
        System.out.println(user);
        if (user == null) {
            throw new RuntimeException("用户名不存在！老铁你注册了吗?");
        }
        List<String> permissions = menuMapper.getMenuListByUserId(user.getId());
        return new LoginUser(user, permissions);
    }
}

```

之前的代码不用变，测试接口

```java
package com.liumingkai.contoller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 18:03
 */
@Controller
public class HelloController {

    @RequestMapping("/hello")
    @ResponseBody
    @PreAuthorize("hasAuthority('system:user:delete')")
    public String hello() {
        System.out.println("你小子竟然有权限!");
        return "hello";
    }

}
```

先登录获取token，然后携带token访问`/hello`接口，成功





## 自定义失败处理

在认证和授权的过程中，出现异常，我们希望出现异常后，返回的数据也是JSON客户端可感知的。

需要用到SpringSecurity的异常处理机制了。

**在SpringSecurity的过滤器链中，在认证和授权过程中出现的异常，会被倒数第二个过滤器ExceptionTranslationFilter捕获到，在ExceptionTranslationFilter中会去根据异常的类型选择不同的处理器**

**如果认证过程出现异常，则会被封装成一个AuthenticationException异常对象，然后调用AuthenticationEntryPoint的方法进行异常处理**

**如果授权过程出现异常，则会被封装成一个AccessDeniedException异常对象，然后调用AccessDeniedHandler对象的方法进行异常处理**

所以我们只需要根据这两种异常类型的不同，定义两个不同的异常处理器，然后配置给SpringSecurity即可。

为了方便我们在handler中响应信息，封装了一个响应工具类

```java
package com.liumingkai.utils;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class WebUtils
{
    /**
     * 将字符串渲染到客户端
     * 
     * @param response 渲染对象
     * @param string 待渲染的字符串
     * @return null
     */
    public static String renderString(HttpServletResponse response, String string) {
        try
        {
            response.setStatus(200);
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            response.getWriter().print(string);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        return null;
    }
}
```



自定义AuthenticationException异常处理器

```java
package com.liumingkai.contoller.handler;

import com.alibaba.fastjson.JSON;
import com.liumingkai.domain.ResponseResult;
import com.liumingkai.utils.WebUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 处理认证过程中出现的异常
 *
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 22:46
 */
@Component
public class AuthenticationExceptionHandlerImpl implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        ResponseResult result = new ResponseResult(HttpStatus.UNAUTHORIZED.value(), "认证失败，请重新登录");
        String json = JSON.toJSONString(result);
        WebUtils.renderString(response, json);
    }
}

```



自定义AccessDeniedHandler

```java
package com.liumingkai.contoller.handler;

import com.alibaba.fastjson.JSON;
import com.liumingkai.domain.ResponseResult;
import com.liumingkai.utils.WebUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 授权异常自定义处理器
 *
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 22:51
 */
@Component
public class AccessDeniedExceptionHandlerImpl implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ResponseResult result = new ResponseResult(HttpStatus.FORBIDDEN.value(), "权限不足");
        String json = JSON.toJSONString(result);
        WebUtils.renderString(response, json);
    }
}

```



**核心：将自定义的异常处理器配置进入SpringSecurity**

```java
package com.liumingkai.config;

import com.liumingkai.contoller.JWTAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 18:07
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JWTAuthenticationFilter jwtAuthenticationFilterl;

    @Autowired
    private AuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    private AccessDeniedHandler accessDeniedHandler;

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //关闭csrf
                .csrf().disable()
                //不通过Session获取SecurityContext
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                // 对于登录接口 允许匿名访问
                .antMatchers("/user/login").anonymous()
                // 除上面外的所有请求全部需要鉴权认证
                .anyRequest().authenticated();
        // 配置认证过滤器
        http.addFilterBefore(jwtAuthenticationFilterl, UsernamePasswordAuthenticationFilter.class);
        // 配置自定义异常处理器
        http.exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .accessDeniedHandler(accessDeniedHandler);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

```

先是使用错误的用户名和密码来登录，会返回

![image-20230419225942134](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230419225942134.png)

登录后，访问没有权限的接口

![image-20230419230008162](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230419230008162.png)











## 跨域

**由于浏览器的同源策略，在进行XMLRequest对象发起异步请求时，对于协议、域名、端口号必须要求一致，否则就会出现跨域问题。**

在前后端分离的项目中，一般都会遇到跨域问题。

而单纯地只在Springboot的接口中进行配置是不行的，还需要在SpringSecurity中进行配置。

**需要设置两个步骤**

1. 先对SpringBoot进行配置，即SpringMVC的配置类

```java
package com.liumingkai.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 23:10
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 设置允许跨域的路径
        registry.addMapping("/**")
                // 设置允许跨域请求的域名
                .allowedOriginPatterns("*")
                // 是否允许cookie
                .allowCredentials(true)
                // 设置允许的请求方式
                .allowedMethods("GET", "POST", "DELETE", "PUT")
                // 设置允许的header属性
                .allowedHeaders("*")
                // 跨域允许时间
                .maxAge(3600);
    }
}

```



2. 在SpringSecurity的配置类中开启允许跨域

```java
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //关闭csrf
                .csrf().disable()
                //不通过Session获取SecurityContext
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                // 对于登录接口 允许匿名访问
                .antMatchers("/user/login").anonymous()
                // 除上面外的所有请求全部需要鉴权认证
                .anyRequest().authenticated();
        // 配置认证过滤器
        http.addFilterBefore(jwtAuthenticationFilterl, UsernamePasswordAuthenticationFilter.class);
        // 配置自定义异常处理器
        http.exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .accessDeniedHandler(accessDeniedHandler);
        
        // 允许跨域
        http.cors();
    }
```











## CSRF

我们在配置SpringSecurity时，关闭了CSRF，那这个CSRF到底是什么？

CSRF是一个在前后端不分离的情况下的系统安全危机。

在前后端不分离的项目中，会采用cookie的方式进行验证，用户登录了A网站后，cookie保存在浏览器中，然后不小心访问了恶意伪造的网站B，B网站利用A网站的cookie向A网站发起访问，访问其中的敏感操作，就会导致A网站的用户的损失。

这就是CSRF。

![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/2019012817473755.png)

>  关于CSRF更详细的讲解
>
> [CSRF攻击与防御（写得非常好）](https://blog.csdn.net/freeking101/article/details/86537087)

当SpringSecurity为了防止CSRF工具，当验证通过后，会生成一个csrf_token返回给前端，前端需要携带这个csrf_token去访问网站，SpringSecurity中会用负责校验的过滤器，如果没有携带csrf_token或伪造的，就会拒绝访问。

CSRF攻击是依靠的cookie携带认证信息，但是在前后端分离的项目中，认证是使用的token，而token不是存储在cookie中，并且需要前端代码的设置去把token设置到请求头中，所以前后端分离的项目不需要担心csrf攻击。

所以我们需要将SpringSecurity中的csrf关闭掉，提升性能。







## 处理器

### 认证成功处理器

**在UsernamePasswordAuthenticationFilter进行登录认证时，如果登录成功了就会调用一个登录成功的出来AuthenticationSuccessHandler的方法进行认证处理后的处理。**

我们可以自定义认证成功后的处理器，只需要实现**AuthenticationSuccessHandler**，然后配置进去即可。

**前提：当我们重写了WebSecurityConfigurerAdapter的configure（）方法之后，UsernamePasswordAuthenticationFilter这个过滤器没有配置进过滤器链**

**来查看WebSecurityConfigurerAdapter中configure()的方法**

```java
protected void configure(HttpSecurity http) throws Exception {
    this.logger.debug("Using default configure(HttpSecurity). If subclassed this will potentially override subclass configure(HttpSecurity).");
    http.authorizeRequests((requests) -> {
        ((AuthorizedUrl)requests.anyRequest()).authenticated();
    });
    http.formLogin();
    http.httpBasic();
}
```

![image-20230420221350612](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230420221350612.png)

```java
public FormLoginConfigurer<HttpSecurity> formLogin() throws Exception {
    return (FormLoginConfigurer)this.getOrApply(new FormLoginConfigurer());
}
```

![image-20230420221548061](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230420221548061.png)

```java
    public FormLoginConfigurer() {
        super(new UsernamePasswordAuthenticationFilter(), (String)null);
        this.usernameParameter("username");
        this.passwordParameter("password");
    }

```



![image-20230420221632511](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230420221632511.png)



**在WebSecurityAdapter类的configure()方法中，会通过`http.formLogin()`方法将UsernamePasswordAuthenticationFilter过滤器配置进入过滤器链，但是configure()是配置的核心方法，所以为了保证UsernamePasswordAUthenticationFilter生效，需要保留这一行代码**

1. 首先我们自定义认证成功的处理器，通过实现AuthenticationSuccessHandler这个接口

```java
package com.liumingkai.contoller.handler;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月20日 22:20
 */
@Component
public class MySuccessAuthenticationHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("认证 成功了！！！666");
    }
}

```



2. 在配置类中去注册我们自定义的认证成功处理器

```java
package com.liumingkai.config;

import com.liumingkai.contoller.JWTAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 18:07
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    // 将自定义的实现类注入
    @Autowired
    private AuthenticationSuccessHandler authenticationSuccessHandler;

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        // 注册UsernamePasswordAuthenticationFilter
        http.formLogin().successHandler(authenticationSuccessHandler);

        // 配置所有的请求都需要认证
        http.authorizeRequests().anyRequest().authenticated();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

```

访问`/hello`这个普通的接口，会直接跳转到`/login`这个自带的登录页面，我们填写正确后，就会执行认证成功的处理器。







### 认证失败处理器

在UsernamePasswordAuthenticationFilter中，当认证失败后，就会执行AuthenticationFailureHandler接口的方法。

我们要实现自定义认证失败处理器，只需要实现AuthenticationFailureHandler接口，并配置即可。

1. 自定义认证失败处理器

```java
package com.liumingkai.contoller.handler;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月20日 22:29
 */
@Component
public class MyAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        System.out.println("认证失败，请重新登录，");
    }
}

```



2. 将自定义的认证失败处理器配置进入

```java
package com.liumingkai.config;

import com.liumingkai.contoller.JWTAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 18:07
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {



    @Autowired
    private AuthenticationSuccessHandler authenticationSuccessHandler;

    @Autowired
    private AuthenticationFailureHandler authenticationFailureHandler;
    
    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        // 注册UsernamePasswordAuthenticationFilter
        http.formLogin().
            successHandler(authenticationSuccessHandler)
            .failureHandler(authenticationFailureHandler);

        // 配置所有的请求都需要认证
        http.authorizeRequests().anyRequest().authenticated();

    }


}

```





### 自定义退出登录处理器

与上面两个处理器同理，当执行logout退出登录操作后，就会执行退出登录的处理器。

如果想要自定义退出登录处理器只需实现LogoutSuccessHandler接口

```java
package com.liumingkai.contoller.handler;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月20日 22:39
 */
@Component
public class MyLogoutSuccessHandler implements LogoutSuccessHandler {
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("退出登录成功");
    }
}

```

配置进去

```java
package com.liumingkai.config;

import com.liumingkai.contoller.JWTAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import java.util.HashMap;

/**
 * @author 刘明凯
 * @version 0.0.1
 * @date 2023年4月19日 18:07
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationSuccessHandler authenticationSuccessHandler;

    @Autowired
    private AuthenticationFailureHandler authenticationFailureHandler;

    @Autowired
    private LogoutSuccessHandler logoutSuccessHandler;

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        // 注册UsernamePasswordAuthenticationFilter
        http.formLogin()
                .successHandler(authenticationSuccessHandler)
                .failureHandler(authenticationFailureHandler);
        // 退出登录处理器
        http.logout()
                .logoutSuccessHandler(logoutSuccessHandler);
        // 配置所有的请求都需要认证
        http.authorizeRequests().anyRequest().authenticated();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

```

















