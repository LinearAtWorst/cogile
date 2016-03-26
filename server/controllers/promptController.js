var Highscore = require('../models/highscore.js');
var Highscores = require('../collections/highScoreCollection.js');
var prompts = require('./prompts');
var fs = require('fs');
var path = require('path');

var handlers = {};

var jsFiles = [
		"01-identity.js",
		"02-first.js"
	];

var getRandomJS = function(){
	return jsFiles[Math.floor(Math.random() * jsFiles.length)];
};

handlers.updateHighScore = function(req, res){
	req.puzzleName = "02-ljsdsdlkf";
	req.recording = "Existed";
	req.username = 'NEW! IT WORKED OVERWRITING';

	new Highscore({ puzzleName: req.puzzleName }).fetch()
		.then(function(found) {
      if(found){
        Highscore.where({puzzleName: req.puzzleName})
        .destroy()
        .then(function(model){
          new Highscore({
            puzzleName: req.puzzleName,
            username: req.username,
            recording: req.recording
          })
          .save()
          .then(function(highscore){
            res.send(highscore);
          });
        });
      }else{
        new Highscore({
          puzzleName: req.puzzleName,
          username: req.username,
          recording: req.recording
        })
        .save()
        .then(function(highscore){
          res.send(highscore);
        });
      }
    });
};


handlers.random = function(req, res){
	// console.log("__dirname", __dirname);

	fs.readFile(path.join(__dirname, '../library/prompts/' + /*req.data.language  ||*/  'js/' + /*req.data.prompt ||*/ getRandomJS()), 'utf-8', function(err, data){
		console.log(err);
		// console.log(data);
		res.send(data);
	});
};

handlers.specific = function(req, res){

	// If query parameter is received, serve specific puzzle, otherwise serve up first puzzle
	if (req.query.puzzleName) {
		puzzleName = req.query.puzzleName;
	} else {
		puzzleName = '01-identity';
	}

	fs.readFile(path.join(__dirname, '../library/prompts/' + /*req.data.language  ||*/  'js/' + puzzleName + '.js'), 'utf-8', function(err, data){
		console.log(err);
		// console.log(data);
		res.send(data);
	});

}

module.exports = handlers;