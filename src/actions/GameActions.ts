import { State } from '../types';
import { GAME_STARTED, GAME_STOPPED, SIMON_FINISHED, ON_GAME_OVER_COMPLETED } from '../constants/ActionTypes';

export const gameStarted = (isNextStep: boolean) => (dispatch: any) => dispatch({ type: GAME_STARTED, payload: { isNextStep } });

export const gameStopped = (isBack: boolean) => (dispatch: any, getState: () => State) => {
  if (isBack) {
    return dispatch({ type: GAME_STOPPED, payload: { isHighScore: false, isBack, gameOverScore: 0 } });
  }

  const score = getState().game.currentScore;
  const { highScores } = getState().highScores;

  const isHighScore = score > 0 && ((highScores.length < 10) || (score > (highScores[highScores.length - 1]?.score || 0)));

  dispatch({ type: GAME_STOPPED, payload: { isHighScore, isBack, gameOverScore: score } });
};

export const simonFinished = () => (dispatch: any) => dispatch({ type: SIMON_FINISHED });

export const onGameOverCompleted = () => (dispatch: any) => dispatch({ type: ON_GAME_OVER_COMPLETED });
