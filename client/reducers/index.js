import { combineReducers } from 'redux';
import SingleGameReducer from './SingleGameReducer';
import MultiGameStateReducer from './MultiGameStateReducer';
import MultiplayerStatusesReducer from './MultiplayerStatusesReducer';
import MultiTimerReducer from './MultiTimerReducer';
import PlayersStatusesReducer from './PlayersStatusesReducer';
import CountingDownReducer from './CountingDownReducer';
import GameTimeReducer from './GameTimeReducer';
import UserReducer from './UserReducer';
import ChangeLevelReducer from './ChangeLevelReducer';
import NewHighScoreReducer from './NewHighScoreReducer';
import RoomReducer from './RoomReducer';
import ListOfPromptsReducer from './ListOfPromptsReducer';
import CurrentLanguageReducer from './CurrentLanguageReducer';


const rootReducer = combineReducers({
  singleGame: SingleGameReducer,
  multiGameState: MultiGameStateReducer,
  multiTimer: MultiTimerReducer,
  playersStatuses: PlayersStatusesReducer,
  multiplayerStatuses: MultiplayerStatusesReducer,
  countingDown: CountingDownReducer,
  gameTime: GameTimeReducer,
  SavedUsername: UserReducer,
  currentLevel: ChangeLevelReducer,
  newHighScore: NewHighScoreReducer,
  savedGame: RoomReducer,
  listOfPrompts: ListOfPromptsReducer,
  currentLanguage: CurrentLanguageReducer
});

export default rootReducer;
