var prompts = require('./prompts');

var handlers = {};

handlers.random = function(req, res){
	var result = prompts[Math.floor(Math.random() * prompts.length)];
	res.send(result);
};

handlers.specific = function(req, res){
	var result = prompts[Math.floor(Math.random() * prompts.length)];
	res.send(result);
}

module.exports = handlers;