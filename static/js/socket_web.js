$(document).ready(function() {
  var socket = io();
  console.log('Page loaded');
  //When a player is registered
  socket.on('player_registered', function(data){
    $('#players').append($('<li>').text('Player: '+data.name + ' keys: '+ data.keysG));
  });

  socket.on('enemy_found_key',function(data){
    socket.emit("get_players","data",function(data){
      $("#players").empty();
      for(i=0;data.length;i++){
        $('#players').append($('<li>').text('Player: '+data[i].name + ' keys: '+ data[i].keys));
      }
    });
  });

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
