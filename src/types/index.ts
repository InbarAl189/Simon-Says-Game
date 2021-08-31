export interface Strings {
  welcome: {
    title: string,
    startGame: string,
    highScores: string
  },
  game: {
    score: string,
    start: string,
    end: string
  },
  highScores: {
    title: string
  },
  gameOverPopup: {
    title: string,
    messageHighScore: string,
    messageNoHighScore: string,
    yourName: string,
    done: string
  }
}

export interface ReducerAction {
  type: string,
  payload: any
}

export interface State {
  locale: LocaleReducer,
  game: GameReducer,
  highScores: HighScoresReducer
}

export interface LocaleReducer {
  strings: Strings
}

export interface GameReducer {
  currentScore: number,
  currentSequence: number[],
  isGameStarted: boolean,
  isSimonPlaying: boolean,
  showGameOver: boolean,
  isHighScore: boolean,
  gameOverScore: number
}

export interface HighScoresReducer {
  highScores: HighScore[]
}

export interface HighScore {
  name: string,
  score: number
}
