/*node介绍*/
    简单的说，node.js就是运行在服务端的JavaScript。是一个事件驱动I/O服务端JavaScript环境，基于Google的v8引擎，使执行JavaScript的速度更快，性能更好。
    创建Node.js应用的组成：
        1）引入required模块
            我们可以通过require指令来载入Node.js模块，并将实例化的HTTP赋值给变量http
        2）创建服务器
            使用http.createServer()方法创建服务器，使用listen方法监听8888端口。
        3）接收请求与相应请求
            然后在createServer()方法中使用函数通过request,response参数来接收和响应数据
    
/*NPM介绍*/
    NPM是随同NodeJS一起安装的包管理工具，能够解决NodeJS代码部署上的诸多问题。
    使用npm命令安装模块：
        全局安装：npm install express -g ，其安装包放在 /usr/local 下或者 node 的安装目录下，可以直接在命令行里使用。
        本地安装：npm install express ，其安装包会放在运行npm时所在的 ./node_modules 文件夹下，可以通过require来引入。
        
/*Node.js REPL(交互式解释器)*/        
    Node.js REPL表示一个电脑的环境，类似window系统终端或Unix/Linux 系统终端，我们可以在终端中输入命令，并接收系统的响应。
    Node自带有交互式解析器，可以执行以下任务：
        1）读取   
            读取用户输入，解析输入了JavaScript数据结构并存储在内存中
        2）执行
            执行输入的数据结构
        3）打印
            输出结果
        4）循环
            循环操作以上步骤直到用户两次按下ctrl+c案件退出
    启动node终端：node + 回车  
    停止node终端：按两次ctrl + c    

/*Node回调*/
    node异步编程的直接体现就是回调。回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数。
        例如，我们可以一边读取文件，一边执行其他命令，在文件读取完成后，我们将文件内容作为回调函数的参数返回。这样在执行代码时就没有阻塞或等待文件 I/O 操作。这就大大提高了 Node.js 的性能，可以处理大量的并发请求。
    回调函数一般作为函数的最后一个参数出现：
        function foo1(name, age, callback) { }
        function foo2(value, callback1, callback2) { }
    
/*Node事件循环*/    
    Nodejs是单进程单线程的应用程序，但是因为V8引擎提供的异步执行回调接口，通过这些接口可以处理大量的并发，所以性能非常高
    nodejs基本上所有的事件机制都是用设计模式中的观察者模式实现的。
    nodejs单线程类似进入一个while(true)的事件循环，知道没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数。
    
    //事件驱动程序
        nodejs使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后再去服务下一个web请求。当这个请求完成，它被放回处理列队，当到达列队开头，这个结果就被返回给用户。
        这种模型非常搞笑可扩展性非常强，因为webserver一直接受请求而不等待任何读写操作。（这也称之为非阻塞式IO或事件驱动IO）
        在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数。
    Node有多个内置的事件，我们可以通过引入events模块，并通过实例化EventEmitter类来绑定和监听事件，如下：
        //引入event模块
        var events = require("events");
        //创建eventEmitter对象
        var eventEmitter = new evnets.EventEmitter();
        //绑定事件及事件处理程序
        eventEmitter.on("eventName",evnetHandler);
        //触发事件
        eventEmitter.emit("eventName");
    
/*Node EventEmitter*/
    nodejs所有的异步I/O操作在完成时都会发送一个事件到事件列队
    node里面许多对象都会分发事件：一个net.Server对象会在每次有新连接时触发一个事件，一个fs.readStream对象会在文件被打开的时候触发一个事件。所有这些产生事件的对象都是events.EventEmitter的实例
    //EventEmitter类
        event模块只提供了一个对象：events.EventEmitter。EventEmitter的核心就是事件触发与事件监听器功能的封装。
        EventEmitter对象如果在实例化时发生错误，会触发error事件。当添加新的监听器时，newListener事件会触发。当监听器被移除时，removeListener事件被触发。
        
        当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。
        //event.js 文件
            var events = require('events'); 
            var emitter = new events.EventEmitter(); 
            emitter.on('someEvent', function(arg1, arg2) { 
                console.log('listener1', arg1, arg2); 
            }); 
            emitter.on('someEvent', function(arg1, arg2) { 
                console.log('listener2', arg1, arg2); 
            }); 
            emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');
        //运行结果   
            listener1 arg1 参数 arg2 参数
            listener2 arg1 参数 arg2 参数
    
/*Node Buffer*/
    在node.js中，定义了一个Buffer（缓冲区）类，用来创建一个专门存放二进制数据的缓存区。
    在node.js中，Buffer类是随node内核一起发布的核心库，Buffer为Node.js带来了一种存储原始数据的方法，可以让Node.js处理二进制数据，每当需要在Node.js中处理I/O操作中移动的数据时，就有可能使用Buffer库。原始数据存储在Buffer库的实例中。一个Buffer类似于一个整数数组，但它对应于V8堆内存之外的一块原始内存。
    //Buffer与字符编码
        Buffer实例一般用于表示编码字符的序列，比如UTF-8、UCS2、Base64、或十六进制编码的数据。通过使用显示的字符编码，就可以在Buffer实例与普通的JavaScript字符串之间进行相互转换
    //创建Buffer类（返回一个Buffer实例）
       const buf1 = Buffer.alloc()
       const buf2 =Buffer.from()
    //写入缓冲区（返回实际写入的大小）
        buf = Buffer.alloc(256);
        len = buf.write("www.runoob.com");
        console.log("写入字节数 : "+  len); //14
    //从缓冲区读取数据（解码缓冲区数据并使用指定的编码返回字符串）
        buf = Buffer.alloc(26);
        for (var i = 0 ; i < 26 ; i++) {
          buf[i] = i + 97;
        }

        console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
        console.log( buf.toString('ascii',0,5));   //使用 'ascii' 编码, 并输出: abcde
    //将buffer转换为JSON对象（返回json对象）
        buf.toJSON()
    //缓冲区合并（返回一个多个成员合并的新Buffer对象）
        Buffer.concat([buffer1,buffer2]);
    //缓冲区比较（返回一个数字）   
        buf.compare(otherBuffer);
    //拷贝缓冲区（无返回值）
        buf.copy()
    //缓冲区裁剪（返回一个新的缓冲区）
        buf.slice()
    //缓冲区长度（返回Buffer对象所占据的内存长度）
        buf.length
    
/*Node Stream*/    
    Stream（流）是一个抽象接口，node中很多对象实现了这个接口，例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。
    node中Stream有四种流类型：
        1）Readable-可读操作
        2）Writabel-可写操作
        3）Duplex-可读可写操作
        4）Transform-操作被写入数据，然后读出结果
    所有的Stream对象都是EventEmitter的实例，常用的事件有：
        1）data-当有数据可读时触发
        2）end-没有更多的数据可读时触发
        3）error-在接收和写入过程中发生错误时触发
        4）finish-所有数据已被写入到底层系统时触发
    //从流中读取数据
        var fs = require("fs");
        var data = 'hello ';
        // 创建可读流
        var readerStream = fs.createReadStream('input.txt'); //input.txt里面写了 world~
        // 设置编码为 utf8。
        readerStream.setEncoding('UTF8');
        // 处理流事件 --> data, end, and error
        readerStream.on('data', function(chunk) {
           console.log(data + chunk); //打印 hello world~
        });

    //写入流
        








    
