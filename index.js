
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var events = require('./events.js');
var passport = require('passport');
var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;

passport.use(new FitbitStrategy({
    clientID:     "2284L5",
    clientSecret: "da0c45dcf15e8308d6c56e91df9a8648",
    callbackURL: "http://54.187.11.142:3000/auth/fitbit/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ fitbitId: profile.id }, function (err, user) {
     console.log('params method strange: '+accessToken+' '+refreshToken+' '+profile+' '+done);
      return done(err, user);
    });
  }
));

app.set('views', __dirname + '/static/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/static'));

// app.get('/auth/fitbit',
//   passport.authenticate('fitbit', { scope: ['activity','heartrate','location','profile'] }
// ));

//app.get( '/auth/fitbit/callback', passport.authenticate( 'fitbit', {
//        successRedirect: '/success',
//        failureRedirect: '/failure'
//}));

// app.get( '/auth/fitbit/callback',passport.authenticate( 'fitbit', {
//         successRedirect: '/success',
//         failureRedirect: '/failure'
// }));

app.get('/', function(req, res){
    res.render('index',{pageTitle:"Zomfit", players: events.players});
});

app.get('/success',function(req,res){
    res.send('succes '+req);
});

app.get('/failure', function(req,res){
    res.send('failure');
});

io.on('connection', events.socketManager);

http.listen(3000, function(){
  console.log('listening on:3000');
});
