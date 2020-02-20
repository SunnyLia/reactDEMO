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
        // 创建一个可以写入的流，写入到文件 output.txt 中
        var writerStream = fs.createWriteStream('output.txt');
        // 使用 utf8 编码写入数据
        writerStream.write(data,'UTF8');
        // 标记文件末尾
        writerStream.end();
        // 处理流事件 --> data, end, and error
        writerStream.on('finish', function() {
            console.log("数据已经被写入文件中~");
        });
    //管道流   
        管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
        // 创建一个可读流
        var readerStream = fs.createReadStream('input.txt');
        // 创建一个可写流
        var writerStream = fs.createWriteStream('output.txt');
        // 管道读写操作
        readerStream.pipe(writerStream);
        console.log("input的内容已经写入到output里面了~");
    //链式流
        链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。
        1）压缩文件
            // 压缩 input.txt 文件为 input.txt.gz
            fs.createReadStream('input.txt')
              .pipe(zlib.createGzip())
              .pipe(fs.createWriteStream('input.txt.gz'));    
        2）解压文件
            // 解压 input.txt.gz 文件为 input.txt
            fs.createReadStream('input.txt.gz')
              .pipe(zlib.createGunzip())
              .pipe(fs.createWriteStream('input.txt'));
    
/*node 模块系统*/
    模块是nodejs应用程序的基本组成部分，文件和模块是一一对应的。换而言之，一个nodejs文件就是一个模块，这个文件可能是JavaScript代码、JSON、或者编辑过的c/c++扩展
    //创建模块
        Node.js提供了exports和require两个对象，其中exports是模块公开的接口，require用于从外部获取一个模块的接口，即所获取模块的exports对象
        //hello.js 
            function Hello() { 
                var name; 
                this.setName = function(thyName) { 
                    name = thyName; 
                }; 
                this.sayHello = function() { 
                    console.log('Hello ' + name); 
                }; 
            }; 
            module.exports = Hello;      

        //main.js 
            var Hello = require('./hello'); 
            hello = new Hello(); 
            hello.setName('BYVoid'); 
            hello.sayHello(); 
    //服务端的模块放在哪里
        1) 从文件模块缓存中加载（优先级最高）
        2）从原生模块加载（优先级8仅次文件缓存）
            原生模块也有一个缓存区，同样也是优先从缓存区加载。如果缓存区没有被加载过，则调用原生模块的加载方式进行加载和执行
        3）从文件加载
            当文件模块缓存中不存在，而且不是原生模块的时候，Node.js会解析require方法传入的参数，并从文件系统中加载实际的文件。
            require方法接受一下几种参数的传递：
                a）http、fs、path等，原生模块。
                b）./mod或../mod，相对路径的文件模块。
                c）/pathtomodule/mod，绝对路径的文件模块。
                d）mod，非原生模块的文件模块


/*Node 函数*/
    我们可以把一个函数作为变量传递，也可以直接在另一个函数的括号中定义和传递这个函数：
    function execute(someFunction, value) {
      someFunction(value);
    }
    execute(function(word){ console.log(word) }, "Hello");           
        
/*Node 路由*/
    我们需要的所有的数据都会包含在request对象中，该对象作为onRequest()回调函数的第一个参数传递。但是为了解析这些数据，我们需要额外的Node.js模块，分别是url和querystring模块
    例如：http://localhost:8888/start?hello=world
        url.parse(string).pathname //  /start
        url.parse(string).query //   //hello=world
        querystring.parse(querystring)["hello"] //world
    如何把路由和服务器整合在一起？
    1）建立一个名为router.js的文件
        function route(pathname) {
          console.log("About to route a request for " + pathname);
        }
        exports.route = route;
    2）在server.js文件中，将路由函数作为参数传递给服务器的start()函数
        var http = require("http");
        var url = require("url");

        function start(route) {
          function onRequest(request, response) {
            var pathname = url.parse(request.url).pathname;
            console.log("Request for " + pathname + " received.");

            route(pathname);

            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write("Hello World");
            response.end();
          }

          http.createServer(onRequest).listen(8888);
          console.log("Server has started.");
        }

        exports.start = start;
    3）在index.js文件中，我们将路由函数注入到服务器中
        var server = require("./server");
        var router = require("./router");
        server.start(router.route);

