# 介绍

## 项目部署过程中遇到的问题

大型项目组件较多，运行环境复杂，部署时会遇到一些问题：

![image-20230614195529307](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230614195529307.png)



- 依赖关系复杂，每个组件可能需要不同的环境
- 即使不同组件依赖同一个环境，也可能因为library库不同而冲突
- 而且环境多，一般分为开发、测试、生产，各个环境中的依赖也是不同的
- 最常见的问题就是：在一个环境中是正常运行的，但是到了另一个环境中就库库报bug





### Docker解决依赖的兼容问题

将每个组件需要的依赖库等一起打包发布，并放在一个独立的容器中去运行

![image-20230614195929130](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230614195929130.png)









### Docker跨系统运行

不同的操作系统，依赖库、底层实现也都是不同的，那么Docker是如何解决跨系统运行呢？

先来了解操作系统的结构，所有的Linux系统，都可以分为三层：

- 系统应用
- 内核
- 计算机硬件

比如，Ubuntu与Centos，都是Linux的发行版，他们只是系统应用不同，内核都是相同的，都是Linux内核。

- 内核与硬件交互，提供操作硬件的指令
- 系统应用，例如CentOS、Ubuntu，在内核的基础上，封装内核指令为函数，便于程序员开发使用
- 用户程序，也就是我们开发的应用，运行在系统应用上，依赖于系统应用提供的库函数

**因此，在Ubuntu上开发的用户程序，在CentOS上运行就会出现问题，因此系统应用不同，依赖的库函数也不同**

![image-20230614200250977](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230614200250977.png)



那么Docker是如何解决不同系统环境的呢？

**Docker将用户程序与所需要的系统函数库一起打包，**

**Docker运行到不同的操作系统时，直接基于打包的函数，借助于Linux内核来运行，因此只要是Linux的内核，就能运行**









## 总结Docker概念

> [Docker — 官方文档](https://docs.docker.com/)

Docker如何解决依赖关系复杂、不同组件兼容性的问题？

- **Docker允许开发中将应用、依赖、函数库、配置一起打包，形成可移植镜像**
- **Docker应用运行在容器中，使用沙箱机制，相互隔离**



Docker如何解决开发、测试、生产环境有差异的问题？

- **Docker镜像中包含完整运行环境，包括系统函数库，Docker应用仅依赖于Linux内核，因此可以运行在任意Linux内核操作系统之上**



总结Docker的概念：**Docker是一个快速交付应用、运行应用的技术**

- **可以将程序及其依赖、运行环境一起打包为一个镜像，可以迁移到任意Linux操作系统**
- **运行时利用沙箱机制形成容器隔离，各个应用互不干扰**
- **由于只需要Linux内核，所以启动、移除可以通过一行命令完成，方便便捷**



Docker的Logo描述的十分形象：

- 一个大鲸鱼的货轮
- 货轮上的一个集装箱就是一个容器，就是一个应用

![image-20230614201756332](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230614201756332.png)

![image-20230614201816478](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230614201816478.png)







## Docker与虚拟机

**虚拟机是在操作系统中，模拟硬件设备，然后运行另一个操作系统**

**由于虚拟机中的操作系统，经过了层层包装，因此调用起来，性能较差**

![image-20230614202139784](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230614202139784.png)

**而Docker是直接调用Linux内核，因此效率更高**

![image-20230614202327097](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230614202327097.png)







## Docker架构

### 镜像和容器

- **镜像（lmage): Docker将应用程序及其所需的依赖、函数库、环境、配置等文件打包在一起，这个打包后的文件，称为镜像。**
- **容器（Container):镜像中的应用程序运行后形成的进程就是容器，只是Docker会给容器做隔离，对外不可见。**



注意：镜像文件是只读的，启动后的容器不能向镜像文件中写数据。

容器如果有数据要存储，则可以从镜像文件中复制一份目录出来，作为自己容器的一部分，去执行数据操作。

![image-20230614202918599](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230614202918599.png)





### DockerHub

**DockerHub是一个Docker镜像托管平台（类似于GitHub），这样的平台称作Docker Registry**

国内类似于DockerHub的公开服务，例如阿里云镜像服务、网易云镜像服务等，或者也可以自己搭建私有云。





