export default function(state = null, action) {
  switch (action.type) {
    case 'START_GAME':
      return action.payload;
    case 'START_COUNTDOWN':
      return action.payload;
  }

  return state;
}