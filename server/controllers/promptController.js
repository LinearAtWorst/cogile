var Highscore = require('../models/highscore.js');
var Highscores = require('../collections/highScoreCollection.js');
var fs = require('fs');
var path = require('path');

var handlers = {};

var jsFiles = [
    '00-forLoop',
    '01-size',
    '02-fizzBuzz',
    '03-newObj',
    '04-tree',
    '05-factorial',
    '06-linkedList',
    '07-reverseArray',
    '08-hashFunction',
    '09-expressServer',
    '10-jqueryClick',
    '11-jqueryGet',
    '12-es6-letVariable',
    '13-es6-class',
    '14-es6-promise',
    '15-angularController',
    '16-reactComponent',
    '17-reduxMapValues',
    '18-reduxReducer',
  ];

var pyFiles = [
    '00-helloWorld'
  ];

var allFiles = {
  jsFiles: jsFiles,
  pyFiles: pyFiles
}

var getRandomJS = function(){
  return jsFiles[Math.floor(Math.random() * jsFiles.length)];
};

handlers.updateHighScore = function(req, res){
  // req.puzzleName = "02-ljsdsdlkf";
  // req.recording = "Existed";
  // req.username = '';
  console.log('promptcontroller.js : updateHighScore being called');
  console.log(req.body);

  new Highscore({ puzzleName: req.body.puzzleName }).fetch()
    .then(function(found) {
      if(found){
        Highscore.where({puzzleName: req.body.puzzleName})
        .destroy()
        .then(function(model){
          new Highscore({
            puzzleName: req.body.puzzleName,
            username: req.body.username,
            recording: req.body.recording
          })
          .save()
          .then(function(highscore){
            res.send(highscore);
          });
        });
      }else{
        new Highscore({
          puzzleName: req.body.puzzleName,
          username: req.body.username,
          recording: req.body.recording
        })
        .save()
        .then(function(highscore){
          res.send(highscore);
        });
      }
    });
};

handlers.getHighScore = function(req, res) {
  var puzzleName = req.query.promptName;
  console.log(puzzleName);

  new Highscore({ puzzleName: puzzleName }).fetch()
      .then(function(found) {
        if (found) {
          console.log('Found record', found);
          res.send(found);
        } else {
          res.send(null);
        }
      });
}


handlers.registerRandomPrompt = function(){
  var randomJSFile = getRandomJS();
  var code = fs.readFileSync(path.join(__dirname, '../library/prompts/' + /*req.data.language  ||*/  'js/' + /*req.data.prompt ||*/ randomJSFile + '.js'), 'utf-8');

  return {
    promptName: randomJSFile,
    promptCode : code
  }
};

handlers.random = function(req, res){
  // console.log("__dirname", __dirname);

  fs.readFile(path.join(__dirname, '../library/prompts/' + /*req.data.language  ||*/  'js/' + /*req.data.prompt ||*/ getRandomJS() + '.js'), 'utf-8', function(err, data){
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
    puzzleName = jsFiles[0];
  }


  fs.readFile(path.join(__dirname, '../library/prompts/' + req.query.lang + '/' + puzzleName + '.' + req.query.lang), 'utf-8', function(err, data){
    console.log(err);
    // console.log(data);
    res.send(data);
  });

}

handlers.getAllPrompts = function(req, res) {
  res.send(allFiles);
}

module.exports = handlers;
