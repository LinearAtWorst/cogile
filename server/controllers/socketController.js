var numUsers = 0;

module.exports = function(socket) {

  console.log('a user connected');

  ++numUsers;

  console.log('numUsers is now: ', numUsers);

  socket.on('game won', function(value) {
    console.log(value);
    io.emit('game over', value);
  })



  socket.on('disconnect', function() {
    --numUsers;

    console.log('numUsers is now: ', numUsers);
  });


}