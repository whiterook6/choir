var express = require('express')();
var http_server = require('http').Server(express);
var socket_io = require('socket.io')(http_server);

express.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html');
});

http_server.listen(3000, function(){
	console.log('listening on *:3000');
});

socket_io.on('connection', function(socket){
	console.log('A user connected');

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('message', function(msg){
		console.log('message received: '+msg);
		socket.broadcast.emit('message', msg);
	});
});