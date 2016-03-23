import { combineReducers } from 'redux';
import SingleGameReducer from './SingleGameReducer';
import MultiGameReducer from './MultiGameReducer';
import MultiTimerReducer from './MultiTimerReducer';
import MultiGameProgressReducer from './MultiGameProgressReducer';
import CountingDownReducer from './CountingDownReducer';
import GameTimeReducer from './GameTimeReducer';

const rootReducer = combineReducers({
  singleGame: SingleGameReducer,
  multiGame: MultiGameReducer,
  multiTimer: MultiTimerReducer,
  multiGameProgress: MultiGameProgressReducer,
  countingDown: CountingDownReducer,
  gameTime: GameTimeReducer
});

export default rootReducer;
