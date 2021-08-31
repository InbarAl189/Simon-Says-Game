import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard, KeyboardEvent,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import Animated, { Easing } from 'react-native-reanimated';
import { LocaleReducer, State } from '../../types';
import { BASIC_SHADOW_STYLES, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Constants';

interface Props {
  isVisible: boolean,
  isHighScore: boolean,
  onDone(name: string): void
}

const GameOverPopUp = ({ isVisible, isHighScore, onDone }: Props) => {
  const {
    strings: { gameOverPopup: { title, messageHighScore, messageNoHighScore, yourName, done } }
  } = useSelector<State, LocaleReducer>(state => state.locale);

  const contentHeight = useRef(0);

  const [name, setName] = useState('');
  const [animated] = useState(new Animated.Value(0));

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', onKeyboardShow);
    Keyboard.addListener('keyboardWillHide', onKeyboardHide);

    return () => {
      Keyboard.removeListener('keyboardWillShow', onKeyboardShow);
      Keyboard.removeListener('keyboardWillHide', onKeyboardHide);
    };
  }, [contentHeight.current]);

  const onKeyboardShow = ({ endCoordinates: { height } }: KeyboardEvent) => {
    const toValue = height - ((SCREEN_HEIGHT - contentHeight.current) / 2) + 10;
    Animated.timing(animated, { toValue: -(Math.max(toValue, 0)), duration: 250, easing: Easing.ease }).start();
  };

  const onKeyboardHide = () => Animated.timing(animated, { toValue: 0, duration: 250, easing: Easing.ease }).start();

  const onDoneActions = () => {
    onDone(name);
    setName('');
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={() => {}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Animated.View
            style={[styles.subContainer, { transform: [{ translateY: animated }] }]}
            onLayout={({ nativeEvent: { layout: { height } } }) => { contentHeight.current = height; }}
          >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{isHighScore ? messageHighScore : messageNoHighScore}</Text>

            {
              isHighScore && (
                <TextInput
                  style={styles.input}
                  placeholder={yourName}
                  placeholderTextColor="#fff"
                  value={name}
                  onChangeText={setName}
                  returnKeyType="done"
                  onSubmitEditing={() => name && onDoneActions()}
                />
              )
            }

            <TouchableOpacity onPress={onDoneActions} disabled={isHighScore && !name}>
              <View style={[styles.buttonWrapper, isHighScore && !name && { opacity: 0.5 }]}>
                <Text style={{ color: '#fff' }}>{done}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
  subContainer: {
    ...BASIC_SHADOW_STYLES,
    width: SCREEN_WIDTH * 0.7,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#000'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff'
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 25,
    color: '#fff'
  },
  input: {
    width: SCREEN_WIDTH * 0.5,
    height: 35,
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 17.5,
    marginTop: 20,
    color: '#fff',
    textAlign: 'center',
  },
  buttonWrapper: {
    ...BASIC_SHADOW_STYLES,
    height: 35,
    marginTop: 20,
    paddingHorizontal: 15,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#149E37'
  }
});
export default GameOverPopUp;
