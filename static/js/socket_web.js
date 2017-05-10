$(document).ready(function() {
  var socket = io();
  console.log('Page loaded');
  //When a player is registered
  socket.on('player_registered', function(data){
    console.log("data web: "+JSON.stringify(data));
    $("#players").append("Players");
    $('#players').append($('<li>').text('Player: '+data.name + ' keys: '+ data.keysG));
  });

  socket.on('enemy_found_key', reloadPlayers);

  socket.on('romove_key', reloadPlayers);

  function reloadPlayers(data){
    socket.emit("get_players","data",function(data){
      console.log("data web: "+JSON.stringify(data));
      $("#players").empty();
      for(i=0;i<data.length;i++){
        console.log("data web single: "+JSON.stringify(data[i]));
        $('#players').append($('<li>').text('Player: '+data[i].name + ' keys: '+ data[i].keys));
      }
    });
  }

  // $('#players').append($('<li>').text('Player: Juanpa' + ' keys: 0'));
  // $('#players').append($('<li>').text('Player: Haurbano' + ' keys: 0'));
  // $('#players').append($('<li>').text('Player: DianaM' + ' keys: 0'));

  //Start Game
  $("#btn_start_game").click(function() {
    var time = $('#input_time').val();
    socket.emit('start_game', time);
    return false;
  });


});
