var path = require('path');
var promptController = require('../controllers/promptController.js');
var socketController = require('../controllers/socketController.js');
var userController = require('../controllers/userController');

module.exports = function(app, express, passport) {


  app.use('/', express.static(path.join(__dirname, '../../client')));
  app.use('/node', express.static(__dirname + '/../node_modules/'));

  /*ROUTES*/
  app.get('/api/oauth/github', passport.authenticate('github'));
  app.get('/api/oauth/github/callback', passport.authenticate('github', { failureRedirect: '/hello' }),
      function(req, res) {
      res.user = req.user;
      res.redirect('/');
  });
  //USERS
  app.post('/api/users/signup', userController.signup);
  app.post('/api/users/signin', userController.signin);

  //PROMPTS
  app.get('/api/getRandomPrompt', promptController.random);
  app.get('/api/getPrompt', promptController.specific);
  app.get('/api/getAllPrompts', promptController.getAllPrompts)
  app.post('/api/setHighScore', promptController.updateHighScore)
  app.get('/api/getHighScore', promptController.getHighScore);

  //SOCKET
  app.get('/api/joinRandomRoom', socketController.joinRandomRoom);
};
