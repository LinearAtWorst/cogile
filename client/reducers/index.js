import { combineReducers } from 'redux';
import SingleGameReducer from './SingleGameReducer';
import MultiGameReducer from './MultiGameReducer';
import MultiTimerReducer from './MultiTimerReducer';
import MultiGameProgressReducer from './MultiGameProgressReducer';
import CountingDownReducer from './CountingDownReducer';
import GameTimeReducer from './GameTimeReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  singleGame: SingleGameReducer,
  multiGame: MultiGameReducer,
  multiTimer: MultiTimerReducer,
  multiGameProgress: MultiGameProgressReducer,
  countingDown: CountingDownReducer,
  gameTime: GameTimeReducer,
  SavedUsername: UserReducer
});

export default rootReducer;
