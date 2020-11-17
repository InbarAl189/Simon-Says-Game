import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Game from './components/Game';
import HighScores from './components/HighScores';

const Stack = createStackNavigator();

export default class App extends Component{

  render() {
    return (
       <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Simon Says" component={Game}></Stack.Screen>
          <Stack.Screen name="High Scores" component={HighScores}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}


