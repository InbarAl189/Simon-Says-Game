import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default class HighScores extends Component { 

  constructor(props) {
    super(props);
  }

  render() {
    const top10HighScores = this.props.route.params;
    return (
      <View style={styles.backgroundScreen}>
        <Text style={styles.title}>Top 10 High Scores:</Text>
        {this.displayScores(top10HighScores)}

        <TouchableOpacity
          style={styles.highScoreBtn}
          onPress={() => this.props.navigation.navigate('Simon Says')}> 
          <Text style={styles.returnBtn}>Return to play</Text>
        </TouchableOpacity>
      
      </View>
    );
  }

  displayScores(scores) { 
    let scoresToDisplay = [];
    for (var i = 0; i < scores.length; i++) {
      scoresToDisplay.push(this.displayText(i, scores[i]));
    }

    return scoresToDisplay;
  }

  displayText = (i, score) => <Text key={i} style={styles.scoreText}>Place {i+1}: {score}</Text> // add text style to display scores on screen

}


const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  scoreText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    marginTop:20,
  },
  returnBtn: {
    color:'white',
    alignSelf: 'center',
    marginTop: 20, 
    fontSize: 17,
  },
  backgroundScreen: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%'
  },
  highScoreBtn: {
    marginTop: 50,
    width: 150,
    backgroundColor: '#DA6202',
    height: 60,
    borderRadius: 20,
    alignSelf: 'center',
  }

});
