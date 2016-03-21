var numUsers = 0;

module.exports = function(io, socket) {

  console.log('a user connected');

  ++numUsers;

  console.log('numUsers is now: ', numUsers);

  socket.on('game start', function(value) {
    console.log(value);
    io.emit('multigame start', value);
  })

  socket.on('game won', function(value) {
    console.log(value);
    io.emit('game over', value);
  });

  socket.on('disconnect', function() {
    --numUsers;

    console.log('numUsers is now: ', numUsers);
  });


}