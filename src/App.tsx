import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import Welcome from './components/Welcome/Welcome';
import Game from './components/Game/Game';
import { initLocale } from './actions/LocaleActions';
import { initSounds } from './services/SoundService';
import storeFactory from './store';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './constants/Constants';
import HighScores from './components/HighScores/HighScores';
import Test from "./components/Welcome/Test";

const store = storeFactory();
const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    initLocale();
    initSounds();
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="HighScores" component={HighScores} />
            <Stack.Screen name="Test" component={Test} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  }
});

export default App;
