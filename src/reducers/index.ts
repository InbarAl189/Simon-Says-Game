import { combineReducers } from 'redux';
import LocaleReducer from './LocaleReducer';
import GameReducer from './GameReducer';
import HighScoresReducer from './HighScoresReducer';

export default combineReducers({
  locale: LocaleReducer,
  game: GameReducer,
  highScores: HighScoresReducer
});
