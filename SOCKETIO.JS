socket.broadcast.emit('an event', { some: 'data' }); // 消息会发送到除了自己的其他用户
socket.broadcast.to(roomId).emit('an event', { some: 'data' }); // 消息会发送到指定房间的其他用户，除了自己

socket.join(roomId,function(){})  //将客户端添加到room
io.to(roomId, 'a new user has joined the room'); //向当前房间所有用户广播消息 注意：需要join到room才可起作用
socket.to(roomId).emit('my message', msg); //给指定的id发送消息  注意：需要join到room才可起作用
