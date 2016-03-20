export default function(state = null, action) {
  switch (action.type) {
    case 'START_GAME':
      return action.payload;
    case 'END_GAME':
      return action.payload;
  }

  return state;
}