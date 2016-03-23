var numUsers = 0;
var players = {};
var colors = ['F44336', '4CAF50', '2196F3', 'FFEB3B']; // red, green, blue, yellow

var socketController = {};

var currentRoom = 0;

socketController.joinRandomRoom = function(req, res) {

  if (numUsers <= 4) {
    numUsers++;
    res.send(''  + currentRoom);
  } else {
    currentRoom++;
    numUsers = 0;
    res.send('' + currentRoom);
  }
};

socketController.socketInit = function(io) {

  io.on('connection', function(socket) {

    ++numUsers;
    
    var socket_id = socket.id.slice(2);
    var color = colors.shift();

    players[socket_id] = [color, 0, ''];

    socket.emit('player joined', players);

    console.log('user ', socket.id, ' has connected. numUsers is now: ', numUsers);

    socket.on('game start', function(value) {
      io.emit('multigame start', players);
    })

    socket.on('game won', function(value) {
      io.emit('game over', value);
    });

    socket.on('player progress', function(value) {
      players[value.id]['2'] = value.code;
      io.emit('all players progress', players);
    });

    socket.on('disconnect', function() {
      --numUsers;

      var user = socket.id.slice(2);

      delete players[user];

      colors.push(color);

      console.log('user: ', user, ' has disconnected. numUsers is now: ', numUsers);
    });
  });
}


module.exports = socketController;
