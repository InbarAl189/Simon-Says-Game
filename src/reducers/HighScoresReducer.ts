import _ from 'lodash';
import { HighScore, HighScoresReducer, ReducerAction } from '../types';
import { ADD_SCORE } from '../constants/ActionTypes';

const INITIAL_STATE = {
  highScores: []
};

export default (state: HighScoresReducer = INITIAL_STATE, action: ReducerAction): HighScoresReducer => {
  switch (action.type) {
    case ADD_SCORE: {
      const { newHighScore } = action.payload;

      return { ...state, highScores: _.sortBy([...state.highScores, newHighScore], (o: HighScore) => o.score).reverse().slice(0, 10) };
    }

    default:
      return state;
  }
};
