var db = require('../db/schema.js');

var User = db.Model.extend({
  tableName: 'users',
});

module.exports = User;
//