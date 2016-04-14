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
    '10-jqueryHover',
    '11-jqueryGet',
    '12-es6-letVariable',
    '13-es6-class',
    '14-es6-promise',
    '15-es6-arrow',
    '16-es6-generators',
    '17-reactComponent',
    '18-reduxMapValues',
    '19-reduxReducer',
    '20-angularController',
  ];

var pyFiles = [
  '00-evenNumbers',
  '01-fibonacci',
  '02-primes',
  '03-functions',
  '04-fizzBuzz',
  '05-stack',
  '06-set',
  '07-compFilter',
  '08-file',
  '09-jsonDumps',
  '10-lambda',
  '11-zip',
  '12-objects',
  '13-closure',
  '14-curry',
  '15-recursion',
  '16-reduce',
  '17-regExp',
  '18-getReq',
  '19-insertionSort',
  '20-thread'
];

var goFiles = [
  '00-for',
  '01-regExp',
  '02-cmd',
  '03-error',
  '04-maps',
  '05-range',
  '06-json',
  '07-factorial',
  '08-fizzBuzz',
  '09-list',
  '10-stdin',
  '11-web',
  '12-sha',
  '13-bigFib',
  '14-channels',
  '15-closure',
  '16-rot13',
  '17-reverse',
  '18-typeSwitch',
  '19-template',
  '20-dist'
];

var allFiles = {
  jsFiles: jsFiles,
  pyFiles: pyFiles,
  goFiles: goFiles
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
