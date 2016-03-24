export default function(state = null, action) {
  switch (action.type) {
    case 'CHANGE_LEVEL':
      console.log('action payload in changelevel reducer', action.payload);
      return action.payload;
  }

  return state;
}