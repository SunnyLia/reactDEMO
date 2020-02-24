/*NoSQL简介 */
    NoSQL(Not Only SQL)，指的是非关系型的数据库，是对不同于传统的关系型数据库(RDBMS)的数据管理系统的统称。
    NoSQL用于超大规模数据的存储，例如谷歌或Facebook每天为他们的用户手机万一比特的数据，这些类型的数据存储不需要固定的模式，无需多余操作就可以横向扩展。
    1、为什么使用NoSQL？
        如今，我们可以通过第三方平台可以很容易的访问和抓取数据，用户的个人信息，社交网络，地理位置，用户生成的数据和用户操作日志已经成倍的增加。而我们如果要对这些用户数据进行挖掘，那SQL数据库已经不适合这些应用了，NoSQL数据库的发展却能很好的处理这些大的数据。
    2、关系型数据库(RDBMS)和非关系型数据库(NoSQL)的区别？
        RDBMS: 
            - 高度组织化结构化数据 
            - 结构化查询语言（SQL） (SQL) 
            - 数据和关系都存储在单独的表中。 
            - 数据操纵语言，数据定义语言 
            - 严格的一致性
            - 基础事务
        
        NoSQL: 
            - 代表着不仅仅是SQL
            - 没有声明性查询语言
            - 没有预定义的模式
            -键 - 值对存储，列存储，文档存储，图形数据库
            - 最终一致性，而非ACID属性
            - 非结构化和不可预知的数据
            - CAP定理 
            - 高性能，高可用性和可伸缩性
    3、NoSQL的优缺点？
        优点:
            - 高可扩展性
            - 分布式计算
            - 低成本
            - 架构的灵活性，半结构化数据
            - 没有复杂的关系

        缺点:
            - 没有标准化
            - 有限的查询功能（到目前为止）
            - 最终一致是不直观的程序
    4、NoSQL数据库分类？
        NoSQL数据库根据类型分为列存储、文档存储、key-value存储、图存储、对象存储、xml数据库。


/* MongoDB简介*/
    1、什么是mongoDB?
        mongoDB是有C++语言编写的，是一个基于分布式文件存储的开源数据库系统，旨在为web应用提供可扩展的高性能数据存储解决方法。
        MongoDB将数据存储为一个文档，数据结构由键值(key => value)对组成，类似于JSON对象，字段可以包含其他文档、数组及文档数组。
    2、MongoDB主要特点？
        -MongoDB 是一个面向文档存储的数据库，操作起来比较简单和容易。
        -你可以在MongoDB记录中设置任何属性的索引 (如：FirstName="Sameer",Address="8 Gandhi Road")来实现更快的排序。
        -你可以通过本地或者网络创建数据镜像，这使得MongoDB有更强的扩展性。
        -如果负载的增加（需要更多的存储空间和更强的处理能力） ，它可以分布在计算机网络中的其他节点上这就是所谓的分片。
        -Mongo支持丰富的查询表达式。查询指令使用JSON形式的标记，可轻易查询文档中内嵌的对象及数组。
        -MongoDb 使用update()命令可以实现替换完成的文档（数据）或者一些指定的数据字段 。
        -Mongodb中的Map/reduce主要是用来对数据进行批量处理和聚合操作。
        -Map和Reduce。Map函数调用emit(key,value)遍历集合中所有的记录，将key与value传给Reduce函数进行处理。
        -Map函数和Reduce函数是使用Javascript编写的，并可以通过db.runCommand或mapreduce命令来执行MapReduce操作。
        -GridFS是MongoDB中的一个内置功能，可以用于存放大量小文件。
        -MongoDB允许在服务端执行脚本，可以用Javascript编写某个函数，直接在服务端执行，也可以把函数的定义存储在服务端，下次直接调用即可。
        -MongoDB支持各种编程语言:RUBY，PYTHON，JAVA，C++，PHP，C#等多种语言。
        -MongoDB安装简单。

/*MongoDB语法*/
    1）查看所有数据库：show dbs
    2）显示当前数据库：db
    3）使用某个数据库：use test(数据库名)
    4）创建数据库：use demo(use一个不存在的数据库名则会创建一个新的数据库demo,但是它现在还并不存在数据库列表中，要显示它，我们需要向demo数据库插入一些数据)
    5）删除当前数据库：db.dropDatabase();

    7）创建集合：db.createCollection(name, options) //不需要自己创建集合，当向数据库插入文档时，会自动创建集合demo
    8）查看集合：show collections 或者 show tables
    9）删除集合：db.demo.drop() 
    
    10）插入文档：db.demo.insert({"name":"张三"})
    11）查看插入的文档：db.demo.find()
    12）更新文档：
        db.collection.update(
            <query>, //查询条件
            <update>, //更新文档
            {
                 upsert: <boolean>, //可选，如果没有
                 multi: <boolean>, //可选，是否全部更新
                 writeConcern: <document>
            }
         )
        db.demo.update({"name":"张三"},{$set:{"name":"李四"}}); //这个只会更新查找的第一条
        db.demo.update({"name":"张三"},{$set:{"name":"李四"}},false,true); //会更新符合查找条件的所有
        
    

/*MongoDB操作符*/
    例如，我们在demo集合中插入n条数据 db.demo.insert({"name":"张三","age":20,"sex":"女"})
    0）(=) 等于 ==> $eq
    0）(!=) 不等于 ==> $ne 
    1）(>) 大于 ==> $gt 
    2）(<) 小于 ==> $lt //db.demo.find({"age" : {$lt : 20}}) 在demo集合中找到年龄小于20的数据
    3）(>=) 大于等于 ==> $gte //db.demo.find({"age" : {$gte : 20}}) 在demo集合中找到年龄大于等于20的数据
    4）(<=) 小于等于 ==> $lte
    5）(a<x<y) 大于a小于y  //db.demo.find({"age" : {$gt : 18 , $lt : 24 }}) 在demo集合中找到年龄大于18小于24的数据
    6）在某些范围内 ==> $in  //db.demo.find({"age" : {$in : [ 18, 24 ] }}) 在demo集合中找到年龄为18和24的数据
    7）不在某些范围内 ==> $nin  //db.demo.find({"age" : {$nin : [ 18, 24 ] }}) 在demo集合中找到年龄不是18和24的数据
    8）多种条件查找 ==> $or  //db.demo.find({'$or':[{'age': 20},{'sex':'女'}]}) 在demo集合中找到年龄是18岁或者是女生的数据
      

/*MongoDB修饰符*/
    1）$inc
    1）$set
    1）$unset
    1）$push
    1）$pop
    1）$upsert












