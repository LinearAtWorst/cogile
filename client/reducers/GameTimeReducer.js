export default function(state = null, action) {
  switch (action.type) {
    case 'UPDATE_ELAPSED_TIME':
      return action.payload;
    case 'LEAVE_PAGE':
      return null;
  }

  return state;
}