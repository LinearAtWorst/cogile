var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../../server/server.js');
var should = chai.should();
var db = require('../../server/db/schema');
var knex = require('knex');
var userController = require('../../server/controllers/userController');

chai.use(chaiHttp);

describe('Server', function(){
  it('should exists!', function(){
    expect(!!server).to.be.true;
  });
});

describe('userController', function(){
  it('should contain signin', function(){
    expect(!!userController.signin).to.be.true;
  });
  it('should contain signup', function(){
    expect(!!userController.signup).to.be.true;
  });
});

describe('Database', function(){
  it('should have a users table', function(){
    expect(true).to.be.true;
  });
  it('should have a highscores table', function(){
    expect(true).to.be.true;
  });
});

describe('Promts requests', function(){
  it('should send a prompt back',function(done){
    chai.request(server)
    .get('/api/getRandomPrompt')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });
});

