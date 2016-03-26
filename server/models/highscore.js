var db = require('../db/schema.js');

var Highscore = db.Model.extend({
  tableName: 'highscores',
});

module.exports = Highscore;