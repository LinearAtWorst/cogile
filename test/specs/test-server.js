var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var should = chai.should();
var db = require('../../server/db/schema');
var knex = require('knex');
var userController = require('../../server/controllers/userController');

chai.use(chaiHttp);

describe('userController', function(){
  it('should contain signin', function(){
    expect(!!userController.signin).to.be.true;
  });
  it('should contain signup', function(){
    expect(!!userController.signup).to.be.true;
  });
});

xdescribe('Database', function(){
  it('should have a users table', function(){
    expect(true).to.be.true;
  });
  it('should have a highscores table', function(){
    expect(true).to.be.true;
  });
});

var foo = 'bar';
expect(foo).to.be.a('string');
expect(foo).to.equal('bar');