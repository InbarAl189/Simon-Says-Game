import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HighScore } from '../../types';
import { SCREEN_WIDTH } from '../../constants/Constants';

interface Props {
  data: HighScore
}

const ScoreListItem = ({ data: { name, score } }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${name}: ${score}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  },
  text: {
    fontSize: 18,
    color: '#fff',
  }
});
export default ScoreListItem;
