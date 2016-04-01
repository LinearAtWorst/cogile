export default function(state = null, action) {
  switch (action.type) {
    case 'STARTED_GAME':
      return action.payload;
    case 'ENDED_GAME':
      return action.payload;
    case 'LEAVE_PAGE':
      return null;
  }

  return state;
}
