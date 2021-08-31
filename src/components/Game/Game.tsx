import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { EventEmitter } from 'events';
import { StackNavigationProp } from '@react-navigation/stack';
import { GameButton } from '../common';
import GameOverPopUp from './GameOverPopUp';
import { gameStarted, gameStopped, onGameOverCompleted, simonFinished } from '../../actions/GameActions';
import { playSound } from '../../services/SoundService';
import { LocaleReducer, State, GameReducer } from '../../types';
import { DO_SIMON_STEP, SCREEN_WIDTH } from '../../constants/Constants';
import { addScore } from '../../actions/HighScoresActions';

export const emitter: EventEmitter = new EventEmitter();

interface Props {
  navigation: StackNavigationProp<any>
}

interface StateToProps {
  locale: LocaleReducer,
  game: GameReducer
}

const Game = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const {
    locale: { strings: { game: { score, start, end } } },
    game: { currentScore, isGameStarted, currentSequence, isSimonPlaying, isHighScore, showGameOver, gameOverScore }
  } = useSelector<State, StateToProps>(state => ({ locale: state.locale, game: state.game }));

  const activeStep = useRef<number>(0);
  const intervalId = useRef<any>(0);

  const [isAfterUserAction, setIsAfterUserAction] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(gameStopped(true));
    };
  }, []);

  useEffect(() => {
    isGameStarted && doSimonSequence();
  }, [currentSequence.length]);

  const startStopGame = () => {
    if (isGameStarted) {
      intervalId.current && clearInterval(intervalId.current);
      dispatch(gameStopped(false));
      intervalId.current = 0;
    } else {
      dispatch(gameStarted(false));
    }
  };

  const doSimonSequence = () => {
    intervalId.current = setInterval(() => {
      if (activeStep.current > currentSequence.length - 1) {
        clearInterval(intervalId.current);
        dispatch(simonFinished());
        activeStep.current = 0;
        intervalId.current = 0;
        return;
      }

      emitter.emit(DO_SIMON_STEP, currentSequence[activeStep.current]);
      activeStep.current += 1;
    }, 800);
  };

  const onButtonPressed = (index: number) => {
    setIsAfterUserAction(true);
    playSound(index);

    if (index === currentSequence[activeStep.current]) {
      if (activeStep.current === currentSequence.length - 1) {
        activeStep.current = 0;
        dispatch(gameStarted(true));
      } else {
        activeStep.current += 1;
      }
    } else {
      dispatch(gameStopped(false));
      activeStep.current = 0;
    }

    setTimeout(() => setIsAfterUserAction(false), 300);
  };

  const onGameOver = (name: string) => {
    if (isHighScore) {
      dispatch(addScore(name, gameOverScore));
      navigation.navigate('HighScores');
    }

    dispatch(onGameOverCompleted());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{`${score}: ${currentScore}`}</Text>

      <View style={styles.buttonsContainer}>
        <GameButton color="#01ddff" index={0} onPress={onButtonPressed} isDisabled={isSimonPlaying || isAfterUserAction} />
        <GameButton color="#eaea00" index={1} onPress={onButtonPressed} isDisabled={isSimonPlaying || isAfterUserAction} />
        <GameButton color="#ff0026" index={3} onPress={onButtonPressed} isDisabled={isSimonPlaying || isAfterUserAction} />
        <GameButton color="#01ff49" index={2} onPress={onButtonPressed} isDisabled={isSimonPlaying || isAfterUserAction} />

        <TouchableOpacity style={styles.startBtn} onPress={startStopGame}>
          <View style={[styles.btn, { backgroundColor: isGameStarted ? '#df0013' : '#149e37' }]} />
          <Text style={styles.startText}>{isGameStarted ? end : start}</Text>
        </TouchableOpacity>
      </View>

      <GameOverPopUp
        isVisible={showGameOver}
        isHighScore={isHighScore}
        onDone={onGameOver}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  buttonsContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  score: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fff'
  },
  startBtn: {
    position: 'absolute',
    flexDirection: 'row'
  },
  btn: {
    width: SCREEN_WIDTH / 16,
    height: SCREEN_WIDTH / 16,
    borderRadius: SCREEN_WIDTH / 32,
    borderColor: '#fff',
    borderWidth: 2
  },
  startText: {
    marginLeft: 8,
    fontSize: 22,
    color: '#fff',
  }

});

export default Game;
