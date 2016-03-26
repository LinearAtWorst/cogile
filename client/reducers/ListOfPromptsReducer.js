export default function(state = null, action) {
  switch (action.type) {
    case 'UPDATE_LIST':
      console.log('List of Prompts reducer update called : ', action.payload);
      return action.payload;
  }

  return state;
}