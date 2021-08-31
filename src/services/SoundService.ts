import { Alert } from 'react-native';
import Sound from 'react-native-sound';

const SOUND_FILES = ['blue.mp3', 'yellow.mp3', 'green.mp3', 'red.mp3'];
const SOUNDS: Sound[] = [];

export const initSounds = () => {
  Array.from({ length: 4 }).forEach((_, index) => {
    SOUNDS[index] = new Sound(SOUND_FILES[index], Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        return Alert.alert('Error loading sounds');
      }
    });
  });

  console.log('Sound load success');
};

export const playSound = (index: number) => SOUNDS[index].play();
