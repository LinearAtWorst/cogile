var chai = require('chai');
var expect = chai.expect;
var request = require('request');
// var chaiHttp = require('chai-http');

// var db = require('../../server/db/schema');
// var knex = require('knex');
// var userController = require('../../server/controllers/userController');

// chai.use(chaiHttp);

// describe('userController', function(){
//   it('should contain signin', function(){
//     expect(!!userController.signin).to.be.true;
//   });
//   it('should contain signup', function(){
//     expect(!!userController.signup).to.be.true;
//   });
// });

// xdescribe('Database', function(){
//   it('should have a users table', function(){
//     expect(true).to.be.true;
//   });
//   it('should have a highscores table', function(){
//     expect(true).to.be.true;
//   });
// });

describe('promptController', function(){
  it('should return a random JS prompt of type String', function (done) {
    request.get('http://localhost:8080/api/getRandomPrompt', function (err, res, body){
      expect(body).to.be.a('string');
      done();
    });
  });

  it('should return a specific prompt', function (done) {
    request.get('http://localhost:8080/api/getPrompt/?puzzleName=16-reduce&lang=py', function (err, res, body){
      expect(body).to.equal("import functools\n\nf = lambda x, y: x + y\na = range(10)\nsum = functools.reduce(f, a)\nprint(sum)");
      done();
    });
  });

  it('should return a list of all prompts as an object with arrays', function (done) {
    request.get('http://localhost:8080/api/getAllPrompts', function (err, res, body){
      var listOfPrompts = JSON.parse(body);
      expect(listOfPrompts).to.be.a('object');
      expect(listOfPrompts.jsFiles).to.be.a('array');
      expect(listOfPrompts.pyFiles).to.be.a('array');
      expect(listOfPrompts.goFiles).to.be.a('array');
      done();
    });
  });  
});

// Prompt Routes

// app.get('/api/getRandomPrompt', promptController.random);
// app.get('/api/getPrompt', promptController.specific);
// app.get('/api/getAllPrompts', promptController.getAllPrompts)
// app.post('/api/setHighScore', promptController.updateHighScore)
// app.get('/api/getHighScore', promptController.getHighScore);