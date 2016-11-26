
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var events = require('./events.js')


app.set('views', __dirname + '/static/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/static'))


app.get('/', function(req, res){
    res.render('index',{pageTitle:"Tesis :D"});
});

var socketPage = true;

io.on('connection', function(socket){
  if (socketPage) {
    events.setSocket(socket);
    socketPage = false;
  }
  console.log('Socket connected');

  socket.on('disconnect',events.onDisconnect);
  socket.on('register_player',events.onRegisterPlayer);
  socket.on('start_game', events.onStartGame);
  socket.on('onReduceTimePLayers',events.onReduceTimePLayers);

});

http.listen(3000, function(){
  console.log('listening on:3000');
});
