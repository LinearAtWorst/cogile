var prompts = require('./prompts');

module.exports = function(length){
	return prompts[Math.floor(Math.random() * prompts.length)];
}