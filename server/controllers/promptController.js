var prompts = require('./prompts');
var fs = require('fs');
var path = require('path');

var handlers = {};

var jsFiles = [
		'00-forloop',
		'01-size',
		'02-fizzbuzz',
		'03-jqueryclick'
	];

var getRandomJS = function(){
	return jsFiles[Math.floor(Math.random() * jsFiles.length)];
};

handlers.registerRandomPrompt = function(){
	return fs.readFileSync(path.join(__dirname, '../library/prompts/' + /*req.data.language  ||*/  'js/' + /*req.data.prompt ||*/ getRandomJS()), 'utf-8');
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

	fs.readFile(path.join(__dirname, '../library/prompts/' + /*req.data.language  ||*/  'js/' + puzzleName + '.js'), 'utf-8', function(err, data){
		console.log(err);
		// console.log(data);
		res.send(data);
	});

}







handlers.getAllPrompts = function(req, res) {
	res.send(jsFiles);
}

handlers.getHighScore = function(req, res) {
	var promptName = req.query.promptName;
	console.log(promptName);

	res.send('Sending back info for ' + promptName);
}

module.exports = handlers;
