import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HighScoresReducer, LocaleReducer, State } from '../../types';
import ScoreListItem from './ScoreListItem';

interface StateToProps {
  locale: LocaleReducer,
  highScores: HighScoresReducer
}

const HighScores = () => {
  const {
    locale: { strings: { highScores: { title } } },
    highScores: { highScores }
  } = useSelector<State, StateToProps>(state => ({ locale: state.locale, highScores: state.highScores }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={highScores}
        contentContainerStyle={{ paddingTop: 20 }}
        renderItem={({ item }) => (
          <ScoreListItem data={item} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000'
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    color: '#fff'
  }
});

export default HighScores;
