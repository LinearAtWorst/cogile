var jsonParser = require('body-parser').json();
var path = require('path');
var promptController = require('../controllers/promptController.js');
//haven't fixed the userController file, commented out so it will run fine
// var userController = require('../controllers/userController');


module.exports = function(app, express) {
  app.use(jsonParser);

  app.use('/', express.static(path.join(__dirname, '../../client')));

  /*ROUTES*/

  //USERS
  // app.post('/api/users/signup', jsonParser, userController.signup);
  // app.post('/api/users/signin', jsonParser, userController.signin);
  
  //PROMPTS
  app.get('/api/getRandomPrompt', jsonParser, promptController.random);
  app.get('/api/getPrompt', jsonParser, promptController.specific);
};