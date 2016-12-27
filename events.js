
var socketManager = function(socket){
    var listIds = [];
    var listPlayers = [];

    listIds.push(socket.id);
    console.log(listIds);

    console.log('Socket connected');
    socket.on('disconnect',onDisconnect);
    socket.on('register_player',onRegisterPlayer);
    socket.on('start_game', onStartGame);
    socket.on('reduce_time_players',onReduceTimePLayers);

    //******** EVENTS ***************/
    function onDisconnect(data){
        console.log("Player disconnect: "+data);
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
         socket.broadcast.emit("reduce_time_players",data);
    };
    //************END EVENTS***********//
};

module.exports = {
  socketManager
}
