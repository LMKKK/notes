# 简介
Nginx是高性能Http和反向代理服务器。
Nginx是一个**静态的Http服务器**，那么就可以处理Http请求，能够对**静态资源**进行处理，但是不能对动态请求做出处理，因此可以支持的并发是非常高的。
因此利用这一特性，可以利用反向代理实现负载均衡。

- 将静态资源交给Nginx处理
- 动态资源，nginx就利用反向代理、负载均衡来访问真实的服务器

![](https://cdn.nlark.com/yuque/0/2023/jpeg/29136536/1685958024004-93cd95bf-6da5-4c71-8f7c-ce47d548d2a9.jpeg)
# 安装
接下来的是在Windows下的安装：

1. 点击下面的链接，选择稳定版下载

[nginx: download](http://nginx.org/en/download.html)

2. 下载完成后，解压，解压后的目录结构

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29136536/1685946643889-d7a0aa08-8a65-43d2-896d-6e080dd9f975.png#averageHue=%23fcfbf9&clientId=u1f852883-4c7c-4&from=paste&height=175&id=u7add4dd3&originHeight=193&originWidth=629&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=16793&status=done&style=none&taskId=u1634efeb-c799-4854-8cc1-9ab7e4ce173&title=&width=571.8181694243568)

## 启动
点击nginx.exe启动
或者在命令行下，在此目录下，利用命令启动
```shell
nginx

# 或者
start nginx
```
浏览器访问`http://localhost:80`，看到如下页面，代表启动成功
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29136536/1685946981525-5923c062-f211-4b08-80cd-c0b78a40d3df.png#averageHue=%23fcfbfa&clientId=u1f852883-4c7c-4&from=paste&height=296&id=ua054eaca&originHeight=326&originWidth=1059&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=19211&status=done&style=none&taskId=u6599cc91-3291-4d00-b13d-934fc61d751&title=&width=962.7272518607215)
## 关闭
_关闭掉命令行窗口后，Nginx不会关闭，而是继续在后台运行。_
命令行，进入Nginx的根目录，就是有nginx.exe的那一层目录。
**执行命令**
```shell
# 正常关闭
nginx -s quit

# 强制退出
nginx -s stop
```
再次访问`http://localhost:80`
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29136536/1685947199113-6e5975e9-c34a-4c95-b7d2-a011ef58af4c.png#averageHue=%23fefefe&clientId=u1f852883-4c7c-4&from=paste&height=640&id=u74849e71&originHeight=704&originWidth=1105&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=23124&status=done&style=none&taskId=u83a4338a-1061-4ee8-b7c4-2982d9acd07&title=&width=1004.5454327725187)
关闭Nginx成功
# 静态资源部署
_nginx_每次启动时，都会加载`conf/nginx.conf`配置文件，这个配置文件中定义着nginx服务器相关的配置。

打开Nginx根目录下`conf/nginx.conf`,
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29136536/1685947622535-5d9a7fc4-5e78-4932-a512-16eaa409f4f9.png#averageHue=%23fdfcfb&clientId=u1f852883-4c7c-4&from=paste&height=676&id=u797f33e8&originHeight=744&originWidth=1829&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=174527&status=done&style=none&taskId=u038f0fd6-5cb4-40ac-9e48-e252a0d657c&title=&width=1662.7272366886305)
所以，了解了Nginx代理静态资源的原理后。
**我们将前端打包后的静态资源，例如html、css、js等文件，可以直接扔在nginx根目录下的html中，并修改**`**nginx.conf**`**中资源的首页文件**
也可以直接在`nginx`根目录下，将我们打包后的文件扔在根目录，并修改`nginx.conf`中资源目录和首页文件。
例如：
我将打包后的文件夹，直接扔在nginx根目录
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29136536/1685947986594-e6a895f2-d390-4d1c-966f-67e72b045fd3.png#averageHue=%23fcfbfa&clientId=u1f852883-4c7c-4&from=paste&height=274&id=uaabf1ffc&originHeight=301&originWidth=766&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=32184&status=done&style=none&taskId=u0d136141-aa05-452a-bde8-cc3daf81fb1&title=&width=696.3636212703614)
修改配置文件`nginx.conf`
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29136536/1685948105871-9f898efe-df95-4d82-af3d-583f7cbab8af.png#averageHue=%23fdfcfc&clientId=u1f852883-4c7c-4&from=paste&height=454&id=u8dc24f04&originHeight=499&originWidth=1046&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=29112&status=done&style=none&taskId=u0c0716c2-a5ef-4034-a970-8f42829126f&title=&width=950.9090702986919)
重启Nginx，访问即可

# Nginx常用命令
```shell
# 启动nginx
nginx
# 或
start nginx

# 关闭nginx
# 正常退出
nginx -s quit

# 强制推出
nginx -s stop

# 在运行的状态下
# 重启nginx
# 重新加载配置文件
nginx -s reload
```
# 多虚拟主机
**虚拟主机**的意思就是在我们的nginx中部署多个项目，看起来就好像有了多台服务器一样。
在_conf/nginx.conf_配置文件中，是这样的
```nginx

worker_processes  1;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    server {
        listen       80;	# 端口
        server_name  localhost;		# 域名或ip

        location / {
            root   dist;		# 默认资源的目录
            index  index.html index.htm;	# 默认访问资源名称
        }
 
        error_page   500 502 503 504  /50x.html;		# 错误页面
        location = /50x.html {
            root   html;
        }

    }

}
```


## 端口绑定
**在**_**http**_**节点下，一个**_**server**_**就是一个应用，因此我们可以通过配置多个**_**server**_**来达到配置多虚拟主机的目的**
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29136536/1685949246587-04f384b3-ced6-41cf-8052-72e6d1a6ab9e.png#averageHue=%23fdfdfc&clientId=u73ed548c-f33e-4&from=paste&height=702&id=udcd7e778&originHeight=772&originWidth=1350&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=70867&status=done&style=none&taskId=u06d27552-12aa-4632-9ad2-9e34663e913&title=&width=1227.2727006723078)

## 域名绑定
通过不同域名的方式来达到虚拟主机的目的。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29136536/1685951051910-0cd92770-fe4a-48eb-ba49-a6987f92eada.png#averageHue=%23fdfdfc&clientId=u73ed548c-f33e-4&from=paste&height=696&id=u3da06bf2&originHeight=766&originWidth=1367&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=57938&status=done&style=none&taskId=u5028fa34-88e6-49b1-a5d9-20fffa2b3dc&title=&width=1242.727245791885)

# 反向代理
首先要知道什么是`正向代理`
![](https://cdn.nlark.com/yuque/0/2023/jpeg/29136536/1685951686936-d82b7dd1-7d2e-47f5-a4b5-0a8c71119c8e.jpeg)
**正向代理的目标是客户端，帮助客户端来访问服务器**

来看`反向代理`
![](https://cdn.nlark.com/yuque/0/2023/jpeg/29136536/1685955587732-b779bf0e-7cfc-4496-b445-d2560385bc3c.jpeg)
**反向代理的目标是互联网，用户只需要访问nginx，具体访问的是哪个服务器，用户不知道，多目标服务器**

**如何通过Nginx来实现代理？**
在Nginx的`conf/nginx.conf`配置文件中，修改
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29136536/1685955206510-199ba2ab-d611-49c6-be30-42a58f34ab10.png#averageHue=%23fcfcfc&clientId=u6e9378b7-976b-4&from=paste&height=615&id=u6e48ca90&originHeight=677&originWidth=1231&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=74470&status=done&style=none&taskId=ud17472b1-ea95-4b8d-824f-92a7bf302bd&title=&width=1119.0908848352674)
源文件
```nginx

worker_processes  1;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

	# 配置代理
	upstream shop-server{
		server 127.0.0.1:8080;
	}

    server {
        listen       80;	# 端口
        server_name  127.0.0.1;		# 域名或ip

        location / {
			# proxy_pass 使用代理
			proxy_pass http://shop-server;
            index  index.html index.htm;	# 默认访问资源名称
        }
 
        error_page   500 502 503 504  /50x.html;		# 错误页面
        location = /50x.html {
            root   html;
        }

    }

}

```

**这样，反向代理就配置好了，当我们访问nginx时，nginx帮我们去寻找配置好的真实的服务器，服务器响应数据给Nginx，Nginx将数据再响应给客户端，客户端全程是无感的，只与Nginx进行交互。**
当被代理的服务器只有一台时，看起来与正向代理差不多。

# 负载均衡
负载均衡是反向代理的真正目的。
当Tomcat服务器只有一台时，肯定扛不住很高的请求，所以此时可以搭建Tomcat集群，然后利用Nginx来做负载均衡。
我们将Tomcat服务器的地址配置到Nginx中，客户端请求nginx，nginx在所有的Tomcat中挑选一台进行访问，然后将响应结果返回给客户端。
_如何在Nginx中配置负载均衡？_
刚才配置了反向代理，那么负载均衡就是我们多配几台Tomcat。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29136536/1685956338607-ac58e614-f7ef-43f3-b53d-fedf641fb06a.png#averageHue=%23fdfdfc&clientId=u6e9378b7-976b-4&from=paste&height=508&id=ua6c6923a&originHeight=559&originWidth=1494&originalType=binary&ratio=1.100000023841858&rotation=0&showTitle=false&size=48799&status=done&style=none&taskId=ucd4102e6-3130-44ff-824a-d2c64e25d1e&title=&width=1358.1817887440207)
# 负载均衡策略
## 轮询（默认）
轮着来，挨个挨个分配，Nginx的默认策略。
```nginx
    upstream myserver {
        server 192.168.156.156:8080 ;
        server 192.168.156.163:8080 ;
				server 127.0.0.1:80; 
    }
    server {
        listen       80;
        server_name  208.208.128.122;
        location / {
            proxy_pass   http://myserver;
            index  index.html index.htm;
    }

```
## 权重分配
给某个服务或全部服务配置了权重后，就开了权重策略。
权重越大，被访问的概率越大，只需要在配置文件中，通过weight属性来配置即可。
```nginx
    upstream myserver {
        server 192.168.156.156:8080 weight=10;   #  在这儿
        server 192.168.156.163:8080 weight=5;
				server 127.0.0.1:80; # 默认的权重是1
    }
    server {
        listen       80;
        server_name  208.208.128.122;
        location / {
            proxy_pass   http://myserver;
            index  index.html index.htm;
    }

```
服务器之间被访问的概率就是权重之比。
此时各个服务器之间被访问的概率就是`10:5:1`
## ip_hash
通过检查客户端的ip，计算得到一个结果，根据这个结果选择要访问的服务器
**这样能保证，一个客户端，最终交互的服务器是同一个**
```nginx
    upstream myserver {
				ip_hash; # 设置策略
        server 192.168.156.156:8080 ; 
        server 192.168.156.163:8080 ;
				server 127.0.0.1:80; 
    }
    server {
        listen       80;
        server_name  208.208.128.122;
        location / {
            proxy_pass   http://myserver;
            index  index.html index.htm;
    }

```



