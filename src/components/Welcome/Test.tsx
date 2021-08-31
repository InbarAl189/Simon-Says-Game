import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SCREEN_WIDTH } from '../../constants/Constants';

const Test = () => {
  const [name, setName] = useState('');
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity>
        <Text style={{ fontSize: 30, marginTop: 20 }}>Step One</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="#000"
        value={name}
        onChangeText={setName}
        returnKeyType="done"
      />
    </View>

  );
};

const styles = StyleSheet.create({
  input: {
    width: SCREEN_WIDTH * 0.5,
    height: 35,
    borderWidth: 0.5,
    borderColor: '#000',
    marginTop: 20,
    color: '#000',
    textAlign: 'center',
  },
});

export default Test;
