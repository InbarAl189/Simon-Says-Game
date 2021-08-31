import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { emitter } from '../Game/Game';
import { playSound } from '../../services/SoundService';
import { DO_SIMON_STEP, SCREEN_WIDTH } from '../../constants/Constants';

interface Props {
  color: string,
  index: number,
  isDisabled: boolean,
  onPress(index: number): void
}

const QUARTER_CIRCLE = (SCREEN_WIDTH / 2) - 20;

const GameButton = ({ color, index, isDisabled, onPress }: Props) => {
  const [animated] = useState(new Animated.Value(1));

  useEffect(() => {
    emitter.addListener(DO_SIMON_STEP, doSimonStep);
    return () => {
      emitter.removeListener(DO_SIMON_STEP, doSimonStep);
    };
  }, []);

  const doSimonStep = (stepIndex: number) => {
    if (stepIndex === index) {
      playSound(index);
      Animated.timing(animated, { toValue: 0.5, duration: 350, easing: Easing.ease }).start(({ finished }) => {
        finished && Animated.timing(animated, { toValue: 1, duration: 350, easing: Easing.ease }).start();
      });
    }
  };

  const opacity = animated.interpolate({
    inputRange: [0.5, 1],
    outputRange: [0.5, 1]
  });

  return (
    <View style={[styles.container, { transform: [{ rotate: `${index * 90}deg` }] }]}>
      <TouchableOpacity onPress={() => onPress(index)} disabled={isDisabled}>
        <Animated.View style={[styles.subContainer, { opacity, backgroundColor: color }]} />
      </TouchableOpacity>
      <View style={styles.cover} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: QUARTER_CIRCLE,
    height: QUARTER_CIRCLE,
    borderWidth: 10,
    borderColor: '#000',
    overflow: 'hidden'
  },
  subContainer: {
    width: QUARTER_CIRCLE * 2,
    height: QUARTER_CIRCLE * 2,
    borderRadius: QUARTER_CIRCLE
  },
  cover: {
    position: 'absolute',
    width: QUARTER_CIRCLE,
    height: QUARTER_CIRCLE,
    borderRadius: QUARTER_CIRCLE / 2,
    top: QUARTER_CIRCLE / 2,
    left: QUARTER_CIRCLE / 2,
    backgroundColor: '#000'
  }
});

export { GameButton };
