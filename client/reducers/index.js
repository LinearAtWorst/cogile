import { combineReducers } from 'redux';
import SingleGameReducer from './SingleGameReducer';
import MultiGameReducer from './MultiGameReducer';
import CountingDownReducer from './CountingDownReducer';

const rootReducer = combineReducers({
  singleGame: SingleGameReducer,
  multiGame: MultiGameReducer,
  countingDown: CountingDownReducer
});

export default rootReducer;
