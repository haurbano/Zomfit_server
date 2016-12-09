var listPlayers = [];
var listIds = [];


var socketManager = function(socket){

    listIds.push(socket.id);
    console.log(listIds);

    console.log('Socket connected');
    socket.on('disconnect',onDisconnect);
    socket.on('register_player',onRegisterPlayer);
    socket.on('start_game', onStartGame);

    //******** EVENTS ***************/
    function onDisconnect(){
        console.log("Player disconnect");
    }

    function onRegisterPlayer(data,callback){
        console.log('Player connected: '+data);
        listPlayers.push("player_"+data);
        callback('OK');
        socket.broadcast.emit('player_registered', data);
    };

    function onStartGame (data) {
        console.log('Game Started');
        socket.broadcast.emit('start_game_players', data);
    };

     function onReduceTimePLayers(data){
        console.log("ReduceTimeFrom: "+data);
        socket.broadcast.emit("reduce_time_players",data.player,data.time);
    };
    //************END EVENTS***********//

};

module.exports = {
  socketManager
}
