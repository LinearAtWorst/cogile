export default function(state = null, action) {
  switch (action.type) {
    case 'STOP_TIMER':
      return action.payload;
    case 'LEAVE_PAGE':
      return null;
  }

  return state;
}