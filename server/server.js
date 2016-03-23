var express = require('express');
var React = require('react');
var Router = require('react-router');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
// var socketController = require('./controllers/socketController.js');

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

io.on('connection', function(socket) {
  console.log('a user connected');

  ++numUsers;

  console.log('numUsers is now: ', numUsers);

  socket.on('game start', function(value) {
    console.log(value);
    io.emit('multigame start', value);
  })

  socket.on('game won', function(value) {
    console.log(value);
    io.emit('game over', value);
  });

  socket.on('disconnect', function() {
    --numUsers;

    console.log('numUsers is now: ', numUsers);
  });
});

module.exports = app;
