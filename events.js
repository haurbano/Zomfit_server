
var Datastore = require('nedb'), db = new Datastore();

var socketManager = function(socket){
    console.log('Socket connected');
    socket.on('disconnect',onDisconnect);
    socket.on('register_player',onRegisterPlayer);
    socket.on('start_game', onStartGame);
    socket.on('reduce_time_players',onReduceTimePLayers);
    socket.on('remove_enemy_key',onRemoveKey);
    socket.on('win_game',onWinGame);
    socket.on('player_exit',onExitPlayer);
    socket.on('test_connection',onTestConection);
    socket.on('found all keys',onAllkeysFound);
    socket.on('found_1_key',onKeyFound);
    socket.on('get_players',getPlayers)

    //******** EVENTS ***************/

    // region Events
    function onDisconnect(data){
        console.log("Player disconnect: "+data);
    }

    function onRegisterPlayer(data,callback){
        console.log('Player connected: '+data);
        callback('OK');
        info = {"name": data, "keysG": 0 };
        socket.broadcast.emit('player_registered', info);

        var player = {name: data, keys: 0};

        db.insert(player, function(err, newPlayer){
          if (err) {
            console.log("****************************");
            console.log("error when save player`"+err);
          }else {
            console.log("****************************");
            console.log("player saved: "+JSON.stringify(newPlayer));
          }
        });

    }

    function onStartGame (data) {
        console.log('Game Started');
        socket.broadcast.emit('start_game_players', data);
    }

     function onReduceTimePLayers(data){
         console.log("ReduceTimeFrom: "+data);
         socket.broadcast.emit("reduce_time_players",data);
    }

     function onRemoveKey(data) {
       var obj = JSON.parse(data);
       console.log("key sender removed: "+obj.player);
        db.find({name: obj.player}, function(err, data1){
          console.log("data for remove key: "+data1);
          console.log("old keys: "+data1[0].keys);
          if (data1.length>0) {
            if (data1[0].keys != 0) {
              var newNumKeys = data1[0].keys - 1;
              db.update({name: data1.name},{name: data1.name, keys: newNumKeys},function(err, updateDocs){
                console.log("Error update: "+err);
                console.log("Update docs: "+updateDocs);
                socket.broadcast.emit("romove_key",data);
              });
            }
          }
        });
     }

     function onWinGame(data){
       console.log("****END GAME****"+data);
       socket.broadcast.emit("end_game",data)
     }

     function onExitPlayer(data){
       console.log("Player leave game "+ data);
       socket.broadcast.emit("player_leave_game",data);
     }

     function onTestConection(data,callback) {
       callback("ok");
     }

     function onAllkeysFound(data){
       socket.broadcast.emit("found all keys",data);
     }

     function onKeyFound(data){
       var obj = JSON.parse(data);
       db.update({name:obj.sender},{name: obj.sender,keys:obj.keys}, function(err,docs){
         console.log("err update: "+err);
         console.log("update docs: "+docs);
       });
       socket.broadcast.emit("enemy_found_key",data);
     }

     function getPlayers(data, callback) {
       var callback1 = callback;
       db.find({}, function(err,players){
         callback1(players);
       });
     }
     //endregion

    //************END EVENTS***********//
};

module.exports = {
  socketManager
}
