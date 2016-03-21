import { combineReducers } from 'redux';
import SingleGameReducer from './SingleGameReducer';
import CountingDownReducer from './CountingDownReducer';

const rootReducer = combineReducers({
  singleGame: SingleGameReducer,
  countingDown: CountingDownReducer
});

export default rootReducer;
