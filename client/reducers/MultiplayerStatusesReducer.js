export default function(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_MULTI_PROGRESSES':
      return { ...state, store: action.payload }
    case 'LEAVE_PAGE':
      return {};
    default:
      return state
  }
}