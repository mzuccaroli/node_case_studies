var settings = require('./settings');
var io = require('socket.io-client');
var fs = require('fs');
var readline = require('readline');

var answers = [];
var answerIndex = 0;
var socket = io.connect(settings.url+':'+settings.port, {reconnect: true});

var lineReader = readline.createInterface({
  input: require('fs').createReadStream('lorem.txt')
});

lineReader.on('line', function (line) {
  answers.push(line)
});

var username = 'CHATBOT';

//connect listener
socket.on('connect', function () {
  console.log('Connected chatbot');
  socket.emit('nickname chosen', username);

});

//message listener
socket.on('chat message', function (msg) {
  if (msg.user !== username) {
    console.log(msg.user + ": " + msg.msg);
    if(answerIndex==answers.length-1){
      answerIndex = 0;
    }
    socket.emit('chat message', answers[answerIndex]);
    answerIndex++;
  }
});

//user join listener
socket.on('user join', function (user) {
  console.log('** ' + user + ' has joined the conversation **');
});
