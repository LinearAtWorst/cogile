export default function(state = null, action) {
  switch (action.type) {
    case 'MULTIPLAYER_AUTH':
      console.log('User tried to access multiplayer while not logged in.', action.payload);
      return action.payload;
  }

  return state;
}