### C/S架构

Docker是一个CS架构的程序，由两部分组成：

![image-20230614203425670](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230614203425670.png)





# Docker的安装

Docker可以安装在任意操作系统上，但是目前企业主流都是基于Linux开发。

而在所有的Linux发型版中，Centos最常用。

Docker 分为 CE 和 EE 两大版本。CE 即社区版（免费，支持周期 7 个月），EE 即企业版，强调安全，付费使用，支持周期 24 个月。

Docker CE 分为 `stable` `test` 和 `nightly` 三个更新频道。

官方网站上有各种环境下的 [安装指南](https://docs.docker.com/install/)，这里主要介绍 Docker CE 在 CentOS上的安装。



## 1.CentOS安装Docker

Docker CE 支持 64 位版本 CentOS 7，并且要求内核版本不低于 3.10， CentOS 7 满足最低内核的要求，所以我们在CentOS 7安装Docker。



## 1.1.卸载（可选）

如果之前安装过旧版本的Docker，可以使用下面命令卸载：

```sh
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine \
                  docker-ce
```



## 1.2.安装docker

首先需要虚拟机联网，安装yum工具包，方便后续的下载使用

```sh
yum install -y yum-utils \
           device-mapper-persistent-data \
           lvm2 --skip-broken
```



然后更新本地镜像源：

```shell
# 设置docker镜像源
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo

yum makecache fast
```





然后输入命令：

```shell
yum install -y docker-ce
```

docker-ce为社区免费版本。稍等片刻，docker即可安装成功。



## 1.3.启动docker

Docker应用需要用到各种端口，逐一去修改防火墙设置。非常麻烦，因此建议大家直接关闭防火墙！

启动docker前，一定要关闭防火墙后！！

**企业开发中，不可以随意关闭防火墙**



```sh
# 关闭
systemctl stop firewalld
# 禁止开机启动防火墙
systemctl disable firewalld
```



通过命令启动docker：

```sh
systemctl start docker  # 启动docker服务

systemctl stop docker  # 停止docker服务

systemctl restart docker  # 重启docker服务
```





然后输入命令，可以查看docker版本：

```
docker -v
```



启动Docker后，可以查看是否启动成功，利用命令

```sh
systemctl status docker
```

![image-20230614210121355](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230614210121355.png)





## 1.4.配置镜像加速

docker官方镜像仓库网速较差，我们需要设置国内镜像服务：

参考阿里云的镜像加速文档：https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors

直接复制一下命令执行

```sh
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://bi3lizub.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

**以后，通过Docker拉取pull镜像，就会走阿里云的镜像，速度更快**









# Docker的基本操作

## 镜像相关命令

镜像名称一般分两部分组成：`[repository]:[tag]`

例如`mysql:5.7`，如果在拉取镜像时，没有指定tag，那么默认就是`latest`，即最新版。

以下就是Docker中最常用的几个命令

![image-20230616141233889](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616141233889.png)

> 关于Docker的命令，并不需要都熟悉。
>
> 查看Docker帮助文档，列出所有的命令
>
> ```sh
> docker --help
> ```
>
> 查看某个命令的帮助文档
>
> 例如，查看`docker images`这个命令的帮助文档
>
> ```sh
> docker images --help
> ```
>
> 





### 拉取镜像

例如，我们要拉取一个Nginx的镜像

1. 去镜像仓库去搜索nginx镜像，比如[dockerhub](https://hub.docker.com/)

![image-20230616141830381](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616141830381.png)

![image-20230616141912971](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616141912971.png)

![image-20230616142628744](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616142628744.png)

![image-20230616142649411](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616142649411.png)

![image-20230616142335787](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616142335787.png)

![image-20230616142414400](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616142414400.png)

然后去命令行执行，然后就会拉取pull镜像到本地

![image-20230616144626023](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616144626023.png)

查看已下载的镜像

```sh
[root@localhost ~]# docker images
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
nginx        latest    605c77e624dd   17 months ago   141MB
```





### 保存镜像文件为压缩包

首先可以通过帮助文档来查看此命令的帮助文档

```sh
[root@localhost ~]# docker save --help

Usage:  docker save [OPTIONS] IMAGE [IMAGE...]

Save one or more images to a tar archive (streamed to STDOUT by default)

Aliases:
  docker image save, docker save

Options:
  -o, --output string   Write to a file, instead of STDOUT

```

执行此命令

![image-20230616145235149](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616145235149.png)



### 删除镜像文件

![image-20230616145434465](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616145434465.png)



### 加载镜像压缩包文件

![image-20230616145739919](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616145739919.png)





## 容器相关命令

![image-20230616150431449](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616150431449.png)





### 创建并运行容器

1. 运行容器的第一步，建议去DockerHub上查看容器的运行命令

![image-20230616150601503](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616150601503.png)

看这个命令，来解读一下

```sh
docker run --name myName -p 8080:80 -d nginx
```

- `docker run `启动容器
- `--name` 每个容器都要有唯一的名称
- `-p` 将宿主端口与容器端口做映射，冒号左侧是宿主机端口，右侧是容器端口
- `-d` 后台运行容器
- 最后的那个单词`nginx`就是镜像的名称 ，没有`tag`，默认就是latest

![image-20230616151602081](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616151602081.png)

**返回值是容器的id，与名称一样，都是唯一的**



### 查看容器的运行状态

此命令默认查看运行中的容器的状态

```sh
docker ps
```

![image-20230616151704396](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616151704396.png)

如果想要看停止掉的容器，可以通过`-a`选项

![image-20230616154844663](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616154844663.png)



### 查看容器的运行日志

```sh
docker logs contanerName
```

![image-20230616151950620](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616151950620.png)



**如果不想每次查看容器运行日志，都执行一次命令，则可以使用选项`-f`，持续追踪日志**

![image-20230616152327857](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616152327857.png)



### 进入容器操作

看这个命令

```sh
docker exec -it containerName bash
```

解读一波：

- `docker exec`进入容器内部
- `-it` 给当前进入的容器创建一个标准输入、输出终端，允许我们与容器交互
- `containerName`指定容器名称 
- `bash`进入容器后执行的命令，`bash`是一个Linux终端交互命令

![image-20230616153633947](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616153633947.png)

**进入到容器内部后，会发现有基本的Linux的目录结构，但是在Linux中的部分命令是无法使用的**

**对于这个容器中的目录结构，以及各个文件，我们是不清楚的，所以还需要借助官方的文档**

![image-20230616153854079](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616153854079.png)



![image-20230616154058464](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616154058464.png)

![image-20230616154228237](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616154228237.png)

**由于容器中不支持Linux中的部分命令，所以我们不能使用Vi编辑器对文件进行修改**

**对容器中的内容进行修改时，我们可以使用以下命令**

```sh
sed -i -e 's#Welcome to nginx#我是刘明凯#g' -e 's#<head>#<head><meta charset="utf-8">#g' index.html
```

![image-20230616154438892](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616154438892.png)



> **可以通过`docker exec`命令来进入容器，操作容器内部**
>
> 但是这种行为是不推荐的，因为在容器中没有提供常用的命令。
>
> 因为容器是别人封装好的，所以非必须不修改容器中的文件。



### 停止容器

```sh
docker stop containerName
```

![image-20230616154726172](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616154726172.png)

查看停止掉的容器

![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616154844663.png)







### 启动容器

`docker run `命令是创建并启动容器。

当我们有了容器之后，就不需要此命令了，直接通过`docker start`来启动

```sh
docker start containerName
```

![image-20230616155113291](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616155113291.png)





### 删除容器

```sh
docker rm containerName
```

默认情况下，不能删除运行中的容器。

如果要强制删除，则可以利用`-f`选项

![image-20230616155327814](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616155327814.png)





## 数据卷



容器与数据耦合的问题：

- 不便于修改，每次修改容器中的文件，都需要先进入容器，而且容器内不能使用常规的编辑命令
- 数据不可复用，在容器内的修改对外是不可见的。所有修改对新创建的容器不可复用的。
- 升级维护困难，所有的数据都存在于容器内部，如果要升级容器，则需要先删除旧容器，所有的数据就会丢失





### 介绍

数据卷（Volume）是一个虚拟目录，指向宿主机文件系统中的某个目录。（类似于Windows中的软链接）

![image-20230616180312458](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616180312458.png)

**简单点说，我们利用Docker创建了一个数据卷Volume，这个Volume就是一个软链接，指向真正的宿主机中的`/var/lib/docker/volumes/`下的的真的的文件目录，因此，我们可以让容器来挂载这个volume，这样容器中的数据就会真正的同步到宿主真正的文件中，当删除容器后，数据还会存在。同时，还解决了修改容器文件的问题，我们只需要修改宿主机中的真正的文件即可，容器就会读取到该文件。还解决了数据隔离的问题，让多个容器挂载同一个volume，就能实现数据共享**

![image-20230616185508547](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616185508547.png)



### 常用命令



**数据卷的操作命令是一个二级命令，基本语法如下：**

```sh
docker volume [command]
```

常用命令

- `create` 创建一个volume
- `inspect` 显示一个或多个volume详细信息
- `ls` 列出所有的volume
- `prune` 删除未使用的volume
- `rm` 删除指定的一个或多个volume

可以通过`docker volume –help`来查看这些命令

```sh
[root@localhost ~]# docker volume --help

Usage:  docker volume COMMAND

Manage volumes

Commands:
  create      Create a volume
  inspect     Display detailed information on one or more volumes
  ls          List volumes
  prune       Remove all unused local volumes
  rm          Remove one or more volumes

Run 'docker volume COMMAND --help' for more information on a command.

```



![image-20230616191708779](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616191708779.png)

![image-20230616191846620](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616191846620.png)





### 容器挂载数据卷

**我们在创建容器时，可以通过`-v`选项来挂载一个数据卷到某个容器目录**

- 冒号左侧是**数据卷的名称**
- 右侧是容器内的需要被挂载的目录

**在创建容器时，如果使用`-v`选项指定了一个不存在的数据卷volume，那么就会自动创建该数据卷并挂载**

![image-20230616201200322](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616201200322.png)

然后，接下来，我们打开真实的数据卷的目录，发现容器中指定目录下的文件已经出现在真正的宿主路径中了。

就可以任性操作这些文件了。

![image-20230616201748654](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616201748654.png)



#### 直接挂载宿主机目录

目录挂载与数据卷挂载的语法是类似的。

- `-v [宿主机目录]:[容器内目录]`
- `-v [宿主机文件]:[容器内文件]`

例如：我现在要创建并运行一个MySQL容器，将宿主目录直接挂载到容器

去DockerHub查看MySQL的文档

![image-20230616210042454](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616210042454.png)

接下来开始操作

![image-20230616205206855](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616205206855.png)

创建目录，等会直接挂载到mysql容器

![image-20230616205401191](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616205401191.png)

在`mysql/conf`下新建一个mysql的配置文件

```conf
[mysqld]
skip-name-resolve
character_set_server=utf8
datadir=/var/lib/mysql
server-id=1000
```

创建Mysql容器，

```sh
[root@localhost conf]# docker run \
> --name mysql \
> -d \
> -e MYSQL_ROOT_PASSWORD=123456 \
> -p 3306:3306 \
> -v /tmp/mysql/conf/my.cnf:/etc/mysql/conf.d/my.cnf \
> -v /tmp/mysql/data/:/var/lib/mysql \
> mysql:latest

```





### 两种挂载方式对比

- 创建数据卷并挂载
  - 耦合度低，由Docker负责管理目录，真实的目录比较深
- 直接挂载真实目录
  - 耦合度高，我们自己定义的目录，方便管理









# Dockerfile自定义镜像

如何基于DockerFile自定义镜像？

## 镜像结构

**镜像就是将应用程序及其需要的系统函数库、环境、配置、依赖打包而成**

![image-20230616212313316](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616212313316.png)

**镜像的结构是分层的：每一层都是一个Layer**

- **BaseImage层：包含基本的系统函数库、环境变量、文件系统**
- **EntryPoint：入口，是镜像中应用启动的命令**
- **其他：在BaseImage基础上添加依赖、安装程序、完成整个应用的安装和配置**





## DockerFile语法

**DockerFile是一个文本文件，其中包含了一个个的指令Instruction，用指令来说明要执行什么操作来构建镜像，每一个指令都会形成一层Layer**。构建镜像时，就会按照DockerFile中的命令去构建镜像文件。

**Dockerfile文件描述了构建镜像的过程**

常见指令

| 指令       | 说明                                           | 示例                            |
| ---------- | ---------------------------------------------- | ------------------------------- |
| FROM       | 指定基础镜像                                   | FROM centos:7                   |
| ENV        | 设置环境变量，可在后面指令中使用               | ENV key value                   |
| COPY       | 拷贝本地文件到镜像的指定目录                   | COPY ./mysql-5.7.rpm  /tmp      |
| RUN        | 执行linux的shell命令，一般是安装过程的命令     | RUN yum install gcc             |
| EXPOSE     | 指定容器运行时监听的端口，是给镜像的使用者看的 | EXPOSE 8080                     |
| ENTRYPOINT | 镜像中应用的启动命令，容器运行时调用           | ENTRYPOINT java -jar xx-web.jar |

更多的语法：[官网https://docs.docker.com/engine/reference/builder/](https://docs.docker.com/engine/reference/builder/)

举个例子：

创建一个我们自己Java项目的镜像。

1. 我们新建一个目录作为演示目录`/tmp/docker-demo/`
2. 上传我们的项目打包后的jar文件，以及jdk环境

3. 准备Dockerfile文件，文件名称叫做`Dockerfile`

```
# 指定基础镜像
FROM ubuntu:16.04
# 配置环境变量，JDK的安装目录
ENV JAVA_DIR=/usr/local

# 拷贝jdk和java项目的包
COPY ./jdk8.tar.gz $JAVA_DIR/
COPY ./docker-demo.jar /tmp/app.jar

# 安装JDK
RUN cd $JAVA_DIR \
 && tar -xf ./jdk8.tar.gz \
 && mv ./jdk1.8.0_144 ./java8

# 配置环境变量
ENV JAVA_HOME=$JAVA_DIR/java8
ENV PATH=$PATH:$JAVA_HOME/bin

# 暴露端口
EXPOSE 8090
# 入口，java项目的启动命令
ENTRYPOINT java -jar /tmp/app.jar
```

最终`docker-demo/`中有

![image-20230616214436513](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616214436513.png)





4. **！！执行构建命令**

```sh
docker build -t javaweb:1.0 .
```

**注意：**

- `-t`的全称是`-tag`，用来指定的工件的标签
- 最后的`.`是用来指明Dockerfile所在的目录

![image-20230616214648514](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616214648514.png)

![image-20230616215009652](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616215009652.png)







## 基于java:8-alpine构建Java项目为镜像

观察Dockerfile文件的内容

![image-20230616215301714](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616215301714.png)

我们的所有项目，在构建镜像时，唯一不同的就是打包后的jar文件不同，其余的操作都是在构建环境。

如果每次构建环境都需要写那些重复构建环境的指令，还需要提前准备好jdk的镜像文件，甚是繁琐。

**有这样一个镜像，名称叫做`java:8-alpine`，是一个体积非常小的jdk的镜像，这个镜像已经帮我们把构建环境的指令写好了，所以我们以此为基础，只需要写拷贝jar包的一个指令就好了**

我们修改后的Dockerfile文件，非常清爽

```
# 构建环境
FROM java:8-alpine

# 拷贝项目
COPY ./docker-demo.jar /tmp/app.jar

# 暴露端口
EXPOSE 8090
# 入口，java项目的启动命令
ENTRYPOINT java -jar /tmp/app.jar
```

![image-20230616220323752](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230616220323752.png)



## 总结

1. Dockerfile的本质是一个文件，通过指令描述镜像的构建过程

2. **Dockerfile的第一行必须是FROM，从一个基础镜像来构建**

3. **基础镜像可以是基本操作系统，如Ubuntu。也可以是其他人制作好的镜像，例如：java:8-alpine**





# Docker-Compose

## 介绍

Docker Compose可以基于Compose文件帮我们快速的部署**分布式应用**，而无需手动一个个创建和运行容器！

(LOGO是一个章鱼，手里拿着的是一个个的容器）

> [更多语法–官网https://docs.docker.com/compose/compose-file/](https://docs.docker.com/compose/compose-file/)

DockerCompose帮助我们构建分布式服务的原理，比较简单，就是根据我们自定义的Compose文件，去构建，在这个文件中定义了各个服务的相关信息。

Compose文件的基本格式如下，类似于yaml文件，看下面这个文件内容：

```yaml
version: "3.8"
 services:
  mysql:
    image: mysql:5.7.25
    environment:
     MYSQL_ROOT_PASSWORD: 123 
    volumes:
     - "/tmp/mysql/data:/var/lib/mysql"
     - "/tmp/mysql/conf/hmy.cnf:/etc/mysql/conf.d/hmy.cnf"
  web:
    build: .
    ports:
     - "8090:8090"

```

在这个文件中，描述了两个容器，也就是两个服务：

- mysql，基于我们指定的镜像去构建容器，并且挂载了两个目录
- web，基于`docker build`临时构建的镜像容器，映射的端口是8090



## 安装DockerCompose

​	命令行通过命令下载：

```sh
# 安装
curl -L https://github.com/docker/compose/releases/download/1.23.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

如果下载失败或很慢，可以使用文件上传的方式

修改我们刚才下载的文件

```sh
# 修改权限
chmod +x /usr/local/bin/docker-compose
```



开启Base命令自动补全：

```sh
# 补全命令
curl -L https://raw.githubusercontent.com/docker/compose/1.29.1/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose
```

如果此处下载失败，则可以修改hosts文件

```sh
echo "199.232.68.133 raw.githubusercontent.com" >> /etc/hosts
```



至此，基本的环境都准备好了。





## 部署微服务集群

准备好我们的微服务项目：

![image-20230617101833802](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230617101833802.png)

在每个服务目录中都有对应的jar包，以及Dockerfile文件，Compose在构建整体项目时，就会去执行每个服务的Dockerfile文件去构建单个的服务。

![image-20230617102012032](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230617102012032.png)



**注意：我们的单个服务，在打成jar包前，要先修改一下配置文件，因为我们要基于Docker容器去部署每个服务，容器之间是相互隔离的，所以服务之间的调用就不能通过ip来实现了，而是通过容器名称来实现调用的。所以我们的服务的配置文件中，修改需要调用服务的容器名**，像这样：

```yaml
spring:
  datasource:
    url: jdbc:mysql://mysql:3306/cloud_order?useSSL=false
    username: root
    password: 123
    driver-class-name: com.mysql.jdbc.Driver
  application:
    name: orderservice
  cloud:
    nacos:
      server-addr: nacos:8848 # nacos服务地址
```



准备我们的Compose文件，**注意文件名称叫做`docker-compose.yml`**

```yaml
version: "3.2"

services:
  nacos:
    image: nacos/nacos-server
    environment:
      MODE: standalone
    ports:
      - "8848:8848"
  mysql:
    image: mysql:5.7.25
    environment:
      MYSQL_ROOT_PASSWORD: 123
    volumes:
      - "$PWD/mysql/data:/var/lib/mysql"
      - "$PWD/mysql/conf:/etc/mysql/conf.d/"
  userservice:
    build: ./user-service
  orderservice:
    build: ./order-service
  gateway:
    build: ./gateway
    ports:
      - "10010:10010"

```

在这个文件中，我们部署了5个服务，：

- `nacos`：作为注册中心和配置中心
  - `image: nacos/nacos-server`： 基于nacos/nacos-server镜像构建
  - `environment`：环境变量
    - `MODE: standalone`：单点模式启动
  - `ports`：端口映射，这里暴露了8848端口
- `mysql`：数据库
  - `image: mysql:5.7.25`：镜像版本是mysql:5.7.25
  - `environment`：环境变量
    - `MYSQL_ROOT_PASSWORD: 123`：设置数据库root账户的密码为123
  - `volumes`：数据卷挂载，这里挂载了mysql的data、conf目录，其中有我提前准备好的数据
- `userservice`、`orderservice`、`gateway`：都是基于Dockerfile临时构建的



**将我们准备的微服务项目上传到Linux中，进入到微服务项目的根目录，也就是Compose文件所在的目录，执行构建命令**

**利用`docker-compose up`命令来部署微服务项目**

```sh
docker-compose up -d
```

接下来，就会将每个服务单独启动为一个容器，

![image-20230617105213332](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230617105213332.png)

**接下来正常访问我们的微服务就好了**



**常用命令：**都可以通过`docker-compose –help`来查看，说几个常用的

- `docker-compose logs`查看所有服务的日志
- `docker-compose stop`停止微服务







# 搭建Docker镜像仓库

Docker的镜像仓库，有些类似于Maven仓库，都存在公开仓库和私有仓库。

- 公共仓库，例如DockerHub、阿里云、网易云等公开仓库，我们都可以使用
- 私有仓库，例如公司内的仓库，仅对公司内开放，比较 安全。



我们搭建Docker镜像仓库，是基于Docker官方提供的一个镜像来实现的`DockerRegistry`

[官方文档https://docs.docker.com/registry/](https://docs.docker.com/registry/)

搭建的仓库，有两种版本：

- 简化版
  - 基础的镜像的拉取、上传、管理等镜像管理功能都齐备，但是没有UI界面，在命令行状态下
- 完整版
  - 在简化版的基础上，有了UI页面，操作更简单



**先来说，怎么搭建镜像仓库，等会再说怎么push、pull**

## 搭建简化版

简化版的搭建非常简单，只需要执行以下命令，来构建一个仓库容器就好了

```sh
docker run -d \
    --restart=always \
    --name registry	\
    -p 5000:5000 \
    -v registry-data:/var/lib/registry \
    registry
```

在这个命令中，我们挂载了`/var/lib/registry`目录为仓库的数据目录，所有的上传的镜像文件就会保存在此目录。

这样一个简化版的镜像仓库就搭建完成了。





## 搭建图形化界面版本

这个带有图形化界面的仓库，并不是Docker官方推出的，而是有一个个人在官方的简化版的基础上，增加了图形化界面。

这个仓库分为两个服务：

- 第一个就是简化版的仓库服务，
- 第二个就是图形界面的前端服务，

因此我们可以通过`docker-compose`来部署这个微服务项目。



**新建一个Compse文件**，`docker-compose.yml`

```yml
version: '3.0'
services:
  registry:
    image: registry
    volumes:
      - ./registry-data:/var/lib/registry
  ui:
    image: joxit/docker-registry-ui:static
    ports:
      - 8080:80
    environment:
      - REGISTRY_TITLE=这是我的私有Docker镜像仓库
      - REGISTRY_URL=http://registry:5000
    depends_on:
      - registry
```



不着急，配置一下Docker的信任地址，否则上传、拉取不成功

因此我们的私服采用的是http协议，不是https,默认不被Docker信任，所以需要做一个配置：

1. 打开如下文件

```sh
# 打开要修改的文件
vi /etc/docker/daemon.json
```

2. 将我们的使用的ip添加进去，我的虚拟机ip是`192.168.163.156`

```sh
# 添加内容：
"insecure-registries":["http://192.168.163.156:8080"]
```

3. 重新加载此文件

```sh
# 重加载
systemctl daemon-reload
# 重启docker
systemctl restart docker
```



接下来，在`docker-compose.yml`文件所在的目录，执行命令启动我们的仓库

```sh
docker-compose up -d
```



接下来，访问我们配置的仓库地址，目前还没有镜像文件

![image-20230617110906987](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230617110906987.png)





## 镜像操作

推送镜像文件到私有库，必须先tag，即镜像文件的版本。



1. 重命名镜像文件，**前缀是我们私有仓库的地址，后面就是正常的`名称：tag`**

```sh
docker tag nginx:latest 192.168.163.156:8080/myNginx:1.0
```

![](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230617111824818.png)



2. 推送镜像

```sh
docker push 192.168.163.156:8080/my-nginx:1.0
```

![image-20230617112548755](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230617112548755.png)

再次查看仓库

![image-20230617112639108](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230617112639108.png)

![image-20230617112649181](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230617112649181.png)



3. 拉取镜像

可以通过以下命令来拉取

```sh
docker pull 192.168.163.156:8080/my-nginx:1.0
```

也可以通过仓库，查看该镜像文件，直接复制命令，然后回到命令行执行

![image-20230617113056767](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230617113056767.png)



![image-20230617113832501](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230617113832501.png)







































