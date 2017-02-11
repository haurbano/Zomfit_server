players = [];

var socketManager = function(socket){
    console.log('Socket connected');
    socket.on('disconnect',onDisconnect);
    socket.on('register_player',onRegisterPlayer);
    socket.on('start_game', onStartGame);
    socket.on('reduce_time_players',onReduceTimePLayers);
    socket.on('remove_enemy_key',onRemoveKey);

    //******** EVENTS ***************/

    //region Events
    function onDisconnect(data){
        console.log("Player disconnect: "+data);
    }

    function onRegisterPlayer(data,callback){
        console.log('Player connected: '+data);
        callback('OK');
        info = {"name": data, "keysG": 0 };
        socket.broadcast.emit('player_registered', info);

        var player = new Object();
        player.name = data;
        player.keys = 0;

        players.push(player);

    };


    function onStartGame (data) {
        console.log('Game Started');
        socket.broadcast.emit('start_game_players',players, data);
    };

     function onReduceTimePLayers(data){
         console.log("ReduceTimeFrom: "+data);
         socket.broadcast.emit("reduce_time_players",data);
    };

     function onRemoveKey(data) {
         console.log("key removed: "+data);
         socket.broadcast.emit("romove_key",data);
     }
     //endregion

    //************END EVENTS***********//
};

module.exports = {
  socketManager, players
}
