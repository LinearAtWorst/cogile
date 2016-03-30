var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../../server/server.js');
var should = chai.should();
var db = require('../../server/db/schema');
var knex = require('knex');
var userController = require('../../server/controllers/userController');

chai.use(chaiHttp);

