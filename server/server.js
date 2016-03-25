var express = require('express');
var path = require('path');
var React = require('react');
var Router = require('react-router');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var session = require('express-session');
var http = require('http');
var userController = require('./controllers/userController');
// var socketController = require('./controllers/socketController.js');
var db = require('./db/schema.js');
var userController = require('./controllers/userController.js');

var app = express();

var GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID: '5650911cf15eb84602a8',
    clientSecret: 'e41b6c3c03214af93621c7f7d280c1cf5b2f9fe6',
    callbackURL: 'http://127.0.0.1:8080/api/oauth/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    var profileObj = profile._json;
    var userRequest = {
      body: {
        username: profileObj.login,
        password: profileObj.id
      }
    };

    console.log(profileObj);
    console.log(userRequest);
    console.log(done);

    var response = {}
    response.send = function(res){
      if(res.isValid){
        console.log("IS A USER", res.isValid);
      }
      if(!res.isValid){
        console.log("NOT A USER", res.isValid);
      }
    };

    userController.signin(userRequest, response); 
    done(null, profileObj.login);
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(session({secret: 'secret'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
  done(null, user);  
});

passport.deserializeUser(function(user, done){
  done(null, user);
});


app.set('port', (process.env.PORT || 8080));

var server = http.createServer(app).listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});


require('./routes/routes.js')(app, express, passport);

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
// var newUser = {
//   body: {
//     username: 'nick',
//     password: '1111'
//   }
// }
// userController.signup(newUser, {send: function(info){console.log(info);}});

module.exports = app;
