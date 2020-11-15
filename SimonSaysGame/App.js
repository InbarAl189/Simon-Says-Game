import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BoardView from './components/BoardView';

const App = () => { 
  return (
    <View style={styles.container}>
      <BoardView/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C4864',
  },
});

export default App;