/*Node 全局对象*/
    在Node.js中的全局对象是global,所有全局变量（除了global本身以外）都是global对象的属性，我们可以在程序的任何地方访问到global属性，而不需要在应用中包含它。
    1）全局对象与全局变量
        global最根本的左右是作为全局变量的宿主。满足以下条件的变量是全局变量：
            a）在最外层定义的变量
            b）全局对象的属性
            c）隐式定义的变量（未定义直接赋值的变量）
        当你定义一个全局变量时，这个变量同时也会成为全局变量的属性，反之亦然。需要注意的是，在node.js中你不吭呢在最外层定义变量，因为所有用户代码都是属于当前模块的，而模块本身不是最外层上下文。
        注意：最好不要使用var定义变量而避免引入全局变量，因为全局变量会污染命名空间，提高代码的耦合风险
    2）_filename
        _filename表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。如果在模块中，返回的值是模块文件的路径
        main.js中 console.log( __filename ); ///web/com/runoob/nodejs/main.js
    3）_dirname
        _dirname表示当前执行脚本所在的目录
        main.js中 console.log( __dirname );  ///web/com/runoob/nodejs
    4）setTimeout(cb,ms)    
    5）clearTimeout(t)    
    6）setInterval(cb,ms)  
    7）clearInterval(t)    
    8）console   
    9）process   
        process是一个全局变量，是global对象的属性
        它用于描述当前node.js进程状态的对象，提供了一个与操作系统的简单接口。
            process.on('exit', function(code) { //"exit"表示当进程准备退出时触发
              // 以下代码永远不会执行
              setTimeout(function() {
                 console.log("该代码不会执行");
              }, 0);

              console.log('退出码为:', code);
            });
            console.log("程序执行结束");
        
/*Node 文件系统*/
    nodejs提供一组类似UNIX标准的文件操作API。node导入文件系统模块（fs）语法：var fs = require("fs")；
    //异步&同步
        Node.js文件系统（fs模块）中的方法均有异步和同步版本，例如读取文件内容的函数有异步的fs.readFile()和同步的fs.readFileSync（）。
        异步的方法函数最后一个函数为回调函数，回调函数的第一个参数包含了错误信息（error）。
        建议大家使用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。
            var fs = require("fs");
            // 异步读取
            fs.readFile('input.txt', function (err, data) {
               if (err) {
                   return console.error(err);
               }
               console.log("异步读取: " + data.toString());
            });
            // 同步读取
            var data = fs.readFileSync('input.txt');
            console.log("同步读取: " + data.toString());

   //打开文件
        异步模式下打开文件的语法格式：fs.open(path, flags[, mode], callback)
   //获取文件信息
        异步模式获取文件信息的语法格式：fs.stat(path, callback)
   //写入文件
        异步模式下写入文件的语法格式：fs.writeFile(file, data[, options], callback)
   //读取文件
        异步模式下读取文件的语法格式：fs.read(fd, buffer, offset, length, position, callback)
   //关闭文件
        异步模式下关闭文件的语法格式：fs.close(fd, callback)
   //截取文件
        异步模式下截取文件的语法格式：fs.ftruncate(fd, len, callback)
   //删除文件
        删除文件的语法格式：fs.unlink(path, callback)
   //创建目录
        创建目录的语法格式：fs.mkdir(path[, options], callback)
   //读取目录
        读取目录的语法格式：fs.readdir(path, callback)
   //删除目录
        删除目录的语法格式：fs.rmdir(path, callback)
        
