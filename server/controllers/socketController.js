var promptController = require('./promptController.js');
var helperFunctions = require('../../client/utils/helperFunctions.js');

// Data structure that holds all concurrent rooms.
var rooms = {};
var privateRooms = {};

var socketController = {};

var currentRoom = 0;

socketController.joinRandomRoom = function(req, res) {

  if (numUsers <= 1) {
    numUsers++;
    res.send('' + currentRoom);
  } else {
    currentRoom++;
    numUsers = 0;
    res.send('' + currentRoom);
  }
};

socketController.socketInit = function(io) {

  io.on('connection', function(socket) {

    socket.on('roulette roulette', function(data) {

      var openRooms = [];

      for (var key in rooms) {
        if (rooms[key].numUsers < 4 && rooms[key].gameStarted !== true) {
          openRooms.push({
            name: key
          });
        }
      }

      if (!openRooms.length) {
        io.emit('roulette fail', false);
        return false;
      }

      var randomVacantRoom = Math.floor(Math.random() * openRooms.length);
      console.log(randomVacantRoom);

      console.log('Roulette Room Data:', rooms[openRooms[randomVacantRoom].name].numUsers);

      io.emit('roulette success', {
        room: openRooms[randomVacantRoom].name
      });

    })

    socket.on('create new game', function(data) {

      if (data.privacySetting === 'public') {
        // If room already exists, attempt to join it
        if (rooms.hasOwnProperty(data.roomcode)) {
          console.log('Room already exists! Attempting to join room:', data.roomcode);
          console.log('Room users count:', rooms[data.roomcode].numUsers);

          // Room is full or the user is already joined, reject
          if (rooms[data.roomcode].numUsers === 4 || rooms[data.roomcode].gameStarted === true) {
            console.log('failed to join room');
            return false;
          } else {
            // Otherwise, add user to the room.

            // each player will have an array with [color, codePercent, code, username]
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
          rooms[data.roomcode] = {
            gameStarted: false,
            colors: ['F44336', '4CAF50', '2196F3', 'FFEB3B', 'FFB300', 'AB47BC', '009688', '9E9E9E']
          };

          // Randomizing color array.
          helperFunctions.shuffle(rooms[data.roomcode].colors);

          // Create player data set.
          rooms[data.roomcode].players = {};

          // Establish code prompt for room.
          rooms[data.roomcode].prompt = promptController.registerRandomPrompt();

          // When room is made, assume creator joins.
          rooms[data.roomcode].numUsers = 1;

          // Privacy & Game status settings
          rooms[data.roomcode].privacySetting = data.privacySetting;

          // Add creator as player.
          rooms[data.roomcode].players[data.username] = [rooms[data.roomcode].colors.shift(), 0, '', data.username];

          console.log('Room Data:', rooms[data.roomcode]);
          socket.join(data.roomcode);
          io.to(data.roomcode).emit('here is your prompt', rooms[data.roomcode].prompt);
          io.to(data.roomcode).emit('player joined', rooms[data.roomcode].players);
          console.log('successfully joined game with user:', data.username);
          console.log('Room users count:', rooms[data.roomcode].numUsers);
        }
      } else if (data.privacySetting === 'private') {
        // If room already exists, attempt to join it
        if (privateRooms.hasOwnProperty(data.roomcode)) {
          console.log('PRIVATE: Room already exists! Attempting to join room:', data.roomcode);
          console.log('PRIVATE: Room users count:', privateRooms[data.roomcode].numUsers);

          // Room is full or the user is already joined, reject
          if (privateRooms[data.roomcode].numUsers === 4 || privateRooms[data.roomcode].gameStarted === true) {
            return false;
          } else {
            // Otherwise, add user to the room.

            // each player will have an array with [color, codePercent, code, username]
            privateRooms[data.roomcode].players[data.username] = [privateRooms[data.roomcode].colors.shift(), 0, '', data.username];

            privateRooms[data.roomcode].numUsers++;
            console.log('PRIVATE: Room Data:', privateRooms[data.roomcode]);

            socket.join(data.roomcode);
            io.to(data.roomcode).emit('player joined', privateRooms[data.roomcode].players);
            io.to(data.roomcode).emit('here is your prompt', privateRooms[data.roomcode].prompt);
            console.log('PRIVATE: Successfully joined room.', data.roomcode);
            console.log('PRIVATE: Room users count:', privateRooms[data.roomcode].numUsers);
          }
        } else {
          console.log('PRIVATE: Creating room:', data.roomcode);
          privateRooms[data.roomcode] = {
            gameStarted: false,
            colors: ['F44336', '4CAF50', '2196F3', 'FFEB3B', 'FFB300', 'AB47BC', '009688', '9E9E9E']
          };

          // Randomizing color array.
          helperFunctions.shuffle(privateRooms[data.roomcode].colors);

          // Create player data set.
          privateRooms[data.roomcode].players = {};

          // Establish code prompt for room.
          privateRooms[data.roomcode].prompt = promptController.registerRandomPrompt();

          // When room is made, assume creator joins.
          privateRooms[data.roomcode].numUsers = 1;

          // Privacy & Game status settings
          privateRooms[data.roomcode].privacySetting = data.privacySetting;

          // Add creator as player.
          privateRooms[data.roomcode].players[data.username] = [privateRooms[data.roomcode].colors.shift(), 0, '', data.username];

          console.log('PRIVATE: Room Data:', privateRooms[data.roomcode]);
          socket.join(data.roomcode);
          io.to(data.roomcode).emit('here is your prompt', privateRooms[data.roomcode].prompt);
          io.to(data.roomcode).emit('player joined', privateRooms[data.roomcode].players);
          console.log('PRIVATE: successfully joined game with user:', data.username);
          console.log('PRIVATE: Room users count:', privateRooms[data.roomcode].numUsers);
        }
      }

    })

    socket.on('game start', function(value, roomcode) {
      if (roomcode.charAt(0) === 'P') {
        privateRooms[roomcode].gameStarted = true;
        io.to(roomcode).emit('multigame start', privateRooms[roomcode].players);
        console.log('game started fired', privateRooms[roomcode]);
      } else {
        rooms[roomcode].gameStarted = true;
        io.to(roomcode).emit('multigame start', rooms[roomcode].players);
        console.log('game started fired', rooms[roomcode]);
      }
    })

    socket.on('game won', function(value, roomcode) {
      if (rooms[roomcode]) {
        delete rooms[roomcode];
      }

      if (privateRooms[roomcode]) {
        delete privateRooms[roomcode];
      }

      io.to(value.gameId).emit('game over', value);
    });

    socket.on('player progress', function(data) {
      if (privateRooms[data.roomcode]) {
        privateRooms[data.roomcode].players[data.username][2] = data.code;
        io.to(data.roomcode).emit('all players progress', privateRooms[data.roomcode].players);
      }

      if (rooms[data.roomcode]) {
        rooms[data.roomcode].players[data.username][2] = data.code;
        io.to(data.roomcode).emit('all players progress', rooms[data.roomcode].players);
      }
    });

    socket.on('disconnected', function(data) {
      if (rooms[data.roomcode]) {

        if (rooms[data.roomcode].numUsers === 1) {
          console.log('Last player in room disconnected, destroying room.')
          rooms[data.roomcode] = {};
        } else {
          rooms[data.roomcode].numUsers--;

          var color = rooms[data.roomcode].players[data.username][0];

          delete rooms[data.roomcode].players[data.username];

          rooms[data.roomcode].colors.push(color);

          io.to(data.roomcode).emit('player joined', rooms[data.roomcode].players);

          console.log('User just disconnected in room:', rooms[data.roomcode], '. numUsers is now: ', rooms[data.roomcode].numUsers);
        }
      }

      if (privateRooms[data.roomcode]) {

        if (privateRooms[data.roomcode].numUsers === 1) {
          console.log('Last player in room disconnected, destroying room.')
          privateRooms[data.roomcode];
        } else {
          privateRooms[data.roomcode].numUsers--;

          var color = privateRooms[data.roomcode].players[data.username][0];

          delete privateRooms[data.roomcode].players[data.username];

          privateRooms[data.roomcode].colors.push(color);

          io.to(data.roomcode).emit('player joined', privateRooms[data.roomcode].players);

          console.log('User just disconnected in room:', privateRooms[data.roomcode], '. numUsers is now: ', privateRooms[data.roomcode].numUsers);
        }
      }
    });

  });
}


module.exports = socketController;
