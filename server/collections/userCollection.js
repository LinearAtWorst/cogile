var db = require('../db/schema.js');
var User = require('../models/userModel.js');

var Users = new db.Collection();

Users.model = User;
//
module.exports = Users;