/*Node GET/POST*/  
    //获取GET请求内容
        Get请求的内容直接被嵌入在路径中，获取url的参数 url.parse()
            var http = require('http');
            var url = require('url');
            var util = require('util');

            http.createServer(function(req, res){
                res.writeHead(200, {'Content-Type': 'text/plain'});

                // 解析 url 参数
                var params = url.parse(req.url, true).query;
                res.write("网站名：" + params.name);
                res.write("\n");
                res.write("网站 URL：" + params.url);
                res.end();

            }).listen(3000);

    //A获取POST请求内容
        POST请求的内容全部都在请求体中，nodejs默认不会解析请求体，当需要的时候需要手动来获取：
            var http = require('http');
            var querystring = require('querystring');

            var postHTML = 
              '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
              '<body>' +
              '<form method="post">' +
              '网站名： <input name="name"><br>' +
              '网站 URL： <input name="url"><br>' +
              '<input type="submit">' +
              '</form>' +
              '</body></html>';

            http.createServer(function (req, res) {
              // 定义了一个post变量，用于暂存请求体的信息
              var body = "";
              // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
              req.on('data', function (chunk) {
                body += chunk;
              });
              // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
              req.on('end', function () {
                // 解析参数
                body = querystring.parse(body);
                // 设置响应头部信息及编码
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});

                if(body.name && body.url) { // 输出提交的数据
                    res.write("网站名：" + body.name);
                    res.write("<br>");
                    res.write("网站 URL：" + body.url);
                } else {  // 输出表单
                    res.write(postHTML);
                }
                res.end();
              });
            }).listen(3000);    


/*Node 工具模块*/
    OS模块： 提供基本的系统操作函数
    Path模块： 提供处理和转换文件路径的工具
    Net模块： 用于底层网络通信。提供了服务端和客户端的操作
    DNS模块： 用于域名解析
    Domain模块： 简化异步代码的异常处理，可以捕捉处理try catch 无法捕捉的

/*Node web模块*/
    //什么是web服务器？
        web服务器一般指网站服务器，其基本功能就是提供web信息浏览服务。它只支持HTTP协议、HTML文档格式以及url,与客户端的网络浏览器配合。
        大多数web服务器都支持服务端的脚本语言（PHP，Python等），并通过脚本语言从数据库获取数据，将结果返回给客户端浏览器。
        目前最主流的三个web服务器Apache、Nginx、lls.
    //web应用架构
        1）client-客户端，一般指浏览器，可以通过HTTP协议向服务器请求数据
        2）server-服务端，一般指web服务器，可以接受客户端请求，并向客户端发送响应数据。
        3）business-业务端，通过web服务器处理应用程序，如与数据库交互，逻辑运算，调用外部程序等
        4）data-数据层，一般由数据库组成
    //使用NODE创建WEB服务器
        Nodejs提供了HTTP模块，http模块主要用于大件HTTP服务端和客户端，使用HTTP服务器或客户端功能必须调用http模块，如下：var http = require('http');
            var http = require('http');
            var fs = require('fs');
            var url = require('url');


            // 创建服务器
            http.createServer( function (request, response) {  
               // 解析请求，包括文件名
               var pathname = url.parse(request.url).pathname;

               // 输出请求的文件名
               console.log("Request for " + pathname + " received.");

               // 从文件系统中读取请求的文件内容
               fs.readFile(pathname.substr(1), function (err, data) {
                  if (err) {
                     console.log(err);
                     // HTTP 状态码: 404 : NOT FOUND
                     response.writeHead(404, {'Content-Type': 'text/html'});
                  }else{             
                     // HTTP 状态码: 200 : OK
                     response.writeHead(200, {'Content-Type': 'text/html'});    

                     // 响应文件内容
                     response.write(data.toString());        
                  }
                  //  发送响应数据
                  response.end();
               });   
            }).listen(8080);

            // 控制台会输出以下信息
            console.log('Server running at http://127.0.0.1:8080/');

    //使用Node创建web客户端
        var http = require('http');

        // 用于请求的选项
        var options = {
           host: 'localhost',
           port: '8080',
           path: '/index.html'  
        };

        // 处理响应的回调函数
        var callback = function(response){
           // 不断更新数据
           var body = '';
           response.on('data', function(data) {
              body += data;
           });

           response.on('end', function() {
              // 数据接收完成
              console.log(body);
           });
        }
        // 向服务端发送请求
        var req = http.request(options, callback);
        req.end();

