import { ADD_SCORE } from '../constants/ActionTypes';

export const addScore = (name: string, score: number) => (dispatch: any) => {
  dispatch({ type: ADD_SCORE, payload: { newHighScore: { name, score } } });
};
