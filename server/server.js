var express = require('express');
var React = require('react');
var Router = require('react-router');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
// var socketController = require('./controllers/socketController.js');
var db = require('./db/schema.js');
var userController = require('./controllers/userController.js');
var app = express();

app.set('port', (process.env.PORT || 8080));

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

var io = require('socket.io').listen(server);

require('./routes/routes.js')(app, express);

// Webpack middleware
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./../webpack.config.js');
var bundler = webpack(webpackConfig);

app.use(webpackMiddleware(bundler));


// Socket code
var numUsers = 0;
var players = {};
var colors = ['F44336', '4CAF50', '2196F3', 'FFEB3B']; // red, green, blue, yellow

io.on('connection', function(socket) {

  ++numUsers;
  
  var socket_id = socket.id.slice(2);
  var color = colors.shift();

  players[socket_id] = [color, 0, ''];

  socket.emit('player joined', players);

  console.log(players);

  console.log('user ', socket.id, ' has connected. numUsers is now: ', numUsers);

  socket.on('game start', function(value) {
    console.log(value);
    io.emit('multigame start', players);
  })

  socket.on('game won', function(value) {
    console.log(value);
    io.emit('game over', value);
  });

  socket.on('player progress', function(value) {
    players[value.id]['2'] = value.code;
    console.log(players);
    io.emit('all players progress', players);
  });

  socket.on('disconnect', function() {
    --numUsers;

    var user = socket.id.slice(2);

    delete players[user];

    colors.push(color);

    console.log('user: ', user, ' has disconnected. numUsers is now: ', numUsers);
  });
});



// //TEST CREAT USER
// var newUser = {
//   body: {
//     username: 'NEW TEST OUTSIDE FOLDER!',
//     password: 'ENCRYPED!'
//   }
// }
// userController.signup(newUser, {send: function(info){console.log(info);}});

module.exports = app;