/*Node Express框架*/
    //Express简介
        Express是一个简洁而灵活的nodejs web应用框架，提供了一系列强大特性帮助你创建各种web应用，和丰富的HTTP工具
        使用Express可以快速的大件一个完整功能的网站。
        其核心特性：
            1）可以设置中间件来响应HTTP请求
            2）定义了路由表用于执行不同的HTTP请求动作
            3）可以通过向模板传递参数来动态渲染HTML页面
    //Express 安装
        如下模块与express框架一起安装：
            1）body-parser-nodejs中间件，用于处理JSON、Raw和URL编码的数据
            2）cookie-parser-这是一个解析cookie的工具。通过req.cookies可以获取到传过来的cookie，并把它们转成对象
            3）nulter-nodejs中间件，处于处理enctype-"multipart/form-data"(设置表单的MIME编码)的表单数据
            
    //Express 创建
        通过调用Express模块导出的顶层的express()方法来创建app对象
            var express = require('express');
            var app = express();
            app.get('/', function(req, res) {
                res.send('hello world!');
            });
            app.listen(3000);
        //app对象主要方法：
            1) 获取路由http请求：app.Method
            2) 返回一个单例模式的路由的实例： app.route(path)
            3) 渲染HTML视图：app.render(view, [locals], callback) //app.render('email', function(err, html) {})
            4) 注册模板引擎： app.engine(ext, callback) //app.engine('html', require('ejs').renderFile);使用EJS模板引擎来渲染.html文件：
            5) 全局匹配：app.all(path, callback[, callback ...] //app.all('*', requireAuthentication);如果你把下面内容放在所有其他的路由定义的前面,要求所有从这个点开始的路由需要认证和自动加载一个用户
            6) 给路由参数添加回调触发器：app.param([name], callback) //app.param('user', function(req, res, next, id) {})当:user出现在路由路径中，你可以映射用户加载的逻辑处理来自动提供req.user给这个路由，或者对输入的参数进行验证。
            7) 挂载中间件方法到路径上app.use([path,], function [, function...])
            8) 将应用程序局部变量提供给应用程序内呈现的所有模板app.locals //app.locals.title = 'My App';
           
    //静态文件
        Express提供了内置的中间件express.static来设置静态文件如：图片、CSS、JavaScript等
        你可以使用express.static中间件来设置静态文件路径。例如，如果你讲图片，css，JavaScript文件放置public目录下，你可以这么写：
            app.use('/public', express.static('public'));

    //请求和响应
        Express应用使用回调函数的参数：request和response对象来处理请求和响应数据。
            app.get('/', function (req, res) {
               // --
            })
        //Request(Http请求，简称req)
            属性：
            1)req.app 持有express程序实例
            2)req.baseUrl 一个路由实例挂载的Url路径
            3)req.body: 当使比如body-parser或multer中间件时，req.body表示提交的一对对键值数据
            4）req.cookies: 当使用cookie-parser中间件时,表示请求发送过来的cookies
            5）req.hostname: 获取HTTP请求头部的hostname 如："127.0.0.1"
            6）req.originalUrl: 获取url请求连接，如 // GET /search?q=something  req.originalUrl ==> "/search?q=something"
            7）req.params: 获取路由定义参数的值，如 // GET /user/张三  req.params.name ==> "张三"
            8）req.path: 获取请求路径，如 // GET /search?q=something  req.path ==> "/search"
            9）req.query: 获取url中参数的值，如 // GET /search?q=something  req.query ==> "something"
            方法：
            1）req.get(field):返回请求HTTP头部的域内容，如//req.get('Content-type') => "text/plain"
            2）req.param(naem, [, defaultValue]) ：返回当前参数name的值，如：// ?name=tobi req.param('name') => "tobi" // POST name=tobi  req.param('name') => "tobi"  // /user/tobi for /user/:name  req.param('name') => "tobi"
    
        //Response(HTTP响应，简称res)
            方法
            1)res.append(field [, value]) 在指定的field的HTTP头部追加特殊的值value
            2)res.cookie(name, value [,options])设置name和value的cookie ,如res.cookie('name', 'tobi', {'domain':'.example.com', 'path':'/admin', 'secure':true});
            3）res.clearCookie(name [,options])根据指定的name清除对应的cookie，如res.clearCookie('name', {'path':'admin'});
            4）res.download(path, [,filename], [,fn])传输path指定文件作为一个附件。通常，浏览器提示用户下载。
            5）res.end([data] [, encoding]) 结束本响应的过程。
            6）res.format(object)根据请求的对象中AcceptHTTP头部指定的接受内容。
            7）res.get(field)返回field指定的HTTP响应的头部，如res.get('Content-Type') => "text/plain"
            8）res.json([body])发送一个json的响应，这个方法和res.send()方法的效果相同
            9）res.jsonp([body])发送一个json的响应，并且支持JSONP。
            10）res.location(path)设置响应的LocationHTTP头部为指定的path参数，如res.location('/foo/bar');
            11）res.redirect([status,] path)重定向来源于指定path的URL，以及指定的HTTP status codestatus。
            12）res.render(view [, locals] [, callback])渲染一个视图，然后将渲染得到的HTML文档发送给客户端。如res.render('user', {name:'Tobi'}, function(err, html) {});
            13）res.send([body])发送HTTP响应，body参数可以是一个Buffer对象，一个字符串，一个对象，或者一个数组
            14）res.sendFile(path [, options] [, fn])传输path指定的文件
            15）res.sendStatus(statusCode)设置响应对象的HTTP status code为statusCode并且发送statusCode的相应的字符串形式作为响应的Body
            16）res.set(field [, value])设置响应对象的HTTP头部field为value。如，res.set('Content-Type', 'text/plain');
            17）res.status(code)设置响应对象的HTTP status。

    //GET方法
        //index.htm页面
            <form action="http://127.0.0.1:8081/process_get" method="GET">
                First Name: <input type="text" name="first_name">  <br>
                Last Name: <input type="text" name="last_name">
                <input type="submit" value="Submit">
            </form>

        //server.js页面
            var express = require('express');
            var app = express();
            app.use('/public', express.static('public'));
            app.get('/index.htm', function (req, res) {
               res.sendFile( __dirname + "/" + "index.htm" );
            })

            app.get('/process_get', function (req, res) {
               // 输出 JSON 格式
               var response = {
                   "first_name":req.query.first_name,
                   "last_name":req.query.last_name
               };
               console.log(response);
               res.end(JSON.stringify(response));
            })

            var server = app.listen(8081, function () {
              var host = server.address().address
              var port = server.address().port
              console.log("应用实例，访问地址为 http://%s:%s", host, port)
            })
    
    //POST方法
        //index.htm页面
             <form action="http://127.0.0.1:8081/process_post" method="POST">
                First Name: <input type="text" name="first_name">  <br>
                Last Name: <input type="text" name="last_name">
                <input type="submit" value="Submit">
             </form>
        //server.js页面
            var express = require('express');
            var app = express();
            var bodyParser = require('body-parser');
            // 创建 application/x-www-form-urlencoded 编码解析
            var urlencodedParser = bodyParser.urlencoded({ extended: false })
            app.use('/public', express.static('public'));
            app.get('/index.htm', function (req, res) {
               res.sendFile( __dirname + "/" + "index.htm" );
            })
            app.post('/process_post', urlencodedParser, function (req, res) {
               // 输出 JSON 格式
               var response = {
                   "first_name":req.body.first_name,
                   "last_name":req.body.last_name
               };
               console.log(response);
               res.end(JSON.stringify(response));
            })
            var server = app.listen(8081, function () {
              var host = server.address().address
              var port = server.address().port
              console.log("应用实例，访问地址为 http://%s:%s", host, port)
            })
    //文件上传
        //index.htm页面
            <form action="/file_upload" method="post" enctype="multipart/form-data">
                <input type="file" name="image" size="50" />
                <br />
                <input type="submit" value="上传文件" />   
            </form>
        //server.js页面
            var express = require('express');
            var app = express();
            var fs = require("fs");
            var bodyParser = require('body-parser');
            var multer  = require('multer');
            app.use('/public', express.static('public'));
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(multer({ dest: '/tmp/'}).array('image'));
            app.get('/index.htm', function (req, res) {
               res.sendFile( __dirname + "/" + "index.htm" );
            })

            app.post('/file_upload', function (req, res) {
               console.log(req.files[0]);  // 上传的文件信息
               var des_file = __dirname + "/" + req.files[0].originalname;
               fs.readFile( req.files[0].path, function (err, data) {
                    fs.writeFile(des_file, data, function (err) {
                     if( err ){
                          console.log( err );
                     }else{
                           response = {
                               message:'File uploaded successfully', 
                               filename:req.files[0].originalname
                          };
                      }
                      console.log( response );
                      res.end( JSON.stringify( response ) );
                   });
               });
            })

            var server = app.listen(8081, function () {
              var host = server.address().address
              var port = server.address().port
              console.log("应用实例，访问地址为 http://%s:%s", host, port)
            })
    //cookie管理
        // express_cookie.js 文件
        var express = require('express')
        var cookieParser = require('cookie-parser')
        var util = require('util');

        var app = express()
        app.use(cookieParser())

        app.get('/', function(req, res) {
            console.log("Cookies: " + util.inspect(req.cookies));
        })

        app.listen(8081)


