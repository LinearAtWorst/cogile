import { combineReducers } from 'redux';
import SingleGameReducer from './SingleGameReducer';
import SingleTimerReducer from './SingleTimerReducer';
import MultiGameReducer from './MultiGameReducer';
import MultiTimerReducer from './MultiTimerReducer';

const rootReducer = combineReducers({
  singleGame: SingleGameReducer,
  singleTimer: SingleTimerReducer,
  multiGame: MultiGameReducer,
  multiTimer: MultiTimerReducer
});

export default rootReducer;
