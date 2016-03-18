var numUsers = 0;

module.exports = function(socket) {

  console.log('a user connected');

  ++numUsers;

  console.log('numUsers is now: ', numUsers);


  socket.on('disconnect', function() {
    --numUsers;

    console.log('numUsers is now: ', numUsers);
  });


}