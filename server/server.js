var express = require('express');
var React = require('react');
var Router = require('react-router');
var bodyParser = require('body-parser');
var path = require('path');
var prompts = require('./prompts');
var getRandomPrompt = require('./getRandomPrompt');

// Webpack middleware
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./../webpack.config.js');
var bundler = webpack(webpackConfig);

var app = express();

app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, './../client')));

app.use(webpackMiddleware(bundler));

app.get('/api/getPrompt', function(req, res){
  	var random = getRandomPrompt();
    console.log(random);
    res.send(random);
})

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

module.exports = app;
