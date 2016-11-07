var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var listPlayers = [];
var Socket;

var setSocket = function(socket1){
  socket = socket1;
}

var onDisconnect = function(){
  console.log("Player disconnect");
}

var onRegisterPlayer = function(data){
  console.log('Player connected: '+data);
  listPlayers.push("player_"+data);
  socket.emit('player_registered', data);
}

var onStartGame = function(data) {
  console.log('Game Started');
  //io.sockets.emit('start_game_players', "Juego inciado");
  socket.broadcast.emit('start_game_players', data);
}

module.exports = {
  setSocket,
  onDisconnect,
  onRegisterPlayer,
  onStartGame
}
