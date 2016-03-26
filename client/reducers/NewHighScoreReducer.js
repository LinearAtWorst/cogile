export default function(state = null, action) {
  switch (action.type) {
    case 'NEW_HIGH_SCORE':
      console.log('newHighScore.js - NEW HIGH SCORE UPDATED : ', action.payload);
      return action.payload;
  }

  return state;
}