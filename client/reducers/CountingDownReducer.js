export default function(state = null, action) {
  switch (action.type) {
    case 'STARTED_GAME':
      return action.payload;
    case 'START_COUNTDOWN':
      return action.payload;
    case 'LEAVE_PAGE':
      return null;
  }

  return state;
}