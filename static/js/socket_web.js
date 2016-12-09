$(document).ready(function() {
  var socket = io();
  console.log('Page loaded');
  //When a player is registered
  socket.on('player_registered', function(msg){
    $('#players').append($('<li>').text(msg));
  });

  //Start Game
  $("#btn_start_game").click(function() {
    socket.emit('start_game', "start game");
    return false;
  });


});
