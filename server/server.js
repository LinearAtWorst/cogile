var express = require('express');
var React = require('react');
var Router = require('react-router');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var socketController = require('./controllers/socketController.js');

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
io.on('connection', socketController);

module.exports = app;
