io.on('connection', function(socket){
  socket.emit('sendMsg', /* */); // emit an event to the socket
  io.emit('sendMsg', /* */); // emit an event to all connected sockets
  socket.on('getMsg', function(){ /* */ }); // listen to the event

  socket.broadcast.emit('an event', { some: 'data' }); // 消息会发送到除了自己的其他用户
  socket.broadcast.to(roomId).emit('an event', { some: 'data' }); // 消息会发送到指定房间的其他用户，除了自己

  socket.join(roomId,function(){})  //将客户端添加到room
  socket.leave(roomId,function(){})  
  io.to(roomId).emit('some event');//向当前房间所有用户广播消息 注意：需要join到room才可起作用
  io.in(roomId).emit('some event'); //向当前房间所有用户广播消息 注意：需要join到room才可起作用
  
  socket.to(roomId).emit('my message', msg); //给指定的id发送消息  注意：需要join到room才可起作用
  
  io.sockets.emit('eventname', 'eventdata'); //会发送到默认“ /”名称空间中的所有客户端，不会到达其他名称空间中的客户端。
  io.emit（'eventname'，'eventdata'）;//会发送到默认“ /”名称空间中的所有客户端，不会到达其他名称空间中的客户端。

  // sending to the client
  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

  // sending to all clients except sender
  socket.broadcast.emit('broadcast', 'hello friends!');

  // sending to all clients in 'game' room except sender
  socket.to('game').emit('nice game', "let's play a game");

  // sending to all clients in 'game1' and/or in 'game2' room, except sender
  socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

  // sending to all clients in 'game' room, including sender
  io.in('game').emit('big-announcement', 'the game will start soon');

  // sending to all clients in namespace 'myNamespace', including sender
  io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

  // sending to a specific room in a specific namespace, including sender
  io.of('myNamespace').to('room').emit('event', 'message');

  // sending to individual socketid (private message)
  io.to(`${socketId}`).emit('hey', 'I just met you');

  // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
  // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.

  // sending with acknowledgement
  socket.emit('question', 'do you think so?', function (answer) {});

  // sending without compression
  socket.compress(false).emit('uncompressed', "that's rough");

  // sending a message that might be dropped if the client is not ready to receive messages
  socket.volatile.emit('maybe', 'do you really need it?');

  // specifying whether the data to send has binary data
  socket.binary(false).emit('what', 'I have no binaries!');

  // sending to all clients on this node (when using multiple nodes)
  io.local.emit('hi', 'my lovely babies');

  // sending to all connected clients
  io.emit('an event sent to all connected clients');
  
  
});

一、Restricting yourself to a namespace
/*服务端*/
var io = require('socket.io')(80);
var chat = io
  .of('/chat')
  .on('connection', function (socket) {
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });

var news = io
  .of('/news')
  .on('connection', function (socket) {
    socket.emit('item', { news: 'item' });
  });
/*客户端*/
var chat = io.connect('http://localhost/chat')
    , news = io.connect('http://localhost/news');
  
  chat.on('connect', function () {
    chat.emit('hi!');
  });
  
  news.on('news', function () {
    news.emit('woot');
  });





