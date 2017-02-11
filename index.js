
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var events = require('./events.js')

app.set('views', __dirname + '/static/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/static'));


app.get('/', function(req, res){
    res.render('index',{pageTitle:"Tesis :D", players: events.players});
});

io.on('connection', events.socketManager);

http.listen(3000, function(){
  console.log('listening on:3000');
});
