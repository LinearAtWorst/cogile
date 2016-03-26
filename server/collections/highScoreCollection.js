var db = require('../db/schema.js');
var Highscore = require('../models/highscore.js');

var Highscores = new db.Collection();

Highscores.model = Highscore;

module.exports = Highscores;