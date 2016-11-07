
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var events = require('./events.js')


app.use(express.static(__dirname+"/static"));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/web/index.html');
});

var socketPage = true;

io.on('connection', function(socket){
  if (socketPage) {
    events.setSocket(socket);
    socketPage = false;
  }
  console.log('Socket connected');
  io.emit('hi', 'everyone');


  socket.on('disconnect',events.onDisconnect);
  socket.on('register_player',events.onRegisterPlayer);
  socket.on('start_game', events.onStartGame);

});

http.listen(3000, function(){
  console.log('listening on:3000');
});
