var config = require('../../server/db/config/config.js');
var jwt = require('jwt-simple');

// token secret
if (process.env.secret) {
  var secret = process.env.secret;
} else {
  var secret = config.secret;
}

var helperFunctions = {};

helperFunctions.shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

helperFunctions.requireAuth = function(nextState, replace) {
  if (!global.window.localStorage.getItem('com.nimblecode')) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

helperFunctions.isLoggedIn = function() {
  if (!global.window.localStorage.getItem('com.nimblecode')) {
    return false;
  }

  return true;
}

helperFunctions.getUsername = function() {
  if(global.window.localStorage.getItem('com.nimblecode')) {
    console.log('is logged in, and username is: ', jwt.decode(global.window.localStorage.getItem('com.nimblecode'), secret));
    return jwt.decode(global.window.localStorage.getItem('com.nimblecode'), secret);
  }
}

module.exports = helperFunctions;
