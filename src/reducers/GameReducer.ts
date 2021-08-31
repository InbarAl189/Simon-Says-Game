import { GameReducer, ReducerAction } from '../types';
import { GAME_STARTED, GAME_STOPPED, ON_GAME_OVER_COMPLETED, SIMON_FINISHED } from '../constants/ActionTypes';

const INITIAL_STATE: GameReducer = {
  currentScore: 0,
  currentSequence: [],
  isGameStarted: false,
  isSimonPlaying: true,
  showGameOver: false,
  isHighScore: false,
  gameOverScore: 0
};

export default (state: GameReducer = INITIAL_STATE, action: ReducerAction): GameReducer => {
  switch (action.type) {
    case GAME_STARTED: {
      const { isNextStep } = action.payload;

      return {
        ...state,
        currentSequence: [...state.currentSequence, Math.round(Math.random() * 3)],
        currentScore: state.currentScore + (isNextStep ? 1 : 0),
        [isNextStep ? 'isSimonPlaying' : 'isGameStarted']: true
      };
    }

    case GAME_STOPPED: {
      const { isHighScore, isBack, gameOverScore } = action.payload;
      return { ...INITIAL_STATE, showGameOver: !isBack, isHighScore, gameOverScore };
    }

    case SIMON_FINISHED: {
      return {
        ...state,
        isSimonPlaying: false
      };
    }

    case ON_GAME_OVER_COMPLETED: {
      return { ...state, showGameOver: false, gameOverScore: 0 };
    }

    default: return { ...state };
  }
};
