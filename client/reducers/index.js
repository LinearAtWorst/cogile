import { combineReducers } from 'redux';
import SingleGameReducer from './SingleGameReducer';
import SingleTimerReducer from './SingleTimerReducer';

const rootReducer = combineReducers({
  singleGame: SingleGameReducer,
  singleTimer: SingleTimerReducer
});

export default rootReducer;
