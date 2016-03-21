var User = require('../models/userModel.js');
var Users = require('../collections/userCollection.js');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');
var config = require('../../../config.js');

// token secret
if (process.env.secret) {
  var secret = process.env.secret;
} else {
  var secret = config.secret;
}

module.exports = {

  signin: function(req, res) {
    //we want to check the database and see if the username and password exist
    var username = req.body.username;
    var password = req.body.password;

    var validObj = {isValid: false};

    new User({ username: username }).fetch()
    .then(function(found) {
      if(found) {
        bcrypt.compare(password, found.get('password'), function(err, result) {
          if(result) {
            var token = jwt.encode({username: username}, secret);
            validObj.token = token;
            validObj.isValid = true;
            res.send(validObj);
          }
        });
      } else {
        res.send(validObj);
      }
    });
  },

  signup: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var validObj = {isValid: false};

    new User({username: username}).fetch()
      .then(function(found) {
        if(found) {
          res.send(validObj);
        } else {
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, null, function(err, hash) {
              var user = new User({
                username: username,
                password: hash
              });

              var token = jwt.encode({username: username}, secret);
              validObj.token = token;
              validObj.isValid = true;

              user.save()
                .then(function(newUser) {
                  Users.add(newUser);
                  res.send(validObj);
                });
            });
          });
        }
      });
  }
};
