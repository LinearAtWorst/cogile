export default function(state = null, action) {
  switch (action.type) {
    case 'STORE_USERNAME':
      return {...state, SavedUsername: action.payload}
    case 'GET_USERNAME':
      return action.payload;
    case 'SMASH_USER':
      return 'SMASHED';
  }

  return state;
}