/*Node RESTful API*/
    REST即表述性状态传递，是一组架构约束条件和原则，满足这些约束条件和原则的应用程序或设计就是RESTful。需要注意的是，REST是设计风格而不是标准。REST通常基于使用HTTP,URL,和XML以及HTML这些现有的广泛流行的协议和标准。REST通常使用JSON数据格式。
    //RESTful Web Services
        web server是一个平台独立的，低耦合的，自包含的、基于可编程的web的应用程序，可使用开放的XML标准来描述、发布、发现、协调和配置这些应用程序，用于开发分布式的互操作的应用程序。
        基于REST架构的Web Services既是RESTful.
        由于轻量级以及通过HTTP直接传输数据的特效，web服务的RESTful方法以及成为最常见的替代方法。可以使用各种语言（java，Perl，ruby，Python，PHP，和JavaScript等）实现客户端。
        RESTful服务通常可以通过自动客户端或代表用户的应用程序访问，但是，这种服务的简便性让用户能够与之直接交互，使用他们的web浏览器构建一个GET URL并读取返回的内容

/*Node 多进程*/
    nodejs是以单线程的模式运行的，但他是用的是事件驱动来处理并发，这样有助于我们在多核CPU系统上创建多个子进程，从而提高性能
    每个子进程总是带有三个流对象：child.stdin,child.stdout和child.stderr。他们可能会共享父进程的stdio流，或者也可以是独立的被导流的流对象。
    node提供了child_process模块来创建子进程，方法有：
        1）exec-child_process.exec使用子进程执行命令，缓存子进程的输出，并将子进程的输入以回调函数参数的形式返回，
        2）spawn-child_process.spawn使用指定的命令行参数创建新进程
        3）fork-child_process.fork是spawn（）的特殊形式，用于在子进程中运行的模块，如 fork('./son.js') 相当于 spawn('node', ['./son.js']) 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。
        



















