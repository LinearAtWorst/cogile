export default function(state = null, action) {

  switch (action.type) {
    case 'CHANGE_LEVEL':
      return action.payload;
  }

  return state;
}