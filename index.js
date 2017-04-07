$(function () {
  var username = '';
  var socket = io();
  $('form').submit(function () {
    var msg = $('#m').val();
    if (msg) {
      if (username) {
        socket.emit('chat message', msg);
      } else {
        username = $('#m').val();
        socket.emit('nickname chosen', msg);
      }
      $('#m').val('');
    }
    return false;
  });
  socket.on('chat message', function (msg) {
    // var item = $('#messages').append($('<li>'));
    var item = $('<li>');
    item.append($('<b>').text(msg.user + ': '));
    item.append(msg.msg);
    $('#messages').append(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
  socket.on('user join', function (user) {
    $('#messages').append($('<li class="sysmsg">').text('** ' + user + ' has joined the conversation **'));
    window.scrollTo(0, document.body.scrollHeight);
  });
});