var app = require('express')();
var http = require('http').Server(app);

var listPlayers = [];
var Socket;

var setSocket = function(socket1){
  socket = socket1;
}

//******** EVENTS ***************/
var onDisconnect = function(){
  console.log("Player disconnect");
}

var onRegisterPlayer = function(data,callback){
  console.log('Player connected: '+data);
  listPlayers.push("player_"+data);
  callback('OK');
  socket.emit('player_registered', data);
}

var onStartGame = function(data) {
  console.log('Game Started');
  //io.sockets.emit('start_game_players', "Juego inciado");
  socket.broadcast.emit('start_game_players', data);
}

var onReduceTimePLayers = function(data){
  console.log("ReduceTimeFrom: "+data);
  socket.broadcast.emit("reduce_time_players",data);
}



//************END EVENTS***********//


module.exports = {
  setSocket,
  onDisconnect,
  onRegisterPlayer,
  onStartGame,
  onReduceTimePLayers
}
