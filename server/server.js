var express = require('express');
var React = require('react');
var Router = require('react-router');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
require('./routes/routes.js')(app, express);

// Webpack middleware
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./../webpack.config.js');
var bundler = webpack(webpackConfig);

app.set('port', (process.env.PORT || 8080));
app.use(webpackMiddleware(bundler));


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

module.exports = app;
//