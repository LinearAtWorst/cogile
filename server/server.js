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


require('./routes/routes.js')(app, express);

// Webpack middleware
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./../webpack.config.js');
var bundler = webpack(webpackConfig);

app.use(webpackMiddleware(bundler));

// socket code
var io = require('socket.io').listen(server);
var socketEvents = require('./controllers/socketController.js').socketInit(io);


//TEST CREAT USER
var newUser = {
  body: {
    username: 'nick',
    password: '1111'
  }
}
userController.signup(newUser, {send: function(info){console.log(info);}});

module.exports = app;
