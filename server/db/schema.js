var config = require('../../../config.js');

console.log(config);

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : config.db_host,
    user     : config.db_user,
    password : config.db_password,
    database : config.db_name,
    secret   : config.secret,
    charset  : 'utf8'
      }
    });

var Bookshelf = require('bookshelf')(knex);
var db = Bookshelf;

db.knex.schema.hasTable('users')
.then(function(exists) {
  if (!exists) {
    knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('username', 100);
      user.string('password', 100);
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('prompts')
.then(function(exists) {
  if (!exists) {
    knex.schema.createTable('prompts', function(user) {
      user.increments('id').primary();
      user.string('language', 100);
      user.string('name', 100);
      user.string('code', 100); 
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('highscores')
.then(function(exists) {
  if (!exists) {
    knex.schema.createTable('highscores', function(user) {
      user.increments('id').primary();
      user.string('puzzleName', 30);
      user.string('username', 100);
      user.string('recording', 30000);
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = Bookshelf;
