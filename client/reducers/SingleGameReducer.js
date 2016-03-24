export default function(state = null, action) {
  switch (action.type) {
    case 'STARTED_GAME':
      return action.payload;
    case 'ENDED_GAME':
      return action.payload;
    case 'LEAVE_PAGE':
      console.log('L8: SingleGameReduer : LEAVE_PAGE action received');
      return null;
  }

  return state;
}