var settings = require('./settings');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(settings.port, function(){
  console.log('listening on *:' + settings.port);
});

io.on('connection', function(socket){
  console.log('new user has joined');
  var user = '';
  socket.on('chat message', function(msg){
    io.emit('chat message', {user: user, msg: msg});
  });
  socket.on('nickname chosen', function(msg){
    user = msg;
  	users[user] = socket;
  	io.emit('user join', user);
  	console.log('new user has chosen nickname: ' + msg);
  });
});
