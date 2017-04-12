var settings = require('./settings');
var io = require('socket.io-client');
var readline = require('readline');

var socket = io.connect(settings.url+':'+settings.port, {reconnect: true});

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var username = '';


//connect listener
socket.on('connect', function () {
  console.log('Connected');
  askForUsername();
});

function askForUsername() {
  return rl.question('Type your nickname: ', function (answer) {
    username = answer;
    socket.emit('nickname chosen', username);
  });
}


//message listener
socket.on('chat message', function (msg) {
  if (msg.user !== username) {
    console.log(msg.user + ": " + msg.msg);
  }
});

//user join listener
socket.on('user join', function (user) {
  console.log('** ' + user + ' has joined the conversation **');
});

//buffer reader
rl.on('line', function (line) {
  if (username) {
    socket.emit('chat message', line);
  }
})
