export default function(state = null, action) {
  switch (action.type) {
    case 'NEW_HIGH_SCORE':
      return action.payload;
  }

  return state;
}