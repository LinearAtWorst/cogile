import { combineReducers } from 'redux';
import SingleGameReducer from './SingleGameReducer';
import MultiGameStateReducer from './MultiGameStateReducer';
import MultiTimerReducer from './MultiTimerReducer';
import PlayersStatusesReducer from './PlayersStatusesReducer';
import CountingDownReducer from './CountingDownReducer';
import GameTimeReducer from './GameTimeReducer';
import UserReducer from './UserReducer';
import ChangeLevelReducer from './ChangeLevelReducer';
import NewHighScoreReducer from './NewHighScoreReducer';
import RoomReducer from './RoomReducer';
import ListOfPromptsReducer from './ListOfPromptsReducer';

const rootReducer = combineReducers({
  singleGame: SingleGameReducer,
  multiGameState: MultiGameStateReducer,
  multiTimer: MultiTimerReducer,
  playersStatuses: PlayersStatusesReducer,
  countingDown: CountingDownReducer,
  gameTime: GameTimeReducer,
  SavedUsername: UserReducer,
  currentLevel: ChangeLevelReducer,
  newHighScore: NewHighScoreReducer,
  savedGame: RoomReducer,
  listOfPrompts: ListOfPromptsReducer
});

export default rootReducer;
