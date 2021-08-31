import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { LocaleReducer, State } from '../../types';
import { SCREEN_WIDTH } from '../../constants/Constants';

interface Props {
  navigation: StackNavigationProp<any>
}

const Welcome = ({ navigation }: Props) => {
  const { strings: { welcome: { title, startGame, highScores } } } = useSelector<State, LocaleReducer>(state => state.locale);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>{title}</Text>
      <TouchableOpacity style={styles.startBtn} onPress={() => navigation.navigate('Game')}>
        <Text style={styles.startText}>{startGame}</Text>
      </TouchableOpacity>
      <Image style={styles.img} source={{ uri: 'https://iconape.com/wp-content/files/di/94325/png/simon-game-logo.png' }} />
      <TouchableOpacity style={styles.highScoresBtn} onPress={() => navigation.navigate('HighScores')}>
        <Text style={styles.highScoresText}>{highScores}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.highScoresBtn} onPress={() => navigation.navigate('Test')}>
        <Text style={styles.highScoresText}>Test</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    color: '#fff'
  },
  startBtn: {
    marginTop: 25,
    backgroundColor: '#149E37',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  startText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase'
  },
  img: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    marginTop: 40
  },
  highScoresBtn: {
    marginTop: 25,
    backgroundColor: '#000',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  highScoresText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase'
  }
});

export default Welcome;
