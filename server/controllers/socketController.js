var promptController = require('./promptController.js');
var helperFunctions = require('../../client/utils/helperFunctions.js');

// Data structure that holds all concurrent rooms.
var rooms = {};

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
    var socket_id = socket.id.slice(2);

    socket.on('create new game', function(data){

      // Room already exists, try to join it
      if(rooms.hasOwnProperty(data.roomcode)){
        console.log('Room already exists! Attempting to join room:', data.roomcode);
        console.log('Room users count:', rooms[data.roomcode].numUsers);

        // Room is full or the user is already joined, reject
        if(rooms[data.roomcode].numUsers === 4 || rooms[data.roomcode].players[data.username] !== undefined){
          return false;
        } else {
          // Otherwise, add user to the room.

          // each player will have an array with [color, codePercent, code, socket.id]

          rooms[data.roomcode].players[data.username] = [rooms[data.roomcode].colors.shift(), 0, '', data.username];
          rooms[data.roomcode].numUsers++;
          console.log('Room Data:', rooms[data.roomcode]);

          socket.join(data.roomcode);
          io.to(data.roomcode).emit('player joined', rooms[data.roomcode].players);
          io.to(data.roomcode).emit('here is your prompt', rooms[data.roomcode].prompt);
          console.log('Successfully joined room.', data.roomcode);
          console.log('Room users count:', rooms[data.roomcode].numUsers);
        }
      } else {
        console.log('Creating room:', data.roomcode);
        rooms[data.roomcode] = { colors: ['F44336', '4CAF50', '2196F3', 'FFEB3B'] };
        // randomizing color array
        console.log('our room is: ', rooms[data.roomcode]);
        helperFunctions.shuffle(rooms[data.roomcode].colors);

        // Create player data set.
        rooms[data.roomcode].players = {};

        // Establish code prompt for room.
        rooms[data.roomcode].prompt = promptController.registerRandomPrompt();

        // When room is made, assume creator joins.
        rooms[data.roomcode].numUsers = 1;

        // Add creator as player.
        rooms[data.roomcode].players[data.username] = [rooms[data.roomcode].colors.shift(), 0, '', data.username];

        console.log('Room Data:', rooms[data.roomcode]);
        socket.join(data.roomcode);
        io.to(data.roomcode).emit('here is your prompt', rooms[data.roomcode].prompt);
        console.log('successfully joined game with user:', data.username);
        console.log('Room users count:', rooms[data.roomcode].numUsers);
      }
    })

    socket.on('game start', function(value, roomcode) {
      io.to(roomcode).emit('multigame start', rooms[roomcode].players);
    })

    socket.on('game won', function(value, roomcode) {
      console.log('inside socket game won, roomcode is: ', value.gameId);
      console.log('inside socket game won, value is: ', value);
      io.to(value.gameId).emit('game over', value);
    });

    socket.on('player progress', function(data) {

      rooms[data.roomcode].players[data.username][2] = data.code;
      io.to(data.roomcode).emit('all players progress', rooms[data.roomcode].players);
    });

    socket.on('disconnected', function(data) {
      if(rooms[data.roomcode].numUsers === 1){
        console.log('Last player in room disconnected, destroying room.')
        delete rooms[data.roomcode];
      } else {
        rooms[data.roomcode].numUsers--;

        // var user = socket.id.slice(2);
        var color = rooms[data.roomcode].players[data.username][0];

        delete rooms[data.roomcode].players[data.username];

        rooms[data.roomcode].colors.push(color);

        console.log('User just disconnected in room:', rooms[data.roomcode], '. numUsers is now: ', rooms[data.roomcode].numUsers);
      }
    });

  });
}


module.exports = socketController;
