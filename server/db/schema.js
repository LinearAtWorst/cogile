if (process.env.db_host) {
  var knex = require('knex')({
    client: 'mysql',
    connection: {
      host     : process.env.db_host,
      user     : process.env.db_user,
      password : process.env.db_password,
      database : process.env.db_name,
      charset  : 'utf8'
    }
  });
} else {
  var config = require('./config/config.js');
  var knex = require('knex')({
    client: 'mysql',
    connection: {
      host     : config.db_host,
      user     : config.db_user,
      password : config.db_password,
      database : config.db_name,
      charset  : 'utf8'
    }
  });
}

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

module.exports = Bookshelf;