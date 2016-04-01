export default function(state = null, action) {
  switch (action.type) {
    case 'STORE_GAMEID':
      return action.payload;
    // case 'LEAVE_PAGE':
    //   return null;
  }

  return state;
}
