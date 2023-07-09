# 初识ElasticSearch

## 介绍

> [官网ElasticSearch](https://www.elastic.co/cn/)

ElasticSearch是一个非常强大开源搜索引擎，可以帮助我们在海量数据中快速寻找内容，简称ES。

例如在GitHub上搜索、购物网站搜索。。。。。

**ES还结合了Kibana、Logstash、Beats，	也就是Elastic Stack（ES技术栈），简称ELK，被广泛应用在日志数据分析、实时监控等领域。**

![image-20230619211616827](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619211616827.png)



## 倒排索引

**ES的核心是基于倒排索引实现的。**

传统的数据库，例如MySQL，使用的是正向索引技术。

如果要搜索的列使用了索引还好，但是如果列没有索引，或者要进行模糊查询，此时MySQL就会进行扫描全表，逐条匹配，效率低下。

**那么就有了倒排索引**：

使用倒排索引在搜索数据时，会生成一个新的表，在这个表中，有两列

- 文档Document：**原始表的每条数据就是一个文档，**
- 词条item：**文档按照语义分成的词语**



![image-20230619223234283](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619223234283.png)

![image-20230619223359434](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619223359434.png)





**正向索引：**

- 基于文档id建立索引。查询词条时，必须先逐条获取到每个文档，然后判断文档中是否包含指定的词条。

**倒排索引**：

- 对文档内容分词，对词条建立索引，并记录词条所在的文档信息。

  当按照词条查询时，因此词条建立了索引，所以会快速定位到词条的内容，词条的内容就是文档的id，然后根据文档id获取到真正的文档。



### 优缺点

**正向索引**：

- 优点：
  - 可以给多个字段创建索引
  - 根据索引字段搜索、排序速度非常快
- 缺点：
  - 根据非索引字段，或者索引字段中的部分词条查找时，只能全表扫描。

**倒排索引**：

- 优点：
  - 根据词条搜索、模糊搜索时，速度非常快
- 缺点：
  - 只能给词条创建索引，而不是字段
  - 无法根据字段做排序









## ES与MySQL对比

### 文档

ES是 ==面向文档存储== 的，文档可以数据库中的一条数据记录。

**在ES中，一个文档就是一条JSON数据，类似于表中的一行数据**

文档会被序列化为JSON格式后存储在ElasticSearch中。

![image-20230619224936975](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619224936975.png)



### 索引

- 索引index：**在ES中，索引就是相同类型的文档的集合。**

  **索引可以认为是文档的结构，多条文档的结构相同，那么就认为属于相同的索引**

  结构相同的文档，就会被认为是这一类的索引，因此当多个文档的结构相同时，这些文档就划分为同一个索引。

- 映射mapping：**字段的约束信息**，类似于表的结构约束。此处`“id”:1`就是一个映射

  **映射用来规定文档中字段的类型**

![image-20230619225206657](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619225206657.png)







### 对比

![image-20230619225347445](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619225347445.png)



### 总结

**ES并不能代替MySQL！！！**

- MySQL：擅长实物类型的操作，可以确保数据的安全和一致性
- ES：擅长海量数据的搜索、分析、计算

**这两者是互补关系，而不是替代关系**

![image-20230619225814287](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230619225814287.png)







# 安装ElasticSearch、kibana

kibana是一个可视化工具，能够让我们很方便的编写ES中的DSL语句。

## 1.部署单点es

### 1.1.创建网络

因为我们还需要部署kibana容器，因此需要让es和kibana容器互联。这里先创建一个网络：

```sh
docker network create es-net
```



### 1.2.加载镜像

这里我们采用elasticsearch的7.12.1版本的镜像，这个镜像体积非常大，接近1G，不建议大家自己pull，会很慢。

建议将其上传到虚拟机中，然后运行命令加载即可：

```sh
# 导入数据
docker load -i es.tar
```

同理还有`kibana`的tar包也需要这样做。

上传完成后，将ES和kibana加载为镜像。

### 1.3.运行

运行docker命令，部署单点es：

```sh
docker run -d \
	--name es \
    -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
    -e "discovery.type=single-node" \
    -v es-data:/usr/share/elasticsearch/data \
    -v es-plugins:/usr/share/elasticsearch/plugins \
    --privileged \
    --network es-net \
    -p 9200:9200 \
    -p 9300:9300 \
elasticsearch:7.12.1
```

命令解释：

- `-e "cluster.name=es-docker-cluster"`：设置集群名称
- `-e "http.host=0.0.0.0"`：监听的地址，可以外网访问
- `-e "ES_JAVA_OPTS=-Xms512m -Xmx512m"`：内存大小
- `-e "discovery.type=single-node"`：非集群模式
- `-v es-data:/usr/share/elasticsearch/data`：挂载逻辑卷，绑定es的数据目录
- `-v es-logs:/usr/share/elasticsearch/logs`：挂载逻辑卷，绑定es的日志目录
- `-v es-plugins:/usr/share/elasticsearch/plugins`：挂载逻辑卷，绑定es的插件目录
- `--privileged`：授予逻辑卷访问权
- `--network es-net` ：加入一个名为es-net的网络中
- `-p 9200:9200`：端口映射配置



在浏览器中输入：http://yourIp:9200 即可看到elasticsearch的响应结果：

![image-20210506101053676](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20210506101053676.png)





## 2.部署kibana

kibana可以给我们提供一个elasticsearch的可视化界面，便于我们学习。

### 2.1.部署

运行docker命令，部署kibana

```sh
docker run -d \
--name kibana \
-e ELASTICSEARCH_HOSTS=http://es:9200 \
--network=es-net \
-p 5601:5601  \
kibana:7.12.1
```

- `--network es-net` ：加入一个名为es-net的网络中，与elasticsearch在同一个网络中
- `-e ELASTICSEARCH_HOSTS=http://es:9200"`：设置elasticsearch的地址，因为kibana已经与elasticsearch在一个网络，因此可以用容器名直接访问elasticsearch
- `-p 5601:5601`：端口映射配置

kibana启动一般比较慢，需要多等待一会，可以通过命令：

```sh
docker logs -f kibana
```

查看运行日志，当查看到下面的日志，说明成功：

![image-20210109105135812](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20210109105135812.png)

此时，在浏览器输入地址访问：http://yourIp:5601，即可看到结果

![image-20230620105742143](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230620105742143.png)

![image-20230620105806061](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230620105806061.png)

![image-20230620105820035](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230620105820035.png)









### 2.2.DevTools

kibana中提供了一个DevTools界面：

![image-20230620105845441](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230620105845441.png)

![image-20210506102630393](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20210506102630393.png)

这个界面中可以编写DSL来操作elasticsearch。并且对DSL语句有自动补全功能。





## 3.安装IK分词器

ES默认的分词器对中文的支持不友好，所以我们需要使用支持中文分词的插件。

[GitHub官网IK分词器](https://github.com/medcl/elasticsearch-analysis-ik)

我们对中文进行分词

```json
GET /_analyze
{
  "analyzer": "standard",
  "text": "你好！软件工程太牛了！"
}
```

查看分词的结果，竟然对每一个字进行了分词，说明ES默认是不支持中文分词的

![image-20230620113343605](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230620113343605.png)





### 3.1.在线安装ik插件（较慢）

```shell
# 进入容器内部
docker exec -it elasticsearch /bin/bash

# 在线下载并安装
./bin/elasticsearch-plugin  install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.12.1/elasticsearch-analysis-ik-7.12.1.zip

#退出
exit
#重启容器
docker restart elasticsearch
```



### 3.2.离线安装ik插件（推荐）

### 1）查看数据卷目录

安装插件需要知道elasticsearch的plugins目录位置，而我们用了数据卷挂载，因此需要查看elasticsearch的数据卷目录，通过下面命令查看:

```sh
docker volume inspect es-plugins
```

显示结果：

```json
[
    {
        "CreatedAt": "2022-05-06T10:06:34+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/es-plugins/_data",
        "Name": "es-plugins",
        "Options": null,
        "Scope": "local"
    }
]
```

说明plugins目录被挂载到了：`/var/lib/docker/volumes/es-plugins/_data `这个目录中。



### 2）解压缩分词器安装包

解压后的文件夹命名为ik，这样命名方便我们使用，将解压后的插件上传到服务器

![image-20210506110249144](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20210506110249144.png)

### 3）上传到es容器的插件数据卷中

也就是`/var/lib/docker/volumes/es-plugins/_data `：

![image-20210506110704293](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20210506110704293.png)

至此，IK分词器这个ES插件已经安装完成了，重启ES。



###  4）重启容器

```shell
# 4、重启容器
docker restart es
```

```sh
# 查看es日志
docker logs -f es
```

### 5）测试：

IK分词器包含两种模式：

* `ik_smart`：最少切分

* `ik_max_word`：最细切分

还是上面的那个文本，

```json
GET /_analyze
{
  "analyzer": "ik_smart",
  "text": "你好！软件工程太牛了！"
}
```

结果：分的还是比较准确的。

```json
{
  "tokens" : [
    {
      "token" : "你好",
      "start_offset" : 0,
      "end_offset" : 2,
      "type" : "CN_WORD",
      "position" : 0
    },
    {
      "token" : "软件工程",
      "start_offset" : 3,
      "end_offset" : 7,
      "type" : "CN_WORD",
      "position" : 1
    },
    {
      "token" : "太",
      "start_offset" : 7,
      "end_offset" : 8,
      "type" : "CN_CHAR",
      "position" : 2
    },
    {
      "token" : "牛",
      "start_offset" : 8,
      "end_offset" : 9,
      "type" : "CN_CHAR",
      "position" : 3
    },
    {
      "token" : "了",
      "start_offset" : 9,
      "end_offset" : 10,
      "type" : "CN_CHAR",
      "position" : 4
    }
  ]
}

```



## IK分词器的使用



### 3.3 扩展词词典

分词的原理就是底层有一个字典，依照字典中的词进行分词。

字典中提供的词肯定是不够用的，因为互联网“造词”太快了，几天一个新的词语，哈哈哈。

所以我们的词汇也需要不断的更新，IK分词器提供了扩展词汇的功能。

1）打开IK分词器config目录：

![image-20210506112225508](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20210506112225508.png)

2）在此目录下，我们来自定义词汇，新建一个`ext.dic`文件，输入我们自定义的词

```properties
太牛了
社恐
社牛
白嫖
```



3）在`IKAnalyzer.cfg.xml`配置文件中，将我们自己的词典配置进去

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
        <comment>IK Analyzer 扩展配置</comment>
        <!--用户可以在这里配置自己的扩展字典 *** 添加扩展词典-->
        <entry key="ext_dict">ext.dic</entry>
</properties>
```



4）重启elasticsearch 

```sh
docker restart es

# 查看 日志
docker logs -f elasticsearch
```

![image-20201115230900504](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20201115230900504.png)

日志中已经成功加载ext.dic配置文件

5）测试效果：

```json
GET /_analyze
{
  "analyzer": "ik_smart",
  "text": "软件工程太牛了！我是一个社恐，我不是社牛，我喜欢白嫖"
}
```

已经将我们定义的词汇分出来了。

```json
{
  "tokens" : [
    {
      "token" : "软件工程",
      "start_offset" : 0,
      "end_offset" : 4,
      "type" : "CN_WORD",
      "position" : 0
    },
    {
      "token" : "太牛了",
      "start_offset" : 4,
      "end_offset" : 7,
      "type" : "CN_WORD",
      "position" : 1
    },
    {
      "token" : "我",
      "start_offset" : 8,
      "end_offset" : 9,
      "type" : "CN_CHAR",
      "position" : 2
    },
    {
      "token" : "是",
      "start_offset" : 9,
      "end_offset" : 10,
      "type" : "CN_CHAR",
      "position" : 3
    },
    {
      "token" : "一个",
      "start_offset" : 10,
      "end_offset" : 12,
      "type" : "CN_WORD",
      "position" : 4
    },
    {
      "token" : "社恐",
      "start_offset" : 12,
      "end_offset" : 14,
      "type" : "CN_WORD",
      "position" : 5
    },
    {
      "token" : "我",
      "start_offset" : 15,
      "end_offset" : 16,
      "type" : "CN_CHAR",
      "position" : 6
    },
    {
      "token" : "不是",
      "start_offset" : 16,
      "end_offset" : 18,
      "type" : "CN_WORD",
      "position" : 7
    },
    {
      "token" : "社牛",
      "start_offset" : 18,
      "end_offset" : 20,
      "type" : "CN_WORD",
      "position" : 8
    },
    {
      "token" : "我",
      "start_offset" : 21,
      "end_offset" : 22,
      "type" : "CN_CHAR",
      "position" : 9
    },
    {
      "token" : "喜欢",
      "start_offset" : 22,
      "end_offset" : 24,
      "type" : "CN_WORD",
      "position" : 10
    },
    {
      "token" : "白嫖",
      "start_offset" : 24,
      "end_offset" : 26,
      "type" : "CN_WORD",
      "position" : 11
    }
  ]
}

```



> 注意当前文件的编码必须是 UTF-8 格式，严禁使用Windows记事本编辑

### 停用词词典

在互联网项目中，在网络间传输的速度很快，所以很多语言是不允许在网络上传递的，如：关于宗教、政治等敏感词语，那么我们在搜索时也应该忽略当前词汇。

IK分词器也提供了强大的停用词功能，让我们在索引时就直接忽略当前的停用词汇表中的内容。

1）IKAnalyzer.cfg.xml配置文件内容添加：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
        <comment>IK Analyzer 扩展配置</comment>
        <!--用户可以在这里配置自己的扩展字典-->
        <entry key="ext_dict">ext.dic</entry>
         <!--用户可以在这里配置自己的扩展停止词字典  *** 添加停用词词典-->
        <entry key="ext_stopwords">stopword.dic</entry>
</properties>
```

3）在 `stopword.dic`文件中， 添加停用词

```properties
习大大
```

4）重启elasticsearch 

```sh
# 重启服务
docker restart elasticsearch
docker restart kibana

# 查看 日志
docker logs -f elasticsearch
```

日志中已经成功加载stopword.dic配置文件

5）测试效果：

```json
GET /_analyze
{
  "analyzer": "ik_smart",
  "text": "我爱习大大!"
}
```

并没有把我们定义的词分出来

```json
{
  "tokens" : [
    {
      "token" : "我",
      "start_offset" : 0,
      "end_offset" : 1,
      "type" : "CN_CHAR",
      "position" : 0
    },
    {
      "token" : "爱",
      "start_offset" : 1,
      "end_offset" : 2,
      "type" : "CN_CHAR",
      "position" : 1
    },
    {
      "token" : "习",
      "start_offset" : 2,
      "end_offset" : 3,
      "type" : "CN_CHAR",
      "position" : 2
    },
    {
      "token" : "大大",
      "start_offset" : 3,
      "end_offset" : 5,
      "type" : "CN_WORD",
      "position" : 3
    }
  ]
}

```



> 注意当前文件的编码必须是 UTF-8 格式，严禁使用Windows记事本编辑





## 总结

分词器的作用是：

- 创建倒排索引时对文档分词
- 用户搜索时，对输入的内容分词

​	**IK分词器的两种模式：**

- `ik_smart`，智能切分，粒度较粗
- `ik_max_word`，最细划分，细粒度







# 操作

## 回顾ES的概念

重新再来梳理一遍ES的核心概念。

**ES就是一个服务，可以通过RESTFul风格的API来与ES交互**



**ES是面向文档的，一条文档就是一个数据，文档就是JSON格式的数据，像下面这样，就是一条文档：**

```json
{
    "name": "zhangsan",
    "age": "18",
    "address": {
        "province": "shandong",
        "city": "weihai"
    }
}
```

**索引index就相当于MySQL中的表，用来规定数据的结构，多个文档如果结构相同，就认为属于同一个索引**

**因为一个索引index可以有多个文档，因此索引也可以叫做索引库**



**还有一个概念就是映射mapping，用来规定一个字段的类型**

**定义索引时，就会用到mapping来定义数据中每个字段的类型**



## mapping属性

**mapping是对索引库中文档的约束，常见的mapping属性包括：**

- **type：字段数据类型，常见的简单类型有：**
  - **字符串：text（可分词的文本）、keyword(精确值，不可再分)**
  - **数值 long、integer、short、byte、double、float**
  - **布尔 boolean**
  - **日期date**
  - **对象object**
- **索引index：是否创建索引，默认为true**
- **analyzer：分词器类型，使用哪种分词器**
- **properties：该字段的子字段**

创建索引库就需要使用映射mapping



## 索引库

### 创建索引库

ES通过RestFul请求操作请求索引库、文档，请求内容用DSL语句表示。

注意：

- **PUT请求，后跟索引库路径**



**创建索引库和mapping的DSL语法如下**，

比如说，我们现在创建一个Person类型的索引库，

这个数据的结构是这样的
```json
{
    "name": {
        "lastName": "zhang",
        "firstName": "san"
    },
    "email": "123456@gmail.com",
    "info": "你好！我叫张三，软件工程，程序员"
}
```

对该文档进行搜索时，限制只有info字段能倒排索引

所以索引可以创建：

```json

PUT /person
{
    "mappings": {
        "properties": {
            "name": {
                "type": "object",
                "properties": {
                    "firstName": {
                        "type": "keyword"
                    },
                    "lastName": {
                        "type": "keyword"
                    }
                }
            },
            "email": {
                "type": "keyword",
                "index": "false"
            },
            "info": {
                "type": "text",
                "analyzer": "ik_smart"
            }
        }
    }
    
}
```



这样一个索引库就创建好了



### 查询索引库

```json
GET /索引库名称
```

例如，查看我们刚才创建的person索引库

```json
GET /person
```

就会得到这个索引库的信息

```json
{
  "person" : {
    "aliases" : { },
    "mappings" : {
      "properties" : {
        "email" : {
          "type" : "keyword",
          "index" : false
        },
        "info" : {
          "type" : "text",
          "analyzer" : "ik_smart"
        },
        "name" : {
          "properties" : {
            "firstName" : {
              "type" : "keyword"
            },
            "lastName" : {
              "type" : "keyword"
            }
          }
        }
      }
    },
    "settings" : {
      "index" : {
        "routing" : {
          "allocation" : {
            "include" : {
              "_tier_preference" : "data_content"
            }
          }
        },
        "number_of_shards" : "1",
        "provided_name" : "person",
        "creation_date" : "1687499674171",
        "number_of_replicas" : "1",
        "uuid" : "ITHFnRGjRpuLKINh2e5lEg",
        "version" : {
          "created" : "7120199"
        }
      }
    }
  }
}

```



### 删除索引库

因为是RESTFul风格，所以操作很简单

删除索引库

```json
DELETE /索引库名称
```

例如，删除我们刚才创建的person索引库

```json
DELETE /person
```

得到响应结果

```json
{
  "acknowledged" : true
}

```





### 修改索引库

**在ES中，索引库是不允许修改的，会导致倒排索引失效。**

**但是可以新增mapping，**

语法规则

```json
PUT /索引库名称/_mapping
{
    "properties": {
        "新字段名": {
            "type": "xxx"
        }
    }
}
```

**注意：必须是不存在的映射名，如果是已存在的索引名，那么ES就会认为你想要修改映射，直接报错。**

例如，为刚才的Person索引库新增一个age属性映射

```json
PUT /person/_mappings
{
  "properties":{
    "age":{
      "type": "integer"
    }
  }
}
```









## 文档

 ### 新增文档

就是将我们的JSON数据发送给索引库。



DSL语法规则：

```json
POST /索引库名称/_doc/文档id
{
    "字段1": "值1",
    "字段2": "值2",
    "字段3": {
        "子属性1": "值",
        "子属性2": "值"
    },
}
```

**如果不加id，ES就认为你的文档没有id，所以就会自动随机生成文档id**

例如，新增一个person类型的文档

```json
POST /person/_doc/1
{
  "name":{
    "firstName": "刘",
    "lastName": "明凯"
  },
  "age": 18,
  "email": "1793645613@qq.com",
  "info": "我是一个大傻瓜"
}

```





### 查询文档

```json
GET /索引库/_doc/文档id
```

例如

```json
GET /person/_doc/1
```

查询结果

```json
{
  "_index" : "person",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 1,
  "_seq_no" : 0,
  "_primary_term" : 1,
  "found" : true,
  "_source" : {
    "name" : {
      "firstName" : "刘",
      "lastName" : "明凯"
    },
    "age" : 18,
    "email" : "1793645613@qq.com",
    "info" : "我是一个大傻瓜"
  }
}

```





### 删除文档

```json
DELETE /index/_doc/id
```

例如

```json
DELETE /person/_doc/1
```



### 修改文档



有两种修改方式：

- 方式一：**全量修改，会删除旧的文档，新增文档**

  如果id存在则是修改，如果id不存在就是新增文档

```json
PUT /index/_doc/id
{
    "prop1": "value1",
    "prop2": "value2",
    "prop3": {
        "prop3": "value3",
        "prop4": "value4"
    }
}
```

例如：

```json
PUT /person/_doc/1
{
  "name": {
    "firstName": "明",
    "lastName": "小"
  },
  "age": 19,
  "email": "123@22.com",
  "info": "你好!我是小明，我上大学了"
}

```



- 方式二：**增量修改，修改指定的字段**

```json
POST /index/_update/id
{
    "doc": {
        "prop1": "newValue"
    }
}
```

例如

```json
POST /person/_update/1
{
  "doc":{
    "email": "179@qq.com"
  }
}
```

**注意：是POST请求**











# RestClient

## 介绍

**ES官方提供了各种不同语言的客户端，用来操作ES。这些客户端的本地就是组装DSL语句，通过Http请求发送给ES服务器**

[官方文档RestClient](https://www.elastic.co/guide/en/elasticsearch/client/index.html)

可以看到ES官方提供各种语言的RestClient

![image-20230623143931187](https://kkbank.oss-cn-qingdao.aliyuncs.com/note-img/image-20230623143931187.png)









## 快速开始

1. 数据库准备数据

```sql
CREATE TABLE `tb_hotel`  (
  `id` bigint(20) NOT NULL COMMENT '酒店id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '酒店名称',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '酒店地址',
  `price` int(10) NOT NULL COMMENT '酒店价格',
  `score` int(2) NOT NULL COMMENT '酒店评分',
  `brand` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '酒店品牌',
  `city` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '所在城市',
  `star_name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '酒店星级，1星到5星，1钻到5钻',
  `business` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商圈',
  `latitude` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '纬度',
  `longitude` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '经度',
  `pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '酒店图片',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;
```



2. 根据表结构，在ES中创建索引库，按照业务分析字段要不要分词

```json
```









# DSL

























